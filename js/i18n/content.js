// LANGUAGES: game data (cards, enemies, statuses, events, ...)
// When the language changes, the text fields of the data tables below are
// swapped for their translation (Game.I18N.translate), and swapped back for
// English. So the rest of the game keeps reading card.name, enemy.name, ...
// and needs no changes. Exact values from Game.I18N.addContent win.
// New data table with player-facing text = one line in TABLES.
(function () {
  const TABLES = {
    cards: () => Game.CARDS,
    cardTypes: () => Game.CARD_TYPES,
    enemies: () => Game.ENEMIES,
    statuses: () => Game.STATUSES,
    keywords: () => Game.KEYWORDS,
    powers: () => Game.POWERS,
    intents: () => Game.INTENTS,
    passives: () => Game.PASSIVES,
    totems: () => Game.TOTEMS,
    piercings: () => Game.PIERCINGS,
    mapNodes: () => Game.MAP_NODES,
    levels: () => Game.LEVELS,
    caveEvents: () => Game.CAVE_EVENTS,
    lantern: () => Game.LANTERN_UPGRADES,
    settings: () => Game.SETTINGS_DEF,
    characters: () => Game.CHARACTERS,
    unlockSets: () => Game.UNLOCK_SETS,
    rest: () => Game.REST,
    shop: () => Game.SHOP,
    oil: () => Game.OIL,
    timing: () => Game.TIMING,
    fightMods: () => Game.FIGHT_MODS,
    bat: () => Game.BAT,
    pets: () => Game.PETS,
  };
  // Fields that hold text for the player (anything else, like ids, stays as is).
  const TEXT = new Set(['name', 'text', 'tip', 'tipMulti', 'tipAllies', 'hint', 'label', 'title', 'theme', 'blurb', 'desc', 'description',
    'result', 'flavor', 'intro', 'outcome', 'word', 'short', 'note', 'prompt', 'body', 'button', 'leave', 'success', 'fail']);

  let saved = [];   // [obj, key, englishValue] to restore English

  function set(obj, key, value) {
    if (obj[key] === value) return;
    saved.push([obj, key, obj[key]]);
    obj[key] = value;
  }

  function walk(node, depth) {
    if (!node || typeof node !== 'object' || depth > 6) return;
    if (Array.isArray(node)) { node.forEach(x => walk(x, depth + 1)); return; }
    Object.keys(node).forEach(k => {
      const v = node[k];
      if (typeof v === 'string' && TEXT.has(k)) set(node, k, Game.I18N.translate(v));
      else if (v && typeof v === 'object') walk(v, depth + 1);
    });
  }

  function restore() {
    for (let i = saved.length - 1; i >= 0; i--) { const [o, k, v] = saved[i]; o[k] = v; }
    saved = [];
  }

  function apply(lang) {
    restore();
    if (lang !== 'en') {
      const C = Game.I18N.content(lang);
      Object.entries(TABLES).forEach(([kind, get]) => {
        const table = get();
        if (!table) return;
        walk(table, 0);
        Object.entries(C[kind] || {}).forEach(([id, fields]) => {
          const entry = Array.isArray(table) ? table.find((x, i) => x.id === id || String(i) === id) : table[id];
          if (entry) Object.entries(fields).forEach(([k, v]) => set(entry, k, v));
        });
      });
    }
    if (Game.Cards && Game.Cards.clearCache) Game.Cards.clearCache();   // upgraded / pierced cards rebuild with the new text
  }

  Game.Events.on('lang:changed', ({ lang }) => apply(lang));
})();
