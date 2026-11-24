// ENEMY MOVES
// One handler per move type used in data/enemiesData.js:
//   { type: 'attack', value: 8 }  ->  Game.EnemyMoves.attack(combat, enemy, move)
// Optional extras any move can carry (run after the main move):
//   hits: N              attack N times (attack only)
//   status, amount       put a status on you (weak, vulnerable, poison...)
//   selfBlock: N         the enemy also gains N block
// buff: the enemy (or all enemies) gains a buff status (move.buff, move.amount).
// Add new move types (heal, summon, ...) here or via register().
(function () {
  const { dealDamage, log } = Game.CombatUtil;

  function extras(c, enemy, move) {
    if (move.status && c.player.hp > 0) Game.Statuses.add(c, c.player, move.status, move.amount || 1);
    if (move.selfBlock) gainBlock(c, enemy, move.selfBlock);
  }

  // Enemy block: scaled by group size (combat/scaling.js), cut by Frail.
  function gainBlock(c, enemy, value) {
    const n = Game.Statuses.modifyBlock(enemy, Game.Scaling.block(enemy, value));
    enemy.block += n;
    log(c, `${enemy.name} gains ${n} block.`);
  }

  Game.EnemyMoves = {
    register(type, handler) { this[type] = handler; },
    extras,

    // Who an attack hits: you, unless an ally takes the hit first (combat/bat.js wraps this).
    victim(c, enemy) { return c.player; },

    attack(c, enemy, move) {
      for (let i = 0; i < (move.hits || 1) && c.player.hp > 0; i++) {
        const who = Game.EnemyMoves.victim(c, enemy);
        dealDamage(c, who, Game.Statuses.modifyDamage(enemy, who, move.value), who === c.player ? 'you' : `your ${who.name}`, enemy.name);
      }
      extras(c, enemy, move);
    },
    block(c, enemy, move) {
      gainBlock(c, enemy, move.value);
      extras(c, enemy, move);
    },
    // Only a status on you (the status comes from move.status / move.amount).
    debuff(c, enemy, move) {
      extras(c, enemy, move);
    },
    // A buff on itself (or on every living enemy with allies: true): { type: 'buff', buff: 'might', amount: 2 }
    buff(c, enemy, move) {
      const who = move.allies ? c.enemies.filter(e => e.hp > 0) : [enemy];
      who.forEach(e => Game.Statuses.add(c, e, move.buff || 'might', move.amount || 1));
      extras(c, enemy, move);
    },
    addCard(c, enemy, move) {
      // to: 'discard' (default) | 'draw' (shuffled in) | 'hand'
      const to = move.to || 'discard';
      for (let i = 0; i < move.value; i++) Game.Combat.giveCard(c, move.card, to);
      log(c, `${enemy.name} adds ${move.value} ${Game.CARDS[move.card].name} to your ${to === 'draw' ? 'draw pile' : to === 'hand' ? 'hand' : 'discard pile'}.`);
      extras(c, enemy, move);
    },
  };
})();
