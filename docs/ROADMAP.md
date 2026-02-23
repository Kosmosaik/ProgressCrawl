# ProgressCrawl — Unified Roadmap (Single Source of Truth)

**Purpose**
- This file is the ONLY roadmap for ProgressCrawl.
- It merges all roadmap/ideas/fixes into a dependency-ordered plan to avoid rebuilds.
- Versions are assigned at release time (CHANGELOG), not planned in advance.

**How to use this roadmap**
- Work from Milestone M0 upward.
- Each milestone has:
  - Goal
  - Includes (must-have)
  - Notes / dependencies
  - “Done when” checklist
- Anything not in milestones goes in the Backlog Pool section at the end.

---

## Reality Check (Shipped / Exists Today)

> Keep this section short and update when major systems land.
- Zones exploration exists + discovery list UI exists.
- Locked gate + lockpicking interaction exists.
- Patch notes UI pulls from `/docs/CHANGELOG.md`.

(If this section grows too big, create a TECHNICAL_SUMMARY.md and keep this to 5–10 bullets.)

---

# Milestones (Dependency-Ordered)

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

Only after this may new gameplay systems be developed.

## M1 — Zone UI & Presentation (Camera, Responsive Panels)

### Goal
Make zones scalable and UI usable on different screen sizes.

### Includes (must-have)
- Zone view does NOT require rendering the full grid at large sizes:
  - implement a “camera/viewport” approach (only render visible area)
- UI panels stay on-screen when window resizes:
  - panels clamp to viewport bounds
  - panel sizing adapts to smaller aspect ratios
- Exploration UI still works with camera view.

### Pulled from fixes.md
- “Don’t show full grid size later” → camera/viewport
- “Panels go off-screen on resize” → clamp + responsive sizing

### Done when
- A large zone (ex: 32x32) is playable without UI lag or visual overload.
- Inventory/skills/equipment panels never end up unreachable after resize.

---

## M2 — World Structure: Sub-zones / Locations / POIs

### Goal
Make exploration spatially meaningful, not flat lists.

### Includes (must-have)
- Zones can contain:
  - tiles
  - mini-locations (sub-zones / dungeons / pockets)
  - POIs (small interactables)
- Transition system:
  - zone tile → location instance → exit back
- POI interaction framework:
  - rewards/loot
  - traps
  - puzzles (simple first)

### From ideas-roadmap.md
- “locations spawn during exploration and appear in a list”
- “teleport to location = pause zone progress and run location progress”

### Done when
- A location can be entered, explored, exited, and the zone continues.
- POIs are persistable (opened chest stays opened, etc).

---

## M3 — Difficulty Integration (World Scaling Rules)

### Goal
Stop hand-waving balance: difficulty should drive content.

### Includes (must-have)
- Difficulty rating affects:
  - entity variants
  - resource quality
  - loot tables
- Some things exist only at certain difficulty

### Done when
- Increasing difficulty visibly changes:
  - enemy toughness
  - loot quality/rarity opportunities
  - resource grades

---

## M4 — Entities v1: Behavior + Danger + Combat Trigger Rules

### Goal
Entities become “world actors,” not loot containers.

### Includes (must-have)
- Entity behavior states:
  - passive / aggressive / territorial
  - roaming vs stationary
  - awareness radius + threat evaluation
- Danger indicator:
  - warns about hostile presence
  - can pause exploration or force choice (engage/flee)
- Rules for:
  - visible enemy in list (player chooses)
  - forced combat events (ambush)

### Done when
- You can add an enemy type and set its behavior without rewriting combat logic later.

---

## M5 — Combat v1 (Minimal & Stat-Driven)

### Goal
A reliable combat loop that later systems can plug into.

### Includes (must-have)
- Combat loop:
  - Engage → Attack/Defend/Flee
- Stats:
  - HP, Attack, Defense
  - Attack speed (timer/slider based)
- Combat UI:
  - combat log
  - enemy card with HP/stats
  - victory reward screen
- Loot on defeat integrates with loot tables
- Player death state (minimum: fail screen + consequence rule)

### From ideas-roadmap.md
- timer based attacks + log
- later: ranged distance/slider can come later

### Done when
- Basic enemy can kill player and player can recover/reset by defined rules.
- Combat is stable enough for “skinning/butchering” to hook in later.

---

## M6 — Survival v1 (Hunger, Thirst, Stamina)

### Goal
Survival pressures that make exploration meaningful.

### Includes (must-have)
- Hunger/thirst drains over time
- Eat/drink interactions:
  - raw food, berries/mushrooms, water sources
- Simple penalties first (no complex status web yet)

### Done when
- Survival needs create decisions but do not overwhelm.
- You can survive in starting zone with basic actions.

---

## M7 — Carrying & Inventory Progression (Hands → Bags → Encumbrance)

### Goal
One unified carry system (no parallel inventories).

### Includes (must-have)
- Start without full inventory:
  - limited “hands” carry (count + weight)
- Backpacks/satchels unlock inventory
- Encumbrance:
  - item weight
  - STR affects carry
  - penalties when overweight

### From ROADMAP.md + ROADMAP_V2.md
- Left hand/right hand early carry
- then backpack unlocks real inventory

### Done when
- Inventory progression feels like an unlock, not a UI toggle.
- Weight/encumbrance ties into survival and combat pacing.

