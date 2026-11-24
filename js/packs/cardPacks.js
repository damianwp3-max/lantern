// CARD PACKS (rules; looks in data/cardPacksData.js)
// Cards still unlock the moment a level is gained (unlocks/unlocks.js, unlocks/heroUnlocks.js),
// but the player sees them by opening packs on the end-of-run screen.
// Every new explorer level gives:
//   - one 'unlock' pack with the card set that level opened
//   - one 'hero' pack with the hero's exclusive cards that level opened (if any were left)
// Unopened packs are kept with the lifetime progress (Progress.packs), so they are
// never lost: a run that is abandoned shows them at the end of the next one.
//   Game.Packs.unopened()    [{ uid, kind, cards, setId?, hero?, embers?, level, earnedAt }]
//                            (embers: bonus pack with no cards, see heroCards:maxed)
//   Game.Packs.get(uid)      one pack
//   Game.Packs.look(pack)    { name, tagline, style, color, glow, title } how it is drawn
//   Game.Packs.open(uid)     marks it opened, returns the pack; event 'pack:opened' { pack }
//   Game.Packs.lastEarned    packs the last won fight gave (fight summary)
//   event 'pack:earned' { pack }
Game.Packs = (function () {
  const P = () => { const p = Game.Progress.get(); p.packs = p.packs || []; return p.packs; };
  let seq = 0;
  const uid = () => 'p' + Date.now().toString(36) + (seq++).toString(36);

  function add(pack) {
    pack.uid = uid();
    pack.level = Game.Unlocks.level().level;
    pack.earnedAt = Date.now();
    P().push(pack);
    api.lastEarned.push(pack);
    Game.Progress.save();
    Game.Events.emit('pack:earned', { pack });
    return pack;
  }

  // One card set per level -> one explorer pack.
  Game.Events.on('cards:unlocked', ({ set, cards }) => {
    add({ kind: 'unlock', setId: set.id, cards: cards.slice() });
  });
  // Hero cards: one pack for each level's worth of cards (unlockPerLevel each).
  Game.Events.on('heroCards:unlocked', ({ hero, cards }) => {
    const per = (Game.CHARACTERS[hero] && Game.CHARACTERS[hero].unlockPerLevel) || cards.length;
    for (let i = 0; i < cards.length; i += per) add({ kind: 'hero', hero, cards: cards.slice(i, i + per) });
  });

  // Every exclusive card already owned: the level pays embers instead (opened like a pack).
  Game.Events.on('heroCards:maxed', ({ hero, levels }) => {
    for (let i = 0; i < levels; i++) add({ kind: 'hero', hero, cards: [], embers: Game.CARD_PACKS.bonusEmbers || 4 });
  });

  const unopened = () => P().slice();
  const get = id => P().find(p => p.uid === id) || null;

  function look(pack) {
    const base = Game.CARD_PACKS.kinds[pack.kind] || Game.CARD_PACKS.kinds.unlock;
    const out = Object.assign({}, base);
    if (pack.kind === 'hero') {
      const h = Game.CHARACTERS[pack.hero] || {};
      out.style = h.packStyle || base.style;
      out.name = h.packName || base.name;
      out.title = h.name || '';
      if (h.packColor) out.color = h.packColor;
    } else {
      const set = Game.UNLOCK_SETS.find(s => s.id === pack.setId);
      out.title = set ? set.name : '';
      out.setColor = set && set.color;
      out.setTheme = set && set.theme;
    }
    return out;
  }

  function open(id) {
    const list = P();
    const i = list.findIndex(p => p.uid === id);
    if (i < 0) return null;
    const [pack] = list.splice(i, 1);
    Game.Progress.save();
    if (pack.embers) {   // bonus pack: pay the embers
      const M = Game.Meta.get();
      M.embers += pack.embers; M.totalEmbers += pack.embers;
      Game.Meta.save();
    }
    Game.Events.emit('pack:opened', { pack });
    return pack;
  }

  const api = { unopened, get, look, open, lastEarned: [] };
  Game.Events.on('combat:start', () => { api.lastEarned = []; });
  return api;
})();
