// CHARACTER POSES (UI)
// Plays one-shot poses (throw, defend, cast, hurt, cheer) on the heroine.
// Poses are listed in data/characterPosesData.js and animated by css/characterPoses.css.
//
//   Game.UI.characterPoses.play('throw')   start a pose on every heroine on screen
//   Game.UI.characterPoses.current()       { cls, delay } for character.js to render with
//
// The battle screen re-renders while a pose is still running. The pose is kept
// here with its start time, so a fresh render picks it up halfway (negative
// delay --mc-p) instead of restarting or cutting it off.
Game.UI = Game.UI || {};

Game.UI.characterPoses = (function () {
  const D = Game.CHARACTER_POSES;
  let active = null;   // { name, start, ms }

  function current() {
    if (!active) return null;
    const elapsed = performance.now() - active.start;
    if (elapsed >= active.ms) { active = null; return null; }
    return { cls: 'pose-' + active.name, delay: -(elapsed / 1000).toFixed(3) + 's' };
  }

  function play(name) {
    const def = D.poses[name];
    if (!def) return;
    active = { name, start: performance.now(), ms: def.ms };
    document.querySelectorAll('.mc[data-poses]').forEach(el => {
      el.className = el.className.replace(/\bpose-\S+/g, '').trim();
      void el.offsetWidth;   // restart the CSS animation if the same pose plays twice
      el.style.setProperty('--mc-p', '0s');
      el.classList.add('pose-' + name);
    });
    const mine = active;
    setTimeout(() => {
      if (active !== mine) return;
      active = null;
      document.querySelectorAll('.mc[data-poses]').forEach(el => el.classList.remove('pose-' + name));
    }, def.ms + 20);
  }

  // Pose for a card type (attack -> throw, ...), or null.
  function forCard(card) { return (card && D.byCardType[card.type]) || null; }

  return { play, current, forCard };
})();
