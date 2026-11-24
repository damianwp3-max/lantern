// PET VIEW (UI): draws your pets (js/pets/pets.js) on the battlefield, next to
// the heroine and her Bat, after the combat screen draws ('ui:rendered').
// Each pet gets its drawing (ui/pets/petArt.js), a nameplate with an HP bar,
// a block badge, and a small chip for its trick (heat, shell, stash, gold).
// Also: the Magpie's marked card glows in your hand, and pet events show the
// pet and its card. Styles: css/pets.css. Tooltip: data-tip="pet:<id>" (ui/pets/petTips.js).
Game.UI = Game.UI || {};

Game.UI.petView = (function () {
  const J = () => Game.Juice;
  const A = () => Game.UI.petArt;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  let seen = { combat: null, hp: {} };   // last drawn HP per pet id (hit / summon animations)
  let acts = [];                         // pet:act events since the last draw

  // The small chip under the name: what the pet's trick is up to right now.
  function chip(c, pet) {
    const d = Game.PETS[pet.id], s = pet.state || {};
    switch (d.ability) {
      case 'heat': {
        const pips = Array.from({ length: d.heatMax }, (_, i) => `<i class="${i < (s.heat || 0) ? 'on' : ''}"></i>`).join('');
        return `<span class="pet-chip heat" data-tip="pet:${pet.id}">${pips}</span>`;
      }
      case 'stash': return s.stash ? `<span class="pet-chip stash" data-tip="pet:${pet.id}">${esc(Game.CARDS[s.stash].name)}</span>` : '';
      case 'hoard': return s.gold ? `<span class="pet-chip gold" data-tip="pet:${pet.id}">+${s.gold}</span>` : '';
      case 'shiny': return s.shiny ? `<span class="pet-chip shiny" data-tip="shiny:${pet.id}">✧ ${esc(Game.CARDS[s.shiny].name)}</span>` : '';
      default: return '';
    }
  }

  function unitHtml(c, pet, slot, dying) {
    const H = Game.UI.combatHud, d = Game.PETS[pet.id];
    const blk = pet.block ? `<span class="blk-badge" data-tip="block:${pet.block}"><b>${pet.block}</b></span>` : '';
    const t = performance.now();
    return `<div class="pet-unit slot-${slot} pet-${pet.id} ${dying ? 'dying' : ''}" data-pet="${pet.id}" data-tip="pet:${pet.id}"
        style="--pc:${d.color};--pa:${d.accent};--bob-d:-${(t % 2800) | 0}ms">
      <div class="pet-glow"></div>
      <div class="pet-fly">${A().svg(pet.id)}</div>
      <div class="pet-plate">
        <span class="pet-name">${esc(Game.t(d.name))}</span>
        <div class="pl-bar">${blk}${H.hpBar(Math.max(0, pet.hp), pet.maxHp, 'pet-hp')}</div>
        ${chip(c, pet)}
      </div>
    </div>`;
  }

  function draw(app) {
    const c = app.combat;
    const side = document.querySelector('.near-side');
    if (!c || !side) return;
    if (seen.combat !== c) seen = { combat: c, hp: {} };
    const pets = (c.pets || []).filter(p => p.hp > 0 || (seen.hp[p.id] > 0 && !p.gone));
    pets.forEach((pet, slot) => {
      const before = seen.hp[pet.id];
      const dying = pet.hp <= 0;
      side.insertAdjacentHTML('beforeend', unitHtml(c, pet, slot, dying));
      const el = side.querySelector(`.pet-unit[data-pet="${pet.id}"]`);
      const fly = el.querySelector('.pet-fly');
      if (before === undefined || before <= 0) {
        el.classList.add('summoned');
        if (J()) setTimeout(() => J().burstAt(fly, { count: 18, color: [Game.PETS[pet.id].color, '#fff2c0'], speed: 70, size: 6 }), 60);
      } else if (pet.hp < before) {
        el.classList.add('hit');
        if (J()) { const p = J().center(fly); J().floatText(p.x, p.y - 24, `-${before - Math.max(0, pet.hp)}`, ''); }
      }
      if (dying && J()) setTimeout(() => J().burstAt(fly, { count: 24, color: [Game.PETS[pet.id].color, '#3a2340'], speed: 100, size: 7, ms: 700 }), 120);
      seen.hp[pet.id] = pet.hp;
    });
    (c.pets || []).forEach(p => { if (p.hp <= 0) seen.hp[p.id] = 0; });
    playActs(c);
    markShiny(c);
  }

  // Strikes dash at the enemy; bursts and other tricks pulse.
  function playActs(c) {
    acts.forEach(a => {
      const el = document.querySelector(`.pet-unit[data-pet="${a.pet.id}"]`);
      if (!el) return;
      const fly = el.querySelector('.pet-fly');
      const foe = a.enemy && document.querySelector(`.enemy[data-arg="${a.enemy.uid}"] .sprite`);
      if (foe && a.kind === 'peck') {
        const r1 = fly.getBoundingClientRect(), r2 = foe.getBoundingClientRect();
        const dx = (r2.left + r2.width / 2 - r1.left - r1.width / 2) * .85, dy = (r2.top + r2.height / 2 - r1.top - r1.height / 2) * .85;
        fly.animate([{ translate: '0 0' }, { translate: `${dx}px ${dy}px`, offset: .45 }, { translate: `${dx}px ${dy}px`, offset: .55 }, { translate: '0 0' }], { duration: 520, easing: 'cubic-bezier(.5,0,.3,1)' });
      } else {
        el.classList.add('act-' + a.kind);
      }
      if ((a.kind === 'fire' || a.kind === 'spark') && J()) {
        document.querySelectorAll('.enemy:not(.dead) .sprite').forEach(s => J().burstAt(s, { count: 14, color: a.kind === 'fire' ? ['#ff8a2a', '#ffe066'] : ['#b8ff7a', '#f4ffd0'], speed: 90, size: 6 }));
      }
      if (a.kind === 'gold' && J()) { const p = J().center(fly); J().floatText(p.x, p.y - 30, `+${a.amount}`, 'gold'); }
    });
    acts = [];
  }

  // The Magpie's marked card glows in your hand.
  function markShiny(c) {
    const mag = Game.Pets.get(c, 'magpie');
    const id = mag && mag.state.shiny;
    if (!id) return;
    const i = c.hand.indexOf(id);
    const el = i >= 0 && document.querySelector(`.hand .card[data-index="${i}"]`);
    if (el) el.classList.add('pet-shiny');
  }

  // Pet events: the pet itself replaces the round icon, and its card is shown beside the options.
  function decorateEvent(app) {
    const ev = app.caveEvent, def = ev && Game.CAVE_EVENTS[ev.id];
    if (!def || !def.pet) return;
    const p = Game.PETS[def.pet];
    const icon = document.querySelector('.event-icon');
    if (icon) { icon.classList.add('pet-portrait'); icon.style.setProperty('--pc', p.color); icon.innerHTML = A().svg(def.pet); }
    const card = document.querySelector('.event-card');
    if (card && !ev.result) {
      card.insertAdjacentHTML('afterend', `<div class="pet-offer"><div class="po-label">${esc(Game.t('Its card'))}</div>
        ${Game.UI.components.cardBox(p.card.id, {})}</div>`);
      document.querySelector('.event-screen').classList.add('has-pet');
    }
  }

  Game.Events.on('pet:act', a => acts.push(a));
  Game.Events.on('ui:rendered', ({ screen, app }) => {
    if (screen === 'combat') draw(app);
    if (screen === 'event') decorateEvent(app);
  });

  return { draw };
})();
