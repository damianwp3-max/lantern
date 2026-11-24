// CARD TEXT SCROLL (comfort): a description that is too long for its card scrolls slowly down and back up,
// but only while the mouse is over THAT card (kupka, 2026-11-23). Tunables below.
//   Game.UI.cardTextScroll.SPEED_PX_S   pixels per second     PAUSE_MS   rest at top and bottom
(function () {
  const SPEED_PX_S = 22, PAUSE_MS = 900;
  let current = null, raf = 0;

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (current) { const t = current.querySelector('.text'); if (t) t.scrollTop = 0; }
    current = null;
  }

  function start(card) {
    const box = card.querySelector('.text');
    if (!box) return;
    const max = box.scrollHeight - box.clientHeight;
    if (max < 3) return;                       // fits: nothing to scroll
    current = card;
    let dir = 1, pos = 0, last = performance.now(), wait = PAUSE_MS;
    const step = now => {
      if (current !== card || !card.isConnected) { stop(); return; }
      const dt = Math.min(64, now - last);
      last = now;
      if (wait > 0) wait -= dt;
      else {
        pos += dir * SPEED_PX_S * dt / 1000;
        if (pos >= max) { pos = max; dir = -1; wait = PAUSE_MS; }
        else if (pos <= 0) { pos = 0; dir = 1; wait = PAUSE_MS; }
        box.scrollTop = pos;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  document.addEventListener('mouseover', e => {
    const card = e.target.closest && e.target.closest('.card');
    if (card === current) return;
    stop();
    if (card) start(card);
  });
  document.addEventListener('mouseleave', stop);
  Game.UI = Game.UI || {};
  Game.UI.cardTextScroll = { SPEED_PX_S, PAUSE_MS };
})();
