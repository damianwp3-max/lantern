// HAIR WIND (data): the six strands of the heroine's long hair, seen from the back (battle view).
// kupka's spec: all six blow the SAME way at the SAME time (one shared gust), and once they are
// over to the side each strand wiggles softly on its own (own speed, size and phase).
// Geometry is in the character's viewBox (200 x 350); rules and drawing: js/ui/hairWind.js.
Game.HAIR_WIND = {
  period: 6.5,          // seconds for one gust: blow over, hold and wiggle, settle back
  gust: [0.16, 0.30],   // part of the period spent blowing over (from, to)
  hold: 0.70,           // the hold ends here, then the strands settle back
  top: 126,             // where the strands start (y); above it is the solid mass of hair
  knee: 168,            // where each strand bends (the lower half swings more)
  // One entry per strand, left to right: x range at the top, tip point,
  // gust angle (deg, + blows to the left), wiggle angle (deg), wiggles while held, phase (0..1).
  strands: [
    { x: [69.5, 80.5],  tip: [74, 213],  angle: 5.5, wiggle: 1.8, wiggles: 4, phase: 0.00 },
    { x: [79.5, 90.5],  tip: [84, 217],  angle: 4.6, wiggle: 1.4, wiggles: 6, phase: 0.35 },
    { x: [89.5, 100.5], tip: [95, 216],  angle: 4.2, wiggle: 2.0, wiggles: 3, phase: 0.70 },
    { x: [99.5, 110.5], tip: [105, 216], angle: 4.4, wiggle: 1.2, wiggles: 5, phase: 0.15 },
    { x: [109.5, 120.5], tip: [116, 217], angle: 4.9, wiggle: 1.7, wiggles: 7, phase: 0.55 },
    { x: [119.5, 130.5], tip: [126, 213], angle: 5.8, wiggle: 2.2, wiggles: 4, phase: 0.85 },
  ],
};
