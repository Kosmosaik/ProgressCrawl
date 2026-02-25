# ProgressCrawl --- Zone Refresh & Entity Spawn System (v1)

**Status:** Design Locked (Pre-Implementation Spec)\
**Scope:** Defines how zones refresh, how entities respawn, and how
resource nodes regenerate.\
**Audience:** Future developers and GPT assistants working on world
persistence and spawn logic.

------------------------------------------------------------------------

# 1. Purpose

The Zone Refresh system exists to:

-   Prevent zones from being permanently depleted.
-   Preserve long-term persistence while allowing controlled
    regeneration.
-   Separate deterministic world structure (tiles, POIs) from
    regenerating systems (entities, resource nodes).
-   Avoid exploit-based rerolling via reload or re-entry.

This system must integrate with: - Deterministic ID rules (M0.3) - Delta
persistence system - Unified Time System (M4)

------------------------------------------------------------------------

# 2. High-Level Rules

A zone may refresh only if:

1.  The zone has reached **100% exploration** at least once.
2.  The player leaves the zone.
3.  The refresh countdown has completed.

Refresh is **applied on next zone entry**, never mid-zone.

------------------------------------------------------------------------

# 3. Refresh Trigger Logic

## 3.1 Starting the Timer

When: - `zone.explorationPercent === 100` - Player performs "Leave Zone"

Then: - `refreshEligible = true` - `refreshStartTs = Date.now()` -
Countdown begins.

Leaving again while timer runs does NOT restart it.

------------------------------------------------------------------------

## 3.2 Applying Refresh

On zone entry:

If: - `refreshStartTs != null` - AND
`Date.now() - refreshStartTs >= refreshDurationMs`

Then:

-   Apply refresh logic.
-   Set `lastRefreshTs = Date.now()`
-   Clear `refreshStartTs`.

No refresh occurs mid-zone.

------------------------------------------------------------------------

# 4. What Refresh Affects

## 4.1 Resource Nodes (Deterministic Placement)

On refresh:

-   All depleted nodes reset to available.
-   Node positions remain deterministic (seed-based).
-   Node quality rerolls within allowed range.
-   Node depletion flags in deltas are cleared.

Nodes are structurally deterministic but state-reset on refresh.

------------------------------------------------------------------------

## 4.2 Entities (Stored Roll Model --- Option A)

Entities are regenerated per refresh cycle and stored explicitly.

On refresh:

-   Previous `rolledEntities` list is discarded.
-   A new entity set is generated using:
    -   Zone template spawn ranges
    -   Zone difficulty
    -   Grid size
    -   Random generation (not seed-deterministic across cycles)
-   The full entity instances are saved in zone state/deltas.

Entities persist exactly as stored until the next refresh.

Reloading the game does NOT reroll entities.

------------------------------------------------------------------------

## 4.3 POIs & Locations

On refresh:

-   POIs remain discovered/completed.
-   Containers remain opened.
-   Puzzles/traps remain resolved.
-   Locations remain visible if discovered.

POIs never reset automatically.

------------------------------------------------------------------------

# 5. Stored Zone Data Model

Each zone must store:

## Refresh Tracking

-   `refreshEligible: boolean`
-   `refreshStartTs: number | null`
-   `refreshDurationMs: number`
-   `lastRefreshTs: number | null`

## Entity Snapshot (Option A)

-   `rolledEntities: EntityInstance[]`

Each entity instance stores at minimum: - `id` - `defId` - `x, y` -
`quality` - `stateFlags` (alive, defeated, processed) - optional: future
stat/variant fields

------------------------------------------------------------------------

# 6. Entity Spawn Rules

Zone templates define spawn ranges per entity type:

Example:

spawnRanges: { wolf: { min: 1, max: 3 }, rabbit: { min: 3, max: 7 } }

Spawn generation considers:

-   Zone difficulty modifier
-   Zone size/grid size multiplier
-   Optional variance multiplier

All rolled results are stored explicitly.

------------------------------------------------------------------------

# 7. Exploit Prevention

-   Save reload does NOT reroll entities.
-   Re-entering before timer completes does NOT refresh.
-   Leaving multiple times does NOT restart timer.
-   Timer completion does NOT apply mid-zone.

------------------------------------------------------------------------

# 8. Edge Case Handling

## Player re-enters before timer complete

→ No refresh.

## Timer completes while player inside zone

→ Refresh waits until next entry.

## Player death inside zone

If death removes player from zone screen and zone was 100%, timer
begins.

------------------------------------------------------------------------

# 9. Configuration Hooks

Suggested config entries:

-   zoneRefresh.durationMs
-   zoneRefresh.requiresFullExploration = true
-   zoneRefresh.nodeQualityReroll = true

------------------------------------------------------------------------

# 10. Non-Goals (v1)

-   No dynamic seasonal spawn variation yet.
-   No mid-zone refresh.
-   No POI reset system.
-   No world-level cascading refresh.

------------------------------------------------------------------------

# 11. Future Extensions

-   Seasonal entity variation.
-   Weather-modified spawn behavior.
-   Rare-event injection on refresh.
-   Region-based refresh timing differences.

------------------------------------------------------------------------

End of Document.
