# ProgressCrawl --- Technical Summary (Current)

*Last Updated: 2026-02-23*

------------------------------------------------------------------------

# Overview

This document describes the CURRENT technical architecture of
ProgressCrawl. It reflects the state of the project after
v0.0.71-stable.

This is not a design document. This is a structural reference for
developers and future GPT assistants.

------------------------------------------------------------------------

# Current Versioning

Version is defined in:

-   scripts/config.js → GAME_CONFIG.version
-   Displayed in index.html header
-   Patch notes pulled from docs/CHANGELOG.md

Patch Notes Loader: - scripts/game/game.patchnotes.js - Expects
changelog entries to begin with: \## vX.X.X

------------------------------------------------------------------------

# Core Architecture

## Global Namespace

Primary namespace: - PC

All major systems attach to PC.\*

Example: - PC.state - PC.content - PC.worldMap - PC.util

No new persistent systems should exist outside PC.

------------------------------------------------------------------------

# State Management

## Central State Container

Persistent gameplay state is stored in:

PC.state

Current major properties include:

-   character (stats, level, HP, etc.)
-   worldMap
-   zoneDeltas
-   currentZone
-   exploration state (timers, flags)

Rule: All persistent gameplay state must eventually live inside
PC.state.

------------------------------------------------------------------------

# Save System

Location: - scripts/game/game.save.js

Current Characteristics:

-   Uses localStorage
-   Save key still contains legacy naming (CTGL_SAVES_V1) --- scheduled
    for replacement
-   Snapshot includes:
    -   Character data
    -   World map state
    -   Zone deltas
    -   HP and exploration state

Current Limitation: - No explicit schemaVersion yet (planned in M0
roadmap milestone) - Migration system not yet formalized

------------------------------------------------------------------------

# World & Zones

## Zones

Zone generation and management:

-   scripts/zones/zones.generator.js
-   scripts/zones/zones.core.js
-   scripts/zones/zones.ui.js

Zones contain: - Grid-based tiles - Entities - Resource nodes - POIs -
Locations

Exploration progress is tracked. Locked gates exist and persist through
deltas.

------------------------------------------------------------------------

# Deterministic Instance System

Content instances use deterministic IDs such as:

resourceNodes\_`<defId>`{=html}*`<x>`{=html}*`<y>`{=html}

This allows: - Regeneration of zones from seed - Persistence via delta
tracking - Stable references across saves

This is a foundational system and must not be replaced.

------------------------------------------------------------------------

# Delta System (World Persistence)

Location: - scripts/content/content.deltas.js

Tracks per-zone changes including:

-   harvested nodes
-   defeated entities
-   opened POIs
-   inspected objects
-   discovered locations
-   explored tiles
-   unlocked regions

Each zone has its own delta object. This prevents needing full world
snapshots.

------------------------------------------------------------------------

# Content System

Location: - scripts/content/

Handles:

-   Populating entities, nodes, POIs
-   Interaction routing
-   Delta persistence

Interaction entry point: - content.interact.js

Current Limitation: - Some interaction logic (e.g., locked gates) still
partially handled in zone UI - Scheduled for unification under roadmap
M0

------------------------------------------------------------------------

# Combat

Minimal combat structure exists but is not fully systemized yet. Future
milestones will formalize:

-   Combat loop
-   Stats scaling
-   Enemy behaviors

------------------------------------------------------------------------

# UI Structure

Primary UI defined in:

-   index.html
-   scripts/ui/\*
-   scripts/zones/zones.ui.js

Current limitations:

-   Entire grid renders at once
-   Panels may move off-screen on resize
-   Camera/viewport system not yet implemented

Planned improvements in M1.

------------------------------------------------------------------------

# World Map

Location: - scripts/worldmap/

Tracks unlocked regions and travel state. Persisted via
PC.state.worldMap.

------------------------------------------------------------------------

# Patch Notes System

Location: - scripts/game/game.patchnotes.js

Fetches: - /docs/CHANGELOG.md

Important Rule: Changelog entries MUST use:

## vX.X.X

Otherwise patch notes UI will not parse correctly.

------------------------------------------------------------------------

# Architectural Strengths

-   Deterministic instance IDs
-   Delta-based world persistence
-   Central state container (PC.state)
-   Modular content generation

------------------------------------------------------------------------

# Architectural Weaknesses (Planned Fixes)

-   Legacy save key naming
-   No explicit save schema versioning
-   Some globals still exist outside PC.state
-   Interaction pipeline not fully unified

These are addressed in ROADMAP M0.

------------------------------------------------------------------------

# Development Rules

1.  No new persistent globals.
2.  All persistent data must attach to PC.state.
3.  All world changes must persist via delta helpers.
4.  Do not bypass deterministic ID system.
5.  Do not add interaction logic directly inside UI without routing
    through content layer.

------------------------------------------------------------------------

# Recommended Reading Order

For new contributors:

1.  scripts/core/pc.core.js
2.  scripts/content/content.populate.js
3.  scripts/content/content.deltas.js
4.  scripts/content/content.interact.js
5.  scripts/zones/zones.generator.js
6.  scripts/game/game.save.js

------------------------------------------------------------------------

# Relationship to ROADMAP

This document describes current reality. ROADMAP.md describes planned
evolution.

If this document and the roadmap conflict, this document represents
current implementation truth.
