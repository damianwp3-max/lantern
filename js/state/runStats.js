// RUN STATS
// Counts what happened this run (fights won, cards gained, cards unlocked) in
// run.stats, so it is saved with the run. The fight summary and the end-of-run
// message read it. Fed by events only.
//   Game.RunStats.get()   -> { fightsWon, cardsGained, cardsUnlocked }
//   Game.RunStats.line()  -> one sentence for end-of-run messages
Game.RunStats = (function () {
  function get() {
    const run = Game.State.run;
    if (!run) return { fightsWon: 0, cardsGained: 0, cardsUnlocked: 0 };
    run.stats = Object.assign({ fightsWon: 0, cardsGained: 0, cardsUnlocked: 0 }, run.stats);
    return run.stats;
  }

  Game.Events.on('combat:end', ({ outcome }) => { if (outcome === 'win') get().fightsWon += 1; });
  Game.Events.on('deck:cardAdded', () => { get().cardsGained += 1; });
  Game.Events.on('cards:unlocked', ({ cards }) => { get().cardsUnlocked += cards.length; });

  function line() {
    const s = get();
    const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
    return `This run: ${plural(s.fightsWon, 'fight')} won, ${plural(s.cardsGained, 'card')} gained, ${plural(s.cardsUnlocked, 'card')} unlocked.`;
  }

  return { get, line };
})();
