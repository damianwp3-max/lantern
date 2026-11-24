// TIMED CARDS
// Cards marked  timed: true  open the timing bar when played (ui/timingView.js).
// The result (Miss .. PERFECT) scales their effects:
//   damage and block effects are multiplied (data/timingData.js, mult)
//   a draw effect can list  byRating: { miss, ok, good, great, perfect }
//   an effect with timed: false is not scaled
// Without timing (Settings) a Timed card counts as "Good" (normal numbers).
// STANDARD: damage/block swing +-50% (Game.TIMING.swing), so a 6 damage card is 'Deal 3-9 damage.'
// Card text prints only the range and never says 'Timed' (the hover panel does that).
// Every timed card is a VARIANT of one base card (named in its 'base' comment): same type and
// cost, and its middle number (Good) equals the base card's number. Never stronger than the base.
// Draw cards follow the same +-50% idea through their byRating table.
// The starter timed cards (precise_cut, steady_ward) are listed in Game.STARTER_DECK (cardsData.js).
Game.registerCards({
  lantern_swing: {
    name: 'Lantern Swing', cost: 1, type: 'hybrid', target: 'enemy', timed: true, reward: false,
    text: 'Deal 3-8 damage and gain 2-5 block.',   // base: Shoulder Check (5 damage, 3 block)
    effects: [{ type: 'damage', amount: 5 }, { type: 'block', amount: 3, target: 'self' }],
    art: { motif: 'bash', color: '#f0b850' },
  },
  focus_breath: {
    name: 'Steady Breath', cost: 1, type: 'skill', target: 'self', timed: true, reward: false,
    text: 'Draw 1-3 cards.',   // base: Rummage (draw 2)
    effects: [{ type: 'draw', amount: 2, byRating: { miss: 1, ok: 1, good: 2, great: 2, perfect: 3 } }],
    art: { motif: 'eye', color: '#ffe066' },
  },
  precise_cut: {
    name: 'Precise Cut', cost: 1, type: 'attack', target: 'enemy', timed: true, reward: false,
    text: 'Deal 3-9 damage.',   // base: Lamp Strike (6 damage)
    effects: [{ type: 'damage', amount: 6 }],
    art: { motif: 'slash', color: '#ffe066' },
  },
  steady_ward: {
    name: 'Steady Ward', cost: 1, type: 'defense', target: 'self', timed: true,
    text: 'Gain 3-8 block.',   // base: Brace (5 block)
    effects: [{ type: 'block', amount: 5 }],
    art: { motif: 'shield', color: '#9ad0ff' },
  },
  lucky_flash: {
    name: 'Lucky Flash', cost: 0, type: 'skill', target: 'self', timed: true,
    text: 'Draw 0-2 cards. Exhaust.', exhaust: true,   // base: a 0-cost 'Draw 1 card. Exhaust.'
    effects: [{ type: 'draw', amount: 1, byRating: { miss: 0, ok: 1, good: 1, great: 1, perfect: 2 } }],
    art: { motif: 'energyDraw', color: '#ffd35a' },
  },
});
