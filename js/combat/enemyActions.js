// ENEMY ACTIONS (rules side of the visuals)
// Remembers what each enemy did during the enemy phase, so the screen can show it:
//   combat.enemyActs = [{ uid, kinds: ['attack', 'block', ...] }]
// Kinds come from Game.ENEMY_ACTION_FX (data/enemyActionsData.js). The UI
// (ui/juice/enemyActionFx.js) plays them after the next draw, then empties the list.
(function () {
  const D = () => Game.ENEMY_ACTION_FX;
  Game.Events.on('turn:end', ({ combat }) => { combat.enemyActs = []; });
  Game.Events.on('enemy:acted', ({ combat: c, enemy, move }) => {
    const kinds = [];
    const main = D().moveKinds[move.type];
    if (main) kinds.push(main);
    if (move.selfBlock && !kinds.includes('block')) kinds.push('block');
    if (!kinds.length) return;
    const act = { uid: enemy.uid, kinds };
    if (move.type === 'addCard') act.junk = { card: move.card, n: move.value, to: move.to || 'discard' };   // ui/juice/junkFx.js
    (c.enemyActs = c.enemyActs || []).push(act);
  });
})();
