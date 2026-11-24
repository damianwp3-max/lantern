// LAMPLIGHTER KIT (data only): the vampire heroine's own cards, powers and Bat.
// Everything that belongs only to her lives here, so a new hero gets a file
// like this one plus an entry in data/charactersData.js.
//
//   Game.BAT                    the Bat she summons (rules: js/combat/bat.js)
//   her cards                   Game.registerCards (exclusive: listed in charactersData `cards`)
//   her powers                  added to Game.POWERS
//   her keywords                added to Game.KEYWORDS (side panel beside a hovered card)
//
// Cards 1-2 (Vampire Bite, Bat Familiar) are her signature cards: they are in her
// starting deck and are never offered as rewards. The other eight unlock 2 per explorer
// level gained while playing her (js/unlocks/heroUnlocks.js) and come in her Blood Pack.
// Her cards bleed in fights (js/ui/blood/bloodDrip.js), because her hero entry has cardFx: 'blood'.
// Mechanics: heal routing / overheal / Blood Bond in js/combat/healing.js,
// kill-heal and extra turn in js/combat/heroEffects.js.

// --- The Bat ---
Game.BAT_BITE_MS = 560;   // UI: enemies lunge at the Bat this long after it starts its bite
Game.BAT = {
  name: 'Bat',
  hp: 10,            // base HP when summoned
  attack: 3,         // damage of its automatic attack at the end of your turn
  biteHeals: true,   // each bite heals the Bat for the damage it dealt (overheal, no HP limit)
  resummonHeal: 10,  // playing the card again while the Bat is out heals it this much
  passive: { name: 'Overheal', text: 'Its HP can go above its max with no limit. Each bite heals it for the damage it deals.' },
};

// --- Her cards ---
Game.registerCards({
  vampire_bite: {
    name: 'Vampire Bite', cost: 1, type: 'attack', target: 'enemy', reward: false,
    text: 'Deal 3 damage. Heal 3 HP.',
    effects: [{ type: 'damage', amount: 3 }, { type: 'heal', amount: 3, target: 'self' }],
    art: { motif: 'fangs', color: '#e0304a' },
  },
  bat_familiar: {
    name: 'Bat Familiar', cost: 3, type: 'skill', target: 'self',
    text: 'Summon a Bat (10 HP). It copies your block and bites for 3 at turn end.',
    effects: [{ type: 'summonBat', amount: 10 }],
    art: { motif: 'bat', color: '#c0304a' },
  },
  sanguine_thirst: {
    name: 'Sanguine Thirst', cost: 1, type: 'power', target: 'self',
    text: 'Whenever you play a card, heal 1 HP.',
    effects: [{ type: 'power', power: 'sanguine_thirst' }],
    art: { motif: 'chalice', color: '#e0304a' },
  },
  crimson_rite: {
    name: 'Crimson Rite', cost: 1, type: 'attack', target: 'enemy',
    text: 'Lose 10 HP. Deal 30 damage.',
    effects: [{ type: 'loseHp', amount: 10, target: 'self' }, { type: 'damage', amount: 30 }],
    art: { motif: 'bloodBlade', color: '#ff3a50' },
  },
  last_sip: {
    name: 'Last Sip', cost: 1, type: 'attack', target: 'enemy', retain: true,
    text: 'Deal 10 damage. If it kills, heal HP equal to the damage dealt. Stay.',
    effects: [{ type: 'damageHealOnKill', amount: 10 }],
    art: { motif: 'fangs', color: '#ff5a6a' },
  },
  engorge: {
    name: 'Engorge', cost: 1, type: 'power', target: 'self',
    text: 'This fight, your healing can go above your max HP.',
    effects: [{ type: 'power', power: 'engorge' }],
    art: { motif: 'bloodDrop', color: '#ff4a5a' },
  },
  crimson_feast: {
    name: 'Crimson Feast', cost: 3, type: 'skill', target: 'self',
    text: 'Heal 15 HP.',
    effects: [{ type: 'heal', amount: 15 }],
    art: { motif: 'chalice', color: '#ff6a7a' },
  },
  blood_lash: {
    name: 'Blood Lash', cost: 1, type: 'attack', target: 'enemy',
    text: 'Lose 3 HP. Deal 15 damage.',
    effects: [{ type: 'loseHp', amount: 3, target: 'self' }, { type: 'damage', amount: 15 }],
    art: { motif: 'bloodWhip', color: '#e0304a' },
  },
  blood_bond: {
    name: 'Blood Bond', cost: 3, type: 'power', target: 'self',
    text: 'Whenever you heal, your Bat heals the same. Whenever your Bat heals, so do you.',
    effects: [{ type: 'power', power: 'blood_bond' }],
    art: { motif: 'bond', color: '#ff4a6a' },
  },
  vampiric_speed: {
    name: 'Vampiric Speed', cost: 2, type: 'skill', target: 'self', exhaust: true, oneTime: true,
    text: 'Take another turn before enemies act. Exhaust.',
    effects: [{ type: 'extraTurn', amount: 1 }],
    art: { motif: 'batWings', color: '#d8405a' },
  },
});

// --- Her powers (combat/powers.js runs the triggers; engorge and blood_bond are read by combat/healing.js) ---
Object.assign(Game.POWERS, {
  sanguine_thirst: { icon: '🩸', name: 'Sanguine Thirst', text: 'Whenever you play a card, heal 1 HP.',
    triggers: [{ on: 'cardPlayed', effects: [{ type: 'heal', amount: 1 }] }] },
  engorge: { icon: '❦', name: 'Engorge', text: 'Your healing can go above your max HP this fight. Extra HP fades when the fight ends.',
    triggers: [] },
  blood_bond: { icon: '⚭', name: 'Blood Bond', text: 'Whenever you heal, your Bat heals the same. Whenever your Bat heals, so do you.',
    triggers: [] },
});

// --- Her keywords (shown beside a hovered card). The Bat's passive (Game.BAT.passive) is added there by ui/heroTips.js ---
Object.assign(Game.KEYWORDS, {
  bat: { icon: '🦇', name: 'Bat', match: ['Bat'], exact: true, color: '#e05a70',
    text: 'Your Bat flies beside you with 10 HP. Enemies always attack it first. It attacks your target for 3 when you end your turn and heals itself for the damage it deals (no HP limit), and gains all block you gain. Playing Bat Familiar again while it is out heals it 10 HP.' },
});
