// TOOLTIPS
// One floating tooltip for the whole game. Any element with
//   data-tip="kind:id:n"   (built by ui/tipText.js)
// shows a styled box when hovered. Hovering a card shows its rule keywords
// (Block, Poison, Exhaust, ...) in a column next to it.
// Hidden while dragging, after every re-render, and on scroll.
Game.UI = Game.UI || {};

Game.UI.tooltip = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  let box = null, anchor = null;

  function el() {
    if (!box) { box = document.createElement('div'); box.className = 'tip-layer'; document.body.appendChild(box); }
    return box;
  }

  function tipHtml(t) {
    if (!t) return '';
    const pic = t.art || `<span class="tip-icon">${esc(t.icon || '')}</span>`;
    return `<div class="tip" style="--tip:${t.color || '#d9a441'}">
      <div class="tip-head">${pic}<div><div class="tip-title">${esc(t.title)}</div>${t.label ? `<div class="tip-label">${esc(t.label)}</div>` : ''}</div></div>
      <div class="tip-text">${esc(t.text)}</div></div>`;
  }

  function build(key) {
    const [kind, id, n] = key.split(':');
    const fn = Game.UI.tipText[kind];
    return fn ? fn.call(Game.UI.tipText, id, n) : null;
  }

  // Place the layer next to the anchor: above by default, or to the side for cards.
  function place(target, side) {
    const b = el(), r = target.getBoundingClientRect(), w = b.offsetWidth, h = b.offsetHeight, pad = 10;
    let x, y;
    if (side) {
      x = r.right + pad; if (x + w > innerWidth - 6) x = r.left - w - pad;
      y = Math.min(Math.max(6, r.top), innerHeight - h - 6);
    } else {
      x = Math.min(Math.max(6, r.left + r.width / 2 - w / 2), innerWidth - w - 6);
      y = r.top - h - pad; if (y < 6) y = r.bottom + pad;
    }
    b.style.left = x + 'px'; b.style.top = y + 'px';
  }

  function show(target) {
    if (document.body.classList.contains('dragging-card')) return hide();
    let html = '', side = false;
    if (target.dataset.tip) html = tipHtml(build(target.dataset.tip));
    else if (target.dataset.card) {
      html = Game.UI.tipText.cardKeywords(target.dataset.card).map(tipHtml).join('');
      side = true;
    }
    if (!html) return hide();
    anchor = target;
    const b = el();
    b.innerHTML = html;
    b.classList.toggle('side', side);
    b.classList.add('show');
    place(target, side);
    // Hovered cards rise and grow; place again once they have settled.
    if (side) setTimeout(() => { if (anchor === target) place(target, side); }, 230);
  }

  function hide() { anchor = null; if (box) box.classList.remove('show'); }

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('[data-tip], .card[data-card]');
    if (t === anchor) return;
    if (!t) return hide();
    show(t);
  });
  document.addEventListener('pointerdown', hide);
  window.addEventListener('scroll', hide, true);
  if (Game.Events) Game.Events.on('ui:rendered', hide);

  return { show, hide, html: tipHtml };
})();
