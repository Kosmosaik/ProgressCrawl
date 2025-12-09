📄 ProgressCrawl – Technical Summary for Version 0.0.70d
World Content Generation Systems + Initial Content Population

0. Overview

This document guides the next GPT assistant in implementing ProgressCrawl v0.0.70d, continuing directly from 0.0.70c.

0.0.70c introduced:

World slot templates
ERA / BIOME / TEMPLATE metadata
Difficulty system
Fully deterministic zone generation (seeded CA)
Adjacency-based world expansion
Zone Info panel
Persistence of worldMap
Zone content scaffolding (zone.content = { resourceNodes, entities, pois })

0.0.70d’s mission:
Build the complete Zone Content Generation System AND add the first real content (entities, resource nodes, POIs) across selected biomes/templates.
This patch is foundational for making zones feel alive and interactive.

1. Goals of 0.0.70d

0.0.70d has two main layers:

1A — Build the Zone Content Generation System

The goal is to evolve scaffolding created in 0.0.70c into a functioning system capable of populating zones with interactive content.

Required Features

1. Add Spawn Table Definitions to ZONE_TEMPLATES

Expand ZONE_TEMPLATES to include:

entities: {
  common: [...],
  uncommon: [...],
  rare: [...],
}

resourceNodes: {
  common: [...],
  uncommon: [...],
}

pois: {
  rare: [...],
  ultraRare: [...],
}

Spawn tables will be deterministic based on zone seed.

2. Build Content Population Pipeline

Implement:

populateZoneContent(zone, template, rand)

Inside:

Load template’s spawn tables
Use deterministic seeded RNG (same used for layout or a derived sub-seed)
Distribute content across valid walkable tiles
Respect spawn weights + biome rules + difficulty constraints

Ensure output is placed into:

zone.content.resourceNodes[]
zone.content.entities[]
zone.content.pois[]

Each entry should include:

{
  id: "wild_boar",
  x: 12,
  y: 7,
  rarity: "common",
  state: {}
}

3. Modify Zone Creation Flow

Right after layout generation:

Static zones:
initializeZoneContent(zone, def) → expand content using default/static template rules.

Generated zones:
markZoneLockedSubregionsFromLayout(zone)
then
initializeZoneContent(zone, def)
then
populateZoneContent(zone, template, rand)

4. Deterministic Placement Rules

Content placement must be:

deterministic per tile.seed
stable across loads
resistant to layout changes

Use:
rand = createSeededRandom(tile.seed + "_content")

This ensures layout and content use separate random streams.

5. Spawn Constraints

Zones must obey consistent rules:

Resource nodes only on walkable tiles
Entities avoid walls & locked tiles
POIs must spawn with distance restrictions (e.g., avoid the entry area)
Rare spawns should follow probability distribution

Later expansions will refine:

biome modifiers
era-dependent tables
difficulty scaling tables

1B — Populate Zones with FIRST CONTENT

0.0.70d should define a small but functional starter set of items for Primitive biome only, enough to test the content system.

Biomes to include in 0.0.70d:

Temperate Forest (Primitive)
Primitive Cave (Tutorial + derived templates)

Content Types to include:

1. Resource Nodes

At least 3:

Berry Bush
Fallen Branch Pile
Stone Shard Deposit

Each must include:

rarity tier
interaction placeholder (e.g., “harvest → gain X item”)
basic metadata shape

2. Entities

Non-aggressive + aggressive examples:

Passive:
Deer
Forest Hare

Aggressive:
Wild Boar
Cave Spider

Entities should:

appear in weighted tables
spawn with difficulty constraints
have placeholder stats (HP, behavior flags, etc.)

3. POIs

At least 2 per template:

Mossy Shrine
Abandoned Camp
Broken Obelisk (rare)

POIs are typically:

very rare
enrich exploration rewards
potential quest / lore hooks later

2. Technical Implementation Requirements

2.1 Extend ZONE_TEMPLATES (zones.data.js)

Templates must define:

difficulty
entities: { common, uncommon, rare }
resourceNodes: { common, uncommon }
pois: { rare, ultraRare }

Templates must also indicate:

biome
era (future use)
generator parameters

2.2 Extend initializeZoneContent (zones.core.js)

Modify initializeZoneContent:

Accept template
Create deterministic RNG
Prepare the structure for population
Call populateZoneContent

2.3 Build populateZoneContent (zones.core.js or new zones.content.js)

Recommended:

Create a new file:
scripts/zones/zones.content.js

Containing:

spawn-table utilities
tile-filtering helpers
rarity-weighted selection
deterministic placement logic

This keeps zones.core.js from becoming bloated.

2.4 Integrate Into Zone Creation Pipeline

After creating a zone and marking subregions:

Identify template via:
world tile metadata (tile.templateId)
or static zone definition (tutorial)

Pass template into content generator.

2.5 Persistence

Zone content does not yet need to be persistent per-zone in 0.0.70d.

Persistence will be implemented in a later version where:

resource nodes decay / respawn
mobs move or stay dead
POIs get resolved

For 0.0.70d, regenerating content each time is acceptable.

3. Deliverables for 0.0.70d

3.1 Code Deliverables

Extended ZONE_TEMPLATES
New zones.content.js
Modified zones.core.js to support content generation
Updated template-selection to include content tables
Updated world-building logic to store content metadata

3.2 Content Deliverables

Primitive Temperate Forest:
3 resource nodes
4 entities
2–3 POIs
Difficulty 1–3 tables

Primitive Cave:
2 resource nodes
3 cave mobs
1–2 cave POIs
Difficulty 1–3 tables

4. Non-Goals for 0.0.70d

These are explicitly NOT included in this patch:

Combat system
Mob AI / movement
Harvesting / gathering actions
POI interaction mechanics
NPC behavior systems
Loot table integration
Respawn systems
Save/load of individual zone states
Difficulty scaling of stats (only spawn tables scale)

These will be implemented in later versions.

5. Summary

Version 0.0.70c provided the foundational world-slot and zone template system.

Version 0.0.70d will:

Create a complete content-generation system
spawn tables
deterministic placement
biome/difficulty-driven content

Introduce first real content
resource nodes
entities
POIs

Prepare the engine for future expansions:
combat
harvesting
faction systems
quests
biome ecosystems
civilization structures

This patch transitions ProgressCrawl from a “zone generator” into a “living world generator”.

END OF DOCUMENT
