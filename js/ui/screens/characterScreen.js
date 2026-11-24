// HERO SELECT SCREEN (after New Run)
// Big drawing of the picked hero on the left, her details on the right
// (stats, starting passive, exclusive cards), the roster of heroes below.
// Empty roster places say "Coming soon" (Game.CHARACTER_SLOTS).
// Heroes come from data/charactersData.js; clicks: app/actions/characterActions.js.
// Styles: css/characterSelect.css.
Game.UI.registerScreen('characters', function (app) {
  const { esc, button } = Game.UI.components;
  const C = Game.Characters;
  const id = Game.CHARACTERS[app.pickedHero] ? app.pickedHero : Game.CHARACTER_DEFAULT;
  const h = C.get(id);

  const passives = (h.passives || []).filter(p => Game.PASSIVES[p]).map(p => {
    const d = Game.PASSIVES[p];
    return `<div class="hs-passive" data-tip="passive:${esc(p)}">
      <span class="hs-passive-ico">${Game.UI.passiveArt.render(p, 40)}</span>
      <span><b>${esc(d.name)}</b><small>${esc(d.text)}</small></span></div>`;
  }).join('') || `<p class="muted">-</p>`;

  // Exclusive cards: the starting ones, a small gap, then the unlockable ones.
  // Locked cards show only a mystery card back: you see they exist, not what they do.
  const known = cid => cid && Game.CARDS[cid];
  const exclusive = C.allExclusiveOf(id).filter(known);
  const cardHtml = cid => (Game.Unlocks && Game.Unlocks.isLocked(cid))
    ? `<div class="hs-card hs-mystery" title="${esc(Game.t('Locked: gain explorer levels with this hero to unlock.'))}"><span>?</span></div>`
    : `<div class="hs-card ur-card">${Game.UI.components.cardBox(cid)}</div>`;
  const cards = `<div class="hs-group">${C.signaturesOf(id).filter(known).map(cardHtml).join('')}</div>
    <div class="hs-group">${C.exclusiveOf(id).filter(known).map(cardHtml).join('')}</div>`;

  const slots = Array.from({ length: Math.max(Game.CHARACTER_SLOTS || 0, C.list().length) }, (_, i) => {
    const hid = C.list()[i];
    if (!hid) return `<div class="hs-slot empty"><span class="hs-q">?</span><small>Coming soon</small></div>`;
    const x = C.get(hid);
    return `<div class="hs-slot ${hid === id ? 'on' : ''}" style="--hc:${x.color}" data-action="pickHero" data-arg="${esc(hid)}">
      <span class="hs-face">${Game.UI.character.render({ view: 'front', size: 190, character: hid })}</span>
      <small>${esc(x.name)}</small></div>`;
  }).join('');

  return `<div class="hero-select" style="--hc:${h.color}">
    <h2>Choose your hero</h2>
    <p class="muted">Every hero starts with their own deck and passive, and can find cards no one else can.</p>
    <div class="hs-body">
      <div class="hs-stage">
        <div class="hs-glow"></div>
        ${Game.UI.character.render({ view: 'front', size: 340, character: id })}
        <div class="hs-pedestal"></div>
      </div>
      <div class="hs-info">
        <div class="hs-name">${esc(h.name)}</div>
        <div class="hs-title">${esc(h.title)}</div>
        <p class="hs-blurb">${esc(h.blurb)}</p>
        <div class="hs-stats">
          <span class="hs-stat hp"><b>${h.hp}</b><small>HP</small></span>
          <span class="hs-stat en"><b>${h.energy}</b><small>Energy</small></span>
          <span class="hs-stat dk"><b>${h.deck.length}</b><small>Cards in deck</small></span>
        </div>
        <div class="hs-section"><h4>Starting passive</h4>${passives}</div>
        <div class="hs-section"><h4>Exclusive cards <span class="muted">(${exclusive.length})</span></h4><div class="hs-cards">${cards}</div></div>
      </div>
    </div>
    <div class="hs-roster">${slots}</div>
    <div class="hs-actions">${button('Back', 'toMenu')}<button class="primary" data-action="startRun" data-arg="${esc(id)}">Start run</button></div>
  </div>`;
});
