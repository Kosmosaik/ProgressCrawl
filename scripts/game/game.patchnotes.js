// scripts/game/game.patchnotes.js
// Handles patch notes panel and CHANGELOG.md loading.

// DOM elements for patch notes
const patchNotesBtn = document.getElementById("patch-notes-btn");
const patchNotesPanel = document.getElementById("patch-notes-panel");
const patchNotesClose = document.getElementById("patch-notes-close");
const patchNotesTitle = document.getElementById("patch-notes-title");
const patchNotesContent = document.getElementById("patch-notes-content");

let patchNotesLoaded = false;

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Minimal markdown renderer for CHANGELOG-style notes:
// Supports: ### headings, - lists, blank lines, plain paragraphs.
// (Intentionally limited + safe)
function renderChangelogMarkdown(md) {
  const lines = String(md || "").split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");

    // Blank line
    if (!line.trim()) {
      closeList();
      html += "<div class='pn-spacer'></div>";
      continue;
    }

    // Headings (### ...)
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      closeList();
      html += `<h3>${escapeHtml(h3[1].trim())}</h3>`;
      continue;
    }

    // Sub headings (#### ...)
    const h4 = line.match(/^####\s+(.*)$/);
    if (h4) {
      closeList();
      html += `<h4>${escapeHtml(h4[1].trim())}</h4>`;
      continue;
    }

    // Bullets (- ...)
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(li[1].trim())}</li>`;
      continue;
    }

    // Default paragraph line
    closeList();
    html += `<p>${escapeHtml(line.trim())}</p>`;
  }

  closeList();
  return html;
}

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
