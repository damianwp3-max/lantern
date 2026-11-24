// END TURN GUARD (comfort)
//  - If you can still play a card, the first End Turn press (click, E or Space)
//    only shows a small "press again" bubble; the second press within a few
//    seconds ends the turn. Setting: 'confirmEndTurn' (data/shortcutsData.js).
//  - The End Turn button glows when nothing in your hand is playable, so you
//    know the turn is done.
(function () {
  const tr = (s, v) => Game.I18N.translate(String(s).replace(/\{(\w+)\}/g, (m, k) => (v && v[k] !== undefined ? v[k] : m)));   // fill, then translate
  const ARM_MS = 2600;
  let armedAt = 0;
  const c = () => Game.App.state.combat;
  const playable = combat => combat ? combat.hand.filter((_, i) => Game.Combat.canPlay(combat, i)).length : 0;
  const on = () => !Game.Settings || Game.Settings.get('confirmEndTurn') !== false;

  function bubble(n) {
    const btn = document.querySelector('.end-turn-btn');
    if (!btn) return;
    btn.querySelector('.et-confirm')?.remove();
    btn.classList.add('armed');
    btn.insertAdjacentHTML('beforeend', `<span class="et-confirm">${tr(n === 1 ? 'You can still play 1 card.' : 'You can still play {n} cards.', { n })}<b>${Game.t('Press again to end the turn')}</b></span>`);
    setTimeout(() => { if (Date.now() - armedAt >= ARM_MS - 20) { btn.classList.remove('armed'); btn.querySelector('.et-confirm')?.remove(); } }, ARM_MS);
  }

  const base = Game.Actions.endTurn;
  Game.Actions.endTurn = function () {
    const combat = c();
    if (!combat || combat.outcome || (Game.Juice && Game.Juice.busy)) return base.apply(this, arguments);
    const n = playable(combat);
    if (on() && n > 0 && Date.now() - armedAt > ARM_MS) {
      armedAt = Date.now();
      return bubble(n);
    }
    armedAt = 0;
    return base.apply(this, arguments);
  };

  // Button state after every draw of the fight.
  Game.Events.on('ui:rendered', ({ screen }) => {
    if (screen !== 'combat') return;
    const btn = document.querySelector('.end-turn-btn'), combat = c();
    if (!btn || !combat) return;
    const n = playable(combat);
    btn.classList.toggle('et-done', n === 0 && !combat.outcome);
    armedAt = 0;
  });
})();
