// scripts/core/pc.api.js
console.log("pc.api.js loaded");

// ---- Global state accessors (single source of truth) ----
// These MUST be defined once, early, so every script can rely on them.
function STATE() { return window.PC && PC.state; }
function EXP() { return STATE().exploration; }
function MOV() { return STATE().movement; }

PC.api = {
  zone: {
    exploreOnce: () => {
      if (typeof startZoneManualExploreOnce === "function") {
        startZoneManualExploreOnce();
      }
    },
    startAutoExplore: () => {
      if (typeof startZoneExplorationTicks === "function") {
        startZoneExplorationTicks();
      }
    },
    stopAutoExplore: () => {
      if (typeof stopZoneExplorationTicks === "function") {
        stopZoneExplorationTicks();
      }
    }
  },

  world: {
    enterZone: (x, y) => {
      if (typeof enterZoneFromWorldMap === "function") {
        enterZoneFromWorldMap(x, y);
      }
    },
    showWorldMap: () => {
      if (typeof switchToWorldMapView === "function") {
        switchToWorldMapView();
      }
    }
  }
};
