// ENEMY ART, level 1: The Root Cellar (see ui/enemyArt/enemyArt.js for the rules).
(function () {
  const R = Game.UI.enemyArt.register;

  R('cellar_rat', (c, k) => `${k.shadow(36)}
    <path class="ea-tail" d="M28 100 Q8 96 10 78 Q12 66 4 60" stroke="${k.shade(c, -.3)}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M24 104 Q20 72 52 64 Q82 58 96 78 Q104 92 92 104 Z" fill="${c}" ${k.ol()}/>
    <path d="M40 100 Q44 84 64 80" stroke="${k.shade(c, .25)}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M88 76 Q112 80 114 92 Q104 98 92 96 Z" fill="${k.shade(c, .1)}" ${k.ol()}/>
    <circle cx="113" cy="91" r="2.4" fill="#e88a9a"/>
    <path d="M84 70 Q80 54 92 56 Q96 64 92 74Z" fill="${k.shade(c, .15)}" ${k.ol(1.6)}/><path d="M86 68 Q85 60 90 60" stroke="#e88a9a" stroke-width="2" fill="none"/>
    ${k.slit(99, 84, 3, '#ff5a3a')}
    <path d="M106 96 L104 101 M110 95 L109 100" stroke="#fff3d6" stroke-width="1.6"/>
    <path d="M40 104 L38 112 M56 104 L56 112 M80 104 L82 112" stroke="${k.shade(c, -.35)}" stroke-width="4" stroke-linecap="round"/>`);

  R('mold_heap', (c, k) => `${k.shadow(40)}
    <path d="M16 112 Q10 80 30 66 Q40 40 62 46 Q88 40 96 64 Q114 78 104 112 Z" fill="${c}" ${k.ol()}/>
    <path d="M26 104 Q30 82 44 76 M84 74 Q98 86 96 104" stroke="${k.shade(c, -.25)}" stroke-width="3" fill="none" opacity=".7"/>
    ${[[34, 60, 7], [58, 44, 9], [86, 56, 8], [74, 34, 5], [44, 42, 5]].map(([x, y, r]) => `<g class="ea-limb"><path d="M${x} ${y + r} V${y + r + 8}" stroke="${k.shade(c, .3)}" stroke-width="3"/><ellipse cx="${x}" cy="${y + r}" rx="${r * 1.3}" ry="${r * .8}" fill="${k.shade(c, .35)}" ${k.ol(1.4)}/><circle cx="${x - r * .4}" cy="${y + r * .8}" r="1.4" fill="#fff" opacity=".6"/></g>`).join('')}
    ${k.eye(48, 84, 4, '#e8ff7a')}${k.eye(72, 82, 4, '#e8ff7a')}
    <path d="M50 98 Q60 104 70 98" stroke="${k.LINE}" stroke-width="2" fill="none"/>
    <circle cx="22" cy="40" r="2" fill="${k.shade(c, .4)}" opacity=".6"/><circle cx="100" cy="36" r="2.4" fill="${k.shade(c, .4)}" opacity=".6"/>`);

  R('cave_moth', (c, k) => `${k.shadow(24)}
    <g class="ea-fin"><path d="M58 56 Q20 18 8 40 Q4 66 40 70 Z" fill="${c}" ${k.ol()}/><circle cx="26" cy="46" r="7" fill="${k.shade(c, -.3)}" opacity=".7"/><circle cx="26" cy="46" r="3" fill="#ffd24a"/></g>
    <g class="ea-fin ea-alt"><path d="M62 56 Q100 18 112 40 Q116 66 80 70 Z" fill="${c}" ${k.ol()}/><circle cx="94" cy="46" r="7" fill="${k.shade(c, -.3)}" opacity=".7"/><circle cx="94" cy="46" r="3" fill="#ffd24a"/></g>
    <path d="M44 70 Q30 92 44 96 Q54 86 56 72Z M76 70 Q90 92 76 96 Q66 86 64 72Z" fill="${k.shade(c, .2)}" ${k.ol(1.6)}/>
    <ellipse cx="60" cy="66" rx="9" ry="24" fill="${k.shade(c, -.2)}" ${k.ol()}/>
    <path d="M54 72 H66 M53 80 H67 M55 88 H65" stroke="${k.shade(c, .3)}" stroke-width="1.6"/>
    <path d="M56 44 Q46 26 40 24 M64 44 Q74 26 80 24" stroke="${k.LINE}" stroke-width="1.8" fill="none"/>
    ${k.eye(55, 50, 3.4, '#fff0a0')}${k.eye(65, 50, 3.4, '#fff0a0')}`);

  R('lamp_leech', (c, k) => `${k.shadow(40)}
    <path d="M10 108 Q14 84 34 86 Q46 64 66 74 Q84 58 100 70 Q114 80 108 108 Z" fill="${c}" ${k.ol()}/>
    ${[28, 44, 60, 76, 92].map(x => `<path d="M${x} 108 Q${x - 2} 92 ${x + 4} 80" stroke="${k.shade(c, -.3)}" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
    <ellipse cx="104" cy="80" rx="12" ry="14" fill="${k.shade(c, .15)}" ${k.ol()}/>
    <circle cx="106" cy="82" r="7" fill="${k.LINE}"/>
    <g class="ea-limb">${[0, 60, 120, 180, 240, 300].map(a => `<path d="M106 82 L${(106 + 6 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(82 + 6 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="#fff3d6" stroke-width="1.5"/>`).join('')}</g>
    ${k.eye(94, 68, 2.6, '#ff9a5a')}${k.eye(100, 64, 2.6, '#ff9a5a')}
    <circle cx="40" cy="96" r="5" fill="#ffd35a" opacity=".5"/><circle cx="60" cy="92" r="4" fill="#ffd35a" opacity=".4"/>`);

  R('root_warden', (c, k) => `${k.shadow(46)}
    <path d="M20 114 Q26 96 22 80 L40 84 Q38 100 44 114 Z M100 114 Q94 96 98 80 L80 84 Q82 100 76 114 Z" fill="${k.shade(c, -.25)}" ${k.ol()}/>
    <path d="M30 88 Q24 40 44 22 Q60 10 76 22 Q96 40 90 88 Q60 100 30 88 Z" fill="${c}" ${k.ol()}/>
    <path d="M44 30 Q50 60 42 86 M60 22 V90 M76 30 Q70 60 78 86" stroke="${k.shade(c, -.3)}" stroke-width="2.4" fill="none"/>
    <g class="ea-limb"><path d="M32 52 Q8 48 6 30 Q4 18 14 12 M10 26 Q2 26 0 20" stroke="${k.shade(c, -.15)}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g class="ea-limb ea-alt"><path d="M88 52 Q112 48 114 30 Q116 18 106 12 M110 26 Q118 26 120 20" stroke="${k.shade(c, -.15)}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <path d="M38 22 Q44 6 52 14 Q58 2 64 12 Q72 2 76 16 Q84 8 84 24" fill="#5f8a3a" ${k.ol(1.6)}/>
    <path d="M44 46 Q60 38 76 46 Q74 58 60 60 Q46 58 44 46Z" fill="${k.LINE}"/>
    ${k.eye(52, 50, 3.6, '#9aff6a')}${k.eye(68, 50, 3.6, '#9aff6a')}
    <path d="M50 70 L54 76 L58 70 L62 76 L66 70 L70 76" stroke="#d8c89a" stroke-width="2" fill="none"/>`);

  // --- new in the Root Cellar ---
  R('tunnel_mole', (c, k) => `${k.shadow(36)}
    <path d="M20 112 Q14 74 42 62 Q70 52 92 70 Q106 84 100 112 Z" fill="${c}" ${k.ol()}/>
    <path d="M34 104 Q36 84 52 76" stroke="${k.shade(c, .25)}" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M86 66 Q110 70 112 84 Q100 92 88 88 Z" fill="${k.shade(c, .2)}" ${k.ol()}/>
    <ellipse cx="112" cy="83" rx="5" ry="4" fill="#e88aa8" ${k.ol(1.4)}/>
    ${k.eye(92, 74, 2.2, '#2a1a10')}
    <g class="ea-limb"><path d="M30 100 Q12 104 8 112 M30 100 Q16 98 10 104 M30 100 Q20 92 12 94" stroke="#e8d8c0" stroke-width="3" fill="none" stroke-linecap="round"/></g>
    <g class="ea-limb ea-alt"><path d="M90 100 Q108 104 112 112 M90 100 Q104 96 112 100" stroke="#e8d8c0" stroke-width="3" fill="none" stroke-linecap="round"/></g>
    <path d="M40 112 Q60 104 84 112" fill="#5a4030" opacity=".7"/>`);

  R('cellar_spinner', (c, k) => `<path d="M60 0 V40" stroke="#d8d0e8" stroke-width="1.2" opacity=".8"/>${k.shadow(22)}
    ${[-1, 1].map(s => [0, 1, 2, 3].map(i => `<path class="ea-limb ${s > 0 ? 'ea-alt' : ''}" d="M${60 + s * 10} ${58 + i * 5} Q${60 + s * (34 + i * 4)} ${40 + i * 10} ${60 + s * (46 + i * 2)} ${70 + i * 12}" stroke="${k.shade(c, -.35)}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')).join('')}
    <ellipse cx="60" cy="78" rx="20" ry="22" fill="${c}" ${k.ol()}/>
    <path d="M52 70 L60 86 L68 70 M60 86 V94" stroke="#e05a6a" stroke-width="2.4" fill="none"/>
    <circle cx="60" cy="52" r="13" fill="${k.shade(c, -.15)}" ${k.ol()}/>
    ${k.eye(54, 50, 2.6, '#ff4a6a')}${k.eye(66, 50, 2.6, '#ff4a6a')}${k.eye(57, 44, 1.8, '#ff4a6a')}${k.eye(63, 44, 1.8, '#ff4a6a')}
    <path d="M55 60 L54 66 M65 60 L66 66" stroke="#fff3d6" stroke-width="1.8" stroke-linecap="round"/>`);

  R('pilfer_rat', (c, k) => `${k.shadow(30)}
    <path class="ea-tail" d="M34 100 Q14 102 12 86 Q10 74 20 68" stroke="${k.shade(c, -.3)}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <path d="M30 106 Q26 70 54 62 Q76 58 84 76 Q90 96 80 106 Z" fill="${c}" ${k.ol()}/>
    <path d="M36 62 Q34 40 56 40 Q74 40 74 60 Z" fill="${k.shade(c, .1)}" ${k.ol()}/>
    <path d="M40 50 H70" stroke="#3a2a4a" stroke-width="6"/>
    ${k.eye(50, 50, 2.6, '#fff0a0')}${k.eye(62, 50, 2.6, '#fff0a0')}
    <path d="M70 56 Q86 58 88 66 Q80 70 72 66Z" fill="${k.shade(c, .2)}" ${k.ol(1.4)}/><circle cx="88" cy="65" r="2" fill="#e88a9a"/>
    <g class="ea-limb"><path d="M84 84 Q98 78 100 70" stroke="${k.shade(c, -.2)}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M92 68 Q100 52 112 62 Q114 80 98 82 Q88 80 92 68Z" fill="#8a6a3a" ${k.ol(1.6)}/><path d="M96 66 Q102 60 108 66" stroke="#ffd35a" stroke-width="2" fill="none"/>
      <circle cx="104" cy="74" r="3" fill="#ffd35a" ${k.ol(1)}/></g>`);

  R('root_slime', (c, k) => `${k.shadow(40)}
    <path d="M14 112 Q8 72 40 58 Q60 50 80 58 Q112 72 106 112 Z" fill="${c}" fill-opacity=".9" ${k.ol()}/>
    <path d="M24 106 Q26 80 46 70" stroke="#fff" stroke-width="4" fill="none" opacity=".25" stroke-linecap="round"/>
    <path d="M60 52 Q56 36 64 28 Q72 22 70 12 M64 36 Q76 34 82 26" stroke="#6b4a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="96" r="4" fill="${k.shade(c, -.3)}" opacity=".5"/><circle cx="84" cy="100" r="3" fill="${k.shade(c, -.3)}" opacity=".5"/>
    <path d="M60 60 V112" stroke="${k.shade(c, -.25)}" stroke-width="1.6" stroke-dasharray="3 4" opacity=".7"/>
    ${k.eye(46, 80, 4.2, '#fff8c0')}${k.eye(74, 80, 4.2, '#fff8c0')}
    <path d="M52 94 Q60 100 68 94" stroke="${k.LINE}" stroke-width="2" fill="none"/>`);

  R('slimelet', (c, k) => `${k.shadow(30)}
    <path d="M24 112 Q18 74 60 70 Q102 74 96 112 Z" fill="${c}" fill-opacity=".9" ${k.ol(2.4)}/>
    <path d="M34 104 Q36 86 52 80" stroke="#fff" stroke-width="4" fill="none" opacity=".3" stroke-linecap="round"/>
    ${k.eye(48, 92, 5, '#fff8c0')}${k.eye(72, 92, 5, '#fff8c0')}
    <path d="M56 104 Q60 107 64 104" stroke="${k.LINE}" stroke-width="2" fill="none"/>`);

  R('shellback_beetle', (c, k) => `${k.shadow(40)}
    ${[30, 50, 70, 90].map((x, i) => `<path class="ea-limb ${i % 2 ? 'ea-alt' : ''}" d="M${x} 100 L${x + (x < 60 ? -8 : 8)} 113" stroke="${k.LINE}" stroke-width="3.4" stroke-linecap="round"/>`).join('')}
    <path d="M14 100 Q14 50 60 46 Q106 50 106 100 Z" fill="${c}" ${k.ol()}/>
    <path d="M60 46 V100" stroke="${k.LINE}" stroke-width="2"/>
    ${[[34, 66], [86, 66], [40, 86], [80, 86], [60, 60]].map(([x, y]) => `<path d="M${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7} L${x - 7} ${y}Z" fill="${k.shade(c, .25)}" ${k.ol(1.2)}/>`).join('')}
    <path d="M26 64 Q40 52 56 52" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>
    <path d="M44 100 Q60 112 76 100 Z" fill="${k.shade(c, -.4)}" ${k.ol()}/>
    ${k.eye(52, 103, 2.4, '#7af0ff')}${k.eye(68, 103, 2.4, '#7af0ff')}
    <path d="M50 108 Q42 116 36 112 M70 108 Q78 116 84 112" stroke="${k.LINE}" stroke-width="2.4" fill="none"/>`);

  R('thorn_bramble', (c, k) => `${k.shadow(38)}
    <g class="ea-limb"><path d="M30 104 Q10 80 18 54 Q22 40 14 28" stroke="${k.shade(c, -.2)}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
    <g class="ea-limb ea-alt"><path d="M90 104 Q110 80 102 54 Q98 40 106 28" stroke="${k.shade(c, -.2)}" stroke-width="7" fill="none" stroke-linecap="round"/></g>
    <path d="M24 112 Q20 70 60 56 Q100 70 96 112 Z" fill="${c}" ${k.ol()}/>
    ${[[18, 50], [24, 76], [102, 50], [96, 78], [40, 64], [80, 64], [60, 56], [30, 96], [90, 96]].map(([x, y]) => `<path d="M${x - 4} ${y + 2} L${x} ${y - 8} L${x + 4} ${y + 2}Z" fill="#e8d8a0" ${k.ol(1)}/>`).join('')}
    <circle cx="60" cy="50" r="7" fill="#e85a7a" ${k.ol(1.4)}/><circle cx="60" cy="50" r="2.4" fill="#ffd35a"/>
    ${k.slit(48, 84, 3.6, '#ffe04a')}${k.slit(72, 84, 3.6, '#ffe04a')}
    <path d="M48 98 L54 94 L60 98 L66 94 L72 98" stroke="${k.LINE}" stroke-width="2" fill="none"/>`);
})();
