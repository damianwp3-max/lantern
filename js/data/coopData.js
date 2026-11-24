// CO-OP DATA (2-player co-op against the enemies)
// All the numbers and settings of the 2PvE mode live here; the rules are in js/coop/*.js,
// the network in js/net/*.js, the screens in js/ui/coop/*.js.
Game.COOP = {
  // Where the relay server is. '' = the same address the page was opened from
  // (when the page is served by server/server.js), otherwise the player types it in the lobby panel.
  serverKey: 'lantern_descent_relay_url',
  defaultServer: 'localhost:8080',
  codeLength: 5,

  cursorSendMs: 45,          // how often your mouse position is sent to the teammate
  cursorFadeMs: 2500,        // the teammate's cursor fades when idle this long
  cursorColors: ['#ffd35a', '#6fd0ff'],   // seat 0 (host), seat 1 (guest)
  seatNames: ['Player 1', 'Player 2'],

  // Battlefield look: both heroes are slightly see-through.
  selfOpacity: 0.88,
  allyOpacity: 0.62,

  reviveHpPct: 0.35,         // a fallen hero wakes up with this share of max HP after the fight is won
  busyRetryMs: 120,          // a partner click that arrives during an animation is retried this often
  busyRetries: 25,

  // Enemy scaling for 2 players (applied at the start of every co-op fight, once).
  // Balance maths (solo = 1.0, "solo fight length" L, damage taken per hero D):
  //  - Two decks deal ~2x damage per round, so 2.0x HP keeps the fight as long as solo (parity).
  //  - Each enemy attack hits BOTH allies, so damage per round on the pair is 2x of solo,
  //    shared by 2 health pools: per-hero damage = 2.0 / 2 = 1.0 of solo at parity.
  //  - On top of parity we want co-op to be clearly harder (synergy, shared draws, two blocks):
  //    hp 2.2 -> fight lasts 1.1x longer; dmg 1.0 -> hits are NOT heavier.
  //    Damage taken per hero over the fight = 1.1 * 1.0 = ~1.1x solo.
  //  - Bosses already carry x1.6 HP / x1.3 dmg solo, so they get the same multipliers.
  // Set both to 1 for no scaling.
  scaling: {
    hpMult: 2.2,             // normal and elite enemies
    bossHpMult: 2.2,         // bosses (they already carry the solo boss multiplier)
    dmgMult: 1.0,            // damage of every enemy attack (also scales enemy block)
    extraEnemyChance: 0,     // reserved: chance of one extra enemy in normal fights (not used yet)
  },
};
