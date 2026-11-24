// HP TRAIL (look only): health bars react to change instead of jumping.
// The screens redraw from scratch, so this remembers each bar's last value
// (by whose bar it is) and, on the next draw:
//   - lost HP leaves a pale "ghost" piece that drains away after a short pause
//   - gained HP flashes green over the new part
// Also gives every bar quarter ticks, and a low-HP throb at 30% or less. Styles: css/healthbars.css.
(function () {
  let last = new Map();   // key -> { pct, combat }

  // Whose bar is it? Player, an enemy (by uid), the Bat, a pet.
  function keyOf(bar) {
    const en = bar.closest('.enemy[data-arg]');
    if (en) return 'e' + en.dataset.arg;
    const pet = bar.closest('.pet-unit[data-pet]');
    if (pet) return 'p' + pet.dataset.pet;
    if (bar.closest('.bat-unit')) return 'bat';
    if (bar.classList.contains('player-hp') || bar.closest('.player')) return 'you';
    return null;
  }

  function pctOf(bar) {
    const fill = bar.querySelector(':scope > div');
    return fill ? parseFloat(fill.style.width) || 0 : null;
  }

  function decorate(app) {
    const c = app.combat;
    const seen = new Map();
    document.querySelectorAll('#app .hpbar').forEach(bar => {
      if (!bar.querySelector(':scope > .hp-ticks')) bar.insertAdjacentHTML('afterbegin', '<i class="hp-ticks"></i>');
      const key = keyOf(bar), pct = pctOf(bar);
      if (pct !== null && pct > 0 && pct <= 30 && !bar.classList.contains('overheal')) bar.classList.add('hp-low');
      if (!key || pct === null) return;
      const before = last.get(key);
      if (before && before.combat === c) {
        if (pct < before.pct - 0.1) {
          bar.insertAdjacentHTML('afterbegin', `<i class="hp-ghost" style="left:${pct}%;width:${before.pct - pct}%"></i>`);
          bar.classList.add('hp-hurt');
        } else if (pct > before.pct + 0.1) {
          bar.insertAdjacentHTML('beforeend', `<i class="hp-healed" style="left:${before.pct}%;width:${pct - before.pct}%"></i>`);
        }
      }
      seen.set(key, { pct, combat: c });
    });
    last = seen;
  }

  Game.Events.on('ui:rendered', ({ app }) => decorate(app));
})();
