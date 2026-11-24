// LANTERN OIL (rules; numbers in data/oilData.js)
//   run.oil / run.maxOil
//   Game.Oil.gain(run, n) / spend(run, n) / isDark(run)
//   Game.Oil.canFlare(c) / flare(c)       the in-fight Flare (once per turn)
// Entering a map node costs oil; resting at a fire gives a little back.
// At 0 oil the lantern is dark: enemy intents show "?" (ui/intentView.js), unless a totem gives dark vision.
Game.Oil = (function () {
  const D = () => Game.OIL;

  function gain(run, n) {
    const before = run.oil;
    run.oil = Math.max(0, Math.min(run.maxOil, run.oil + n));
    Game.Events.emit('oil:changed', { run, delta: run.oil - before });
    return run.oil - before;
  }
  const spend = (run, n) => (run.oil >= n ? (gain(run, -n), true) : false);
  const isDark = run => !!run && run.oil <= 0 && !Game.Mods.get('darkVision', run);

  function flareCost() { return D().flareCost; }
  function canFlare(c) {
    const run = Game.State.run;
    return !!run && !c.outcome && !c.flared && run.oil >= flareCost();
  }

  // Burn oil: +energy and cards, once per turn.
  function flare(c) {
    if (!canFlare(c)) return false;
    const run = Game.State.run;
    spend(run, flareCost());
    c.flared = true;
    c.player.energy += D().flareEnergy;
    const cards = D().flareDraw + Game.Mods.get('flareDraw', run);
    Game.Combat.draw(c, cards);
    Game.CombatUtil.log(c, `You burn oil: +${D().flareEnergy} energy, draw ${cards}.`);
    Game.Events.emit('oil:flare', { combat: c });
    return true;
  }

  Game.Events.on('node:enter', ({ node }) => {
    const run = Game.State.run;
    if (!run) return;
    if (node.type === 'rest') gain(run, D().restFireOil);
    else gain(run, -(D().nodeCost[node.type] || 0));
  });
  Game.Events.on('turn:start', ({ combat }) => { combat.flared = false; });
  // Going down to the next level tops the lantern up a little.
  Game.Events.on('level:start', ({ levelIndex }) => {
    const run = Game.State.run;
    if (run && levelIndex > 0 && D().descendRefill) gain(run, D().descendRefill);
  });

  return { gain, spend, isDark, canFlare, flare, flareCost };
})();
