// scripts/inventory/inventory.sort.js
// Sorting helpers for inventory stacks.

// scripts/inventory/inventory.sort.js
// Sorting helpers for inventory stacks.

function compareStacks(A, B) {
  const { key, dir } = inventorySort;
  const mul = dir === "asc" ? 1 : -1;

  if (key === "name") {
    return A.name.localeCompare(B.name) * mul;
  }

  if (key === "qty") {
    const diff = A.stack.qty - B.stack.qty;
    if (diff !== 0) return diff * mul;
    return A.name.localeCompare(B.name) * mul;
  }

  if (key === "rarity") {
    const ra = A.stack.items[0]?.rarity || "";
    const rb = B.stack.items[0]?.rarity || "";
    const diff = raritySortValue(ra) - raritySortValue(rb);
    if (diff !== 0) return diff * mul;
    return A.name.localeCompare(B.name) * mul;
  }

  if (key === "category") {
    const ca = A.stack.items[0]?.category || "Other";
    const cb = B.stack.items[0]?.category || "Other";
  
    const diff = ca.localeCompare(cb);
    if (diff !== 0) return diff * mul;
    return A.name.localeCompare(B.name) * mul;
  }


  if (key === "quality") {
    // Sort by "best" quality in the stack (F0..S9 ladder)
    function bestQualityRank(stack) {
      if (!stack || !Array.isArray(stack.items)) return -1;

      let best = -1;
      for (const inst of stack.items) {
        const q = inst.quality;
        if (!q || typeof q !== "string" || q.length < 2) continue;

        const tier = q[0];
        const sub = parseInt(q.slice(1), 10) || 0;
        const tierIdx = TIER_ORDER.indexOf(tier);
        if (tierIdx === -1) continue;

        const rank = tierIdx * SUBLEVELS_PER_TIER + sub;
        if (rank > best) best = rank;
      }
      return best;
    }

    const qa = bestQualityRank(A.stack);
    const qb = bestQualityRank(B.stack);
    const diff = qa - qb;
    if (diff !== 0) return diff * mul;
    return A.name.localeCompare(B.name) * mul;
  }

  // Fallback: always stable on name
  return A.name.localeCompare(B.name) * mul;
}

