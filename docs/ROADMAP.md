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
-   Stable rendering at different grid sizes.

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
-   POI interactions: Rewards/Loot, puzzles, traps, unlocking new regions in the zone.
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
-   Spawn entities that only exist at certain difficulty thresholds.
-   Modify difficulty scaling/range on world map (make harder zones more rare than current).

### Done when

-   Raising difficulty visibly changes content and rewards.

------------------------------------------------------------------------

# M3.25 --- Grade System v1 (Source Quality + Improvement Sessions)

### Purpose

Implement the Grade system consistently across:
- Entities
- Resource nodes
- POIs
- Other loot sources later

**Important rule:** Grade does NOT control loot rarity/weights.  
Loot tables choose *what* drops. Grade defines *the quality of the source* and the resulting items after extraction/improvement.

### Includes (must-have)

**Grade Model**
- Grade ladder: `F0..F9, E0..E9, ... A0..A9, S0..S9`
- Internal representation: `{ tierIndex, step }`
- Helpers:
  - `toLabel()` / `fromLabel()`
  - `compareGrades()`
  - `incrementGrade()` (rollover F9 → E0 etc.)

**Grade Lives on Spawned Source Instances**
- Every spawned entity/node/poi gets:
  - `baselineGrade`
  - `maxGrade` (range cap)
- Baseline + max range roll depends on difficulty rating (but does NOT affect loot table weights).
- Grade must be deterministic for seeded content.

**Loot / Harvest Session System**
A short-lived “session” system that:
- References a specific source instance (deterministic ref)
- Tracks:
  - baseline grade
  - current improved grade
  - attemptCount/failCount
  - maxFails
  - maxGrade
- Holds pendingDrops selected from the loot table *before* grade finalization.
- Finalization applies the best achieved grade to item instances.

**Improvement Attempts**
- Success chance depends on:
  - skills (skinning/woodcutting/mining/etc.)
  - tool quality + durability state
  - knowledge (optional future)
- Failures increment failCount; reaching maxFails forces finalize.
- Player may “Finalize early” to accept current grade.

**Finalization Rules**
- Apply grade to item instances (`itemInstance.grade = ...`)
- Update source state via deltas:
  - entities: looted/consumed
  - nodes: depleted
  - pois: opened

### Notes / dependencies

- Depends on M0.3 (deterministic IDs) + M0.4 (unified interaction pipeline).
- Session state should live in `PC.state` (e.g. `PC.state.activeLootSession`) but does not need to be saved unless necessary.

### Done when

- Entities/nodes/POIs spawn with deterministic baselineGrade + maxGrade.
- A session can start → attempt improve → finalize → award graded items.
- Grade affects resulting item quality metadata, not drop probability.

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
-   Messages after interaction: “Harvesting...”, “Inspecting...”, "Eating...", “Traveling to <object>...”, etc.

### Done when

-   No gameplay system uses isolated `setTimeout` logic independently.

------------------------------------------------------------------------

# M5 --- Survival Core (Hunger, Thirst, Basic Regen)

### Goal

Establish survival pressure before combat exists.

### Includes

-   Hunger drain over time (passive, fixed reduction initially)
-   Thirst drain over time (passive, fixed reduction initially)
-   Eating/drinking interactions
    - Eat to restore hunger (mushrooms, berries, raw meat)
    - Drink water at tiles with water or from consumable items (water bottle, canteen)
-   Starvation/dehydration penalties
-   Basic HP regen rules (+ HP Reg when hunger and thrst are satisfied)

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
-   Remove Loot button (loot must come from interactions/sessions, not a global button).

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
-   STR contributes to encumbrance/carry capacity.

### Done when

-   Carry capacity affects player decisions.

------------------------------------------------------------------------

# M8 --- Gathering v1

### Goal

Turn resources into systems.

### Includes

-   Tool requirements
-   Node depletion/regeneration
-   Node grades (F0 → S9) via the Grade System
-   Timed harvesting
-   Roll/Improvement system based on skills and tool
-   Add gathering-related skills:
    - Woodcutting
    - Mining / Stone collecting
    - Herbalism / Foraging (as needed)

### Done when

-   Resource collection feels intentional and tool-dependent.

------------------------------------------------------------------------

# M9 --- Processing (Skinning / Butchering / Sinew Chain)

### Goal

Harvest meaningfully from world entities.

### Includes

-   Skinning → hides
-   Butchering → meat/bones/sinew
-   Skill XP gain
-   Sinew processing chain:
    - Harvest sinew
    - Dry
    - Process (stone tool)
    - Twist into bow string
    - Optional protection treatment (animal fat or pine pitch/sap)
-   Tougher animals/monsters → better base modifiers for sinew bow strings (future modifier system).
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
-   Crafting menu (primitive crafting)
    - fire drill
    - stone tools
    - spear
    - club
-   Blueprint placement (lean-to, fire pit - gives player protection and resting place)
-   Craft timers integrated with time system
-   Separate crafting areas by different skills depending on recipe
-   Professions / Life skills integration:
    - crafting + gathering tied to skills/XP
    - tools needed requirements

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

# M12.5 --- Level, XP, and Attribute Progression v1

### Goal

Add long-term character growth that supports survival and future combat.

### Includes

-   Level + XP system.
-   Gain XP from:
    - killing entities (later once combat exists)
    - actions (gathering, crafting, harvesting, exploration ticks)
    - exploring tiles / discovering content
-   On level-up:
    - gain attribute points to allocate (STR/DEX/INT/VIT etc.)
