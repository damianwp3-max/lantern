// STATUS ICONS
// Small SVG pictures for statuses, strength and "next turn" effects (no emoji).
//   Game.UI.statusIcons.render(id, size, color)  -> '<svg ...>' (falls back to the text icon)
//   Game.UI.statusIcons.has(id)
// New status = add a drawing here under its id from data/statusesData.js.
// Drawings use a 24 x 24 box; c = the status color.
Game.UI = Game.UI || {};

Game.UI.statusIcons = (function () {
  const draw = {
    // Might (enemy buff): a clenched claw with an up arrow.
    might: c => `
      <path d="M12 2.5 L18 9 H14.5 V13 H9.5 V9 H6Z" fill="${c}" stroke="#0d0c10" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M5 15 Q5 12.5 7.5 12.5 H16.5 Q19 12.5 19 15 V18 Q19 21.5 15.5 21.5 H8.5 Q5 21.5 5 18Z" fill="${c}" fill-opacity=".85" stroke="#0d0c10" stroke-width="1.1"/>
      <path d="M9 13 V16.5 M12 13 V16.5 M15 13 V16.5" stroke="#0d0c10" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M7.4 18.4 Q8 20 10 20.2" stroke="#fff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".6"/>`,
    // Poison: a dripping drop with bubbles.
    poison: c => `
      <path d="M12 2.5 C8 8 5.5 11 5.5 14.5 A6.5 6.5 0 0 0 18.5 14.5 C18.5 11 16 8 12 2.5Z" fill="${c}" fill-opacity=".9" stroke="#0d0c10" stroke-width="1.2"/>
      <circle cx="9.6" cy="14.2" r="1.7" fill="#0d0c10" opacity=".55"/><circle cx="14.2" cy="16.6" r="1.2" fill="#0d0c10" opacity=".55"/>
      <path d="M9 10.5 Q10 8.5 11.2 7.6" stroke="#fff" stroke-width="1.2" stroke-linecap="round" fill="none" opacity=".7"/>`,
    // Weak: a sword pointing down, snapped in the middle.
    weak: c => `
      <g transform="rotate(180 12 12)">
        <path d="M12 2 L14.4 5 L14.4 8.6 L9.6 9.8 L9.6 5Z" fill="${c}" stroke="#0d0c10" stroke-width="1"/>
        <path d="M9.6 11.4 L14.4 10.2 L14.4 15 L9.6 15Z" fill="${c}" stroke="#0d0c10" stroke-width="1"/>
        <path d="M6 15.5 H18 V17.6 H6Z M10.7 17.6 H13.3 V21.8 H10.7Z" fill="${c}" stroke="#0d0c10" stroke-width=".9"/>
      </g>
      <path d="M8 13 L16 11" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>`,
    // Frail: a shield with a crack through it.
    frail: c => `
      <path d="M12 2.5 L19.5 5.2 L19 12 Q17.6 18 12 21.5 Q6.4 18 5 12 L4.5 5.2Z" fill="${c}" fill-opacity=".85" stroke="#0d0c10" stroke-width="1.2"/>
      <path d="M12.6 3.6 L10.6 8.4 L13.6 11 L10.4 14.6 L12.4 20.2" stroke="#0d0c10" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
      <path d="M7 6.6 L7.4 11" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>`,
    // Vulnerable: a cracked target, open to hits.
    vulnerable: c => `
      <circle cx="12" cy="12" r="9" fill="${c}" fill-opacity=".25" stroke="${c}" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="none" stroke="${c}" stroke-width="2"/>
      <circle cx="12" cy="12" r="1.8" fill="${c}"/>
      <path d="M12 2 L13.4 6.4 L10.8 9 L12.6 12 M22 12 L17.6 13 L15.4 11" stroke="#0d0c10" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    // Strength: a raised blade with a spark.
    strength: c => `
      <path d="M12 2 L14.2 5 L14.2 15 L9.8 15 L9.8 5Z" fill="${c}" stroke="#0d0c10" stroke-width="1"/>
      <path d="M6.5 15.5 H17.5 V17.5 H6.5Z M10.8 17.5 H13.2 V21.5 H10.8Z" fill="${c}" stroke="#0d0c10" stroke-width=".9"/>
      <path d="M12 4.5 V13.5" stroke="#fff" stroke-width=".9" opacity=".7"/>`,
    // Next turn effects: an hourglass.
    delayed: c => `
      <path d="M6 3 H18 M6 21 H18" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
      <path d="M7.5 3.5 Q7.5 9 12 12 Q16.5 9 16.5 3.5Z M7.5 20.5 Q7.5 15 12 12 Q16.5 15 16.5 20.5Z" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="1.5"/>
      <path d="M9.5 19.5 Q12 16 14.5 19.5Z" fill="${c}"/>`,
  };

  const has = id => !!draw[id];
  // Other files add drawings for their statuses (e.g. ui/enemyTraitIcons.js).
  const register = (id, fn) => { draw[id] = fn; };

  function render(id, size = 18, color) {
    const def = (Game.STATUSES && Game.STATUSES[id]) || {};
    const c = color || def.color || '#cfc8d8';
    if (!draw[id]) return `<span class="st-glyph">${def.icon || '?'}</span>`;
    return `<svg class="st-svg st-svg-${id}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${draw[id](c)}</svg>`;
  }

  return { render, has, register };
})();
