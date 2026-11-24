// TIMING VIEW (the minigame window for Timed cards)
//   Game.UI.timing.run(card, done)   shows the bar; done({ rating, dist, pressed }) when it ends
//   Game.UI.timing.practice(done)    same bar, nothing at stake (Settings > Try the timing)
// A cursor sweeps back and forth across the bar, bouncing off both ends
// (speed from Game.Timing.sweepMs()). It never stops on its own: only
// Space / Enter / click / tap ends it. Closer to the middle = better rating.
// Rules and numbers: timing/timing.js, data/timingData.js. Styles: css/timing.css.
// While it is open Game.Juice.busy is true, so the hand ignores input.
Game.UI = Game.UI || {};

Game.UI.timing = (function () {
  let active = null;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  // Colored zones of the bar, built from the ratings (outermost first).
  function zonesHtml() {
    return Game.TIMING.ratings.slice().reverse().filter(r => isFinite(r.maxDist)).map(r =>
      `<i class="tm-zone" style="--w:${(r.maxDist * 100).toFixed(1)}%;--z:${r.color}"></i>`).join('');
  }

  // Small key under the bar: what each rating does to the card.
  function legendHtml() {
    return Game.TIMING.ratings.map(r =>
      `<span style="--z:${r.color}"><i></i>${esc(r.label)} <b>×${r.mult}</b></span>`).join('');
  }

  function run(card, done, opts = {}) {
    if (active) return;
    const speedNote = Game.Settings ? Game.Settings.get('timingSpeed') : 1;
    const layer = document.createElement('div');
    layer.className = 'timing-layer';
    layer.innerHTML = `<div class="timing-panel">
      <div class="tm-title">${esc(opts.title || card.name)}</div>
      <div class="tm-bar"><div class="tm-zones">${zonesHtml()}</div><i class="tm-mid"></i><i class="tm-wall tm-wall-left"></i><i class="tm-wall tm-wall-right"></i><i class="tm-cursor"></i></div>
      <div class="tm-legend">${legendHtml()}</div>
      <div class="tm-hint">Get ready…</div>
      <div class="tm-result"></div>
    </div>`;
    document.body.appendChild(layer);
    if (Game.UI.tooltip) Game.UI.tooltip.hide();

    const cursor = layer.querySelector('.tm-cursor');
    const hint = layer.querySelector('.tm-hint');
    const resultEl = layer.querySelector('.tm-result');
    const wasBusy = Game.Juice ? Game.Juice.busy : false;
    if (Game.Juice) Game.Juice.busy = true;

    const state = { stage: 'ready', pos: 0, t0: 0, raf: 0, leg: 0 };
    active = state;
    const sweep = Game.Timing.sweepMs();

    function finish(pressed) {
      if (state.stage === 'done') return;
      state.stage = 'done';
      cancelAnimationFrame(state.raf);
      const dist = Math.min(1, Math.abs(state.pos - 0.5) * 2);
      const rating = Game.Timing.rate(dist);
      const res = Game.Timing.result(rating);
      layer.classList.add('done');
      layer.querySelector('.timing-panel').style.setProperty('--rc', res.color);
      hint.textContent = '';
      resultEl.textContent = res.label;
      layer.classList.add('r-' + rating);
      resultEl.classList.add('show');
      if (Game.Juice && Game.Juice.shake && rating === 'perfect') Game.Juice.shake(null, 5, 220);
      setTimeout(() => {
        layer.remove();
        active = null;
        document.removeEventListener('keydown', onKey, true);
        layer.removeEventListener('pointerdown', onPointer);
        if (Game.Juice) Game.Juice.busy = wasBusy;
        done({ rating, dist, pressed });
      }, opts.resultMs || 650);
    }

    function frame(now) {
      if (state.stage !== 'running') return;
      // Ping-pong: 0 -> 1 -> 0 -> 1 ... (a triangle wave), forever until a press.
      const t = (now - state.t0) / sweep;
      const leg = Math.floor(t);
      const f = t - leg;
      state.pos = leg % 2 ? 1 - f : f;
      if (leg !== state.leg) { state.leg = leg; if (leg > 0) bounce(leg % 2 ? 'right' : 'left'); }
      cursor.style.left = (state.pos * 100).toFixed(2) + '%';
      state.raf = requestAnimationFrame(frame);
    }

    // Small flash on the wall the cursor bounced off.
    function bounce(side) {
      const wall = layer.querySelector('.tm-wall-' + side);
      if (!wall) return;
      wall.classList.remove('hit'); void wall.offsetWidth; wall.classList.add('hit');
    }

    function press() { if (state.stage === 'running') finish(true); }
    function onKey(e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); if (!e.repeat) press(); }
      else e.stopImmediatePropagation();
    }
    function onPointer(e) { e.preventDefault(); press(); }
    document.addEventListener('keydown', onKey, true);
    layer.addEventListener('pointerdown', onPointer);

    setTimeout(() => {
      if (state.stage !== 'ready') return;
      state.stage = 'running';
      hint.textContent = 'SPACE or click when the cursor is in the middle. It keeps bouncing until you do.';
      state.t0 = performance.now();
      state.raf = requestAnimationFrame(frame);
    }, Game.TIMING.readyMs);
    state.press = press;
    return state;
  }

  const practice = done => run({ name: 'Practice' }, done || (() => {}), { title: 'Practice (no effect)' });

  return { run, practice, isActive: () => !!active, press: () => active && active.press && active.press() };
})();
