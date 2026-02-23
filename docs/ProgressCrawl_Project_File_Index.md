# ProgressCrawl — Project File Index (JS/CSS/MD)
_Generated: 2026-02-23_

This document summarizes **every** `.js`, `.css`, and `.md` file in the project ZIP.
It is meant as a navigation aid for development and for future GPT assistants.


---

## Markdown files

### `README.md`

### `docs/CHANGELOG.md`
- **Top heading:** ## v0.0.71 — QoL Update (Phase D)
- **Purpose:** Release notes/changelog; consumed by in-game patch notes parser.
- **Key sections:**
  - ## v0.0.71 — QoL Update (Phase D)
  - ### Added
  - ### Changed
  - ### Fixed
  - ### Removed
  - ## 0.0.70i — Item Unification & Stable Identity (QoL)
  - ### Added
  - ### Changed
  - ### Fixed
  - ## Patch 0.0.70h - Zone Interaction & Discoveries
  - ## Added
  - ### Move-to-Interact System

### `docs/GPT Assistant Onboarding & Project Rules.md`
- **Top heading:** # ProgressCrawl — GPT Assistant Onboarding & Project Rules
- **Purpose:** Rules and workflow guidance for GPT assistants and contributors.
- **Key sections:**
  - ## Mandatory First Steps (Non-Negotiable)
  - ## Core Development Rules
  - ## State & Architecture Rules (Critical)
  - ## Change Discipline
  - ## Save / Persistence Safety
  - ## Communication Rules
  - ## Purpose of These Rules
  - ## Note on Project Summaries

### `docs/ProgressCrawl_Technical_Summary_0.0.70e.md`
- **Top heading:** # ProgressCrawl – Technical Summary for Version 0.0.70e
- **Purpose:** Technical architecture summary (current reality).
- **Key sections:**
  - ### World Content Generation Systems + Initial Content Population
  - ## 0. Overview
  - ## 1A — Build the Zone Content Generation System
  - ### Required Features
  - ### **1. Add Spawn Table Definitions to ZONE_TEMPLATES**
  - ### **2. Build Content Population Pipeline**
  - ### **3. Modify Zone Creation Flow**
  - ### **4. Deterministic Placement Rules**
  - ### **5. Spawn Constraints**
  - ## 1B — Populate Zones with FIRST CONTENT
  - ### **1. Resource Nodes (Primitive Temperate Forest)**
  - ### **2. Entities**

### `docs/ROADMAP.md`
- **Top heading:** # ProgressCrawl — Unified Roadmap (Single Source of Truth)
- **Purpose:** Project roadmap (single source of truth for planned work).
- **Key sections:**
  - ## Reality Check (Shipped / Exists Today)
  - ## Purpose
  - ## M0.1 --- Save System Versioning & Migration
  - ### Current Issues
  - ### Required Changes
  - ### Done when
  - ## M0.2 --- Single Source of Persistent Truth
  - ### Rule
  - ### Must Be Migrated Into PC.state
  - ### Target Structure
  - ### Done when
  - ## M0.3 --- Deterministic ID Strategy

### `docs/backlog/fixes.md`
- **Top heading:** # Later in the development, the player will not be able to see the grid size.
- **Purpose:** Backlog / ideas reference (not authoritative).

### `docs/backlog/qol-todo-summary.md`
- **Top heading:** # ProgressCrawl – Zone Exploration QoL Branch (Post–0.0.70e)
- **Purpose:** Backlog / ideas reference (not authoritative).
- **Key sections:**
  - ### TODOs
  - ## IDEAS BELOW ARE NOT TO BE IMPLEMENTED YET. THESE ARE ONLY IDEAS AND NEED TO BE THOUGHT ON FURTHER.
  - ## 8. Notes for the Next Assistant

### `docs/biomes/master_biomes.md`
- **Top heading:** # Master Biome & Zone Type List
- **Purpose:** Project documentation or notes.
- **Key sections:**
  - ## 1. Forest Biomes
  - ## 2. Plains & Grasslands
  - ## 3. Wetlands & Water
  - ## 4. Mountains & Altitude
  - ## 5. Snow & Arctic
  - ## 6. Deserts & Drylands
  - ## 7. Dark Wet Regions
  - ## 8. Underground
  - ## 9. Urban & Settlements
  - ## 10. Magical / Supernatural
  - ## 11. Sci-Fi / Alien
  - ## 12. Special Zones

