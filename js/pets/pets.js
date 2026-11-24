// PETS (rules core). Pet data: data/petsData.js. Each pet's trick: pets/petAbilities.js.
// A pet works like the Bat (combat/bat.js):
//   card effect { type: 'summonPet', pet: 'magpie' }   summon it, or heal it if it is already out
//   - pets live in combat.pets = [{ ally, pet, id, name, hp, maxHp, block, statuses, state }]
//   - enemies attack the Bat first, then pets (newest last), then you
//   - damage beyond a pet's HP spills over to the next in line (Game.Pets.hit)
//   - at most Game.PET_RULES.maxOut pets are out; a new one sends the oldest home
// Abilities plug in with Game.Pets.registerAbility(name, { onSummon, onTurnStart,
//   onTurnEnd, onCardPlayed, onHit, onWin, ... }) and are called by the hooks below.
// Events: 'pet:summoned' / 'pet:act' { combat, pet, enemy?, amount?, kind } / 'pet:died'.
Game.Pets = (function () {
  const { dealDamage, log } = Game.CombatUtil;
  const abilities = {};
  const def = id => Game.PETS[id];
  const living = c => ((c && c.pets) || []).filter(p => p.hp > 0);
  const get = (c, id) => living(c).find(p => p.id === id) || null;
  const name = p => Game.t(def(p.id).name);
  // Enemies a pet can reach (not underground, see combat/enemyTraits.js).
  const targets = c => (Game.Combat.targetableEnemies ? Game.Combat.targetableEnemies(c) : Game.Combat.livingEnemies(c));

  function registerAbility(id, hooks) { abilities[id] = hooks; }
  const ability = p => abilities[def(p.id).ability] || {};

  // Run one hook on every living pet. Extra args go after (c, pet, data).
  function each(c, hook, ...args) {
    living(c).forEach(p => { const fn = ability(p)[hook]; if (fn && !c.outcome) fn(c, p, def(p.id), ...args); });
  }

  function summon(c, id) {
    const d = def(id);
    if (!d) return null;
    c.pets = c.pets || [];
    const out = get(c, id);
    if (out) {   // already out: heal it
      const before = out.hp;
      out.hp = Math.min(out.maxHp, out.hp + d.resummonHeal);
      log(c, `Your ${name(out)} heals ${out.hp - before} HP.`);
      Game.Events.emit('pet:act', { combat: c, pet: out, kind: 'heal', amount: out.hp - before });
      return out;
    }
    // Too many out: the oldest goes home.
    const alive = living(c);
    if (alive.length >= Game.PET_RULES.maxOut) { alive[0].hp = 0; alive[0].gone = true; log(c, `Your ${name(alive[0])} slips back into the dark.`); }
    c.pets = c.pets.filter(p => p.hp > 0);
    const pet = { ally: true, pet: true, id, name: d.name, hp: d.hp, maxHp: d.hp, block: 0, statuses: {}, state: {}, born: c.turn };
    c.pets.push(pet);
    log(c, `${name(pet)} joins you.`);
    const fn = ability(pet).onSummon;
    if (fn) fn(c, pet, d);
    Game.Events.emit('pet:summoned', { combat: c, pet });
    return pet;
  }

  // A pet's own damage to an enemy (not yours: no lifesteal, see combat/healing.js).
  function strike(c, pet, enemy, amount, kind) {
    if (!enemy || enemy.hp <= 0) return 0;
    const before = enemy.hp;
    c.dmgSource = 'pet';
    dealDamage(c, enemy, Game.Statuses.modifyDamage(pet, enemy, amount), enemy.name, `Your ${name(pet)}`);
    c.dmgSource = null;
    const dealt = before - enemy.hp;
    Game.Events.emit('pet:act', { combat: c, pet, enemy, amount: dealt, kind: kind || 'strike' });
    return dealt;
  }
  function strikeAll(c, pet, amount, kind) {
    targets(c).forEach(e => strike(c, pet, e, amount, kind || 'burst'));
    Game.Combat.checkOutcome(c);
  }

  // An enemy's hit on a pet. Returns what is left over for the next one in line.
  function hit(c, pet, amount, enemy) {
    const soak = pet.block + pet.hp;
    const onPet = Math.min(amount, soak);
    dealDamage(c, pet, onPet, `your ${name(pet)}`, enemy.name);
    const fn = ability(pet).onHit;
    if (fn && onPet > 0) fn(c, pet, def(pet.id), enemy, onPet);
    if (pet.hp <= 0 && !pet.deathLogged) {
      pet.deathLogged = true;
      const die = ability(pet).onDeath;
      if (die) die(c, pet, def(pet.id));
      log(c, `Your ${name(pet)} falls.`);
      Game.Events.emit('pet:died', { combat: c, pet });
    }
    return amount - onPet;
  }

  // --- Hooks into the fight ---
  Game.Effects.register('summonPet', (c, effect) => summon(c, effect.pet));

  // Who an attack hits: the Bat (combat/bat.js) first, then the first pet out, then you.
  const baseVictim = Game.EnemyMoves.victim;
  Game.EnemyMoves.victim = function (c, enemy) {
    const who = baseVictim.call(this, c, enemy);
    if (who !== c.player) return who;
    return living(c)[0] || who;
  };

  // Enemy attacks: same as before, but a hit that kills a pet spills over.
  const baseAttack = Game.EnemyMoves.attack;
  Game.EnemyMoves.attack = function (c, enemy, move) {
    if (!living(c).length) return baseAttack.apply(this, arguments);
    for (let i = 0; i < (move.hits || 1) && c.player.hp > 0; i++) {
      let who = Game.EnemyMoves.victim(c, enemy);
      let dmg = Game.Statuses.modifyDamage(enemy, who, move.value);
      while (who && who.pet && dmg > 0) {
        dmg = hit(c, who, dmg, enemy);
        who = dmg > 0 ? Game.EnemyMoves.victim(c, enemy) : null;
      }
      if (who && dmg > 0) dealDamage(c, who, dmg, who === c.player ? 'you' : `your ${who.name}`, enemy.name);
    }
    Game.EnemyMoves.extras(c, enemy, move);
  };

  // Remember the last timing rating so abilities can react to it (Glowworm).
  const basePlay = Game.Combat.playCard;
  Game.Combat.playCard = function (c, index, timing) {
    c.lastTiming = timing && timing.rating ? timing : null;
    const ok = basePlay.apply(this, arguments);
    if (ok) { each(c, 'onTimed', c.lastTiming); Game.Combat.checkOutcome(c); }
    c.lastTiming = null;
    return ok;
  };

  // Ending the turn: abilities that keep cards see the hand before it is discarded.
  const baseEnd = Game.Combat.endTurn;
  Game.Combat.endTurn = function (c) {
    if (!c.outcome) each(c, 'beforeDiscard');
    return baseEnd.apply(this, arguments);
  };

  Game.Events.on('combat:start', ({ combat }) => { combat.pets = []; });
  Game.Events.on('turn:start', ({ combat }) => each(combat, 'onTurnStart'));
  Game.Events.on('turn:end', ({ combat }) => each(combat, 'onTurnEnd'));
  Game.Events.on('card:played', ({ combat, card, cardId }) => each(combat, 'onCardPlayed', card, cardId));
  Game.Events.on('combat:end', ({ combat, outcome }) => {
    if (outcome !== 'win') return;
    living(combat).forEach(p => { const fn = ability(p).onWin; if (fn) fn(combat, p, def(p.id)); });
  });

  return { get, living, targets, summon, strike, strikeAll, hit, registerAbility, def };
})();
