// TURN FLOW TIMING (data)
// How long each beat of the end-of-turn sequence takes, in milliseconds.
// Order (app/actions/endTurnActions.js): your leftover cards fly to the discard pile
// -> the Bat bites (and end-of-turn effects fire) -> each enemy takes its turn, one by one
// -> only then do you draw your new hand. Each beat waits for the one before it.
// Tweak the feel here; no code needs to change.
Game.TURN_FLOW = {
  discardFlyMs: 460,       // one card's flight to the discard pile
  discardStaggerMs: 70,    // delay between cards leaving the hand
  afterDiscardMs: 260,     // pause once the hand is gone
  strikeMs: 950,           // pause after the Bat bite / an end-of-turn effect that hit something
  quietMs: 180,            // pause after your turn ends when nothing hit anything
  enemyStepMs: 850,        // each enemy's turn (lunge, shield, glow) plays out this long
  beforeDrawMs: 250,       // short breath after the last enemy, before new cards are drawn
  drawFlyMs: 720,          // one drawn card's flight from the draw pile (was 380)
  drawStaggerMs: 130,      // delay between drawn cards (was 60)
};
