// TOOLTIP TEXT: piercings, upgrades, totems, oil, gold, fight mods.
// Adds new kinds to Game.UI.tipText (ui/tipText.js) without editing it:
//   data-tip="totem:id"   data-tip="oil:dark"   data-tip="oil:flare"   data-tip="mods"   data-tip="piercing:id"
//   topbar:oil, topbar:gold   (the top bar blocks)
// It also extends cardKeywords: the side panel of a hovered card starts with the card's piercing
// and upgrade, so their rules are NOT written on the card face (like a keyword panel beside the card).
(function () {
  const T = Game.UI.tipText;

  // Wrap the top bar tips with oil and gold.
  const baseTopbar = T.topbar;
  T.topbar = function (part) {
    const run = Game.State.run;
    if (run && part === 'oil') {
      const dark = Game.Oil.isDark(run);
      return { art: `<span class="tip-icon" style="color:#e0b04a">${Game.UI.topBar.icon('oil')}</span>`, title: `Lantern oil ${run.oil} / ${run.maxOil}`, label: dark ? 'Dark!' : 'Resource · whole run', color: '#e0b04a',
        text: 'Entering a fight, elite, boss or event burns 1 oil. At 0 your lantern is dark and you cannot see what enemies will do. In a fight, the Flare burns 1 oil for extra energy and a card. Refill at rest sites, the merchant and in events.' };
    }
    if (run && part === 'gold') {
      return { art: `<span class="tip-icon" style="color:#e8c27a">${Game.UI.topBar.icon('coin')}</span>`, title: `Gold: ${run.gold}`, label: 'Currency · whole run', color: '#e8c27a',
        text: 'Won in fights. Spend it at the merchant and in some events.' };
    }
    return baseTopbar.call(this, part);
  };

  Object.assign(T, {
    oil(id) {
      if (id === 'dark') return { icon: '?', title: 'The lantern is dark', label: 'No oil', color: '#8f86ad', text: 'You cannot see what this enemy will do. Refill your oil to see it again.' };
      if (id === 'flare') {
        const D = Game.OIL, run = Game.State.run, draw = D.flareDraw + (run ? Game.Mods.get('flareDraw', run) : 0);
        return { icon: '🔥', title: 'Flare', label: `Costs ${D.flareCost} oil · once per turn`, color: '#ffb347',
          text: `Burn oil for a bright flare: gain ${D.flareEnergy} energy and draw ${draw} card${draw === 1 ? '' : 's'} right now. Key: F.` };
      }
      return null;
    },

    totem(id) {
      const d = Game.TOTEMS[id]; if (!d) return null;
      return { icon: d.icon, title: d.name, label: 'Totem · whole run', color: d.color, text: d.text };
    },

    piercing(id) {
      const p = Game.PIERCINGS[id]; if (!p) return null;
      return { icon: p.icon, title: p.name, label: 'Piercing', color: p.color, text: p.text };
    },

    mods() {
      const list = Game.FightMods.list(Game.State.run);
      return { icon: '⏳', title: 'Lasting effects', label: 'Next fights', color: '#7fd6c2',
        text: list.length ? list.map(m => `${m.text || 'Effect'} (${m.fights} fight${m.fights === 1 ? '' : 's'} left)`).join('. ') + '.' : 'None.' };
    },
  });

  // The side panel of a hovered card: piercing, then upgrade, then the usual rule keywords.
  const baseKeywords = T.cardKeywords;
  T.cardKeywords = function (cardId) {
    const card = Game.CARDS[cardId];
    const out = [];
    if (card && card.pierce && Game.PIERCINGS[card.pierce]) {
      const p = Game.PIERCINGS[card.pierce];
      let text = p.text;
      if (card.luck) {
        const ch = Game.Piercing.chances(card);
        const parts = [];
        if (ch.fail) parts.push(`${Math.round(ch.fail * 100)}% nothing`);
        if (ch.double) parts.push(`${Math.round(ch.double * 100)}% twice`);
        if (Game.Mods.get('luck')) text += ` Your luck right now: ${parts.join(', ')}.`;
      }
      out.push({ icon: p.icon, title: p.name, label: 'Piercing', color: p.color, text });
    }
    if (card && card.upgraded && card.upgradeNote) {
      out.push({ icon: '▲', title: 'Upgraded', label: 'Upgrade', color: '#ffd35a', text: card.upgradeNote });
    }
    return out.concat(baseKeywords.call(this, cardId));
  };
})();
