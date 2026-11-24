// MERCHANT SCREEN: cards and totems for sale, plus services (remove, upgrade, pierce, oil).
// Rules and prices: js/shop/shop.js, data/shopData.js. Styles: css/shop.css.
Game.UI.registerScreen('shop', function () {
  const { esc, statusBar, cardBox, button } = Game.UI.components;
  const run = Game.State.run;
  const shop = run.shop;
  const S = Game.SHOP.services;
  const afford = n => Game.Gold.canAfford(run, n);
  const tag = (n, sold) => sold ? '<div class="price sold">SOLD</div>' : `<div class="price ${afford(n) ? '' : 'poor'}"><i>◎</i>${n}</div>`;

  const cards = shop.cards.map((it, i) => {
    const p = Game.Shop.price(run, it.price);
    return `<div class="shop-item ${it.sold ? 'sold' : ''} ${!it.sold && !afford(p) ? 'poor' : ''}" ${it.sold ? '' : `data-action="buyCard" data-arg="${i}"`}>
      ${cardBox(it.id)}${tag(p, it.sold)}</div>`;
  }).join('');

  const totems = shop.totems.map((it, i) => {
    const t = Game.TOTEMS[it.id], p = Game.Shop.price(run, it.price);
    return `<div class="shop-totem ${it.sold ? 'sold' : ''} ${!it.sold && !afford(p) ? 'poor' : ''}" style="--tc:${t.color}" ${it.sold ? '' : `data-action="buyTotem" data-arg="${i}"`} data-tip="totem:${esc(it.id)}">
      <span class="totem-icon big">${esc(t.icon)}</span>
      <div class="st-body"><b>${esc(t.name)}</b><span>${esc(t.text)}</span></div>${tag(p, it.sold)}</div>`;
  }).join('');

  const service = (kind, icon, name, text, price, extra = '') =>
    `<div class="shop-service ${afford(price) && !extra ? '' : 'poor'}" ${afford(price) && !extra ? `data-action="shopService" data-arg="${kind}"` : ''}>
      <span class="ss-icon">${icon}</span><div class="st-body"><b>${esc(name)}</b><span>${esc(extra || text)}</span></div>${tag(price)}</div>`;

  const oil = Game.OIL.shopRefill, oilPrice = Game.Shop.price(run, oil.price);
  const oilExtra = run.oil >= run.maxOil ? 'Your lantern is full.' : '';   // oil can be bought as often as you like

  const services = [
    service('remove', S.remove.icon, S.remove.name, S.remove.text, Game.Shop.removePrice(run), run.deck.length <= 5 ? 'Your deck is too small.' : ''),
    service('upgrade', Game.UI.serviceIcons.render('upgrade', 32) || S.upgrade.icon, S.upgrade.name, S.upgrade.text, Game.Shop.servicePrice(run, 'upgrade'), run.deck.some(id => Game.Cards.canUpgrade(id)) ? '' : 'Nothing to upgrade.'),
    service('pierce', S.pierce.icon, S.pierce.name, S.pierce.text, Game.Shop.servicePrice(run, 'pierce'), run.deck.some(id => Game.Cards.canPierce(id)) ? '' : 'No card can take a piercing.'),
    ...(shop.marks || []).map(m => {
      const P = Game.PIERCINGS[m.id], M = Game.SHOP.markStall;
      if (!P) return '';
      const fill = s => Game.t(s, { name: P.name, short: P.short });
      const icon = `<span class="mark-icon" style="color:${P.color}">${esc(P.icon)}</span>`;
      return service('mark:' + m.id, icon, fill(M.name), fill(M.text), Game.Shop.servicePrice(run, 'mark:' + m.id),
        m.sold ? 'Already bought here.' : run.deck.some(id => Game.Cards.canPierce(id, m.id)) ? '' : 'No card can take it.');
    }),
    `<div class="shop-service ${oilExtra || !afford(oilPrice) ? 'poor' : ''}" ${oilExtra || !afford(oilPrice) ? '' : 'data-action="buyOil"'}>
      <span class="ss-icon">${Game.UI.topBar.icon('oil')}</span><div class="st-body"><b>Lantern oil</b><span>${esc(oilExtra || `Refill +${oil.amount} oil.`)}</span></div>${tag(oilPrice)}</div>`,
  ].join('');

  const MERCHANT = Game.UI.merchantArt.svg();  // art: js/ui/merchantArt.js

  return `${statusBar(run)}
    <div class="shop-screen">
      <div class="shop-head">
        <div class="shop-merchant">${MERCHANT}</div>
        <div><h2>The Merchant</h2><p class="muted">"Light for coin. Coin for light. I do not ask where you got it."</p>
          <p class="shop-gold">You have <b>${run.gold}</b> gold.</p></div>
        <div class="shop-leave">${button('Leave', 'leaveShop')}</div>
      </div>
      <h3>Cards</h3>
      <div class="shop-cards">${cards}</div>
      <div class="shop-cols">
        <div><h3>Totems</h3><div class="shop-list">${totems || '<p class="muted">Sold out.</p>'}</div></div>
        <div><h3>Services</h3><div class="shop-list">${services}</div></div>
      </div>
    </div>`;
});