### `docs/design/ProgressCrawl-architecture-spawn-world-zone-content.md`
- **Top heading:** # ProgressCrawl — Technical Architecture Map
- **Purpose:** Project documentation or notes.
- **Key sections:**
  - ## How Zone Templates, World Map, Spawn Tables, and Content Systems Connect
  - ## 1) High-level Data Flow
  - ### 1.1 World → Zone → Content (runtime)
  - ## 2) Key Registries and “Source of Truth” Objects
  - ### 2.1 Zone Templates
  - ### 2.2 World Tiles (World Map State)
  - ### 2.3 Content Definitions
  - ### 2.4 Loot Tables
  - ### 2.5 Spawn Tables
  - ### 2.6 Content Deltas (Persistence)
  - ## 3) Core Connection Points (Where Systems Meet)
  - ### 3.1 World tile initialization (difficulty + template)

### `docs/design/ProgressCrawl-grade-system-technical-summary.md`
- **Top heading:** # ProgressCrawl — Grade System (Technical Summary for Future Implementation)
- **Purpose:** Technical architecture summary (current reality).
- **Key sections:**
  - ## 1) Core Concepts
  - ### 1.1 Grade format
  - ## 2) Where Grade Lives
  - ### 2.1 Spawn-time: Grade belongs to the **source instance**
  - ### 2.2 Grade is not “loot rarity”
  - ## 3) Player-facing Flow (High Level)
  - ### 3.1 Entity example (Rabbit)
  - ### 3.2 Resource node example (Tree)
  - ## 4) Loot / Harvest Sessions (Key Mechanism)
  - ### 4.1 What is a session?
  - ### 4.2 Session fields (suggested) (NOTE: WE HAVE NOT ADDED MAXIMUM GRADE HERE YET. WE NEED TO DO THAT"
  - ### 4.3 Where sessions should live

### `docs/design/zones_and_worldmap_v1.md`
- **Top heading:** # Zones & World Map – Design Document (v1)
- **Purpose:** Project documentation or notes.
- **Key sections:**
  - ## 1. Overview
  - ## 2. Zone Data Model (Conceptual)
  - ### Identity
  - ### Structure
  - ### Content
  - ### Dynamic Elements
  - ### Runtime State
  - ## 3. World Map & Fog of War
  - ### Visibility States
  - ### Generation Timing
  - ## 4. Tile Types & Visual Language (Inside a Zone)
  - ## 5. Zone Generation

### `docs/ideas/Classes-Professions.md`
- **Top heading:** # RUBIES REFORGED RPG — COMPLETE CLASS & PROFESSION SYSTEM
- **Purpose:** Backlog / ideas reference (not authoritative).
- **Key sections:**
  - ### Fully Reorganized Version (Strict Combat / Magic / Hybrid Split)
  - ## **Warrior**
  - ## **Berserker**
  - ## **Rogue**
  - ## **Archer**
  - ## **Crossbowman**
  - ## **Duelist**
  - ## **Gladiator**
  - ## **Highlander**
  - ## **Pikeman**
  - ## **Brawler**
  - ## **Pugilist**

### `docs/ideas/MASTER_SKILL_SUMMARY_FULL.md`
- **Top heading:** # MASTER SKILL SUMMARY – COMPLETE LIST ACROSS 35+ GAMES
- **Purpose:** Backlog / ideas reference (not authoritative).
- **Key sections:**
  - ### Consolidated Non-Duplicate Skill/Tradeskill/Mechanics Index
  - ### For RPG Profession Design, Deep-Dive Systems & Cross-Game Inspiration
  - ## Natural / Biological
  - ## Geological
  - ## Environmental
  - ## Metalworking
  - ## Stone & Clay
  - ## Wood-based
  - ## Leather / Cloth / Textile
  - ## Chemical / Alchemical
  - ## Food & Drink
  - ## Magic-related Production

### `docs/ideas/icons.md`
- **Purpose:** Backlog / ideas reference (not authoritative).

