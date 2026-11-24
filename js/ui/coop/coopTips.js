// TOOLTIPS for the co-op pieces: data-tip="coop:ally" (the teammate) and "coop:gift" (Gift card button).
// Adds a new kind to Game.UI.tipText (ui/tipText.js) without editing it.
Game.UI.tipText.coop = function (id) {
  if (id === 'ally') return { icon: '✦', title: 'Your teammate', label: 'Co-op', color: '#6fd0ff', text: 'Click to see their deck, energy and health.' };
  if (id === 'gift') return { icon: '🎁', title: 'Gift card', label: 'Co-op', color: '#ffd35a',
    text: 'Pick a card from your hand to send to your teammate. You pay its energy cost (X cards: 1), they play it for free. Only on your own turn.' };
  return null;
};
