// SETTINGS DATA
// The options in the Settings window (ui/viewers/settingsViewer.js).
// Values are stored by state/settings.js. New option = one entry here.
//   type 'steps'  pick one of `values` (shown with `format`)
//   type 'toggle' on / off
Game.SETTINGS_DEF = [
  { id: 'language', type: 'steps', default: 'en', values: Object.keys(Game.LANGUAGES), format: v => Game.LANGUAGES[v].name, label: 'Language',
    text: 'The language of the whole game.' },
  { id: 'timingEnabled', type: 'toggle', default: true, label: 'Timed cards',
    text: 'Timed cards open a timing bar when played. Turn off to play them with a fixed, average result.' },
  { id: 'timingSpeed', type: 'steps', default: 1, values: [0.5, 0.65, 0.8, 1, 1.25, 1.5, 2], format: v => (v === 1 ? 'Normal' : '×' + v), label: 'Timing speed',
    text: 'How fast the cursor moves. Normal is the hard base setting. Lower = slower and easier, higher = even harder.' },
];
