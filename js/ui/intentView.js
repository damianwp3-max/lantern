// INTENT VIEW: the announcement bubble above an enemy ("what I'll do next").
// A move is split into separate parts, each its own icon with its own hover tip:
//   dmg     ⚔ 7 or ⚔ 3×2     the attack (after Weak / Vulnerable / group scaling)
//   block   🛡 8             block the enemy gains
//   debuff  ☂ 1              a status it puts on you (one icon per status)
//   card    🍄 2             junk cards it adds
//   buff    ▲ +2             Might it gives itself (or all enemies)
// So "attack + debuff" shows two icons side by side. Hover text: ui/tipText.js (intent).
// Icons and names: data/intentsData.js, data/statusesData.js. Styles: css/intents.css.
Game.UI = Game.UI || {};

Game.UI.intentView = (function () {
  // The parts of a move as data: [{ kind, icon, label, cls, color }]
  function parts(c, e, move) {
    const I = Game.INTENTS, out = [];
    if (move.type === 'attack') {
      const dmg = Game.Statuses.modifyDamage(e, Game.EnemyMoves.victim(c, e), move.value);
      out.push({ kind: 'dmg', icon: I.attack.icon, label: dmg + (move.hits > 1 ? `×${move.hits}` : ''), cls: dmg !== move.value ? 'changed' : '' });
    }
    if (move.type === 'block' || move.selfBlock) {
      const v = Game.Scaling.block(e, move.type === 'block' ? move.value : move.selfBlock);
      out.push({ kind: 'block', icon: I.block.icon, label: Game.Statuses.modifyBlock(e, v) });
    }
    if (move.type === 'buff') {
      const s = Game.STATUSES[move.buff || 'might'] || { color: '#ff6a4a' };
      out.push({ kind: 'buff', icon: Game.UI.statusIcons.render(move.buff || 'might', 18), label: (move.allies ? 'all +' : '+') + (move.amount || 1), color: s.color });
    }
    if (move.type === 'addCard') out.push({ kind: 'card', icon: I.addCard.icon, label: move.value });
    if (move.status) {
      const s = Game.STATUSES[move.status] || { icon: '?' };
      out.push({ kind: 'debuff', icon: Game.UI.statusIcons.render(move.status, 18), label: move.amount || 1, color: s.color });
    }
    return out;
  }

  function render(c, e) {
    // A dark lantern (no oil) hides what enemies will do (data/oilData.js, totem: Smoked Lens).
    if (Game.Oil && Game.Oil.isDark(Game.State.run)) {
      return `<div class="intent intent-bubble dark" data-tip="oil:dark"><div class="ib-parts"><span class="ib-part ib-dark"><i class="ib-icon">?</i></span></div></div>`;
    }
    const move = Game.Combat.intentOf(e);
    const html = Game.UI.intentView.parts(c, e, move).map(p =>   // via the object, so ui/intentViewMore.js can extend it
      `<span class="ib-part ib-${p.kind} ${p.cls || ''}" ${p.color ? `style="--ib:${p.color}"` : ''} data-tip="intent:${e.uid}:${p.kind}"><i class="ib-icon">${p.icon}</i><b>${p.label}</b></span>`).join('');
    return `<div class="intent intent-bubble" data-tip="intent:${e.uid}"><div class="ib-parts">${html}</div></div>`;
  }

  return { render, parts };
})();
