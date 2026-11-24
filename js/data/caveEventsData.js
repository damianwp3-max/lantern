// CAVE EVENTS (data only)
// A "?" node on the map shows one of these. Each event has a title, a short scene (text),
// a picture symbol (icon) and 2-3 options. An option lists effects, run in order:
//   { type: 'gold', amount: -15 }          gain or pay gold
//   { type: 'hp', amount: -6 }             heal or lose HP (never kills you: stops at 1)
//   { type: 'maxHp', amount: 4 }           max HP
//   { type: 'oil', amount: -3 }            lantern oil
//   { type: 'totem', id: 'random' | id }   a totem (or 40 gold if you own them all)
//   { type: 'card', id }                   add a card to your deck (junk like spore_clump too)
//   { type: 'upgradeRandom' }              upgrade a random card
//   { type: 'pierceRandom', piercing? }    pierce a random card (random piercing unless given)
//   { type: 'pickUpgrade' }                you choose a card to upgrade
//   { type: 'pickPierce', piercing? }      you choose a piercing (3 offered, or the given one) and the card
//   { type: 'pickRemove' }                 you choose a card to remove
//   { type: 'fightMod', mod: {...} }       for the next fights (see caveEvents/fightMods.js)
//   { type: 'gamble', chance, win: [...], lose: [...] }   a coin flip between two effect lists
// An option is disabled while you cannot pay (gold, oil, cards). `hint` is the small gray line under it.
// New event = one entry. Engine: js/caveEvents/caveEvents.js
Game.CAVE_EVENTS = {
  whispering_well: {
    title: 'The Whispering Well', icon: '◍',
    text: 'A stone well hums in the dark. Your reflection mouths words you cannot hear. The water is clear and cold.',
    options: [
      { label: 'Drink deeply', hint: '70%: heal 15. 30%: lose 6 HP and a card turns Unlucky.',
        effects: [{ type: 'gamble', chance: 0.7, win: [{ type: 'hp', amount: 15 }], lose: [{ type: 'hp', amount: -6 }, { type: 'pierceRandom', piercing: 'unlucky' }] }] },
      { label: 'Toss in a coin', hint: 'Pay 15 gold. Upgrade a card of your choice.',
        effects: [{ type: 'gold', amount: -15 }, { type: 'pickUpgrade' }] },
      { label: 'Leave it', hint: 'Nothing happens.', effects: [] },
    ],
  },
  lamp_shrine: {
    title: 'Abandoned Lamp Shrine', icon: '♨',
    text: 'Rows of dead lamps around a cracked altar. One bowl still holds a little oil, and a strange warmth.',
    options: [
      { label: 'Pour in your oil', hint: 'Spend 3 oil. Pierce a card (you choose).',
        effects: [{ type: 'oil', amount: -3 }, { type: 'pickPierce' }] },
      { label: 'Take the oil', hint: 'Gain 4 oil, but a random card turns Unlucky.',
        effects: [{ type: 'oil', amount: 4 }, { type: 'pierceRandom', piercing: 'unlucky' }] },
      { label: 'Leave', hint: 'Nothing happens.', effects: [] },
    ],
  },
  overturned_cart: {
    title: 'Overturned Cart', icon: '⛟',
    text: 'A merchant cart lies on its side, wheels still turning. Crates are scattered across the tunnel. Somebody left in a hurry.',
    options: [
      { label: 'Search the wreck', hint: '60%: find 40 gold. 40%: a beam falls, lose 8 HP.',
        effects: [{ type: 'gamble', chance: 0.6, win: [{ type: 'gold', amount: 40 }], lose: [{ type: 'hp', amount: -8 }] }] },
      { label: 'Take the sealed crate', hint: 'Add a Supply Crate (a pack card) to your deck.',
        effects: [{ type: 'card', id: 'supply_crate' }] },
      { label: 'Walk on', hint: 'Nothing happens.', effects: [] },
    ],
  },
  cold_forge: {
    title: 'The Cold Forge', icon: '⚒',
    text: 'An old forge, long dead. The anvil is still hot to the touch, as if somebody just left.',
    options: [
      { label: 'Hammer a card', hint: 'Lose 6 HP. Upgrade a card of your choice.',
        effects: [{ type: 'hp', amount: -6 }, { type: 'pickUpgrade' }] },
      { label: 'Melt a card down', hint: 'Remove a card from your deck and gain 20 gold.',
        effects: [{ type: 'pickRemove' }, { type: 'gold', amount: 20 }] },
      { label: 'Warm your hands', hint: 'Heal 8 HP.', effects: [{ type: 'hp', amount: 8 }] },
    ],
  },
  gamblers_ghost: {
    title: "The Gambler's Ghost", icon: '♠',
    text: 'A pale figure shuffles a deck that is not there. "One hand," it whispers. "Lose and you lose. Win and I give you my luck."',
    options: [
      { label: 'Play a hand', hint: 'Pay 20 gold. 50%: a random card becomes a Joker. 50%: nothing.',
        effects: [{ type: 'gold', amount: -20 }, { type: 'gamble', chance: 0.5, win: [{ type: 'pierceRandom', piercing: 'joker' }], lose: [] }] },
      { label: 'Bet your blood', hint: 'Lose 10 HP. A random card becomes Lucky.',
        effects: [{ type: 'hp', amount: -10 }, { type: 'pierceRandom', piercing: 'lucky' }] },
      { label: 'Refuse', hint: 'Nothing happens.', effects: [] },
    ],
  },
  moth_swarm: {
    title: 'A Swarm of Moths', icon: '🦋',
    text: 'Thousands of pale moths pour out of the dark, drawn to your lantern. They beat against the glass.',
    options: [
      { label: 'Let them feast', hint: 'Spend 3 oil. +1 strength for your next 3 fights.',
        effects: [{ type: 'oil', amount: -3 }, { type: 'fightMod', mod: { strength: 1, fights: 3, text: 'Moth blessing: +1 strength' } }] },
      { label: 'Fight through', hint: 'Lose 7 HP and gain 25 gold from their dust.',
        effects: [{ type: 'hp', amount: -7 }, { type: 'gold', amount: 25 }] },
    ],
  },
  sleeping_giant: {
    title: 'The Sleeping Stone Giant', icon: '☗',
    text: 'A giant sits against the wall, moss growing on its shoulders. A totem hangs from its belt. It breathes. Slowly.',
    options: [
      { label: 'Sneak past', hint: '50%: take 50 gold from its pouch. 50%: it wakes, enemies are +25% HP for 2 fights.',
        effects: [{ type: 'gamble', chance: 0.5, win: [{ type: 'gold', amount: 50 }], lose: [{ type: 'fightMod', mod: { enemyHpMult: 1.25, fights: 2, text: 'The giant woke: enemies have +25% HP' } }] }] },
      { label: 'Steal the totem', hint: '35%: gain a random totem. 65%: lose 12 HP.',
        effects: [{ type: 'gamble', chance: 0.35, win: [{ type: 'totem', id: 'random' }], lose: [{ type: 'hp', amount: -12 }] }] },
      { label: 'Back away', hint: 'Nothing happens.', effects: [] },
    ],
  },
  dripping_cavern: {
    title: 'Dripping Cavern', icon: '💧',
    text: 'Water falls in long threads from the ceiling and pools in a hollow that glitters.',
    options: [
      { label: 'Fill your lantern', hint: 'Gain 4 oil.', effects: [{ type: 'oil', amount: 4 }] },
      { label: 'Drink from the pool', hint: '+4 max HP.', effects: [{ type: 'maxHp', amount: 4 }] },
      { label: 'Wade in deeper', hint: 'Lose 5 HP. A random card becomes Timed, Lucky or Joker.',
        effects: [{ type: 'hp', amount: -5 }, { type: 'pierceRandom' }] },
    ],
  },
  old_collector: {
    title: 'The Old Collector', icon: '❖',
    text: 'A stooped figure sits among shelves of odd things. "I buy forgotten things," it says. "I sell patience."',
    options: [
      { label: 'Trade a card away', hint: 'Remove a card from your deck and gain a random totem.',
        effects: [{ type: 'pickRemove' }, { type: 'totem', id: 'random' }] },
      { label: 'Buy an X mark', hint: 'Pay 35 gold. Put the X Cost piercing on a card of your choice.',
        effects: [{ type: 'gold', amount: -35 }, { type: 'pickPierce', piercing: 'x' }] },
      { label: 'Decline', hint: 'Nothing happens.', effects: [] },
    ],
  },
  cursed_idol: {
    title: 'The Cursed Idol', icon: '☠',
    text: 'A grinning idol sits on a pedestal. It is made of something that is not quite gold. The air around it smells of spores.',
    options: [
      { label: 'Take it', hint: 'Gain a random totem. Two Spore Clumps are added to your deck.',
        effects: [{ type: 'totem', id: 'random' }, { type: 'card', id: 'spore_clump' }, { type: 'card', id: 'spore_clump' }] },
      { label: 'Smash it', hint: 'Lose 6 HP and gain 30 gold from the pieces.',
        effects: [{ type: 'hp', amount: -6 }, { type: 'gold', amount: 30 }] },
      { label: 'Leave it', hint: 'Nothing happens.', effects: [] },
    ],
  },
  echoing_hall: {
    title: 'The Echoing Hall', icon: '☾',
    text: 'Your footsteps come back a half-second late, and slightly wrong. The hall waits for you to speak.',
    options: [
      { label: 'Shout', hint: '+1 energy on the first turn of your next 2 fights. Lose 5 max HP.',
        effects: [{ type: 'maxHp', amount: -5 }, { type: 'fightMod', mod: { energy: 1, fights: 2, text: 'The hall answers: +1 energy on turn 1' } }] },
      { label: 'Stay silent', hint: 'Heal 10 HP.', effects: [{ type: 'hp', amount: 10 }] },
    ],
  },
  stray_lens: {
    title: 'A Lens Among the Rocks', icon: '◐',
    text: 'A cut glass lens, wrapped in lamplighter\'s cloth. It still holds a little of somebody\'s light.',
    options: [
      { label: 'Polish it for your lantern', hint: 'Spend 1 oil. A random card is upgraded.',
        effects: [{ type: 'oil', amount: -1 }, { type: 'upgradeRandom' }] },
      { label: 'Sell it later', hint: 'Gain 45 gold.', effects: [{ type: 'gold', amount: 45 }] },
    ],
  },
  locked_chest: {
    title: 'The Locked Chest', icon: '▣',
    text: 'A chest, bound in iron. A keyhole shaped like a flame. It rattles faintly when you lean close.',
    options: [
      { label: 'Force the lock', hint: 'Lose 8 HP. Gain 45 gold and a random card is upgraded.',
        effects: [{ type: 'hp', amount: -8 }, { type: 'gold', amount: 45 }, { type: 'upgradeRandom' }] },
      { label: 'Pick it carefully', hint: '50%: a random totem. 50%: the chest is empty.',
        effects: [{ type: 'gamble', chance: 0.5, win: [{ type: 'totem', id: 'random' }], lose: [] }] },
    ],
  },
};
