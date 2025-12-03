# ProgressCrawl – Technical Project Summary (For Next GPT Assistant)
## Updated as of Patch 0.0.70b (in progress)

This document provides a complete technical overview of the ProgressCrawl project, its architecture, current implementation status, the long-term vision, and the detailed roadmap for Update 0.0.70 – Exploration.  
This summary is intended to help the next GPT-based assistant seamlessly continue development from the exact point where work stopped.

---

# 1. PROJECT OVERVIEW

ProgressCrawl is a data‑driven survival/crafting/progression RPG with exploration mechanics spanning multiple eras (Primitive → Medieval → Industrial → Sci-Fi).  
The player begins in a handcrafted tutorial zone, then expands outward into a dynamically generated world composed of interconnected “zones.”  
Future zones are generated on‑demand according to biome unlocks, puzzle progression, and era transitions.

### Core pillars:
- Exploration: tile-based zones, fog-of-war, locked subregions, POIs, resources, entities (animals, monsters, bosses), dynamic events.
- World Progression: expanding world map revealing new zones outward.
- Procedural Generation: all non-tutorial zones generated via algorithms such as Cellular Automata.
- Era/Biome Unlocking: collecting puzzle pieces unlocks new world biomes and eras.
- Fully Data‑Driven: all zones, templates, biomes, and resources defined in external JS structures.

---

# 2. CURRENT TECHNICAL STATUS (AS OF 0.0.70b)

Below is the exact state of the systems relevant to Update 0.0.70.

## 2.1 Data‑Driven Zones (DONE)
- Tutorial Zone defined in `zones.data.js` via ASCII map.
- Layout symbols:
  - `#` = blocked
  - `.` = walkable
  - `L` = locked tile
- Fog-of-war (`?`) handled entirely in the UI on unexplored tiles.

## 2.2 Zone Creation Framework (DONE)
- `createZoneFromDefinition(zoneId)` loads:
  - Static zones  
  - Generated zones  
- Tiles initialized as `{ kind, explored:false }`.

## 2.3 Zone Rendering (DONE)
- Rendering and tile display in `zones.ui.js`.
- Explored→symbol, unexplored→`?`.

## 2.4 World Map (DONE)
- 9×9 grid created during new game startup.
- Fog states: UNKNOWN, DISCOVERED, VISITED.
- Tutorial zone placed at world center (may be changed later).
- Adjacent zones marked DISCOVERED.
- World map ASCII renderer in `worldmap.ui.js`.

## 2.5 Generated Neighbor Zones (PARTIALLY DONE)
- Defined in data: tutorial_zone_north/east/west/south.
- Type: `"generated"` with CA configs.
- Weather states included.
- CA system works, but locked regions are not yet inserted.

## 2.6 Zone CA Generator (DONE)
- `zones.generator.js` implements:
  - Randomized fill
  - Smoothing iterations
  - Optional solid border
  - Output: array of strings (`#`/`.`)

