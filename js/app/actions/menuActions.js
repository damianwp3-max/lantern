// MENU ACTIONS
Object.assign(Game.Actions, {
  // New Run opens the hero select screen first (ui/screens/characterScreen.js, app/actions/characterActions.js).
  newRun() {
    Game.Actions.chooseHero();
  },
  continueRun() {
    if (Game.State.load()) Game.App.go('map');
  },
  quit() {
    // Placeholder: a browser tab can't really quit, so just show a screen.
    Game.App.showMessage('Goodbye', 'Thanks for playing. Your run is saved if one is in progress.', 'Back to menu', 'toMenu');
  },
  toMenu() {
    Game.App.state.combat = null;
    Game.App.go('menu');
  },
  viewDeck() {
    // Opening the deck while already on the deck screen must not overwrite where Back goes.
    if (Game.App.state.screen !== 'deck') Game.App.state.previousScreen = Game.App.state.screen;
    Game.App.go('deck');
  },
  back() {
    const target = Game.App.state.previousScreen;
    // Never "go back" to the deck screen itself (that was the stuck-Back bug).
    Game.App.go(target && target !== 'deck' ? target : 'map');
  },
});
