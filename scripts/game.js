// scripts/game.js
console.log("game.js loaded v0.22 - Fixeri Fixera");

const lootButton = document.getElementById("loot-button");
const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const inventoryPanel = document.getElementById("inventory-panel");
const inventoryList = document.getElementById("inventory-list");
const inventoryButton = document.getElementById("inventory-btn");

let inventoryUnlocked = false;
const inventory = Object.create(null);

// ---- RNG + Quality
const TIER_ORDER = ["F","E","D","C","B","A","S"];
const TIER_WEIGHTS = { F: 9, E: 7, D: 5, C: 3, B: 2, A: 1, S: 0.6 };

function sublevelWeight(n) { return (n === 9) ? 10 : (10 - n); }

function pickWeighted(pairs) {
  const total = pairs.reduce((s,p)=>s+p.weight,0);
  let r = Math.random() * total;
  for (const p of pairs) { if ((r -= p.weight) <= 0) return p.item; }
  return pairs[pairs.length - 1].item;
}

function rollQuality() {
  const tier = pickWeighted(TIER_ORDER.map(t => ({ item: t, weight: TIER_WEIGHTS[t] })));
  const sub = pickWeighted(Array.from({length:9}, (_,i) => {
    const n = 9 - i; // 9..1
    return { item: n, weight: sublevelWeight(n) };
  }));
  return `${tier}${sub}`;
}

function qualityMultiplier(q) {
  const tier = q[0];
  const sub = parseInt(q.slice(1), 10);
  const tierIdx = TIER_ORDER.indexOf(tier);
  const totalSteps = TIER_ORDER.length * 9;
  const step = tierIdx * 9 + (10 - sub);
  const t = step / (totalSteps - 1);
  const min = 0.75, max = 1.8;
  return min + (max - min) * t;
}

function randFloat(min, max) { return Math.random() * (max - min) + min; }

// Rarity → CSS class
function rarityClass(rarity = "") {
  switch ((rarity || "").toLowerCase()) {
    case "abundant": return "r-abundant";
    case "common": return "r-common";
    case "uncommon": return "r-uncommon";
    case "rare": return "r-rare";
    case "exotic": return "r-exotic";
    default: return "r-common";
  }
}
function span(text, className = "", titleText = "") {
  const s = document.createElement("span");
  s.textContent = text;
  if (className) s.className = className;
  if (titleText) s.title = titleText;
  return s;
}

// Roll stats (no clamp; can exceed max if your multiplier pushes it)
function rollStats(statRanges, mult) {
  const out = {};
  for (const [key, range] of Object.entries(statRanges)) {
    const [a,b] = range;
    const base = randFloat(a, b) * mult;
    const intEndpoints = Number.isInteger(a) && Number.isInteger(b);
    out[key] = intEndpoints ? Math.round(base) : parseFloat(base.toFixed(2));
  }
  return out;
}

// UI events
lootButton.addEventListener("click", startLoot);
inventoryButton.addEventListener("click", () => {
  inventoryPanel.style.display = (inventoryPanel.style.display === "block") ? "none" : "block";
});

// Loot flow
function startLoot() {
  lootButton.disabled = true;
  progressContainer.style.display = "block";
  let time = 0;
  const duration = 1; // seconds

  const interval = setInterval(() => {
    time += 0.1;
    progressBar.style.width = `${(time / duration) * 100}%`;
    if (time >= duration) {
      clearInterval(interval);
      progressBar.style.width = "0%";
      progressContainer.style.display = "none";
      lootButton.disabled = false;

      const template = getRandomItem();        // from items.js
      const quality = rollQuality();
      const mult = qualityMultiplier(quality);
      const stats = template.statRanges ? rollStats(template.statRanges, mult) : {};

      const instance = {
        name: template.name,
        category: template.category,
        description: template.description,
        rarity: template.rarity,
        usage: template.usage,
        quality,
        stats,
      };

      addToInventory(instance);

      if (!inventoryUnlocked) {
        inventoryUnlocked = true;
        inventoryButton.style.display = "block";
      }
    }
  }, 100);
}

// Inventory
function addToInventory(inst) {
  if (!inventory[inst.name]) {
    inventory[inst.name] = { qty: 0, items: [] };
  }
  inventory[inst.name].qty += 1;
  inventory[inst.name].items.push(inst);
  renderInventory();
}

// Quality range helpers
function qualityStep(q) {
  const tier = q[0];
  const sub = parseInt(q.slice(1), 10);
  const tierIdx = TIER_ORDER.indexOf(tier);
  return tierIdx * 9 + (10 - sub); // 0..62
}
function summarizeQualityRange(items = []) {
  if (!items.length) return "";
  let minQ = items[0].quality, maxQ = items[0].quality;
  let minS = qualityStep(minQ), maxS = minS;
  for (let i = 1; i < items.length; i++) {
    const s = qualityStep(items[i].quality);
    if (s < minS) { minS = s; minQ = items[i].quality; }
    if (s > maxS) { maxS = s; maxQ = items[i].quality; }
  }
  return `[${minQ} - ${maxQ}]`;
}

function renderInventory() {
  inventoryList.innerHTML = "";
  const names = Object.keys(inventory).sort();
  if (!names.length) return;

  names.forEach(name => {
    const stack = inventory[name];
    const rarity = stack.items[0]?.rarity || "";

    const details = document.createElement("details");
    details.className = "inventory-stack";

    const summary = document.createElement("summary");
    // tooltip for the stack
    const first = stack.items[0] || {};
    summary.title = `${name}\n${first.description || ""}`.trim();

    // Build: <name> <rarity-span> xQty <qRange>
    summary.appendChild(document.createTextNode(`${name} `));
    const rarSpan = span(`[${rarity}]`, `rarity ${rarityClass(rarity)}`);
    summary.appendChild(rarSpan);
    summary.appendChild(document.createTextNode(` x${stack.qty}`));

    const qRange = summarizeQualityRange(stack.items);
    if (qRange) summary.appendChild(document.createTextNode(` ${qRange}`));

    details.appendChild(summary);

    const variantsWrap = document.createElement("div");
    variantsWrap.className = "stack-variants";
    stack.items.forEach((inst, idx) => {
      variantsWrap.appendChild(makeVariantLine(inst, idx));
    });
    details.appendChild(variantsWrap);

    inventoryList.appendChild(details);
  });
}

// Variant line
function makeVariantLine(inst, idx) {
  const div = document.createElement("div");
  div.className = "meta";

  const statStr = formatStats(inst.stats);
  div.title = [
    inst.name,
    inst.description,
    `Quality: ${inst.quality}`,
    statStr ? `Stats: ${statStr}` : ""
  ].filter(Boolean).join("\n");

  const bullet = document.createTextNode("• ");
  const rar = span(`[${inst.rarity}]`, `rarity ${rarityClass(inst.rarity)}`);
  const qualityTxt = document.createTextNode(` Q:${inst.quality}`);
  const statsTxt = statStr ? document.createTextNode(` { ${statStr} }`) : null;

  div.appendChild(bullet);
  div.appendChild(rar);
  div.appendChild(qualityTxt);
  if (statsTxt) div.appendChild(statsTxt);

  return div;
}

function formatStats(stats = {}) {
  const keys = Object.keys(stats);
  if (!keys.length) return "";
  return keys.map(k => `${k}:${fmt(stats[k])}`).join(", ");
}
function fmt(v) {
  return (typeof v === "number" && !Number.isInteger(v)) ? v.toFixed(2) : v;
}
