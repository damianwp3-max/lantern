// RUN STATE
// "run" holds everything that lasts between fights: hp, deck, relics, which
// level and map row the player is on. It is plain JSON so it saves as-is.
// Combat-only data (hand, piles, energy) lives in the combat object instead.
Game.State = {
  run: null,

  // characterId: the hero picked on the select screen (data/charactersData.js).
  newRun(characterId) {
    this.run = {
      hp: 50,
      maxHp: 50,
      maxEnergy: 3,
      handSize: 5,
      deck: Game.STARTER_DECK.slice(),
      totems: [],        // totem ids, see data/totemsData.js (they used to be called relics)
      passives: [],      // passive ids learned at rest sites, see data/passivesData.js
      gold: Game.SHOP.startGold,   // spent at the merchant and on events
      oil: Game.OIL.start,         // lantern oil, see data/oilData.js
      maxOil: Game.OIL.start,
      fightMods: [],     // effects for the next few fights (cave events), see caveEvents/fightMods.js
      seenEvents: [],    // cave events already met this run
      removals: 0,       // cards removed at the merchant (each one costs more)
      shop: null,        // the merchant's stock while you are at one (shop/shop.js)
      levelIndex: 0,
      map: Game.Map.generate(0),
      row: -1,           // last row cleared on the current map (-1 = none yet)
      visited: [],       // node ids visited on the current map
    };
    if (Game.Characters) Game.Characters.apply(this.run, characterId);   // hero: hp, energy, deck, passives
    Game.Events.emit('run:init', { run: this.run });   // lantern upgrades adjust the new run
    this.save();
    Game.Events.emit('run:start', { run: this.run });
    Game.Events.emit('level:start', { levelIndex: 0 });
    return this.run;
  },

  nextLevel() {
    const r = this.run;
    r.levelIndex += 1;
    // A short breather on the stairs (amount in data/restData.js).
    r.hp = Math.min(r.maxHp, r.hp + Math.ceil(r.maxHp * ((Game.REST && Game.REST.descendHealPercent) || 0)));
    r.map = Game.Map.generate(r.levelIndex);
    r.row = -1;
    r.visited = [];
    this.save();
    Game.Events.emit('level:start', { levelIndex: r.levelIndex });
  },

  isFinalLevel() { return this.run.levelIndex >= Game.LEVELS.length - 1; },

  save()    { Game.Save.write(this.run); },
  hasSave() { return Game.Save.exists(); },
  load()    { this.run = this.migrate(Game.Save.read()); return this.run; },
  clear()   { Game.Save.remove(); this.run = null; },

  // The run is over (won or lost): pay out embers (Game.Events 'run:end'), then erase the save.
  endRun(won) {
    Game.Events.emit('run:end', { run: this.run, won: !!won });
    this.clear();
  },

  // Old saves get the newer fields (totems, oil, gold, ...).
  migrate(run) {
    if (!run) return run;
    if (run.relics && !run.totems) run.totems = [];
    delete run.relics;
    const fresh = { totems: [], oil: Game.OIL.start, maxOil: Game.OIL.start, fightMods: [], seenEvents: [], removals: 0, shop: null, lantern: {}, character: Game.CHARACTER_DEFAULT };
    Object.keys(fresh).forEach(k => { if (run[k] === undefined) run[k] = fresh[k]; });
    if (!run.gold) run.gold = 0;
    return run;
  },
};
