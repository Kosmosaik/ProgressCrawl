// scripts/inventory/inventory.state.js

// === Inventory View Mode ===
// "category" (default) or "all"
let inventoryViewMode = "category";

export function getInventoryViewMode() {
    return inventoryViewMode;
}

export function setInventoryViewMode(mode) {
    if (mode !== "category" && mode !== "all") return;
    inventoryViewMode = mode;
}


// === Inventory Sort State ===
let inventorySort = {
    key: "name",  // "name" | "rarity" | "qty"
    dir: "asc",   // "asc" | "desc"
};

export function getInventorySort() {
    return inventorySort;
}

export function setInventorySort(key, dir) {
    inventorySort.key = key;
    inventorySort.dir = dir;
}


// === UI Expansion State ===

// Which item stacks are currently expanded (Set of "category::name")
const openStacks = new Set();

export function isStackOpen(stackKey) {
    return openStacks.has(stackKey);
}

export function setStackOpen(stackKey, open) {
    if (open) openStacks.add(stackKey);
    else openStacks.delete(stackKey);
}


// Which categories are collapsed
const collapsedCategories = new Set();

export function isCategoryCollapsed(cat) {
    return collapsedCategories.has(cat);
}

export function setCategoryCollapsed(cat, collapsed) {
    if (collapsed) collapsedCategories.add(cat);
    else collapsedCategories.delete(cat);
}
