// META PROGRESS (kept between runs)
// Embers and lantern upgrade levels, in localStorage (separate from the run save and from unlock progress).
//   Game.Meta.get() -> { embers, levels: { upgradeId: n } }
//   Game.Meta.save() / Game.Meta.reset()
Game.Meta = (function () {
  const KEY = 'lantern_descent_meta_v1';
  let data = null;
  function get() {
    if (data) return data;
    try { data = JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { data = null; }
    data = Object.assign({ embers: 0, levels: {}, totalEmbers: 0 }, data);
    return data;
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(get())); }
  function reset() { data = null; localStorage.removeItem(KEY); }
  // Co-op (js/coop/coop.js) swaps in the teammate's data while it runs their part of the game.
  function use(d) { data = d; }
  return { get, save, reset, use };
})();
