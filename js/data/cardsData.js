// CARD DATA
// Every card is plain data. To add a card, add one entry below.
// "type" is one of data/cardTypesData.js (attack, defense, skill, power, useless).
// Its "effects" list is read by combat/combat.js; each effect type has a
// handler in combat/effects.js (add a new type there, e.g. poison).
Game.CARDS = {
  // --- starter cards ---
  strike_lamp: {
    name: 'Lamp Strike', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 6 damage.',
    effects: [{ type: 'damage', amount: 6 }],
  },
  brace: {
    name: 'Brace', cost: 1, type: 'defense', target: 'self',
    text: 'Gain 5 block.',
    effects: [{ type: 'block', amount: 5 }],
  },
  rummage: {
    name: 'Rummage', cost: 1, type: 'skill', target: 'self',
    text: 'Draw 2 cards.',
    effects: [{ type: 'draw', amount: 2 }],
  },

  // --- reward cards (offered after fights) ---
  wick_lash: {
    name: 'Wick Lash', cost: 0, type: 'attack', target: 'enemy',
    text: 'Deal 4 damage.',
    effects: [{ type: 'damage', amount: 4 }],
  },
  heavy_lantern: {
    name: 'Heavy Lantern', cost: 2, type: 'attack', target: 'enemy',
    text: 'Deal 14 damage.',
    effects: [{ type: 'damage', amount: 14 }],
  },
  twin_sparks: {
    name: 'Twin Sparks', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 3 damage twice.',
    effects: [{ type: 'damage', amount: 3 }, { type: 'damage', amount: 3 }],
  },
  soot_cloak: {
    name: 'Soot Cloak', cost: 2, type: 'defense', target: 'self',
    text: 'Gain 12 block.',
    effects: [{ type: 'block', amount: 12 }],
  },
  shield_bash: {
    name: 'Shoulder Check', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 5 damage. Gain 3 block.',
    effects: [{ type: 'damage', amount: 5 }, { type: 'block', amount: 3 }],
  },
  second_wind: {
    name: 'Second Wind', cost: 0, type: 'skill', target: 'self',
    text: 'Gain 1 energy. Draw 1 card. Exhaust.', exhaust: true,
    effects: [{ type: 'energy', amount: 1 }, { type: 'draw', amount: 1 }],
  },
  lantern_nova: {
    name: 'Lantern Nova', cost: 3, type: 'attack', target: 'enemy',
    text: 'Deal 24 damage.',
    effects: [{ type: 'damage', amount: 24 }],
  },

  // --- powers: last the whole fight, then leave the fight ---
  kindle: {
    name: 'Kindle', cost: 1, type: 'power', target: 'self',
    text: 'Gain 2 strength for this fight.',
    effects: [{ type: 'strength', amount: 2 }],
  },
  ember_heart: {
    name: 'Ember Heart', cost: 2, type: 'power', target: 'self',
    text: 'Gain 4 strength for this fight.',
    effects: [{ type: 'strength', amount: 4 }],
  },

  // --- useless: junk that clogs your hand (enemies add these) ---
  spore_clump: {
    name: 'Spore Clump', cost: 0, type: 'useless', target: 'self', unplayable: true,
    text: 'Unplayable junk. It does nothing and only takes up room in your hand.',
    effects: [],
  },
};

// The basic deck EVERY hero starts with (card ids, duplicates allowed).
// Each hero adds one signature card to it (data/charactersData.js `signature`).
// Standard: 4 basic attacks, 4 basic defenses, 1 timed attack, 1 timed defense, 1 Rummage.
Game.STARTER_DECK = [
  'strike_lamp', 'strike_lamp', 'strike_lamp', 'strike_lamp',
  'brace', 'brace', 'brace', 'brace',
  'precise_cut',   // timed attack (Deal 3-9, a Lamp Strike variant), see data/cards/timedCards.js
  'steady_ward',   // timed defense (Gain 3-8 block, a Brace variant), see data/cards/timedCards.js
  'rummage',
];

// Cards that can show up as fight rewards.
Game.REWARD_POOL = [
  'wick_lash', 'heavy_lantern', 'twin_sparks', 'soot_cloak', 'shield_bash', 'second_wind',
  'lantern_nova', 'kindle', 'ember_heart',
];
