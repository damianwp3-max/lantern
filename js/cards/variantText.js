// VARIANT TEXT (rules): rewrites the numbers on a card's text for the Timed and
// Forged piercings (data/piercingsData.js), so the card face always shows its real numbers.
//   Game.VariantText.timed(card)   -> { text, effects } with damage/block printed as ranges, or null
//   Game.VariantText.forged(card)  -> { text, effects } with damage/block +Game.PIERCINGS.forged.add, or null
// null means the text could not be rewritten safely, so the piercing is not allowed on that card.
Game.VariantText = (function () {
  const NUMERIC = e => (e.type === 'damage' || e.type === 'block') && typeof e.amount === 'number' && e.amount > 0 && e.max == null && !e.byRating;
  const copyEffects = card => (card.effects || []).map(e => Object.assign({}, e));

  // Each numeric effect, in order, must find its own plain number in the text.
  function timed(card) {
    const effects = copyEffects(card);
    const idx = effects.map((e, i) => (NUMERIC(e) ? i : -1)).filter(i => i >= 0);
    if (!idx.length) return null;
    const sw = Game.TIMING ? Game.TIMING.swing : 0.5;
    let out = card.text || '', from = 0;
    const seen = new Set();   // "Deal 3 damage twice" = two effects, one number on the text
    for (const i of idx) {
      const n = effects[i].amount;
      if (seen.has(n)) continue;
      seen.add(n);
      const re = /\d+(?:-\d+)?/g;
      re.lastIndex = from;
      let m, done = false;
      while ((m = re.exec(out))) {
        if (m[0].includes('-') || +m[0] !== n) continue;
        const rep = `${Math.max(0, Math.round(n * (1 - sw)))}-${Math.round(n * (1 + sw))}`;
        out = out.slice(0, m.index) + rep + out.slice(m.index + m[0].length);
        from = m.index + rep.length;
        done = true;
        break;
      }
      if (!done) return null;
    }
    return { text: out, effects };
  }

  function forged(card) {
    const add = (Game.PIERCINGS.forged && Game.PIERCINGS.forged.add) || 3;
    const effects = copyEffects(card);
    const boost = {}, textBoost = {}, seen = new Set();
    effects.forEach((e, i) => {
      if (!NUMERIC(e)) return;
      boost[i] = add;
      if (!seen.has(e.amount)) { seen.add(e.amount); textBoost[i] = add; }   // same number twice on the text = rewrite once
    });
    if (!Object.keys(boost).length) return null;
    const text = Game.Upgrades.rewriteText(card.text || '', effects, textBoost);
    if (text === null) return null;
    Object.entries(boost).forEach(([i, n]) => { effects[i].amount += n; });
    return { text, effects };
  }

  return { timed, forged };
})();
