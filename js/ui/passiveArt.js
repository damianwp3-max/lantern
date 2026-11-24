// PASSIVE ART
// Each passive gets its own small round picture, like cards have art.
// Which drawing a passive uses: data/passivesData.js -> art: { icon, color }.
//   Game.UI.passiveArt.render(passiveId, size) -> HTML string (a round badge)
//   Game.UI.passiveArt.registerIcon('name', color => '<svg shapes>')   drawings use a 48 x 48 box
Game.UI = Game.UI || {};

Game.UI.passiveArt = (function () {
  const icons = {};
  function registerIcon(name, fn) { icons[name] = fn; }

  registerIcon('coat', c => `
    <path d="M17 9 L24 13 L31 9 L39 14 L36 22 L33 21 L33 40 L15 40 L15 21 L12 22 L9 14Z" fill="${c}" fill-opacity=".28" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 13 V40" stroke="${c}" stroke-width="1.4" opacity=".7"/>
    <circle cx="24" cy="21" r="1.5" fill="#ffe2a8"/><circle cx="24" cy="28" r="1.5" fill="#ffe2a8"/>
    <path class="pa-beat" d="M24 35 C20 31 18 29 20 27 C21.5 25.5 23 26.5 24 28 C25 26.5 26.5 25.5 28 27 C30 29 28 31 24 35Z" fill="${c}"/>`);

  registerIcon('charm', c => `
    <path d="M14 6 Q24 16 34 6" stroke="#b8a070" stroke-width="1.5" fill="none"/>
    <path d="M24 12 L35 16 L34 26 Q32 35 24 40 Q16 35 14 26 L13 16Z" fill="${c}" fill-opacity=".25" stroke="${c}" stroke-width="2"/>
    <path class="pa-flicker" d="M24 19 Q29 25 26 31 Q24 34 22 31 Q19 25 24 19Z" fill="#ffb347"/>
    <circle cx="24" cy="28" r="2" fill="#fff3d6"/>`);

  registerIcon('wick', c => `
    <rect x="18" y="22" width="12" height="18" rx="2" fill="#efe4cf" stroke="#b8a070" stroke-width="1.2"/>
    <path d="M24 22 V18" stroke="#3a2a1a" stroke-width="1.5"/>
    <path class="pa-flicker" d="M24 6 Q30 13 27 18 Q24 21 21 18 Q18 13 24 6Z" fill="${c}"/>
    <path d="M36 10 L31 19 L35 19 L32 27 L40 16 L36 16 L39 10Z" fill="${c}" opacity=".9"/>`);

  registerIcon('hook', c => `
    <path d="M24 6 V26 Q24 38 15 36 Q9 34 11 27" stroke="${c}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M11 27 L8 31 M11 27 L15 29" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="24" cy="7" r="3" fill="none" stroke="#b8a070" stroke-width="2"/>
    <path class="pa-flicker" d="M33 18 L38 13 M34 24 L41 23 M32 12 L33 6" stroke="#fff3d6" stroke-width="1.6" stroke-linecap="round"/>`);

  registerIcon('pouch', c => `
    <path d="M14 18 Q12 40 24 40 Q36 40 34 18Z" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="2"/>
    <path d="M13 18 Q24 12 35 18" stroke="${c}" stroke-width="2.4" fill="none"/>
    <path d="M19 14 L17 8 M29 14 L31 8" stroke="#8a6a4a" stroke-width="1.6"/>
    <g class="pa-float"><rect x="18" y="5" width="8" height="11" rx="1.2" fill="#211e29" stroke="#ffe2a8" stroke-width="1.2" transform="rotate(-14 22 10)"/>
    <rect x="24" y="4" width="8" height="11" rx="1.2" fill="#211e29" stroke="#ffe2a8" stroke-width="1.2" transform="rotate(12 28 10)"/></g>`);

  registerIcon('glow', c => `
    <circle class="pa-pulse" cx="24" cy="25" r="15" fill="${c}" opacity=".18"/>
    <path d="M24 36 C14 29 10 24 13 18 C16 13 21 14 24 19 C27 14 32 13 35 18 C38 24 34 29 24 36Z" fill="${c}" fill-opacity=".45" stroke="${c}" stroke-width="2"/>
    <path d="M21 25 H27 M24 22 V28" stroke="#fff3d6" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 4 V8 M8 22 H12 M36 22 H40 M12 10 L15 13 M36 10 L33 13" stroke="#ffd27a" stroke-width="1.5" stroke-linecap="round"/>`);

  // Fallback: the passive's symbol in a circle.
  const fallback = (p, c) => `<text x="24" y="30" text-anchor="middle" font-size="18" fill="${c}">${p.icon || '?'}</text>`;

  function render(id, size = 34) {
    const p = Game.PASSIVES[id];
    if (!p) return '';
    const art = p.art || {};
    const color = art.color || '#d9a441';
    const draw = icons[art.icon];
    return `<span class="pa-badge" style="--pa:${color};--pa-size:${size}px">
      <svg viewBox="0 0 48 48" aria-hidden="true">${draw ? draw(color) : fallback(p, color)}</svg></span>`;
  }

  return { render, registerIcon };
})();
