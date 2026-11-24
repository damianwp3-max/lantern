// ENEMY AI (rules; settings in data/enemyAIData.js)
// Picks each enemy's NEXT move in advance, so it can be shown as the intent.
//   Game.EnemyAI.current(enemy)      the move it will make this enemy turn
//   Game.EnemyAI.advance(c, enemy)   after it acted: roll the following move
//   Game.EnemyAI.roleOf(move)
// combat.js calls these; enemies keep { step, nextMove, lastMove, lastBuff } on themselves.
Game.EnemyAI = (function () {
  const S = () => Game.ENEMY_AI;

  function roleOf(m) {
    if (m.role) return m.role;
    if (m.type === 'attack') return 'attack';
    if (m.type === 'block') return 'block';
    if (m.type === 'buff') return 'buff';
    return 'debuff';
  }

  const movesOf = enemy => Game.ENEMIES[enemy.id].moves;

  function pickOfRole(enemy, role) {
    const list = movesOf(enemy).map((m, i) => i).filter(i => roleOf(movesOf(enemy)[i]) === role);
    if (!list.length) return null;
    const fresh = list.filter(i => i !== enemy.lastMove);
    return Game.Util.pick(fresh.length ? fresh : list);
  }

  function roll(c, enemy) {
    const def = Game.ENEMIES[enemy.id];
    const moves = def.moves;
    if (def.ai === 'cycle') { enemy.nextMove = enemy.step % moves.length; return; }
    const turn = enemy.turns || 0;
    const canBuff = !(S().firstTurnSkipsBuff && turn === 0) && turn - (enemy.lastBuff ?? -99) >= S().buffCooldown;
    if (canBuff && Math.random() < S().buffChance) {
      const b = pickOfRole(enemy, 'buff');
      if (b !== null) { enemy.nextMove = b; return; }
    }
    const rhythm = def.rhythm || S().rhythm;
    for (let k = 0; k < rhythm.length; k++) {
      const role = rhythm[(enemy.step + k) % rhythm.length];
      const i = pickOfRole(enemy, role);
      if (i !== null) { enemy.step += k; enemy.nextMove = i; return; }
    }
    enemy.nextMove = enemy.step % moves.length;   // only buffs left: fall back to the list
  }

  function current(enemy) {
    const moves = movesOf(enemy);
    if (enemy.nextMove == null) return moves[(enemy.moveIndex || 0) % moves.length];
    return moves[enemy.nextMove];
  }

  function advance(c, enemy) {
    const m = current(enemy);
    if (roleOf(m) === 'buff') enemy.lastBuff = enemy.turns || 0;
    else enemy.step += 1;
    enemy.lastMove = enemy.nextMove;
    enemy.turns = (enemy.turns || 0) + 1;
    roll(c, enemy);
  }

  function start(c) {
    c.enemies.forEach(e => {
      const def = Game.ENEMIES[e.id];
      const len = (def.rhythm || S().rhythm).length;
      e.step = def.ai !== 'cycle' && S().randomStart && !def.fixedStart ? Math.floor(Math.random() * len) : 0;
      e.turns = 0;
      e.lastMove = null;
      roll(c, e);
    });
  }

  Game.Events.on('combat:start', ({ combat }) => start(combat));

  return { current, advance, roleOf, start };
})();
