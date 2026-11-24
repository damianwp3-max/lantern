// RUN END JUICE: the end-of-run screen comes alive (ui/screens/runEndScreen.js).
//   - a VICTORY / DEFEAT banner first (the defeat flash itself comes from rewardJuice.defeat)
//   - point lines slide in one by one and their numbers count up, then the total
//   - the depth meter fills to where the run ended
//   - card packs are dealt into the hand from below, one by one, and hop when hovered
// Only on the first draw of the screen (app.runEnd.animate); redraws after a pack opens stay calm.
(function () {
  const J = () => Game.Juice;

  function countUp(el, delay, ms) {
    const to = Number(el.dataset.count) || 0;
    el.textContent = '0';
    setTimeout(() => {
      const t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / ms);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
        else if (to > 0) el.classList.add('pop');
      };
      requestAnimationFrame(step);
    }, delay);
  }

  Game.Events.on('ui:rendered', ({ screen, app }) => {
    if (screen !== 'runEnd') return;
    const R = app.runEnd;
    const packs = document.querySelectorAll('.pack-hand .pack');
    if (!R || !R.animate) {
      packs.forEach(p => p.classList.add('dealt'));
      return;
    }
    R.animate = false;   // later redraws (language switch, a pack opened) stay calm
    const won = R.summary.won;
    const lines = document.querySelectorAll('.re-line');
    lines.forEach((l, i) => { const b = l.querySelector('.re-pts'); if (b) countUp(b, 350 + i * 160, 420); });
    const totalAt = 350 + lines.length * 160 + 200;
    const total = document.querySelector('.re-total b');
    if (total) countUp(total, totalAt, 900);
    setTimeout(() => {
      const t = document.querySelector('.re-total');
      if (!t) return;
      t.classList.add('done');
      J().burstAt(t, { count: 30, color: won ? ['#ffd35a', '#fff3d6'] : ['#ff9a5a', '#d9a441'], speed: 140, size: 7 });
      const rank = document.querySelector('.re-rank');
      if (rank) rank.classList.add('show');
    }, totalAt + 950);
    if (won) {
      J().banner('VICTORY', 'gold', 1500);
      setTimeout(() => J().burst(window.innerWidth / 2, window.innerHeight * .3, { count: 60, color: ['#ffd35a', '#fff3d6', '#ff9a3c'], speed: 300, size: 9, ms: 1400, gravity: 90 }), 200);
    }
    // Packs are dealt after the score.
    const dealAt = totalAt + 1200;
    packs.forEach((p, i) => setTimeout(() => {
      p.classList.add('dealt');
      J().burstAt(p, { count: 14, color: p.classList.contains('kind-hero') ? ['#ff2a44', '#8a0f1f'] : ['#ffd35a', '#fff3d6'], speed: 70, size: 5 });
    }, dealAt + i * 220));
    const pt = document.querySelector('.re-packs-title');
    if (pt) setTimeout(() => pt.classList.add('show'), dealAt - 200);
  });
})();
