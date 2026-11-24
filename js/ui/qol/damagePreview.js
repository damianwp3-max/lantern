// DAMAGE PREVIEW (comfort)
// While you hover an attack card, or aim it by dragging, the health bar of each
// enemy it will hit shows the part it will lose (block first), with the number,
// and a "KO" tag when it is enough to finish it. Uses the real rules
// (strength, Weak, Vulnerable, timing range) through Game.Statuses.modifyDamage.
// Setting: 'damagePreview' (data/shortcutsData.js).
//   Game.UI.damagePreview.predict(c, cardId, enemy) -> { min, max } or null
Game.UI = Game.UI || {};

Game.UI.damagePreview = (function () {
  const tr = (s, v) => Game.I18N.translate(String(s).replace(/\{(\w+)\}/g, (m, k) => (v && v[k] !== undefined ? v[k] : m)));   // fill, then translate
  const on = () => !Game.Settings || Game.Settings.get('damagePreview') !== false;
  const combat = () => Game.App && Game.App.state.screen === 'combat' && Game.App.state.combat;
  const DAMAGE = { damage: 1, damageHealOnKill: 1, damageFromBlock: 1 };

  function predict(c, cardId, enemy) {
    const card = Game.CARDS[cardId];
    if (!card || !enemy || enemy.hp <= 0) return null;
    const p = c.player, S = Game.Statuses;
    const swing = card.timed && Game.Timing.enabled() ? Game.TIMING.ratings.map(r => r.mult) : [1];
    const lo = Math.min(...swing), hi = Math.max(...swing);
    let min = 0, max = 0, any = false;
    (card.effects || []).forEach(e => {
      if (!DAMAGE[e.type]) return;
      const scope = e.target || card.target;
      if (scope !== 'enemy' && scope !== 'all') return;
      if (scope === 'enemy' && Game.Combat.currentTarget(c) !== enemy) return;
      if (enemy.statuses && enemy.statuses.burrowed) return;   // underground: cards cannot reach it
      any = true;
      const hits = (e.hits || 1) * (card.xcost ? p.energy : 1);
      const str = e.flat ? 0 : (p.strength || 0);
      const one = (amount, mult) => S.modifyDamage(p, enemy, e.type === 'damageFromBlock' ? p.block : Math.max(0, Math.round((amount + str) * mult)));
      const a = e.amount || 0, b = e.max !== undefined ? e.max : a;
      min += one(a, e.timed === false ? 1 : lo) * hits;
      max += one(b, e.timed === false ? 1 : hi) * hits;
    });
    return any ? { min, max } : null;
  }

  function clear() {
    document.querySelectorAll('.hp-preview, .dmg-preview-tag').forEach(n => n.remove());
    document.querySelectorAll('.enemy.preview-ko').forEach(n => n.classList.remove('preview-ko'));
  }

  function show(cardId, onlyUid) {
    clear();
    const c = combat();
    if (!on() || !c || c.outcome) return;
    c.enemies.forEach(e => {
      if (onlyUid !== undefined && e.uid !== onlyUid) return;
      const saved = c.targetUid;
      if (onlyUid !== undefined) c.targetUid = onlyUid;   // aiming at someone else than the target
      const r = predict(c, cardId, e);
      c.targetUid = saved;
      if (!r) return;
      const el = document.querySelector(`.enemy[data-arg="${e.uid}"]`);
      const bar = el && el.querySelector('.hpbar');
      if (!bar) return;
      const afterBlock = n => Math.max(0, n - e.block);
      const lost = Math.min(e.hp, afterBlock(r.max)), sure = Math.min(e.hp, afterBlock(r.min));
      const pct = n => (100 * n / e.maxHp).toFixed(2);
      const left = e.hp - lost;
      bar.insertAdjacentHTML('beforeend', `<i class="hp-preview" style="left:${pct(left)}%;width:${pct(lost)}%"></i>`
        + (sure < lost ? `<i class="hp-preview sure" style="left:${pct(e.hp - sure)}%;width:${pct(sure)}%"></i>` : ''));
      const ko = afterBlock(r.min) >= e.hp, maybe = !ko && afterBlock(r.max) >= e.hp;
      const num = r.min === r.max ? r.min : `${r.min}–${r.max}`;
      el.classList.toggle('preview-ko', ko);
      el.insertAdjacentHTML('beforeend', `<span class="dmg-preview-tag ${ko ? 'ko' : maybe ? 'maybe' : ''}">${ko ? '<b>KO</b>' : ''}<span>−${num}</span>${e.block ? `<small>${tr('{n} blocked', { n: Math.min(e.block, r.max) })}</small>` : ''}</span>`);
    });
  }

  // Hover a card in your hand.
  document.addEventListener('pointerover', e => {
    if (document.body.classList.contains('dragging-card')) return;
    const card = e.target.closest && e.target.closest('.hand .card[data-index]');
    const c = combat();
    if (!card || !c) return;
    const id = c.hand[Number(card.dataset.index)];
    if (id) show(id);
  });
  document.addEventListener('pointerout', e => {
    if (document.body.classList.contains('dragging-card')) return;
    const card = e.target.closest && e.target.closest('.hand .card[data-index]');
    if (card && !card.contains(e.relatedTarget)) { const c = combat(); if (c && Game.App.state.selectedCard !== null) return show(c.hand[Game.App.state.selectedCard]); clear(); }
  });
  // Aiming by drag: follow the enemy that lights up.
  let last = null;
  document.addEventListener('pointermove', () => {
    if (!document.body.classList.contains('aim-drag')) { last = null; return; }
    const c = combat(), cardEl = document.querySelector('.hand .card.aiming'), foe = document.querySelector('.enemy.droptarget');
    const key = (cardEl && cardEl.dataset.index) + ':' + (foe && foe.dataset.arg);
    if (key === last || !c || !cardEl) return;
    last = key;
    if (!foe) return clear();
    show(c.hand[Number(cardEl.dataset.index)], Number(foe.dataset.arg));
  });
  // A card picked by click keeps its preview on the target.
  Game.Events.on('ui:rendered', ({ screen, app }) => {
    if (screen !== 'combat' || !app.combat || app.selectedCard === null || app.selectedCard === undefined) return;
    show(app.combat.hand[app.selectedCard]);
  });

  return { predict, show, clear };
})();
