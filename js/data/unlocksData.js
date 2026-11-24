// CARD UNLOCK SETS (data only)
// Cards unlock in themed SETS: a few similar cards that open together.
// Every time your explorer level goes up (data/experienceData.js) ONE set
// is unlocked, picked at random from the sets that are still locked.
// Progress is kept across runs (js/state/progress.js).
//
// Each set: { id, name, theme, color, cards }
//   name   shown on the Unlocks screen and in the level-up pop-up
//   theme  one short line about what the cards have in common
//   color  accent color of the set's badge
//   cards  card ids (keep a set at 3 to 5 cards; a bigger theme gets split in two sets)
// Cards that are in no set are open from the start.
// New set = one entry below. New card in an old theme = add its id to a set.
Game.UNLOCK_SETS = [
  { id: 'creeping_rot', name: 'Creeping Rot', theme: 'Poison that spreads and grows.', color: '#8fd06a',
    cards: ['spore_cloud', 'creeping_rot', 'fester', 'rot_bloom', 'venom_wick'] },
  { id: 'slow_fuse', name: 'Slow Fuse', theme: 'Attacks and energy that land next turn.', color: '#ff9a5a',
    cards: ['slow_fuse', 'powder_keg', 'echo_strike', 'seed_of_flame', 'midnight_oil'] },
  { id: 'night_watch', name: 'Night Watch', theme: 'Block and cards that wait for next turn.', color: '#7fd6c2',
    cards: ['night_watch', 'long_vigil', 'banked_embers', 'folded_map', 'deep_breath'] },
  { id: 'wildfire', name: 'Wildfire', theme: 'Fire that hits every enemy.', color: '#ffb36a',
    cards: ['lantern_flare', 'ashfall', 'wildfire', 'ring_of_cinders', 'chain_spark'] },
  { id: 'ricochet', name: 'Ricochet', theme: 'Hits that bounce to random enemies.', color: '#e0d080',
    cards: ['scattershot', 'ricochet', 'chaos_spark', 'flood_lamp'] },
  { id: 'dice_and_chaos', name: 'Dice and Chaos', theme: 'Random numbers, big swings.', color: '#e0d080',
    cards: ['lucky_spark', 'coin_toss', 'fortune_moth', 'roll_the_bones', 'wild_lantern'] },
  { id: 'grab_bag', name: 'Grab Bag', theme: 'Cards that make more cards.', color: '#c8a06a',
    cards: ['grab_bag', 'pocket_knife', 'cartomancy', 'strange_brew', 'dreaming_wick'] },
  { id: 'blood_price', name: 'Blood Price', theme: 'Pay with HP for raw power.', color: '#ff6a6a',
    cards: ['blood_wick', 'overburn', 'coal_eater', 'desperate_lunge', 'thornwick'] },
  { id: 'iron_wick', name: 'Iron Wick', theme: 'Stack block and turn it into damage.', color: '#7aa8ff',
    cards: ['reinforce', 'lantern_slam', 'glass_heart', 'night_vigil', 'lantern_ward'] },
  { id: 'hexes', name: 'Hexes', theme: 'Weaken and expose your enemies.', color: '#c07ad0',
    cards: ['expose', 'shattered_glass', 'mirror_ward', 'bad_omen'] },
  { id: 'kiln_heart', name: 'Kiln Heart', theme: 'Powers that keep the fire burning.', color: '#ff7a4a',
    cards: ['ember_echo', 'kiln_heart', 'bellows', 'ashen_crown', 'rhythm_of_three'] },
  { id: 'dreamers', name: 'Dreamers', theme: 'Powers that give energy and cards.', color: '#c49ae8',
    cards: ['moth_swarm', 'ashen_pact', 'hollow_choir', 'paper_lanterns'] },
  { id: 'four_leaf', name: 'Four-Leaf', theme: 'Lucky cards: sometimes they play twice.', color: '#7fe08a',
    cards: ['loaded_dice', 'rabbits_foot', 'lucky_streak', 'clover_charm', 'horseshoe_toss'] },
  { id: 'black_cat', name: 'Black Cat', theme: 'Unlucky cards: cheap and strong, but they can fizzle.', color: '#9a7ad0',
    cards: ['gamblers_dagger', 'jinxed_lantern', 'black_cat', 'cursed_coin', 'broken_mirror'] },
  { id: 'jester', name: 'Jester', theme: 'Joker cards: nothing or double.', color: '#e05a9a',
    cards: ['wild_card', 'high_roller', 'cracked_mirror', 'coin_flip'] },
  { id: 'jesters_court', name: "Jester's Court", theme: 'Bigger jokers for braver players.', color: '#e05a9a',
    cards: ['snake_eyes', 'jesters_gambit', 'double_or_nothing'] },
  { id: 'heirlooms', name: 'Heirlooms', theme: 'Keep cards that stay in your hand.', color: '#d9a441',
    cards: ['heirloom_lantern', 'family_shield', 'pocket_watch'] },
  { id: 'hoard', name: 'The Hoard', theme: 'More Keep cards to save for later.', color: '#d9a441',
    cards: ['hoarded_strike', 'patient_blade', 'stored_spark'] },
  { id: 'last_flare', name: 'Last Flare', theme: 'Single-use cards with huge numbers.', color: '#ffd35a',
    cards: ['last_flare', 'burn_the_map', 'emergency_ward', 'final_candle'] },
  { id: 'final_stand', name: 'Final Stand', theme: 'More single-use tricks.', color: '#ffd35a',
    cards: ['flash_powder', 'second_lantern', 'venom_vial'] },
  { id: 'overflow', name: 'Overflow', theme: 'X cards: spend all your energy.', color: '#8fc4ff',
    cards: ['whirling_lantern', 'sunbeam', 'wick_barrage', 'piercing_light', 'blazing_charge'] },
  { id: 'deep_overflow', name: 'Deep Overflow', theme: 'More X cards for every kind of turn.', color: '#8fc4ff',
    cards: ['bonfire', 'rolling_fortress', 'venom_rain', 'dawn_ritual'] },
  { id: 'supply_run', name: 'Supply Run', theme: 'Packs that hand you fresh cards.', color: '#c8a06a',
    cards: ['supply_crate', 'weapon_rack', 'armory_chest', 'scroll_bundle', 'twin_pack'] },
  { id: 'grand_packs', name: 'Grand Packs', theme: 'Bigger and stranger packs.', color: '#c8a06a',
    cards: ['grand_pack', 'power_parcel', 'mystery_parcel', 'lucky_dip'] },
];
