// ENEMY ART, level 2: The Drowned Halls (see ui/enemyArt/enemyArt.js for the rules).
(function () {
  const R = Game.UI.enemyArt.register;
  const claw = (x, y, s, c, k, alt) => `<g class="ea-limb ${alt ? 'ea-alt' : ''}"><path d="M${x} ${y} Q${x + s * 6} ${y - 18} ${x + s * 4} ${y - 30}" stroke="${k.shade(c, -.2)}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M${x + s * 4} ${y - 30} Q${x + s * 18} ${y - 44} ${x + s * 22} ${y - 28} L${x + s * 10} ${y - 30} Q${x + s * 16} ${y - 22} ${x + s * 4} ${y - 18}Z" fill="${c}" ${k.ol(1.8)}/></g>`;

  R('silt_crab', (c, k) => `${k.shadow(42)}
    ${[24, 36, 84, 96].map(x => `<path d="M${x} 96 L${x + (x < 60 ? -8 : 8)} 112" stroke="${k.shade(c, -.3)}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    ${claw(26, 84, -1, c, k)}${claw(94, 84, 1, c, k, true)}
    <path d="M18 96 Q20 64 60 62 Q100 64 102 96 Q60 106 18 96Z" fill="${c}" ${k.ol()}/>
    <path d="M30 80 Q60 70 90 80" stroke="${k.shade(c, .3)}" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M50 64 V54 M70 64 V54" stroke="${k.LINE}" stroke-width="2.4"/>${k.eye(50, 52, 3.6, '#ffe08a')}${k.eye(70, 52, 3.6, '#ffe08a')}
    <path d="M52 88 Q60 92 68 88" stroke="${k.LINE}" stroke-width="2" fill="none"/>`);

  R('pale_eel', (c, k) => `${k.shadow(44)}
    <path class="ea-tail" d="M14 104 Q4 80 22 72 Q40 66 46 84 Q52 100 72 96 Q96 90 98 64 Q100 46 86 40" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path class="ea-tail" d="M14 104 Q4 80 22 72 Q40 66 46 84 Q52 100 72 96 Q96 90 98 64 Q100 46 86 40" stroke="${k.shade(c, .3)}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M78 26 Q100 20 108 34 Q104 50 84 50 Q72 44 78 26Z" fill="${c}" ${k.ol()}/>
    <path d="M98 44 L104 48 M94 46 L98 50" stroke="#fff3d6" stroke-width="1.6"/>
    <path d="M80 26 Q76 14 86 10 Q86 20 90 24" fill="${k.shade(c, -.15)}" ${k.ol(1.4)}/>
    ${k.slit(94, 32, 3.4, '#bfe8ff')}`);

  R('drowned_acolyte', (c, k) => `${k.shadow(28)}
    <path d="M34 114 Q30 70 40 46 Q50 30 60 30 Q70 30 80 46 Q90 70 86 114 Z" fill="${c}" ${k.ol()}/>
    <path d="M44 114 L48 80 M60 114 V76 M76 114 L72 80" stroke="${k.shade(c, -.3)}" stroke-width="2" opacity=".8"/>
    <path d="M42 50 Q60 12 78 50 Q76 62 60 64 Q44 62 42 50Z" fill="${k.shade(c, -.35)}" ${k.ol()}/>
    <ellipse cx="60" cy="52" rx="10" ry="9" fill="${k.LINE}"/>${k.eye(56, 52, 2.4, '#7affe0')}${k.eye(64, 52, 2.4, '#7affe0')}
    <g class="ea-limb"><path d="M40 70 Q24 66 22 50" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="22" cy="44" r="6" fill="#7affe0" opacity=".7"/><circle cx="22" cy="44" r="10" fill="#7affe0" opacity=".2"/></g>
    <path d="M50 92 Q60 98 70 92 M48 100 Q60 106 72 100" stroke="#5a8a7a" stroke-width="1.6" fill="none" opacity=".7"/>`);

  R('barnacle_mass', (c, k) => `${k.shadow(44)}
    <path d="M12 112 Q8 70 34 58 Q50 36 74 46 Q104 50 108 80 Q112 100 106 112 Z" fill="${c}" ${k.ol()}/>
    ${[[30, 74, 8], [52, 58, 9], [78, 60, 8], [92, 84, 7], [42, 94, 7], [70, 90, 9], [24, 100, 5]].map(([x, y, r]) => `<path d="M${x - r} ${y + r * .6} L${x - r * .5} ${y - r} L${x + r * .5} ${y - r} L${x + r} ${y + r * .6}Z" fill="${k.shade(c, .35)}" ${k.ol(1.4)}/><ellipse cx="${x}" cy="${y - r * .9}" rx="${r * .45}" ry="${r * .25}" fill="${k.LINE}"/>`).join('')}
    ${k.eye(52, 80, 3.8, '#ffb07a')}${k.eye(70, 76, 3.2, '#ffb07a')}`);

  R('tide_bell', (c, k) => `${k.shadow(44)}
    <path d="M60 4 V14" stroke="${k.LINE}" stroke-width="3"/><circle cx="60" cy="8" r="5" fill="none" stroke="${k.shade(c, .3)}" stroke-width="2.4"/>
    <path d="M24 100 Q26 50 40 30 Q50 16 60 16 Q70 16 80 30 Q94 50 96 100 Q104 104 100 108 H20 Q16 104 24 100Z" fill="${c}" ${k.ol()}/>
    <path d="M34 60 Q60 50 86 60 M30 80 Q60 70 90 80" stroke="${k.shade(c, .3)}" stroke-width="2.4" fill="none" opacity=".6"/>
    <path d="M22 104 H98" stroke="${k.shade(c, -.3)}" stroke-width="4"/>
    <g class="ea-tail"><path d="M60 100 V112" stroke="${k.LINE}" stroke-width="3"/><circle cx="60" cy="114" r="5" fill="${k.shade(c, -.2)}" ${k.ol(1.6)}/></g>
    <path d="M44 38 Q60 30 76 38 Q74 50 60 52 Q46 50 44 38Z" fill="${k.LINE}"/>${k.eye(53, 42, 3.4, '#9ae0ff')}${k.eye(67, 42, 3.4, '#9ae0ff')}
    <path d="M14 70 Q8 80 14 90 M106 70 Q112 80 106 90" stroke="#9ae0ff" stroke-width="2" fill="none" opacity=".6"/>`);

  // --- new in the Drowned Halls ---
  R('silt_burrower', (c, k) => `${k.shadow(40)}
    <path d="M16 112 Q10 78 34 66 Q60 54 86 64 Q110 76 104 112 Z" fill="${c}" ${k.ol()}/>
    ${[30, 44, 58, 72, 86].map(x => `<path d="M${x} 66 Q${x + 4} 88 ${x} 112" stroke="${k.shade(c, -.25)}" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
    <path d="M86 62 Q110 52 116 64 Q112 78 96 80Z" fill="${k.shade(c, .2)}" ${k.ol()}/>
    <path d="M108 60 L116 54 M110 66 L118 64 M108 72 L116 76" stroke="${k.LINE}" stroke-width="2.4" stroke-linecap="round"/>
    ${k.eye(96, 64, 2.6, '#ffe08a')}
    <g class="ea-limb"><path d="M30 104 Q14 106 10 114 M30 104 Q18 100 12 104" stroke="#d8c8a0" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
    <path d="M14 112 Q30 102 50 112 Q70 104 104 112" fill="#5a5040" opacity=".6"/>`);

  R('magpie_crab', (c, k) => `${k.shadow(40)}
    ${[26, 38, 82, 94].map(x => `<path d="M${x} 98 L${x + (x < 60 ? -8 : 8)} 112" stroke="${k.shade(c, -.3)}" stroke-width="4" stroke-linecap="round"/>`).join('')}
    ${claw(28, 86, -1, c, k)}
    <g class="ea-limb ea-alt"><path d="M92 86 Q100 70 100 58" stroke="${k.shade(c, -.2)}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M92 58 Q100 40 112 50 Q112 62 100 64Z" fill="${c}" ${k.ol(1.8)}/><circle cx="108" cy="48" r="6" fill="#ffd35a" ${k.ol(1.4)}/><path d="M105 47 L111 47" stroke="#a07a20" stroke-width="1.4"/></g>
    <path d="M20 98 Q22 66 60 64 Q98 66 100 98 Q60 108 20 98Z" fill="${c}" ${k.ol()}/>
    <path d="M28 76 Q44 66 60 68 L56 86 Q40 84 28 76Z" fill="#f0f0f8" opacity=".85"/>
    <path d="M60 66 Q78 64 92 76 L64 86Z" fill="${k.LINE}" opacity=".6"/>
    <path d="M50 66 V56 M70 66 V56" stroke="${k.LINE}" stroke-width="2.4"/>${k.eye(50, 53, 3.4, '#9affff')}${k.eye(70, 53, 3.4, '#9affff')}`);

  R('bloated_drowner', (c, k) => `${k.shadow(44)}
    <circle cx="60" cy="70" r="40" fill="${c}" ${k.ol()}/>
    <path d="M30 50 Q40 36 56 34" stroke="#fff" stroke-width="5" fill="none" opacity=".25" stroke-linecap="round"/>
    ${[[36, 82], [84, 60], [76, 92], [44, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${k.shade(c, .3)}" ${k.ol(1.2)}/>`).join('')}
    <path d="M60 30 V110" stroke="${k.shade(c, -.3)}" stroke-width="1.6" stroke-dasharray="4 5" opacity=".7"/>
    <g class="ea-limb"><path d="M24 90 Q10 100 14 112" stroke="${k.shade(c, -.2)}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <g class="ea-limb ea-alt"><path d="M96 90 Q110 100 106 112" stroke="${k.shade(c, -.2)}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    ${k.eye(48, 64, 5, '#e8fff0')}${k.eye(72, 64, 4, '#e8fff0')}
    <path d="M44 84 Q60 94 76 84 Q60 88 44 84Z" fill="${k.LINE}"/>`);

  R('drowner_spawn', (c, k) => `${k.shadow(28)}
    <circle cx="60" cy="86" r="26" fill="${c}" ${k.ol(2.4)}/>
    <path d="M42 76 Q48 66 58 64" stroke="#fff" stroke-width="4" fill="none" opacity=".3" stroke-linecap="round"/>
    ${k.eye(52, 84, 4.4, '#e8fff0')}${k.eye(70, 84, 3.6, '#e8fff0')}
    <path d="M52 98 Q60 102 68 98" stroke="${k.LINE}" stroke-width="2" fill="none"/>`);

  R('coral_knight', (c, k) => `${k.shadow(36)}
    <path d="M40 114 L44 90 H56 L56 114Z M64 114 L64 90 H76 L80 114Z" fill="${k.shade(c, -.3)}" ${k.ol()}/>
    <path d="M30 92 Q26 52 44 44 H76 Q94 52 90 92 Z" fill="${c}" ${k.ol()}/>
    <path d="M60 44 V92 M36 66 H84" stroke="${k.shade(c, -.3)}" stroke-width="2" opacity=".8"/>
    ${[[40, 56], [80, 56], [46, 80], [74, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${k.shade(c, .35)}"/>`).join('')}
    <path d="M42 44 Q38 20 60 16 Q82 20 78 44Z" fill="${k.shade(c, .1)}" ${k.ol()}/>
    <path d="M48 32 H72" stroke="${k.LINE}" stroke-width="5"/>${k.eye(54, 32, 2.4, '#ffe0c0')}${k.eye(66, 32, 2.4, '#ffe0c0')}
    <path d="M52 16 Q46 4 40 6 M60 16 V2 M68 16 Q74 4 80 6 M44 8 L40 2 M76 8 L80 2" stroke="${k.shade(c, .2)}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="ea-limb"><path d="M28 60 Q14 68 16 86" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M10 40 L14 100" stroke="#d8d0c0" stroke-width="3"/><path d="M6 44 L14 30 L18 44Z" fill="#d8d0c0" ${k.ol(1.2)}/></g>
    <g class="ea-limb ea-alt"><path d="M92 60 Q104 70 100 84" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M90 72 Q108 66 114 80 Q112 100 98 104 Q86 96 90 72Z" fill="${k.shade(c, .2)}" ${k.ol()}/></g>`);

  R('lantern_siphon', (c, k) => `${k.shadow(26)}
    <path d="M24 60 Q24 22 60 20 Q96 22 96 60 Q86 66 76 60 Q68 68 60 60 Q52 68 44 60 Q34 66 24 60Z" fill="${c}" fill-opacity=".85" ${k.ol()}/>
    <path d="M36 40 Q44 30 56 28" stroke="#fff" stroke-width="4" fill="none" opacity=".3" stroke-linecap="round"/>
    ${[32, 46, 60, 74, 88].map((x, i) => `<path class="ea-tail ${i % 2 ? 'ea-alt' : ''}" d="M${x} 62 Q${x + (i % 2 ? 6 : -6)} 80 ${x} 96 Q${x - 4} 104 ${x + 2} 110" stroke="${k.shade(c, .2)}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    <circle cx="60" cy="44" r="8" fill="#ffd35a" opacity=".85"/><circle cx="60" cy="44" r="14" fill="#ffd35a" opacity=".2"/>
    ${k.eye(46, 48, 3, '#fff')}${k.eye(74, 48, 3, '#fff')}`);

  R('tide_caller', (c, k) => `${k.shadow(28)}
    <path d="M36 114 Q34 72 44 50 Q52 38 60 38 Q68 38 76 50 Q86 72 84 114 Z" fill="${c}" ${k.ol()}/>
    <path d="M40 112 Q50 100 60 112 Q70 100 80 112" stroke="${k.shade(c, .35)}" stroke-width="2" fill="none"/>
    <path d="M60 46 Q48 46 46 30 Q52 14 60 12 Q68 14 74 30 Q72 46 60 46Z" fill="${k.shade(c, .15)}" ${k.ol()}/>
    <path d="M48 20 Q40 6 34 8 M72 20 Q80 6 86 8" stroke="${k.shade(c, -.2)}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${k.slit(54, 30, 3, '#fff0a0')}${k.slit(66, 30, 3, '#fff0a0')}
    <g class="ea-limb"><path d="M42 64 Q22 60 18 44" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M8 30 Q18 22 26 30 Q24 40 18 42 Q10 40 8 30Z" fill="#f0e8d8" ${k.ol(1.6)}/><path d="M12 32 Q18 28 22 32" stroke="#c0a888" stroke-width="1.2" fill="none"/></g>
    <path d="M90 30 Q100 40 92 50 M100 24 Q114 40 102 56" stroke="#9ae0ff" stroke-width="2" fill="none" opacity=".7"/>`);

  R('tide_minnow', (c, k) => `${k.shadow(24)}
    <path class="ea-tail" d="M30 84 L14 72 L16 98Z" fill="${k.shade(c, -.15)}" ${k.ol(2)}/>
    <path d="M28 84 Q50 62 80 70 Q100 78 98 86 Q96 94 80 100 Q50 106 28 84Z" fill="${c}" ${k.ol(2.4)}/>
    <path d="M56 70 Q60 60 68 64" fill="${k.shade(c, -.1)}" ${k.ol(1.4)}/>
    <path d="M40 84 Q60 78 84 86" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>
    ${k.eye(84, 82, 4, '#fff8c0')}<path d="M92 92 L98 90" stroke="${k.LINE}" stroke-width="2"/>`);

  R('kelp_strangler', (c, k) => `${k.shadow(38)}
    ${[22, 40, 80, 98].map((x, i) => `<path class="ea-limb ${i % 2 ? 'ea-alt' : ''}" d="M${x} 112 Q${x + (i < 2 ? -10 : 10)} 80 ${x + (i < 2 ? 4 : -4)} 50 Q${x + (i < 2 ? -6 : 6)} 30 ${x} 14" stroke="${k.shade(c, i % 2 ? .1 : -.15)}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M30 112 Q24 64 60 50 Q96 64 90 112 Z" fill="${c}" ${k.ol()}/>
    ${[[42, 76], [76, 72], [56, 96], [86, 96], [34, 98]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${k.shade(c, .3)}" transform="rotate(-30 ${x} ${y})"/>`).join('')}
    ${k.eye(50, 72, 3.6, '#e0ff7a')}${k.eye(70, 72, 3.6, '#e0ff7a')}
    <path d="M48 86 Q60 80 72 86 Q60 94 48 86Z" fill="${k.LINE}"/>`);
})();
