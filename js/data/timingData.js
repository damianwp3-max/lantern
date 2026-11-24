// TIMING DATA (Timed cards)
// A Timed card opens a bar. A cursor sweeps back and forth across it (it
// bounces off the ends) until you stop it with Space / Enter / click. There is
// no time limit: only your click ends it. The closer to the middle, the better.
//   sweepMs   how long the cursor takes to cross the bar once at normal speed (the
//             "Timing speed" setting in Settings divides this). Lower = harder.
//   readyMs   short pause before the cursor starts moving
//   ratings   best first. maxDist is the distance from the middle (0 = dead
//             centre, 1 = bar edge) up to which the rating counts.
//             mult scales the card's damage / block. Cards that draw read
//             their own table (draw effect "byRating").
//   STANDARD FOR TIMED CARDS (kupka's rule): a timed card's printed number is the
//   MIDDLE of a +-50% swing (swing below). A basic attack deals 6, so a timed
//   attack deals 3-9: Miss = x0.5 (half), Good = x1, Perfect = x1.5. The card text
//   just prints the range ("Deal 3-9 damage."); it never mentions timing. The hover
//   panel beside the card explains it (ui/tipText.js). Keep new timed cards to this.
//   The scoring part of the bar is small (about 15% of its width in total).
// The speed option in Settings eases or hardens the sweep.
Game.TIMING = {
  swing: 0.5,        // timed cards go this much below / above their normal number
  sweepMs: 950,
  readyMs: 450,
  ratings: [
    { id: 'perfect', label: 'PERFECT!', maxDist: 0.03, mult: 1.5,  color: '#ffe066' },
    { id: 'great',   label: 'Great',    maxDist: 0.06, mult: 1.25, color: '#7fe08a' },
    { id: 'good',    label: 'Good',     maxDist: 0.10, mult: 1,    color: '#8ab0e8' },
    { id: 'ok',      label: 'Weak',     maxDist: 0.15, mult: 0.75, color: '#d9a06a' },
    { id: 'miss',    label: 'Miss',     maxDist: Infinity, mult: 0.5, color: '#e0645a' },
  ],
  // Used when timing is switched off in Settings: every Timed card counts as this.
  offRating: 'good',
};
