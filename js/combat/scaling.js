// GROUP SCALING (rules)
// Reads data/scalingData.js. At the start of a fight every enemy gets
// hp scaled and a damage multiplier (enemy.dmgMult); Game.Statuses.modifyDamage
// applies the multiplier to attacks, and Game.Scaling.block() to block gains.
Game.Scaling = (function () {
  function forCount(n) {
    const table = Game.ENCOUNTER_SCALING || {};
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    const key = keys.filter(k => k <= n).pop() || keys[0];
    return table[key] || { hp: 1, dmg: 1 };
  }

  function apply(c) {
    const s = forCount(c.enemies.length);
    const node = Game.App && Game.App.state && Game.App.state.currentNode;
    const b = node && node.type === 'boss' ? (Game.BOSS_SCALING || { hp: 1, dmg: 1 }) : { hp: 1, dmg: 1 };   // data/scalingData.js
    c.enemies.forEach(e => {
      e.hp = e.maxHp = Math.max(1, Math.round(e.maxHp * s.hp * b.hp));
      e.dmgMult = s.dmg * b.dmg;
    });
  }

  // Block an enemy gains from a move, scaled like its damage.
  const block = (enemy, value) => (enemy && enemy.dmgMult && enemy.dmgMult !== 1 ? Math.max(1, Math.round(value * enemy.dmgMult)) : value);

  Game.Events.on('combat:start', ({ combat }) => apply(combat));

  return { apply, forCount, block };
})();
