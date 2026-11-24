// HAIR WIND: draws the six back-view hair strands and animates them (numbers in data/hairWindData.js).
//   Game.UI.hairWind.backStrands(p, hl)  -> SVG for the strands (p = character palette, hl = outline attrs)
// Each strand = an upper part (bends at the top) holding a lower part (bends at the knee).
// Every strand gets its own CSS keyframes, generated once from the data: the gust part is the same
// for all six (same timing, same direction), the wiggle while they are blown over is different
// for each one (own count, size and phase). Styles: css/hairWind.css.
Game.UI = Game.UI || {};

Game.UI.hairWind = (function () {
  const D = () => Game.HAIR_WIND;
  const f = n => n.toFixed(2);

  // Keyframes for one strand. part 'up' rotates the whole strand, 'tip' adds the lower bend + wiggle.
  function keyframes(i, s, part) {
    const d = D(), [g0, g1] = d.gust, h = d.hold;
    const a = part === 'up' ? s.angle * 0.55 : s.angle * 0.75;
    const w = part === 'up' ? s.wiggle * 0.35 : s.wiggle;
    const frames = [[0, 0], [g0 * 100, a * 0.05], [(g0 + (g1 - g0) * 0.6) * 100, a * 0.8], [g1 * 100, a]];
    // while held: own wiggle (sine, own count and phase), easing in and out of it
    const n = s.wiggles * 4;
    for (let k = 1; k < n; k++) {
      const t = g1 + (h - g1) * (k / n);
      const env = Math.sin(Math.PI * k / n);   // soft start and end
      frames.push([t * 100, a + w * env * Math.sin(2 * Math.PI * (s.wiggles * k / n + s.phase))]);
    }
    frames.push([h * 100, a], [(h + (1 - h) * 0.55) * 100, a * 0.1], [(h + (1 - h) * 0.78) * 100, -a * (part === 'tip' ? 0.12 : 0.05)], [100, 0]);
    return `@keyframes hw-${part}-${i} {${frames.map(([p, v]) => ` ${f(p)}% { transform: rotate(${f(v)}deg); }`).join('')} }`;
  }

  let injected = false;
  function ensureStyles() {
    if (injected || typeof document === 'undefined') return;
    injected = true;
    const css = D().strands.map((s, i) => keyframes(i, s, 'up') + '\n' + keyframes(i, s, 'tip')).join('\n') +
      `\n.hw-strand, .hw-tip { animation-duration: ${D().period}s; }`;
    const el = document.createElement('style');
    el.id = 'hair-wind-keyframes';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function strandSvg(p, hl, s, i) {
    const d = D(), [l, r] = s.x, [tx, ty] = s.tip, top = d.top, knee = d.knee;
    const fill = `fill="url(#${p.id}-hairU)"`;
    const upper = `M${l} ${top} L${r} ${top} Q${r + .6} ${(top + knee) / 2} ${r} ${knee + 4} L${l} ${knee + 4} Q${l - .6} ${(top + knee) / 2} ${l} ${top} Z`;
    const lower = `M${l} ${knee} L${r} ${knee} Q${r + .4} ${knee + 22} ${r - 1.2} ${ty - 10} L${tx} ${ty} L${l + 1.2} ${ty - 10} Q${l - .4} ${knee + 22} ${l} ${knee} Z`;
    const mid = (l + r) / 2;
    return `<g class="hw-strand hw-s${i}" style="animation-name:hw-up-${i}">
      <path d="${upper}" ${fill}/>
      <path d="M${l} ${top + 6} L${l} ${knee + 4} M${r} ${top + 6} L${r} ${knee + 4}" ${hl}/>
      <g class="hw-tip" style="animation-name:hw-tip-${i}">
        <path d="${lower}" ${fill}/>
        <path d="M${l} ${knee + 1} Q${l - .4} ${knee + 22} ${l + 1.2} ${ty - 10} L${tx} ${ty} L${r - 1.2} ${ty - 10} Q${r + .4} ${knee + 22} ${r} ${knee + 1}" fill="none" ${hl}/>
        <path d="M${mid - 1.5} ${knee + 2} Q${mid - 2} ${knee + 20} ${mid} ${ty - 14}" stroke="${p.hairShine}" stroke-width="1.6" fill="none" opacity=".7" stroke-linecap="round"/>
      </g>
    </g>`;
  }

  function backStrands(p, hl) {
    ensureStyles();
    const d = D();
    return `<defs><linearGradient id="${p.id}-hairU" gradientUnits="userSpaceOnUse" x1="0" y1="72" x2="0" y2="217">
        <stop offset="0" stop-color="${p.hairShine}"/><stop offset=".3" stop-color="${p.hair}"/><stop offset="1" stop-color="${p.hairShade}"/></linearGradient></defs>
      <g class="hw-strands">${d.strands.map((s, i) => strandSvg(p, hl, s, i)).join('')}</g>`;
  }

  return { backStrands, ensureStyles, keyframes };
})();
