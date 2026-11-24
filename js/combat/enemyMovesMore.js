// MORE ENEMY MOVES (special moves; see data/enemyTraitsData.js for what each one means)
// Registered on Game.EnemyMoves, so data/enemiesMoreData.js can use them by type.
(function () {
  const M = Game.EnemyMoves;
  const U = Game.CombatUtil;
  const S = () => Game.Statuses;
  const run = () => Game.State.run;

  function hit(c, enemy, value, times) {
    for (let i = 0; i < (times || 1) && c.player.hp > 0; i++) {
      const who = M.victim(c, enemy);
      U.dealDamage(c, who, S().modifyDamage(enemy, who, value), who === c.player ? 'you' : `your ${who.name}`, enemy.name);
    }
  }

  M.register('burrow', (c, e, move) => {
    e.statuses.burrowed = 1;
    U.log(c, `${e.name} digs underground!`);
    M.extras(c, e, move);
  });

  // Takes the most expensive card from your discard pile (or draw pile if that is empty).
  M.register('steal', (c, e, move) => {
    const from = c.discardPile.length ? c.discardPile : c.drawPile;
    const real = from.map((id, i) => i).filter(i => Game.CARDS[from[i]] && Game.CARDS[from[i]].type !== 'useless');
    if (real.length) {
      const best = Math.max(...real.map(i => Game.CARDS[from[i]].cost || 0));
      const i = Game.Util.pick(real.filter(k => (Game.CARDS[from[k]].cost || 0) === best));
      const [id] = from.splice(i, 1);
      (e.stolen = e.stolen || []).push(id);
      e.statuses.thief = (e.stolen.length) + (e.stolenGold ? 1 : 0);
      U.log(c, `${e.name} steals your ${Game.CARDS[id].name}!`);
    }
    if (move.value) hit(c, e, move.value, move.hits);
    M.extras(c, e, move);
  });

  M.register('stealGold', (c, e, move) => {
    if (move.value) hit(c, e, move.value, move.hits);
    const r = run();
    const n = r ? Math.min(r.gold || 0, move.gold || 10) : 0;
    if (n > 0) {
      Game.Gold.spend(r, n);
      e.stolenGold = (e.stolenGold || 0) + n;
      e.statuses.thief = (e.stolen || []).length + 1;
      U.log(c, `${e.name} snatches ${n} gold!`);
    }
    M.extras(c, e, move);
  });

  M.register('flee', (c, e) => {
    e.fled = true;
    e.deathDone = true;   // no split, no loot back
    e.hp = 0;
    U.log(c, `${e.name} runs away${e.stolenGold ? ` with ${e.stolenGold} of your gold` : ''}!`);
    Game.Events.emit('enemy:fled', { combat: c, enemy: e });
  });

  M.register('summon', (c, e, move) => {
    const alive = c.enemies.filter(x => x.hp > 0).length;
    if (alive < (move.max || 3)) Game.EnemyTraits.spawn(c, move.enemy, e);
    else if (move.value) { e.block += S().modifyBlock(e, Game.Scaling.block(e, move.value)); U.log(c, `${e.name} braces instead.`); }
    M.extras(c, e, move);
  });

  M.register('protect', (c, e, move) => {
    const others = c.enemies.filter(x => x !== e && x.hp > 0);
    (others.length ? others : [e]).forEach(x => { x.block += S().modifyBlock(x, Game.Scaling.block(e, move.value)); });
    U.log(c, `${e.name} shields its allies.`);
    M.extras(c, e, move);
  });

  M.register('heal', (c, e, move) => {
    const who = move.allies ? c.enemies.filter(x => x.hp > 0) : [e];
    who.forEach(x => { x.hp = Math.min(x.maxHp, x.hp + move.value); });
    U.log(c, `${e.name} heals${move.allies ? ' every enemy' : ''} for ${move.value}.`);
    M.extras(c, e, move);
  });

  M.register('drainOil', (c, e, move) => {
    if (move.value) hit(c, e, move.value, move.hits);
    const r = run();
    if (r && Game.Oil && move.oil) { const d = Game.Oil.gain(r, -move.oil); if (d) U.log(c, `${e.name} drinks ${-d} oil from your lantern.`); }
    M.extras(c, e, move);
  });

  M.register('explode', (c, e, move) => {
    U.log(c, `${e.name} explodes!`);
    hit(c, e, move.value, 1);
    e.deathDone = true;   // blowing up is not a kill: no split, nothing dropped
    e.hp = 0;
    Game.Events.emit('enemy:exploded', { combat: c, enemy: e });
  });
})();
