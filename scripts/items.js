// scripts/items.js
// Keep rarity-weighted random; some items have optional statRanges.

const ItemCatalog = [
// ========== WEAPONS ==========
  {
    id: "wpn_crude_knife",
    name: "Crude Knife",
    description: "A primitive cutting tool made from stone and twine.",
    category: "Weapon",
    slot: "weapon",
    weaponType: "dagger",
    rarity: "Common",
    skillReq: 3,
    attrPerPower: 1.5,
    statRanges: {
      damage: [2, 4],
      attackSpeed: [0.9, 1.1],
      critChance: [0, 1],
    }
  },
  {
    id: "wpn_wooden_club",
    name: "Wooden Club",
    description: "A branch trimmed into a club",
    category: "Weapon",
    slot: "weapon",
    weaponType: "club",
    rarity: "Common",
    skillReq: 3,
    attrPerPower: 1.5,
    statRanges: {
      damage: [3, 6],
      attackSpeed: [0.8, 1.0],
    }
  },
  {
    id: "wpn_stone_knife",
    name: "Stone Knife",
    description: "A simple sharpened knife, nothing fancy.",
    category: "Weapon",
    slot: "weapon",
    weaponType: "dagger",
    rarity: "Uncommon",
    skillReq: 10,
    attrPerPower: 1.6,
    statRanges: {
      damage: [4, 8],
      attackSpeed: [1.0, 1.2],
      critChance: [1, 2],
    }
  },
  {
    id: "wpn_stone_headed_club",
    name: "Stone-Headed Club",
    description: "Heavier and stronger than Wooden Club",
    category: "Weapon",
    slot: "weapon",
    weaponType: "club",
    rarity: "Common",
    skillReq: 3,
    attrPerPower: 1.5,
    statRanges: {
      damage: [5, 9],
      attackSpeed: [0.75, 0.95],
    }
  },
  {
    id: "wpn_stone_axe",
    name: "Stone Axe",
    description: "Basic Stone Axe",
    category: "Weapon",
    slot: "weapon",
    weaponType: "axe",
    rarity: "Common",
    skillReq: 3,
    attrPerPower: 1.5,
    statRanges: {
      damage: [4, 10],
      attackSpeed: [0.75, 0.95],
    }
  },
  {
    id: "wpn_leet_power_sword_of_doom",
    name: "Leet Power Sword of Doom",
    description: "Boi you found it!",
    category: "Weapon",
    slot: "weapon",
    weaponType: "sword",
    rarity: "Unique",
    skillReq: 100,
    attrPerPower: 2,
    statRanges: {
      damage: [120, 200],
      attackSpeed: [1.1, 1.4],
      critChance: [5, 20],
      lootFind: [0, 10],
    }
  },

// ========== ARMOR / EQUIPMENT ==========
  {
    id: "arm_bark_chest",
    name: "Bark Chest",
    description: "Layers of bark binded together with twine for rudimentary protection",
    category: "Armor",
    slot: "chest",
    rarity: "Uncommon",
    usage: "Basic armor.",
    statRanges: {
      vit: [1, 4],
    }
  },
  {
    id: "arm_grass_wraps_chest",
    name: "Grass Wraps Chest",
    description: "Primitive chest clothing. Minimal protection",
    category: "Armor",
    slot: "chest",
    rarity: "Uncommon",
    usage: "Basic armor.",
    statRanges: {
      vit: [1, 2],
    }
  },
  {
    id: "arm_grass_wraps_loincloth",
    name: "Grass Wraps Loincloth",
    description: "Primitive clothing. Minimal protection",
    category: "Armor",
    slot: "legs",
    rarity: "Uncommon",
    usage: "Basic armor.",
    statRanges: {
      vit: [1, 2],
    }
  },

// ========== MATERIALS ==========
  {
    id: "mat_mythic_fragment",
    name: "Mythic Fragment",
    category: "Material",
    description: "Super rare thingy McDingy",
    rarity: "Exotic",
    usage: "eh oh",
  },
  {
    id: "mat_healing_herb",
    name: "Healing Herb",
    category: "Material",
    description: "A fragrant herb used to create basic healing potions.",
    rarity: "Common",
    usage: "Restores 10 HP when brewed or eaten raw.",
  },
  {
    id: "mat_rope",
    name: "Rope",
    category: "Material",
    description: "A length of rope used for traps, crafting, and bindings.",
    rarity: "Common",
    usage: "Crafting, traps",
  },

// ========== TOOLS ==========
  {
    id: "tool_basic_fishing_rod",
    name: "Basic Fishing Rod",
    category: "Tool",
    description: "A basic fishing rod used to fish.",
    rarity: "Rare",
    usage: "Fishing",
  },
  {
    id: "tool_primitive_pickaxe",
    name: "Primitive Pickaxe",
    category: "Tool",
    description: "A basic pickaxe used to mine basic ores",
    rarity: "Rare",
    usage: "Mining",
  },
  {
    id: "tool_digging_stick",
    name: "Digging Stick",
    category: "Tool",
    description: "A basic tool for digging up roots and tubers",
    rarity: "Rare",
    usage: "Digging",
  },
  {
    id: "tool_cage_trap",
    name: "Cage Trap",
    category: "Tool",
    description: "To catch small animals.",
    rarity: "Rare",
    usage: "Digging",
  },

// ========== RESOURCES ==========
  {
    id: "res_animal_hide",
    name: "Animal Hide",
    category: "Resource",
    description: "Animal hide used for leatherworking and basic armor.",
    rarity: "Common",
    usage: "Crafting, armor",
  },
  {
    id: "res_contaminated_water",
    name: "Contaminated Water",
    category: "Resource",
    description: "Untreated water. Drinking is not recommended.",
    rarity: "Common",
    usage: "Ropes, simple baskets, fire tinder",
  },
  {
    id: "res_oak_log",
    name: "Oak Log",
    category: "Resource",
    description: "Wood material used for crafting and building.",
    rarity: "Abundant",
    usage: "Crafting, building, fuel",
  },
  {
    id: "res_purified_water",
    name: "Purified Water",
    category: "Resource",
    description: "Treated water. Drinkable and can be used in cooking.",
    rarity: "Uncommon",
    usage: "Ropes, simple baskets, fire tinder",
  },
  {
    id: "res_grass_bundle",
    name: "Grass Bundle",
    category: "Resource",
    description: "A basic, common plant material. Used for crafting simple items and building basic structures.",
    rarity: "Abundant",
    usage: "Ropes, simple baskets, fire tinder",
  },
  {
    id: "res_plant_fibre",
    name: "Plant Fibre",
    category: "Resource",
    description: "Plant fibers gathered from fibrous plants, like hemp, flax, or wild grasses",
    rarity: "Common",
    usage: "Ropes, simple baskets, fire tinder",
  },
  {
    id: "res_dry_leaves",
    name: "Dry Leaves",
    category: "Resource",
    description: "Good as kindling or for thatched roof",
    rarity: "Common",
    usage: "eh",
  },
  {
    id: "res_twig",
    name: "Twig",
    category: "Resource",
    description: "A small slender branch fallen from a tree or a bush.",
    rarity: "Abundant",
    usage: "Ropes, simple baskets, fire tinder",
  },
  {
    id: "res_small_stone",
    name: "Small Stone",
    category: "Resource",
    description: "Basic stone material used for crafting and building.",
    rarity: "Abundant",
    usage: "Craft primitive items",
  },
  {
    id: "res_flint",
    name: "Flint",
    category: "Resource",
    description: "A hard stone used for primitive tools and fire-starting.",
    rarity: "Common",
    usage: "Crafting, fire-starting",
  },
  {
    id: "res_sap",
    name: "Sap",
    category: "Resource",
    description: "Sticky tree sap used in primitive crafting and adhesives.",
    rarity: "Common",
    usage: "Crafting, adhesive",
  },
  {
    id: "res_wooden_branch",
    name: "Wooden Branch",
    category: "Resource",
    description: "Wooden branch used in primitive crafting, campfires etc.",
    rarity: "Abundant",
    usage: "Craft primitive items",
  },
  {
    id: "res_birch_wood",
    name: "Birch Wood",
    category: "Resource",
    description: "A wood type used in crafting, carpentry etc",
    rarity: "Common",
    usage: "Make planks, carpentry",
  },
  {
    id: "res_iron_ore",
    name: "Iron Ore",
    category: "Resource",
    description: "A chunk of iron ore ready to be smelted.",
    rarity: "Common",
    usage: "Refine into ingots at a forge.",
  },
  {
    id: "res_copper_nuggets",
    name: "Copper Nuggets",
    category: "Resource",
    description: "Small pieces of copper, useful in crafting basic metal items and refining.",
    rarity: "Common",
    usage: "Refine into ingots at a forge.",
  },

// ========== FOOD ==========
  {
    id: "food_raw_squirrel_meat",
    name: "Raw Squirrel Meat",
    category: "Food",
    description: "Poor thing.",
    rarity: "Common",
    usage: "Eh",
  },
  {
    id: "food_raw_wolf_meat",
    name: "Raw Wolf Meat",
    category: "Food",
    description: "Raw Meat. Can be cooked for better effects.",
    rarity: "Common",
    usage: "Food, cooking",
  },
  {
    id: "food_raw_rabbit_meat",
    name: "Raw Rabbit Meat",
    category: "Food",
    description: "Raw Meat. Can be cooked for better effects.",
    rarity: "Common",
    usage: "Food, cooking",
  },

// ========== CONSUMABLES ==========
  {
    id: "con_bandage",
    name: "Bandage",
    category: "Consumable",
    description: "A basic bandage used to treat wounds.",
    rarity: "Uncommon",
    usage: "Healing, first aid",
  }
];

