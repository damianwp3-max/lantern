// CAVE BACKDROP
// The battle background: a cave drawn in SVG + CSS (no image files), with
// stalactites, rock walls, glowing moss or crystals, hanging lanterns with
// flickering light, a light shaft, fog and floating spores / bubbles / embers.
// Colors and props per level: data/caveData.js. Style and motion: css/cave.css.
//   Game.UI.caveBackdrop.render(levelIndex) -> HTML string
// The shapes are rolled once per level with a fixed seed, so the cave looks the
// same on every re-render; a negative animation delay (--cv-t) keeps the
// flicker and drifting going smoothly between renders.
Game.UI = Game.UI || {};

Game.UI.caveBackdrop = (function () {
  const cache = {};

  // Small seeded random so a level always gets the same cave.
  function rng(seed) {
    let s = seed * 9301 + 49297;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  // A jagged ceiling with hanging stalactites, across a 1600 x 600 box.
  function ceiling(r, color, depth, count) {
    let d = `M0 0 H1600 V${depth}`;
    const step = 1600 / count;
    for (let i = count; i > 0; i--) {
      const x = i * step, w = step * (0.35 + r() * 0.4), len = depth + 20 + r() * 110 * (r() > .6 ? 1.6 : 1);
      d += ` L${(x - step * .1).toFixed(0)} ${(depth + r() * 20).toFixed(0)} L${(x - step * .5).toFixed(0)} ${len.toFixed(0)} L${(x - step * .5 - w * .3).toFixed(0)} ${(depth + r() * 15).toFixed(0)}`;
    }
    return `<path d="${d} L0 ${depth}Z" fill="${color}"/>`;
  }

  // Rock wall silhouettes on the sides and a ridge in the back.
  function walls(r, cave) {
    let left = 'M0 600 V60', right = 'M1600 600 V60';
    for (let y = 60; y <= 600; y += 60) {
      left += ` L${(90 + r() * 120 + (y > 380 ? 60 : 0)).toFixed(0)} ${y}`;
      right += ` L${(1600 - 80 - r() * 130 - (y > 380 ? 50 : 0)).toFixed(0)} ${y}`;
    }
    let ridge = 'M0 600 V420';
    for (let x = 0; x <= 1600; x += 80) ridge += ` L${x} ${(370 + r() * 70).toFixed(0)}`;
    return `<path d="${ridge} V600Z" fill="${cave.rock2}" opacity=".85"/>
      <path d="${left} V600Z" fill="${cave.rock}"/><path d="${right} V600Z" fill="${cave.rock}"/>`;
  }

  // Glowing moss blobs or crystal clusters on the walls.
  function glowers(r, cave) {
    const spots = [[60, 300], [160, 470], [1500, 260], [1440, 470], [310, 120], [1290, 110], [760, 70], [980, 420], [600, 440]];
    return spots.map(([x, y], i) => {
      const s = 0.7 + r() * 0.7, delay = (r() * 4).toFixed(2);
      if (cave.crystals) {
        const shards = [-18, -6, 6, 16].map((dx, k) => {
          const h = (24 + r() * 30) * s, w = 7 * s, tilt = (dx * 1.2).toFixed(0);
          return `<path d="M${x + dx * s} ${y} l${-w} 0 l${w} ${-h} l${w} ${h}Z" transform="rotate(${tilt} ${x + dx * s} ${y})" fill="${cave.glow}" fill-opacity="${.35 + k * .12}"/>`;
        }).join('');
        return `<g class="cv-glow" style="animation-delay:calc(var(--cv-t) - ${delay}s)"><ellipse cx="${x}" cy="${y - 14 * s}" rx="${50 * s}" ry="${40 * s}" fill="url(#cv-halo)"/>${shards}</g>`;
      }
      const dots = Array.from({ length: 7 }, () => `<circle cx="${(x + (r() - .5) * 60 * s).toFixed(0)}" cy="${(y + (r() - .5) * 22 * s).toFixed(0)}" r="${(3 + r() * 6 * s).toFixed(1)}" fill="${cave.glow}" fill-opacity="${(.45 + r() * .5).toFixed(2)}"/>`).join('');
      return `<g class="cv-glow" style="animation-delay:calc(var(--cv-t) - ${delay}s)"><ellipse cx="${x}" cy="${y}" rx="${55 * s}" ry="${34 * s}" fill="url(#cv-halo)"/>${dots}</g>`;
    }).join('');
  }

  // Hanging roots (Root Cellar).
  function roots(r, cave) {
    return Array.from({ length: 9 }, (_, i) => {
      const x = 120 + i * 170 + r() * 60, len = 60 + r() * 120;
      return `<path class="cv-root" style="animation-delay:calc(var(--cv-t) - ${(r() * 5).toFixed(1)}s)" d="M${x.toFixed(0)} 20 q${(r() * 30 - 15).toFixed(0)} ${(len / 2).toFixed(0)} ${(r() * 20 - 10).toFixed(0)} ${len.toFixed(0)}" stroke="#4a3624" stroke-width="${(2 + r() * 3).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    }).join('');
  }

  function svg(levelIndex) {
    const cave = Game.CAVES[Math.min(levelIndex, Game.CAVES.length - 1)];
    const r = rng(levelIndex + 7);
    return `<svg class="cv-svg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="cv-halo"><stop offset="0" stop-color="${cave.glow}" stop-opacity=".45"/><stop offset="1" stop-color="${cave.glow}" stop-opacity="0"/></radialGradient>
        <linearGradient id="cv-back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cave.sky}"/><stop offset=".6" stop-color="${cave.rock2}"/><stop offset="1" stop-color="${cave.floor}"/></linearGradient>
        <linearGradient id="cv-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cave.floor}"/><stop offset="1" stop-color="#050406"/></linearGradient>
      </defs>
      <rect width="1600" height="600" fill="url(#cv-back)"/>
      ${ceiling(r, cave.rock2, 30, 14)}
      ${walls(r, cave)}
      ${glowers(r, cave)}
      ${cave.roots ? roots(r, cave) : ''}
      ${ceiling(r, cave.rock, 8, 9)}
      <path d="M0 470 Q400 440 800 455 T1600 465 V600 H0Z" fill="url(#cv-floor)"/>
      ${cave.water ? `<ellipse cx="820" cy="540" rx="520" ry="34" fill="#0a1a22" opacity=".9"/><ellipse class="cv-ripple" cx="820" cy="540" rx="420" ry="20" fill="none" stroke="${cave.glow}" stroke-opacity=".25"/>` : ''}
    </svg>`;
  }

  function lanterns(cave, r) {
    const xs = cave.lanterns === 3 ? [22, 50, 80] : [26, 76];
    return xs.map((x, i) => `<div class="cv-lantern" style="left:${x}%;--len:${30 + Math.round(r() * 50)}px;animation-delay:calc(var(--cv-t) - ${i * 1.3}s)">
        <i class="cv-chain"></i><i class="cv-lamp"></i><i class="cv-light"></i></div>`).join('');
  }

  function motes(cave, r) {
    return Array.from({ length: 22 }, () => {
      const x = (r() * 100).toFixed(1), d = (6 + r() * 10).toFixed(1), delay = (r() * 12).toFixed(1), s = (2 + r() * 4).toFixed(1), drift = (r() * 60 - 30).toFixed(0);
      return `<i class="cv-mote" style="left:${x}%;--d:${d}s;--sz:${s}px;--dx:${drift}px;animation-delay:calc(var(--cv-t) - ${delay}s)"></i>`;
    }).join('');
  }

  function render(levelIndex = 0) {
    const cave = Game.CAVES[Math.min(levelIndex, Game.CAVES.length - 1)];
    if (!cache[levelIndex]) {
      const r = rng(levelIndex + 31);
      cache[levelIndex] = `${svg(levelIndex)}
        <div class="cv-shaft"></div>
        ${lanterns(cave, r)}
        <div class="cv-fog"></div><div class="cv-fog cv-fog2"></div>
        <div class="cv-motes cv-${cave.motes}">${motes(cave, r)}</div>
        <div class="cv-vignette"></div>`;
    }
    const t = (performance.now() / 1000).toFixed(2);
    return `<div class="cave" style="--cv-t:-${t}s;--cv-light:${cave.light};--cv-glow:${cave.glow}">${cache[levelIndex]}</div>`;
  }

  return { render };
})();
