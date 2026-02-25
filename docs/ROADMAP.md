# ProgressCrawl — Unified Roadmap (Single Source of Truth)

**Purpose** 
- This file is the ONLY roadmap for ProgressCrawl.
- It merges planning into a dependency-ordered system to avoid rebuilds.
- Versions are assigned at release time (CHANGELOG), not pre-planned.
- Survival-first design: combat is layered on top of survival
foundations.
- The game is long-term persistent survival RPG (not
run-based).

**How to use this roadmap**
- Work from Milestone M0 upward.
- Each milestone has:
  - Goal
  - Includes (must-have)
  - Notes / dependencies
  - “Done when” checklist
- Anything not in milestones goes in the Backlog Pool section at the end.

------------------------------------------------------------------------

# Core Design Decisions (Locked)

-   Long-term persistent world progression.
-   Death causes setbacks, not run reset or permadeath.
-   Durability system applies to all usable items (tools, weapons,
    armor, stations).
-   Two durability stats:
    -   Durability → current usability (0 = unusable until repaired).
    -   Integrity/Condition → lifetime cap (reduced on repair; 0 =
        salvage only).

------------------------------------------------------------------------

## Reality Check (Shipped / Exists Today)

-   Zones exploration exists.
-   Discovery list UI exists.
-   Locked gate + lockpicking interaction exists.
-   Patch notes UI pulls from `/docs/CHANGELOG.md`.

---

# Milestones (Dependency-Ordered --- Survival First)

------------------------------------------------------------------------

# M0 --- State, Save & Architecture Consolidation (Hard Requirement Before New Systems)

## Purpose

ProgressCrawl already has:

-   Deterministic content instance IDs
-   Per-zone delta persistence
-   A central `PC.state` container

However:

-   Persistent state is split between `PC.state` and global variables
-   Save schema has no explicit versioning/migration system
-   Interaction logic is partially duplicated
-   Save key and naming still reference "ClickToGetLoot"

This milestone consolidates and stabilizes the foundation so all future
systems (combat, survival, crafting, quests) do not require rewrites.

No new gameplay systems may be added until this milestone is complete.

------------------------------------------------------------------------

## M0.1 --- Save System Versioning & Migration

### Current Issues

-   Save key: `"CTGL_SAVES_V1"`
-   Snapshot has no `schemaVersion`
-   Backwards compatibility handled via fallbacks, not migrations

### Required Changes

1.  Rename save key:

    `"CTGL_SAVES_V1"` → `"PROGRESSCRAWL_SAVES_V1"`

2.  Add to snapshot root:

    `schemaVersion: 1`

3.  Implement:

    `migrateSave(saveObj)`

    -   Must upgrade older schema versions to the latest schema.
    -   Must run before snapshot is applied to game state.

4.  All future save changes MUST:

    -   Increment `schemaVersion`
    -   Add a corresponding migration case

### Done when

-   Loading older saves does not produce undefined or broken state.
-   Snapshot clearly contains `schemaVersion`.
-   Save system no longer references ClickToGetLoot.

------------------------------------------------------------------------

## M0.2 --- Single Source of Persistent Truth

### Rule

All persistent gameplay data must live inside `PC.state`.

No new persistent globals are allowed.

### Must Be Migrated Into PC.state

-   `currentCharacter`
-   `inventoryUnlocked`
-   `equipmentUnlocked`
-   Any persistent combat or stat data outside `PC.state`

### Target Structure

PC.state = {
character: {
name,
level,
stats,
equipment,
hp
},
features: {
inventoryUnlocked,
equipmentUnlocked
},
world: {
currentZone,
zoneDeltas,
worldMap
}
}

UI convenience variables may exist, but persistent gameplay data must
not exist outside `PC.state`.

### Done when

-   Save snapshot is generated almost entirely from `PC.state`.
-   Removing old globals does not break persistence.
-   All new systems attach state under `PC.state`.

------------------------------------------------------------------------

## M0.3 --- Deterministic ID Strategy

### Rules

1.  Deterministic IDs must be used for:

    -   Resource nodes
    -   Entities
    -   POIs
    -   Locations
    -   Persistent zone tiles

2.  Random IDs allowed only for:

    -   Save slots
    -   Temporary combat instances
    -   Non-persistent UI elements

3.  Add utility helpers:

    -   `PC.util.makeDeterministicId(type, parts...)`
    -   `PC.util.makeRandomId(prefix)`

