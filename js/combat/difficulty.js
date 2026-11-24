// DIFFICULTY (rules; numbers in data/difficultyData.js)
//   Game.Difficulty.list()            mode ids in screen order
//   Game.Difficulty.get(id?)          a mode's data (default: the one chosen in Settings)
//   Game.Difficulty.chosen() / choose(id)   the mode picked in Settings (setting 'difficulty', default Normal)
// The mode is read at every fight, so a change in Settings counts from the next fight; the run notes
// the mode it last fought on in run.difficulty. At 'combat:start' (after group scaling,
// combat/scaling.js) every enemy's HP and dmgMult are multiplied by the mode. Enemies that appear
// mid-fight (split, summon) get the HP multiplier too; dmgMult they inherit from their parent.
Game.Difficulty = (function () {
  const D = () => Game.DIFFICULTIES;
  const list = () => Object.keys(D());
  const valid = id => !!D()[id];

  function chosen() {
    const v = Game.Settings && Game.Settings.get('difficulty');
    return valid(v) ? v : Game.DIFFICULTY_DEFAULT;
  }
  function choose(id) { if (valid(id) && Game.Settings) Game.Settings.set('difficulty', id); }

  const currentId = chosen;
  const get = id => D()[valid(id) ? id : chosen()];

  const scaleHp = (e, m) => { e.hp = e.maxHp = Math.max(1, Math.round(e.maxHp * m)); };

  Game.Events.on('run:init', ({ run }) => { run.difficulty = chosen(); });
  Game.Events.on('combat:start', ({ combat }) => {
    const m = get();
    if (Game.State && Game.State.run) Game.State.run.difficulty = chosen();
    combat.enemies.forEach(e => { scaleHp(e, m.hp); e.dmgMult = (e.dmgMult || 1) * m.dmg; });
  });
  Game.Events.on('enemy:spawned', ({ enemy }) => scaleHp(enemy, get().hp));

  return { list, get, chosen, choose, currentId };
})();
