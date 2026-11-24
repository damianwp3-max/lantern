// MAP GENERATION
// Turns a level definition (data/levelsData.js) into concrete nodes:
// each node gets a rolled encounter, an x position (0..1) for drawing, and a
// "next" list of the node indexes it leads to in the row below.
// Paths never cross, every node can be reached, and every node leads on.
Game.MapGen = (function () {
  // Positions spread evenly across the row, with a little jitter so it looks hand-drawn.
  function positions(n) {
    return Array.from({ length: n }, (_, i) => {
      const base = (i + 1) / (n + 1);
      return n === 1 ? 0.5 : base + (Math.random() - 0.5) * 0.08;
    });
  }

  function crosses(edges, i, k) {
    return edges.some(([a, b]) => (a < i && b > k) || (a > i && b < k));
  }

  // Edges between two rows, as [fromIndex, toIndex] pairs.
  function connect(upper, lower) {
    const edges = [];
    const add = (i, k) => { if (!edges.some(([a, b]) => a === i && b === k)) edges.push([i, k]); };
    const nearest = (x, row) => row.reduce((best, n, k) => Math.abs(n.x - x) < Math.abs(row[best].x - x) ? k : best, 0);

    upper.forEach((n, i) => add(i, nearest(n.x, lower)));           // every node leads on
    lower.forEach((n, k) => {                                        // every node is reachable
      if (!edges.some(([, b]) => b === k)) add(nearest(n.x, upper), k);
    });
    // A few extra branches so there are real choices, without crossing lines.
    for (let tries = 0; tries < 2; tries++) {
      const cands = [];
      upper.forEach((_, i) => lower.forEach((_, k) => {
        const exists = edges.some(([a, b]) => a === i && b === k);
        if (!exists && Math.abs(i * (lower.length - 1) - k * (upper.length - 1)) <= Math.max(upper.length, lower.length) && !crosses(edges, i, k)) cands.push([i, k]);
      }));
      if (cands.length && Math.random() < 0.65) add(...Game.Util.pick(cands));
    }
    return edges;
  }

  // Fights in the second half of a level (floor 7+) roll from the "hard" pool when there is one.
  function encounterFor(level, type, row) {
    const hardKey = 'hard' + type[0].toUpperCase() + type.slice(1);
    const pool = (row >= Math.floor(level.rows.length / 2) && level.pools[hardKey]) || level.pools[type];
    return pool ? Game.Util.pick(pool).slice() : null;
  }

  function generate(levelIndex) {
    const level = Game.LEVELS[levelIndex];
    const rows = level.rows.map((row, r) => {
      const xs = positions(row.length);
      return row.map((type, c) => ({
        id: `L${levelIndex}-R${r}-N${c}`,
        type,
        row: r,
        col: c,
        x: xs[c],
        next: [],
        encounter: encounterFor(level, type, r),
      }));
    });
    for (let r = 0; r < rows.length - 1; r++) {
      for (const [i, k] of connect(rows[r], rows[r + 1])) rows[r][i].next.push(k);
      rows[r].forEach(n => n.next.sort((a, b) => a - b));
    }
    return { levelIndex, rows };
  }

  return { generate };
})();
