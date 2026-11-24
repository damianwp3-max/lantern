// LANGUAGES (core)
// English is the language the game is written in. Other languages are
// dictionaries: English text -> translated text (js/data/i18n/<lang>/*.js).
//
//   Game.I18N.add(lang, { 'English': 'Translation', ... })
//       A key may hold placeholders: {n}, {n2}, ... match a number, any other {name}
//       matches some text (which is translated too), e.g.
//       'Floor {n} of {n2}': 'Piętro {n} z {n2}'
//       A value may be a function (vars) -> text, for plural forms.
//   Game.I18N.addContent(lang, kind, { id: { field: value } })
//       exact values for data entries that a dictionary can't express
//       (e.g. keyword match words), applied by i18n/content.js
//   Game.I18N.translate(text)   whole text in the current language (or as is)
//   Game.t(text, vars)          translate, then fill {placeholders} from vars
//   Game.I18N.setLang(lang)     switch; emits 'lang:changed' { lang }
//   Game.I18N.plural(n, one, few, many)  Polish-style plural pick
//   Game.I18N.addFixer(lang, fn) / fixText(text)  tidy words after numbers change (upgrades)
// The list of languages is data/languagesData.js; the choice is a Setting.
Game.I18N = (function () {
  const langs = {};            // lang -> { exact: Map, patterns: [], content: {} }
  let lang = 'en';
  let cache = new Map();

  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const L = id => langs[id] || (langs[id] = { exact: new Map(), patterns: [], content: {} });

  function compile(key, value) {
    const names = [];
    const src = key.split(/(\{\w+\})/).map(part => {
      const m = /^\{(\w+)\}$/.exec(part);
      if (!m) return reEsc(part);
      names.push(m[1]);
      return /^(n|n\d|num|count|hp|max|dmg|value|amount|total|hits|pct|cost|xp|level)$/.test(m[1]) ? '([+\\-]?\\d+(?:[.,]\\d+)?)' : '(.+?)';
    }).join('');
    return { re: new RegExp('^' + src + '$'), names, value, len: key.length };
  }

  function add(id, table) {
    const D = L(id);
    Object.entries(table).forEach(([k, v]) => {
      const key = norm(k);
      if (/\{\w+\}/.test(key)) D.patterns.push(compile(key, v));
      else D.exact.set(key, v);
    });
    D.patterns.sort((a, b) => b.len - a.len);   // longer, more specific patterns first
    cache = new Map();
  }

  // A fixer tidies a text after numbers inside it changed (e.g. plural words after an upgrade).
  function addFixer(id, fn) { (L(id).fixers = L(id).fixers || []).push(fn); }
  function fixText(text) { return ((langs[lang] || {}).fixers || []).reduce((t, fn) => fn(t), text); }

  function addContent(id, kind, entries) {
    const C = L(id).content;
    C[kind] = Object.assign(C[kind] || {}, entries);
  }

  const fill = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] !== undefined ? vars[k] : m));

  // One piece of text, no sentence splitting. Returns null when unknown.
  function lookup(text, depth) {
    const D = langs[lang];
    if (!D) return null;
    if (D.exact.has(text)) {
      const v = D.exact.get(text);
      return typeof v === 'function' ? v({}) : v;
    }
    for (const p of D.patterns) {
      const m = p.re.exec(text);
      if (!m) continue;
      const vars = {};
      p.names.forEach((name, i) => {
        const raw = m[i + 1];
        vars[name] = /^[+\-]?\d+(?:[.,]\d+)?$/.test(raw) || depth > 2 ? raw : translateCore(raw, depth + 1);
      });
      const out = typeof p.value === 'function' ? p.value(vars) : fill(p.value, vars);
      if (out !== text) return out;   // a pattern that changes nothing did not really match
    }
    return null;
  }

  function translateCore(text, depth = 0) {
    const hit = lookup(text, depth);
    if (hit !== null) return hit;
    // Several sentences: translate each one on its own.
    const parts = text.split(/(?<=[.!?:])\s+(?=[A-Z0-9(+])/);
    if (parts.length > 1) {
      let any = false;
      const out = parts.map(p => { const r = lookup(p, depth); if (r !== null) { any = true; return r; } return p; });
      if (any) return out.join(' ');
    }
    return text;
  }

  // Whole text, keeping its outer spaces.
  function translate(text) {
    if (lang === 'en' || text == null) return text;
    const s = String(text);
    if (!/[A-Za-z]/.test(s)) return s;
    if (cache.has(s)) return cache.get(s);
    const lead = /^\s*/.exec(s)[0], trail = /\s*$/.exec(s)[0];
    const core = norm(s);
    const out = lead + translateCore(core) + trail;
    if (cache.size > 6000) cache = new Map();
    cache.set(s, out);
    return out;
  }

  function t(text, vars) { return fill(translate(text), vars); }

  function setLang(id) {
    const next = id && (id === 'en' || langs[id]) ? id : 'en';
    lang = next;
    cache = new Map();
    if (typeof document !== 'undefined' && document.documentElement) document.documentElement.lang = next;
    Game.Events.emit('lang:changed', { lang: next });
  }

  // Polish plurals: 1 karta, 2-4 karty, 5+ karty -> kart (12-14 are "many").
  function plural(n, one, few, many) {
    n = Math.abs(Number(n));
    if (n === 1) return one;
    const d = n % 10, h = n % 100;
    return d >= 2 && d <= 4 && !(h >= 12 && h <= 14) ? few : many;
  }

  return { add, addContent, addFixer, fixText, translate, t, setLang, plural, lang: () => lang, content: id => (langs[id] || {}).content || {}, has: id => id === 'en' || !!langs[id] };
})();
Game.t = Game.I18N.t;
