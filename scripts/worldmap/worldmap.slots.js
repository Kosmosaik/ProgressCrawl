// scripts/worldmap/worldmap.slots.js
// 0.0.70c - World slot metadata helpers (ERA / BIOME / TEMPLATE / SEED)

console.log("worldmap.slots.js loaded");

// Very small "enum" helpers for now.
// These will expand later when we add Fantasy / Industrial / Sci-Fi etc.
const ERA = {
  PRIMITIVE: "primitive",
  // TODO: fantasy, industrial, sci_fi...
};

const BIOME = {
  TEMPERATE_FOREST: "temperate_forest",
  // TODO: add more biomes later
};

// For now these are extremely simple presets.
// Later they will be tied to full ZONE_TEMPLATES + spawn tables.
const WORLD_SLOT_TEMPLATES = {
  tutorial: {
    era: ERA.PRIMITIVE,
    biome: BIOME.TEMPERATE_FOREST,
    templateId: "tutorial_cave",
  },
  primitive_forest_easy: {
    era: ERA.PRIMITIVE,
    biome: BIOME.TEMPERATE_FOREST,
    templateId: "primitive_forest_easy",
  },
};

/**
 * Initialize slot metadata on a world map tile, if not already set.
 * Called when a tile transitions from UNKNOWN -> DISCOVERED (0.0.70c rule).
 */
function initializeWorldSlotMetadata(tile, options) {
  if (!tile) return;

  const opts = options || {};

  if (!tile.era) {
    tile.era = opts.era || ERA.PRIMITIVE;
  }
  if (!tile.biome) {
    tile.biome = opts.biome || BIOME.TEMPERATE_FOREST;
  }
  if (!tile.templateId) {
    tile.templateId = opts.templateId || "primitive_forest_easy";
  }

  // Simple seed for now. Later we can derive from a worldSeed + coords.
  if (!tile.seed) {
    tile.seed = `${tile.x}_${tile.y}_${Math.floor(Math.random() * 1e9)}`;
  }

  // Whether we've already generated the zone instance for this slot.
  if (typeof tile.zoneGenerated !== "boolean") {
    tile.zoneGenerated = false;
  }
}

/**
 * Pick a world slot template based on distance from the starting tile.
 * For 0.0.70c this is deliberately simple:
 *  - distance 0 = tutorial
 *  - everything else = primitive forest easy
 *
 * Later we can add rings with different biomes/difficulties/eras.
 */
function pickWorldSlotTemplateForDistance(distance) {
  if (distance === 0) {
    return WORLD_SLOT_TEMPLATES.tutorial;
  }

  return WORLD_SLOT_TEMPLATES.primitive_forest_easy;
}

/**
 * Convenience wrapper: initialize slot metadata for a tile
 * based on ring distance from the starting tile.
 */
function initializeWorldSlotFromDistance(tile, distance) {
  const preset = pickWorldSlotTemplateForDistance(distance) || WORLD_SLOT_TEMPLATES.primitive_forest_easy;
  initializeWorldSlotMetadata(tile, preset);
}

// Debug helper – so you can poke this from DevTools if you want.
window.WorldSlotDebug = {
  ERA,
  BIOME,
  WORLD_SLOT_TEMPLATES,
  initializeWorldSlotMetadata,
  pickWorldSlotTemplateForDistance,
  initializeWorldSlotFromDistance,
};
