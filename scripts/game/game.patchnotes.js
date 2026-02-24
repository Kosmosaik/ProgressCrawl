// scripts/game/game.patchnotes.js
// Handles patch notes panel and CHANGELOG.md loading.

// DOM elements for patch notes
const patchNotesBtn = document.getElementById("patch-notes-btn");
const patchNotesPanel = document.getElementById("patch-notes-panel");
const patchNotesClose = document.getElementById("patch-notes-close");
const patchNotesTitle = document.getElementById("patch-notes-title");
const patchNotesContent = document.getElementById("patch-notes-content");

let patchNotesLoaded = false;

// Build a URL that works both:
// - locally (file server / localhost)
// - GitHub Pages project subpaths (/REPO_NAME/...)
function getChangelogUrl() {
  // Use window.location.href as the base so "docs/CHANGELOG.md" resolves under the current directory.
  // Example:
  //   https://user.github.io/ProgressCrawl/  -> https://user.github.io/ProgressCrawl/docs/CHANGELOG.md
  //   http://localhost:8080/               -> http://localhost:8080/docs/CHANGELOG.md
  return new URL("docs/CHANGELOG.md", window.location.href).toString();
}

// Load latest patch notes from CHANGELOG.md
async function loadPatchNotesFromChangelog() {
  if (patchNotesLoaded || !patchNotesContent) return;

  try {
    const url = getChangelogUrl();
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      // If we get HTML 404 pages from hosting, show a clear message.
      patchNotesContent.textContent = `Failed to load patch notes (${res.status} ${res.statusText}).`;
      if (patchNotesTitle) patchNotesTitle.textContent = "Patch Notes";
      return;
    }

    const text = await res.text();

    // Split into sections by "## " headings
    const sections = text.split(/^## /m).filter(Boolean);

    if (!sections.length) {
      patchNotesContent.textContent = "No patch notes found.";
      if (patchNotesTitle) patchNotesTitle.textContent = "Patch Notes";
      return;
    }

    // Assuming newest version is at the top of the changelog
    const latest = sections[0];

    const firstLineEnd = latest.indexOf("\n");
    const heading =
      firstLineEnd >= 0 ? latest.slice(0, firstLineEnd).trim() : latest.trim();
    const body =
      firstLineEnd >= 0 ? latest.slice(firstLineEnd + 1).trim() : "";

    if (patchNotesTitle) {
      patchNotesTitle.textContent = `Patch Notes — ${heading || "Latest"}`;
    }

    patchNotesContent.textContent = body || "No details found for the latest entry.";
    patchNotesLoaded = true;
  } catch (err) {
    console.warn("Failed to load CHANGELOG.md", err);
    if (patchNotesTitle) patchNotesTitle.textContent = "Patch Notes";
    patchNotesContent.textContent = "Failed to load patch notes.";
  }
}

// Open button
if (patchNotesBtn && patchNotesPanel) {
  patchNotesBtn.addEventListener("click", () => {
    patchNotesPanel.hidden = false;
    loadPatchNotesFromChangelog();
  });
}

// Close button
if (patchNotesClose && patchNotesPanel) {
  patchNotesClose.addEventListener("click", () => {
    patchNotesPanel.hidden = true;
  });
}

// Close when clicking backdrop
if (patchNotesPanel) {
  patchNotesPanel.addEventListener("click", (e) => {
    if (e.target.classList.contains("patch-notes-backdrop")) {
      patchNotesPanel.hidden = true;
    }
  });
}