// Use global config-defined weights
const RARITY_WEIGHTS =
  (typeof GAME_CONFIG !== "undefined" && GAME_CONFIG.rarityWeights)
    ? GAME_CONFIG.rarityWeights
    : {
        Abundant: 170,
        Common:   130,
        Uncommon: 80,
        Rare:      45,
        Exotic:    22,
        Unique:    12,
      };

function rollRarity() {
  return pickWeighted(RARITY_WEIGHTS);
}

function getRandomItem() {
  // Group items by rarity
  const pools = {};
  ItemCatalog.forEach(it => {
    (pools[it.rarity] ||= []).push(it);
  });

  // Build weighted pairs only for rarities that have items
  const pairs = Object.entries(RARITY_WEIGHTS)
    .filter(([r]) => pools[r]?.length)
    .map(([r, w]) => ({ rarity: r, weight: w }));

  // Fallback: any item
  if (!pairs.length) {
    return ItemCatalog[Math.floor(Math.random() * ItemCatalog.length)];
  }

  // Weighted pick a rarity
  const total = pairs.reduce((s, p) => s + p.weight, 0);
  let roll = Math.random() * total;
  let chosen = pairs[0].rarity;
  for (const p of pairs) {
    if ((roll -= p.weight) <= 0) { chosen = p.rarity; break; }
  }

  // Pick random item from that rarity pool
  const pool = pools[chosen];
  return pool[Math.floor(Math.random() * pool.length)];
}
