// VICTORY AND REWARD JUICE
// Victory banner and confetti when a fight is won, cards flipping in on the
// reward screen, and the picked card flying into your deck.
(function () {
  const J = Game.Juice;
  const GOLD = ['#ffd35a', '#d9a441', '#fff3d6', '#ff9a3c'];

  // Called by combat actions when a fight is won; done() opens the rewards.
  function victory(done) {
    J.flash('gold', 500);
    J.banner('VICTORY', 'gold', 1300);
    const w = window.innerWidth, h = window.innerHeight;
    J.burst(w / 2, h * .42, { count: 46, color: GOLD, speed: 260, size: 9, ms: 1200, gravity: 80 });
    setTimeout(() => J.burst(w * .3, h * .5, { count: 20, color: GOLD, speed: 160, ms: 1000, gravity: 60 }), 180);
    setTimeout(() => J.burst(w * .7, h * .5, { count: 20, color: GOLD, speed: 160, ms: 1000, gravity: 60 }), 320);
    J.wait(1250, done);
  }

  function defeat(done) {
    J.flash('red', 900, true);
    J.shake(document.getElementById('app'), 18, 600);
    J.banner('DEFEAT', 'red', 1300);
    J.wait(1250, done);
  }

  // Picked reward card flies to the deck counter in the top bar.
  function gainCard(cardEl, done) {
    const deck = document.querySelector('.deck-count');
    if (!cardEl || !deck) return done();
    document.querySelectorAll('.reward-hand .card').forEach(c => { if (c !== cardEl) c.classList.add('fade-away'); });
    J.burstAt(cardEl, { count: 26, color: GOLD, speed: 120, size: 7 });
    J.flash('gold', 250);
    setTimeout(() => J.flyCard(cardEl, deck, () => {
      deck.classList.add('bump');
      J.floatText(J.center(deck).x, J.center(deck).y + 24, '+1 card', 'gold');
      J.burstAt(deck, { count: 18, color: GOLD, speed: 60 });
      J.wait(450, done);
    }, { ms: 520, endScale: .15, color: '#ffd35a' }), 140);
  }

  Game.Events.on('ui:rendered', ({ screen }) => {
    if (screen !== 'reward') return;
    document.querySelectorAll('.reward-hand .card').forEach((c, i) => {
      c.classList.add('reward-in');
      c.style.animationDelay = (150 + i * 140) + 'ms';
    });
  });

  Object.assign(Game.Juice, { victory, defeat, gainCard });
})();
