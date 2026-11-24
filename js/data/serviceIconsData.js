// SERVICE ICONS (data only)
// Colors for the big option icons at rest sites and merchant services
// (drawn by js/ui/serviceIcons.js, sized in css/serviceIcons.css).
//   heal:    three green plus signs, one big and two smaller ones
//            (pluses: [center x, center y, size] in a 48x48 box, biggest first)
//   upgrade: a small card with an arrow pointing up
Game.SERVICE_ICONS = {
  heal: {
    fill: '#5fd06e', light: '#b6f5bd', edge: '#1d4a25',
    pluses: [[19, 29, 26], [36, 15, 15], [40, 33, 9]],
  },
  upgrade: {
    card: '#2b2535', cardEdge: '#e0b04a', panel: '#3c3350', panelEdge: '#6f5d8a',
    arrow: '#7ee08a', arrowLight: '#c9f7cf', arrowEdge: '#173d1f',
  },
};
