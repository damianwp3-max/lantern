// POLISH: comfort helpers (js/ui/qol/*.js, data/shortcutsData.js) and new menu text.
(function () {
  const P = (n, one, few, many) => Game.I18N.plural(Number(n), one, few, many);
  Game.I18N.add('pl', {
    'A roguelike deck builder': 'Karciana wyprawa w głąb ziemi',
    // end turn guard
    'You can still play 1 card.': 'Możesz jeszcze zagrać 1 kartę.',
    'You can still play {n} cards.': v => `Możesz jeszcze zagrać ${v.n} ${P(v.n, 'kartę', 'karty', 'kart')}.`,
    'Press again to end the turn': 'Naciśnij ponownie, aby zakończyć turę',
    // damage preview, incoming damage
    '{n} blocked': '{n} zablokowane', 'No attacks coming': 'Brak nadchodzących ataków', 'allies first': 'najpierw sojusznicy',
    'you lose {n}': 'stracisz {n}', 'blocked': 'zablokowane', 'Incoming': 'Nadchodzi',
    'All the attack damage enemies plan against you this turn, after Weak and Vulnerable. Your block soaks it first. Your Bat and pets are attacked before you.':
      'Wszystkie obrażenia, które wrogowie planują ci zadać w tej turze, po Osłabieniu i Podatności. Najpierw pochłania je twój Blok. Nietoperz i zwierzaki są atakowane przed tobą.',
    // turn flow
    'Enemy turn': 'Tura wrogów', 'Your turn': 'Twoja tura',
    // controls window
    'Hover anything to read what it does.': 'Najedź na cokolwiek, by przeczytać, co robi.',
    'In a fight': 'W walce', 'Everywhere': 'Wszędzie',
    'Pick or play a card from your hand': 'Wybierz lub zagraj kartę z ręki', 'Change the target enemy': 'Zmień cel',
    'Play the picked card on the target': 'Zagraj wybraną kartę w cel', 'End your turn': 'Zakończ turę',
    'Put the picked card back': 'Odłóż wybraną kartę', 'Flare: burn oil for energy and a card': 'Rozbłysk: spal olej za energię i kartę',
    'Look at your draw / discard pile': 'Zobacz stos dobierania / odrzuconych', 'Choose an option (map, events, rest, rewards)': 'Wybierz opcję (mapa, wydarzenia, odpoczynek, nagrody)',
    'Continue': 'Dalej', 'Back, leave or skip; closes any window': 'Wróć, wyjdź lub pomiń; zamyka każde okno', 'Look at your deck': 'Zobacz swoją talię',
    'This list': 'Ta lista', 'Left': 'Lewo', 'Right': 'Prawo', 'Space': 'Spacja', 'right click': 'prawy klik', 'or': 'lub',
    // settings
    'Confirm end turn': 'Potwierdzaj koniec tury', 'Key hints': 'Podpowiedzi klawiszy', 'Damage preview': 'Podgląd obrażeń',
    'If you can still play cards, the first press of End Turn asks again instead of ending your turn.':
      'Jeśli możesz jeszcze zagrać karty, pierwsze naciśnięcie Końca Tury pyta ponownie, zamiast kończyć turę.',
    'Show small number keys on cards and options you can pick with the keyboard.':
      'Pokazuj małe klawisze z numerami na kartach i opcjach, które można wybrać klawiaturą.',
    'While you hover or aim an attack, the enemy health bar shows how much it will lose.':
      'Gdy najeżdżasz lub celujesz atakiem, pasek zdrowia wroga pokazuje, ile straci.',
  });
})();
