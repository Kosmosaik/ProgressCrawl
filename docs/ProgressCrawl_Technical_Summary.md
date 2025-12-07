# ProgressCrawl — Technical Summary (Updated for Patch 0.0.70b)
This document provides an updated, in-depth technical overview of the ProgressCrawl project.  
It is written specifically for the next GPT assistant to quickly understand the architecture, systems, and current state of development after patch **0.0.70b**.

---

# 1. Project Purpose & Vision

ProgressCrawl is a long-term survival RPG project that blends:

- Procedural exploration  
- Zone-based progression  
- Crafting / resource systems (future expansions)  
- World map navigation  
- Era-based advancement (primitive → fantasy → industrial → sci-fi)  

The player journey is built around **zones**—self-contained maps with unique layouts, challenges, and hidden areas—progressed one tile at a time. The world map ties zones together and represents the player's overland exploration.

The 0.0.70 milestone focuses heavily on **zone exploration**, **procedural generation**, and **locked subregion mechanics**, forming the backbone of future gameplay.

---

# 2. Code Architecture Overview

The project is structured modularly:

```
/scripts
  /zones
    zones.core.js       ← Zone logic, tile rules, exploration rules
    zones.ui.js         ← Rendering, buttons, interaction, messages
    zones.generator.js  ← Cellular automata map generator
    zones.data.js       ← Zone definitions (static + generated configs)
  /worldmap
    worldmap.core.js    ← World map system, fog of war, tile structure
    worldmap.ui.js      ← Rendering + interactions for world map
  game.js               ← Global state + bootstrapping
  game.creation.js      ← Start zone, world creation, transitions
  game.save.js          ← Save/load foundation
  game.ui.panels.js     ← UI panel toggling logic
  game.screens.js       ← Screen/layout switching
  game.loot.js          ← Loot system (placeholder)
  game.patchnotes.js    ← Patch display logic
  game.panels.css       ← CSS for panels including zone/wm
index.html
```

Each system handles one clear responsibility: **data → logic → UI** is cleanly layered.

---

# 3. Zone System (Core of 0.0.70)

## 3.1 Zone Data Model — `zones.core.js`

Each zone is a grid of **tiles**, each with:

```
{
  kind: "walkable" | "blocked" | "locked",
  explored: boolean,
  lockedRegionId?: number,
  originalKind?: string
}
```

Tile kind determines:
- Whether a tile is explorable  
- Whether it's part of a locked remainder region  
- Whether it functions as a gate (`L` tile)

The system supports:
- Static tutorial-like layouts
- Fully procedurally generated layouts (CA-based)

---

## 3.2 Exploration System

Core helpers:
- `isTileExplorable(tile)`  
- `countExplorableTiles(zone)`  
- `countExploredTiles(zone)`  
- `getZoneExplorationStats(zone)`  

Exploration modes:
- **Manual** (Explore Next)
- **Auto** (timed tick-based exploration)
- Both reveal exactly **one** tile per action.

Recently fixed: a bug where sequential exploration revealed the entire zone in one tick.

---

## 3.3 Locked Subregions (0.0.70b Key Feature)

Unlockable subregions are automatically generated during zone creation.

Pipeline:
1. Procedural map generated  
2. Walkable regions computed  
3. Largest region = **primary**  
4. All others = **locked region 1**  
5. Corridor carved linking primary ↔ secondary  
6. Gate tile inserted as `L`  
7. Secondary region tiles:
   - Become blocked  
   - Store original kind  
   - Are mapped to `lockedRegionId`  
8. When player clicks `L`:
   - Region is unlocked  
   - All tiles restore their original kinds  
   - Exploration continues normally  

Notes for future assistants:
- The lock mechanic is foundational.  
- Future features: keys, multi-lock, difficulty scaling, zone events.

---

# 4. Zone Generation — `zones.generator.js`

Uses a two-phase approach:

### **Phase 1: Cellular Automata**
- Random initialization with a configurable fill chance
- Smooths the grid with CA rules
- Produces organic cave-like shapes

### **Phase 2: Post-Processing (0.0.70b additions)**
- Converts layout to char-grid  
- Computes walkable region clusters  
- Cleans up small “island” regions  
- Carves corridors between largest and second-largest region  
- Inserts the `L` gate  
- Converts final layout to string array for zone creation  

Configuration options:
```
width, height,
fillChance,
smoothIterations,
borderIsWall
```

---

# 5. Zone UI — `zones.ui.js`

Handles:
- Rendering the zone map using `<span class="zone-cell">`
- Click handling for `L` tiles
- Exploration buttons
- Stats + status display
- Message + discovery logs
- Finish zone menu (always visible as of 0.0.70b)
- Scrollable map container (camera auto-follow removed)

Important details:
- UI refresh is triggered after every exploration tick
- HTML grid rendering uses `innerHTML` (not `textContent`)

---

# 6. World Map System

## 6.1 `worldmap.core.js`
World consists of:
- 9×9 tile grid  
- Each tile has:
  ```
  {
    zoneId,
    fogState: HIDDEN | DISCOVERED | VISITED
  }
  ```
- Player starts in center tile
- Adjacent tiles are pre-discovered placeholders

Used for:
- Navigating between zones  
- Tracking visited areas  
- Unlocking future expansion directions  

## 6.2 `worldmap.ui.js`
- Clickable map
- Shows fog states
- Switches screen to zone view on entering

---

# 7. Screens & UI Panels

### `game.ui.panels.js`
Controls which panels are shown:
- Zone panel  
- World map panel  
- Main gameplay  

### `game.screens.js`
Handles transitions between:
- Title  
- Gameplay  
- World map  

---

# 8. Patch 0.0.70b — Technical Changes Summary

### Added
- Automatic locked subregion detection
- Gate tile interaction system
- Corridor carving algorithm
- Scrollable zone map
- HTML tile rendering
- Cleanup of CA-generated shapes

### Fixed
- Sequential exploration bug (whole zone revealed at once)
- Missing/incorrect zone definitions
- Camera auto-follow causing snap issues
- HTML showing as plain text
- Zone leaving logic improved  
- World map visitation markers updated properly

### Removed
- Auto-follow camera function (incompatible with scroll UX)

---

# 9. Development Principles for Future Assistants

1. **Do not break the tile data model.**  
2. **Keep generation, core logic, and UI strictly separated.**  
3. **Any new exploration rules must integrate with:**
   - exploration helpers  
   - UI refresh pipeline  
   - world map transition logic  
4. **Maintain compatibility with locked region foundations.**  
   Future systems (keys, difficulty scaling, encounter tiers) depend on it.  
5. **Avoid automatic scrolling unless specifically requested.**  
6. **Always update both UI and world state when a player leaves a zone.**  
7. **Procedural generation should remain deterministic per seed if implemented later.**

---

# 10. Roadmap Context (For Continuity)

### Recently completed (0.0.70b)
- Locked region mechanics
- CA cleanup improvements
- Clickable tile-based map
- Stable exploration behavior

### Upcoming (0.0.70c)
See ProgressCrawl_Technical_Roadmap.md

---

# 11. Closing Notes

This summary should equip the next GPT assistant with sufficient understanding to continue development.  
The systems introduced in patches 0.0.70a–b form the backbone of the zone exploration flow.

**All new development should respect the existing separation between:**
- Generation  
- Core logic  
- UI  
- Transition systems  

…to ensure the project remains scalable and maintainable.