No future system may invent ad-hoc ID formats.

### Done when

-   No persistent world object relies on random ID generation.
-   All persistent instance IDs follow a documented deterministic pattern.
-   ID creation is centralized in helper utilities.

------------------------------------------------------------------------

## M0.4 --- Unified Interaction Pipeline

### Required Standard

All interactions must:

1.  Identify target type (entity / poi / resource / location)

2.  Return a standardized result object, for example:

    -   type: "message"
    -   type: "timer"
    -   type: "combat"
    -   type: "panel"
    -   type: "stateChange"

3.  Persist state changes via approved delta helpers.

### Locked Gates Refactor

-   Must behave like a POI-style interaction.
-   Must persist state through the delta system.
-   Must not contain UI-only hardcoded logic.

Future interactables (traps, crafting stations, quest objects, etc.)
must plug into the same interaction contract.

### Done when

-   Adding a new interaction does not require new architecture.
-   No interaction logic is duplicated between zone UI and content systems.
-   All persistent interaction effects are stored via deltas.

------------------------------------------------------------------------

# M0.5 --- Codebase Hygiene & Structural Rules

## M0.5.1 --- Remove Legacy Naming

-   Remove all "ClickToGetLoot" references.
-   Replace all `CTGL_` prefixes with ProgressCrawl equivalents.
-   Update comments that reference previous project names.

------------------------------------------------------------------------

## M0.5.2 --- No New Globals Rule

-   All persistent gameplay state must exist inside `PC.state`.
-   New systems must attach under the `PC` namespace.
-   Temporary UI variables are allowed, but not persistent gameplay state.

------------------------------------------------------------------------

## M0.5.3 --- Debug Hooks & Inspection Utilities

Add minimal debugging utilities:

-   Toggle verbose interaction logging.
-   Display current zone ID.
-   Display delta counts.
-   Display current save `schemaVersion`.

These tools are required to safely expand systems later.

------------------------------------------------------------------------

# Acceptance Criteria

M0 is complete when:

-   Save system is versioned and migratable.
-   All persistent state lives inside `PC.state`.
-   Deterministic ID rules are enforced and centralized.
-   Interactions use a standardized contract.
-   No legacy CTGL naming remains.
-   No new persistent globals are introduced.

-   Only after this may new gameplay systems be developed.

---

# M1 --- Zone UI & Presentation (Camera + Responsive Panels)

### Goal

Make zones scalable and UI usable on different screen sizes.

### Includes

-   Camera/viewport system (no full-grid rendering requirement)
-   Responsive/clamped draggable panels
-   Stable rendering at 32x32+ grids

### Done when

-   Large zones are playable without UI lag.
-   Panels cannot move off-screen.

------------------------------------------------------------------------

# M2 --- World Structure: Sub-Zones / Locations / POIs

### Goal

Make exploration spatial and meaningful and more varied.

### Includes

-   Enterable locations (mini-zones / zones in zone)
-   Persistent POIs (opened = opened)
-   Transition system (zone ↔ location)
-   New biome type with its own spawn tables and terrain generation (not decided which biome yet).

### Done when

-   Player can enter and exit locations without breaking exploration
    flow.

------------------------------------------------------------------------

# M3 --- Difficulty Integration

### Goal

Difficulty affects the world structurally.

### Includes

-   Enemy variants scale with difficulty
-   Resource quality scales with difficulty
-   Loot tables vary by difficulty
-   Modify difficulty scaling/range on world map (make harder zones more rare than current).

### Done when

-   Raising difficulty visibly changes content and rewards.

------------------------------------------------------------------------

# M3.5 --- Core Game Loop Documentation (Design Milestone)

### Goal

Document and lock the long-term gameplay loop.

### Intended Loop

Explore → Survive → Gather → Craft → Improve → Expand → Adapt → Repeat

### Documentation Must Define

-   Long-term progression systems (skills, equipment, zones).
-   Nature of setbacks (death, durability decay).
-   Power growth curve.
-   How survival pressure scales.
-   Expansion mechanics (unlocking zones, tools, professions).

### Done when

-   The loop is clearly written and aligned with all future systems.

------------------------------------------------------------------------

# M4 --- Unified Time & Action System

### Goal

Create a single timing framework for all actions.

### Includes

