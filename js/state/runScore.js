// RUN SCORE (end-of-run numbers)
// Counts what the run achieved in run.score (saved with the run) and turns it into
// points (data/runScoreData.js) and "how far you got" for the end-of-run screen.
// Fed by events only.
//   Game.RunScore.summary(run, won) -> { lines: [{ key, label, count, each, points }], total, rank,
//                                         depth: { levelIndex, levelName, floor, floors, reached, total, pct },
//                                         xp, explorerLevels, hero, won }
// Call summary() before Game.State.endRun(): ending the run erases it.
Game.RunScore = (function () {
  const blank = () => ({ floors: 0, fights: 0, elites: 0, bosses: 0, levels: 0, cards: 0, xp: 0, explorerLevels: 0 });
  function get(run) {
    run = run || Game.State.run;
    if (!run) return blank();
    run.score = Object.assign(blank(), run.score);
    return run.score;
  }
  const live = fn => (...a) => { if (Game.State.run) fn(...a); };

  Game.Events.on('combat:end', live(({ outcome }) => {
    if (outcome !== 'win') return;
    const node = Game.App && Game.App.state.currentNode;
    const type = node ? node.type : 'fight';
    const s = get();
    if (type === 'boss') s.bosses += 1; else if (type === 'elite') s.elites += 1; else s.fights += 1;
  }));
  Game.Events.on('node:complete', live(() => { get().floors += 1; }));
  Game.Events.on('level:start', live(({ levelIndex }) => { if (levelIndex > 0) get().levels += 1; }));
  Game.Events.on('deck:cardAdded', live(() => { get().cards += 1; }));
  Game.Events.on('xp:gained', live(({ gained }) => {
    const s = get();
    s.xp += gained || 0;
    s.explorerLevels += (Game.Unlocks.lastXp && Game.Unlocks.lastXp.levels) || 0;
  }));

  function depth(run, won) {
    const levels = Game.LEVELS;
    const li = Math.min(run.levelIndex || 0, levels.length - 1);
    const floors = levels[li].rows.length;
    // Won: the last floor is done. Lost: you fell on the floor after the last one cleared.
    const floor = won ? floors : Math.min(floors, (run.row == null ? -1 : run.row) + 2);
    const before = levels.slice(0, li).reduce((n, l) => n + l.rows.length, 0);
    const total = levels.reduce((n, l) => n + l.rows.length, 0);
    const reached = before + floor;
    return { levelIndex: li, levelName: levels[li].name, levelCount: levels.length, floor, floors, reached, total, pct: Math.round(100 * reached / total) };
  }

  function summary(run, won) {
    run = run || Game.State.run;
    const s = get(run), P = Game.RUN_SCORE.points;
    const rows = [
      ['floor', 'Floors cleared', s.floors],
      ['fight', 'Fights won', s.fights],
      ['elite', 'Elites defeated', s.elites],
      ['boss', 'Bosses defeated', s.bosses],
      ['level', 'Levels cleared', s.levels + (won ? 1 : 0)],
      ['card', 'Cards gained', s.cards],
    ];
    if (won) rows.push(['win', 'Reached the bottom', 1]);
    const lines = rows.map(([key, label, count]) => ({ key, label, count, each: P[key] || 0, points: count * (P[key] || 0) }));
    const total = lines.reduce((n, l) => n + l.points, 0);
    const rank = Game.RUN_SCORE.ranks.filter(r => total >= r.min).pop() || Game.RUN_SCORE.ranks[0];
    return { lines, total, rank: rank.name, depth: depth(run, won), xp: s.xp, explorerLevels: s.explorerLevels, hero: run.character, won: !!won };
  }

  return { get, summary };
})();
