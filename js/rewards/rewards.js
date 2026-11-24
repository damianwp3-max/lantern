// BONUS REWARDS after a fight (on top of the 3 cards and the gold)
//   Game.Rewards.extras(node, run) -> { totem: id|null }
// Elites and bosses give a totem. Fights never give upgrades or piercings:
// cards are only upgraded or pierced at cave events and the merchant.
// The reward screen (ui/screens/rewardScreen.js) shows it; actions in app/actions/rewardActions.js.
Game.Rewards = {
  extras(node, run) {
    const type = node ? node.type : 'fight';
    const out = { totem: null };
    if (type === 'elite' || type === 'boss') out.totem = Game.Totems.randomUnowned(run);
    return out;
  },
};
