// CARD EFFECTS
// One handler per effect type used by cards and powers:
//   { type: 'damage', amount: 6 }  ->  Game.Effects.damage(combat, effect, target, ctx)
// Who "target" is gets decided by combat/resolver.js (enemy, all, random, self).
// To add a new effect, register a handler here or from any other file with
// Game.Effects.register('name', fn). Mark it fn.container = true if it holds
// other effects and should run once (see delayed.js, powers.js).
(function () {
  const { dealDamage, log } = Game.CombatUtil;
  const S = () => Game.Statuses;
  const T = () => Game.Timing;
  const roll = effect => (effect.max !== undefined ? Game.Util.randInt(effect.amount, effect.max) : effect.amount);

  Game.Effects = {
    register(type, handler) { this[type] = handler; },

    // amount (or amount..max for a random roll). Strength adds to every hit
    // unless flat: true (damage from powers). Weak / vulnerable change it.
    // On a Timed card the timing result scales it (combat/../timing/timing.js).
    damage(c, effect, target, ctx) {
      if (!target || target.hp <= 0) return;
      const base = T().scale(ctx, roll(effect) + (effect.flat ? 0 : (c.player.strength || 0)), effect);
      dealDamage(c, target, S().modifyDamage(c.player, target, base), target.name);
    },
    // Deal damage equal to your current block.
    damageFromBlock(c, effect, target) {
      if (!target || target.hp <= 0) return;
      dealDamage(c, target, S().modifyDamage(c.player, target, c.player.block), target.name);
    },
    block(c, effect, target, ctx) {
      const n = S().modifyBlock(c.player, T().scale(ctx, roll(effect), effect));
      c.player.block += n;
      log(c, `You gain ${n} block.`);
    },
    doubleBlock(c) {
      log(c, `Your block doubles to ${c.player.block * 2}.`);
      c.player.block *= 2;
    },
    blockPerEnergy(c, effect) {
      const n = effect.amount * c.player.energy;
      if (n > 0) { c.player.block += n; log(c, `You gain ${n} block from unspent energy.`); }
    },
    // byRating: { miss, ok, good, great, perfect } = cards drawn by timing result.
    draw(c, effect, target, ctx) {
      Game.Combat.draw(c, T().pick(ctx, effect.byRating, effect.amount));
    },
    energy(c, effect) {
      const n = roll(effect);
      c.player.energy = Math.max(0, c.player.energy + n);
      log(c, n >= 0 ? `You gain ${n} energy.` : `You lose ${-n} energy.`);
    },
    strength(c, effect) {
      c.player.strength = (c.player.strength || 0) + effect.amount;
      log(c, `You gain ${effect.amount} strength.`);
    },
    heal(c, effect) {
      const p = c.player, before = p.hp;
      p.hp = Math.min(p.maxHp, p.hp + effect.amount);
      log(c, `You heal ${p.hp - before} HP.`);
    },
    // Lose HP directly (block does not help).
    loseHp(c, effect) {
      const p = c.player;
      const n = Math.min(p.hp, effect.amount);
      p.hp -= n;
      log(c, `You lose ${n} HP.`);
      Game.Events.emit('damage:dealt', { combat: c, target: p, amount: n, blocked: 0 });
    },
    // Statuses: on an enemy, or on you when target is self.
    status(c, effect, target) {
      S().add(c, target || c.player, effect.status, effect.amount);
    },
    multiplyStatus(c, effect, target) {
      const unit = target || c.player, have = S().get(unit, effect.status);
      if (have) S().add(c, unit, effect.status, have * (effect.factor - 1));
    },
    // Put copies of a card in hand / draw / discard (to: 'hand' by default).
    addCard(c, effect) {
      for (let i = 0; i < (effect.amount || 1); i++) Game.Combat.giveCard(c, effect.card, effect.to);
    },
    // Random card(s) from the reward pool; cardType limits it (attack, power, ...).
    addRandomCard(c, effect) {
      // Packs never contain packs (unless a pack asks for them by cardType).
      const pool = (Game.Unlocks ? Game.Unlocks.pool() : Game.REWARD_POOL).filter(id => effect.cardType ? Game.CARDS[id].type === effect.cardType : Game.CARDS[id].type !== 'pack');
      if (!pool.length) return log(c, 'Nothing came out of the pack.');
      for (let i = 0; i < (effect.amount || 1); i++) {
        const id = Game.Unlocks ? Game.Unlocks.pickOne(pool) : Game.Util.pick(pool);
        Game.Combat.giveCard(c, id, effect.to);
        log(c, `A random card appears: ${Game.CARDS[id].name}.`);
      }
    },
  };

  // Pick one of several effect lists at random: { type: 'randomOf', options: [[...], [...]] }
  Game.Effects.randomOf = function (c, effect, target, ctx) {
    const option = Game.Util.pick(effect.options);
    Game.Resolver.runEffects(c, option, ctx);
  };
  Game.Effects.randomOf.container = true;
})();
