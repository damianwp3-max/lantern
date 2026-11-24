// CAMP SCENE (data only)
// How the rest site looks: the hero by a small campfire with a tent, inside
// the cave of the current level (ui/campScene.js draws it, css/camp.css moves it).
//   layout: left edge of each prop in % of the scene width
//   heroSize: hero height in px
Game.CAMP = {
  layout: { tent: 14, fire: 50, hero: 64 },
  heroSize: 210,
  tent: { cloth: '#a8794a', clothShade: '#7a5432', clothLight: '#c99a62', door: '#1c120c', pole: '#4a3422', rope: '#c8b08a' },
  fire: { outer: '#ff7a2a', mid: '#ffb347', core: '#fff1b8', glow: '#ffb050', log: '#5a3a24', logEnd: '#c08a5a', stone: '#4a4652', stoneLight: '#6a6574' },
  embers: 10,
};
