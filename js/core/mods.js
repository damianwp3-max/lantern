// MODS: one place to ask "how much of X does the run have right now?"
// Totems, lantern upgrades and anything else add small numbers under a key
// (oilMax, gold, luck, shop, flareDraw, startBlock, restHeal, darkVision, ...).
//   Game.Mods.register((run, key) => number)   a source adds its share
//   Game.Mods.get(key, run?)                   sum of all sources (run defaults to the current run)
Game.Mods = (function () {
  const sources = [];
  return {
    register(fn) { sources.push(fn); },
    get(key, run) {
      run = run || (Game.State && Game.State.run);
      if (!run) return 0;
      return sources.reduce((sum, fn) => sum + (fn(run, key) || 0), 0);
    },
  };
})();
