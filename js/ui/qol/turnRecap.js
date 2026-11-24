// TURN FLOW (comfort)
//  - "Your turn" ribbon with the turn number when a new turn begins.
//  - Enemy recap: after you end your turn, a short list of what happened
//    (hits, block, debuffs, your Bat and pets) fades in over the battlefield,
//    so the enemy phase is readable even though it resolves at once.
// Numbers and filters: Game.TURN_RECAP (data/shortcutsData.js). Styles: css/qol.css.
(function () {
  const tr = (s, v) => Game.I18N.translate(String(s).replace(/\{(\w+)\}/g, (m, k) => (v && v[k] !== undefined ? v[k] : m)));   // fill, then translate
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  let snapshot = null, lastTurn = { combat: null, turn: 0 };

  function newLines(before, after) {
    if (before.length < 40) return after.slice(before.length);
    const i = after.lastIndexOf(before[before.length - 1]);
    return i >= 0 ? after.slice(i + 1) : [];
  }

  function kind(line) {
    if (/hits you|you take/i.test(line)) return 'hurt';
    if (/your (bat|[a-z ]+) (falls|heals)|your /i.test(line)) return 'ally';
    if (/block/i.test(line)) return 'block';
    return '';
  }

  function recap(lines) {
    const R = Game.TURN_RECAP;
    const keep = lines.filter(l => !R.skip.some(re => re.test(l))).slice(-R.maxLines);
    const field = document.querySelector('.battlefield');
    if (!keep.length || !field) return;
    field.insertAdjacentHTML('beforeend', `<div class="turn-recap" style="--ms:${R.ms}ms"><div class="tr-title">${esc(Game.t('Enemy turn'))}</div>
      ${keep.map((l, i) => `<div class="tr-line ${kind(l)}" style="--i:${i}">${esc(Game.t(l))}</div>`).join('')}</div>`);
  }

  function ribbon(turn) {
    const field = document.querySelector('.battlefield');
    if (!field) return;
    field.insertAdjacentHTML('beforeend', `<div class="turn-ribbon"><span>${esc(Game.t('Your turn'))}</span><b>${esc(tr('Turn {n}', { n: turn }))}</b></div>`);
  }

  Game.Events.on('turn:end', ({ combat }) => { snapshot = { combat, log: combat.log.slice() }; });
  Game.Events.on('ui:rendered', ({ screen, app }) => {
    const c = app.combat;
    if (screen !== 'combat' || !c) return;
    if (snapshot && snapshot.combat === c && c.turn > (lastTurn.combat === c ? lastTurn.turn : 0)) recap(newLines(snapshot.log, c.log));
    if (!c.outcome && (lastTurn.combat !== c || c.turn > lastTurn.turn)) ribbon(c.turn);
    if (snapshot && snapshot.combat === c && c.turn > lastTurn.turn) snapshot = null;
    lastTurn = { combat: c, turn: c.turn };
  });
})();
