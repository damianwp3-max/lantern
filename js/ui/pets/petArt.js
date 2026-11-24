// PET ART: one SVG drawing per pet (data/petsData.js), drawn in a 120 x 90 box.
// The same drawing is used on the battlefield (ui/pets/petView.js), on the pet's
// card (registered as card motif 'pet_<id>') and on its event, so a pet always
// looks the same wherever you meet it. Classes like .pa-tail / .pa-blink are
// small idle loops (css/pets.css).
//   Game.UI.petArt.svg(id, cls)    full <svg> for a pet
//   Game.UI.petArt.inner(id)       just the shapes
Game.UI = Game.UI || {};

Game.UI.petArt = (function () {
  const INK = '#120a14';
  const eye = (x, y, r, c) => `<g class="pa-blink"><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x + r * .35}" cy="${y - r * .35}" r="${r * .38}" fill="#fff"/></g>`;

  const DRAW = {
    // A black-and-white magpie with a blue sheen, holding a little gold ring.
    magpie: () => `
      <defs><linearGradient id="pmWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a6ad8"/><stop offset=".55" stop-color="#1a2450"/><stop offset="1" stop-color="#0c0e1c"/></linearGradient>
        <radialGradient id="pmBody" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#3a3448"/><stop offset="1" stop-color="#0e0c14"/></radialGradient></defs>
      <g class="pa-tail"><path d="M30 56 L6 70 Q4 74 9 74 L36 62Z" fill="url(#pmWing)" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M30 58 L10 71" stroke="#7aa6ff" stroke-width=".9" opacity=".7"/></g>
      <path d="M44 72 L42 82 M52 73 L52 82" stroke="#2a2430" stroke-width="2.4" stroke-linecap="round"/>
      <ellipse cx="50" cy="56" rx="22" ry="17" fill="url(#pmBody)" stroke="${INK}" stroke-width="1.8"/>
      <path d="M52 48 Q68 52 66 66 Q58 72 50 68 Q48 58 52 48Z" fill="#f4f0f8" stroke="#bdb6c8" stroke-width=".8"/>
      <path d="M30 50 Q44 42 56 52 Q46 64 30 60Z" fill="url(#pmWing)" stroke="${INK}" stroke-width="1.4"/>
      <path d="M34 52 Q44 48 52 53 M34 56 Q42 54 48 57" stroke="#8ab4ff" stroke-width=".9" fill="none" opacity=".75"/>
      <g class="pa-head"><circle cx="70" cy="38" r="13" fill="url(#pmBody)" stroke="${INK}" stroke-width="1.8"/>
        <path d="M81 38 L96 41 L81 44Z" fill="#2a2430" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="96" cy="46" r="4.2" fill="none" stroke="#ffd35a" stroke-width="2"/><circle cx="94.5" cy="44.2" r="1" fill="#fff8d0"/>
        ${eye(73, 35, 3, '#1a1420')}<circle cx="73" cy="35" r="3.6" fill="none" stroke="#7aa6ff" stroke-width=".8" opacity=".7"/></g>`,

    // A little fire salamander: dark red body, glowing yellow spots, curled tail.
    salamander: () => `
      <defs><linearGradient id="psBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a2a"/><stop offset="1" stop-color="#8a1c10"/></linearGradient>
        <radialGradient id="psGlow"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient></defs>
      <ellipse class="pa-glow" cx="60" cy="58" rx="46" ry="24" fill="url(#psGlow)" opacity=".35"/>
      <g class="pa-tail"><path d="M30 62 Q8 64 10 48 Q12 38 22 42 Q16 48 22 53 Q28 56 36 54Z" fill="url(#psBody)" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/></g>
      <path d="M40 66 L34 76 L40 75 M76 66 L82 76 L76 75 M50 68 L48 78 M66 68 L68 78" stroke="#8a1c10" stroke-width="3.4" stroke-linecap="round" fill="none"/>
      <path d="M30 56 Q50 44 74 50 Q88 52 92 46 Q100 44 102 52 Q100 62 86 62 Q70 70 46 68 Q32 66 30 56Z" fill="url(#psBody)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <g class="pa-ember"><circle cx="48" cy="56" r="3" fill="#ffe066"/><circle cx="60" cy="54" r="2.6" fill="#ffe066"/><circle cx="72" cy="56" r="2.2" fill="#ffe066"/><circle cx="38" cy="58" r="2" fill="#ffe066"/></g>
      ${eye(94, 49, 2.6, INK)}
      <path d="M96 57 Q99 58 101 56" stroke="${INK}" stroke-width="1" fill="none"/>`,

    // A cave snail with an amber spiral shell and two wobbly eye stalks.
    snail: () => `
      <defs><radialGradient id="pnShell" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffe0a0"/><stop offset=".6" stop-color="#c08a40"/><stop offset="1" stop-color="#6a4420"/></radialGradient>
        <linearGradient id="pnBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8e0a0"/><stop offset="1" stop-color="#4a7a48"/></linearGradient></defs>
      <path d="M14 74 Q14 64 28 64 L86 64 Q96 62 98 54 L104 54 Q106 72 90 76 L20 78 Q14 78 14 74Z" fill="url(#pnBody)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <g class="pa-stalk"><path d="M94 56 Q94 40 90 32 M100 56 Q104 42 106 34" stroke="#6a9a5a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <circle cx="90" cy="31" r="3.4" fill="#d8f0c8" stroke="${INK}" stroke-width="1.2"/><circle cx="106" cy="33" r="3.4" fill="#d8f0c8" stroke="${INK}" stroke-width="1.2"/>
        <circle cx="90.8" cy="31" r="1.4" fill="${INK}"/><circle cx="106.8" cy="33" r="1.4" fill="${INK}"/></g>
      <circle cx="54" cy="44" r="25" fill="url(#pnShell)" stroke="${INK}" stroke-width="2"/>
      <path d="M54 44 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16 a20 20 0 1 1 -20 -20" fill="none" stroke="#6a4420" stroke-width="1.8" opacity=".85"/>
      <path d="M38 30 Q46 24 56 25" stroke="#fff3d0" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M100 60 Q102 63 99 64" stroke="${INK}" stroke-width="1" fill="none"/>`,

    // A small wooden chest on stubby legs, lid ajar, coins and a happy tongue.
    coffer: () => `
      <defs><linearGradient id="pcWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87a40"/><stop offset="1" stop-color="#5a3418"/></linearGradient>
        <linearGradient id="pcGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset="1" stop-color="#c88a20"/></linearGradient></defs>
      <path d="M34 72 L32 82 M48 74 L48 83 M72 74 L72 83 M86 72 L88 82" stroke="#5a3418" stroke-width="4" stroke-linecap="round"/>
      <rect x="26" y="44" width="68" height="32" rx="5" fill="url(#pcWood)" stroke="${INK}" stroke-width="1.8"/>
      <path d="M26 54 H94 M26 66 H94" stroke="#3a2010" stroke-width="1" opacity=".6"/>
      <rect x="54" y="48" width="12" height="13" rx="2" fill="url(#pcGold)" stroke="${INK}" stroke-width="1.2"/><circle cx="60" cy="54" r="1.8" fill="${INK}"/>
      <path d="M26 46 V76 M94 46 V76" stroke="url(#pcGold)" stroke-width="3"/>
      <path d="M40 42 Q58 46 76 40" fill="#2a0c10" stroke="none"/>
      <path class="pa-tongue" d="M52 44 Q58 54 66 44Z" fill="#ff6a8a" stroke="${INK}" stroke-width="1"/>
      <g class="pa-lid"><path d="M24 44 Q24 22 60 20 Q96 22 96 44 Q60 38 24 44Z" fill="url(#pcWood)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M30 40 Q32 26 60 24 Q88 26 90 40" stroke="url(#pcGold)" stroke-width="2.6" fill="none"/>
        <circle cx="44" cy="33" r="3" fill="#ffe08a"/><circle cx="76" cy="33" r="3" fill="#ffe08a"/><circle cx="44.8" cy="32.2" r="1" fill="#fff"/><circle cx="76.8" cy="32.2" r="1" fill="#fff"/></g>
      <g class="pa-coins"><ellipse cx="38" cy="18" rx="5" ry="3" fill="url(#pcGold)" stroke="${INK}" stroke-width=".8"/><ellipse cx="82" cy="14" rx="4" ry="2.5" fill="url(#pcGold)" stroke="${INK}" stroke-width=".8"/></g>`,

    // A pack rat with round ears, a tiny satchel and a long pink tail.
    rat: () => `
      <defs><radialGradient id="prFur" cx="45%" cy="30%" r="75%"><stop offset="0" stop-color="#c8b0a0"/><stop offset="1" stop-color="#5a4438"/></radialGradient></defs>
      <g class="pa-tail"><path d="M30 68 Q10 72 8 60 Q6 50 16 48" stroke="#e8a0a0" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      <ellipse cx="50" cy="60" rx="24" ry="17" fill="url(#prFur)" stroke="${INK}" stroke-width="1.8"/>
      <path d="M38 74 L36 80 M60 75 L62 80" stroke="#e8a0a0" stroke-width="3" stroke-linecap="round"/>
      <path d="M36 46 L64 72" stroke="#6a3a20" stroke-width="2.4"/>
      <rect x="54" y="62" width="16" height="13" rx="3" fill="#8a5a30" stroke="${INK}" stroke-width="1.3"/><path d="M54 66 H70" stroke="#5a3418" stroke-width="1.2"/><circle cx="62" cy="68" r="1.4" fill="#ffd35a"/>
      <g class="pa-head"><circle cx="60" cy="30" r="9" fill="url(#prFur)" stroke="${INK}" stroke-width="1.6"/><circle cx="60" cy="30" r="5" fill="#e8a0a0" opacity=".7"/>
        <circle cx="86" cy="32" r="9" fill="url(#prFur)" stroke="${INK}" stroke-width="1.6"/><circle cx="86" cy="32" r="5" fill="#e8a0a0" opacity=".7"/>
        <path d="M60 44 Q70 30 84 40 Q100 48 102 54 Q96 58 82 58 Q64 58 60 44Z" fill="url(#prFur)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="102" cy="54" r="2.4" fill="#ff8aa0"/>
        <g class="pa-whisk" stroke="#e8dcd0" stroke-width=".7" opacity=".85"><path d="M98 55 L112 50 M98 56 L113 57 M98 57 L110 62"/></g>
        ${eye(84, 46, 2.6, INK)}</g>`,

    // A round night owl with ear tufts and big golden eyes.
    owl: () => `
      <defs><radialGradient id="poBody" cx="45%" cy="30%" r="80%"><stop offset="0" stop-color="#7a5aa8"/><stop offset="1" stop-color="#2a1a40"/></radialGradient>
        <radialGradient id="poEye" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff4a0"/><stop offset=".7" stop-color="#ffc030"/><stop offset="1" stop-color="#b86a10"/></radialGradient></defs>
      <path d="M48 80 L46 86 M52 80 L54 86 M68 80 L66 86 M72 80 L74 86" stroke="#d8a040" stroke-width="2" stroke-linecap="round"/>
      <g class="pa-wing-l"><path d="M34 50 Q22 62 30 78 Q38 74 40 60Z" fill="#3a2458" stroke="${INK}" stroke-width="1.5"/></g>
      <g class="pa-wing-r"><path d="M86 50 Q98 62 90 78 Q82 74 80 60Z" fill="#3a2458" stroke="${INK}" stroke-width="1.5"/></g>
      <path d="M60 14 Q86 14 88 46 Q90 82 60 82 Q30 82 32 46 Q34 14 60 14Z" fill="url(#poBody)" stroke="${INK}" stroke-width="1.9"/>
      <path d="M36 22 L34 8 L46 18Z M84 22 L86 8 L74 18Z" fill="url(#poBody)" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M46 56 Q60 50 74 56 Q74 76 60 78 Q46 76 46 56Z" fill="#c8b0e0" opacity=".35"/>
      <path d="M50 62 l3 3 l3 -3 M58 66 l3 3 l3 -3 M64 60 l3 3 l3 -3 M52 70 l3 3 l3 -3" stroke="#e8d8f8" stroke-width=".9" fill="none" opacity=".6"/>
      <circle cx="48" cy="38" r="10" fill="#e8d8f8" opacity=".25"/><circle cx="72" cy="38" r="10" fill="#e8d8f8" opacity=".25"/>
      <g class="pa-blink"><circle cx="48" cy="38" r="7.5" fill="url(#poEye)" stroke="${INK}" stroke-width="1.2"/><circle cx="72" cy="38" r="7.5" fill="url(#poEye)" stroke="${INK}" stroke-width="1.2"/>
        <circle cx="48" cy="38" r="3.4" fill="${INK}"/><circle cx="72" cy="38" r="3.4" fill="${INK}"/><circle cx="49.5" cy="36.5" r="1.3" fill="#fff"/><circle cx="73.5" cy="36.5" r="1.3" fill="#fff"/></g>
      <path d="M57 44 L60 52 L63 44Z" fill="#ffc030" stroke="${INK}" stroke-width="1"/>`,

    // A glowworm hanging from a silk thread, its tail glowing green.
    glowworm: () => `
      <defs><radialGradient id="pgGlow"><stop offset="0" stop-color="#f4ffd0"/><stop offset=".4" stop-color="#b8ff7a"/><stop offset="1" stop-color="#b8ff7a" stop-opacity="0"/></radialGradient>
        <linearGradient id="pgBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a5a48"/><stop offset="1" stop-color="#3a2e24"/></linearGradient></defs>
      <path d="M60 0 V24" stroke="#e8f0e0" stroke-width=".8" opacity=".6"/>
      <g class="pa-sway">
      <circle class="pa-glow" cx="62" cy="70" r="24" fill="url(#pgGlow)" opacity=".55"/>
      <circle cx="60" cy="30" r="8" fill="url(#pgBody)" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="64" cy="42" r="8.6" fill="url(#pgBody)" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="66" cy="54" r="8.6" fill="url(#pgBody)" stroke="${INK}" stroke-width="1.5"/>
      <circle class="pa-ember" cx="63" cy="67" r="9.4" fill="#d8ff9a" stroke="#6a9a3a" stroke-width="1.5"/>
      <circle cx="60" cy="64" r="3" fill="#fff" opacity=".8"/>
      ${eye(57, 29, 1.8, '#f4ffd0')}${eye(63, 29, 1.8, '#f4ffd0')}
      <path d="M57 33 Q60 35 63 33" stroke="#f4ffd0" stroke-width=".8" fill="none"/></g>`,
  };

  const inner = id => (DRAW[id] ? DRAW[id]() : '');
  const svg = (id, cls = '') => `<svg class="pet-svg ${cls}" viewBox="0 0 120 90" aria-hidden="true">${inner(id)}</svg>`;

  // Card art: the same drawing, fitted into the card's 100 x 50 picture box.
  const M = Game.UI.cardArt && Game.UI.cardArt.registerMotif;
  if (M) Object.keys(DRAW).forEach(id => M('pet_' + id, c => `
    <circle cx="50" cy="26" r="24" fill="${c}" opacity=".12"/>
    <path d="M22 48 Q50 40 78 48" stroke="${c}" stroke-width="1" fill="none" opacity=".45"/>
    <g class="art-float"><g transform="translate(19 -5) scale(.56)">${inner(id)}</g></g>`));

  return { svg, inner };
})();
