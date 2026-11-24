// CARD LIBRARY SCREEN: every card in the game, with type tabs and an "Upgraded" toggle.
// Locked cards are shown too (greyed, with a lock) so you can see what is coming.
// Rules: js/library/library.js. Styles: css/library.css. Opened from the main menu and the Unlocks screen.
Game.UI.registerScreen('library', function (app) {
  const { esc, cardBox } = Game.UI.components;
  const L = Game.Library;
  const f = app.library || (app.library = { type: 'all', upgraded: false });
  const ids = L.filtered(f);
  const tabs = L.tabs().map(t => {
    const label = t === 'all' ? 'All' : (Game.CARD_TYPES[t].label || t);
    const n = t === 'all' ? L.all().length : L.all().filter(id => Game.CARDS[id].type === t).length;
    return `<button class="lib-tab ${f.type === t ? 'on' : ''}" data-action="libraryTab" data-arg="${t}" style="--tc:${t === 'all' ? '#d9a441' : Game.CARD_TYPES[t].color}">${esc(label)} <small>${n}</small></button>`;
  }).join('');
  const cards = ids.map(id => {
    const locked = L.isLocked(id);
    return `<div class="lib-card ${locked ? 'locked' : ''}">${cardBox(id)}${locked ? '<span class="lib-lock">Locked</span>' : ''}${L.isStarter(id) ? '<span class="lib-start">Starter</span>' : ''}</div>`;
  }).join('');
  const backIcon = '<svg class="deck-back-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  return `<section class="deck-view library-view">
      <header class="deck-head">
        <h2>Card Library (${L.all().length})</h2>
        <button class="deck-back" data-action="libraryBack">${backIcon}Back</button>
      </header>
      <div class="lib-bar">${tabs}
        <button class="lib-tab lib-up ${f.upgraded ? 'on' : ''}" data-action="libraryUpgraded" style="--tc:#ffd35a">▲ Show upgraded</button>
      </div>
      <div class="deck-cards hand lib-cards">${cards}</div>
    </section>`;
});
