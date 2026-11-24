// LUCK AND FLARE JUICE: feedback for the piercings that can fizzle or double a card, and for the Flare.
// Listens to events only (card:luck, ui:rendered), so combat rules stay free of drawing code.
(function () {
  const J = Game.Juice;
    // A card that plays twice (Lucky, Joker) shows up above your draw pile and uses itself again, with a golden
  // glow and a label, so you can see what happened (kupka, 2026-11-23: no plain "X2" text).
  function replayAboveDeck(cardId) {
    setTimeout(() => {
      if (!Game.CARDS[cardId]) return;
      const pile = document.querySelector('.pile-draw');
      const w = window.innerWidth, h = window.innerHeight;
      const at = pile ? J.center(pile) : { x: w * .15, y: h * .8 };
      const x = Math.max(110, at.x + 30), y = Math.max(150, at.y - 190);
      const wrap = document.createElement('div');
      wrap.innerHTML = Game.UI.cardView.render(cardId);
      const g = wrap.firstElementChild;
      g.classList.add('fly-card', 'replay-card');
      Object.assign(g.style, { left: x - 86 + 'px', top: y - 122 + 'px', width: '172px', height: '244px' });
      J.layer().appendChild(g);
      const label = document.createElement('div');
      label.className = 'replay-label';
      label.textContent = Game.t('Plays again!');
      label.style.left = x + 'px'; label.style.top = y - 150 + 'px';
      J.layer().appendChild(label);
      J.flash('gold', 200);
      g.animate([
        { transform: `translate(0,90px) scale(.3)`, opacity: 0 },
        { transform: 'translate(0,0) scale(.9)', opacity: 1, offset: .25 },
        { transform: 'translate(0,0) scale(.82)', opacity: 1, offset: .35 },
        { transform: 'translate(0,0) scale(.98)', opacity: 1, offset: .5 },
        { transform: 'translate(0,-6px) scale(.92)', opacity: 1, offset: .8 },
        { transform: 'translate(0,-40px) scale(.5)', opacity: 0 },
      ], { duration: J.reduced ? 300 : 1300, easing: 'ease-out', fill: 'forwards' }).onfinish = () => { g.remove(); label.remove(); };
      setTimeout(() => J.burst(x, y, { count: 26, color: ['#ffd35a', '#6fcf7a', '#fff'], speed: 130, size: 6 }), J.reduced ? 100 : 650);
      setTimeout(() => label.remove(), 1400);
    }, 120);
  }

  Game.Events.on('card:luck', ({ cardId, card, luck, spent }) => {
    const w = window.innerWidth, h = window.innerHeight;
    if (luck === 'fizzle') { J.flash('blue', 220); J.floatText(w * .5, h * .5, 'FIZZLE...', 'red'); }
    if (luck === 'double') replayAboveDeck(cardId);
    if (card.xcost) J.floatText(w * .5, h * .44, 'X = ' + spent, 'gold');
  });
  Game.Events.on('ui:rendered', ({ screen, fx }) => {
    if (screen !== 'combat' || !fx || !fx.flare) return;
    const orb = document.querySelector('.energy-orb');
    if (!orb) return;
    const c = J.center(orb);
    J.burst(c.x, c.y, { count: 24, color: ['#ffb347', '#ffe2a8', '#ff7a3a'], speed: 110 });
    J.flash('gold', 220);
    J.floatText(c.x, c.y - 30, 'FLARE', 'gold');
  });
})();
