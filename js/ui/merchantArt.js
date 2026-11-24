// MERCHANT VIEW: builds the shop keeper SVG from Game.MERCHANT_ART (data/merchantArtData.js).
// Usage: Game.UI.merchantArt.svg()  -> SVG markup string.
// Animated parts carry mb-* classes, animated by css/merchant.css.
Game.UI = Game.UI || {};
Game.UI.merchantArt = {
  svg() {
    const p = Game.MERCHANT_ART.palette, w = Game.MERCHANT_ART.stroke;
    const ink = `stroke="${p.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
    const thin = `stroke="${p.ink}" stroke-width="${w * 0.7}" stroke-linecap="round" fill="none"`;
    // thin black limb with a pale rim under it, so it reads on the dark background
    const limb = d => `<path d="${d}" stroke="${p.rim}" stroke-width="${w + 2.4}" stroke-linecap="round" fill="none"/>` +
      `<path d="${d}" stroke="${p.ink}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
    return `<svg viewBox="0 0 120 150" class="merchant-svg" aria-hidden="true">
      <ellipse cx="60" cy="141" rx="48" ry="7" fill="#000" opacity=".4"/>

      <g class="mb-body">
        <!-- bundle of wares strapped on his back -->
        <path d="M24 70 Q14 58 22 46 Q32 38 40 48 L42 70Z" fill="${p.pack}" ${ink}/>
        <path d="M22 52 Q30 50 38 56" ${thin}/>
        <path d="M30 42 L26 34 M33 41 L35 32" ${thin}/>

        <!-- segmented shell (pill-bug plates) -->
        <path d="M24 118 Q18 78 46 64 Q60 58 76 64 Q100 76 96 118Z" fill="${p.shell}" ${ink}/>
        <path d="M30 84 Q60 70 90 84" stroke="${p.shellDark}" stroke-width="${w}" fill="none" stroke-linecap="round"/>
        <path d="M26 98 Q60 84 94 98" stroke="${p.shellDark}" stroke-width="${w}" fill="none" stroke-linecap="round"/>
        <path d="M25 111 Q60 98 95 111" stroke="${p.shellDark}" stroke-width="${w}" fill="none" stroke-linecap="round"/>
        <path d="M44 70 Q56 66 70 68" stroke="${p.shellLight}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
        <!-- pale belly showing between the plates -->
        <path d="M46 92 Q60 86 74 92 L72 118 L48 118Z" fill="${p.belly}" ${ink}/>
        <path d="M49 101 H71 M48 110 H72" ${thin} opacity=".6"/>

        <!-- left arm resting on the coins -->
        ${limb("M34 92 Q26 104 34 112")}
        <!-- right arm up to the lantern pole -->
        ${limb("M86 90 Q96 86 99 74")}

        <!-- mossy scarf -->
        <path d="M36 66 Q60 80 84 66 Q86 74 80 78 Q60 88 40 78 Q34 74 36 66Z" fill="${p.scarf}" ${ink}/>
        <path d="M70 80 L74 96 L66 94Z" fill="${p.scarfDark}" ${ink}/>

        <!-- head -->
        <g class="mb-head">
          <g class="mb-ant-l">
            ${limb("M50 32 Q44 16 32 14 Q24 14 26 22 Q28 26 32 24")}
            <circle cx="32" cy="24" r="3.2" fill="${p.bell}" ${ink} stroke-width="1.4"/>
          </g>
          <g class="mb-ant-r">
            ${limb("M68 32 Q76 14 88 14 Q96 16 93 23 Q90 27 87 24")}
            <circle cx="87" cy="24" r="3.2" fill="${p.bell}" ${ink} stroke-width="1.4"/>
          </g>
          <path d="M36 50 Q36 30 59 30 Q82 30 82 50 Q82 70 59 72 Q36 70 36 50Z" fill="${p.mask}" ${ink}/>
          <path d="M40 60 Q59 74 78 60 Q74 70 59 71 Q44 70 40 60Z" fill="${p.maskShade}"/>
          <g class="mb-eyes">
            <ellipse cx="50" cy="51" rx="6" ry="8" fill="${p.eye}"/>
            <ellipse cx="68" cy="51" rx="6" ry="8" fill="${p.eye}"/>
            <circle cx="52" cy="47" r="1.8" fill="#fff" opacity=".85"/>
            <circle cx="70" cy="47" r="1.8" fill="#fff" opacity=".85"/>
          </g>
          <path d="M56 64 Q59 66 62 64" ${thin}/>
        </g>
      </g>

      <!-- lantern on a crooked pole -->
      <g class="mb-lantern">
        <path d="M100 124 V70 Q100 62 106 60" stroke="${p.pole}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M106 60 V66" ${thin}/>
        <rect x="100" y="66" width="13" height="18" rx="3" fill="rgba(255,190,90,.18)" stroke="${p.lantern}" stroke-width="2"/>
        <path class="m-flame" d="M106.5 69 Q111 76 106.5 81 Q102 76 106.5 69Z" fill="${p.flame}"/>
      </g>

      <!-- counter with a coin stack -->
      <rect x="8" y="114" width="104" height="14" rx="3" fill="${p.counter}" stroke="${p.counterEdge}" stroke-width="2"/>
      <g class="mb-coins">
        <ellipse cx="34" cy="112" rx="8" ry="2.6" fill="${p.coin}" ${ink} stroke-width="1.2"/>
        <ellipse cx="34" cy="109" rx="8" ry="2.6" fill="${p.coin}" ${ink} stroke-width="1.2"/>
        <ellipse cx="34" cy="106" rx="8" ry="2.6" fill="${p.coin}" ${ink} stroke-width="1.2"/>
      </g>
      ${limb("M30 106 Q34 101 38 106")}
    </svg>`;
  },
};
