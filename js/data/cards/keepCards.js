// KEEPING CARDS: Collector cards stay in your hand if you do not play them (pierce: 'collector'),
// Balance pass 2026-11-23: numbers trimmed a little (kupka: "nerf the newest cards a bit").
// Single-use cards work once per fight (pierce: 'single', they Exhaust).
// Rules are in the side panel (data/piercingsData.js), not in the description.
Game.registerCards({
  // --- collector ---
  heirloom_lantern: {
    name: 'Heirloom Lantern', cost: 2, type: 'defense', target: 'self', pierce: 'collector',
    text: 'Gain 12 block.',
    effects: [{ type: 'block', amount: 12 }],
    art: { motif: 'cloak', color: '#5ab8d8' },
  },
  hoarded_strike: {
    name: 'Hoarded Strike', cost: 2, type: 'attack', target: 'enemy', pierce: 'collector',
    text: 'Deal 13 damage.',
    effects: [{ type: 'damage', amount: 13 }],
    art: { motif: 'burst', color: '#5ab8d8' },
  },
  pocket_watch: {
    name: 'Pocket Watch', cost: 0, type: 'skill', target: 'self', pierce: 'collector',
    text: 'Draw 1 card.',
    effects: [{ type: 'draw', amount: 1 }],
    art: { motif: 'hourglass', color: '#5ab8d8' },
  },
  patient_blade: {
    name: 'Patient Blade', cost: 1, type: 'attack', target: 'enemy', pierce: 'collector',
    text: 'Deal 7 damage.',
    effects: [{ type: 'damage', amount: 7 }],
    art: { motif: 'slash', color: '#7ad0e8' },
  },
  stored_spark: {
    name: 'Stored Spark', cost: 1, type: 'skill', target: 'self', pierce: 'collector',
    text: 'Gain 2 energy.',
    effects: [{ type: 'energy', amount: 2 }],
    art: { motif: 'energy', color: '#5ab8d8' },
  },
  family_shield: {
    name: 'Family Shield', cost: 1, type: 'defense', target: 'self', pierce: 'collector',
    text: 'Gain 6 block.',
    effects: [{ type: 'block', amount: 6 }],
    art: { motif: 'shield', color: '#5ab8d8' },
  },
  // --- single-use ---
  last_flare: {
    name: 'Last Flare', cost: 0, type: 'attack', target: 'enemy', pierce: 'single',
    text: 'Deal 13 damage.',
    effects: [{ type: 'damage', amount: 13 }],
    art: { motif: 'nova', color: '#d8884a' },
  },
  emergency_ward: {
    name: 'Emergency Ward', cost: 0, type: 'defense', target: 'self', pierce: 'single',
    text: 'Gain 11 block.',
    effects: [{ type: 'block', amount: 11 }],
    art: { motif: 'shield', color: '#d8884a' },
  },
  flash_powder: {
    name: 'Flash Powder', cost: 1, type: 'skill', target: 'all', pierce: 'single',
    text: 'Apply 2 Weak and 2 Vulnerable to ALL enemies.',
    effects: [{ type: 'status', status: 'weak', amount: 2 }, { type: 'status', status: 'vulnerable', amount: 2 }],
    art: { motif: 'burst', color: '#e8d8a0' },
  },
  burn_the_map: {
    name: 'Burn the Map', cost: 2, type: 'attack', target: 'enemy', pierce: 'single',
    text: 'Deal 26 damage.',
    effects: [{ type: 'damage', amount: 26 }],
    art: { motif: 'flame', color: '#ff7a3a' },
  },
  second_lantern: {
    name: 'Second Lantern', cost: 0, type: 'skill', target: 'self', pierce: 'single',
    text: 'Gain 1 energy. Draw 2 cards.',
    effects: [{ type: 'energy', amount: 1 }, { type: 'draw', amount: 2 }],
    art: { motif: 'energyDraw', color: '#ffd35a' },
  },
  venom_vial: {
    name: 'Venom Vial', cost: 1, type: 'skill', target: 'enemy', pierce: 'single',
    text: 'Apply 9 Poison.',
    effects: [{ type: 'status', status: 'poison', amount: 9 }],
    art: { motif: 'vial', color: '#6fd45a' },
  },
});
