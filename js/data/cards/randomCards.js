// RANDOM CARDS: random damage rolls, random targets, random cards, random outcomes.
//   { type: 'damage', amount: 3, max: 12 }  rolls 3..12
//   { type: 'addRandomCard', amount: 1, cardType: 'attack' }
//   { type: 'randomOf', options: [[...effects], [...effects]] }  one list at random
Game.registerCards({
  lucky_spark: {
    name: 'Lucky Spark', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 3 to 13 damage (random).',
    effects: [{ type: 'damage', amount: 3, max: 13 }],
    art: { motif: 'dice', color: '#ffd35a' },
  },
  grab_bag: {
    name: 'Grab Bag', cost: 1, type: 'skill', target: 'self',
    text: 'Add 2 random cards to your hand.',
    effects: [{ type: 'addRandomCard', amount: 2 }],
    art: { motif: 'bag', color: '#c9b98f' },
  },
  pocket_knife: {
    name: 'Pocket Knife', cost: 0, type: 'skill', target: 'self', exhaust: true,
    text: 'Add a random Attack to your hand. Exhaust.',
    effects: [{ type: 'addRandomCard', amount: 1, cardType: 'attack' }],
    art: { motif: 'slash', color: '#d0d8e0' },
  },
  coin_toss: {
    name: 'Coin Toss', cost: 1, type: 'skill', target: 'self',
    text: 'Heads: gain 2 energy. Tails: draw 3 cards.',
    effects: [{ type: 'randomOf', options: [[{ type: 'energy', amount: 2 }], [{ type: 'draw', amount: 3 }]] }],
    art: { motif: 'coin', color: '#e0b83e' },
  },
  wild_lantern: {
    name: 'Wild Lantern', cost: 2, type: 'attack', target: 'self',
    text: 'Random: 20 damage to a random enemy, OR 8 to ALL enemies, OR 15 block.',
    effects: [{ type: 'randomOf', options: [
      [{ type: 'damage', amount: 20, target: 'random' }],
      [{ type: 'damage', amount: 8, target: 'all' }],
      [{ type: 'block', amount: 15 }],
    ] }],
    art: { motif: 'dice', color: '#ff7a3a' },
  },
  ricochet: {
    name: 'Ricochet', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 6 damage. Then deal 6 damage to a random enemy.',
    effects: [{ type: 'damage', amount: 6 }, { type: 'damage', amount: 6, target: 'random' }],
    art: { motif: 'chain', color: '#ffb347' },
  },
  fortune_moth: {
    name: 'Fortune Moth', cost: 1, type: 'defense', target: 'self',
    text: 'Gain 3 to 12 block (random).',
    effects: [{ type: 'block', amount: 3, max: 12 }],
    art: { motif: 'moth', color: '#c8d8ff' },
  },
  strange_brew: {
    name: 'Strange Brew', cost: 1, type: 'skill', target: 'all',
    text: 'One at random to ALL enemies: 4 Poison, OR 2 Weak, OR 2 Vulnerable.',
    effects: [{ type: 'randomOf', options: [
      [{ type: 'status', status: 'poison', amount: 4 }],
      [{ type: 'status', status: 'weak', amount: 2 }],
      [{ type: 'status', status: 'vulnerable', amount: 2 }],
    ] }],
    art: { motif: 'vial', color: '#8fd45a' },
  },
  cartomancy: {
    name: 'Cartomancy', cost: 1, type: 'skill', target: 'self', exhaust: true,
    text: 'Add a random Power to your hand. Draw 1 card. Exhaust.',
    effects: [{ type: 'addRandomCard', amount: 1, cardType: 'power' }, { type: 'draw', amount: 1 }],
    art: { motif: 'eye', color: '#c08aff' },
  },
  chaos_spark: {
    name: 'Chaos Spark', cost: 0, type: 'attack', target: 'random',
    text: 'Deal 3 damage to a random enemy. Draw 1 card.',
    effects: [{ type: 'damage', amount: 3 }, { type: 'draw', amount: 1, target: 'self' }],
    art: { motif: 'sparks', color: '#ff8af0' },
  },
  roll_the_bones: {
    name: 'Roll the Bones', cost: 0, type: 'skill', target: 'self',
    text: 'Gain 0 to 3 energy (random). Exhaust.', exhaust: true,
    effects: [{ type: 'energy', amount: 0, max: 3 }],
    art: { motif: 'dice', color: '#e8e0d0' },
  },
});
