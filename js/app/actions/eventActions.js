// CAVE EVENT ACTIONS: choose an option, then continue (caveEvents/caveEvents.js).
Object.assign(Game.Actions, {
  eventChoose(i) {
    const { state, go } = Game.App;
    const ev = state.caveEvent, run = Game.State.run;
    if (!ev || ev.result) return;
    const option = Game.CAVE_EVENTS[ev.id].options[Number(i)];
    if (!option || !Game.CaveEvents.availability(run, option).ok) return;
    ev.picked = option.label;
    Game.CaveEvents.run(run, option, lines => {
      ev.result = lines;
      Game.State.save();
      go('event');
    });
  },
  eventContinue() {
    Game.App.state.caveEvent = null;
    Game.App.finishNode();
  },
});
