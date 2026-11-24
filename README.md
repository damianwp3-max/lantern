# Lantern Descent (deck builder skeleton)

An original deck builder roguelike skeleton. You are a lamplighter going down
through three levels underground. Placeholder graphics only: boxes and text.

## How to run

Open `index.html` in any browser (double-click it). No install, no server, no build step.

## How a run goes

Main menu (New Run / Continue / Quit) -> map -> pick a node -> fight or rest ->
pick a reward card after a fight -> back to the map -> boss -> next level.
Beat the third boss to win. If your HP hits 0, the run ends.

## The three levels

1. **The Root Cellar**: rats and mold. Boss: Root Warden.
2. **The Drowned Halls**: crabs and eels. Boss: Tide Bell.
3. **The Ember Vault**: imps and golems. Boss: Vault Keeper.

Each level is 5 rows of nodes (fight, elite, rest, boss). You pick one node per row.

## Project rules (from the project instructions)

- Modular: never put everything in one file. One feature = its own file or folder.
- `index.html` is structure only: it links styles and scripts, no game logic, no long styles.
- CSS is split by theme in `css/`.
- Card, enemy, level and totem definitions are separate data files; adding one means adding an entry.
- Each module has one clear job, and systems talk through small registries and an event bus so totems, status effects, a shop or saving plug in without editing the core.

## Files

```
index.html                  links only
css/
  base.css                  colors, page, buttons
  layout.css                screen layout helpers, fade-in
  map.css                   map nodes
  combat.css                enemy slots, player panel, log
  enemies.css               enemy shapes (CSS only)
  cards.css                 cards, hand, dragging
  fx.css                    floating damage numbers
js/
  core/
    namespace.js            the global Game object (load first)
    util.js                 shuffle, pick, sample
    events.js               event bus: Game.Events.on / emit
  data/                     definitions only, no logic
    cardsData.js            cards, starter deck, reward pool
    enemiesData.js          enemies, move patterns, look
    levelsData.js           the three levels
    totemsData.js           totems (they used to be called relics)
  state/
    runState.js             the run: hp, deck, totems, oil, gold, level, map position
    save.js                 saving and loading (localStorage)
  map/map.js                builds a level map, which nodes can be picked
  combat/
    helpers.js              damage and log helpers
    effects.js              one handler per card effect type
    enemyMoves.js           one handler per enemy move type
    combat.js               turn rules: piles, energy, playing cards, enemy turn
  ui/
    components.js           buttons, card box (top bar: ui/topBar.js)
    ui.js                   screen registry and render
    fx.js                   hp before/after -> shake and damage numbers
    drag.js                 drag a card onto an enemy
    screens/                one file per screen (menu, map, combat, reward, rest, deck, message)
  app/
    app.js                  current screen, go(), finishNode()
    actions/                button actions by area (menu, map, combat, reward)
  main.js                   bootstrap: click listener and first screen
```

Rule of thumb: **data** says *what exists*, **combat/map/state** say *how it works*,
**ui** only *draws*, **app** *connects* them, and **Game.Events** lets new systems listen in.

## How to extend

- **New card**: add an entry to `Game.CARDS` in `data/cardsData.js`.
- **New card effect** (poison, heal, ...): `Game.Effects.register('poison', fn)` in `combat/effects.js`, then use `{ type: 'poison', amount: 3 }` in card data.
- **New enemy**: add it to `data/enemiesData.js`, and put its id in a level's pools. New move type: `combat/enemyMoves.js`. New look: add a shape class in `css/enemies.css`.
- **New level**: add an object to `Game.LEVELS`. The game picks up the count automatically.
- **New screen** (shop, event): add `js/ui/screens/shopScreen.js` calling `Game.UI.registerScreen('shop', fn)`, add `js/app/actions/shopActions.js` doing `Object.assign(Game.Actions, {...})`, and link both in `index.html`.
- **Totems / status effects**: totems are data in `data/totemsData.js` (`on` handlers + `mods`), wired by `js/totems/totems.js`. Ids go in `run.totems`.
- **Saving**: change only `state/save.js`.

## Controls

Drag a card onto an enemy to play it. Skill cards: drag them up anywhere, or just click.
Fallback: click an attack card, then click the enemy. With only one enemy left, one click plays it.

## Placeholder choices (guesses, easy to change)

- Theme and all names are made up for this skeleton.
- Any node in the next row is reachable (no branching paths yet).
- Player: 50 HP, 3 energy, 5 cards per turn. Rest heals 30% of max HP.
- Starter deck: 5 Lamp Strike, 4 Brace, 1 Rummage.
- Continue saves between nodes only. Quitting mid-fight restarts that node.
- Quit shows a goodbye screen, since a browser tab can't close itself.
- Block resets at the start of your turn; enemy block resets before it acts.
- Elites currently give the same reward as normal fights.

## Map, rest sites and battle layout (update)

- **Map**: `js/map/mapGen.js` builds branching, non-crossing paths; `js/ui/screens/mapScreen.js` draws them
  (SVG lines + round nodes), positions in `js/ui/mapLayout.js`, node looks/legend in `js/data/mapNodesData.js`,
  style in `css/map.css`. You can only walk along the drawn paths. Levels now have 7 rows.
- **Rest sites**: pick ONE option: heal (`js/data/restData.js`, `js/rest/rest.js`) or a passive for the run.
  Passives are plain data in `js/data/passivesData.js` (add an object, done); `js/passives/passives.js`
  wires them to `Game.Events`. Owned passives show as icons in the top bar. Actions: `js/app/actions/restActions.js`.
- **Battle**: enemies small/far at the top, hero bigger/near at the bottom-left, hand below (`combatScreen.js`, `css/combat.css`).
- **Drag**: dropping a card on an enemy slides it into the enemy, then plays it (`js/ui/drag.js`).
- Old saves still load (no paths -> any node in the next row; no passives -> none).

## Main character

