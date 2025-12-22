// scripts/game/game.ui.modal.js
// Phase 9 — Small modal used for zone-content interactions.
//
// Contract:
// - window.showChoiceModal({ title, body, bodyHtml, primaryText, onPrimary, secondaryText, onSecondary, keepOpenOnPrimary })
// - window.hideChoiceModal()
//
// Notes:
// - UI-only: does not decide gameplay.
// - Safe if modal DOM is missing (no-ops).

(function () {
  const overlay = document.getElementById("modal-overlay");
  const panel = document.getElementById("modal-panel");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");
  const primaryBtn = document.getElementById("modal-primary");
  const secondaryBtn = document.getElementById("modal-secondary");

  let onPrimary = null;
  let onSecondary = null;

  function hasDom() {
    return !!(overlay && panel && titleEl && bodyEl && primaryBtn && secondaryBtn);
  }

  function cleanup() {
    onPrimary = null;
    onSecondary = null;
    if (primaryBtn) primaryBtn.onclick = null;
    if (secondaryBtn) secondaryBtn.onclick = null;
  }

  window.hideChoiceModal = function hideChoiceModal() {
    if (!hasDom()) return;
    cleanup();
    overlay.classList.add("hidden");
  };

  window.showChoiceModal = function showChoiceModal(opts) {
    if (!hasDom()) return;

    const t = (opts && opts.title) ? String(opts.title) : "";
    const pText = (opts && opts.primaryText) ? String(opts.primaryText) : "OK";
    const sText = (opts && opts.secondaryText) ? String(opts.secondaryText) : "Cancel";

    const keepOpenOnPrimary = !!(opts && opts.keepOpenOnPrimary);

    const bodyHtml = (opts && typeof opts.bodyHtml === "string") ? opts.bodyHtml : null;
    const bodyText = (opts && opts.body != null) ? String(opts.body) : "";

    onPrimary = (opts && typeof opts.onPrimary === "function") ? opts.onPrimary : null;
    onSecondary = (opts && typeof opts.onSecondary === "function") ? opts.onSecondary : null;

    titleEl.textContent = t;

    if (bodyHtml != null) {
      bodyEl.innerHTML = bodyHtml;
    } else {
      bodyEl.textContent = bodyText;
    }

    primaryBtn.textContent = pText;
    secondaryBtn.textContent = sText;

    primaryBtn.disabled = false;
    secondaryBtn.disabled = false;

    primaryBtn.onclick = () => {
      const handler = onPrimary;
      if (!keepOpenOnPrimary) {
        window.hideChoiceModal();
      }
      if (handler) {
        try { handler(); } catch {}
      }
    };

    secondaryBtn.onclick = () => {
      const handler = onSecondary;
      window.hideChoiceModal();
      if (handler) {
        try { handler(); } catch {}
      }
    };

    overlay.classList.remove("hidden");
    setTimeout(() => {
      try { primaryBtn.focus(); } catch {}
    }, 0);
  };

  // Click outside closes
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        const handler = onSecondary;
        window.hideChoiceModal();
        if (handler) {
          try { handler(); } catch {}
        }
      }
    });
  }

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (overlay && !overlay.classList.contains("hidden")) {
        const handler = onSecondary;
        window.hideChoiceModal();
        if (handler) {
          try { handler(); } catch {}
        }
      }
    }
  });
})();
