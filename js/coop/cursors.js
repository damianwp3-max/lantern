// CO-OP CURSORS
// Each player sees where the other one points and clicks: a small coloured cursor with the
// player's name. Positions are sent as a share of the window size (0..1), about 20 times a second.
Game.CoopCursors = (function () {
  const C = Game.Coop, K = () => Game.COOP;
  let el = null, fadeTimer = null, lastSent = 0;

  const color = i => K().cursorColors[i];

  function ensure(seat) {
    if (el && el.dataset.seat === String(seat)) return el;
    if (el) el.remove();
    el = document.createElement('div');
    el.className = 'coop-cursor';
    el.dataset.seat = seat;
    el.style.setProperty('--cc', color(seat));
    el.innerHTML = `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.6 L11 13.2 L18 13 Z" fill="var(--cc)" stroke="#120d16" stroke-width="1.6" stroke-linejoin="round"/></svg><span></span>`;
    document.body.appendChild(el);
    return el;
  }

  // A cursor message from the teammate.
  function remote(m) {
    const seat = C.isGuest() ? 0 : 1;
    const node = ensure(seat);
    node.querySelector('span').textContent = Game.t(K().seatNames[seat]);
    node.style.left = (m.x * window.innerWidth) + 'px';
    node.style.top = (m.y * window.innerHeight) + 'px';
    node.classList.remove('idle');
    if (m.click) {
      const r = document.createElement('div');
      r.className = 'coop-click';
      r.style.left = node.style.left; r.style.top = node.style.top;
      r.style.setProperty('--cc', color(seat));
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 650);
    }
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => node.classList.add('idle'), K().cursorFadeMs);
  }

  function clear() { if (el) { el.remove(); el = null; } }

  function emit(e, click) {
    if (!C.isActive() || !Game.Lobby.state.peer) return;
    const now = performance.now();
    if (!click && now - lastSent < K().cursorSendMs) return;
    lastSent = now;
    Game.CoopSession.send({ k: 'cur', x: +(e.clientX / window.innerWidth).toFixed(4), y: +(e.clientY / window.innerHeight).toFixed(4), click: !!click });
  }

  document.addEventListener('mousemove', e => emit(e, false), { passive: true });
  document.addEventListener('mousedown', e => emit(e, true), { passive: true, capture: true });

  return { remote, clear };
})();
