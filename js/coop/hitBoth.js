// CO-OP: ENEMY ATTACKS HIT BOTH HEROES
// In 2-player co-op every enemy attack (and the status that comes with it) lands on BOTH living
// heroes, each with their own block, Bat and powers. The attack is simply played a second time
// with the other hero active (Game.Coop.activate swaps hand / hp / block / pets), then we swap back.
// Enemy-side effects (self block, stolen cards, exploding, buffs) happen only once.
(function () {
  const C = Game.Coop, M = Game.EnemyMoves;

  // Types whose damage / status goes on the hero: replayed fully (minus the enemy's own block).
  const FULL = ['attack', 'debuff'];
  // Special moves that also deal damage: only the damage part is repeated on the second hero.
  const DAMAGE_ONLY = ['steal', 'stealGold', 'drainOil', 'explode'];

  function otherHero(c) {
    const o = 1 - c.active;
    return C.alive(c, o) ? o : null;
  }

  function onSecondHero(c, fn) {
    const o = otherHero(c);
    if (o === null || c.hittingSecond) return;
    const home = c.active;
    c.hittingSecond = true;
    try { C.activate(c, o); fn(); } finally { c.hittingSecond = false; C.activate(c, home); }
  }

  function wrap(type, replay) {
    const base = M[type];
    if (!base) return;
    M[type] = function (c, enemy, move) {
      const hpBefore = enemy.hp;
      const res = base.apply(this, arguments);
      if (c.seats && !c.hittingSecond) onSecondHero(c, () => replay(c, enemy, move));
      return res;
    };
  }

  FULL.forEach(t => wrap(t, (c, e, m) => M[t](c, e, Object.assign({}, m, { selfBlock: 0 }))));
  DAMAGE_ONLY.forEach(t => wrap(t, (c, e, m) => { if (m.value) M.attack(c, e, { type: 'attack', value: m.value, hits: m.hits }); }));
})();
