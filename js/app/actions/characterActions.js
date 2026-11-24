// HERO SELECT ACTIONS: open the select screen, pick a hero, start the run with her.
Object.assign(Game.Actions, {
  chooseHero() {
    const s = Game.App.state;
    if (!Game.CHARACTERS[s.pickedHero]) s.pickedHero = Game.CHARACTER_DEFAULT;
    Game.App.go('characters');
  },
  pickHero(id) {
    if (!Game.CHARACTERS[id]) return;
    Game.App.state.pickedHero = id;
    Game.App.go('characters');
  },
  startRun(id) {
    Game.State.newRun(Game.CHARACTERS[id] ? id : Game.CHARACTER_DEFAULT);
    Game.App.go('map');
  },
});
