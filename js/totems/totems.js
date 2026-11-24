// TOTEM SYSTEM (data in data/totemsData.js)
// Keeps run.totems (list of ids) working: one listener per event asks every owned totem to react,
// and numbers from `mods` join Game.Mods. Saved runs keep their totems.
//   Game.Totems.has(run, id) / owned(run) / unowned(run) / gain(run, id) / randomUnowned(run)
Game.Totems = (function () {
  const owned = run => (run && run.totems) || [];
  const has = (run, id) => owned(run).includes(id);
  const unowned = run => Object.keys(Game.TOTEMS).filter(id => !has(run, id));
  const randomUnowned = run => { const l = unowned(run); return l.length ? Game.Util.pick(l) : null; };

  function gain(run, id) {
    const def = Game.TOTEMS[id];
    if (!def || has(run, id)) return false;
    run.totems = owned(run).concat(id);
    if (def.onGain) def.onGain(run);
    Game.Events.emit('totem:gain', { run, id });
    return true;
  }

  Game.Mods.register((run, key) => owned(run).reduce((sum, id) => sum + ((Game.TOTEMS[id] && Game.TOTEMS[id].mods && Game.TOTEMS[id].mods[key]) || 0), 0));

  const events = new Set();
  Object.values(Game.TOTEMS).forEach(def => Object.keys(def.on || {}).forEach(ev => events.add(ev)));
  events.forEach(ev => Game.Events.on(ev, payload => {
    const run = Game.State.run;
    for (const id of owned(run)) {
      const fn = Game.TOTEMS[id] && Game.TOTEMS[id].on && Game.TOTEMS[id].on[ev];
      if (fn) fn(payload, run);
    }
  }));

  return { has, owned, unowned, gain, randomUnowned };
})();
