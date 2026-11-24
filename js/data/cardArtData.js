// CARD ART DATA
// Which picture each card shows. One entry per card id:
//   motif: a drawing from js/ui/cardArt.js (slash, burst, lash, sparks, shield,
//          cloak, bash, draw, energyDraw, energy, nova, flame, emberHeart,
//          spores, rune) plus the ones in js/ui/cardMotifs/mechanicMotifs.js
//          (wave, rain, chain, ring, beam, hourglass, fuse, keg, moon, echo, seed,
//          dice, coin, bag, moth, vial, eye, droplet, crack, heart, mirror, bell, gear, crown)
// Cards in js/data/cards/*.js carry their own art: { motif, color } instead.
//   color: main color of the drawing (optional)
// A card with no entry here still gets a picture: it is picked from the card's
// first effect (see Game.CARD_ART_DEFAULTS below).
Game.CARD_ART = {
  strike_lamp:   { motif: 'slash',      color: '#e8a54b' },
  brace:         { motif: 'shield',     color: '#6f9be0' },
  rummage:       { motif: 'draw',       color: '#c9b98f' },
  wick_lash:     { motif: 'lash',       color: '#f0c060' },
  heavy_lantern: { motif: 'burst',      color: '#ff7a3a' },
  twin_sparks:   { motif: 'sparks',     color: '#ffd35a' },
  soot_cloak:    { motif: 'cloak',      color: '#8a90a8' },
  shield_bash:   { motif: 'bash',       color: '#d97b52' },
  second_wind:   { motif: 'energyDraw', color: '#7fd6c2' },
  lantern_nova:  { motif: 'nova',       color: '#ffb347' },
  kindle:        { motif: 'flame',      color: '#ff9a3c' },
  ember_heart:   { motif: 'emberHeart', color: '#ff5a4a' },
  spore_clump:   { motif: 'spores',     color: '#8a9a6a' },
};

// Fallback picture per effect type, for cards without an entry above.
Game.CARD_ART_DEFAULTS = {
  damage: { motif: 'slash',  color: '#e8a54b' },
  block:  { motif: 'shield', color: '#6f9be0' },
  draw:   { motif: 'draw',   color: '#c9b98f' },
  energy: { motif: 'energy', color: '#7fd6c2' },
  strength: { motif: 'flame', color: '#ff9a3c' },
  status: { motif: 'droplet', color: '#8fd45a' },
  nextTurn: { motif: 'hourglass', color: '#7fd6c2' },
  randomOf: { motif: 'dice', color: '#ffd35a' },
  addRandomCard: { motif: 'bag', color: '#c9b98f' },
  power:  { motif: 'gear',  color: '#b59ad9' },
  heal:   { motif: 'heart', color: '#ff9ab0' },
  _other: { motif: 'rune',   color: '#b59ad9' },
};
