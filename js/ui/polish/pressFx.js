// PRESS FX (look only): a soft warm ripple where you press a button, so every
// press feels answered at once, even before the screen changes.
// Styles: .press-ripple in css/buttons.css.
(function () {
  const SEL = 'button:not([class]), button.primary, .event-option, .rest-option, .shop-service, .rb-item';
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el || el.disabled || el.classList.contains('disabled')) return;
    const r = el.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'press-ripple';
    dot.style.left = (e.clientX - r.left) + 'px';
    dot.style.top = (e.clientY - r.top) + 'px';
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  });
})();