-   Standard action durations
-   Day/Night time cycle
-   Seasons (Seasons change after x amount of days)
-   Interrupt logic
-   Cancel rules
-   Pause rules
-   Shared system for:
    -   Exploration ticks
    -   Eating
    -   Crafting
    -   Harvesting
    -   Lockpicking

### Done when

-   No gameplay system uses isolated `setTimeout` logic independently.

------------------------------------------------------------------------

# M5 --- Survival Core (Hunger, Thirst, Basic Regen)

### Goal

Establish survival pressure before combat exists.

### Includes

-   Hunger drain over time
-   Thirst drain over time
-   Eating/drinking interactions
-   Starvation/dehydration penalties
-   Basic HP regen rules

### Done when

-   Player must gather food/water to survive.
-   Survival pressure feels meaningful but not punishing.

------------------------------------------------------------------------

# M6 --- Hands & Item Use System

### Goal

Define physical interaction with the world.

### Includes

-   Left/right hand equipment slots
-   Use item in hand
-   Combine two items
-   Use item on tile (water, fire, etc.)
-   Simple crafting combinations
-   Basic item durability system
-   Modify weapons/tools to use left/right hand slots instead of weapon slot (current state).

### Done when

-   Player can equip tools, use them, and combine items without
    inventory UI hacks.
-   Durability decreases on use.

------------------------------------------------------------------------

# M7 --- Carrying & Encumbrance

### Goal

Inventory progression tied to survival.

### Includes

-   Limited hands-only carry at start and limited weight
-   Backpack unlocks inventory and extra weight limit
-   Weight system
-   Encumbrance penalties (movement/survival impact)

### Done when

-   Carry capacity affects player decisions.

------------------------------------------------------------------------

# M8 --- Gathering v1

### Goal

Turn resources into systems.

### Includes

-   Tool requirements
-   Node depletion/regeneration
-   Node grades (F0 → S9)
-   Timed harvesting / Roll system based on skills
-   Add gathering related skills (Woodcutting, skills for collecting rocks/stones etc).
-   "Improve" resource node/entity/loot upon harvesting. (Improve to max grade or fail).

### Done when

-   Resource collection feels intentional and tool-dependent.

------------------------------------------------------------------------

# M9 --- Processing (Skinning / Butchering)

### Goal

Harvest meaningfully from world entities.

### Includes

-   Skinning → hides
-   Butchering → meat/bones/sinew
-   Skill XP gain
-   Sinew processing chain
-   No more "loot and get everything". Creatures may drop extra items not related to it's "body".

### Done when

-   Resource chain feeds crafting loop.

------------------------------------------------------------------------

# M10 --- Primitive Crafting

### Goal

Establish survival crafting loop.

### Includes

-   Simple recipes
-   Fire/camp interactions
-   Blueprint placement (lean-to, fire pit)
-   Craft timers integrated with time system
-   Separate crafting areas by different skills depending on recipe.

### Done when

-   Player gathers → crafts → survives longer.

------------------------------------------------------------------------

# M11 --- Entity Behavior (Non-Combat First)

### Goal

Make world feel alive before combat.

### Includes

-   Passive/territorial behaviors
-   Roaming logic
-   Flee behavior
-   Awareness system

### Done when

-   Entities feel alive without requiring combat system.

------------------------------------------------------------------------

# M12 --- Failure & Recovery System

### Goal

Define meaningful setbacks.

### Includes

-   Death causes:
    -   Loss of backpack inventory (full or partial)
    -   Durability penalties
    -   Optional XP penalty (future)
-   Respawn rules
-   Future optional corpse retrieval system

### Done when

-   Death reinforces survival without stopping progression.

------------------------------------------------------------------------

# M13 --- Combat v1

### Goal

Layer combat onto survival foundation.

### Includes

-   Engage / Attack / Defend / Flee
-   Basic stats (Physical Def/Armor etc)
-   Combat log
-   Victory rewards
-   Experience / Level system (gain xp by killing entities)

### Done when

-   Combat integrates with durability and survival systems.

------------------------------------------------------------------------

# M14 --- Quests / Tutorial

### Goal

Guide players through systems.

------------------------------------------------------------------------

# M15 --- Economy v1

### Includes

-   Vendors
-   Buy/sell or barter

------------------------------------------------------------------------

# Long-Term Expansion

