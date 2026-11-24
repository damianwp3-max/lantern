// CARD RARITY (data only)
// How rare a card looks when it comes out of a card pack: the glow, the label
// and how big the burst is (js/cards/rarity.js picks the tier, js/ui/packs/packOpening.js shows it).
// Tiers, from plain to special: { name, color, burst (particle count), rays (light rays behind) }
// Rules (first that fits wins):
//   overrides[cardId]           a fixed tier for one card
//   the card belongs to a hero  'exclusive'
//   power card or cost 3+       'rare'
//   cost 2 or X cost            'uncommon'
//   anything else               'common'
Game.CARD_RARITY = {
  order: ['common', 'uncommon', 'rare', 'exclusive'],
  tiers: {
    common:    { name: 'Common',    color: '#cfc6d8', burst: 18, rays: false },
    uncommon:  { name: 'Uncommon',  color: '#6fb8ff', burst: 28, rays: false },
    rare:      { name: 'Rare',      color: '#ffcf4a', burst: 44, rays: true },
    exclusive: { name: 'Exclusive', color: '#ff3b4e', burst: 60, rays: true },
  },
  overrides: {},
};
