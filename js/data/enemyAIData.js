// ENEMY AI (data only)
// How enemies choose their next move (rules: js/combat/enemyAI.js).
// Every move has a ROLE, worked out from its type (or set by hand with  role: '...'):
//   attack   type 'attack'
//   block    type 'block'
//   debuff   type 'debuff' or 'addCard'  (curses you / clogs your deck)
//   buff     type 'buff'                 (makes itself or its friends stronger)
// An enemy walks through a RHYTHM of roles (a role it has no moves for is skipped),
// picking a random move of that role (never the same move twice in a row).
// Buffs are rare: they may replace a step only now and then (buffChance, buffCooldown).
// An enemy can set its own  rhythm: [...]  in data/enemiesData.js, or  ai: 'cycle'
// to simply loop through its moves in order (the old behaviour).
Game.ENEMY_AI = {
  rhythm: ['debuff', 'attack', 'block', 'attack'],
  firstTurnSkipsBuff: true,
  buffChance: 0.25,      // chance a step becomes a buff, once the cooldown is over
  buffCooldown: 4,       // turns between two buffs
  randomStart: true,     // each enemy starts at a random point of its rhythm (fights feel less samey)
};
