// MAIN MENU SCREEN
Game.UI.registerScreen('menu', function () {
  const { button } = Game.UI.components;
  return `<div class="center menu-screen"><div class="menu-panel">
    <h1>Lantern Descent</h1>
    <p class="muted menu-tag">A roguelike deck builder</p>
    <div class="menu-emblem">${Game.UI.topBar.icon('lantern')}</div>
    <div class="stack">
      ${button('New Run', 'newRun')}
      ${button('Continue', 'continueRun', undefined, !Game.State.hasSave())}
      ${Game.State.hasSave() ? button('Leave the cave', 'askLeaveRun') : ''}
      ${button('Card Library', 'viewLibrary')}
      ${Game.UI.unlocksView ? button('Unlocks', 'viewUnlocks') : ''}
      ${button(`Lantern (${Game.Lantern.embers()} embers)`, 'viewLantern')}
      ${button('Settings', 'showSettings')}
      ${button('Quit', 'quit')}
    </div>
    ${Game.UI.unlocksView ? Game.UI.unlocksView.menuLine() : ''}
  </div></div>
  ${Game.UI.coopPanel ? Game.UI.coopPanel.html() : ''}`;   // 2-player co-op: create / join a lobby (ui/coop/lobbyScreens.js)
});
