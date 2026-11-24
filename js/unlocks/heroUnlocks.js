// HERO CARD UNLOCKS (rules)
// A hero's exclusive cards (data/charactersData.js `cards`) start locked when the hero
// has unlockPerLevel. Every explorer level gained while playing that hero unlocks that
// many of them (random order). Card sets (unlocks/unlocks.js) still unlock as before.
// Saved with the other lifetime progress: Game.Progress.get().heroCards = { heroId: [cardIds] }.
//   Game.HeroUnlocks.isLocked(cardId)   true while an exclusive card is still locked
//   Game.HeroUnlocks.status(heroId)     [{ id, done }] for the UI
//   Game.HeroUnlocks.lastNew            cards unlocked by the last won fight (fight summary)
//   event 'heroCards:unlocked' { hero, cards }
//   event 'heroCards:maxed' { hero, levels }   levels gained with every exclusive card already owned
// It wraps Game.Unlocks.isLocked / pool and Game.Library.isStarter, so screens need no changes.
Game.HeroUnlocks = (function () {
  const P = () => Game.Progress.get();
  const C = () => Game.Characters;
  const opened = hid => ((P().heroCards = P().heroCards || {})[hid] = P().heroCards[hid] || []);

  function isLocked(cardId) {
    const base = Game.Cards ? Game.Cards.baseOf(cardId) : cardId;
    const hid = C().ownerOf(base);
    const h = hid && Game.CHARACTERS[hid];
    if (!h || !h.unlockPerLevel || h.signatures.includes(base)) return false;
    return !opened(hid).includes(base);
  }

  const status = hid => (C().get(hid).cards || []).map(id => ({ id, done: !isLocked(id) }));

  function unlockFor(hid, n) {
    const fresh = [];
    for (let i = 0; i < n; i++) {
      const left = (Game.CHARACTERS[hid].cards || []).filter(id => isLocked(id));
      if (!left.length) break;
      const id = Game.Util.pick(left);
      opened(hid).push(id);
      fresh.push(id);
    }
    return fresh;
  }

  const api = { isLocked, status, lastNew: [] };

  Game.Events.on('combat:start', () => { api.lastNew = []; });
  Game.Events.on('xp:gained', () => {
    const run = Game.State.run;
    const levels = (Game.Unlocks.lastXp && Game.Unlocks.lastXp.levels) || 0;
    const h = run && Game.CHARACTERS[run.character];
    if (!levels || !h || !h.unlockPerLevel) return;
    api.lastNew = unlockFor(run.character, levels * h.unlockPerLevel);
    Game.Progress.save();
    // Levels that found no locked exclusive card left: a bonus-embers pack (packs/cardPacks.js).
    const per = h.unlockPerLevel;
    const maxed = levels - Math.ceil(api.lastNew.length / per);
    if (maxed > 0) Game.Events.emit('heroCards:maxed', { hero: run.character, levels: maxed });
    if (api.lastNew.length) Game.Events.emit('heroCards:unlocked', { hero: run.character, cards: api.lastNew.slice() });
  });

  // Locked exclusive cards count as locked everywhere (rewards, library, hero select, unlocks screen).
  const U = Game.Unlocks;
  const baseLocked = U.isLocked, basePool = U.pool;
  U.isLocked = id => baseLocked(id) || isLocked(id);
  U.pool = () => basePool().filter(id => !isLocked(id));
  // Signature cards are starter cards too (library badge).
  if (Game.Library) {
    const baseStarter = Game.Library.isStarter;
    Game.Library.isStarter = id => baseStarter(id) || Game.Characters.isSignature(id);
  }
  return api;
})();
