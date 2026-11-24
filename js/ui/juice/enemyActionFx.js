// ENEMY ACTION FX (UI)
// Makes every enemy move readable: after the combat screen draws it plays what
// each enemy just did (combat/enemyActions.js, data/enemyActionsData.js):
//   attack  a slash lands on the one it hits (you or your Bat); the lunge itself is in combatJuice.js
//   block   a shield bubble pops around the enemy
//   buff    the enemy glows and sparks rise from it
// Enemies act one after another, a little apart. Styles: css/enemyActions.css.
(function () {
  const J = Game.Juice;
  const D = () => Game.ENEMY_ACTION_FX;
  const enemyEl = uid => document.querySelector(`.enemy[data-arg="${uid}"]`);

  const KINDS = {
    attack(el, c) {
      const bat = c.bat && c.bat.hp > 0 && document.querySelector('.bat-unit .bat-fly');
      const victim = bat || document.querySelector('.player-unit');
      if (!victim) return;
      // The strike lands at the peak of the lunge (the Bat gets hit after its own bite, see combatJuice.js).
      setTimeout(() => {
        if (!document.body.contains(victim)) return;
        const p = J.center(victim);
        const s = document.createElement('div');
        s.className = 'act-slash';
        s.style.left = p.x + 'px'; s.style.top = p.y + 'px';
        document.getElementById('fx-layer') ? document.getElementById('fx-layer').appendChild(s) : document.body.appendChild(s);
        setTimeout(() => s.remove(), 500);
        J.burst(p.x, p.y, { count: 10, color: D().kinds.attack.colors, speed: 60, size: 5 });
      }, bat ? (Game.BAT_BITE_MS || 560) + 180 : 180);
    },
    block(el) {
      const sprite = el.querySelector('.sprite') || el;
      const r = sprite.getBoundingClientRect();
      const s = document.createElement('div');
      s.className = 'act-shield';
      s.style.left = r.left + r.width / 2 + 'px'; s.style.top = r.top + r.height / 2 + 'px';
      s.style.setProperty('--sz', Math.max(r.width, r.height) * 1.25 + 'px');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
      J.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 12, color: D().kinds.block.colors, speed: 70, shape: 'ring', size: 8 });
    },
    buff(el) {
      const sprite = el.querySelector('.sprite') || el;
      sprite.classList.remove('act-powerup'); void sprite.offsetWidth; sprite.classList.add('act-powerup');
      setTimeout(() => sprite.classList.remove('act-powerup'), 900);
      const r = sprite.getBoundingClientRect();
      for (let i = 0; i < 3; i++) setTimeout(() => {
        if (!document.body.contains(sprite)) return;
        J.burst(r.left + r.width / 2, r.bottom - 10, { count: 9, color: D().kinds.buff.colors, speed: 70, angle: -Math.PI / 2, spread: 1.2, size: 5, ms: 800 });
      }, i * 160);
    },
  };

  // Extra kinds can be added from other files (ui/juice/junkFx.js).
  J.actionKinds = KINDS;

  Game.Events.on('ui:rendered', ({ screen, app }) => {
    const c = app && app.combat;
    if (screen !== 'combat' || !c || !c.enemyActs || !c.enemyActs.length) return;
    const acts = c.enemyActs;
    c.enemyActs = [];
    acts.forEach((a, i) => setTimeout(() => {
      const el = enemyEl(a.uid);
      if (!el) return;
      a.kinds.forEach(k => KINDS[k] && KINDS[k](el, c, a));
    }, i * D().staggerMs));
  });
})();
