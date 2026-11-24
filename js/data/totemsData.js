// TOTEMS (data only; they used to be called relics)
// A totem is a permanent item the run keeps (run.totems = list of ids). Found as an
// elite / boss reward, in events and at the merchant. To add one, add an entry:
//   name, text, icon, color     what the player sees
//   price                       merchant price in gold
//   mods: { key: number }       adds to a run-wide number (Game.Mods): luck, gold, shop,
//                               flareDraw, darkVision, startBlock, restHeal, ...
//   onGain(run)                 runs once when picked up
//   on: { eventName(payload, run) }   runs on a Game.Events event (core/events.js)
// Wired up by js/totems/totems.js; nothing else needs to change.
Game.TOTEMS = {
  oil_flask: {
    name: 'Oil Flask', icon: '⚱', color: '#e0b04a', price: 95,
    text: '+3 max oil and fill 3 oil now.',
    onGain(run) { run.maxOil += 3; run.oil = Math.min(run.maxOil, run.oil + 3); },
  },
  gilded_skull: {
    name: 'Gilded Skull', icon: '☠', color: '#f0d060', price: 110,
    text: 'Win 30% more gold from fights.',
    mods: { gold: 0.3 },
  },
  lucky_pebble: {
    name: 'Lucky Pebble', icon: '●', color: '#7fe08a', price: 100,
    text: 'Luck is on your side: lucky and joker cards double 10% more often, unlucky and joker cards fizzle 10% less often.',
    mods: { luck: 0.1 },
  },
  bone_drum: {
    name: 'Bone Drum', icon: '♪', color: '#e8e0c8', price: 120,
    text: '+1 energy on the first turn of every fight.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn === 1) combat.player.energy += 1; } },
  },
  moth_pin: {
    name: 'Moth Pin', icon: '🦋', color: '#9ad0ff', price: 90,
    text: 'Heal 8 HP after you beat an elite or a boss.',
    on: { 'combat:end': ({ combat, outcome }) => {
      const node = Game.App && Game.App.state.currentNode;
      if (outcome === 'win' && node && (node.type === 'elite' || node.type === 'boss')) combat.player.hp = Math.min(combat.player.maxHp, combat.player.hp + 8);
    } },
  },
  keepers_satchel: {
    name: "Keeper's Satchel", icon: '❖', color: '#5ab8d8', price: 105,
    text: 'At the end of your turn, gain 3 block for each card you kept in your hand (Keep).',
    on: { 'turn:end': ({ combat }) => {
      const kept = combat.hand.filter(id => Game.CARDS[id].retain).length;
      if (kept) combat.player.block += 3 * kept;
    } },
  },
  smoked_lens: {
    name: 'Smoked Lens', icon: '◐', color: '#b8a0d8', price: 100,
    text: 'You can still see what enemies will do when your lantern is dark.',
    mods: { darkVision: 1 },
  },
  merchant_ring: {
    name: "Haggler's Ring", icon: '◎', color: '#e8c27a', price: 85,
    text: 'Everything at the merchant is 20% cheaper.',
    mods: { shop: 0.2 },
  },
  cinder_pouch: {
    name: 'Cinder Pouch', icon: '✺', color: '#ff9a3c', price: 130,
    text: 'Start every fight with 1 strength.',
    on: { 'combat:start': ({ combat }) => { combat.player.strength += 1; } },
  },
  tallow_candle: {
    name: 'Tallow Candle', icon: '🕯', color: '#ffd35a', price: 110,
    text: 'Your Flare draws 1 more card.',
    mods: { flareDraw: 1 },
  },
  prickly_seal: {
    name: 'Prickly Seal', icon: '✶', color: '#d97b52', price: 95,
    text: 'Start every fight with 6 block.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn === 1) combat.player.block += 6; } },
  },
  weeping_idol: {
    name: 'Weeping Idol', icon: '☂', color: '#ff8a6a', price: 125,
    text: 'Every enemy starts the fight Vulnerable (1).',
    on: { 'combat:start': ({ combat }) => { combat.enemies.forEach(e => Game.Statuses.add(combat, e, 'vulnerable', 1)); } },
  },
};
