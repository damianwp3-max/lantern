// PET ABILITIES: the one trick each pet has. Numbers come from data/petsData.js
// (the d argument). Hooks are called by js/pets/pets.js:
//   onSummon, onTurnStart, onTurnEnd, beforeDiscard (end of turn, hand still full),
//   onCardPlayed(card, id), onTimed(timing), onHit(enemy, dmg), onDeath, onWin
// pet.state holds an ability's own counters (shown on the battlefield by ui/pets/petView.js).
(function () {
  const P = Game.Pets;
  const { log } = Game.CombatUtil;
  const nm = p => Game.t(P.def(p.id).name);
  const act = (c, pet, kind, extra) => Game.Events.emit('pet:act', Object.assign({ combat: c, pet, kind }, extra));

  // MAGPIE: marks one card in your hand each turn; play it to draw.
  function markShiny(c, pet) {
    const ids = c.hand.filter(id => !Game.CARDS[id].unplayable);
    pet.state.shiny = ids.length ? Game.Util.pick(ids) : null;
  }
  P.registerAbility('shiny', {
    onSummon: markShiny,
    onTurnStart: markShiny,
    onCardPlayed(c, pet, d, card, cardId) {
      if (!pet.state.shiny || cardId !== pet.state.shiny) return;
      pet.state.shiny = null;
      Game.Combat.draw(c, d.draw);
      log(c, `Your ${nm(pet)} squawks: draw ${d.draw}.`);
      act(c, pet, 'shiny');
    },
    onTurnEnd(c, pet) { pet.state.shiny = null; },
  });

  // EMBER SALAMANDER: heat from your Attacks, then a fire burst on everyone.
  P.registerAbility('heat', {
    onSummon(c, pet) { pet.state.heat = 0; },
    onCardPlayed(c, pet, d, card) {
      if (card.type !== 'attack' && card.type !== 'hybrid') return;
      pet.state.heat = (pet.state.heat || 0) + 1;
      if (pet.state.heat < d.heatMax) return act(c, pet, 'charge');
      pet.state.heat = 0;
      log(c, `Your ${nm(pet)} breathes fire!`);
      P.strikeAll(c, pet, d.burst, 'fire');
    },
  });

  // CAVE SNAIL: block that never fades, a little more every turn.
  P.registerAbility('shell', {
    onTurnEnd(c, pet, d) {
      const add = Math.min(d.shellGain, Math.max(0, d.shellMax - pet.block));
      if (!add) return;
      pet.block += add;
      log(c, `Your ${nm(pet)} pulls into its shell: +${add} block.`);
      act(c, pet, 'shell', { amount: add });
    },
  });

  // COFFER PUP: gold when it is hit, a little more if it survives.
  P.registerAbility('hoard', {
    onHit(c, pet, d) {
      const run = Game.State.run; if (!run) return;
      Game.Gold.gain(run, d.goldPerHit);
      pet.state.gold = (pet.state.gold || 0) + d.goldPerHit;
      log(c, `Coins spill from your ${nm(pet)}: +${d.goldPerHit} gold.`);
      act(c, pet, 'gold', { amount: d.goldPerHit });
    },
    onWin(c, pet, d) {
      const run = Game.State.run; if (!run) return;
      Game.Gold.gain(run, d.goldIfAlive);
      pet.state.gold = (pet.state.gold || 0) + d.goldIfAlive;
      log(c, `Your ${nm(pet)} coughs up ${d.goldIfAlive} gold.`);
    },
  });

  // PACK RAT: keeps one card you did not play and gives it back next turn.
  P.registerAbility('stash', {
    beforeDiscard(c, pet) {
      const left = c.hand.filter(id => !Game.CARDS[id].retain && !Game.CARDS[id].unplayable);
      if (!left.length) return;
      const id = Game.Util.pick(left);
      c.hand.splice(c.hand.indexOf(id), 1);
      pet.state.stash = id;
      log(c, `Your ${nm(pet)} hides ${Game.CARDS[id].name}.`);
    },
    onTurnStart(c, pet) {
      const id = pet.state.stash; if (!id) return;
      pet.state.stash = null;
      Game.Combat.giveCard(c, id, 'hand');
      log(c, `Your ${nm(pet)} brings back ${Game.CARDS[id].name}.`);
      act(c, pet, 'stash', { cardId: id });
    },
    onDeath(c, pet) {   // a fallen rat drops what it held
      if (pet.state.stash) { c.discardPile.push(pet.state.stash); pet.state.stash = null; }
    },
  });

  // NIGHT OWL: sees in the dark (Mods 'darkVision'), pecks the biggest threat.
  function threat(c, e) {
    const m = Game.Combat.intentOf(e);
    return m && m.type === 'attack' ? Game.Statuses.modifyDamage(e, c.player, m.value) * (m.hits || 1) : 0;
  }
  P.registerAbility('hunt', {
    onTurnEnd(c, pet, d) {
      const foes = P.targets(c);
      if (!foes.length) return;
      const prey = foes.reduce((a, b) => (threat(c, b) > threat(c, a) ? b : a));
      P.strike(c, pet, prey, d.peck, 'peck');
    },
  });
  Game.Mods.register((run, key) => {
    const c = key === 'darkVision' && Game.App && Game.App.state.combat;
    return c && !c.outcome && P.get(c, 'owl') ? 1 : 0;
  });

  // GLOWWORM: a slower timing bar, and sparks on good timing.
  P.registerAbility('glow', {
    onTimed(c, pet, d, timing) {
      if (!timing || (timing.rating !== 'great' && timing.rating !== 'perfect')) return;
      log(c, `Your ${nm(pet)} sparks!`);
      P.strikeAll(c, pet, d.spark, 'spark');
    },
  });
  const baseSweep = Game.Timing.sweepMs;
  Game.Timing.sweepMs = function () {
    const c = Game.App && Game.App.state.combat;
    const worm = c && !c.outcome && P.get(c, 'glowworm');
    return baseSweep.apply(this, arguments) * (worm ? P.def('glowworm').slow : 1);
  };
})();
