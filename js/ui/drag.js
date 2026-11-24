// DRAG AND DROP FOR CARDS
// Press a card and move a few pixels to start.
//  - Cards that target an enemy: the card lifts and an arrow (ui/targeting.js)
//    follows the pointer; the enemy it will hit lights up (forgiving, see
//    ui/targeting.js). Release while one is lit to play it, otherwise it cancels.
//  - Other cards: a copy follows the pointer; release above the hand to play it,
//    anywhere else and it slides back. Cards that hit ALL / random enemies light
//    up every enemy while they are in the play zone.
// Plain clicks (no movement) are left to main.js. Pointer events: mouse, touch, pen.
(function () {
  const THRESHOLD = 6;     // pixels of movement before a press becomes a drag
  let press = null;        // { el, index, type, x, y, dragging }
  let ghost = null;
  let suppressClick = false;
  const aim = () => Game.UI.aim;

  function startDrag() {
    press.dragging = true;
    document.body.classList.add('dragging-card');
    if (press.type === 'enemy') {
      press.el.classList.add('aiming');
      document.body.classList.add('aim-drag');
      return;
    }
    const r = press.el.getBoundingClientRect();
    press.dx = press.x - r.left;
    press.dy = press.y - r.top;
    press.home = r;
    ghost = press.el.cloneNode(true);
    ghost.classList.remove('deal', 'selected');
    ghost.classList.add('drag-ghost');
    Object.assign(ghost.style, { width: r.width + 'px', height: r.height + 'px', animation: 'none' });
    document.body.appendChild(ghost);
    press.el.classList.add('dragging');
    document.body.classList.add('skill-drag');
  }

  function move(e) {
    if (!press) return;
    if (!press.dragging) {
      if (Math.hypot(e.clientX - press.x, e.clientY - press.y) < THRESHOLD) return;
      startDrag();
    }
    if (press.type === 'enemy') {
      aim().update(press.el, e.clientX, e.clientY);
    } else {
      ghost.style.left = (e.clientX - press.dx) + 'px';
      ghost.style.top = (e.clientY - press.dy) + 'px';
      const inZone = e.clientY < aim().handTop();
      document.body.classList.toggle('in-play-zone', inZone);
      ghost.classList.toggle('ready', inZone);
      const hitsAll = press.type === 'all' || press.type === 'random';
      document.querySelectorAll('.enemy:not(.dead):not(.dying):not(.burrowed)').forEach(el => el.classList.toggle('aoe-target', hitsAll && inZone));
    }
  }

  function end(e) {
    if (!press) return;
    const was = press;
    press = null;
    if (!was.dragging) return;            // plain click: main.js handles it
    suppressClick = true;
    setTimeout(() => { suppressClick = false; }, 0);
    const released = e.type === 'pointerup';

    if (was.type === 'enemy') {
      const enemy = released ? aim().nearestEnemy(e.clientX, e.clientY) : null;
      cleanup(was);
      if (enemy) Game.App.dropCard(was.index, Number(enemy.dataset.arg));
      return;
    }
    const play = released && e.clientY < aim().handTop();
    if (play) {
      const rect = ghost.getBoundingClientRect();
      cleanup(was);
      return Game.App.dropCard(was.index, null, rect);
    }
    // Not played: slide back into the hand.
    const g = ghost, home = was.home, gr = g.getBoundingClientRect();
    ghost = null;
    g.animate([{ transform: 'rotate(-4deg) scale(1.08)', left: gr.left + 'px', top: gr.top + 'px' },
               { transform: 'none', left: home.left + 'px', top: home.top + 'px' }], { duration: 180, easing: 'ease-out' })
      .onfinish = () => { g.remove(); cleanup(was); };
  }

  function cleanup(was) {
    if (ghost) ghost.remove();
    ghost = null;
    was.el.classList.remove('dragging', 'aiming');
    document.body.classList.remove('dragging-card', 'skill-drag', 'aim-drag', 'in-play-zone');
    document.querySelectorAll('.enemy.aoe-target').forEach(el => el.classList.remove('aoe-target'));
    aim().clear();
  }

  document.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    const el = e.target.closest('.hand .card[data-index]');
    if (!el || el.classList.contains('disabled') || !Game.App || Game.App.state.screen !== 'combat' || Game.Juice.busy) return;
    press = { el, index: Number(el.dataset.index), type: el.dataset.type, x: e.clientX, y: e.clientY, dragging: false };
  });
  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', end);
  document.addEventListener('pointercancel', end);
  // Stop the browser starting a text/image drag from the card.
  document.addEventListener('dragstart', e => e.preventDefault());

  Game.Drag = {
    // main.js asks this first on every click; true means "this click was the end of a drag".
    consumeClick() {
      if (!suppressClick) return false;
      suppressClick = false;
      return true;
    },
  };
})();
