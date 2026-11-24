// POWER DATA
// A power card adds a power for the rest of the fight:
//   card effect { type: 'power', power: 'lantern_ward' }
// Playing the same power again adds a stack; each stack runs the effects once more.
// A power is data only: when it triggers, and which card effects it runs
// (same effect types as cards, see combat/effects.js). combat/powers.js runs them.
//   on: 'turnStart'   start of your turn (after drawing)
//       'turnEnd'     end of your turn (before enemies act)
//       'cardPlayed'  after you play a card; optional cardType: 'attack' | 'skill' | ...
//       'nthCard'     every N-th card you play in a turn (every: N)
//       'enemyKilled' an enemy dies
//       'hurt'        you lose HP
// Effect targets: 'enemy' (current target), 'all', 'random', or none (you).
Game.POWERS = {
  lantern_ward:  { icon: '🛡', name: 'Lantern Ward', text: 'Start of your turn: gain 3 block.',
    triggers: [{ on: 'turnStart', effects: [{ type: 'block', amount: 3 }] }] },
  ember_echo:    { icon: '✦', name: 'Ember Echo', text: 'Whenever you play an attack, deal 3 damage to a random enemy.',
    triggers: [{ on: 'cardPlayed', cardType: 'attack', effects: [{ type: 'damage', amount: 3, target: 'random', flat: true }] }] },
  kiln_heart:    { icon: '♨', name: 'Kiln Heart', text: 'End of your turn: deal 5 damage to ALL enemies.',
    triggers: [{ on: 'turnEnd', effects: [{ type: 'damage', amount: 5, target: 'all', flat: true }] }] },
  rot_bloom:     { icon: '☠', name: 'Rot Bloom', text: 'Start of your turn: apply 3 poison to ALL enemies.',
    triggers: [{ on: 'turnStart', effects: [{ type: 'status', status: 'poison', amount: 3, target: 'all' }] }] },
  moth_swarm:    { icon: '🦋', name: 'Moth Swarm', text: 'Whenever you play a skill, gain 3 block.',
    triggers: [{ on: 'cardPlayed', cardType: 'skill', effects: [{ type: 'block', amount: 3 }] }] },
  ashen_pact:    { icon: '⚱', name: 'Ashen Pact', text: 'Start of your turn: lose 1 HP, gain 1 energy, draw 1 card.',
    triggers: [{ on: 'turnStart', effects: [{ type: 'loseHp', amount: 1 }, { type: 'energy', amount: 1 }, { type: 'draw', amount: 1 }] }] },
  hollow_choir:  { icon: '🔔', name: 'Hollow Choir', text: 'Whenever an enemy dies, gain 1 energy and draw 2 cards.',
    triggers: [{ on: 'enemyKilled', effects: [{ type: 'energy', amount: 1 }, { type: 'draw', amount: 2 }] }] },
  rhythm_of_three: { icon: '③', name: 'Rhythm of Three', text: 'Every 3rd card you play in a turn deals 6 damage to ALL enemies.',
    triggers: [{ on: 'nthCard', every: 3, effects: [{ type: 'damage', amount: 6, target: 'all', flat: true }] }] },
  dreaming_wick: { icon: '☾', name: 'Dreaming Wick', text: 'Start of your turn: add a random card to your hand.',
    triggers: [{ on: 'turnStart', effects: [{ type: 'addRandomCard', amount: 1 }] }] },
  night_vigil:   { icon: '☽', name: 'Night Vigil', text: 'End of your turn: gain 4 block for each unspent energy.',
    triggers: [{ on: 'turnEnd', effects: [{ type: 'blockPerEnergy', amount: 4 }] }] },
  bellows:       { icon: '♒', name: 'Bellows', text: 'Start of your turn: gain 1 strength.',
    triggers: [{ on: 'turnStart', effects: [{ type: 'strength', amount: 1 }] }] },
  paper_lanterns: { icon: '🏮', name: 'Paper Lanterns', text: 'Whenever you play a power, draw 2 cards.',
    triggers: [{ on: 'cardPlayed', cardType: 'power', effects: [{ type: 'draw', amount: 2 }] }] },
  glass_heart:   { icon: '♢', name: 'Glass Heart', text: 'Whenever you lose HP, gain 4 block.',
    triggers: [{ on: 'hurt', effects: [{ type: 'block', amount: 4 }] }] },
  thornwick:     { icon: '✶', name: 'Thornwick', text: 'Whenever you lose HP, deal 5 damage to a random enemy.',
    triggers: [{ on: 'hurt', effects: [{ type: 'damage', amount: 5, target: 'random', flat: true }] }] },
  venom_wick:    { icon: '🕯', name: 'Venom Wick', text: 'Whenever you play an attack, apply 1 poison to ALL enemies.',
    triggers: [{ on: 'cardPlayed', cardType: 'attack', effects: [{ type: 'status', status: 'poison', amount: 1, target: 'all' }] }] },
};
