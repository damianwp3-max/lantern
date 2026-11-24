// CARD ART
// Draws the small picture on a card face as inline SVG (no image files).
// Game.UI.cardArt.render(cardId) -> HTML string.
// Which picture a card uses lives in data/cardArtData.js.
// New drawing: Game.UI.cardArt.registerMotif('name', color => '<svg shapes>').
// Drawings use a 100 x 50 box.
Game.UI = Game.UI || {};

Game.UI.cardArt = (function () {
  const motifs = {};
  function registerMotif(name, fn) { motifs[name] = fn; }

  // --- small shared shapes ---
  function star(cx, cy, r1, r2, points, color, extra = '') {
    let d = '';
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 ? r2 : r1;
      const a = (Math.PI * i) / points - Math.PI / 2;
      d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${color}" ${extra}/>`;
  }
  const shieldPath = (cx, cy, s) =>
    `M${cx} ${cy - 20 * s} L${cx + 16 * s} ${cy - 14 * s} L${cx + 15 * s} ${cy + 2 * s} Q${cx + 12 * s} ${cy + 15 * s} ${cx} ${cy + 21 * s} Q${cx - 12 * s} ${cy + 15 * s} ${cx - 15 * s} ${cy + 2 * s} L${cx - 16 * s} ${cy - 14 * s}Z`;
  function shield(cx, cy, s, color) {
    return `<path d="${shieldPath(cx, cy, s)}" fill="${color}" fill-opacity=".25" stroke="${color}" stroke-width="2.5"/>
      <path d="${shieldPath(cx, cy, s * .62)}" fill="none" stroke="${color}" stroke-width="1.2" opacity=".7"/>
      <path d="M${cx} ${cy - 9 * s} V${cy + 10 * s} M${cx - 7 * s} ${cy - 2 * s} H${cx + 7 * s}" stroke="${color}" stroke-width="2" opacity=".85"/>`;
  }
  function miniCard(x, y, rot, color) {
    return `<g transform="rotate(${rot} ${x + 8} ${y + 24})">
      <rect x="${x}" y="${y}" width="16" height="23" rx="2" fill="#211e29" stroke="${color}" stroke-width="1.6"/>
      <circle cx="${x + 8}" cy="${y + 11}" r="3.5" fill="${color}" opacity=".6"/></g>`;
  }
  const bolt = (cx, cy, s, color) =>
    `<path d="M${cx + 3 * s} ${cy - 14 * s} L${cx - 7 * s} ${cy + 2 * s} L${cx} ${cy + 2 * s} L${cx - 3 * s} ${cy + 14 * s} L${cx + 8 * s} ${cy - 3 * s} L${cx + 1 * s} ${cy - 3 * s}Z" fill="${color}"/>`;

  // --- drawings ---
  registerMotif('slash', c => `
    <path d="M18 42 Q48 2 86 8" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".35"/>
    <path d="M22 40 Q50 6 84 9" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M30 40 Q56 14 82 15" stroke="#fff3d6" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>
    <g class="art-swing"><line x1="84" y1="9" x2="84" y2="19" stroke="#8a7a5a" stroke-width="1.2"/>
      <rect x="79" y="19" width="10" height="13" rx="2" fill="#2a2418" stroke="${c}" stroke-width="1.5"/>
      <circle cx="84" cy="25.5" r="3" fill="${c}"/></g>`);

  registerMotif('burst', c => `
    ${star(50, 25, 24, 9, 10, c, 'opacity=".35"')}
    ${star(50, 25, 17, 7, 8, c)}
    <circle cx="50" cy="25" r="6" fill="#fff3d6"/>
    <path d="M14 10 L22 15 M86 10 L78 15 M14 40 L22 35 M86 40 L78 35" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`);

  registerMotif('lash', c => `
    <path d="M10 40 C30 40 30 12 50 22 S72 34 86 12" stroke="#6a5a40" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M10 40 C30 40 30 12 50 22 S72 34 86 12" stroke="${c}" stroke-width="1.2" fill="none" stroke-dasharray="3 3"/>
    <path class="art-flicker" d="M86 4 Q93 12 86 18 Q79 12 86 4Z" fill="${c}"/>
    <circle cx="86" cy="13" r="2" fill="#fff3d6"/>`);

  registerMotif('sparks', c => `
    <g class="art-flicker">${star(33, 22, 13, 4, 4, c)}</g>
    <g class="art-flicker2">${star(66, 29, 13, 4, 4, c)}</g>
    <circle cx="33" cy="22" r="2.5" fill="#fff3d6"/><circle cx="66" cy="29" r="2.5" fill="#fff3d6"/>
    <circle cx="50" cy="10" r="1.3" fill="${c}"/><circle cx="48" cy="41" r="1.3" fill="${c}"/><circle cx="82" cy="12" r="1" fill="${c}"/>`);

  registerMotif('shield', c => shield(50, 25, 1, c));

  registerMotif('cloak', c => `
    <circle cx="26" cy="38" r="7" fill="${c}" opacity=".15"/><circle cx="74" cy="36" r="9" fill="${c}" opacity=".15"/>
    <circle cx="34" cy="12" r="5" fill="${c}" opacity=".12"/>
    <path d="M50 4 Q36 6 35 20 Q30 34 24 46 H76 Q70 34 65 20 Q64 6 50 4Z" fill="#26232e" stroke="${c}" stroke-width="2"/>
    <path d="M50 10 Q42 12 42 22 Q46 27 50 27 Q54 27 58 22 Q58 12 50 10Z" fill="#0d0c10"/>
    <circle cx="47" cy="20" r="1.2" fill="#e8a54b"/><circle cx="53" cy="20" r="1.2" fill="#e8a54b"/>
    <path d="M44 30 L40 46 M56 30 L60 46" stroke="${c}" stroke-width="1" opacity=".6"/>`);

  registerMotif('bash', c => `
    <g transform="translate(-8 0)">${shield(46, 25, .9, '#6f9be0')}</g>
    <path d="M62 14 L78 8 M64 25 L86 25 M62 36 L78 42" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
    ${star(70, 25, 6, 2.5, 5, c)}`);

  registerMotif('draw', c => `
    ${miniCard(26, 14, -24, c)}${miniCard(42, 9, 0, c)}${miniCard(58, 14, 24, c)}
    <path d="M50 44 V36 M46 40 L50 36 L54 40" stroke="${c}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);

  registerMotif('energy', c => `
    <circle cx="50" cy="25" r="18" fill="${c}" opacity=".15" stroke="${c}" stroke-width="1.5"/>
    ${bolt(50, 25, 1.1, c)}`);

  registerMotif('energyDraw', c => `
    <circle cx="36" cy="25" r="16" fill="${c}" opacity=".15" stroke="${c}" stroke-width="1.5"/>
    ${bolt(36, 25, 1, c)}
    ${miniCard(62, 12, 12, '#c9b98f')}
    <path d="M14 18 Q8 25 14 32 M86 20 Q92 27 86 34" stroke="${c}" stroke-width="1.2" fill="none" opacity=".6"/>`);

  registerMotif('nova', c => `
    <circle cx="50" cy="25" r="30" fill="${c}" opacity=".12"/>
    <g class="art-spin">${star(50, 25, 30, 11, 12, c, 'opacity=".45"')}</g>
    ${star(50, 25, 20, 8, 8, '#ffe3a0')}
    <rect x="44" y="17" width="12" height="16" rx="2" fill="#2a2418" stroke="${c}" stroke-width="1.6"/>
    <circle cx="50" cy="25" r="4" fill="#fff3d6"/>`);

  const flamePath = (cx, cy, s) =>
    `M${cx} ${cy - 22 * s} Q${cx + 16 * s} ${cy - 4 * s} ${cx + 11 * s} ${cy + 9 * s} Q${cx + 6 * s} ${cy + 18 * s} ${cx} ${cy + 18 * s} Q${cx - 6 * s} ${cy + 18 * s} ${cx - 11 * s} ${cy + 9 * s} Q${cx - 14 * s} ${cy - 2 * s} ${cx - 3 * s} ${cy - 10 * s} Q${cx - 1 * s} ${cy - 2 * s} ${cx + 3 * s} ${cy - 4 * s} Q${cx + 4 * s} ${cy - 14 * s} ${cx} ${cy - 22 * s}Z`;
  registerMotif('flame', c => `
    <g class="art-flicker"><path d="${flamePath(50, 27, 1)}" fill="${c}"/>
    <path d="${flamePath(50, 33, .5)}" fill="#ffe3a0"/></g>
    <path d="M30 44 H70" stroke="#6a5a40" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 14 L34 8 M62 14 L66 8 M50 3 V0" stroke="${c}" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`);

  registerMotif('emberHeart', c => `
    <path class="art-beat" d="M50 44 C26 30 24 12 38 10 C45 9 49 14 50 18 C51 14 55 9 62 10 C76 12 74 30 50 44Z" fill="${c}" fill-opacity=".85" stroke="#ffd0a0" stroke-width="1.2"/>
    <g class="art-flicker"><path d="${flamePath(50, 26, .42)}" fill="#ffe3a0"/></g>
    <circle cx="24" cy="14" r="1.6" fill="${c}"/><circle cx="78" cy="18" r="1.3" fill="${c}"/><circle cx="72" cy="40" r="1" fill="${c}"/>`);

  registerMotif('spores', c => `
    <path d="M28 44 Q30 26 24 22 M50 44 V24 M72 44 Q70 28 76 22" stroke="#5a5048" stroke-width="2" fill="none"/>
    <ellipse cx="24" cy="21" rx="10" ry="6" fill="${c}"/><ellipse cx="50" cy="22" rx="13" ry="8" fill="${c}"/><ellipse cx="76" cy="21" rx="9" ry="5.5" fill="${c}"/>
    <g class="art-float"><circle cx="38" cy="10" r="2" fill="${c}" opacity=".6"/><circle cx="62" cy="7" r="1.6" fill="${c}" opacity=".5"/><circle cx="50" cy="4" r="1.2" fill="${c}" opacity=".5"/></g>`);

  registerMotif('rune', c => `
    <circle cx="50" cy="25" r="18" fill="none" stroke="${c}" stroke-width="2"/>
    ${star(50, 25, 12, 5, 6, c, 'opacity=".8"')}`);

  // --- picking and drawing ---
  function artFor(cardId) {
    const own = (Game.CARD_ART || {})[cardId];
    if (own && motifs[own.motif]) return own;
    const card = Game.CARDS[cardId] || {};
    const first = (card.effects || [])[0];
    const defs = Game.CARD_ART_DEFAULTS || {};
    return (first && defs[first.type]) || defs._other || { motif: 'rune', color: '#b59ad9' };
  }

  function render(cardId) {
    const art = artFor(cardId);
    const draw = motifs[art.motif] || motifs.rune;
    return `<div class="art art-${art.motif}" style="--art:${art.color}">
      <svg viewBox="0 -12 100 74" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${draw(art.color || '#cfc8d8')}</svg>
    </div>`;
  }

  return { render, registerMotif, artFor };
})();
