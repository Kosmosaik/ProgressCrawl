# ProgressCrawl --- Working Rules (Development Contract)

*Last Updated: 2026-02-24*

This document defines the non-negotiable development rules for
ProgressCrawl. All contributors and GPT assistants must follow these
rules when implementing new features or refactoring existing systems.

This is NOT a design document. This is a safety contract to prevent
architectural drift and system breakage.

------------------------------------------------------------------------

# 1. Architectural Non-Negotiables

## 1.1 Single Source of Persistent Truth

-   All persistent gameplay data must live inside `PC.state`.
-   No new persistent globals are allowed.
-   Temporary UI state is allowed outside `PC.state`, but must not
    affect save data.

If something needs to be saved → it belongs in `PC.state`.

------------------------------------------------------------------------

## 1.2 Save System Discipline

-   Save key must be: `PROGRESSCRAWL_SAVES_V1` (or incremented version).
-   Every structural change to save data must:
    -   Increment `schemaVersion`
    -   Add a migration case in `migrateSave()`
-   No breaking save changes without migration support.

------------------------------------------------------------------------

## 1.3 Deterministic ID Rules

Persistent world objects must use deterministic IDs: - Resource nodes -
Entities - POIs - Locations - Zone tiles

Random IDs are allowed only for: - Save slots - Temporary combat
instances - Pure UI elements

No ad-hoc ID formats.

------------------------------------------------------------------------

## 1.4 Interaction Pipeline

All interactions must:

1.  Identify target type (entity / poi / resource / location)
2.  Return a standardized result object
3.  Persist changes via delta helpers

No system may bypass deltas for persistent world changes.

------------------------------------------------------------------------

# 2. Locked Design Decisions

These design rules are frozen unless explicitly redefined in ROADMAP.

## 2.1 Game Identity

-   Long-term persistent survival RPG.
-   Not run-based.
-   No permadeath (at least in early development).

------------------------------------------------------------------------

## 2.2 Death Philosophy

-   Death causes setbacks.
-   Death does NOT reset world progression.
-   Early implementation:
    -   Loss of backpack inventory (partial or full)
    -   Possible durability penalties
-   XP loss optional later.

Death must reinforce survival pressure without deleting progression.

------------------------------------------------------------------------

## 2.3 Durability System (Global Rule)

Durability applies to: - Tools - Weapons - Armor - Stations - Any usable
equipment

Each item has:

-   Durability → current usability (0 = unusable)
-   Integrity / Condition → lifetime cap

Rules: - Using item reduces durability. - Repair restores durability but
reduces integrity. - Integrity at 0 → item cannot be repaired. -
Integrity 0 items may only be salvaged.

Different materials are required for repair depending on item type and what materials was used when crafted.

This system must remain consistent across all future systems.

------------------------------------------------------------------------

# 3. Milestone Discipline

-   Only implement systems inside the currently active milestone.
-   Do not jump ahead in the roadmap.
-   Do not partially implement future milestones.
-   If a feature depends on a future milestone → stop and document the
    dependency.

------------------------------------------------------------------------

# 4. Time System Rule

After M4 (Unified Time System):

-   No system may use isolated `setTimeout` / `setInterval` logic for
    gameplay timing.
-   All time-based actions must use the shared time/action framework.

------------------------------------------------------------------------

# 5. Configuration Discipline

-   Gameplay tuning values should be added to `PC.config.*`
-   Do not hardcode balance values that are likely to change.
-   Document and centralize tuning values under `PC.config.*` (and keep `scripts/config.js` as the entry point for defaults).

------------------------------------------------------------------------

# 6. Definition of Done

A milestone is considered complete only when:

-   It satisfies the "Done when" section in ROADMAP.
-   It does not introduce new globals.
-   It does not break save compatibility.
-   It does not duplicate architectural patterns.
-   It integrates cleanly with existing systems.

------------------------------------------------------------------------

# 7. Documentation Discipline

When implementing user-visible changes:

-   Update CHANGELOG.md
-   Update Technical Summary if architecture changes
-   Keep ROADMAP as the single source of planning truth

------------------------------------------------------------------------

# 8. When in Doubt

If unsure:

-   Prefer architectural consistency over speed.
-   Prefer documenting a decision over guessing.
-   Prefer small safe iterations over large rewrites.

ProgressCrawl prioritizes long-term structural stability over rapid
feature sprawl.
