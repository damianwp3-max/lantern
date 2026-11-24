// ENEMY PLATE EXTRAS: under a thief's HP bar, chips show what it holds (combat/enemyTraits.js).
// Wraps Game.UI.combatHud.enemyPlate without editing it.
(function () {
  const H = Game.UI.combatHud, esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const base = H.enemyPlate;
  H.enemyPlate = function (e) {
    const html = base(e);
    const chips = (e.stolen || []).map(id => `<span class="loot-chip" data-tip="status:thief:1">✋ ${esc(Game.CARDS[id].name)}</span>`)
      .concat(e.stolenGold ? [`<span class="loot-chip">✋ ${e.stolenGold} ${esc(Game.t('gold'))}</span>`] : []);
    if (!chips.length) return html;
    return html.replace(/<\/div>\s*$/, `<div class="loot-row">${chips.join('')}</div></div>`);
  };
})();
