// SAVE / LOAD
// Only knows how to put a run object into localStorage and get it back.
// Swap this file to change where saves live (cloud, file, several slots).
Game.Save = {
  KEY: 'lantern_descent_save_v1',
  write(run) { if (run) localStorage.setItem(this.KEY, JSON.stringify(run)); },
  read() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : null;
  },
  exists() { return localStorage.getItem(this.KEY) !== null; },
  remove() { localStorage.removeItem(this.KEY); },
};
