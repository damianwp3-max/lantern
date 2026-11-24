// DELAYED EFFECTS ("next turn ...")
// Card effect: { type: 'nextTurn', effects: [ ...normal effects... ] }
// The inner effects are saved now and run at the start of your next turn,
// after you draw. A delayed hit on "enemy" remembers which enemy you aimed at
// (if it died by then, the current target is used instead).
// combat.delayed is the waiting list; the combat screen shows it as ⏳.
(function () {
  Game.Effects.register('nextTurn', function (c, effect, target, ctx) {
    c.delayed.push({
      effects: effect.effects,
      text: effect.text || '',
      ctx: { defaultTarget: ctx.defaultTarget, targetUid: target ? target.uid : ctx.targetUid },
    });
    Game.CombatUtil.log(c, 'Something will happen next turn...');
  });
  Game.Effects.nextTurn.container = true;

  Game.Events.on('combat:start', ({ combat }) => { combat.delayed = []; });
  Game.Events.on('turn:start', ({ combat }) => {
    const due = combat.delayed || [];
    combat.delayed = [];
    if (due.length) Game.CombatUtil.log(combat, `${due.length} delayed effect${due.length > 1 ? 's' : ''} go off.`);
    due.forEach(d => { if (!combat.outcome) Game.Resolver.runEffects(combat, d.effects, d.ctx); });
  });
})();
