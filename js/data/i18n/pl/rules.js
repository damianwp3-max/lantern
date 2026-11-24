// POLISH: exact values for data fields that are templates or word lists
// (applied by js/i18n/content.js when Polish is picked).
//   statuses.tip / intents.tip*   keep the {placeholders} the game fills in
//   statuses.forms                other spellings used in card text (bolded, and they bring up the rule beside the card)
//   keywords.match                words in card text that bring up the rule beside the card
Game.I18N.addContent('pl', 'statuses', {
  poison: { forms: ['Trucizny', 'Truciznę', 'Trucizną'],
    tip: 'Na początku swojej tury traci {n} HP. Blok tego nie zatrzymuje. Potem Trucizna spada do {n-1}.' },
  weak: { forms: ['Osłabienia', 'Osłabieniem'], tip: 'Ataki zadają o 25% mniej obrażeń. Zostało tur: {n}.' },
  frail: { forms: ['Kruchości', 'Kruchością'], tip: 'Zyskuje o 25% mniej Bloku z każdego źródła. Zostało tur: {n}.' },
  vulnerable: { forms: ['Podatności', 'Podatnością'], tip: 'Otrzymuje o 50% więcej obrażeń od ataków. Zostało tur: {n}.' },
  might: { forms: ['Potęgi', 'Potęgą'], tip: 'Każde trafienie ataku zadaje {n} pkt obrażeń więcej. Trwa całą walkę.' },
});
Game.I18N.addContent('pl', 'keywords', {
  block: { match: ['blok'], forms: ['Bloku', 'Blokiem'] },
  strength: { match: ['sił'], forms: ['Siły', 'Siłę'] },
  energy: { match: ['energi'], forms: ['Energii', 'Energię'] },
  exhaust: { match: ['wyczerp'] },
  nextTurn: { match: ['następnej turze'] },
  all: { match: ['WSZYSTKIM', 'WSZYSTKICH'], exact: true },
  random: { match: ['losow'] },
  draw: { match: ['dobierz', 'dobiera'] },
  heal: { match: ['ulecz'] },
  loseHp: { match: ['strać', 'tracisz'] },
  timed: { match: ['wyczuci'] },
  unplayable: { match: ['niegrywaln'] },
});
Game.I18N.addContent('pl', 'intents', {
  attack: { tip: 'Zaatakuje cię za {dmg} pkt obrażeń.', tipMulti: 'Zaatakuje cię {hits} razy po {dmg} pkt obrażeń (razem {total}).' },
  block: { tip: 'Zyska {value} pkt Bloku.' },
  debuff: { tip: 'Osłabi cię klątwą.' },
  buff: { tip: 'Wzmocni się: +{value} Potęgi (więcej obrażeń przy każdym trafieniu).', tipAllies: 'Wzmocni WSZYSTKICH wrogów: każdy +{value} Potęgi.' },
  addCard: { tip: 'Wtasuje {value} bezużyteczne karty do twojego stosu odrzuconych.' },
});
