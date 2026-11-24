// JUNK FX (UI): when an enemy puts cards into your deck (Spore Clump, ...), the real card faces
// fly out of the enemy into the pile they land in (discard by default, draw pile or hand). kupka, 2026-11-23.
// Fed by combat/enemyActions.js (act.junk = { card, n, to }); plugs into ui/juice/enemyActionFx.js.
(function () {
  const J = Game.Juice;
  const D = () => Game.ENEMY_ACTION_FX.kinds.junk;
  const TARGET = { discard: '.pile-discard', draw: '.pile-draw', hand: '.hand' };

  J.actionKinds.junk = function (el, c, act) {
    const info = act.junk;
    if (!info || !Game.CARDS[info.card]) return;
    const sprite = el.querySelector('.sprite') || el;
    const target = document.querySelector(TARGET[info.to] || TARGET.discard);
    if (!target) return;
    const from = J.center(sprite), to = J.center(target);
    const layer = J.layer();
    const html = Game.UI.cardView.render(info.card);
    for (let i = 0; i < info.n; i++) {
      setTimeout(() => {
        if (!document.body.contains(target)) return;
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        const g = wrap.firstElementChild;
        g.classList.add('fly-card');
        const w = 172, h = 244;   // card size; the fly-card is a clone, so it is placed by its centre
        Object.assign(g.style, { left: from.x - w / 2 + 'px', top: from.y - h / 2 + 'px', width: w + 'px', height: h + 'px' });
        layer.appendChild(g);
        const dx = to.x - from.x, dy = to.y - from.y;
        J.burst(from.x, from.y, { count: 8, color: D().colors, speed: 50, size: 5 });
        g.animate([
          { transform: 'translate(0,0) scale(.15) rotate(-25deg)', opacity: 0 },
          { transform: 'translate(0,-40px) scale(.5) rotate(8deg)', opacity: 1, offset: .22 },
          { transform: `translate(${dx * .6}px, ${dy * .6 - 30}px) scale(.42) rotate(-6deg)`, opacity: 1, offset: .65 },
          { transform: `translate(${dx}px, ${dy}px) scale(.18) rotate(0deg)`, opacity: .2 },
        ], { duration: J.reduced ? 120 : D().flyMs, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' }).onfinish = () => {
          g.remove();
          target.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.16)' }, { transform: 'scale(1)' }], { duration: 160, easing: 'ease-out' });
          J.burst(to.x, to.y, { count: 5, color: D().colors, speed: 30, size: 5, ms: 340 });
        };
      }, i * D().staggerMs);
    }
  };
})();
