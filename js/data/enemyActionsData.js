// ENEMY ACTION VISUALS (data)
// Which visual an enemy's move gets, by move type (see ui/juice/enemyActionFx.js).
//   kind    'attack' (lunge + slash on the victim) | 'block' (shield on the enemy) | 'buff' (glow + rising sparks)
//   colors  particle / glow colors for that kind
// A move that also carries selfBlock gets the 'block' visual too. New move type = one line here.
Game.ENEMY_ACTION_FX = {
  moveKinds: {
    attack: 'attack', explode: 'attack', steal: 'attack', stealGold: 'attack', drainOil: 'attack',
    block: 'block', protect: 'block',
    buff: 'buff', heal: 'buff', summon: 'buff',
    addCard: 'junk',   // the junk cards fly from the enemy to the pile they land in
  },
  kinds: {
    attack: { colors: ['#ff5a4a', '#ffd0c0', '#fff'] },
    block:  { colors: ['#7aa8ff', '#cfe0ff'] },
    buff:   { colors: ['#ffb347', '#ffe066', '#ff7a3a'] },
    junk:   { colors: ['#a8d88a', '#6f9a4a', '#e8f0c8'], flyMs: 800, staggerMs: 170 },
  },
  staggerMs: 420,   // delay between enemies acting one after another
};
