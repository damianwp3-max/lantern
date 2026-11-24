// OIL VIEW: the Flare button shown next to the energy orb in a fight.
//   Game.UI.oilView.flareButton(combat) -> HTML
// The oil meter itself is a block of the top bar (ui/topBar.js). Rules: oil/oil.js. Styles: css/oil.css.
Game.UI = Game.UI || {};

Game.UI.oilView = (function () {
  function flareButton(c) {
    const run = Game.State.run;
    const can = Game.Oil.canFlare(c);
    const why = c.flared ? 'used' : run.oil < Game.Oil.flareCost() ? 'no oil' : '';
    return `<button class="flare-btn ${can ? '' : 'off'}" data-action="flare" data-tip="oil:flare" ${can ? '' : 'disabled'}>
      <span class="flare-flame">🔥</span><span class="flare-label">Flare<small>${why || `-${Game.Oil.flareCost()} oil`}</small></span></button>`;
  }
  return { flareButton };
})();
