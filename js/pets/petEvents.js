// PET EVENTS (rules). The events are data/petEventsData.js.
//   effect { type: 'pet', id }   adds the pet's card to your deck and remembers it in run.pets
//   Pet events are rarer: at most Game.PET_RULES.petEventsPerLevel per level. When the
//   event picker lands on one too many, it picks again (the skipped one stays unseen).
(function () {
  const CE = Game.CaveEvents;

  CE.handlers.pet = function (run, e) {
    const p = Game.PETS[e.id];
    if (!p) return null;
    run.deck.push(p.card.id);
    run.pets = (run.pets || []).concat(e.id);
    Game.Events.emit('deck:cardAdded', { cardId: p.card.id, from: 'event' });
    return `${Game.t(p.name)} joins you. Added to your deck: ${Game.CARDS[p.card.id].name}`;
  };

  const isPetEvent = id => !!(Game.CAVE_EVENTS[id] && Game.CAVE_EVENTS[id].pet);
  const basePick = CE.pick;
  CE.pick = function (run) {
    const level = run.levelIndex || 0;
    const met = (run.petEvents || {})[level] || 0;
    let id = basePick.call(this, run);
    for (let tries = 0; tries < 6 && isPetEvent(id) && met >= Game.PET_RULES.petEventsPerLevel; tries++) {
      run.seenEvents = run.seenEvents.filter(x => x !== id);   // not met after all
      const next = basePick.call(this, run);
      if (next === id) break;
      id = next;
    }
    if (isPetEvent(id)) run.petEvents = Object.assign({}, run.petEvents, { [level]: met + 1 });
    return id;
  };
})();
