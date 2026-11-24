// APP: current screen and shared flow helpers
// Holds which screen is showing plus the temporary UI state (current combat,
// reward choices, ...). Actions (app/actions/*.js) change state and call go().
// Flow: menu -> map -> (fight -> reward | rest) -> map -> ... -> boss -> next level -> ... -> victory
Game.Actions = {};   // filled by app/actions/*.js, looked up by name from data-action

Game.App = (function () {
  const state = {
    screen: 'menu',
    previousScreen: null,
    combat: null,
    currentNode: null,
    rewardChoices: [],
    runEnd: null,         // { summary, award, opened } for the end-of-run screen
    restChoices: [],      // passive ids offered at the current rest site
    message: null,
    fx: null,
    selectedCard: null,   // hand index picked by click, waiting for an enemy click
  };

  function go(screen) {
    state.fx = Object.assign(state.fx || {}, { screenChanged: screen !== state.screen });
    state.screen = screen;
    Game.UI.render(state);
  }

  // extra (optional): a second button { label, action } shown under the first (e.g. "Leave the cave").
  function showMessage(title, text, buttonLabel, buttonAction, extra) {
    state.message = { title, text, buttonLabel, buttonAction, extra: extra || null };
    go('message');
  }

  // Called when the player finishes any node (fight won, rest taken, ...).
  function finishNode() {
    const run = Game.State.run;
    const node = state.currentNode;
    Game.Map.complete(run, node);
    state.currentNode = null;
    state.combat = null;
    Game.State.save();
    Game.Events.emit('node:complete', { node });

    if (!Game.Map.isLevelDone(run)) return go('map');
    if (Game.State.isFinalLevel()) return Game.App.showRunEnd(true);   // stats + card packs (app/actions/runEndActions.js)
    const next = Game.LEVELS[run.levelIndex + 1];
    // After a level (and its boss) you may also climb out with what you have (app/actions/leaveRunActions.js).
    showMessage('Level cleared', `Next: ${next.name}.`, 'Descend', 'nextLevel', { label: 'Leave the cave', action: 'askLeaveRun' });
  }

  // actions is an alias kept for console debugging and tests.
  return { state, go, showMessage, finishNode, actions: Game.Actions };
})();
