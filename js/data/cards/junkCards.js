// JUNK CARDS: clutter some enemies (and a few events) put into your deck during a fight.
// They are never rewards. Rules for the ones that do something: combat/junkRules.js
//   unplayable           just takes room in your hand
//   burnInHand: N        if it is still in your hand when your turn ends, you lose N HP
//   (a junk card with a cost can be played to get rid of it: it Exhausts)
Game.registerCards({
  cobweb: {
    name: 'Cobweb', cost: 0, type: 'useless', target: 'self', unplayable: true, reward: false,
    text: 'Unplayable. Sticky threads fill your hand.',
    effects: [],
  },
  silt_clump: {
    name: 'Silt', cost: 1, type: 'useless', target: 'self', exhaust: true, reward: false,
    text: 'Pay 1 energy to wash it away. Exhaust.',
    effects: [],
  },
  cinder_burn: {
    name: 'Cinder Burn', cost: 0, type: 'useless', target: 'self', unplayable: true, reward: false, burnInHand: 2,
    text: 'Unplayable. If it is in your hand at the end of your turn, lose 2 HP.',
    effects: [],
  },
  gloom: {
    name: 'Gloom', cost: 0, type: 'useless', target: 'self', exhaust: true, reward: false,
    text: 'Lose 1 HP. Exhaust.',
    effects: [{ type: 'loseHp', amount: 1 }],
  },
});
