// KEYBOARD SHORTCUTS
// Combat: 1-9 pick/play a card, Left/Right change target, Enter plays the
// picked card, E or Space ends the turn, Esc cancels the picked card.
// Rewards: 1-3 take a card, S skips. Only calls existing actions.
(function () {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || !Game.App) return;
    const app = Game.App.state, A = Game.Actions;
    const n = /^[1-9]$/.test(e.key) ? Number(e.key) - 1 : -1;

    if (app.screen === 'combat' && app.combat) {
      const c = app.combat;
      if (n >= 0 && n < c.hand.length) return A.selectCard(n);
      if (e.key === 'e' || e.key === 'E' || e.key === ' ') { e.preventDefault(); return A.endTurn(); }
      if (e.key === 'Escape') return A.cancelCard();
      if (e.key === 'f' || e.key === 'F') return A.flare();
      if (e.key === 'Enter' && app.selectedCard !== null) return A.target(Game.Combat.currentTarget(c).uid);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const alive = Game.Combat.targetableEnemies(c);
        const cur = alive.indexOf(Game.Combat.currentTarget(c));
        const next = alive[(cur + (e.key === 'ArrowRight' ? 1 : -1) + alive.length) % alive.length];
        if (next) { Game.Combat.setTarget(c, next.uid); Game.App.go('combat'); }
      }
    }
    if (app.screen === 'reward') {
      if (n >= 0 && n < app.rewardChoices.length) return A.takeReward(app.rewardChoices[n]);
      if (e.key === 's' || e.key === 'S') return A.skipReward();
    }
  });
})();
