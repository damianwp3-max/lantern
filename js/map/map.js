// MAP QUERIES / PROGRESSION
// Answers "which nodes can the player pick now?" and records progress.
// Building the map lives in map/mapGen.js; drawing it in ui/screens/mapScreen.js.
Game.Map = {
  generate(levelIndex) {
    return Game.MapGen.generate(levelIndex);
  },

  // The node the player is standing on (last one finished), or null at the start.
  currentNode(run) {
    const id = run.visited[run.visited.length - 1];
    return id ? this.findNode(run, id) : null;
  },

  availableNodes(run) {
    const next = run.map.rows[run.row + 1];
    if (!next) return [];
    const here = this.currentNode(run);
    if (!here || !here.next) return next;          // first row, or an old save without paths
    return here.next.map(k => next[k]);
  },

  findNode(run, nodeId) {
    for (const row of run.map.rows) {
      for (const node of row) if (node.id === nodeId) return node;
    }
    return null;
  },

  // Call after the player finishes a node (won a fight, rested, ...).
  complete(run, node) {
    run.row = node.row;
    run.visited.push(node.id);
  },

  isLevelDone(run) {
    return run.row >= run.map.rows.length - 1;
  },
};
