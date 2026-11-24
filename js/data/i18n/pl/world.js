// POLISH: the world. Card types, enemies, statuses, rules, passives, totems,
// piercings, map, levels, lantern upgrades, heroes, card sets, settings.
Game.I18N.add('pl', {
  // card types
  'Attack': 'Atak', 'Defense': 'Obrona', 'Attack + Defense': 'Atak + Obrona', 'Skill': 'Umiejętność', 'Power': 'Moc', 'Pack': 'Paczka', 'Useless': 'Bezużyteczna',

  // enemies
  'Cellar Rat': 'Szczur Piwniczny', 'Mold Heap': 'Kupa Pleśni', 'Cave Moth': 'Ćma Jaskiniowa', 'Lamp Leech': 'Pijawka Lampowa',
  'Root Warden': 'Strażnik Korzeni', 'Silt Crab': 'Krab Mułowy', 'Pale Eel': 'Blady Węgorz', 'Drowned Acolyte': 'Utopiony Akolita',
  'Barnacle Mass': 'Kłąb Pąkli', 'Tide Bell': 'Dzwon Przypływu', 'Cinder Imp': 'Chochlik Popiołu', 'Slag Golem': 'Golem z Żużlu',
  'Ash Hound': 'Popielny Ogar', 'Forge Wisp': 'Ognik Kuźni', 'Vault Keeper': 'Strażnik Skarbca',

  // statuses
  'Poison': 'Trucizna', 'Weak': 'Osłabienie', 'Frail': 'Kruchość', 'Vulnerable': 'Podatność', 'Might': 'Potęga',
  'Loses that much HP at the start of its turn, then the poison drops by 1. Ignores block.': 'Na początku swojej tury traci tyle HP, potem Trucizna spada o 1. Ignoruje Blok.',
  'Deals 25% less attack damage. Drops by 1 each turn.': 'Zadaje o 25% mniej obrażeń atakami. Spada o 1 co turę.',
  'Gains 25% less block. Drops by 1 each turn.': 'Zyskuje o 25% mniej Bloku. Spada o 1 co turę.',
  'Takes 50% more attack damage. Drops by 1 each turn.': 'Otrzymuje o 50% więcej obrażeń od ataków. Spada o 1 co turę.',
  'Deals that much more damage with every attack hit. Lasts the whole fight.': 'Każde trafienie ataku zadaje tyle więcej obrażeń. Trwa całą walkę.',

  // rules (keywords)
  'Block': 'Blok', 'Strength': 'Siła', 'Energy': 'Energia', 'Exhaust': 'Wyczerpanie', 'Next turn': 'Następna tura', 'ALL enemies': 'WSZYSCY wrogowie',
  'Random': 'Losowo', 'Draw': 'Dobieranie', 'Heal': 'Leczenie', 'Lose HP': 'Utrata HP', 'Controls': 'Sterowanie', 'Timed': 'Wyczucie', 'Unplayable': 'Niegrywalna',
  'Stops that much incoming attack damage. Your block goes away at the start of your next turn.': 'Zatrzymuje tyle obrażeń od ataków. Blok znika na początku twojej następnej tury.',
  'Each point adds 1 damage to every hit of your attack cards. Lasts for this fight.': 'Każdy punkt dodaje 1 pkt obrażeń do każdego trafienia twoich ataków. Trwa do końca walki.',
  'Pays for cards. You get your full energy back at the start of each turn; unspent energy is lost.': 'Płacisz nią za karty. Na początku każdej tury odzyskujesz całą Energię; niewydana przepada.',
  'After you play it, the card is removed until the end of this fight.': 'Po zagraniu karta znika do końca tej walki.',
  'Stays active for the rest of the fight once played. Playing it again stacks it. See all active powers with the Powers button.': 'Po zagraniu działa do końca walki. Zagranie jej ponownie się kumuluje. Wszystkie aktywne Moce zobaczysz pod przyciskiem Moce.',
  'The effect waits and happens at the start of your next turn, after you draw.': 'Efekt czeka i działa na początku twojej następnej tury, po dobraniu kart.',
  'Hits every enemy that is still standing.': 'Trafia każdego wroga, który jeszcze stoi.',
  'The game rolls it when the card is played, so each play can turn out differently.': 'Gra losuje to przy zagraniu karty, więc każde zagranie może wyjść inaczej.',
  'Take cards from your draw pile into your hand. If it is empty, your discard pile is shuffled in first.': 'Weź karty ze stosu dobierania do ręki. Gdy jest pusty, najpierw wtasowujesz stos odrzuconych.',
  'Get HP back, up to your max HP.': 'Odzyskaj HP, maksymalnie do swojego maks. HP.',
  'Costs HP directly. Block does not help.': 'Kosztuje HP bezpośrednio. Blok nie pomaga.',
  'Attacks: drag a card up (or click it) and point roughly at an enemy; it lights up when it will be hit. Other cards: click, or drag up. Keys: 1-9 play a card, Left/Right change target, E end turn, Esc cancel. Hover anything to read what it does.':
    'Ataki: przeciągnij kartę w górę (albo kliknij) i wskaż mniej więcej wroga; podświetli się ten, który dostanie. Inne karty: kliknij albo przeciągnij w górę. Klawisze: 1-9 zagraj kartę, Lewo/Prawo zmień cel, E koniec tury, Esc anuluj. Najedź na cokolwiek, aby przeczytać, co robi.',
  'Playing it opens a timing bar. Stop the cursor in the middle (Space or click) for a stronger effect; a miss makes it weaker. Speed can be changed in Settings.':
    'Zagranie otwiera pasek wyczucia. Zatrzymaj kursor na środku (Spacja albo klik), by efekt był silniejszy; pudło go osłabia. Prędkość zmienisz w Ustawieniach.',
  'Cannot be played. It just takes up room in your hand.': 'Nie da się jej zagrać. Tylko zajmuje miejsce w ręce.',

  // intents
  'Defend': 'Obrona', 'Hex': 'Klątwa', 'Empower': 'Wzmocnienie', 'Spores': 'Zarodniki',

  // passives
  'Thick Coat': 'Gruby Płaszcz', 'Ember Charm': 'Amulet Żaru', 'Quick Wick': 'Szybki Knot', 'Sharp Hook': 'Ostry Hak',
  'Deep Pockets': 'Głębokie Kieszenie', 'Warm Glow': 'Ciepła Poświata', 'Warm Lantern': 'Ciepła Latarnia',
  '+12 max HP (and heal 12).': '+12 maks. HP (i ulecz 12).',
  'Start each fight with 8 block.': 'Zaczynaj każdą walkę z 8 pkt Bloku.',
  '+1 energy on the first two turns of each fight.': '+1 Energii w dwóch pierwszych turach każdej walki.',
  'Your attacks deal +2 damage.': 'Twoje ataki zadają +2 pkt obrażeń.',
  'Draw 3 extra cards on the first turn of each fight.': 'Dobierz 3 dodatkowe karty w pierwszej turze każdej walki.',
  'Heal 3 HP after each fight you win.': 'Ulecz 3 HP po każdej wygranej walce.',
  'Start each fight with 3 block.': 'Zaczynaj każdą walkę z 3 pkt Bloku.',

  // totems
  'Oil Flask': 'Flaszka Oleju', 'Gilded Skull': 'Złocona Czaszka', 'Lucky Pebble': 'Szczęśliwy Kamyk', 'Bone Drum': 'Kościany Bęben',
  'Moth Pin': 'Szpilka z Ćmą', "Keeper's Satchel": 'Torba Strażnika', 'Smoked Lens': 'Okopcona Soczewka', "Haggler's Ring": 'Pierścień Targującego',
  'Cinder Pouch': 'Sakiewka Popiołu', 'Tallow Candle': 'Łojowa Świeca', 'Prickly Seal': 'Kolczasta Pieczęć', 'Weeping Idol': 'Płaczący Bożek',
  '+3 max oil and fill 3 oil now.': '+3 maks. oleju i od razu dolej 3 oleju.',
  'Win 30% more gold from fights.': 'Zdobywaj o 30% więcej złota w walkach.',
  'Luck is on your side: lucky and joker cards double 10% more often, unlucky and joker cards fizzle 10% less often.': 'Szczęście ci sprzyja: karty Szczęśliwe i Jokery działają podwójnie o 10% częściej, a Pechowe i Jokery zawodzą o 10% rzadziej.',
  '+1 energy on the first turn of every fight.': '+1 Energii w pierwszej turze każdej walki.',
  'Heal 8 HP after you beat an elite or a boss.': 'Ulecz 8 HP po pokonaniu elity lub bossa.',
  'At the end of your turn, gain 3 block for each card you kept in your hand (Keep).': 'Na końcu tury zyskaj 3 pkt Bloku za każdą kartę zatrzymaną w ręce (Zatrzymanie).',
  'You can still see what enemies will do when your lantern is dark.': 'Widzisz zamiary wrogów, nawet gdy twoja latarnia zgaśnie.',
  'Everything at the merchant is 20% cheaper.': 'Wszystko u kupca jest o 20% tańsze.',
  'Start every fight with 1 strength.': 'Zaczynaj każdą walkę z 1 Siły.',
  'Your Flare draws 1 more card.': 'Twój Rozbłysk dobiera 1 kartę więcej.',
  'Start every fight with 6 block.': 'Zaczynaj każdą walkę z 6 pkt Bloku.',
  'Every enemy starts the fight Vulnerable (1).': 'Każdy wróg zaczyna walkę z Podatnością (1).',

  // piercings
  'Unlucky': 'Pechowa', 'Lucky': 'Szczęśliwa', 'Joker': 'Joker', 'Keep': 'Zatrzymanie', 'Single-use': 'Jednorazowa', 'X Cost': 'Koszt X',
  '20% chance it does nothing.': '20% szans, że nic nie zrobi.',
  '20% chance to play twice.': '20% szans, że zadziała dwa razy.',
  'Either nothing, or twice.': 'Albo nic, albo dwa razy.',
  'Stays in your hand.': 'Zostaje w ręce.',
  'Works once per fight.': 'Działa raz na walkę.',
  'Spends all energy; more is better.': 'Zużywa całą Energię; im więcej, tym lepiej.',
  'Becomes a pack of cards.': 'Staje się paczką kart.',
  'When you play it, there is a 20% chance that it does nothing. You still pay its cost and it still goes to the discard pile.': 'Przy zagraniu jest 20% szans, że nic nie zrobi. Koszt i tak płacisz, a karta i tak trafia na stos odrzuconych.',
  'When you play it, there is a 20% chance that its effects happen twice. You only pay once.': 'Przy zagraniu jest 20% szans, że jej efekty zadziałają dwa razy. Płacisz tylko raz.',
  'Every time you play it, a coin is flipped: 50% it does nothing at all, 50% its effects happen twice.': 'Przy każdym zagraniu rzucasz monetą: 50% nic się nie dzieje, 50% efekty działają dwa razy.',
  'If you do not play it, it stays in your hand at the end of your turn instead of being discarded.': 'Jeśli jej nie zagrasz, na końcu tury zostaje w ręce, zamiast trafić na stos odrzuconych.',
  'It works once per fight. After you play it, it is gone until the fight ends (Exhaust). Next fight it is back.': 'Działa raz na walkę. Po zagraniu znika do końca walki (Wyczerpanie). W następnej walce wraca.',
  'Its cost is X. Playing it spends ALL your remaining energy, and its effects happen X times (at least 1 energy needed).': 'Jej koszt to X. Zagranie zużywa CAŁĄ pozostałą Energię, a efekty działają X razy (potrzeba co najmniej 1 Energii).',
  'It is a pack instead of a card. Playing it adds a random card to your hand for this fight, and the pack is used up (Exhaust). After the fight the original card is still in your deck.': 'To paczka zamiast karty. Zagranie dodaje do ręki losową kartę na tę walkę, a paczka się zużywa (Wyczerpanie). Po walce oryginalna karta wciąż jest w talii.',

  // map
  'Fight': 'Walka', 'Elite': 'Elita', 'Rest': 'Odpoczynek', 'Event': 'Zdarzenie', 'Merchant': 'Kupiec', 'Boss': 'Boss',
  'A normal fight. Win a card.': 'Zwykła walka. Wygraj kartę.',
  'A hard fight. Win a card.': 'Trudna walka. Wygraj kartę.',
  'Heal, upgrade a card, refill oil or learn a passive.': 'Ulecz się, ulepsz kartę, dolej oleju albo naucz się pasywki.',
  'Something in the dark. A choice with a price.': 'Coś w ciemności. Wybór, który ma swoją cenę.',
  'Buy cards and totems. Pierce, upgrade or cut cards.': 'Kupuj karty i totemy. Przekłuwaj, ulepszaj albo usuwaj karty.',
  'The guardian of this level.': 'Strażnik tego poziomu.',
  'The Root Cellar': 'Piwnica Korzeni', 'The Drowned Halls': 'Zatopione Sale', 'The Ember Vault': 'Skarbiec Żaru',

  // lantern upgrades
  'Deep Reservoir': 'Głęboki Zbiornik', 'Sturdy Frame': 'Mocna Rama', 'Glass Pocket': 'Szklana Kieszeń', 'Iron Shutters': 'Żelazne Okiennice',
  'Twin Wick': 'Podwójny Knot', 'Prism Lens': 'Pryzmat', 'Warm Flame': 'Ciepły Płomień',
  '+2 max oil per level.': '+2 maks. oleju na poziom.',
  '+5 max HP per level.': '+5 maks. HP na poziom.',
  'Start each run with +15 gold per level.': 'Zaczynaj każdą wyprawę z +15 złota na poziom.',
  'Start each fight with +3 block per level.': 'Zaczynaj każdą walkę z +3 pkt Bloku na poziom.',
  'Your Flare draws 1 more card per level.': 'Twój Rozbłysk dobiera 1 kartę więcej na poziom.',
  'Luck: lucky cards double 5% more often and unlucky ones fizzle 5% less often, per level.': 'Szczęście: karty Szczęśliwe działają podwójnie o 5% częściej, a Pechowe zawodzą o 5% rzadziej, na poziom.',
  'Resting heals 5% more of your max HP per level.': 'Odpoczynek leczy o 5% maks. HP więcej na poziom.',

  // settings
  'Language': 'Język', 'Timed cards': 'Karty z wyczuciem', 'Timing speed': 'Prędkość paska',
  'The language of the whole game.': 'Język całej gry.',
  'Timed cards open a timing bar when played. Turn off to play them with a fixed, average result.': 'Karty z wyczuciem otwierają przy zagraniu pasek wyczucia. Wyłącz, aby grać je ze stałym, średnim wynikiem.',
  'How fast the cursor moves. Normal is the hard base setting. Lower = slower and easier, higher = even harder.': 'Jak szybko porusza się kursor. Normalna to trudne ustawienie bazowe. Niżej = wolniej i łatwiej, wyżej = jeszcze trudniej.',
  'Normal': 'Normalna',

  // heroes
  'Lamplighter': 'Latarniczka', 'Keeper of the last lantern': 'Strażniczka ostatniej latarni',
  'A small girl with a big lantern. She goes down where no light reaches, throwing cards like sparks and shielding herself with lamplight.':
    'Mała dziewczyna z wielką latarnią. Schodzi tam, gdzie nie dociera żadne światło, rzuca kartami jak iskrami i osłania się blaskiem lampy.',

  // card sets
  'Creeping Rot': 'Pełzająca Zgnilizna', 'Slow Fuse': 'Długi Lont', 'Night Watch': 'Nocna Warta', 'Wildfire': 'Pożoga', 'Ricochet': 'Rykoszet',
  'Dice and Chaos': 'Kości i Chaos', 'Grab Bag': 'Worek Niespodzianek', 'Blood Price': 'Cena Krwi', 'Iron Wick': 'Żelazny Knot', 'Hexes': 'Klątwy',
  'Kiln Heart': 'Serce Pieca', 'Dreamers': 'Śniący', 'Four-Leaf': 'Czterolistna', 'Black Cat': 'Czarny Kot', 'Jester': 'Błazen',
  "Jester's Court": 'Dwór Błazna', 'Heirlooms': 'Pamiątki Rodowe', 'The Hoard': 'Skarbczyk', 'Last Flare': 'Ostatni Rozbłysk', 'Final Stand': 'Ostatni Bastion',
  'Overflow': 'Przelew', 'Deep Overflow': 'Głęboki Przelew', 'Supply Run': 'Wyprawa po Zapasy', 'Grand Packs': 'Wielkie Paczki',
  'Poison that spreads and grows.': 'Trucizna, która się szerzy i rośnie.',
  'Attacks and energy that land next turn.': 'Ataki i Energia, które działają w następnej turze.',
  'Block and cards that wait for next turn.': 'Blok i karty, które czekają na następną turę.',
  'Fire that hits every enemy.': 'Ogień, który trafia każdego wroga.',
  'Hits that bounce to random enemies.': 'Trafienia odbijające się do losowych wrogów.',
  'Random numbers, big swings.': 'Losowe liczby, duże wahania.',
  'Cards that make more cards.': 'Karty, które tworzą kolejne karty.',
  'Pay with HP for raw power.': 'Płać zdrowiem za czystą siłę.',
  'Stack block and turn it into damage.': 'Zbieraj Blok i zamieniaj go w obrażenia.',
  'Weaken and expose your enemies.': 'Osłabiaj i odsłaniaj wrogów.',
  'Powers that keep the fire burning.': 'Moce, które podtrzymują ogień.',
  'Powers that give energy and cards.': 'Moce, które dają Energię i karty.',
  'Lucky cards: sometimes they play twice.': 'Karty Szczęśliwe: czasem działają dwa razy.',
  'Unlucky cards: cheap and strong, but they can fizzle.': 'Karty Pechowe: tanie i mocne, ale mogą zawieść.',
  'Joker cards: nothing or double.': 'Jokery: nic albo podwójnie.',
  'Bigger jokers for braver players.': 'Większe Jokery dla odważniejszych.',
  'Keep cards that stay in your hand.': 'Karty z Zatrzymaniem, które zostają w ręce.',
  'More Keep cards to save for later.': 'Więcej kart z Zatrzymaniem na później.',
  'Single-use cards with huge numbers.': 'Karty Jednorazowe z ogromnymi liczbami.',
  'More single-use tricks.': 'Więcej jednorazowych sztuczek.',
  'X cards: spend all your energy.': 'Karty X: wydaj całą Energię.',
  'More X cards for every kind of turn.': 'Więcej kart X na każdą turę.',
  'Packs that hand you fresh cards.': 'Paczki, które dają świeże karty.',
  'Bigger and stranger packs.': 'Większe i dziwniejsze paczki.',

  // merchant services, timing ratings, upgrade words
  'Remove a card': 'Usuń kartę', 'Upgrade a card': 'Ulepsz kartę', 'Pierce a card': 'Przekłuj kartę',
  'Take a card out of your deck for good. Each removal costs more.': 'Usuń kartę z talii na zawsze. Każde kolejne usunięcie kosztuje więcej.',
  'One card costs 1 less, or its effects get stronger.': 'Jedna karta kosztuje 1 mniej albo jej efekty stają się silniejsze.',
  'Pick one of 3 piercings, then the card to pierce.': 'Wybierz jedno z 3 przekłuć, a potem kartę do przekłucia.',
  'PERFECT!': 'IDEALNIE!', 'Great': 'Świetnie', 'Good': 'Dobrze', 'Miss': 'Pudło',
  'damage': 'obrażeń', 'block': 'Bloku', 'card draw': 'dobierania', 'energy': 'Energii', 'healing': 'leczenia', 'strength': 'Siły', 'stacks': 'ładunków', 'cards': 'kart',
});
