// DIFFICULTY MODES (data only)
// Picked in Settings (the option is added to Game.SETTINGS_DEF below; kupka: not on the hero select screen),
// applied to every enemy at the start of each fight by js/combat/difficulty.js.
// Numbers are multipliers on the enemies' base stats (enemiesData.js), on top of group scaling.
//   hp    enemy max HP            (the main lever: kupka wants harder fights, not one-shots)
//   dmg   enemy attack damage and block gain (raised only a little)
// "Damage taken per fight" grows roughly with hp x dmg (longer fights x harder hits):
//   Easy 0.90 x 0.95 = 0.86   Normal 1.12 x 1.07 = 1.20 (the old game +20%)
//   Hard 1.28 x 1.12 = 1.43   Expert 1.45 x 1.17 = 1.70   Absurd 1.70 x 1.25 = 2.13
// New mode = one entry here (order = order in Settings) + its Polish name in data/i18n/pl/difficulty.js.
Game.DIFFICULTIES = {
  easy:   { name: 'Easy',   color: '#6fcf7a', hp: 0.90, dmg: 0.95, text: 'A gentler descent. Enemies are a bit weaker than in the old game.' },
  normal: { name: 'Normal', color: '#e8c840', hp: 1.12, dmg: 1.07, text: 'The intended challenge: about 20% harder than the old game.' },
  hard:   { name: 'Hard',   color: '#e8944a', hp: 1.28, dmg: 1.12, text: 'Enemies have much more HP and hit a little harder.' },
  expert: { name: 'Expert', color: '#e05a5a', hp: 1.45, dmg: 1.17, text: 'For players who know every card. Long, dangerous fights.' },
  absurd: { name: 'Absurd', color: '#b05ae0', hp: 1.70, dmg: 1.25, text: 'Barely possible. Enemies are huge and hit hard.' },
};
Game.DIFFICULTY_DEFAULT = 'normal';

// The Settings option (ui/viewers/settingsViewer.js). Stored as setting 'difficulty'; a change counts from the next fight.
Game.SETTINGS_DEF.push({
  id: 'difficulty', type: 'steps', default: Game.DIFFICULTY_DEFAULT, values: Object.keys(Game.DIFFICULTIES),
  format: v => Game.DIFFICULTIES[v].name, label: 'Difficulty',
  text: 'Easy, Normal, Hard, Expert or Absurd. Higher modes give enemies much more HP and a little more damage. Counts from the next fight.',
});
