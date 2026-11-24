// EFFECT RESOLVER
// Runs a list of card effects and decides who each one hits.
// Each effect may say its own target, otherwise it uses the card's target:
//   'enemy'  the aimed enemy (or the one remembered for a delayed effect)
//   'all'    every living enemy, one handler call each
//   'random' a random living enemy (picked again for every hit)
//   'self' / none   you (the handler gets target = null)
// hits: N repeats the effect N times (e.g. 3 random hits).
// Effects whose handler is marked "container" (nextTurn, randomOf, power) run
// once and get the main target; they resolve their inner effects later.
// ctx: { defaultTarget, targetUid } passed down to inner effects.
Game.Resolver = (function () {
  const alive = c => Game.Combat.targetableEnemies(c);   // living and not underground

  function mainEnemy(c, ctx) {
    const list = alive(c);
    return list.find(e => e.uid === ctx.targetUid) || Game.Combat.currentTarget(c) || null;
  }

  function targetsFor(c, scope, ctx) {
    if (scope === 'enemy') { const t = mainEnemy(c, ctx); return t ? [t] : []; }
    if (scope === 'all') return alive(c);
    if (scope === 'random') { const list = alive(c); return list.length ? [Game.Util.pick(list)] : []; }
    return [null];
  }

  function runEffects(c, effects, ctx = {}) {
    for (const effect of effects || []) {
      const handler = Game.Effects[effect.type];
      if (!handler) { console.warn('No effect handler for', effect.type); continue; }
      const scope = effect.target || ctx.defaultTarget || 'self';
      if (handler.container) {
        const main = scope === 'enemy' ? mainEnemy(c, ctx) : null;
        handler(c, effect, main, Object.assign({}, ctx, { defaultTarget: scope, targetUid: main ? main.uid : ctx.targetUid }));
        continue;
      }
      for (let h = 0; h < (effect.hits || 1); h++) {
        for (const t of targetsFor(c, scope, ctx)) handler(c, effect, t, ctx);
      }
    }
  }

  return { runEffects, targetsFor, mainEnemy };
})();
