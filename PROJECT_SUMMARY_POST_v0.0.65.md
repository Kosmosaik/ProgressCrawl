# PROJECT_SUMMARY_POST_v0.0.65.md

# 🎮 ProgressCrawl — Project Summary & Development Reference (v0.0.65)

This document provides full project context, system explanations, and roadmap details so any new ChatGPT session can continue development seamlessly.

---

# ## 📘 Project Overview

**ProgressCrawl** is a Survival/Crafting RPG centered around:
- Looting items  
- Equipping upgrades  
- Improving character stats  
- Managing inventory  
- Scaling through attributes, skills, rarity, and stat rolls  
- Surviving nature

The design philosophy:
- Start extremely simple  
- Build deep RPG systems gradually  
- Modular scripts  
- Transparent stat systems  
- Player clarity through detailed tooltips  

The entire game is browser-based (HTML/CSS/JS).

---

# ## 📦 Current System Overview

### ✔ Loot System
- Rarity tiers (Abundant, Common, Uncommon, Rare, Exotic, Unique)  
- Quality grades (F→S) with subtiers (0-9), so F0->S9 
- Weighted loot rolls  
- Stat ranges per item  
- Item templates with categories  

### ✔ Inventory System
- Stacking  
- Expandable stacks  
- Sorting  
- Category collapsing  
- Tooltips  
- Equip/Trash buttons  
- Grade-based sorting  

### ✔ Equipment System
- Five equipment slots  
- Equipment bonuses  
- WeaponType detection  
- Derived stat computation  

### ✔ Character Stats
- Primary: STR / DEX / INT / VIT  
- Derived:
  - Attack  
  - AttackSpeed  
  - DPS  
  - Crit Chance  
  - Loot Find  
  - Max HP  

### ✔ Skills
Weapon-type skill system:
- Dagger  
- Sword  
- Axe  
- Bow  
- Unarmed  

Includes dedicated Skills Panel.

### ✔ Save / Load
- Multiple save slots  
- Includes: stats, skills, inventory, equipment, unlock flags  

### ✔ UI
- Inventory Panel  
- Equipment Panel (Character Sheet)  
- Skills Panel  
- Patch Notes  
- Start Screen  
- Character Creator  
- HP Bar  

---

# # 🚀 Version 0.0.65 — Major Feature Update

This is the largest systems update so far.  
It introduces the **combat foundation**, **weapon mastery**, and a full **stat rewrite**.

---

# ## 1. 🗡️ Weapon Skill System

### Each weapon now has a mastery skill:
- dagger  
- sword  
- axe  
- bow  
- unarmed  

These skills:
- Increase independently  
- Affect Attack and DPS  
- Provide over-mastery bonuses  
- Create specialization paths  

Tooltips now show:
```
Dagger: 20 (15)
```
Meaning:
- **20** required to fully master  
- **15** your current skill  

A dedicated **Skills Panel** was added.

---

# ## 2. ⚔ Combat System Overhaul

New formula includes:
- BaseAttack (prevents weak early numbers)  
- Skill Efficiency  
- Attribute Efficiency  
- Weapon Power  
- Attribute Requirements  
- attack = baseAttack + (damage × multipliers)  

Weapon behavior now changes dramatically with mastery.  
Unarmed scaling improved.

---

# ## 3. 🔧 Equipment Panel Overhaul

The Equipment Panel is now the **primary character overview**.

It now includes:
- Base + Bonus Attributes  
- Derived Stats (Attack, DPS, AS, Crit, Loot Find, HP)  
- Unequip buttons  
- Weapon tooltips  
- Clear stat formatting  

Skills were moved into their own menu.

---

# ## 4. 🎒 Inventory Improvements

- Stack header tooltip removed  
- Category collapse bug fixed  
- Sorting improved (high grade first)  
- Equip on left, Trash on right  
- Tooltip comparisons improved  
- Cleaner stack rendering  
- Deterministic category behavior  

---

# ## 5. 💾 Save System Improvements

Save now includes:
- Skills  
- Equipped items  
- Inventory state  
- Unlock flags  

Old saves work via fallback logic.

---

# ## 6. ⚙ Balance Adjustments

- Weapons no longer scale skill requirement based on random stat rolls  
- Attribute scaling improved  
- Early-game unarmed and weapons feel more reasonable  
- BaseAttack boosts starting DPS  
- Attribute vs WeaponType logic standardized  

---

# # 🗺️ Roadmap — Updated (0.0.66 / 0.0.67)

This roadmap reflects the *actual planned next steps*.
It's only planned so it doesn't mean I want to do all this.
But there's ideas for most of the parts on the roadmap.

---

# ## v0.0.66 — Polish & Stability Update  
### *A PC-focused consistency and architecture update.*

### Goals
- Clean up UI  
- Stabilize behavior  
- Modularize codebase  


### Tasks

#### ✔ UI Consistency Pass
- Standardize button sizing  
- Normalize spacing  
- Improve tooltip visuals  
- Clean category rows and headers  
- Align fonts & padding  

#### ✔ PC Layout Improvements
- Fix z-index stacking  
- Panels no longer overlap weirdly  
- Stabilize panel anchor points  
- Better resizing behavior on desktop  

#### ✔ Expand Config.js
Move game tuning variables into config:
- Tooltip delay  
- Sort modes  
- Default panel states  
- Skill curves  
- Attack formula numbers  

#### ✔ Refactor & Modularize
- Move UI logic into separate scripts  
- Extract helpers and utilities  
- Clean naming conventions  
- Remove unused code  

---

# ## v0.0.67 — Inventory Improvements Update  
### *Quality-of-life update improving clarity and control.*

### Features

#### ✔ Collapse / Expand All
One button to toggle every category.

#### ✔ “Single List View”
Optional inventory mode with:
- No categories  
- All items shown as one list  
- Additional sorting options:
  - Grade  
  - Rarity  
  - DPS  
  - WeaponType  

Great for advanced players.

#### ✔ Tooltip Upgrade: 3-Level Info
Tooltips will show:

1. **Raw Item Stats**  
2. **Comparison vs Equipped**  
3. **Character Stats After Equipping**  

Example:
```
Your Stats After Equipping:
Attack: 6.1 → 7.4
DPS:    7.2 → 9.4
Crit:   12% → 14%
Loot:   8% → 10%
```

This gives perfect clarity.

---

# # 🌅 Future Systems (Post-0.0.67)

These aren't the next branches but are core long-term goals.

### Combat Loop
- Turn-based or auto  
- Enemy stats & levels  
- Enemy loot tables  
- Damage, crits, resistances  

### Exploration
- Panel for zones  
- Events  
- Biomes  
- Resource patches  

### Item Affixes
- Prefixes  
- Suffixes  
- Legendary traits  

### Professions
- Mining  
- Herbalism  
- Tools  
- Gathering node system  

### Advanced Gear
- Rings  
- Amulets  
- Shields  
- Armor sets  

### Late Game
- Bosses  
- Endless scaling  
- Marketplace (very late game)  

---

# # 🧠 Purpose of This Document

This summary ensures **any new ChatGPT session** instantly:
- Understands the project  
- Knows the core systems  
- Has the roadmap  
- Knows all formulas and architecture  
- Can continue development without losing context  

Paste this file into any new chat to instantly continue development.

