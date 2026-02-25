# ProgressCrawl --- Unified Roadmap (Single Source of Truth)

**Purpose** - This file is the ONLY roadmap for ProgressCrawl. - It
merges planning into a dependency-ordered system to avoid rebuilds. -
Versions are assigned at release time (CHANGELOG), not pre-planned. -
Survival-first design: combat is layered on top of survival
foundations. - The game is a long-term persistent survival RPG (not
run-based).

------------------------------------------------------------------------

# Core Design Decisions (Locked)

-   Long-term persistent world progression.
-   Death causes setbacks, not run reset or permadeath.
-   Durability system applies to all usable items (tools, weapons,
    armor, stations).
-   Two durability stats:
    -   Durability → current usability (0 = unusable until repaired).
    -   Integrity → lifetime cap (reduced on repair; 0 = salvage only).
-   Quality (F0 → S9) affects item effectiveness, not loot table
    probability.

------------------------------------------------------------------------

# M0 --- Architecture & Save Stability

## Goal

Stabilize persistence and prevent future refactors.

## Includes

-   Versioned save system with schemaVersion + migrateSave()
-   All persistent data inside PC.state
-   Deterministic ID utilities centralized
-   Unified interaction contract
-   Removal of legacy naming
-   Debug inspection tools

## Done When

-   Save system is versioned and migratable.
-   All persistent state lives inside `PC.state`.
-   Deterministic ID rules are enforced and centralized.
-   Interactions use a standardized contract.
-   No legacy CTGL naming remains.
-   No new persistent globals are introduced.

------------------------------------------------------------------------

# M1 --- Zone UI & Presentation

## Goal

Make zones scalable and UI stable.

## Includes

-   Camera/viewport system
-   Responsive draggable panels
-   Stable large-grid rendering

## Done When

-   Large zones playable without lag
-   Panels remain on-screen

------------------------------------------------------------------------

# M2 --- World Structure & POIs

## Goal

Make exploration meaningful.

## Includes

-   Enterable sub-locations
-   Persistent POIs
-   Zone ↔ Location transitions
-   New biome template

## Done When

-   Enter/exit locations without breaking exploration state

------------------------------------------------------------------------

# M3 --- Difficulty Integration

## Goal

Difficulty structurally changes content.

## Includes

-   Enemy variants by difficulty
-   Resource quality scaling by difficulty
-   Spawn thresholds
-   Rarity tuning on world map
-   Tune difficulty scaling/range on world map (currently harder zones are too common near starting zone)

## Done When

-   Higher difficulty visibly alters content and rewards

------------------------------------------------------------------------

# M3.25 --- Quality System v1

## Goal

Formalize baseline quality + improvement sessions.

## Includes

-   Quality ladder F0 → S9
-   BaselineQuality + maxQuality on source instances
-   Deterministic for nodes/POIs
    - Node positions are deterministic.
    - Node quality rerolls every refresh
    - POIs do not reset
    - Deterministic aspect is spatial, not state-deterministic across cycles
-   Rerolled quality every refresh cycle (to make old zones useful now and then)
-   Improvement sessions with attempts + fail limits (later connect skills/knowledge/tools to success/fail calculation)
-   Finalization applies quality to items

## Done When

-   All sources spawn with quality range
-   Sessions can improve and finalize quality

------------------------------------------------------------------------

# M4 --- Unified Time & Action System

## Goal

Create single timing framework.

## Includes

-   Central action manager
-   Day/Night cycle
-   Seasonal progression
-   Interrupt/cancel rules
-   Zone refresh timer support
-   Shared system for:
    -   Exploration ticks
    -   Eating
    -   Crafting
    -   Harvesting
    -   Lockpicking

## Done When

-   No gameplay system uses independent setTimeout logic

------------------------------------------------------------------------

# M5 --- Survival Core

## Goal

Introduce survival pressure.

## Includes

-   Hidden calorie system (visible hunger stages)
-   Hidden hydration system (visible thirst stages)
-   Eating/drinking interactions
    - Eat to restore hunger (mushrooms, berries, raw meat)
    - Drink water at tiles with water or from consumable items (water bottle, canteen)
-   Stamina system affected by weight/actions
-   More Stamina by increasing VIT (will likely move to Endurance (END) later)
-   HP regen gated by hunger/thirst

## Done When

-   Player must gather food and water to survive

------------------------------------------------------------------------

# M6 --- Hands & Item Use

## Goal

Make physical interaction real.

## Includes

-   Left/right hand equipment slots
-   Use items in hands
-   Combine two items (Simple crafting combinations)
-   Modify weapons/tools to use left/right hand slots instead of weapon slot (current state)
-   Tool durability impacts effectiveness
-   Remove global loot button
-   Item-on-tile usage

## Done When

-   Player can equip tools, use them, and combine items without
    inventory UI hacks.
-   Tools used directly on world with durability loss
-   Simple crafting / item combination works (created new items / interactions)

------------------------------------------------------------------------

# M7 --- Carrying & Encumbrance

## Goal

Tie inventory to survival decisions.

## Includes

-   Limited hands-only carry at start and limited weight
-   Backpack unlocks inventory and extra weight limit
-   Weight system
-   STR affects capacity
-   Encumbrance impacts stamina drain

## Done When

-   Carry weight affects decisions

------------------------------------------------------------------------

# M8 --- Gathering v1

## Goal

Make resource collection intentional.

## Includes

