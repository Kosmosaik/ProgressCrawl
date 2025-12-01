// scripts/inventory.js

// DOM reference
const inventoryList = document.getElementById("inventory-list");

// Inventory data
const inventory = Object.create(null);

// ----- Inventory toolbar controls -----
const inventoryViewToggleBtn = document.getElementById("inventory-view-toggle");
const inventoryCollapseAllBtn = document.getElementById("inventory-collapse-all");
const inventoryExpandAllBtn = document.getElementById("inventory-expand-all");

// Collapse all categories
if (inventoryCollapseAllBtn) {
  inventoryCollapseAllBtn.addEventListener("click", () => {
    if (typeof collapseAllCategories === "function") {
      collapseAllCategories();
    }
  });
}

// Expand all categories
if (inventoryExpandAllBtn) {
  inventoryExpandAllBtn.addEventListener("click", () => {
    if (typeof expandAllCategories === "function") {
      expandAllCategories();
    }
  });
}

// Set initial label for view toggle
if (inventoryViewToggleBtn) {
  const label =
    typeof inventoryViewMode !== "undefined" && inventoryViewMode === "all"
      ? "View: All items ▼"
      : "View: Category ▼";

  inventoryViewToggleBtn.textContent = label;
}

// View toggle: switch between "category" and "all" modes
if (inventoryViewToggleBtn) {
  inventoryViewToggleBtn.addEventListener("click", () => {
    if (typeof setInventoryViewMode !== "function") return;

    const newMode = inventoryViewMode === "category" ? "all" : "category";
    setInventoryViewMode(newMode);

    // Update button text
    inventoryViewToggleBtn.textContent =
      newMode === "all" ? "View: All items ▼" : "View: Category ▼";
  });
}

// ----- Column resizing for All Items flat view -----
function setupInventoryFlatColumnResizing(headerEl) {
  const MIN_WIDTH = 40;

  // Remove any old handles (in case we re-rendered)
  headerEl.querySelectorAll(".col-resize-handle").forEach((h) => h.remove());

  const headerCells = headerEl.querySelectorAll(".flat-header-cell");
  if (!headerCells.length) return;

  let isResizing = false;
  let startX = 0;
  let startWidths = [];
  let colIndex = -1;

  function onMouseMove(e) {
    if (!isResizing) return;
    const dx = e.clientX - startX;

    const current = getInventoryFlatColumnWidths();
    const newWidths = startWidths.slice();
    newWidths[colIndex] = Math.max(MIN_WIDTH, startWidths[colIndex] + dx);

    setInventoryFlatColumnWidths(newWidths);

    // Apply to header
    applyInventoryFlatColumnWidthsToElement(headerEl);
    // Apply to all existing flat rows
    document
      .querySelectorAll(".inventory-stack-flat > summary")
      .forEach((sumEl) => {
        applyInventoryFlatColumnWidthsToElement(sumEl);
      });
    
    // Keep panel width in sync with columns
    if (typeof updateInventoryPanelWidthToFitColumns === "function") {
      updateInventoryPanelWidthToFitColumns();
    }
  }

  function onMouseUp() {
    if (!isResizing) return;
    isResizing = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
  
  headerCells.forEach((cell, index) => {
    const handle = document.createElement("div");
    handle.className = "col-resize-handle";
    cell.appendChild(handle);
  
    handle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      isResizing = true;
      startX = e.clientX;
      colIndex = index;
  
      startWidths = getInventoryFlatColumnWidths().slice();
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  
    handle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
}

// ----- Make inventory panel width follow flat column layout -----
function updateInventoryPanelWidthToFitColumns() {
  const panel = document.getElementById("inventory-panel");
  if (!panel) return;

  const widths = getInventoryFlatColumnWidths();
  if (!widths || !widths.length) return;

  const totalCols = widths.reduce((sum, w) => sum + w, 0);
  const gap = 8;                          // matches column-gap in CSS
  const totalGaps = gap * (widths.length - 1);

  const PANEL_PADDING = 20;               // padding + borders margin
  const desired = totalCols + totalGaps + PANEL_PADDING;

  const viewportMax = window.innerWidth - 40; // keep some margin
  const MIN_WIDTH = 360;
  const maxWidth = Math.max(MIN_WIDTH, viewportMax);

  const finalWidth = Math.min(Math.max(desired, MIN_WIDTH), maxWidth);
  panel.style.width = `${finalWidth}px`;
}

// Ensure initial resize mode matches the default view (category)
(function initInventoryPanelResizeMode() {
  const panel = document.getElementById("inventory-panel");
  if (!panel) return;

  // Default is category view
  panel.style.resize = "horizontal";
  panel.style.overflowX = "auto";
})();

