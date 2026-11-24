// ROOMS: who is in which lobby. No game rules live here, the relay only pairs two players.
// A room has a host (the creator) and at most one guest. Codes are 5 letters/digits.
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // no 0/O/1/I to avoid mixups

module.exports = function createRooms() {
  const rooms = new Map();   // code -> { host: ws, guest: ws|null }

  function newCode() {
    for (;;) {
      let code = '';
      for (let i = 0; i < 5; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      if (!rooms.has(code)) return code;
    }
  }
  const send = (ws, msg) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg)); };

  function create(ws) {
    leave(ws);
    const code = newCode();
    rooms.set(code, { host: ws, guest: null });
    ws.room = code; ws.role = 'host';
    send(ws, { t: 'created', code });
  }

  function join(ws, rawCode) {
    leave(ws);
    const code = String(rawCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return send(ws, { t: 'error', error: 'no-such-lobby' });
    if (room.guest) return send(ws, { t: 'error', error: 'lobby-full' });
    room.guest = ws;
    ws.room = code; ws.role = 'guest';
    send(ws, { t: 'joined', code });
    send(room.host, { t: 'peerJoined' });
  }

  // Forward a game message to the other player of the room.
  function relay(ws, data) {
    const room = rooms.get(ws.room);
    if (!room) return;
    send(ws.role === 'host' ? room.guest : room.host, { t: 'msg', data });
  }

  function leave(ws) {
    const room = rooms.get(ws.room);
    if (!room) return;
    if (ws.role === 'host') {                  // host gone: the lobby closes
      send(room.guest, { t: 'peerLeft', hostLeft: true });
      if (room.guest) { room.guest.room = null; }
      rooms.delete(ws.room);
    } else {                                   // guest gone: the host can wait for a new one
      room.guest = null;
      send(room.host, { t: 'peerLeft' });
    }
    ws.room = null; ws.role = null;
  }

  return { create, join, relay, leave, count: () => rooms.size };
};
