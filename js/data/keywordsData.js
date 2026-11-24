// KEYWORDS: short rules shown next to a card when you hover it, and on HUD icons.
// match: words in a card's text that bring the keyword up (case-insensitive).
// Statuses (Poison, Weak, Vulnerable) come from data/statusesData.js automatically.
// New keyword = one entry here.
Game.KEYWORDS = {
  block:     { icon: '🛡', name: 'Block', match: ['block'], color: '#7aa8ff',
    text: 'Stops that much incoming attack damage. Your block goes away at the start of your next turn.' },
  strength:  { icon: '🔥', name: 'Strength', match: ['strength'], color: '#ff9a3c',
    text: 'Each point adds 1 damage to every hit of your attack cards. Lasts for this fight.' },
  energy:    { icon: '⚡', name: 'Energy', match: ['energy'], color: '#ffd35a',
    text: 'Pays for cards. You get your full energy back at the start of each turn; unspent energy is lost.' },
  exhaust:   { icon: '✦', name: 'Exhaust', match: ['exhaust'], color: '#b8b0c8',
    text: 'After you play it, the card is removed until the end of this fight.' },
  power:     { icon: '✧', name: 'Power', match: [], color: '#c49ae8',
    text: 'Stays active for the rest of the fight once played. Playing it again stacks it. See all active powers with the Powers button.' },
  nextTurn:  { icon: '⏳', name: 'Next turn', match: ['next turn'], color: '#7fd6c2',
    text: 'The effect waits and happens at the start of your next turn, after you draw.' },
  all:       { icon: '✺', name: 'ALL enemies', match: ['ALL'], exact: true, color: '#ffb36a',
    text: 'Hits every enemy that is still standing.' },
  random:    { icon: '🎲', name: 'Random', match: ['random'], color: '#e0d080',
    text: 'The game rolls it when the card is played, so each play can turn out differently.' },
  draw:      { icon: '🂠', name: 'Draw', match: ['draw'], color: '#cfc8d8',
    text: 'Take cards from your draw pile into your hand. If it is empty, your discard pile is shuffled in first.' },
  loseHp:    { icon: '♥', name: 'Lose HP', match: ['lose'], color: '#ff6a6a',
    text: 'Costs HP directly. Block does not help.' },
  help:      { icon: '?', name: 'Controls', match: [], color: '#d9a441',
    text: 'Attacks: drag a card up (or click it) and point roughly at an enemy; it lights up when it will be hit. Other cards: click, or drag up. Keys: 1-9 play a card, Left/Right change target, E end turn, Esc cancel. Hover anything to read what it does.' },
  timed:     { icon: '⌖', name: 'Timed', match: ['timed'], color: '#ffe066',
    text: 'Playing it opens a timing bar. Stop the cursor in the middle (Space or click) for a stronger effect; a miss makes it weaker. Speed can be changed in Settings.' },
  stay:      { icon: '⚓', name: 'Stay', match: ['Stay'], exact: true, color: '#5ab8d8',
    text: 'If you do not play it, it stays in your hand at the end of your turn instead of being discarded.' },
  unplayable:{ icon: '✕', name: 'Unplayable', match: ['unplayable'], color: '#8f8a96',
    text: 'Cannot be played. It just takes up room in your hand.' },
};
