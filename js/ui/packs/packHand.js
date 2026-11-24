// PACK HAND (UI): unopened card packs fanned out like the hand of cards in a fight.
// Clicking one runs the 'openPack' action (app/actions/runEndActions.js).
//   Game.UI.packHand.render(packs)   HTML; styles in css/packs.css
Game.UI = Game.UI || {};

Game.UI.packHand = (function () {
  const { esc } = Game.UI.components;

  function render(packs) {
    if (!packs.length) return '';
    const mid = (packs.length - 1) / 2;
    // Explorer packs first, then hero packs, so the two kinds sit together.
    const sorted = packs.slice().sort((a, b) => (a.kind === 'hero') - (b.kind === 'hero'));
    return `<div class="pack-hand">${sorted.map((p, i) => {
      const rot = ((i - mid) * 6).toFixed(1), dy = Math.round((i - mid) * (i - mid) * 7);
      const L = Game.Packs.look(p);
      return `<div class="pack kind-${esc(p.kind)}" style="--rot:${rot}deg;--dy:${dy}px;--i:${i};--pg:${esc(L.glow)}" data-action="openPack" data-arg="${esc(p.uid)}">
        ${Game.UI.packArt.render(p)}
      </div>`;
    }).join('')}</div>`;
  }

  return { render };
})();
