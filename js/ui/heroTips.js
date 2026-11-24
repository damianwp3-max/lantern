// TOOLTIP TEXT: hero kits (Bat, One-time cards).
// Adds to Game.UI.tipText (ui/tipText.js) without editing it:
//   data-tip="bat"   the Bat on the battlefield (ui/batView.js)
// and extends the side panel of a hovered card:
//   - a card that summons the Bat shows the Bat's passive (Game.BAT.passive), like a hero passive
//   - a One-time card shows the One-time rule instead of the generic Exhaust one
(function () {
  const T = Game.UI.tipText;
  const combat = () => Game.App && Game.App.state.combat;

  T.bat = function () {
    const c = combat(), bat = c && c.bat, B = Game.BAT;
    const k = Game.KEYWORDS.bat;
    const hp = bat ? ` ${bat.hp} / ${bat.maxHp} HP${bat.block ? `, ${bat.block} block` : ''}.` : '';
    return { icon: k.icon, title: B.name, label: 'Ally', color: k.color,
      text: `${Game.t('Enemies always attack it first. It bites your target for {n} damage when you end your turn, and gains all block you gain.', { n: B.attack })}${hp} ${B.passive.name}: ${B.passive.text}` };
  };

  const base = T.cardKeywords;
  T.cardKeywords = function (cardId) {
    const card = Game.CARDS[cardId];
    let out = base.call(this, cardId);
    if (!card) return out;
    if ((card.effects || []).some(e => e.type === 'summonBat')) {
      const p = Game.BAT.passive;
      out.push({ icon: '🩸', title: p.name, label: 'Bat passive', color: '#ff4a5a', text: p.text });
    }
    return out;
  };
})();
