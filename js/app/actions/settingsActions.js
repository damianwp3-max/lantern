// SETTINGS ACTIONS: open the window, change an option, try the timing bar.
Object.assign(Game.Actions, {
  showSettings() { Game.UI.viewers.settings(); },

  // arg is "id:value" (value is a number, true or false).
  setSetting(arg) {
    const i = arg.indexOf(':');
    const id = arg.slice(0, i), raw = arg.slice(i + 1);
    const value = raw === 'true' ? true : raw === 'false' ? false : isNaN(Number(raw)) ? raw : Number(raw);   // text values: language codes
    Game.Settings.set(id, value);
    Game.UI.viewers.settings();   // redraw with the new value
  },

  practiceTiming() {
    Game.UI.overlay.close();
    Game.UI.timing.practice(() => Game.UI.viewers.settings());
  },
});
