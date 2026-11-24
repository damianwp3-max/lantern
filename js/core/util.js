// SMALL SHARED HELPERS (no game knowledge in here)
Game.Util = {
  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
  // Whole number from min to max, both included.
  randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  },
  // Fisher-Yates shuffle, returns a new array.
  shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  // n distinct random items from list.
  sample(list, n) {
    return Game.Util.shuffle(list).slice(0, n);
  },
};
