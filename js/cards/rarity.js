// CARD RARITY (rules; tiers in data/cardRarityData.js)
// Only decides how a card looks when it comes out of a pack. It changes nothing in fights.
//   Game.CardRarity.of(cardId)    tier id ('common', 'uncommon', 'rare', 'exclusive')
//   Game.CardRarity.tier(cardId)  { id, name, color, burst, rays }
//   Game.CardRarity.rank(cardId)  0 = common ... (order in the data) for sorting
Game.CardRarity = (function () {
  const R = () => Game.CARD_RARITY;

  function of(cardId) {
    const base = Game.Cards ? Game.Cards.baseOf(cardId) : cardId;
    if (R().overrides[base]) return R().overrides[base];
    if (Game.Characters && Game.Characters.ownerOf(base)) return 'exclusive';
    const c = Game.CARDS[base] || {};
    if (c.type === 'power' || (typeof c.cost === 'number' && c.cost >= 3)) return 'rare';
    if (c.cost === 2 || c.cost === 'X' || c.xCost) return 'uncommon';
    return 'common';
  }

  const tier = cardId => { const id = of(cardId); return Object.assign({ id }, R().tiers[id]); };
  const rank = cardId => R().order.indexOf(of(cardId));
  return { of, tier, rank };
})();
