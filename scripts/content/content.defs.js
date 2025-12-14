// scripts/content/content.defs.js
// 0.0.70e — Central content definitions (data-first).
//
// This file is intentionally lightweight scaffolding.
// We will progressively fill these registries with:
// - resource nodes
// - entities
// - POIs
// - locations
//
// IMPORTANT: Keep this file pure data/registries. No placement logic.

(function () {
  const PC = (window.PC = window.PC || {});
  PC.content = PC.content || {};

  // Canonical registries (id -> definition)
  PC.content.DEFS = PC.content.DEFS || {
    resourceNodes: {},
    entities: {},
    pois: {},
    locations: {},
  };

  // Optional: small helper for consistent definition registration.
  // We keep this tiny so content files can be data-only.
  PC.content.register = PC.content.register || function register(kind, def) {
    if (!kind || !def || !def.id) return;
    if (!PC.content.DEFS[kind]) PC.content.DEFS[kind] = {};
    PC.content.DEFS[kind][def.id] = def;
  };

  // ---------------------------------------------------------------------------
  // 0.0.70e — First pass example defs (enough to test deterministic placement)
  //
  // These are intentionally simple and will be expanded over 0.0.70e.
  // ---------------------------------------------------------------------------

  // Resource Nodes
  PC.content.register("resourceNodes", {
    id: "oak_tree",
    kind: "resourceNode",
    name: "Oak Tree",
    glyph: "T",
    tags: { era: ["primitive"], biome: ["temperate_forest"], difficulty: [1, 2, 3] },
    stateDefaults: { depleted: false, chargesLeft: 1 },
    blocksMovement: false,
  });

  PC.content.register("resourceNodes", {
    id: "stone_cluster",
    kind: "resourceNode",
    name: "Stone Cluster",
    glyph: "⛰",
    tags: { era: ["primitive"], biome: ["temperate_forest"], difficulty: [1, 2, 3] },
    stateDefaults: { depleted: false, chargesLeft: 2 },
    blocksMovement: false,
  });

  // Entities (encounters later; for now: just a placed marker)
  PC.content.register("entities", {
    id: "rabbit",
    kind: "entity",
    name: "Rabbit",
    glyph: "r",
    tags: { era: ["primitive"], biome: ["temperate_forest"], difficulty: [1] },
    stateDefaults: { defeated: false },
    blocksMovement: false,
  });

  // POIs
  PC.content.register("pois", {
    id: "stash_small",
    kind: "poi",
    name: "Small Stash",
    glyph: "§",
    tags: { era: ["primitive"], biome: ["temperate_forest"], difficulty: [1, 2] },
    stateDefaults: { opened: false },
    blocksMovement: false,
  });

  // Locations (bigger landmarks; still tile-anchored for now)
  PC.content.register("locations", {
    id: "clearing",
    kind: "location",
    name: "Clearing",
    glyph: "○",
    tags: { era: ["primitive"], biome: ["temperate_forest"], difficulty: [1, 2, 3] },
    stateDefaults: { discovered: false },
    blocksMovement: false,
  });
})();
