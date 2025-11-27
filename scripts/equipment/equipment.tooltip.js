// scripts/equipment/equipment.tooltip.js
// Tooltip helpers for equipped items.

/**
 * Infer weapon type for old/legacy items.
 */
function inferWeaponType(item) {
  if (!item) return "unarmed";

  if (item.weaponType) return item.weaponType;

  if (item.attackType === "ranged") {
    return "bow";
  }

  // Legacy name-based detection
  const name = (item.name || "").toLowerCase();
  if (name.includes("dagger")) return "dagger";
  if (name.includes("club")) return "club";
  if (name.includes("sword")) return "sword";
  if (name.includes("axe") || name.includes("hatchet")) return "axe";

  return "sword";
}

/**
 * Build tooltip HTML for an equipped item.
 * Matches inventory tooltip style but WITHOUT +/- comparisons.
 */
function buildEquipmentItemTooltip(item, slot) {
  if (!item) return "";

  const stats = item.stats || {};
  const rarity = item.rarity || "Unknown";
  const quality = item.quality ?? "?";

  const lines = [];

  // Header
  lines.push(`<strong>${item.name}</strong>`);
  if (typeof rarityClass === "function") {
    lines.push(
      `<span class="rarity ${rarityClass(rarity)}">${rarity}</span>`
    );
  } else {
    lines.push(`${rarity}`);
  }
  lines.push(`Quality: ${quality}`);

  // Weapon section
  if (slot === "weapon" && typeof stats.damage === "number") {
    const dmg = stats.damage;
    const as =
      typeof stats.attackSpeed === "number" ? stats.attackSpeed : 1;
    const rawDps = dmg * as;

    lines.push("");
    lines.push("<strong>Weapon</strong>");

    lines.push(`Damage: ${fmt(dmg)}`);
    lines.push(`Attack Speed: ${fmt(as)}`);
    lines.push(`Raw DPS: ${fmt(rawDps)}`);

    // Required skill vs your skill
    const skillsCfg =
      (GAME_CONFIG.skills && GAME_CONFIG.skills.weapon) || {};
    const labels = skillsCfg.labels || {};
    const weaponType = inferWeaponType(item);
    const label = labels[weaponType] || weaponType;

    const required =
      typeof item.skillReq === "number" ? item.skillReq : 0;

    const playerSkill =
      (window.currentCharacter &&
        window.currentCharacter.skills &&
        window.currentCharacter.skills[weaponType]) ||
      0;

    if (required > 0) {
      lines.push(
        `${label}: ${required} (${fmt(playerSkill)})`
      );
    }
  }

  // Generic stats
  const allStatKeys = Object.keys(stats).filter(
    (k) => k !== "damage" && k !== "attackSpeed"
  );

  if (allStatKeys.length) {
    lines.push("");
    lines.push("<strong>Stats</strong>");

    allStatKeys.forEach((k) => {
      const statLabel =
        (typeof STAT_LABELS !== "undefined" && STAT_LABELS[k]) || k;
      const val = stats[k] ?? 0;
      if (!val) return;
      lines.push(`${statLabel}: ${fmt(val)}`);
    });
  }

  if (item.description) {
    lines.push("");
    lines.push(item.description);
  }

  return lines.join("<br>");
}
