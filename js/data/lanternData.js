// LANTERN UPGRADES (data only): the permanent upgrades you buy BETWEEN runs.
// You earn Embers at the end of every run (js/lantern/lantern.js) and spend them
// on the Lantern screen (main menu). Each upgrade has levels; cost[i] is the price of level i+1.
//   mods: { key: number per level }  read through Game.Mods (oilMax, maxHp, gold, startBlock, flareDraw, luck, restHeal)
// New upgrade = one entry here.
Game.LANTERN_UPGRADES = [
  { id: 'reservoir',    name: 'Deep Reservoir', icon: '⚱', color: '#e0b04a', max: 4, cost: [6, 10, 16, 24],
    text: '+2 max oil per level.', mods: { oilMax: 2 } },
  { id: 'frame',        name: 'Sturdy Frame',   icon: '♥', color: '#e2574c', max: 4, cost: [6, 10, 16, 24],
    text: '+5 max HP per level.', mods: { maxHp: 5 } },
  { id: 'pocket',       name: 'Glass Pocket',   icon: '◎', color: '#e8c27a', max: 3, cost: [5, 9, 14],
    text: 'Start each run with +15 gold per level.', mods: { gold: 15 } },
  { id: 'shutters',     name: 'Iron Shutters',  icon: '🛡', color: '#7aa8ff', max: 3, cost: [8, 14, 22],
    text: 'Start each fight with +3 block per level.', mods: { startBlock: 3 } },
  { id: 'twin_wick',    name: 'Twin Wick',      icon: '🕯', color: '#ffd35a', max: 2, cost: [12, 24],
    text: 'Your Flare draws 1 more card per level.', mods: { flareDraw: 1 } },
  { id: 'prism',        name: 'Prism Lens',     icon: '◆', color: '#6fcf7a', max: 3, cost: [10, 16, 24],
    text: 'Luck: lucky cards double 5% more often and unlucky ones fizzle 5% less often, per level.', mods: { luck: 0.05 } },
  { id: 'warm_flame',   name: 'Warm Flame',     icon: '♨', color: '#ff9a3c', max: 3, cost: [6, 10, 16],
    text: 'Resting heals 5% more of your max HP per level.', mods: { restHeal: 0.05 } },
];

// Embers earned when a run ends.
Game.LANTERN_EMBERS = { perFight: 1, perBoss: 4, winBonus: 10 };
