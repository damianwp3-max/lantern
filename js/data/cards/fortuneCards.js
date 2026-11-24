// FORTUNE CARDS (added 2026-11-23): more Lucky, Unlucky, Joker and Single-use (one-time) cards.
// Like luckCards.js / keepCards.js, each card carries its piercing from the start (pierce: '...').
// The rule is NOT in the description: the badge shows it and the side panel explains it
// (data/piercingsData.js).
//   lucky    20% chance to play twice           unlucky   20% chance to do nothing (so it is cheap or strong)
//   joker    50% nothing, 50% twice              single    works once per fight (Exhaust)
Game.registerCards({
  // --- lucky ---
  clover_charm: {
    name: 'Clover Charm', cost: 1, type: 'defense', target: 'self', pierce: 'lucky',
    text: 'Gain 5 block. Draw 1 card.',
    effects: [{ type: 'block', amount: 5 }, { type: 'draw', amount: 1 }],
    art: { motif: 'cloak', color: '#7fe08a' },
  },
  horseshoe_toss: {
    name: 'Horseshoe Toss', cost: 1, type: 'attack', target: 'enemy', pierce: 'lucky',
    text: 'Deal 5 damage. Apply 1 Weak.',
    effects: [{ type: 'damage', amount: 5 }, { type: 'status', status: 'weak', amount: 1 }],
    art: { motif: 'bash', color: '#8fe09a' },
  },
  wishing_venom: {
    name: 'Wishing Venom', cost: 1, type: 'skill', target: 'enemy', pierce: 'lucky',
    text: 'Apply 4 Poison.',
    effects: [{ type: 'status', status: 'poison', amount: 4 }],
    art: { motif: 'spores', color: '#6fcf7a' },
  },
  // --- unlucky ---
  cursed_coin: {
    name: 'Cursed Coin', cost: 1, type: 'attack', target: 'all', pierce: 'unlucky',
    text: 'Deal 8 damage to ALL enemies.',
    effects: [{ type: 'damage', amount: 8 }],
    art: { motif: 'burst', color: '#8f86ad' },
  },
  broken_mirror: {
    name: 'Broken Mirror', cost: 1, type: 'defense', target: 'self', pierce: 'unlucky',
    text: 'Gain 10 block.',
    effects: [{ type: 'block', amount: 10 }],
    art: { motif: 'shield', color: '#9a8ad0' },
  },
  bad_omen: {
    name: 'Bad Omen', cost: 1, type: 'skill', target: 'enemy', pierce: 'unlucky',
    text: 'Apply 3 Vulnerable and 2 Weak.',
    effects: [{ type: 'status', status: 'vulnerable', amount: 3 }, { type: 'status', status: 'weak', amount: 2 }],
    art: { motif: 'rune', color: '#8f86ad' },
  },
  // --- joker ---
  coin_flip: {
    name: 'Coin Flip', cost: 1, type: 'hybrid', target: 'enemy', pierce: 'joker',
    text: 'Deal 7 damage. Gain 7 block.',
    effects: [{ type: 'damage', amount: 7 }, { type: 'block', amount: 7, target: 'self' }],
    art: { motif: 'bash', color: '#e05a9a' },
  },
  jesters_gambit: {
    name: "Jester's Gambit", cost: 0, type: 'skill', target: 'self', pierce: 'joker',
    text: 'Draw 2 cards.',
    effects: [{ type: 'draw', amount: 2 }],
    art: { motif: 'draw', color: '#e05a9a' },
  },
  double_or_nothing: {
    name: 'Double or Nothing', cost: 2, type: 'attack', target: 'enemy', pierce: 'joker',
    text: 'Deal 20 damage.',
    effects: [{ type: 'damage', amount: 20 }],
    art: { motif: 'slash', color: '#f06aaa' },
  },
  // --- single-use (one time per fight) ---
  final_candle: {
    name: 'Final Candle', cost: 0, type: 'skill', target: 'self', pierce: 'single',
    text: 'Gain 2 energy.',
    effects: [{ type: 'energy', amount: 2 }],
    art: { motif: 'flame', color: '#d8884a' },
  },
  smoke_screen: {
    name: 'Smoke Screen', cost: 1, type: 'defense', target: 'self', pierce: 'single',
    text: 'Gain 17 block.',
    effects: [{ type: 'block', amount: 17 }],
    art: { motif: 'cloak', color: '#b0a090' },
  },
  desperate_lunge: {
    name: 'Desperate Lunge', cost: 1, type: 'attack', target: 'enemy', pierce: 'single',
    text: 'Deal 20 damage. Lose 3 HP.',
    effects: [{ type: 'damage', amount: 20 }, { type: 'loseHp', amount: 3, target: 'self' }],
    art: { motif: 'lash', color: '#d8584a' },
  },
});
