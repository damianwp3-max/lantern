// STATUS DATA
// Statuses sit on the player or an enemy as a number of stacks
// (unit.statuses = { poison: 3, weak: 2 }). What they do is in combat/statuses.js;
// here is only what the player sees. Cards apply them with
//   { type: 'status', status: 'poison', amount: 3 }
// tip: the hover text. {n} becomes the current stacks, {n-1} one less.
// kind: 'debuff' or 'buff' (colors the tooltip label).
Game.STATUSES = {
  poison:     { icon: '☠', name: 'Poison',     color: '#8fd45a', kind: 'debuff',
    text: 'Loses that much HP at the start of its turn, then the poison drops by 1. Ignores block.',
    tip: 'At the start of its turn, loses {n} HP. Block does not stop it. Then Poison drops to {n-1}.' },
  weak:       { icon: '↓', name: 'Weak',       color: '#c9b98f', kind: 'debuff',
    text: 'Deals 25% less attack damage. Drops by 1 each turn.',
    tip: 'Attacks deal 25% less damage. Lasts {n} more turn(s).' },
  frail:      { icon: '☂', name: 'Frail',      color: '#d9a8c8', kind: 'debuff',
    text: 'Gains 25% less block. Drops by 1 each turn.',
    tip: 'Gains 25% less block from every source. Lasts {n} more turn(s).' },
  vulnerable: { icon: '✖', name: 'Vulnerable', color: '#ff8a6a', kind: 'debuff',
    text: 'Takes 50% more attack damage. Drops by 1 each turn.',
    tip: 'Takes 50% more damage from attacks. Lasts {n} more turn(s).' },
  might:      { icon: '▲', name: 'Might',      color: '#ff6a4a', kind: 'buff',
    text: 'Deals that much more damage with every attack hit. Lasts the whole fight.',
    tip: 'Every attack hit deals {n} more damage. Lasts the whole fight.' },
};
