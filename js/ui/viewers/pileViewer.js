// PILE VIEWER: the cards in your draw, discard or exhaust pile, in the overlay.
// The draw pile is shown sorted (not in draw order), so it does not give away
// what comes next.
Game.UI.viewers = Game.UI.viewers || {};

Game.UI.viewers.pile = function (combat, which) {
  const { cardBox } = Game.UI.components;
  const piles = {
    draw:    { title: 'Draw pile',    cards: combat.drawPile,    note: 'Shown sorted, not in the order you will draw them.' },
    discard: { title: 'Discard pile', cards: combat.discardPile, note: 'Shuffled back into the draw pile when it runs out.' },
    exhaust: { title: 'Exhausted',    cards: combat.exhausted,   note: 'Gone until the end of this fight.' },
  };
  const pile = piles[which] || piles.draw;
  let cards = pile.cards.slice();
  if (which === 'draw') {
    const order = Object.keys(Game.CARD_TYPES);
    cards.sort((a, b) => order.indexOf(Game.CARDS[a].type) - order.indexOf(Game.CARDS[b].type) || Game.CARDS[a].name.localeCompare(Game.CARDS[b].name));
  }
  const body = cards.length
    ? `<div class="pile-grid">${cards.map(id => cardBox(id)).join('')}</div>`
    : '<p class="muted pile-empty">Empty.</p>';
  Game.UI.overlay.open(`${pile.title} (${cards.length})`, body, { wide: true, note: pile.note });
};
