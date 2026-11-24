// LANTERN SCREEN (main menu): spend Embers on permanent lantern upgrades.
// Data: data/lanternData.js. Rules: lantern/lantern.js. Styles: css/lantern.css.
Game.UI.registerScreen('lantern', function () {
  const { esc, button } = Game.UI.components;
  const L = Game.Lantern;
  const rows = Game.LANTERN_UPGRADES.map(u => {
    const lv = L.level(u.id), cost = L.cost(u.id), maxed = cost === null;
    const pips = Array.from({ length: u.max }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('');
    return `<div class="lantern-up ${maxed ? 'maxed' : ''} ${!maxed && !L.canBuy(u.id) ? 'poor' : ''}" style="--uc:${u.color}">
      <div class="lu-icon">${esc(u.icon)}</div>
      <div class="lu-body"><b>${esc(u.name)}</b><span>${esc(u.text)}</span><div class="lu-pips">${pips}</div></div>
      ${maxed ? '<div class="lu-buy done">MAX</div>' : `<button class="lu-buy" data-action="buyLantern" data-arg="${u.id}" ${L.canBuy(u.id) ? '' : 'disabled'}>${cost} <i>✦</i></button>`}
    </div>`;
  }).join('');
  return `<div class="lantern-screen">
    <h1>Your Lantern</h1>
    <p class="muted">Every run earns Embers. Spend them here on upgrades that stay with you for every run.</p>
    <div class="lantern-embers"><i>✦</i><b>${L.embers()}</b> embers</div>
    <div class="lantern-list">${rows}</div>
    ${button('Back', 'toMenu')}
  </div>`;
});
