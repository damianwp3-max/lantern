// UI THEME (data only): which panels get the gold corner filigree, and the
// ornament drawings. Used by js/ui/polish/ornaments.js; styles in css/ornaments.css.
//   frames      selector -> corner style ('gold' fine filigree, 'soft' small dots)
//   dividers    selector of headings that get a small flourish underneath
// New decorated panel = one line here.
Game.UI_THEME = {
  frames: {
    '.overlay-panel': 'gold',
    '.event-screen > .event-card': 'gold',
    '.message-panel': 'gold',
    '.menu-panel': 'gold',
    '.hs-info': 'gold',
    '.player': 'soft',
    '.enemy-plate, .enemy .plate': 'soft',
    '.reward-panel': 'gold',
    '.rest-option': 'soft',
    '.timing-panel': 'gold',
  },
  dividers: '.event-card h2, .message-panel h1, .rest-site > h2, .reward-panel h2, .menu-panel h1',
};

// Corner filigree, drawn for the top-left corner (the others are mirrored in CSS).
Game.UI_ORNAMENTS = {
  gold: `<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke-linecap="round">
    <path d="M3 24 V8 Q3 3 8 3 H24" stroke="currentColor" stroke-width="1.3"/>
    <path d="M8 30 V13 Q8 8 13 8 H30" stroke="currentColor" stroke-width=".8" opacity=".45"/>
    <path d="M13 13 Q20 12 20 18 Q20 22 16.5 22 Q13.5 22 14 19" stroke="currentColor" stroke-width="1.1"/>
    <path d="M3 28 Q3 33 7 34 M28 3 Q33 3 34 7" stroke="currentColor" stroke-width=".9" opacity=".7"/></g>
    <path d="M3 3 m0 -2.6 l2.6 2.6 l-2.6 2.6 l-2.6 -2.6z" fill="#fff0c0"/>
    <circle cx="13" cy="13" r="1.6" fill="currentColor"/></svg>`,
  soft: `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 12 V5 Q2 2 5 2 H12" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="2" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="2" r="1" fill="currentColor"/></svg>`,
  divider: `<svg viewBox="0 0 220 14" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M6 7 H88" stroke-width="1" opacity=".55"/><path d="M132 7 H214" stroke-width="1" opacity=".55"/>
    <path d="M88 7 Q98 1 104 7 Q98 13 88 7Z M132 7 Q122 1 116 7 Q122 13 132 7Z" stroke-width="1"/></g>
    <path d="M110 1.5 l5.5 5.5 l-5.5 5.5 l-5.5 -5.5z" fill="currentColor"/><circle cx="6" cy="7" r="1.4" fill="currentColor"/><circle cx="214" cy="7" r="1.4" fill="currentColor"/></svg>`,
};