### `docs/ideas/ideas-roadmap.md`
- **Purpose:** Backlog / ideas reference (not authoritative).


---

## CSS files

### `css/base.css`
- **Responsibility:** Global base styles: layout defaults, typography, buttons, common UI primitives.
- **Approx. selector blocks:** 49

### `css/game.panels.css`
- **Responsibility:** In-game panel styles: inventory/equipment/skills, draggable/popup UI, and related components.
- **Approx. selector blocks:** 135


---

## JavaScript files

### `scripts/bootstrap.js`
- **Responsibility:** Bootstraps the app: verifies required global functions are loaded, then sets initial screen and renders save list.

### `scripts/character.js`
- **Responsibility:** Character system entry/glue: connects character core + UI + related global helpers.
- **Key functions (found):** `buildCharacterComputedState`

### `scripts/character/character.compute.js`
- **Responsibility:** Stat calculation utilities (DPS, derived stats, scaling from STR/DEX, etc.).
- **Key functions (found):** `summarizeEquipmentForCharacter`

### `scripts/character/character.core.js`
- **Responsibility:** Character state model and core operations (create/reset/apply snapshot).
- **Key functions (found):** `getBaseAttributesFromCharacter`, `computeAttributeTotals`

### `scripts/character/character.derived.js`
- **Responsibility:** Character module.
- **Key functions (found):** `computeDerivedStats`, `wVal`
- **Notable constants (found):** `STR`, `DEX`, `INT`, `VIT`

### `scripts/character/character.skills.js`
- **Responsibility:** Skills/professions system: defines skills, XP, leveling, and related helpers.
- **Key functions (found):** `createDefaultSkills`, `cloneSkills`

### `scripts/config.js`
- **Responsibility:** Defines GAME_CONFIG (including version string) and other global configuration used by the UI and systems.
- **Notable constants (found):** `GAME_CONFIG`

### `scripts/content/content.defs.js`
- **Responsibility:** Defines content blueprints/defs (resource nodes, entities, POIs, locations) used when populating zones.
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `register`

### `scripts/content/content.deltas.js`
- **Responsibility:** Delta persistence schema and helpers for per-zone changes (harvested/opened/defeated/explored/etc).
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `ensureDeltaStore`, `ensureZoneDelta`, `applyMapToInstances`, `applyQualityMapToInstances`, `getZoneDelta`, `setInstanceQuality`, `applyZoneDeltas`, `markHarvested`, `markDefeated`, `markOpened`
- **Reads:** PC.state, Zone deltas
- **Writes:** PC.state, Zone deltas
- **Notable dependencies (signals):** PC.state, deltas

### `scripts/content/content.interact.js`
- **Responsibility:** Main interaction router: resolves what the player interacted with and applies deltas + UI updates.
- **Defines globals:** `PC`, `addZoneMessage`, `addZoneDiscovery`, `requestSaveCurrentGame`, `saveCurrentGame`, `renderZoneUI`, `showChoiceModal`
- **Assigns PC.* modules:** `PC.content`, `PC.zoneInteractAt`
- **Key functions (found):** `getZone`, `msg`, `disc`, `getDef`, `findAt`, `getTopInteraction`, `rollLoot`, `giveLootToInventory`, `saveAfterInteraction`, `refreshUI`
- **Reads:** PC.state, Zone deltas
- **Writes:** PC.state, Zone deltas
- **Notable dependencies (signals):** PC.state, deltas, RNG

### `scripts/content/content.lootTables.js`
- **Responsibility:** Loot table definitions and roll helpers for content interactions (nodes/POIs/enemies).
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`

### `scripts/content/content.place.js`
- **Responsibility:** Placement helpers for content within the zone grid (valid tiles, spacing, collision rules).
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `isWalkableTile`, `isWallTile`, `ensureTileContent`, `distManhattan`, `distSq`, `countAdjacentWalls`, `getAllWalkablePositions`, `getCandidatePositions`

### `scripts/content/content.populate.js`
- **Responsibility:** Populates a zone with entities/nodes/POIs/locations using defs + spawn tables and creates deterministic instance IDs.
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `buildZoneSeed`, `subSeed`, `normalizeDifficultyRating`, `resolveContextTable`, `resolveSpawnTable`, `clampInt`, `pickCount`, `computeScaledCount`, `normalizeEntries`, `placeKind`
- **Notable dependencies (signals):** RNG

### `scripts/content/content.rng.js`
- **Responsibility:** Seeded RNG utilities used to make content generation deterministic and reproducible.
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `seedFromString`, `mulberry32`, `nextFloat`, `makeRng`, `createRng`, `rng`, `shuffle`, `pickWeighted`, `pickManyUnique`
- **Notable dependencies (signals):** RNG

### `scripts/content/content.spawnTables.js`
- **Responsibility:** Spawn tables that determine what content can appear in which contexts (biomes/difficulty/zone types).
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.content`
- **Key functions (found):** `ensurePath`
- **Notable dependencies (signals):** RNG

