// CARD PACKS (data only)
// Unlocked cards are not shown the moment they unlock: they arrive as card packs
// that you open on the end-of-run screen (js/packs/cardPacks.js, js/ui/packs/*.js).
//   kinds.unlock   one pack per explorer level gained: holds the card set that level unlocked
//   kinds.hero     one pack per explorer level gained with a hero: holds that hero's
//                  exclusive cards that level unlocked (charactersData.js unlockPerLevel)
// Each kind: { name, tagline, style, color, glow }
//   style    which drawing js/ui/packs/packArt.js uses ('lantern' or a hero's packStyle)
//   color    main foil color, glow: light that bursts out when it opens
// A hero can pick its own look with `packStyle` and `packName` in data/charactersData.js;
// new looks are drawn in js/ui/packs/packArt.js (registerStyle).
Game.CARD_PACKS = {
  kinds: {
    unlock: { name: 'Explorer Pack', tagline: 'A new card set', style: 'lantern', color: '#d9a441', glow: '#ffd35a' },
    hero:   { name: 'Hero Pack', tagline: 'Exclusive hero cards', style: 'lantern', color: '#b0342f', glow: '#ff5a5a' },
  },
  // A hero level-up that has no exclusive card left to give pays this many embers instead,
  // as a pack that bursts open into the number (js/packs/cardPacks.js).
  bonusEmbers: 4,
  // Opening timings (ms): pack flies to the middle, shakes, tears open, cards spread out.
  timing: { fly: 520, charge: 1100, tear: 520, spread: 620, flip: 560, autoNext: 0 },
};
