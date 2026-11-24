// SCREEN EFFECTS (building blocks)
// Small visual helpers any screen can use: screen shake, full-screen flash,
// particle bursts, floating text, and a card flying from one place to another.
// Everything is drawn on one fixed layer above the page and cleans itself up.
// Game.Juice.busy is true while a short animation runs, so clicks wait for it.
Game.Juice = (function () {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let layer = null;
  function getLayer() {
    if (!layer || !document.body.contains(layer)) {
      layer = document.createElement('div');
      layer.id = 'fx-layer';
      document.body.appendChild(layer);
    }
    return layer;
  }
  const center = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, r }; };

  // Shake an element (default: the whole app). power ~ pixels.
  function shake(el, power = 6, ms = 320) {
    el = el || document.getElementById('app');
    if (!el || reduced) return;
    const frames = [];
    for (let i = 0; i < 7; i++) {
      const f = power * (1 - i / 7);
      frames.push({ transform: `translate(${(Math.random() * 2 - 1) * f}px, ${(Math.random() * 2 - 1) * f}px) rotate(${(Math.random() * 2 - 1) * f * .08}deg)` });
    }
    frames.push({ transform: 'none' });
    el.animate(frames, { duration: ms, easing: 'ease-out' });
  }

  // Full-screen color flash. kind: 'white', 'red', 'gold', 'blue' or any CSS color.
  const FLASH = { white: 'rgba(255,255,255,.35)', red: 'rgba(200,30,30,.35)', gold: 'rgba(255,200,90,.35)', blue: 'rgba(90,150,255,.25)' };
  function flash(kind = 'white', ms = 260, vignette = false) {
    const d = document.createElement('div');
    d.className = 'fx-flash' + (vignette ? ' vignette' : '');
    d.style.setProperty('--fc', FLASH[kind] || kind);
    getLayer().appendChild(d);
    d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: 'ease-out' }).onfinish = () => d.remove();
  }

  // Particles flying out from (x, y).
  function burst(x, y, opts = {}) {
    const count = reduced ? Math.min(4, opts.count || 14) : (opts.count || 14);
    const colors = [].concat(opts.color || '#ffd35a');
    const L = getLayer();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('i');
      p.className = 'fx-particle' + (opts.shape ? ' ' + opts.shape : '');
      const size = (opts.size || 6) * (.5 + Math.random());
      const ang = (opts.angle !== undefined ? opts.angle : Math.random() * Math.PI * 2) + (Math.random() - .5) * (opts.spread || Math.PI * 2);
      const dist = (opts.speed || 70) * (.4 + Math.random());
      p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${colors[i % colors.length]};color:${colors[i % colors.length]}`;
      L.appendChild(p);
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist + (opts.gravity || 0);
      p.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.2) rotate(${Math.random() * 360}deg)`, opacity: 0 },
      ], { duration: (opts.ms || 600) * (.7 + Math.random() * .6), easing: 'cubic-bezier(.1,.7,.3,1)' }).onfinish = () => p.remove();
    }
  }
  function burstAt(el, opts) { if (el) { const c = center(el); burst(c.x, c.y, opts); } }

  // Text that rises and fades (like "+5 block").
  function floatText(x, y, text, cls = '') {
    const d = document.createElement('div');
    d.className = 'fx-float ' + cls;
    d.textContent = text;
    d.style.left = x + 'px'; d.style.top = y + 'px';
    getLayer().appendChild(d);
    d.animate([
      { transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 },
      { transform: 'translate(-50%,-90%) scale(1.25)', opacity: 1, offset: .2 },
      { transform: 'translate(-50%,-260%) scale(1)', opacity: 0 },
    ], { duration: 1000, easing: 'ease-out' }).onfinish = () => d.remove();
  }

  // A copy of a card flies to a target element (or point), then done() runs.
  function flyCard(fromEl, toEl, done, opts = {}) {
    if (!fromEl || !toEl) return done && done();
    const r = opts.fromRect || fromEl.getBoundingClientRect();
    const to = center(toEl);
    const g = fromEl.cloneNode(true);
    g.classList.remove('deal', 'selected', 'aiming', 'dragging');
    g.classList.add('fly-card');
    Object.assign(g.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    getLayer().appendChild(g);
    fromEl.style.visibility = 'hidden';
    Game.Juice.busy = true;
    const dx = to.x - (r.left + r.width / 2), dy = to.y - (r.top + r.height / 2);
    const ms = reduced ? 60 : (opts.ms || 230);
    g.animate([
      { transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * .35}px, ${dy * .35 - 40}px) rotate(${dx > 0 ? 8 : -8}deg) scale(1.05)`, opacity: 1, offset: .35 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${dx > 0 ? 20 : -20}deg) scale(${opts.endScale || .3})`, opacity: .2 },
    ], { duration: ms, easing: 'cubic-bezier(.5,0,.8,.4)' }).onfinish = () => {
      g.remove();
      if (opts.impact !== false) burst(to.x, to.y, { count: 10, color: opts.color || '#ffd35a', speed: 50, ms: 400 });
      Game.Juice.busy = false;
      if (done) done();
    };
  }

  // Run done() after ms, keeping input blocked meanwhile.
  function wait(ms, done) {
    Game.Juice.busy = true;
    setTimeout(() => { Game.Juice.busy = false; done(); }, reduced ? Math.min(ms, 150) : ms);
  }

  // Big centered banner ("VICTORY").
  function banner(text, cls = '', ms = 1200) {
    const d = document.createElement('div');
    d.className = 'fx-banner ' + cls;
    d.innerHTML = `<span>${text}</span>`;
    getLayer().appendChild(d);
    d.animate([
      { opacity: 0, transform: 'translate(-50%,-50%) scale(2.2)', letterSpacing: '30px' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', letterSpacing: '12px', offset: .18 },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1.04)', letterSpacing: '14px', offset: .8 },
      { opacity: 0, transform: 'translate(-50%,-50%) scale(1.1)', letterSpacing: '16px' },
    ], { duration: ms, easing: 'ease-out' }).onfinish = () => d.remove();
  }

  return { busy: false, reduced, shake, flash, burst, burstAt, floatText, flyCard, wait, banner, center, layer: getLayer };
})();
