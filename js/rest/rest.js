// REST RULES (numbers come from data/restData.js)
Game.Rest = {
  healAmount(run) { return Math.ceil(run.maxHp * (Game.REST.healPercent + Game.Mods.get('restHeal', run))); },
};
