// HERO JUICE
// Makes the heroine act out what you play:
//   - every card that starts flying ('card:launch') plays her pose for its type
//     (data/characterPosesData.js: attack -> throw, defense -> defend, skill/power -> cast)
//   - Game.Juice.throwCard: an attack card flies from the hand into her hand,
//     then she throws it, spinning, at the enemy; done() runs when it lands
//   - a sparkle from the lantern when she casts, and a happy hop when a fight is won
// Listens to events only; the combat rules don't know about it.
(function () {
  const J = Game.Juice;
  const D = Game.CHARACTER_POSES;
  const P = Game.CHARACTER_ART.POINTS;
  const Poses = Game.UI.characterPoses;

  // A point of the battle heroine's drawing (viewBox units) in page pixels.
  function heroPoint(pt) {
    const el = document.querySelector('.player-unit .mc');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + pt.x / 200 * r.width, y: r.top + pt.y / 350 * r.height };
  }

  // An invisible marker at a page point, so flyCard can aim at it.
  function marker(x, y) {
    const m = document.createElement('i');
    m.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:1px;height:1px`;
    J.layer().appendChild(m);
    return m;
  }

  function throwCard(cardEl, targetEl, done, opts = {}) {
    const hand = heroPoint(P.throwRelease);
    if (!hand || !targetEl || J.reduced) return J.flyCard(cardEl, targetEl, done, opts);
    const t = D.throwTiming;
    const m = marker(hand.x, hand.y);
    J.flyCard(cardEl, m, () => {
      m.remove();
      J.busy = true;   // still animating: keep input blocked until it lands
      const to = J.center(targetEl);
      const c = document.createElement('div');
      c.className = 'thrown-card';
      c.style.setProperty('--tc', opts.color || '#ffd35a');
      c.style.left = hand.x + 'px'; c.style.top = hand.y + 'px';
      J.layer().appendChild(c);
      J.burst(hand.x, hand.y, { count: 8, color: [opts.color || '#ffd35a', '#fff'], speed: 40, ms: 300 });
      const dx = to.x - hand.x, dy = to.y - hand.y;
      c.animate([
        { transform: 'translate(-50%,-50%) rotate(0) scale(.7)' },
        { transform: `translate(calc(-50% + ${dx * .5}px), calc(-50% + ${dy * .5 - 30}px)) rotate(400deg) scale(1)`, offset: .5 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(800deg) scale(.8)` },
      ], { duration: t.toEnemy, easing: 'cubic-bezier(.3,0,.7,1)' }).onfinish = () => {
        c.remove();
        J.burst(to.x, to.y, { count: 12, color: [opts.color || '#ffd35a', '#fff3d6'], speed: 60, ms: 400 });
        J.busy = false;
        done();
      };
    }, Object.assign({}, opts, { ms: t.toHand, endScale: .18, impact: false }));
  }

  // Pose for each card as it starts flying, plus a lantern sparkle for casts.
  Game.Events.on('card:launch', ({ card }) => {
    const pose = Poses.forCard(card);
    if (!pose) return;
    Poses.play(pose);
    if (pose === 'cast') setTimeout(() => {
      const p = heroPoint(P.castLantern);
      if (p) J.burst(p.x, p.y, { count: 16, color: ['#ffd27a', '#fff6d8', '#ffb347'], speed: 70, ms: 600 });
    }, 200);
  });

  // Fight won: she hops for joy (the victory banner plays meanwhile).
  Game.Events.on('combat:end', ({ outcome }) => { if (outcome === 'win') Poses.play(D.onWin); });

  Object.assign(Game.Juice, { throwCard });
})();
