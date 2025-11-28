// scripts/inventory/inventory.state.js
// State / config used by the inventory UI (sorting + expansion).

// Sorting state for inventory
let inventorySort = {
  key: GAME_CONFIG.inventory.defaultSortKey, // "name" | "rarity" | "qty"
  dir: GAME_CONFIG.inventory.defaultSortDir, // "asc" | "desc"
};

// Rarity sort order
const RARITY_ORDER = GAME_CONFIG.raritySortOrder.slice();
function raritySortValue(r) {
  const idx = RARITY_ORDER.indexOf(r);
  return idx === -1 ? RARITY_ORDER.length : idx;
}

// Remember which stacks and categories are expanded/collapsed
const openStacks = new Set();
const collapsedCategories = new Set();

// View mode for inventory ("category" | "all").
// We'll fully use this in v0.0.67 Step 2.
let inventoryViewMode = "category";

// Change view mode and re-render inventory
function setInventoryViewMode(mode) {
  if (inventoryViewMode === mode) return;
  inventoryViewMode = mode;

  if (typeof renderInventory === "function") {
    renderInventory();
  }
}

// Collapse all categories currently present in the inventory
function collapseAllCategories() {
  if (!window.inventory) return;

  const names = Object.keys(inventory);
  // For each item stack, add its category to the collapsed set
  for (const name of names) {
    const group = inventory[name];
    if (!group || !Array.isArray(group.items)) continue;

    for (const inst of group.items) {
      if (inst && inst.category) {
        collapsedCategories.add(inst.category);
        break; // one instance is enough; all stacks share the same category
      }
    }
  }

  if (typeof renderInventory === "function") {
    renderInventory();
  }
}

// Expand all categories (clear the collapsed set)
function expandAllCategories() {
  collapsedCategories.clear();

  if (typeof renderInventory === "function") {
    renderInventory();
  }
}
