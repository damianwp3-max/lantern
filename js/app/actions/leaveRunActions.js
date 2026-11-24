// LEAVE THE CAVE (actions): give up the run on purpose and keep what you earned.
//   askLeaveRun    asks "are you sure?" (reachable from the main menu while a run is saved,
//                  and from the "Level cleared" screen after a boss)
//   leaveRun       ends the run like a defeat for scoring, but nothing is lost:
//                  embers for fights and bosses (lantern/lantern.js on 'run:end'), explorer XP and
//                  card packs were already banked (unlocks/, packs/), and the end screen shows them.
//   keepGoing      back to where you were (map, or the Level cleared screen)
// The end screen says "You left the cave" instead of "Defeat" (ui/screens/runEndScreen.js).
(function () {
  const A = Game.Actions;

  Object.assign(A, {
    askLeaveRun() {
      if (!Game.State.run && !Game.State.load()) return;
      Game.App.showMessage('Leave the cave?',
        'The run ends here. Embers, experience and card packs you earned are kept.', 'Leave the cave', 'leaveRun',
        { label: 'Keep exploring', action: 'keepGoing' });
    },
    leaveRun() {
      if (!Game.State.run && !Game.State.load()) return;
      Game.App.showRunEnd(false, { left: true });
    },
    keepGoing() {
      if (!Game.State.run) Game.State.load();
      const run = Game.State.run;
      if (run && Game.Map.isLevelDone(run) && !Game.State.isFinalLevel()) {
        const next = Game.LEVELS[run.levelIndex + 1];
        return Game.App.showMessage('Level cleared', `Next: ${next.name}.`, 'Descend', 'nextLevel', { label: 'Leave the cave', action: 'askLeaveRun' });
      }
      Game.App.go(run ? 'map' : 'menu');
    },
  });
})();
