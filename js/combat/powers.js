// POWERS (in-fight)
// Card effect: { type: 'power', power: 'id' } adds a stack of a power from
// data/powersData.js to combat.powers ({ id: stacks }). This file listens to
// combat events and runs each power's trigger effects (once per stack).
(function () {
  const { log } = Game.CombatUtil;

  Game.Effects.register('power', function (c, effect) {
    const def = Game.POWERS[effect.power];
    if (!def) return console.warn('Unknown power', effect.power);
    c.powers[effect.power] = (c.powers[effect.power] || 0) + (effect.amount || 1);
    log(c, `Power: ${def.name}.`);
  });
  Game.Effects.power.container = true;

  // Run every trigger of kind `on` that passes `test`.
  function fire(c, on, test) {
    if (!c || c.outcome || !c.powers) return;
    for (const [id, stacks] of Object.entries(c.powers)) {
      const def = Game.POWERS[id];
      for (const t of (def && def.triggers) || []) {
        if (t.on !== on || (test && !test(t))) continue;
        for (let i = 0; i < stacks && !c.outcome; i++) Game.Resolver.runEffects(c, t.effects, {});
      }
    }
  }

  Game.Events.on('combat:start', ({ combat }) => { combat.powers = {}; combat.cardsThisTurn = 0; });
  Game.Events.on('turn:start', ({ combat }) => { combat.cardsThisTurn = 0; fire(combat, 'turnStart'); });
  Game.Events.on('turn:end', ({ combat }) => fire(combat, 'turnEnd'));
  Game.Events.on('card:played', ({ combat, card }) => {
    combat.cardsThisTurn = (combat.cardsThisTurn || 0) + 1;
    const n = combat.cardsThisTurn;
    fire(combat, 'cardPlayed', t => !t.cardType || t.cardType === card.type);
    fire(combat, 'nthCard', t => n % (t.every || 1) === 0);
  });
  Game.Events.on('damage:dealt', ({ combat, target, amount }) => {
    if (!combat || !combat.player) return;
    if (target === combat.player) { if (amount > 0) fire(combat, 'hurt'); return; }
    if (target.ally) return;   // your Bat (combat/bat.js) is not an enemy
    if (target.hp <= 0 && !target._deathSeen) { target._deathSeen = true; fire(combat, 'enemyKilled'); }
  });
})();