-   Weapon skill XP (future or partial):
    - gain skill XP for weapon usage (when combat arrives)
-   Tool skill XP
    - gain skill XP for tool usage (higher success chance etc)

### Done when

-   Player growth is visible over time through levels + attributes.
-   XP gain sources support the survival-first game loop.

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

### Includes

-   Quest / Task system primarily for Tutorial Zone:
    - Predefined tutorial quests required to exit the zone into the world.
    - Tutorial zone content is curated (resources/entities/tiles) for natural progression.
-   Later: optional randomized quests in other zones.

------------------------------------------------------------------------

# M15 --- Economy v1

### Includes

-   Vendors
-   Buy/sell or barter

------------------------------------------------------------------------

# Long-Term Expansion

-   Event motor (bosses, catastrophes, traveling merchants, ambush etc.)
-   Weather changes (may be tied with the Event motor or separated. Not decided yet)
-   Camp/Base/Housing system (construction - expansion on lean-to shelter etc)
-   Advanced professions and crafting chains:
    - Skinning, Tanning, Leatherworking, Tailoring, Sewing
    - Blacksmithing (weapons/armor), Armorsmithing, Weaponsmithing
    - Smelting, Refining, Alloying
    - Masonry
    - Bowcraft / Fletching
    - Cooking, Baking, Brewing, Chemistry
    - Alchemy
-   Marketplace / Auction House
-   Leaderboards
-   Achievements
-   Animal handling, taming, pets/companions
-   Magic systems:
    - Spellcrafting, Summoning, Enchanting, Magic crafting
    - Rune/Sigilmaking, Inscription
    - Occultism, Lycanthropy
-   World progression / eras:
    - Primitive → Medieval → Fantasy → Industrial → Sci-Fi
-   More survival/life skills:
    - Agriculture, Mycology, Hunting, Tracking, Trapping, Fishing, Butchering, Beekeeping
-   Rare items:
    - Gems, Artifacts
-   Utility / progression:
    - First Aid, Medicine, Surgery
    - Trading, Fame/Infamy
    - Research, Restoration, Permanent Buffs
    - Classes, Traits, Races
    - Climbing, Swimming, Repairing
    - Music / Bardship
-   Lockpicking + Trap disarming depth
-   Ranged combat

------------------------------------------------------------------------

# Core Identity

Explore → Survive → Gather → Craft → Improve → Expand → Adapt → Fight →
Repeat

Combat supports survival, not the other way around.

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
- A new biome with its own terrain and spawns

### M3 — Difficulty That Actually Matters
- Harder areas become more meaningful and rarer
- Enemies, loot, and resources scale in clearer ways
- Higher difficulty = better rewards and more danger

### M3.25 — Quality Grades & Better Loot Results (Not More Loot)
- Creatures, nodes, and stashes spawn with a “quality grade”
- Your tools and skills decide how much quality you can extract
- Higher grades mean better-quality materials and results over time

### M3.5 — The “What Is This Game?” Update (Design Lock-In)
- A clear written vision of the long-term gameplay loop
- Defines progression, setbacks, and scaling survival pressure

### M4 — Actions Feel Like Real Time
- All actions use the same timing rules
- Day/Night time cycle
- Seasons (prep for future event motor and weather system)
- Better cancel/pause/interrupt behavior
- Clear action messages while doing things (harvesting, traveling, inspecting)

### M5 — Survival Begins
- Hunger and thirst become real pressures
- You’ll need to eat and drink to stay alive
- Early buffs and penalties are meaningful but not punishing/overpowered
- HP Regen

### M6 — Hands, Tools, and Real Item Use
- Equip items in left/right hands
- Use tools directly on the world
- Combine items for simple crafting
- Looting becomes interaction-based (no global loot button)
- Durability begins: items wear down as you use them

### M7 — Carrying & Encumbrance
- Start with limited carrying (hands-only) and limited weight limit
- Backpacks unlock bigger inventory & higher weight limit
- Weight matters and affects survival choices
- STR contributes to encumbrance/carry cap

### M8 — Gathering Grows
- Harvesting takes time and depends on tools and skills
- Nodes have quality grades
- Gathering skills become part of progression (Woodcutting, Mining...)
- Roll/Improvement system based on skills and tool

### M9 — Processing Animals & Materials
- Skinning and butchering become real systems
- Sinew and other materials feed crafting paths (like bow strings)
- No more one loot-button. Different actions/skills for different resources

### M10 — Primitive Crafting & Camps
- Early survival crafting (basic tools and shelter)
- Fire and camp interactions expand
- Build small survival structures

### M11 — A Living World
- Creatures roam, flee, and defend territory
- More survival tension even before combat is added

### M12 — Death = Setbacks (Not Permadeath)
- Death causes meaningful losses (inventory, durability damage)
- Respawn rules
- You continue progressing, but you pay a price

### M12.5 — Levels & Growth
- Gain XP from survival actions and exploration
- Level up to gain attribute points
- Long-term character progression begins

### M13 — Combat (Later)
- Combat is added after survival is solid
- Simple but expandable combat loop
- XP and rewards tied to surviving encounters

### M14 — Quests & Tutorial
- Tutorial tasks guide new players through the systems
- Later: optional quests in the world

### M15 — Economy
- Vendors and trade systems
- More reasons to gather and craft long-term

### Long-Term Expansion
- Events, weather, housing/base building
- Deeper crafting and professions
- Pets, companions, magic, and more biomes
- Era progression and big world goals
