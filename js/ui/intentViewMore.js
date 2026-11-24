// INTENTS FOR SPECIAL ENEMY MOVES (burrow, steal, summon, explode, ...; data/enemyTraitsData.js)
// Extends Game.UI.intentView.parts and Game.UI.tipText.intent without editing them:
// each special move shows its own icon, plus a damage icon if it also hits.
(function () {
  const V = Game.UI.intentView, T = Game.UI.tipText;
  const SPECIAL = { burrow: 1, steal: 1, stealGold: 1, flee: 1, summon: 1, protect: 1, heal: 1, drainOil: 1, explode: 1 };
  const combat = () => Game.App && Game.App.state.combat;
  const fill = (s, v) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));

  const baseParts = V.parts;
  V.parts = function (c, e, move) {
    const out = baseParts(c, e, move);
    if (!SPECIAL[move.type]) return out;
    const I = Game.INTENTS[move.type] || { icon: '?' };
    const front = [];
    if (move.value && ['steal', 'stealGold', 'drainOil', 'explode'].includes(move.type)) {
      const dmg = Game.Statuses.modifyDamage(e, Game.EnemyMoves.victim(c, e), move.value);
      front.push({ kind: 'dmg', icon: Game.INTENTS.attack.icon, label: dmg + (move.hits > 1 ? `×${move.hits}` : ''), cls: move.type === 'explode' ? 'explode' : '' });
    }
    const label = { stealGold: move.gold || '', protect: move.value, heal: move.value, drainOil: move.oil || '' }[move.type];
    if (move.type !== 'explode') front.push({ kind: 'sp', icon: I.icon, label: label == null ? '' : label, cls: 'ib-special ib-' + move.type });
    return front.concat(out);
  };

  const baseTip = T.intent;
  T.intent = function (uid, part) {
    const c = combat(); if (!c) return null;
    const e = c.enemies.find(x => String(x.uid) === String(uid)); if (!e) return null;
    const move = Game.Combat.intentOf(e);
    if (!SPECIAL[move.type] || (part && part !== 'dmg' && part !== 'sp')) return baseTip.call(this, uid, part);
    const I = Game.INTENTS[move.type];
    const dmg = move.value ? Game.Statuses.modifyDamage(e, Game.EnemyMoves.victim(c, e), move.value) : 0;
    if (part === 'dmg' && move.type !== 'explode') {
      const A = Game.INTENTS.attack;
      return { icon: A.icon, title: `${e.name}: ${A.name}`, label: 'Damage · next turn', color: '#e07a70',
        text: fill(move.hits > 1 ? A.tipMulti : A.tip, { dmg, hits: move.hits, total: dmg * (move.hits || 1) }) };
    }
    const value = move.type === 'stealGold' ? move.gold : move.type === 'drainOil' ? move.oil : move.value;
    return { icon: I.icon, title: `${e.name}: ${I.name}`, label: 'Special · next turn', color: move.type === 'explode' ? '#ffb04a' : '#e0c050',
      text: fill(I.tip, { value, dmg }) };
  };
})();
