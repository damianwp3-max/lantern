// PETS (data only): small creatures you can befriend in cave events.
// A pet works like the Lamplighter's Bat: its card summons it onto the
// battlefield for the fight, enemies attack it before you, and playing its
// card again while it is out heals it. Each pet has ONE small trick.
// Pets are meant to be fun, not strong: low HP, small numbers.
//
//   Game.PETS[id] = {
//     name, hp, resummonHeal,      its HP when summoned, heal when its card is played again
//     ability,                     which rule runs it (js/pets/petAbilities.js)
//     ...numbers                   the ability's numbers (kept here so tuning is data only)
//     passive: { name, text }      its trick, shown on its tooltip and on its card's side panel
//     color, accent                its colours (plate, glow, card art)
//     card: { id, name, cost, text }   the card that summons it (built into Game.CARDS below)
//   }
// Rules: js/pets/pets.js (summon, guard, spill-over) and js/pets/petAbilities.js.
// Drawings: js/ui/pets/petArt.js. Events that give pets: data/petEventsData.js.
// Spill-over: damage beyond a pet's HP is not lost, it carries on to the next
// one in line (another pet, then you). So a pet never fully cancels a big hit.
Game.PET_RULES = {
  maxOut: 3,                // pets on the battlefield at once (the Bat does not count)
  petEventsPerLevel: 1,     // at most this many pet events on one level's map
};

Game.PETS = {
  magpie: {
    name: 'Magpie', hp: 6, resummonHeal: 6, ability: 'shiny', draw: 1,
    passive: { name: 'Shiny!', text: 'At the start of your turn it eyes one card in your hand. Play that card this turn to draw 1 card.' },
    color: '#7fb6ff', accent: '#e8f2ff',
    card: { id: 'pet_magpie', name: 'Magpie Call', cost: 1,
      text: 'Summon a Magpie (6 HP). It marks a card each turn: play it to draw 1.' },
  },
  salamander: {
    name: 'Ember Salamander', hp: 7, resummonHeal: 7, ability: 'heat', heatMax: 4, burst: 5,
    passive: { name: 'Stoke', text: 'Every Attack you play gives it 1 heat. At 4 heat it breathes fire: 5 damage to ALL enemies.' },
    color: '#ff8a3c', accent: '#ffd36a',
    card: { id: 'pet_salamander', name: 'Ember Salamander', cost: 1,
      text: 'Summon a Salamander (7 HP). Every 4th Attack: 5 damage to ALL.' },
  },
  snail: {
    name: 'Cave Snail', hp: 5, resummonHeal: 5, ability: 'shell', shellGain: 3, shellMax: 12,
    passive: { name: 'Slow Shell', text: 'Its block never fades. At the end of your turn it gains 3 block (up to 12).' },
    color: '#9ad08a', accent: '#e6d3a0',
    card: { id: 'pet_snail', name: 'Cave Snail', cost: 1,
      text: 'Summon a Snail (5 HP). Gains 3 block each turn. Its block stays.' },
  },
  coffer: {
    name: 'Coffer Pup', hp: 10, resummonHeal: 6, ability: 'hoard', goldPerHit: 3, goldIfAlive: 6,
    passive: { name: 'Hoarder', text: 'Each time an enemy hits it, you gain 3 gold. If it is still standing when you win, gain 6 more.' },
    color: '#e0b050', accent: '#fff0b8',
    card: { id: 'pet_coffer', name: 'Coffer Pup', cost: 1,
      text: 'Summon a Coffer Pup (10 HP). Gain 3 gold when it is hit.' },
  },
  rat: {
    name: 'Pack Rat', hp: 6, resummonHeal: 6, ability: 'stash',
    passive: { name: 'Stash', text: 'When you end your turn, it hides one random card you did not play. It brings it back next turn, on top of your normal draw.' },
    color: '#b89a86', accent: '#ffd0c0',
    card: { id: 'pet_rat', name: 'Pack Rat', cost: 1,
      text: 'Summon a Pack Rat (6 HP). It saves one unplayed card each turn.' },
  },
  owl: {
    name: 'Night Owl', hp: 7, resummonHeal: 7, ability: 'hunt', peck: 4,
    passive: { name: 'Night Eyes', text: 'You always see enemy intents, even when your lantern is dark. When you end your turn it pecks the enemy planning the biggest attack for 4.' },
    color: '#c8a0ff', accent: '#ffe08a',
    card: { id: 'pet_owl', name: 'Night Owl', cost: 1,
      text: 'Summon an Owl (7 HP). Turn end: pecks the biggest attacker for 4.' },
  },
  glowworm: {
    name: 'Glowworm', hp: 4, resummonHeal: 4, ability: 'glow', slow: 1.35, spark: 4,
    passive: { name: 'Steady Glow', text: 'The timing bar moves slower while it is out. A Great or Perfect timing makes it spark: 4 damage to ALL enemies.' },
    color: '#b8ff7a', accent: '#f4ffd0',
    card: { id: 'pet_glowworm', name: 'Glowworm', cost: 0,
      text: 'Summon a Glowworm (4 HP). Slower timing bar. Great timing: 4 to ALL.' },
  },
};

// The pet cards: skill cards like Bat Familiar, only found in events (never as rewards).
Game.registerCards(Object.fromEntries(Object.entries(Game.PETS).map(([petId, p]) => [p.card.id, {
  name: p.card.name, cost: p.card.cost, type: 'skill', target: 'self', reward: false, petCard: petId,
  text: p.card.text,
  effects: [{ type: 'summonPet', pet: petId }],
  art: { motif: 'pet_' + petId, color: p.color },
}])));

// The Companion keyword (side panel beside a hovered pet card, and the tooltip).
Object.assign(Game.KEYWORDS, {
  companion: { icon: '❦', name: 'Companion', match: [], color: '#ffd48a',
    text: 'A pet fights beside you for this fight. Enemies attack it before you; damage beyond its HP carries on to you. Play its card again to heal it.' },
});
