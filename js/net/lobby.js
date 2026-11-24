// LOBBY (who is connected)
// Create a lobby (you are the host) or join one by its code (you are the guest).
// Holds only the connection status; the game messages themselves go through Game.Net
// as { t: 'msg', data } and are handled by js/coop/session.js.
//   Game.Lobby.state      { status, code, role, peer, error }
//       status: 'idle' | 'connecting' | 'open'      role: 'host' | 'guest' | null     peer: teammate is here
//   Game.Lobby.create(server) / join(server, code) / leave()
//   Game.Lobby.sendGame(data)      send a game message to the teammate
//   Game.Lobby.onGame(fn)          listen for game messages from the teammate
//   Game.Events: 'lobby:changed'
Game.Lobby = (function () {
  const state = { status: 'idle', code: null, role: null, peer: false, error: null, server: '' };
  const gameListeners = [];
  const changed = () => Game.Events.emit('lobby:changed', { state });

  function reset(error) {
    Object.assign(state, { status: 'idle', code: null, role: null, peer: false, error: error || null });
    changed();
  }

  function saveServer(s) { try { localStorage.setItem(Game.COOP.serverKey, s || ''); } catch (e) { /* blocked */ } }
  function savedServer() { try { return localStorage.getItem(Game.COOP.serverKey) || ''; } catch (e) { return ''; } }

  async function open(server) {
    state.status = 'connecting'; state.error = null; state.server = server || '';
    changed();
    try { await Game.Net.connect(server); }
    catch (e) { reset(e.message === 'no-address' ? 'no-address' : 'connect-failed'); return false; }
    saveServer(server);
    return true;
  }

  async function create(server) {
    if (!(await open(server))) return;
    state.role = 'host';
    Game.Net.send({ t: 'create' });
  }

  async function join(server, code) {
    if (!(await open(server))) return;
    state.role = 'guest';
    Game.Net.send({ t: 'join', code });
  }

  function leave() {
    Game.Net.send({ t: 'leave' });
    Game.Net.close();
    reset();
  }

  Game.Net.on('created', m => { state.status = 'open'; state.code = m.code; changed(); });
  Game.Net.on('joined', m => { state.status = 'open'; state.code = m.code; state.peer = true; changed(); });
  Game.Net.on('peerJoined', () => { state.peer = true; changed(); });
  Game.Net.on('peerLeft', m => {
    state.peer = false; changed();
    Game.Events.emit('lobby:peerLeft', { hostLeft: !!m.hostLeft });
  });
  Game.Net.on('error', m => { const role = state.role; Game.Net.close(); reset(m.error); state.role = null; if (role) changed(); });
  Game.Net.on('closed', () => { if (state.status !== 'idle') { reset('disconnected'); Game.Events.emit('lobby:peerLeft', { hostLeft: true, closed: true }); } });
  Game.Net.on('msg', m => gameListeners.forEach(fn => fn(m.data)));

  return {
    state, create, join, leave, savedServer,
    sendGame: data => Game.Net.send({ t: 'msg', data }),
    onGame: fn => gameListeners.push(fn),
  };
})();
