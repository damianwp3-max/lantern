// DISCARD ANIMATION
// Game.Juice.discardHand(done): every card that will be discarded at end of turn
// (not the ones that stay, like Collector cards) flies in a little arc to the discard
// pile, one after another, shrinking as it goes. done() runs once the last one lands.
// Timing: Game.TURN_FLOW (data/turnFlowData.js). Rules side: Combat.discardHand.
(function () {
  const J = Game.Juice;
  const T = () => Game.TURN_FLOW;

  J.discardHand = function (done) {
    const pile = document.querySelector('.pile-discard');
    const cards = [...document.querySelectorAll('.hand .card')].filter(el => !(Game.CARDS[el.dataset.card] || {}).retain);
    if (!pile || !cards.length) return done();
    const to = J.center(pile);
    const layer = J.layer();
    J.busy = true;
    const fast = J.reduced;
    let left = cards.length;
    cards.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const w = el.offsetWidth, h = el.offsetHeight;
      const rot = parseFloat(getComputedStyle(el).rotate) || 0;
      const g = el.cloneNode(true);
      g.classList.remove('deal', 'selected', 'aiming', 'dragging', 'disabled');
      g.classList.add('fly-card');
      Object.assign(g.style, { left: cx - w / 2 + 'px', top: cy - h / 2 + 'px', width: w + 'px', height: h + 'px', rotate: rot + 'deg', visibility: 'hidden' });
      layer.appendChild(g);
      const dx = to.x - cx, dy = to.y - cy;
      const delay = fast ? 0 : i * T().discardStaggerMs;
      setTimeout(() => {
        el.style.visibility = 'hidden';
        g.style.visibility = 'visible';
        g.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${dx * .25}px, ${dy * .25 - 60}px) scale(1.04)`, opacity: 1, offset: .3 },
          { transform: `translate(${dx * .8}px, ${dy * .8 - 10}px) scale(.5)`, opacity: .9, offset: .8 },
          { transform: `translate(${dx}px, ${dy}px) scale(.22)`, opacity: 0 },
        ], { duration: fast ? 80 : T().discardFlyMs, easing: 'cubic-bezier(.45,0,.6,1)', fill: 'forwards' }).onfinish = () => {
          g.remove();
          pile.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: 160, easing: 'ease-out' });
          J.burst(to.x, to.y, { count: 4, color: '#b98a8a', speed: 26, size: 5, ms: 320 });
          if (--left === 0) { J.busy = false; done(); }
        };
      }, delay);
    });
  };
})();
