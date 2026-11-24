// THE BAT (rules)
// The Lamplighter's summoned ally. Numbers live in Game.BAT (data/heroes/lamplighterKit.js).
//   card effect { type: 'summonBat', amount: 10 }   summon it, or heal it if it is already out
//   - it lives in combat.bat = { ally: true, name, hp, maxHp, block } for one fight
//   - every time you gain block, it gains the same block (lost at the start of your turn, like yours)
//   - enemies always attack it first while it is alive (Game.EnemyMoves.victim)
//   - when you end your turn it bites your target for Game.BAT.attack damage
//   - Overheal: its healing has no HP limit (combat/healing.js); each bite heals it for the damage it dealt (Game.BAT.biteHeals)
// Drawing: ui/batView.js. Event: 'bat:attack' { combat, enemy, amount } (for the animation).
Game.Bat = (function () {
  const { dealDamage, log } = Game.CombatUtil;
  const B = () => Game.BAT;
  const get = c => (c && c.bat && c.bat.hp > 0 ? c.bat : null);

  function summon(c, hp) {
    const bat = get(c);
    if (bat) { Game.Healing.heal(c, bat, B().resummonHeal); return bat; }
    c.bat = { ally: true, id: 'bat', name: B().name, hp: hp || B().hp, maxHp: hp || B().hp, block: 0, statuses: {}, summonedTurn: c.turn };
    log(c, 'A Bat flutters out of the dark to fight beside you.');
    Game.Events.emit('bat:summoned', { combat: c, bat: c.bat });
    return c.bat;
  }

  function gainBlock(c, n) {
    const bat = get(c);
    if (!bat || !(n > 0)) return;
    bat.block += n;
    log(c, `Your Bat gains ${n} block.`);
  }

  // Its bite at the end of your turn: your target, or the first enemy standing.
  function attack(c) {
    const bat = get(c);
    if (!bat || c.outcome) return;
    const enemy = Game.Combat.currentTarget(c);
    if (!enemy) return;
    const before = enemy.hp;
    c.dmgSource = 'bat';
    dealDamage(c, enemy, Game.Statuses.modifyDamage(bat, enemy, B().attack), enemy.name, 'Your Bat');
    c.dmgSource = null;
    const dealt = before - enemy.hp;
    Game.Events.emit('bat:attack', { combat: c, enemy, amount: dealt });
    // It heals for the damage it actually dealt (overheal: no HP limit).
    if (B().biteHeals && dealt > 0) Game.Healing.heal(c, bat, dealt);
  }

  Game.Effects.register('summonBat', (c, effect) => summon(c, effect.amount));

  // Block you gain is copied to the Bat: wrap the effects that give you block.
  ['block', 'doubleBlock', 'blockPerEnergy'].forEach(type => {
    const base = Game.Effects[type];
    if (!base) return;
    const wrapped = function (c) {
      const before = c.player.block;
      const out = base.apply(this, arguments);
      gainBlock(c, c.player.block - before);
      return out;
    };
    Object.assign(wrapped, base);
    Game.Effects.register(type, wrapped);
  });

  // Enemies go for the Bat first while it is alive.
  const baseVictim = Game.EnemyMoves.victim;
  Game.EnemyMoves.victim = function (c, enemy) {
    return get(c) || baseVictim.call(this, c, enemy);
  };

  Game.Events.on('combat:start', ({ combat }) => { combat.bat = null; });
  Game.Events.on('turn:start', ({ combat }) => { const bat = get(combat); if (bat) bat.block = 0; });
  Game.Events.on('turn:end', ({ combat }) => attack(combat));
  Game.Events.on('damage:dealt', ({ combat, target }) => {
    if (combat && target && target === combat.bat && target.hp <= 0 && !target.deathLogged) {
      target.deathLogged = true;
      log(combat, 'Your Bat falls.');
      Game.Events.emit('bat:died', { combat, bat: target });
    }
  });

  return { get, summon, attack, gainBlock };
})();
