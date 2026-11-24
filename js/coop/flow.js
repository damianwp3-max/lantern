// CO-OP FLOW (the run for two)
// Wraps the single-player flow so that: both heroes start a run together, the host picks the map
// nodes and leaves the shop, both players get their own rewards / rest choices / events and the
// game waits until both have chosen, and the run ends for both.
// Only the HOST's browser runs this (the guest just shows snapshots, see session.js).
(function () {
  const C = Game.Coop, S = C.S;
  const A = Game.Actions, App = Game.App;
  const on = () => C.isActive() && C.isHost();

  // --- starting a run ---
  const WORLD = ['levelIndex', 'map', 'row', 'visited'];
  function syncWorld() {
    WORLD.forEach(k => { S.runs[1][k] = JSON.parse(JSON.stringify(S.runs[0][k])); });
  }

  // profiles[1] (the guest's unlock progress and embers) must be set before this is called.
  function startRuns(hero0, hero1) {
    S.playing = true;
    S.profiles[0] = { progress: Game.Progress.get(), meta: Game.Meta.get() };
    S.runs = [null, null];
    C.setCtx(1);                       // the guest's unlocks and lantern upgrades apply to their run
    Game.State.newRun(hero1);
    S.runs[1] = Game.State.run;
    C.setCtx(0);
    Game.State.newRun(hero0);
    S.runs[0] = Game.State.run;
    syncWorld();
    S.done = [false, false]; S.override = [null, null]; S.local = [null, null];
    App.state.currentNode = null; App.state.combat = null;
  }

  // --- after a fight ---
  function syncHp(c) {
    [0, 1].forEach(i => { S.runs[i].hp = Math.max(0, C.fieldsOf(c, i).player.hp); });
  }

  function giveRewards(c) {
    const st = App.state, node = st.currentNode;
    [0, 1].forEach(i => {
      const run = S.runs[i];
      if (run.hp <= 0) run.hp = Math.max(1, Math.round(run.maxHp * Game.COOP.reviveHpPct));   // a fallen hero wakes up
      C.setCtx(i);
      st.rewardChoices = Game.Unlocks ? Game.Unlocks.sample(3) : Game.Util.sample(Game.REWARD_POOL, 3);
      st.rewardExtras = Game.Rewards.extras(node, run);
    });
    C.setCtx(0);
    S.done = [false, false];
  }

  const baseAfter = A.afterCombatAction;
  A.afterCombatAction = function () {
    if (!on()) return baseAfter.apply(this, arguments);
    const { state, go } = App;
    const c = state.combat, J = Game.Juice || {};
    syncHp(c);
    if (c.outcome === 'lose') {
      go('combat');
      const lose = () => App.showRunEnd(false);
      return J.defeat ? J.defeat(lose) : lose();
    }
    if (c.outcome === 'win') {
      go('combat');
      const reward = () => { giveRewards(c); go('reward'); };
      return J.victory ? J.victory(reward) : reward();
    }
    go('combat');
  };

  // --- finishing a node: wait until both players are done ---
  const baseFinish = App.finishNode;
  App.finishNode = function () {
    if (!on()) return baseFinish.apply(this, arguments);
    const st = App.state, who = C.ctx();
    if (C.WAIT_SCREENS.includes(st.screen)) {
      S.done[who] = true;
      S.override[who] = null;
      if (!S.done.every(Boolean)) return App.go(st.screen);   // the other one is still choosing
    }
    S.done = [false, false]; S.override = [null, null];
    if (st.currentNode) Game.Map.complete(S.runs[1], st.currentNode);
    C.setCtx(0);
    return baseFinish.apply(this, arguments);
  };

  // --- map (host only) ---
  const baseChoose = A.chooseNode;
  A.chooseNode = function (nodeId) {
    if (!on()) return baseChoose.apply(this, arguments);
    const run = S.runs[0], node = Game.Map.findNode(run, nodeId);
    if (!node || !Game.Map.availableNodes(run).includes(node)) return;
    // Prepare the second hero's screen first, so no half-ready screen is ever sent to them.
    if (node.type === 'rest') {
      C.setCtx(1);
      App.state.restChoices = Game.Util.sample(Game.Passives.unowned(S.runs[1]), Game.REST.passiveChoices);
      C.setCtx(0);
    } else if (node.type === 'event') {
      C.setCtx(1);
      App.state.caveEvent = { id: Game.CaveEvents.pick(S.runs[1]), result: null };
      C.setCtx(0);
    } else if (node.type === 'shop') {
      Game.Shop.open(run, node);
      S.runs[1].shop = run.shop;    // one merchant, one stock
    }
    S.done = [false, false];
    return baseChoose.apply(this, arguments);
  };

  const baseLeaveShop = A.leaveShop;
  A.leaveShop = function () {
    if (!on()) return baseLeaveShop.apply(this, arguments);
    S.runs[1].shop = null;
    return baseLeaveShop.apply(this, arguments);
  };

  const baseNext = A.nextLevel;
  A.nextLevel = function () {
    if (!on()) return baseNext.apply(this, arguments);
    C.setCtx(1); Game.State.nextLevel();
    C.setCtx(0); Game.State.nextLevel();
    syncWorld();
    App.go('map');
  };

  // --- the end of the run: both players get their own end screen and payout ---
  const baseRunEnd = App.showRunEnd;
  App.showRunEnd = function (won, opts) {
    if (!on()) return baseRunEnd.apply(this, arguments);
    const realGo = App.go;
    App.go = () => {};                 // no half-drawn screens between the two players
    try {
      [1, 0].forEach(i => { C.setCtx(i); baseRunEnd.call(App, won, opts); });
    } finally { App.go = realGo; }
    C.setCtx(0);
    S.done = [false, false]; S.override = [null, null];
    realGo('runEnd');
  };

  // Menu: leaving a co-op run for the menu ends the co-op session.
  const baseMenu = A.toMenu;
  A.toMenu = function () {
    if (C.isActive() || (Game.Lobby && Game.Lobby.state.status !== 'idle')) Game.CoopSession.leave();
    return baseMenu.apply(this, arguments);
  };

  // --- never touch the host's own save files while playing co-op ---
  ['write', 'remove'].forEach(fn => {
    const base = Game.Save[fn];
    Game.Save[fn] = function () { if (C.isActive()) return; return base.apply(this, arguments); };
  });
  [Game.Progress, Game.Meta].forEach(mod => {
    const base = mod.save;
    mod.save = function () { if (C.isActive() && C.isHost() && C.ctx() !== 0) return; return base.apply(this, arguments); };
  });

  // --- animations that call back later must not run for the teammate's headless actions ---
  ['gainCard', 'flyCard', 'throwCard', 'victory', 'defeat'].forEach(name => {
    const J = Game.Juice;
    const base = J && J[name];
    if (!base) return;
    J[name] = function () {
      if (C.S.headless) { const cb = [].slice.call(arguments).find(a => typeof a === 'function'); if (cb) cb(); return; }
      return base.apply(this, arguments);
    };
  });
  // The hand-to-discard flight shows MY hand: skip it while it is the other hero's turn.
  if (Game.Juice && Game.Juice.discardHand) {
    const base = Game.Juice.discardHand;
    Game.Juice.discardHand = function (done) {
      const c = App.state.combat;
      if (C.isActive() && c && c.seats && c.active !== C.me()) return done();
      return base.apply(this, arguments);
    };
  }

  // --- you can only act on your own turn ---
  const raw = {};   // the unguarded originals (the host runs the guest's turn through these, see session.js)
  const myTurn = () => { const c = App.state.combat; return !c || !c.seats || c.active === C.me(); };
  ['selectCard', 'target', 'endTurn', 'cancelCard', 'flare'].forEach(name => {
    const base = A[name];
    raw[name] = base;
    A[name] = function () {
      if (C.isActive() && !myTurn()) { if (name !== 'cancelCard') C.toast("It is your teammate's turn."); return; }
      return base.apply(this, arguments);
    };
  });
  const baseDrop = App.dropCard;
  raw.dropCard = baseDrop;
  App.dropCard = function () {
    if (C.isActive() && !myTurn()) { C.toast("It is your teammate's turn."); return; }
    return baseDrop.apply(this, arguments);
  };

  Game.CoopFlow = { startRuns, syncWorld, giveRewards, syncHp, raw };
})();
