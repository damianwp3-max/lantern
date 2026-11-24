// PASSIVE SYSTEM
// Keeps the run's passives (run.passives, a list of ids from data/passivesData.js)
// working: one listener per event asks every owned passive to react.
// Because it reads run.passives each time, saved runs keep their passives.
Game.Passives = (function () {
  const owned = run => (run && run.passives) || [];

  function has(run, id) { return owned(run).includes(id); }

  // Passives the player could still learn.
  function unowned(run) {
    return Object.keys(Game.PASSIVES).filter(id => !has(run, id) && !Game.PASSIVES[id].characterOnly);
  }

  function gain(run, id) {
    const def = Game.PASSIVES[id];
    if (!def || has(run, id)) return;
    run.passives = owned(run).concat(id);
    if (def.onGain) def.onGain(run);
    Game.Events.emit('passive:gain', { run, id });
  }

  // Subscribe once to every event any passive uses.
  const events = new Set();
  Object.values(Game.PASSIVES).forEach(def => Object.keys(def.on || {}).forEach(ev => events.add(ev)));
  events.forEach(ev => Game.Events.on(ev, payload => {
    const run = Game.State.run;
    for (const id of owned(run)) {
      const fn = Game.PASSIVES[id] && Game.PASSIVES[id].on && Game.PASSIVES[id].on[ev];
      if (fn) fn(payload, run);
    }
  }));

  return { has, unowned, gain, owned };
})();
