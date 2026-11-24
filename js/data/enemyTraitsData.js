// ENEMY TRAITS AND SPECIAL MOVES (data only; rules in combat/enemyTraits.js + combat/enemyMovesMore.js)
// An enemy can list traits in data/enemiesData.js / data/enemiesMoreData.js:
//   traits: { stoneskin: 10 }      takes at most 10 HP from a single hit
//   traits: { thorns: 3 }          you take 3 damage every time you hit it
//   traits: { regen: 3 }           heals 3 HP at the start of its turn
//   traits: { splitting: 1 }       + splitInto: ['id', 'id']: breaks into smaller enemies when it dies
//   traits: { vengeful: 2 }        gains 2 Might whenever another enemy dies
//   traits: { fuse: 3 }            counts down each turn; its last move (explode) blows it up
// Traits show as statuses on the enemy (hover for the rule). Special move types:
//   burrow    digs in: cannot be targeted until its next turn, then comes back Exposed (takes double damage)
//   steal     takes the best card from your discard pile; you get it back when it dies
//   stealGold attack + steals `gold` gold; you get it back when it dies (gone if it flees)
//   flee      runs away with what it stole
//   summon    calls `enemy` (if fewer than `max` enemies stand), otherwise gains `value` block
//   protect   every OTHER enemy gains `value` block
//   heal      heals `value` HP (allies: true = every enemy)
//   drainOil  attack + drains `oil` from your lantern
//   explode   deals `value` damage and destroys itself
// Pieces that split off a dead enemy start Stunned (Game.SPLIT_STUN_TURNS) so they lose their first turn.
Game.SPLIT_STUN_TURNS = 1;
// Statuses shown for these (icons in ui/enemyTraitIcons.js):
Object.assign(Game.STATUSES, {
  stoneskin: { icon: '⬢', name: 'Stoneskin', color: '#b8b0a0', kind: 'buff',
    text: 'Loses at most that much HP from a single hit. Many small hits work best.',
    tip: 'Loses at most {n} HP from a single hit. Use many small hits.' },
  thorns:    { icon: '✶', name: 'Thorns', color: '#9fd06a', kind: 'buff',
    text: 'Whenever you hit it, you take that much damage back.',
    tip: 'Every time you hit it, you take {n} damage. Use few, big hits.' },
  regen:     { icon: '✚', name: 'Regrowth', color: '#7fe0a0', kind: 'buff',
    text: 'Heals that much HP at the start of its turn.',
    tip: 'Heals {n} HP at the start of its turn. Poison and big hits beat it.' },
  splitting: { icon: '⧉', name: 'Splitting', color: '#c8e070', kind: 'buff',
    text: 'When it dies, it breaks into smaller enemies.',
    tip: 'When it dies, it breaks into smaller enemies. Keep some damage for them.' },
  vengeful:  { icon: '♆', name: 'Vengeful', color: '#ff7a5a', kind: 'buff',
    text: 'Gains that much Might whenever another enemy dies.',
    tip: 'Whenever another enemy dies, it gains {n} Might. Kill it first, or last with care.' },
  fuse:      { icon: '✺', name: 'Fuse', color: '#ffb04a', kind: 'buff',
    text: 'Counts down every turn. At the end it explodes. Kill it before then.',
    tip: 'Explodes in {n} turn(s). Kill it first, or have a lot of block ready.' },
  burrowed:  { icon: '⛏', name: 'Underground', color: '#a08060', kind: 'buff',
    text: 'Cannot be targeted or hit. It comes back up on its next turn.',
    tip: 'Underground: cards cannot hit it. It comes back on its next turn, Exposed.' },
  exposed:   { icon: '◎', name: 'Exposed', color: '#ff5a5a', kind: 'debuff',
    text: 'Takes double damage until the end of your turn.',
    tip: 'Takes DOUBLE damage until the end of your turn. Hit it now!' },
  stunned:   { icon: '✦', name: 'Stunned', color: '#ffd35a', kind: 'debuff',
    text: 'Skips its next turn.',
    tip: 'Dazed: it does nothing on its next turn. Enemies that split off a dead parent start Stunned for {n} turn(s).' },
  thief:     { icon: '✋', name: 'Stolen', color: '#e0c050', kind: 'buff',
    text: 'Holds something it stole from you. Kill it to get it back.',
    tip: 'Holds what it stole from you. Kill it to get it back.' },
});

Object.assign(Game.INTENTS, {
  burrow:    { icon: '⛏', name: 'Burrow',  tip: 'Will dig underground: next turn it cannot be targeted. When it comes back it takes double damage.' },
  steal:     { icon: '✋', name: 'Steal',   tip: 'Will steal the best card from your discard pile. Kill it to get the card back.' },
  stealGold: { icon: '✋', name: 'Pickpocket', tip: 'Will steal {value} gold. Kill it before it runs away to get the gold back.' },
  flee:      { icon: '➶', name: 'Flee',    tip: 'Will run away with everything it stole!' },
  summon:    { icon: '✣', name: 'Summon',  tip: 'Will call another enemy to the fight.' },
  protect:   { icon: '⛨', name: 'Protect', tip: 'Will give every other enemy {value} block.' },
  heal:      { icon: '✚', name: 'Heal',    tip: 'Will heal {value} HP.' },
  drainOil:  { icon: '⬙', name: 'Drain Oil', tip: 'Will drain {value} oil from your lantern.' },
  explode:   { icon: '✺', name: 'Explode', tip: 'Will EXPLODE for {dmg} damage and destroy itself.' },
});
