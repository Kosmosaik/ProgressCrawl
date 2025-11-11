// scripts/items.js
const ItemCatalog = [
  {
    name: "Rusty Dagger",
    category: "Weapon",
    description: "A dull old dagger, but still sharp enough to draw blood.",
    rarity: "Common",
    usage: "Basic melee weapon.",
    quality: "E7",
    stats: { damage: 4, attackSpeed: 1.1 },
    affix: "+1 STR"
  },
  {
    name: "Slime Core",
    category: "Crafting Component",
    description: "A gelatinous orb pulsating with faint energy.",
    rarity: "Uncommon",
    usage: "Used for alchemy or crafting slime-based tools.",
    quality: "D4"
  },
  {
    name: "Iron Ore",
    category: "Resource",
    description: "A chunk of iron ore ready to be smelted.",
    rarity: "Abundant",
    usage: "Refine into ingots at a forge.",
    quality: "F3"
  },
  {
    name: "Healing Herb",
    category: "Material",
    description: "A fragrant herb used to create basic healing potions.",
    rarity: "Common",
    usage: "Restores 10 HP when brewed or eaten raw.",
    quality: "E9"
  }
];

// Function to get a random item (weighted by rarity)
function getRandomItem() {
  const rarities = {
    Abundant: 40,
    Common: 30,
    Uncommon: 20,
    Rare: 8,
    Exotic: 2
  };

  // Weighted random
  const total = Object.values(rarities).reduce((a,b)=>a+b,0);
  const roll = Math.random() * total;
  let cumulative = 0, chosenRarity = "Common";

  for (const [r, w] of Object.entries(rarities)) {
    cumulative += w;
    if (roll <= cumulative) {
      chosenRarity = r; break;
    }
  }

  const possibleItems = ItemCatalog.filter(i => i.rarity === chosenRarity);
  return possibleItems[Math.floor(Math.random() * possibleItems.length)];
}
