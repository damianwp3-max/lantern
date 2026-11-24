// CAVE EVENT SCREEN: a scene, 2-3 options, then what happened.
// Data: data/caveEventsData.js. Rules: caveEvents/caveEvents.js. Styles: css/events.css.
Game.UI.registerScreen('event', function (app) {
  const { esc, statusBar, button } = Game.UI.components;
  const run = Game.State.run;
  const ev = app.caveEvent;
  const def = Game.CAVE_EVENTS[ev.id];

  if (ev.result) {
    const lines = ev.result.length ? ev.result : ['Nothing happens.'];
    return `${statusBar(run)}
      <div class="event-screen"><div class="event-card">
        <div class="event-icon">${esc(def.icon)}</div>
        <h2>${esc(def.title)}</h2>
        <p class="event-chosen muted">You chose: ${esc(ev.picked)}</p>
        <ul class="event-result">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        ${(ev.addedCards || []).length ? `<div class="event-cards">${ev.addedCards.map(cid => Game.UI.components.cardBox(cid)).join('')}</div>` : ''}
        ${button('Continue', 'eventContinue')}
      </div></div>`;
  }

  const options = def.options.map((o, i) => {
    const av = Game.CaveEvents.availability(run, o);
    return `<div class="event-option ${av.ok ? '' : 'disabled'}" ${av.ok ? `data-action="eventChoose" data-arg="${i}"` : ''}>
      <div class="eo-label">${esc(o.label)}</div>
      <div class="eo-hint">${esc(av.ok ? o.hint : av.reason + '. ' + o.hint)}</div>
    </div>`;
  }).join('');

  return `${statusBar(run)}
    <div class="event-screen"><div class="event-card">
      <div class="event-icon">${esc(def.icon)}</div>
      <h2>${esc(def.title)}</h2>
      <p class="event-text">${esc(def.text)}</p>
      <div class="event-options">${options}</div>
    </div></div>`;
});
