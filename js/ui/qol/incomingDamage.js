// INCOMING DAMAGE (comfort)
// A small badge on your nameplate adds up every attack the enemies plan this
// turn and says what will get through your block: "Incoming 14 · you lose 9",
// or "Blocked" when your block covers it. Hidden when the lantern is dark
// (then you cannot see intents either). Your Bat and pets take hits first,
// so with an ally out it says so instead of promising an exact number.
// Tooltip text: Game.KEYWORDS.incoming (data/shortcutsData.js).
//   Game.UI.incoming.total(c) -> damage planned against you this turn
Game.UI = Game.UI || {};

Game.UI.incoming = (function () {
  const tr = (s, v) => Game.I18N.translate(String(s).replace(/\{(\w+)\}/g, (m, k) => (v && v[k] !== undefined ? v[k] : m)));   // fill, then translate
  const SWORD = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 L11 5 M11 5 L13 3 L13.4 2.6 M9.5 3.5 L12.5 6.5 M2.5 11.5 L4.5 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';
  const SHIELD = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 L13.5 3.5 V8 Q13.5 12.5 8 14.5 Q2.5 12.5 2.5 8 V3.5Z" fill="currentColor" opacity=".9"/></svg>';

  // Read from the intent bubbles' own numbers (ui/intentView.js), so special
  // moves that also hit (steal, explode, ...) count too.
  function total(c) {
    return Game.Combat.livingEnemies(c).reduce((sum, e) => {
      const m = Game.Combat.intentOf(e);
      if (!m) return sum;
      return sum + Game.UI.intentView.parts(c, e, m).filter(p => p.kind === 'dmg').reduce((t, p) => {
        const [one, times] = String(p.label).split('×').map(Number);
        return t + (one || 0) * (times || 1);
      }, 0);
    }, 0);
  }

  function badge(c) {
    if (c.outcome || (Game.Oil && Game.Oil.isDark(Game.State.run))) return '';
    const n = total(c);
    if (!n) return `<span class="incoming calm" data-tip="keyword:incoming">${SHIELD}<b>${Game.t('No attacks coming')}</b></span>`;
    const allies = (c.bat && c.bat.hp > 0) || (Game.Pets && Game.Pets.living(c).length);
    const through = Math.max(0, n - c.player.block);
    const tail = allies ? `<small>${Game.t('allies first')}</small>`
      : through ? `<small>${tr('you lose {n}', { n: through })}</small>` : `<small class="ok">${Game.t('blocked')}</small>`;
    return `<span class="incoming ${through && !allies ? 'hurt' : 'safe'}" data-tip="keyword:incoming">${SWORD}<b>${n}</b>${tail}</span>`;
  }

  Game.Events.on('ui:rendered', ({ screen, app }) => {
    if (screen !== 'combat' || !app.combat) return;
    const plate = document.querySelector('.near-side .player');
    if (plate) plate.insertAdjacentHTML('afterbegin', badge(app.combat));
  });

  return { total };
})();
