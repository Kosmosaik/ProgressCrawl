// scripts/character/character.core.js
// Core character helpers: base attributes and attribute totals.

/**
 * Safely get base stats from a character object.
 * Expects something like:
 * {
 *   name: "Foo",
 *   stats: { str: 10, dex: 8, int: 5, vit: 12 }
 * }
 */
function getBaseAttributesFromCharacter(character) {
  if (!character || !character.stats) {
    return { str: 0, dex: 0, int: 0, vit: 0 };
  }
  const s = character.stats;
  return {
    str: Number(s.str) || 0,
    dex: Number(s.dex) || 0,
    int: Number(s.int) || 0,
    vit: Number(s.vit) || 0,
  };
}

/**
 * Combine base attributes with bonuses from equipment/buffs/etc.
 *
 * base:  { str, dex, int, vit }
 * bonus: { str, dex, int, vit }  // can be all zeros (no gear yet)
 *
 * Returns:
 * {
 *   total: { str, dex, int, vit },
 *   bonus: { str, dex, int, vit }
 * }
 *
 * Note: "total" already includes the bonuses. In the UI we will show:
 *   STR: total (bonus)
 * Example: STR: 10 (5)  => total 10, of which 5 comes from bonuses.
 */
function computeAttributeTotals(base, bonus) {
  const b = bonus || {};
  const bonusStr = Number(b.str) || 0;
  const bonusDex = Number(b.dex) || 0;
  const bonusInt = Number(b.int) || 0;
  const bonusVit = Number(b.vit) || 0;

  const totalStr = base.str + bonusStr;
  const totalDex = base.dex + bonusDex;
  const totalInt = base.int + bonusInt;
  const totalVit = base.vit + bonusVit;

  return {
    total: {
      str: totalStr,
      dex: totalDex,
      int: totalInt,
      vit: totalVit,
    },
    bonus: {
      str: bonusStr,
      dex: bonusDex,
      int: bonusInt,
      vit: bonusVit,
    },
  };
}
