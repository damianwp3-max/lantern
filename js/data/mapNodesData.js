// MAP NODE TYPES
// How each kind of map node looks and what the legend says about it.
// To add a node type (shop, event, treasure, ...): add an entry here, use the
// type name in data/levelsData.js rows, and handle it in app/actions/mapActions.js.
Game.MAP_NODES = {
  fight: { icon: '⚔', label: 'Fight', hint: 'A normal fight. Win a card.',  color: '#c0574f' },
  elite: { icon: '☠', label: 'Elite', hint: 'A hard fight. Win a card.',    color: '#d9a441' },
  rest:  { icon: '♨', label: 'Rest',  hint: 'Heal, upgrade a card, refill oil or learn a passive.',    color: '#5fae6a' },
  event: { icon: '?', label: 'Event', hint: 'Something in the dark. A choice with a price.', color: '#6fa8dc' },
  shop:  { icon: '◈', label: 'Merchant', hint: 'Buy cards and totems. Pierce, upgrade or cut cards.', color: '#e0b04a' },
  boss:  { icon: '♛', label: 'Boss',  hint: 'The guardian of this level.',  color: '#c060a0' },
};
