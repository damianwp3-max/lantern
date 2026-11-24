// MAP ACTIONS (choosing nodes, resting, moving between levels)
Object.assign(Game.Actions, {
  chooseNode(nodeId) {
    const { state, go } = Game.App;
    const run = Game.State.run;
    const node = Game.Map.findNode(run, nodeId);
    if (!Game.Map.availableNodes(run).includes(node)) return;
    state.currentNode = node;
    Game.Events.emit('node:enter', { node });
    if (node.type === 'rest') {
      state.restChoices = Game.Util.sample(Game.Passives.unowned(run), Game.REST.passiveChoices);
      return go('rest');
    }
    if (node.type === 'event') {
      state.caveEvent = { id: Game.CaveEvents.pick(run), result: null };
      return go('event');
    }
    if (node.type === 'shop') {
      Game.Shop.open(run, node);
      return go('shop');
    }
    state.combat = Game.Combat.create(run, node.encounter);
    state.fx = { deal: true };
    go('combat');
  },

  nextLevel() {
    Game.State.nextLevel();
    Game.App.go('map');
  },
});
