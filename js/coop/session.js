// CO-OP SESSION (messages between the two browsers)
// Everything the two players send each other besides the relay's own lobby messages.
//
//   lobby -> host presses Start -> both pick a hero -> host builds both runs -> play:
//   HOST   runs the game. After every screen draw it sends a SNAPSHOT (what the guest should see).
//   GUEST  draws snapshots and sends back what they click ('act' messages); the host executes them.
//
// Messages (data of a relay 'msg'):  k: 'goHero' | 'hero' | 'start' | 'snap' | 'act' | 'cur' | 'bye'
Game.CoopSession = (function () {
  const C = Game.Coop, S = C.S;
  const App = Game.App, A = Game.Actions;
  const send = d => Game.Lobby.sendGame(d);
  const st = () => App.state;
  let seq = 0, lastProfile = '', lastSeq = 0;
  const session = { picking: false, myHero: null, partnerPicked: false, error: null };

  // Actions only the host may take (navigation). The guest sees the clicks but the host decides.
  const HOST_ONLY = new Set(['chooseNode', 'nextLevel', 'leaveShop', 'askLeaveRun', 'leaveRun', 'keepGoing']);

  // ---------- starting ----------
  function begin(role) { C.reset(); S.role = role; session.picking = false; session.myHero = null; session.partnerPicked = false; }

  function beginHeroPick() {
    session.picking = true; session.myHero = null; session.partnerPicked = false;
    S.heroes = [null, null];
    st().pickedHero = Game.CHARACTER_DEFAULT;
    A.chooseHero();
  }

  // Host pressed "Start co-op".
  function hostStart() {
    if (!Game.Lobby.state.peer) return;
    begin('host');
    send({ k: 'goHero' });
    beginHeroPick();
  }

  // This player picked a hero (the hero screen's "Start run" button while in the lobby).
  function pickHero(id) {
    session.myHero = id;
    if (C.isHost()) { S.heroes[0] = id; hostMaybeStart(); }
    else send({ k: 'hero', id, profile: { progress: Game.Progress.get(), meta: Game.Meta.get() } });
    App.go('coopLobby');
  }

  function hostMaybeStart() {
    if (!S.heroes[0] || !S.heroes[1] || !S.profiles[1]) return;
    session.picking = false;
    Game.CoopFlow.startRuns(S.heroes[0], S.heroes[1]);
    send({ k: 'start' });
    App.go('map');
  }

  // ---------- host: snapshots out ----------
  function broadcast(fx) {
    if (!Game.Lobby.state.peer || !C.isHost() || !S.playing) return;
    const s = st(), c = s.combat, live = S.cur === 1;
    const o = {
      k: 'snap', seq: ++seq, screen: s.screen, override: S.override[1], done: S.done,
      currentNode: s.currentNode, message: s.message, run: S.runs[1], fx: fx || null,
      combat: c ? Object.assign({}, c, { log: c.log.slice(-25) }) : null,
      slots: {}, eph: {},
      host: { character: S.runs[0] && S.runs[0].character },
    };
    C.SLOT_KEYS.forEach(k => { o.slots[k] = live ? s[k] : S.slots[1][k]; });
    C.EPH.forEach(([m, k]) => { o.eph[m + '.' + k] = live ? (Game[m] && Game[m][k]) : S.eph[1][m + k]; });
    const prof = JSON.stringify(S.profiles[1]);
    if (prof !== lastProfile) { lastProfile = prof; o.profile = S.profiles[1]; }
    send(o);
  }

  // ---------- host: the guest's clicks in ----------
  function hostAct(m, tries) {
    const J = Game.Juice;
    if (J && J.busy && (tries || 0) < Game.COOP.busyRetries) return setTimeout(() => hostAct(m, (tries || 0) + 1), Game.COOP.busyRetryMs);
    const c = st().combat, raw = Game.CoopFlow.raw;
    const guestTurn = c && c.seats && c.active === 1 && !c.outcome;
    switch (m.name) {
      case 'playCard':
        if (!guestTurn) return;
        if (m.uid !== null && m.uid !== undefined) Game.Combat.setTarget(c, m.uid);
        return A.playCard(m.index, m.timing || null);
      case 'setTarget':
        if (!c || !c.seats || c.outcome) return;
        Game.Combat.setTarget(c, m.uid);
        return App.go('combat');
      case 'endTurn':
        if (guestTurn) raw.endTurn();
        return;
      case 'flare':
        if (guestTurn) raw.flare();
        return;
      case 'gift':
        if (c && Game.CoopGift.send(c, 1, Number(m.index))) A.afterCombatAction();
        return;
      default:
        if (HOST_ONLY.has(m.name)) return send({ k: 'toast', text: 'Only the host can do that.' });
        if (!A[m.name]) return;
        C.runAs(1, () => A[m.name](m.arg));
        // an action that changed nothing visible still deserves a fresh snapshot
        broadcast(null);
    }
  }

  // ---------- guest: snapshots in ----------
  function guestApply(m) {
    if (m.seq < lastSeq) return;
    lastSeq = m.seq;
    const s = st();
    S.override[1] = m.override; S.done = m.done;
    Game.State.run = m.run;
    s.screen = m.screen; s.currentNode = m.currentNode; s.message = m.message;
    C.SLOT_KEYS.forEach(k => { s[k] = m.slots[k]; });
    C.EPH.forEach(([mod, k]) => { const v = m.eph[mod + '.' + k]; if (Game[mod]) Game[mod][k] = v; });
    s.combat = Game.CoopGuest.fight(m.combat);
    if (m.profile) {
      Game.Progress.data = m.profile.progress; Game.Meta.use(m.profile.meta);
      Game.Progress.save(); Game.Meta.save();   // the guest's own unlocks and embers live on the guest's computer
    }
    S.heroes[0] = m.host.character;
    s.selectedCard = null; s.fx = m.fx;
    s.selectedCard = null;
    Game.UI.render(s);
  }

  // ---------- messages ----------
  Game.Lobby.onGame(m => {
    switch (m.k) {
      case 'goHero':   // guest: the host started
        begin('guest');
        beginHeroPick();
        break;
      case 'hero':     // host: the guest picked
        S.heroes[1] = m.id; S.profiles[1] = m.profile; session.partnerPicked = true;
        if (session.picking) { if (Game.App.state.screen === 'coopLobby') App.go('coopLobby'); hostMaybeStart(); }
        break;
      case 'start':    // guest: the host built the runs; snapshots follow
        S.playing = true; lastSeq = 0; lastProfile = '';
        session.picking = false;
        Game.CoopGuest.install();
        break;
      case 'snap': if (S.playing && C.isGuest()) guestApply(m); break;
      case 'act': if (C.isHost() && S.playing) hostAct(m); break;
      case 'cur': if (Game.CoopCursors) Game.CoopCursors.remote(m); break;
      case 'toast': C.toast(m.text); break;
      case 'bye': break;
    }
  });

  // ---------- ending ----------
  function leave() {
    Game.Lobby.leave();
    if (C.isGuest() && Game.CoopGuest) Game.CoopGuest.uninstall();
    C.reset();
    session.picking = false;
    if (Game.CoopCursors) Game.CoopCursors.clear();
  }

  Game.Events.on('lobby:peerLeft', ({ hostLeft, closed }) => {
    const wasPlaying = S.playing, guest = C.isGuest();
    if (wasPlaying || session.picking) {
      const text = guest || closed ? 'The host left. The co-op session is over.' : 'Your partner left. The co-op session is over.';
      if (guest && Game.CoopGuest) Game.CoopGuest.uninstall();
      C.reset(); session.picking = false;
      if (Game.CoopCursors) Game.CoopCursors.clear();
      if (hostLeft || closed || wasPlaying) {
        if (!hostLeft && !closed) Game.Lobby.leave(); else Game.Net.close();
        App.state.combat = null;
        App.showMessage('Co-op ended', text, 'Back to menu', 'toMenu');
        if (Game.Lobby.state.status !== 'idle') Game.Lobby.state.status = 'idle';
      }
    } else if (App.state.screen === 'coopLobby' || App.state.screen === 'menu') {
      App.go(App.state.screen);
    }
  });

  // The menu panel and the lobby screen follow the connection.
  Game.Events.on('lobby:changed', () => {
    const sc = st().screen, L = Game.Lobby.state;
    if (sc === 'menu' && L.status === 'open') return App.go('coopLobby');
    if (sc === 'coopLobby' && L.status === 'idle' && !S.playing) return App.go('menu');
    if (sc === 'menu' || sc === 'coopLobby') App.go(sc);
  });

  return { session, hostStart, pickHero, broadcast, leave, begin, HOST_ONLY, send };
})();
