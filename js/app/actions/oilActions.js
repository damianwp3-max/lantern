// OIL ACTIONS: the Flare in a fight (key F).
Object.assign(Game.Actions, {
  flare() {
    const { state, go } = Game.App;
    const c = state.combat;
    if (!c || (Game.Juice && Game.Juice.busy) || !Game.Oil.flare(c)) return;
    state.fx = { deal: false, flare: true };
    go('combat');
  },
});
