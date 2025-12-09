# ProgressCrawl – Technical Summary for Version 0.0.70d
### World Content Generation Systems + Initial Content Population

---

## 0. Overview

This document guides the next GPT assistant in implementing **ProgressCrawl v0.0.70d**, following directly after 0.0.70c.

**0.0.70c introduced:**
- World slot templates
- ERA / BIOME / TEMPLATE metadata
- Difficulty system
- Fully deterministic zone generation (seeded CA)
- Adjacency-based world expansion
- Zone Info panel
- Persistence of worldMap
- Zone content scaffolding (`zone.content = { resourceNodes, entities, pois }`)

**0.0.70d’s mission:**

> **Build the Zone Content Generation System AND add the first real content (entities, resource nodes, POIs) across selected biomes/templates.**

This patch is foundational for future world interaction, resource systems, combat, and exploration depth.

---

# 1. Goals of 0.0.70d

0.0.70d has two main components:

---

## 1A — Build the Zone Content Generation System

The goal is to evolve the scaffolding created in 0.0.70c into a functioning system capable of populating zones with interactive content.

### Required Features

---

### **1. Add Spawn Table Definitions to ZONE_TEMPLATES**

Templates must support:

```js
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
```

Templates will later include:
- biome  
- era  
- future difficulty / spawn scaling rules  

---

### **2. Build Content Population Pipeline**

Implement:

```js
populateZoneContent(zone, template, rand)
```

Responsibilities:

- Read template spawn tables  
- Use deterministic seed-derived RNG (`tile.seed + "_content"`)  
- Scatter content across valid tiles  
- Respect rarity, weighted tables, biome rules, difficulty  
- Insert final results into:

```js
zone.content.resourceNodes[]
zone.content.entities[]
zone.content.pois[]
```

Each content entry structure:

```js
{
  id: "wild_boar",
  x: 12,
  y: 7,
  rarity: "common",
  state: {}
}
```

---

### **3. Modify Zone Creation Flow**

After layout is generated:

**For generated zones:**
- Create layout  
- Mark locked regions  
- Initialize zone content structure  
- Populate content from template  

**For static zones:**
- Build tiles  
- Initialize zone content  
- Populate template-based content  

---

### **4. Deterministic Placement Rules**

Content generation must be deterministic across:

- saves/loads  
- revisits  
- same world seed  

Use:

```js
const rand = createSeededRandom(tile.seed + "_content");
```

This ensures layout and content use separate random streams.

---

### **5. Spawn Constraints**

Rules for content placement:

#### **Resource Nodes**
- Only on walkable tiles  
- Avoid locked region tiles  
- Don’t overlap with POIs or entities  

#### **Entities**
- Use rarity-weighted selection  
- Difficulty scaling affects which entities appear  

#### **POIs**
- Very rare  
- Avoid spawning near zone entrance  

These layers will grow in future patches.

---

## 1B — Populate Zones with FIRST CONTENT

0.0.70d must also include a small, usable content pack so the system can be tested in-game.

Only **Primitive Era + Temperate Forest / Cave** biomes need content initially.

---

### **1. Resource Nodes (Primitive Temperate Forest)**

Examples:
- Berry Bush  
- Fallen Branch Pile  
- Stone Shard Deposit  

Each defines:
- rarity  
- interaction placeholder  
- tile footprint (1x1)  

---

### **2. Entities**

#### Passive creatures:
- Deer  
- Forest Hare  

#### Aggressive creatures:
- Wild Boar  
- Cave Spider  

Each should define:
- aggression flag  
- placeholder stats (HP, damage)  
- spawn rarity  
- biome + difficulty gating  

---

### **3. POIs**

**Primitive Forest POIs:**
- Mossy Shrine  
- Broken Obelisk  
- Abandoned Camp  

**Primitive Cave POIs:**
- Collapsed Tunnel  
- Old Lantern Circle  

POIs will become the foundation for quests, lore, puzzles later.

---

# 2. Technical Implementation Requirements

---

## **2.1 Extend ZONE_TEMPLATES (zones.data.js)**

Templates must define:

```js
difficulty
entities: { common, uncommon, rare }
resourceNodes: { common, uncommon }
pois: { rare, ultraRare }
```

Later additions:

- biome  
- era  
- environmental conditions  
- loot tables  

---

## **2.2 Extend initializeZoneContent (zones.core.js)**

Responsibilities:

- Ensure `zone.content` exists  
- Derive zone template from `def.templateId`  
- Create deterministic RNG  
- Call `populateZoneContent(zone, template, rand)`  

---

## **2.3 Create zones.content.js**

Create new file:

```
scripts/zones/zones.content.js
```

Contains:

- rarity weighting helpers  
- deterministic random utilities  
- tile filtering helpers (walkable tiles, avoid entry tile, etc.)  
- entity/node/POI placement functions  
- main dispatcher: `populateZoneContent(zone, template, rand)`  

This keeps the code modular and prevents `zones.core.js` from becoming bloated.

---

## **2.4 Integrate Into Zone Creation Pipeline**

---

### Generated zones:

```js
zone = createZone(...)
markZoneLockedSubregionsFromLayout(zone)
initializeZoneContent(zone, def)
populateZoneContent(zone, template, rand)
```

### Static zones:

```js
zone = createZone(...)
initializeZoneContent(zone, def)
populateZoneContent(zone, template, rand)
```

---

## **2.5 Persistence**

For 0.0.70d:

- Content does **NOT** need to be persisted yet  
- OK to regenerate content each time zone is entered  

Persistence will be added later when:

- mobs die  
- nodes are harvested  
- POIs are solved  
- time-based changes occur  

---

# 3. Deliverables for 0.0.70d

---

## **Code Deliverables**
- Extended `ZONE_TEMPLATES`  
- New `zones.content.js` module  
- `populateZoneContent` pipeline  
- Updated zone creation pipeline  
- Biome + difficulty-aware spawn logic  
- Deterministic content generation  

---

## **Content Deliverables**

### Primitive Temperate Forest:
- 3 resource nodes  
- 4 starter entities  
- 2–3 POIs  

### Primitive Cave:
- 2 resource nodes  
- 3 cave creatures  
- 1–2 cave POIs  

These are placeholders but fully functional within the system.

---

# 4. Non-Goals (Explicitly Not in 0.0.70d)

- Combat  
- AI  
- Harvesting / interaction mechanics  
- POI mechanics  
- Respawn rules  
- Loot tables  
- Saving per-zone state  
- Pathfinding  

These will come later.

---

# 5. Summary

Version **0.0.70c** established the world-slot + template generation foundation.  
Version **0.0.70d** builds the **content ecosystem layer** and populates the first zones.

This patch transitions ProgressCrawl from generating “empty caves” into generating **living ecosystems** with entities, resources, and landmarks.

**END OF DOCUMENT**
