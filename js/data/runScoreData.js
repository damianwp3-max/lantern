// RUN SCORE (data only)
// Points shown on the end-of-run screen (js/state/runScore.js counts them).
//   points.<what>   points for each one
//   ranks           title for the total, highest `min` that fits wins
Game.RUN_SCORE = {
  points: {
    floor: 5,          // every floor (map row) cleared
    fight: 10,         // normal fight won
    elite: 30,         // elite fight won
    boss: 120,         // boss beaten
    level: 60,         // whole level cleared
    card: 2,           // card added to the deck
    win: 300,          // reached the bottom (run won)
  },
  ranks: [
    { min: 0,    name: 'Lost Wanderer' },
    { min: 120,  name: 'Torch Bearer' },
    { min: 300,  name: 'Cave Delver' },
    { min: 600,  name: 'Deep Explorer' },
    { min: 1000, name: 'Lord of the Depths' },
  ],
};
