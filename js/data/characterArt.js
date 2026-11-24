// CHARACTER ART (data only)
// The heroine: an original anime-style aristocratic vampire girl.
// Long straight white hair with a hime cut (blunt side locks, pointed bangs),
// big crimson eyes with slit pupils, a calm unsmiling face with one small fang,
// a tailored plum-black frock coat with silver trim and crimson lining, a high
// vampire collar, a lace jabot, dark tights, heeled knee boots, and a silver lantern.
// Drawn as SVG with thin anime line art, no image files.
//
// Views: 'front' and 'back'. Each is a function (p) -> SVG markup, where p is
// the palette below plus an id prefix, so gradient ids never clash.
// Groups that animate carry a class (mc-*); css/character.css (idle loop) and
// css/characterPoses.css (throw, defend, cast, hurt, cheer) move them.
// The joint points the CSS pivots on are listed in JOINTS below; keep them in
// step with css/character.css if the body is redrawn.
// To recolor her, change the palette. To add a view, add a key to views.
Game.CHARACTER_ART = (function () {
  const palette = {
    hair: '#f7f5fc', hairShade: '#dcd4ec', hairDark: '#aa9ec8', hairShine: '#ffffff', hairLine: '#7a6c9a',
    skin: '#fff4ee', skinShade: '#f2d5cb', blush: '#ff8fa3',
    eye: '#e0213f', eyeDark: '#5a0616', eyeLight: '#ff8a9a', lash: '#241626',
    coat: '#2d2338', coatLight: '#4b3d5e', coatShade: '#1a1422',
    lining: '#9a1634', liningDark: '#5c0c20', skirt: '#3b1426',
    silver: '#dfe3ee', silverShade: '#8e96ad', lace: '#f7f4fb', laceShade: '#cfc7de',
    tights: '#221b2c', tightsShine: '#4a3f5a', boot: '#17121d', bootLight: '#3b3148',
    line: '#24182c',
    glow: '#ffd27a', glowCore: '#fff6d8', shield: '#c9b8ff',
  };

  // Joint points (viewBox 200 x 350) used as pivots in css/character.css.
  const JOINTS = { neck: [100, 96], shoulderL: [76, 112], shoulderR: [124, 112], hips: [100, 190], feet: [100, 336] };

  // Shared defs (gradients, glow blur, eye clip), id-prefixed.
  const defs = p => `<defs>
    <linearGradient id="${p.id}-hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.hairShine}"/><stop offset=".35" stop-color="${p.hair}"/><stop offset="1" stop-color="${p.hairShade}"/>
    </linearGradient>
    <linearGradient id="${p.id}-iris" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.eyeDark}"/><stop offset=".45" stop-color="${p.eye}"/><stop offset="1" stop-color="${p.eyeLight}"/>
    </linearGradient>
    <linearGradient id="${p.id}-coat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.coatLight}"/><stop offset="1" stop-color="${p.coat}"/>
    </linearGradient>
    <linearGradient id="${p.id}-skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.skin}"/><stop offset="1" stop-color="#ffe9e1"/>
    </linearGradient>
    <linearGradient id="${p.id}-tights" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${p.tights}"/><stop offset=".45" stop-color="${p.tightsShine}"/><stop offset="1" stop-color="${p.tights}"/>
    </linearGradient>
    <radialGradient id="${p.id}-glow">
      <stop offset="0" stop-color="${p.glowCore}"/><stop offset=".45" stop-color="${p.glow}" stop-opacity=".75"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${p.id}-shield" cx=".5" cy=".5" r=".5">
      <stop offset=".6" stop-color="${p.shield}" stop-opacity=".05"/><stop offset=".92" stop-color="${p.shield}" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/>
    </radialGradient>
    <clipPath id="${p.id}-eye"><path d="${EYE}"/></clipPath>
    <filter id="${p.id}-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>`;

  // Outline used on most shapes (anime line art).
  const ln = (p, w = 1.1) => `stroke="${p.line}" stroke-width="${w}" stroke-linejoin="round"`;
  const hl = (p, w = 1) => `stroke="${p.hairLine}" stroke-width="${w}" stroke-linejoin="round"`;

  // The head is drawn a little large for big anime eyes, then scaled down
  // around the chin so she keeps grown-up proportions (about 5.5 heads tall).
  const HEAD_SCALE = 0.9;
  const headWrap = inner => `<g transform="translate(100 96) scale(${HEAD_SCALE}) translate(-100 -96)">${inner}</g>`;

  // Her body (not the head) is drawn BODY_WIDTH times wider around the center line.
  // The joint pivots stay right because the CSS pivots are read in the stretched space.
  // faceWrap undoes the stretch on the head, so her face keeps its shape.
  const BODY_WIDTH = 1.1;
  const bodyWrap = inner => `<g transform="translate(100 0) scale(${BODY_WIDTH} 1) translate(-100 0)">${inner}</g>`;
  const faceWrap = inner => `<g transform="translate(100 96) scale(${(HEAD_SCALE / BODY_WIDTH).toFixed(4)} ${HEAD_SCALE}) translate(-100 -96)">${inner}</g>`;

  // ---------- pieces used by both views ----------
  const shadow = () => `<ellipse class="mc-shadow" cx="100" cy="338" rx="44" ry="6.5" fill="#000" opacity=".45"/>`;

  // Barrier shown by the defend pose (invisible otherwise).
  const shield = p => `<g class="mc-shield">
    <ellipse cx="100" cy="196" rx="84" ry="150" fill="url(#${p.id}-shield)" stroke="${p.shield}" stroke-width="2.5"/>
    <path d="M100 120 L128 136 L128 170 L100 186 L72 170 L72 136 Z M100 186 L100 220 M72 170 L46 184 M128 170 L154 184 M72 136 L46 120 M128 136 L154 120 M100 220 L128 236 L128 270 M100 220 L72 236 L72 270"
      fill="none" stroke="#efe8ff" stroke-width="1.4" opacity=".5"/>
  </g>`;

  // Long legs in dark tights, heeled knee boots with silver buckles.
  const legs = (p, back) => `<g class="mc-legs">
    <path d="M74 182 Q68 226 85 262 Q78 288 88 314 L90 324 L99 324 Q99.4 292 99.4 262 Q101 226 100 192 Z" fill="url(#${p.id}-tights)" ${ln(p, 1)}/>
    <path d="M126 182 Q132 226 115 262 Q122 288 112 314 L110 324 L101 324 Q100.6 292 100.6 262 Q99 226 100 192 Z" fill="url(#${p.id}-tights)" ${ln(p, 1)}/>
    <path d="M87 262 Q93 266 98.5 262 M113 262 Q107 266 101.5 262" stroke="${p.tightsShine}" stroke-width=".9" fill="none" opacity=".8"/>
    <!-- boots -->
    <path d="M85.4 272 Q92.4 267 99.4 272 L99.6 324 Q100 330 100 335 L81 335 Q78 330 87.4 325 Q78.6 296 85.4 272 Z" fill="${p.boot}" ${ln(p, 1)}/>
    <path d="M114.6 272 Q107.6 267 100.6 272 L100.4 324 Q100 330 100 335 L119 335 Q122 330 112.6 325 Q121.4 296 114.6 272 Z" fill="${p.boot}" ${ln(p, 1)}/>
    <path d="M85.4 272 Q92.4 267.6 99.4 272 L99.4 276 Q92.4 271.6 85.6 276 Z M114.6 272 Q107.6 267.6 100.6 272 L100.6 276 Q107.6 271.6 114.4 276 Z" fill="${p.silver}"/>
    <path d="M82 298.6 L99.4 296 M118 298.6 L100.6 296" stroke="${p.silverShade}" stroke-width="2.4"/>
    <rect x="90.6" y="295" width="3.6" height="3.6" rx=".6" fill="none" stroke="${p.silver}" stroke-width="1"/>
    <rect x="105.8" y="295" width="3.6" height="3.6" rx=".6" fill="none" stroke="${p.silver}" stroke-width="1"/>
    <path d="M86.4 282 Q84.4 298 88.6 316 M113.6 282 Q115.6 298 111.4 316" stroke="${p.bootLight}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
    ${back ? `<path d="M96 328 L99.4 328 L99.4 335 L96 335 Z M104 328 L100.6 328 L100.6 335 L104 335 Z" fill="${p.bootLight}"/>` : ''}
  </g>`;

  // Ornate silver lantern; (x, y) = top of its handle.
  const lantern = (p, x, y) => `<g class="mc-lantern">
    <path d="M${x - 6} ${y + 8} Q${x - 6} ${y} ${x} ${y} Q${x + 6} ${y} ${x + 6} ${y + 8}" fill="none" stroke="${p.silver}" stroke-width="1.6"/>
    <circle class="mc-lantern-halo" cx="${x}" cy="${y + 20}" r="26" fill="url(#${p.id}-glow)" filter="url(#${p.id}-blur)"/>
    <path d="M${x - 8} ${y + 10} L${x} ${y + 5} L${x + 8} ${y + 10} Z" fill="${p.silver}" ${ln(p, .8)}/>
    <rect x="${x - 6.5}" y="${y + 10}" width="13" height="19" rx="2.5" fill="${p.glow}" opacity=".93"/>
    <ellipse class="mc-lantern-flame" cx="${x}" cy="${y + 20}" rx="3" ry="5.4" fill="${p.glowCore}"/>
    <path d="M${x - 6.5} ${y + 10} L${x - 6.5} ${y + 29} M${x + 6.5} ${y + 10} L${x + 6.5} ${y + 29} M${x - 6.5} ${y + 19.5} Q${x} ${y + 15} ${x + 6.5} ${y + 19.5}" stroke="${p.silver}" stroke-width="1.3" fill="none"/>
    <path d="M${x - 8} ${y + 29} L${x + 8} ${y + 29} L${x + 5} ${y + 33} L${x - 5} ${y + 33} Z" fill="${p.silver}" ${ln(p, .8)}/>
    <circle cx="${x}" cy="${y + 35}" r="1.6" fill="${p.lining}" stroke="${p.silver}" stroke-width=".7"/>
  </g>`;

  // Long straight hair behind the body, ending in pointed tips below the waist.
  // From the front it frames the body; from the back it covers her back and hides the tops of her arms.
  const hairBackLong = (p, front) => front ? `<g class="mc-hair-back">
    <path d="M70 60 Q60 96 62 136 Q60 176 64 214 L71 206 L76 218 L84 207 L92 216 L100 207 L108 216 L116 207 L124 218 L129 206 L136 214 Q140 176 138 136 Q140 96 130 60 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>
    <path d="M72 120 Q70 168 76 212 M86 150 Q86 186 90 212 M114 150 Q114 186 110 212 M128 120 Q130 168 124 212 M100 160 L100 204" stroke="${p.hairDark}" stroke-width="1" fill="none" opacity=".55" stroke-linecap="round"/>
  </g>` : Game.UI && Game.UI.hairWind ? `<g class="mc-hair-back">
    <!-- solid top of the hair; below it six strands blow in the wind (js/ui/hairWind.js) -->
    <path d="M69 72 Q68 104 71 140 L71 150 L129 150 L129 140 Q132 104 131 72 Z" fill="url(#${p.id}-hairU)"/>
    <path d="M71 150 L71 140 Q68 104 69 72 M131 72 Q132 104 129 140 L129 150" fill="none" ${hl(p)}/>
    ${Game.UI.hairWind.backStrands(p, hl(p))}
    <path d="M80 104 Q78 118 80 132 M90 100 Q89 116 90 132 M100 100 V132 M110 100 Q111 116 110 132 M120 104 Q122 118 120 132" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M84 108 Q82 120 84 134 M116 108 Q118 120 116 134" stroke="${p.hairShine}" stroke-width="2.2" fill="none" opacity=".85" stroke-linecap="round"/>
  </g>` : `<g class="mc-hair-back">
    <path d="M69 72 Q68 104 71 140 Q70 178 73 212 L78 205 L82 217 L88 207 L94 216 L100 207 L106 216 L112 207 L118 217 L122 205 L127 212 Q130 178 129 140 Q132 104 131 72 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>
    <path d="M78 110 Q76 160 78 206 M88 104 Q86 160 88 212 M100 104 L100 204 M112 104 Q114 160 112 212 M122 110 Q124 160 122 206" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M82 112 Q80 150 82 190 M118 112 Q121 150 118 186" stroke="${p.hairShine}" stroke-width="2.4" fill="none" opacity=".9" stroke-linecap="round"/>
  </g>`;

  // Hime-cut side locks that hang in front of the shoulders.
  const sideLocks = p => `
    <g class="mc-lock-l">
      <path d="M77 54 Q70 74 71 96 Q71 114 68 132 L72.5 125 L75 134 L78 124 Q80 108 80 94 Q81 74 83 58 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>
      <path d="M76 70 Q74 96 74 122" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".6"/>
    </g>
    <g class="mc-lock-r">
      <path d="M123 54 Q130 74 129 96 Q129 114 132 132 L127.5 125 L125 134 L122 124 Q120 108 120 94 Q119 74 117 58 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>
      <path d="M124 70 Q126 96 126 122" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".6"/>
    </g>`;

  // Back of the skull / crown, with the "angel ring" shine.
  const crown = p => `<path d="M68 76 Q63 46 82 35 Q100 26 118 35 Q137 46 132 76 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>`;

  // Eye outline (right eye, outer corner at +x), centered on 0,0. The left eye is mirrored.
  const EYE = 'M-6.2 -2.2 Q0 -7.4 6.4 -4.6 Q7.6 0 5.6 4.6 Q0 7.6 -5.6 4 Q-7 .6 -6.2 -2.2 Z';
  const eye = p => `
    <path d="${EYE}" fill="#fff"/>
    <g clip-path="url(#${p.id}-eye)">
      <ellipse cx=".4" cy=".9" rx="5" ry="6.6" fill="url(#${p.id}-iris)" stroke="${p.eyeDark}" stroke-width=".9"/>
      <ellipse cx=".4" cy="-3.6" rx="6" ry="3.4" fill="${p.eyeDark}" opacity=".45"/>
      <ellipse cx=".4" cy="1.2" rx="1.25" ry="3.7" fill="#2a0008"/>
      <path d="M-3 4.6 Q.4 7.2 3.8 4.6" stroke="${p.eyeLight}" stroke-width="1.3" fill="none" opacity=".9"/>
      <path d="M-6.2 -2.6 Q0 -7 6.4 -4.4" stroke="${p.laceShade}" stroke-width="1.6" fill="none" opacity=".7"/>
    </g>
    <ellipse cx="-1.9" cy="-2.2" rx="1.9" ry="2.4" fill="#fff"/>
    <circle cx="2.6" cy="3.2" r=".95" fill="#fff" opacity=".95"/>
    <path d="M-7 -1.4 Q-1 -8.8 6.6 -5.4 L9.6 -7 L7.8 -3.6 Q.6 -6.6 -6.4 -.4 Z" fill="${p.lash}"/>
    <path d="M6.4 -4.4 L9.8 -3.4 M5.4 -5.8 L8.2 -8.4" stroke="${p.lash}" stroke-width=".8" stroke-linecap="round"/>
    <path d="M1.6 5.9 Q4.6 5.2 6 3.2" stroke="${p.lash}" stroke-width=".8" fill="none" stroke-linecap="round"/>
    <path d="M-4.2 -8.6 Q1 -11 6.2 -8.4" stroke="${p.lash}" stroke-width=".55" fill="none" opacity=".45"/>`;

  // ---------- FRONT VIEW ----------
  const front = p => `<svg class="mc-svg" viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
    ${defs(p)}
    ${shadow()}
    <g class="mc-figure">${bodyWrap(`
      <!-- crimson lining of the coat's back, seen between the legs -->
      <g class="mc-coat-back"><path d="M76 186 Q100 194 124 186 L142 250 Q100 260 58 250 Z" fill="${p.liningDark}" ${ln(p)}/></g>
      ${legs(p, false)}
      <g class="mc-upper">
        ${headWrap(hairBackLong(p, true))}

        <!-- under-skirt with a lace hem -->
        <path d="M85 150 L115 150 Q123 178 128 206 Q100 214 72 206 Q77 178 85 150 Z" fill="${p.skirt}" ${ln(p)}/>
        <path d="M72 206 Q76 213 81 208 Q86 214 90 209 Q95 215 100 210 Q105 215 110 209 Q114 214 119 208 Q124 213 128 206" fill="${p.lace}" ${ln(p, .8)}/>
        <path d="M92 160 L90 204 M100 158 L100 208 M108 160 L110 204" stroke="${p.liningDark}" stroke-width="1.2" opacity=".8"/>

        <!-- coat tails, open at the front, crimson lining on the inner edge -->
        <path d="M86 148 L95 151 Q90 176 86 200 Q80 226 76 250 Q65 255 55 249 Q65 212 74 182 Q80 160 86 148 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
        <path d="M114 148 L105 151 Q110 176 114 200 Q120 226 124 250 Q135 255 145 249 Q135 212 126 182 Q120 160 114 148 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
        <path d="M94 153 Q89.5 177 85.5 201 Q79.6 227 75.8 248 M106 153 Q110.5 177 114.5 201 Q120.4 227 124.2 248" stroke="${p.lining}" stroke-width="2.6" fill="none"/>
        <path d="M55.5 248.5 Q65 255.4 76.4 250.4 M144.5 248.5 Q135 255.4 123.6 250.4" stroke="${p.silver}" stroke-width="1.8" fill="none"/>
        <path d="M77 186 Q70 214 64 244 M123 186 Q130 214 136 244" stroke="${p.coatShade}" stroke-width="1.3" fill="none" opacity=".8"/>

        <!-- free arm (throws cards) -->
        <g class="mc-arm-l">
          <g transform="translate(-4 0)">
          <path d="M66.5 190 Q63 197 66.5 202 Q71 204 73.5 198 L73 190 Z" fill="${p.skin}" ${ln(p, .9)}/>
          <path d="M75 110 Q68 128 69 150 Q67 168 65.5 182 L75.5 184 Q78 166 80 150 Q85 130 87 114 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M64 182 L77 184 L78.5 191 L74 189 L70.5 192 L67 189 L62.6 190.6 Z" fill="${p.lace}" ${ln(p, .8)}/>
          <path d="M65.4 180 L76 182" stroke="${p.silver}" stroke-width="1.8"/>
          </g>
        </g>

        <!-- torso: coat bodice, lace jabot, gem brooch, crimson corset -->
        <g class="mc-torso">
          <path d="M75 108 Q100 100 125 108 Q128 120 123 132 Q118 142 115.5 152 L84.5 152 Q82 142 77 132 Q72 120 75 108 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M91 103 L100 134 L109 103 Z" fill="${p.lace}"/>
          <path d="M95 102 L105 102 L106.5 111 Q103.5 114.5 105.5 119 Q102 124 100 131 Q98 124 94.5 119 Q96.5 114.5 93.5 111 Z" fill="${p.lace}" ${ln(p, .7)}/>
          <path d="M95 111 Q100 114 105 111 M95.5 119 Q100 122 104.5 119" stroke="${p.laceShade}" stroke-width=".9" fill="none"/>
          <path d="M91 103 L100 134 L109 103" stroke="${p.silver}" stroke-width="1.6" fill="none" stroke-linejoin="round"/>
          <circle cx="93" cy="122" r="1.4" fill="${p.silver}"/><circle cx="107" cy="122" r="1.4" fill="${p.silver}"/>
          <circle cx="94.6" cy="131" r="1.4" fill="${p.silver}"/><circle cx="105.4" cy="131" r="1.4" fill="${p.silver}"/>
          <path d="M84.6 140 L115.4 140 L116 152.5 L84 152.5 Z" fill="${p.lining}" ${ln(p, .9)}/>
          <path d="M96 142 L104 146 M104 142 L96 146 M96 146 L104 150 M104 146 L96 150" stroke="${p.silver}" stroke-width=".8"/>
          <path d="M84.5 151.5 L115.5 151.5" stroke="${p.silver}" stroke-width="1.4"/>
          <path d="M77 112 Q74 122 78 132 M123 112 Q126 122 122 132" stroke="${p.coatShade}" stroke-width="1" fill="none" opacity=".7"/>
          <circle cx="100" cy="106.5" r="3.4" fill="${p.silver}" ${ln(p, .7)}/><circle cx="100" cy="106.5" r="2.1" fill="${p.lining}"/>
          <circle cx="99.3" cy="105.8" r=".6" fill="#fff" opacity=".8"/>
        </g>

        <!-- lantern arm -->
        <g class="mc-arm-r">
          <g transform="translate(4 0)">
          ${lantern(p, 131, 196)}
          <path d="M133.5 190 Q137 197 133.5 202 Q129 204 126.5 198 L127 190 Z" fill="${p.skin}" ${ln(p, .9)}/>
          <path d="M125 110 Q132 128 131 150 Q133 168 134.5 182 L124.5 184 Q122 166 120 150 Q115 130 113 114 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M136 182 L123 184 L121.5 191 L126 189 L129.5 192 L133 189 L137.4 190.6 Z" fill="${p.lace}" ${ln(p, .8)}/>
          <path d="M134.6 180 L124 182" stroke="${p.silver}" stroke-width="1.8"/>
          </g>
        </g>

        <!-- high vampire collar (crimson inside), neck -->
        <path d="M89 104 Q78 96 76 80 Q86 90 95 99 Z M111 104 Q122 96 124 80 Q114 90 105 99 Z" fill="${p.lining}" ${ln(p)}/>
        <path d="M89 104 Q80 98 77.5 84 Q80 96 91 102 Z M111 104 Q120 98 122.5 84 Q120 96 109 102 Z" fill="${p.coat}"/>
        <path d="M94.5 86 L94.5 101 Q100 104 105.5 101 L105.5 86 Z" fill="${p.skinShade}" ${ln(p, .9)}/>
        <path d="M95 94 Q100 98 105 94" stroke="#e7bfb3" stroke-width="1.4" fill="none"/>

        <g class="mc-head">${faceWrap(`
          ${crown(p)}
          <!-- face: soft cheeks to a small pointed chin -->
          <path d="M76 56 L76.5 72 Q78 82 87 89.5 Q95 95.5 100 96 Q105 95.5 113 89.5 Q122 82 123.5 72 L124 56 Z" fill="url(#${p.id}-skin)" ${ln(p)}/>
          <g class="mc-blush">
            <ellipse cx="84" cy="81" rx="5.5" ry="2.4" fill="${p.blush}" opacity=".35"/>
            <ellipse cx="116" cy="81" rx="5.5" ry="2.4" fill="${p.blush}" opacity=".35"/>
          </g>
          <path d="M83 63.6 Q88.5 61.4 94 62.8 M106 62.8 Q111.5 61.4 117 63.6" stroke="${p.hairLine}" stroke-width="1" fill="none" stroke-linecap="round"/>

          <!-- eyes: the whole group squashes for a blink -->
          <g class="mc-eyes">
            <g transform="translate(110.4 73.4) scale(1.16)">${eye(p)}</g>
            <g transform="translate(89.6 73.4) scale(-1.16 1.16)">${eye(p)}</g>
          </g>
          <!-- shown only while blinking: closed eyes -->
          <g class="mc-eyes-closed" stroke="${p.lash}" stroke-width="1.8" fill="none" stroke-linecap="round">
            <path d="M82.4 74 Q89 78.4 96.6 74"/><path d="M103.4 74 Q111 78.4 117.6 74"/>
          </g>
          <!-- hurt face: > < eyes, shown by the hurt pose -->
          <g class="mc-eyes-hurt" stroke="${p.lash}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M84 68.6 L94 73.4 L84 78.2"/><path d="M116 68.6 L106 73.4 L116 78.2"/>
          </g>
          <!-- nose and a calm, closed mouth (no smile) with one fang peeking out -->
          <path d="M100.6 81.6 L101.4 83.6" stroke="#d8a89c" stroke-width="1" stroke-linecap="round"/>
          <g class="mc-mouth">
            <path d="M96.6 88.6 Q100 88.2 103.6 88.6" stroke="#8a2a3c" stroke-width="1.1" fill="none" stroke-linecap="round"/>
            <path d="M101.6 88.6 L102.4 90.6 L103.2 88.6 Z" fill="#fff" stroke="#8a2a3c" stroke-width=".4"/>
          </g>

          <!-- bangs: pointed anime strands, a longer lock between the eyes -->
          <path d="M70 74 Q66 46 82 37 Q100 28 118 37 Q134 46 130 74 L128 80 Q124 68 121 59 Q119.5 63 118 67 Q116 62 113 58 Q111 61 109 64 Q107 60 104 56.6 Q103 63 101 70 Q99.5 62 97 57 Q95.5 61 94 65 Q91 60 88 58 Q86 62 84 67 Q82 62 79 60 Q76 68 72 80 Z" fill="url(#${p.id}-hair)" ${hl(p)}/>
          <path d="M84 47 Q86 56 84 66 M97 42 Q98 52 97 57 M110 44 Q111 54 109 63 M120 48 Q121 56 118 66" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".55" stroke-linecap="round"/>
          <path d="M77 49 Q90 42 104 43 Q114 44 121 49" stroke="${p.hairShine}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".95"/>
          <path d="M77 52 Q90 46.4 104 47 Q114 47.6 121 52" stroke="${p.hairShade}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
          ${sideLocks(p)}
        `)}</g>
      </g>
    `)}</g>
  </svg>`;

  // ---------- BACK VIEW (battle: she faces the enemies) ----------
  const back = p => `<svg class="mc-svg" viewBox="0 0 200 350" xmlns="http://www.w3.org/2000/svg">
    ${defs(p)}
    ${shadow()}
    ${shield(p)}
    <g class="mc-figure">${bodyWrap(`
      <g class="mc-coat-back"></g>
      ${legs(p, true)}
      <g class="mc-upper">
        <!-- coat tails from behind: a wide center vent (crimson edges) shows her legs -->
        <path d="M85 148 L101 148 L101 186 Q93 218 82 253 Q68 255 55 250 Q72 186 85 148 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
        <path d="M115 148 L99 148 L99 186 Q107 218 118 253 Q132 255 145 250 Q128 186 115 148 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
        <path d="M99.6 188 Q92.4 218 82.6 251 M100.4 188 Q107.6 218 117.4 251" stroke="${p.lining}" stroke-width="2.4" fill="none"/>
        <path d="M55.5 249.5 Q68 254.6 82.4 252.4 M144.5 249.5 Q132 254.6 117.6 252.4" stroke="${p.silver}" stroke-width="1.8" fill="none"/>
        <path d="M80 178 Q72 214 66 246 M120 178 Q128 214 134 246 M92 168 Q90 186 88 204 M108 168 Q110 186 112 204" stroke="${p.coatShade}" stroke-width="1.2" fill="none" opacity=".8"/>

        <!-- bodice from behind, crimson corset lacing, high collar -->
        <g class="mc-torso">
          <path d="M75 108 Q100 101 125 108 Q128 120 123 132 Q118 142 115.5 152 L84.5 152 Q82 142 77 132 Q72 120 75 108 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M84.6 140 L115.4 140 L116 152.5 L84 152.5 Z" fill="${p.lining}" ${ln(p, .9)}/>
          <path d="M96 141 L104 145 M104 141 L96 145 M96 145 L104 149 M104 145 L96 149" stroke="${p.silver}" stroke-width=".8"/>
          <path d="M100 149 L96 160 M100 149 L104 160" stroke="${p.silver}" stroke-width=".9" stroke-linecap="round"/>
          <path d="M84.5 151.5 L115.5 151.5" stroke="${p.silver}" stroke-width="1.4"/>
          <path d="M84 106 Q80 92 80 80 Q100 76 120 80 Q120 92 116 106 Q100 102 84 106 Z" fill="${p.coat}" ${ln(p)}/>
          <path d="M80 80 Q100 76 120 80" stroke="${p.silver}" stroke-width="1.4" fill="none"/>
        </g>

        <!-- lantern arm: seen from behind it is on the viewer's left -->
        <g class="mc-arm-r">
          <g transform="translate(-4 0)">
          ${lantern(p, 69, 196)}
          <path d="M66.5 190 Q63 197 66.5 202 Q71 204 73.5 198 L73 190 Z" fill="${p.skinShade}" ${ln(p, .9)}/>
          <path d="M75 110 Q68 128 69 150 Q67 168 65.5 182 L75.5 184 Q78 166 80 150 Q85 130 87 114 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M64 182 L77 184 L78.5 191 L74 189 L70.5 192 L67 189 L62.6 190.6 Z" fill="${p.lace}" ${ln(p, .8)}/>
          <path d="M65.4 180 L76 182" stroke="${p.silver}" stroke-width="1.8"/>
          </g>
        </g>
        <!-- free arm (throws cards) -->
        <g class="mc-arm-l">
          <!-- the glowing card she throws (shown by the throw pose) -->
          <g transform="translate(4 0)">
          <g class="mc-held-card"><rect x="124" y="196" width="13" height="18" rx="2" fill="${p.glowCore}" stroke="${p.silver}" stroke-width="1.5"/></g>
          <path d="M133.5 190 Q137 197 133.5 202 Q129 204 126.5 198 L127 190 Z" fill="${p.skinShade}" ${ln(p, .9)}/>
          <path d="M125 110 Q132 128 131 150 Q133 168 134.5 182 L124.5 184 Q122 166 120 150 Q115 130 113 114 Z" fill="url(#${p.id}-coat)" ${ln(p)}/>
          <path d="M136 182 L123 184 L121.5 191 L126 189 L129.5 192 L133 189 L137.4 190.6 Z" fill="${p.lace}" ${ln(p, .8)}/>
          <path d="M134.6 180 L124 182" stroke="${p.silver}" stroke-width="1.8"/>
          </g>
        </g>

        <!-- long hair falls over her back, in front of the arms -->
        ${headWrap(hairBackLong(p, false))}

        <!-- back of the head: smooth white hair -->
        <g class="mc-head">${faceWrap(`
          <path d="M68 76 Q63 46 82 35 Q100 26 118 35 Q137 46 132 76 Q130 92 118 106 L82 106 Q70 92 68 76 Z" fill="url(#${p.id}-hair)"/>
          <path d="M82 106 Q70 92 68 76 Q63 46 82 35 Q100 26 118 35 Q137 46 132 76 Q130 92 118 106" fill="none" ${hl(p)}/>
          <path d="M76 52 Q100 38 124 52" stroke="${p.hairShine}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
          <path d="M78 56 Q100 44 122 56" stroke="${p.hairShade}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
          <path d="M88 40 Q82 70 88 104 M100 36 L100 104 M112 40 Q118 70 112 104" stroke="${p.hairDark}" stroke-width=".9" fill="none" opacity=".55"/>
        `)}</g>
      </g>
    `)}</g>
  </svg>`;

  // Points in viewBox units (200 x 350) that the throw effect needs
  // (ui/juice/heroJuice.js): where her hand is when she lets go of the card.
  const POINTS = {
    throwRelease: { x: 188, y: 70 },    // back view, free hand at release
    restHand: { x: 134, y: 196 },       // back view, free hand at rest
    castLantern: { x: 42, y: 30 },      // back view, lantern held up by the cast pose
  };

  return { palette, views: { front, back }, POINTS, JOINTS };
})();
