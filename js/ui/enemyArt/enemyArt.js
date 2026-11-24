// ENEMY ART: every enemy is an SVG drawing (no image files), registered by id.
//   Game.UI.enemyArt.register('id', (c, k) => '<svg shapes>')   c = look.color, k = helper kit below
//   Game.UI.enemyArt.sprite(look)  -> the .sprite element for the combat screen
// Drawings use a 120 x 120 box, standing on the ground line at y = 114.
// Parts with class ea-eye blink, ea-limb / ea-tail / ea-fin wave (css/enemyArt.css).
// Which drawing an enemy uses: look.art in data/enemiesData.js / enemiesMoreData.js.
Game.UI = Game.UI || {};

Game.UI.enemyArt = (function () {
  const arts = {};
  const register = (id, fn) => { arts[id] = fn; };
  const has = id => !!arts[id];

  // Color helpers: shade('#88aa55', -0.3) is 30% darker, 0.3 lighter.
  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
    return '#' + ch.map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const LINE = '#16111c';
  const kit = {
    shade, LINE,
    ol: (w = 2) => `stroke="${LINE}" stroke-width="${w}" stroke-linejoin="round"`,
    eye: (x, y, r = 3.4, col = '#ffd24a') => `<g class="ea-eye"><circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/><circle cx="${x + r * .25}" cy="${y - r * .25}" r="${r * .35}" fill="#fff" opacity=".85"/></g>`,
    slit: (x, y, r = 3.4, col = '#ffd24a') => `<g class="ea-eye"><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .8}" fill="${col}"/><ellipse cx="${x}" cy="${y}" rx="${r * .25}" ry="${r * .7}" fill="${LINE}"/></g>`,
    shadow: (rx = 34) => `<ellipse cx="60" cy="115" rx="${rx}" ry="4.5" fill="#000" opacity=".35"/>`,
  };

  function svg(id, color) {
    const fn = arts[id];
    return `<svg class="ea-svg ea-${id}" viewBox="0 0 120 120" aria-hidden="true">${fn ? fn(color, kit) : ''}</svg>`;
  }

  function sprite(look) {
    return `<div class="sprite svgart idle-${look.idle || 'bob'}" style="--c:${look.color};--s:${look.size}">${svg(look.art, look.color)}</div>`;
  }

  return { register, has, sprite, svg, kit };
})();
