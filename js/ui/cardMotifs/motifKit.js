// MOTIF KIT: small shared shapes for card drawings (100 x 50 box), used by the
// js/ui/cardMotifs/*Motifs.js files.  Game.UI.cardArt.kit.star(...), .flame(...), ...
Game.UI.cardArt.kit = (function () {
  const W = '#fff3d6', D = '#211e29', L = '#0d0c10';
  function star(cx, cy, r1, r2, n, color, extra = '') {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? r2 : r1, a = (Math.PI * i) / n - Math.PI / 2;
      d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${color}" ${extra}/>`;
  }
  const flame = (x, y, s, c, cls = 'art-flicker') =>
    `<g class="${cls}"><path d="M${x} ${y} Q${x - 6 * s} ${y - 6 * s} ${x - 2 * s} ${y - 14 * s} Q${x} ${y - 9 * s} ${x + 2 * s} ${y - 17 * s} Q${x + 8 * s} ${y - 7 * s} ${x} ${y}Z" fill="${c}"/><path d="M${x} ${y - 1} Q${x - 2.5 * s} ${y - 4 * s} ${x} ${y - 8 * s} Q${x + 2.5 * s} ${y - 4 * s} ${x} ${y - 1}Z" fill="${W}"/></g>`;
  const candle = (x, y, h, c, wax = '#e8dcc0') =>
    `<rect x="${x - 4}" y="${y - h}" width="8" height="${h}" rx="1.5" fill="${wax}" stroke="${L}" stroke-width="1"/><path d="M${x} ${y - h} V${y - h - 3}" stroke="${L}" stroke-width="1"/>${flame(x, y - h - 2, .7, c)}`;
  const lantern = (x, y, s, c) =>
    `<path d="M${x} ${y - 16 * s} V${y - 12 * s}" stroke="#8a7a5a" stroke-width="1.2"/><path d="M${x - 5 * s} ${y - 12 * s} H${x + 5 * s} L${x + 7 * s} ${y - 9 * s} H${x - 7 * s}Z" fill="#8a7a5a"/>
     <rect x="${x - 6 * s}" y="${y - 9 * s}" width="${12 * s}" height="${14 * s}" rx="${2 * s}" fill="#2a2418" stroke="${c}" stroke-width="1.5"/>
     <circle cx="${x}" cy="${y - 2 * s}" r="${3.5 * s}" fill="${c}" class="art-flicker2"/><path d="M${x - 7 * s} ${y + 5 * s} H${x + 7 * s}" stroke="#8a7a5a" stroke-width="1.6"/>`;
  const shieldPath = (cx, cy, s) =>
    `M${cx} ${cy - 20 * s} L${cx + 16 * s} ${cy - 14 * s} L${cx + 15 * s} ${cy + 2 * s} Q${cx + 12 * s} ${cy + 15 * s} ${cx} ${cy + 21 * s} Q${cx - 12 * s} ${cy + 15 * s} ${cx - 15 * s} ${cy + 2 * s} L${cx - 16 * s} ${cy - 14 * s}Z`;
  const coin = (x, y, r, c, mark = '') =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${L}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r * .72}" fill="none" stroke="${W}" stroke-width=".9" opacity=".6"/>${mark}`;
  function die(x, y, s, c, pips) {
    const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[pips] || [];
    return `<rect x="${x - 9 * s}" y="${y - 9 * s}" width="${18 * s}" height="${18 * s}" rx="${3.5 * s}" fill="${W}" stroke="${L}" stroke-width="1.2"/>${P.map(([a, b]) => `<circle cx="${x + a * 5 * s}" cy="${y + b * 5 * s}" r="${1.7 * s}" fill="${c}"/>`).join('')}`;
  }
  const clover = (x, y, s, c) => [0, 90, 180, 270].map(a => `<circle cx="${(x + 4.2 * s * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(y + 4.2 * s * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="${4 * s}" fill="${c}"/>`).join('') + `<path d="M${x} ${y} Q${x + 3 * s} ${y + 8 * s} ${x + 1 * s} ${y + 13 * s}" stroke="${c}" stroke-width="${1.6 * s}" fill="none"/>`;
  const blade = (x1, y1, x2, y2, c, w = 4) =>
    `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${W}" stroke-width="${w * .3}" stroke-linecap="round" opacity=".7"/>`;
  const drop = (x, y, s, c) => `<path d="M${x} ${y - 9 * s} Q${x + 7 * s} ${y} ${x} ${y + 5 * s} Q${x - 7 * s} ${y} ${x} ${y - 9 * s}Z" fill="${c}" stroke="${L}" stroke-width=".8"/>`;
  const skull = (x, y, s, c) => `<path d="M${x - 7 * s} ${y} Q${x - 8 * s} ${y - 10 * s} ${x} ${y - 10 * s} Q${x + 8 * s} ${y - 10 * s} ${x + 7 * s} ${y} L${x + 4 * s} ${y + 2 * s} V${y + 6 * s} H${x - 4 * s} V${y + 2 * s}Z" fill="${c}" stroke="${L}" stroke-width="1"/><circle cx="${x - 3 * s}" cy="${y - 3 * s}" r="${2 * s}" fill="${L}"/><circle cx="${x + 3 * s}" cy="${y - 3 * s}" r="${2 * s}" fill="${L}"/>`;
  return { W, D, L, star, flame, candle, lantern, shieldPath, coin, die, clover, blade, drop, skull };
})();
