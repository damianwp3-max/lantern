// LANTERN ACTIONS: the permanent upgrade screen in the main menu (lantern/lantern.js).
Object.assign(Game.Actions, {
  viewLantern() { Game.App.go('lantern'); },
  buyLantern(id) { if (Game.Lantern.buy(id)) Game.App.go('lantern'); },
});
