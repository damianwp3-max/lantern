// CARD PICKER SCREEN: choose one card from your deck to upgrade, pierce or remove.
// Rules: js/picker/picker.js. Clicking a card shows "before -> after" and a Confirm button.
Game.UI.registerScreen('picker', function (app) {
  const { esc, statusBar, cardBox, button } = Game.UI.components;
  const run = Game.State.run, p = app.picker, P = Game.Picker;
  const deck = run.deck.map((id, index) => ({ id, index }));
  const order = Object.keys(Game.CARD_TYPES);
  deck.sort((a, b) => order.indexOf(Game.CARDS[a.id].type) - order.indexOf(Game.CARDS[b.id].type) || Game.CARDS[a.id].name.localeCompare(Game.CARDS[b.id].name));

  // Step 1 (piercing only): pick which piercing you want.
  const offers = p.mode === 'pierce' && p.offers.length ? `<div class="pk-offers">${p.offers.map(id => {
    const x = Game.PIERCINGS[id];
    return `<div class="pk-offer ${p.piercing === id ? 'on' : ''}" style="--pc:${x.color}" data-action="pickPiercing" data-arg="${id}">
      <b><i>${esc(x.icon)}</i>${esc(x.name)}</b><span>${esc(x.text)}</span></div>`;
  }).join('')}</div>` : '';

  const grid = deck.map(({ id, index }) => cardBox(id, {
    action: 'pickCard', arg: index, selected: p.selected === index, disabled: !P.eligible(p, id),
  })).join('');

  let preview = '';
  if (p.selected !== null) {
    const id = run.deck[p.selected], next = P.after(p, id);
    const price = p.cost ? ` for ${p.cost} gold` : '';
    preview = `<div class="pk-preview">
      <div class="pk-card">${cardBox(id)}</div>
      ${next ? `<div class="pk-arrow">→</div><div class="pk-card">${cardBox(next)}</div>` : '<div class="pk-arrow">✂</div>'}
      <div class="pk-confirm">${button(p.confirm + price, 'pickConfirm')}<span class="muted">Click the card again to unselect.</span></div>
    </div>`;
  }

  return `${statusBar(run)}
    <div class="picker-screen">
      <h2>${esc(p.title)}</h2>
      <p class="muted">${esc(p.hint)}</p>
      ${offers}
      ${preview}
      <div class="hand pk-grid">${grid}</div>
      ${p.onCancel ? button('Back', 'pickCancel') : ''}
    </div>`;
});
