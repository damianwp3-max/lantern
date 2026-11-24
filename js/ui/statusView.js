// STATUS / POWER / DELAYED ICONS
// Small icon rows for the combat screen. Hover an icon for a full description
// (ui/tooltip.js + ui/tipText.js build it from the data files).
//   Game.UI.statusView.statuses(unit)   poison, weak, ... on an enemy or you
//   Game.UI.statusView.strength(n)      your strength as a chip
//   Game.UI.statusView.powers(combat)   your active powers (x stacks); click opens the list
//   Game.UI.statusView.delayed(combat)  how many "next turn" effects are waiting
// Pictures are SVG from ui/statusIcons.js. Debuffs get a red-ringed badge so they stand out.
Game.UI.statusView = (function () {
  const icon = (id, color) => Game.UI.statusIcons.render(id, 20, color);
  const chip = (cls, pic, n, tip, color, action) =>
    `<span class="st-chip ${cls}" data-tip="${tip}"${action ? ` data-action="${action}"` : ''}${color ? ` style="--st:${color}"` : ''}><span class="st-pic">${pic}</span>${n > 1 || cls.includes('st-status') || cls.includes('st-str') ? `<b>${n}</b>` : ''}</span>`;

  function statusChips(unit) {
    const s = (unit && unit.statuses) || {};
    return Object.entries(s).filter(([, n]) => n > 0).map(([id, n]) => {
      const def = Game.STATUSES[id] || { icon: '?' };
      return chip(`st-status st-${id} st-${def.kind || 'debuff'}`, icon(id), n, `status:${id}:${n}`, def.color);
    }).join('');
  }

  function statuses(unit) {
    const html = statusChips(unit);
    return html ? `<div class="st-row">${html}</div>` : '';
  }

  function strength(n) {
    return n ? chip('st-str st-buff', icon('strength', '#ff9a3c'), n, `strength:${n}`, '#ff9a3c') : '';
  }

  function powerChips(c) {
    return Object.entries(c.powers || {}).map(([id, n]) => {
      const def = Game.POWERS[id] || { icon: '?' };
      return chip('st-power', def.icon, n, `power:${id}:${n}`, null, 'showPowers');
    }).join('');
  }

  function powers(c) {
    const html = powerChips(c);
    return html ? `<div class="st-row">${html}</div>` : '';
  }

  function delayedChip(c) {
    const n = (c.delayed || []).length;
    return n ? chip('st-delayed', icon('delayed', '#7fd6c2'), n, 'delayed', null) : '';
  }

  function delayed(c) {
    const html = delayedChip(c);
    return html ? `<div class="st-row">${html}</div>` : '';
  }

  return { statuses, statusChips, strength, powers, powerChips, delayed, delayedChip };
})();
