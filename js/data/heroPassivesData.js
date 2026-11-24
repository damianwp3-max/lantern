// HERO PASSIVES (data only)
// Passives a hero starts the run with (data/charactersData.js `passives`).
// Same shape as data/passivesData.js; characterOnly keeps them out of rest sites.
Object.assign(Game.PASSIVES, {
  warm_lantern: {
    art: { icon: 'glow', color: '#ffd35a' }, characterOnly: true,
    icon: '✦', name: 'Warm Lantern', text: 'Start each fight with 3 block.',
    on: { 'turn:start': ({ combat }) => { if (combat.turn === 1) combat.player.block += 3; } },
  },
  // The Lamplighter's passive. Fractions are saved up, so 5% of small hits still adds up.
  // Rules: js/combat/healing.js (Game.Healing.lifesteal).
  vampiric_lifesteal: {
    art: { icon: 'drop', color: '#e0304a' }, characterOnly: true, lifesteal: 0.05,
    icon: '🩸', name: 'Vampiric Thirst', text: 'Heal 5% of all damage you deal.',
    on: { 'damage:dealt': (p) => { if (Game.Healing) Game.Healing.onDamage(p, 0.05); } },
  },
});
