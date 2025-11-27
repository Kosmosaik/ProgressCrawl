// scripts/inventory.js

// DOM reference
const inventoryList = document.getElementById("inventory-list");

// Inventory data
const inventory = Object.create(null);

// Category helpers
function categoryHeaderLabel(category = "Other") {
  const map = {
    "Material": "MATERIALS",
    "Crafting Component": "CRAFTING COMPONENTS",
    "Resource": "RESOURCES",
    "Weapon": "WEAPONS",
    "Tool": "TOOLS",
    "Wood": "WOOD",
    "Food": "FOOD",
  };
  return map[category] || (category || "OTHER").toUpperCase();
}
