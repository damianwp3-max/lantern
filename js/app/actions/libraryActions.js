// CARD LIBRARY ACTIONS (ui/screens/libraryScreen.js)
Object.assign(Game.Actions, {
  viewLibrary() {
    const s = Game.App.state;
    if (s.screen !== 'library') s.libraryFrom = s.screen;
    s.library = s.library || { type: 'all', upgraded: false };
    Game.App.go('library');
  },
  libraryTab(type) { Game.App.state.library.type = type; Game.App.go('library'); },
  libraryUpgraded() { const l = Game.App.state.library; l.upgraded = !l.upgraded; Game.App.go('library'); },
  libraryBack() { Game.App.go(Game.App.state.libraryFrom || 'menu'); },
});
