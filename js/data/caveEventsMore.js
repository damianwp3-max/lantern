// MORE CAVE EVENTS (data only, same format as data/caveEventsData.js).
// kupka's wish: lots of events, many of them mysterious: the hint does not tell you
// whether it is good or bad, so every run plays out differently.
// Extra effect types used here (chance, removeRandom, transformRandom, cardRandom,
// duplicateRandom, upgradeMany) are explained in js/caveEvents/eventEffectsMore.js.
// Several events sell or grant one specific variant (Timed, Forged, Joker, Lucky,
// Unlucky, Collector, Single-use, X Cost, Pack), so every card can become any of them.
(function () {
  const nothing = { label: 'Leave', hint: 'Nothing happens.', effects: [] };
  Object.assign(Game.CAVE_EVENTS, {
    ticking_wall: {
      title: 'The Ticking Wall', icon: '⏲',
      text: 'Somewhere inside the rock, something ticks. Brass gears peek out of a crack, turning in perfect rhythm.',
      options: [
        { label: 'Press a card against the gears', hint: 'A card of your choice becomes Timed.',
          effects: [{ type: 'pickPierce', piercing: 'timed' }] },
        { label: 'Pry out a gear', hint: 'Who knows what holds the wall together...',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'The gear comes loose. It is solid brass.', effects: [{ type: 'gold', amount: 35 }] },
            { weight: 1, text: 'The wall snaps shut on your fingers.', effects: [{ type: 'hp', amount: -9 }] },
            { weight: 1, text: 'The ticking moves into one of your cards.', effects: [{ type: 'pierceRandom', piercing: 'timed' }] }] }] },
        nothing,
      ],
    },
    dwarven_anvil: {
      title: 'An Anvil Without a Smith', icon: '⚒',
      text: 'A huge anvil, glowing orange. A hammer lies beside it, still warm. Nobody answers when you call out.',
      options: [
        { label: 'Forge a card', hint: 'Lose 7 HP. A card of your choice becomes Forged (+3 damage and block).',
          effects: [{ type: 'hp', amount: -7 }, { type: 'pickPierce', piercing: 'forged' }] },
        { label: 'Swing the hammer blindly', hint: 'The anvil decides.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'Sparks fly into your deck.', effects: [{ type: 'pierceRandom', piercing: 'forged' }] },
            { weight: 1, text: 'The hammer bounces back at you.', effects: [{ type: 'hp', amount: -10 }] },
            { weight: 1, text: 'You hammer two cards into shape.', effects: [{ type: 'upgradeMany', count: 2 }] }] }] },
        nothing,
      ],
    },
    masked_jester: {
      title: 'The Masked Jester', icon: '☺',
      text: 'A figure in a cracked porcelain mask juggles three candles. "A trick for a trick?" it giggles.',
      options: [
        { label: 'Let it touch a card', hint: 'A card of your choice becomes a Joker.',
          effects: [{ type: 'pickPierce', piercing: 'joker' }] },
        { label: 'Ask for a different trick', hint: 'The jester grins wider.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'It pulls a card out of your ear.', effects: [{ type: 'cardRandom', pierce: 'joker' }] },
            { weight: 1, text: 'It swaps one of your cards for something else.', effects: [{ type: 'transformRandom' }] },
            { weight: 1, text: 'It steals your purse and vanishes.', effects: [{ type: 'gold', amount: -25 }] },
            { weight: 1, text: 'It laughs and hands you a pouch of coins.', effects: [{ type: 'gold', amount: 40 }] }] }] },
        nothing,
      ],
    },
    clover_patch: {
      title: 'Glowing Clover', icon: '☘',
      text: 'Deep underground, where no sun has ever reached, a patch of clover glows faintly green.',
      options: [
        { label: 'Pick a four-leaf one', hint: 'A card of your choice becomes Lucky.',
          effects: [{ type: 'pickPierce', piercing: 'lucky' }] },
        { label: 'Eat a handful', hint: 'It smells sweet. Maybe too sweet.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'You feel wonderfully healthy.', effects: [{ type: 'maxHp', amount: 6 }] },
            { weight: 1, text: 'Your stomach turns.', effects: [{ type: 'hp', amount: -8 }, { type: 'pierceRandom', piercing: 'unlucky' }] }] }] },
        nothing,
      ],
    },
    black_cat: {
      title: 'A Black Cat', icon: '☾',
      text: 'A thin black cat sits in the middle of the tunnel and stares at you. It does not move out of the way.',
      options: [
        { label: 'Step around it', hint: 'It crosses your path anyway. A random card turns Unlucky, but you find 50 gold where it sat.',
          effects: [{ type: 'pierceRandom', piercing: 'unlucky' }, { type: 'gold', amount: 50 }] },
        { label: 'Stroke it', hint: 'Cats are hard to read.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'It purrs. One of your cards feels lucky.', effects: [{ type: 'pierceRandom', piercing: 'lucky' }] },
            { weight: 1, text: 'It scratches you and runs.', effects: [{ type: 'hp', amount: -5 }] },
            { weight: 1, text: 'It leads you to a forgotten stash.', effects: [{ type: 'oil', amount: 3 }, { type: 'gold', amount: 20 }] }] }] },
        { label: 'Go back the other way', hint: 'Lose 1 oil finding another path.', effects: [{ type: 'oil', amount: -1 }] },
      ],
    },
    hoarders_nest: {
      title: "The Hoarder's Nest", icon: '❖',
      text: 'A nest woven from string, buttons and old cards. Whatever built it liked to keep things.',
      options: [
        { label: 'Weave a card into the nest', hint: 'Pick Timed, Lucky or Joker, then the card that takes it.',
          effects: [{ type: 'pickPierce' }] },
        { label: 'Dig through it', hint: 'Something might still live here.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'You find a card in good condition.', effects: [{ type: 'cardRandom' }] },
            { weight: 1, text: 'Something bites. Its webs cling to your deck.', effects: [{ type: 'hp', amount: -4 }, { type: 'card', id: 'cobweb' }] },
            { weight: 1, text: 'A shiny trinket!', effects: [{ type: 'totem', id: 'random' }] }] }] },
        nothing,
      ],
    },
    candle_altar: {
      title: 'Altar of One Candle', icon: '♁',
      text: 'One tall candle burns on a stone altar. It never gets shorter. Carved letters read: ONCE IS ENOUGH.',
      options: [
        { label: 'Pass a card through the flame', hint: 'A card of your choice becomes Single-use (once per fight).',
          effects: [{ type: 'pickPierce', piercing: 'single' }] },
        { label: 'Blow it out', hint: 'Surely nothing bad happens.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'Darkness. When the light returns, a card is gone.', effects: [{ type: 'removeRandom' }] },
            { weight: 1, text: 'The candle relights itself and warms you.', effects: [{ type: 'hp', amount: 12 }] },
            { weight: 1, text: 'The wax drips into your lantern.', effects: [{ type: 'oil', amount: 4 }] }] }] },
        nothing,
      ],
    },
    overflowing_basin: {
      title: 'The Overflowing Basin', icon: '♒',
      text: 'A basin fills with glowing water, spills over, and fills again. It never stops.',
      options: [
        { label: 'Dip a card', hint: 'Pay 20 gold. A card of your choice gets the X Cost mark.',
          effects: [{ type: 'gold', amount: -20 }, { type: 'pickPierce', piercing: 'x' }] },
        { label: 'Drink until you are full', hint: 'Heal 20 HP, but your next 2 fights start with 5 HP less.',
          effects: [{ type: 'hp', amount: 20 }, { type: 'fightMod', mod: { hp: -5, fights: 2, text: 'Heavy stomach: -5 HP at fight start' } }] },
        nothing,
      ],
    },
    peddlers_sack: {
      title: "A Peddler's Lost Sack", icon: '♜',
      text: 'A big sack with a broken strap. It is full of little parcels tied with string.',
      options: [
        { label: 'Wrap a card up', hint: 'A card of your choice becomes a Pack (a random card in your hand each fight).',
          effects: [{ type: 'pickPierce', piercing: 'pack' }] },
        { label: 'Open a parcel', hint: 'Every parcel feels different.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'A pack of cards!', effects: [{ type: 'cardRandom', cardType: 'pack' }] },
            { weight: 1, text: 'Coins.', effects: [{ type: 'gold', amount: 30 }] },
            { weight: 1, text: 'Moldy bread. Spores everywhere.', effects: [{ type: 'card', id: 'spore_clump' }] }] }] },
        { label: 'Carry it to the next merchant', hint: 'Gain 25 gold.', effects: [{ type: 'gold', amount: 25 }] },
      ],
    },
    mirror_pool: {
      title: 'The Mirror Pool', icon: '◎',
      text: 'The water is so still it looks like glass. Your reflection holds a card you do not remember owning.',
      options: [
        { label: 'Reach for the reflection', hint: 'A copy of a random card in your deck joins it.',
          effects: [{ type: 'duplicateRandom' }] },
        { label: 'Throw a card in', hint: 'The pool takes. Does it give?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'It sinks. Nothing comes back.', effects: [{ type: 'removeRandom' }] },
            { weight: 2, text: 'It floats back changed.', effects: [{ type: 'transformRandom' }, { type: 'upgradeRandom' }] }] }] },
        nothing,
      ],
    },
    bone_dice: {
      title: 'Dice of Bone', icon: '⚄',
      text: 'Two dice carved from knuckle bones rest on a flat rock. They are still warm, as if just thrown.',
      options: [
        { label: 'Roll them', hint: 'Snake eyes or sixes?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'Double six!', effects: [{ type: 'gold', amount: 60 }, { type: 'upgradeRandom' }] },
            { weight: 2, text: 'A fair roll.', effects: [{ type: 'gold', amount: 20 }] },
            { weight: 1, text: 'Snake eyes. Something bad follows you.', effects: [{ type: 'pierceRandom', piercing: 'unlucky' }, { type: 'hp', amount: -6 }] }] }] },
        { label: 'Pocket them', hint: 'A random card becomes a Joker.', effects: [{ type: 'pierceRandom', piercing: 'joker' }] },
        nothing,
      ],
    },
    hollow_merchant: {
      title: 'A Hollow Merchant', icon: '⚖',
      text: 'A coat stands on its own behind a little table. There is nobody inside it. A voice says: "Fair trades only."',
      options: [
        { label: 'Trade blood for a card', hint: 'Lose 6 max HP. Gain a random card with a random mark.',
          effects: [{ type: 'maxHp', amount: -6 }, { type: 'cardRandom', pierce: 'random' }] },
        { label: 'Trade a card for gold', hint: 'Remove a card of your choice. Gain 45 gold.',
          effects: [{ type: 'pickRemove' }, { type: 'gold', amount: 45 }] },
        { label: 'Trade gold for a mark', hint: 'Pay 30 gold. Choose one of 3 marks and the card.',
          effects: [{ type: 'gold', amount: -30 }, { type: 'pickPierce' }] },
      ],
    },
    fungal_ring: {
      title: 'A Ring of Mushrooms', icon: '⚘',
      text: 'Pale mushrooms grow in a perfect circle. The air inside it shimmers.',
      options: [
        { label: 'Step inside', hint: 'Old stories say not to.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'Time slips. You wake rested.', effects: [{ type: 'hp', amount: 25 }] },
            { weight: 1, text: 'Time slips. Your lantern burned while you slept.', effects: [{ type: 'oil', amount: -4 }] },
            { weight: 1, text: 'Spores settle into your cards, but you feel stronger.', effects: [{ type: 'card', id: 'spore_clump' }, { type: 'fightMod', mod: { strength: 2, fights: 3, text: 'Fungal vigor: +2 strength' } }] }] }] },
        { label: 'Pick a mushroom', hint: '+3 max HP.', effects: [{ type: 'maxHp', amount: 3 }] },
        nothing,
      ],
    },
    singing_bones: {
      title: 'The Singing Bones', icon: '♫',
      text: 'A pile of bones hums a low song. The tune is sad, and very old. It sounds like it wants company.',
      options: [
        { label: 'Hum along', hint: 'The bones remember you.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'The song gives you courage.', effects: [{ type: 'fightMod', mod: { block: 8, fights: 3, text: 'Bone song: 8 block at fight start' } }] },
            { weight: 1, text: 'The song makes you weep. You feel lighter.', effects: [{ type: 'pickRemove' }] },
            { weight: 1, text: 'The song never leaves your head.', effects: [{ type: 'card', id: 'gloom' }] }] }] },
        { label: 'Take a bone', hint: 'Gain 15 gold. Lose 3 HP.', effects: [{ type: 'gold', amount: 15 }, { type: 'hp', amount: -3 }] },
        nothing,
      ],
    },
    collapsed_tunnel: {
      title: 'Collapsed Tunnel', icon: '⛰',
      text: 'Rocks block the way. You can hear water on the other side, and something breathing.',
      options: [
        { label: 'Dig through', hint: 'Lose 8 HP. Find what is on the other side.',
          effects: [{ type: 'hp', amount: -8 }, { type: 'chance', outcomes: [
            { weight: 1, text: 'A lamplighter\'s old pack.', effects: [{ type: 'cardRandom' }, { type: 'oil', amount: 2 }] },
            { weight: 1, text: 'A sleeping creature. You sneak past with its gold.', effects: [{ type: 'gold', amount: 45 }] }] }] },
        { label: 'Squeeze through a gap', hint: 'Lose 2 oil. You lose a card on the way.', effects: [{ type: 'oil', amount: -2 }, { type: 'removeRandom' }] },
      ],
    },
    lost_lamplighter: {
      title: 'Another Lamplighter', icon: '♙',
      text: 'An old lamplighter sits by a dying lamp, shivering. "My oil is gone," she says. "I will not make it back."',
      options: [
        { label: 'Share your oil', hint: 'Give 3 oil. She teaches you something.',
          effects: [{ type: 'oil', amount: -3 }, { type: 'pickUpgrade' }, { type: 'maxHp', amount: 3 }] },
        { label: 'Take her lantern', hint: 'She will not stop you.',
          effects: [{ type: 'oil', amount: 5 }, { type: 'card', id: 'gloom' }, { type: 'card', id: 'gloom' }] },
        { label: 'Wish her luck', hint: 'Nothing happens.', effects: [] },
      ],
    },
    whispering_crate: {
      title: 'A Crate That Whispers', icon: '▦',
      text: 'A plain wooden crate, nailed shut. From inside, something whispers your name. Correctly.',
      options: [
        { label: 'Open it', hint: '...',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'A totem, wrapped in silk.', effects: [{ type: 'totem', id: 'random' }] },
            { weight: 1, text: 'Moths! Thousands of them.', effects: [{ type: 'oil', amount: -3 }, { type: 'hp', amount: -4 }] },
            { weight: 1, text: 'An empty crate. And a voice in your deck.', effects: [{ type: 'pierceRandom' }] },
            { weight: 1, text: 'Cobwebs pour out.', effects: [{ type: 'card', id: 'cobweb' }, { type: 'card', id: 'cobweb' }] }] }] },
        { label: 'Answer the whisper', hint: 'Lose 4 HP. Upgrade a random card.', effects: [{ type: 'hp', amount: -4 }, { type: 'upgradeRandom' }] },
        nothing,
      ],
    },
    vampire_fountain: {
      title: 'The Red Fountain', icon: '♥',
      text: 'A fountain of thick, dark red liquid. It smells like iron and roses. Your fangs ache.',
      options: [
        { label: 'Drink', hint: 'Heal to full. Your next 3 fights, enemies have 15% more HP.',
          effects: [{ type: 'hp', amount: 999 }, { type: 'fightMod', mod: { enemyHpMult: 1.15, fights: 3, text: 'Blood scent: enemies +15% HP' } }] },
        { label: 'Fill a vial', hint: 'Gain 5 max HP. Lose 10 HP.', effects: [{ type: 'maxHp', amount: 5 }, { type: 'hp', amount: -10 }] },
        nothing,
      ],
    },
    rusted_cage: {
      title: 'The Rusted Cage', icon: '▥',
      text: 'A small cage hangs from a chain. Something inside it glows and taps against the bars.',
      options: [
        { label: 'Break it open', hint: 'Will it thank you?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'A grateful wisp blesses your lantern.', effects: [{ type: 'oil', amount: 4 }, { type: 'fightMod', mod: { energy: 1, fights: 2, text: 'Wisp blessing: +1 energy on turn 1' } }] },
            { weight: 1, text: 'It bites and flies off with your gold.', effects: [{ type: 'gold', amount: -30 }, { type: 'hp', amount: -3 }] }] }] },
        { label: 'Sell the cage', hint: 'Gain 30 gold.', effects: [{ type: 'gold', amount: 30 }] },
        nothing,
      ],
    },
    deep_echo: {
      title: 'A Voice From Below', icon: '⌇',
      text: 'From a crack in the floor, a voice asks: "Which do you value more, your blood or your cards?"',
      options: [
        { label: '"My blood."', hint: 'Remove a card of your choice.', effects: [{ type: 'pickRemove' }] },
        { label: '"My cards."', hint: 'Lose 8 max HP. Upgrade 2 random cards.', effects: [{ type: 'maxHp', amount: -8 }, { type: 'upgradeMany', count: 2 }] },
        { label: '"Neither."', hint: 'The voice laughs.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: '"Brave." Something heavy lands at your feet.', effects: [{ type: 'gold', amount: 55 }] },
            { weight: 1, text: '"Liar." The floor bites.', effects: [{ type: 'hp', amount: -12 }] }] }] },
      ],
    },
    shrine_of_thorns: {
      title: 'Shrine of Thorns', icon: '✠',
      text: 'A shrine wrapped in black thorns. A card-shaped hollow sits in the middle, waiting.',
      options: [
        { label: 'Offer your hand', hint: 'Lose 10 HP. A random card is upgraded and a random card gets a random mark.',
          effects: [{ type: 'hp', amount: -10 }, { type: 'upgradeRandom' }, { type: 'pierceRandom' }] },
        { label: 'Offer a card', hint: 'Remove a card of your choice. Heal 10 HP.', effects: [{ type: 'pickRemove' }, { type: 'hp', amount: 10 }] },
        nothing,
      ],
    },
    gambling_rats: {
      title: 'Rats Playing Cards', icon: '♣',
      text: 'Three rats sit around a tiny table with a tiny deck. They look up at you. One deals you in.',
      options: [
        { label: 'Bet 25 gold', hint: 'Rats cheat. Probably.',
          effects: [{ type: 'gold', amount: -25 }, { type: 'chance', outcomes: [
            { weight: 2, text: 'You win the pot!', effects: [{ type: 'gold', amount: 70 }] },
            { weight: 3, text: 'You lose. The rats squeak happily.', effects: [] }] }] },
        { label: 'Bet a card', hint: 'Win and they give you one of theirs.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'You win their best card.', effects: [{ type: 'cardRandom', pierce: 'lucky' }] },
            { weight: 1, text: 'They take one of yours.', effects: [{ type: 'removeRandom' }] }] }] },
        nothing,
      ],
    },
    glowing_egg: {
      title: 'A Glowing Egg', icon: '◯',
      text: 'An egg the size of your head, warm and pulsing with light. Something inside moves.',
      options: [
        { label: 'Warm it with your lantern', hint: 'Spend 2 oil and wait.',
          effects: [{ type: 'oil', amount: -2 }, { type: 'chance', outcomes: [
            { weight: 1, text: 'A tiny lantern-bird hatches and leaves you a gift.', effects: [{ type: 'totem', id: 'random' }] },
            { weight: 1, text: 'It hatches, screams, and flies at your face.', effects: [{ type: 'hp', amount: -7 }, { type: 'gold', amount: 20 }] }] }] },
        { label: 'Eat it', hint: '+5 max HP. Something in your stomach keeps glowing.',
          effects: [{ type: 'maxHp', amount: 5 }, { type: 'card', id: 'gloom' }] },
        nothing,
      ],
    },
    painted_door: {
      title: 'A Door Painted on Stone', icon: '⌂',
      text: 'A door, painted on the bare rock. The paint is fresh. The handle is real.',
      options: [
        { label: 'Knock', hint: 'Someone might answer.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'A hand passes you a lantern full of oil.', effects: [{ type: 'oil', amount: 6 }] },
            { weight: 1, text: 'A hand passes you a card.', effects: [{ type: 'cardRandom' }] },
            { weight: 1, text: 'A hand grabs your purse.', effects: [{ type: 'gold', amount: -20 }] }] }] },
        { label: 'Open it', hint: 'Lose 5 HP. Upgrade a random card. Transform a random card.',
          effects: [{ type: 'hp', amount: -5 }, { type: 'upgradeRandom' }, { type: 'transformRandom' }] },
        nothing,
      ],
    },
    ember_spring: {
      title: 'Ember Spring', icon: '♨',
      text: 'Hot water bubbles out of the rock, full of tiny floating embers. Steam fills the cave.',
      options: [
        { label: 'Bathe', hint: 'Heal 14 HP.', effects: [{ type: 'hp', amount: 14 }] },
        { label: 'Temper a card in the water', hint: 'A random card becomes Forged.', effects: [{ type: 'pierceRandom', piercing: 'forged' }] },
        { label: 'Catch embers in your lantern', hint: 'The embers may not like it.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'Your lantern glows brighter.', effects: [{ type: 'oil', amount: 5 }] },
            { weight: 1, text: 'They burn your hands. One sticks to your deck.', effects: [{ type: 'hp', amount: -4 }, { type: 'card', id: 'cinder_burn' }] }] }] },
      ],
    },
    clockwork_owl: {
      title: 'The Clockwork Owl', icon: '◕',
      text: 'A brass owl on a branch of iron. Its head turns with a click. "Hoo. Rhythm is everything. Hoo."',
      options: [
        { label: 'Listen to its lesson', hint: 'Two random cards become Timed.',
          effects: [{ type: 'pierceRandom', piercing: 'timed' }, { type: 'pierceRandom', piercing: 'timed' }] },
        { label: 'Wind it up', hint: 'Lose 3 HP. Gain 1 energy on turn 1 of your next 3 fights.',
          effects: [{ type: 'hp', amount: -3 }, { type: 'fightMod', mod: { energy: 1, fights: 3, text: 'Wound up: +1 energy on turn 1' } }] },
        nothing,
      ],
    },
    shadow_double: {
      title: 'Your Shadow Walks Off', icon: '♟',
      text: 'Your shadow peels away from the wall and stands up. It looks at you, then at your deck.',
      options: [
        { label: 'Chase it', hint: 'Lose 6 HP. It drops something.',
          effects: [{ type: 'hp', amount: -6 }, { type: 'chance', outcomes: [
            { weight: 1, text: 'A copy of one of your cards.', effects: [{ type: 'duplicateRandom' }] },
            { weight: 1, text: 'One of your cards, upgraded.', effects: [{ type: 'upgradeRandom' }] }] }] },
        { label: 'Let it go', hint: 'It takes something with it.', effects: [{ type: 'removeRandom' }, { type: 'gold', amount: 15 }] },
      ],
    },
    tarot_reader: {
      title: 'The Tarot Reader', icon: '✦',
      text: 'An old woman lays three cards face down on a cloth. "Pick one," she says. "No refunds."',
      options: [
        { label: 'The left card', hint: '?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'The Sun. Warmth floods you.', effects: [{ type: 'maxHp', amount: 7 }] },
            { weight: 1, text: 'The Tower. Something breaks.', effects: [{ type: 'hp', amount: -10 }] }] }] },
        { label: 'The middle card', hint: '?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'The Wheel. Luck turns your way.', effects: [{ type: 'pierceRandom', piercing: 'lucky' }, { type: 'pierceRandom', piercing: 'lucky' }] },
            { weight: 1, text: 'The Fool. Luck turns away.', effects: [{ type: 'pierceRandom', piercing: 'joker' }, { type: 'pierceRandom', piercing: 'unlucky' }] }] }] },
        { label: 'The right card', hint: '?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'The Star. A gift.', effects: [{ type: 'totem', id: 'random' }] },
            { weight: 1, text: 'The Moon. Fog fills your lantern.', effects: [{ type: 'oil', amount: -5 }] }] }] },
      ],
    },
    abandoned_camp: {
      title: 'An Abandoned Camp', icon: '⛺',
      text: 'A bedroll, a cold fire, a half-eaten meal. Whoever camped here left in the middle of dinner.',
      options: [
        { label: 'Rest a while', hint: 'Heal 10 HP.', effects: [{ type: 'hp', amount: 10 }] },
        { label: 'Search the bags', hint: 'Why did they run?',
          effects: [{ type: 'chance', outcomes: [
            { weight: 2, text: 'Supplies!', effects: [{ type: 'gold', amount: 25 }, { type: 'oil', amount: 2 }] },
            { weight: 1, text: 'Whatever scared them comes back.', effects: [{ type: 'hp', amount: -11 }] }] }] },
        { label: 'Read their journal', hint: 'Upgrade a card of your choice.', effects: [{ type: 'pickUpgrade' }] },
      ],
    },
    cracked_hourglass: {
      title: 'A Cracked Hourglass', icon: '⌛',
      text: 'An hourglass as tall as you, cracked down the side. Sand leaks out and floats upward.',
      options: [
        { label: 'Turn it over', hint: 'Time flows strangely.',
          effects: [{ type: 'chance', outcomes: [
            { weight: 1, text: 'Your wounds close as if they never were.', effects: [{ type: 'hp', amount: 18 }] },
            { weight: 1, text: 'You feel older.', effects: [{ type: 'maxHp', amount: -4 }, { type: 'upgradeMany', count: 2 }] },
            { weight: 1, text: 'A card falls out of time.', effects: [{ type: 'cardRandom', pierce: 'timed' }] }] }] },
        { label: 'Collect the floating sand', hint: 'Gain 35 gold.', effects: [{ type: 'gold', amount: 35 }] },
        nothing,
      ],
    },
  });
})();
