// GROUP SCALING DATA
// When a fight has several enemies, each one is weaker so the crowd is not
// a wall of full-strength monsters. Key = number of enemies at the start.
//   hp    multiplier on every enemy's max HP
//   dmg   multiplier on every enemy's attack damage and block gain
// Bosses (map node type 'boss') get an extra multiplier on top of this table (and on top of the difficulty
// mode, data/difficultyData.js): much more HP and harder hits. Elites and normal enemies are not touched.
Game.BOSS_SCALING = { hp: 1.6, dmg: 1.3 };
// A lone enemy (or boss) is always full strength. Tune here, nothing else changes.
Game.ENCOUNTER_SCALING = {
  1: { hp: 1,    dmg: 1 },
  2: { hp: 0.8,  dmg: 0.8 },
  3: { hp: 0.7,  dmg: 0.7 },
  4: { hp: 0.6,  dmg: 0.6 },
};

// LEVEL SCALING (kupka, 2026-11-23: "enemies on the second map much harder"). Every enemy on map N (levelIndex) gets
// these multipliers on top of group scaling, boss scaling and the difficulty mode. Map 1 is unchanged.
// Before: all maps 1 / 1. Rules: js/combat/levelScaling.js.
Game.LEVEL_SCALING = [
  { hp: 1,    dmg: 1 },      // The Root Cellar
  { hp: 1.55, dmg: 1.4 },    // The Drowned Halls
  { hp: 1.9,  dmg: 1.65 },   // The Ember Vault (kept above map 2 so the climb continues)
];
