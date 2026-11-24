// CARD ICONS (data only). kupka's rule: no two different cards share a picture.
// Only variants of the SAME card (Timed, Forged, Joker, Lucky, Unlucky, upgraded, ...) may repeat it.
// Each line gives one card its own drawing; it overrides the card's `art` (or the default from
// data/cardArtData.js). Drawings: js/ui/cardArt.js and js/ui/cardMotifs/*.js.
// A new card needs a new line here with a new motif (the test in the thread checks for repeats).
Game.CARD_ICONS = {
  // attacks: blades and strikes
  pocket_knife:     ['knife', '#e8a54b'],      precise_cut:   ['cutLine', '#ffe066'],     gamblers_dagger: ['dagger', '#8f86ad'],
  patient_blade:    ['sheathed', '#5ab8d8'],   double_or_nothing: ['twoSwords', '#e05a9a'], lantern_slam: ['slam', '#ffb347'],
  lantern_swing:    ['swingArc', '#f0b850'],   blazing_charge: ['charge', '#ff7a3a'],     horseshoe_toss: ['horseshoe', '#6fcf7a'],
  desperate_lunge:  ['lunge', '#d8884a'],      wick_barrage:  ['barrage', '#ffd35a'],     scattershot:    ['scatter', '#ffb347'],
  ricochet:         ['bounce', '#7fd6c2'],     crippling_hook: ['hook', '#c9b98f'],       chaos_spark:    ['chaos', '#c49ae8'],
  piercing_light:   ['arrowLight', '#fff0a0'], last_flare:    ['signalFlare', '#ff7a5a'], lantern_flare:  ['flareBurst', '#ffd35a'],
  overburn:         ['meltdown', '#ff6a3a'],
  // defense
  reinforce:        ['doubleShield', '#6f9be0'], patch_guard: ['patch', '#8fb0e0'],       lantern_ward:   ['lanternShield', '#6f9be0'],
  steady_ward:      ['targetShield', '#ffe066'], high_roller: ['chipStack', '#e05a9a'],   family_shield:  ['crestShield', '#5ab8d8'],
  emergency_ward:   ['alarmShield', '#d8884a'], broken_mirror: ['mirrorShards', '#8f86ad'], cracked_mirror: ['crackedMirror', '#e05a9a'],
  smoke_screen:     ['smoke', '#8a90a8'],       heirloom_lantern: ['oldLantern', '#ffd35a'], long_vigil:   ['tower', '#9ab8ff'],
  rolling_fortress: ['wheelFort', '#8fc4ff'],   night_vigil:  ['owl', '#ffd35a'],          glass_heart:    ['glassHeart', '#bfe8ff'],
  clover_charm:     ['clover', '#6fcf7a'],
  // luck and fortune
  rabbits_foot:     ['rabbitFoot', '#6fcf7a'],  coin_flip:    ['flipCoin', '#e8c840'],     lucky_streak:   ['streak', '#ffd35a'],
  fortune_wick:     ['fortuneCandle', '#6fcf7a'], snake_eyes: ['snakeEyes', '#7ac46a'],    black_cat:      ['cat', '#ffe04a'],
  lucky_spark:      ['sparkStar', '#ffd35a'],   wild_lantern: ['wildLantern', '#ff9a3c'], loaded_dice:    ['loadedDie', '#e03a4a'],
  lucky_flash:      ['fourStar', '#ffe066'],    lucky_coin:   ['cloverCoin', '#3a9a4a'],  wild_card:      ['jokerCard', '#e05a9a'],
  cursed_coin:      ['skullCoin', '#8f86ad'],   jesters_gambit: ['jesterHat', '#e05a9a'], final_candle:   ['stubCandle', '#ffb347'],
  // fire, poison, rituals, powers
  blood_wick:       ['bloodCandle', '#ff5a4a'], bellows:      ['bellows', '#ff9a3c'],     burn_the_map:   ['burningMap', '#ff7a3a'],
  bonfire:          ['bonfire', '#ff7a3a'],     thornwick:    ['thornCandle', '#ffb347'], jinxed_lantern: ['jinxLantern', '#8f86ad'],
  hoarded_strike:   ['hoard', '#5ab8d8'],       flash_powder: ['flash', '#fff0a0'],       creeping_rot:   ['creeper', '#8fd45a'],
  fester:           ['boil', '#a8d45a'],        venom_wick:   ['venomCandle', '#8fd45a'], folded_map:     ['map', '#c04030'],
  dawn_ritual:      ['sunrise', '#ffb347'],     spore_cloud:  ['sporeCloud', '#a8c46a'],  rot_bloom:      ['rotFlower', '#b07ae0'],
  wishing_venom:    ['starVenom', '#8fd45a'],   wildfire:     ['wildfire', '#ff5a2a'],    whirling_lantern: ['whirl', '#8fc4ff'],
  dreaming_wick:    ['dreamCloud', '#b59ad9'],  strange_brew: ['cauldron', '#7ad47a'],    ashen_pact:     ['pactScroll', '#c9b98f'],
  venom_vial:       ['skullVial', '#8fd45a'],   second_lantern: ['twinLanterns', '#ffd35a'], venom_rain:   ['acidRain', '#a8e05a'],
  kiln_heart:       ['kiln', '#ff7a3a'],        paper_lanterns: ['paperLanterns', '#ffd35a'], sunbeam:      ['sun', '#ffd35a'],
  pocket_watch:     ['watch', '#5ab8d8'],       deep_breath:  ['breath', '#bfe8ff'],      cartomancy:     ['tarot', '#c49ae8'],
  coal_eater:       ['coal', '#ff7a3a'],        expose:       ['target', '#ff8a6a'],      ember_echo:     ['emberRings', '#ff9a3c'],
  moth_swarm:       ['swarm', '#c9b98f'],       last_sip:     ['emptyGlass', '#e03a4a'],  sanguine_thirst: ['bloodMoon', '#e03a4a'],
  // packs, their tokens and junk
  supply_crate:     ['pouch', '#d8a060'],       weapon_rack:  ['rack', '#e0705a'],        armory_chest:   ['crate', '#6f9be0'],
  scroll_bundle:    ['needleCase', '#8fd45a'],  twin_pack:    ['twinPouch', '#d8884a'],   grand_pack:     ['chest', '#ffd35a'],
  power_parcel:     ['sparkBox', '#ffd35a'],    mystery_parcel: ['sack', '#c9b98f'],      lucky_dip:      ['luckyPouch', '#7fe08a'],
  throwing_dagger:  ['thrownDagger', '#e8a54b'], hatchet:     ['hatchet', '#e0705a'],     tin_buckler:    ['buckler', '#6f9be0'],
  venom_needle:     ['needle', '#8fd45a'],      spark_flick:  ['flick', '#ffd35a'],       caltrop:        ['caltrop', '#c9b98f'],
  lucky_dagger:     ['cloverDagger', '#6fcf7a'],
  cobweb:           ['web', '#d8d0e8'],         silt_clump:   ['silt', '#9ab8c8'],        cinder_burn:    ['burnMark', '#ff7a3a'],
  gloom:            ['gloomCloud', '#8f86ad'],
  // cards that keep a drawing that used to be shared (now theirs alone)
  venom_dart:       ['droplet', '#8fd45a'],     roll_the_bones: ['dice', '#ffd35a'],      field_dressing: ['heart', '#ff9ab0'],
  focus_breath:     ['eye', '#ffe066'],         stored_spark: ['energy', '#7fd6c2'],      bad_omen:       ['rune', '#8f86ad'],
};
Object.entries(Game.CARD_ICONS).forEach(([id, [motif, color]]) => { Game.CARD_ART[id] = { motif, color }; });
