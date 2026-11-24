// PIERCING RULES (runtime)
//   Game.Piercing.roll(card)        'normal' | 'double' | 'fizzle'   rolled when a card is played
//   Game.Piercing.chances(card)     { fail, double } after totem and lantern bonuses
//   Game.Piercing.pickOffers(n, forCardId?, exclude?)   n different piercing ids (weighted), for the merchant, events and rewards
//   Game.Piercing.randomFor(id, exclude?)     a random allowed piercing id for that card, or null
// Only ids in Game.PIERCE_CHOICES (data/piercingsData.js) are ever offered or rolled.
// Luck bonus (Game.Mods 'luck', e.g. +0.1): raises the "double" chance and lowers the "fail" chance.
Game.Piercing = (function () {
  function chances(card) {
    const l = card.luck || {};
    const bonus = Game.Mods ? Game.Mods.get('luck') : 0;
    const fail = l.fail ? Math.max(0.05, l.fail - bonus) : 0;
    const dbl = l.double ? Math.min(0.9, l.double + bonus) : 0;
    return { fail, double: dbl };
  }

  function roll(card) {
    if (!card.luck) return 'normal';
    const ch = chances(card);
    const r = Math.random();
    if (r < ch.fail) return 'fizzle';
    if (r < ch.fail + ch.double) return 'double';
    return 'normal';
  }

  function weightedPick(ids) {
    const total = ids.reduce((s, id) => s + (Game.PIERCINGS[id].weight || 1), 0);
    let r = Math.random() * total;
    for (const id of ids) { r -= (Game.PIERCINGS[id].weight || 1); if (r <= 0) return id; }
    return ids[ids.length - 1];
  }

  function pickOffers(n, forCardId, exclude) {
    let pool = (Game.PIERCE_CHOICES || Object.keys(Game.PIERCINGS)).filter(id => Game.PIERCINGS[id]).filter(id => (!forCardId || Game.Cards.canPierce(forCardId, id)) && !(exclude || []).includes(id));
    const out = [];
    while (out.length < n && pool.length) {
      const id = weightedPick(pool);
      out.push(id);
      pool = pool.filter(x => x !== id);
    }
    return out;
  }

  function randomFor(cardId, exclude) { return pickOffers(1, cardId, exclude)[0] || null; }

  return { roll, chances, pickOffers, randomFor };
})();
