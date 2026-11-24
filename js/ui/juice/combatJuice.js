// COMBAT JUICE
// After the combat screen draws, plays the one-shot effects described in
// app.fx (made by ui/fx.js): hit sparks, screen shake, flashes, block and
// strength pop-ups, enemy lunges and death bursts, hp bar drain.
// Listens to 'ui:rendered', so the combat rules and screen don't know about it.
(function () {
  const J = Game.Juice;
  const enemyEl = uid => document.querySelector(`.enemy[data-arg="${uid}"]`);

  // Animate an hp bar from its old width down to the new one, with a pale trail.
  function drainBar(bar, fromPct) {
    if (!bar) return;
    const fill = bar.firstElementChild;
    const toPct = parseFloat(fill.style.width);
    const trail = document.createElement('i');
    trail.className = 'hp-trail';
    trail.style.left = toPct + '%';
    trail.style.width = Math.max(0, fromPct - toPct) + '%';
    bar.appendChild(trail);
    fill.animate([{ width: fromPct + '%' }, { width: toPct + '%' }], { duration: 260, easing: 'ease-out' });
    trail.animate([{ opacity: 1, transform: 'scaleX(1)' }, { opacity: 1, transform: 'scaleX(1)', offset: .4 }, { opacity: 0, transform: 'scaleX(0)' }],
      { duration: 700, easing: 'ease-in' }).onfinish = () => trail.remove();
    trail.style.transformOrigin = 'left';
  }

  function onCombat(fx, app) {
    const c = app.combat;
    if (!c) return;

    // Enemies that attacked this turn lunge forward.
    // With your Bat out they lunge AT the Bat, after its own bite has landed (ui/batView.js).
    (fx.enemyAttack || []).forEach(uid => {
      const el = enemyEl(uid);
      if (!el) return;
      const bat = c.bat && c.bat.hp > 0 && document.querySelector('.bat-unit .bat-fly');
      if (!bat) { el.classList.add('lunge'); return; }
      const sprite = el.querySelector('.sprite') || el;
      setTimeout(() => {
        if (!document.body.contains(el) || !document.body.contains(bat)) return;
        const a = sprite.getBoundingClientRect(), b = bat.getBoundingClientRect();
        el.style.setProperty('--lx', ((b.left + b.width / 2) - (a.left + a.width / 2)) * .7 + 'px');
        el.style.setProperty('--ly', ((b.top + b.height / 2) - (a.top + a.height / 2)) * .7 + 'px');
        el.classList.add('lunge');
      }, 60);   // the Bat's bite now lands in an earlier beat (app/actions/endTurnActions.js)
    });

    // Hits on enemies: sparks, flash on the sprite, shake by damage, hp drain.
    let biggest = 0;
    Object.entries(fx.enemyHit || {}).forEach(([uid, dmg]) => {
      const el = enemyEl(uid);
      const e = c.enemies.find(x => String(x.uid) === uid);
      if (!el || !e) return;
      const sprite = el.querySelector('.sprite') || el;
      J.burstAt(sprite, { count: 10 + Math.min(20, dmg), color: ['#ffd35a', '#ff8a3a', '#fff3d6'], speed: 60 + dmg * 3, size: 6 });
      J.burstAt(sprite, { count: 6, color: '#fff', speed: 30, size: 10, shape: 'ring' });
      drainBar(el.querySelector('.hpbar'), 100 * (e.hp + dmg) / e.maxHp);
      biggest = Math.max(biggest, dmg);
    });
    if (biggest) {
      J.shake(document.querySelector('.battlefield'), Math.min(14, 3 + biggest * .6), 260 + biggest * 8);
      if (biggest >= 12) J.flash('white', 180);
    }

    // Enemies that died this action: big burst, then they fade (css .dying).
    Object.keys(fx.enemyKilled || {}).forEach(uid => {
      const el = enemyEl(uid);
      if (!el) return;
      const look = Game.ENEMIES[c.enemies.find(x => String(x.uid) === uid).id].look;
      setTimeout(() => J.burstAt(el.querySelector('.sprite') || el, { count: 34, color: [look.color, '#ffd35a', '#fff'], speed: 130, size: 8, ms: 900 }), 120);
    });

    // Player hit: red vignette, harder shake, hp drain.
    if (fx.playerHit) {
      J.flash('red', 420, true);
      J.shake(document.getElementById('app'), Math.min(16, 5 + fx.playerHit * .6), 380);
      drainBar(document.querySelector('.player-hp'), 100 * (c.player.hp + fx.playerHit) / c.player.maxHp);
      J.burstAt(document.querySelector('.player-unit .hero, .player-unit'), { count: 12, color: ['#ff5a4a', '#ffb0a0'], speed: 60 });
    }
    if (fx.blockedHit) {
      const pu = document.querySelector('.player-unit');
      if (pu) { const p = J.center(pu); J.floatText(p.x, p.r.top + 40, `🛡 ${fx.blockedHit} blocked`, 'blue'); }
    }

    // Block gained: blue ring and pop-up.
    if (fx.blockGained) {
      const pu = document.querySelector('.player-unit');
      if (pu) {
        pu.classList.add('shielded');
        const p = J.center(pu);
        J.floatText(p.x, p.y - 20, `+${fx.blockGained} 🛡`, 'blue');
        J.burst(p.x, p.y, { count: 14, color: ['#7aa8ff', '#cfe0ff'], speed: 70, shape: 'ring' });
      }
    }
    if (fx.strengthGained) {
      const pu = document.querySelector('.player-unit');
      if (pu) {
        const p = J.center(pu);
        J.floatText(p.x, p.y - 40, `+${fx.strengthGained} strength`, 'orange');
        J.burst(p.x, p.r.bottom - 20, { count: 20, color: ['#ff9a3c', '#ffd35a'], speed: 90, angle: -Math.PI / 2, spread: 1.4 });
        J.flash('gold', 220);
      }
    }
    if (fx.energyGained) {
      const en = document.querySelector('.energy-orb .energy, .player .energy');
      if (en) { en.classList.add('pop'); J.burstAt(en, { count: 10, color: '#d9a441', speed: 40 }); }
    }

    // Nothing left to play: make End Turn glow so it's easy to find.
    const playable = c.hand.some((_, i) => Game.Combat.canPlay(c, i));
    const endBtn = document.querySelector('[data-action="endTurn"]');
    if (endBtn && !playable && !c.outcome) endBtn.classList.add('nudge');
  }

  Game.Events.on('ui:rendered', ({ screen, fx, app }) => {
    if (screen === 'combat') onCombat(fx || {}, app);
  });
})();
