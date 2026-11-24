// LANTERN UPGRADES (rules; data in data/lanternData.js)
// Embers are earned when a run ends, and spent between runs on permanent upgrades.
// A run copies the owned levels when it starts (run.lantern) and reads them through Game.Mods.
//   Game.Lantern.level(id) / cost(id) / canBuy(id) / buy(id)
//   Game.Lantern.embers()        current embers
//   Game.Lantern.lastAward       { embers, fights, bosses, won } from the run that just ended
(function () {
  const M = () => Game.Meta.get();
  const def = id => Game.LANTERN_UPGRADES.find(u => u.id === id);
  const level = id => M().levels[id] || 0;
  const cost = id => { const u = def(id); return level(id) >= u.max ? null : u.cost[level(id)]; };
  const canBuy = id => cost(id) !== null && M().embers >= cost(id);
  function buy(id) {
    if (!canBuy(id)) return false;
    M().embers -= cost(id);
    M().levels[id] = level(id) + 1;
    Game.Meta.save();
    return true;
  }

  // Mods from the levels the run started with.
  Game.Mods.register((run, key) => Game.LANTERN_UPGRADES.reduce((sum, u) =>
    sum + (((run.lantern || {})[u.id] || 0) * ((u.mods && u.mods[key]) || 0)), 0));

  // A new run: copy the levels, then apply the starting bonuses.
  Game.Events.on('run:init', ({ run }) => {
    run.lantern = Object.assign({}, M().levels);
    run.maxHp += Game.Mods.get('maxHp', run);
    run.hp = run.maxHp;
    run.maxOil += Game.Mods.get('oilMax', run);
    run.oil = run.maxOil;
    run.gold += Game.Mods.get('gold', run);
  });
  // Iron Shutters: block on the first turn of every fight.
  Game.Events.on('turn:start', ({ combat }) => {
    const run = Game.State.run;
    if (run && combat.turn === 1) combat.player.block += Game.Mods.get('startBlock', run);
  });

  // Count bosses beaten this run.
  Game.Events.on('combat:end', ({ outcome }) => {
    const run = Game.State.run, node = Game.App && Game.App.state.currentNode;
    if (outcome === 'win' && run && node && node.type === 'boss') run.bossesDown = (run.bossesDown || 0) + 1;
  });

  // The run ends: pay out embers.
  Game.Events.on('run:end', ({ run, won }) => {
    const E = Game.LANTERN_EMBERS;
    const fights = (run.stats && run.stats.fightsWon) || 0, bosses = run.bossesDown || 0;
    const embers = fights * E.perFight + bosses * E.perBoss + (won ? E.winBonus : 0);
    M().embers += embers;
    M().totalEmbers += embers;
    Game.Meta.save();
    Game.Lantern.lastAward = { embers, fights, bosses, won };
  });

  Game.Lantern = {
    level, cost, canBuy, buy, def,
    embers: () => M().embers,
    lastAward: null,
    awardLine() {
      const a = this.lastAward;
      return a ? `You earned ${a.embers} embers for your lantern.` : '';
    },
  };
})();
