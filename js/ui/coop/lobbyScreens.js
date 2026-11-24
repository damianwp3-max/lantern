// CO-OP SCREENS: the menu panel (bottom-right), the lobby, and "waiting for your partner".
// Rules: js/net/lobby.js, js/coop/session.js. Clicks: app/actions/coopActions.js. Styles: css/coop.css.
Game.UI = Game.UI || {};

Game.UI.coopPanel = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const T = s => esc(Game.t(s));

  const ERRORS = {
    'no-such-lobby': 'No lobby with that code.', 'lobby-full': 'That lobby is full.', 'connect-failed': 'Could not reach the server.',
    'no-address': 'Type the server address first.', 'no-code': 'Type the lobby code first.', disconnected: 'Connection lost.',
  };

  // The small window in the corner of the main menu.
  function html() {
    const L = Game.Lobby.state;
    const needServer = location.protocol === 'file:';
    const server = Game.Lobby.savedServer() || (needServer ? Game.COOP.defaultServer : '');
    const busy = L.status === 'connecting';
    return `<div class="coop-panel ${needServer ? 'show-server' : ''}">
      <div class="cp-head"><b>${T('Co-op (2 players)')}</b>
        <button class="cp-gear" data-action="coopServerToggle" title="${esc(Game.t('Server address'))}">⚙</button></div>
      <input id="coop-server" class="cp-server" type="text" spellcheck="false" placeholder="${esc(Game.t('Server address (empty = this page)'))}" value="${esc(server)}">
      <button class="cp-btn" data-action="coopCreate" ${busy ? 'disabled' : ''}>${T('Create lobby')}</button>
      <div class="cp-join">
        <input id="coop-code" type="text" maxlength="${Game.COOP.codeLength}" spellcheck="false" autocomplete="off" placeholder="${esc(Game.t('CODE'))}">
        <button class="cp-btn" data-action="coopJoin" ${busy ? 'disabled' : ''}>${T('Join lobby')}</button>
      </div>
      ${busy ? `<div class="cp-msg">${T('Connecting...')}</div>` : ''}
      ${L.error ? `<div class="cp-msg err">${T(ERRORS[L.error] || L.error)}</div>` : ''}
    </div>`;
  }
  return { html };
})();

// THE LOBBY (after Create / Join, and while both heroes are being picked)
Game.UI.registerScreen('coopLobby', function () {
  const { esc, button } = Game.UI.components;
  const L = Game.Lobby.state, S = Game.Coop.S, sess = Game.CoopSession.session;
  const host = L.role === 'host';
  const K = Game.COOP;
  const seat = (i, label, here) => `<div class="cl-seat ${here ? 'here' : ''}" style="--cc:${K.cursorColors[i]}">
      <b>${esc(Game.t(K.seatNames[i]))}</b><span>${esc(Game.t(label))}</span></div>`;

  let body;
  if (sess.picking) {
    body = `<p class="cl-note">${esc(Game.t(sess.myHero ? 'Hero picked. Waiting for your partner to pick...' : 'Pick your hero...'))}</p>`;
  } else if (host) {
    body = `<p class="cl-note">${esc(Game.t(L.peer ? 'Your partner is here. Start when you are ready.' : 'Waiting for your partner. Share the code!'))}</p>
      <div class="cl-actions">${button('Start co-op', 'coopStart', undefined, !L.peer)}${button('Leave', 'coopLeave')}</div>`;
  } else {
    body = `<p class="cl-note">${esc(Game.t('Connected. Waiting for the host to start...'))}</p><div class="cl-actions">${button('Leave', 'coopLeave')}</div>`;
  }
  return `<div class="center coop-lobby"><div class="cl-panel">
    <h1>${esc(Game.t('Co-op lobby'))}</h1>
    <div class="cl-code" title="${esc(Game.t('Lobby code'))}">${esc(L.code || '-----')}</div>
    <div class="cl-seats">
      ${seat(0, host ? 'You (host)' : 'Host', true)}
      ${seat(1, host ? (L.peer ? 'Partner connected' : 'Waiting...') : 'You', host ? L.peer : true)}
    </div>
    ${body}
  </div></div>`;
});

// After you chose your reward / rest option / event answer: wait for the teammate.
Game.UI.registerScreen('coopWait', function () {
  const { esc } = Game.UI.components;
  const other = 1 - Game.Coop.me();
  return `<div class="center coop-lobby"><div class="cl-panel">
    <h1>${esc(Game.t('Waiting for your partner...'))}</h1>
    <p class="cl-note">${esc(Game.t('{name} is still choosing.', { name: Game.t(Game.COOP.seatNames[other]) }))}</p>
    <div class="cl-dots"><i></i><i></i><i></i></div>
  </div></div>`;
});

// Typing a lobby code or server address must not trigger the game's hotkeys (1-9, E, V...).
document.addEventListener('keydown', e => {
  if (e.target && e.target.matches && e.target.matches('.coop-panel input')) e.stopPropagation();
}, true);
