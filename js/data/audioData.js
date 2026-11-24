// AUDIO DATA
// Sound files and how loud each one is. Played by js/audio/audio.js.
// New sound = one entry in Game.SOUNDS, then Game.Audio.play('<id>').
//   files     one is picked at random each time (sounds/ folder); an entry can be
//             { src, volume } to even out variants that are louder than the others
//   volume    base loudness 0..1, multiplied by the Effects volume setting (kept low on purpose)
//   cooldown  ms; the same sound is not replayed faster than this
//   channel   'sfx' or 'music' (which volume slider controls it)
Game.SOUNDS = {
  // Moving the cursor onto a card in your hand: one of two shuffle variants.
  cardHover: { files: [{ src: 'sounds/card_shuffle_1.mp3', volume: 1 }, { src: 'sounds/card_shuffle_2.mp3', volume: 0.55 }],
               volume: 0.22, cooldown: 45, channel: 'sfx' },
  // Interface (sounds/ui/, from kupka's UI pack; trimmed to start at once).
  click:   { files: ['sounds/ui/click.mp3'],    volume: 0.35, cooldown: 50,  channel: 'sfx' },   // any plain button
  snap:    { files: ['sounds/ui/snap.mp3'],     volume: 0.55, cooldown: 50,  channel: 'sfx' },   // pick an option / a target
  confirm: { files: ['sounds/ui/confirm.mp3'],  volume: 0.30, cooldown: 80,  channel: 'sfx' },   // main (gold) buttons
  open:    { files: ['sounds/ui/open.mp3'],     volume: 0.80, cooldown: 80,  channel: 'sfx' },   // a window opens
  close:   { files: ['sounds/ui/close.mp3'],    volume: 0.90, cooldown: 80,  channel: 'sfx' },   // a window closes, Back, leave
  error:   { files: ['sounds/ui/error.mp3'],    volume: 0.30, cooldown: 150, channel: 'sfx' },   // can't do that
  whoosh:  { files: ['sounds/ui/whoosh.mp3'],   volume: 0.15, cooldown: 300, channel: 'sfx' },   // go to a new place
  endTurn: { files: ['sounds/ui/end_turn.mp3'], volume: 0.90, cooldown: 300, channel: 'sfx' },
  chime:   { files: ['sounds/ui/chime.mp3'],    volume: 0.28, cooldown: 400, channel: 'sfx' },   // something unlocked
  reward:  { files: ['sounds/ui/reward.mp3'],   volume: 0.20, cooldown: 300, channel: 'sfx' },   // a card pack opens
};

// Music tracks (none yet). Add { file: 'sounds/xxx.mp3', volume: 0.3 } and call Game.Audio.playMusic('<id>').
Game.MUSIC = {};

// When sounds play (js/audio/soundHooks.js). One click makes one sound, picked in this order:
//   pressing something disabled -> error; a window opening/closing -> open/close;
//   `actions` (by data-action name, null = silent); a main button -> confirm; else click.
Game.AUDIO_HOOKS = {
  handCardSelector: '.hand.fan .card',
  clickSelector: 'button, [data-action], [data-overlay-close], .pack-open, .event-option, .rest-option, .shop-service, .rb-item',
  ignoreSelector: 'input',
  disabledSelector: '[disabled], .disabled',
  confirmSelector: 'button.primary',
  actions: {
    selectCard: 'snap',                   // hand cards: hover = shuffle, click = snap (can't play = error)
    endTurn: 'endTurn', takeReward: 'confirm',
    target: 'snap', setSetting: 'snap', pickHero: 'snap', pickCard: 'snap', eventChoose: 'snap',
    back: 'close', toMenu: 'close', quit: 'close', cancelCard: 'close', pickCancel: 'close', leaveShop: 'close', libraryBack: 'close',
    buyCard: 'confirm', buyLantern: 'confirm', buyOil: 'confirm', buyTotem: 'confirm', takeTotem: 'confirm', shopService: 'confirm',
    restHeal: 'confirm', restOil: 'confirm', restPassive: 'confirm', pickPiercing: 'snap', libraryTab: 'snap', libraryUpgraded: 'snap', openPack: 'snap',
    chooseNode: 'whoosh', nextLevel: 'whoosh', startRun: 'whoosh', continueRun: 'whoosh',
  },
  // Elements without a data-action (checked before confirm / click).
  selectors: { '[data-mc]': 'snap', 'summary': 'snap', '.pack-open': 'snap' },
  // Layers that act on pointerdown instead of click.
  pointerdown: { '.timing-layer': 'snap' },
  // Game events that make a sound on their own (inside a click they replace its sound).
  events: { 'cards:unlocked': 'chime', 'heroCards:unlocked': 'chime', 'pack:opened': 'reward', 'pack:cardRevealed': 'open' },
};

// Volume options in Settings (added to Game.SETTINGS_DEF). Values are percent 0..100.
Game.SETTINGS_DEF.push(
  { id: 'musicVolume', type: 'slider', default: 50, min: 0, max: 100, step: 5, label: 'Music volume',
    text: 'How loud the music is. 0 turns it off.' },
  { id: 'sfxVolume', type: 'slider', default: 50, min: 0, max: 100, step: 5, label: 'Effects volume',
    text: 'How loud card and button sounds are. 0 turns them off.' },
);