-   Tool requirements
-   Timed harvesting
-   Node regeneration on refresh
-   Gathering skills (woodcutting, mining, herbalism)
-   Connect quality "improvement" system to gathering skills and actions/interactions
-   Define minimal skill structure before connecting quality success rolls

## Done When

-   Harvesting is skill + tool dependent

------------------------------------------------------------------------

# M9 --- Processing (Animals & Materials)

## Goal

Replace simple loot with meaningful processing.

## Includes

-   Skinning session → hides
-   Butchering → meat/bones/sinew
-   Skill XP gain (higher skills = higher chance of success during gathering/harvesting sessions)
-   Sinew processing chain:
    - Harvest sinew
    - Dry
    - Process (stone tool)
    - Twist into bow string
    - Optional protection treatment (animal fat or pine pitch/sap)
-   Corpse multi-action interface (Skin, butcher, loot etc)
-   Separate drop types (by actions)

## Done When

-   Creatures require deliberate processing steps

------------------------------------------------------------------------

# M10 --- Primitive Crafting

## Goal

Establish survival crafting loop.

## Includes

-   Field crafting
-   Station crafting
-   Timed crafting
-   Quality-influenced results
-   Shelter placement
-   Simple recipes
-   Fire/camp interactions
-   Blueprint placement (lean-to, fire pit - gives player protection and resting place)
-   Separate crafting areas by different skills depending on recipe
-   Professions / Life skills integration:
    - crafting + gathering tied to skills/XP
    - tools needed requirements

## Done When

-   Gather → Craft → Survive loop functional

------------------------------------------------------------------------

# M11 --- Entity Behavior (Pre-Combat)

## Goal

Make world feel alive.

## Includes

-   Roaming logic
-   Aggression radius
-   Flee behavior
-   Spawn range per zone template
-   Refresh model:
    -   Trigger when zone 100% explored + player leaves
    -   Countdown begins
    -   On re-entry after timer:
        -   Nodes regenerate (deterministic positions)
        -   Entities reroll within spawn range
        -   POIs remain completed
-    Entity sets are stored per refresh cycle and persist across reloads (no reroll on save reload).

## Done When

-   Entities move and react without combat system

------------------------------------------------------------------------

# M12 --- Failure & Recovery

## Goal

Define meaningful setbacks.

## Includes

-   Loss of backpack inventory (full or partial)
-   Durability penalties
-   Respawn logic
-   Optional XP penalty (future)

## Done When

-   Death punishes but does not reset progression

------------------------------------------------------------------------

# M12.5 --- Level & XP System

## Goal

Add long-term growth.

## Includes

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

## Done When

-   Player growth visible and meaningful

------------------------------------------------------------------------

# M13 --- Combat v1

## Goal

Layer combat on survival.

## Includes

-   Engage / Attack (auto-attack) / Flee
-   Combat UI transition (Zone → Combat screen)
-   Auto-attack loop
-   Basic stats & combat log
-   Victory panel with corpse processing
-   XP rewards

## Done When

-   Combat integrates with durability, stamina, and quality systems

------------------------------------------------------------------------

# M14 --- Quests & Tutorial

## Includes

-   Quest / Task system primarily for Tutorial Zone:
    - Predefined tutorial quests required to exit the zone into the world.
    - Tutorial zone content is curated (resources/entities/tiles) for natural progression.
-   Later: optional randomized quests in other zones.

------------------------------------------------------------------------

# M15 --- Economy v1

## Includes

-   Vendors
-   Buy/Sell or barter

------------------------------------------------------------------------

# Long-Term Expansion

## World Systems

-   Event motor (bosses, catastrophes, traveling merchants, ambush etc.)
-   Weather system (weather adds challenges and affects the world, crops and other things)
    - Weather and Event system may be connected, like different catastrophes (events) may occur during specific weathers
-   Era progression (Primitive → Medieval → Fantasy → Industrial →
    Sci-Fi), gated behind puzzle pieces that needs to be found in the world (complete puzzle to unlock era or biome types)
-   Camp/Base/Housing system (construction - expansion on lean-to shelter etc)

## Survival Expansion

-   Agriculture
-   Fishing
-   Medicine
-   First Aid
-   Surgery
-   Mycology
-   Hunting
-   Tracking
-   Trapping
-   Fishing
-   Beekeeping
-   Climbing
-   Swimming

## Crafting Expansion

-   Blacksmithing
-   Armorsmithing
-   Weaponsmithing
-   Leatherworking
-   Alchemy
-   Masonry
-   Bowcraft
-   Fletching
-   Tanning
-   Tailoring
-   Sewing
-   Smelting
-   Refining
-   Alloying
-   Cooking
-   Baking
-   Brewing
-   Chemistry
-   Repairing

## Combat Expansion

-   Ranged combat
-   Abilities & spells
-   Summoning

## Social & Character Expansion

-   Classes
-   Traits
-   Races
-   Factions
-   Reputation
-   Auction House / Marketplace
-   Leaderboards
-   Achievements

## Magic Related

-   Spellcrafting
-   Enchanting
-   Magic Crafting
-   Runemaking
-   Sigilmaking
-   Inscription
-   Occultism
-   Lycanthropy

## Other professions / life skills

-   Animal Handling
-   Taming
-   Pets/Companions
-   Trading
-   Fame / Infamy
-   Research
-   Restoration
-   Permanent Buffs
-   Music / Bardship
-   Lockpicking
-   Disarm Trap

## Item Related

-   Gems
-   Artifacts
