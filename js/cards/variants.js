// CARD VARIANTS
// A deck holds card ids. An upgraded and/or pierced card is just a longer id:
//     strike_lamp            the plain card
//     strike_lamp+           upgraded
//     strike_lamp@lucky      pierced (lucky)
//     strike_lamp+@joker     both
// Looking such an id up in Game.CARDS builds the card on demand (and caches it), so
// the rest of the game (art, tooltips, combat) needs no special cases.
//
//   Game.Cards.parse(id)               -> { base, upgraded, pierce }
//   Game.Cards.make(base, { upgraded, pierce }) -> id
//   Game.Cards.upgrade(id) / .pierce(id, piercingId)   -> new id
//   Game.Cards.baseOf(id)              -> the plain card id
//   Game.Cards.canUpgrade(id) / .canPierce(id, piercingId)
(function () {
  const RAW = Game.CARDS;                 // the plain cards (the proxy below wraps this)
  const cache = {};
  const ID_RE = /^([a-z0-9_]+?)(\+)?(?:@([a-z0-9_]+))?$/;

  function parse(id) {
    const m = ID_RE.exec(id) || [];
    return { base: m[1] || id, upgraded: !!m[2], pierce: m[3] || null };
  }
  function make(base, opts = {}) {
    return base + (opts.upgraded ? '+' : '') + (opts.pierce ? '@' + opts.pierce : '');
  }

  function clone(card) {
    return Object.assign({}, card, { effects: (card.effects || []).map(e => Object.assign({}, e)) });
  }

  function build(id) {
    const { base, upgraded, pierce } = parse(id);
    const src = RAW[base];
    if (!src) return undefined;
    const def = clone(src);
    def.base = base;
    def.upgraded = false;
    if (pierce && Game.PIERCINGS[pierce]) {
      const P = Game.PIERCINGS[pierce];
      // A card born with a piercing (pierce: 'lucky' in its data) can be re-pierced:
      // the new mark replaces the old one, so the old one's flags come off first.
      const innate = src.pierce && src.pierce !== pierce && Game.PIERCINGS[src.pierce];
      if (innate) Object.keys(innate.flags || {}).forEach(k => { delete def[k]; });
      def.pierce = pierce;
      Object.assign(def, P.flags);
      if (P.convert) Object.assign(def, P.convert(def));
      if (def.art) Game.CARD_ART[id] = def.art;
    }
    if (upgraded) {
      const plan = Game.Upgrades.plan(def);
      if (plan) {
        def.upgraded = true;
        def.name = def.name + '+';
        def.upgradeNote = Game.Upgrades.apply(def, plan);
      }
    }
    if (!Game.CARD_ART[id] && Game.CARD_ART[base]) Game.CARD_ART[id] = Game.CARD_ART[base];
    return def;
  }

  Game.CARDS = new Proxy(RAW, {
    get(target, id) {
      if (typeof id !== 'string' || id in target) return target[id];
      if (!/[+@]/.test(id)) return undefined;
      return cache[id] || (cache[id] = build(id));
    },
    has(target, id) { return id in target || (typeof id === 'string' && /[+@]/.test(id) && !!ID_RE.exec(id) && parse(id).base in target); },
  });

  const baseOf = id => parse(id).base;
  const canUpgrade = id => { const p = parse(id); return !p.upgraded && Game.Upgrades.can(RAW[p.base]); };
  function canPierce(id, piercing) {
    const p = parse(id), def = RAW[p.base];
    if (!def || def.unplayable || def.type === 'useless' || def.token || p.pierce) return false;
    if (def.pierce && (!piercing || piercing === def.pierce)) return !piercing ? Object.keys(Game.PIERCINGS).some(x => x !== def.pierce && canPierce(id, x)) : false;   // re-pierce a born-with mark
    const P = piercing && Game.PIERCINGS[piercing];
    if (piercing && !P) return false;
    return !P || !P.allow || P.allow(Game.CARDS[id]);
  }
  const upgrade = id => make(baseOf(id), { upgraded: true, pierce: parse(id).pierce });
  const pierce = (id, piercing) => make(baseOf(id), { upgraded: parse(id).upgraded, pierce: piercing });

  // Built cards keep their text, so a language switch (i18n/content.js) clears them.
  const clearCache = () => Object.keys(cache).forEach(k => delete cache[k]);

  Game.Cards = { parse, make, baseOf, canUpgrade, canPierce, upgrade, pierce, clearCache };
})();
