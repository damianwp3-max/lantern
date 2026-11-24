// ACTIVE EFFECTS VIEWER: everything working for you right now, in the overlay:
// powers from cards (with stacks), strength, waiting "next turn" effects,
// and your passives for the run. Statuses on you are listed too.
Game.UI.viewers = Game.UI.viewers || {};

Game.UI.viewers.powers = function (combat) {
  const esc = Game.UI.components.esc;
  const T = Game.UI.tipText;
  const row = (pic, t, extra = '') => `<div class="pw-row" style="--tip:${t.color}">
      <div class="pw-pic">${pic}</div>
      <div class="pw-info"><div class="pw-title">${esc(t.title)} <span class="tip-label">${esc(t.label || '')}</span></div>
      <div class="pw-text">${esc(t.text)}</div>${extra}</div></div>`;
  // A power from a card shows that card's picture when there is one.
  const powerPic = (id, icon) => Game.CARDS[id] && Game.UI.cardArt
    ? `<div class="pw-art">${Game.UI.cardArt.render(id)}</div>` : `<span class="pw-glyph">${esc(icon)}</span>`;

  const powers = Object.entries(combat.powers || {}).map(([id, n]) => {
    const t = T.power(id, n);
    return t ? row(powerPic(id, t.icon), t) : '';
  }).join('');

  const p = combat.player;
  const buffs = [
    p.strength ? row(`<span class="pw-glyph">🔥</span>`, T.strength(p.strength)) : '',
    (combat.delayed || []).length ? row(`<span class="pw-glyph">⏳</span>`, T.delayed()) : '',
    ...Object.entries(p.statuses || {}).filter(([, n]) => n > 0).map(([id, n]) => { const t = T.status(id, n); return t ? row(`<span class="pw-glyph" style="color:${t.color}">${esc(t.icon)}</span>`, t) : ''; }),
  ].join('');

  const passives = (Game.State.run.passives || []).filter(id => Game.PASSIVES[id])
    .map(id => row(Game.UI.passiveArt.render(id, 44), T.passive(id))).join('');

  const section = (title, html, empty) => `<h3 class="pw-section">${title}</h3>${html || `<p class="muted">${empty}</p>`}`;
  Game.UI.overlay.open('Active effects', `<div class="pw-list">
      ${section('Powers this fight', powers, 'No powers yet. Play a Power card and it shows up here.')}
      ${section('Buffs and statuses', buffs, 'Nothing right now.')}
      ${section('Passives (whole run)', passives, 'None yet. Learn them at rest sites.')}
    </div>`);
};
