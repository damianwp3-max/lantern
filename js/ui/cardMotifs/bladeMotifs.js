// CARD DRAWINGS: blades, throws and strikes (one unique picture per card; see data/cardIconsData.js).
(function () {
  const M = Game.UI.cardArt.registerMotif, K = Game.UI.cardArt.kit, { W, D, L } = K;

  M('knife', c => `<path d="M26 34 L70 14 Q80 12 82 18 L36 40Z" fill="#cfd6e0" stroke="${L}" stroke-width="1.2"/><path d="M30 35 L74 16" stroke="${W}" stroke-width="1" opacity=".8"/>
    <rect x="12" y="34" width="18" height="8" rx="3" transform="rotate(-24 21 38)" fill="${c}" stroke="${L}" stroke-width="1.2"/><circle cx="86" cy="30" r="10" fill="${c}" opacity=".18"/>${K.star(84, 30, 6, 2, 4, c)}`);
  M('cutLine', c => `<circle cx="50" cy="25" r="18" fill="none" stroke="${c}" stroke-width="1.2" opacity=".5"/><path d="M50 3 V12 M50 38 V47 M28 25 H37 M63 25 H72" stroke="${c}" stroke-width="1.6"/>
    <path d="M14 44 L86 6" stroke="${W}" stroke-width="2.2" stroke-linecap="round"/><path d="M14 44 L86 6" stroke="${c}" stroke-width="5" opacity=".3" stroke-linecap="round"/>`);
  M('dagger', c => `<path d="M50 4 L56 30 H44Z" fill="#d8dce6" stroke="${L}" stroke-width="1.2"/><rect x="38" y="30" width="24" height="4" rx="1.5" fill="${c}" stroke="${L}" stroke-width="1"/><rect x="47" y="34" width="6" height="11" rx="2" fill="#5a4030" stroke="${L}"/>
    <path d="M20 20 Q20 12 26 14 Q32 12 32 20 Q32 26 26 30 Q20 26 20 20Z" fill="${c}"/><path d="M74 26 L80 16 L86 26 L80 36Z" fill="${c}"/>`);
  M('sheathed', c => `<path d="M14 40 L76 12" stroke="#4a3426" stroke-width="9" stroke-linecap="round"/><path d="M14 40 L76 12" stroke="${c}" stroke-width="1.4" stroke-dasharray="4 5"/>
    <path d="M76 12 L82 9" stroke="#cfd6e0" stroke-width="5"/><path d="M78 4 L86 18" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path d="M84 7 L94 3" stroke="#5a4030" stroke-width="4" stroke-linecap="round"/>
    <circle cx="30" cy="16" r="6" fill="none" stroke="${c}" stroke-width="1.2" opacity=".6"/><path d="M30 12 V16 L33 18" stroke="${c}" stroke-width="1.2"/>`);
  M('thrownDagger', c => `<path d="M6 30 H30 M10 22 H28 M12 38 H30" stroke="${c}" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>
    <path d="M40 25 L80 21 L90 25 L80 29Z" fill="#d8dce6" stroke="${L}" stroke-width="1.2"/><rect x="34" y="20" width="4" height="10" rx="1" fill="${c}"/><rect x="24" y="23" width="10" height="4" rx="2" fill="#5a4030"/>`);
  M('hatchet', c => `<path d="M22 46 L62 8" stroke="#7a5432" stroke-width="5" stroke-linecap="round"/><path d="M54 6 Q70 2 80 12 Q74 22 62 22 L56 16Z" fill="#cfd6e0" stroke="${L}" stroke-width="1.2"/>
    <path d="M72 6 Q80 12 76 18" stroke="${W}" stroke-width="1.2" fill="none"/><path d="M84 30 Q90 36 84 42 M90 26 Q98 36 90 46" stroke="${c}" stroke-width="1.6" fill="none" opacity=".6"/>`);
  M('flick', c => `<circle cx="34" cy="30" r="9" fill="#e8c8a8" stroke="${L}" stroke-width="1"/><path d="M40 24 Q48 14 54 16" stroke="#e8c8a8" stroke-width="5" stroke-linecap="round"/>
    ${[[64, 12, 4], [76, 22, 5], [70, 34, 3.4], [86, 10, 3]].map(([x, y, r], i) => `<g class="${i % 2 ? 'art-flicker' : 'art-flicker2'}">${K.star(x, y, r, r * .35, 4, c)}</g>`).join('')}`);
  M('caltrop', c => `<g transform="translate(50 28) scale(1.45)">${[0, 120, 240].map(a => `<path d="M0 0 L${(16 * Math.cos((a - 90) * Math.PI / 180)).toFixed(1)} ${(16 * Math.sin((a - 90) * Math.PI / 180)).toFixed(1)}" stroke="#d8dce6" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M0 0 L0 12" stroke="#a8acb8" stroke-width="3" stroke-linecap="round"/><circle r="3" fill="${c}"/></g><path d="M10 46 H90" stroke="${c}" stroke-width="1" opacity=".4"/>`);
  M('cloverDagger', c => `<path d="M30 40 L70 10 L76 14 L36 44Z" fill="#d8dce6" stroke="${L}" stroke-width="1.2"/><rect x="22" y="38" width="12" height="6" rx="2" transform="rotate(-37 28 41)" fill="#5a4030"/>${K.clover(76, 30, .9, c)}`);
  M('twoSwords', c => `${K.blade(18, 44, 70, 6, '#d8dce6', 4)}<g opacity=".45">${K.blade(82, 44, 30, 6, c, 4)}</g><path d="M26 34 L34 42 M74 34 L66 42" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="${W}">×2</text>`);
  M('slam', c => `${K.lantern(50, 28, 1.3, c)}<path d="M14 46 H86" stroke="${c}" stroke-width="2"/><path d="M20 40 L12 34 M80 40 L88 34 M28 44 L22 40 M72 44 L78 40" stroke="${W}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M44 4 V0 M56 4 V0 M38 8 L34 4 M62 8 L66 4" stroke="${c}" stroke-width="1.4"/>`);
  M('swingArc', c => `<path d="M14 10 Q50 52 86 10" stroke="${c}" stroke-width="2" fill="none" stroke-dasharray="3 4" opacity=".7"/><path d="M50 2 L66 30" stroke="#8a7a5a" stroke-width="1.6"/><g transform="translate(18 18)">${K.lantern(50, 20, .9, c)}</g>
    <g transform="translate(-12 0)">${K.shieldPath ? `<path d="${K.shieldPath(30, 26, .55)}" fill="#6f9be0" fill-opacity=".3" stroke="#6f9be0" stroke-width="2"/>` : ''}</g>`);
  M('charge', c => `<path d="M10 25 H60" stroke="${c}" stroke-width="8" stroke-linecap="round" opacity=".3"/><path d="M60 12 L88 25 L60 38 L66 25Z" fill="${c}" stroke="${L}" stroke-width="1.2"/>
    ${K.flame(24, 28, .8, '#ff9a3c', 'art-flicker')}${K.flame(40, 26, 1, '#ffb347', 'art-flicker2')}<path d="M18 36 L8 40 M24 14 L14 10" stroke="${c}" stroke-width="1.4"/>`);
  M('horseshoe', c => `<path d="M30 10 V26 Q30 44 50 44 Q70 44 70 26 V10" stroke="#b8bcc8" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${[[30, 16], [30, 28], [70, 16], [70, 28], [40, 40], [60, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="${L}"/>`).join('')}<path d="M76 8 Q86 4 92 10 M80 16 Q90 14 94 20" stroke="${c}" stroke-width="1.6" fill="none"/>`);
  M('lunge', c => `<path d="M6 34 L78 16" stroke="#7a5432" stroke-width="3.4" stroke-linecap="round"/><path d="M76 10 L96 12 L80 24Z" fill="#d8dce6" stroke="${L}" stroke-width="1.2"/>
    <path d="M8 22 H34 M4 44 H30" stroke="${c}" stroke-width="1.6" opacity=".5"/>${K.drop(30, 40, .8, '#e03a4a')}`);
  M('barrage', c => [10, 24, 38].map((y, i) => `<g transform="translate(${i * 8} 0)"><path d="M12 ${y + 4} L70 ${y - 2}" stroke="#8a7a5a" stroke-width="1.6"/><path d="M70 ${y - 5} L80 ${y - 2.5} L70 ${y + 1}Z" fill="${c}"/>${K.flame(14, y + 6, .4, c, i % 2 ? 'art-flicker' : 'art-flicker2')}</g>`).join(''));
  M('scatter', c => `<path d="M8 32 L24 24 L24 40Z" fill="${D}" stroke="${c}" stroke-width="1.4"/>${[[40, 14], [52, 30], [64, 8], [70, 40], [82, 22], [92, 34], [46, 44]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${2.6 - (i % 3) * .4}" fill="${c}" class="${i % 2 ? 'art-flicker' : 'art-flicker2'}"/><path d="M${x - 8} ${y + 2} L${x - 3} ${y + .5}" stroke="${c}" stroke-width="1" opacity=".5"/>`).join('')}`);
  M('bounce', c => `<path d="M8 10 L44 40 L70 12 L92 30" stroke="${c}" stroke-width="2" fill="none" stroke-dasharray="4 3"/><circle cx="92" cy="30" r="5" fill="${c}"/><circle cx="92" cy="30" r="2" fill="${W}"/>
    <path d="M38 46 L44 40 L50 46 M64 6 L70 12 L76 6" stroke="${W}" stroke-width="1.6" fill="none"/>`);
  M('hook', c => `<path d="M60 2 V24 Q60 40 46 40 Q34 40 34 30" stroke="#b8bcc8" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M30 30 L34 22 L38 30Z" fill="#b8bcc8"/>
    <path d="M60 2 V-4" stroke="#7a6a5a" stroke-width="3"/><path d="M72 30 Q80 26 86 30 Q80 36 72 30Z M74 40 Q82 36 88 40" stroke="${c}" stroke-width="1.6" fill="none"/>`);
  M('chaos', c => `<path d="M10 30 L24 12 L32 34 L46 8 L54 36 L66 14 L74 38 L88 16" stroke="${c}" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M10 30 L24 12 L32 34 L46 8 L54 36 L66 14 L74 38 L88 16" stroke="${W}" stroke-width="1" fill="none"/>
    <circle cx="20" cy="40" r="2" fill="${c}"/><circle cx="80" cy="8" r="2" fill="${c}"/><circle cx="60" cy="44" r="1.6" fill="${c}"/>`);
  M('arrowLight', c => `<path d="M6 40 L84 12" stroke="${c}" stroke-width="7" opacity=".25" stroke-linecap="round"/><path d="M6 40 L84 12" stroke="${W}" stroke-width="2" stroke-linecap="round"/>
    <path d="M78 8 L94 8 L86 22Z" fill="${W}"/>${K.star(30, 31, 5, 1.6, 4, c)}${K.star(56, 22, 4, 1.4, 4, c)}`);
  M('signalFlare', c => `<path d="M30 46 L46 18" stroke="#8a7a5a" stroke-width="5" stroke-linecap="round"/><path d="M46 18 Q60 2 76 8" stroke="${c}" stroke-width="1.6" fill="none" stroke-dasharray="2 3"/>
    <g class="art-flicker">${K.star(78, 9, 9, 3, 6, c)}</g><circle cx="78" cy="9" r="2.6" fill="${W}"/>`);
  M('flareBurst', c => `${[...Array(9)].map((_, i) => { const x = 10 + i * 10; return `<path d="M50 4 L${x} 46" stroke="${c}" stroke-width="${i % 2 ? 1.2 : 2.4}" opacity="${i % 2 ? .5 : .8}"/>`; }).join('')}<circle cx="50" cy="6" r="7" fill="${c}"/><circle cx="50" cy="6" r="3" fill="${W}"/>`);
  M('meltdown', c => `<rect x="44" y="4" width="12" height="32" rx="6" fill="${D}" stroke="${c}" stroke-width="1.6"/><rect x="47" y="14" width="6" height="22" rx="3" fill="#ff5a3a"/><circle cx="50" cy="40" r="7" fill="#ff5a3a" stroke="${L}" stroke-width="1"/>
    ${K.flame(28, 44, 1.1, c)}${K.flame(72, 44, 1.1, c, 'art-flicker2')}<path d="M62 8 L70 4 M62 16 L72 16" stroke="${W}" stroke-width="1.4"/>`);
})();
