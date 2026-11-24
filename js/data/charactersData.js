// HEROES (data only)
// Every playable hero is one entry. The hero picked on the character select
// screen (after New Run) decides the start of the run.
//   name, title, blurb   what the select screen shows
//   color                accent color of the hero's frame
//   art                  key in Game.CHARACTER_ARTS (the SVG drawing, data/characterArt.js)
//   hp, energy           starting max HP and energy per turn
//   deck                 starting deck; leave it out to use the standard one: Game.STARTER_DECK
//                        (data/cardsData.js) plus the hero's signature cards
//   signatures           the hero's signature card ids: exclusive cards the hero has from the
//                        very start (in the starting deck, never locked, never a reward).
//                        kupka's rule: every hero starts with TWO exclusive cards.
//   passives             passive ids the hero starts with (data/heroPassivesData.js)
//   cards                exclusive cards: only this hero can find them as rewards
//   unlockPerLevel       exclusive cards unlocked per explorer level gained while playing
//                        this hero (they start locked; js/unlocks/heroUnlocks.js)
//   cardFx               special look of the hero's cards in fights ('blood': js/ui/blood/bloodDrip.js)
//   packStyle, packName, packColor   look of the hero's card pack (data/cardPacksData.js,
//                        drawings in js/ui/packs/packArt.js)
// New hero: add an entry here (plus art in Game.CHARACTER_ARTS, passives in
// data/heroPassivesData.js and a kit file like data/heroes/lamplighterKit.js).
Game.CHARACTER_ARTS = Object.assign(Game.CHARACTER_ARTS || {}, {
  lamplighter: Game.CHARACTER_ART,
});

Game.CHARACTERS = {
  lamplighter: {
    name: 'Lamplighter',
    title: 'Keeper of the last lantern',
    blurb: 'A pale noble of the night with a silver lantern. She drinks the life of everything she strikes and fights beside her loyal Bat.',
    color: '#d9a441',
    art: 'lamplighter',
    hp: 70,
    energy: 3,
    signatures: ['vampire_bite', 'bat_familiar'],
    passives: ['vampiric_lifesteal'],
    // Her other 8 exclusive cards (data/heroes/lamplighterKit.js), unlocked 2 per level and
    // revealed in her Blood Pack. Her old lantern cards are now ordinary cards in the
    // unlock sets / reward pool for every hero.
    cards: ['sanguine_thirst', 'crimson_rite', 'last_sip', 'engorge',
      'crimson_feast', 'blood_lash', 'blood_bond', 'vampiric_speed'],
    unlockPerLevel: 2,
    cardFx: 'blood',
    packStyle: 'blood',
    packName: 'Blood Pack',
    packColor: '#8a0f1f',
  },
};

// The hero picked by default, and how many places the select screen shows
// (empty places say "Coming soon" until more heroes are added).
Game.CHARACTER_DEFAULT = 'lamplighter';
Game.CHARACTER_SLOTS = 4;
