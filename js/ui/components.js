// UI COMPONENTS
// Small reusable pieces of HTML (buttons, a card box; the top bar comes from ui/topBar.js).
// Clickable things carry data-action (and data-arg); app/main.js routes clicks.
Game.UI = Game.UI || {};

Game.UI.components = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function button(label, action, arg, disabled) {
    return `<button data-action="${action}"${arg !== undefined ? ` data-arg="${esc(arg)}"` : ''}${disabled ? ' disabled' : ''}>${esc(label)}</button>`;
  }

  // The card face lives in ui/cardView.js; kept here so screens can use components.cardBox.
  function cardBox(cardId, opts = {}) {
    return Game.UI.cardView.render(cardId, opts);
  }

  // Small pictures of the run's passives (ui/passiveArt.js); hover shows what each one does.
  function passiveIcons(run) {
    const ids = (run.passives || []).filter(id => Game.PASSIVES[id]);
    if (!ids.length) return '';
    return `<span class="passives">${ids.map(id => {
      const p = Game.PASSIVES[id];
      return `<span class="passive-icon" data-tip="passive:${esc(id)}">${Game.UI.passiveArt ? Game.UI.passiveArt.render(id, 26) : p.icon}</span>`;
    }).join('')}</span>`;
  }

  // Small round badges for the run's totems; hover shows what each one does.
  function totemIcons(run) {
    const ids = ((run && run.totems) || []).filter(id => Game.TOTEMS[id]);
    if (!ids.length) return '';
    return `<span class="passives totems">${ids.map(id => {
      const t = Game.TOTEMS[id];
      return `<span class="totem-icon" style="--tc:${t.color}" data-tip="totem:${esc(id)}">${esc(t.icon)}</span>`;
    }).join('')}</span>`;
  }

  // The top bar lives in its own module (ui/topBar.js).
  function statusBar(run) {
    return Game.UI.topBar.render(run);
  }

  return { esc, button, cardBox, statusBar, passiveIcons, totemIcons };
})();
