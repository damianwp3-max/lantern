// VIEWER ACTIONS: open the pile viewers and the active-effects list (ui/viewers/*.js).
Object.assign(Game.Actions, {
  showPile(which) {
    const c = Game.App.state.combat;
    if (c) Game.UI.viewers.pile(c, which);
  },
  showPowers() {
    const c = Game.App.state.combat;
    if (c) Game.UI.viewers.powers(c);
  },
});
