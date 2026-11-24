// MERCHANT (data only): what the shop sells and what it costs (gold).
// Prices are rolled in js/shop/shop.js from these numbers; Game.Mods 'shop' (e.g. 0.2 = 20% off) lowers them.
Game.SHOP = {
  cardCount: 5,
  totemCount: 2,
  cardPrice: { base: 38, perCost: 12, power: 22, wiggle: 8 },
  piercedChance: 0.3,         // a card for sale may already carry a piercing
  negativePiercedDiscount: 0.65,
  services: {
    remove:  { name: 'Remove a card',  icon: '✂', price: 55, step: 25, text: 'Take a card out of your deck for good. Each removal costs more.' },
    upgrade: { name: 'Upgrade a card', icon: '▲', price: 75, text: 'One card costs 1 less, or its effects get stronger.' },
    pierce:  { name: 'Pierce a card',  icon: '❂', price: 50, text: 'Pick one of 3 piercings, then the card to pierce.' },
  },
  // Mark stall: every visit offers `count` specific piercings (variants) to put on a card of your choice,
  // so every variant (Timed, Forged, Joker, Lucky, ...) can be bought somewhere in a run.
  // premium: piercings that cost a fortune at the mark stall, and never show up in the plain
  // "Pierce a card" service or on cards for sale (Collector keeps a card in hand forever).
  markStall: { count: 0, price: 45, badPrice: 10, premium: { collector: 300 }, name: 'Mark: {name}', text: 'Put the {name} mark on a card of your choice. {short}' },
  startGold: 20,              // was 30
  // Every price in the shop (cards, totems, oil, services, marks) is multiplied by this, so prices follow the
  // lower gold income (fights pay ~35% less). Was 1. Applied in Game.Shop.price (shop/shop.js).
  priceScale: 1.4,   // was 0.7; kupka (2026-11-23): whole shop 100% more expensive
};
// Gold from fights: [min, max] per node type.
// Lowered ~35% (was fight [12,20], elite [28,38], boss [55,70]).
Game.GOLD_REWARDS = { fight: [8, 13], elite: [18, 25], boss: [36, 46] };