### `scripts/content/temp.js`
- **Responsibility:** Content system module.

### `scripts/core/pc.api.js`
- **Responsibility:** Provides convenience accessors/wrappers (e.g., STATE/EXP/MOV) used across the codebase to interact with PC.state and subsystems.
- **Defines globals:** `PC`, `STATE`, `EXP`, `MOV`, `zoneInteractAt`, `addZoneMessage`, `renderZoneUI`, `openLockedGateModalAt`
- **Assigns PC.* modules:** `PC.api`, `PC.zoneInteractAt`
- **Key functions (found):** `rollQualityForZoneDifficulty`, `getTemplateById`, `getTemplateByName`, `getTemplate`, `makeInventoryInstance`, `makeInventoryInstanceFromName`
- **Reads:** PC.state
- **Writes:** PC.state
- **Notable dependencies (signals):** PC.state

### `scripts/core/pc.core.js`
- **Responsibility:** Defines the global PC namespace and initializes core sub-namespaces plus the central PC.state container.
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.game`, `PC.zones`, `PC.worldmap`, `PC.ui`, `PC.util`, `PC.state`
- **Reads:** PC.state, Zone deltas
- **Writes:** PC.state, Zone deltas
- **Notable dependencies (signals):** PC.state, deltas

### `scripts/equipment.js`
- **Responsibility:** Equipment system entry/glue: wires equipment core to UI panels and global helpers.
- **Key functions (found):** `getEquippedState`

### `scripts/equipment/equipment.core.js`
- **Responsibility:** Equipment core: equipping/unequipping, slot rules, and stat application.
- **Key functions (found):** `isValidEquipSlot`, `equipItemToSlot`, `unequipSlot`, `getEquippedSnapshot`, `loadEquippedFromSnapshot`
- **Notable constants (found):** `EQUIP_SLOTS`

### `scripts/equipment/equipment.tooltip.js`
- **Responsibility:** Equipment tooltip rendering and formatting (requirements, stats display).
- **Key functions (found):** `inferWeaponType`, `buildEquipmentItemTooltip`

### `scripts/game.js`
- **Responsibility:** High-level game glue code: connects systems together and wires up top-level UI events.
- **Defines globals:** `debugCharacterComputed`, `debugZoneState`, `debugWorldMap`
- **Key functions (found):** `getCurrentHP`, `setCurrentHP`, `getCharacterComputed`, `setCharacterComputed`, `getCurrentZone`, `setCurrentZone`, `getIsInZone`, `setIsInZone`, `getWorldMap`, `setWorldMap`
- **Notable constants (found):** `ZONE_MOVEMENT_TILES_PER_SECOND`
- **Reads:** DOM, PC.state
- **Writes:** DOM, PC.state
- **Notable dependencies (signals):** PC.state, DOM

### `scripts/game/game.creation.js`
- **Responsibility:** Character creation flow: manages name/start setup and initializes starting state.
- **Key functions (found):** `randomName`, `updateCharacterCreationUI`, `resetCharacterCreation`, `adjustStat`, `randomizeStats`
- **Notable constants (found):** `BASE_STAT`, `EXTRA_POINTS`, `NAME_POOL`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM, RNG

### `scripts/game/game.loot.js`
- **Responsibility:** Loot button / loot generation logic (legacy loop and/or exploration reward glue).
- **Defines globals:** `ensureInventoryUnlocked`
- **Key functions (found):** `randFloat`, `rollStats`, `startLoot`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM, timers, RNG

### `scripts/game/game.patchnotes.js`
- **Responsibility:** Patch notes UI: fetches /docs/CHANGELOG.md and parses latest section to display in-game.
- **Key functions (found):** `loadPatchNotesFromChangelog`
- **Reads:** DOM, Network (fetch)
- **Writes:** DOM
- **Notable dependencies (signals):** DOM, fetch
- **Notes:**
  - Changelog parsing depends on headings beginning with `## ` in `/docs/CHANGELOG.md`.

