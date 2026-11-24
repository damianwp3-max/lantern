// CO-OP COMBAT VIEW
// The extra pieces of the fight screen when two heroes are fighting:
//   - the teammate's see-through model with a small nameplate (click it: their deck and energy)
//   - a banner with whose turn it is, the "Gift card" button (bottom-left), "aim" tags on enemies
// The combat screen calls ally(c) and giftButton(c); everything else is added after the draw
// ('ui:rendered') so the normal combat screen needs no co-op code. Styles: css/coop.css.
Game.UI = Game.UI || {};

Game.UI.coop = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const K = () => Game.COOP;
  const on = c => !!(c && c.coop && c.ally);
  const heroName = id => (Game.CHARACTERS[id] || Game.CHARACTERS[Game.CHARACTER_DEFAULT]).name;

  // The teammate on the battlefield.
  function ally(c, fx) {
    if (!on(c)) return '';
    const a = c.ally, p = a.player, info = a.info;
    const turn = c.active === a.seat && !c.outcome && c.coopPhase !== 'enemies';
    const hit = fx && fx.allyHit;
    const chars = Game.UI.character.render({ view: 'back', size: 300, character: info.character, hit: false, poses: false }).replace(' data-mc=', ' data-mcx=');
    const pets = (a.pets || []).filter(x => x.hp > 0).map(x => `<span class="ca-pet" title="${esc(Game.t(Game.PETS[x.id].name))}">${Game.UI.petArt ? Game.UI.petArt.svg(x.id) : ''}<i>${x.hp}</i></span>`).join('');
    return `<div class="coop-ally ${turn ? 'turn' : ''} ${info.dead ? 'down' : ''} ${hit ? 'hit' : ''}" data-action="showAlly" data-tip="coop:ally" style="--cc:${K().cursorColors[a.seat]}">
      <div class="ca-model">${chars}</div>
      <div class="ca-plate">
        <div class="ca-top"><b>${esc(Game.t(K().seatNames[a.seat]))}</b><span>${esc(Game.t(heroName(info.character)))}</span>
          <span class="ca-energy" title="${esc(Game.t('Energy'))}"><i></i>${p.energy}/${p.maxEnergy}</span></div>
        <div class="ca-bar">${p.block ? `<span class="blk-badge"><b>${p.block}</b></span>` : ''}${Game.UI.combatHud.hpBar(Math.max(0, p.hp), p.maxHp, 'ally-hp')}</div>
        ${pets ? `<div class="ca-pets">${pets}</div>` : ''}
      </div>
      ${hit ? `<div class="float dmg ally-float">-${hit}</div>` : ''}
    </div>`;
  }

  // "Gift card" under the energy orb. Costs the card's energy; the teammate gets it free.
  function giftButton(c, app) {
    if (!on(c)) return '';
    const can = c.myTurn && !c.ally.info.dead && !c.outcome;
    return `<button class="gift-btn ${app && app.giftMode ? 'on' : ''}" data-action="giftToggle" ${can ? '' : 'disabled'} data-tip="coop:gift">
      <span class="gift-ico">🎁</span><span>${esc(Game.t('Gift card'))}</span></button>`;
  }

  // Overlay: the teammate's deck, energy and health.
  function showAlly(c) {
    const a = c.ally, p = a.player, { cardBox } = Game.UI.components;
    const cards = [].concat(a.hand, a.drawPile, a.discardPile, a.exhausted).map(Game.CoopGift.strip);
    const order = Object.keys(Game.CARD_TYPES);
    const sorted = cards.slice().sort((x, y) => order.indexOf(Game.CARDS[x].type) - order.indexOf(Game.CARDS[y].type) || Game.CARDS[x].name.localeCompare(Game.CARDS[y].name));
    const stat = (label, v) => `<span class="av-stat"><small>${esc(Game.t(label))}</small><b>${v}</b></span>`;
    const body = `<div class="ally-view">
      <div class="av-stats">${stat('Energy', `${p.energy} / ${p.maxEnergy}`)}${stat('HP', `${Math.max(0, p.hp)} / ${p.maxHp}`)}${stat('Block', p.block || 0)}
        ${stat('Hand', a.hand.length)}${stat('Draw pile', a.drawPile.length)}${stat('Discard pile', a.discardPile.length)}</div>
      <div class="pile-grid">${sorted.map(id => cardBox(id)).join('')}</div></div>`;
    Game.UI.overlay.open(`${Game.t(K().seatNames[a.seat])}: ${Game.t(heroName(a.info.character))}`, body, { wide: true, note: Game.t('Their whole deck (hand, draw, discard).') });
  }

  // After every combat draw: banner, aim tags, idle dimming, hit float on the ally.
  function decorate(app) {
    const c = app.combat;
    if (!on(c)) return;
    const field = document.querySelector('.battlefield');
    if (!field) return;
    const enemies = c.coopPhase === 'enemies';
    let text, cls;
    if (c.outcome) { text = ''; cls = ''; }
    else if (enemies) { text = 'The enemies are acting...'; cls = 'foe'; }
    else if (c.myTurn) { text = 'Your turn'; cls = 'mine'; }
    else { text = `${Game.t(K().seatNames[c.ally.seat])}'s turn`; cls = 'theirs'; }
    if (text) field.insertAdjacentHTML('beforeend', `<div class="turn-banner ${cls}">${esc(Game.t(text))}</div>`);
    document.querySelector('.combat-bottom')?.classList.toggle('coop-idle', !c.myTurn);
    document.querySelector('.player-unit')?.classList.add('coop-self');
    if (c.mine && c.mine.dead) document.querySelector('.player-unit')?.classList.add('down');
    // who each enemy is going to hit
    c.enemies.forEach(e => {
      const el = document.querySelector(`.enemy[data-arg="${e.uid}"]`);
      if (!el || e.hp <= 0 || e.aim === undefined || e.aim === null) return;
      const tag = document.createElement('div');
      tag.className = `aim-tag ${e.aim === c.me ? 'me' : 'ally'}`;
      tag.style.setProperty('--cc', K().cursorColors[e.aim]);
      tag.title = Game.t('This enemy aims at {name}', { name: Game.t(K().seatNames[e.aim]) });
      tag.textContent = e.aim === c.me ? Game.t('YOU') : Game.t(K().seatNames[e.aim]).replace(/\D+/, 'P');
      el.prepend(tag);
    });
    // a gifted card glows
    c.hand.forEach((id, i) => { if (id.endsWith(Game.CoopGift.SUF)) document.querySelector(`.hand .card[data-index="${i}"]`)?.classList.add('gifted'); });
    document.querySelector('.hand')?.classList.toggle('gift-mode', !!app.giftMode);
  }

  Game.Events.on('ui:rendered', ({ screen, app }) => { if (screen === 'combat') decorate(app); });
  return { ally, giftButton, showAlly };
})();
