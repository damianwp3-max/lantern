// PROGRESS (kept across runs)
// Lifetime numbers that unlocks depend on: fights won, bosses beaten, explorer
// experience and which card sets are unlocked. Saved in localStorage apart from
// the run save, so losing a run or starting a new one keeps it.
//   xp      total experience ever earned (level = floor(xp / perLevel))
//   sets    unlocked set ids, in the order they were unlocked
//   packs   card packs not opened yet (js/packs/cardPacks.js)
Game.Progress = {
  KEY: 'lantern_descent_progress_v1',
  data: null,

  blank() { return { fightsWon: 0, bossesWon: 0, bosses: {}, xp: 0, sets: [], packs: [] }; },

  get() {
    if (!this.data) {
      let raw = {};
      try { raw = JSON.parse(localStorage.getItem(this.KEY) || '{}'); } catch (e) { raw = {}; }
      // Saves from before card sets had no xp: give back experience for the fights already won.
      if (raw.xp === undefined && raw.fightsWon) {
        const X = Game.EXPERIENCE.xp;
        raw.xp = (raw.fightsWon - (raw.bossesWon || 0)) * X.fight + (raw.bossesWon || 0) * X.boss;
      }
      delete raw.unlocked;   // old milestone list
      this.data = Object.assign(this.blank(), raw);
    }
    return this.data;
  },
  save()  { try { localStorage.setItem(this.KEY, JSON.stringify(this.get())); } catch (e) { /* storage may be blocked */ } },
  reset() { this.data = this.blank(); this.save(); },   // handy from the console
};
