// NET (transport)
// A thin wrapper around one WebSocket to the relay server (server/server.js).
// Knows nothing about the game: it connects, sends JSON and calls listeners by message type.
//   Game.Net.connect(address)   -> Promise (resolves when open, rejects on failure)
//   Game.Net.send(obj)          send { t: ..., ... } to the relay
//   Game.Net.on(type, fn)       listen for relay messages of that type ('created', 'joined', 'msg', ...)
//   Game.Net.close() / Game.Net.isOpen()
//   Game.Net.address(input)     turns what the player typed into a ws:// or wss:// URL
Game.Net = (function () {
  let ws = null;
  const handlers = {};

  function address(input) {
    let a = String(input || '').trim();
    if (!a) {
      if (location.protocol === 'file:') return '';
      return (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws';
    }
    a = a.replace(/^https:\/\//i, 'wss://').replace(/^http:\/\//i, 'ws://');
    if (!/^wss?:\/\//i.test(a)) a = (/^(localhost|127\.|192\.168\.|10\.)/.test(a) ? 'ws://' : 'wss://') + a;
    if (!/\/ws$/.test(a)) a = a.replace(/\/+$/, '') + '/ws';
    return a;
  }

  function emit(type, msg) { (handlers[type] || []).slice().forEach(fn => fn(msg)); }

  function connect(input) {
    close();
    const url = address(input);
    return new Promise((resolve, reject) => {
      if (!url) return reject(new Error('no-address'));
      let opened = false;
      try { ws = new WebSocket(url); } catch (e) { return reject(e); }
      const mine = ws;
      mine.onopen = () => { opened = true; resolve(); };
      mine.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } emit(m.t, m); };
      mine.onerror = () => { if (!opened) reject(new Error('connect-failed')); };
      mine.onclose = () => { if (ws === mine) ws = null; if (opened) emit('closed', { t: 'closed' }); else reject(new Error('connect-failed')); };
    });
  }

  function send(obj) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj)); }
  function close() { if (ws) { const w = ws; ws = null; w.onclose = null; try { w.close(); } catch (e) { /* already closed */ } } }
  function on(type, fn) { (handlers[type] = handlers[type] || []).push(fn); }

  return { connect, send, on, close, isOpen: () => !!ws && ws.readyState === 1, address };
})();
