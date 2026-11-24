// STATUS RULES (poison, weak, vulnerable)
// Names and icons are in data/statusesData.js. Statuses live on
// unit.statuses = { poison: 3 } for the player and every enemy.
//   poison      loses that much HP at the start of its turn, then 1 less
//   weak        deals 25% less attack damage, drops by 1 at the end of its turn
//   vulnerable  takes 50% more attack damage, drops by 1 at the end of its turn
//   frail       gains 25% less block, drops by 1 at the end of its turn
//   might       (enemy buff) +1 attack damage per stack, lasts the whole fight
// Ticks are driven by events from combat.js, so new statuses can be added here
// (or in another file using Game.Statuses.onTick) without touching combat.js.
Game.Statuses = (function () {
  const { log } = Game.CombatUtil;
  const FADING = ['weak', 'vulnerable', 'frail'];

  const all = unit => (unit.statuses = unit.statuses || {});
  const get = (unit, id) => (unit && unit.statuses && unit.statuses[id]) || 0;
  const nameOf = (c, unit) => (unit === c.player ? 'You' : unit.name);

  function add(c, unit, id, amount) {
    if (!unit || amount === 0) return;
    const s = all(unit);
    s[id] = Math.max(0, (s[id] || 0) + amount);
    if (!s[id]) delete s[id];
    const def = Game.STATUSES[id] || { name: id };
    const you = unit === c.player;
    log(c, `${nameOf(c, unit)} ${amount > 0 ? (you ? 'get' : 'gets') : (you ? 'lose' : 'loses')} ${Math.abs(amount)} ${def.name}.`);
    Game.Events.emit('status:changed', { combat: c, unit, id, amount });
  }

  // Attack damage after weak (attacker) and vulnerable (defender).
  // Enemies in a crowd hit softer (attacker.dmgMult, set by combat/scaling.js).
  function modifyDamage(attacker, defender, amount) {
    let n = amount + (amount > 0 ? get(attacker, 'might') : 0);   // Might: +1 per stack on every hit
    if (attacker && attacker.dmgMult && attacker.dmgMult !== 1 && n > 0) n = Math.max(1, Math.round(n * attacker.dmgMult));
    if (get(attacker, 'weak')) n = Math.floor(n * 0.75);
    if (get(defender, 'vulnerable')) n = Math.floor(n * 1.5);
    return Math.max(0, n);
  }

  // Block gained after frail (25% less).
  function modifyBlock(unit, amount) {
    return get(unit, 'frail') ? Math.floor(amount * 0.75) : amount;
  }

  // Start of a unit's turn: poison.
  function tickStart(c, unit) {
    const p = get(unit, 'poison');
    if (!p || unit.hp <= 0) return;
    const n = Math.min(unit.hp, p);
    unit.hp -= n;
    log(c, `${nameOf(c, unit)} ${unit === c.player ? 'lose' : 'loses'} ${n} HP to poison.`);
    Game.Events.emit('damage:dealt', { combat: c, target: unit, amount: n, blocked: 0, source: 'poison' });
    all(unit).poison = p - 1;
    if (!all(unit).poison) delete all(unit).poison;
  }

  // End of a unit's turn: weak and vulnerable fade by 1.
  function tickEnd(c, unit) {
    const s = all(unit);
    FADING.forEach(id => { if (s[id]) { s[id] -= 1; if (!s[id]) delete s[id]; } });
  }

  Game.Events.on('combat:start', ({ combat }) => {
    combat.player.statuses = {};
    combat.enemies.forEach(e => { e.statuses = {}; });
  });
  Game.Events.on('turn:start', ({ combat }) => tickStart(combat, combat.player));
  Game.Events.on('turn:end', ({ combat }) => tickEnd(combat, combat.player));
  Game.Events.on('enemy:turnStart', ({ combat, enemy }) => tickStart(combat, enemy));
  Game.Events.on('enemy:turnEnd', ({ combat, enemy }) => tickEnd(combat, enemy));

  return { get, add, modifyDamage, modifyBlock, tickStart, tickEnd };
})();
