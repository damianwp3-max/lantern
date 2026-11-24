// CO-OP ACTIONS (menu panel and lobby buttons). The game rules of co-op are in js/coop/*.js.
Object.assign(Game.Actions, {
  // Menu panel: make a lobby (you are the host).
  coopCreate() {
    const server = (document.getElementById('coop-server') || {}).value || '';
    Game.CoopSession.begin('host');
    Game.Lobby.create(server);
  },
  // Menu panel: join the lobby with this code (you are the guest).
  coopJoin() {
    const server = (document.getElementById('coop-server') || {}).value || '';
    const code = ((document.getElementById('coop-code') || {}).value || '').trim().toUpperCase();
    if (!code) { Game.Lobby.state.error = 'no-code'; return Game.App.go('menu'); }
    Game.CoopSession.begin('guest');
    Game.Lobby.join(server, code);
  },
  coopLeave() {
    Game.CoopSession.leave();
    Game.App.go('menu');
  },
  // Lobby: the host starts. Both players now pick a hero.
  coopStart() {
    Game.CoopSession.hostStart();
  },
  coopServerToggle() {
    const box = document.querySelector('.coop-panel');
    if (box) box.classList.toggle('show-server');
  },
  // Combat: click the teammate (with no card selected) to see their deck and energy.
  showAlly() {
    const s = Game.App.state, c = s.combat;
    if (!c || !c.ally || s.selectedCard !== null || s.giftMode) return;
    Game.UI.coop.showAlly(c);
  },
});

// The hero screen's "Start run" button picks your hero for the co-op run.
(function () {
  const base = Game.Actions.startRun;
  Game.Actions.startRun = function (id) {
    if (Game.CoopSession && Game.CoopSession.session.picking) {
      return Game.CoopSession.pickHero(Game.CHARACTERS[id] ? id : Game.CHARACTER_DEFAULT);
    }
    return base.apply(this, arguments);
  };
})();
