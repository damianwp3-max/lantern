// SETTINGS (storage)
// Player options (data/settingsData.js) kept in localStorage, separate from the run save.
//   Game.Settings.get(id)   current value (or the default)
//   Game.Settings.set(id, value)
// Emits 'settings:changed' { id, value }.
Game.Settings = (function () {
  const KEY = 'lantern_descent_settings_v1';
  let values = {};
  try { values = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { values = {}; }

  const def = id => (Game.SETTINGS_DEF || []).find(d => d.id === id);

  function get(id) {
    if (values[id] !== undefined) return values[id];
    const d = def(id);
    return d ? d.default : undefined;
  }

  function set(id, value) {
    values[id] = value;
    try { localStorage.setItem(KEY, JSON.stringify(values)); } catch (e) { /* storage may be blocked */ }
    Game.Events.emit('settings:changed', { id, value });
  }

  return { get, set, def };
})();
