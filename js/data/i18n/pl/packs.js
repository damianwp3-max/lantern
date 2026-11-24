// POLISH: card packs, pack opening, end-of-run screen and rarity names
// (js/packs/*, js/ui/packs/*, js/ui/screens/runEndScreen.js, data/cardPacksData.js, data/runScoreData.js).
(function () {
  const P = (n, one, few, many) => Game.I18N.plural(Number(n), one, few, many);
  Game.I18N.add('pl', {
    // packs
    'Explorer Pack': 'Paczka Odkrywcy', 'Hero Pack': 'Paczka Bohatera', 'Blood Pack': 'Krwawa Paczka',
    'A new card set': 'Nowy zestaw kart', 'Exclusive hero cards': 'Ekskluzywne karty bohatera',
    'Level {n}': 'Poziom {n}',
    '{n} card': '{n} karta', '{n} cards': v => `${v.n} ${P(v.n, 'karta', 'karty', 'kart')}`,
    'Click to tear it open!': 'Kliknij, aby rozerwać paczkę!',
    'Click to turn over the next card': 'Kliknij, aby odkryć następną kartę',
    'Click to turn it over': 'Kliknij, aby ją odkryć', 'Click for the last card': 'Kliknij po ostatnią kartę',
    'Exclusive cards: {s}': 'Ekskluzywne karty: {s}', 'New card set: {s}': 'Nowy zestaw kart: {s}',
    'Only this hero can find them.': 'Tylko ten bohater może je znaleźć.',
    'Collect': 'Zabierz', 'Every exclusive card found!': 'Masz wszystkie ekskluzywne karty!', '+{n} embers': v => `+${v.n} żaru`,
    'Locked: gain explorer levels with this hero to unlock.': 'Zablokowana: zdobywaj poziomy odkrywcy tym bohaterem, aby ją odblokować.', 'NEW': 'NOWA',
    'Common': 'Zwykła', 'Uncommon': 'Niepospolita', 'Rare': 'Rzadka', 'Exclusive': 'Ekskluzywna',
    // fight summary
    'Level up!': 'Nowy poziom!',
    'You earned {n} card pack': 'Zdobywasz {n} paczkę kart',
    'You earned {n} card packs': v => `Zdobywasz ${v.n} ${P(v.n, 'paczkę', 'paczki', 'paczek')} kart`,
    'Open them at the end of the run to see your new cards.': 'Otworzysz je na końcu wyprawy i zobaczysz nowe karty.',
    'New card pack earned!': 'Zdobyto nową paczkę kart!',
    // end of run
    'Your lantern goes out. The run is over.': 'Twoja latarnia gaśnie. Wyprawa zakończona.',
    'Points': 'Punkty', 'Total': 'Razem', 'How far you got': 'Jak daleko dotarłeś',
    'Floors cleared': 'Ukończone piętra', 'Fights won': 'Wygrane walki', 'Elites defeated': 'Pokonane elity',
    'Bosses defeated': 'Pokonani bossowie', 'Levels cleared': 'Ukończone poziomy', 'Cards gained': 'Zdobyte karty',
    'Reached the bottom': 'Dotarcie na dno',
    '{n} of {n2} floors': '{n} z {n2} pięter',
    '+{n} explorer level': '+{n} poziom odkrywcy',
    '+{n} explorer levels': v => `+${v.n} ${P(v.n, 'poziom', 'poziomy', 'poziomów')} odkrywcy`,
    'You earned {n} card pack!': 'Zdobyłeś {n} paczkę kart!',
    'You earned {n} card packs!': v => `Zdobyłeś ${v.n} ${P(v.n, 'paczkę', 'paczki', 'paczek')} kart!`,
    'Click a pack to open it.': 'Kliknij paczkę, aby ją otworzyć.',
    'All packs opened!': 'Wszystkie paczki otwarte!',
    'Your new cards can now show up as rewards.': 'Twoje nowe karty mogą teraz pojawiać się jako nagrody.',
    'No card packs this time': 'Tym razem bez paczek kart',
    'Gain an explorer level during a run to earn card packs.': 'Zdobądź poziom odkrywcy podczas wyprawy, aby dostać paczki kart.',
    // ranks
    'Lost Wanderer': 'Zagubiony Wędrowiec', 'Torch Bearer': 'Niosący Pochodnię', 'Cave Delver': 'Grotołaz',
    'Deep Explorer': 'Odkrywca Głębin', 'Lord of the Depths': 'Władca Głębin',
  });
})();