An original, cute (moe) anime-style girl: short curly blue bob, big crimson eyes, two tiny fangs,
a gold moth hair clip, a navy lamplighter capelet over a white blouse, and a small lantern.
Drawn in SVG from code (no image files), with a front and a back view.

- `js/data/characterArt.js`: the drawing itself (palette + `front` / `back` views). Recolor = edit the palette.
- `js/ui/character.js`: `Game.UI.character.render({ view, size, hit, poses })` returns her HTML. Click her to turn around.
- `css/character.css`: idle loop (breathing, sway, bouncy curls, head tilt, blinking, moth-clip flutter, lantern swing).
- Poses: `js/data/characterPosesData.js` (which card type plays which pose, timings), `js/ui/characterPoses.js`
  (plays them, survives re-renders), `css/characterPoses.css` (the keyframes), `js/ui/juice/heroJuice.js` (hooks them to the game).
  - Attack: the card flies into her hand and she throws it, spinning, at the enemy (`Game.Juice.throwCard`).
  - Defense: arms up, crouch, a blue barrier blooms. Skill / Power: she raises the lantern and it flares.
  - Hurt: knock-back and red flash (">_<" eyes on the front view). Fight won: two happy hops.

She shows from the front on the main menu and from behind in battle (facing the enemies).

## Cards: types, look and art

- **Types** (`js/data/cardTypesData.js`): attack, defense, skill, power, useless. Each has a label and a frame color.
  Powers leave the fight after you play them. Useless cards (like Spore Clump, which the Mold Heap adds) are unplayable.
- **Cost colors**: 0 grey, 1 green, 2 yellow, 3 red (`Game.COST_COLORS` in the same file).
- **Card face** (`js/ui/cardView.js`, `css/cards.css`): the top half is the picture with the name and type on it, the bottom half is the description.
- **Pictures**: `js/data/cardArtData.js` says which picture each card uses (`motif` + `color`); cards with no entry get one from their first effect.
  `js/ui/cardArt.js` holds the drawings (add one with `Game.UI.cardArt.registerMotif`), `css/cardArt.css` the glow and idle motion.
- New card = one entry in `cardsData.js`, plus optionally one line in `cardArtData.js`.
- Enemy intent icons: `js/data/intentsData.js`.

## Game feel (animations and effects)

- `js/ui/juice/screenFx.js`: building blocks (`Game.Juice`): shake, flash, particles, floating text, card flight, banner.
- `js/ui/juice/combatJuice.js`: hit sparks, screen shake by damage, red flash when you're hit, block/strength pop-ups, hp bar drain, enemy lunges and death bursts, End Turn glows when nothing is playable.
- `js/ui/juice/rewardJuice.js`: VICTORY / DEFEAT banners, confetti, reward cards flipping in, the picked card flying into your deck.
- These listen to the `ui:rendered` event, so combat rules don't know about them. `js/ui/fx.js` works out what changed.
- `css/hand.css`: fanned hand, hovered card lifts and neighbours step aside. `css/enemyIdle.css`: each enemy shape idles differently, eyes look around.
- `css/juice.css`: the look of all effects and the aim arrow. Turning on "reduce motion" in the system tones it all down.

## Controls (update)

- **Attacks**: drag up and an arrow appears; release anywhere above the hand and it hits the closest enemy.
  Or click the card, then click anywhere near an enemy. Right click or Esc cancels.
- **Other cards**: click, or drag up and release above the hand. Released in the hand, the card slides back.
- **Keys**: 1-9 play a card, Left/Right change target, Enter fire at target, E or Space end turn. Rewards: 1-3 take, S skip.
- Code: `js/ui/targeting.js` (arrow, closest enemy), `js/ui/drag.js` (dragging), `js/ui/keyboard.js` (keys).

## More cards, statuses, delayed effects and powers (update)

61 new cards, in themed files under `js/data/cards/` (each file calls `Game.registerCards({...})`,
from `js/core/cardRegistry.js`, which also adds the card to the reward pool and registers its `art`):

- `multiTargetCards.js`: hit ALL enemies, or random enemies several times (`target: 'all'` / `'random'`).
- `delayedCards.js`: "next turn ..." cards (`{ type: 'nextTurn', effects: [...] }`).
- `randomCards.js`: random rolls (`amount` + `max`), random cards (`addRandomCard`), random outcomes (`randomOf`).
- `statusCards.js`: poison, weak, vulnerable, healing, HP costs, block tricks.
- `powerCards.js`: powers that last the fight (`{ type: 'power', power: 'id' }`).

A new card = one entry in one of those files, with `art: { motif, color }`. `exhaust: true` removes it for the rest of the fight.

Rules, each in its own file:

- `js/combat/resolver.js`: runs a card's effects and picks targets per effect (`enemy`, `all`, `random`, self; `hits: N`).
- `js/combat/effects.js`: effect handlers (damage, block, status, heal, loseHp, addRandomCard, randomOf, ...).
- `js/combat/statuses.js` + `js/data/statusesData.js`: poison / weak / vulnerable.
- `js/combat/delayed.js`: the "next turn" queue (shown as ⏳ next to your stats).
- `js/combat/powers.js` + `js/data/powersData.js`: powers are data (when they trigger and which effects they run).
  Triggers: turnStart, turnEnd, cardPlayed (optionally by card type), nthCard, enemyKilled, hurt.
- `js/ui/statusView.js` + `css/statuses.css`: icons for statuses, powers and waiting effects (hover for details).
- `js/ui/cardMotifs/mechanicMotifs.js`: 24 more card drawings.

## Aiming (update)

- The arrow always follows the pointer. The enemy you will hit lights up, its name appears next to the
  arrow tip, and a faint dotted line connects them.
- Forgiving: you don't have to touch the enemy. The nearest enemy within about 130 px of the pointer counts
  (about 320 px when only one is left). The pick is "sticky", so it doesn't flicker between enemies standing close together.
- Released with nothing lit, the attack just goes back to your hand. Cards that hit ALL or random enemies light up every enemy while you drag them up.
- Code: `js/ui/targeting.js` (`REACH`, `REACH_SOLO`, `STICKY` at the top to tune it).

