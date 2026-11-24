// EVENT BUS
// Tiny publish/subscribe. Combat, map and flow code call Game.Events.emit()
// at key moments; future systems (relics, status effects, achievements,
// sound) subscribe with Game.Events.on() instead of editing the core code.
//
// Events emitted today:
//   run:start, level:start { levelIndex }, node:enter { node }, node:complete { node }
//   combat:start { combat }, turn:start { combat }, turn:end { combat },
//   card:played { combat, cardId, card }, damage:dealt { combat, target, amount, blocked },
//   combat:end { combat, outcome }
//   enemy:turnStart { combat, enemy }, enemy:turnEnd { combat, enemy }   (statuses tick here)
//   enemy:acted { combat, enemy, move }   (right after an enemy's move ran; visuals: ui/juice/enemyActionFx.js)
//   status:changed { combat, unit, id, amount }
//   card:launch { cardId, card }   (a card starts flying, before it resolves; heroine poses)
//   deck:cardAdded { cardId, from }, reward:skipped, cards:unlocked { milestone, cards }
//   ui:rendered { screen, fx, app }   (after every screen draw; used by ui/juice)
Game.Events = {
  _handlers: {},
  on(name, fn) {
    (this._handlers[name] = this._handlers[name] || []).push(fn);
    return () => this.off(name, fn);   // call the result to unsubscribe
  },
  off(name, fn) {
    this._handlers[name] = (this._handlers[name] || []).filter(h => h !== fn);
  },
  emit(name, payload) {
    for (const fn of (this._handlers[name] || []).slice()) fn(payload);
  },
};
