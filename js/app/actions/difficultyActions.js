// DIFFICULTY ACTIONS: pick a mode on the hero select screen (kept for the next runs too).
Object.assign(Game.Actions, {
  pickDifficulty(id) {
    Game.Difficulty.choose(id);
    Game.App.go('characters');
  },
});