## Battle screen polish, tooltips, piles, powers, cave (update)

- **Layout**: bigger heroine, enemies and cards, less empty space. Bottom row: energy orb + draw pile (left),
  hand (middle), End Turn + discard pile (right). Shorter screens get slightly smaller sizes (media queries).
  Files: `js/ui/screens/combatScreen.js`, `js/ui/combatHud.js` (nameplates, HP bars, energy orb, pile buttons, intents),
  `css/combat.css`, `css/hud.css`, `css/hand.css`.
- **Nameplate**: "Lamplighter" plate next to her with HP bar (numbers inside), shield badge for block, all buffs/statuses,
  and a Powers button. Her lantern now lights the ground around her.
- **Tooltips**: hover anything (statuses, powers, block, strength, energy, HP, intents, piles, passives) for a clear description.
  Hovering a card lists the rules its text mentions (Block, Poison, Exhaust, Next turn, ...).
  Text comes from data: `js/data/keywordsData.js`, `tip` in `statusesData.js`, `intentsData.js`.
  Code: `js/ui/tipText.js` (builds the text), `js/ui/tooltip.js` (shows it, any element with `data-tip="kind:id:n"`), `css/tooltip.css`.
- **Passive pictures**: each passive has `art: { icon, color }` in `passivesData.js`, drawn by `js/ui/passiveArt.js`
  (add a drawing with `registerIcon`). Shown in the top bar, at rest sites and in the effects list.
