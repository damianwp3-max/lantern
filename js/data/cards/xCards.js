// X CARDS: they spend ALL your remaining energy, and their effects happen X times (pierce: 'x').
// Balance pass 2026-11-23: numbers trimmed a little (kupka: "nerf the newest cards a bit").
// The cost gem shows X. "cost: 1" below is only used by upgrades and prices; it is never paid.
// The rule is in the side panel (data/piercingsData.js).
Game.registerCards({
  whirling_lantern: {
    name: 'Whirling Lantern', cost: 1, type: 'attack', target: 'all', pierce: 'x',
    text: 'Deal 3 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 3 }],
    art: { motif: 'wave', color: '#ffb347' },
  },
  sunbeam: {
    name: 'Sunbeam', cost: 1, type: 'attack', target: 'enemy', pierce: 'x',
    text: 'Deal 6 damage.',
    effects: [{ type: 'damage', amount: 6 }],
    art: { motif: 'beam', color: '#ffe066' },
  },
  bonfire: {
    name: 'Bonfire', cost: 1, type: 'power', target: 'self', pierce: 'x',
    text: 'Gain 1 strength for this fight.',
    effects: [{ type: 'strength', amount: 1 }],
    art: { motif: 'flame', color: '#ff9a3c' },
  },
  rolling_fortress: {
    name: 'Rolling Fortress', cost: 1, type: 'defense', target: 'self', pierce: 'x',
    text: 'Gain 4 block.',
    effects: [{ type: 'block', amount: 4 }],
    art: { motif: 'ring', color: '#6f9be0' },
  },
  venom_rain: {
    name: 'Venom Rain', cost: 1, type: 'skill', target: 'all', pierce: 'x',
    text: 'Apply 2 Poison to ALL enemies.',
    effects: [{ type: 'status', status: 'poison', amount: 2 }],
    art: { motif: 'rain', color: '#6fd45a' },
  },
  wick_barrage: {
    name: 'Wick Barrage', cost: 1, type: 'attack', target: 'random', pierce: 'x',
    text: 'Deal 4 damage to a random enemy.',
    effects: [{ type: 'damage', amount: 4 }],
    art: { motif: 'sparks', color: '#ffd35a' },
  },
  dawn_ritual: {
    name: 'Dawn Ritual', cost: 1, type: 'skill', target: 'self', pierce: 'x',
    text: 'Draw 1 card.',
    effects: [{ type: 'draw', amount: 1 }],
    art: { motif: 'draw', color: '#ffe9b8' },
  },
  piercing_light: {
    name: 'Piercing Light', cost: 1, type: 'attack', target: 'enemy', pierce: 'x',
    text: 'Deal 5 damage. Apply 1 Weak.',
    effects: [{ type: 'damage', amount: 5 }, { type: 'status', status: 'weak', amount: 1 }],
    art: { motif: 'eye', color: '#ffe066' },
  },
  blazing_charge: {
    name: 'Blazing Charge', cost: 1, type: 'hybrid', target: 'enemy', pierce: 'x',
    text: 'Deal 3 damage. Gain 3 block.',
    effects: [{ type: 'damage', amount: 3 }, { type: 'block', amount: 3, target: 'self' }],
    art: { motif: 'bash', color: '#ffb347' },
  },
});
