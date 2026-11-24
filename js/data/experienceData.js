// EXPERIENCE (data only)
// Winning a fight gives explorer experience (kept across runs, js/state/progress.js).
// Every `perLevel` points = one explorer level = one unlocked card set (data/unlocksData.js).
// Tuned so one full map (12 floors with its boss, ~5 fights + ~2 elites on an
// average path) gives about 1.24 levels (perLevel 125).
//   xp: points per won fight, by map node type (anything else uses `fight`)
Game.EXPERIENCE = {
  perLevel: 125,   // was 100: levels come 25% slower
  xp: { fight: 12, elite: 22, boss: 60 },
};
