// ENEMY ART, level 3: The Ember Vault (see ui/enemyArt/enemyArt.js for the rules).
(function () {
  const R = Game.UI.enemyArt.register;
  const flame = (x, y, s, col, cls = 'ea-tail') => `<path class="${cls}" d="M${x} ${y} Q${x - 8 * s} ${y - 10 * s} ${x - 2 * s} ${y - 22 * s} Q${x} ${y - 14 * s} ${x + 4 * s} ${y - 26 * s} Q${x + 10 * s} ${y - 12 * s} ${x} ${y}Z" fill="${col}"/>`;

  R('cinder_imp', (c, k) => `${k.shadow(26)}
    <path d="M46 114 L48 96 M74 114 L72 96" stroke="${k.shade(c, -.35)}" stroke-width="5" stroke-linecap="round"/>
    <g class="ea-fin"><path d="M42 66 Q14 50 10 70 Q20 72 24 82 Q34 74 44 78Z" fill="${k.shade(c, -.25)}" ${k.ol(1.6)}/></g>
    <g class="ea-fin ea-alt"><path d="M78 66 Q106 50 110 70 Q100 72 96 82 Q86 74 76 78Z" fill="${k.shade(c, -.25)}" ${k.ol(1.6)}/></g>
    <path d="M40 98 Q36 62 60 58 Q84 62 80 98 Z" fill="${c}" ${k.ol()}/>
    <circle cx="60" cy="48" r="17" fill="${c}" ${k.ol()}/>
    <path d="M46 36 Q40 20 34 18 Q42 22 48 32Z M74 36 Q80 20 86 18 Q78 22 72 32Z" fill="${k.shade(c, -.4)}" ${k.ol(1.4)}/>
    ${k.slit(53, 46, 3.4, '#ffe04a')}${k.slit(67, 46, 3.4, '#ffe04a')}
    <path d="M52 56 Q60 62 68 56" stroke="${k.LINE}" stroke-width="2" fill="none"/><path d="M55 57 L56 60 M65 57 L64 60" stroke="#fff3d6" stroke-width="1.4"/>
    ${flame(60, 80, .7, '#ffb04a', 'ea-tail')}`);

  R('slag_golem', (c, k) => `${k.shadow(44)}
    <path d="M32 114 L36 92 H52 L50 114Z M70 114 L68 92 H84 L88 114Z" fill="${k.shade(c, -.25)}" ${k.ol()}/>
    <path d="M22 94 L18 56 L36 36 H84 L102 56 L98 94 Z" fill="${c}" ${k.ol()}/>
    <path d="M36 50 L50 64 L44 82 M84 46 L72 62 L80 80 M58 40 L62 56" stroke="#ff8a3a" stroke-width="2.4" fill="none"/>
    <path d="M44 22 H76 L82 38 H38Z" fill="${k.shade(c, .1)}" ${k.ol()}/>
    <path d="M50 30 H70" stroke="${k.LINE}" stroke-width="5"/>${k.eye(54, 30, 2.4, '#ff8a3a')}${k.eye(66, 30, 2.4, '#ff8a3a')}
    <g class="ea-limb"><path d="M20 58 L6 88 L16 94 L28 70Z" fill="${k.shade(c, -.1)}" ${k.ol()}/></g>
    <g class="ea-limb ea-alt"><path d="M100 58 L114 88 L104 94 L92 70Z" fill="${k.shade(c, -.1)}" ${k.ol()}/></g>`);

  R('ash_hound', (c, k) => `${k.shadow(40)}
    <path class="ea-tail" d="M22 78 Q6 66 10 50 Q14 64 26 70" fill="${k.shade(c, -.2)}" ${k.ol(1.6)}/>
    <path d="M30 114 L32 92 M46 114 L46 94 M78 114 L78 94 M92 114 L90 92" stroke="${k.shade(c, -.35)}" stroke-width="5" stroke-linecap="round"/>
    <path d="M22 94 Q20 70 44 66 H80 Q94 66 96 84 Q92 98 78 98 H40 Q24 100 22 94Z" fill="${c}" ${k.ol()}/>
    <path d="M30 70 L36 60 L42 70 L48 60 L54 70" fill="${k.shade(c, -.3)}"/>
    <path d="M84 70 Q90 46 106 52 Q118 60 112 74 Q104 82 92 80Z" fill="${c}" ${k.ol()}/>
    <path d="M90 54 L92 40 L100 52Z" fill="${k.shade(c, -.3)}" ${k.ol(1.4)}/>
    ${k.slit(102, 60, 3, '#ffb04a')}
    <path d="M100 74 L104 70 L108 74 L112 70" stroke="#fff3d6" stroke-width="1.6" fill="none"/>
    <circle cx="40" cy="58" r="2" fill="#ffb04a" opacity=".7"/><circle cx="60" cy="54" r="1.6" fill="#ffb04a" opacity=".6"/>`);

  R('forge_wisp', (c, k) => `${k.shadow(20)}
    <path d="M60 104 Q30 96 32 68 Q34 46 48 34 Q48 50 56 52 Q52 30 66 14 Q66 36 78 42 Q90 56 88 76 Q86 98 60 104Z" fill="${c}" ${k.ol()}/>
    <path d="M60 96 Q42 90 44 72 Q46 60 54 54 Q56 66 64 66 Q62 52 70 44 Q80 58 78 74 Q76 92 60 96Z" fill="#ffd35a"/>
    <path d="M60 88 Q52 84 52 76 Q56 70 62 72 Q68 70 68 78 Q66 86 60 88Z" fill="#fff8d8"/>
    ${k.eye(54, 74, 2.6, '#7a2a10')}${k.eye(66, 74, 2.6, '#7a2a10')}
    <circle class="ea-tail" cx="30" cy="40" r="2.4" fill="#ffd35a"/><circle class="ea-tail ea-alt" cx="92" cy="34" r="2" fill="#ffd35a"/>`);

  R('vault_keeper', (c, k) => `${k.shadow(46)}
    <path d="M30 114 L34 88 H52 L52 114Z M68 114 L68 88 H86 L90 114Z" fill="${k.shade(c, -.3)}" ${k.ol()}/>
    <path d="M20 90 Q16 48 36 36 H84 Q104 48 100 90 Z" fill="${c}" ${k.ol()}/>
    <rect x="44" y="52" width="32" height="28" rx="3" fill="${k.shade(c, -.35)}" ${k.ol()}/>
    <circle cx="60" cy="66" r="8" fill="none" stroke="#ffd35a" stroke-width="2.6"/><path d="M60 58 V74 M52 66 H68" stroke="#ffd35a" stroke-width="1.6"/>
    <path d="M38 36 Q36 12 60 8 Q84 12 82 36Z" fill="${k.shade(c, .15)}" ${k.ol()}/>
    <path d="M40 14 L36 2 L48 10 L60 0 L72 10 L84 2 L80 14" fill="#ffd35a" ${k.ol(1.4)}/>
    <path d="M44 24 Q60 16 76 24 Q74 32 60 34 Q46 32 44 24Z" fill="${k.LINE}"/>${k.eye(53, 26, 3, '#ffb04a')}${k.eye(67, 26, 3, '#ffb04a')}
    <g class="ea-limb"><path d="M20 50 Q4 64 8 90" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="8" cy="96" r="9" fill="${k.shade(c, -.2)}" ${k.ol()}/></g>
    <g class="ea-limb ea-alt"><path d="M100 50 Q116 64 112 90" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M104 88 L120 84 L118 100 L104 102Z" fill="#c0b8a8" ${k.ol(1.6)}/></g>`);

  // --- new in the Ember Vault ---
  R('ember_mole', (c, k) => `${k.shadow(40)}
    <path d="M16 112 Q10 72 40 60 Q68 50 92 66 Q108 80 102 112 Z" fill="${c}" ${k.ol()}/>
    <path d="M30 70 L36 84 L28 96 M60 58 L64 74 L58 90 M84 70 L80 86" stroke="#ffd35a" stroke-width="2.2" fill="none" opacity=".85"/>
    <path d="M88 62 Q112 64 116 80 Q104 90 90 86Z" fill="${k.shade(c, .15)}" ${k.ol()}/>
    <ellipse cx="115" cy="79" rx="4.4" ry="4" fill="#ff9a5a" ${k.ol(1.4)}/>
    ${k.eye(96, 70, 2.4, '#ffe04a')}
    <g class="ea-limb"><path d="M28 100 Q10 104 6 112 M28 100 Q14 96 8 100" stroke="#f0d0a0" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
    <g class="ea-limb ea-alt"><path d="M92 100 Q110 104 114 112 M92 100 Q106 96 114 98" stroke="#f0d0a0" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
    ${flame(44, 62, .6, '#ffb04a')}${flame(70, 56, .5, '#ffd35a', 'ea-tail ea-alt')}`);

  R('powder_tick', (c, k) => `${k.shadow(28)}
    ${[34, 46, 74, 86].map((x, i) => `<path class="ea-limb ${i % 2 ? 'ea-alt' : ''}" d="M${x} 96 L${x + (x < 60 ? -10 : 10)} 112" stroke="${k.LINE}" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <circle cx="60" cy="82" r="26" fill="${c}" ${k.ol()}/>
    <path d="M40 72 Q48 60 62 58" stroke="#fff" stroke-width="3" fill="none" opacity=".25" stroke-linecap="round"/>
    <path d="M44 82 H76" stroke="#c0a070" stroke-width="2.4" stroke-dasharray="4 3"/>
    <path d="M70 58 Q76 40 90 36" stroke="#c0a070" stroke-width="2.4" fill="none"/>
    <g class="ea-tail"><circle cx="92" cy="34" r="4" fill="#ffd35a"/><circle cx="92" cy="34" r="8" fill="#ff8a3a" opacity=".35"/></g>
    ${k.eye(52, 92, 3, '#ff6a3a')}${k.eye(68, 92, 3, '#ff6a3a')}`);

  R('magma_ooze', (c, k) => `${k.shadow(44)}
    <path d="M12 112 Q6 70 36 56 Q60 44 84 56 Q114 70 108 112 Z" fill="${c}" ${k.ol()}/>
    <path d="M26 100 Q32 74 54 64" stroke="#ffd35a" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M20 100 Q40 92 60 100 Q80 92 100 100" stroke="${k.shade(c, -.35)}" stroke-width="3" fill="none"/>
    ${[[40, 84], [78, 76], [64, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ffd35a" opacity=".7"/>`).join('')}
    <path d="M60 56 V112" stroke="${k.shade(c, -.4)}" stroke-width="1.6" stroke-dasharray="3 4" opacity=".8"/>
    ${k.slit(46, 74, 4.2, '#fff8a0')}${k.slit(74, 74, 4.2, '#fff8a0')}
    <path d="M50 88 Q60 96 70 88" stroke="${k.LINE}" stroke-width="2.4" fill="none"/>
    ${flame(36, 58, .5, '#ffb04a')}${flame(86, 60, .45, '#ffb04a', 'ea-tail ea-alt')}`);

  R('magma_droplet', (c, k) => `${k.shadow(26)}
    <path d="M60 60 Q86 88 82 100 Q78 114 60 114 Q42 114 38 100 Q34 88 60 60Z" fill="${c}" ${k.ol(2.4)}/>
    <path d="M48 94 Q50 82 58 76" stroke="#ffd35a" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>
    ${k.slit(52, 98, 3.4, '#fff8a0')}${k.slit(68, 98, 3.4, '#fff8a0')}`);

  R('obsidian_sentinel', (c, k) => `${k.shadow(44)}
    <path d="M34 114 L38 90 H54 L52 114Z M66 114 L66 90 H82 L86 114Z" fill="${k.shade(c, -.2)}" ${k.ol()}/>
    <path d="M24 92 L28 50 L46 30 H74 L92 50 L96 92 Z" fill="${c}" ${k.ol()}/>
    <path d="M28 50 L60 64 L92 50 M60 64 V92 M46 30 L60 64 L74 30" stroke="${k.shade(c, .35)}" stroke-width="1.6" fill="none" opacity=".8"/>
    <path d="M34 56 L44 62 L38 80" fill="${k.shade(c, .45)}" opacity=".5"/>
    <path d="M46 30 L50 12 L60 6 L70 12 L74 30Z" fill="${k.shade(c, .15)}" ${k.ol()}/>
    <path d="M52 20 H68" stroke="#b07aff" stroke-width="4"/>${k.eye(60, 20, 2.6, '#e0c0ff')}
    <g class="ea-limb"><path d="M24 54 L8 76 L14 100 L26 86Z" fill="${k.shade(c, .1)}" ${k.ol()}/></g>
    <g class="ea-limb ea-alt"><path d="M96 54 L112 76 L106 100 L94 86Z" fill="${k.shade(c, .1)}" ${k.ol()}/></g>
    <circle cx="60" cy="76" r="5" fill="#b07aff" opacity=".7"/>`);

  R('ashen_cultist', (c, k) => `${k.shadow(28)}
    <path d="M32 114 Q30 70 42 48 Q52 34 60 34 Q68 34 78 48 Q90 70 88 114 Z" fill="${c}" ${k.ol()}/>
    <path d="M60 50 V114" stroke="${k.shade(c, -.3)}" stroke-width="2"/>
    <path d="M42 52 Q60 10 78 52 Q74 64 60 66 Q46 64 42 52Z" fill="${k.shade(c, -.4)}" ${k.ol()}/>
    <path d="M50 46 Q60 40 70 46 Q70 58 60 60 Q50 58 50 46Z" fill="#e8e0d0" ${k.ol(1.4)}/>
    <path d="M54 48 L57 52 M66 48 L63 52" stroke="${k.LINE}" stroke-width="2"/>${k.eye(55, 52, 1.8, '#ff6a3a')}${k.eye(65, 52, 1.8, '#ff6a3a')}
    <g class="ea-limb"><path d="M40 70 Q24 74 20 60" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M18 22 V70" stroke="#5a4a40" stroke-width="3"/>${flame(18, 26, .55, '#ff8a3a')}</g>
    <path d="M44 86 L60 96 L76 86" stroke="#ff6a3a" stroke-width="2" fill="none" opacity=".7"/>`);

  R('cinder_spitter', (c, k) => `${k.shadow(32)}
    <path d="M36 114 L40 96 M80 114 L76 96" stroke="${k.shade(c, -.35)}" stroke-width="5" stroke-linecap="round"/>
    <path d="M26 100 Q20 60 50 50 Q80 44 92 66 Q100 84 88 100 Z" fill="${c}" ${k.ol()}/>
    <path d="M86 58 Q110 52 114 66 Q110 78 90 76Z" fill="${k.shade(c, .1)}" ${k.ol()}/>
    <circle cx="112" cy="68" r="4" fill="${k.LINE}"/><circle class="ea-tail" cx="116" cy="60" r="3" fill="#ffb04a"/><circle class="ea-tail ea-alt" cx="118" cy="52" r="2" fill="#ffd35a"/>
    ${k.eye(84, 60, 3.4, '#ffe04a')}
    ${[[40, 66], [56, 58], [44, 84], [64, 76]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${k.shade(c, -.3)}"/><circle cx="${x}" cy="${y}" r="1.8" fill="#ffb04a"/>`).join('')}`);

  R('ember_magpie', (c, k) => `${k.shadow(26)}
    <path class="ea-tail" d="M36 88 L10 104 L16 92 L4 94 L30 80Z" fill="${k.LINE}" ${k.ol(1.4)}/>
    <path d="M30 86 Q34 56 62 54 Q86 56 88 76 Q84 96 58 98 Q38 98 30 86Z" fill="${k.LINE}" ${k.ol()}/>
    <path d="M44 80 Q56 66 74 72 Q70 90 52 92Z" fill="${c}"/>
    <g class="ea-fin"><path d="M46 66 Q34 34 70 30 Q66 50 64 62Z" fill="${k.shade(c, -.2)}" ${k.ol(1.6)}/></g>
    <circle cx="86" cy="56" r="13" fill="${k.LINE}" ${k.ol()}/>
    <path d="M96 54 L114 58 L96 62Z" fill="#ffd35a" ${k.ol(1.4)}/>
    <g transform="translate(108 64)"><rect x="-5" y="-1" width="11" height="15" rx="1.6" fill="#f0e8d8" ${k.ol(1.2)} transform="rotate(20)"/></g>
    ${k.eye(88, 52, 3, '#ffb04a')}
    <path d="M54 98 L52 112 M66 98 L68 112" stroke="#d8b070" stroke-width="2.4" stroke-linecap="round"/>`);

  R('spiked_brazier', (c, k) => `${k.shadow(40)}
    <path d="M34 114 L42 96 M86 114 L78 96 M60 114 V98" stroke="${k.shade(c, -.35)}" stroke-width="5" stroke-linecap="round"/>
    <path d="M18 54 H102 L92 98 H28 Z" fill="${c}" ${k.ol()}/>
    <path d="M24 66 H96 M28 82 H92" stroke="${k.shade(c, -.35)}" stroke-width="2.4"/>
    ${[18, 34, 50, 70, 86, 102].map(x => `<path d="M${x - 4} 56 L${x} 42 L${x + 4} 56Z" fill="#d8d0c0" ${k.ol(1)}/>`).join('')}
    ${[[22, 74], [98, 74], [26, 92], [94, 92]].map(([x, y]) => `<path d="M${x} ${y - 4} L${x + (x < 60 ? -10 : 10)} ${y} L${x} ${y + 4}Z" fill="#d8d0c0" ${k.ol(1)}/>`).join('')}
    ${flame(44, 52, 1, '#ff8a3a')}${flame(62, 52, 1.3, '#ffb04a', 'ea-tail ea-alt')}${flame(78, 52, .9, '#ff8a3a')}
    ${k.slit(48, 74, 3.6, '#ffe04a')}${k.slit(72, 74, 3.6, '#ffe04a')}`);
})();
