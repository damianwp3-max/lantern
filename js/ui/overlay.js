// OVERLAY (modal window)
// A dark layer over the game with a panel in the middle. Used by the pile
// viewers and the powers list (ui/viewers/*.js), ready for a shop, map peek...
//   Game.UI.overlay.open(title, bodyHtml, opts)   opts.wide: wider panel
//   Game.UI.overlay.close()
//   Game.UI.overlay.isOpen()
// Click outside the panel, the ✕ button, or Esc closes it. While it is open,
// the game below ignores keys (ui/keyboard.js checks isOpen).
Game.UI = Game.UI || {};

Game.UI.overlay = (function () {
  let layer = null;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function open(title, bodyHtml, opts = {}) {
    close();
    layer = document.createElement('div');
    layer.className = 'overlay';
    layer.innerHTML = `<div class="overlay-panel ${opts.wide ? 'wide' : ''}">
      <div class="overlay-head"><h2>${esc(title)}</h2>${opts.note ? `<span class="muted">${esc(opts.note)}</span>` : ''}
        <button class="overlay-close" data-overlay-close title="Close (Esc)">✕</button></div>
      <div class="overlay-body">${bodyHtml}</div></div>`;
    layer.addEventListener('click', e => {
      if (e.target === layer || e.target.closest('[data-overlay-close]')) { e.stopPropagation(); close(); }
    });
    document.body.appendChild(layer);
    if (Game.UI.tooltip) Game.UI.tooltip.hide();
  }

  function close() {
    if (!layer) return;
    layer.remove();
    layer = null;
    if (Game.UI.tooltip) Game.UI.tooltip.hide();
  }

  function isOpen() { return !!layer; }

  // Esc closes the overlay before anything else sees the key.
  document.addEventListener('keydown', e => {
    if (!layer) return;
    if (e.key === 'Escape') close();
    e.stopImmediatePropagation();
  }, true);

  return { open, close, isOpen };
})();
