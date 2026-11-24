// END TURN (action)
// Plays the end of a turn as a strict sequence, each beat waiting for the one before:
//   1. unused cards fly to the discard pile      (ui/juice/discardFx.js)
//   2. the hand is discarded, then your turn ends: the Bat bites, end-of-turn effects fire
//   3. each living enemy takes its turn, one at a time
//   4. only after the last enemy: you draw a new hand (cards fly from the draw pile)
// The rules for each step are in combat/combat.js; timings in data/turnFlowData.js.
// Game.Juice.busy blocks input for the whole sequence, so nothing overlaps.
(function () {
  const A = Game.Actions;
  const J = () => Game.Juice;
  const T = () => Game.TURN_FLOW;

  let lastFx = {};   // what the latest step changed (the screen clears app.fx after drawing)

  // Run one rules step, work out what to animate, and redraw. Returns true if the fight goes on.
  function step(run, extraFx) {
    const { state } = Game.App;
    const c = state.combat;
    const before = Game.Fx.snapshot(c);
    const ok = run(c);
    const fx = Object.assign(Game.Fx.diff(before, c), extraFx || {});
    lastFx = fx;
    state.fx = fx;
    A.afterCombatAction();   // shows the board, or victory / defeat
    return ok && !c.outcome;
  }
  const pause = (ms, next) => J().wait(ms, next);
  const dealTime = c => T().drawFlyMs + Math.max(0, c.hand.length - 1) * T().drawStaggerMs;

  // Two players (js/coop/combatSeats.js): hero 1, then hero 2, then the enemies, then a new round.
  const CO = () => (Game.Coop && Game.Coop.isActive() && Game.Coop.combat) || null;
  const startTurn = cc => (CO() ? CO().beginTurn(cc) : Game.Combat.startPlayerTurn(cc));

  function drawNewHand(c) {
    if (CO()) CO().beforeRound(c);   // a new round: back to the first living hero
    step(cc => startTurn(cc), { deal: true });
    if (!c.outcome) pause(dealTime(c), () => {});
  }

  function enemyPhase(c, queue) {
    const enemy = queue.shift();
    if (!enemy) return pause(T().beforeDrawMs, () => drawNewHand(c));
    if (enemy.hp <= 0) return enemyPhase(c, queue);
    const type = Game.Combat.intentOf(enemy).type;
    const stunned = enemy.statuses && enemy.statuses.stunned > 0;
    const attacks = !stunned && ['attack', 'explode'].includes(type) ? [enemy.uid] : [];
    if (CO()) CO().aimAt(c, enemy);   // the hero this enemy aims at takes the hit
    if (step(cc => Game.Combat.enemyTurn(cc, enemy), { enemyAttack: attacks })) pause(T().enemyStepMs, () => enemyPhase(c, queue));
  }

  function afterYourTurn(c) {
    if (Game.Combat.takeExtraTurn(c)) {   // Vampiric Speed: go again, no enemies
      Game.App.state.fx = { deal: true };
      A.afterCombatAction();
      return pause(dealTime(c), () => {});
    }
    if (CO() && CO().nextSeat(c)) {   // the other hero's turn
      step(cc => startTurn(cc), { deal: true });
      if (!c.outcome) pause(dealTime(c), () => {});
      return;
    }
    enemyPhase(c, Game.Combat.livingEnemies(c));
  }

  A.endTurn = function () {
    const { state } = Game.App;
    const c = state.combat;
    if (J().busy || !c || c.outcome) return;
    state.selectedCard = null;
    const play = () => {
      if (!step(cc => Game.Combat.discardHand(cc))) return;   // junk rules ended the fight
      pause(T().afterDiscardMs, () => {
        let hit = false;
        if (!step(cc => Game.Combat.finishPlayerTurn(cc))) return;
        hit = Object.keys(lastFx.enemyHit || {}).length > 0 || !!lastFx.playerHit;
        pause(hit ? T().strikeMs : T().quietMs, () => afterYourTurn(c));
      });
    };
    if (J().discardHand) J().discardHand(play); else play();
  };
})();
