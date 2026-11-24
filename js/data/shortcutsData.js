// SHORTCUTS & COMFORT OPTIONS (data only). Used by js/ui/qol/hotkeys.js and the
// other comfort helpers in js/ui/qol/.
//
// Game.SCREEN_KEYS[screen] says which things on a screen get keys:
//   choices   selector of the clickable options: they get 1-9 (with a small key badge)
//   confirm   what Enter / Space presses (the first match that is clickable)
//   back      what Esc / Backspace presses
//   keysElsewhere: true   the number keys are already handled (ui/keyboard.js), only badges are drawn
// A new screen gets keys by adding one entry here.
Game.SCREEN_KEYS = {
  map:        { choices: '.map-node.available' },
  event:      { choices: '.event-option:not(.disabled)', confirm: '.event-card > button' },
  rest:       { choices: '.rest-option:not(.disabled)' },
  reward:     { choices: '.reward-hand .card', keysElsewhere: true },
  message:    { confirm: 'button[data-action]' },
  shop:       { back: 'button[data-action="leaveShop"]' },
  deck:       { back: '[data-action="back"]' },
  library:    { back: '[data-action="libraryBack"]' },
  unlocks:    { back: 'button[data-action="toMenu"], button[data-action="back"]' },
  lantern:    { back: 'button[data-action="toMenu"]' },
  characters: { confirm: 'button[data-action="startRun"]', back: 'button[data-action="toMenu"]' },
  picker:     { choices: '.pk-offer', confirm: '.pk-confirm button', back: 'button[data-action="pickCancel"]' },
  menu:       { choices: '.stack > button:not(:disabled)' },
};

// The list in the Controls window (press H or ?). Text only; the keys themselves live in the code.
Game.SHORTCUT_HELP = [
  { group: 'In a fight', keys: [
    ['1 – 9', 'Pick or play a card from your hand'],
    ['Left / Right, Tab', 'Change the target enemy'],
    ['Enter', 'Play the picked card on the target'],
    ['E or Space', 'End your turn'],
    ['Esc or right click', 'Put the picked card back'],
    ['F', 'Flare: burn oil for energy and a card'],
    ['D / X', 'Look at your draw / discard pile'],
  ] },
  { group: 'Everywhere', keys: [
    ['1 – 9', 'Choose an option (map, events, rest, rewards)'],
    ['Enter / Space', 'Continue'],
    ['Esc', 'Back, leave or skip; closes any window'],
    ['V', 'Look at your deck'],
    ['H or ?', 'This list'],
  ] },
];

// Comfort options in Settings (added to Game.SETTINGS_DEF).
Game.SETTINGS_DEF.push(
  { id: 'confirmEndTurn', type: 'toggle', default: true, label: 'Confirm end turn',
    text: 'If you can still play cards, the first press of End Turn asks again instead of ending your turn.' },
  { id: 'keyHints', type: 'toggle', default: true, label: 'Key hints',
    text: 'Show small number keys on cards and options you can pick with the keyboard.' },
  { id: 'damagePreview', type: 'toggle', default: true, label: 'Damage preview',
    text: 'While you hover or aim an attack, the enemy health bar shows how much it will lose.' },
);

// Tooltip of the incoming-damage badge on your nameplate (ui/qol/incomingDamage.js).
Game.KEYWORDS.incoming = { icon: '⚔', name: 'Incoming', match: [], color: '#ff8a6a',
  text: 'All the attack damage enemies plan against you this turn, after Weak and Vulnerable. Your block soaks it first. Your Bat and pets are attacked before you.' };

// Turn recap: log lines that are not worth showing after the enemies act (ui/qol/turnRecap.js).
Game.TURN_RECAP = { ms: 3200, maxLines: 5, skip: [/^---/, /shuffled/i, /^You play /] };
