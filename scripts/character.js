// scripts/character.js
// All character-related calculations (attributes & derived stats)

/**
 * Convenience helper that does everything in one go.
 *
 * character: the currentCharacter object (name + stats)
 * equipmentSummary: (we'll build this later in equipment.js)
 *   {
 *     attrBonus: { str, dex, int, vit },
 *     statsBonus: {
 *       bonusHP,
 *       bonusCritChance,
 *       bonusLootFind,
 *       bonusMeleeAtk,
 *       bonusRangedAtk,
 *     },
 *     weaponAttackType: "melee" | "ranged" | null
 *   }
 *
 * For now, if you call this with only the character, it will assume
 * no equipment bonuses and unarmed.
 */

function buildCharacterComputedState(character, equipmentSummary) {
  const baseAttrs = getBaseAttributesFromCharacter(character);

  const attrBonus = (equipmentSummary && equipmentSummary.attrBonus) || {
    str: 0,
    dex: 0,
    int: 0,
    vit: 0,
  };

  const attrTotals = computeAttributeTotals(baseAttrs, attrBonus);

  const statsBonus =
    (equipmentSummary && equipmentSummary.statsBonus) || {};

  const weaponAttackType =
    (equipmentSummary && equipmentSummary.weaponAttackType) || null;

  const mainWeapon =
    (equipmentSummary && equipmentSummary.mainWeapon) || null;

  const skills =
    (character && character.skills) || {};

  const derived = computeDerivedStats(
    attrTotals,
    statsBonus,
    weaponAttackType,
    skills,
    mainWeapon
  );

  return {
    baseAttributes: baseAttrs,
    attributeTotals: attrTotals,
    derivedStats: derived,
  };
}
