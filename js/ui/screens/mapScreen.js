// MAP SCREEN
// Draws the level as nodes joined by paths (an SVG layer under the nodes).
// The player starts at the top and walks down to the boss, one row at a time,
// only along the paths. Looks of each node type come from data/mapNodesData.js.
Game.UI.registerScreen('map', function () {
  const { esc, statusBar } = Game.UI.components;
  const L = Game.MapLayout;
  const run = Game.State.run;
  const rows = run.map.rows;
  const here = Game.Map.currentNode(run);
  const available = new Set(Game.Map.availableNodes(run).map(n => n.id));
  const visited = new Set(run.visited);

  // Nodes still reachable from where the player stands (others are greyed out).
  const reachable = new Set();
  (function walk(list) {
    for (const n of list) {
      if (reachable.has(n.id)) continue;
      reachable.add(n.id);
      if (n.next && rows[n.row + 1]) walk(n.next.map(k => rows[n.row + 1][k]));
    }
  })(Game.Map.availableNodes(run));

  const lines = [];
  rows.forEach((row, r) => row.forEach(n => (n.next || []).forEach(k => {
    const to = rows[r + 1][k];
    const a = L.pos(n), b = L.pos(to);
    const cls = visited.has(n.id) && visited.has(to.id) ? 'walked'
      : here === n && available.has(to.id) ? 'open'
      : reachable.has(n.id) && reachable.has(to.id) ? 'ahead' : 'gone';
    lines.push(`<line class="path ${cls}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`);
  })));
  // Entrance: dashed lines from the top into the first row.
  if (!here) rows[0].forEach(n => {
    const b = L.pos(n);
    lines.push(`<line class="path open" x1="${L.WIDTH / 2}" y1="0" x2="${b.x}" y2="${b.y}"/>`);
  });

  const nodes = rows.flat().map(n => {
    const t = Game.MAP_NODES[n.type];
    const p = L.pos(n);
    const state = n === here ? 'current' : visited.has(n.id) ? 'visited'
      : available.has(n.id) ? 'available' : reachable.has(n.id) ? 'ahead' : 'gone';
    const attrs = state === 'available' ? ` data-action="chooseNode" data-arg="${n.id}"` : '';
    return `<div class="map-node ${n.type} ${state}" style="left:${p.x}px;top:${p.y}px;--c:${t.color}"${attrs} title="${esc(t.label + ': ' + t.hint)}">
      <span class="icon">${t.icon}</span>
      ${state === 'current' ? '<span class="you">you</span>' : ''}
    </div>`;
  }).join('');

  const legend = Object.values(Game.MAP_NODES).map(t =>
    `<div class="legend-item" style="--c:${t.color}"><span class="map-node mini"><span class="icon">${t.icon}</span></span><b>${esc(t.label)}</b><span class="muted">${esc(t.hint)}</span></div>`
  ).join('');

  return `${statusBar(run)}
    <div class="map-screen">
      <div class="map-board" style="width:${L.WIDTH}px;height:${L.height(run.map)}px">
        <svg class="map-paths" width="${L.WIDTH}" height="${L.height(run.map)}">${lines.join('')}</svg>
        ${nodes}
      </div>
      <div class="map-side">
        <h2>${esc(Game.LEVELS[run.levelIndex].name)}</h2>
        <p class="muted">Go down one step at a time. You can only follow the paths, so plan your route. Glowing nodes are your next choices.</p>
        <div class="legend">${legend}</div>
      </div>
    </div>`;
});
