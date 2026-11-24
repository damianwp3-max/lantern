// DELAYED CARDS: something happens at the start of your NEXT turn.
// { type: 'nextTurn', effects: [...] } (rules in combat/delayed.js).
// A delayed hit on 'enemy' remembers the enemy you aimed at.
Game.registerCards({
  slow_fuse: {
    name: 'Slow Fuse', cost: 1, type: 'attack', target: 'enemy',
    text: 'Next turn, deal 15 damage to this enemy.',
    effects: [{ type: 'nextTurn', effects: [{ type: 'damage', amount: 15 }] }],
    art: { motif: 'fuse', color: '#ff7a3a' },
  },
  banked_embers: {
    name: 'Banked Embers', cost: 1, type: 'skill', target: 'self',
    text: 'Next turn, gain 2 energy.',
    effects: [{ type: 'nextTurn', effects: [{ type: 'energy', amount: 2 }] }],
    art: { motif: 'hourglass', color: '#7fd6c2' },
  },
  night_watch: {
    name: 'Night Watch', cost: 1, type: 'defense', target: 'self',
    text: 'Gain 4 block. Next turn, gain 8 block.',
    effects: [{ type: 'block', amount: 4 }, { type: 'nextTurn', effects: [{ type: 'block', amount: 8 }] }],
    art: { motif: 'moon', color: '#9ab8ff' },
  },
  folded_map: {
    name: 'Folded Map', cost: 1, type: 'skill', target: 'self',
    text: 'Next turn, draw 3 extra cards.',
    effects: [{ type: 'nextTurn', effects: [{ type: 'draw', amount: 3 }] }],
    art: { motif: 'draw', color: '#e0c88a' },
  },
  powder_keg: {
    name: 'Powder Keg', cost: 2, type: 'attack', target: 'all',
    text: 'Next turn, deal 16 damage to ALL enemies.',
    effects: [{ type: 'nextTurn', effects: [{ type: 'damage', amount: 16 }] }],
    art: { motif: 'keg', color: '#ff5a3a' },
  },
  deep_breath: {
    name: 'Deep Breath', cost: 1, type: 'skill', target: 'self',
    text: 'Heal 3 HP. Next turn, gain 1 energy and draw 1 card.',
    effects: [{ type: 'heal', amount: 3 }, { type: 'nextTurn', effects: [{ type: 'energy', amount: 1 }, { type: 'draw', amount: 1 }] }],
    art: { motif: 'heart', color: '#ff9ab0' },
  },
  echo_strike: {
    name: 'Echo Strike', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 6 damage. Next turn, deal 6 damage to it again.',
    effects: [{ type: 'damage', amount: 6 }, { type: 'nextTurn', effects: [{ type: 'damage', amount: 6 }] }],
    art: { motif: 'echo', color: '#e8a54b' },
  },
  long_vigil: {
    name: 'Long Vigil', cost: 2, type: 'defense', target: 'self',
    text: 'Gain 10 block. Next turn, gain 6 block.',
    effects: [{ type: 'block', amount: 10 }, { type: 'nextTurn', effects: [{ type: 'block', amount: 6 }] }],
    art: { motif: 'moon', color: '#6f9be0' },
  },
  seed_of_flame: {
    name: 'Seed of Flame', cost: 0, type: 'skill', target: 'self', exhaust: true,
    text: 'Next turn, gain 1 strength. Exhaust.',
    effects: [{ type: 'nextTurn', effects: [{ type: 'strength', amount: 1 }] }],
    art: { motif: 'seed', color: '#ff9a3c' },
  },
  midnight_oil: {
    name: 'Midnight Oil', cost: 0, type: 'skill', target: 'self',
    text: 'Gain 2 energy. Next turn, lose 1 energy. Exhaust.', exhaust: true,
    effects: [{ type: 'energy', amount: 2 }, { type: 'nextTurn', effects: [{ type: 'energy', amount: -1 }] }],
    art: { motif: 'vial', color: '#c08aff' },
  },
  creeping_rot: {
    name: 'Creeping Rot', cost: 1, type: 'skill', target: 'enemy',
    text: 'Apply 3 Poison. Next turn, apply 4 more.',
    effects: [{ type: 'status', status: 'poison', amount: 3 }, { type: 'nextTurn', effects: [{ type: 'status', status: 'poison', amount: 4 }] }],
    art: { motif: 'droplet', color: '#8fd45a' },
  },
});
