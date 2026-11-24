// LEVEL SCALING (rules; numbers in data/scalingData.js Game.LEVEL_SCALING)
// At 'combat:start' every enemy's HP and dmgMult are multiplied by the multipliers of the map the run is on.
// Enemies that join mid-fight (split, summon) get the HP multiplier too; damage they inherit from their parent.
Game.LevelScaling = (function () {
  const forRun = () => {
    const run = Game.State && Game.State.run;
    const t = Game.LEVEL_SCALING || [];
    return (run && t[Math.min(run.levelIndex || 0, t.length - 1)]) || { hp: 1, dmg: 1 };
  };
  const scaleHp = (e, m) => { e.hp = e.maxHp = Math.max(1, Math.round(e.maxHp * m)); };

  Game.Events.on('combat:start', ({ combat }) => {
    const m = forRun();
    combat.enemies.forEach(e => { scaleHp(e, m.hp); e.dmgMult = (e.dmgMult || 1) * m.dmg; });
  });
  Game.Events.on('enemy:spawned', ({ enemy }) => scaleHp(enemy, forRun().hp));
  return { forRun };
})();
