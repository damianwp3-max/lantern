// STUN VIEW: a Stunned enemy shows a "stunned" bubble instead of its next move (it will skip that turn).
// Wraps Game.UI.intentView.render; the status itself (icon, hover text) comes from data/enemyTraitsData.js.
(function () {
  const V = Game.UI.intentView;
  const base = V.render;
  V.render = function (c, e) {
    const n = e.statuses && e.statuses.stunned;
    if (!n) return base.call(this, c, e);
    const col = (Game.STATUSES.stunned || {}).color || '#ffd35a';
    return `<div class="intent intent-bubble stunned" data-tip="status:stunned:${n}"><div class="ib-parts">
      <span class="ib-part ib-debuff" style="--ib:${col}"><i class="ib-icon">${Game.UI.statusIcons.render('stunned', 18)}</i><b>Zz</b></span></div></div>`;
  };
})();
