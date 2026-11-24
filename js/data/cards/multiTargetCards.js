// MULTI-TARGET CARDS: hit every enemy, or several random ones.
// target: 'all' needs no aiming (drag up or click to play). An effect can
// override the card's target, e.g. hit the aimed enemy, then splash ALL.
Game.registerCards({
  ember_sweep: {
    name: 'Ember Sweep', cost: 1, type: 'attack', target: 'all',
    text: 'Deal 5 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 5 }],
    art: { motif: 'wave', color: '#ff8a3a' },
  },
  lantern_flare: {
    name: 'Lantern Flare', cost: 2, type: 'attack', target: 'all',
    text: 'Deal 8 damage to ALL enemies. Apply 1 Weak to ALL.',
    effects: [{ type: 'damage', amount: 8 }, { type: 'status', status: 'weak', amount: 1 }],
    art: { motif: 'nova', color: '#ffe08a' },
  },
  ashfall: {
    name: 'Ashfall', cost: 2, type: 'attack', target: 'all',
    text: 'Deal 4 damage to ALL enemies twice.',
    effects: [{ type: 'damage', amount: 4, hits: 2 }],
    art: { motif: 'rain', color: '#b0a8a0' },
  },
  chain_spark: {
    name: 'Chain Spark', cost: 1, type: 'attack', target: 'enemy',
    text: 'Deal 6 damage. Then deal 3 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 6 }, { type: 'damage', amount: 3, target: 'all' }],
    art: { motif: 'chain', color: '#8ad0ff' },
  },
  smoke_screen: {
    name: 'Smoke Screen', cost: 1, type: 'skill', target: 'all',
    text: 'Apply 2 Weak to ALL enemies.',
    effects: [{ type: 'status', status: 'weak', amount: 2 }],
    art: { motif: 'cloak', color: '#a8a0b8' },
  },
  shattered_glass: {
    name: 'Shattered Glass', cost: 1, type: 'skill', target: 'all',
    text: 'Apply 2 Vulnerable to ALL enemies.',
    effects: [{ type: 'status', status: 'vulnerable', amount: 2 }],
    art: { motif: 'crack', color: '#9fe0ff' },
  },
  wildfire: {
    name: 'Wildfire', cost: 3, type: 'attack', target: 'all',
    text: 'Deal 14 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 14 }],
    art: { motif: 'wave', color: '#ff4a2a' },
  },
  ring_of_cinders: {
    name: 'Ring of Cinders', cost: 2, type: 'defense', target: 'all',
    text: 'Gain 8 block. Deal 4 damage to ALL enemies.',
    effects: [{ type: 'block', amount: 8, target: 'self' }, { type: 'damage', amount: 4 }],
    art: { motif: 'ring', color: '#ff9a3c' },
  },
  spore_cloud: {
    name: 'Spore Cloud', cost: 1, type: 'skill', target: 'all',
    text: 'Apply 3 Poison to ALL enemies.',
    effects: [{ type: 'status', status: 'poison', amount: 3 }],
    art: { motif: 'spores', color: '#8fd45a' },
  },
  flood_lamp: {
    name: 'Flood Lamp', cost: 0, type: 'attack', target: 'all',
    text: 'Deal 2 damage to ALL enemies. Draw 1 card.',
    effects: [{ type: 'damage', amount: 2 }, { type: 'draw', amount: 1, target: 'self' }],
    art: { motif: 'beam', color: '#fff0a0' },
  },
  scattershot: {
    name: 'Scattershot', cost: 1, type: 'attack', target: 'random',
    text: 'Deal 3 damage to a random enemy 4 times.',
    effects: [{ type: 'damage', amount: 3, hits: 4 }],
    art: { motif: 'rain', color: '#ffd35a' },
  },
});
