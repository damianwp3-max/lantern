// CARD LIBRARY (rules)
// Every card in the game, for the Card Library screen (ui/screens/libraryScreen.js).
//   Game.Library.all()             every real card id (not upgraded / pierced variants, not junk)
//   Game.Library.filtered(f)       f = { type: 'all' | card type, upgraded: bool }
//   Game.Library.TABS              filter tabs: 'all' + the card types that exist
// New cards show up here on their own (they only need to be in Game.CARDS).
Game.Library = (function () {
  function all() {
    const order = Object.keys(Game.CARD_TYPES);
    return Object.keys(Game.CARDS)
      .filter(id => !/[+@]/.test(id))
      .sort((a, b) => {
        const A = Game.CARDS[a], B = Game.CARDS[b];
        return order.indexOf(A.type) - order.indexOf(B.type) || (A.cost || 0) - (B.cost || 0) || A.name.localeCompare(B.name);
      });
  }

  function tabs() {
    const used = new Set(all().map(id => Game.CARDS[id].type));
    return ['all'].concat(Object.keys(Game.CARD_TYPES).filter(t => used.has(t)));
  }

  function filtered(f) {
    const type = (f && f.type) || 'all';
    return all()
      .filter(id => type === 'all' || Game.CARDS[id].type === type)
      .map(id => (f && f.upgraded && Game.Cards.canUpgrade(id) ? Game.Cards.upgrade(id) : id));
  }

  const isLocked = id => !!(Game.Unlocks && Game.Unlocks.isLocked(Game.Cards.baseOf(id)));
  const isStarter = id => (Game.STARTER_DECK || []).includes(Game.Cards.baseOf(id));

  return { all, tabs, filtered, isLocked, isStarter };
})();
