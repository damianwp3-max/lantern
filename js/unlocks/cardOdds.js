// CARD ODDS (rules; numbers in data/rewardOddsData.js)
//   Game.Unlocks.sample(n, pool?)   n distinct cards, hero-exclusive ones weighted higher (rewards, shop)
//   Game.Unlocks.pickOne(pool?)     one card with the same weighting (random cards from packs)
// pool defaults to Game.Unlocks.pool() (what the current hero may find). Exclusive = owned by the run's hero.
Game.CardOdds = (function () {
  const run = () => Game.State && Game.State.run;
  function weight(id) {
    const r = run(), C = Game.Characters;
    const w = (Game.CARD_ODDS && Game.CARD_ODDS.exclusiveWeight) || 1;
    return r && C && C.ownerOf(id) === r.character ? w : 1;
  }
  function sample(n, pool) {
    const left = (pool || Game.Unlocks.pool()).slice(), out = [];
    while (out.length < n && left.length) {
      const total = left.reduce((s, id) => s + weight(id), 0);
      let r = Math.random() * total, i = 0;
      for (; i < left.length - 1; i++) { r -= weight(left[i]); if (r <= 0) break; }
      out.push(left.splice(i, 1)[0]);
    }
    return out;
  }
  const pickOne = pool => sample(1, pool)[0];
  Game.Unlocks.sample = sample;
  Game.Unlocks.pickOne = pickOne;
  return { weight, sample, pickOne };
})();
