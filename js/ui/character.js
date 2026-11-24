// MAIN CHARACTER (UI)
// Draws the heroine from data/characterArt.js. The idle loop is pure CSS
// (css/character.css); one-shot poses come from ui/characterPoses.js.
// Click her to turn around (front <-> back). CSS classes use the "mc-" prefix.
//
//   Game.UI.character.render({ view, size, hit, poses })  -> HTML string
//     view:  'front' | 'back' (default 'front'). Battle uses 'back': she faces the enemies.
//     size:  height in px (default 240)
//     hit:   true plays the hurt pose once
//     poses: true lets poses (throw, defend, ...) play on this copy (battle)
//
// Screens re-render often. To keep the idle loop smooth instead of restarting
// it each time, every render sets a negative animation delay (--mc-t) equal
// to the time since the page loaded, so the loop carries on where it was.
// Running poses carry on the same way (--mc-p).
Game.UI = Game.UI || {};

Game.UI.character = (function () {
  // opts.character: hero id (data/charactersData.js); its drawing comes from Game.CHARACTER_ARTS.
  const artOf = hero => {
    const h = hero && Game.CHARACTERS && Game.CHARACTERS[hero];
    return (h && Game.CHARACTER_ARTS && Game.CHARACTER_ARTS[h.art]) || Game.CHARACTER_ART;
  };
  const poses = () => Game.UI.characterPoses;
  let uid = 0;

  function render(opts = {}) {
    const art = artOf(opts.character);
    const view = art.views[opts.view] ? opts.view : 'front';
    const size = opts.size || 240;
    const t = (performance.now() / 1000).toFixed(2);
    const p = Object.assign({ id: 'mc' + (uid++) }, art.palette);
    if (opts.hit && opts.poses && poses()) poses().play(Game.CHARACTER_POSES.onHit);
    const pose = opts.poses && poses() ? poses().current() : null;
    const cls = ['mc', 'view-' + view, pose ? pose.cls : '', opts.hit && !pose ? 'pose-hurt' : '', opts.turn ? 'turn' : ''].join(' ');
    return `<div class="${cls}" data-mc="${view}" data-size="${size}" data-hero="${opts.character || ''}"${opts.poses ? ' data-poses' : ''} title="Click to turn around"
      style="--mc-h:${size}px;--mc-t:-${t}s;--mc-p:${pose ? pose.delay : '0s'}">${art.views[view](p)}</div>`;
  }

  // Clicking her swaps the view in place (no full screen re-render needed).
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-mc]');
    if (!el) return;
    const view = el.dataset.mc === 'front' ? 'back' : 'front';
    el.outerHTML = render({ view, size: Number(el.dataset.size), turn: true, poses: el.hasAttribute('data-poses'), character: el.dataset.hero || undefined });
  });

  return { render };
})();
