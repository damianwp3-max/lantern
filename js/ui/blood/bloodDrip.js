// BLOOD DRIP (UI, fights only)
// The vampire look of a hero's cards (hero data cardFx: 'blood', data/charactersData.js):
// blood pools along the top edge of the card and runs down in drips that slowly
// stretch, swell and let a drop fall. It is slightly see-through and kept to the
// edges and the picture, so the name and text stay readable.
//
// It ONLY runs on the combat screen, on the cards in your hand: after each combat
// draw ('ui:rendered', screen 'combat') an overlay is added to those cards. Every
// other screen (rewards, library, deck, shop...) never gets it.
// Each card gets its own drip layout (from its id) and the loops continue smoothly
// across re-draws (negative animation delays from the clock).
// Styles and animations: css/bloodDrip.css. The liquid look is one shared SVG filter
// (goo + glossy light) added to the page the first time a fight shows a blood card.
Game.UI = Game.UI || {};

Game.UI.bloodDrip = (function () {
  const W = 172, H = 244;   // card face size the drawing is made for (css/cards.css)

  // Drips: x, length, width, loop seconds, fall distance. Edge runs are long and slow.
  const DRIPS = [
    { x: 5, len: 150, w: 3.6, dur: 13, fall: 70, edge: true },
    { x: 167, len: 118, w: 3.4, dur: 15, fall: 90, edge: true },
    { x: 28, len: 36, w: 4.4, dur: 6.4, fall: 60 },
    { x: 55, len: 20, w: 3.6, dur: 5.1, fall: 50 },
    { x: 88, len: 50, w: 4.8, dur: 7.6, fall: 48 },
    { x: 118, len: 26, w: 3.8, dur: 5.7, fall: 56 },
    { x: 146, len: 64, w: 4.2, dur: 8.3, fall: 44 },
  ];

  function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // This card's drips (shifted and stretched a little so no two cards look the same).
  function layout(base) {
    const r = rng(hash(base));
    const skip = 2 + Math.floor(r() * 5);   // one middle drip left out
    return DRIPS.filter((d, i) => i !== skip || r() < .25).map(d => {
      const k = d.edge ? .85 + r() * .3 : .75 + r() * .55;
      const len = Math.min(d.edge ? 175 : 92, Math.round(d.len * k));
      return Object.assign({}, d, { x: d.edge ? d.x : Math.round(d.x + (r() - .5) * 12), len, dur: +(d.dur * (.85 + r() * .3)).toFixed(2), off: r() });
    });
  }

  // The pooled blood along the top: a wavy lower edge that sags where a drip starts.
  function rim(drips, r) {
    const pts = [];
    for (let x = 0; x <= W; x += 6) {
      let y = 3.5 + r() * 2.5;
      drips.forEach(d => { const dx = Math.abs(x - d.x); if (dx < 10) y += (10 - dx) * (d.edge ? .7 : .45); });
      if (x < 16) y += (16 - x) * .55;           // blood gathers in the top-left corner
      if (x > W - 12) y += (x - (W - 12)) * .4;
      pts.push([x, y]);
    }
    let d = `M-4 -4 H${W + 4} V${pts[pts.length - 1][1].toFixed(1)}`;
    for (let i = pts.length - 1; i > 0; i--) {
      const [x1, y1] = pts[i], [x0, y0] = pts[i - 1];
      d += ` Q${x1 - 3} ${(y1 + 1.5).toFixed(1)} ${((x1 + x0) / 2).toFixed(1)} ${((y1 + y0) / 2).toFixed(1)}`;
    }
    return d + ` L-4 ${pts[0][1].toFixed(1)}Z`;
  }

  function drawing(base) {
    const r = rng(hash(base) ^ 0x9e3779b9);
    const drips = layout(base);
    const now = performance.now() / 1000;
    const dripSvg = drips.map(d => {
      const delay = -((now + d.off * d.dur) % d.dur);
      const top = d.edge ? 6 : 5;
      return `<g class="bd-drip ${d.edge ? 'bd-edge' : ''}" transform="translate(${d.x} ${top})" style="--len:${d.len}px;--fall:${d.fall}px;--dur:${d.dur}s;--del:${delay.toFixed(2)}s">
        <rect class="bd-stem" x="${-d.w / 2}" y="-2" width="${d.w}" height="${d.len + 2}" rx="${d.w / 2}"/>
        <circle class="bd-bead" cx="0" cy="${d.len}" r="${(d.w * .95).toFixed(2)}"/>
        <ellipse class="bd-fall" cx="0" cy="${d.len}" rx="${(d.w * .7).toFixed(2)}" ry="${(d.w * .85).toFixed(2)}"/>
      </g>`;
    }).join('');
    // A few still smears and spatters on the frame, for a hand-made look.
    const spat = Array.from({ length: 3 }, () => {
      const x = 12 + r() * 148, y = 16 + r() * 40;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 + r() * 1.6).toFixed(1)}"/>`;
    }).join('');
    return `<svg class="blood-drip" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      <g class="bd-liquid" filter="url(#bd-goo)" fill="url(#bd-red)">
        <path class="bd-rim" d="${rim(drips, r)}"/>
        ${dripSvg}
        <g class="bd-spat">${spat}</g>
      </g>
    </svg>`;
  }

  // Shared filter + gradient, added once (outside #app so re-draws never remove it).
  function ensureDefs() {
    if (document.getElementById('bd-defs')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg id="bd-defs" width="0" height="0" style="position:absolute;width:0;height:0" aria-hidden="true">
      <defs>
        <linearGradient id="bd-red" x1="0" y1="0" x2="0" y2="244" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#5a0010"/><stop offset=".04" stop-color="#8c0a1c"/><stop offset=".5" stop-color="#a3101f"/><stop offset="1" stop-color="#6e0614"/>
        </linearGradient>
        <filter id="bd-goo" x="-10%" y="-10%" width="120%" height="140%" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.9" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" result="goo"/>
          <feGaussianBlur in="goo" stdDeviation="1.4" result="soft"/>
          <feSpecularLighting in="soft" surfaceScale="2.6" specularConstant="1.1" specularExponent="28" lighting-color="#ffd6dc" result="spec">
            <fePointLight x="40" y="-30" z="90"><animate attributeName="x" values="20;150;20" dur="9s" repeatCount="indefinite"/></fePointLight>
          </feSpecularLighting>
          <feComposite in="spec" in2="goo" operator="in" result="shine"/>
          <feMerge><feMergeNode in="goo"/><feMergeNode in="shine"/></feMerge>
        </filter>
      </defs></svg>`;
    document.body.appendChild(wrap.firstElementChild);
  }

  function bleeds(cardId) {
    const base = Game.Cards ? Game.Cards.baseOf(cardId) : cardId;
    const hid = Game.Characters && Game.Characters.ownerOf(base);
    return !!(hid && Game.CHARACTERS[hid] && Game.CHARACTERS[hid].cardFx === 'blood') ? base : null;
  }

  // Add the overlay to the blood cards in the hand. Only called on the combat screen.
  function decorate() {
    const cards = document.querySelectorAll('.hand .card[data-card]');
    let any = false;
    cards.forEach(el => {
      const base = bleeds(el.dataset.card);
      if (!base || el.querySelector('.blood-drip')) return;
      if (!any) { ensureDefs(); any = true; }
      el.classList.add('blood-on');
      el.insertAdjacentHTML('beforeend', drawing(base));
    });
  }

  Game.Events.on('ui:rendered', ({ screen }) => { if (screen === 'combat') decorate(); });

  return { decorate, bleeds };
})();
