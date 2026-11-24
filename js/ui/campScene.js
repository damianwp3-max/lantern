// CAMP SCENE (UI)
// The picture at the top of the rest site: the level's cave behind
// (ui/caveBackdrop.js), a tent, a small campfire with rising embers, and the
// hero standing by the fire (ui/character.js). Colors and layout: data/campData.js.
// Styles and motion: css/camp.css.
//   Game.UI.campScene.render(run) -> HTML string
Game.UI = Game.UI || {};

Game.UI.campScene = (function () {
  const D = () => Game.CAMP;

  function tent() {
    const c = D().tent;
    return `<svg class="camp-tent" viewBox="0 0 220 160" aria-hidden="true">
      <ellipse cx="110" cy="150" rx="104" ry="9" fill="#000" opacity=".45"/>
      <path d="M8 148 L110 18 L212 148Z" fill="${c.cloth}"/>
      <path d="M110 18 L212 148 H150Z" fill="${c.clothShade}"/>
      <path d="M110 18 L8 148 H40Z" fill="${c.clothLight}" opacity=".55"/>
      <path d="M110 40 L76 148 H144Z" fill="${c.door}"/>
      <path d="M110 40 L76 148 L92 148 Q100 96 110 40Z" fill="${c.clothShade}" opacity=".9"/>
      <path d="M110 40 Q124 92 150 132 L144 148 Z" fill="${c.clothLight}" opacity=".8"/>
      <path d="M100 6 L120 34 M120 6 L100 34" stroke="${c.pole}" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 120 L2 150 M190 120 L218 150" stroke="${c.rope}" stroke-width="1.4" opacity=".7"/>
      <path d="M40 104 Q60 100 72 110 M150 110 Q166 98 182 104" stroke="${c.clothShade}" stroke-width="2" fill="none" opacity=".6"/>
      <circle cx="104" cy="96" r="3" fill="#ffd27a" opacity=".8" class="camp-tent-glow"/>
    </svg>`;
  }

  function fire() {
    const f = D().fire;
    const embers = Array.from({ length: D().embers }, (_, i) =>
      `<i class="camp-ember" style="--x:${(i * 37) % 60 - 30}px;--d:${(1.6 + (i % 4) * .45).toFixed(2)}s;animation-delay:calc(var(--cv-t, 0s) - ${(i * .37).toFixed(2)}s)"></i>`).join('');
    return `<div class="camp-fire" style="--f-outer:${f.outer};--f-mid:${f.mid};--f-core:${f.core};--f-glow:${f.glow}">
      <div class="camp-light"></div>
      <svg class="camp-fire-svg" viewBox="0 0 120 110" aria-hidden="true">
        <g class="camp-flames">
          <path class="fl fl1" d="M60 92 C30 86 34 58 46 44 C46 58 54 60 56 50 C58 36 52 26 62 10 C66 30 82 38 80 58 C86 52 86 44 84 40 C96 56 92 88 60 92Z" fill="${f.outer}"/>
          <path class="fl fl2" d="M60 92 C42 88 44 68 52 58 C54 68 60 66 60 58 C62 48 60 42 66 32 C70 48 80 56 76 72 C80 70 80 66 80 62 C86 76 80 90 60 92Z" fill="${f.mid}"/>
          <path class="fl fl3" d="M60 92 C50 90 50 78 56 70 C58 76 62 74 62 68 C64 62 64 58 66 54 C70 64 74 70 72 80 C72 88 66 92 60 92Z" fill="${f.core}"/>
        </g>
        <g>
          <rect x="22" y="86" width="76" height="11" rx="5.5" fill="${f.log}" transform="rotate(-14 60 92)"/>
          <rect x="22" y="86" width="76" height="11" rx="5.5" fill="${f.log}" transform="rotate(14 60 92)"/>
          <circle cx="25" cy="100" r="5" fill="${f.logEnd}" /><circle cx="95" cy="100" r="5" fill="${f.logEnd}"/>
        </g>
        <g fill="${f.stone}">
          <ellipse cx="14" cy="102" rx="11" ry="7"/><ellipse cx="34" cy="106" rx="11" ry="6"/><ellipse cx="60" cy="107" rx="12" ry="6"/>
          <ellipse cx="86" cy="106" rx="11" ry="6"/><ellipse cx="106" cy="102" rx="11" ry="7"/>
        </g>
        <g fill="${f.stoneLight}" opacity=".7">
          <ellipse cx="12" cy="99" rx="5" ry="2.5"/><ellipse cx="58" cy="104" rx="6" ry="2.5"/><ellipse cx="104" cy="99" rx="5" ry="2.5"/>
        </g>
      </svg>
      <div class="camp-embers">${embers}</div>
    </div>`;
  }

  function render(run) {
    const L = D().layout;
    const level = run ? run.levelIndex : 0;
    return `<div class="camp-scene">
      ${Game.UI.caveBackdrop.render(level)}
      <div class="camp-ground"></div>
      <div class="camp-prop" style="left:${L.tent}%">${tent()}</div>
      <div class="camp-prop camp-fire-wrap" style="left:${L.fire}%">${fire()}</div>
      <div class="camp-prop camp-hero" style="left:${L.hero}%">
        ${Game.UI.character.render({ view: 'front', size: D().heroSize, character: run && run.character })}
        <div class="camp-hero-shadow"></div>
      </div>
      <div class="camp-warmth"></div>
    </div>`;
  }

  return { render };
})();