### `scripts/game/game.save.js`
- **Responsibility:** Save/load system: serializes snapshot(s) to localStorage and restores state.
- **Key functions (found):** `requestSaveCurrentGame`, `loadAllSaves`, `writeAllSaves`, `renderSaveList`, `generateId`, `saveCurrentGame`, `loadSave`, `deleteSave`
- **Notable constants (found):** `SAVE_KEY`
- **Reads:** DOM, PC.state, Zone deltas, localStorage
- **Writes:** DOM, PC.state, Zone deltas, localStorage
- **Notable dependencies (signals):** PC.state, deltas, localStorage, DOM, timers, RNG
- **Notes:**
  - Roadmap M0 calls for `schemaVersion` + `migrateSave()` + removing legacy save key naming.

### `scripts/game/game.screens.js`
- **Responsibility:** Screen routing: shows/hides UI screens and manages navigation between start/game/creation/etc.
- **Key functions (found):** `setScreen`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM

### `scripts/game/game.ui.modal.js`
- **Responsibility:** Modal dialog helper(s) used by game UI for confirmations/alerts.
- **Defines globals:** `hideChoiceModal`, `showChoiceModal`
- **Key functions (found):** `hasDom`, `cleanup`, `hideChoiceModal`, `showChoiceModal`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM, timers

### `scripts/game/game.ui.panels.js`
- **Responsibility:** UI panel management (open/close panels, layout updates) for inventory/equipment/skills/etc.
- **Defines globals:** `ensureInventoryUnlocked`
- **Key functions (found):** `ensureInventoryUnlocked`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM, timers

### `scripts/inventory.js`
- **Responsibility:** Inventory system entry/glue: wires inventory core to UI and global helpers.
- **Key functions (found):** `setupInventoryFlatColumnResizing`, `onMouseMove`, `onMouseUp`, `updateInventoryPanelWidthToFitColumns`, `initInventoryPanelResizeMode`
- **Notable constants (found):** `MIN_WIDTH`, `PANEL_PADDING`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM

### `scripts/inventory/inventory.core.js`
- **Responsibility:** Inventory core: add/remove/stack logic and inventory operations.
- **Defines globals:** `ensureInventoryUnlocked`
- **Key functions (found):** `addToInventory`, `removeOneFromGroup`, `getEquipSlotForItem`, `equipOneFromGroup`

### `scripts/inventory/inventory.data.js`
- **Responsibility:** Inventory item data helpers (item registry lookups, default item structures).
- **Key functions (found):** `rarityClass`, `span`, `fmt`, `formatDelta`, `inferWeaponTypeFromItem`, `qualityStep`, `summarizeQualityRange`, `statsEqual`, `statsSignature`, `groupByIdentical`
- **Notable constants (found):** `STAT_LABELS`

### `scripts/inventory/inventory.persistence.js`
- **Responsibility:** Inventory snapshot/restore helpers used by save/load.
- **Key functions (found):** `getInventorySnapshot`, `loadInventoryFromSnapshot`

### `scripts/inventory/inventory.render.category.js`
- **Responsibility:** Inventory UI renderer for category-based views (grouping and section rendering).
- **Key functions (found):** `renderInventory`, `renderInventoryCategoryView`, `makeSortButton`, `makeIdenticalGroupLine`, `renderInventoryAllItemsView`, `makeHeaderCell`
- **Notable constants (found):** `CATEGORY_ORDER`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM

### `scripts/inventory/inventory.sort.js`
- **Responsibility:** Sorting logic for inventory items.
- **Key functions (found):** `compareStacks`, `bestQualityRank`

