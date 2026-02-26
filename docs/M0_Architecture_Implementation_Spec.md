# ProgressCrawl --- M0 Architecture & Save Stability Implementation Spec

**Status:** Locked Implementation Plan\
**Scope:** Defines exactly how M0 must be completed.\
**Audience:** Future developers and GPT assistants working on core
architecture.

------------------------------------------------------------------------

# Purpose of M0

M0 exists to stabilize architecture before adding new gameplay systems.
No new gameplay features should be implemented until M0 is complete.

M0 ensures:

-   Save system is versioned and migratable.
-   All persistent data lives inside `PC.state`.
-   Deterministic ID rules are centralized.
-   Interactions use a standardized contract.
-   No legacy naming remains.
-   No new persistent globals are introduced.

------------------------------------------------------------------------

# M0.1 --- Save Versioning & Migration

## Requirements

1.  Save key must be: PROGRESSCRAWL_SAVES_V1

2.  Legacy key (CTGL_SAVES_V1) may only exist for migration.

3.  All saves must contain: schemaVersion

4.  All loads must:

    -   Run migrateSave(saveObj)
    -   Apply migration BEFORE hydrating runtime state

5.  Any future schema change MUST:

    -   Increment schemaVersion
    -   Add migration case

## Acceptance Criteria

-   Legacy saves load correctly.
-   Saving then reloading produces identical runtime state.
-   schemaVersion is visible via debug hook.

------------------------------------------------------------------------

# M0.2 --- Single Source of Persistent Truth

## Rule

All persistent gameplay data must exist inside:

PC.state

Globals may exist only for UI convenience, never as source of truth.

## Required Structure (Minimum)

PC.state = { meta: { currentSaveId, schemaVersionLoaded }, character: {
name, stats, skills, equipment, inventory, hp }, features: {
inventoryUnlocked, equipmentUnlocked }, world: { currentZone, worldMap,
zoneDeltas } }

## Forbidden Persistent Globals

The following must NOT remain as independent state:

-   currentCharacter
-   inventoryUnlocked
-   equipmentUnlocked
-   currentSaveId

They must be migrated into PC.state.

## Acceptance Criteria

-   Deleting old globals does not break save/load.
-   Save snapshot is generated entirely from PC.state.

------------------------------------------------------------------------

# M0.3 --- Deterministic ID Strategy

## Rule

All persistent world objects must use deterministic IDs.

## Allowed Random IDs

-   Save slots
-   Temporary combat instances
-   Non-persistent UI elements

## Required Utilities

Implement:

PC.util.makeDeterministicId(type, ...parts) PC.util.makeRandomId(prefix)

## Canonical Format (Recommended)

node:`<defId>`{=html}:`<x>`{=html}:`<y>`{=html}
entity:`<defId>`{=html}:`<x>`{=html}:`<y>`{=html}
poi:`<defId>`{=html}:`<x>`{=html}:`<y>`{=html}
loc:`<defId>`{=html}:`<x>`{=html}:`<y>`{=html}

Exact format may vary but MUST be centralized in helper.

## Acceptance Criteria

-   No persistent object builds IDs via ad-hoc string concatenation.
-   Regenerating same zone seed produces identical IDs.

------------------------------------------------------------------------

# M0.4 --- Unified Interaction Pipeline (Option B Model)

## Philosophy

Interaction handlers:

-   MAY call approved delta helpers.
-   MUST NOT call UI functions.
-   MUST NOT call renderZoneUI().
-   MUST NOT call addZoneMessage().
-   MUST NOT call requestSaveCurrentGame().
-   MUST return a standardized result object.

UI layer consumes result and updates display.

------------------------------------------------------------------------

## Interaction Result Contract

All interactions must return an object structured like:

{ type: "message" \| "timer" \| "panel" \| "combat" \| "stateChange",
messages: \[\], startAction: null \| { actionId, durationMs, label,
payload }, openPanel: null \| { panelId, payload }, startCombat: null \|
{ enemyInstanceId } }

Exact fields may expand, but contract must remain consistent.

------------------------------------------------------------------------

## UI Layer Responsibilities

-   Display messages.
-   Start timers.
-   Open panels.
-   Start combat UI.
-   Trigger save after interaction resolves.

------------------------------------------------------------------------

## Acceptance Criteria

-   No interaction handler directly manipulates DOM.
-   Adding a new interactable does not require UI logic duplication.
-   All interactions follow the same contract structure.

------------------------------------------------------------------------

# M0.5 --- Codebase Hygiene & Debug Utilities

## Legacy Naming

-   No CTGL references except explicitly marked migration support.

## No New Globals Rule

-   Persistent state must live inside PC.state.
-   New systems attach under PC namespace.

## Required Debug Hooks

Expose read-only utilities:

-   Current zone ID
-   Current schemaVersion
-   Delta counts for current zone
-   Toggle verbose interaction logging

------------------------------------------------------------------------

# Final M0 Completion Checklist

-   Save system versioned and migratable.
-   All persistent data inside PC.state.
-   Deterministic ID helpers implemented and used everywhere.
-   Interactions follow standardized contract.
-   No legacy CTGL naming remains (except migration support).
-   Debug utilities exist.
-   Full save/load regression test passes.

------------------------------------------------------------------------

End of Document.
