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

## M0 — Foundations: Identity, Save, and One Interaction Pipeline

### Goal
Make future systems stable and prevent duplicated mechanics.

### Includes (must-have)
- Stable IDs for:
  - items, zones, tiles, POIs, resource nodes, entities
- Central persistent world state:
  - discovered things
  - locked/unlocked interactions (ex: gates)
  - dead/alive entities
  - depletion/regeneration state for nodes
- Save versioning + forward migration rules (minimum viable: version number + migration function map)
- A universal interaction pipeline (single model for actions), ex:
  - Inspecting...
  - Traveling to...
  - Harvesting...
  - Engaging...
  - Crafting...
- Message queue / log output for interactions (player feedback)

### Important decision
- The roadmap wants to remove “Loot button” eventually.
- Do NOT remove it until interaction pipeline covers the same gameplay loop.

### Done when
- You can save + reload and:
  - locked gates stay locked/unlocked correctly
  - depleted nodes remain depleted
  - entity death persists
- New interactables can be added without inventing a new UI/action method.

---

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