## 2.7 Internal Locked Regions (NOT DONE)
Features not yet implemented:
- Region detection via flood-fill.
- Identify secondary region.
- Insert chokepoint `L` tile.
- Make secondary region inaccessible until `L` is unlocked (will be puzzle/trap or something else later, but for now let's unlock by clicking on it).

## 2.8 Zone ↔ World Map Transitions (NOT DONE)
Missing:
- Leave Zone → show world map.
- Click world tile → enter that zone.
- Apply fog-of-war updates after entering zones.
- Prevent entering locked world tiles (for future versions).

---

# 3. FILE STRUCTURE

## 3.1 Zones
```
scripts/zones/
  zones.data.js        # Zone definitions (static + generated)
  zones.generator.js   # CA generator & future generation algorithms
  zones.core.js        # Main zone logic, tile structure, zone creation
  zones.ui.js          # Zone ASCII rendering
```

## 3.2 World Map
```
scripts/worldmap/
  worldmap.core.js     # World map tiles, fog-of-war logic
  worldmap.ui.js       # ASCII world map renderer
```

## 3.3 Game Framework
```
scripts/game/
  game.creation.js     # New game setup, spawn tutorial zone + world map
  game.ui.panels.js    # Panel toggling
  game.screens.js      # Screen switching
  game.save.js, etc.
game.js                # Global state (currentZone, worldMap)
```

---

# 4. ZONE SYMBOLS & RULES

### Data Layout Symbols:
- `#` = blocked wall  
- `.` = walkable  
- `L` = locked tile  

### UI Exploration Symbols:
- `?` = unexplored  
- These symbols only appear after exploration:
  - `.` walkable (explored)
  - `#` blocked  
  - `L` locked  (later - should not show on map but instead be in fog of war as other unexplored tiles)

---

# 5. DETAILED 0.0.70 ROADMAP (UPDATED)

## 0.0.70a2 — COMPLETE
- Data-driven zone foundation.
- Tutorial zone ASCII layout.
- Weather data fields.
- World map foundation (9×9 grid).
- Fog-of-war system.
- Placeholder zone slot assignment.
- Matching UI layout for Zone ↔ World Map.

---

# 0.0.70b — Zone Generation, Locked Subregions & Transitions (CURRENT)

### System Summary:
- CA generation → DONE  
- Generated neighbors → DONE  
- Weather → DONE  
- Locked subregions → TODO  
- Transitions → TODO  

## What remains for 0.0.70b:

### 1. Procedural Zone Generation Extensions (AFTER STEP 2 PLEASE!)
- Implement region detection (flood-fill groups).
- Determine primary region (largest area).
- Pick chokepoint tile between primary & secondary region.
- Replace that tile with `L`.
- Mark secondary region inaccessible until unlocked.

### 2. Zone ↔ World Map Transitions (LET'S DO THIS BEFORE IMPLEMENTING REGION DETECTION (PRIMARY / SECONDARY) SO WE CAN TEST THE UI WITH WHAT WE HAVE FIRST!)

#### Leave Zone → World Map
- Add UI action to leave the current zone.
- Set `isInZone = false`.
- Hide zone panel, show world map panel.
- Mark world tile as VISITED.

#### World Map → Enter Zone
- Make world map tiles interactive.
- Validate: zoneId exists, not locked.
- Call `createZoneFromDefinition(zoneId)`.
- Update fog-of-war (VISITED + reveal neighbors).
- Hide world map, show zone panel.

---

# 6. FUTURE 0.0.70 BRANCHES

## 0.0.70c — World Slot Generation & Era/Biome Unlocking
- Templates for zone types.
- Assign slot properties (ERA, BIOME, TEMPLATE, SEED) when revealed.
- Puzzle-piece gating for new biomes & eras.
- Lazy tilemap generation (on zone entry).

## 0.0.70d — Static Zone Content Generation
- Pre-fill zones with resources, entities, locations, POIs.
- Tile reveal shows pre-generated content.

## 0.0.70e — Dynamic Event System
- Event engine.
- Weather events.
- Encounter events.
- Disasters & merchants.

## 0.0.70f — Resource Layer
- Inspect nodes.
- Harvest.
- Depletion.
- Respawn.

## 0.0.70g — Entity Behavior (Non-Combat)
- Passive creatures.
- Roaming behavior.

## 0.0.70h — Sub-Zone Exploration
- Mini-zones within zones.

## 0.0.70i — POI Interactions
- Rewards, puzzles, traps.
- Unlocking locked tiles.

## 0.0.70j — Difficulty Integration
- Scaling resource and entity weights.
- Danger indicators.

## 0.0.70k — Saving & Persistence
- World map persistence.
- Zone save states.
- POI/entity persistence.
- Timers & event persistence.

## 0.0.70l — Polish & Dev Tools
- Debug overlays.
- Zone regeneration tools.
- UI polish & bug fixes.

---

# 7. DESIGN RULES (IMPORTANT FOR CONTINUATION)

### 7.1 Zones:
- Always data-driven.
- Deterministic via seed.
- Generated only on demand.
- Tutorial zone is always static.

### 7.2 World Map:
- Only stores *metadata* (slot info), not tilemaps.
- Tilemap generated only when entering.

### 7.3 Fog-of-War:
- Zone-level: tile.explored → `?`
- World-level: UNKNOWN / DISCOVERED / VISITED

### 7.4 Locked Regions:
- Always inside the zone, not on world map.
- Secondary area hidden until unlocked.
- Access controlled via chokepoint `L`.

---

# 8. NEXT REQUIRED STEP

### The exact next step of development (as of now):

**Implement Zone ↔ World Map transitions and internal locked subregions.**

This includes:
1. Leave Zone → go to world map.
2. Click world map tile → enter zone.
3. Update world fog-of-war.
4. Implement subregion detection + chokepoint L into CA zones.

Once complete, the branch 0.0.70b will be finished.

---

# End of Summary