### `scripts/inventory/inventory.state.js`
- **Responsibility:** Inventory UI state (expanded stacks, selected category) and state transitions.
- **Key functions (found):** `raritySortValue`, `setInventoryViewMode`, `collapseAllCategories`, `expandAllCategories`, `getInventoryFlatColumnWidths`, `setInventoryFlatColumnWidths`, `applyInventoryFlatColumnWidthsToElement`
- **Notable constants (found):** `RARITY_ORDER`, `INVENTORY_FLAT_COL_COUNT`
- **Reads:** DOM, localStorage
- **Writes:** DOM, localStorage
- **Notable dependencies (signals):** localStorage, DOM

### `scripts/items.js`
- **Responsibility:** Item registry/data helpers (item defs, rarity colors/text, formatting).
- **Key functions (found):** `rollRarity`, `getRandomItem`
- **Notable constants (found):** `RARITY_WEIGHTS`
- **Notable dependencies (signals):** RNG

### `scripts/quality.js`
- **Responsibility:** Quality/grade system logic (grade mapping to bonuses and display).
- **Key functions (found):** `initQualityBuckets`, `pickWeighted`, `rollQuality`, `qualityMultiplier`
- **Notable constants (found):** `TIER_ORDER`, `SUBLEVELS_PER_TIER`, `QUALITY_BUCKETS`
- **Notable dependencies (signals):** RNG

### `scripts/ui.js`
- **Responsibility:** General UI helpers shared across screens (DOM utilities, formatting).
- **Key functions (found):** `showPanel`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM

### `scripts/ui/ui.draggablePanels.js`
- **Responsibility:** Draggable panel behavior (drag handlers, bounds, z-index ordering).
- **Key functions (found):** `initDraggablePanels`, `restorePanelPosition`, `makePanelDraggable`, `onMouseMove`, `onMouseUp`
- **Notable constants (found):** `DRAGGABLE_PANELS`, `SIDE_MARGIN`, `TOP_MARGIN`, `BOTTOM_RESERVED`
- **Reads:** DOM, localStorage
- **Writes:** DOM, localStorage
- **Notable dependencies (signals):** localStorage, DOM

### `scripts/ui/ui.tooltip.js`
- **Responsibility:** Global tooltip system (positioning, show/hide, content injection).
- **Key functions (found):** `show`, `move`, `hide`
- **Reads:** DOM
- **Writes:** DOM
- **Notable dependencies (signals):** DOM

### `scripts/worldmap/worldmap.core.js`
- **Responsibility:** World map state and travel logic (unlocking regions, selecting destinations).
- **Defines globals:** `WorldMapDebug`
- **Key functions (found):** `createWorldMapTile`, `createEmptyWorldMap`, `getWorldMapTile`, `createDefaultWorldMap`, `findWorldTileByZoneId`, `markWorldTileVisited`, `unlockAdjacentWorldTiles`, `worldToLogical`, `logicalToWorld`
- **Notable constants (found):** `WORLD_FOG_STATE`
- **Notable dependencies (signals):** RNG

### `scripts/worldmap/worldmap.slots.js`
- **Responsibility:** World map region/slot definitions and helper utilities.
- **Defines globals:** `WorldSlotDebug`
- **Key functions (found):** `initializeWorldSlotMetadata`, `pickWorldSlotTemplateForDistance`, `pickDifficultyForDistance`, `initializeWorldSlotFromDistance`
- **Notable constants (found):** `ERA`, `BIOME`, `WORLD_SLOT_TEMPLATES`
- **Notable dependencies (signals):** RNG

### `scripts/worldmap/worldmap.ui.js`
- **Responsibility:** World map UI rendering and input handling.
- **Defines globals:** `renderWorldMapUI`, `switchToWorldMapView`, `switchToZoneView`, `selectWorldMapTile`
- **Key functions (found):** `getWorldMap`, `switchToWorldMapView`, `switchToZoneView`, `worldMapTileToChar`, `buildWorldMapGridHTML`, `renderWorldMapTileInfo`, `renderWorldMapUI`, `selectWorldMapTile`, `handleWorldMapTileClick`
- **Reads:** DOM, PC.state
- **Writes:** DOM, PC.state
- **Notable dependencies (signals):** PC.state, DOM

