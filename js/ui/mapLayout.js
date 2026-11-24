// MAP LAYOUT: where each map node sits on screen, in pixels.
// Pure geometry, so the map screen and anything else (animations, tooltips)
// agree on positions. Tweak the numbers here to change the map's size.
Game.MapLayout = {
  WIDTH: 560,
  ROW_HEIGHT: 70,
  PAD_TOP: 46,
  PAD_BOTTOM: 50,

  height(map) { return this.PAD_TOP + (map.rows.length - 1) * this.ROW_HEIGHT + this.PAD_BOTTOM; },

  pos(node) {
    return { x: Math.round(node.x * this.WIDTH), y: this.PAD_TOP + node.row * this.ROW_HEIGHT };
  },
};
