// TOOLTIP TEXT: pets. Adds to Game.UI.tipText (ui/tipText.js) without editing it:
//   data-tip="pet:<id>"   a pet on the battlefield (ui/pets/petView.js): its trick + HP
// and extends the side panel of a hovered pet card with the Companion rule and the
// pet's trick, the same way the Bat's card shows the Bat's passive (ui/heroTips.js).
(function () {
  const T = Game.UI.tipText;
  const combat = () => Game.App && Game.App.state.combat;

  T.pet = function (id) {
    const d = Game.PETS[id]; if (!d) return null;
    const c = combat(), pet = c && Game.Pets.get(c, id);
    const hp = pet ? ` ${pet.hp} / ${pet.maxHp} HP${pet.block ? `, ${pet.block} ${Game.t('block')}` : ''}.` : '';
    return { art: `<span class="tip-pet">${Game.UI.petArt.svg(id)}</span>`, title: d.name, label: 'Companion', color: d.color,
      text: `${d.passive.name}: ${d.passive.text}${hp}` };
  };

  // The Magpie's chip: which card it marked and what playing it gives.
  T.shiny = function (id) {
    const d = Game.PETS[id], c = combat(), pet = c && Game.Pets.get(c, id);
    const card = pet && pet.state.shiny && Game.CARDS[pet.state.shiny];
    if (!d || !card) return T.pet(id);
    return { art: `<span class="tip-pet">${Game.UI.petArt.svg(id)}</span>`, title: `${d.passive.name} ${card.name}`, label: 'Companion', color: d.color,
      text: `${Game.t('Play this card this turn to draw {n} card(s).', { n: d.draw })} ${card.text}` };
  };

  const base = T.cardKeywords;
  T.cardKeywords = function (cardId) {
    const out = base.call(this, cardId);
    const card = Game.CARDS[cardId];
    const petId = card && card.petCard;
    if (!petId) return out;
    const d = Game.PETS[petId], k = Game.KEYWORDS.companion;
    out.unshift({ icon: k.icon, title: k.name, label: 'Rule', color: k.color, text: k.text });
    out.unshift({ art: `<span class="tip-pet">${Game.UI.petArt.svg(petId)}</span>`, title: d.passive.name, label: d.name, color: d.color, text: d.passive.text });
    return out;
  };
})();
