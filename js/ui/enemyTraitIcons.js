// STATUS ICONS for enemy traits (data/enemyTraitsData.js). Same 24 x 24 box as ui/statusIcons.js.
(function () {
  const R = Game.UI.statusIcons.register;
  const L = '#0d0c10';
  R('stoneskin', c => `<path d="M12 2 L20 6.5 V15.5 L12 22 L4 15.5 V6.5Z" fill="${c}" stroke="${L}" stroke-width="1.2"/><path d="M12 2 V12 L20 6.5 M12 12 L4 6.5 M12 12 V22" stroke="${L}" stroke-width=".9" opacity=".6"/>`);
  R('thorns', c => `<circle cx="12" cy="12" r="5" fill="${c}" stroke="${L}" stroke-width="1.1"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M12 12 L${(12 + 10.5 * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(12 + 10.5 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`).join('')}`);
  R('regen', c => `<path d="M9 3 H15 V9 H21 V15 H15 V21 H9 V15 H3 V9 H9Z" fill="${c}" stroke="${L}" stroke-width="1.2" stroke-linejoin="round"/>`);
  R('splitting', c => `<circle cx="8.5" cy="13" r="6" fill="${c}" stroke="${L}" stroke-width="1.1"/><circle cx="16.5" cy="11" r="5" fill="${c}" fill-opacity=".7" stroke="${L}" stroke-width="1.1"/><path d="M12.5 4 L11.5 20" stroke="${L}" stroke-width="1.4" stroke-dasharray="2 2"/>`);
  R('vengeful', c => `<path d="M12 21 C4 15 3 10 6 7 C8 5 11 6 12 8 C13 6 16 5 18 7 C21 10 20 15 12 21Z" fill="${c}" stroke="${L}" stroke-width="1.1"/><path d="M9 10 L11 12 M15 10 L13 12" stroke="${L}" stroke-width="1.4"/>`);
  R('fuse', c => `<circle cx="10" cy="15" r="7" fill="#3a3038" stroke="${L}" stroke-width="1.1"/><path d="M14 9 Q16 5 19 5" stroke="#c0a070" stroke-width="1.6" fill="none"/><circle cx="19.5" cy="4.5" r="2.6" fill="${c}"/>`);
  R('burrowed', c => `<path d="M2 18 Q12 8 22 18Z" fill="${c}" stroke="${L}" stroke-width="1.1"/><path d="M6 6 L14 14 M14 6 L16 4 L18 6 L16 8Z" stroke="#d8d0c0" stroke-width="1.6" fill="#d8d0c0"/>`);
  R('exposed', c => `<circle cx="12" cy="12" r="9" fill="none" stroke="${c}" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="${c}" stroke-width="2"/><circle cx="12" cy="12" r="1.6" fill="${c}"/>`);
  R('stunned', c => `<circle cx="12" cy="12" r="9" fill="${c}" fill-opacity=".25" stroke="${L}" stroke-width="1.2"/><path d="M12 4 L13.6 9 L18.8 9.2 L14.7 12.4 L16.2 17.6 L12 14.6 L7.8 17.6 L9.3 12.4 L5.2 9.2 L10.4 9Z" fill="${c}" stroke="${L}" stroke-width="1" stroke-linejoin="round"/>`);
  R('thief', c => `<path d="M7 21 V11 Q7 9 9 9 V5 Q9 3.5 10.5 3.5 Q12 3.5 12 5 V9 V4 Q12 2.5 13.5 2.5 Q15 2.5 15 4 V9 Q17 9 17 11 V21Z" fill="${c}" stroke="${L}" stroke-width="1.1" stroke-linejoin="round"/>`);
})();
