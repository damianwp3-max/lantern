// PIERCINGS (data only)
// A piercing is a mark on ONE card in your deck that changes how it plays.
// A card carries at most one piercing. They are added by events, the merchant
// and some rewards (see js/cards/piercing.js). The rule text lives here, NOT on the
// card face: the card shows a small badge and the rule appears in the side panel
// when you hover the card (ui/tipText.js).
//
// Fields
//   name, icon, color   badge on the card
//   short               one-line summary (shown in lists)
//   text                full rule (side panel)
//   good                true / false, only used for colors and for random picks
//   weight              how often it is picked at random
//   flags               merged into the card: luck, retain, exhaust, xcost
//   allow(card)         can this card receive it?   (optional)
//   convert(card)       extra changes when put on an existing card (optional)
// New piercing = one entry here, plus the rule in combat/combat.js if it needs new behavior.
//
// PIERCE_CHOICES (kupka, 2026-11-23): piercing a card (merchant service, mark stall, events, random marks,
// pre-pierced shop cards) can only turn it into one of these. The others still exist for cards born with
// them (data/cards/*), but are never offered. Collector (stays in hand) is out on purpose: too strong.
Game.PIERCE_CHOICES = ['timed', 'lucky', 'joker'];
Game.PIERCINGS = {
  unlucky: {
    name: 'Unlucky', icon: '☁', color: '#8f86ad', good: false, weight: 2,
    short: '20% chance it does nothing.',
    text: 'When you play it, there is a 20% chance that it does nothing. You still pay its cost and it still goes to the discard pile.',
    flags: { luck: { fail: 0.2 } },
    // Rule (kupka, 2026-11-23): an unlucky card always costs at least 1, otherwise the gamble has no risk.
    convert: card => (card.cost < 1 && !card.xcost ? { cost: 1 } : {}),
  },
  lucky: {
    name: 'Lucky', icon: '☘', color: '#6fcf7a', good: true, weight: 3,
    short: '20% chance to play twice.',
    text: 'When you play it, there is a 20% chance that its effects happen twice. You only pay once.',
    flags: { luck: { double: 0.2 } },
  },
  joker: {
    name: 'Joker', icon: '🃏', color: '#e05a9a', good: true, weight: 2,
    short: 'Either nothing, or twice.',
    text: 'Every time you play it, a coin is flipped: 50% it does nothing at all, 50% its effects happen twice.',
    flags: { luck: { fail: 0.5, double: 0.5 } },
  },
  collector: {
    name: 'Keep', icon: '❖', color: '#5ab8d8', good: true, weight: 3,
    short: 'Stays in your hand.',
    text: 'If you do not play it, it stays in your hand at the end of your turn instead of being discarded.',
    flags: { retain: true },
  },
  single: {
    name: 'Single-use', icon: '⚑', color: '#d8884a', good: true, weight: 2,
    short: 'Works once per fight.',
    text: 'It works once per fight. After you play it, it is gone until the fight ends (Exhaust). Next fight it is back.',
    flags: { exhaust: true },
  },
  x: {
    name: 'X Cost', icon: '✱', color: '#e8c840', good: true, weight: 2,
    short: 'Spends all energy; more is better.',
    text: 'Its cost is X. Playing it spends ALL your remaining energy, and its effects happen X times (at least 1 energy needed).',
    flags: { xcost: true },
    allow: card => card.cost <= 1 && (card.effects || []).length > 0,
  },
  pack: {
    name: 'Pack', icon: '🎁', color: '#c58a4a', good: true, weight: 1.5,
    short: 'Becomes a pack of cards.',
    text: 'It is a pack instead of a card. Playing it adds a random card to your hand for this fight, and the pack is used up (Exhaust). After the fight the original card is still in your deck.',
    flags: { exhaust: true },
    convert: card => ({
      name: card.name + ' Pack', type: 'pack', target: 'self', timed: false, xcost: false,
      text: 'Add a random card to your hand for this fight.',
      effects: [{ type: 'addRandomCard', amount: 1 }],
      art: { motif: 'bag', color: '#d8a060' },
    }),
    allow: card => card.type !== 'power' && !card.timed,
  },
  // Timed: the card opens the timing bar; its damage / block swing +-50% (kupka's standard).
  timed: {
    name: 'Timed', icon: '⌖', color: '#ffe066', good: true, weight: 2,
    short: 'Timing bar: 50% less or more.',
    text: 'Playing it opens the timing bar. Its damage and block go 50% lower or higher depending on how well you stop the cursor.',
    flags: {},
    convert: card => Object.assign({ timed: true }, Game.VariantText.timed(card)),
    allow: card => !card.timed && !card.xcost && card.type !== 'pack' && !!Game.VariantText.timed(card),
  },
  // Forged: hammered at an anvil; its damage and block numbers grow by `add`.
  forged: {
    name: 'Forged', icon: '⚒', color: '#e09a5a', good: true, weight: 1.5, add: 3,
    short: '+3 damage and block.',
    text: 'Hammered at an anvil: every damage and block number on it is 3 higher.',
    flags: {},
    convert: card => Game.VariantText.forged(card),
    allow: card => card.type !== 'pack' && !!Game.VariantText.forged(card),
  },
};
