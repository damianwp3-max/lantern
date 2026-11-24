// COMBAT HELPERS shared by effects, enemy moves and the combat core.
Game.CombatUtil = {
  // Block soaks damage first, the rest comes off hp.
  // Hooks let rules change a hit without editing this file (combat/enemyTraits.js):
  //   incomingHooks: fn(c, target, amount) -> amount   before block (e.g. Exposed: double damage)
  //   hpLossHooks:   fn(c, target, dmg) -> dmg         after block (e.g. Stoneskin: at most 10 per hit)
  incomingHooks: [],
  hpLossHooks: [],
  dealDamage(c, target, amount, targetLabel, sourceLabel) {
    Game.CombatUtil.incomingHooks.forEach(h => { amount = h(c, target, amount); });
    const blocked = Math.min(target.block, amount);
    target.block -= blocked;
    let dmg = amount - blocked;
    Game.CombatUtil.hpLossHooks.forEach(h => { dmg = h(c, target, dmg); });
    target.hp = Math.max(0, target.hp - dmg);
    const who = sourceLabel ? `${sourceLabel} hits ${targetLabel}` : `${targetLabel} takes`;
    Game.CombatUtil.log(c, `${who} for ${dmg}${blocked ? ` (${blocked} blocked)` : ''}.`);
    Game.Events.emit('damage:dealt', { combat: c, target, amount: dmg, blocked });
  },
  log(c, msg) {
    c.log.push(msg);
    if (c.log.length > 40) c.log.shift();
  },
};