-   Advanced professions
-   Enchanting
-   Weather systems
-   Ranged combat
-   Meta progression
-   Advanced AI

------------------------------------------------------------------------

# Core Identity

Explore → Survive → Gather → Craft → Improve → Expand → Adapt → Fight →
Repeat

------------------------------------------------------------------------

# Player-Facing Roadmap (Non-Technical Summary)

This section is a simplified roadmap written for players.
It explains what to expect in upcoming updates without implementation details.

Milestones are still in the same order as development, but described in gameplay terms.

### M0 — Foundations & Stability
- More reliable saves and loading
- Fewer bugs caused by “unfinished systems underneath”
- Cleaner, more stable interactions (things you do in the world should behave consistently)

### M1 — Better Zone UI & Usability
- Bigger zones without lag
- Camera/viewport so you don’t render the entire world at once
- UI panels that stay on-screen and work on more screen sizes

### M2 — More Interesting Exploration (Locations & POIs)
- Discoverable mini-locations inside zones (small dungeons / pockets / events)
- Persistent points of interest (opened chests stay opened, etc.)
- A new biome type with unique terrain + spawns (biome not decided yet)

### M3 — Difficulty That Actually Matters
- Harder areas become more meaningful and rarer
- Enemies, loot, and resources scale in clearer ways
- Higher difficulty = better rewards and more danger

### M3.5 — The “What Is This Game?” Update (Design Lock-In)
- A clear written vision of the long-term gameplay loop
- Defines progression, setbacks, and how survival pressure scales
- Helps players and devs understand the long-term direction

### M4 — Actions Feel Like Real Time (Unified Timing)
- All actions (exploring, crafting, harvesting, eating, lockpicking) follow the same timing rules
- Day/Night time cycle
- Seasons (Seasons change after x amount of days)
- Better pause/cancel/interrupt behavior
- More consistent feel across the entire game

### M5 — Survival Begins (Hunger, Thirst, Regen)
- Hunger and thirst become real pressures
- You’ll need to eat and drink to stay alive
- Early penalties are meaningful but not punishing

### M6 — Hands, Tools, and Real Item Use
- Equip items in left/right hands
- Use tools directly (not just “inventory UI actions”)
- Combine items for simple crafting
- Durability begins: tools wear down as you use them

### M7 — Carrying & Encumbrance
- Start with limited carrying (hands-only) and limited weight
- Backpacks unlock bigger inventory
- Weight matters (carry too much = penalties)
- Survival choices become more important (“What do I bring?”)

### M8 — Gathering Becomes a System
- Harvesting takes time and depends on your tools and skills
- Nodes have grades/quality (F0 → S9)
- Gathering skills like Woodcutting / Stone collecting become part of progression
- "Improve" resource node/entity/loot upon harvesting. (Improve to max grade or fail).

### M9 — Processing Creatures (Skinning / Butchering)
- Creatures provide meaningful materials
- Skinning gives hides, butchering gives meat/bones/sinew
- Sinew can become an important crafting material
- No more "loot and get everything". Creatures may drop extra items not related to it's "body".

### M10 — Primitive Crafting & Camps
- Early survival crafting (basic tools and shelter)
- Fire/camp interactions expand
- Blueprint placement for simple constructions
- Crafting becomes part of surviving longer and exploring further

### M11 — Living World Behavior (Before Combat)
- Creatures roam, flee, or defend territory
- The world feels alive even before combat systems are added
- More “survival tension” just from presence and behavior

### M12 — Death = Setbacks (Not Permadeath)
- Death causes losses (backpack inventory loss, durability damage)
- Progress continues, but you pay a price
- Future options may include corpse retrieval or XP loss, but not at first

### M13 — Combat v1 (Later, Built on Survival)
- Combat is added after survival systems exist
- Simple combat loop (attack/defend/flee) with meaningful rewards
- XP and progression tied to surviving encounters (not arcade runs)

### M14 — Quests & Tutorial Guidance
- More guidance for new players
- Tasks/quests that teach systems gradually

### M15 — Economy
- Vendors
- Buying/selling or barter system
- More reasons to collect and manage resources long-term

### Long-Term Expansion (After Core Loop Feels Good)
- Deeper professions and crafting
- Weather and world events
- Enchanting and advanced gear systems
- Ranged combat
- Meta progression and bigger world goals
- Smarter AI and more biome variety

Combat supports survival, not the other way around.

