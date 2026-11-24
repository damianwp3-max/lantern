// REWARD ACTIONS
Object.assign(Game.Actions, {
  takeReward(cardId) {
    const J = Game.Juice;
    if (J && J.busy) return;
    Game.State.run.deck.push(cardId);
    Game.Events.emit('deck:cardAdded', { cardId, from: 'reward' });
    const el = document.querySelector(`.reward-hand .card[data-arg="${cardId}"]`);
    if (J && J.gainCard && el) return J.gainCard(el, () => Game.App.finishNode());
    Game.App.finishNode();
  },
  // Bonus reward (elites and bosses): a totem.
  takeTotem() {
    const ex = Game.App.state.rewardExtras;
    if (!ex || !ex.totem) return;
    Game.Totems.gain(Game.State.run, ex.totem);
    ex.totem = null;
    Game.State.save();
    Game.App.go('reward');
  },
  skipReward() {
    if (Game.Juice && Game.Juice.busy) return;
    Game.Events.emit('reward:skipped', {});
    Game.App.finishNode();
  },
});
