// HOTKEYS (comfort). Adds keys on top of ui/keyboard.js (which keeps the fight keys):
//   any screen   1-9 pick an option, Enter/Space continue, Esc back/leave/skip
//                (which elements: Game.SCREEN_KEYS in data/shortcutsData.js)
//   fight        Tab next target, D draw pile, X discard pile, right click = put the card back
//   everywhere   V your deck, H or ? the Controls window (Game.SHORTCUT_HELP)
// Small key badges are drawn on hand cards and options when the 'keyHints' setting is on.
// Only calls existing actions or clicks existing buttons, so no game rules live here.
(function () {
  const app = () => Game.App && Game.App.state;
  const A = () => Game.Actions;
  const hints = () => !Game.Settings || Game.Settings.get('keyHints') !== false;
  const blocked = () => (Game.UI.overlay && Game.UI.overlay.isOpen()) || document.querySelector('.timing-layer') || (Game.Juice && Game.Juice.busy);
  const clickable = el => el && !el.disabled && !el.classList.contains('disabled');

  function list(sel) { return sel ? [...document.querySelectorAll(`#app ${sel.split(',').join(', #app ')}`)].filter(clickable) : []; }
  function press(el) { if (clickable(el)) el.click(); }

  // --- Badges ---
  function badge(el, key) {
    if (!el || el.querySelector(':scope > .key-hint')) return;
    el.insertAdjacentHTML('beforeend', `<span class="key-hint">${key}</span>`);
  }
  function drawHints(screen) {
    document.body.classList.toggle('no-key-hints', !hints());
    if (!hints()) return;
    if (screen === 'combat') {
      document.querySelectorAll('.hand .card[data-index]').forEach(el => { const i = +el.dataset.index; if (i < 9) badge(el, i + 1); });
      return;
    }
    const def = Game.SCREEN_KEYS[screen];
    if (def && def.choices) list(def.choices).slice(0, 9).forEach((el, i) => badge(el, i + 1));
  }

  // --- The Controls window ---
  function showHelp() {
    const esc = Game.UI.components.esc;
    const body = Game.SHORTCUT_HELP.map(g => `<div class="kh-group"><h3>${esc(Game.t(g.group))}</h3>
      ${g.keys.map(([k, what]) => `<div class="kh-row"><span class="kh-keys">${k.split(/( \/ |, | or )/).map(p => /^( \/ |, | or )$/.test(p) ? `<i>${esc(Game.t(p.trim()))}</i>` : `<kbd>${esc(Game.t(p))}</kbd>`).join('')}</span><span>${esc(Game.t(what))}</span></div>`).join('')}</div>`).join('');
    Game.UI.overlay.open(Game.t('Controls'), `<div class="key-help">${body}</div>`, { note: Game.t('Hover anything to read what it does.') });
  }

  function cycleTarget(c, dir) {
    const alive = Game.Combat.targetableEnemies ? Game.Combat.targetableEnemies(c) : Game.Combat.livingEnemies(c);
    if (!alive.length) return;
    const cur = alive.indexOf(Game.Combat.currentTarget(c));
    const next = alive[(cur + dir + alive.length) % alive.length];
    Game.Combat.setTarget(c, next.uid);
    Game.App.go('combat');
  }

  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || !app() || blocked()) return;
    const s = app().screen, k = e.key;
    const inRun = !!(Game.State && Game.State.run);

    if (k === 'h' || k === 'H' || k === '?') { e.preventDefault(); return showHelp(); }
    if ((k === 'v' || k === 'V') && inRun && s !== 'deck' && s !== 'menu') return A().viewDeck();

    if (s === 'combat' && app().combat) {
      const c = app().combat;
      if (k === 'Tab') { e.preventDefault(); return cycleTarget(c, e.shiftKey ? -1 : 1); }
      if ((k === 'd' || k === 'D') && A().showPile) return A().showPile('draw');
      if ((k === 'x' || k === 'X') && A().showPile) return A().showPile('discard');
      return;   // the rest of the fight keys: ui/keyboard.js
    }

    const def = Game.SCREEN_KEYS[s];
    if (!def) return;
    const n = /^[1-9]$/.test(k) ? Number(k) - 1 : -1;
    if (n >= 0 && def.choices && !def.keysElsewhere) { const el = list(def.choices)[n]; if (el) { e.preventDefault(); press(el); } return; }
    if ((k === 'Enter' || k === ' ') && def.confirm) { const el = list(def.confirm)[0]; if (el) { e.preventDefault(); press(el); } return; }
    if ((k === 'Escape' || k === 'Backspace') && def.back) { const el = list(def.back)[0]; if (el) { e.preventDefault(); press(el); } }
  });

  // Right click puts a picked card back (and never opens the browser menu in a fight).
  document.addEventListener('contextmenu', e => {
    if (!app() || app().screen !== 'combat') return;
    e.preventDefault();
    if (app().selectedCard !== null && A().cancelCard) A().cancelCard();
  });

  Game.Events.on('ui:rendered', ({ screen }) => drawHints(screen));
  Game.Events.on('settings:changed', ({ id }) => { if (id === 'keyHints' && app()) Game.App.go(app().screen); });

  // The "? Controls" chip under the fight opens the same window.
  Game.Actions.showControls = showHelp;
  Game.Events.on('ui:rendered', () => document.querySelectorAll('.help-dot').forEach(el => { el.dataset.action = 'showControls'; }));

  Game.UI.hotkeys = { showHelp };
})();
