// UNLOCKS VIEW (UI)
// The Unlocks screen (from the main menu): explorer level with its experience
// bar, how experience is earned, and every card set (unlocked ones in color,
// locked ones greyed out with a lock). Also the short line under the menu buttons.
// Sets: data/unlocksData.js, rules: unlocks/unlocks.js, styles: css/unlocks.css.
Game.UI = Game.UI || {};

Game.UI.unlocksView = (function () {
  const { esc, button, cardBox } = Game.UI.components;

  function counts() {
    const pool = Game.REWARD_POOL;
    const open = pool.filter(id => !Game.Unlocks.isLocked(id)).length;
    const st = Game.Unlocks.status();
    return { open, total: pool.length, sets: st.filter(s => s.done).length, allSets: st.length };
  }

  // Level badge + experience bar (also used by the fight summary).
  function levelBar(extraCls = '') {
    const L = Game.Unlocks.level();
    return `<div class="xp-line ${extraCls}">
      <span class="xp-badge"><small>Level</small><b>${L.level}</b></span>
      <span class="xp-bar"><i style="width:${L.pct}%"></i></span>
      <span class="xp-num">${L.into} / ${L.need} XP</span>
    </div>`;
  }

  function menuLine() {
    const c = counts();
    const L = Game.Unlocks.level();
    return `<p class="muted unlock-line">Explorer level ${L.level} · ${L.into} / ${L.need} XP · Card sets: ${c.sets} / ${c.allSets}</p>`;
  }

  function setRow(s) {
    const set = s.set;
    return `<div class="unlock-row ${s.done ? 'done' : ''}" style="--sc:${set.color || '#d9a441'}">
      <div class="ur-head">
        <span class="ur-label">${s.done ? '🔓' : '🔒'} ${esc(set.name)}</span>
        <span class="ur-theme">${esc(set.theme || '')}</span>
        <span class="ur-count">${set.cards.length} cards</span>
      </div>
      <div class="ur-cards">${set.cards.filter(id => Game.CARDS[id]).map(id => `<div class="ur-card ${s.done ? '' : 'locked'}">${cardBox(id)}</div>`).join('')}</div>
    </div>`;
  }

  // Heroes whose exclusive cards unlock with levels (unlocks/heroUnlocks.js).
  function heroRows() {
    if (!Game.HeroUnlocks) return '';
    const rows = Game.Characters.list().filter(hid => Game.CHARACTERS[hid].unlockPerLevel).map(hid => {
      const h = Game.CHARACTERS[hid];
      const st = Game.HeroUnlocks.status(hid);
      const open = st.filter(s => s.done).length;
      return `<div class="unlock-row hero-row ${open ? 'done' : ''}" style="--sc:${h.color || '#d9a441'}">
        <div class="ur-head">
          <span class="ur-label">${esc(h.name)}</span>
          <span class="ur-theme">${esc(Game.t('{n} cards per level gained while playing this hero.', { n: h.unlockPerLevel }))}</span>
          <span class="ur-count">${open} / ${st.length}</span>
        </div>
        <div class="ur-cards">${st.map(s => `<div class="ur-card ${s.done ? '' : 'locked'}">${cardBox(s.id)}</div>`).join('')}</div>
      </div>`;
    }).join('');
    return rows ? `<h3 class="ur-group">Hero cards</h3>${rows}` : '';
  }

  function screen() {
    const c = counts();
    const p = Game.Progress.get();
    const X = Game.EXPERIENCE.xp;
    const st = Game.Unlocks.status();
    const done = st.filter(s => s.done), locked = st.filter(s => !s.done);
    const backIcon = '<svg class="deck-back-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return `<div class="unlocks-screen">
      <header class="ur-top">
        <button class="deck-back" data-action="toMenu">${backIcon}Back</button>
        <h2>Unlocks</h2>
        <button class="deck-back ur-lib" data-action="viewLibrary">Card Library</button>
      </header>
      ${levelBar('big')}
      <p class="muted">Win fights to earn experience: normal fight ${X.fight} XP, elite ${X.elite} XP, boss ${X.boss} XP.
        Every level unlocks one card set, picked at random. Unlocked cards can show up as rewards. Progress carries over between runs.</p>
      <p class="muted">Cards unlocked: ${c.open} / ${c.total} · Card sets: ${c.sets} / ${c.allSets} · Fights won: ${p.fightsWon} · Bosses defeated: ${p.bossesWon}</p>
      ${heroRows()}
      ${done.length ? `<h3 class="ur-group">Unlocked sets</h3>${done.map(setRow).join('')}` : ''}
      ${locked.length ? `<h3 class="ur-group">Locked sets</h3>${locked.map(setRow).join('')}` : ''}
      <div class="ur-actions">${button('Back', 'toMenu')} ${button('Card Library', 'viewLibrary')}</div>
    </div>`;
  }

  return { menuLine, screen, levelBar };
})();
