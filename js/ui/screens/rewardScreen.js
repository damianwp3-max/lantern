// REWARD SCREEN (pick a card after a fight)
Game.UI.registerScreen('reward', function (app) {
  const { button, cardBox, statusBar, esc } = Game.UI.components;

  // Bonus reward (elites and bosses): a totem (take it before you leave).
  function bonus(app) {
    const ex = app.rewardExtras;
    if (!ex || !ex.totem) return '';
    const t = ex.totem && Game.TOTEMS[ex.totem];
    return `<div class="reward-bonus"><div class="rb-title">Bonus rewards <span class="muted">(take them before you leave)</span></div><div class="rb-row">
      ${t ? `<div class="rb-item" style="--tc:${t.color}" data-action="takeTotem" data-tip="totem:${esc(ex.totem)}"><span class="totem-icon big">${esc(t.icon)}</span><div class="st-body"><b>${esc(t.name)}</b><span>${esc(t.text)}</span></div></div>` : ''}
    </div></div>`;
  }

  return `${statusBar(Game.State.run)}
    <div class="center">
      <div class="reward-panel">
      <h2>Victory! Choose a card to add to your deck</h2>
      <p class="reward-gold"><i>◎</i> +${Game.Gold.lastGain} gold</p>
      ${Game.UI.fightSummary ? Game.UI.fightSummary.panel(app) : ''}
      </div>
      <div class="hand reward-hand">${app.rewardChoices.map(id => cardBox(id, { action: 'takeReward', arg: id })).join('')}</div>
      ${bonus(app)}
      ${button('Skip', 'skipReward')}
      <p class="muted">Keys: 1-3 take a card, S skip.</p>
    </div>`;
});
