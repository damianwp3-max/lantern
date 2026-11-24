// COMBAT ACTIONS (playing cards, targeting; ending the turn is in endTurnActions.js)
// Short animations (card flying, victory banner) come from Game.Juice
// (ui/juice/*.js); while one runs, Game.Juice.busy ignores new input.
(function () {
  const A = Game.Actions;
  const J = () => Game.Juice || { busy: false };

  // Runs after every combat action: carry hp over, then show win, loss, or the board.
  // (js/coop/flow.js swaps this one out for two players, so every caller goes through A.afterCombatAction.)
  A.afterCombatAction = function afterCombatAction() {
    const { state, go } = Game.App;
    const c = state.combat;
    Game.State.run.hp = c.player.hp;   // hp carries over between fights
    if (c.outcome === 'lose') {
      go('combat');
      const lose = () => Game.App.showRunEnd(false);   // stats + card packs (app/actions/runEndActions.js)
      return J().defeat ? J().defeat(lose) : lose();
    }
    if (c.outcome === 'win') {
      go('combat');   // show the last hit and the enemy falling first
      const reward = () => {
        state.rewardChoices = (Game.Unlocks ? Game.Unlocks.sample(3) : Game.Util.sample(Game.REWARD_POOL, 3));
        state.rewardExtras = Game.Rewards.extras(state.currentNode, Game.State.run);   // bonus totem (elites, bosses)
        go('reward');
      };
      return J().victory ? J().victory(reward) : reward();
    }
    go('combat');
  };

  // The element a played card should fly to: the target enemy, or the hero.
  function flyTarget(index) {
    const c = Game.App.state.combat;
    const card = Game.CARDS[c.hand[index]];
    if (card.target === 'enemy') {
      const t = Game.Combat.currentTarget(c);
      const el = t && document.querySelector(`.enemy[data-arg="${t.uid}"] .sprite`);
      if (el) return el;
    }
    return document.querySelector('.player-unit');
  }

  // Fly the card from the hand, then resolve it. Attacks are thrown by the
  // heroine when ui/juice/heroJuice.js is loaded (Game.Juice.throwCard).
  // 'card:launch' lets the heroine pose (ui/characterPoses.js) as it starts.
  // Timed cards first open the timing bar (ui/timingView.js); its result goes to the card.
  function playAnimated(index, fromRect) {
    const card = Game.CARDS[Game.App.state.combat.hand[index]];
    if (card.timed && Game.Timing.enabled() && Game.UI.timing) {
      return Game.UI.timing.run(card, timing => launch(index, fromRect, timing));
    }
    launch(index, fromRect, null);
  }

  function launch(index, fromRect, timing) {
    const cardId = Game.App.state.combat.hand[index];
    const cardEl = document.querySelector(`.hand .card[data-index="${index}"]`);
    const card = Game.CARDS[cardId];
    const color = (Game.CARD_TYPES[card.type] || {}).color;
    Game.Events.emit('card:launch', { cardId, card });
    if (!J().flyCard || !cardEl) return A.playCard(index, timing);
    const fly = (card.type === 'attack' || card.type === 'hybrid') && J().throwCard ? J().throwCard : J().flyCard;
    fly(cardEl, flyTarget(index), () => A.playCard(index, timing), { fromRect, color });
  }

  Object.assign(A, {
    // Click on a card. Single-target attacks wait for a target click when
    // there is a choice; everything else plays right away.
    selectCard(index) {
      const { state, go } = Game.App;
      if (J().busy) return;
      index = Number(index);
      const c = state.combat;
      if (!Game.Combat.canPlay(c, index)) {
        const el = document.querySelector(`.hand .card[data-index="${index}"]`);
        if (el) el.animate([{ translate: '0 0' }, { translate: '-6px 0' }, { translate: '6px 0' }, { translate: '0 0' }], { duration: 220 });
        return;
      }
      const card = Game.CARDS[c.hand[index]];
      if (card.target === 'enemy' && Game.Combat.targetableEnemies(c).length > 1) {
        state.selectedCard = state.selectedCard === index ? null : index;
        return go('combat');
      }
      state.selectedCard = null;
      playAnimated(index);
    },

    cancelCard() {
      const { state, go } = Game.App;
      if (state.selectedCard === null) return;
      state.selectedCard = null;
      go('combat');
    },

    playCard(index, timing) {
      const { state } = Game.App;
      state.selectedCard = null;
      const before = Game.Fx.snapshot(state.combat);
      Game.Combat.playCard(state.combat, Number(index), timing);
      state.fx = Game.Fx.diff(before, state.combat);
      A.afterCombatAction();
    },

    target(uid) {
      const { state, go } = Game.App;
      if (J().busy) return;
      Game.Combat.setTarget(state.combat, Number(uid));
      if (state.selectedCard !== null) {
        const i = state.selectedCard;
        state.selectedCard = null;
        return playAnimated(i);
      }
      go('combat');
    },
  });

  // Used by ui/drag.js: drop a card, optionally on an enemy uid.
  // fromRect: where the dragged copy was, so the flight starts there.
  Game.App.dropCard = function (index, enemyUid, fromRect) {
    const { state } = Game.App;
    if (J().busy || !Game.Combat.canPlay(state.combat, index)) return;
    if (enemyUid !== null && enemyUid !== undefined) Game.Combat.setTarget(state.combat, enemyUid);
    state.selectedCard = null;
    playAnimated(index, fromRect);
  };
})();
