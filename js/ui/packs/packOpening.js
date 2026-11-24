// PACK OPENING (UI): the full-screen show when a card pack is opened.
//   1. the pack flies from the hand to the middle and floats there, pulsing ("Click to tear it open")
//   2. click: it shakes harder and harder, glows, then the top tears off in a flash and a burst
//   3. the cards shoot out face down and spread into a row
//   4. each click turns over the next card: rarity glow, burst, label (data/cardRarityData.js);
//      rare and exclusive cards also get light rays and a small shake
//   5. "Collect": the cards fly down into your collection and the window closes, then done()
// Hovering a turned-over card shows its effects in the side panel (ui/tooltip.js).
// Keys: Space / Enter do the same as a click. Styles: css/packOpening.css.
//   Game.UI.packOpening.play(pack, fromEl, done)
//   Game.UI.packOpening.isOpen()
Game.UI = Game.UI || {};

Game.UI.packOpening = (function () {
  const J = () => Game.Juice;
  const T = () => Game.CARD_PACKS.timing;
  const esc = s => Game.UI.components.esc(s);
  let cur = null;   // the opening in progress

  const BACK_ART = {
    lantern: `<svg viewBox="0 0 60 80"><path d="M30 8 C44 26 40 46 30 54 C20 46 16 26 30 8 Z" fill="currentColor"/><path d="M30 28 C35 36 34 44 30 47 C26 44 25 36 30 28 Z" fill="#fff" opacity=".8"/><rect x="16" y="60" width="28" height="5" rx="2" fill="currentColor"/></svg>`,
    blood: `<svg viewBox="0 0 60 80"><path d="M30 4 C30 4 12 30 12 44 C12 56 20 64 30 64 C40 64 48 56 48 44 C48 30 30 4 30 4 Z" fill="currentColor"/><path d="M21 44 C21 38 24 34 27 32" stroke="#ffb3bd" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 70 L26 78 L30 70 Z M30 70 L34 78 L38 70 Z" fill="#e8dde3"/></svg>`,
  };

  function el(cls, html, parent) {
    const d = document.createElement('div');
    d.className = cls;
    if (html) d.innerHTML = html;
    if (parent) parent.appendChild(d);
    return d;
  }
  const mid = () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  function hint(text) {
    if (!cur) return;
    cur.hint.textContent = Game.t(text);
    cur.hint.classList.remove('pop'); void cur.hint.offsetWidth; cur.hint.classList.add('pop');
  }

  // 1. Fly in.
  function play(pack, fromEl, done) {
    if (cur) return;
    const look = Game.Packs.look(pack);
    const root = el(`pack-open style-${look.style} kind-${pack.kind}`, '', document.body);
    root.style.setProperty('--pc', look.color);
    root.style.setProperty('--pg', look.glow);
    el('po-backdrop', '', root);
    const rays = el('po-rays', '', root);
    const stage = el('po-stage', '', root);
    const packEl = el('po-pack', `<div class="po-half po-top">${Game.UI.packArt.render(pack)}</div><div class="po-half po-bottom">${Game.UI.packArt.render(pack)}</div><div class="po-crack"></div>`, stage);
    const title = el('po-title', '', root);
    const hintEl = el('po-hint', '', root);
    cur = { pack, look, root, rays, stage, packEl, title, hint: hintEl, phase: 'fly', cards: [], next: 0, done, fromEl };
    document.body.classList.add('pack-opening');
    Game.Events.emit('pack:opening', { pack });

    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey, true);

    // Start where the pack sat in the hand.
    const r = fromEl && fromEl.getBoundingClientRect();
    if (fromEl) fromEl.style.visibility = 'hidden';
    const m = mid();
    const from = r ? `translate(${r.left + r.width / 2 - m.x}px, ${r.top + r.height / 2 - m.y}px) rotate(${getComputedStyle(fromEl).rotate || '0deg'}) scale(${r.width / 176 * .9})` : 'translate(0, 60vh) scale(.6)';
    packEl.animate([
      { transform: from },
      { transform: 'translate(0,-30px) rotate(-4deg) scale(1.55)', offset: .7 },
      { transform: 'translate(0,0) rotate(0) scale(1.45)' },
    ], { duration: T().fly, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => {
      if (!cur) return;
      packEl.classList.add('floating');
      cur.phase = 'ready';
      hint('Click to tear it open!');
    };
  }

  // 2. Charge up and tear.
  function tear() {
    const c = cur;
    c.phase = 'charging';
    c.hint.textContent = '';
    c.packEl.classList.remove('floating');
    c.packEl.classList.add('charging');
    c.root.classList.add('charging');
    const m = mid();
    const frames = [];
    for (let i = 0; i <= 24; i++) {
      const f = 1 + i * .55;   // shake grows
      frames.push({ transform: `translate(${(Math.random() * 2 - 1) * f}px, ${(Math.random() * 2 - 1) * f}px) rotate(${(Math.random() * 2 - 1) * f * .35}deg) scale(${1.45 + i * .006})` });
    }
    c.packEl.animate(frames, { duration: T().charge, easing: 'linear', fill: 'forwards' });
    const sparks = setInterval(() => {
      if (!cur) return clearInterval(sparks);
      J().burst(m.x + (Math.random() - .5) * 220, m.y + (Math.random() - .5) * 300, { count: 3, color: [c.look.glow, '#fff'], speed: 30, size: 4, ms: 500 });
    }, 70);
    setTimeout(() => {
      clearInterval(sparks);
      if (cur !== c) return;
      burstOpen(c);
    }, T().charge);
  }

  function burstOpen(c) {
    c.phase = 'tearing';
    const m = mid();
    const blood = c.look.style === 'blood';
    c.packEl.getAnimations().forEach(a => a.cancel());
    c.packEl.style.transform = 'scale(1.6)';
    c.packEl.classList.remove('charging');
    c.packEl.classList.add('torn');
    c.root.classList.remove('charging');
    c.root.classList.add('opened');
    J().flash(blood ? 'red' : 'white', 520);
    J().flash(`color-mix(in srgb, ${c.look.glow} 50%, transparent)`, 900, true);
    J().shake(document.querySelector('.pack-open .po-stage'), 16, 420);
    J().burst(m.x, m.y - 150, { count: 50, color: blood ? ['#ff2a44', '#8a0f1f', '#ffb3bd', '#fff'] : [c.look.glow, '#fff3d6', '#ffffff', c.look.color], speed: 320, size: 9, ms: 1100, gravity: blood ? 140 : 60 });
    J().burst(m.x, m.y - 150, { count: 14, color: [c.look.glow], speed: 160, size: 30, ms: 700, shape: 'ring' });
    if (blood) J().burst(m.x, m.y - 120, { count: 26, color: ['#a3001a', '#ff2a44'], speed: 200, size: 7, ms: 1300, gravity: 320, angle: Math.PI / 2, spread: Math.PI * 1.2 });
    c.packEl.querySelector('.po-top').animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: 'translate(70px,-240px) rotate(38deg)', opacity: 0 },
    ], { duration: T().tear + 300, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'forwards' });
    c.packEl.querySelector('.po-bottom').animate([
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: 'translate(0,24px)', opacity: 1, offset: .3 },
      { transform: 'translate(0,320px) rotate(-6deg)', opacity: 0 },
    ], { duration: T().tear + 500, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'forwards' });

    // Title: which set / which hero.
    const L = c.look;
    const head = c.pack.kind === 'hero' ? Game.t('Exclusive cards: {s}', { s: L.title }) : Game.t('New card set: {s}', { s: L.title });
    const sub = c.pack.kind === 'hero' ? Game.t('Only this hero can find them.') : (L.setTheme ? Game.t(L.setTheme) : '');
    c.title.innerHTML = `<b>${esc(head)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}`;
    c.title.classList.add('show');
    setTimeout(() => { if (cur === c) (c.pack.embers ? emberBurst(c) : spread(c)); }, Math.round(T().tear * .45));
  }

  // Bonus pack (every exclusive card owned): it bursts into embers instead of cards.
  function emberBurst(c) {
    c.phase = 'spreading';
    c.title.innerHTML = `<b>${esc(Game.t('Every exclusive card found!'))}</b>`;
    const m = mid();
    const msg = el('po-embers', `<b>+${c.pack.embers}</b><span>${esc(Game.t('embers'))}</span>`, c.root);
    msg.animate([{ transform: 'scale(.2)', opacity: 0 }, { transform: 'scale(1.25)', opacity: 1, offset: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 650, easing: 'cubic-bezier(.2,.9,.3,1.2)', fill: 'backwards' });
    for (let i = 0; i < 3; i++) setTimeout(() => cur === c && J().burst(m.x, m.y - 60, { count: 40, color: ['#ffd35a', '#ff9a3a', '#fff3d6'], speed: 340, size: 8, ms: 1200, gravity: 80 }), i * 220);
    J().flash('gold', 400);
    setTimeout(() => {
      if (cur !== c) return;
      c.phase = 'collect';
      const b = el('po-collect', `<button class="primary">${esc(Game.t('Collect'))}</button>`, c.root);
      b.querySelector('button').addEventListener('click', e => { e.stopPropagation(); collect(); });
    }, 900);
  }

  // 3. Cards shoot out face down and spread into a row.
  function spread(c) {
    c.phase = 'spreading';
    const row = el('po-cards', '', c.root);
    if (c.pack.cards.length > 4) row.classList.add('many');
    const back = BACK_ART[c.look.style] || BACK_ART.lantern;
    c.cards = c.pack.cards.map((id, i) => {
      const t = Game.CardRarity.tier(id);
      const card = el(`po-card rar-${t.id}`, `
        <div class="po-flip">
          <div class="po-back style-${esc(c.look.style)}"><span class="po-back-art">${back}</span></div>
          <div class="po-front">${Game.UI.components.cardBox(id)}</div>
        </div>
        <div class="po-rarity">${esc(Game.t(t.name))}</div>
        <div class="po-new">${esc(Game.t('NEW'))}</div>`, row);
      card.style.setProperty('--rc', t.color);
      // Face down: no hover panel yet (it would give the card away). reveal() turns it on.
      const face = card.querySelector('.po-front .card');
      if (face) { face.dataset.packCard = face.dataset.card; delete face.dataset.card; }
      card.dataset.i = i;
      return { id, el: card, tier: t, shown: false };
    });
    const m = mid();
    c.cards.forEach((k, i) => {
      const r = k.el.getBoundingClientRect();
      const dx = m.x - (r.left + r.width / 2), dy = m.y - 60 - (r.top + r.height / 2);
      k.el.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(.25) rotate(${(i - (c.cards.length - 1) / 2) * 20}deg)`, opacity: 0 },
        { transform: `translate(${dx * .4}px, ${dy * .4 - 90}px) scale(.8) rotate(${(i - (c.cards.length - 1) / 2) * -6}deg)`, opacity: 1, offset: .45 },
        { transform: 'none', opacity: 1 },
      ], { duration: T().spread, delay: i * 90, easing: 'cubic-bezier(.2,.9,.3,1.15)', fill: 'backwards' });
    });
    setTimeout(() => {
      if (cur !== c) return;
      c.phase = 'reveal';
      hint(c.cards.length > 1 ? 'Click to turn over the next card' : 'Click to turn it over');
      c.cards[0].el.classList.add('next');
      if (c.queued) { c.queued = false; reveal(c.cards[0]); }   // clicked while the cards were still flying
    }, T().spread + c.cards.length * 90);
  }

  // 4. Turn over one card.
  function reveal(k) {
    const c = cur;
    if (!k || k.shown) return;
    k.shown = true;
    k.el.classList.remove('next');
    k.el.classList.add('flipping');
    const t = k.tier;
    setTimeout(() => {
      if (cur !== c) return;
      k.el.classList.add('shown');
      // Now the card shows its effects in the side panel on hover (ui/tooltip.js), like everywhere else.
      const face = k.el.querySelector('.po-front .card');
      if (face && face.dataset.packCard) {
        face.dataset.card = face.dataset.packCard;
        if (k.el.matches(':hover') && Game.UI.tooltip) Game.UI.tooltip.show(face);
      }
      J().burstAt(k.el, { count: t.burst, color: [t.color, '#fff', t.color], speed: 90 + t.burst * 2.2, size: 7, ms: 800 });
      if (t.rays) {
        k.el.classList.add('rays');
        J().flash(t.id === 'exclusive' ? 'red' : 'gold', 300);
        J().shake(c.root.querySelector('.po-cards'), t.id === 'exclusive' ? 10 : 6, 300);
        J().burstAt(k.el, { count: 8, color: [t.color], speed: 120, size: 26, ms: 600, shape: 'ring' });
      }
      Game.Events.emit('pack:cardRevealed', { pack: c.pack, cardId: k.id, rarity: t.id });
    }, T().flip / 2);
    const left = c.cards.filter(x => !x.shown);
    if (left.length) {
      left[0].el.classList.add('next');
      hint(left.length === 1 ? 'Click for the last card' : 'Click to turn over the next card');
    } else {
      c.phase = 'collect';
      setTimeout(() => {
        if (cur !== c) return;
        c.hint.textContent = '';
        const b = el('po-collect', `<button class="primary">${esc(Game.t('Collect'))}</button>`, c.root);
        b.querySelector('button').addEventListener('click', e => { e.stopPropagation(); collect(); });
      }, T().flip + 250);
    }
  }

  // 5. Close.
  function collect() {
    const c = cur;
    if (!c || c.phase === 'closing') return;
    c.phase = 'closing';
    const btn = c.root.querySelector('.po-collect');
    if (btn) btn.remove();
    c.title.classList.remove('show');
    c.cards.forEach((k, i) => k.el.animate([
      { transform: 'none', opacity: 1 },
      { transform: 'translate(0,-30px) scale(1.05)', opacity: 1, offset: .3 },
      { transform: 'translate(0, 70vh) scale(.3) rotate(12deg)', opacity: 0 },
    ], { duration: 560, delay: i * 70, easing: 'cubic-bezier(.5,0,.8,.5)', fill: 'forwards' }));
    setTimeout(() => {
      c.root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: 'forwards' }).onfinish = () => close(c);
    }, 480 + c.cards.length * 70);
  }

  function close(c) {
    document.removeEventListener('keydown', onKey, true);
    c.root.remove();
    document.body.classList.remove('pack-opening');
    if (cur === c) cur = null;
    Game.Events.emit('pack:closed', { pack: c.pack });
    if (c.done) c.done();
  }

  function advance(target) {
    const c = cur;
    if (!c) return;
    if (c.phase === 'ready') return tear();
    if (c.phase === 'spreading') { c.queued = true; return; }
    if (c.phase === 'reveal') {
      const pickedEl = target && target.closest && target.closest('.po-card');
      const picked = pickedEl && c.cards[Number(pickedEl.dataset.i)];
      return reveal(picked && !picked.shown ? picked : c.cards.find(k => !k.shown));
    }
    if (c.phase === 'collect' && c.root.querySelector('.po-collect')) return collect();
  }

  function onClick(e) { advance(e.target); }
  function onKey(e) {
    if (!cur) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advance(null); }
    e.stopPropagation();   // game hotkeys stay quiet while a pack is open
  }

  return { play, isOpen: () => !!cur };
})();
