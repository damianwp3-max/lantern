// COMBAT CORE
// Pure rules, no drawing. The UI calls these functions and then re-renders.
// A combat object holds the piles, energy, block and enemies for one fight.
// Card effects live in effects.js (targets picked by resolver.js), enemy moves
// in enemyMoves.js, and key moments are announced on Game.Events so other
// systems hook in: statuses.js, delayed.js and powers.js all work that way.
(function () {
  const { log } = Game.CombatUtil;
  const emit = (name, c, extra) => Game.Events.emit(name, Object.assign({ combat: c }, extra));

  Game.Combat = {
    create(run, enemyIds) {
      const c = {
        player: { hp: run.hp, maxHp: run.maxHp, block: 0, energy: 0, maxEnergy: run.maxEnergy, strength: 0 },
        enemies: enemyIds.map((id, i) => {
          const def = Game.ENEMIES[id];
          return { uid: i, id, name: def.name, hp: def.hp, maxHp: def.hp, block: 0, moveIndex: 0 };
        }),
        drawPile: Game.Util.shuffle(run.deck),
        hand: [],
        discardPile: [],
        exhausted: [],   // cards gone for this fight (powers)
        handSize: run.handSize,
        turn: 0,
        targetUid: 0,
        outcome: null,   // null while fighting, then 'win' or 'lose'
        log: [],
      };
      emit('combat:start', c);
      this.startPlayerTurn(c);
      return c;
    },

    startPlayerTurn(c) {
      c.turn += 1;
      c.player.block = 0;
      c.player.energy = c.player.maxEnergy;
      this.draw(c, c.handSize);
      log(c, `--- Turn ${c.turn} ---`);
      emit('turn:start', c);
      this.checkOutcome(c);   // delayed effects or poison can end the fight
    },

    // Put a card into the hand (or 'draw' / 'discard'). A full hand sends it to discard.
    giveCard(c, cardId, to = 'hand') {
      if (to === 'draw') c.drawPile.splice(Math.floor(Math.random() * (c.drawPile.length + 1)), 0, cardId);
      else if (to === 'discard' || c.hand.length >= this.MAX_HAND) c.discardPile.push(cardId);
      else c.hand.push(cardId);
    },
    MAX_HAND: 10,

    draw(c, n) {
      for (let i = 0; i < n; i++) {
        if (c.drawPile.length === 0) {
          if (c.discardPile.length === 0) return;   // nothing left anywhere
          c.drawPile = Game.Util.shuffle(c.discardPile);
          c.discardPile = [];
          log(c, 'Discard pile shuffled into draw pile.');
        }
        if (c.hand.length >= this.MAX_HAND) return;   // hand is full
        c.hand.push(c.drawPile.pop());
      }
    },

    canPlay(c, handIndex) {
      const card = Game.CARDS[c.hand[handIndex]];
      if (c.outcome || !card || card.unplayable) return false;
      if (card.target === 'enemy' && !this.targetableEnemies(c).length) return false;   // every enemy is underground
      return card.xcost ? c.player.energy >= 1 : card.cost <= c.player.energy;   // X cards need at least 1 energy
    },

    // timing: the result of a Timed card's minigame ({ rating }), or null.
    playCard(c, handIndex, timing) {
      if (!this.canPlay(c, handIndex)) return false;
      const cardId = c.hand[handIndex];
      const card = Game.CARDS[cardId];

      // X cards (piercing 'X Cost') spend ALL remaining energy and repeat their effects X times.
      const spent = card.xcost ? c.player.energy : card.cost;
      c.player.energy -= spent;
      c.hand.splice(handIndex, 1);
      log(c, `You play ${card.name}${card.xcost ? ` with X = ${spent}` : ''}.`);
      // Luck (lucky / unlucky / joker piercings): the card may fizzle or happen twice.
      const luck = Game.Piercing ? Game.Piercing.roll(card) : 'normal';
      let reps = luck === 'fizzle' ? 0 : luck === 'double' ? 2 : 1;
      if (card.xcost) reps *= spent;
      if (luck === 'fizzle') log(c, `${card.name} fizzles. Nothing happens.`);
      if (luck === 'double') log(c, `${card.name} goes off twice!`);
      // Targets are picked per effect, so a second hit moves on if the first one killed.
      const result = card.timed ? Game.Timing.result(timing && timing.rating) : null;
      if (result) log(c, `Timing: ${result.label} (x${result.mult}).`);
      for (let i = 0; i < reps && !c.outcome; i++) {
        Game.Resolver.runEffects(c, card.effects, { defaultTarget: card.target, targetUid: c.targetUid, timing: result });
        this.checkOutcome(c);
      }
      emit('card:luck', c, { cardId, card, luck, reps, spent });
      // Powers (types with leavesFight) and cards with exhaust are gone until the fight ends.
      const kind = Game.CARD_TYPES[card.type] || {};
      if (kind.leavesFight || card.exhaust) c.exhausted.push(cardId);
      else c.discardPile.push(cardId);
      emit('card:played', c, { cardId, card });
      this.checkOutcome(c);
      return true;
    },

    livingEnemies(c) {
      return c.enemies.filter(e => e.hp > 0);
    },

    // Living enemies that cards can hit (not underground, see combat/enemyTraits.js).
    targetableEnemies(c) {
      return this.livingEnemies(c).filter(e => !(e.statuses && e.statuses.burrowed));
    },

    // Selected enemy, or the first targetable one if the selected one is dead or hidden.
    currentTarget(c) {
      const alive = this.targetableEnemies(c);
      return alive.find(e => e.uid === c.targetUid) || alive[0] || null;
    },

    setTarget(c, uid) {
      c.targetUid = uid;
    },

    // The move an enemy will make next (picked in advance by combat/enemyAI.js).
    intentOf(enemy) {
      return Game.EnemyAI.current(enemy);
    },

    // The end of a turn is split into steps so the UI can play each one's animation in order
    // (app/actions/endTurnActions.js). endTurn() below runs them all at once (scripts, tests).
    // 1. discardHand   2. finishPlayerTurn (Bat bite, end-of-turn powers)   3. enemyTurn per enemy   4. startPlayerTurn (draw)

    // Step 1: junk rules, then the hand goes to the discard pile. Returns false if the fight ended.
    discardHand(c) {
      if (c.outcome) return false;
      emit('turn:ending', c);   // the hand is still full here (junk rules, combat/junkRules.js)
      if (this.checkOutcome(c)) return false;
      // Collector cards (piercing) stay in your hand; everything else is discarded.
      const keep = c.hand.filter(id => Game.CARDS[id].retain);
      c.discardPile.push(...c.hand.filter(id => !Game.CARDS[id].retain));
      c.hand = keep;
      return true;
    },

    // Step 2: your turn is over: Bat bites, end-of-turn powers and statuses fire. False if the fight ended.
    finishPlayerTurn(c) {
      emit('turn:end', c);
      return !this.checkOutcome(c);
    },

    // Extra turns (combat/heroEffects.js, e.g. Vampiric Speed): you go again before enemies act.
    takeExtraTurn(c) {
      if (!(c.extraTurns > 0)) return false;
      c.extraTurns -= 1;
      log(c, 'You move again before the enemies can act!');
      emit('turn:extra', c);
      this.startPlayerTurn(c);
      return true;
    },

    // Step 3: one enemy loses old block, ticks its statuses, then acts. False if the fight ended.
    enemyTurn(c, enemy) {
      enemy.block = 0;
      emit('enemy:turnStart', c, { enemy });
      if (enemy.hp <= 0) return !this.checkOutcome(c);
      if (enemy.statuses && enemy.statuses.stunned > 0) {   // Stunned: this turn does nothing, then the stun wears off
        enemy.statuses.stunned -= 1;
        if (!enemy.statuses.stunned) delete enemy.statuses.stunned;
        log(c, `${enemy.name} is stunned and loses its turn.`);
        emit('enemy:stunned', c, { enemy });
        emit('enemy:turnEnd', c, { enemy });
        return !this.checkOutcome(c);
      }
      const move = this.intentOf(enemy);
      Game.EnemyMoves[move.type](c, enemy, move);
      emit('enemy:acted', c, { enemy, move });   // combat/enemyActions.js -> ui/juice/enemyActionFx.js
      enemy.moveIndex += 1;
      Game.EnemyAI.advance(c, enemy);
      emit('enemy:turnEnd', c, { enemy });
      return !this.checkOutcome(c);
    },

    endTurn(c) {
      if (c.outcome) return;
      if (!this.discardHand(c) || !this.finishPlayerTurn(c)) return;
      if (this.takeExtraTurn(c)) return;
      for (const enemy of this.livingEnemies(c)) {
        if (!this.enemyTurn(c, enemy)) return;
      }
      this.startPlayerTurn(c);
    },

    checkOutcome(c) {
      if (c.outcome) return c.outcome;
      if (c.player.hp <= 0) c.outcome = 'lose';
      else if (this.livingEnemies(c).length === 0) c.outcome = 'win';
      if (c.outcome) emit('combat:end', c, { outcome: c.outcome });
      return c.outcome;
    },
  };
})();
