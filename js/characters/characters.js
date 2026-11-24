// HEROES (rules)
// Reads data/charactersData.js. Sets up a new run for the picked hero and
// decides which reward cards a hero can find.
//   Game.Characters.list()              every hero id
//   Game.Characters.get(id)             hero data (falls back to the default hero)
//   Game.Characters.of(run)             the run's hero
//   Game.Characters.apply(run, id)      start values for a new run (hp, energy, deck, passives)
//   Game.Characters.canFind(cardId, id) false for a card that belongs only to another hero
//   Game.Characters.signaturesOf(id)    the hero's signature cards (in the starting deck)
//   Game.Characters.allExclusiveOf(id)  signature cards + the other exclusive cards
Game.Characters = (function () {
  const list = () => Object.keys(Game.CHARACTERS);
  const get = id => Game.CHARACTERS[id] || Game.CHARACTERS[Game.CHARACTER_DEFAULT];
  const of = run => get(run && run.character);

  // Signature cards: `signatures` (a list); an older single `signature` still works.
  Object.values(Game.CHARACTERS).forEach(h => {
    h.signatures = [].concat(h.signatures || [], h.signature || []).filter((c, i, a) => c && a.indexOf(c) === i);
  });
  // Standard starting deck: the basic deck every hero shares plus the hero's signature cards.
  Object.values(Game.CHARACTERS).forEach(h => {
    if (!h.deck) h.deck = Game.STARTER_DECK.concat(h.signatures);
  });

  const owner = {};   // exclusive card id (signatures included) -> hero id
  Object.entries(Game.CHARACTERS).forEach(([hid, h]) => h.signatures.concat(h.cards || []).filter(Boolean).forEach(cid => { owner[cid] = hid; }));

  function canFind(cardId, heroId) {
    const o = owner[Game.Cards ? Game.Cards.baseOf(cardId) : cardId];
    return !o || o === (Game.CHARACTERS[heroId] ? heroId : Game.CHARACTER_DEFAULT);
  }

  function apply(run, id) {
    const hid = Game.CHARACTERS[id] ? id : Game.CHARACTER_DEFAULT;
    const h = get(hid);
    run.character = hid;
    run.hp = run.maxHp = h.hp;
    run.maxEnergy = h.energy;
    run.deck = h.deck.slice();
    (h.passives || []).forEach(pid => Game.Passives.gain(run, pid));
    return run;
  }

  const exclusiveOf = id => (get(id).cards || []).slice();
  const signaturesOf = id => get(id).signatures.slice();
  const signatureOf = id => get(id).signatures[0] || null;
  // Every exclusive card of a hero, signature cards first.
  const allExclusiveOf = id => signaturesOf(id).concat(exclusiveOf(id));
  const isSignature = cid => Object.values(Game.CHARACTERS).some(h => h.signatures.includes(Game.Cards ? Game.Cards.baseOf(cid) : cid));

  return { list, get, of, apply, canFind, exclusiveOf, allExclusiveOf, signatureOf, signaturesOf, isSignature, ownerOf: cid => owner[cid] || null };
})();
