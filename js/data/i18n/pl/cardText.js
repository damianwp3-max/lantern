// POLISH: card text. Card descriptions are short sentences; each sentence
// shape is translated once here ({n}, {n2}, ... are numbers), so a new card
// with a familiar sentence needs no new line. Power texts (data/powersData.js) too.
// Style: "pkt obrażeń" / "pkt Bloku" never change with the number.
(function () {
  const P = Game.I18N.plural;
  const cards = n => `${n} ${P(n, 'kartę', 'karty', 'kart')}`;
  const randomCards = n => `${n} ${P(n, 'losową kartę', 'losowe karty', 'losowych kart')}`;
  const times = n => `${n} ${P(n, 'raz', 'razy', 'razy')}`;
  Game.I18N.add('pl', {
    // damage
    'Deal {n} damage.': 'Zadaj {n} pkt obrażeń.',
    'Deal {n} damage twice.': 'Zadaj {n} pkt obrażeń dwa razy.',
    'Deal {n} damage to ALL enemies.': 'Zadaj {n} pkt obrażeń WSZYSTKIM wrogom.',
    'Deal {n} damage to ALL enemies twice.': 'Zadaj {n} pkt obrażeń WSZYSTKIM wrogom dwa razy.',
    'Deal {n} damage to a random enemy.': 'Zadaj {n} pkt obrażeń losowemu wrogowi.',
    'Deal {n} damage to a random enemy {n2} times.': v => `Zadaj ${v.n} pkt obrażeń losowemu wrogowi ${times(v.n2)}.`,
    'Deal {n} to {n2} damage (random).': 'Zadaj od {n} do {n2} pkt obrażeń (losowo).',
    'Deal {n}-{n2} damage.': 'Zadaj {n}-{n2} pkt obrażeń.',
    'Deal {n}-{n2} damage and gain {n3}-{n4} block.': 'Zadaj {n}-{n2} pkt obrażeń i zyskaj {n3}-{n4} pkt Bloku.',
    'Deal damage equal to your block.': 'Zadaj tyle obrażeń, ile masz Bloku.',
    'Then deal {n} damage to ALL enemies.': 'Potem zadaj {n} pkt obrażeń WSZYSTKIM wrogom.',
    'Then deal {n} damage to a random enemy.': 'Potem zadaj {n} pkt obrażeń losowemu wrogowi.',
    'Random: {n} damage to a random enemy, OR {n2} to ALL enemies, OR {n3} block.': 'Losowo: {n} pkt obrażeń losowemu wrogowi, ALBO {n2} WSZYSTKIM wrogom, ALBO {n3} pkt Bloku.',
    // block, energy, strength, hp
    'Gain {n} block.': 'Zyskaj {n} pkt Bloku.',
    'Gain {n}-{n2} block.': 'Zyskaj {n}-{n2} pkt Bloku.',
    'Gain {n} to {n2} block (random).': 'Zyskaj od {n} do {n2} pkt Bloku (losowo).',
    'Double your block.': 'Podwój swój Blok.',
    'Gain {n} energy.': 'Zyskaj {n} Energii.',
    'Gain {n} to {n2} energy (random).': 'Zyskaj od {n} do {n2} Energii (losowo).',
    'Gain {n} strength.': 'Zyskaj {n} Siły.',
    'Gain {n} strength for this fight.': 'Zyskaj {n} Siły na tę walkę.',
    'Gain {n} strength now and at the start of each turn.': 'Zyskaj {n} Siły teraz i na początku każdej tury.',
    'Heal {n} HP.': 'Ulecz {n} HP.',
    'Lose {n} HP.': 'Strać {n} HP.',
    // cards
    'Draw {n} card.': v => `Dobierz ${cards(v.n)}.`,
    'Draw {n} cards.': v => `Dobierz ${cards(v.n)}.`,
    'Draw {n}-{n2} cards.': 'Dobierz {n}-{n2} kart.',
    'Add a random card to your hand for this fight.': 'Dodaj losową kartę do ręki na tę walkę.',
    'Add a random Attack to your hand.': 'Dodaj losowy Atak do ręki.',
    'Add a random Attack to your hand for this fight.': 'Dodaj losowy Atak do ręki na tę walkę.',
    'Add a random Power to your hand.': 'Dodaj losową Moc do ręki.',
    'Add a random Power to your hand for this fight.': 'Dodaj losową Moc do ręki na tę walkę.',
    'Add a random Skill to your hand for this fight.': 'Dodaj losową Umiejętność do ręki na tę walkę.',
    'Add a random Attack and a random Defense card to your hand for this fight.': 'Dodaj losowy Atak i losową kartę Obrony do ręki na tę walkę.',
    'Add {n} random cards to your hand.': v => `Dodaj ${randomCards(v.n)} do ręki.`,
    'Add {n} random cards to your hand for this fight.': v => `Dodaj ${randomCards(v.n)} do ręki na tę walkę.`,
    'Add {n} random Defense cards to your hand for this fight.': v => `Dodaj ${v.n} ${P(v.n, 'losową kartę', 'losowe karty', 'losowych kart')} Obrony do ręki na tę walkę.`,
    'Shuffle {n} random cards into your draw pile for this fight.': v => `Wtasuj ${randomCards(v.n)} do stosu dobierania na tę walkę.`,
    'Exhaust.': 'Wyczerpanie.',
    'Unplayable.': 'Niegrywalna.',
    'Clogs your hand.': 'Zapycha ci rękę.',
    // statuses
    'Apply {n} Poison.': 'Nałóż {n} Trucizny.',
    'Apply {n} Poison to ALL enemies.': 'Nałóż {n} Trucizny na WSZYSTKICH wrogów.',
    'Apply {n} Weak.': 'Nałóż {n} Osłabienia.',
    'Apply {n} Weak to ALL.': 'Nałóż {n} Osłabienia na WSZYSTKICH.',
    'Apply {n} Weak to ALL enemies.': 'Nałóż {n} Osłabienia na WSZYSTKICH wrogów.',
    'Apply {n} Vulnerable.': 'Nałóż {n} Podatności.',
    'Apply {n} Vulnerable to ALL enemies.': 'Nałóż {n} Podatności na WSZYSTKICH wrogów.',
    'Apply {n} Vulnerable and {n2} Weak.': 'Nałóż {n} Podatności i {n2} Osłabienia.',
    'Apply {n} Weak and {n2} Vulnerable to ALL enemies.': 'Nałóż {n} Osłabienia i {n2} Podatności na WSZYSTKICH wrogów.',
    'Double the Poison on an enemy.': 'Podwój Truciznę na wrogu.',
    'One at random to ALL enemies: {n} Poison, OR {n2} Weak, OR {n3} Vulnerable.': 'Jedno losowo na WSZYSTKICH wrogów: {n} Trucizny, ALBO {n2} Osłabienia, ALBO {n3} Podatności.',
    // next turn
    'Next turn, deal {n} damage to this enemy.': 'W następnej turze zadaj temu wrogowi {n} pkt obrażeń.',
    'Next turn, deal {n} damage to it again.': 'W następnej turze zadaj mu znów {n} pkt obrażeń.',
    'Next turn, deal {n} damage to ALL enemies.': 'W następnej turze zadaj {n} pkt obrażeń WSZYSTKIM wrogom.',
    'Next turn, gain {n} block.': 'W następnej turze zyskaj {n} pkt Bloku.',
    'Next turn, gain {n} energy.': 'W następnej turze zyskaj {n} Energii.',
    'Next turn, gain {n} energy and draw {n2} card.': v => `W następnej turze zyskaj ${v.n} Energii i dobierz ${cards(v.n2)}.`,
    'Next turn, gain {n} strength.': 'W następnej turze zyskaj {n} Siły.',
    'Next turn, draw {n} extra cards.': v => `W następnej turze dobierz ${v.n} ${P(v.n, 'dodatkową kartę', 'dodatkowe karty', 'dodatkowych kart')}.`,
    'Next turn, lose {n} energy.': 'W następnej turze strać {n} Energii.',
    'Next turn, apply {n} more.': 'W następnej turze nałóż kolejne {n}.',
    // coin
    'Heads: gain {n} energy.': 'Orzeł: zyskaj {n} Energii.',
    'Tails: draw {n} cards.': v => `Reszka: dobierz ${cards(v.n)}.`,
    // powers (card text and data/powersData.js text)
    'At the start of each turn, gain {n} block.': 'Na początku każdej tury zyskaj {n} pkt Bloku.',
    'At the start of each turn, apply {n} Poison to ALL enemies.': 'Na początku każdej tury nałóż {n} Trucizny na WSZYSTKICH wrogów.',
    'At the start of each turn, add a random card to your hand.': 'Na początku każdej tury dodaj losową kartę do ręki.',
    'At the start of each turn, lose {n} HP, gain {n2} energy and draw {n3} card.': v => `Na początku każdej tury strać ${v.n} HP, zyskaj ${v.n2} Energii i dobierz ${cards(v.n3)}.`,
    'At the end of each turn, deal {n} damage to ALL enemies.': 'Na końcu każdej tury zadaj {n} pkt obrażeń WSZYSTKIM wrogom.',
    'At the end of each turn, gain {n} block for each unspent energy.': 'Na końcu każdej tury zyskaj {n} pkt Bloku za każdą niewydaną Energię.',
    'Every {n}rd card you play each turn deals {n2} damage to ALL enemies.': 'Co {n}. zagrana karta w turze zadaje {n2} pkt obrażeń WSZYSTKIM wrogom.',
    'Every {n}rd card you play in a turn deals {n2} damage to ALL enemies.': 'Co {n}. zagrana karta w turze zadaje {n2} pkt obrażeń WSZYSTKIM wrogom.',
    'Whenever an enemy dies, gain {n} energy and draw {n2} cards.': v => `Gdy wróg ginie, zyskaj ${v.n} Energii i dobierz ${cards(v.n2)}.`,
    'Whenever you lose HP, deal {n} damage to a random enemy.': 'Gdy tracisz HP, zadaj {n} pkt obrażeń losowemu wrogowi.',
    'Whenever you lose HP, gain {n} block.': 'Gdy tracisz HP, zyskaj {n} pkt Bloku.',
    'Whenever you play a Power, draw {n} cards.': v => `Gdy zagrywasz Moc, dobierz ${cards(v.n)}.`,
    'Whenever you play a power, draw {n} cards.': v => `Gdy zagrywasz Moc, dobierz ${cards(v.n)}.`,
    'Whenever you play a Skill, gain {n} block.': 'Gdy zagrywasz Umiejętność, zyskaj {n} pkt Bloku.',
    'Whenever you play a skill, gain {n} block.': 'Gdy zagrywasz Umiejętność, zyskaj {n} pkt Bloku.',
    'Whenever you play an Attack, apply {n} Poison to ALL enemies.': 'Gdy zagrywasz Atak, nałóż {n} Trucizny na WSZYSTKICH wrogów.',
    'Whenever you play an attack, apply {n} poison to ALL enemies.': 'Gdy zagrywasz Atak, nałóż {n} Trucizny na WSZYSTKICH wrogów.',
    'Whenever you play an Attack, deal {n} damage to a random enemy.': 'Gdy zagrywasz Atak, zadaj {n} pkt obrażeń losowemu wrogowi.',
    'Whenever you play an attack, deal {n} damage to a random enemy.': 'Gdy zagrywasz Atak, zadaj {n} pkt obrażeń losowemu wrogowi.',
    'Start of your turn: gain {n} block.': 'Początek tury: zyskaj {n} pkt Bloku.',
    'Start of your turn: apply {n} poison to ALL enemies.': 'Początek tury: nałóż {n} Trucizny na WSZYSTKICH wrogów.',
    'Start of your turn: lose {n} HP, gain {n2} energy, draw {n3} card.': v => `Początek tury: strać ${v.n} HP, zyskaj ${v.n2} Energii, dobierz ${cards(v.n3)}.`,
    'Start of your turn: add a random card to your hand.': 'Początek tury: dodaj losową kartę do ręki.',
    'Start of your turn: gain {n} strength.': 'Początek tury: zyskaj {n} Siły.',
    'End of your turn: deal {n} damage to ALL enemies.': 'Koniec tury: zadaj {n} pkt obrażeń WSZYSTKIM wrogom.',
    'End of your turn: gain {n} block for each unspent energy.': 'Koniec tury: zyskaj {n} pkt Bloku za każdą niewydaną Energię.',
    // upgrade side panel
    'Stronger: {s}.': 'Silniejsza: {s}.',
    'Stronger effects.': 'Silniejsze efekty.',
    'Extra effect: {s}': 'Dodatkowy efekt: {s}',
    'Costs {n} less.': 'Kosztuje o {n} mniej.',
  });

  // Upgrades change the numbers inside a translated text: fix the word after a changed number.
  Game.I18N.addFixer && Game.I18N.addFixer('pl', text => text
    .replace(/(\d+) (kartę|karty|kart)(?![\p{L}])/gu, (m, n) => `${n} ${P(+n, 'kartę', 'karty', 'kart')}`)
    .replace(/(\d+) (dodatkową kartę|dodatkowe karty|dodatkowych kart)/g, (m, n) => `${n} ${P(+n, 'dodatkową kartę', 'dodatkowe karty', 'dodatkowych kart')}`)
    .replace(/(\d+) (losową kartę|losowe karty|losowych kart)/g, (m, n) => `${n} ${P(+n, 'losową kartę', 'losowe karty', 'losowych kart')}`));
})();
