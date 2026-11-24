// POLISH: screens, buttons, tooltips and messages (English text -> Polish).
// Text on screen is translated as it appears (js/i18n/domTranslate.js), so a
// new English line in a screen only needs a new entry here.
// {n}, {n2}, ... = numbers; any other {name} = some text (translated too).
(function () {
  const P = Game.I18N.plural;
  Game.I18N.add('pl', {
    // main menu
    'Lantern Descent': 'Zejście z Latarnią', 'A deck builder skeleton': 'Karciana wyprawa w głąb ziemi',
    'New Run': 'Nowa wyprawa', 'Continue': 'Kontynuuj', 'Card Library': 'Biblioteka kart', 'Unlocks': 'Odblokowania',
    'Lantern ({n} embers)': v => `Latarnia (${v.n} ${P(v.n, 'żar', 'żary', 'żarów')})`,
    'Settings': 'Ustawienia', 'Quit': 'Wyjdź', 'Goodbye': 'Do zobaczenia',
    'Thanks for playing. Your run is saved if one is in progress.': 'Dzięki za grę. Trwająca wyprawa jest zapisana.',
    'Back to menu': 'Wróć do menu', 'Main menu': 'Menu główne', 'Menu': 'Menu', 'Back': 'Wróć',
    'Explorer level {n} · {n2} / {n3} XP · Card sets: {n4} / {n5}': 'Poziom odkrywcy {n} · {n2} / {n3} PD · Zestawy kart: {n4} / {n5}',

    // hero select
    'Choose your hero': 'Wybierz bohatera',
    'Every hero starts with their own deck and passive, and can find cards no one else can.': 'Każdy bohater zaczyna z własną talią i pasywką oraz może znaleźć karty, których nie znajdzie nikt inny.',
    'Cards in deck': 'Kart w talii', 'Starting passive': 'Pasywka startowa', 'Exclusive cards': 'Karty wyłączne', 'Coming soon': 'Wkrótce',
    'Start run': 'Rozpocznij', 'Click to turn around': 'Kliknij, aby się obróciła', 'HP': 'HP',

    // unlocks
    'Level': 'Poziom', '{n} / {n2} XP': '{n} / {n2} PD', 'XP': 'PD', 'Unlocked sets': 'Odblokowane zestawy', 'Locked sets': 'Zablokowane zestawy',
    '{n} cards': v => `${v.n} ${P(v.n, 'karta', 'karty', 'kart')}`,
    'Win fights to earn experience: normal fight {n} XP, elite {n2} XP, boss {n3} XP. Every level unlocks one card set, picked at random. Unlocked cards can show up as rewards. Progress carries over between runs.':
      'Wygrywaj walki, aby zdobywać doświadczenie: zwykła walka {n} PD, elita {n2} PD, boss {n3} PD. Każdy poziom odblokowuje jeden losowy zestaw kart. Odblokowane karty mogą pojawiać się jako nagrody. Postęp zostaje między wyprawami.',
    'Cards unlocked: {n} / {n2} · Card sets: {n3} / {n4} · Fights won: {n5} · Bosses defeated: {n6}': 'Odblokowane karty: {n} / {n2} · Zestawy kart: {n3} / {n4} · Wygrane walki: {n5} · Pokonani bossowie: {n6}',
    'Locked': 'Zablokowana', 'Starter': 'Startowa',

    // fight summary
    'Fights won:': 'Wygrane walki:', 'Cards gained this run:': 'Karty zdobyte w tej wyprawie:', 'Deck:': 'Talia:',
    '🔓 Level up! New card set:': '🔓 Nowy poziom! Nowy zestaw kart:', 'These cards can now show up as rewards.': 'Te karty mogą teraz pojawiać się jako nagrody.',
    'Fight over: {s}': 'Koniec walki: {s}', '+{n} card gained!': '+{n} karta zdobyta!', 'No card taken': 'Bez nowej karty',
    'Cards gained this run: {n} · Deck: {n2}': 'Karty zdobyte w tej wyprawie: {n} · Talia: {n2}', 'Cards gained this run: {n}': 'Karty zdobyte w tej wyprawie: {n}',
    '🔓 New card set: {s}': '🔓 Nowy zestaw kart: {s}',
    'This run: {n} fight won, {n2} card gained, {n3} card unlocked.': 'Ta wyprawa: wygrane walki: {n}, zdobyte karty: {n2}, odblokowane karty: {n3}.',
    'This run: {n} fights won, {n2} cards gained, {n3} cards unlocked.': 'Ta wyprawa: wygrane walki: {n}, zdobyte karty: {n2}, odblokowane karty: {n3}.',
    'This run: {n} fight won, {n2} cards gained, {n3} cards unlocked.': 'Ta wyprawa: wygrane walki: {n}, zdobyte karty: {n2}, odblokowane karty: {n3}.',
    'This run: {n} fights won, {n2} card gained, {n3} cards unlocked.': 'Ta wyprawa: wygrane walki: {n}, zdobyte karty: {n2}, odblokowane karty: {n3}.',
    'This run: {n} fights won, {n2} cards gained, {n3} card unlocked.': 'Ta wyprawa: wygrane walki: {n}, zdobyte karty: {n2}, odblokowane karty: {n3}.',

    // top bar
    'Floor {n} of {n2}': 'Piętro {n} z {n2}', 'Deck': 'Talia', 'Gold': 'Złoto', 'Lasting': 'Trwałe', 'Totems': 'Totemy', 'Passives': 'Pasywki',
    'Level {n} of {n2}: {s}': 'Poziom {n} z {n2}: {s}', 'Where you are': 'Gdzie jesteś',
    'Floor {n} of {n2}. Each pip is one row of the map; the last one is the boss. Beat the boss to go down to the next level.': 'Piętro {n} z {n2}. Każda kropka to jeden rząd mapy; ostatnia to boss. Pokonaj bossa, aby zejść na następny poziom.',
    'HP {n} / {n2}': 'HP {n} / {n2}', 'Health · whole run': 'Zdrowie · cała wyprawa',
    'Your health carries over between fights. At 0 the run is over. Rest sites and some cards heal it.': 'Zdrowie przechodzi między walkami. Przy 0 wyprawa się kończy. Leczą je obozowiska i niektóre karty.',
    'Deck: {n} cards': 'Talia: {n} kart', 'Click to view': 'Kliknij, aby zobaczyć', 'Every card you own. Each fight starts by shuffling all of them into your draw pile.': 'Wszystkie twoje karty. Każda walka zaczyna się od wtasowania ich wszystkich do stosu dobierania.',
    'Fights won: {n}': 'Wygrane walki: {n}', 'This run': 'Ta wyprawa', 'How many fights you have won so far in this run.': 'Ile walk wygrałeś do tej pory w tej wyprawie.',
    'Turn {n}': 'Tura {n}', 'This fight': 'Ta walka', 'Click to end your turn (or press E / Space). The number is the current turn of this fight.': 'Kliknij, aby zakończyć turę (albo naciśnij E / Spację). Liczba to obecna tura tej walki.',
    'Options': 'Opcje', 'Timing speed, timed cards on or off, and a practice bar.': 'Język, prędkość paska, karty z wyczuciem i pasek do ćwiczeń.',
    'Leave': 'Wyjdź', 'Back to the main menu. Your run is saved.': 'Powrót do menu głównego. Wyprawa jest zapisana.',
    'Lantern oil {n} / {n2}': 'Olej w latarni {n} / {n2}', 'Dark!': 'Ciemno!', 'Resource · whole run': 'Zasób · cała wyprawa',
    'Entering a fight, elite, boss or event burns 1 oil. At 0 your lantern is dark and you cannot see what enemies will do. In a fight, the Flare burns 1 oil for extra energy and a card. Refill at rest sites, the merchant and in events.':
      'Wejście do walki, elity, bossa lub zdarzenia spala 1 olej. Przy 0 latarnia gaśnie i nie widzisz, co zrobią wrogowie. W walce Rozbłysk spala 1 olej za dodatkową Energię i kartę. Dolewaj w obozowiskach, u kupca i w zdarzeniach.',
    'Gold: {n}': 'Złoto: {n}', 'Currency · whole run': 'Waluta · cała wyprawa', 'Won in fights. Spend it at the merchant and in some events.': 'Zdobywane w walkach. Wydawaj je u kupca i w niektórych zdarzeniach.',

    // combat
    'End Turn': 'Koniec tury', 'Turn': 'Tura', 'No powers yet. Play a Power card and it shows up here.': 'Na razie brak Mocy. Zagraj kartę Mocy, a pojawi się tutaj.', 'Passives (whole run)': 'Pasywki (cała wyprawa)', 'Totems (whole run)': 'Totemy (cała wyprawa)', '✧ Powers': '✧ Moce', 'Powers': 'Moce', 'No cards in hand.': 'Brak kart w ręce.', '? Controls': '? Sterowanie', 'Combat log': 'Dziennik walki',
    'Block {n}': 'Blok {n}', 'Strength {n}': 'Siła {n}', 'Energy {n}/{n2}': 'Energia {n}/{n2}', 'HP {n}/{n2}': 'HP {n}/{n2}',
    'Defense': 'Obrona', 'Buff': 'Efekt pozytywny', 'Debuff': 'Efekt negatywny', 'Rule': 'Zasada', 'Resource': 'Zasób', 'You': 'Ty', 'Cards': 'Karty',
    'Your attacks deal +{n} damage per hit. Lasts for this fight.': 'Twoje ataki zadają +{n} pkt obrażeń za trafienie. Trwa do końca walki.',
    'If it reaches 0, the run is over. HP carries over between fights; heal at rest sites.': 'Gdy spadnie do 0, wyprawa się kończy. HP przechodzi między walkami; lecz się w obozowiskach.',
    '{n} waiting effect': '{n} czekający efekt', '{n} waiting effects': v => `${v.n} ${P(v.n, 'czekający efekt', 'czekające efekty', 'czekających efektów')}`, 'Waiting: {s}': 'Czeka: {s}',
    'Draw pile ({n})': 'Stos dobierania ({n})', 'Discard pile ({n})': 'Stos odrzuconych ({n})', 'Exhausted ({n})': 'Wyczerpane ({n})',
    'Draw pile': 'Stos dobierania', 'Discard pile': 'Stos odrzuconych', 'Exhausted': 'Wyczerpane',
    'Cards you will draw next. Click to see them (in random order).': 'Karty, które dobierzesz jako następne. Kliknij, aby je zobaczyć (w losowej kolejności).',
    'Played and discarded cards. When the draw pile runs out, these are shuffled back in. Click to see them.': 'Zagrane i odrzucone karty. Gdy skończy się stos dobierania, wracają do niego potasowane. Kliknij, aby je zobaczyć.',
    'Cards removed for this fight (powers and Exhaust cards). Click to see them.': 'Karty usunięte na tę walkę (Moce i karty z Wyczerpaniem). Kliknij, aby je zobaczyć.',
    'Timed: deals {n}% less or more depending on timing.': 'Wyczucie: zadaje o {n}% mniej lub więcej, zależnie od wyczucia.',
    'Timed: gives {n}% less or more block depending on timing.': 'Wyczucie: daje o {n}% mniej lub więcej Bloku, zależnie od wyczucia.',
    'Timed: how many cards you draw depends on timing.': 'Wyczucie: liczba dobranych kart zależy od wyczucia.',
    'Stacked {n} times, so it happens {n2} times.': 'Skumulowana {n} razy, więc działa {n2} razy.',
    'Passive · whole run': 'Pasywka · cała wyprawa', 'Power · whole fight': 'Moc · cała walka',
    // enemy intent tooltips
    '{s}: Attack': '{s}: Atak', '{s}: Defend': '{s}: Obrona', '{s}: Empower': '{s}: Wzmocnienie', '{s}: Spores': '{s}: Zarodniki', '{s}: Hex': '{s}: Klątwa',
    'Damage · next turn': 'Obrażenia · następna tura', 'Block · next turn': 'Blok · następna tura', 'Buff · next turn': 'Wzmocnienie · następna tura',
    'Clog · next turn': 'Zapchanie · następna tura', 'Debuff · next turn': 'Osłabienie · następna tura', 'Intent · next turn': 'Zamiar · następna tura',
    'Will gain {n} block.': 'Zyska {n} pkt Bloku.', 'Will curse you.': 'Rzuci na ciebie klątwę.',
    '(Normally {n}; changed by Weak, Vulnerable or the size of the group.)': '(Normalnie {n}; zmienione przez Osłabienie, Podatność lub wielkość grupy.)',
    'It also gains {n} block.': 'Zyska też {n} pkt Bloku.', 'Then gives you {n} {s}.': 'Potem nałoży na ciebie {n} {s}.',
    'Will give you {n} {s}. {s2}': 'Nałoży na ciebie {n} {s}. {s2}',
    'Will attack you for {n} damage.': 'Zaatakuje cię za {n} pkt obrażeń.',
    'Will attack you {n} times for {n2} damage each ({n3} total).': 'Zaatakuje cię {n} razy po {n2} pkt obrażeń (razem {n3}).',
    'Will gain {n} block. ': 'Zyska {n} pkt Bloku.',
    // flare and oil
    'Flare': 'Rozbłysk', 'Costs {n} oil · once per turn': 'Kosztuje {n} oleju · raz na turę',
    'Burn oil for a bright flare: gain {n} energy and draw {n2} card right now. Key: F.': 'Spal olej na jasny rozbłysk: zyskaj {n} Energii i od razu dobierz {n2} kartę. Klawisz: F.',
    'Burn oil for a bright flare: gain {n} energy and draw {n2} cards right now. Key: F.': v => `Spal olej na jasny rozbłysk: zyskaj ${v.n} Energii i od razu dobierz ${v.n2} ${P(v.n2, 'kartę', 'karty', 'kart')}. Klawisz: F.`,
    'The lantern is dark': 'Latarnia zgasła', 'No oil': 'Brak oleju', 'You cannot see what this enemy will do. Refill your oil to see it again.': 'Nie widzisz, co zrobi ten wróg. Dolej oleju, aby znów to widzieć.',
    'Totem · whole run': 'Totem · cała wyprawa', 'Piercing': 'Przekłucie', 'Lasting effects': 'Trwałe efekty', 'Next fights': 'Następne walki', 'None.': 'Brak.', 'Effect': 'Efekt',
    '{s} ({n} fight left)': '{s} (została {n} walka)', '{s} ({n} fights left)': v => `${v.s} (${P(v.n, 'została', 'zostały', 'zostało')} ${v.n} ${P(v.n, 'walka', 'walki', 'walk')})`,
    'Upgraded': 'Ulepszona', 'Upgrade': 'Ulepsz', 'Your luck right now: {s}.': 'Twoje szczęście teraz: {s}.', '{n}% nothing': '{n}% nic', '{n}% twice': '{n}% dwa razy',
    'TWICE!': 'PODWÓJNIE!', 'Fizzle!': 'Pudło!',
    // timing bar
    'Get ready…': 'Przygotuj się…', 'Practice': 'Ćwiczenie', 'Try the timing': 'Wypróbuj pasek', 'On': 'Wł.', 'Off': 'Wył.',
    // viewers
    'Active effects': 'Aktywne efekty', 'Buffs and statuses': 'Wzmocnienia i stany', 'Powers this fight': 'Moce w tej walce', 'Nothing right now.': 'Na razie nic.',
    'Empty.': 'Pusto.', 'Gone until the end of this fight.': 'Zniknęły do końca tej walki.', 'Shown sorted, not in the order you will draw them.': 'Pokazane posortowane, nie w kolejności dobierania.',
    'Shuffled back into the draw pile when it runs out.': 'Wracają do stosu dobierania, gdy ten się skończy.', 'Close (Esc)': 'Zamknij (Esc)',
    'Your deck ({n})': 'Twoja talia ({n})',

    // reward
    'Victory! Choose a card to add to your deck': 'Zwycięstwo! Wybierz kartę do talii', 'Skip': 'Pomiń', '+{n} gold': '+{n} złota',
    'Bonus rewards': 'Dodatkowe nagrody', '(take them before you leave)': '(weź je przed odejściem)', 'Keys: 1-3 take a card, S skip.': 'Klawisze: 1-3 weź kartę, S pomiń.',
    'Costs 1 less, or an extra effect.': 'Koszt o 1 mniejszy albo dodatkowy efekt.', 'Choose 1 of 3 piercings, then a card.': 'Wybierz 1 z 3 przekłuć, potem kartę.',
    'Defeat': 'Porażka',

    // rest
    'Rest site': 'Obozowisko',
    'A quiet corner. Pick one: rest your body, refill your lantern, or learn something that stays with you. The fire gives you 1 oil for free.':
      'Cichy kąt. Wybierz jedno: odpocznij, dolej oleju do latarni albo naucz się czegoś, co zostanie z tobą. Ognisko daje ci 1 olej za darmo.',
    'Heal {n} HP ({n2}/{n3} now).': 'Ulecz {n} HP (teraz {n2}/{n3}).', 'One time': 'Jednorazowo',
    'A card of your choice costs 1 less, or its effects get stronger.': 'Wybrana karta kosztuje 1 mniej albo jej efekty stają się silniejsze.',
    'Nothing left to upgrade.': 'Nie ma już czego ulepszać.', 'Refill lantern': 'Dolej oleju', 'Add {n} oil': 'Dodaj {n} oleju', 'Gain {n} oil ({n2}/{n3} now).': 'Zyskaj {n} oleju (teraz {n2}/{n3}).',
    'Your lantern is full.': 'Latarnia jest pełna.', 'or': 'albo', 'Passive, lasts the whole run': 'Pasywka na całą wyprawę',

    // map
    'Go down one step at a time. You can only follow the paths, so plan your route. Glowing nodes are your next choices.': 'Schodź krok po kroku. Możesz iść tylko ścieżkami, więc zaplanuj trasę. Świecące pola to twoje następne wybory.',
    'you': 'ty',

    // level / run end
    'Level cleared': 'Poziom ukończony', 'Next: {s}.': 'Dalej: {s}.', 'Descend': 'Zejdź niżej', 'You reached the bottom!': 'Dotarłeś na samo dno!',
    'All three levels cleared. The run is over.': 'Wszystkie trzy poziomy ukończone. Wyprawa zakończona.',
    'You earned {n} embers for your lantern.': v => `Zdobywasz ${v.n} ${P(v.n, 'żar', 'żary', 'żarów')} dla swojej latarni.`,

    // events
    'You chose: {s}': 'Twój wybór: {s}',

    // merchant
    'The Merchant': 'Kupiec', '"Light for coin. Coin for light. I do not ask where you got it."': '„Światło za monetę. Moneta za światło. Nie pytam, skąd ją masz."',
    'You have': 'Masz', 'gold.': 'złota.', 'Sold out.': 'Wyprzedane.', 'SOLD': 'SPRZEDANE', 'Lantern oil': 'Olej do latarni', 'Refill +{n} oil.': 'Dolej +{n} oleju.',
    'Already bought here.': 'Już tu kupione.', 'Your deck is too small.': 'Twoja talia jest za mała.', 'Nothing to upgrade.': 'Nie ma czego ulepszyć.',
    'No card can take a piercing.': 'Żadna karta nie przyjmie przekłucia.', 'Cards': 'Karty', 'Services': 'Usługi', 'for {n} gold': 'za {n} złota',

    // picker
    'An upgraded card costs 1 less, or its numbers go up (more damage, block, draw or stacks).': 'Ulepszona karta kosztuje 1 mniej albo jej liczby rosną (więcej obrażeń, Bloku, dobierania lub ładunków).',
    'The card leaves your deck for good.': 'Karta na zawsze opuszcza talię.', 'Remove it': 'Usuń ją', 'Pierce it': 'Przekłuj ją',
    'Pick the card to pierce. A card can carry one piercing.': 'Wybierz kartę do przekłucia. Karta może mieć jedno przekłucie.',
    'First pick a piercing, then the card. A card can carry one piercing.': 'Najpierw wybierz przekłucie, potem kartę. Karta może mieć jedno przekłucie.',
    'Click the card again to unselect.': 'Kliknij kartę ponownie, aby odznaczyć.', '{s} was removed from your deck': 'Usunięto z talii: {s}',

    // lantern (meta) screen
    'Your Lantern': 'Twoja Latarnia', 'Every run earns Embers. Spend them here on upgrades that stay with you for every run.': 'Każda wyprawa daje Żar. Wydawaj go tu na ulepszenia, które zostają z tobą na każdą wyprawę.',
    'MAX': 'MAKS', 'embers': 'żaru', 'Level {n} / {n2}': 'Poziom {n} / {n2}',

    // library
    'All': 'Wszystkie', '▲ Show upgraded': '▲ Pokaż ulepszone', 'Card Library ({n})': 'Biblioteka kart ({n})',

    // settings window
    'Language': 'Język',
  });
})();
