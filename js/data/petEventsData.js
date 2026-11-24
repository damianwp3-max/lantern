// PET EVENTS (data only): cave events where a creature wants to come along.
// Same shape as data/caveEventsData.js, plus:
//   pet: 'magpie'                     marks the event as a pet event (at most
//                                     Game.PET_RULES.petEventsPerLevel per level, js/pets/petEvents.js)
//   { type: 'pet', id: 'magpie' }     effect: adds that pet's card to your deck
// Every pet event also offers something that is not the pet, so taking it is a choice.
Object.assign(Game.CAVE_EVENTS, {
  magpie_nest: {
    title: 'A Nest of Trinkets', icon: '✧', pet: 'magpie',
    text: 'A nest wedged in a crack, woven from wire and buttons. A magpie stares at the shiny buckle on your boot, then at you.',
    options: [
      { label: 'Give it the buckle', hint: 'Lose 10 gold. The Magpie joins you (adds Magpie Call to your deck).',
        effects: [{ type: 'gold', amount: -10 }, { type: 'pet', id: 'magpie' }] },
      { label: 'Rob the nest', hint: 'Gain 25 gold.', effects: [{ type: 'gold', amount: 25 }] },
      { label: 'Walk on', hint: 'Nothing happens.', effects: [] },
    ],
  },
  ember_hollow: {
    title: 'The Ember Hollow', icon: '♨', pet: 'salamander',
    text: 'Coals glow in a hollow in the rock. One of them blinks. A small salamander curls around your lantern, warming itself.',
    options: [
      { label: 'Feed it oil', hint: 'Spend 2 oil. The Ember Salamander joins you.',
        effects: [{ type: 'oil', amount: -2 }, { type: 'pet', id: 'salamander' }] },
      { label: 'Warm yourself', hint: 'Heal 8 HP.', effects: [{ type: 'hp', amount: 8 }] },
    ],
  },
  mossy_ledge: {
    title: 'A Mossy Ledge', icon: '◎', pet: 'snail',
    text: 'A snail the size of your fist is crossing a ledge. It has been crossing it, you suspect, for a very long time.',
    options: [
      { label: 'Carry it along', hint: 'The Cave Snail joins you.', effects: [{ type: 'pet', id: 'snail' }] },
      { label: 'Eat the moss', hint: '+3 max HP.', effects: [{ type: 'maxHp', amount: 3 }] },
    ],
  },
  rattling_coffer: {
    title: 'The Rattling Coffer', icon: '⚿', pet: 'coffer',
    text: 'A small chest hops after you on stubby legs, coins jingling inside. When you stop, it stops. When you turn, it wags its lid.',
    options: [
      { label: 'Let it follow', hint: 'Lose 4 HP (it bites, once). The Coffer Pup joins you.',
        effects: [{ type: 'hp', amount: -4 }, { type: 'pet', id: 'coffer' }] },
      { label: 'Shake it out', hint: 'Gain 30 gold. It runs off, offended.', effects: [{ type: 'gold', amount: 30 }] },
    ],
  },
  rat_burrow: {
    title: "The Packrat's Burrow", icon: '⌂', pet: 'rat',
    text: 'A burrow full of things that once belonged to someone: spoons, keys, a single card. A rat with a tiny satchel blocks the way.',
    options: [
      { label: 'Trade a card for its trust', hint: 'Remove a card from your deck. The Pack Rat joins you.',
        effects: [{ type: 'pickRemove' }, { type: 'pet', id: 'rat' }] },
      { label: 'Take the card it keeps', hint: 'Add a Rummage to your deck.', effects: [{ type: 'card', id: 'rummage' }] },
      { label: 'Leave', hint: 'Nothing happens.', effects: [] },
    ],
  },
  owl_perch: {
    title: 'Eyes in the Rafters', icon: '◉', pet: 'owl',
    text: 'Two golden eyes watch you from an old mine beam. An owl, hurt in one wing, hops down when you set your lantern low.',
    options: [
      { label: 'Bind its wing', hint: 'Lose 6 HP. The Night Owl joins you.',
        effects: [{ type: 'hp', amount: -6 }, { type: 'pet', id: 'owl' }] },
      { label: 'Climb to its perch', hint: 'Gain 3 oil.', effects: [{ type: 'oil', amount: 3 }] },
    ],
  },
  glow_pool: {
    title: 'The Glowing Pool', icon: '✺', pet: 'glowworm',
    text: 'The ceiling is full of tiny green lights. One drifts down on a silk thread and lands in your palm, blinking in a slow, calm rhythm.',
    options: [
      { label: 'Keep it', hint: 'The Glowworm joins you.', effects: [{ type: 'pet', id: 'glowworm' }] },
      { label: 'Read the lights', hint: 'Upgrade a card of your choice. Lose 5 HP.',
        effects: [{ type: 'hp', amount: -5 }, { type: 'pickUpgrade' }] },
    ],
  },
});
