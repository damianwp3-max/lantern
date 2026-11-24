// COMBAT HUD
// The pieces around the battle: your nameplate (HP, block, statuses, powers),
// the energy orb, the draw / discard pile buttons and the enemy nameplates.
// Every number has a hover tooltip (data-tip, see ui/tipText.js).
// Styles: css/hud.css. Used by ui/screens/combatScreen.js.
Game.UI = Game.UI || {};

Game.UI.combatHud = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const SV = () => Game.UI.statusView;

  function hpBar(hp, max, cls = '') {
    const pct = Math.max(0, Math.round(100 * hp / max));
    return `<div class="hpbar ${cls}" data-tip="${cls.includes('player-hp') ? 'hp' : ''}"><div style="width:${pct}%"></div><span class="hp-text">${hp} / ${max}</span></div>`;
  }

  const blockBadge = n => n ? `<span class="blk-badge" data-tip="block:${n}"><b>${n}</b></span>` : '';

  // Your nameplate under the heroine.
  function playerPlate(c) {
    const p = c.player;
    const powerCount = Object.keys(c.powers || {}).length;
    const chips = SV().strength(p.strength) + SV().statusChips(p) + SV().delayedChip(c) + SV().powerChips(c);
    return `<div class="player">
      <div class="pl-top">
        <span class="pl-name">${esc(Game.Characters ? Game.Characters.of(Game.State.run).name : 'Lamplighter')}</span>
        <button class="pw-btn" data-action="showPowers" data-tip="keyword:power">✧ Powers${powerCount ? ` <b>${powerCount}</b>` : ''}</button>
      </div>
      <div class="pl-bar">${blockBadge(p.block)}${hpBar(p.hp, p.maxHp, 'player-hp')}</div>
      ${chips ? `<div class="st-row">${chips}</div>` : ''}
    </div>`;
  }

  // Big glowing orb next to the hand.
  function energyOrb(c) {
    const p = c.player;
    return `<div class="energy-orb ${p.energy ? '' : 'empty'}" data-tip="energy">
      <div class="eo-core"></div><span class="energy">${p.energy}<small>/${p.maxEnergy}</small></span></div>`;
  }

  function pileButton(c, which) {
    const n = { draw: c.drawPile.length, discard: c.discardPile.length, exhaust: c.exhausted.length }[which];
    const icon = { draw: '🂠', discard: '♻', exhaust: '✦' }[which];
    return `<button class="pile-btn pile-${which}" data-action="showPile" data-arg="${which}" data-tip="pile:${which}">
      <span class="pile-stack"><i></i><i></i><i></i><span class="pile-icon">${icon}</span></span>
      <span class="pile-count">${n}</span></button>`;
  }

  // Enemy nameplate: name, HP bar with numbers, block, statuses.
  function enemyPlate(e) {
    return `<div class="plate">
      <div class="name">${esc(e.name)}</div>
      <div class="pl-bar">${blockBadge(e.block)}${hpBar(e.hp, e.maxHp)}</div>
      ${SV().statuses(e)}
    </div>`;
  }

  // The "what I'll do next" bubble: separate icons for damage, block, debuff (ui/intentView.js).
  function intent(c, e) {
    return Game.UI.intentView.render(c, e);
  }

  // Big End Turn button with the turn counter inside it.
  function endTurnButton(c) {
    return `<button class="end-turn-btn" data-action="endTurn" data-tip="topbar:turn">
      <span class="et-label">End Turn</span>
      <span class="et-turn">Turn <b>${c.turn || 1}</b></span>
    </button>`;
  }

  return { endTurnButton, playerPlate, energyOrb, pileButton, enemyPlate, intent, hpBar };
})();
