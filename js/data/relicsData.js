// RELIC DATA (empty for now)
// Relics are passive items the run keeps. Nothing uses this yet; the hook is
// ready: a relic can subscribe to Game.Events (see core/events.js) when picked
// up. To add one, add an entry here, e.g.
//   ember_charm: { name: 'Ember Charm', text: 'Start each fight with 3 block.',
//                  on: { 'combat:start': ({ combat }) => { combat.player.block += 3; } } },
// and make a small js/relics/relics.js that wires `on` handlers when a run starts.
// The run already has an empty `relics` list (state/runState.js).
Game.RELICS = {};
