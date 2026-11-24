// JUNK RULES: what junk cards (data/cards/junkCards.js) do while they sit in your hand.
//   burnInHand: N   lose N HP if the card is still in your hand when your turn ends.
// Hooks 'turn:ending' (combat.js, fired before the hand is discarded).
(function () {
  Game.Events.on('turn:ending', ({ combat: c }) => {
    const burn = c.hand.reduce((s, id) => s + ((Game.CARDS[id] && Game.CARDS[id].burnInHand) || 0), 0);
    if (burn > 0) Game.Effects.loseHp(c, { amount: burn });
  });
})();
