// UI RENDERER
// Screens are registered by name (see ui/screens/*.js). A screen is a
// function (app) -> HTML string. To add a screen (shop, event, ...), create a
// file that calls Game.UI.registerScreen('shop', fn) and load it in index.html.
Game.UI = Game.UI || {};
Game.UI.screens = {};
Game.UI.registerScreen = function (name, fn) { Game.UI.screens[name] = fn; };

Game.UI.render = function (app) {
  const el = document.getElementById('app');
  el.innerHTML = Game.UI.screens[app.screen](app);
  // Re-trigger the fade-in only when the screen actually changed.
  el.className = app.fx && app.fx.screenChanged ? 'fade' : '';
  // Effects modules (ui/juice/*.js) listen to this to animate what just changed.
  Game.Events.emit('ui:rendered', { screen: app.screen, fx: app.fx || {}, app });
  app.fx = null;   // one-shot effects play once
};
