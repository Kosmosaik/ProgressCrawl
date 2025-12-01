// scripts/ui/ui.draggablePanels.js
// Makes certain panels draggable and remembers their position.

const DRAGGABLE_PANELS = [
  { id: "inventory-panel", storageKey: "panelPos.inventory" },
  { id: "equipment-panel", storageKey: "panelPos.equipment" },
  { id: "skills-panel", storageKey: "panelPos.skills" },
];

// Initialize when page has loaded
window.addEventListener("load", initDraggablePanels);

function initDraggablePanels() {
  DRAGGABLE_PANELS.forEach(({ id, storageKey }) => {
    const panel = document.getElementById(id);
    if (!panel) return;

    // Restore saved position if any
    restorePanelPosition(panel, storageKey);

    // Find a handle inside the panel
    const handle =
      panel.querySelector(".draggable-handle") ||
      panel.querySelector("h2, h3");

    if (!handle) return;

    makePanelDraggable(panel, handle, storageKey);
  });
}

function restorePanelPosition(panel, storageKey) {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return;
    const pos = JSON.parse(stored);
    if (typeof pos.left !== "number" || typeof pos.top !== "number") return;

    panel.style.left = `${pos.left}px`;
    panel.style.top = `${pos.top}px`;
  } catch {
    // ignore
  }
}

function makePanelDraggable(panel, handle, storageKey) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  handle.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // only left mouse
    isDragging = true;

    const rect = panel.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.preventDefault();
  });
  
  function onMouseMove(e) {
    if (!isDragging) return;
  
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
  
    let newLeft = startLeft + dx;
    let newTop = startTop + dy;
  
    // Clamp inside viewport (keep out of bottom header area)
    const panelRect = panel.getBoundingClientRect();
    const width = panelRect.width;
    const height = panelRect.height;
  
    const SIDE_MARGIN = 10;
    const TOP_MARGIN = 10;
    const BOTTOM_RESERVED = 40; // space for bottom header / footer
  
    const maxLeft = window.innerWidth - width - SIDE_MARGIN;
    let maxTop = window.innerHeight - height - BOTTOM_RESERVED;
    if (maxTop < TOP_MARGIN) maxTop = TOP_MARGIN;
  
    if (newLeft < SIDE_MARGIN) newLeft = SIDE_MARGIN;
    if (newTop < TOP_MARGIN) newTop = TOP_MARGIN;
    if (newLeft > maxLeft) newLeft = maxLeft;
    if (newTop > maxTop) newTop = maxTop;
  
    panel.style.left = `${newLeft}px`;
    panel.style.top = `${newTop}px`;
  }

  function onMouseUp() {
    if (!isDragging) return;
    isDragging = false;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    // Save position
    try {
      const rect = panel.getBoundingClientRect();
      const pos = { left: rect.left, top: rect.top };
      localStorage.setItem(storageKey, JSON.stringify(pos));
    } catch {
      // ignore
    }
  }
}
