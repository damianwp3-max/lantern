// ENEMY INTENTS: the icon shown above an enemy for its next move, and its hover text.
// Key = move type from data/enemiesData.js. New move type = one entry here.
//   name   title of the tooltip
//   tip    hover text: {dmg} damage per hit (after Weak / Vulnerable), {hits}, {value}
// Extras on a move (status on you, enemy block) are added to the text by ui/tipText.js.
Game.INTENTS = {
  attack:  { icon: '⚔', name: 'Attack',   tip: 'Will attack you for {dmg} damage.', tipMulti: 'Will attack you {hits} times for {dmg} damage each ({total} total).' },
  block:   { icon: '🛡', name: 'Defend',   tip: 'Will gain {value} block.' },
  debuff:  { icon: '🌀', name: 'Hex',      tip: 'Will weaken you with a curse.' },
  buff:    { icon: '▲', name: 'Empower',  tip: 'Will grow stronger: +{value} Might (more damage on every hit).', tipAllies: 'Will make ALL enemies stronger: +{value} Might each.' },
  addCard: { icon: '🍄', name: 'Spores',   tip: 'Spores are junk cards: they cannot be played and only clog your hand. Will shuffle {value} {card} into your discard pile (they are gone when the fight ends).' },
};
