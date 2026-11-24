// SETTINGS VIEWER: the options window (overlay) opened from the menu or the top bar.
// Options come from data/settingsData.js; clicks call Game.Actions.setSetting (app/actions/settingsActions.js).
Game.UI.viewers = Game.UI.viewers || {};

Game.UI.viewers.settings = function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const S = Game.Settings;
  const rows = Game.SETTINGS_DEF.map(d => {
    const cur = S.get(d.id);
    let control;
    if (d.type === 'slider') {
      control = `<input type="range" class="set-slider" data-setting="${d.id}" min="${d.min}" max="${d.max}" step="${d.step || 1}" value="${cur}"><span class="set-val" data-val-for="${d.id}">${cur}%</span>`;
    } else if (d.type === 'toggle') {
      control = `<button class="set-opt ${cur ? 'on' : ''}" data-action="setSetting" data-arg="${d.id}:${!cur}">${cur ? 'On' : 'Off'}</button>`;
    } else {
      control = d.values.map(v => `<button class="set-opt ${v === cur ? 'on' : ''}" data-action="setSetting" data-arg="${d.id}:${v}">${esc(d.format ? d.format(v) : v)}</button>`).join('');
    }
    return `<div class="set-row"><div class="set-info"><div class="set-label">${esc(d.label)}</div><div class="set-text">${esc(d.text || '')}</div></div><div class="set-ctrl">${control}</div></div>`;
  }).join('');
  const body = `<div class="set-list">${rows}</div>
    <div class="set-foot"><button data-action="practiceTiming">Try the timing</button></div>`;
  Game.UI.overlay.open('Settings', body);
};

// Sliders change their setting live while dragged (no redraw, so the drag isn't lost).
// On release a short click plays, so you hear the new Effects volume.
(function () {
  document.addEventListener('input', e => {
    const el = e.target;
    if (!el.matches || !el.matches('.set-slider')) return;
    const id = el.dataset.setting, value = Number(el.value);
    Game.Settings.set(id, value);
    const label = document.querySelector(`[data-val-for="${id}"]`);
    if (label) label.textContent = value + '%';
  });
  document.addEventListener('change', e => {
    if (e.target.matches && e.target.matches('.set-slider') && Game.Audio) Game.Audio.play('snap');
  });
})();
