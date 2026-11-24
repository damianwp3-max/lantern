// RUN END ACTIONS (victory or defeat -> end-of-run screen with stats and card packs)
//   Game.App.showRunEnd(won)   counts the score, ends the run (embers are paid out by
//                              lantern/lantern.js on 'run:end') and opens the 'runEnd' screen
//   openPack(uid)              plays the opening (ui/packs/packOpening.js), then redraws the screen
// Screen: ui/screens/runEndScreen.js. Packs: packs/cardPacks.js.
(function () {
  const A = Game.Actions;

  // opts.left: you climbed out on purpose (app/actions/leaveRunActions.js): same payout as a defeat, kinder words.
  Game.App.showRunEnd = function (won, opts) {
    const { state, go } = Game.App;
    const run = Game.State.run;
    const summary = Game.RunScore.summary(run, won);
    if (opts && opts.left) {   // you stopped on a cleared floor, you did not fall on the next one
      const D = summary.depth, floor = Math.max(0, Math.min(D.floors, (run.row == null ? -1 : run.row) + 1));
      D.reached += floor - D.floor; D.floor = floor; D.pct = Math.round(100 * D.reached / D.total);
    }
    Game.State.endRun(won);
    state.combat = null;
    state.runEnd = { summary, award: Game.Lantern.lastAward, opened: 0, animate: true, left: !!(opts && opts.left) };
    go('runEnd');
  };

  Object.assign(A, {
    openPack(uid) {
      const { state, go } = Game.App;
      if ((Game.Juice && Game.Juice.busy) || !Game.UI.packOpening || Game.UI.packOpening.isOpen()) return;
      const pack = Game.Packs.get(uid);
      if (!pack) return;
      const el = document.querySelector(`.pack-hand .pack[data-arg="${uid}"]`);
      Game.UI.packOpening.play(pack, el, () => {
        Game.Packs.open(uid);
        if (state.runEnd) { state.runEnd.opened += 1; state.runEnd.animate = false; }
        if (state.screen === 'runEnd') go('runEnd');
      });
    },
  });
})();
