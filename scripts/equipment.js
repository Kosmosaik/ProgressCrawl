// scripts/equipment.js
// Handles equipped items and summarizes their bonuses for the character system.

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

/**
 * Summarize all equipment bonuses into the format expected
 * by buildCharacterComputedState(...) in character.js.
 *
 * Returns:
 * {
 *   attrBonus: { str, dex, int, vit },
 *   statsBonus: {
 *     bonusHP,
 *     bonusCritChance,
 *     bonusLootFind,
 *     bonusMeleeAtk,
 *     bonusRangedAtk,
 *   },
 *   weaponAttackType: "melee" | "ranged" | null
 * }
 *
 * Right now:
 * - We only actually use critChance and lootFind from item.stats,
 *   and leave the rest as placeholders for later.
 * - Attribute bonuses (str/dex/int/vit) are 0 for now, but we keep the
 *   structure so we can add items that boost attributes later.
 */

function summarizeEquipmentForCharacter() {
  const attrBonus = { str: 0, dex: 0, int: 0, vit: 0 };

  const statsBonus = {
    bonusHP: 0,
    bonusCritChance: 0,
    bonusLootFind: 0,
    bonusMeleeAtk: 0,
    bonusRangedAtk: 0,
  };

  let weaponAttackType = null;

  for (const slot of EQUIP_SLOTS) {
    const item = equipped[slot];
    if (!item) continue;

    const stats = item.stats || {};

    // Weapon attack type (melee / ranged / null)
    if (slot === "weapon") {
      if (item.attackType === "melee" || item.attackType === "ranged") {
        weaponAttackType = item.attackType;
      }
    }

    // ---- Attribute bonuses (future use) ----
    // If we later add stats like bonusStr / bonusDex etc., they sum here.
    if (typeof stats.bonusStr === "number") attrBonus.str += stats.bonusStr;
    if (typeof stats.bonusDex === "number") attrBonus.dex += stats.bonusDex;
    if (typeof stats.bonusInt === "number") attrBonus.int += stats.bonusInt;
    if (typeof stats.bonusVit === "number") attrBonus.vit += stats.bonusVit;

    // ---- HP bonus (future armor etc.) ----
    if (typeof stats.bonusHP === "number") {
      statsBonus.bonusHP += stats.bonusHP;
    }

    // ---- Crit chance & Loot Find from item stats ----
    // We'll add these to items (e.g. dagger stats) via statRanges later.
    if (typeof stats.critChance === "number") {
      statsBonus.bonusCritChance += stats.critChance;
    }
    if (typeof stats.lootFind === "number") {
      statsBonus.bonusLootFind += stats.lootFind;
    }

    // ---- Direct attack bonuses (if we ever use them) ----
    if (typeof stats.bonusMeleeAtk === "number") {
      statsBonus.bonusMeleeAtk += stats.bonusMeleeAtk;
    }
    if (typeof stats.bonusRangedAtk === "number") {
      statsBonus.bonusRangedAtk += stats.bonusRangedAtk;
    }
  }

  return {
    attrBonus,
    statsBonus,
    weaponAttackType,
  };
}

/**
 * Read-only view of the current equipped items.
 * Returns a shallow copy of the equipped slots.
 */
function getEquippedState() {
  const out = {};
  for (const slot of EQUIP_SLOTS) {
    const item = equipped[slot];
    out[slot] = item
      ? { ...item, stats: { ...(item.stats || {}) } }
      : null;
  }
  return out;
}

