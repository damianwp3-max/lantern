// REST SITE SCREEN: choose ONE option: heal, refill oil, or learn a passive for the run.
// No card upgrades here: cards are only upgraded or pierced at cave events and the merchant.
// The camp picture on top (hero, tent, campfire in the cave) is ui/campScene.js.
Game.UI.registerScreen('rest', function (app) {
  const { esc, statusBar } = Game.UI.components;
  const run = Game.State.run;
  const heal = Math.min(Game.Rest.healAmount(run), run.maxHp - run.hp);

  const passives = app.restChoices.map(id => {
    const p = Game.PASSIVES[id];
    return `<div class="rest-option passive" data-action="restPassive" data-arg="${esc(id)}">
      <div class="rest-icon">${Game.UI.passiveArt ? Game.UI.passiveArt.render(id, 64) : p.icon}</div>
      <div class="rest-title">${esc(p.name)}</div>
      <div class="rest-text">${esc(p.text)}</div>
      <div class="rest-tag">Passive, lasts the whole run</div>
    </div>`;
  }).join('');

  const oilGain = Math.min(Game.OIL.restRefill, run.maxOil - run.oil);

  return `${statusBar(run)}
    <div class="rest-site">
      ${Game.UI.campScene ? Game.UI.campScene.render(run) : ''}
      <h2>Rest site</h2>
      <p class="muted">A quiet corner. Pick one: rest your body, refill your lantern, or learn something that stays with you. The fire gives you 1 oil for free.</p>
      <div class="rest-options">
        <div class="rest-option heal" data-action="restHeal">
          <div class="rest-icon">${Game.UI.serviceIcons.render('heal', 44)}</div>
          <div class="rest-title">Rest</div>
          <div class="rest-text">Heal ${heal} HP (${run.hp}/${run.maxHp} now).</div>
          <div class="rest-tag">One time</div>
        </div>
        <div class="rest-option oil ${oilGain ? '' : 'disabled'}" ${oilGain ? 'data-action="restOil"' : ''}>
          <div class="rest-icon">${Game.UI.topBar.icon('oil')}</div>
          <div class="rest-title oil-title">${oilGain ? `Add ${oilGain} oil` : 'Refill lantern'}</div>
          <div class="rest-text">${oilGain ? `Gain ${oilGain} oil (${run.oil}/${run.maxOil} now).` : 'Your lantern is full.'}</div>
          <div class="rest-tag">One time</div>
        </div>
        ${passives ? `<div class="rest-or">or</div>${passives}` : ''}
      </div>
    </div>`;
});
