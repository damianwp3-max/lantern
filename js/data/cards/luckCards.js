// LUCK CARDS: cards that carry a luck piercing from the start (pierce: 'lucky' | 'unlucky' | 'joker').
// Balance pass 2026-11-23: numbers trimmed a little (kupka: "nerf the newest cards a bit").
// The rule is NOT in the description: the card shows a badge and the rule is in the side panel on hover
// (data/piercingsData.js). The innate piercing's flags are applied by core/cardRegistry.js.
//   lucky   20% chance to play twice      unlucky   20% chance to do nothing
//   joker   50% nothing, 50% twice (so give it a strong effect)
Game.registerCards({
  lucky_coin: {
    name: 'Lucky Coin', cost: 1, type: 'attack', target: 'enemy', pierce: 'lucky',
    text: 'Deal 7 damage.',
    effects: [{ type: 'damage', amount: 7 }],
    art: { motif: 'coin', color: '#ffd35a' },
  },
  gamblers_dagger: {
    name: "Gambler's Dagger", cost: 1, type: 'attack', target: 'enemy', pierce: 'unlucky',
    text: 'Deal 11 damage.',
    effects: [{ type: 'damage', amount: 11 }],
    art: { motif: 'slash', color: '#c07ad0' },
  },
  loaded_dice: {
    name: 'Loaded Dice', cost: 1, type: 'skill', target: 'self', pierce: 'lucky',
    text: 'Draw 2 cards.',
    effects: [{ type: 'draw', amount: 2 }],
    art: { motif: 'dice', color: '#7fe08a' },
  },
  jinxed_lantern: {
    name: 'Jinxed Lantern', cost: 1, type: 'attack', target: 'enemy', pierce: 'unlucky',
    text: 'Deal 14 damage.',
    effects: [{ type: 'damage', amount: 14 }],
    art: { motif: 'burst', color: '#9a7ad0' },
  },
  wild_card: {
    name: 'Wild Card', cost: 1, type: 'attack', target: 'enemy', pierce: 'joker',
    text: 'Deal 8 damage.',
    effects: [{ type: 'damage', amount: 8 }],
    art: { motif: 'crown', color: '#e05a9a' },
  },
  high_roller: {
    name: 'High Roller', cost: 1, type: 'defense', target: 'self', pierce: 'joker',
    text: 'Gain 10 block.',
    effects: [{ type: 'block', amount: 10 }],
    art: { motif: 'shield', color: '#e05a9a' },
  },
  fortune_wick: {
    name: 'Fortune Wick', cost: 1, type: 'defense', target: 'self', pierce: 'lucky',
    text: 'Gain 6 block.',
    effects: [{ type: 'block', amount: 6 }],
    art: { motif: 'cloak', color: '#6fcf7a' },
  },
  cracked_mirror: {
    name: 'Cracked Mirror', cost: 0, type: 'skill', target: 'enemy', pierce: 'joker',
    text: 'Apply 2 Vulnerable.',
    effects: [{ type: 'status', status: 'vulnerable', amount: 2 }],
    art: { motif: 'mirror', color: '#e05a9a' },
  },
  rabbits_foot: {
    name: "Rabbit's Foot", cost: 1, type: 'hybrid', target: 'enemy', pierce: 'lucky',
    text: 'Deal 4 damage. Gain 4 block.',
    effects: [{ type: 'damage', amount: 4 }, { type: 'block', amount: 4, target: 'self' }],
    art: { motif: 'bash', color: '#a8e08a' },
  },
  snake_eyes: {
    name: 'Snake Eyes', cost: 2, type: 'attack', target: 'all', pierce: 'joker',
    text: 'Deal 11 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 11 }],
    art: { motif: 'wave', color: '#e05a9a' },
  },
  lucky_streak: {
    name: 'Lucky Streak', cost: 1, type: 'power', target: 'self', pierce: 'lucky',
    text: 'Gain 2 strength for this fight.',
    effects: [{ type: 'strength', amount: 2 }],
    art: { motif: 'flame', color: '#6fcf7a' },
  },
  black_cat: {
    name: 'Black Cat', cost: 1, type: 'skill', target: 'self', pierce: 'unlucky',
    text: 'Gain 1 energy. Draw 2 cards.',
    effects: [{ type: 'energy', amount: 1 }, { type: 'draw', amount: 2 }],
    art: { motif: 'moon', color: '#9a7ad0' },
  },
});
