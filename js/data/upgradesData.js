// CARD UPGRADES (data only)
// An upgrade is NOT a piercing. A card can be upgraded once and then EITHER
//   - costs 1 less, or
//   - does MORE of what it already does (bigger numbers on its own effects).
// No more "every upgrade just adds block": an attack hits harder, a block card
// blocks more, a draw card draws more, a debuff card applies more stacks.
//
// A card can carry its own rule in its data entry:
//   upgrade: { cost: -1 }
//   upgrade: { boost: { 0: 4 } }                  effect #0 gets +4
//   upgrade: { effects: [...], text: 'Draw 1 card.' }   an extra effect (rare, hand-made)
// Without one, js/cards/upgrade.js decides:
//   cost 2 or more, or a power that costs 1+  -> costs 1 less
//   otherwise                                 -> boost its effects (table below)
//   nothing to boost but it costs 1+          -> costs 1 less
//   nothing at all                            -> extra effect "Draw 1 card."
//   unplayable / useless cards                -> cannot be upgraded
Game.UPGRADE_DEFAULTS = {
  minCostForDiscount: 2,
  maxBoostedEffects: 2,          // at most this many effects of one card get bigger
  // How much each effect type grows: add = flat, pct = share of the current amount (rounded), min = at least.
  boost: {
    damage:       { pct: 0.4, min: 2, word: 'damage' },
    block:        { pct: 0.4, min: 2, word: 'block' },
    draw:         { add: 1, word: 'card draw' },
    energy:       { add: 1, word: 'energy' },
    heal:         { pct: 0.5, min: 2, word: 'healing' },
    strength:     { add: 1, word: 'strength' },
    status:       { pct: 0.5, min: 1, word: 'stacks' },
    addRandomCard:{ add: 1, word: 'cards' },
  },
  fallback: { text: 'Draw 1 card.', effects: [{ type: 'draw', amount: 1, target: 'self' }] },
};
