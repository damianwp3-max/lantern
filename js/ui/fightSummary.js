// FIGHT SUMMARY (UI)
// After each won fight:
//   - panel(app): a box on the reward screen with this run's numbers (fights
//     won, cards gained, deck size), the experience this fight gave with the
//     level bar, and the sealed card packs a new level earned
//   - when the reward is taken or skipped, an announcement pops up on the next
//     screen: how many cards you gained this fight and this run
// Numbers come from state/runStats.js and unlocks/unlocks.js.
Game.UI = Game.UI || {};

Game.UI.fightSummary = (function () {
  const { esc } = Game.UI.components;
  let pending = null;   // set when the reward is decided, shown after the next draw

  // A level-up gives card packs; their cards are revealed when the packs are opened
  // at the end of the run (packs/cardPacks.js, ui/screens/runEndScreen.js), so here
  // only the packs are shown, still sealed.
  function packTeaser() {
    const earned = (Game.Packs && Game.Packs.lastEarned) || [];
    if (!earned.length) return '';
    return `<div class="fs-unlocked fs-packs">
        <div class="fs-title"><span>Level up!</span> ${esc(Game.t(earned.length === 1 ? 'You earned {n} card pack' : 'You earned {n} card packs', { n: earned.length }))}</div>
        <div class="fs-pack-row">${earned.map(p => `<div class="fs-pack kind-${esc(p.kind)}">${Game.UI.packArt.render(p)}</div>`).join('')}</div>
        <div class="muted">${esc(Game.t('Open them at the end of the run to see your new cards.'))}</div>
      </div>`;
  }

  function panel() {
    const s = Game.RunStats.get();
    const run = Game.State.run;
    const fresh = Game.Unlocks.lastNew || [];
    const xp = Game.Unlocks.lastXp;
    const anyNew = fresh.length || ((Game.HeroUnlocks && Game.HeroUnlocks.lastNew) || []).length;
    return `<div class="fight-summary${anyNew ? ' has-new' : ''}">
      <div class="fs-stats">
        <span>Fights won: <b>${s.fightsWon}</b></span>
        <span>Cards gained this run: <b>${s.cardsGained}</b></span>
        <span>Deck: <b>${run.deck.length}</b></span>
        ${xp ? `<span class="fs-xp"><b>+${xp.gained}</b> XP</span>` : ''}
      </div>
      ${Game.UI.unlocksView.levelBar()}
      ${packTeaser()}
    </div>`;
  }

  // The pop-up shown once the reward is decided.
  function announce(info) {
    const s = Game.RunStats.get();
    const run = Game.State.run;
    const d = document.createElement('div');
    d.className = 'gain-toast';
    const head = info.gained ? `+${info.gained} card gained!` : 'No card taken';
    const sub = [`Cards gained this run: ${s.cardsGained}`, run ? `Deck: ${run.deck.length}` : ''].filter(Boolean).join(' · ');
    const unl = info.sets.length ? `<div class="gt-unlock">${esc(Game.t('New card pack earned!'))}</div>` : '';
    d.innerHTML = `<div class="gt-head">Fight over: ${head}</div><div class="gt-sub">${sub}</div>${unl}`;
    (Game.Juice ? Game.Juice.layer() : document.body).appendChild(d);
    d.animate([
      { opacity: 0, transform: 'translate(-50%, -20px) scale(.9)' },
      { opacity: 1, transform: 'translate(-50%, 0) scale(1.04)', offset: .1 },
      { opacity: 1, transform: 'translate(-50%, 0) scale(1)', offset: .85 },
      { opacity: 0, transform: 'translate(-50%, -10px) scale(1)' },
    ], { duration: 2800, easing: 'ease-out' }).onfinish = () => d.remove();
  }

  function decided(gained) {
    pending = { gained, sets: (Game.Unlocks.lastNew || []).map(s => s.name) };
  }

  Game.Events.on('deck:cardAdded', ({ from }) => { if (from === 'reward') decided(1); });
  Game.Events.on('reward:skipped', () => decided(0));
  Game.Events.on('ui:rendered', ({ screen }) => {
    if (screen === 'reward') {
      const box = document.querySelector('.fight-summary.has-new');
      if (box && Game.Juice) setTimeout(() => Game.Juice.burstAt(box.querySelector('.fs-title'), { count: 24, color: ['#ffd35a', '#fff3d6', '#8fc4ff'], speed: 110 }), 300);
      return;
    }
    if (!pending) return;
    const info = pending;
    pending = null;
    announce(info);
  });

  return { panel, announce };
})();
