// GOLD (rules; numbers in data/shopData.js)
//   run.gold
//   Game.Gold.gain(run, n) / spend(run, n) / canAfford(run, n)
//   Game.Gold.lastGain   gold won by the last fight (shown on the reward screen)
// Winning a fight pays out by node type (Game.GOLD_REWARDS), raised by the 'gold' mod.
Game.Gold = (function () {
  function gain(run, n) { run.gold = Math.max(0, (run.gold || 0) + n); Game.Events.emit('gold:changed', { run, delta: n }); }
  const canAfford = (run, n) => (run.gold || 0) >= n;
  function spend(run, n) { if (!canAfford(run, n)) return false; gain(run, -n); return true; }

  const api = { gain, spend, canAfford, lastGain: 0 };

  Game.Events.on('combat:start', () => { api.lastGain = 0; });
  Game.Events.on('combat:end', ({ outcome }) => {
    if (outcome !== 'win') return;
    const run = Game.State.run, node = Game.App && Game.App.state.currentNode;
    if (!run) return;
    const range = Game.GOLD_REWARDS[node ? node.type : 'fight'] || Game.GOLD_REWARDS.fight;
    const base = Game.Util.randInt(range[0], range[1]);
    api.lastGain = Math.round(base * (1 + Game.Mods.get('gold', run)));
    gain(run, api.lastGain);
  });
  return api;
})();
