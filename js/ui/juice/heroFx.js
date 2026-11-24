// HEALING FX (UI)
// Green "+N" numbers and a soft red-sparkle burst when you or your Bat heal
// (event 'heal:done' from combat/healing.js), shown after the next combat draw.
// Overhealed HP bars (above max, Engorge / the Bat) get a crimson glow: css/bat.css.
(function () {
  let queue = [];
  Game.Events.on('heal:done', ({ combat, unit, amount }) => {
    queue.push({ bat: !!(combat.bat && unit === combat.bat), amount });
  });
  Game.Events.on('combat:start', () => { queue = []; });

  Game.Events.on('ui:rendered', ({ screen, app }) => {
    if (screen !== 'combat') { queue = []; return; }
    const c = app.combat, J = Game.Juice;
    const hp = document.querySelector('.player-hp');
    if (hp && c && c.player.hp > c.player.maxHp) hp.classList.add('overheal');
    if (!J || !queue.length) return;
    const sum = { hero: 0, bat: 0 };
    queue.forEach(q => { sum[q.bat ? 'bat' : 'hero'] += q.amount; });
    queue = [];
    [['hero', '.player-unit'], ['bat', '.bat-unit .bat-fly']].forEach(([k, sel], i) => {
      const el = document.querySelector(sel);
      if (!sum[k] || !el) return;
      setTimeout(() => {
        const p = J.center(el);
        J.floatText(p.x + (k === 'hero' ? 30 : 0), p.y - (k === 'hero' ? 60 : 30), `+${sum[k]}`, 'heal');
        J.burst(p.x, p.y, { count: 12, color: ['#ff4a5a', '#7fe08a', '#ffb0b8'], speed: 50, angle: -Math.PI / 2, spread: 1.6, size: 5 });
      }, 180 + i * 120);
    });
  });
})();
