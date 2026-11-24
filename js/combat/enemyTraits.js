// ENEMY TRAITS (rules; text and numbers in data/enemyTraitsData.js and the enemy data)
// Traits become statuses at the start of a fight, so the HUD and tooltips show them.
//   stoneskin  caps the HP lost per hit            (CombatUtil.hpLossHooks)
//   exposed    doubles damage taken                (CombatUtil.incomingHooks)
//   thorns     hits you back                        ('damage:dealt')
//   regen      heals at its turn start              ('enemy:turnStart')
//   splitting  spawns splitInto enemies on death    ('damage:dealt')
//   vengeful   gains Might when another enemy dies  ('damage:dealt')
//   burrowed   surfaces at its turn start, Exposed until the end of your next turn
//   thief      what it stole comes back when it dies
//   stunned    skips its next turn (Combat.enemyTurn); split-off pieces start with it
//   Game.EnemyTraits.spawn(c, enemyId, from, { stun })   adds an enemy mid-fight (split, summon)
Game.EnemyTraits = (function () {
  const U = Game.CombatUtil;
  const S = () => Game.Statuses;
  const isEnemy = (c, unit) => c.enemies.includes(unit);

  U.incomingHooks.push((c, t, amount) => (amount > 0 && S().get(t, 'exposed') ? amount * 2 : amount));
  U.hpLossHooks.push((c, t, dmg) => { const cap = S().get(t, 'stoneskin'); return cap && dmg > cap ? cap : dmg; });

  function spawn(c, id, from, opts) {
    const def = Game.ENEMIES[id];
    if (!def) return null;
    const e = { uid: c.enemies.length, id, name: def.name, hp: def.hp, maxHp: def.hp, block: 0, moveIndex: 0, statuses: {},
      dmgMult: from && from.dmgMult ? from.dmgMult : 1, spawned: true };
    c.enemies.push(e);
    applyTraits(c, e);
    if (opts && opts.stun) e.statuses.stunned = opts.stun;   // loses its first turn
    Game.EnemyAI.start({ enemies: [e] });
    U.log(c, `${def.name} joins the fight!`);
    Game.Events.emit('enemy:spawned', { combat: c, enemy: e, from });
    return e;
  }

  function applyTraits(c, e) {
    const t = Game.ENEMIES[e.id].traits || {};
    e.statuses = e.statuses || {};
    Object.entries(t).forEach(([id, n]) => { if (Game.STATUSES[id]) e.statuses[id] = n; });
  }

  // Give back what a thief held.
  function returnLoot(c, e) {
    (e.stolen || []).forEach(id => { Game.Combat.giveCard(c, id, 'hand'); U.log(c, `You take back ${Game.CARDS[id].name}.`); });
    if (e.stolenGold && Game.State.run) { Game.Gold.gain(Game.State.run, e.stolenGold); U.log(c, `You get back ${e.stolenGold} gold.`); }
    e.stolen = []; e.stolenGold = 0;
    if (e.statuses) delete e.statuses.thief;
  }

  function onDeath(c, e) {
    if (e.deathDone) return;
    e.deathDone = true;
    if (!e.fled) returnLoot(c, e);
    const def = Game.ENEMIES[e.id];
    if (!e.fled && S().get(e, 'splitting') && def.splitInto) {
      U.log(c, `${e.name} breaks apart!`);
      def.splitInto.forEach(id => spawn(c, id, e, { stun: Game.SPLIT_STUN_TURNS || 1 }));
      e.splitDone = true;
    }
    c.enemies.filter(o => o !== e && o.hp > 0 && S().get(o, 'vengeful')).forEach(o => S().add(c, o, 'might', S().get(o, 'vengeful')));
  }

  Game.Events.on('combat:start', ({ combat: c }) => c.enemies.forEach(e => applyTraits(c, e)));

  Game.Events.on('damage:dealt', ({ combat: c, target, source }) => {
    if (!c || !isEnemy(c, target)) return;
    if (target.hp <= 0) { onDeath(c, target); return; }
    const th = S().get(target, 'thorns');
    if (th && source !== 'poison' && source !== 'thorns' && c.dmgSource !== 'bat' && c.player.hp > 0) {   // the Bat's bite is not your hit
      const p = c.player, blocked = Math.min(p.block, th);
      p.block -= blocked;
      p.hp = Math.max(0, p.hp - (th - blocked));
      U.log(c, `Thorns! You take ${th - blocked}.`);
      Game.Events.emit('damage:dealt', { combat: c, target: p, amount: th - blocked, blocked, source: 'thorns' });
    }
  });

  Game.Events.on('enemy:turnStart', ({ combat: c, enemy: e }) => {
    if (S().get(e, 'burrowed')) {
      delete e.statuses.burrowed;
      e.statuses.exposed = 1;
      U.log(c, `${e.name} bursts out of the ground!`);
    }
    const r = S().get(e, 'regen');
    if (r && e.hp > 0 && e.hp < e.maxHp) { e.hp = Math.min(e.maxHp, e.hp + r); U.log(c, `${e.name} regrows ${r} HP.`); }
  });
  Game.Events.on('enemy:turnEnd', ({ combat: c, enemy: e }) => {
    if (S().get(e, 'fuse') > 1) e.statuses.fuse -= 1;
  });
  // Exposed lasts through your turn, then fades.
  Game.Events.on('turn:end', ({ combat: c }) => c.enemies.forEach(e => { if (e.statuses && e.statuses.exposed) delete e.statuses.exposed; }));

  return { spawn, returnLoot, applyTraits };
})();
