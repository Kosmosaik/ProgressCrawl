// scripts/equipment/equipment.core.js
// Core equipment state and operations used by the rest of the game.

// All valid equipment slots for v0.1
const EQUIP_SLOTS = ["weapon", "chest", "legs", "feet", "trinket"];

// Current equipped items.
// Each slot will either be `null` or an item object similar to inventory items:
// { name, rarity, quality, stats, description, slot, attackType, ... }
const equipped = {
  weapon: null,
  chest: null,
  legs: null,
  feet: null,
  trinket: null,
};

function isValidEquipSlot(slot) {
  return EQUIP_SLOTS.includes(slot);
}

/**
 * Equip an item into a given slot.
 *
 * - slot: one of "weapon", "chest", "legs", "feet", "trinket"
 * - item: an item object (like inventory items) or null to clear
 *
 * Returns the item that was previously in that slot (or null).
 */
function equipItemToSlot(slot, item) {
  if (!isValidEquipSlot(slot)) {
    console.warn("equipItemToSlot: invalid slot", slot);
    return null;
  }

  const previous = equipped[slot] || null;

  // Store a shallow copy so we don't accidentally mutate the original
  if (item) {
    equipped[slot] = {
      ...item,
      stats: { ...(item.stats || {}) },
    };
  } else {
    equipped[slot] = null;
  }

  return previous;
}

/**
 * Unequip whatever is in the given slot.
 * Returns the unequipped item (or null if empty).
 */
function unequipSlot(slot) {
  if (!isValidEquipSlot(slot)) {
    console.warn("unequipSlot: invalid slot", slot);
    return null;
  }
  const previous = equipped[slot] || null;
  equipped[slot] = null;
  return previous;
}

/**
 * Get a snapshot of the equipped items suitable for saving.
 * This returns a plain object that can be serialized to JSON.
 */
function getEquippedSnapshot() {
  const snap = {};
  for (const slot of EQUIP_SLOTS) {
    const it = equipped[slot];
    if (it) {
      snap[slot] = {
        ...it,
        stats: { ...(it.stats || {}) },
      };
    } else {
      snap[slot] = null;
    }
  }
  return snap;
}

/**
 * Load equipped items from a snapshot (e.g. from a save file).
 * Snapshot format should match what getEquippedSnapshot() produces.
 */
function loadEquippedFromSnapshot(snapshot) {
  for (const slot of EQUIP_SLOTS) {
    const it = snapshot && snapshot[slot] ? snapshot[slot] : null;
    if (it) {
      equipped[slot] = {
        ...it,
        stats: { ...(it.stats || {}) },
      };
    } else {
      equipped[slot] = null;
    }
  }
}
