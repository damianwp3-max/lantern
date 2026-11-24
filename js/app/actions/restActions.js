// REST ACTIONS: at a rest site the player picks ONE thing: heal, or learn a passive.
Object.assign(Game.Actions, {
  restHeal() {
    const run = Game.State.run;
    run.hp = Math.min(run.maxHp, run.hp + Game.Rest.healAmount(run));
    Game.App.finishNode();
  },
  restOil() {
    Game.Oil.gain(Game.State.run, Game.OIL.restRefill);
    Game.App.finishNode();
  },
  restPassive(id) {
    if (!Game.App.state.restChoices.includes(id)) return;
    Game.Passives.gain(Game.State.run, id);
    Game.App.finishNode();
  },
});
