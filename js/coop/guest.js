// CO-OP GUEST (the second player's clicks)
// The guest's browser does not run the game. While a co-op run is on, every game action is
// replaced by a small function that sends the click to the host (session.js 'act'),
// except views that only concern this player (piles, own deck, settings...).
// Card playing needs a bit more: picking a target and the timing bar happen here, then the host
// gets one clear message ("play card 3 on enemy 1, timing: great").
Game.CoopGuest = (function () {
  const C = Game.Coop, S = C.S;
  const A = Game.Actions, App = Game.App;
  // Things that only show something to this player and never change the game.
  const LOCAL = new Set(['showPile', 'showPowers', 'showSettings', 'setSetting', 'practiceTiming', 'viewDeck', 'back',
    'showAlly', 'giftToggle', 'afterCombatAction']);
  let raw = null;            // the guest's copy of the fight, updated in place so drawing code can remember it
  let saved = null;

  const send = d => Game.CoopSession.send(Object.assign({ k: 'act' }, d));
  const view = () => App.state.combat;
  const J = () => Game.Juice || {};

  function shake(index) {
    const el = document.querySelector(`.hand .card[data-index="${index}"]`);
    if (el) el.animate([{ translate: '0 0' }, { translate: '-6px 0' }, { translate: '6px 0' }, { translate: '0 0' }], { duration: 220 });
  }

  // Play a card: the timing bar first (timed cards), then one message to the host.
  function play(index, uid) {
    const c = view(), card = Game.CARDS[c.hand[index]];
    const go = timing => send({ name: 'playCard', index, uid: uid === undefined ? null : uid, timing: timing || null });
    App.state.selectedCard = null;
    if (card.timed && Game.Timing.enabled() && Game.UI.timing) return Game.UI.timing.run(card, go);
    go(null);
  }

  const actions = {
    selectCard(index) {
      const s = App.state, c = view();
      if (J().busy || !c || c.outcome) return;
      index = Number(index);
      if (!c.myTurn) return C.toast("It is your teammate's turn.");
      if (s.giftMode) { s.giftMode = false; send({ name: 'gift', index }); return; }
      if (!Game.Combat.canPlay(c, index)) return shake(index);
      const card = Game.CARDS[c.hand[index]];
      if (card.target === 'enemy' && Game.Combat.targetableEnemies(c).length > 1) {
        s.selectedCard = s.selectedCard === index ? null : index;
        return Game.UI.render(s);
      }
      play(index);
    },
    cancelCard() {
      const s = App.state;
      if (s.selectedCard === null && !s.giftMode) return;
      s.selectedCard = null; s.giftMode = false;
      Game.UI.render(s);
    },
    target(uid) {
      const s = App.state;
      if (J().busy) return;
      uid = Number(uid);
      if (s.selectedCard !== null && view().myTurn) return play(s.selectedCard, uid);
      send({ name: 'setTarget', uid });
    },
    endTurn() {
      const c = view();
      if (J().busy || !c || c.outcome) return;
      if (!c.myTurn) return C.toast("It is your teammate's turn.");
      App.state.selectedCard = null;
      send({ name: 'endTurn' });
    },
    flare() { if (view() && view().myTurn) send({ name: 'flare' }); },
    toMenu() { Game.CoopSession.leave(); saved.actions.toMenu.call(A); },
  };

  // A snapshot's fight -> the fight as THIS player sees it (same object every time within one fight).
  function fight(c) {
    if (!c) { raw = null; return null; }
    if (!raw || raw.fightId !== c.fightId) raw = {};
    C.replaceInPlace(raw, c);
    return C.view(raw, 1);
  }

  function install() {
    saved = { actions: Object.assign({}, A), drop: App.dropCard };
    Object.keys(A).forEach(name => {
      if (LOCAL.has(name)) return;
      A[name] = Game.CoopSession.HOST_ONLY.has(name)
        ? () => C.toast('Only the host can do that.')
        : arg => send({ name, arg });
    });
    Object.assign(A, actions);
    App.dropCard = function (index, uid) {
      const s = App.state, c = view();
      if (J().busy || !c || !c.myTurn || !Game.Combat.canPlay(c, index)) return;
      if (uid !== null && uid !== undefined) send({ name: 'setTarget', uid: Number(uid) });
      s.selectedCard = null;
      play(index, uid);
    };
  }

  function uninstall() {
    if (!saved) return;
    Object.keys(A).forEach(k => { if (!(k in saved.actions)) delete A[k]; });
    Object.assign(A, saved.actions);
    App.dropCard = saved.drop;
    saved = null;
  }

  return { install, uninstall, fight };
})();
