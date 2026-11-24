// ORNAMENTS (look only): adds gold corner filigree to panels and a small
// flourish under headings, after every screen draw and when a window opens.
// Which panels: Game.UI_THEME (data/uiThemeData.js). Drawings: Game.UI_ORNAMENTS.
// Styles: css/ornaments.css. Nothing here changes how the game plays.
Game.UI = Game.UI || {};

Game.UI.ornaments = (function () {
  const T = () => Game.UI_THEME, O = () => Game.UI_ORNAMENTS;

  function frame(el, style) {
    if (!el || el.querySelector(':scope > .orn-corner')) return;
    el.classList.add('orn-framed', 'orn-' + style);
    el.insertAdjacentHTML('beforeend', ['tl', 'tr', 'bl', 'br'].map(k => `<i class="orn-corner ${k}">${O()[style]}</i>`).join(''));
  }

  function divider(h) {
    if (!h || (h.nextElementSibling && h.nextElementSibling.classList.contains('orn-divider'))) return;
    h.insertAdjacentHTML('afterend', `<div class="orn-divider">${O().divider}</div>`);
  }

  function decorate(root = document) {
    Object.entries(T().frames).forEach(([sel, style]) => root.querySelectorAll(sel).forEach(el => frame(el, style)));
    root.querySelectorAll(T().dividers).forEach(divider);
  }

  Game.Events.on('ui:rendered', () => decorate(document.getElementById('app')));

  // Windows (overlay) and the timing bar are built outside the screens: decorate them when they appear.
  new MutationObserver(list => list.forEach(m => m.addedNodes.forEach(n => {
    if (n.nodeType === 1 && (n.classList.contains('overlay') || n.classList.contains('timing-layer'))) decorate(n);
  }))).observe(document.body, { childList: true });

  return { decorate };
})();
