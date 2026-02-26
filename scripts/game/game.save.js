// scripts/game/game.save.js
// Save/load system for ProgressCrawl.

// NOTE: M0.1 (Roadmap) — Save System Versioning & Migration
// - New key: PROGRESSCRAWL_SAVES_V1
// - Snapshot root includes schemaVersion
// - All loads run through migrateSave() before applying

const SAVE_KEY = "PROGRESSCRAWL_SAVES_V1";
const LEGACY_SAVE_KEY = "CTGL_SAVES_V1";
const LATEST_SCHEMA_VERSION = 1;

function migrateSave(saveObj) {
  // Defensive: never mutate the original object in-place.
  const s = saveObj ? JSON.parse(JSON.stringify(saveObj)) : null;
  if (!s || typeof s !== "object") return null;

  // Treat missing schemaVersion as v0.
  let v = (typeof s.schemaVersion === "number") ? s.schemaVersion : 0;

  // v0 -> v1
  if (v < 1) {
    // Ensure required root shape.
    s.schemaVersion = 1;

    // Core identity
    if (typeof s.id !== "string" || !s.id) {
      // Never allow null IDs (breaks save selection). Use a safe migrated ID.
      s.id = `migrated-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    }
    if (typeof s.name !== "string" || !s.name.trim()) s.name = "Unnamed";

    // Stats
    if (!s.stats || typeof s.stats !== "object") s.stats = {};
    s.stats.str = (typeof s.stats.str === "number") ? s.stats.str : 0;
    s.stats.dex = (typeof s.stats.dex === "number") ? s.stats.dex : 0;
    s.stats.int = (typeof s.stats.int === "number") ? s.stats.int : 0;
    s.stats.vit = (typeof s.stats.vit === "number") ? s.stats.vit : 0;

    // Skills
    if (!("skills" in s)) s.skills = null;

    // Inventory / equipment snapshots
    if (!s.inventory || typeof s.inventory !== "object") s.inventory = {};
    if (!("equipped" in s) || (s.equipped && typeof s.equipped !== "object")) s.equipped = null;

    // Feature unlocks
    if (!s.features || typeof s.features !== "object") s.features = {};
    if (typeof s.features.inventoryUnlocked !== "boolean") s.features.inventoryUnlocked = false;
    if (typeof s.features.equipmentUnlocked !== "boolean") s.features.equipmentUnlocked = false;

    // QoL state (PC.state-owned)
    if (typeof s.currentHP !== "number") s.currentHP = 0;
    if (!("worldMap" in s)) s.worldMap = null;
    if (!s.zoneDeltas || typeof s.zoneDeltas !== "object") s.zoneDeltas = {};

    v = 1;
  }

  // Future migrations go here:
  // if (v < 2) { ...; v = 2; }

  // Always end with the latest schemaVersion.
  s.schemaVersion = LATEST_SCHEMA_VERSION;
  return s;
}

// Phase 8 — coalesce frequent save requests (e.g. multi-item loot) into a single write.
let _saveScheduled = false;

function requestSaveCurrentGame() {
  if (_saveScheduled) return;
  _saveScheduled = true;
  setTimeout(() => {
    _saveScheduled = false;
    try {
      saveCurrentGame();
    } catch (e) {
      console.warn("requestSaveCurrentGame: saveCurrentGame failed", e);
    }
  }, 0);
}

function loadAllSaves() {
  try {
    // Prefer new key.
    let raw = localStorage.getItem(SAVE_KEY);

    // Backward compat: if new key is empty, try legacy key and migrate storage.
    if (!raw) {
      const legacyRaw = localStorage.getItem(LEGACY_SAVE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        // Copy legacy saves into new key so we stop depending on CTGL naming.
        localStorage.setItem(SAVE_KEY, legacyRaw);
        // Keep legacy key in place (non-destructive). If you want to remove it later:
        // localStorage.removeItem(LEGACY_SAVE_KEY);
      }
    }

    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.warn("Failed to load saves:", e);
    return [];
  }
}

function writeAllSaves(saves) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
  } catch (e) {
    console.warn("Failed to write saves:", e);
  }
}

function renderSaveList(saves = loadAllSaves()) {
  const saveListContainer = document.getElementById("save-list");
  if (!saveListContainer) return;

  saveListContainer.innerHTML = "";

  if (!Array.isArray(saves) || saves.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No saved characters yet.";
    saveListContainer.appendChild(p);
    return;
  }

  const list = document.createElement("div");
  list.className = "save-list";

  saves.forEach(rawSave => {
    // Migrate for display (non-destructive). If migration fails, fall back to raw.
    const save = migrateSave(rawSave) || rawSave;

    const row = document.createElement("div");
    row.className = "save-row";

    const label = document.createElement("span");

    const name = (typeof save.name === "string" && save.name.trim()) ? save.name : "Unnamed";
    const st = (save.stats && typeof save.stats === "object") ? save.stats : {};

    const str = (typeof st.str === "number") ? st.str : 0;
    const dex = (typeof st.dex === "number") ? st.dex : 0;
    const intv = (typeof st.int === "number") ? st.int : 0;
    const vit = (typeof st.vit === "number") ? st.vit : 0;

    label.textContent = `${name} — STR ${str} | DEX ${dex} | INT ${intv} | VIT ${vit}`;
    row.appendChild(label);

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.textContent = "Load";
    loadBtn.disabled = !(typeof save.id === "string" && save.id.length > 0);
    loadBtn.addEventListener("click", () => {
      if (typeof save.id !== "string" || !save.id) return;
      loadSave(save.id);
    });
    row.appendChild(loadBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.disabled = !(typeof save.id === "string" && save.id.length > 0);
    deleteBtn.addEventListener("click", () => {
      if (typeof save.id !== "string" || !save.id) return;
      deleteSave(save.id);
    });
    row.appendChild(deleteBtn);

    list.appendChild(row);
  });

  saveListContainer.appendChild(list);
}

function generateId() {
  try {
    if (window.crypto && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch (_) {
    // ignore and fall back
  }
  return `save-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function saveCurrentGame() {
  const st = (typeof STATE === "function") ? STATE() : null;
  const ch = st ? st.character : null;
  if (!ch) return;

  const saves = loadAllSaves();

  // Always produce a valid ID (prevents crashes if generateId is missing for any reason).
  const existingId = (st && st.save) ? st.save.currentSaveId : null;
  const id =
    existingId ||
    (typeof generateId === "function"
      ? generateId()
      : `save-${Date.now()}-${Math.floor(Math.random() * 1e6)}`);

  const feats = (st && st.features) ? st.features : {};

  const snapshot = {
    schemaVersion: LATEST_SCHEMA_VERSION,
    id,
    name: ch.name,
    stats: { ...ch.stats },
    skills: cloneSkills(ch.skills),
    inventory: getInventorySnapshot(),
    equipped: getEquippedSnapshot(),
    features: {
      inventoryUnlocked: !!feats.inventoryUnlocked,
      equipmentUnlocked: !!feats.equipmentUnlocked,
    },

    // QoL — Persist player HP (stored in PC.state)
    currentHP: (st ? (st.currentHP ?? 0) : 0),

    // 0.0.70c+ — persist world map (owned by PC.state, not a global)
    worldMap: (st ? st.worldMap : null),

    // 0.0.70e — persist per-zone deltas (deterministic regen + deltas)
    zoneDeltas: (st ? (st.zoneDeltas || {}) : {}),
  };

  const idx = saves.findIndex(s => s.id === snapshot.id);
  if (idx === -1) {
    saves.push(snapshot);
  } else {
    saves[idx] = snapshot;
  }

  if (st && st.save) st.save.currentSaveId = snapshot.id;
  writeAllSaves(saves);
  renderSaveList(saves);
}

function loadSave(id) {
  const saves = loadAllSaves();
  const rawSave = saves.find(s => s.id === id);
  if (!rawSave) return;

  const save = migrateSave(rawSave);
  if (!save) return;

  const st = (typeof STATE === "function") ? STATE() : null;
  if (st) {
    st.character = {
      name: save.name,
      stats: { ...save.stats },
      skills: save.skills
        ? cloneSkills(save.skills)
        : createDefaultSkills(), // fallback for old saves
    };
    if (st.save) st.save.currentSaveId = save.id;
  }

  // QoL — Restore player HP (backward compatible)
  const savedHP = (typeof save.currentHP === "number") ? save.currentHP : 0;
  if (typeof setCurrentHP === "function") {
    setCurrentHP(savedHP);
  } else if (typeof STATE === "function") {
    STATE().currentHP = savedHP;
  }

  loadInventoryFromSnapshot(save.inventory || {});

  // 0.0.70c+ — Restore world map from save into PC.state (no globals)
  if (save.worldMap) {
    if (typeof setWorldMap === "function") {
      setWorldMap(save.worldMap);
    } else if (typeof STATE === "function") {
      STATE().worldMap = save.worldMap;
    }
  } else if (typeof createDefaultWorldMap === "function") {
    const wm = createDefaultWorldMap("tutorial_zone");
    if (typeof setWorldMap === "function") {
      setWorldMap(wm);
    } else if (typeof STATE === "function") {
      STATE().worldMap = wm;
    }
  }

  // 0.0.70e — Restore per-zone deltas into PC.state
  if (typeof STATE === "function") {
    STATE().zoneDeltas = save.zoneDeltas || {};

    // Phase 8 — Validate/normalize delta shape (backward compat + corruption guard).
    try {
      if (window.PC?.content && typeof PC.content.normalizeAllZoneDeltas === "function") {
        PC.content.normalizeAllZoneDeltas(STATE().zoneDeltas);
      }
    } catch (e) {
      console.warn("loadSave: failed to normalize zoneDeltas", e);
    }
  }

  // Restore equipped items (if present)
  if (save.equipped) {
    loadEquippedFromSnapshot(save.equipped);
  } else {
    loadEquippedFromSnapshot(null);
  }

  updateCharacterSummary();
  recomputeCharacterComputedState();

  // ----- Restore feature unlocks (with backward-compat) -----
  const feats = save.features || {};

  const hasInventoryItems =
    save.inventory && Object.keys(save.inventory).length > 0;
  const hasEquippedItems =
    save.equipped && Object.values(save.equipped).some(Boolean);

  const invUnlocked =
    typeof feats.inventoryUnlocked === "boolean"
      ? feats.inventoryUnlocked
      : hasInventoryItems;

  const eqUnlocked =
    typeof feats.equipmentUnlocked === "boolean"
      ? feats.equipmentUnlocked
      : hasEquippedItems;

  if (st && st.features) {
    st.features.inventoryUnlocked = invUnlocked;
    st.features.equipmentUnlocked = eqUnlocked;
  }

  if (inventoryButton) {
    inventoryButton.style.display = invUnlocked ? "block" : "none";
  }
  if (equipmentButton) {
    equipmentButton.style.display = eqUnlocked ? "block" : "none";
  }
  if (equipmentPanel && !eqUnlocked) {
    equipmentPanel.style.display = "none";
  }

  // Re-render world map (renderer reads from STATE().worldMap)
  if (typeof renderWorldMapUI === "function") {
    renderWorldMapUI();
  }

  // Show the main game screen
  setScreen("game");

  // After loading a save, default to the World Map view
  if (typeof switchToWorldMapView === "function") {
    switchToWorldMapView();
  }
}

function deleteSave(id) {
  let saves = loadAllSaves();
  saves = saves.filter(s => s.id !== id);
  writeAllSaves(saves);

  const st = (typeof STATE === "function") ? STATE() : null;
  const activeId = (st && st.save) ? st.save.currentSaveId : null;

  // If you delete the currently loaded character, reset state
  if (activeId === id && st) {
    st.character = null;
    if (st.save) st.save.currentSaveId = null;
    if (st.features) {
      st.features.inventoryUnlocked = false;
      st.features.equipmentUnlocked = false;
    }

    loadInventoryFromSnapshot(null);
    loadEquippedFromSnapshot(null);

    if (typeof setCharacterComputed === "function") {
      setCharacterComputed(null);
    } else {
      st.characterComputed = null;
    }

    updateEquipmentPanel();
  }

  renderSaveList();
}
