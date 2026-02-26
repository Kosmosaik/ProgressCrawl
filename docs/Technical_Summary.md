# ProgressCrawl --- Technical Summary (Current)

*Last Updated: 2026-02-24*

------------------------------------------------------------------------

# Overview

This document describes the CURRENT technical architecture of ProgressCrawl.
It reflects the current state of the project on the M0.1 branch.

This is not a design document. This is a structural reference for developers
and future GPT assistants.

------------------------------------------------------------------------

# Current Authoritative Design Specs (Design Docs)

These documents define system rules and intended behavior:

- docs/M0_Architecture_Implementation_Spec.md
- docs/Zone_Refresh_and_Entity_Spawn_v1.md
- docs/Combat_System_v1.md
- docs/Grade_System_Technical_Summary.md (Terminology: “Grade” = “Quality” going forward)

This Technical Summary remains a description of implemented code, not future plans.

------------------------------------------------------------------------

# Current Versioning

Version is defined in:

- scripts/config.js → GAME_CONFIG.version
- Displayed in index.html header
- Patch notes pulled from docs/CHANGELOG.md

Patch Notes Loader:

- scripts/game/game.patchnotes.js
- Fetch URL is constructed relative to the current site base (GitHub Pages safe)
- Expects changelog entries to begin with: ## <version heading> (any line starting with `## `)

------------------------------------------------------------------------

# Core Architecture

## Global Namespace

Primary namespace:

- PC

All major systems attach to PC.*

Example:

- PC.state
- PC.content
- PC.worldMap
- PC.util

Rule: No new persistent systems should exist outside PC.

------------------------------------------------------------------------

# State Management

## Central State Container

Persistent gameplay state is stored in:

- PC.state

Current major properties include (not exhaustive):

- worldMap
- zoneDeltas
- currentZone
- currentHP
- exploration state (timers, flags, UI-facing runtime state)

Important Note:

- Some persistent gameplay values still exist as globals (see M0.2 in ROADMAP):
  - currentCharacter
  - inventoryUnlocked
  - equipmentUnlocked

Rule: All persistent gameplay state must eventually live inside PC.state.

------------------------------------------------------------------------

# Save System

Location:

- scripts/game/game.save.js

Current Characteristics:

- Uses localStorage
- Save key: PROGRESSCRAWL_SAVES_V1
- Legacy key supported (read-only fallback + copy-forward):
  - CTGL_SAVES_V1
- Snapshot root includes:
  - schemaVersion
- Migration system exists:
  - migrateSave(saveObj) is applied during load
- Snapshot includes:
  - Character data
  - Inventory snapshot
  - Equipped snapshot
  - Feature unlock flags (inventory/equipment unlocked)
  - PC.state world state (worldMap, zoneDeltas)
  - Player HP (currentHP)

Notes:

- ID generation for new saves uses generateId() (crypto.randomUUID when available).
- Frequent save requests are coalesced through requestSaveCurrentGame().

------------------------------------------------------------------------

# World & Zones

## Zones

Zone generation and management:

- scripts/zones/zones.generator.js
- scripts/zones/zones.core.js
- scripts/zones/zones.ui.js

Zones contain:

- Grid-based tiles
- Entities
- Resource nodes
- POIs
- Locations (planned/partial depending on branch state)

Exploration progress is tracked. Locked gates exist and persist through deltas.

------------------------------------------------------------------------

# Deterministic Instance System

Content instances use deterministic IDs such as:

- resourceNodes_<defId>_<x>_<y>

This allows:

- Regeneration of zones from seed
- Persistence via delta tracking
- Stable references across saves

This is a foundational system and must not be replaced.

------------------------------------------------------------------------

# Delta System (World Persistence)

Location:

- scripts/content/content.deltas.js

Tracks per-zone changes including (not exhaustive):

- harvested nodes
- defeated entities
- opened POIs
- inspected objects
- discovered locations
- explored tiles
- unlocked regions

Each zone has its own delta object. This prevents needing full world snapshots.

------------------------------------------------------------------------

# Content System

Location:

- scripts/content/

Handles:

- Populating entities, nodes, POIs
- Interaction routing
- Delta persistence

Interaction entry point:

- scripts/content/content.interact.js

Current Limitation:

- Some interaction logic may still be partially handled in zone UI
  (example: certain gate/lock flows) and is scheduled for unification under ROADMAP M0.

------------------------------------------------------------------------

# Combat

Combat is not yet treated as a finalized, modular system. Roadmap milestones will formalize:

- Combat loop
- Stats scaling
- Enemy behaviors

------------------------------------------------------------------------

# UI Structure

Primary UI defined in:

