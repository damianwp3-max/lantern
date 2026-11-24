// HEALING (rules)
// Every heal in a fight goes through here, so heal-related powers and passives
// have one place to hook in:
//   Game.Healing.heal(c, unit, n, opts)   heal you (c.player) or your Bat (c.bat); returns HP actually gained
//       opts.shared  true for a heal copied by Blood Bond (it is not copied back)
//   Game.Healing.lifesteal(c, dmg, pct)   heal pct of dmg; fractions are saved until they make 1 HP
//   Game.Healing.onDamage(payload, pct)   'damage:dealt' listener used by the lifesteal passive
//   Game.Healing.canOverheal(c, unit)     the Bat always can; you can with the Engorge power
// Powers read here (data/heroes/lamplighterKit.js):
//   engorge      your healing can go above max HP (extra HP is cut back when the fight ends)
//   blood_bond   your heals are copied to the Bat, the Bat's heals are copied to you
// Event: 'heal:done' { combat, unit, amount }   (ui/heroFx.js shows the green numbers)
// Effect handler 'heal' is replaced here, so card heals use these rules too.
Game.Healing = (function () {
  const { log } = Game.CombatUtil;
  const power = (c, id) => !!(c && c.powers && c.powers[id]);
  const isBat = (c, unit) => !!(c.bat && unit === c.bat);
  const alive = unit => unit && unit.hp > 0;

  function canOverheal(c, unit) {
    return isBat(c, unit) || (unit === c.player && power(c, 'engorge'));
  }

  function heal(c, unit, n, opts = {}) {
    n = Math.max(0, Math.floor(n));
    if (!c || !alive(unit) || !n) return 0;
    const before = unit.hp;
    unit.hp = canOverheal(c, unit) ? unit.hp + n : Math.min(unit.maxHp, unit.hp + n);
    const gained = unit.hp - before;
    log(c, isBat(c, unit) ? `Your Bat heals ${gained} HP.` : `You heal ${gained} HP.`);
    if (gained) Game.Events.emit('heal:done', { combat: c, unit, amount: gained });
    // Blood Bond: the other one gets the same heal (once, never back and forth).
    if (!opts.shared && power(c, 'blood_bond')) {
      const other = isBat(c, unit) ? c.player : c.bat;
      if (alive(other)) heal(c, other, n, { shared: true });
    }
    return gained;
  }

  function lifesteal(c, dmg, pct) {
    if (!c || !(dmg > 0) || !alive(c.player)) return 0;
    c.player.lifestealBank = (c.player.lifestealBank || 0) + dmg * pct;
    const whole = Math.floor(c.player.lifestealBank + 1e-9);
    if (!whole) return 0;
    c.player.lifestealBank -= whole;
    return heal(c, c.player, whole);
  }

  // Damage YOU dealt to an enemy: not poison ticks, not your Bat's bites or pets' attacks, not damage to you or an ally.
  function onDamage({ combat, target, amount, source }, pct) {
    if (!combat || !combat.player || !target || target === combat.player || target.ally) return;
    if (source === 'poison' || combat.dmgSource === 'bat' || combat.dmgSource === 'pet') return;
    lifesteal(combat, amount, pct);
  }

  // Card effect { type: 'heal', amount } (target self) heals you.
  Game.Effects.register('heal', function (c, effect) {
    heal(c, c.player, effect.amount);
  });

  // Overheal only lasts for the fight.
  Game.Events.on('combat:end', ({ combat }) => {
    const p = combat && combat.player;
    if (p && p.hp > p.maxHp) p.hp = p.maxHp;
  });

  return { heal, lifesteal, onDamage, canOverheal };
})();
