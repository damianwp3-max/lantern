// HERO CARD EFFECTS (rules for effect types the hero kits use)
//   { type: 'damageHealOnKill', amount: 10 }   deal damage; if it kills, heal the HP of damage it dealt
//   { type: 'extraTurn', amount: 1 }           take another turn before enemies act (combat.js reads c.extraTurns)
// Healing goes through combat/healing.js. New hero effect = one more register() here.
(function () {
  const { log } = Game.CombatUtil;

  Game.Effects.register('damageHealOnKill', function (c, effect, target, ctx) {
    if (!target || target.hp <= 0) return;
    const before = target.hp;
    Game.Effects.damage(c, { type: 'damage', amount: effect.amount }, target, ctx);
    const dealt = before - target.hp;
    if (target.hp <= 0 && dealt > 0) {
      log(c, `${target.name} is drained dry.`);
      Game.Healing.heal(c, c.player, dealt);
    }
  });

  Game.Effects.register('extraTurn', function (c, effect) {
    c.extraTurns = (c.extraTurns || 0) + (effect.amount || 1);
    log(c, 'You will act again before the enemies do.');
  });

  Game.Events.on('combat:start', ({ combat }) => { combat.extraTurns = 0; });
})();
