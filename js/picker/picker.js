// CARD PICKER (rules)
// One screen ('picker') for every "choose a card from your deck" moment: upgrade, pierce or remove.
// It is used by rest sites, the merchant, cave events and rewards. Starting one:
//   Game.Picker.upgrade({ cost?, onDone, onCancel? })
//   Game.Picker.pierce({ piercing?, exclude?, onDone, onCancel? })     (without `piercing`, 3 are offered first, minus `exclude`)
//   Game.Picker.remove({ onDone, onCancel? })
// onDone(message) runs after the change is confirmed; onCancel (optional) adds a Back button.
// `cost` (gold) is charged only when the change is confirmed.
// The player clicks a card, sees "before -> after", and confirms.
Game.Picker = (function () {
  const app = () => Game.App.state;
  const run = () => Game.State.run;

  function start(cfg) {
    app().picker = Object.assign({ selected: null, piercing: cfg.piercing || null }, cfg);
    Game.App.go('picker');
  }

  // Which deck indexes can be picked right now.
  function eligible(p, id) {
    if (p.mode === 'remove') return true;
    if (p.mode === 'upgrade') return Game.Cards.canUpgrade(id);
    return !!p.piercing && Game.Cards.canPierce(id, p.piercing);
  }

  // The card as it will be afterwards (null for remove).
  function after(p, id) {
    if (p.mode === 'upgrade') return Game.Cards.upgrade(id);
    if (p.mode === 'pierce') return Game.Cards.pierce(id, p.piercing);
    return null;
  }

  const upgrade = o => start(Object.assign({ mode: 'upgrade', title: 'Upgrade a card', hint: 'An upgraded card costs 1 less, or its numbers go up (more damage, block, draw or stacks).', confirm: 'Upgrade' }, o));
  const remove = o => start(Object.assign({ mode: 'remove', title: 'Remove a card', hint: 'The card leaves your deck for good.', confirm: 'Remove it' }, o));
  const pierce = o => start(Object.assign({
    mode: 'pierce', title: 'Pierce a card', confirm: 'Pierce it',
    hint: o && o.piercing ? 'Pick the card to pierce. A card can carry one piercing.' : 'First pick a piercing, then the card. A card can carry one piercing.',
    offers: o && o.piercing ? [] : Game.Piercing.pickOffers(3, null, o && o.exclude),
  }, o));

  // Apply the confirmed choice to the deck. Returns a message.
  function confirm() {
    const p = app().picker, deck = run().deck;
    if (!p || p.selected === null || !eligible(p, deck[p.selected])) return null;
    const idx = p.selected, id = deck[idx], name = Game.CARDS[id].name;
    if (p.cost && !Game.Gold.spend(run(), p.cost)) return null;
    let msg;
    if (p.mode === 'remove') {
      deck.splice(idx, 1);
      run().removals = (run().removals || 0) + 1;
      msg = `${name} was removed from your deck`;
      Game.Events.emit('deck:cardRemoved', { cardId: id });
    } else {
      deck[idx] = after(p, id);
      msg = p.mode === 'upgrade' ? `${name} was upgraded` : `${name} is now ${Game.PIERCINGS[p.piercing].name}`;
    }
    app().picker = null;
    Game.State.save();
    return msg;
  }

  return { upgrade, remove, pierce, eligible, after, confirm };
})();
