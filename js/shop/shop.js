// MERCHANT (rules; numbers in data/shopData.js)
//   Game.Shop.open(run, node)      the stock for this visit (kept in run.shop, so leaving and coming back is the same shop)
//   Game.Shop.price(run, base)     price after discounts (Game.Mods 'shop')
//   Game.Shop.removePrice(run)     cutting a card costs more each time
//   Game.Shop.buyCard(run, i) / buyTotem(run, i) / buyOil(run)    -> true if it worked
// Services (remove / upgrade / pierce) use the card picker (picker/picker.js).
Game.Shop = (function () {
  const S = () => Game.SHOP;
  const discount = run => Math.max(0, Math.min(0.8, Game.Mods.get('shop', run)));
  const price = (run, base) => Math.max(1, Math.round(base * (S().priceScale || 1) * (1 - discount(run))));

  function cardBasePrice(id) {
    const card = Game.CARDS[id], P = S().cardPrice;
    let n = P.base + P.perCost * (card.xcost ? 1.5 : card.cost) + (card.type === 'power' ? P.power : 0) + Game.Util.randInt(-P.wiggle, P.wiggle);
    if (card.pierce && Game.PIERCINGS[card.pierce]) n *= Game.PIERCINGS[card.pierce].good ? 1.25 : S().negativePiercedDiscount;
    return Math.round(n);
  }

  function generate(run, node) {
    const pool = Game.Unlocks ? Game.Unlocks.pool() : Game.REWARD_POOL;
    const cards = (Game.Unlocks ? Game.Unlocks.sample(S().cardCount, pool) : Game.Util.sample(pool, S().cardCount)).map(base => {
      let id = base;
      if (Math.random() < S().piercedChance) {
        const p = Game.Piercing.randomFor(base, premiumIds());
        if (p) id = Game.Cards.pierce(base, p);
      }
      return { id, price: cardBasePrice(id), sold: false };
    });
    const free = Game.Totems.unowned(run);
    const totems = Game.Util.sample(free, Math.min(S().totemCount, free.length)).map(id => ({ id, price: Game.TOTEMS[id].price, sold: false }));
    const marks = Game.Util.sample((Game.PIERCE_CHOICES || Object.keys(Game.PIERCINGS)).filter(id => Game.PIERCINGS[id]), S().markStall.count).map(id => ({ id, sold: false }));
    return { nodeId: node.id, cards, totems, marks, oilBought: false };
  }

  function open(run, node) {
    if (!run.shop || run.shop.nodeId !== node.id) run.shop = generate(run, node);
    return run.shop;
  }

  function buy(run, item) {
    if (!item || item.sold) return false;
    if (!Game.Gold.spend(run, price(run, item.price))) return false;
    item.sold = true;
    return true;
  }
  function buyCard(run, i) {
    const item = run.shop.cards[i];
    if (!buy(run, item)) return false;
    run.deck.push(item.id);
    Game.Events.emit('deck:cardAdded', { cardId: item.id, from: 'shop' });
    return true;
  }
  function buyTotem(run, i) {
    const item = run.shop.totems[i];
    if (!buy(run, item)) return false;
    Game.Totems.gain(run, item.id);
    return true;
  }
  function buyOil(run) {
    const o = Game.OIL.shopRefill;
    if (run.oil >= run.maxOil || !Game.Gold.spend(run, price(run, o.price))) return false;
    Game.Oil.gain(run, o.amount);
    return true;
  }

  const removePrice = run => price(run, S().services.remove.price + S().services.remove.step * (run.removals || 0));
  // Mark stall (data/shopData.js markStall): kind = 'mark:<piercing id>'. Bad marks (Unlucky) are cheap.
  // Premium marks (markStall.premium, e.g. Collector) have their own huge price.
  const premiumIds = () => Object.keys(S().markStall.premium || {});
  const markPrice = (run, id) => {
    const M = S().markStall, prem = (M.premium || {})[id];
    return price(run, prem || (Game.PIERCINGS[id] && Game.PIERCINGS[id].good === false ? M.badPrice : M.price));
  };
  const servicePrice = (run, kind) => kind === 'remove' ? removePrice(run)
    : kind.startsWith('mark:') ? markPrice(run, kind.slice(5)) : price(run, S().services[kind].price);

  return { open, price, removePrice, servicePrice, premiumIds, buyCard, buyTotem, buyOil };
})();
