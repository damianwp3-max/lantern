// ENEMY DATA
// Each enemy has hp and a list of moves. The AI (combat/enemyAI.js, settings in
// data/enemyAIData.js) picks the next move by its ROLE, walking a rhythm of
//   debuff -> attack -> block -> attack ...   with a rare buff now and then,
// so enemies curse you, hit you and defend instead of attacking every turn.
// The next move is shown to the player as the enemy's intent.
// Move types: attack (deal value damage), block (gain value block),
//   debuff (only a status on you), addCard (junk cards into your discard pile, counts as a debuff),
//   buff (the enemy gains a buff: buff: 'might', amount; allies: true = every enemy).
// Extras on any move: hits (attack N times), status + amount (on you), selfBlock.
// Optional per enemy: rhythm: [...roles], fixedStart: true (always opens with the first step),
//   ai: 'cycle' (just loop through the moves in order).
// Icons and hover text: data/intentsData.js.
// look: art (SVG drawing in js/ui/enemyArt/*.js), idle (motion, css/enemyArt.css), color, size (1 = normal, bigger for bosses).
//   shape (old CSS shape in css/enemies.css) is only a fallback if the drawing is missing.
// Special traits and moves (Stoneskin, Thorns, Burrow, Steal, ...): data/enemyTraitsData.js. More enemies: data/enemiesMoreData.js.
Game.ENEMIES = {
  // ---------- Level 1: The Root Cellar ----------
  cellar_rat:   { name: 'Cellar Rat',   hp: 20, look: { art: 'cellar_rat', shape: 'rat', idle: 'scurry', color: '#7a6a5a', size: 1 },
    moves: [{ type: 'attack', value: 7 }, { type: 'attack', value: 3, hits: 2 },
            { type: 'debuff', status: 'weak', amount: 1, selfBlock: 3 }, { type: 'block', value: 6 },
            { type: 'buff', buff: 'might', amount: 1 }] },
  mold_heap:    { name: 'Mold Heap',    hp: 29, look: { art: 'mold_heap', shape: 'blob', idle: 'wobble', color: '#5f7f3a', size: 1 },
    moves: [{ type: 'attack', value: 8 }, { type: 'block', value: 7 },
            { type: 'addCard', value: 2, card: 'spore_clump' }, { type: 'debuff', status: 'frail', amount: 2 }] },
  cave_moth:    { name: 'Cave Moth',    hp: 17, look: { art: 'cave_moth', shape: 'imp', idle: 'hop', color: '#9a8a6a', size: 0.9 },
    moves: [{ type: 'attack', value: 3, hits: 3 }, { type: 'debuff', status: 'vulnerable', amount: 1, selfBlock: 4 },
            { type: 'block', value: 5 }] },
  lamp_leech:   { name: 'Lamp Leech',   hp: 24, look: { art: 'lamp_leech', shape: 'long', idle: 'swim', color: '#7a4a5a', size: 1 },
    moves: [{ type: 'attack', value: 9 }, { type: 'debuff', status: 'poison', amount: 3 },
            { type: 'block', value: 6, status: 'weak', amount: 1 }, { type: 'buff', buff: 'might', amount: 2 }] },
  root_warden:  { name: 'Root Warden',  hp: 92, fixedStart: true, look: { art: 'root_warden', shape: 'tall', idle: 'sway', color: '#6b4a2a', size: 1.5 },
    moves: [{ type: 'debuff', status: 'weak', amount: 2, selfBlock: 8 }, { type: 'attack', value: 13 },
            { type: 'block', value: 12, status: 'frail', amount: 1 }, { type: 'attack', value: 4, hits: 3 },
            { type: 'addCard', value: 2, card: 'spore_clump' }, { type: 'buff', buff: 'might', amount: 2 }] },

  // ---------- Level 2: The Drowned Halls ----------
  silt_crab:    { name: 'Silt Crab',    hp: 34, look: { art: 'silt_crab', shape: 'crab', idle: 'shuffle', color: '#6a5a7a', size: 1 },
    moves: [{ type: 'block', value: 10 }, { type: 'attack', value: 11 },
            { type: 'attack', value: 5, hits: 2 }, { type: 'debuff', status: 'vulnerable', amount: 2 }] },
  pale_eel:     { name: 'Pale Eel',     hp: 27, look: { art: 'pale_eel', shape: 'long', idle: 'swim', color: '#8aa0b0', size: 1 },
    moves: [{ type: 'attack', value: 10 }, { type: 'attack', value: 4, hits: 2, status: 'weak', amount: 1 },
            { type: 'debuff', status: 'frail', amount: 2, selfBlock: 5 }, { type: 'block', value: 8 },
            { type: 'buff', buff: 'might', amount: 2 }] },
  drowned_acolyte: { name: 'Drowned Acolyte', hp: 32, look: { art: 'drowned_acolyte', shape: 'tall', idle: 'sway', color: '#4a6a78', size: 0.95 },
    moves: [{ type: 'debuff', status: 'weak', amount: 2 }, { type: 'attack', value: 9 },
            { type: 'block', value: 9 }, { type: 'buff', buff: 'might', amount: 1, allies: true }] },
  barnacle_mass: { name: 'Barnacle Mass', hp: 44, look: { art: 'barnacle_mass', shape: 'blob', idle: 'wobble', color: '#5a7a6a', size: 1.1 },
    moves: [{ type: 'block', value: 13 }, { type: 'attack', value: 14 },
            { type: 'addCard', value: 2, card: 'spore_clump', selfBlock: 6 }] },
  tide_bell:    { name: 'Tide Bell',    hp: 118, fixedStart: true, look: { art: 'tide_bell', shape: 'bell', idle: 'swing', color: '#3a6a8a', size: 1.5 },
    moves: [{ type: 'debuff', status: 'vulnerable', amount: 2, selfBlock: 14 }, { type: 'attack', value: 16 },
            { type: 'block', value: 16, status: 'weak', amount: 1 }, { type: 'attack', value: 5, hits: 3, status: 'frail', amount: 1 },
            { type: 'buff', buff: 'might', amount: 3 }] },

  // ---------- Level 3: The Ember Vault ----------
  cinder_imp:   { name: 'Cinder Imp',   hp: 31, look: { art: 'cinder_imp', shape: 'imp', idle: 'hop', color: '#a8401f', size: 1 },
    moves: [{ type: 'attack', value: 11 }, { type: 'attack', value: 4, hits: 2, status: 'poison', amount: 2 },
            { type: 'debuff', status: 'poison', amount: 4 }, { type: 'block', value: 8 },
            { type: 'buff', buff: 'might', amount: 2 }] },
  slag_golem:   { name: 'Slag Golem',   hp: 56, look: { art: 'slag_golem', shape: 'block', idle: 'heavy', color: '#555058', size: 1.1 },
    moves: [{ type: 'block', value: 13 }, { type: 'attack', value: 15, status: 'frail', amount: 1 },
            { type: 'attack', value: 7, hits: 2 }, { type: 'debuff', status: 'vulnerable', amount: 2, selfBlock: 6 }] },
  ash_hound:    { name: 'Ash Hound',    hp: 36, look: { art: 'ash_hound', shape: 'rat', idle: 'scurry', color: '#6a3a2a', size: 1.1 },
    moves: [{ type: 'attack', value: 6, hits: 2 }, { type: 'attack', value: 13 },
            { type: 'debuff', status: 'weak', amount: 2, selfBlock: 5 }, { type: 'block', value: 9 },
            { type: 'buff', buff: 'might', amount: 2 }] },
  forge_wisp:   { name: 'Forge Wisp',   hp: 30, look: { art: 'forge_wisp', shape: 'bell', idle: 'swing', color: '#d0801f', size: 0.9 },
    moves: [{ type: 'debuff', status: 'frail', amount: 2 }, { type: 'attack', value: 10, status: 'poison', amount: 2 },
            { type: 'block', value: 10 }, { type: 'buff', buff: 'might', amount: 1, allies: true }] },
  vault_keeper: { name: 'Vault Keeper', hp: 150, fixedStart: true, look: { art: 'vault_keeper', shape: 'tall', idle: 'sway', color: '#b0701f', size: 1.6 },
    moves: [{ type: 'debuff', status: 'weak', amount: 2, selfBlock: 14 }, { type: 'attack', value: 19 },
            { type: 'block', value: 18, status: 'frail', amount: 2 }, { type: 'attack', value: 7, hits: 3 },
            { type: 'addCard', value: 3, card: 'spore_clump' }, { type: 'buff', buff: 'might', amount: 3 }] },
};
