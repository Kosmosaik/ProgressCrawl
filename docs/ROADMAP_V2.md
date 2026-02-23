# ProgressCrawl – Consolidated Development Roadmap

This document merges the original `ROADMAP.md`, our discussion feedback, and the brainstorm notes into a **single, ordered, de-duplicated roadmap**.
The focus is long-term stability, clear system dependencies, and minimizing rework.

---

## Core Design Pillars

* **Deterministic systems** (stable IDs, persistent state, reproducible behavior)
* **Simulation-first gameplay** (world reacts to systems, not buttons)
* **Progression through capability unlocks**, not UI inflation
* **One system, one source of truth** (no parallel mechanics)

---

# Phase 0 — Foundations & Invariants

## 0.1 State, Identity & Persistence (MANDATORY)

**Purpose:** Everything else depends on this.

* Stable IDs for:

  * Items
  * Entities
  * Resource nodes
  * POIs
  * Zones / sub-zones
* Centralized persistent state:

  * Player position
  * Discovered / locked zones
  * Resource node depletion & regeneration state
  * Dead / alive entities
  * Locked / unlocked interactions
* Save versioning & forward migration rules

> This phase never "finishes" — compatibility must be maintained forever.

---

## 0.2 Core Interaction Model

**Purpose:** Replace clicker logic with world interactions.

* Remove **Loot button** entirely
* Universal interaction pipeline:

  * `Inspecting...`
  * `Harvesting...`
  * `Traveling to <object>...`
  * `Engaging <entity>...`
* Interaction feedback via message queue
* Danger indicator:

  * Pauses exploration
  * Warns player of hostile presence
  * Visualize danger with "!" icons near the entity/danger.

---

# Phase 1 — World & Exploration

## 1.1 Zones, Sub-Zones & Location Transitions

**Purpose:** Spatial meaning, not flat maps.

* Zones contain:

  * Tiles
  * Mini-locations (sub-zones, dungeon-like pockets)
* Transition system between:

  * Tiles → locations
  * Locations → deeper instances
* Zone contracts:

  * What is procedural vs authored
  * What persists vs regenerates

---

## 1.2 POIs & Environmental Interaction

* POI interactions:

  * Rewards / loot
  * Traps
  * Puzzles
  * Unlock new regions within a zone
* POIs may gate progression spatially, not via UI locks

---

## 1.3 Difficulty Integration

* Difficulty rating influences:

  * Entity types & variants
  * Resource quality
  * Loot tables
* Some entities/resources exist **only** at certain difficulties

---

# Phase 2 — Entity & Behavior Systems

## 2.1 Entity Behavior

* Passive / aggressive / territorial
* Roaming vs stationary
* Awareness radius & threat evaluation

---

## 2.2 Combat v1 (Minimal & Stat-Driven)

* Core loop:

  * Engage
  * Attack / Defend / Flee
* Combat resolution:

  * HP
  * Attack / defense values
* Loot mechanics on defeat

> Combat v1 is intentionally shallow — depth comes later.

---

# Phase 3 — Survival Systems

## 3.1 Hunger, Thirst & Stamina v1

* Passive reduction over time
* Simple penalties (no complex debuffs yet)
* Eat / Drink interactions:

  * Raw food
  * Berries, mushrooms
  * Water from water tiles

---

## 3.2 Weight & Encumbrance (Single Unified System)

* Start **without inventory**
* Limited hand carry (count + weight)
* Backpacks / satchels unlock inventory
* STR affects encumbrance limits

> This replaces any parallel carry systems — no duplicates.

---

# Phase 4 — Items, Equipment & Progression

## 4.1 Equipment & Stats Expansion

* More equipment slots
* Armor & physical defense
* Weapon & item stat models

---

## 4.2 Level & EXP System

* EXP from:

  * Actions
  * Combat
  * Exploration
* Level ups grant:

  * Attribute points
* Skill EXP:

  * Weapon skills
  * Gathering skills

Attributes have **immediate but small impact** (HP, carry, accuracy, etc).

---

# Phase 5 — Gathering & Processing

## 5.1 Resource Nodes & Gathering v1

* Node grades (F0 → S9)
* Tool requirements
* Timed interactions
* Depletion & regeneration
* Discovered nodes UI

---

## 5.2 Skinning & Butchering

* Skinning → hides
* Butchering → meat, sinew, bones, teeth

### Sinew Processing Chain

* Harvest sinew
* Dry
* Process (stone tools)
* Twist into bowstring
* Treat with fat or pine pitch

Tougher animals → better modifiers

---

## 5.3 Professions / Life Skills

* Woodcutting
* Mining
* Herbalism
* Foraging
* Profession EXP
* Tool gating & bonuses

---

# Phase 6 — Crafting

## 6.1 Primitive Crafting v1

* Crafting menu
* Primitive recipes:

  * Fire drill
  * Stone tools
  * Spears, clubs

---

## 6.2 Advanced Crafting Disciplines (Later Expansion)

* Tanning
* Leatherworking
* Tailoring / Sewing
* Bowcraft / Fletching
* Smelting / Refining / Alloying
* Blacksmithing / Armorsmithing / Weaponsmithing
* Masonry

---

# Phase 7 — Quests & Guided Progression

## 7.1 Quest / Task System

* Tutorial zone driven
* Predefined progression path
* Teaches:

  * Movement
  * Gathering
  * Combat
  * Crafting

Later:

* Optional procedural quests in select zones

---

# Phase 8 — Economy & Meta Systems

## 8.1 Marketplace & Trading

* NPC vendors
* Rotating inventories
* Buy / sell economy

---

## 8.2 Meta Progression

* Unlock new biomes / eras via rare fragments
* Fame / Infamy
* Achievements
* Leaderboards

---

# Phase 9 — Long-Term Expansion (Unscheduled)

## Systems Pool

* Camp / Base / Housing
* Agriculture, Mycology, Fishing, Beekeeping
* Hunting, Tracking, Trapping
* Pets / Companions / Animal Handling
* Magic systems (Primitive → Sci-Fi eras)
* Alchemy, Brewing, Cooking, Baking
* Enchanting, Rune/Sigil crafting
* Research, Restoration, Permanent buffs
* Classes, Traits, Races
* Lockpicking, Trap Disarming
* Medicine, Surgery, First Aid
* Music / Bardship
* Weather & World Events (bosses, ambushes, merchants)

---

## Final Notes

* No system should be implemented twice
* Every phase must preserve save compatibility
* Depth is layered, not frontloaded

This roadmap is intentionally **conservative** — speed comes from stability, not shortcuts.