- index.html
- scripts/ui/*
- scripts/zones/zones.ui.js

Current limitations:

- Entire grid renders at once
- Panels may move off-screen on resize
- Camera/viewport system not yet implemented

Planned improvements in M1.

------------------------------------------------------------------------

# World Map

Location:

- scripts/worldmap/

Tracks unlocked regions and travel state. Persisted via PC.state.worldMap.

------------------------------------------------------------------------

# Patch Notes System

Location:

- scripts/game/game.patchnotes.js

Fetch target:

- docs/CHANGELOG.md (resolved relative to current page URL/base)

Important Rule:

Changelog entries MUST use:

## vX.X.X

Otherwise patch notes UI will not parse correctly.

Failure Mode:

- If the fetch URL is wrong (especially on GitHub Pages), a 404 HTML page may be returned.
- The current patch notes loader guards against this by checking res.ok and showing a readable error.

------------------------------------------------------------------------

# Architectural Strengths

- Deterministic instance IDs
- Delta-based world persistence
- Central state container (PC.state) already exists
- Modular content generation boundaries

------------------------------------------------------------------------

# Architectural Weaknesses (Planned Fixes)

- Some persistent globals still exist outside PC.state (ROADMAP M0.2)
- Deterministic ID helper utilities not yet centralized (ROADMAP M0.3)
- Interaction pipeline not fully unified (ROADMAP M0.4)
- Additional hygiene/legacy cleanup remains (ROADMAP M0.5)

------------------------------------------------------------------------

# Development Rules (High-Level)

1. No new persistent globals.
2. All persistent data must attach to PC.state (or approved accessors).
3. All world changes must persist via delta helpers.
4. Do not bypass deterministic ID system.
5. Do not add interaction logic directly inside UI without routing through content layer.

------------------------------------------------------------------------

# Recommended Reading Order (Full Project Understanding)

This reading order is structured to give a GPT assistant (or developer)
a complete and accurate mental model of how ProgressCrawl works.

It follows the actual runtime and architectural flow:

HTML → Config → Core → State → Save → UI → Gameplay → World → Zones → Content → Utilities

Do not jump directly into content or zones without first understanding
state initialization and save logic.

------------------------------------------------------------------------

## 1️⃣ Entry & Bootstrap (Understand Runtime Flow First)

Start here to understand how the game initializes.

1. index.html  
   - Main DOM structure  
   - Screens and panels  
   - Script load order  
   - Button IDs and UI structure  
   - Entry points for runtime behavior  

2. scripts/config.js  
   - GAME_CONFIG  
   - Version string  
   - Global tweakable settings  

3. scripts/core/pc.core.js  
   - PC namespace initialization  
   - Base architecture structure  
   - Creation of PC.state  

Goal:
Understand how the global namespace is created and how the project boots.

------------------------------------------------------------------------

## 2️⃣ State & Save System (Persistence Layer)

Next, understand how persistent state works.

4. scripts/game/game.save.js  
   - Save key (PROGRESSCRAWL_SAVES_V1)  
   - schemaVersion  
   - migrateSave()  
   - Snapshot structure  
   - loadSave() flow  
   - requestSaveCurrentGame()  

5. Any file defining:
   - STATE()  
   - EXP()  
   - MOV()  
   - PC.api.* accessors  

Goal:
Understand:
- What is persisted
- How migration works
- What is stored in PC.state
- What persistent globals still exist (M0.2 target)

------------------------------------------------------------------------

## 3️⃣ Screen & UI Switching

Understand how the game transitions between screens.

6. scripts/ui/*  
7. Any file containing:
   - setScreen(...)
   - screen toggling logic  
   - panel visibility control  

Goal:
Understand:
- Screen lifecycle
- Game view vs world map vs creation
- Modal behavior (patch notes etc.)

------------------------------------------------------------------------

## 4️⃣ Character & Core Gameplay Layer

Understand how character data becomes runtime state.

8. scripts/game/game.creation.js  
   - Character creation  
   - Initial state setup  

9. scripts/game/game.js  
   - Computed state  
   - Attribute scaling  
   - Derived stats  
   - Recompute flow  

10. scripts/game/game.patchnotes.js  
    - CHANGELOG.md loading  
    - Parsing rules  
    - Fetch logic  

Goal:
Understand:
- How player data is computed
- Where derived stats come from
- How runtime recalculations work

------------------------------------------------------------------------

## 5️⃣ World Map System

Understand world-level structure.

11. scripts/worldmap/*  
   - World map generation  
   - Region unlock tracking  
   - Travel logic  
   - Rendering  

Goal:
Understand:
- PC.state.worldMap structure
- Region persistence
- Travel flow

------------------------------------------------------------------------

## 6️⃣ Zone System (Core Exploration Engine)

This is the gameplay core.

12. scripts/zones/zones.generator.js  
    - Deterministic zone generation  

13. scripts/zones/zones.core.js  
    - Zone runtime logic  

14. scripts/zones/zones.ui.js  
    - Grid rendering  
    - Exploration behavior  
    - Interaction triggers  

Goal:
Understand:
- Grid logic
- Tile states
- Exploration tracking
- How UI connects to zone logic

------------------------------------------------------------------------

## 7️⃣ Content & Interaction System (Backbone of Persistence)

This layer connects world content with deltas and interactions.

15. scripts/content/content.populate.js  
    - Entity / node / POI injection  

16. scripts/content/content.deltas.js  
    - Per-zone delta tracking  
    - Persistence structure  

17. scripts/content/content.interact.js  
    - Interaction routing  
    - Delta writing  
    - Action result objects  

Goal:
Understand:
- Deterministic instance IDs
- World persistence model
- Interaction contract design

------------------------------------------------------------------------

## 8️⃣ Utilities & Helpers

18. scripts/util/* (if present)  
19. Any file defining:
    - PC.util.*
    - ID generation
    - Formatting helpers

Goal:
Understand support systems used across the project.

------------------------------------------------------------------------

# Important Reading Discipline

A GPT assistant must:

- Never assume file contents
- Never guess DOM structure
- Always confirm script load order in index.html
- Always identify state initialization before proposing changes
- Always verify where persistent state lives before modifying logic

------------------------------------------------------------------------

This section exists to prevent:
- Architectural drift
- Duplicate state systems
- Save corruption
- UI-level hacks bypassing content systems
- Refactor loops

------------------------------------------------------------------------

# Relationship to ROADMAP

This document describes current reality. ROADMAP.md describes planned evolution.

If this document and the roadmap conflict, this document represents current implementation truth.
