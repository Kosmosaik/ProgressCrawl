// scripts/content/content.populate.js
// 0.0.70e — Deterministic zone content population (first pass).
//
// Turns content definitions + spawn tables into concrete per-zone instances
// stored in zone.content.
//
// Notes:
// - Placement only (no UI, no harvesting/combat logic yet)
// - Deterministic based on (world slot seed + zoneId)
// - Instances are minimal:
//     { id, defId, x, y, kind, state }

(function () {
  const PC = (window.PC = window.PC || {});
  PC.content = PC.content || {};

  // Build a stable seed string for this zone.
  function buildZoneContentSeed(zone, worldTile) {
    const worldSeed = worldTile && worldTile.seed ? String(worldTile.seed) : "";
    const zoneId = zone && zone.id ? String(zone.id) : "";
    return `${worldSeed}::${zoneId}::content_v1`;
  }

  // Pick a spawn table id to use for this zone.
  // Priority:
  // 1) worldTile.templateId (if table exists)
  // 2) zone.id (if table exists)
  // 3) null
  function resolveSpawnTableId(zone, worldTile) {
    const tables = PC.content.SPAWN_TABLES || {};
    const t1 = worldTile && worldTile.templateId ? String(worldTile.templateId) : null;
    if (t1 && tables[t1]) return t1;

    const t2 = zone && zone.id ? String(zone.id) : null;
    if (t2 && tables[t2]) return t2;

    return null;
  }

  // Utility: shuffle array in-place with RNG.
  function shuffleInPlace(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }

  // Utility: clamp int.
  function clampInt(n, a, b) {
    const x = Math.floor(Number(n) || 0);
    return Math.max(a, Math.min(b, x));
  }

  // Pick a count from a config.
  // - number => exact
  // - [min,max] => rng
  function pickCount(countSpec, rng) {
    if (Array.isArray(countSpec) && countSpec.length >= 2) {
      const min = clampInt(countSpec[0], 0, 9999);
      const max = clampInt(countSpec[1], 0, 9999);
      if (max <= min) return min;
      return min + Math.floor(rng() * (max - min + 1));
    }
    if (typeof countSpec === "number") return clampInt(countSpec, 0, 9999);
    return 0;
  }

  // Place one kind of content (resourceNodes/entities/pois/locations).
  function placeKind(zone, kindKey, kindDefKey, kindCfg, rng, used) {
    if (!zone || !zone.content) return;
    if (!kindCfg) return;

    const defsRegistry = PC.content.DEFS && PC.content.DEFS[kindDefKey]
      ? PC.content.DEFS[kindDefKey]
      : {};

    const entries = Array.isArray(kindCfg.entries) ? kindCfg.entries : [];
    const count = pickCount(kindCfg.count, rng);
    if (count <= 0 || entries.length === 0) return;

    // Candidate tiles: all walkable.
    const candidates = typeof PC.content.getAllWalkablePositions === "function"
      ? PC.content.getAllWalkablePositions(zone)
      : [];

    if (zone.entrySpawn) {
      const key = `${zone.entrySpawn.x},${zone.entrySpawn.y}`;
      used.add(key);
    }

    // Shuffle candidates so we can pick sequentially.
    shuffleInPlace(candidates, rng);

    let placed = 0;
    for (let idx = 0; idx < candidates.length && placed < count; idx++) {
      const pos = candidates[idx];
      const k = `${pos.x},${pos.y}`;
      if (used.has(k)) continue;

      const picked = typeof PC.content.pickWeighted === "function"
        ? PC.content.pickWeighted(entries, rng)
        : entries[0];
      const defId = picked && picked.id ? String(picked.id) : null;
      if (!defId || !defsRegistry[defId]) continue;

      const def = defsRegistry[defId];
      const instance = {
        id: `${kindKey}_${defId}_${pos.x}_${pos.y}`,
        defId,
        kind: kindKey,
        x: pos.x,
        y: pos.y,
        state: Object.assign({}, def.stateDefaults || {}),
      };

      zone.content[kindKey].push(instance);
      used.add(k);
      placed++;
    }
  }

  // Public: populate a zone's content from spawn tables.
  // Pass in worldTile when available for templateId + seed.
  PC.content.populateZoneContent = PC.content.populateZoneContent || function populateZoneContent(zone, def, worldTile) {
    if (!zone) return;
    if (!zone.content) {
      zone.content = { resourceNodes: [], entities: [], pois: [], locations: [] };
    }

    // If already populated, don't do it again (idempotent).
    const alreadyHasContent =
      (zone.content.resourceNodes && zone.content.resourceNodes.length) ||
      (zone.content.entities && zone.content.entities.length) ||
      (zone.content.pois && zone.content.pois.length) ||
      (zone.content.locations && zone.content.locations.length);
    if (alreadyHasContent) return;

    const tableId = resolveSpawnTableId(zone, worldTile);
    if (!tableId) return;

    const table = PC.content.SPAWN_TABLES ? PC.content.SPAWN_TABLES[tableId] : null;
    if (!table) return;

    const seed = buildZoneContentSeed(zone, worldTile);
    const rng = typeof PC.content.createRng === "function"
      ? PC.content.createRng(seed)
      : Math.random;

    // Used tile positions across all kinds (no overlap for first pass).
    const used = new Set();

    placeKind(zone, "resourceNodes", "resourceNodes", table.resourceNodes, rng, used);
    placeKind(zone, "entities", "entities", table.entities, rng, used);
    placeKind(zone, "pois", "pois", table.pois, rng, used);
    placeKind(zone, "locations", "locations", table.locations, rng, used);

    // Light debug (can be removed later)
    if (PC?.config?.debug?.logContentGen) {
      console.log(
        `[0.0.70e] Populated zone content for "${zone.id}" via table "${tableId}":`,
        {
          resourceNodes: zone.content.resourceNodes.length,
          entities: zone.content.entities.length,
          pois: zone.content.pois.length,
          locations: zone.content.locations.length,
        }
      );
    }
  };
})();
