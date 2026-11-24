// MESSAGE SCREEN (title, text, one button): used for win, defeat, level cleared, goodbye
Game.UI.registerScreen('message', function (app) {
  const { esc, button } = Game.UI.components;
  const m = app.message;
  return `<div class="center message-screen"><div class="message-panel">
    <h1>${esc(m.title)}</h1>
    <p>${esc(m.text)}</p>
    ${button(m.buttonLabel, m.buttonAction)}
    ${m.extra ? button(m.extra.label, m.extra.action) : ''}
  </div></div>`;
});
