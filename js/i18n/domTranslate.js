// LANGUAGES: what is on screen
// Screens are written in English. While another language is picked, every
// piece of text that appears on the page (screens, pop-ups, tooltips, toasts)
// and every title="" hint is run through Game.I18N.translate as it appears,
// so the screen files need no changes. Mark an element data-no-i18n to skip it.
// Switching the language redraws the current screen (and the open window).
(function () {
  const done = new WeakMap();   // node -> the text we put there (so we do not redo it)

  function textNode(n) {
    const v = n.nodeValue;
    if (!v || done.get(n) === v || !/[A-Za-z]/.test(v)) return;
    const p = n.parentNode;
    if (p && (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || (p.closest && p.closest('[data-no-i18n]')))) return;
    const tr = Game.I18N.translate(v);
    if (tr !== v) n.nodeValue = tr;
    done.set(n, n.nodeValue);
  }

  function attrs(el) {
    if (!el.getAttribute) return;
    ['title', 'placeholder', 'aria-label'].forEach(a => {
      const v = el.getAttribute(a);
      if (!v || !/[A-Za-z]/.test(v)) return;
      const tr = Game.I18N.translate(v);
      if (tr !== v) el.setAttribute(a, tr);
    });
  }

  function walk(root) {
    if (Game.I18N.lang() === 'en' || !root) return;
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) attrs(root);
    const it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = it.nextNode())) n.nodeType === 3 ? textNode(n) : attrs(n);
  }

  const observer = new MutationObserver(list => {
    if (Game.I18N.lang() === 'en') return;
    for (const m of list) {
      if (m.type === 'characterData') textNode(m.target);
      else if (m.type === 'attributes') attrs(m.target);
      else m.addedNodes.forEach(walk);
    }
  });

  function start() {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['title', 'placeholder', 'aria-label'] });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

  // Redraw in the new language (the data tables were already swapped by i18n/content.js).
  Game.Events.on('lang:changed', () => {
    if (Game.App && Game.UI.screens[Game.App.state.screen] && document.getElementById('app')) Game.UI.render(Game.App.state);
    if (document.title) document.title = Game.I18N.translate('Lantern Descent');
  });

  // Pick the saved language once everything is loaded.
  Game.I18N.setLang(Game.Settings.get('language'));
  Game.Events.on('settings:changed', ({ id, value }) => { if (id === 'language') Game.I18N.setLang(value); });
})();
