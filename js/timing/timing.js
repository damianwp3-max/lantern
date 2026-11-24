// TIMING (rules)
// Turns a stop position on the bar into a rating, and lets card effects scale
// by it. No drawing here (see ui/timingView.js); numbers are in data/timingData.js.
//   Game.Timing.rate(dist)        rating id for a distance from the middle (0..1)
//   Game.Timing.result(ratingId)  { rating, label, mult, tier, color } (tier 0 = miss .. 4 = perfect)
//   Game.Timing.scale(ctx, n, e)  n scaled by the played card's timing (or n if untimed)
//   Game.Timing.pick(ctx, table, fallback)  value from { miss, ok, good, great, perfect }
//   Game.Timing.sweepMs()         current cursor time across the bar, with the speed setting
//   Game.Timing.enabled()         false when the player turned timing off
Game.Timing = (function () {
  const list = () => Game.TIMING.ratings;
  const byId = id => list().find(r => r.id === id) || list().find(r => r.id === Game.TIMING.offRating);

  function result(ratingId) {
    const r = byId(ratingId || Game.TIMING.offRating);
    return { rating: r.id, label: r.label, mult: r.mult, color: r.color, tier: list().length - 1 - list().indexOf(r) };
  }

  function rate(dist) {
    const r = list().find(x => dist <= x.maxDist);
    return r.id;
  }

  // effect.timed === false keeps one effect of a Timed card unscaled.
  function scale(ctx, n, effect) {
    if (!ctx || !ctx.timing || (effect && effect.timed === false)) return n;
    return Math.max(0, Math.round(n * ctx.timing.mult));
  }

  function pick(ctx, table, fallback) {
    if (!ctx || !ctx.timing || !table) return fallback;
    const v = table[ctx.timing.rating];
    return v === undefined ? fallback : v;
  }

  const enabled = () => !Game.Settings || Game.Settings.get('timingEnabled') !== false;
  const sweepMs = () => Game.TIMING.sweepMs / ((Game.Settings && Game.Settings.get('timingSpeed')) || 1);

  return { rate, result, scale, pick, enabled, sweepMs };
})();
