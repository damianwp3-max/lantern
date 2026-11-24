// CARD REGISTRY
// Lets card data live in many small themed files (js/data/cards/*.js).
// Each file calls Game.registerCards({ id: { ...card } }).
//   - the card is added to Game.CARDS
//   - it joins the reward pool unless it has reward: false
//   - an optional art: { motif, color } goes to Game.CARD_ART (see data/cardArtData.js)
// So a new card is still one entry in one data file.
Game.registerCards = function (cards) {
  Game.CARDS = Game.CARDS || {};
  Game.REWARD_POOL = Game.REWARD_POOL || [];
  Game.CARD_ART = Game.CARD_ART || {};
  Object.entries(cards).forEach(([id, card]) => {
    // A card with an innate piercing (pierce: 'x') gets its flags right away.
    const innate = card.pierce && Game.PIERCINGS && Game.PIERCINGS[card.pierce];
    if (innate) Object.assign(card, innate.flags);
    Game.CARDS[id] = card;
    if (card.art) Game.CARD_ART[id] = card.art;
    if (card.reward !== false && card.type !== 'useless' && !Game.REWARD_POOL.includes(id)) Game.REWARD_POOL.push(id);
  });
};
