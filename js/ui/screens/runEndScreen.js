// RUN END SCREEN (after the last boss or when the hero falls)
// Shows the run's score (state/runScore.js), how deep you got, the explorer
// experience and embers earned, and the card packs to open, held like a hand
// of cards (ui/packs/packHand.js). Animations: ui/juice/runEndJuice.js.
// Data comes from app.runEnd, filled by Game.App.showRunEnd (app/actions/runEndActions.js).
// Styles: css/runEnd.css.
Game.UI.registerScreen('runEnd', function (app) {
  const { esc, button } = Game.UI.components;
  const R = app.runEnd || { summary: Game.RunScore.summary({ levelIndex: 0, row: -1 }, false), award: null };
  const S = R.summary, D = S.depth;
  const won = S.won;

  const lines = S.lines.map((l, i) => `<div class="re-line${l.count ? '' : ' zero'}" style="--i:${i}">
      <span class="re-label">${esc(l.label)}</span>
      <span class="re-count">${l.count} &times; ${l.each}</span>
      <b class="re-pts" data-count="${l.points}">${l.points}</b>
    </div>`).join('');

  // Depth meter: one segment per level, a marker where the run ended.
  const segs = Game.LEVELS.map((lv, i) => {
    const fill = i < D.levelIndex ? 100 : i === D.levelIndex ? Math.round(100 * D.floor / D.floors) : 0;
    return `<div class="re-seg${i === D.levelIndex ? ' here' : ''}"><i style="--w:${fill}%"></i><small>${esc(lv.name)}</small></div>`;
  }).join('');

  const packs = Game.Packs.unopened();
  const xp = S.xp ? `<span class="re-chip xp"><b>+${S.xp}</b> XP</span>` : '';
  const lvls = S.explorerLevels ? `<span class="re-chip lvl">${esc(Game.t(S.explorerLevels === 1 ? '+{n} explorer level' : '+{n} explorer levels', { n: S.explorerLevels }))}</span>` : '';
  const embers = R.award ? `<span class="re-chip ember"><b>+${R.award.embers}</b> ${esc(Game.t('embers'))}</span>` : '';

  const packText = packs.length
    ? `<h3 class="re-packs-title">${esc(Game.t(packs.length === 1 ? 'You earned {n} card pack!' : 'You earned {n} card packs!', { n: packs.length }))}</h3>
       <p class="muted">${esc(Game.t('Click a pack to open it.'))}</p>`
    : `<h3 class="re-packs-title">${esc(Game.t(R.opened ? 'All packs opened!' : 'No card packs this time'))}</h3>
       <p class="muted">${esc(Game.t(R.opened ? 'Your new cards can now show up as rewards.' : 'Gain an explorer level during a run to earn card packs.'))}</p>`;

  return `<div class="run-end ${won ? 'won' : R.left ? 'left' : 'lost'}${R.animate ? ' intro' : ''}">
    <div class="re-head">
      <h1>${esc(won ? 'You reached the bottom!' : R.left ? 'You left the cave' : 'Defeat')}</h1>
      <p class="muted">${esc(won ? 'All three levels cleared. The run is over.' : R.left ? 'You climbed out with what you found. Your rewards are kept.' : 'Your lantern goes out. The run is over.')}</p>
    </div>
    <div class="re-body">
      <div class="re-panel re-score">
        <h3>${esc(Game.t('Points'))}</h3>
        ${lines}
        <div class="re-total"><span>${esc(Game.t('Total'))}</span><b data-count="${S.total}">${S.total}</b></div>
        <div class="re-rank">${esc(S.rank)}</div>
      </div>
      <div class="re-panel re-depth">
        <h3>${esc(Game.t('How far you got'))}</h3>
        <div class="re-where"><b>${esc(D.levelName)}</b> &middot; <span>${esc(Game.t('Floor {n} of {n2}', { n: D.floor, n2: D.floors }))}</span></div>
        <div class="re-meter">${segs}</div>
        <div class="re-deep"><span>${esc(Game.t('{n} of {n2} floors', { n: D.reached, n2: D.total }))}</span> &middot; <b>${D.pct}%</b></div>
        <div class="re-chips">${xp}${lvls}${embers}</div>
        ${Game.UI.unlocksView.levelBar()}
      </div>
    </div>
    <div class="re-packs">
      ${packText}
      ${Game.UI.packHand.render(packs)}
    </div>
    <div class="re-foot">${button('Main menu', 'toMenu')}</div>
  </div>`;
});
