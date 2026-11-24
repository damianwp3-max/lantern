// MORE CARD DRAWINGS (for the multi-target, delayed, random, status and power cards)
// Same rules as ui/cardArt.js: each motif is color -> SVG shapes in a 100 x 50 box.
// Which card uses which motif: the card's art field (js/data/cards/*.js).
(function () {
  const M = Game.UI.cardArt.registerMotif;
  function star(cx, cy, r1, r2, n, color, extra = '') {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? r2 : r1, a = (Math.PI * i) / n - Math.PI / 2;
      d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${color}" ${extra}/>`;
  }
  const W = '#fff3d6';

  // --- multi-target ---
  M('wave', c => `
    <path d="M4 40 Q20 18 36 34 T68 30 T98 22" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round" opacity=".3"/>
    <path d="M4 40 Q20 18 36 34 T68 30 T98 22" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M10 26 Q24 8 40 20 T74 14" stroke="${W}" stroke-width="1.3" fill="none" opacity=".7"/>
    <g class="art-flicker">${star(20, 20, 4, 1.5, 4, c)}${star(56, 14, 5, 2, 4, c)}${star(86, 10, 3.5, 1.4, 4, c)}</g>`);

  M('rain', c => [14, 30, 46, 62, 78].map((x, i) => `
    <g class="${i % 2 ? 'art-flicker' : 'art-flicker2'}"><path d="M${x + 8} ${-4 + i * 3} L${x} ${30 + (i % 2) * 6}" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="${x}" cy="${31 + (i % 2) * 6}" r="2.6" fill="${W}"/></g>`).join('') +
    `<path d="M6 46 H94" stroke="${c}" stroke-width="1.2" opacity=".4"/>`);

  M('chain', c => `
    <path d="M10 14 L32 30 L48 12 L66 34 L90 18" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round" opacity=".3"/>
    <path d="M10 14 L32 30 L48 12 L66 34 L90 18" stroke="${c}" stroke-width="2" fill="none" stroke-linejoin="round"/>
    ${[[10, 14], [32, 30], [48, 12], [66, 34], [90, 18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#211e29" stroke="${c}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="1.5" fill="${W}"/>`).join('')}`);

  M('ring', c => `
    <ellipse cx="50" cy="30" rx="40" ry="13" fill="none" stroke="${c}" stroke-width="2.5" opacity=".5"/>
    <ellipse cx="50" cy="30" rx="28" ry="9" fill="${c}" opacity=".15"/>
    <g class="art-flicker">${[14, 32, 50, 68, 86].map((x, i) => `<path d="M${x} ${30 + (i % 2 ? 9 : -2)} q4 -10 0 -16 q-4 6 0 16z" fill="${c}"/>`).join('')}</g>
    <circle cx="50" cy="28" r="5" fill="${W}" opacity=".8"/>`);

  M('beam', c => `
    <path d="M38 6 L8 46 H92 L62 6Z" fill="${c}" opacity=".18"/>
    <path d="M44 6 L28 46 H72 L56 6Z" fill="${c}" opacity=".3"/>
    <rect x="40" y="-4" width="20" height="14" rx="3" fill="#2a2418" stroke="${c}" stroke-width="1.6"/>
    <circle cx="50" cy="3" r="4" fill="${W}"/>
    <path d="M30 2 L22 -4 M70 2 L78 -4" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`);

  // --- delayed ---
  M('hourglass', c => `
    <path d="M34 2 H66 M34 48 H66" stroke="#8a7a5a" stroke-width="3" stroke-linecap="round"/>
    <path d="M37 4 Q37 18 50 25 Q37 32 37 46 H63 Q63 32 50 25 Q63 18 63 4Z" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="2"/>
    <path d="M42 10 H58 Q56 18 50 22 Q44 18 42 10Z" fill="${c}"/>
    <path d="M50 25 V40" stroke="${c}" stroke-width="1.2" class="art-flicker"/>
    <path d="M42 44 Q50 34 58 44Z" fill="${c}"/>`);

  M('fuse', c => `
    <circle cx="40" cy="30" r="15" fill="#26232e" stroke="${c}" stroke-width="2"/>
    <circle cx="35" cy="25" r="4" fill="#fff" opacity=".15"/>
    <path d="M50 18 Q60 6 72 10" stroke="#8a7a5a" stroke-width="2" fill="none" stroke-dasharray="3 2"/>
    <g class="art-flicker">${star(74, 9, 8, 3, 6, c)}<circle cx="74" cy="9" r="2.5" fill="${W}"/></g>`);

  M('keg', c => `
    <rect x="30" y="8" width="40" height="38" rx="9" fill="#5a3a2a" stroke="#2a1a10" stroke-width="2"/>
    <path d="M30 18 H70 M30 36 H70" stroke="#8a7a5a" stroke-width="3"/>
    <path d="M50 8 Q54 -2 62 -4" stroke="#8a7a5a" stroke-width="2" fill="none"/>
    <g class="art-flicker">${star(63, -4, 7, 3, 6, c)}</g>
    <text x="50" y="31" font-size="10" text-anchor="middle" fill="${c}" font-weight="bold">!</text>`);

  M('moon', c => `
    <circle cx="50" cy="25" r="22" fill="${c}" opacity=".1"/>
    <path d="M58 6 A20 20 0 1 0 64 40 A16 16 0 1 1 58 6Z" fill="${c}"/>
    <g class="art-flicker">${star(76, 12, 4, 1.5, 4, W)}</g><g class="art-flicker2">${star(24, 36, 3, 1.2, 4, W)}${star(82, 34, 2.5, 1, 4, c)}</g>`);

  M('echo', c => `
    <circle cx="50" cy="25" r="8" fill="${c}"/>
    <circle cx="50" cy="25" r="16" fill="none" stroke="${c}" stroke-width="2" opacity=".7"/>
    <circle cx="50" cy="25" r="25" fill="none" stroke="${c}" stroke-width="1.6" opacity=".4"/>
    <circle cx="50" cy="25" r="34" fill="none" stroke="${c}" stroke-width="1.2" opacity=".2" class="art-flicker"/>
    <circle cx="50" cy="25" r="3" fill="${W}"/>`);

  M('seed', c => `
    <path d="M30 46 H70" stroke="#6a5a40" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="40" rx="9" ry="6" fill="#5a3a2a"/>
    <path d="M50 36 Q48 22 50 14" stroke="#6fa04a" stroke-width="2" fill="none"/>
    <path d="M50 24 Q40 18 38 10 Q48 12 50 22Z M50 20 Q60 12 64 6 Q52 8 50 18Z" fill="#6fa04a"/>
    <g class="art-flicker"><path d="M50 4 q5 6 0 10 q-5 -4 0 -10z" fill="${c}"/></g>`);

  // --- random ---
  M('dice', c => `
    <g transform="rotate(-14 36 26)"><rect x="20" y="10" width="32" height="32" rx="6" fill="#26232e" stroke="${c}" stroke-width="2"/>
      ${[[28, 18], [44, 34], [36, 26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${c}"/>`).join('')}</g>
    <g transform="rotate(16 68 28)"><rect x="56" y="16" width="26" height="26" rx="5" fill="#26232e" stroke="${c}" stroke-width="1.8"/>
      ${[[62, 22], [76, 22], [62, 36], [76, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="${W}"/>`).join('')}</g>`);

  M('coin', c => `
    <ellipse cx="50" cy="26" rx="20" ry="20" fill="${c}" stroke="#8a6a20" stroke-width="2"/>
    <ellipse cx="50" cy="26" rx="14" ry="14" fill="none" stroke="#fff3d6" stroke-width="1.2" opacity=".6"/>
    <path d="M50 16 q6 8 0 16 q-6 -8 0 -16z" fill="#8a6a20"/>
    <path d="M22 10 l-6 -4 M78 10 l6 -4 M50 2 v-6" stroke="${c}" stroke-width="1.6" stroke-linecap="round" class="art-flicker"/>`);

  M('bag', c => `
    <path d="M32 18 Q24 46 50 46 Q76 46 68 18Z" fill="#5a4a32" stroke="${c}" stroke-width="2"/>
    <path d="M34 18 Q50 10 66 18" stroke="${c}" stroke-width="3" fill="none"/>
    <g transform="rotate(-18 40 10)"><rect x="34" y="-2" width="12" height="17" rx="2" fill="#211e29" stroke="#c0463e" stroke-width="1.4"/></g>
    <g transform="rotate(14 60 8)"><rect x="54" y="-4" width="12" height="17" rx="2" fill="#211e29" stroke="#4a7fc5" stroke-width="1.4"/></g>
    <text x="50" y="38" font-size="12" text-anchor="middle" fill="${c}" font-weight="bold">?</text>`);

  M('moth', c => `
    <g class="art-float">
    <path d="M50 24 Q30 2 16 12 Q12 28 48 28Z M50 24 Q70 2 84 12 Q88 28 52 28Z" fill="${c}" fill-opacity=".7" stroke="${c}" stroke-width="1.2"/>
    <path d="M48 28 Q30 30 26 42 Q40 44 49 31Z M52 28 Q70 30 74 42 Q60 44 51 31Z" fill="${c}" fill-opacity=".45"/>
    <circle cx="30" cy="16" r="3" fill="#26232e"/><circle cx="70" cy="16" r="3" fill="#26232e"/>
    <ellipse cx="50" cy="28" rx="2.6" ry="10" fill="#4a4050"/>
    <path d="M49 18 Q44 8 40 6 M51 18 Q56 8 60 6" stroke="#4a4050" stroke-width="1" fill="none"/></g>`);

  M('vial', c => `
    <path d="M44 2 H56 V14 Q70 22 66 38 Q62 48 50 48 Q38 48 34 38 Q30 22 44 14Z" fill="#26232e" stroke="#c9c0d8" stroke-width="1.6"/>
    <path d="M36 32 Q50 26 64 32 Q64 46 50 46 Q36 46 36 32Z" fill="${c}"/>
    <g class="art-float"><circle cx="46" cy="22" r="2" fill="${c}" opacity=".7"/><circle cx="55" cy="16" r="1.4" fill="${c}" opacity=".6"/></g>
    <rect x="42" y="-2" width="16" height="5" rx="1.5" fill="#8a6a40"/>`);

  M('eye', c => `
    <path d="M10 25 Q50 -8 90 25 Q50 58 10 25Z" fill="#26232e" stroke="${c}" stroke-width="2"/>
    <circle cx="50" cy="25" r="12" fill="${c}"/><circle cx="50" cy="25" r="5" fill="#0d0c10"/><circle cx="46" cy="21" r="2" fill="${W}"/>
    <path d="M50 -6 V2 M24 0 L28 6 M76 0 L72 6" stroke="${c}" stroke-width="1.5" stroke-linecap="round" class="art-flicker"/>`);

  // --- status / tricks ---
  M('droplet', c => `
    <path d="M50 2 Q70 26 66 36 Q62 48 50 48 Q38 48 34 36 Q30 26 50 2Z" fill="${c}" fill-opacity=".85" stroke="#1a2a10" stroke-width="1.5"/>
    <path d="M42 30 Q42 40 50 42" stroke="${W}" stroke-width="2" fill="none" opacity=".6"/>
    <g class="art-float"><circle cx="24" cy="38" r="4" fill="${c}" opacity=".6"/><circle cx="78" cy="34" r="3" fill="${c}" opacity=".5"/><circle cx="72" cy="12" r="2" fill="${c}" opacity=".5"/></g>`);

  M('crack', c => `
    <rect x="22" y="2" width="56" height="44" rx="4" fill="${c}" fill-opacity=".1" stroke="${c}" stroke-width="1.6"/>
    <path d="M50 2 L46 16 L56 22 L44 32 L52 46 M46 16 L30 12 M56 22 L76 18 M44 32 L26 38" stroke="${c}" stroke-width="2" fill="none" stroke-linejoin="round"/>
    <path d="M50 2 L46 16 L56 22 L44 32 L52 46" stroke="${W}" stroke-width=".8" fill="none" opacity=".7"/>`);

  M('heart', c => `
    <path class="art-beat" d="M50 46 C24 30 22 10 38 8 C45 7 49 12 50 16 C51 12 55 7 62 8 C78 10 76 30 50 46Z" fill="${c}" fill-opacity=".85" stroke="${W}" stroke-width="1.2"/>
    <path d="M50 18 V34 M42 26 H58" stroke="${W}" stroke-width="3" stroke-linecap="round"/>
    <g class="art-float">${star(22, 18, 3, 1.2, 4, c)}${star(80, 30, 2.5, 1, 4, c)}</g>`);

  M('mirror', c => `
    <ellipse cx="50" cy="24" rx="20" ry="24" fill="${c}" fill-opacity=".15" stroke="#c9b98f" stroke-width="3"/>
    <path d="M38 12 L46 6 M36 22 L52 8" stroke="${W}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    <path d="M50 48 V54" stroke="#c9b98f" stroke-width="4"/>
    <path d="M14 14 L24 20 M86 14 L76 20 M12 32 L24 30 M88 32 L76 30" stroke="${c}" stroke-width="1.6" stroke-linecap="round" class="art-flicker"/>`);

  // --- powers ---
  M('bell', c => `
    <path d="M50 2 V6" stroke="#8a7a5a" stroke-width="2"/>
    <path d="M50 6 Q32 6 32 26 Q32 36 24 40 H76 Q68 36 68 26 Q68 6 50 6Z" fill="${c}" fill-opacity=".8" stroke="#6a5020" stroke-width="1.5"/>
    <circle cx="50" cy="43" r="4" fill="#6a5020"/>
    <path d="M16 18 Q10 26 16 34 M84 18 Q90 26 84 34 M8 12 Q0 26 8 40 M92 12 Q100 26 92 40" stroke="${c}" stroke-width="1.5" fill="none" class="art-flicker"/>`);

  M('gear', c => `
    <g class="art-spin">${star(50, 25, 22, 16, 9, c, 'opacity=".85"')}<circle cx="50" cy="25" r="10" fill="#211e29"/></g>
    <text x="50" y="30" font-size="13" text-anchor="middle" fill="${W}" font-weight="bold">3</text>`);

  M('crown', c => `
    <path d="M20 40 L16 12 L34 26 L50 4 L66 26 L84 12 L80 40Z" fill="${c}" fill-opacity=".8" stroke="#8a6a20" stroke-width="1.6"/>
    <rect x="20" y="38" width="60" height="7" rx="2" fill="${c}" stroke="#8a6a20" stroke-width="1.4"/>
    <circle cx="50" cy="26" r="4" fill="#c0463e"/><circle cx="34" cy="31" r="2.6" fill="#4a7fc5"/><circle cx="66" cy="31" r="2.6" fill="#4a7fc5"/>
    <g class="art-flicker"><path d="M50 -6 q5 6 0 10 q-5 -4 0 -10z" fill="#ff9a3c"/></g>`);
})();
