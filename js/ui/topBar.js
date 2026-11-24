// TOP BAR
// The strip at the top of the map, fight, rest, reward and deck screens.
// Left to right: where you are (level + floor progress), oil, deck, gold,
// passives, then the Settings and Menu buttons.
// Each block has an icon, a big number and a small label, and a hover tip
// (data-tip="topbar:<part>", text in ui/tipText.js).
//   Game.UI.topBar.render(run) -> HTML
// Styles: css/topbar.css. New block = one more entry in the blocks() list.
Game.UI = Game.UI || {};

Game.UI.topBar = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  // Small SVG icons (24 x 24), no emoji.
  const ICONS = {
    heart: '<path d="M12 21 C4 15 2.5 11.5 2.5 8.5 A4.8 4.8 0 0 1 12 6.2 A4.8 4.8 0 0 1 21.5 8.5 C21.5 11.5 20 15 12 21Z" fill="currentColor"/><path d="M6.5 7.4 Q7.6 5.8 9.4 6" stroke="#fff" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".6"/>',
    deck: '<rect x="7.5" y="3" width="12" height="16" rx="2" fill="currentColor" opacity=".45" transform="rotate(10 13 11)"/><rect x="4.5" y="4.5" width="12" height="16" rx="2" fill="#16131b" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 9 L12.5 12.5 L10.5 16 L8.5 12.5Z" fill="currentColor"/>',
    swords: '<path d="M4 4 L13 13 M20 4 L11 13" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M8 17 L4.5 20.5 M16 17 L19.5 20.5 M6.5 14.5 L9.5 17.5 M17.5 14.5 L14.5 17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    hourglass: '<path d="M6 3 H18 M6 21 H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7.5 3.5 Q7.5 9 12 12 Q16.5 9 16.5 3.5Z M7.5 20.5 Q7.5 15 12 12 Q16.5 15 16.5 20.5Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 19.5 Q12 16 14.5 19.5Z" fill="currentColor"/>',
    gear: '<path d="M12 2.5 L13.8 2.8 L14.3 5.4 L16.4 6.4 L18.6 4.9 L20.1 6.4 L18.6 8.6 L19.6 10.7 L22.2 11.2 L22.2 13.3 L19.6 13.8 L18.6 15.9 L20.1 18.1 L18.6 19.6 L16.4 18.1 L14.3 19.1 L13.8 21.7 L11.7 21.7 L11.2 19.1 L9.1 18.1 L6.9 19.6 L5.4 18.1 L6.9 15.9 L5.9 13.8 L3.3 13.3 L3.3 11.2 L5.9 10.7 L6.9 8.6 L5.4 6.4 L6.9 4.9 L9.1 6.4 L11.2 5.4 L11.7 2.8Z" fill="currentColor" transform="translate(-0.75 -0.2)"/><circle cx="12" cy="12" r="3.4" fill="#16131b"/>',
    menu: '<path d="M4 6.5 H20 M4 12 H20 M4 17.5 H20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    coin: '<circle cx="12" cy="12" r="9" fill="currentColor" opacity=".25"/><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6.5 V17.5 M9 9.2 Q9 7.8 12 7.8 Q15 7.8 15 9.8 Q15 11.6 12 12 Q9 12.4 9 14.4 Q9 16.4 12 16.4 Q15 16.4 15 14.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    oil: '<path d="M12 2.5 C12 2.5 5.5 10 5.5 14.5 A6.5 6.5 0 0 0 18.5 14.5 C18.5 10 12 2.5 12 2.5Z" fill="currentColor" opacity=".9"/><path d="M8.6 14.6 Q8.8 17.4 11.4 18.2" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".55"/>',
    lantern: '<path d="M12 1.5 V4" stroke="currentColor" stroke-width="1.6"/><path d="M8 4 H16 L17 7 H7Z" fill="currentColor"/><rect x="7.5" y="7" width="9" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 9.5 Q14.4 12.5 12 16 Q9.6 12.5 12 9.5Z" fill="#ffd35a"/><path d="M7 18 H17 L16 21 H8Z" fill="currentColor"/>',
  };
  const icon = (name, cls = '') => `<svg class="tb-ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

  // Where you are: level badge, level name, and one pip per map row (boss last).
  function locationBlock(run) {
    const level = Game.LEVELS[run.levelIndex];
    const rows = (run.map && run.map.rows) ? run.map.rows.length : level.rows.length;
    const cleared = Math.max(0, (run.row == null ? -1 : run.row) + 1);
    const pips = Array.from({ length: rows }, (_, i) => {
      const cls = i < cleared ? 'done' : i === cleared ? 'now' : '';
      return `<i class="tb-pip ${cls} ${i === rows - 1 ? 'boss' : ''}"></i>`;
    }).join('');
    return `<div class="tb-block tb-where" data-tip="topbar:where">
      <div class="tb-depth">${icon('lantern')}<span><b>${run.levelIndex + 1}</b><small>/${Game.LEVELS.length}</small></span></div>
      <div class="tb-where-text">
        <span class="tb-level-name">${esc(level.name)}</span>
        <span class="tb-floor"><span class="tb-pips">${pips}</span><small>Floor ${Math.min(cleared + 1, rows)} of ${rows}</small></span>
      </div>
    </div>`;
  }

  function hpBlock(run) {
    const pct = Math.max(0, Math.min(100, Math.round(100 * run.hp / run.maxHp)));
    const state = pct <= 30 ? 'low' : pct <= 60 ? 'mid' : 'high';
    return `<div class="tb-block tb-stat tb-hp hp-${state}" data-tip="topbar:hp">
      ${icon('heart')}
      <div class="tb-val"><span class="tb-num">${run.hp}<small>/${run.maxHp}</small></span>
        <span class="tb-meter"><i style="width:${pct}%"></i></span></div>
    </div>`;
  }

  // Lantern oil: drop icon, number and a small meter. Turns red at 0 (the lantern is dark).
  function oilBlock(run) {
    const pct = Math.max(0, Math.min(100, Math.round(100 * run.oil / run.maxOil)));
    return `<div class="tb-block tb-stat tb-oil ${run.oil <= 0 ? 'dark' : pct <= 30 ? 'low' : ''}" data-tip="topbar:oil">
      ${icon('oil')}
      <div class="tb-val"><span class="tb-num">${run.oil}<small>/${run.maxOil}</small></span><span class="tb-meter"><i style="width:${pct}%"></i></span></div>
    </div>`;
  }

  const stat = (part, ico, num, label, action) =>
    `<${action ? 'button' : 'div'} class="tb-block tb-stat tb-${part}" data-tip="topbar:${part}"${action ? ` data-action="${action}"` : ''}>
      ${icon(ico)}<div class="tb-val"><span class="tb-num">${num}</span><span class="tb-label">${label}</span></div>
    </${action ? 'button' : 'div'}>`;

  // Order (kupka's spec): stage, oil, deck, gold. HP lives on your nameplate in a fight,
  // and the turn counter sits inside the End Turn button (ui/combatHud.js).
  function blocks(run) {
    return [
      locationBlock(run),
      oilBlock(run),
      stat('deck', 'deck', run.deck.length, 'Deck', 'viewDeck'),
      stat('gold', 'coin', run.gold || 0, 'Gold'),
    ].join('');
  }

  function render(run) {
    const passives = Game.UI.components.passiveIcons(run);
    const totems = Game.UI.components.totemIcons(run);
    const mods = (run.fightMods || []).length;
    return `<div class="bar topbar">
      <div class="tb-left">${blocks(run)}
        ${mods ? `<div class="tb-block tb-mods" data-tip="mods"><span class="tb-num">⏳ ${mods}</span><span class="tb-label">Lasting</span></div>` : ''}
        ${totems ? `<div class="tb-block tb-passives"><span class="tb-label">Totems</span>${totems}</div>` : ''}
        ${passives ? `<div class="tb-block tb-passives"><span class="tb-label">Passives</span>${passives}</div>` : ''}</div>
      <div class="tb-right">
        <button class="tb-btn" data-action="showSettings" data-tip="topbar:settings">${icon('gear')}<span>Settings</span></button>
        <button class="tb-btn" data-action="toMenu" data-tip="topbar:menu">${icon('menu')}<span>Menu</span></button>
      </div>
    </div>`;
  }

  return { render, icon };
})();
