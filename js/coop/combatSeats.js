// CO-OP COMBAT (two heroes in one fight)
// Turn order: seat 0 (and their pets / Bat), then seat 1, then every enemy, then a new round.
// Each enemy "aims" at one living hero for the round (shown over its head, ui/coop/aimTags.js).
// A hero at 0 HP is down but the fight goes on; you lose only when BOTH are down.
// The turn animation sequence itself is still app/actions/endTurnActions.js, which calls the hooks below.
(function () {
  const C = Game.Coop;
  const Combat = Game.Combat;

  // --- aiming ---
  function livingSeats(c) { return [0, 1].filter(i => C.alive(c, i)); }

  function assignAims(c) {
    const seats = livingSeats(c);
    if (!seats.length) return;
    c.enemies.forEach(e => { e.aim = seats.length === 1 ? seats[0] : seats[Math.floor(Math.random() * seats.length)]; });
  }

  // The enemy is about to act: put its victim in the hot seat.
  function aimAt(c, enemy) {
    if (!c.seats) return;
    let i = enemy.aim;
    if (i == null || !C.alive(c, i)) i = C.alive(c, 0) ? 0 : 1;
    c.coopPhase = 'enemies';
    C.activate(c, i);
  }

  // --- turns ---
  // Start of a seat's turn. The round counter only goes up for the first hero of the round.
  function beginTurn(c) {
    if (c.seats && c.active !== c.roundFirst) c.turn -= 1;
    return Combat.startPlayerTurn(c);
  }

  // Your turn is over: hand the fight to the next living hero. False when you were the last one.
  function nextSeat(c) {
    if (!c.seats) return false;
    const next = livingSeats(c).find(i => i > c.active);
    if (next === undefined) return false;
    c.coopPhase = 'players';
    C.activate(c, next);
    return true;
  }

  // The enemies are done: a new round starts with the first living hero.
  function beforeRound(c) {
    if (!c.seats) return;
    c.coopPhase = 'players';
    c.roundFirst = livingSeats(c)[0] || 0;
    C.activate(c, c.roundFirst);
    assignAims(c);
  }

  // --- the fight object ---
  const baseCreate = Combat.create;
  Combat.create = function (run, enemyIds) {
    if (!C.isActive() || !C.isHost()) return baseCreate.apply(this, arguments);
    const S = C.S;
    // Seat 1: only their fight set-up (deck, passives, totems...), their first turn begins later.
    C.setCtx(1);
    const realStart = Combat.startPlayerTurn;
    Combat.startPlayerTurn = function () {};
    let c1;
    try { c1 = baseCreate.call(Combat, S.runs[1], enemyIds); } finally { Combat.startPlayerTurn = realStart; }
    // Seat 0 is the "live" one: its first turn starts right away.
    C.setCtx(0);
    const c = baseCreate.call(Combat, S.runs[0], enemyIds);
    c.coop = true;
    c.fightId = Math.random().toString(36).slice(2);
    c.seats = [null, C.pick(c1)];
    c.active = 0;
    c.roundFirst = 0;
    c.coopPhase = 'players';
    c.info = [0, 1].map(i => ({ character: S.runs[i].character, name: C.name(i), dead: false }));
    scaleEnemies(c);
    assignAims(c);
    return c;
  };

  // Enemy numbers for two players (data/coopData.js, see the balance note in README-COOP.md).
  function scaleEnemies(c) {
    const K = Game.COOP.scaling, node = Game.App && Game.App.state.currentNode;
    const boss = node && node.type === 'boss';
    const hp = boss ? K.bossHpMult : K.hpMult;
    c.enemies.forEach(e => {
      e.hp = e.maxHp = Math.max(1, Math.round(e.hp * hp));
      e.dmgMult = (e.dmgMult || 1) * K.dmgMult;
    });
  }

  // --- who is still standing ---
  const baseCheck = Combat.checkOutcome;
  Combat.checkOutcome = function (c) {
    if (!c.seats) return baseCheck.call(this, c);
    if (c.outcome) return c.outcome;
    if (c.player.hp <= 0) c.info[c.active].dead = true;
    if (c.info.every(x => x.dead)) c.outcome = 'lose';
    else if (!this.livingEnemies(c).length) c.outcome = 'win';
    if (c.outcome) endFight(c);
    return c.outcome;
  };

  // 'combat:end' once for EACH hero, so gold, XP, embers and healing land on both runs.
  function endFight(c) {
    const home = c.active;
    [home, 1 - home].forEach(i => {
      C.activate(c, i);
      Game.Events.emit('combat:end', { combat: c, outcome: c.outcome });
    });
    C.activate(c, home);
  }

  // Fx (what to animate) says whose hero was hit.
  const baseDiff = Game.Fx.diff;
  Game.Fx.diff = function (before, c) {
    const fx = baseDiff.apply(this, arguments);
    if (c.seats) fx.seat = c.active;
    return fx;
  };

  C.combat = { beginTurn, nextSeat, beforeRound, aimAt, assignAims, livingSeats };
})();