- **Pile viewers**: click the draw pile (shown sorted, so it doesn't spoil the order), the discard pile, or the exhausted pile.
  **Active effects**: the Powers button (or any power chip) lists powers with their card art and stacks, buffs, statuses and passives.
  Code: `js/ui/overlay.js` (modal window, Esc closes), `js/ui/viewers/pileViewer.js`, `js/ui/viewers/powersViewer.js`,
  `js/app/actions/viewerActions.js`, `css/overlay.css`.
- **Cave background**: stalactites, rock walls, glowing moss (level 1), crystals and a pool (level 2), ember crystals (level 3),
  swinging lanterns with flickering light, a light shaft, fog and floating spores / bubbles / embers.
  Look per level in `js/data/caveData.js`; drawing in `js/ui/caveBackdrop.js`; motion in `css/cave.css`.
- **Enemy moves** can now carry extras: `hits` (multi-attack), `status` + `amount` (debuffs you), `selfBlock`,
  and there is a `debuff` move type (`js/combat/enemyMoves.js`).

### Balance (checked with a headless bot playing 3000 runs)

Before: level 1 was a walk (boss took ~5 HP), level 3 was a wall (most deaths there), bot win rate ~41%.
After: deaths spread over all three levels. Then made much harder on request: the final tuning has a bot win rate of ~11%.
- Player: 50 max HP. Going down a level heals 10% (`descendHealPercent` in `restData.js`).
- Enemies: about 12% more HP and attack damage than the first pass; bosses Root Warden 76, Tide Bell 83, Vault Keeper 103.
  Multi-hit attacks and Weak / Vulnerable / Poison on some moves. Level 1 elite is now Mold Heap + 2 Rats.
- Too strong, toned down: Second Wind, Midnight Oil and Roll the Bones now Exhaust; Patch Guard 2 block; Chaos Spark 3 damage.
- Too weak, buffed: Kindle +2 str, Ember Heart +4 str, Ember Echo cost 1 and 3 dmg, Kiln Heart 5, Rot Bloom 3 poison,
  Ashen Pact loses 1 HP, Dreaming Wick cost 1 + draws 1, Night Vigil 4 block/energy, Bellows cost 2 + 1 str now,
  Venom Wick cost 1, Ashen Crown cost 2.
- Passives: Thick Coat +12, Ember Charm 8 block, Quick Wick +1 energy for 2 turns, Deep Pockets 3 cards, Warm Glow heals 3.

## Card unlocks and the fight summary (update)

Replaced on 2026-11-23 by card sets and explorer levels, see "Card sets, heroes, Polish, camp" below.
Still true: `js/state/runStats.js` (per-run numbers), the fight summary box and the "Fight over" pop-up
(`js/ui/fightSummary.js`), the Unlocks screen (`js/ui/unlocksView.js`, `js/ui/screens/unlocksScreen.js`), `css/unlocks.css`.

## Timed cards, debuffs, intents, group scaling (update)

- **Timed cards** (`timed: true` on a card, see `js/data/cards/timedCards.js`): playing one opens a bar; a cursor sweeps once across it
  and you stop it with Space / Enter / click. Middle = Perfect, edges = Miss, no press = Miss.
  Rules: `js/timing/timing.js`; numbers (HARD base: sweep time, zone sizes, multipliers): `js/data/timingData.js`;
  the window: `js/ui/timingView.js` + `css/timing.css`. Damage/block effects are multiplied by the result; a `draw` effect can list
  `byRating: { miss, ok, good, great, perfect }`. Cards show a gold "Timed" tag.
- **Starter deck** now also has Lantern Swing (new type "Attack + Defense": 6 damage and 5 block, both scaled by timing)
  and Steady Breath (skill: draws 0 / 1 / 2 / 3 / 4 cards by timing). Reward cards: Precise Cut, Steady Ward, Lucky Flash.
- **Settings** (menu or top bar): `js/data/settingsData.js` (options), `js/state/settings.js` (storage), `js/ui/viewers/settingsViewer.js`,
  `js/app/actions/settingsActions.js`. Timing speed x0.5 .. x2 (Normal = hard base), Timed cards on/off, "Try the timing" practice.
- **Debuffs**: Weak, Vulnerable, Poison already existed; new **Frail** (25% less block, fades by 1 per turn) in `js/data/statusesData.js` + `js/combat/statuses.js`.
  Slag Golem and Tide Bell now use it.
- **Enemy announcements**: `js/ui/intentView.js` + `css/intents.css`. A speech bubble with a separate pill for damage, block, debuff and junk cards
  (e.g. attack + debuff = two icons), each with its own hover tip.
- **Group scaling**: `js/data/scalingData.js` + `js/combat/scaling.js`. 2 enemies: 80% hp and damage each, 3: 70%, 4: 60%. A lone enemy or boss is unchanged.

## Timed bounce, card frames, status icons, fonts, top bar (update)
- **Timed cards**: the cursor now bounces back and forth forever; only your click / Space / Enter ends it. A Miss is nearly
  useless (x0.15, e.g. 9 damage -> 1), Weak is x0.55. Numbers in `js/data/timingData.js`; bar logic `js/ui/timingView.js`.
  The bar shows a small legend of what each zone gives.
- **Card faces**: metal type-tinted frame, framed picture with glass glare and drifting light specks, name ribbon, type tab,
  corner filigree, a shine sweep on hover, numbers and keywords highlighted in the text. Layout `css/cards.css`,
  details `css/cardFrame.css`, markup `js/ui/cardView.js` (`formatText` bolds keywords from keywordsData + statusesData).
- **Status icons**: SVG drawings in `js/ui/statusIcons.js` (no emoji). Debuffs get a red ring and a red down-arrow tab,
  buffs a green up-arrow tab, stacks in a corner badge. New status = add a drawing there under its id.
- **Fonts**: `css/fonts.css` + `/fonts` (Nunito for text, Fredoka for titles and numbers, both OFL, work offline).
  Change `--font-body` / `--font-display` to swap fonts everywhere.
- **Top bar**: `js/ui/topBar.js` + `css/topbar.css`. Blocks: level badge + name + floor pips (boss pip red), HP with meter
  (pulses when low), Deck (click to view), fights Won, Turn (in fights), passives, Settings and Menu. Hover tips in
  `ui/tipText.js` (`topbar`).


## Piercings, upgrades, oil, events, merchant, lantern (update)

All of this is data-first: add an entry, no engine edits.

- **Piercings** (`data/piercingsData.js`): a mark on ONE card instance that changes how it plays. Lucky (20% twice),
  Unlucky (20% nothing), Joker (50% nothing / 50% twice), Collector (stays in hand), Single-use (once per fight, exhaust),
  X Cost (spends all energy, effects happen X times), Pack (becomes a pack that adds a random card for the fight).
  The card face shows only a small badge; the rule appears in the side panel on hover (`ui/tipTextExtra.js`).
  Rules at play time: `combat/combat.js` (playCard, endTurn) and `cards/piercing.js`.
- **Upgrades** (`data/upgradesData.js`, `cards/upgrade.js`): separate from piercings. A card is upgraded once: it costs 1 less,
  or gets one extra effect. A card can carry its own `upgrade: { cost: -1 }` or `{ effects, text }`.
- **Card variants** (`cards/variants.js`): deck entries are ids like `strike_lamp`, `strike_lamp+` (upgraded),
  `strike_lamp@lucky` (pierced), `strike_lamp+@joker` (both). `Game.CARDS[id]` builds them on demand, so nothing else needs special cases.
- **New cards**: `data/cards/luckCards.js`, `keepCards.js` (collector + single-use), `xCards.js`, `packCards.js`.
  A card with `pierce: 'x'` has that piercing from the start. New card type `pack` in `cardTypesData.js`.
- **Card picker** (`picker/picker.js`, `ui/screens/pickerScreen.js`): one screen for "choose a card to upgrade / pierce / remove",
  used by rest sites, merchant, events and rewards. Shows before -> after and asks to confirm.
- **Lantern oil** (`data/oilData.js`, `oil/oil.js`, `ui/oilView.js`): run resource, 1 oil per fight/elite/boss/event node.
  At 0 oil enemy intents are hidden ("?"). The Flare in a fight (key F) burns 1 oil for +1 energy and a card, once per turn.
  Refill: rest site (+5, and +1 free at the fire), merchant, events, Oil Flask totem.
- **Gold** (`economy/gold.js`, `data/shopData.js`): fights pay gold; spent at the merchant and in events.
- **Cave events** (`data/caveEventsData.js`, `caveEvents/caveEvents.js`, `ui/screens/eventScreen.js`): "?" nodes with 2-3 options and prices.
  Effects: gold, hp, maxHp, oil, totem, card, upgrade, pierce, remove, fightMod (a bonus or penalty for the next fights, `caveEvents/fightMods.js`), gamble.
  New event = one entry. New effect type = add a handler in `caveEvents.js`.
- **Merchant** (`shop/shop.js`, `ui/screens/shopScreen.js`): sells cards (sometimes pre-pierced), totems, and services:
  remove a card (costs more each time), upgrade a card, pierce a card, refill oil. Map node type `shop`.
- **Merchant look** (`data/merchantArtData.js` palette, `ui/merchantArt.js` SVG, `css/merchant.css` idle): an original round pill-bug peddler with a pale mask face, big black eyes, bell-tipped antennae, plum shell plates, mossy scarf and a lantern pole.
- **Totems** (`data/totemsData.js`, `totems/totems.js`): the old "relics". Rewards from elites and bosses, the merchant and events.
  Numbers shared across the run go through `Game.Mods` (`core/mods.js`): totems and lantern upgrades both add to it.
- **Bonus rewards** (`rewards/rewards.js`): elites and bosses give a totem. Fights never give upgrades or piercings (kupka's rule: cards are only upgraded or pierced at cave events and the merchant).
- **Lantern upgrades** (`data/lanternData.js`, `lantern/lantern.js`, `state/meta.js`, `ui/screens/lanternScreen.js`):
  permanent upgrades bought between runs with Embers (earned at the end of every run: 1 per fight, 4 per boss, +10 for a win).
  Main menu -> Lantern. Saved in localStorage (`lantern_descent_meta_v1`), separate from the run save.
- **Map**: new node types `event` (?) and `shop` (◈) in `data/mapNodesData.js`; rows in `data/levelsData.js`.
- **Rest site** now offers: heal, refill oil, or one of 2 passives (pick one). No upgrades there (same rule).
- **Premium marks** (`data/shopData.js` `markStall.premium`): Collector costs 300 gold at the mark stall and is left out of the plain "Pierce a card" service and of pre-pierced shop cards.
- Old saves still load (`state/runState.js` migrate adds the new fields; relics become totems).
- `js/data/relicsData.js` is gone (replaced by `totemsData.js`); delete it from your folder if it is still there.

## Upgrades, enemy AI, 12-floor levels, card library (2026-11-23)
- **Upgrades** (`js/cards/upgrade.js`, numbers in `js/data/upgradesData.js`): an upgrade now either makes a card cost 1 less (cards that cost 2+, powers) or makes its own effects bigger (more damage, block, draw, energy, stacks). The card text is rewritten with the new numbers. Only cards whose numbers can't be shown fall back to "costs 1 less" or "Draw 1 card".
- **Aiming arrow bug**: the arrow only appears in fights now (`js/ui/targeting.js`); it used to show up on the upgrade/pierce picker.
- **Enemy AI** (`js/combat/enemyAI.js`, settings in `js/data/enemyAIData.js`): every move has a role (attack, block, debuff, buff). Enemies follow a rhythm (debuff, attack, block, attack), pick a random move of that role, and buff only rarely (25% chance after a 4-turn cooldown). New move type `buff` and enemy status **Might** (+1 damage per hit per stack).
- **Intent bubble** sits above the enemy frame; the frame reserves room for the scaled sprite and big enemies are scaled down a little (`css/intents.css`).
- **Top bar**: stage, oil, deck, gold. HP is on the nameplate in fights, and the turn counter is inside the bigger End Turn button (`css/endTurn.css`).
- **Levels**: 12 floors per level, 6 new enemies, a harder pool for floors 7+ (`hardFight` in `js/data/levelsData.js`, used by `js/map/mapGen.js`), and tougher bosses. +4 oil when you go down a level (`descendRefill`).
- **Cards**: the newest luck/keep/X cards were trimmed a little, and there are 12 new Lucky / Unlucky / Joker / Single-use cards in `js/data/cards/fortuneCards.js`.
- **Card Library** (main menu and Unlocks): every card in the game, with type tabs, an "upgraded" toggle and locked cards greyed out (`js/library/library.js`, `js/ui/screens/libraryScreen.js`, `css/library.css`).
- **Heroine**: same original design, with a smaller head (`HEAD_SCALE` in `js/data/characterArt.js`) so she reads as a full-body figure, plus more anime-style eye shading. The animations are unchanged.

## Card sets, heroes, Polish, camp (2026-11-23)

**Card sets and explorer levels.** Cards unlock in themed sets of 3 to 5 similar cards (a theme with more cards is split
into two sets, e.g. Jester + Jester's Court). Won fights give experience: normal fight 12 XP, elite 22 XP, boss 60 XP;
100 XP = one explorer level = ONE set unlocked, picked at random from the locked ones. An average full 12-floor map with
its boss gives about 1.55 levels (two maps = about 3 sets). 24 sets, 20 cards open from the start.
- `js/data/unlocksData.js`: the sets (`Game.UNLOCK_SETS`: name, theme, color, cards). New set = one entry.
- `js/data/experienceData.js`: XP per node type and XP per level.
- `js/state/progress.js`: lifetime xp, unlocked set ids, fights won. Old saves get XP back for their won fights.
- `js/unlocks/unlocks.js`: XP, level-ups, `Game.Unlocks.pool()` (also hides cards that belong to another hero), `level()`.
- Reward screen shows +XP, the level bar and any new set; Unlocks screen shows the level bar and every set.

**Heroes.** New Run opens the hero select screen (the main menu no longer shows the heroine).
- `js/data/charactersData.js`: one entry per hero (name, title, blurb, color, art, hp, energy, starting deck,
  starting passives, exclusive cards). `Game.CHARACTER_SLOTS` = places on the screen ("Coming soon" until filled).
- `js/data/heroPassivesData.js`: hero-only passives (`characterOnly`, never offered at rest sites). Lamplighter: Warm Lantern (start fights with 3 block).
- `js/characters/characters.js`: applies the hero to a new run, decides who can find exclusive cards.
- `js/ui/screens/characterScreen.js`, `js/app/actions/characterActions.js`, `css/characterSelect.css`.
- `Game.UI.character.render({ character })` draws the right hero (battle, camp, select screen). Drawings: `Game.CHARACTER_ARTS`.
- New hero = an entry in charactersData + its art + its passives. Nothing else.

**Languages (English, Polski).** Settings has a Language option.
- `js/i18n/i18n.js`: dictionaries (English text -> translation), placeholders `{n}` (numbers) and `{name}` (text), plural helper.
- `js/i18n/content.js`: swaps the text fields of the data tables (cards, enemies, events, ...) when the language changes.
- `js/i18n/domTranslate.js`: translates text as it appears on screen (screens, pop-ups, tooltips), so screens stay in English.
- `js/data/languagesData.js`: the list of languages. `js/data/i18n/pl/*.js`: the Polish text (ui, uiMore = combat log,
  cardNames, cardText = sentence shapes of card text, world, events, rules = template and keyword word lists).
- New English text on screen: add one line to `js/data/i18n/pl/ui.js`. New card with a new sentence shape: add it to cardText.js.

**Camp.** The rest site shows the hero by a small campfire with a tent inside the level's cave.
`js/ui/campScene.js`, `js/data/campData.js` (colors, positions), `css/camp.css`.

Also: `css/menu.css` (lantern emblem on the main menu).


## Vampire hero kit: lifesteal, Bat, Stay, blood cards (2026-11-23)
- **Standard starting deck (every hero):** `Game.STARTER_DECK` in js/data/cardsData.js = 4 Lamp Strike, 4 Brace, Precise Cut (timed attack), Steady Ward (timed defense), Rummage. A hero adds their `signatures` cards (two per hero, charactersData.js); js/characters/characters.js builds the deck.
- **Lamplighter:** 70 HP, signature cards Vampire Bite + Bat Familiar, passive Vampiric Thirst (heal 5% of damage you deal; fractions saved up) in js/data/heroPassivesData.js. Her old lantern cards are ordinary cards now (unlock sets / reward pool).
- **Her kit (data):** js/data/heroes/lamplighterKit.js: 10 cards, Game.BAT, her powers (sanguine_thirst, engorge, blood_bond), Bat keyword. Polish: js/data/i18n/pl/lamplighterKit.js. Card art: js/ui/cardMotifs/vampireMotifs.js.
- **Rules:** js/combat/healing.js (every heal: overheal with Engorge, Blood Bond sharing, lifesteal, overheal cut back after the fight), js/combat/bat.js (summon, copies your block, enemies hit it first via Game.EnemyMoves.victim, bites your target at end of turn; it no longer heals from its own bites, keeps Overheal), js/combat/heroEffects.js (damageHealOnKill, extraTurn; combat.js skips the enemy phase while c.extraTurns > 0).
- **Keywords:** Stay (`retain: true`, stays in hand) and One-time (`exhaust: true, oneTime: true`) in js/data/keywordsData.js; written on the card and explained in the side panel. The Bat's passive shows in the side panel too (js/ui/heroTips.js).
- **Hero card unlocks:** hero data `unlockPerLevel: 2` = her 9 cards start locked and 2 unlock per explorer level gained while playing her (js/unlocks/heroUnlocks.js, saved in progress.heroCards). Shown on the Unlocks screen ("Hero cards"), the fight summary and hero select.
- **Unlocks screen:** Back and Card Library buttons stay pinned at the top while scrolling.
- **Visuals:** Bat on the battlefield js/ui/batView.js + css/bat.css; heal numbers js/ui/juice/heroFx.js. Blood running down her cards: js/ui/blood/bloodDrip.js + css/bloodDrip.css, only on cards in the hand on the combat screen (hero data `cardFx: 'blood'`); never on rewards, library, deck or shop.

## Unique icons, every variant, 43+ events, new enemies, packs, hair wind (2026-11-23)
- **Card icons**: every different card has its own icon. Shapes in `js/ui/cardMotifs/` (motifKit + blade/guard/luck/mystic/pack motifs); id -> [motif, color] in `js/data/cardIconsData.js`. Variants (Timed, Forged, Joker...) reuse the base icon.
- **Every variant reachable**: piercings `timed` and `forged` added (`data/piercingsData.js`, text rewrite in `js/cards/variantText.js`); born-with marks can be replaced. Merchant "mark stall" (`shopData.markStall`) sells marks; many events give random marks.
- **Events**: 30 new Slay-the-Spire style events in `js/data/caveEventsMore.js` (many with hidden good/bad `chance` outcomes). New handlers in `js/caveEvents/eventEffectsMore.js` (chance, removeRandom, transformRandom, cardRandom, duplicateRandom, upgradeMany). Polish in `data/i18n/pl/eventsMore.js`.
- **Enemies**: 21 new + 4 minions in `js/data/enemiesMoreData.js`; traits/statuses/intents in `js/data/enemyTraitsData.js`, rules in `js/combat/enemyTraits.js`, moves in `js/combat/enemyMovesMore.js`. Mechanics: Stoneskin (max 10 per hit), Thorns, Regen, Split on death, Burrow (untargetable 1 turn, then Exposed = double damage), Thief (steals a card or gold, returns it on death; rats flee), Fuse (explodes), Summon, junk cards (`data/cards/junkCards.js`, `combat/junkRules.js`). Junk only from a few enemies.
- **Enemy looks**: all enemies are SVG drawings in `js/ui/enemyArt/` (one file per level), idle motion in `css/enemyArt.css`. Data field `look`/`art` picks the drawing.
- **Packs**: a pack costs ~2 energy and adds several free, weak One-time tokens to the draw pile for this fight (`data/cards/packCards.js`, tokens in `packTokens.js`).
- **Hair wind**: back-view hair is 6 strands that gust the same way together, then each wiggles on its own timing (`js/data/hairWindData.js`, `js/ui/hairWind.js`, `css/hairWind.css`).

## Pets, comfort (QoL) and the polished interface (2026-11-23)
- **Pets** (`js/data/petsData.js`, one entry each): small companions from cave events. A pet card (skill, like Bat Familiar, never a reward) summons it for the fight; enemies hit the Bat, then pets, then you; damage beyond a pet's HP **spills over** to the next in line; playing the card again heals it; max 3 pets out (`Game.PET_RULES`). 7 pets, each with one trick:
  Magpie (marks a card each turn, play it to draw 1), Ember Salamander (every 4th Attack: 5 to ALL), Cave Snail (block never fades, +3 per turn, max 12), Coffer Pup (+3 gold when hit, +6 if alive at the win), Pack Rat (keeps one unplayed card for next turn), Night Owl (see intents in the dark, pecks the biggest attacker for 4), Glowworm (slower timing bar, Great/Perfect timing sparks 4 to ALL).
  Rules: `js/pets/pets.js` (summon, guard order, spill-over, hooks) and `js/pets/petAbilities.js` (one ability per trick, registered by name). Pet damage gives no lifesteal (`combat/healing.js`).
- **Pet events**: `js/data/petEventsData.js` (7 events, each also offers a non-pet choice; effect `{ type: 'pet', id }`), rules `js/pets/petEvents.js` (at most 1 pet event per level). The event shows the pet in the medallion and its card on the side.
- **Pet looks**: one SVG per pet in `js/ui/pets/petArt.js`, used on the battlefield, on its card (motif `pet_<id>`) and in its event; battlefield units, trick chips (heat pips, stash, gold, shiny card) in `js/ui/pets/petView.js`; tooltips `js/ui/pets/petTips.js`; styles `css/pets.css`. Polish: `js/data/i18n/pl/pets.js`.
- **Comfort** (`js/ui/qol/`, data in `js/data/shortcutsData.js`, styles `css/qol.css`, Polish `js/data/i18n/pl/qol.js`):
  keys on every screen (1-9 options with keycap badges, Enter/Space continue, Esc back/leave; per-screen selectors in `Game.SCREEN_KEYS`), in fights Tab target, D/X piles, right click puts a card back, V deck, H or ? opens the Controls window (also the "? Controls" chip);
  End Turn asks again if you can still play cards, and glows when nothing is left to play (`endTurnGuard.js`);
  damage preview on enemy health bars while hovering or aiming an attack, with KO tag (`damagePreview.js`);
  incoming-damage badge on your nameplate (`incomingDamage.js`);
  "Your turn" ribbon and a short enemy-turn recap (`turnRecap.js`).
  Settings: Confirm end turn, Key hints, Damage preview (added to `Game.SETTINGS_DEF` from shortcutsData.js).
- **Interface polish** (look only): `css/buttons.css` (raised soft buttons, gold primary, press ripple from `js/ui/polish/pressFx.js`), `css/healthbars.css` (glossy bars, quarter ticks, drain ghost and heal flash, low-HP throb from `js/ui/polish/hpTrail.js`), `css/panels.css` (one warm panel style for menu, messages, events, rewards, windows, tooltips), `css/ornaments.css` + `js/ui/polish/ornaments.js` (gold corner filigree and heading flourishes; which panels in `js/data/uiThemeData.js`). Menu, message, reward and event screens got a panel wrapper class.

## Timed cards rebalance (2026-11-23)
Every timed card is now a variant of one base card: same type and cost, its normal (Good) number equals the
base card's number, and timing moves it about 50% down or up. No timed card is stronger than its base.

| Timed card | Base card | Before | Now |
|---|---|---|---|
| Precise Cut | Lamp Strike (6 dmg) | Deal 3-9 damage | Deal 3-9 damage (already right) |
| Steady Ward | Brace (5 block) | Gain 4-12 block | Gain 3-8 block |
| Lantern Swing | Shoulder Check (5 dmg + 3 block) | Deal 3-9 damage and gain 3-8 block | Deal 3-8 damage and gain 2-5 block |
| Steady Breath | Rummage (draw 2) | Draw 0-4 cards | Draw 1-3 cards |
| Lucky Flash | 0-cost "Draw 1. Exhaust." | Draw 0-3 cards. Exhaust | Draw 0-2 cards. Exhaust |

Cards made Timed by the Timed piercing already used the base card's own number (js/cards/variantText.js).

## End-of-run screen and card packs (2026-11-23)
- **End of run** (win or loss) opens the `runEnd` screen instead of a message: points per floor / fight / elite / boss / level / card (+ a win bonus), the total with a rank, how far you got (level, floor, a 3-part depth meter), XP, explorer levels and embers earned. Points and ranks: js/data/runScoreData.js; counting: js/state/runScore.js; screen: js/ui/screens/runEndScreen.js; animations (count-up, meter fill, packs dealt in): js/ui/juice/runEndJuice.js; flow: js/app/actions/runEndActions.js (`Game.App.showRunEnd(won)`); styles css/runEnd.css.
- **Card packs:** cards still unlock at the level-up, but you see them by opening packs. Each explorer level gives one Explorer Pack (that level's card set) and one hero pack (that level's 2 exclusive hero cards). The fight summary shows the sealed packs. Unopened packs are kept in the lifetime progress (`Progress.packs`), so an abandoned run's packs appear at the end of the next run. Rules: js/packs/cardPacks.js; looks and timings: js/data/cardPacksData.js (a hero picks `packStyle`, `packName`, `packColor`).
- **Pack art:** js/ui/packs/packArt.js draws each style as SVG: `lantern` (night-blue foil, gold crimp, glowing lantern) and `blood` (crimson velvet, bat crest, fanged heart, dripping blood, glowing eyes). New style = `registerStyle`. Styles css/packs.css.
- **Packs in hand:** js/ui/packs/packHand.js fans the packs like the fight hand; hovering lifts and wiggles a pack.
- **Opening:** js/ui/packs/packOpening.js (css/packOpening.css): the pack flies to the middle, click to tear it open (shake builds up, a glowing seam cracks, flash, burst, the top flies off), the cards shoot out face down, each click turns over the next one with a glow and burst by rarity, then Collect. Space / Enter work too.
- **Rarity** (only for the reveal): js/data/cardRarityData.js + js/cards/rarity.js. Hero cards = Exclusive, powers / cost 3+ = Rare, cost 2 / X = Uncommon, the rest Common.
- **Two exclusive cards at the start:** the hero `signatures` list (Lamplighter: Vampire Bite + Bat Familiar) is in the starting deck and never locked; the other 8 unlock 2 per level.
- Polish text: js/data/i18n/pl/packs.js.

## Bat fix and rebalance (2026-11-23)
- Bug: the Bat's end-of-turn bite on an enemy with Thorns made the thorns hit you. Thorns now ignore the Bat's bite (`js/combat/enemyTraits.js`, `c.dmgSource === 'bat'`).
- Bat Familiar cost 2 -> 3. Bloodthirst removed: the Bat no longer heals from its own bites; the passive is now Overheal (no HP cap, only from healing like re-summon or Blood Bond).

## Sound

- Files: `sounds/card_shuffle_1.mp3`, `card_shuffle_2.mp3` (two variants of the hand-card hover sound) and `sounds/ui/` (kupka's UI pack, trimmed so each starts at once):
  click (plain buttons), snap (pick an option / target / hero / card), confirm (main gold buttons, take reward), open / close (windows, Back, Esc), error (pressing anything disabled, unplayable cards), whoosh (start run, go to a map node, next level), end_turn, chime (cards unlocked), reward (card pack opened).
- Data: `js/data/audioData.js` holds `Game.SOUNDS` (file, base volume, cooldown, channel), `Game.MUSIC` (empty for now), `Game.AUDIO_HOOKS` (which action / event plays which sound) and the two volume sliders it adds to Settings (`musicVolume`, `sfxVolume`, 0..100, default 50).
- Engine: `js/audio/audio.js` (`Game.Audio.play(id)`, `playMusic(id)`, `stopMusic()`), plain `<audio>` elements so it works from file://.
- Hooks: `js/audio/soundHooks.js`. One click = one sound (a window opening or closing wins over the button's own sound). Hand cards only make the shuffle sound on hover; drawing, playing and discarding are silent (kupka's choice). Rules and screens know nothing about audio.
- Settings window supports `type: 'slider'` options (live while dragging).
- Anything that looks clickable gets a sound: listed actions use their own, any other `[data-action]`, button or element with a pointer cursor falls back to click (so new buttons are never silent); disabled ones play error. Hand cards: hover = shuffle, click = snap. Card pack opening and the timing bar (pointerdown) are covered too.
- New sound = file in `sounds/ui/`, one entry in `Game.SOUNDS`, then map an action in `AUDIO_HOOKS.actions` or an event in `AUDIO_HOOKS.events`.

## Difficulty modes and piercing choices (update 2026-11-23)

- **Five modes**, picked in **Settings** (kupka: not on the hero select screen, no scrolling). Setting `difficulty`, default Normal;
  a change counts from the next fight, `run.difficulty` notes the last mode fought on.
  Easy / Łatwy, Normal / Normalny, Hard / Trudny, Expert, Absurd / Absurdalny.
  Data + the Settings option (pushed to `Game.SETTINGS_DEF`): `js/data/difficultyData.js`; rules: `js/combat/difficulty.js`
  (multiplies enemy HP and `dmgMult` at `combat:start`, after group scaling, and HP of enemies that join mid-fight);
  Polish: `js/data/i18n/pl/difficulty.js`.
- Hero select fits a 768px-tall window without scrolling (`@media (max-height: 940px)` block in `css/characterSelect.css`).
- Numbers (multipliers on the old game's enemies; HP is the main lever, damage only a little; damage also scales enemy block):

  | Mode | Enemy HP | Enemy damage | ≈ damage taken per fight (HP × dmg) |
  |---|---|---|---|
  | Easy | ×0.90 | ×0.95 | 0.86 |
  | Normal | ×1.12 | ×1.07 | 1.20 (old game +20%) |
  | Hard | ×1.28 | ×1.12 | 1.43 |
  | Expert | ×1.45 | ×1.17 | 1.70 |
  | Absurd | ×1.70 | ×1.25 | 2.13 |
- **Piercing choices**: `Game.PIERCE_CHOICES` in `js/data/piercingsData.js` = Timed, Lucky, Joker. The Pierce service, the mark stall,
  event picks, random marks and pre-pierced shop cards only use these. Collector (stays in hand) is no longer offered anywhere
  (too strong); the Dripping Cavern and Hoarder's Nest events now give one of the three instead. Cards born with a mark keep it.
- Follow-up: Bat bite 6 -> 3 (`Game.BAT.attack`). Enemies now lunge AT the Bat (after the bat's own bite, `Game.BAT_BITE_MS`) instead of toward the player, and the bat's hit flash and `-N` number are delayed to match (`js/ui/juice/combatJuice.js`, `css/enemyIdle.css` `--lx/--ly`, `css/bat.css`, `js/ui/batView.js`).

## Bat heals on bite + enemy action visuals (2026-11-23)
- Bat: each bite heals it for the damage it dealt (`Game.BAT.biteHeals`, js/data/heroes/lamplighterKit.js; applied in js/combat/bat.js via Game.Healing, so overheal has no HP limit and Blood Bond still works). Bite stays 3, Bat Familiar cost stays 3.
- Enemy visuals: `enemy:acted` event (combat.js) -> js/combat/enemyActions.js records `combat.enemyActs` -> js/ui/juice/enemyActionFx.js plays it after the draw. Move type -> visual kind in js/data/enemyActionsData.js. Attack = lunge (combatJuice) + slash on the victim; block = shield bubble on the enemy; buff/heal/summon = glow + rising sparks. CSS: css/enemyActions.css.

## Turn flow (end of turn sequence)
Order, strictly one beat after another (input is blocked meanwhile):
1. Unused cards fly in an arc to the discard pile (`js/ui/juice/discardFx.js`). Cards that stay in hand (Collector) don't move.
2. The hand is discarded (`Combat.discardHand`), then your turn ends (`Combat.finishPlayerTurn`): the Bat bites, end-of-turn powers fire.
3. Each living enemy takes its turn, one at a time (`Combat.enemyTurn`).
4. Only after the last enemy, you draw a new hand, flying slowly out of the draw pile (`js/ui/juice/drawFx.js`, `.deal` in `css/cards.css`).
Sequencing: `js/app/actions/endTurnActions.js`. All timings: `js/data/turnFlowData.js` (`Game.TURN_FLOW`). `Combat.endTurn(c)` still runs every step at once for scripts/tests.

## Balance pass: harder bosses, less gold, exclusive card odds
- Bosses: `Game.BOSS_SCALING` in data/scalingData.js (HP x1.6, damage/block x1.3), applied in combat/scaling.js for map node type `boss` only.
- Gold: `Game.GOLD_REWARDS` and `Game.SHOP.startGold` / `priceScale` in data/shopData.js (shop prices x0.7 via Game.Shop.price).
- Card odds: `Game.CARD_ODDS.exclusiveWeight` (data/rewardOddsData.js), rules in unlocks/cardOdds.js (Game.Unlocks.sample / pickOne) used by fight rewards, the shop and random pack cards.
- Starting deck: basic deck + the hero's `signatures` only (Lamplighter: Vampire Bite, Bat Familiar), unlocked cards never join it.
