// SHOP ACTIONS: buying and the card services (shop/shop.js).
(function () {
  const redraw = () => { Game.State.save(); Game.App.go('shop'); };
  const back = () => Game.App.go('shop');

  Object.assign(Game.Actions, {
    buyCard(i)  { if (Game.Shop.buyCard(Game.State.run, Number(i))) redraw(); },
    buyTotem(i) { if (Game.Shop.buyTotem(Game.State.run, Number(i))) redraw(); },
    buyOil()    { if (Game.Shop.buyOil(Game.State.run)) redraw(); },

    // Card services: the price is charged when the choice is confirmed.
    shopService(kind) {
      const run = Game.State.run, price = Game.Shop.servicePrice(run, kind);
      if (!Game.Gold.canAfford(run, price)) return;
      const cfg = { cost: price, onDone: redraw, onCancel: back };
      if (kind === 'remove') Game.Picker.remove(cfg);
      else if (kind === 'upgrade') Game.Picker.upgrade(cfg);
      else if (kind === 'pierce') Game.Picker.pierce(Object.assign(cfg, { exclude: Game.Shop.premiumIds() }));   // premium marks only at the mark stall
      else if (kind.startsWith('mark:')) {
        const id = kind.slice(5), item = (run.shop.marks || []).find(m => m.id === id);
        if (!item || item.sold) return;
        Game.Picker.pierce(Object.assign(cfg, { piercing: id, onDone: msg => { item.sold = true; redraw(msg); } }));
      }
    },

    leaveShop() { Game.State.run.shop = null; Game.App.finishNode(); },
  });
})();
