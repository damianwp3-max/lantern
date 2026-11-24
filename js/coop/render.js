// CO-OP RENDER
// Draws every screen from the point of view of THIS player: their own hand, run and rewards,
// the teammate as "ally". Wraps Game.UI.render, so no screen file needs to know about co-op.
//  - host: after each draw, the new state is sent to the guest (Game.CoopSession.broadcast)
//  - screens: "waiting for your partner" once you have chosen, a player-only card picker,
//    and your own deck view (not shared with the teammate)
(function () {
  const C = Game.Coop, S = C.S;
  const base = Game.UI.render;

  // fx = one-shot effects (hits, deal-in). Hits on the OTHER hero must not shake MY hero.
  function viewFx(fx, c, me) {
    if (!fx || !c || !c.coop) return fx;
    const v = Object.assign({}, fx);
    if (v.deal && c.active !== me) delete v.deal;
    if (v.seat !== undefined && v.seat !== me) {
      if (v.playerHit) v.allyHit = v.playerHit;
      ['playerHit', 'blockGained', 'blockedHit', 'strengthGained', 'energyGained'].forEach(k => { delete v[k]; });
    }
    return v;
  }

  Game.UI.render = function (app) {
    if (!C.isActive()) return base.call(this, app);
    const me = C.me();
    const realScreen = app.screen, realCombat = app.combat, realFx = app.fx;
    const prev = S.cur;
    if (C.isHost()) C.setCtx(me);
    const local = S.local[me];
    let screen = local || S.override[me] || realScreen;
    if (!local && !S.override[me] && S.done[me] && C.WAIT_SCREENS.includes(realScreen)) screen = 'coopWait';
    app.screen = screen;
    if (realCombat) app.combat = C.view(realCombat, me);
    app.fx = viewFx(realFx, realCombat, me);
    try {
      base.call(this, app);
    } finally {
      app.screen = realScreen; app.combat = realCombat; app.fx = null;
      if (C.isHost()) C.setCtx(prev);
    }
    if (C.isHost() && !local && Game.CoopSession) Game.CoopSession.broadcast(realFx);
  };

  // Your own deck view: only on your screen.
  const A = Game.Actions;
  const baseView = A.viewDeck, baseBack = A.back;
  A.viewDeck = function () {
    if (!C.isActive()) return baseView.apply(this, arguments);
    S.local[C.me()] = 'deck';
    Game.App.go(Game.App.state.screen);
  };
  A.back = function () {
    if (!C.isActive() || !S.local[C.me()]) return baseBack.apply(this, arguments);
    S.local[C.me()] = null;
    Game.App.go(Game.App.state.screen);
  };
})();
