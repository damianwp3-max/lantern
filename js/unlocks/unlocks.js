// CARD UNLOCKS (rules)
// Won fights give explorer experience (data/experienceData.js). Each new
// explorer level unlocks ONE card set (data/unlocksData.js), picked at random
// from the sets still locked. Lifetime numbers live in state/progress.js.
//
//   Game.Unlocks.isLocked(cardId)   true while a card's set is still locked
//   Game.Unlocks.pool()             reward pool for the current hero: no locked cards,
//                                   no cards that belong only to another hero (data/charactersData.js)
//   Game.Unlocks.status()           every set with done: true/false, for the UI
//   Game.Unlocks.level()            { level, xp, into, need, pct } explorer level and the bar to the next one
//   Game.Unlocks.lastNew            sets unlocked by the last won fight (for the summary)
//   Game.Unlocks.lastXp             { gained, levels } from the last won fight
//   Game.Unlocks.recordWin(enemyIds, nodeType)
//   event 'cards:unlocked' { set, cards }   once per newly unlocked set
//   event 'xp:gained' { gained, level }
Game.Unlocks = (function () {
  const P = () => Game.Progress.get();
  const X = () => Game.EXPERIENCE;
  const setOf = {};   // cardId -> set
  Game.UNLOCK_SETS.forEach(s => s.cards.forEach(id => { setOf[id] = s; }));

  const isDone = s => P().sets.includes(s.id);
  const lockedSets = () => Game.UNLOCK_SETS.filter(s => !isDone(s));

  function isLocked(cardId) {
    const s = setOf[cardId];
    return !!s && !isDone(s);
  }

  function pool() {
    const run = Game.State && Game.State.run;
    const hero = run && run.character;
    return Game.REWARD_POOL.filter(id => !isLocked(id) && (!Game.Characters || Game.Characters.canFind(id, hero)));
  }

  function status() { return Game.UNLOCK_SETS.map(s => ({ set: s, done: isDone(s) })); }

  function level() {
    const xp = P().xp, per = X().perLevel;
    const into = xp % per;
    return { level: Math.floor(xp / per), xp, into, need: per, pct: Math.round(100 * into / per) };
  }

  // Unlock sets until the number of unlocked sets matches the level (one random set per level).
  function catchUp() {
    const fresh = [];
    while (P().sets.length < level().level && lockedSets().length) {
      const s = Game.Util.pick(lockedSets());
      P().sets.push(s.id);
      fresh.push(s);
    }
    return fresh;
  }

  const xpFor = nodeType => X().xp[nodeType] != null ? X().xp[nodeType] : X().xp.fight;

  // Count a won fight, add its experience and unlock what the new levels earned.
  function recordWin(enemyIds, nodeType) {
    const p = P();
    const before = level().level;
    p.fightsWon += 1;
    if (nodeType === 'boss') {
      p.bossesWon += 1;
      enemyIds.forEach(id => { p.bosses[id] = (p.bosses[id] || 0) + 1; });
    }
    const gained = xpFor(nodeType);
    p.xp += gained;
    const fresh = catchUp();
    Game.Progress.save();
    api.lastNew = fresh;
    api.lastXp = { gained, levels: level().level - before };
    Game.Events.emit('xp:gained', { gained, level: level().level });
    fresh.forEach(s => Game.Events.emit('cards:unlocked', { set: s, cards: s.cards.slice() }));
    return fresh;
  }

  // Old saves: their experience may already be worth some sets.
  catchUp();
  Game.Progress.save();

  Game.Events.on('combat:start', () => { api.lastNew = []; api.lastXp = null; });
  Game.Events.on('combat:end', ({ combat, outcome }) => {
    if (outcome !== 'win') return;
    const node = Game.App && Game.App.state.currentNode;
    recordWin(combat.enemies.map(e => e.id), node ? node.type : 'fight');
  });

  const api = { isLocked, pool, status, level, recordWin, xpFor, lastNew: [], lastXp: null };
  return api;
})();
