// STATUS AND TRICK CARDS: poison, weak, vulnerable, healing, HP costs, block tricks.
// Status rules: combat/statuses.js. Names and icons: data/statusesData.js.
Game.registerCards({
  venom_dart: {
    name: 'Venom Dart', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 3 damage. Apply 4 Poison.',
    effects: [{ type: 'damage', amount: 3 }, { type: 'status', status: 'poison', amount: 4 }],
    art: { motif: 'droplet', color: '#6fd45a' },
  },
  fester: {
    name: 'Fester', cost: 1, type: 'skill', target: 'enemy',
    text: 'Double the Poison on an enemy.',
    effects: [{ type: 'multiplyStatus', status: 'poison', factor: 2 }],
    art: { motif: 'droplet', color: '#b0e040' },
  },
  crippling_hook: {
    name: 'Crippling Hook', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 7 damage. Apply 2 Weak.',
    effects: [{ type: 'damage', amount: 7 }, { type: 'status', status: 'weak', amount: 2 }],
    art: { motif: 'lash', color: '#c9b98f' },
  },
  expose: {
    name: 'Expose', cost: 0, type: 'skill', target: 'enemy',
    text: 'Apply 2 Vulnerable.',
    effects: [{ type: 'status', status: 'vulnerable', amount: 2 }],
    art: { motif: 'crack', color: '#ff8a6a' },
  },
  lantern_slam: {
    name: 'Lantern Slam', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal damage equal to your block.',
    effects: [{ type: 'damageFromBlock' }],
    art: { motif: 'bash', color: '#6f9be0' },
  },
  field_dressing: {
    name: 'Field Dressing', cost: 1, type: 'skill', target: 'self', exhaust: true,
    text: 'Heal 7 HP. Exhaust.',
    effects: [{ type: 'heal', amount: 7 }],
    art: { motif: 'heart', color: '#ff6a7a' },
  },
  blood_wick: {
    name: 'Blood Wick', cost: 0, type: 'skill', target: 'self',
    text: 'Lose 3 HP. Gain 2 energy.',
    effects: [{ type: 'loseHp', amount: 3 }, { type: 'energy', amount: 2 }],
    art: { motif: 'flame', color: '#d2453b' },
  },
  reinforce: {
    name: 'Reinforce', cost: 1, type: 'defense', target: 'self',
    text: 'Double your block.',
    effects: [{ type: 'doubleBlock' }],
    art: { motif: 'shield', color: '#9ab8ff' },
  },
  overburn: {
    name: 'Overburn', cost: 2, type: 'attack', target: 'enemy',
    text: 'Deal 22 damage. Lose 4 HP.',
    effects: [{ type: 'damage', amount: 22 }, { type: 'loseHp', amount: 4, target: 'self' }],
    art: { motif: 'burst', color: '#ff4a2a' },
  },
  mirror_ward: {
    name: 'Mirror Ward', cost: 2, type: 'defense', target: 'all',
    text: 'Gain 9 block. Apply 1 Weak to ALL enemies.',
    effects: [{ type: 'block', amount: 9, target: 'self' }, { type: 'status', status: 'weak', amount: 1 }],
    art: { motif: 'mirror', color: '#bfe0ff' },
  },
  patch_guard: {
    name: 'Patch Guard', cost: 0, type: 'defense', target: 'self',
    text: 'Gain 2 block. Draw 1 card.',
    effects: [{ type: 'block', amount: 2 }, { type: 'draw', amount: 1 }],
    art: { motif: 'shield', color: '#8fb0d8' },
  },
  coal_eater: {
    name: 'Coal Eater', cost: 1, type: 'skill', target: 'self', exhaust: true,
    text: 'Lose 3 HP. Gain 2 strength. Exhaust.',
    effects: [{ type: 'loseHp', amount: 3 }, { type: 'strength', amount: 2 }],
    art: { motif: 'emberHeart', color: '#ff7a3a' },
  },
});
