// SOUND HOOKS: decides when sounds play, so the rules and screens don't know about audio.
// What plays for what is set in data/audioData.js (Game.AUDIO_HOOKS):
//   cursor moves onto a card in your hand -> cardHover (one shuffle per card; two variants)
//   pressing something disabled           -> error
//   a click                               -> one sound: open/close if it opened or closed a
//                                            window, else the action's own sound, confirm for
//                                            main buttons, click for the rest
//   a window opens / closes by itself or with Esc -> open / close
//   game events (unlocks, packs)          -> Game.AUDIO_HOOKS.events
(function () {
  const H = Game.AUDIO_HOOKS;
  const play = id => id && Game.Audio.play(id);
  let inClick = false, pending = null;   // sound chosen for the click being handled; a window change can replace it

  // The element a press is "on": a known clickable, or else the nearest element with a pointer
  // cursor (so new buttons get a sound without being listed anywhere).
  function pressable(target) {
    if (!target.closest || target.closest(H.ignoreSelector)) return null;
    const known = target.closest(H.clickSelector);
    if (known) return known;
    for (let el = target; el && el !== document.body; el = el.parentElement) {
      if (getComputedStyle(el).cursor === 'pointer') return el;
    }
    return null;
  }

  // Sound for a pressed element, by the rules above (window changes are handled below).
  function soundFor(el) {
    const action = el.getAttribute('data-action');
    if (action && Object.prototype.hasOwnProperty.call(H.actions, action)) return H.actions[action];
    for (const [sel, id] of Object.entries(H.selectors || {})) if (el.matches(sel)) return id;
    if (el.matches('[data-overlay-close]')) return 'close';
    if (el.matches(H.confirmSelector)) return 'confirm';
    return 'click';
  }

  // A sound caused by a click (window, event) replaces the click's own sound.
  const emit = id => { if (inClick) pending = id; else play(id); };

  // Disabled buttons send no click, so errors are caught on pointerdown. Some layers (timing bar)
  // act on pointerdown and never get a click.
  document.addEventListener('pointerdown', e => {
    if (e.button !== 0 || !e.target.closest) return;
    if (H.pointerdown) for (const [sel, id] of Object.entries(H.pointerdown)) if (e.target.closest(sel)) return play(id);
    const el = pressable(e.target);
    if (el && el.matches(H.disabledSelector)) play('error');
  }, true);

  document.addEventListener('click', e => {
    if (!e.target.closest) return;
    if (H.pointerdown && Object.keys(H.pointerdown).some(sel => e.target.closest(sel))) return;   // already played
    const el = pressable(e.target);
    if (el && el.matches(H.disabledSelector)) return;   // already answered with 'error'
    pending = el ? soundFor(el) : (e.target.classList && e.target.classList.contains('overlay') ? 'close' : null);
    inClick = true;
    setTimeout(() => { play(pending); pending = null; inClick = false; }, 0);   // after the click is handled
  }, true);

  // For tests: the sound a click on this element would make.
  Game.Audio.soundForElement = el => { const p = pressable(el); return p ? (p.matches(H.disabledSelector) ? 'error' : soundFor(p)) : undefined; };

  // Windows (ui/overlay.js): a new .overlay = open, one removed = close, both = redrawn (silent).
  new MutationObserver(list => {
    let added = 0, removed = 0;
    const isOverlay = n => n.nodeType === 1 && n.classList.contains('overlay');
    list.forEach(m => { m.addedNodes.forEach(n => { if (isOverlay(n)) added++; }); m.removedNodes.forEach(n => { if (isOverlay(n)) removed++; }); });
    const id = added && !removed ? 'open' : removed && !added ? 'close' : null;
    if (!id) return;
    if (inClick) pending = id;   // inside a click: replaces its sound
    else play(id);
  }).observe(document.body, { childList: true });

  Object.entries(H.events || {}).forEach(([ev, id]) => Game.Events.on(ev, () => emit(id)));

  // Which hand card the cursor is on ("index:cardId"). The hand is redrawn often, so cards are
  // told apart by position and id, not by element: a redraw under a still cursor stays silent.
  let hovered = null;
  const keyOf = card => Array.from(card.parentNode.children).indexOf(card) + ':' + (card.dataset.arg || card.className);

  document.addEventListener('pointerover', e => {
    if (!e.target.closest) return;
    const card = e.target.closest(H.handCardSelector);
    if (!card || e.buttons) return;     // aiming / dragging a card: no hover sounds
    const key = keyOf(card);
    if (key === hovered) return;
    hovered = key;
    play('cardHover');
  });

  document.addEventListener('pointerout', e => {
    const to = e.relatedTarget;
    if (to && to.closest && !to.closest(H.handCardSelector)) hovered = null;   // moved off the hand (null = element redrawn, ignore)
  });
})();
