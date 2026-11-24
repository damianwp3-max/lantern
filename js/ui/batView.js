// BAT VIEW (UI)
// Draws the Lamplighter's Bat (combat/bat.js) beside her on the battlefield:
// an SVG bat that flaps and bobs, with its own HP bar and block badge.
// It is added after the combat screen draws ('ui:rendered'), so the combat
// screen needs no changes. Hits, its bite and its fall are animated here.
// Styles: css/bat.css. Tooltip: data-tip="bat" (ui/heroTips.js).
Game.UI = Game.UI || {};

Game.UI.batView = (function () {
  const J = () => Game.Juice;
  let seen = null;      // { combat, hp, dead } what was drawn last time
  let bites = [];       // enemy uids bitten since the last draw

  const SVG = `<svg class="bat-svg" viewBox="0 0 120 72" aria-hidden="true">
    <defs>
      <radialGradient id="batBody" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#5a3a5e"/><stop offset="1" stop-color="#22142a"/></radialGradient>
      <linearGradient id="batWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a2340"/><stop offset="1" stop-color="#170c1c"/></linearGradient>
    </defs>
    <g class="bat-wing bw-l">
      <path d="M54 32 C44 14 24 6 4 14 C11 18 13 23 11 30 C18 27 23 29 25 36 C30 31 36 32 38 39 C43 34 49 35 55 41Z" fill="url(#batWing)" stroke="#0c0610" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M53 33 L11 30 M53 34 L25 36 M53 36 L38 39 M52 31 L22 12" stroke="#7a4a7e" stroke-width=".9" fill="none" opacity=".7"/>
    </g>
    <g transform="translate(120 0) scale(-1 1)"><g class="bat-wing bw-r">
      <path d="M54 32 C44 14 24 6 4 14 C11 18 13 23 11 30 C18 27 23 29 25 36 C30 31 36 32 38 39 C43 34 49 35 55 41Z" fill="url(#batWing)" stroke="#0c0610" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M53 33 L11 30 M53 34 L25 36 M53 36 L38 39 M52 31 L22 12" stroke="#7a4a7e" stroke-width=".9" fill="none" opacity=".7"/>
    </g></g>
    <path d="M52 20 L49 8 L57 17Z M68 20 L71 8 L63 17Z" fill="#3a2340" stroke="#0c0610" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M51.5 16 L50.5 11 L54.5 15Z M68.5 16 L69.5 11 L65.5 15Z" fill="#c0304a" opacity=".7"/>
    <ellipse cx="60" cy="42" rx="10" ry="13" fill="url(#batBody)" stroke="#0c0610" stroke-width="1.6"/>
    <path d="M55 37 Q60 41 65 37 M55.5 42 Q60 46 64.5 42" stroke="#7a4a7e" stroke-width="1" fill="none" opacity=".6"/>
    <circle cx="60" cy="25" r="10" fill="url(#batBody)" stroke="#0c0610" stroke-width="1.6"/>
    <ellipse cx="60" cy="29" rx="4" ry="2.6" fill="#4a2c4e"/>
    <g class="bat-eyes"><ellipse cx="55.5" cy="23.5" rx="2.6" ry="2.2" fill="#ff2a40"/><ellipse cx="64.5" cy="23.5" rx="2.6" ry="2.2" fill="#ff2a40"/>
      <circle cx="56.2" cy="22.8" r=".8" fill="#fff"/><circle cx="65.2" cy="22.8" r=".8" fill="#fff"/></g>
    <path d="M57 31 L58 34.5 L59 31Z M61 31 L62 34.5 L63 31Z" fill="#fff6f0"/>
    <path d="M55 54 L54 58 M58 55 L58 59 M62 55 L62 59 M65 54 L66 58" stroke="#22142a" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;

  function html(c, bat, dying) {
    const H = Game.UI.combatHud;
    const over = bat.hp > bat.maxHp;
    const blk = bat.block ? `<span class="blk-badge" data-tip="block:${bat.block}"><b>${bat.block}</b></span>` : '';
    // Negative delays keep the idle loops smooth across re-draws.
    const t = performance.now();
    return `<div class="bat-unit ${dying ? 'dying' : ''}" data-tip="bat" style="--bob-d:-${(t % 2400) | 0}ms;--flap-d:-${(t % 360) | 0}ms">
      <div class="bat-glow"></div>
      <div class="bat-fly">${SVG}</div>
      <div class="bat-plate ${over ? 'overheal' : ''}">
        <span class="bat-name">${Game.t(Game.BAT.name)}</span>
        <div class="pl-bar">${blk}${H.hpBar(Math.max(0, bat.hp), bat.maxHp, 'bat-hp')}</div>
      </div>
    </div>`;
  }

  function draw(app) {
    const c = app.combat;
    const side = document.querySelector('.near-side');
    if (!c || !side) return;
    if (!seen || seen.combat !== c) seen = { combat: c, hp: null, dead: false };
    const bat = c.bat;
    if (!bat) { seen.hp = null; seen.dead = false; bites = []; return; }
    const justDied = bat.hp <= 0 && !seen.dead && seen.hp !== null;
    if (bat.hp <= 0 && !justDied) { seen.dead = true; bites = []; return; }
    const fresh = seen.hp === null || seen.dead;   // just summoned (or summoned again)
    side.insertAdjacentHTML('beforeend', html(c, bat, justDied));
    const el = side.querySelector('.bat-unit');
    const fly = el.querySelector('.bat-fly');
    if (fresh) {
      el.classList.add('summoned');
      if (J()) setTimeout(() => J().burstAt(fly, { count: 22, color: ['#c0304a', '#5a3a5e', '#ff8a9a'], speed: 80, size: 7 }), 60);
    }
    // Its bite: dash to the enemy and back.
    const bitten = bites.length && document.querySelector(`.enemy[data-arg="${bites[bites.length - 1]}"] .sprite`);
    if (bitten && !justDied) {
      const a = fly.getBoundingClientRect(), b = bitten.getBoundingClientRect();
      const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
      fly.animate([{ translate: '0 0' }, { translate: `${dx * .9}px ${dy * .9}px`, offset: .45 }, { translate: `${dx * .9}px ${dy * .9}px`, offset: .55 }, { translate: '0 0' }],
        { duration: 520, easing: 'cubic-bezier(.5,0,.3,1)' });
    }
    // Took a hit: shake + number.
    if (seen.hp !== null && bat.hp < seen.hp && !seen.dead) {
      el.classList.add('hit');
      if (J()) { const lost = seen.hp - Math.max(0, bat.hp); setTimeout(() => { if (document.body.contains(fly)) { const p = J().center(fly); J().floatText(p.x, p.y - 20, `-${lost}`, ''); } }, 700); }
    }
    if (justDied) {
      if (J()) setTimeout(() => J().burstAt(fly, { count: 30, color: ['#c0304a', '#3a2340', '#ff6a7a'], speed: 110, size: 8, ms: 800 }), 150);
      seen.dead = true;
    }
    seen.hp = bat.hp;
    bites = [];
  }

  Game.Events.on('bat:attack', ({ enemy }) => bites.push(enemy.uid));
  Game.Events.on('bat:summoned', () => { if (seen) { seen.hp = null; seen.dead = false; } });
  Game.Events.on('ui:rendered', ({ screen, app }) => { if (screen === 'combat') draw(app); });

  return { draw };
})();
