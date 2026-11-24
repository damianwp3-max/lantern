// DRAW ANIMATION
// New cards fly out of the draw pile into the hand. The combat screen marks drawn
// cards with the .deal class (ui/cardView.js); here each one gets the offset from its
// spot to the draw pile (--deal-dx / --deal-dy), so css/cards.css can start it there.
// Speed and stagger: Game.TURN_FLOW (data/turnFlowData.js).
(function () {
  Game.Events.on('ui:rendered', ({ screen }) => {
    if (screen !== 'combat') return;
    const cards = document.querySelectorAll('.hand .card.deal');
    const pile = document.querySelector('.pile-draw');
    if (!cards.length || !pile) return;
    const p = Game.Juice.center(pile);
    cards.forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--deal-dx', Math.round(p.x - (r.left + r.width / 2)) + 'px');
      el.style.setProperty('--deal-dy', Math.round(p.y - (r.top + r.height / 2)) + 'px');
    });
  });
})();
