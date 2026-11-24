// CARD TYPES AND COST COLORS
// Every card in data/cardsData.js has one "type" from this list.
//   label: shown on the card   color: frame and tag color
//   leavesFight: after playing, the card is gone until the fight ends (powers)
// New type = add one entry here (and use it in cardsData.js).
Game.CARD_TYPES = {
  attack:  { label: 'Attack',  color: '#c0463e' },
  defense: { label: 'Defense', color: '#4a7fc5' },
  hybrid:  { label: 'Attack + Defense', color: '#b9823c' },
  skill:   { label: 'Skill',   color: '#4f9a6a' },
  power:   { label: 'Power',   color: '#9a5ad0', leavesFight: true },
  pack:    { label: 'Pack',    color: '#c58a4a' },
  useless: { label: 'Useless', color: '#6a6570' },
};

// Cost bubble color by energy cost: 0 grey, 1 green, 2 yellow, 3+ red.
Game.COST_COLORS = ['#8f8a96', '#56b04e', '#e0b83e', '#d2453b'];