---

## M8 — Items & Equipment Model v1 (Stats, Slots, Tooltips)

### Goal
Make equipment and stats consistent so crafting and combat can rely on it.

### Includes (must-have)
- Equipment slots expansion:
  - chest/head/legs, rings, off-hand etc (incrementally)
- Defensive stats:
  - armor/defense
- Core combat stat completeness:
  - critical damage multiplier
  - accuracy/hit chance (can be simple first)
  - dodge/evasion (optional in v1)
- Ensure stats scale correctly (STR/DEX etc affect DPS)

### Pulled from fixes.md
- “Required skill shows 0 in equipment tooltip” → fix here
- “Leet Power Sword of Doom not increasing DPS with STR/DEX” → fix here
- “Damage display formatting decimals rules” → fix here

### Done when
- Tooltip values match actual computed combat output.
- DPS changes when expected when stats change.

---

## M9 — Gathering v1 (Nodes, Tools, Grades, Timers)

### Goal
Gathering becomes a game system, not instant loot.

### Includes (must-have)
- Resource nodes:
  - tool requirements (axe, pick, etc)
  - depletion + regeneration
  - node grades F0 → S9
- Timed interactions:
  - “Walking to...”, “Harvesting...”, etc
- Discovered nodes UI list and state

### From ROADMAP.md
- node loot tables
- grade influences resource quality instead of random rolling

### Done when
- A node can be interacted with, timed, depleted, and restored later.
- Grade affects output in a visible way.

---

## M10 — Processing v1: Skinning & Butchering + Sinew Chain

### Goal
Make creature harvesting meaningful and expandable.

### Includes (must-have)
- Separate post-combat harvesting actions:
  - Skinning → hides
  - Butchering → meat/bones/teeth/sinew
- Skill EXP for these actions
- Sinew processing chain (v1):
  - harvest → dry → process → twist into bowstring
  - tougher creatures → better modifiers

### Done when
- Killing animals feeds survival/crafting loops, not just loot dopamine.

---

## M11 — Professions / Life Skills v1

### Goal
Formalize skill progression for gathering and crafting.

### Includes (must-have)
- Profession EXP:
  - mining, woodcutting, herbalism, foraging
- Tool gating + bonuses
- “Action speed / gathering speed” concept can start here or in gathering milestone.

### Done when
- Professions meaningfully change efficiency/output.

---

## M12 — Crafting v1 (Primitive)

### Goal
First real crafting loop that uses gathered resources.

### Includes (must-have)
- Crafting menu + recipe list
- Primitive recipes:
  - fire drill
  - stone tools
  - spears/clubs
- Blueprint system for simple constructions:
  - lean-to shelter
  - campfire build flow

### From ROADMAP.md
- “Interact/Use system” + blueprint completion window
- campfire interactions (cook, add fuel)

### Done when
- Player can gather → craft → survive longer → explore farther.

---

## M13 — Quest/Task System (Tutorial-Driven)

### Goal
Guide the player through your systems in correct order.

### Includes (must-have)
- Task types:
  - collect X
  - perform action X
  - explore location X
- Tutorial path in starting zone
- Optional procedural tasks later

### Done when
- A new player can learn the game without external docs.

---

## M14 — Economy v1 (Optional after core loop is fun)

### Includes (optional)
- NPC vendors with inventories
- buy/sell
- basic currency OR barter

---

## M15+ — Meta & Long-Term Expansion Pool

- Achievements, leaderboards
- Camp/base/housing
- Farming/fishing/beekeeping etc
- Pets/companions
- Magic, alchemy, cooking, enchanting
- Medicine/first aid
- Weather/world events
- Biome-specific recipes/merchant items
- Rare fragment unlocks, fame/infamy
- Classes/traits/races (later)

---

# Cross-Cutting Fixes / Known Issues (Slot into milestones)

These must be fixed in the milestone where they belong:

## UI/Zone Presentation (M1)
- Camera/viewport for large zones
- Panels clamped to screen on resize

## Inventory UX (M7)
- If a stack was expanded and goes to 0, re-looting that item should create a minimized stack

## Display/Validation (M8)
- Damage formatting:
  - <10: 2 decimals
  - 10–99: 1 decimal
  - >=100: integer
- Character name limit:
  - max 2 words
  - max 20 chars total

## Equipment/Stats correctness (M8)
- Required skill tooltip shows incorrect value in equipment view
- Weapon scaling bug (Leet Power Sword of Doom not scaling DPS with STR/DEX)

---

# Tooling Ideas (Non-Gameplay, Do Later)

These are not core gameplay systems, but can speed content creation:

- Item Creator tool (auto-adds items into items data file)
- Biome/Location/POI creator tool (auto-adds content + loot pools)
- Debug stats:
  - Total items looted (prepping for leaderboards later)
  - weight drop table display in debug mode

---

# Backlog Pool (Captured Ideas Not Yet Scheduled)

## Stat Expansion (Later)
- armor penetration, lifesteal, resistances, tenacity
- mana systems
- gold find, luck systems
- movement speed, action speed, gathering speed
- reflect, thorns, life on hit/kill

## Systems (Later)
- ranged combat distance mechanics
- enchant/enhance system (poison tip etc)
- recipe unlocks via books/merchants/experimentation
- random events
- biome specific recipes and merchants
