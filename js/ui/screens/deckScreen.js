// DECK VIEWER SCREEN
// Header row (title + Back at the top right) sits above the card area, so the
// cards can never cover the Back button. Styles: css/deckViewer.css.
Game.UI.registerScreen('deck', function () {
  const { button, cardBox, statusBar } = Game.UI.components;
  const run = Game.State.run;
  const backIcon = '<svg class="deck-back-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return `${statusBar(run)}
    <section class="deck-view">
      <header class="deck-head">
        <h2>Your deck (${run.deck.length})</h2>
        <button class="deck-back" data-action="back">${backIcon}Back</button>
      </header>
      <div class="deck-cards hand">${run.deck.map(id => cardBox(id)).join('')}</div>
    </section>`;
});
