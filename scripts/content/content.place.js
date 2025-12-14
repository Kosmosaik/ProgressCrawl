// scripts/content/content.place.js
// 0.0.70e — Placement utilities (scaffolding).
//
// This module will eventually:
// - find candidate tiles (walkable, near walls, near borders, etc.)
// - place content deterministically (sub-seeds)
// - avoid overlaps and respect minimum distances
//
// For now we only provide a couple of safe primitives.

(function () {
  const PC = (window.PC = window.PC || {});
  PC.content = PC.content || {};

  // Return true if a tile is walkable in this zone.
  // We rely on existing tile kinds/constants that zones.core.js defines.
  PC.content.isWalkableTile = PC.content.isWalkableTile || function isWalkableTile(zone, x, y) {
    if (!zone || !zone.tiles || !zone.tiles[y] || !zone.tiles[y][x]) return false;
    const t = zone.tiles[y][x];
    // Most of the code uses ZONE_TILE_KIND.WALKABLE for '.'
    // Fallback: treat '.' as walkable if kind isn't present.
    if (typeof ZONE_TILE_KIND !== "undefined" && ZONE_TILE_KIND?.WALKABLE) {
      return t.kind === ZONE_TILE_KIND.WALKABLE;
    }
    return t.kind === "." || t.char === ".";
  };

  // Collect all walkable positions in a zone.
  PC.content.getAllWalkablePositions = PC.content.getAllWalkablePositions || function getAllWalkablePositions(zone) {
    const out = [];
    if (!zone || !zone.tiles) return out;
    for (let y = 0; y < zone.height; y++) {
      for (let x = 0; x < zone.width; x++) {
        if (PC.content.isWalkableTile(zone, x, y)) out.push({ x, y });
      }
    }
    return out;
  };
})();
