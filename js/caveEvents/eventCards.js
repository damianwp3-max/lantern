// EVENT CARDS: remembers which cards an event just put into your deck, so the result screen can show the
// real card faces (you see what e.g. the Dagger Pouch actually does). kupka, 2026-11-23.
// Listens to 'deck:cardAdded' { from: 'event' }; the list lives on app.caveEvent.addedCards.
(function () {
  Game.Events.on('deck:cardAdded', ({ cardId, from }) => {
    const ev = Game.App && Game.App.state && Game.App.state.caveEvent;
    if (!ev || from !== 'event' || !Game.CARDS[cardId]) return;
    (ev.addedCards = ev.addedCards || []).push(cardId);
  });
})();
