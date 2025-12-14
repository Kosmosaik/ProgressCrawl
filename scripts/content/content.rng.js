// scripts/content/content.rng.js
// 0.0.70e — Deterministic RNG helpers for content placement.
//
// We keep this separate from zones.generator.js to avoid coupling
// content placement to terrain generation.

(function () {
  const PC = (window.PC = window.PC || {});
  PC.content = PC.content || {};

  // Convert a seed (string/number) into a deterministic RNG function.
  // Implementation mirrors the style used in zones.generator.js (mulberry32-ish),
  // but is standalone.
  PC.content.createRng = PC.content.createRng || function createRng(seedValue) {
    let seed = 0;
    const str = String(seedValue ?? "");
    for (let i = 0; i < str.length; i++) {
      seed = (seed * 31 + str.charCodeAt(i)) | 0;
    }
    if (seed === 0) seed = 1;

    let t = seed >>> 0;
    return function rng() {
      t += 0x6d2b79f5;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Pick one item from a weighted list: [{ id, weight }, ...]
  PC.content.pickWeighted = PC.content.pickWeighted || function pickWeighted(list, rng) {
    if (!Array.isArray(list) || list.length === 0) return null;
    const r = typeof rng === "function" ? rng : Math.random;

    let total = 0;
    for (const it of list) total += Math.max(0, it?.weight ?? 0);
    if (total <= 0) return list[0] || null;

    let roll = r() * total;
    for (const it of list) {
      roll -= Math.max(0, it?.weight ?? 0);
      if (roll <= 0) return it;
    }
    return list[list.length - 1] || null;
  };
})();
