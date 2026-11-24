// VISUAL EFFECT DATA
// Compares the fight before and after an action so screens know what to
// animate (hits, kills, block, strength, energy). Produces plain data (app.fx);
// drawing it is the screen's job (combat screen + ui/juice/combatJuice.js).
Game.Fx = {
  snapshot(combat) {
    const p = combat.player;
    return { hp: p.hp, block: p.block, strength: p.strength || 0, energy: p.energy, enemyHp: combat.enemies.map(e => e.hp) };
  },
  diff(before, combat) {
    const p = combat.player;
    const fx = { enemyHit: {}, enemyKilled: {} };
    combat.enemies.forEach((e, i) => {
      const d = before.enemyHp[i] - e.hp;
      if (d > 0) fx.enemyHit[e.uid] = d;
      if (before.enemyHp[i] > 0 && e.hp <= 0) fx.enemyKilled[e.uid] = true;
    });
    const lost = before.hp - p.hp;
    if (lost > 0) fx.playerHit = lost;
    if (p.block > before.block) fx.blockGained = p.block - before.block;
    if (p.block < before.block && p.block > 0) fx.blockedHit = before.block - p.block;
    if ((p.strength || 0) > before.strength) fx.strengthGained = p.strength - before.strength;
    if (p.energy > before.energy) fx.energyGained = p.energy - before.energy;
    return fx;
  },
};
