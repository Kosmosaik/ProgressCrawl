// scripts/core/pc.api.js
console.log("pc.api.js loaded");

// ---- State access helpers (single source of truth) ----
PC.api.state = function () {
  return PC.state;
};

PC.api.exp = function () {
  return PC.state.exploration;
};

PC.api.mov = function () {
  return PC.state.movement;
};

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
