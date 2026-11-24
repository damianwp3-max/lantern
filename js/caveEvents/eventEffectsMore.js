// MORE CAVE EVENT EFFECTS (adds effect types to Game.CaveEvents.handlers; events are data in
// data/caveEventsData.js and data/caveEventsMore.js):
//   { type: 'chance', outcomes: [{ weight, text, effects: [...] }, ...] }
//        a hidden roll between several outcomes; `text` is the line shown when it happens
//   { type: 'removeRandom' }                         a random card leaves your deck
//   { type: 'transformRandom' }                      a random card turns into a random card
//   { type: 'cardRandom', cardType?, pierce? }       a random card joins your deck (pierce: id or 'random')
//   { type: 'duplicateRandom' }                      a copy of a random card in your deck
//   { type: 'upgradeMany', count }                   upgrade up to `count` random cards
(function () {
  const H = Game.CaveEvents.handlers;
  const pool = () => (Game.Unlocks ? Game.Unlocks.pool() : Game.REWARD_POOL).filter(id => Game.CARDS[id] && Game.CARDS[id].type !== 'useless');
  const realCards = run => run.deck.map((id, i) => i).filter(i => { const c = Game.CARDS[run.deck[i]]; return c && c.type !== 'useless'; });
  const added = (id, from) => Game.Events.emit('deck:cardAdded', { cardId: id, from: from || 'event' });

  function weighted(list) {
    const total = list.reduce((s, o) => s + (o.weight || 1), 0);
    let r = Math.random() * total;
    for (const o of list) { r -= (o.weight || 1); if (r <= 0) return o; }
    return list[list.length - 1];
  }

  H.chance = function (run, e, ctx) {
    const o = weighted(e.outcomes || []);
    if (!o) return null;
    const lines = o.text ? [Game.t(o.text)] : [];
    (o.effects || []).forEach(sub => {
      if (/^pick/.test(sub.type)) { ctx.pending.push(sub); return; }
      const fn = H[sub.type];
      const l = fn ? fn(run, sub, ctx) : null;
      if (l) lines.push(l);
    });
    return lines.join(' ');
  };

  H.removeRandom = function (run) {
    const list = run.deck.length > 5 ? realCards(run) : [];
    if (!list.length) return 'Nothing was taken';
    const i = Game.Util.pick(list), name = Game.CARDS[run.deck[i]].name;
    run.deck.splice(i, 1);
    return `${name} was taken from your deck`;
  };

  H.transformRandom = function (run) {
    const list = realCards(run), p = pool();
    if (!list.length || !p.length) return null;
    const i = Game.Util.pick(list), old = Game.CARDS[run.deck[i]].name;
    run.deck[i] = Game.Util.pick(p);
    added(run.deck[i]);
    return `${old} turned into ${Game.CARDS[run.deck[i]].name}`;
  };

  H.cardRandom = function (run, e) {
    const p = pool().filter(id => !e.cardType || Game.CARDS[id].type === e.cardType);
    if (!p.length) return null;
    let id = Game.Util.pick(p);
    const mark = e.pierce === 'random' ? Game.Piercing.randomFor(id) : e.pierce;
    if (mark && Game.Cards.canPierce(id, mark)) id = Game.Cards.pierce(id, mark);
    run.deck.push(id);
    added(id);
    return `Added to your deck: ${Game.CARDS[id].name}`;
  };

  H.duplicateRandom = function (run) {
    const list = realCards(run);
    if (!list.length) return null;
    const id = run.deck[Game.Util.pick(list)];
    run.deck.push(id);
    added(id);
    return `A copy of ${Game.CARDS[id].name} joined your deck`;
  };

  H.upgradeMany = function (run, e) {
    const names = [];
    for (let k = 0; k < (e.count || 1); k++) {
      const list = run.deck.map((id, i) => i).filter(i => Game.Cards.canUpgrade(run.deck[i]));
      if (!list.length) break;
      const i = Game.Util.pick(list);
      names.push(Game.CARDS[run.deck[i]].name);
      run.deck[i] = Game.Cards.upgrade(run.deck[i]);
    }
    return names.length ? `Upgraded: ${names.join(', ')}` : 'No card could be upgraded';
  };
})();
