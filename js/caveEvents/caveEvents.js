// CAVE EVENTS (rules; the events themselves are data/caveEventsData.js)
//   Game.CaveEvents.pick(run)               an event id you have not met this run (resets once all are seen)
//   Game.CaveEvents.availability(run, opt)  { ok, reason }   can this option be chosen now?
//   Game.CaveEvents.run(run, option, done)  applies the effects; done(lines) gets a list of result lines
//                                           (called after any card picker the option opened)
//   Game.CaveEvents.handlers                effect type -> fn(run, effect, ctx) -> line | null.  Add one to add an effect type.
Game.CaveEvents = (function () {
  const R = () => Game.State.run;
  const sign = n => (n >= 0 ? '+' : '') + n;
  const upgradable = run => run.deck.filter(id => Game.Cards.canUpgrade(id));
  const pierceable = (run, piercing) => run.deck.filter(id => Game.Cards.canPierce(id, piercing));

  // Handlers return a line of text for the result screen. 'pick*' ones are deferred (they open the card picker).
  const handlers = {
    gold(run, e) {
      if (e.amount < 0) Game.Gold.spend(run, -e.amount); else Game.Gold.gain(run, e.amount);
      return `${sign(e.amount)} gold`;
    },
    hp(run, e) {
      const before = run.hp;
      run.hp = Math.max(1, Math.min(run.maxHp, run.hp + e.amount));
      return `${sign(run.hp - before)} HP`;
    },
    maxHp(run, e) {
      run.maxHp = Math.max(1, run.maxHp + e.amount);
      run.hp = Math.min(run.maxHp, Math.max(1, run.hp + Math.max(0, e.amount)));
      return `${sign(e.amount)} max HP`;
    },
    oil(run, e) { const d = Game.Oil.gain(run, e.amount); return `${sign(d)} oil`; },
    totem(run, e) {
      const id = e.id === 'random' ? Game.Totems.randomUnowned(run) : e.id;
      if (!id || !Game.Totems.gain(run, id)) { Game.Gold.gain(run, 40); return 'You already own every totem: +40 gold instead'; }
      return `New totem: ${Game.TOTEMS[id].name}`;
    },
    card(run, e) {
      run.deck.push(e.id);
      Game.Events.emit('deck:cardAdded', { cardId: e.id, from: 'event' });
      return `Added to your deck: ${Game.CARDS[e.id].name}`;
    },
    upgradeRandom(run) {
      const list = upgradable(run);
      if (!list.length) return 'No card could be upgraded';
      const idx = run.deck.indexOf(Game.Util.pick(list));
      const old = Game.CARDS[run.deck[idx]].name;
      run.deck[idx] = Game.Cards.upgrade(run.deck[idx]);
      return `${old} was upgraded`;
    },
    pierceRandom(run, e) {
      const piercing = e.piercing;
      const list = pierceable(run, piercing);
      if (!list.length) return 'No card could be pierced';
      const idx = run.deck.indexOf(Game.Util.pick(list));
      const p = piercing || Game.Piercing.randomFor(run.deck[idx]);
      if (!p) return 'No card could be pierced';
      const old = Game.CARDS[run.deck[idx]].name;
      run.deck[idx] = Game.Cards.pierce(run.deck[idx], p);
      return `${old} is now ${Game.PIERCINGS[p].name}`;
    },
    fightMod(run, e) { Game.FightMods.add(run, e.mod); return e.mod.text || 'Something lingers for your next fights'; },
    gamble(run, e, ctx) {
      const won = Math.random() < e.chance;
      const lines = [won ? 'Luck is with you.' : 'Bad luck.'];
      const branch = (won ? e.win : e.lose) || [];
      branch.forEach(sub => { const l = apply(run, sub, ctx); if (l) lines.push(l); });
      return lines.join(' ');
    },
  };
  const DEFERRED = { pickUpgrade: 1, pickPierce: 1, pickRemove: 1 };

  function apply(run, effect, ctx) {
    if (DEFERRED[effect.type]) { ctx.pending.push(effect); return null; }
    const fn = handlers[effect.type];
    return fn ? fn(run, effect, ctx) : null;
  }

  function pick(run) {
    const all = Object.keys(Game.CAVE_EVENTS);
    let seen = run.seenEvents || [];
    let pool = all.filter(id => !seen.includes(id));
    if (!pool.length) { seen = []; pool = all; }
    const id = Game.Util.pick(pool);
    run.seenEvents = seen.concat(id);
    return id;
  }

  // Can this option be chosen right now? (gold, oil, cards)
  function availability(run, option) {
    for (const e of option.effects) {
      if (e.type === 'gold' && e.amount < 0 && run.gold < -e.amount) return { ok: false, reason: 'Not enough gold' };
      if (e.type === 'oil' && e.amount < 0 && run.oil < -e.amount) return { ok: false, reason: 'Not enough oil' };
      if (e.type === 'pickRemove' && run.deck.length <= 5) return { ok: false, reason: 'Deck too small' };
      if (e.type === 'pickUpgrade' && !upgradable(run).length) return { ok: false, reason: 'Nothing to upgrade' };
      if (e.type === 'pickPierce' && !pierceable(run, e.piercing).length) return { ok: false, reason: 'No card can take it' };
    }
    return { ok: true };
  }

  // Run the option. Card pickers (upgrade / pierce / remove) come last, one after another.
  function run(runState, option, done) {
    const ctx = { pending: [] };
    const lines = [];
    option.effects.forEach(e => { const l = apply(runState, e, ctx); if (l) lines.push(l); });
    const next = () => {
      const e = ctx.pending.shift();
      if (!e) return done(lines);
      const after = msg => { if (msg) lines.push(msg); next(); };
      if (e.type === 'pickUpgrade') Game.Picker.upgrade({ onDone: after });
      else if (e.type === 'pickRemove') Game.Picker.remove({ onDone: after });
      else Game.Picker.pierce({ piercing: e.piercing, onDone: after });
    };
    next();
  }

  return { pick, availability, run, handlers };
})();
