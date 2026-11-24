// PASSIVE DATA
// Passives are bonuses the player learns at a rest site. They last for the
// rest of the run. To add one, add an entry below:
//   icon, name, text       what the player sees (icon = fallback symbol)
//   art: { icon, color }   its picture, drawn by ui/passiveArt.js
//   onGain(run)            optional, runs once when it is picked (e.g. +max hp)
//   on: { eventName(payload, run) }   optional, runs on a Game.Events event
//                          (see core/events.js for the event list)
// Nothing else needs to change: passives/passives.js wires the handlers.
Game.PASSIVES = {
  thick_coat: {
    art: { icon: 'coat', color: '#e06a7a' },
    icon: '♥', name: 'Thick Coat', text: '+12 max HP (and heal 12).',
    onGain(run) { run.maxHp += 12; run.hp += 12; },
  },
  ember_charm: {
    art: { icon: 'charm', color: '#7aa8ff' },
    icon: '🛡', name: 'Ember Charm', text: 'Start each fight with 8 block.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn === 1) combat.player.block += 8; } },
  },
  quick_wick: {
    art: { icon: 'wick', color: '#ffd35a' },
    icon: '⚡', name: 'Quick Wick', text: '+1 energy on the first two turns of each fight.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn <= 2) combat.player.energy += 1; } },
  },
  sharp_hook: {
    art: { icon: 'hook', color: '#ff7a5a' },
    icon: '⚔', name: 'Sharp Hook', text: 'Your attacks deal +2 damage.',
    on: { 'combat:start': ({ combat }) => { combat.player.strength += 2; } },
  },
  deep_pockets: {
    art: { icon: 'pouch', color: '#c8a06a' },
    icon: '✋', name: 'Deep Pockets', text: 'Draw 3 extra cards on the first turn of each fight.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn === 1) Game.Combat.draw(combat, 3); } },
  },
  warm_glow: {
    art: { icon: 'glow', color: '#8fe07a' },
    icon: '✚', name: 'Warm Glow', text: 'Heal 3 HP after each fight you win.',
    on: { 'combat:end': ({ combat, outcome }) => {
      if (outcome === 'win') combat.player.hp = Math.min(combat.player.maxHp, combat.player.hp + 3);
    } },
  },
};
