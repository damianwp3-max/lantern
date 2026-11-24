// CO-OP GIFT CARD
// During your own turn you can send a card from your hand to your teammate. You pay the card's
// energy cost (X cards: 1), your teammate gets it into their hand FREE (cost 0) until it is played
// or discarded; after that it is just the plain card again.
//   A free card is the card id + '~gift' (e.g. 'strike_lamp~gift'), built on demand by the proxy below,
//   so art, text and combat need no special cases (same idea as upgraded cards, cards/variants.js).
//   Game.CoopGift.send(combat, fromSeat, handIndex) -> true if it was sent
//   Game.Actions.giftToggle() turns "gift mode" on and off (button bottom-left, ui/coop/giftButton.js)
Game.CoopGift = (function () {
  const C = Game.Coop;
  const SUF = '~gift';
  const strip = id => (typeof id === 'string' && id.endsWith(SUF) ? id.slice(0, -SUF.length) : id);

  // Free copy of a card, built on demand.
  const baseCards = Game.CARDS, cache = {};
  function build(id) {
    const src = baseCards[strip(id)];
    if (!src) return undefined;
    const def = Object.assign({}, src, { cost: 0, gifted: true });
    if (!Game.CARD_ART[id] && Game.CARD_ART[strip(id)]) Game.CARD_ART[id] = Game.CARD_ART[strip(id)];
    return def;
  }
  Game.CARDS = new Proxy(baseCards, {
    get(t, id) {
      if (typeof id === 'string' && id.endsWith(SUF)) return cache[id] || (cache[id] = build(id));
      return t[id];
    },
    has(t, id) { return typeof id === 'string' && id.endsWith(SUF) ? strip(id) in t : id in t; },
  });
  // Texts are rebuilt when the language changes (i18n/content.js clears card caches).
  const baseClear = Game.Cards.clearCache;
  Game.Cards.clearCache = function () { baseClear(); Object.keys(cache).forEach(k => delete cache[k]); };

  // A played or discarded gift goes back to being the plain card.
  function sweep(c) {
    if (!c || !c.seats) return;
    [0, 1].forEach(i => {
      const f = C.fieldsOf(c, i);
      [f.discardPile, f.exhausted, f.drawPile].forEach(pile => pile.forEach((id, j) => { pile[j] = strip(id); }));
    });
  }
  Game.Events.on('card:played', ({ combat }) => sweep(combat));
  Game.Events.on('turn:end', ({ combat }) => sweep(combat));

  const cost = card => (card.xcost ? 1 : card.cost);

  function canGift(c, from, index) {
    if (!c || !c.seats || c.outcome || c.active !== from) return false;
    const id = c.hand[index], card = id && Game.CARDS[id];
    if (!card || card.unplayable) return false;
    return c.player.energy >= cost(card) && C.alive(c, 1 - from);
  }

  function send(c, from, index) {
    if (!canGift(c, from, index)) return false;
    const id = c.hand[index], card = Game.CARDS[id], to = 1 - from;
    c.player.energy -= cost(card);
    c.hand.splice(index, 1);
    const f = C.fieldsOf(c, to);
    if (f.hand.length >= Game.Combat.MAX_HAND) f.discardPile.push(strip(id));   // their hand is full
    else f.hand.push(strip(id) + SUF);
    Game.CombatUtil.log(c, `${C.name(from)} gifts ${card.name} to ${C.name(to)}.`);
    Game.Events.emit('coop:gift', { combat: c, from, to, cardId: id });
    c.lastGift = { from, to, cardId: strip(id), n: (c.lastGift ? c.lastGift.n : 0) + 1 };
    return true;
  }

  // Gift mode: the next card you click is sent instead of played.
  const A = Game.Actions;
  A.giftToggle = function () {
    const s = Game.App.state;
    if (!C.isActive() || !s.combat) return;
    s.selectedCard = null;
    s.giftMode = !s.giftMode;
    Game.UI.render(s);
  };
  const baseSelect = A.selectCard;
  A.selectCard = function (index) {
    const s = Game.App.state;
    if (C.isActive() && C.isHost() && s.giftMode) {
      s.giftMode = false;
      const c = s.combat;
      if (c && c.active === 0 && send(c, 0, Number(index))) return A.afterCombatAction();
      return Game.UI.render(s);
    }
    return baseSelect.apply(this, arguments);
  };
  const baseCancel = A.cancelCard;
  A.cancelCard = function () {
    const s = Game.App.state;
    if (s.giftMode) { s.giftMode = false; return Game.UI.render(s); }
    return baseCancel.apply(this, arguments);
  };

  return { send, canGift, strip, SUF };
})();
