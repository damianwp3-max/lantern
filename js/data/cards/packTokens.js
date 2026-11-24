// PACK TOKENS: the small free cards that packs (data/cards/packCards.js) put in your
// deck for one fight. All are cost 0, weak and One-time; they never join rewards.
// token: true = made during a fight only (the card library shows them under packs).
Game.registerCards({
  throwing_dagger: {
    name: 'Throwing Dagger', cost: 0, type: 'attack', target: 'enemy', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Deal 3 damage. Exhaust.',
    effects: [{ type: 'damage', amount: 3 }],
  },
  hatchet: {
    name: 'Hatchet', cost: 0, type: 'attack', target: 'enemy', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Deal 5 damage. Exhaust.',
    effects: [{ type: 'damage', amount: 5 }],
  },
  tin_buckler: {
    name: 'Tin Buckler', cost: 0, type: 'defense', target: 'self', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Gain 3 block. Exhaust.',
    effects: [{ type: 'block', amount: 3 }],
  },
  venom_needle: {
    name: 'Venom Needle', cost: 0, type: 'attack', target: 'enemy', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Apply 2 Poison. Exhaust.',
    effects: [{ type: 'status', status: 'poison', amount: 2 }],
  },
  spark_flick: {
    name: 'Spark Flick', cost: 0, type: 'attack', target: 'all', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Deal 2 damage to ALL enemies. Exhaust.',
    effects: [{ type: 'damage', amount: 2 }],
  },
  caltrop: {
    name: 'Caltrop', cost: 0, type: 'attack', target: 'random', exhaust: true, oneTime: true, token: true, reward: false,
    text: 'Deal 3 damage to a random enemy. Exhaust.',
    effects: [{ type: 'damage', amount: 3 }],
  },
  lucky_dagger: {
    name: 'Lucky Dagger', cost: 0, type: 'attack', target: 'enemy', exhaust: true, oneTime: true, token: true, reward: false, pierce: 'lucky',
    text: 'Deal 3 damage. Exhaust.',
    effects: [{ type: 'damage', amount: 3 }],
  },
});
