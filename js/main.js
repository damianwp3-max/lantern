// BOOTSTRAP
// Wires one click listener for the whole page (data-action -> Game.Actions)
// and shows the main menu. No game rules live here.
(function () {
  document.addEventListener('click', e => {
    if (Game.Drag && Game.Drag.consumeClick()) return;   // the click that ends a drag
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled || el.classList.contains('disabled')) return;
    const action = Game.Actions[el.dataset.action];
    if (action) action(el.dataset.arg);
  });

  Game.App.go('menu');
})();
