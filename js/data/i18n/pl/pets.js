// POLISH: pets (data/petsData.js), their events (data/petEventsData.js) and labels.
Game.I18N.add('pl', {
  // pet names and card names
  'Magpie': 'Sroka', 'Ember Salamander': 'Żarowa Salamandra', 'Cave Snail': 'Ślimak Jaskiniowy', 'Coffer Pup': 'Skrzyniak',
  'Pack Rat': 'Szczur Zbieracz', 'Night Owl': 'Nocna Sowa', 'Glowworm': 'Świetlik', 'Magpie Call': 'Wezwanie Sroki',
  // tricks
  'Shiny!': 'Błyskotka!', 'Stoke': 'Podsycanie', 'Slow Shell': 'Wolna Skorupa', 'Hoarder': 'Chomik', 'Stash': 'Schowek',
  'Night Eyes': 'Nocne Oczy', 'Steady Glow': 'Spokojny Blask', 'Companion': 'Towarzysz', 'Its card': 'Jego karta',
  'At the start of your turn it eyes one card in your hand. Play that card this turn to draw 1 card.':
    'Na początku twojej tury upatruje sobie jedną kartę w twojej ręce. Zagraj ją w tej turze, aby dobrać 1 kartę.',
  'Every Attack you play gives it 1 heat. At 4 heat it breathes fire: 5 damage to ALL enemies.':
    'Każdy zagrany Atak daje jej 1 żaru. Przy 4 żaru zieje ogniem: 5 pkt obrażeń WSZYSTKIM wrogom.',
  'Its block never fades. At the end of your turn it gains 3 block (up to 12).':
    'Jego Blok nigdy nie znika. Na koniec twojej tury zyskuje 3 pkt Bloku (maks. 12).',
  'Each time an enemy hits it, you gain 3 gold. If it is still standing when you win, gain 6 more.':
    'Za każdym razem, gdy wróg go trafi, zyskujesz 3 złota. Jeśli przetrwa do wygranej, zyskujesz jeszcze 6.',
  'When you end your turn, it hides one random card you did not play. It brings it back next turn, on top of your normal draw.':
    'Gdy kończysz turę, chowa jedną losową niezagraną kartę. Oddaje ją w następnej turze, oprócz zwykłego dobierania.',
  'You always see enemy intents, even when your lantern is dark. When you end your turn it pecks the enemy planning the biggest attack for 4.':
    'Zawsze widzisz zamiary wrogów, nawet gdy latarnia zgaśnie. Na koniec twojej tury dziobie wroga szykującego największy atak za 4.',
  'The timing bar moves slower while it is out. A Great or Perfect timing makes it spark: 4 damage to ALL enemies.':
    'Pasek wyczucia porusza się wolniej, gdy świetlik jest z tobą. Świetne lub Idealne wyczucie sprawia, że iskrzy: 4 pkt obrażeń WSZYSTKIM wrogom.',
  'A pet fights beside you for this fight. Enemies attack it before you; damage beyond its HP carries on to you. Play its card again to heal it.':
    'Zwierzak walczy u twego boku przez tę walkę. Wrogowie atakują go przed tobą; obrażenia ponad jego HP przechodzą na ciebie. Zagraj jego kartę ponownie, aby go uleczyć.',
  // card texts
  'Summon a Magpie ({n} HP). It marks a card each turn: play it to draw {n2}.': 'Przywołaj Srokę ({n} HP). Co turę oznacza kartę: zagraj ją, by dobrać {n2}.',
  'Summon a Salamander ({n} HP). Every {n2}th Attack: {n3} damage to ALL.': 'Przywołaj Salamandrę ({n} HP). Co {n2}. Atak: {n3} pkt obrażeń WSZYSTKIM.',
  'Summon a Snail ({n} HP). Gains {n2} block each turn. Its block stays.': 'Przywołaj Ślimaka ({n} HP). Co turę zyskuje {n2} pkt Bloku. Jego Blok zostaje.',
  'Summon a Coffer Pup ({n} HP). Gain {n2} gold when it is hit.': 'Przywołaj Skrzyniaka ({n} HP). Zyskaj {n2} złota, gdy oberwie.',
  'Summon a Pack Rat ({n} HP). It saves one unplayed card each turn.': 'Przywołaj Szczura Zbieracza ({n} HP). Co turę zachowuje jedną niezagraną kartę.',
  'Summon an Owl ({n} HP). Turn end: pecks the biggest attacker for {n2}.': 'Przywołaj Sowę ({n} HP). Koniec tury: dziobie najgroźniejszego wroga za {n2}.',
  'Summon a Glowworm ({n} HP). Slower timing bar. Great timing: {n2} to ALL.': 'Przywołaj Świetlika ({n} HP). Wolniejszy pasek wyczucia. Świetne wyczucie: {n2} WSZYSTKIM.',
  // events
  'A Nest of Trinkets': 'Gniazdo Błyskotek', 'The Ember Hollow': 'Żarowa Niecka', 'A Mossy Ledge': 'Omszała Półka', 'The Rattling Coffer': 'Grzechocząca Skrzynka',
  "The Packrat's Burrow": 'Nora Zbieracza', 'Eyes in the Rafters': 'Oczy pod Belkami', 'The Glowing Pool': 'Świecąca Sadzawka',
  'A nest wedged in a crack, woven from wire and buttons. A magpie stares at the shiny buckle on your boot, then at you.':
    'Gniazdo wciśnięte w szczelinę, uplecione z drutu i guzików. Sroka wpatruje się w błyszczącą klamrę twojego buta, a potem w ciebie.',
  'Coals glow in a hollow in the rock. One of them blinks. A small salamander curls around your lantern, warming itself.':
    'W skalnym zagłębieniu żarzą się węgle. Jeden z nich mruga. Mała salamandra owija się wokół twojej latarni i grzeje się.',
  'A snail the size of your fist is crossing a ledge. It has been crossing it, you suspect, for a very long time.':
    'Ślimak wielkości twojej pięści przechodzi przez skalną półkę. Podejrzewasz, że przechodzi przez nią od bardzo dawna.',
  'A small chest hops after you on stubby legs, coins jingling inside. When you stop, it stops. When you turn, it wags its lid.':
    'Mała skrzynka kica za tobą na krótkich nóżkach, w środku brzęczą monety. Gdy stajesz, ona też. Gdy się odwracasz, merda wiekiem.',
  'A burrow full of things that once belonged to someone: spoons, keys, a single card. A rat with a tiny satchel blocks the way.':
    'Nora pełna rzeczy, które kiedyś do kogoś należały: łyżki, klucze, jedna karta. Drogę zastępuje szczur z malutką torbą.',
  'Two golden eyes watch you from an old mine beam. An owl, hurt in one wing, hops down when you set your lantern low.':
    'Dwoje złotych oczu patrzy na ciebie ze starej belki kopalnianej. Sowa z rannym skrzydłem zeskakuje, gdy opuszczasz latarnię.',
  'The ceiling is full of tiny green lights. One drifts down on a silk thread and lands in your palm, blinking in a slow, calm rhythm.':
    'Sklepienie pełne jest maleńkich zielonych światełek. Jedno zjeżdża na jedwabnej nitce i ląduje na twojej dłoni, mrugając w wolnym, spokojnym rytmie.',
  'Give it the buckle': 'Daj jej klamrę', 'Rob the nest': 'Obrabuj gniazdo', 'Feed it oil': 'Nakarm ją olejem', 'Warm yourself': 'Ogrzej się',
  'Carry it along': 'Zabierz go ze sobą', 'Eat the moss': 'Zjedz mech', 'Let it follow': 'Pozwól mu iść za tobą', 'Shake it out': 'Wytrząśnij go',
  'Trade a card for its trust': 'Oddaj kartę za jego zaufanie', 'Take the card it keeps': 'Weź kartę, którą trzyma', 'Bind its wing': 'Opatrz jej skrzydło',
  'Climb to its perch': 'Wespnij się na jej grzędę', 'Keep it': 'Zatrzymaj go', 'Read the lights': 'Odczytaj światła',
  'Lose {n} gold. The Magpie joins you (adds Magpie Call to your deck).': 'Strać {n} złota. Sroka dołącza do ciebie (dodaje Wezwanie Sroki do talii).',
  'Gain {n} gold.': 'Zyskaj {n} złota.', 'Spend {n} oil. The Ember Salamander joins you.': 'Wydaj {n} oleju. Żarowa Salamandra dołącza do ciebie.',
  'Heal {n} HP.': 'Ulecz {n} HP.', 'The Cave Snail joins you.': 'Ślimak Jaskiniowy dołącza do ciebie.', '+{n} max HP.': '+{n} maks. HP.',
  'Lose {n} HP (it bites, once). The Coffer Pup joins you.': 'Strać {n} HP (gryzie, raz). Skrzyniak dołącza do ciebie.',
  'Gain {n} gold. It runs off, offended.': 'Zyskaj {n} złota. Ucieka obrażony.',
  'Remove a card from your deck. The Pack Rat joins you.': 'Usuń kartę z talii. Szczur Zbieracz dołącza do ciebie.',
  'Add a Rummage to your deck.': 'Dodaj Szperanie do talii.', 'Lose {n} HP. The Night Owl joins you.': 'Strać {n} HP. Nocna Sowa dołącza do ciebie.',
  'Gain {n} oil.': 'Zyskaj {n} oleju.', 'The Glowworm joins you.': 'Świetlik dołącza do ciebie.',
  'Upgrade a card of your choice. Lose {n} HP.': 'Ulepsz wybraną kartę. Strać {n} HP.',
  '{name} joins you. Added to your deck: {card}': '{name} dołącza do ciebie. Dodano do talii: {card}',
});
