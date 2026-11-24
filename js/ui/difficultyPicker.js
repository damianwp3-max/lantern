// DIFFICULTY PICKER (view): the row of five mode buttons on the hero select screen.
//   Game.UI.difficultyPicker.render()   HTML string; clicks go to Game.Actions.pickDifficulty(id)
// Data: data/difficultyData.js, rules: combat/difficulty.js, styles: css/difficulty.css.
Game.UI.difficultyPicker = (function () {
  const pct = m => Math.round((m - 1) * 100);
  const sign = n => (n > 0 ? '+' : '') + n + '%';

  function render() {
    const { esc } = Game.UI.components;
    const on = Game.Difficulty.chosen();
    const btns = Game.Difficulty.list().map((id, i) => {
      const d = Game.DIFFICULTIES[id];
      return `<button class="df-btn ${id === on ? 'on' : ''}" style="--dc:${d.color}" data-action="pickDifficulty" data-arg="${esc(id)}">
        <span class="df-pips">${'<i></i>'.repeat(i + 1)}</span><b>${esc(d.name)}</b></button>`;
    }).join('');
    const d = Game.DIFFICULTIES[on];
    return `<div class="df-picker" style="--dc:${d.color}">
      <h4>Difficulty</h4>
      <div class="df-row">${btns}</div>
      <p class="df-info">${esc(d.text)}
        <span class="df-nums"><span>Enemy HP</span> <b>${sign(pct(d.hp))}</b> · <span>Enemy damage</span> <b>${sign(pct(d.dmg))}</b></span></p>
    </div>`;
  }

  return { render };
})();
