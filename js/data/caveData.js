// CAVE BACKDROPS: the look of the battle background on each level (ui/caveBackdrop.js draws it).
// Index = level index (0, 1, 2). Levels without an entry use the last one.
//   sky / rock / floor   gradient colors, back to front
//   glow                 color of moss / crystals on the walls
//   light                lantern light color
//   motes                floating particles: 'spores' | 'bubbles' | 'embers'
//   lanterns             how many hanging lanterns
//   crystals             true: crystal clusters instead of moss
//   water                true: a dark pool with reflections on the floor
Game.CAVES = [
  { name: 'Root Cellar',  sky: '#16120f', rock: '#2a211a', rock2: '#1d1712', floor: '#2b2219',
    glow: '#8fe07a', light: '#ffc46a', motes: 'spores', lanterns: 2, roots: true },
  { name: 'Drowned Halls', sky: '#0b1418', rock: '#17262c', rock2: '#101b20', floor: '#16252a',
    glow: '#5fe3e0', light: '#bfe8ff', motes: 'bubbles', lanterns: 2, crystals: true, water: true },
  { name: 'Ember Vault',  sky: '#170b09', rock: '#2e1612', rock2: '#200f0c', floor: '#2a1410',
    glow: '#ff8a3a', light: '#ffb060', motes: 'embers', lanterns: 3, crystals: true },
];
