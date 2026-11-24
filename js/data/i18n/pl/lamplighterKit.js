// POLISH: the Lamplighter's kit (data/heroes/lamplighterKit.js), her passive,
// the Stay / One-time keywords, the Bat and the hero-card unlocks.
Game.I18N.add('pl', {
  // card names
  'Vampire Bite': 'Ukąszenie Wampira', 'Bat Familiar': 'Nocny Chowaniec', 'Sanguine Thirst': 'Krwawe Pragnienie',
  'Crimson Rite': 'Szkarłatny Rytuał', 'Last Sip': 'Ostatni Łyk', 'Engorge': 'Przesyt', 'Crimson Feast': 'Szkarłatna Uczta',
  'Blood Lash': 'Krwawy Bicz', 'Blood Bond': 'Więź Krwi', 'Vampiric Speed': 'Wampirza Szybkość',
  // card text (whole texts and single sentences, so upgraded numbers still translate)
  'Summon a Bat ({n} HP). It copies your block and bites for {n2} at turn end.':
    'Przywołaj Nietoperza ({n} HP). Kopiuje twój Blok i gryzie za {n2} na koniec tury.',
  'Summon a Bat ({n} HP).': 'Przywołaj Nietoperza ({n} HP).',
  'It copies your block and bites for {n} at turn end.': 'Kopiuje twój Blok i gryzie za {n} na koniec tury.',
  'Whenever you play a card, heal {n} HP.': 'Gdy zagrywasz kartę, ulecz {n} HP.',
  'If it kills, heal HP equal to the damage dealt.': 'Jeśli zabije, ulecz tyle HP, ile zadała obrażeń.',
  'This fight, your healing can go above your max HP.': 'W tej walce leczenie może przekroczyć twoje maks. HP.',
  'Whenever you heal, your Bat heals the same.': 'Gdy się leczysz, twój Nietoperz leczy się tak samo.',
  'Whenever your Bat heals, so do you.': 'Gdy Nietoperz się leczy, ty też.',
  'Whenever you heal, your Bat heals the same. Whenever your Bat heals, so do you.': 'Gdy się leczysz, twój Nietoperz leczy się tak samo. Gdy Nietoperz się leczy, ty też.',
  'Take another turn before enemies act.': 'Rozegraj kolejną turę, zanim wrogowie zadziałają.',
  'Stay.': 'Zostaje.',
  // powers
  'Your healing can go above your max HP this fight. Extra HP fades when the fight ends.': 'W tej walce leczenie może przekroczyć twoje maks. HP. Nadmiar znika po walce.',
  // keywords
  'Stay': 'Zostaje', 'Bat': 'Nietoperz', 'Overheal': 'Nadleczenie', 'Bat passive': 'Pasywka Nietoperza', 'Ally': 'Sojusznik',
  'If you do not play it, it stays in your hand at the end of your turn instead of being discarded.': 'Jeśli jej nie zagrasz, na koniec tury zostaje w ręce zamiast trafić na stos odrzuconych.',
  'Can be played once per fight. After you play it, it is gone until the fight ends.': 'Można ją zagrać raz na walkę. Po zagraniu znika do końca walki.',
  'Your Bat flies beside you with 10 HP. Enemies always attack it first. It attacks your target for 3 when you end your turn and heals itself for the damage it deals (no HP limit), and gains all block you gain. Playing Bat Familiar again while it is out heals it 10 HP.':
    'Twój Nietoperz lata obok ciebie i ma 10 HP. Wrogowie zawsze atakują go pierwszego. Na koniec twojej tury atakuje twój cel za 3 i leczy się o zadane obrażenia (bez limitu HP), a także zyskuje cały Blok, który zyskujesz ty. Ponowne zagranie Nocnego Chowańca, gdy Nietoperz żyje, leczy go o 10 HP.',
  'Its HP can go above its max with no limit. Each bite heals it for the damage it deals.': 'Jego HP może bez limitu przekroczyć maksimum. Każde ugryzienie leczy go o zadane obrażenia.',
  'Enemies always attack it first. It bites your target for {n} damage when you end your turn, and gains all block you gain.':
    'Wrogowie zawsze atakują go pierwszego. Na koniec twojej tury gryzie twój cel za {n} pkt obrażeń i zyskuje cały Blok, który zyskujesz ty.',
  // hero, passive
  'Vampiric Thirst': 'Wampirze Pragnienie', 'Heal 5% of all damage you deal.': 'Leczysz się o 5% wszystkich zadanych obrażeń.',
  'A pale noble of the night with a silver lantern. She drinks the life of everything she strikes and fights beside her loyal Bat.':
    'Blada szlachcianka nocy ze srebrną latarnią. Pije życie ze wszystkiego, co trafi, i walczy u boku wiernego Nietoperza.',
  // unlocks
  'Hero cards': 'Karty bohaterów', '{n} cards per level gained while playing this hero.': '{n} karty za każdy poziom zdobyty tą postacią.',
  'New {name} cards': 'Nowe karty: {name}',
});
Game.I18N.addContent('pl', 'keywords', {
  stay: { match: ['Zostaje'], exact: true },
  bat: { match: ['Nietoperz'], forms: ['Nietoperza', 'Nietoperzowi'] },
});
