// CARD UPGRADES (rules)
// Works out what an upgrade does to a card (see data/upgradesData.js):
// one less cost, or bigger numbers on its own effects. Returns a plain plan;
// js/cards/variants.js applies it with Game.Upgrades.apply(def, plan).
//   Game.Upgrades.plan(card)  -> { cost: -1 } | { boost: { effectIndex: +n } } | { effects, text } | null
//   Game.Upgrades.can(card)
Game.Upgrades = (function () {
  const D = () => Game.UPGRADE_DEFAULTS;

  // How much one effect would grow, or 0 if it cannot be boosted.
  function boostOf(e) {
    const rule = e && D().boost[e.type];
    if (!rule || typeof e.amount !== 'number' || e.amount <= 0 || e.byRating || e.max != null || e.min != null) return 0;
    if (rule.add) return rule.add;
    return Math.max(rule.min || 1, Math.round(e.amount * rule.pct));
  }

  function boostPlan(card) {
    const boost = {};
    let n = 0;
    (card.effects || []).forEach((e, i) => {
      if (n >= D().maxBoostedEffects) return;
      const add = boostOf(e);
      if (add) { boost[i] = add; n++; }
    });
    return n ? { boost } : null;
  }

  function plan(card) {
    if (!card || card.unplayable || card.type === 'useless') return null;
    if (card.upgrade) return card.upgrade;
    // An Unlucky card never drops below 1 energy (otherwise its gamble has no risk).
    const floor = card.pierce === 'unlucky' ? 2 : 1;
    if (!card.xcost && card.cost >= Math.max(D().minCostForDiscount, floor)) return { cost: -1 };
    if (!card.xcost && card.type === 'power' && card.cost >= floor) return { cost: -1 };
    const b = boostPlan(card);
    if (b && rewriteText(card.text || '', card.effects, b.boost) !== null) return b;   // only if the card text can show it
    if (!card.xcost && card.cost >= floor) return { cost: -1 };
    return D().fallback;
  }

  const can = card => !!plan(card);

  // Rewrite the card text so the boosted numbers show the new values.
  // Plain numbers ("Deal 6 damage") and timed ranges ("Deal 3-9 damage") are both handled,
  // matched in the order the effects are listed. Returns null if a number cannot be found.
  function rewriteText(text, effects, boost) {
    let out = text, from = 0;
    for (const [i, add] of Object.entries(boost)) {
      const old = effects[i].amount, now = old + add;
      const re = /(\d+)-(\d+)|\d+/g;
      re.lastIndex = from;
      let m, done = false;
      while ((m = re.exec(out))) {
        let rep = null;
        if (m[1] && (+m[1] <= old && +m[2] >= old)) rep = `${Math.round(+m[1] * now / old)}-${Math.round(+m[2] * now / old)}`;
        else if (!m[1] && +m[0] === old) rep = String(now);
        if (rep === null) continue;
        out = out.slice(0, m.index) + rep + out.slice(m.index + m[0].length);
        from = m.index + rep.length;
        done = true;
        break;
      }
      if (!done) return null;
    }
    out = out.replace(/\b(\d+) card\b/g, (m, n) => (+n === 1 ? m : `${n} cards`));
    return Game.I18N ? Game.I18N.fixText(out) : out;   // other languages: plural words after the new number
  }

  // Apply a plan to a fresh copy of a card (def). Returns the side-panel note.
  function apply(def, p) {
    if (p.cost) { def.cost = Math.max(0, def.cost + p.cost); def.upgradeCost = true; }
    if (p.boost) {
      const words = [];
      const text = rewriteText(def.text || '', def.effects, p.boost);
      Object.entries(p.boost).forEach(([i, add]) => {
        const e = def.effects[i];
        e.amount += add;
        const rule = D().boost[e.type] || {};
        words.push(`+${add} ${e.type === 'status' && e.status ? (Game.STATUSES[e.status] || { name: e.status }).name : rule.word || e.type}`);
      });
      def.text = text !== null ? text : `${def.text} (${words.join(', ')})`;
      def.upgradeBoost = true;
      return `Stronger: ${words.join(', ')}.`;
    }
    if (p.effects) {
      def.effects = def.effects.concat(p.effects.map(e => Object.assign({}, e)));
      def.text = (def.text + ' ' + (p.text || '')).trim();
      return `Extra effect: ${p.text}`;
    }
    return p.cost ? `Costs ${-p.cost} less.` : '';
  }

  // Short sentence for the side panel (kept for older callers).
  function describe(p) {
    if (!p) return '';
    if (p.cost) return `Costs ${-p.cost} less.`;
    if (p.boost) return 'Stronger effects.';
    return `Extra effect: ${p.text}`;
  }

  return { plan, can, apply, describe, boostOf, rewriteText };
})();
