// LEVEL DATA
// A level is a list of rows (12 floors per level). Each row holds one or more nodes;
// the player moves from the top row down to the boss, following the paths drawn
// between rows (paths are rolled by map/mapGen.js). The last row is the boss.
// Node types: see data/mapNodesData.js (fight, elite, rest, event, shop, boss).
// "pools" lists the encounters a node type can roll; each encounter is a
// list of enemy ids (so a fight can have more than one enemy).
// "hard" pools are used from floor 7 on (the second half of a level is tougher).
Game.LEVELS = [
  {
    name: 'The Root Cellar',
    rows: [
      ['fight', 'fight'],
      ['fight', 'event', 'fight'],
      ['fight', 'shop', 'fight'],
      ['elite', 'event', 'fight'],
      ['rest', 'fight'],
      ['fight', 'elite', 'event'],
      ['fight', 'shop', 'fight'],
      ['elite', 'fight', 'event'],
      ['rest', 'fight', 'elite'],
      ['fight', 'event', 'fight'],
      ['rest', 'shop'],
      ['boss'],
    ],
    pools: {
      fight: [['cellar_rat'], ['mold_heap'], ['cave_moth', 'cellar_rat'], ['lamp_leech'], ['tunnel_mole'], ['cellar_spinner'], ['pilfer_rat', 'cave_moth'], ['root_slime'], ['shellback_beetle'], ['thorn_bramble']],
      hardFight: [['cellar_rat', 'cellar_rat', 'cave_moth'], ['mold_heap', 'lamp_leech'], ['lamp_leech', 'cave_moth'], ['root_slime', 'cellar_spinner'], ['shellback_beetle', 'pilfer_rat'], ['tunnel_mole', 'thorn_bramble']],
      elite: [['mold_heap', 'cellar_rat', 'cellar_rat'], ['lamp_leech', 'lamp_leech'], ['mold_heap', 'cave_moth', 'cave_moth'], ['root_slime', 'root_slime'], ['shellback_beetle', 'cellar_spinner', 'pilfer_rat']],
      boss:  [['root_warden']],
    },
  },
  {
    name: 'The Drowned Halls',
    rows: [
      ['fight', 'fight', 'fight'],
      ['fight', 'event', 'elite'],
      ['shop', 'fight', 'rest'],
      ['elite', 'event', 'fight'],
      ['fight', 'fight', 'shop'],
      ['rest', 'elite', 'event'],
      ['fight', 'event', 'fight'],
      ['elite', 'shop', 'fight'],
      ['fight', 'rest', 'elite'],
      ['event', 'fight', 'fight'],
      ['rest', 'shop'],
      ['boss'],
    ],
    pools: {
      fight: [['silt_crab'], ['pale_eel', 'cave_moth'], ['drowned_acolyte', 'cellar_rat'], ['barnacle_mass'], ['silt_burrower'], ['magpie_crab'], ['bloated_drowner'], ['coral_knight'], ['lantern_siphon', 'cave_moth'], ['tide_caller'], ['kelp_strangler']],
      hardFight: [['pale_eel', 'drowned_acolyte'], ['silt_crab', 'pale_eel'], ['barnacle_mass', 'cave_moth'], ['coral_knight', 'lantern_siphon'], ['tide_caller', 'magpie_crab'], ['bloated_drowner', 'kelp_strangler'], ['silt_burrower', 'pale_eel']],
      elite: [['silt_crab', 'pale_eel', 'drowned_acolyte'], ['barnacle_mass', 'drowned_acolyte'], ['silt_crab', 'silt_crab'], ['coral_knight', 'tide_caller'], ['bloated_drowner', 'magpie_crab', 'lantern_siphon']],
      boss:  [['tide_bell']],
    },
  },
  {
    name: 'The Ember Vault',
    rows: [
      ['fight', 'fight'],
      ['fight', 'elite', 'event'],
      ['shop', 'fight', 'rest'],
      ['elite', 'event', 'fight'],
      ['fight', 'shop', 'fight'],
      ['rest', 'elite', 'event'],
      ['fight', 'fight', 'elite'],
      ['event', 'shop', 'fight'],
      ['elite', 'rest', 'fight'],
      ['fight', 'event', 'elite'],
      ['rest', 'shop'],
      ['boss'],
    ],
    pools: {
      fight: [['cinder_imp'], ['slag_golem'], ['ash_hound'], ['forge_wisp', 'cinder_imp'], ['ember_mole'], ['powder_tick', 'powder_tick'], ['magma_ooze'], ['obsidian_sentinel'], ['ashen_cultist', 'cinder_imp'], ['cinder_spitter'], ['ember_magpie'], ['spiked_brazier']],
      hardFight: [['cinder_imp', 'ash_hound'], ['slag_golem', 'forge_wisp'], ['ash_hound', 'ash_hound'], ['ashen_cultist', 'powder_tick', 'powder_tick'], ['obsidian_sentinel', 'cinder_spitter'], ['magma_ooze', 'ember_magpie'], ['spiked_brazier', 'ember_mole']],
      elite: [['slag_golem', 'cinder_imp', 'forge_wisp'], ['ash_hound', 'ash_hound', 'forge_wisp'], ['slag_golem', 'slag_golem'], ['obsidian_sentinel', 'ashen_cultist'], ['magma_ooze', 'spiked_brazier'], ['ember_mole', 'powder_tick', 'ember_magpie']],
      boss:  [['vault_keeper']],
    },
  },
];
