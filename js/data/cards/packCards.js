// CARD PACKS (type 'pack'), kupka's rule: a pack is simple and cheap.
// Play it (about 2 energy) and your deck gains a few copies of ONE small, weak,
// free card for THIS fight only. The copies are One-time (gone once played) and
// never stay in your deck after the fight. The pack itself is used once per fight.
// effect: { type: 'addCard', card: 'token id', amount: N, to: 'draw' }   (to: 'hand' | 'draw' | 'discard')
// Token cards (the free copies) are in js/data/cards/packTokens.js.
// You can still turn any other card into a random-card pack with the Pack piercing (data/piercingsData.js).
Game.registerCards({
  supply_crate: {
    name: 'Dagger Pouch', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 5 Throwing Daggers into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'throwing_dagger', amount: 5, to: 'draw' }],
  },
  weapon_rack: {
    name: 'Hatchet Rack', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 3 Hatchets into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'hatchet', amount: 3, to: 'draw' }],
  },
  armory_chest: {
    name: 'Buckler Crate', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 5 Tin Bucklers into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'tin_buckler', amount: 5, to: 'draw' }],
  },
  scroll_bundle: {
    name: 'Needle Case', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 5 Venom Needles into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'venom_needle', amount: 5, to: 'draw' }],
  },
  twin_pack: {
    name: 'Twin Pouch', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 3 Throwing Daggers and 3 Tin Bucklers into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'throwing_dagger', amount: 3, to: 'draw' }, { type: 'addCard', card: 'tin_buckler', amount: 3, to: 'draw' }],
  },
  grand_pack: {
    name: 'Dagger Chest', cost: 3, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 8 Throwing Daggers into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'throwing_dagger', amount: 8, to: 'draw' }],
  },
  power_parcel: {
    name: 'Spark Box', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 4 Spark Flicks into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'spark_flick', amount: 4, to: 'draw' }],
  },
  mystery_parcel: {
    name: 'Caltrop Bag', cost: 1, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 3 Caltrops into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'caltrop', amount: 3, to: 'draw' }],
  },
  lucky_dip: {
    name: 'Lucky Pouch', cost: 2, type: 'pack', target: 'self', exhaust: true, oneTime: true,
    text: 'Shuffle 4 Lucky Daggers into your draw pile. Exhaust.',
    effects: [{ type: 'addCard', card: 'lucky_dagger', amount: 4, to: 'draw' }],
  },
});
