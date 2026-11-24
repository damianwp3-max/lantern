// TOOLTIP TEXT
// Builds the content of every hover tooltip from the data files, so the text
// lives in data (statusesData, powersData, passivesData, intentsData, keywordsData).
// Each builder returns { icon, title, label, text, color } or null.
// Elements ask for a tooltip with data-tip="kind:id:n" (see ui/tooltip.js), e.g.
//   data-tip="status:poison:3"   data-tip="power:kiln_heart:2"   data-tip="intent:1"
// New kind = add a function to Game.UI.tipText.
Game.UI = Game.UI || {};

Game.UI.tipText = (function () {
  const fill = (tpl, vars) => String(tpl || '').replace(/\{(\w+)(-1)?\}/g, (m, k, minus) =>
    vars[k] === undefined ? m : String(minus ? Math.max(0, vars[k] - 1) : vars[k]));
  const combat = () => Game.App && Game.App.state.combat;

  return {
    status(id, n) {
      const d = Game.STATUSES[id]; if (!d) return null;
      n = Number(n) || 0;
      return { art: `<span class="tip-icon">${Game.UI.statusIcons.render(id, 18)}</span>`, title: `${d.name} ${n}`, label: d.kind === 'buff' ? 'Buff' : 'Debuff', color: d.color, text: fill(d.tip || d.text, { n }) };
    },

    power(id, n) {
      const d = Game.POWERS[id]; if (!d) return null;
      n = Number(n) || 1;
      return { icon: d.icon, title: d.name + (n > 1 ? ` ×${n}` : ''), label: 'Power', color: '#c49ae8',
        text: d.text + (n > 1 ? ` Stacked ${n} times, so it happens ${n} times.` : '') };
    },

    passive(id) {
      const d = Game.PASSIVES[id]; if (!d) return null;
      return { art: Game.UI.passiveArt.render(id, 30), title: d.name, label: 'Passive · whole run', color: (d.art && d.art.color) || '#d9a441', text: d.text };
    },

    keyword(id) {
      const d = Game.KEYWORDS[id]; if (!d) return null;
      return { icon: d.icon, title: d.name, label: 'Rule', color: d.color, text: d.text };
    },

    // What an enemy is about to do, with the real numbers. part = dmg | block | debuff | card
    // (one icon of the bubble); with no part, the whole move.
    intent(uid, part) {
      const c = combat(); if (!c) return null;
      const e = c.enemies.find(x => String(x.uid) === String(uid)); if (!e) return null;
      const move = Game.Combat.intentOf(e);
      const d = Game.INTENTS[move.type] || { icon: '?', name: move.type, tip: '' };
      const dmg = move.type === 'attack' ? Game.Statuses.modifyDamage(e, Game.EnemyMoves.victim(c, e), move.value) : 0;
      const hits = move.hits || 1;
      const blockN = Game.Statuses.modifyBlock(e, Game.Scaling.block(e, move.type === 'block' ? move.value : (move.selfBlock || 0)));
      const st = move.status ? (Game.STATUSES[move.status] || { name: move.status, icon: '?', color: '#c49ae8' }) : null;
      const amt = move.amount || 1;
      const title = `${e.name}: `;
      if (part === 'dmg') {
        let text = fill(hits > 1 ? Game.INTENTS.attack.tipMulti : Game.INTENTS.attack.tip, { dmg, hits, total: dmg * hits });
        if (dmg !== move.value) text += ` (Normally ${move.value}; changed by Weak, Vulnerable or the size of the group.)`;
        return { icon: Game.INTENTS.attack.icon, title: title + 'Attack', label: 'Damage · next turn', color: '#e07a70', text };
      }
      if (part === 'block') return { icon: Game.INTENTS.block.icon, title: title + 'Defend', label: 'Block · next turn', color: '#9ab8ff', text: `Will gain ${blockN} block.` };
      if (part === 'buff' || (!part && move.type === 'buff')) {
        const b = Game.STATUSES[move.buff || 'might'] || { name: 'Might', color: '#ff6a4a', text: '' };
        const amt2 = move.amount || 1;
        return { art: `<span class="tip-icon">${Game.UI.statusIcons.render(move.buff || 'might', 18)}</span>`, title: `${title}Empower`, label: 'Buff · next turn', color: b.color,
          text: `${fill(move.allies ? Game.INTENTS.buff.tipAllies : Game.INTENTS.buff.tip, { value: amt2 })} ${b.text}` };
      }
      if (part === 'card') return { icon: Game.INTENTS.addCard.icon, title: title + 'Spores', label: 'Clog · next turn', color: '#a8d88a', text: fill(Game.INTENTS.addCard.tip, { value: move.value, card: (Game.CARDS[move.card] || {}).name || 'Spore Clump' }) };
      if (part === 'debuff' && st) return { art: `<span class="tip-icon">${Game.UI.statusIcons.render(move.status, 18)}</span>`, title: `${title}${st.name}`, label: 'Debuff · next turn', color: st.color, text: `Will give you ${amt} ${st.name}. ${fill(st.text, { n: amt })}` };
      let text = move.type === 'attack' ? fill(hits > 1 ? d.tipMulti : d.tip, { dmg, hits, total: dmg * hits }) : fill(d.tip, { value: move.value });
      if (move.type === 'debuff') text = 'Will curse you.';
      if (move.selfBlock) text += ` It also gains ${blockN} block.`;
      if (st) text += ` Then gives you ${amt} ${st.name}.`;
      return { icon: d.icon, title: title + d.name, label: 'Intent · next turn', color: move.type === 'attack' ? '#e07a70' : '#9ab8ff', text };
    },

    // The top bar blocks (ui/topBar.js).
    topbar(part) {
      const run = Game.State.run; if (!run) return null;
      const level = Game.LEVELS[run.levelIndex];
      const rows = run.map && run.map.rows ? run.map.rows.length : level.rows.length;
      const floor = Math.min(Math.max(0, (run.row == null ? -1 : run.row) + 1) + 1, rows);
      const c = Game.App && Game.App.state.combat;
      const T = {
        where: { title: `Level ${run.levelIndex + 1} of ${Game.LEVELS.length}: ${level.name}`, label: 'Where you are', color: '#d9a441',
          text: `Floor ${floor} of ${rows}. Each pip is one row of the map; the last one is the boss. Beat the boss to go down to the next level.` },
        hp: { title: `HP ${run.hp} / ${run.maxHp}`, label: 'Health · whole run', color: '#e2574c',
          text: 'Your health carries over between fights. At 0 the run is over. Rest sites and some cards heal it.' },
        deck: { title: `Deck: ${run.deck.length} cards`, label: 'Click to view', color: '#8ab0e8', text: 'Every card you own. Each fight starts by shuffling all of them into your draw pile.' },
        won: { title: `Fights won: ${Game.RunStats ? Game.RunStats.get().fightsWon : 0}`, label: 'This run', color: '#e8c27a', text: 'How many fights you have won so far in this run.' },
        turn: { title: `Turn ${c ? c.turn : 1}`, label: 'This fight', color: '#7fd6c2', text: 'Click to end your turn (or press E / Space). The number is the current turn of this fight.' },
        settings: { title: 'Settings', label: 'Options', color: '#cfc8d8', text: 'Timing speed, timed cards on or off, and a practice bar.' },
        menu: { title: 'Main menu', label: 'Leave', color: '#cfc8d8', text: 'Back to the main menu. Your run is saved.' },
      };
      const t = T[part]; if (!t) return null;
      return { art: `<span class="tip-icon" style="color:${t.color}">${Game.UI.topBar.icon({ where: 'lantern', hp: 'heart', deck: 'deck', won: 'swords', turn: 'hourglass', settings: 'gear', menu: 'menu' }[part])}</span>`, ...t };
    },

    block(n) {
      const k = Game.KEYWORDS.block;
      return { icon: k.icon, title: `Block ${n}`, label: 'Defense', color: k.color, text: k.text };
    },

    strength(n) {
      const k = Game.KEYWORDS.strength;
      return { icon: k.icon, title: `Strength ${n}`, label: 'Buff', color: k.color, text: `Your attacks deal +${n} damage per hit. Lasts for this fight.` };
    },

    energy() {
      const c = combat(); const p = c && c.player;
      const k = Game.KEYWORDS.energy;
      return { icon: k.icon, title: p ? `Energy ${p.energy}/${p.maxEnergy}` : 'Energy', label: 'Resource', color: k.color, text: k.text };
    },

    hp() {
      const c = combat(); const p = c && c.player;
      return { icon: '♥', title: p ? `HP ${p.hp}/${p.maxHp}` : 'HP', label: 'You', color: '#ff6a6a',
        text: 'If it reaches 0, the run is over. HP carries over between fights; heal at rest sites.' };
    },

    delayed() {
      const c = combat(); const list = (c && c.delayed) || [];
      const k = Game.KEYWORDS.nextTurn;
      const items = list.map(d => d.text).filter(Boolean);
      return { icon: k.icon, title: `${list.length} waiting effect${list.length === 1 ? '' : 's'}`, label: 'Next turn', color: k.color,
        text: k.text + (items.length ? ' Waiting: ' + items.join(' / ') : '') };
    },

    pile(which) {
      const c = combat(); if (!c) return null;
      const info = {
        draw:    ['🂠', 'Draw pile', c.drawPile.length, 'Cards you will draw next. Click to see them (in random order).'],
        discard: ['♻', 'Discard pile', c.discardPile.length, 'Played and discarded cards. When the draw pile runs out, these are shuffled back in. Click to see them.'],
        exhaust: ['✦', 'Exhausted', c.exhausted.length, 'Cards removed for this fight (powers and Exhaust cards). Click to see them.'],
      }[which];
      if (!info) return null;
      return { icon: info[0], title: `${info[1]} (${info[2]})`, label: 'Cards', color: '#cfc8d8', text: info[3] };
    },

    // Side panel for Timed cards (the card text itself never mentions timing).
    timedTip(card) {
      const k = this.keyword('timed');
      const pct = Math.round(Game.TIMING.swing * 100);
      const types = (card.effects || []).map(e => e.type);
      if (types.includes('damage')) k.text = `Timed: deals ${pct}% less or more depending on timing.`;
      else if (types.includes('block')) k.text = `Timed: gives ${pct}% less or more block depending on timing.`;
      else k.text = 'Timed: how many cards you draw depends on timing.';
      return k;
    },

    // The rule keywords a card's text mentions (shown beside the hovered card).
    cardKeywords(cardId) {
      const card = Game.CARDS[cardId]; if (!card) return [];
      const text = card.text || '';
      const out = [];
      const has = (word, exact) => exact ? new RegExp(`\\b${word}\\b`).test(text) : text.toLowerCase().includes(word.toLowerCase());
      Object.entries(Game.STATUSES).forEach(([id, d]) => {
        if (has(d.name) || (d.forms || []).some(f => has(f))) out.push({ icon: d.icon, title: d.name, label: d.kind === 'buff' ? 'Buff' : 'Debuff', color: d.color, text: d.text });
      });
      Object.entries(Game.KEYWORDS).forEach(([id, d]) => {
        if ((d.match || []).some(w => has(w, d.exact))) out.push(this.keyword(id));
      });
      if (card.type === 'power') out.push(this.keyword('power'));
      if (card.timed) out.push(this.timedTip(card));
      if (card.exhaust && !has('exhaust')) out.push(this.keyword('exhaust'));
      return out;
    },
  };
})();
