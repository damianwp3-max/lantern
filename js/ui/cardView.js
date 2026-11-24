// CARD VIEW
// Draws one card face: cost gem, framed picture on the top half, a name ribbon
// across the middle with the type under it, and the description on the bottom
// half (numbers and keywords highlighted).
// Colors come from data/cardTypesData.js, the picture from ui/cardArt.js.
// Frame, ribbon, shine and corner ornaments: css/cardFrame.css (card layout: css/cards.css).
// opts: action, arg (hand index or id), selected, disabled, deal (animation order, -1 = none),
//       fan { rot, dy } (tilt in the hand, set by the combat screen)
Game.UI = Game.UI || {};

Game.UI.cardView = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function costColor(card) {
    if (card.unplayable) return Game.COST_COLORS[0];
    const list = Game.COST_COLORS;
    return list[Math.min(card.cost, list.length - 1)];
  }

  // Keywords to bold in the description: rule names and status names from the data files.
  let kwRe = null;
  function keywordRe() {
    if (kwRe) return kwRe;
    const words = [];
    // forms: other spellings of a name used in card text (inflected words in other languages, see data/i18n).
    [Game.KEYWORDS, Game.STATUSES].forEach(t => Object.values(t || {}).forEach(k => { if (k.name) words.push(k.name); (k.forms || []).forEach(f => words.push(f)); }));
    const list = [...new Set(words)].filter(w => w.length > 2).sort((a, b) => b.length - a.length)
      .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // Letter-aware word edges, so names with Polish letters (ą, ś, ...) still match as whole words.
    kwRe = list.length ? new RegExp(`(?<![\\p{L}])(${list.join('|')})(?![\\p{L}])`, 'gu') : /$^/;
    return kwRe;
  }
  Game.Events.on('lang:changed', () => { kwRe = null; });

  // Description with <b class="kw"> keywords and <b class="cn"> numbers.
  function formatText(text) {
    return esc(text)
      .replace(keywordRe(), '<b class="kw">$1</b>')
      .replace(/(^|[^\w#])(\d+)(?![\w])/g, '$1<b class="cn">$2</b>');
  }

  // Thin ornament drawn over the whole card (corner filigree + side ticks), tinted by type.
  const ORNAMENT = `<svg class="cf-orn" viewBox="0 0 172 244" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
        <path d="M5 30 V12 Q5 5 12 5 H30"/><path d="M142 5 H160 Q167 5 167 12 V30"/>
        <path d="M5 214 V232 Q5 239 12 239 H30"/><path d="M142 239 H160 Q167 239 167 232 V214"/>
        <path d="M10 22 Q10 10 22 10" opacity=".6"/><path d="M150 10 Q162 10 162 22" opacity=".6"/>
        <path d="M10 222 Q10 234 22 234" opacity=".6"/><path d="M150 234 Q162 234 162 222" opacity=".6"/>
      </g>
      <g fill="currentColor"><circle cx="5" cy="5" r="2.2"/><circle cx="167" cy="5" r="2.2"/><circle cx="5" cy="239" r="2.2"/><circle cx="167" cy="239" r="2.2"/>
        <path d="M86 236 L90 240 L86 244 L82 240Z"/></g>
    </svg>`;

  const TIMED_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="8" r="1.8" fill="currentColor"/><path d="M8 0.5 V3.5 M8 12.5 V15.5 M0.5 8 H3.5 M12.5 8 H15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  // Exhaust is always written in the description (never as a sticker): add it when the text does not say it yet.
  function cardText(card) {
    const text = card.text || '';
    if (!card.exhaust || /exhaust|wyczerp/i.test(text)) return text;
    return `${text} ${Game.I18N.translate('Exhaust.')}`.trim();
  }

  function render(cardId, opts = {}) {
    const card = Game.CARDS[cardId];
    const kind = Game.CARD_TYPES[card.type] || { label: card.type, color: '#666' };
    const deal = opts.deal === undefined ? -1 : opts.deal;
    const pierce = card.pierce && Game.PIERCINGS[card.pierce];
    const cls = ['card', 't-' + card.type, opts.disabled ? 'disabled' : '', opts.selected ? 'selected' : '', deal >= 0 ? 'deal' : '',
      card.upgraded ? 'upgraded' : '', card.upgradeCost ? 'cost-down' : '', pierce ? 'pierced p-' + card.pierce : '', card.xcost ? 'x-card' : ''].join(' ');
    const vars = [`--tc:${kind.color}`, `--cc:${costColor(card)}`];
    if (pierce) vars.push(`--pc:${pierce.color}`);
    if (deal >= 0) vars.push(`animation-delay:${deal * ((Game.TURN_FLOW || {}).drawStaggerMs || 60)}ms`, `animation-duration:${(Game.TURN_FLOW || {}).drawFlyMs || 380}ms`);
    if (opts.fan) vars.push(`--rot:${opts.fan.rot}deg`, `--dy:${opts.fan.dy}px`);
    const attrs = opts.action ? ` data-action="${opts.action}" data-arg="${esc(opts.arg)}" data-index="${esc(opts.arg)}"` : '';
    return `<div class="${cls}"${attrs} style="${vars.join(';')}" data-type="${card.target}" data-card="${esc(cardId)}">
      <div class="cost"><span>${card.unplayable ? '✕' : card.xcost ? 'X' : card.cost}</span></div>
      <div class="top">
        ${Game.UI.cardArt ? Game.UI.cardArt.render(cardId) : ''}
        <i class="mote m1"></i><i class="mote m2"></i><i class="mote m3"></i>
        <i class="art-glass"></i>
        ${card.timed && card.pierce !== 'timed' ? `<div class="timed-tag">${TIMED_ICON}Timed</div>` : ''}
        ${pierce && card.pierce !== 'single' ? `<div class="pierce-tag"><b>${esc(pierce.icon)}</b>${esc(pierce.name)}</div>` : ''}
      </div>
      <div class="banner"><div class="name">${esc(card.name)}</div></div>
      <div class="type">${esc(kind.label)}</div>
      <div class="text"><span>${formatText(cardText(card))}</span></div>
      ${ORNAMENT}
      <i class="card-shine"></i>
    </div>`;
  }

  return { render, costColor, formatText, cardText };
})();
