// COMBAT SCREEN (battle-scene layout)
// Top: the battlefield inside a cave (ui/caveBackdrop.js). Enemies stand on the
// far side, the heroine closer on the left with her nameplate.
// Bottom row: energy orb + draw pile (left), the hand (middle),
// End Turn + discard pile (right). HUD pieces come from ui/combatHud.js.
// One-shot effects (hit shake, damage numbers, card deal-in) come from app.fx.
Game.UI.registerScreen('combat', function (app) {
  const { esc, button, cardBox, statusBar } = Game.UI.components;
  const H = Game.UI.combatHud;
  const c = app.combat;
  const target = Game.Combat.currentTarget(c);
  const fx = app.fx || {};

  const enemies = c.enemies.map(e => {
    const dying = e.hp <= 0 && fx.enemyKilled && fx.enemyKilled[e.uid];   // killed just now: play the fall
    if (e.hp <= 0 && !dying) return e.splitDone || e.spawned || e.fled ? '' : `<div class="enemy dead"><div class="name">${esc(e.name)}</div></div>`;   // split / spawned / fled leave no grave
    const look = Game.ENEMIES[e.id].look;
    const hit = fx.enemyHit && fx.enemyHit[e.uid];
    const st = e.statuses || {};
    const hidden = !dying && st.burrowed;   // underground: cannot be targeted (combat/enemyTraits.js)
    const sprite = look.art && Game.UI.enemyArt && Game.UI.enemyArt.has(look.art) ? Game.UI.enemyArt.sprite(look)
      : `<div class="sprite ${look.shape}" style="--c:${look.color};--s:${look.size}"><i class="eye"></i><i class="eye"></i></div>`;
    return `<div class="enemy ${dying ? 'dying' : ''} ${hidden ? 'burrowed' : ''} ${st.exposed ? 'exposed' : ''} ${!dying && !hidden && target && target.uid === e.uid ? 'targeted' : ''} ${hit ? 'hit' : ''}" style="--es:${look.size}" ${dying || hidden ? '' : 'data-action="target"'} data-arg="${e.uid}">
      ${H.intent(c, e)}
      ${sprite}${hidden ? '<div class="burrow-mound"></div>' : ''}
      <div class="shadow"></div>
      ${H.enemyPlate(e)}
      ${hit ? `<div class="float dmg">-${hit}</div>` : ''}
    </div>`;
  }).join('');

  // Hand is fanned: each card tilts a little away from the middle.
  const mid = (c.hand.length - 1) / 2;
  const hand = c.hand.map((id, i) => cardBox(id, {
    action: 'selectCard', arg: i, selected: app.selectedCard === i,
    disabled: !Game.Combat.canPlay(c, i), deal: fx.deal ? i : -1,
    fan: { rot: ((i - mid) * 3.5).toFixed(1), dy: Math.round((i - mid) * (i - mid) * 5) },
  })).join('');



  return `${statusBar(Game.State.run)}
    <div class="battlefield">
      ${Game.UI.caveBackdrop.render(Game.State.run.levelIndex)}
      <div class="far-side"><div class="enemies">${enemies}</div></div>
      <div class="near-side">
        <div class="player-unit ${fx.playerHit ? 'hit' : ''}">
          <div class="pu-light"></div>
          ${Game.UI.character.render({ view: 'back', size: 340, hit: !!fx.playerHit, poses: true, character: Game.State.run.character })}
          <div class="shadow"></div>
          ${fx.playerHit ? `<div class="float dmg player-float">-${fx.playerHit}</div>` : ''}
        </div>
        ${H.playerPlate(c)}
      </div>
      ${Game.UI.coop ? Game.UI.coop.ally(c, fx) : ''}
    </div>
    <div class="combat-bottom">
      <div class="cb-side cb-left">
        ${H.energyOrb(c)}
        ${H.pileButton(c, 'draw')}
        ${Game.UI.oilView.flareButton(c)}
        ${Game.UI.coop ? Game.UI.coop.giftButton(c, app) : ''}
      </div>
      <div class="hand fan">${hand || '<p class="muted">No cards in hand.</p>'}</div>
      <div class="cb-side cb-right">
        ${H.endTurnButton(c)}
        <div class="cb-piles">${c.exhausted.length ? H.pileButton(c, 'exhaust') : ''}${H.pileButton(c, 'discard')}</div>
      </div>
    </div>
    <div class="combat-foot">
      <span class="help-dot" data-tip="keyword:help">? Controls</span>
      <details class="log-box"><summary class="muted">Combat log</summary><div class="log">${c.log.slice().reverse().map(esc).join('<br>')}</div></details>
    </div>`;
});
