// CHARACTER POSES (data only)
// Which pose the heroine plays, and how long each one lasts (ms).
// The animations themselves are in css/characterPoses.css; js/ui/characterPoses.js plays them.
//   byCardType: card type (data/cardTypesData.js) -> pose played when a card of that type is played
//   onHit / onWin: pose when she loses HP / when a fight is won
// A new pose = one entry in `poses` + its keyframes in css/characterPoses.css.
Game.CHARACTER_POSES = {
  poses: {
    throw:  { ms: 520 },
    defend: { ms: 700 },
    cast:   { ms: 650 },
    hurt:   { ms: 450 },
    cheer:  { ms: 900 },
  },
  byCardType: { attack: 'throw', hybrid: 'throw', defense: 'defend', skill: 'cast', power: 'cast' },
  onHit: 'hurt',
  onWin: 'cheer',
  // Attacks are thrown: the card flies from the hand to her hand, she throws it
  // at the enemy. These are the two flight times (ms).
  throwTiming: { toHand: 170, toEnemy: 200 },
};