### `scripts/zones/zones.core.js`
- **Responsibility:** Zone system core: orchestrates zone creation/loading, applies deltas to generated zones, and exposes zone APIs.
- **Key functions (found):** `createZone`, `pickZoneEntrySpawn`, `distanceToNearestGate`, `chooseBest`, `createZoneFromDefinition`, `initializeZoneContent`, `computeZoneWalkableRegions`, `markZoneLockedSubregionsFromLayout`, `unlockZoneLockedRegion`, `applyPersistedZoneUnlocks`
- **Notable constants (found):** `ZONE_TILE_KIND`, `ZONE_TILE_SYMBOLS`
- **Reads:** PC.state, Zone deltas
- **Writes:** PC.state, Zone deltas
- **Notable dependencies (signals):** PC.state, deltas, RNG

### `scripts/zones/zones.data.js`
- **Responsibility:** Zone content data/definitions (zone templates, biomes, encounter pools, etc.) consumed by generator/UI.
- **Notable constants (found):** `ZONE_DEFINITIONS`, `ZONE_TEMPLATES`

### `scripts/zones/zones.exploration.js`
- **Responsibility:** Manages exploration progression (ticks/steps), discovery logic, and exploration-related state updates.
- **Defines globals:** `startZoneExplorationTicks`, `stopZoneExplorationTicks`, `startZoneManualExploreOnce`, `onZoneFullyExplored`
- **Key functions (found):** `addRandomZoneMessage`, `scheduleNextZoneExplorationTick`, `revealNextTileWithMessageAndUI`, `beginZoneExplorationCycle`, `runZoneExplorationTick`, `startZoneExplorationTicks`, `clearZoneActiveExploreFlags`, `startZoneExploreDelay`, `cancelZoneExploreDelay`, `stopZoneExplorationTicks`
- **Notable constants (found):** `ZONE_GENERIC_MESSAGES`
- **Notable dependencies (signals):** timers, RNG

### `scripts/zones/zones.generator.js`
- **Responsibility:** Generates zone grids and places structures/features; applies deterministic placement rules.
- **Defines globals:** `ZoneGeneratorDebug`
- **Key functions (found):** `createSeededRandom`, `random`, `randomChance`, `generateLayoutCellularAutomata`, `layoutToCharGrid`, `charGridToLayout`, `computeWalkableRegions`, `isWalkableChar`, `carveCorridorBetweenRegions`, `postProcessCALayoutRegions`
- **Notable dependencies (signals):** RNG

### `scripts/zones/zones.ids.js`
- **Responsibility:** ID helpers/constants for zones (tile IDs, instance IDs, standardized identifiers used by zone system).
- **Defines globals:** `PC`
- **Assigns PC.* modules:** `PC.ZONES`

### `scripts/zones/zones.movement.js`
- **Responsibility:** Handles movement rules/logic within a zone (path steps, constraints, move validation).
- **Defines globals:** `setZonePlayerPosition`, `findPlayerPositionInZone`, `findPathToPreparedTile`, `startZoneMovement`, `stopZoneMovement`
- **Key functions (found):** `setZonePlayerPosition`, `findPlayerPositionInZone`, `findPathToPreparedTile`, `startZoneMovement`, `step`, `stopZoneMovement`
- **Notable constants (found):** `ZONE_MOVEMENT_TILES_PER_SECOND`
- **Notable dependencies (signals):** timers

### `scripts/zones/zones.ui.js`
- **Responsibility:** Renders zone UI (grid), handles zone interaction clicks, and updates exploration/discovery panels.
- **Defines globals:** `openLockedGateModalAt`, `showChoiceModal`, `hideChoiceModal`, `renderZoneUI`, `addZoneMessage`, `addZoneDiscovery`
- **Key functions (found):** `getZone`, `inZone`, `buildContentIndex`, `getTopTileContent`, `getContentDef`, `getInstanceStateLabel`, `getMarkerGlyph`, `isInstanceHiddenFromZone`, `isTileExplored`, `isLockedGateTile`
- **Reads:** DOM, PC.state, Zone deltas
- **Writes:** DOM, PC.state, Zone deltas
- **Notable dependencies (signals):** PC.state, deltas, DOM, timers, RNG
