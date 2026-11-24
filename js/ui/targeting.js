// TARGETING ARROW
// While you aim an attack, a curved arrow runs from the card to the pointer.
// The arrow always follows the pointer (it never snaps). The enemy that will
// be hit lights up instead, so you can see it before you let go.
// Aiming is forgiving: you don't have to touch the enemy. The nearest enemy
// within a generous distance of the pointer is picked (a bigger area when only
// one enemy is left), and the current pick is "sticky" so it doesn't flicker
// between two enemies standing close together.
// Used by ui/drag.js (dragging) and by click-to-aim (click a card, then near an enemy).
Game.UI = Game.UI || {};

Game.UI.aim = (function () {
  const REACH = 130;        // px from an enemy's box that still counts as aiming at it
  const REACH_SOLO = 320;   // same, when only one enemy is alive
  const STICKY = 28;        // a new enemy must be this much closer to take over
  let svg = null;
  let current = null;       // enemy element picked last
  let pointer = null;       // last pointer position, to redraw after a re-render

  function handTop() {
    const hand = document.querySelector('.hand');
    return hand ? hand.getBoundingClientRect().top + 10 : Infinity;
  }

  // Distance from a point to a box (0 when inside it).
  function distToBox(x, y, r) {
    const dx = Math.max(r.left - x, 0, x - r.right);
    const dy = Math.max(r.top - y, 0, y - r.bottom);
    return Math.hypot(dx, dy * 1.2);
  }

  // The enemy the pointer is aiming at, or null (too far away, or down in the hand).
  function nearestEnemy(x, y) {
    if (y > handTop()) return (current = null);
    const els = [...document.querySelectorAll('.enemy:not(.dead):not(.dying):not(.burrowed)')];
    const reach = els.length === 1 ? REACH_SOLO : REACH;
    let best = null, bestD = Infinity, curD = Infinity;
    els.forEach(el => {
      const d = distToBox(x, y, el.getBoundingClientRect());
      if (el === current) curD = d;
      if (d < bestD) { bestD = d; best = el; }
    });
    if (bestD > reach) return (current = null);
    // Stay on the current enemy unless another one is clearly closer.
    if (current && els.includes(current) && curD <= reach && curD - bestD < STICKY) return current;
    return (current = best);
  }

  function ensure() {
    if (svg && document.body.contains(svg)) return svg;
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'aim-arrow');
    svg.innerHTML = `<path class="aim-tether"/><path class="aim-glow"/><path class="aim-line"/><path class="aim-head"/>
      <circle class="aim-ring" r="13"/><text class="aim-label"></text>`;
    document.body.appendChild(svg);
    return svg;
  }

  // Arrow from the card to the pointer. enemyEl (optional) gets a faint tether
  // line and a name label, but the arrow itself stays on the pointer.
  function draw(cardEl, x, y, enemyEl) {
    const s = ensure();
    pointer = { x, y };
    const r = cardEl.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + 8;
    const ex = x, ey = y;
    const mx = (sx + ex) / 2 + (ex - sx) * -.15, my = Math.min(sy, ey) - 90;
    const d = `M${sx} ${sy} Q${mx} ${my} ${ex} ${ey}`;
    s.querySelector('.aim-line').setAttribute('d', d);
    s.querySelector('.aim-glow').setAttribute('d', d);
    const ang = Math.atan2(ey - my, ex - mx);
    const hx = n => (ex + Math.cos(ang + n) * -18).toFixed(1), hy = n => (ey + Math.sin(ang + n) * -18).toFixed(1);
    s.querySelector('.aim-head').setAttribute('d', `M${ex} ${ey} L${hx(.5)} ${hy(.5)} L${hx(-.5)} ${hy(-.5)}Z`);

    const ring = s.querySelector('.aim-ring'), label = s.querySelector('.aim-label'), tether = s.querySelector('.aim-tether');
    ring.setAttribute('cx', ex); ring.setAttribute('cy', ey);
    if (enemyEl) {
      const t = (enemyEl.querySelector('.sprite') || enemyEl).getBoundingClientRect();
      const tx = t.left + t.width / 2, ty = t.top + t.height / 2;
      tether.setAttribute('d', Math.hypot(tx - ex, ty - ey) > 40 ? `M${ex} ${ey} L${tx} ${ty}` : '');
      const name = enemyEl.querySelector('.name');
      label.textContent = name ? name.textContent : '';
      label.setAttribute('x', ex + 18); label.setAttribute('y', ey - 16);
    } else {
      tether.setAttribute('d', '');
      label.textContent = '';
    }
    s.classList.toggle('locked', !!enemyEl);
    s.style.display = 'block';
  }

  function clear() {
    if (svg) svg.style.display = 'none';
    current = null;
    document.querySelectorAll('.enemy.droptarget').forEach(n => n.classList.remove('droptarget'));
    document.body.classList.remove('aim-locked');
  }

  function highlight(enemyEl) {
    document.querySelectorAll('.enemy.droptarget').forEach(n => { if (n !== enemyEl) n.classList.remove('droptarget'); });
    if (enemyEl) enemyEl.classList.add('droptarget');
    document.body.classList.toggle('aim-locked', !!enemyEl);
  }

  // One step of aiming: pick, light up, draw. Returns the picked enemy element.
  function update(cardEl, x, y) {
    const enemy = nearestEnemy(x, y);
    highlight(enemy);
    draw(cardEl, x, y, enemy);
    return enemy;
  }

  // --- click-to-aim: after clicking an attack card, the arrow follows the pointer
  //     and a click near an enemy fires at it. ---
  // Only in a fight: other screens (the upgrade / pierce picker) also show a selected card in a .hand grid,
  // and must never get an aiming arrow.
  const inCombat = () => !!(Game.App && Game.App.state && Game.App.state.screen === 'combat');
  const selectedCard = () => (inCombat() ? document.querySelector('.hand.fan .card.selected') : null);
  document.addEventListener('pointermove', e => {
    pointer = { x: e.clientX, y: e.clientY };
    if (document.body.classList.contains('dragging-card')) return;
    const card = selectedCard();
    if (!card) { if (svg && svg.style.display === 'block') clear(); return; }
    update(card, e.clientX, e.clientY);
  });
  document.addEventListener('click', e => {
    const app = Game.App && Game.App.state;
    if (!app || app.screen !== 'combat' || app.selectedCard === null) return;
    if (e.target.closest('[data-action]') || !e.target.closest('.battlefield')) return;
    const enemy = nearestEnemy(e.clientX, e.clientY);
    if (enemy) { clear(); Game.Actions.target(enemy.dataset.arg); }
  });
  // Right click cancels aiming.
  document.addEventListener('contextmenu', e => {
    const app = Game.App && Game.App.state;
    if (app && app.screen === 'combat' && app.selectedCard !== null) { e.preventDefault(); clear(); Game.Actions.cancelCard(); }
  });
  // After a redraw: hide the arrow, or (a card is still picked) draw it again
  // at the last pointer position so it doesn't vanish until the mouse moves.
  Game.Events.on('ui:rendered', () => {
    clear();
    const card = selectedCard();
    if (card && pointer && !document.body.classList.contains('dragging-card')) update(card, pointer.x, pointer.y);
  });

  return { nearestEnemy, draw, clear, highlight, update, handTop };
})();
