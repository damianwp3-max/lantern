// PACK ART (UI): the drawing of a card pack, as an SVG string (176 x 256).
// One drawing per style; data/cardPacksData.js and the hero's packStyle pick it.
//   Game.UI.packArt.render(pack, opts)   full pack (art + name + card count) as HTML
//   Game.UI.packArt.svg(style, look)     the drawing only
//   Game.UI.packArt.registerStyle(id, fn(look, k) -> svg inner markup)   k = unique id suffix
// Styles here: 'lantern' (explorer pack: night-blue foil, gold, glowing lantern)
//              'blood'   (vampire hero pack: crimson velvet, bat crest, fangs, dripping blood)
// Styles: css/packs.css.
Game.UI = Game.UI || {};

Game.UI.packArt = (function () {
  const styles = {};
  let n = 0;
  const registerStyle = (id, fn) => { styles[id] = fn; };

  // Crimped foil edge (zigzag) along the top or bottom.
  function crimp(y, h, fill, down) {
    let d = `M0 ${y} `;
    const teeth = 22, w = 176 / teeth;
    for (let i = 0; i <= teeth; i++) d += `L${(i * w).toFixed(1)} ${down ? y + h : y} L${((i + .5) * w).toFixed(1)} ${down ? y + h - 5 : y + 5} `;
    d += down ? `L176 ${y} Z` : `L176 ${y + h} L0 ${y + h} Z`;
    return `<path d="${d}" fill="${fill}"/>`;
  }

  registerStyle('lantern', (L, k) => `
    <defs>
      <linearGradient id="pf${k}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1d2340"/><stop offset=".5" stop-color="#2b2350"/><stop offset="1" stop-color="#120f22"/>
      </linearGradient>
      <linearGradient id="pg${k}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff0b8"/><stop offset=".45" stop-color="${L.color}"/><stop offset="1" stop-color="#7a5410"/>
      </linearGradient>
      <radialGradient id="pl${k}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="${L.glow}" stop-opacity=".95"/><stop offset=".4" stop-color="${L.glow}" stop-opacity=".35"/><stop offset="1" stop-color="${L.glow}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="0" y="14" width="176" height="228" fill="url(#pf${k})"/>
    ${crimp(0, 18, `url(#pg${k})`, false)}
    ${crimp(238, 18, `url(#pg${k})`, true)}
    <rect x="9" y="26" width="158" height="204" rx="8" fill="none" stroke="url(#pg${k})" stroke-width="2"/>
    <rect x="14" y="31" width="148" height="194" rx="6" fill="none" stroke="${L.color}" stroke-opacity=".35" stroke-width="1"/>
    <g fill="#fff3d6" opacity=".7">
      <circle cx="30" cy="70" r="1.2"/><circle cx="148" cy="62" r="1.6"/><circle cx="40" cy="190" r="1.3"/><circle cx="140" cy="176" r="1.1"/><circle cx="122" cy="96" r=".9"/><circle cx="52" cy="112" r=".9"/>
    </g>
    <g class="pa-rays" opacity=".55" stroke="${L.glow}" stroke-width="2" stroke-linecap="round">
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${(88 + Math.cos(a) * 36).toFixed(1)}" y1="${(128 + Math.sin(a) * 36).toFixed(1)}" x2="${(88 + Math.cos(a) * 54).toFixed(1)}" y2="${(128 + Math.sin(a) * 54).toFixed(1)}"/>`; }).join('')}
    </g>
    <circle class="pa-glow" cx="88" cy="128" r="58" fill="url(#pl${k})"/>
    <g transform="translate(88 128)">
      <path d="M-10 -40 Q0 -52 10 -40" fill="none" stroke="url(#pg${k})" stroke-width="3"/>
      <rect x="-16" y="-38" width="32" height="7" rx="2" fill="url(#pg${k})"/>
      <path d="M-14 -31 L14 -31 L18 24 L-18 24 Z" fill="#fff0b8" fill-opacity=".18" stroke="url(#pg${k})" stroke-width="2.5"/>
      <path d="M0 -31 V24 M-16 -4 H16" stroke="url(#pg${k})" stroke-width="1.5" opacity=".7"/>
      <path class="pa-flame" d="M0 -16 C9 -4 7 8 0 12 C-7 8 -9 -4 0 -16 Z" fill="${L.glow}"/>
      <path d="M0 -6 C4 0 3 6 0 8 C-3 6 -4 0 0 -6 Z" fill="#fff"/>
      <rect x="-22" y="24" width="44" height="7" rx="2" fill="url(#pg${k})"/>
    </g>
    ${L.setColor ? `<rect x="9" y="206" width="158" height="4" fill="${L.setColor}" opacity=".7"/>` : ''}`);

  registerStyle('blood', (L, k) => `
    <defs>
      <linearGradient id="pf${k}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2a0309"/><stop offset=".45" stop-color="${L.color}"/><stop offset="1" stop-color="#1a0205"/>
      </linearGradient>
      <linearGradient id="pc${k}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b3036"/><stop offset=".5" stop-color="#121014"/><stop offset="1" stop-color="#05040a"/>
      </linearGradient>
      <linearGradient id="ps${k}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4e9ef"/><stop offset=".5" stop-color="#b9a9b4"/><stop offset="1" stop-color="#5e5059"/>
      </linearGradient>
      <radialGradient id="pl${k}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ff2a44" stop-opacity=".8"/><stop offset=".5" stop-color="#ff2a44" stop-opacity=".2"/><stop offset="1" stop-color="#ff2a44" stop-opacity="0"/>
      </radialGradient>
      <pattern id="pv${k}" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="14" width="176" height="228" fill="url(#pf${k})"/>
    <rect x="0" y="14" width="176" height="228" fill="url(#pv${k})"/>
    ${crimp(238, 18, `url(#pc${k})`, true)}
    <rect x="9" y="26" width="158" height="204" rx="4" fill="none" stroke="url(#ps${k})" stroke-width="1.6"/>
    <g fill="url(#ps${k})">
      ${[[9, 26, 1, 1], [167, 26, -1, 1], [9, 230, 1, -1], [167, 230, -1, -1]].map(([x, y, sx, sy]) =>
        `<path transform="translate(${x} ${y}) scale(${sx} ${sy})" d="M0 0 L18 0 Q8 2 6 6 Q2 8 0 18 Z M4 4 Q14 6 12 14 Q6 12 4 4 Z"/>`).join('')}
    </g>
    <circle class="pa-glow" cx="88" cy="126" r="62" fill="url(#pl${k})"/>
    <g transform="translate(88 124)">
      <path d="M0 -6 C-12 -26 -34 -30 -66 -18 C-54 -12 -50 -4 -52 6 C-44 0 -36 2 -32 10 C-26 2 -16 4 -10 12 C-6 6 -2 4 0 4
               C2 4 6 6 10 12 C16 4 26 2 32 10 C36 2 44 0 52 6 C50 -4 54 -12 66 -18 C34 -30 12 -26 0 -6 Z" fill="#0a0507" stroke="#000" stroke-width="1"/>
      <path d="M-6 -6 L-9 -18 L-3 -10 Z M6 -6 L9 -18 L3 -10 Z" fill="#0a0507"/>
      <ellipse cx="0" cy="-3" rx="9" ry="11" fill="#0a0507"/>
      <circle class="pa-eye" cx="-3.5" cy="-5" r="1.8" fill="#ff2a3c"/><circle class="pa-eye" cx="3.5" cy="-5" r="1.8" fill="#ff2a3c"/>
      <path d="M-20 22 C-20 10 -6 8 0 18 C6 8 20 10 20 22 C20 34 6 40 0 50 C-6 40 -20 34 -20 22 Z" fill="#c0102a" stroke="url(#ps${k})" stroke-width="1.8"/>
      <path d="M-11 21 C-11 16 -6 14 -3 17" fill="none" stroke="#ff8f9d" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <path d="M-6 26 L-3 37 L0 26 Z M6 26 L3 37 L0 26 Z" fill="url(#ps${k})" opacity=".95"/>
    </g>
    <g stroke="#5a0710" stroke-width="1.4" fill="none" opacity=".9">
      <path d="M22 222 C40 210 52 216 64 206"/><path d="M154 222 C136 210 124 216 112 206"/>
    </g>
    <g fill="#a3001a">
      <circle cx="64" cy="206" r="4"/><circle cx="112" cy="206" r="4"/>
    </g>
    <path d="M0 0 H176 V16
             C170 16 168 30 166 34 C164 30 162 18 152 18 C146 18 146 44 142 50 C138 44 140 18 128 18
             C120 18 120 26 116 28 C112 26 112 18 104 18 C96 18 98 58 92 64 C86 58 90 18 80 18
             C72 18 74 32 70 36 C66 32 68 18 58 18 C50 18 50 46 46 52 C42 46 44 18 34 18
             C26 18 26 26 22 28 C18 26 18 18 10 18 C6 18 4 22 0 22 Z" fill="#7a0013"/>
    <path d="M0 0 H176 V14 C150 16 120 12 88 15 C56 18 30 12 0 16 Z" fill="#a3001a"/>
    ${crimp(0, 12, `url(#pc${k})`, false)}
    <g fill="#ff6b7d" opacity=".55"><ellipse cx="93" cy="58" rx="1.4" ry="3"/><ellipse cx="47" cy="47" rx="1.1" ry="2.4"/><ellipse cx="143" cy="45" rx="1.1" ry="2.4"/></g>`);

  function svg(style, look) {
    const k = 'pk' + (n++);
    const fn = styles[style] || styles.lantern;
    return `<svg class="pack-svg" viewBox="0 0 176 256" preserveAspectRatio="none" aria-hidden="true">${fn(look, k)}</svg>`;
  }

  // Full pack face. opts.hideCount: no card count (used by the torn halves).
  function render(pack, opts = {}) {
    const esc = Game.UI.components.esc;
    const L = Game.Packs.look(pack);
    const count = pack.cards.length;
    const bonus = pack.embers ? Game.t('+{n} embers', { n: pack.embers }) : '';
    const sub = pack.kind === 'hero' ? L.title : Game.t('Level {n}', { n: pack.level || 1 });
    return `<div class="pack-face style-${esc(L.style)}" style="--pc:${L.color};--pg:${L.glow}">
      ${svg(L.style, L)}
      <div class="pack-sheen"></div>
      ${L.style === 'blood' ? '<i class="pack-drop d1"></i><i class="pack-drop d2"></i><i class="pack-drop d3"></i>' : ''}
      <div class="pack-name">${esc(L.name)}</div>
      <div class="pack-sub">${esc(sub)}</div>
      ${opts.hideCount ? '' : `<div class="pack-count">${esc(bonus || Game.t(count === 1 ? '{n} card' : '{n} cards', { n: count }))}</div>`}
    </div>`;
  }

  return { render, svg, registerStyle };
})();
