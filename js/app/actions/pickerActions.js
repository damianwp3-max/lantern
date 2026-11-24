// PICKER ACTIONS: choosing a card (and a piercing) from your deck (picker/picker.js).
Object.assign(Game.Actions, {
  pickPiercing(id) {
    const p = Game.App.state.picker;
    if (!p || p.mode !== 'pierce' || !p.offers.includes(id)) return;
    p.piercing = id;
    p.selected = null;
    Game.App.go('picker');
  },
  pickCard(index) {
    const p = Game.App.state.picker;
    index = Number(index);
    if (!p || !Game.Picker.eligible(p, Game.State.run.deck[index])) return;
    p.selected = p.selected === index ? null : index;
    Game.App.go('picker');
  },
  pickConfirm() {
    const p = Game.App.state.picker;
    const msg = Game.Picker.confirm();
    if (msg !== null && p && p.onDone) p.onDone(msg);
  },
  pickCancel() {
    const p = Game.App.state.picker;
    Game.App.state.picker = null;
    if (p && p.onCancel) p.onCancel();
  },
});
