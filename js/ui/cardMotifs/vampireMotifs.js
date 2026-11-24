// VAMPIRE CARD DRAWINGS (the Lamplighter's own cards, data/heroes/lamplighterKit.js)
// Same rules as ui/cardArt.js: each motif is color -> SVG shapes in a 100 x 50 box.
// Also the round picture of her passive (ui/passiveArt.js icon 'drop', 48 x 48 box).
(function () {
  const M = Game.UI.cardArt.registerMotif;
  const W = '#fff3f0', DARK = '#2a0c14';
  const drop = (x, y, s, c, extra = '') =>
    `<path d="M${x} ${y - 9 * s} Q${x + 6.5 * s} ${y - 1 * s} ${x + 6.5 * s} ${y + 3 * s} A${6.5 * s} ${6.5 * s} 0 0 1 ${x - 6.5 * s} ${y + 3 * s} Q${x - 6.5 * s} ${y - 1 * s} ${x} ${y - 9 * s}Z" fill="${c}" ${extra}/>`;

  // Two fangs biting down, a bead of blood on each tip.
  M('fangs', c => `
    <path d="M18 8 Q50 22 82 8 L82 14 Q50 30 18 14Z" fill="${DARK}" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M34 15 L39 36 L44 17Z M56 17 L61 36 L66 15Z" fill="${W}" stroke="#c8b8b8" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M36 16 L39 30" stroke="#fff" stroke-width="1" opacity=".8"/>
    <g class="art-float">${drop(39, 41, .55, c)}${drop(61, 41, .55, c)}</g>
    <path d="M22 10 Q50 22 78 10" stroke="${c}" stroke-width="1" fill="none" opacity=".6"/>`);

  // A small bat with spread wings and red eyes.
  M('bat', c => `
    <g class="art-float">
    <path d="M50 22 C42 10 28 6 12 12 C18 15 19 19 18 24 C24 22 28 24 29 29 C34 26 39 27 41 32 C44 29 47 29 50 31
             C53 29 56 29 59 32 C61 27 66 26 71 29 C72 24 76 22 82 24 C81 19 82 15 88 12 C72 6 58 10 50 22Z"
      fill="${DARK}" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M46 16 L44 9 L49 14Z M54 16 L56 9 L51 14Z" fill="${DARK}" stroke="${c}" stroke-width="1.2"/>
    <ellipse cx="50" cy="22" rx="6" ry="8" fill="${DARK}" stroke="${c}" stroke-width="1.4"/>
    <circle cx="47.5" cy="19" r="1.4" fill="#ff3040"/><circle cx="52.5" cy="19" r="1.4" fill="#ff3040"/>
    <path d="M48 24 L48.7 26.5 L49.4 24Z M50.6 24 L51.3 26.5 L52 24Z" fill="${W}"/></g>
    <circle cx="50" cy="22" r="20" fill="${c}" opacity=".08"/>`);

  // A goblet brimming over with blood.
  M('chalice', c => `
    <path d="M34 8 H66 Q66 26 50 30 Q34 26 34 8Z" fill="${DARK}" stroke="#d8c08a" stroke-width="1.8"/>
    <path d="M36 11 H64 Q63 23 50 27 Q37 23 36 11Z" fill="${c}" opacity=".85"/>
    <path d="M38 12 Q50 15 62 12" stroke="#ff9aa6" stroke-width="1.2" fill="none" opacity=".8"/>
    <path d="M50 30 V40 M40 44 Q50 38 60 44Z" stroke="#d8c08a" stroke-width="2" fill="${DARK}"/>
    <path d="M64 11 Q69 15 67 22" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g class="art-float">${drop(67, 30, .45, c)}</g>
    <circle cx="50" cy="20" r="18" fill="${c}" opacity=".08"/>`);

  // A crimson blade with blood running off it.
  M('bloodBlade', c => `
    <path d="M14 44 L78 8 L86 6 L84 14 L20 48Z" fill="${DARK}" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M20 44 L80 10" stroke="${W}" stroke-width="1" opacity=".6"/>
    <path d="M10 40 L22 50 M8 46 L14 40" stroke="#d8c08a" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M44 31 Q45 37 44 41" stroke="${c}" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M60 22 Q61 26 60 29" stroke="${c}" stroke-width="2" stroke-linecap="round" fill="none"/>
    <g class="art-float">${drop(44, 46, .4, c)}</g>
    ${drop(70, 34, .55, c, 'opacity=".5"')}`);

  // One big swelling drop.
  M('bloodDrop', c => `
    <circle cx="50" cy="26" r="20" fill="${c}" opacity=".1"/>
    <g class="art-beat">${drop(50, 26, 2, c)}
      <path d="M43 22 Q44 14 49 9" stroke="#ffb0b8" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/></g>
    <path d="M24 40 Q30 36 36 40 M64 40 Q70 36 76 40" stroke="${c}" stroke-width="1.6" fill="none" opacity=".6"/>`);

  // A whip of blood cracking.
  M('bloodWhip', c => `
    <path d="M10 42 C26 42 28 14 46 20 S70 38 90 10" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".3"/>
    <path d="M10 42 C26 42 28 14 46 20 S70 38 90 10" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M14 40 C28 38 30 18 46 23" stroke="#ffb0b8" stroke-width="1" fill="none" opacity=".7"/>
    <g class="art-flicker">${drop(88, 18, .45, c)}${drop(80, 26, .35, c)}</g>
    <path d="M90 4 L94 0 M94 10 L99 9 M84 4 L84 -1" stroke="${W}" stroke-width="1.4" stroke-linecap="round"/>`);

  // Two hearts tied by a thread of blood (Blood Bond).
  M('bond', c => {
    const heart = (x, y, s) => `<path d="M${x} ${y + 9 * s} C${x - 10 * s} ${y + 2 * s} ${x - 11 * s} ${y - 6 * s} ${x - 5 * s} ${y - 8 * s} C${x - 2 * s} ${y - 9 * s} ${x} ${y - 6 * s} ${x} ${y - 4 * s} C${x} ${y - 6 * s} ${x + 2 * s} ${y - 9 * s} ${x + 5 * s} ${y - 8 * s} C${x + 11 * s} ${y - 6 * s} ${x + 10 * s} ${y + 2 * s} ${x} ${y + 9 * s}Z"`;
    return `
    <path d="M30 26 C40 10 60 42 70 26" stroke="${c}" stroke-width="2.4" fill="none" stroke-dasharray="4 3"/>
    <g class="art-beat">${heart(28, 26, 1.4)} fill="${c}" fill-opacity=".8" stroke="${DARK}" stroke-width="1.2"/></g>
    <g class="art-beat" style="animation-delay:.3s">${heart(72, 26, 1.1)} fill="${DARK}" stroke="${c}" stroke-width="1.6"/>
      <path d="M69 24 L67 21 L71 23Z M75 24 L77 21 L73 23Z" fill="${c}"/></g>`;
  });

  // Bat wings with speed lines (Vampiric Speed).
  M('batWings', c => `
    <path d="M4 18 H26 M2 26 H22 M6 34 H24" stroke="${c}" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>
    <g class="art-float">
    <path d="M58 24 C50 12 38 8 26 12 C31 15 32 18 31 22 C36 21 39 23 40 27 C44 25 48 26 50 30 C53 27 56 27 58 30Z" fill="${DARK}" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M58 24 C66 12 78 8 92 12 C87 15 86 18 87 22 C82 21 79 23 78 27 C74 25 70 26 68 30 C65 27 62 27 58 30Z" fill="${DARK}" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="58" cy="26" r="4" fill="${c}"/></g>
    <path d="M50 42 Q58 36 66 42" stroke="${W}" stroke-width="1.2" fill="none" opacity=".6"/>`);

  // Passive picture: a blood drop between two fangs.
  if (Game.UI.passiveArt) Game.UI.passiveArt.registerIcon('drop', c => `
    <circle class="pa-pulse" cx="24" cy="25" r="16" fill="${c}" opacity=".16"/>
    <path d="M12 10 Q24 17 36 10" stroke="#d8c8c8" stroke-width="2" fill="none"/>
    <path d="M16 12 L18 20 L20 13Z M28 13 L30 20 L32 12Z" fill="#fff3f0"/>
    <path class="pa-beat" d="M24 18 Q32 28 32 32 A8 8 0 0 1 16 32 Q16 28 24 18Z" fill="${c}" stroke="#2a0c14" stroke-width="1.2"/>
    <path d="M20 30 Q20 26 23 23" stroke="#ffb0b8" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
})();
