// CO-OP CORE
// Two players, one fight. The HOST's browser runs the whole game (both heroes), the GUEST's browser
// shows what the host sends and sends back its clicks (see session.js). This file holds the shared
// co-op state and the "seat" tools every other co-op file uses.
//
// A SEAT is one player: seat 0 = host, seat 1 = guest. Each seat has its own run (deck, hp, gold,
// totems...), its own profile (unlock progress + embers) and, in a fight, its own hand, piles,
// energy, block, pets and powers. The existing game code only knows ONE player, so we "context swap":
//   Game.Coop.setCtx(i)         point Game.State.run / Game.Progress / Game.Meta and the per-seat screen
//                               state (reward choices, rest choices...) at seat i
//   Game.Coop.activate(c, i)    same for a fight: seat i's hand/piles/pets/powers become c.hand, c.pets...
//   Game.Coop.view(c, me)       a read-only copy of the fight as seat `me` sees it (own hand + ally info)
//   Game.Coop.runAs(i, fn)      run fn with seat i's context, then go back to the host's
// In a fight, c.active is whose turn it is; the other seat's fields wait in c.seats[i].
Game.Coop = (function () {
  // What belongs to ONE player inside a combat object (everything else on it is shared).
  const SEAT_KEYS = ['player', 'drawPile', 'hand', 'discardPile', 'exhausted', 'handSize', 'pets', 'powers', 'bat', 'delayed', 'extraTurns', 'cardsThisTurn', 'flared', 'lastTiming'];
  // Screen state that is per player (each one gets their own reward cards, rest choices...).
  const SLOT_KEYS = ['rewardChoices', 'rewardExtras', 'restChoices', 'caveEvent', 'picker', 'runEnd'];
  // "Last fight" numbers some modules keep on themselves, also per player.
  const EPH = [['Gold', 'lastGain'], ['Unlocks', 'lastNew'], ['Unlocks', 'lastXp'], ['Packs', 'lastEarned'], ['HeroUnlocks', 'lastNew'], ['Lantern', 'lastAward']];
  // Screens where the game waits until BOTH players have chosen.
  const WAIT_SCREENS = ['reward', 'rest', 'event'];

  const S = {
    role: null,            // null | 'host' | 'guest'
    playing: false,        // a co-op run is going on
    runs: [null, null],
    profiles: [null, null],
    slots: [{}, {}],
    eph: [{}, {}],
    done: [false, false],  // has this player finished the current reward / rest / event?
    override: [null, null],   // a player-only screen on top of the shared one (card picker)
    local: [null, null],      // a purely local screen (own deck view)
    cur: 0,                // which seat's context is loaded right now (host only)
    heroes: [null, null],
  };

  const me = () => (S.role === 'guest' ? 1 : 0);
  const views = new WeakMap();

  // --- context swap ---
  function setCtx(i) {
    if (S.role !== 'host' || i === S.cur) return;
    const st = Game.App.state;
    const from = S.slots[S.cur], fe = S.eph[S.cur];
    SLOT_KEYS.forEach(k => { from[k] = st[k]; });
    EPH.forEach(([m, k]) => { if (Game[m]) fe[m + k] = Game[m][k]; });
    const to = S.slots[i], te = S.eph[i];
    SLOT_KEYS.forEach(k => { st[k] = to[k]; });
    EPH.forEach(([m, k]) => { if (Game[m] && (m + k) in te) Game[m][k] = te[m + k]; });
    Game.State.run = S.runs[i];
    if (S.profiles[i]) { Game.Progress.data = S.profiles[i].progress; Game.Meta.use(S.profiles[i].meta); }
    S.cur = i;
  }

  // Run fn as seat i, then return to seat 0 (synchronous things only).
  function runAs(i, fn) {
    const prev = S.cur;
    setCtx(i);
    S.headless = i !== 0;
    try { return fn(); } finally { S.headless = false; setCtx(prev); }
  }

  // --- seats inside a fight ---
  function pick(c) { const o = {}; SEAT_KEYS.forEach(k => { o[k] = c[k]; }); return o; }
  function put(c, f) { SEAT_KEYS.forEach(k => { c[k] = f[k]; }); }
  const fieldsOf = (c, i) => (i === c.active ? pick(c) : c.seats[i]);

  function activate(c, i) {
    if (!c.seats || c.active === i) return;
    c.seats[c.active] = pick(c);
    put(c, c.seats[i]);
    c.seats[i] = null;
    c.active = i;
    setCtx(i);
  }

  const alive = (c, i) => !c.info[i].dead;
  const otherSeat = (c, i) => 1 - i;

  // The fight as seat `me` sees it: their own hand/piles at the top level, the teammate in .ally.
  // The same object is reused every time so drawing code that remembers it keeps working.
  function view(c, who) {
    if (!c || !c.seats) return c;
    let by = views.get(c);
    if (!by) { by = {}; views.set(c, by); }
    const V = by[who] || (by[who] = {});
    Object.keys(c).forEach(k => { if (k !== 'seats') V[k] = c[k]; });
    const mine = fieldsOf(c, who), other = fieldsOf(c, 1 - who);
    SEAT_KEYS.forEach(k => { V[k] = mine[k]; });
    V.me = who;
    V.myTurn = c.active === who && !c.outcome;
    V.ally = Object.assign({ seat: 1 - who, info: c.info[1 - who], mine: false }, other);
    V.mine = c.info[who];
    return V;
  }

  // Every card a seat owns in this fight (for the teammate viewer): all piles + hand.
  function allCards(c, i) {
    const f = fieldsOf(c, i);
    return { hand: f.hand, draw: f.drawPile, discard: f.discardPile, exhausted: f.exhausted };
  }

  function replaceInPlace(target, src) {
    Object.keys(target).forEach(k => { if (!(k in src)) delete target[k]; });
    Object.assign(target, src);
  }

  function reset() {
    S.role = null; S.playing = false;
    S.runs = [null, null]; S.profiles = [null, null]; S.slots = [{}, {}]; S.eph = [{}, {}];
    S.done = [false, false]; S.override = [null, null]; S.local = [null, null]; S.cur = 0; S.heroes = [null, null];
  }

  const name = i => Game.t(Game.COOP.seatNames[i]);

  return {
    S, SEAT_KEYS, SLOT_KEYS, EPH, WAIT_SCREENS,
    me, setCtx, runAs, activate, fieldsOf, pick, put, view, allCards, replaceInPlace, reset, alive, otherSeat, name,
    isActive: () => S.playing,
    isHost: () => S.role === 'host',
    isGuest: () => S.role === 'guest',
    ctx: () => S.cur,
    hostOnlyToast(text) { if (Game.Juice && Game.Juice.toast) Game.Juice.toast(text); else Game.Coop.toast(text); },
    toast(text) {
      const d = document.createElement('div');
      d.className = 'coop-toast';
      d.textContent = Game.t(text);
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 2400);
    },
  };
})();
