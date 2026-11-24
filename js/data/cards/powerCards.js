// POWER CARDS: last the whole fight. What each power does is data in
// data/powersData.js; the card only says which power to add.
// Playing the same power twice stacks it (it triggers twice).
Game.registerCards({
  lantern_ward: {
    name: 'Lantern Ward', cost: 1, type: 'power', target: 'self',
    text: 'At the start of each turn, gain 3 block.',
    effects: [{ type: 'power', power: 'lantern_ward' }],
    art: { motif: 'shield', color: '#ffd35a' },
  },
  ember_echo: {
    name: 'Ember Echo', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you play an Attack, deal 3 damage to a random enemy.',
    effects: [{ type: 'power', power: 'ember_echo' }],
    art: { motif: 'echo', color: '#ff8a3a' },
  },
  kiln_heart: {
    name: 'Kiln Heart', cost: 2, type: 'power', target: 'self',
    text: 'At the end of each turn, deal 5 damage to ALL enemies.',
    effects: [{ type: 'power', power: 'kiln_heart' }],
    art: { motif: 'ring', color: '#ff5a2a' },
  },
  rot_bloom: {
    name: 'Rot Bloom', cost: 2, type: 'power', target: 'self',
    text: 'At the start of each turn, apply 3 Poison to ALL enemies.',
    effects: [{ type: 'power', power: 'rot_bloom' }],
    art: { motif: 'spores', color: '#a0e050' },
  },
  moth_swarm: {
    name: 'Moth Swarm', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you play a Skill, gain 3 block.',
    effects: [{ type: 'power', power: 'moth_swarm' }],
    art: { motif: 'moth', color: '#e0d0ff' },
  },
  ashen_pact: {
    name: 'Ashen Pact', cost: 1, type: 'power', target: 'self',
    text: 'At the start of each turn, lose 1 HP, gain 1 energy and draw 1 card.',
    effects: [{ type: 'power', power: 'ashen_pact' }],
    art: { motif: 'vial', color: '#b0a8a0' },
  },
  hollow_choir: {
    name: 'Hollow Choir', cost: 1, type: 'power', target: 'self',
    text: 'Whenever an enemy dies, gain 1 energy and draw 2 cards.',
    effects: [{ type: 'power', power: 'hollow_choir' }],
    art: { motif: 'bell', color: '#d9c07a' },
  },
  rhythm_of_three: {
    name: 'Rhythm of Three', cost: 1, type: 'power', target: 'self',
    text: 'Every 3rd card you play each turn deals 6 damage to ALL enemies.',
    effects: [{ type: 'power', power: 'rhythm_of_three' }],
    art: { motif: 'gear', color: '#ffb347' },
  },
  dreaming_wick: {
    name: 'Dreaming Wick', cost: 1, type: 'power', target: 'self',
    text: 'Draw 1 card. At the start of each turn, add a random card to your hand.',
    effects: [{ type: 'draw', amount: 1 }, { type: 'power', power: 'dreaming_wick' }],
    art: { motif: 'moon', color: '#c08aff' },
  },
  night_vigil: {
    name: 'Night Vigil', cost: 1, type: 'power', target: 'self',
    text: 'At the end of each turn, gain 4 block for each unspent energy.',
    effects: [{ type: 'power', power: 'night_vigil' }],
    art: { motif: 'hourglass', color: '#9ab8ff' },
  },
  bellows: {
    name: 'Bellows', cost: 2, type: 'power', target: 'self',
    text: 'Gain 1 strength now and at the start of each turn.',
    effects: [{ type: 'strength', amount: 1 }, { type: 'power', power: 'bellows' }],
    art: { motif: 'flame', color: '#ff6a2a' },
  },
  paper_lanterns: {
    name: 'Paper Lanterns', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you play a Power, draw 2 cards.',
    effects: [{ type: 'power', power: 'paper_lanterns' }],
    art: { motif: 'beam', color: '#ff9a6a' },
  },
  glass_heart: {
    name: 'Glass Heart', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you lose HP, gain 4 block.',
    effects: [{ type: 'power', power: 'glass_heart' }],
    art: { motif: 'heart', color: '#9fe0ff' },
  },
  thornwick: {
    name: 'Thornwick', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you lose HP, deal 5 damage to a random enemy.',
    effects: [{ type: 'power', power: 'thornwick' }],
    art: { motif: 'burst', color: '#c0463e' },
  },
  venom_wick: {
    name: 'Venom Wick', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you play an Attack, apply 1 Poison to ALL enemies.',
    effects: [{ type: 'power', power: 'venom_wick' }],
    art: { motif: 'droplet', color: '#7fd45a' },
  },
  ashen_crown: {
    name: 'Ashen Crown', cost: 2, type: 'power', target: 'self',
    text: 'Gain 2 strength. At the start of each turn, gain 3 block.',
    effects: [{ type: 'strength', amount: 2 }, { type: 'power', power: 'lantern_ward' }],
    art: { motif: 'crown', color: '#ffd35a' },
  },
});
