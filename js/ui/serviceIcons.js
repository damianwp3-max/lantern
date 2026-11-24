// SERVICE ICONS: SVG drawings for option icons (rest site heal, card upgrade).
// Colors and shapes: js/data/serviceIconsData.js. Usage: Game.UI.serviceIcons.render('heal', 40)
Game.UI = Game.UI || {};
Game.UI.serviceIcons = (function () {
  const DRAW = {
    heal(c) {
      // a rounded plus sign centered at (x, y), `s` wide, with a soft light stripe on top
      const plus = ([x, y, s]) => {
        const t = s * 0.36, h = s / 2, r = t * 0.3;
        return `<g>
          <rect x="${x - h}" y="${y - t / 2}" width="${s}" height="${t}" rx="${r}" fill="${c.fill}" stroke="${c.edge}" stroke-width="1.4" paint-order="stroke"/>
          <rect x="${x - t / 2}" y="${y - h}" width="${t}" height="${s}" rx="${r}" fill="${c.fill}" stroke="${c.edge}" stroke-width="1.4" paint-order="stroke"/>
          <rect x="${x - t / 2}" y="${y - t / 2}" width="${t}" height="${t}" fill="${c.fill}"/>
          <rect x="${x - t / 2 + t * 0.18}" y="${y - h + t * 0.18}" width="${t * 0.28}" height="${s * 0.42}" rx="${t * 0.14}" fill="${c.light}" opacity=".75"/>
        </g>`;
      };
      return c.pluses.map(plus).join('');
    },
    upgrade(c) {
      return `
        <rect x="9" y="5" width="26" height="36" rx="4" fill="${c.card}" stroke="${c.cardEdge}" stroke-width="2.2"/>
        <rect x="13" y="9" width="18" height="15" rx="2" fill="${c.panel}" stroke="${c.panelEdge}" stroke-width="1"/>
        <rect x="13" y="28" width="18" height="2.2" rx="1.1" fill="${c.panelEdge}"/>
        <rect x="13" y="33" width="12" height="2.2" rx="1.1" fill="${c.panelEdge}"/>
        <path d="M33 14 L44 26 L38 26 L38 42 L28 42 L28 26 L22 26 Z" fill="${c.arrow}" stroke="${c.arrowEdge}" stroke-width="2" stroke-linejoin="round" paint-order="stroke"/>
        <path d="M33 18.5 L29 23 L31 23 L31 39 L32.6 39 L32.6 21.8 Z" fill="${c.arrowLight}" opacity=".7"/>`;
    },
  };

  function render(name, size = 40) {
    const draw = DRAW[name], colors = (Game.SERVICE_ICONS || {})[name];
    if (!draw || !colors) return '';
    return `<svg class="svc-ico svc-${name}" viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">${draw(colors)}</svg>`;
  }

  return { render, has: name => !!DRAW[name] };
})();
