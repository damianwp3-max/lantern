// LANTERN OIL (data only)
// Your lantern burns oil. Entering a map node costs oil (nodeCost); at 0 oil the
// lantern is dark and enemy intents are hidden ("?") until you refill it.
// You can also burn oil in a fight for a Flare: extra energy and a card.
// Refills: rest sites, merchant, events, totems. Numbers are tuned here only.
Game.OIL = {
  start: 12,            // starting and maximum oil
  nodeCost: { fight: 1, elite: 1, boss: 1, event: 1, shop: 0, rest: 0 },
  restFireOil: 1,       // free oil from sitting at a rest-site fire
  restRefill: 5,
  descendRefill: 4,     // oil found on the stairs when you go down to the next level (12-floor levels are long)        // oil restored by the "Refill lantern" rest option
  flareCost: 1,         // oil per Flare in a fight (once per turn)
  flareEnergy: 1,
  flareDraw: 1,
  shopRefill: { amount: 4, price: 25 },
};
