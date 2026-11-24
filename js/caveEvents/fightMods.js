// FIGHT MODS: effects that last for the next few fights (usually from cave events).
// run.fightMods = [{ text, fights, strength?, block?, energy?, draw?, enemyHpMult?, hp? }]
//   strength    + strength for the fight
//   block       block at the start of the fight
//   energy      + energy on the first turn
//   draw        + cards drawn on the first turn
//   enemyHpMult enemies start with that much more (or less) HP (1.25 = +25%)
//   hp          HP change at the start of the fight (negative = you lose HP)
// Each mod counts down by one every time you win a fight and disappears at 0.
// Game.FightMods.add(run, mod) / list(run)
Game.FightMods = (function () {
  const list = run => (run && run.fightMods) || [];
  function add(run, mod) { run.fightMods = list(run).concat(Object.assign({ fights: 1 }, mod)); }

  Game.Events.on('combat:start', ({ combat }) => {
    const run = Game.State.run;
    list(run).forEach(m => {
      if (m.strength) combat.player.strength += m.strength;
      if (m.enemyHpMult) combat.enemies.forEach(e => { e.maxHp = Math.round(e.maxHp * m.enemyHpMult); e.hp = e.maxHp; });
      if (m.hp) combat.player.hp = Math.max(1, Math.min(combat.player.maxHp, combat.player.hp + m.hp));
    });
  });
  Game.Events.on('turn:start', ({ combat }) => {
    if (combat.turn !== 1) return;
    list(Game.State.run).forEach(m => {
      if (m.block) combat.player.block += m.block;
      if (m.energy) combat.player.energy += m.energy;
      if (m.draw) Game.Combat.draw(combat, m.draw);
    });
  });
  Game.Events.on('combat:end', ({ outcome }) => {
    if (outcome !== 'win') return;
    const run = Game.State.run;
    if (!run) return;
    run.fightMods = list(run).map(m => Object.assign({}, m, { fights: m.fights - 1 })).filter(m => m.fights > 0);
  });

  return { add, list };
})();
