// AUDIO: plays sound effects and music at the volumes from Settings.
//   Game.Audio.play(id)       a sound from Game.SOUNDS (data/audioData.js)
//   Game.Audio.playMusic(id)  loop a track from Game.MUSIC (stops the previous one)
//   Game.Audio.stopMusic()
// Uses plain <audio> elements so it also works when index.html is opened from file://.
// Browsers block sound until the first click or key press; sounds before that are skipped.
Game.Audio = (function () {
  const last = {};          // id -> time it last played (cooldown)
  const cache = {};         // file -> preloaded Audio element (cloned to overlap)
  let music = null, musicDef = null;

  const vol = channel => {
    const v = Number(Game.Settings.get(channel === 'music' ? 'musicVolume' : 'sfxVolume'));
    return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v / 100));
  };

  function load(file) {
    if (!cache[file]) { cache[file] = new Audio(file); cache[file].preload = 'auto'; }
    return cache[file];
  }

  function play(id) {
    const def = Game.SOUNDS[id];
    if (!def) return;
    const level = (def.volume ?? 1) * vol(def.channel);
    if (level <= 0) return;
    const now = performance.now();
    if (last[id] && now - last[id] < (def.cooldown || 0)) return;
    last[id] = now;
    const pick = def.files[Math.floor(Math.random() * def.files.length)];
    const file = typeof pick === 'string' ? pick : pick.src;
    const a = load(file).cloneNode();
    a.volume = Math.min(1, level * (typeof pick === 'string' ? 1 : (pick.volume ?? 1)));
    const p = a.play();
    if (p && p.catch) p.catch(() => {});   // not allowed yet (no click so far) or file missing
  }

  function playMusic(id) {
    const def = Game.MUSIC[id];
    if (!def) return;
    if (musicDef === def && music) return;
    stopMusic();
    musicDef = def;
    music = new Audio(def.file);
    music.loop = true;
    music.volume = (def.volume ?? 1) * vol('music');
    const p = music.play();
    if (p && p.catch) p.catch(() => {});
  }

  function stopMusic() {
    if (music) { music.pause(); music = null; }
    musicDef = null;
  }

  // Sliders move: change the playing music at once.
  Game.Events.on('settings:changed', ({ id }) => {
    if (id === 'musicVolume' && music && musicDef) music.volume = (musicDef.volume ?? 1) * vol('music');
  });

  Object.values(Game.SOUNDS).forEach(d => d.files.forEach(f => load(typeof f === 'string' ? f : f.src)));   // preload
  return { play, playMusic, stopMusic };
})();
