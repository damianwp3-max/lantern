// RELAY SERVER for Lantern Descent co-op.
// Run:  npm install && npm start      (PORT env var, default 8080)
// It does two things only:
//   1. serves the game files (the folder above /server) so one URL = game + relay
//   2. pairs two browsers in a lobby (code) and forwards their messages (WebSocket /ws)
// The game itself runs in the browsers: the host's browser is the authority.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const createRooms = require('./rooms');

const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 8080;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg', '.wav': 'audio/wav', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8' };

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || '/').split('?')[0]);
  if (rel === '/health') { res.writeHead(200); return res.end('ok'); }
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.normalize(path.join(ROOT, rel));
  // only serve the game, never the server folder or anything outside the root
  if (!file.startsWith(ROOT + path.sep) || file.startsWith(__dirname + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

const rooms = createRooms();
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 4 * 1024 * 1024 });

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw); } catch (e) { return; }
    if (msg.t === 'create') rooms.create(ws);
    else if (msg.t === 'join') rooms.join(ws, msg.code);
    else if (msg.t === 'msg') rooms.relay(ws, msg.data);
    else if (msg.t === 'leave') rooms.leave(ws);
  });
  ws.on('close', () => rooms.leave(ws));
  ws.on('error', () => {});
});

// drop dead connections (phones sleeping, wifi gone) so lobbies do not stay half open
setInterval(() => wss.clients.forEach(ws => {
  if (!ws.isAlive) return ws.terminate();
  ws.isAlive = false; ws.ping();
}), 25000);

server.listen(PORT, () => console.log(`Lantern Descent relay + game on http://localhost:${PORT}  (WebSocket: /ws)`));
