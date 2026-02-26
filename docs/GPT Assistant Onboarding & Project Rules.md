# ProgressCrawl — GPT Assistant Onboarding & Project Rules

This project uses GPT as a **development assistant**, not a speculative coder.  
Accuracy, verification, and architectural stability are more important than speed.

---

## Mandatory First Steps (Non-Negotiable)

1. **Extract the uploaded ZIP**
   - Recursively open and read **all `.js`, `.md`, and `.css` files** in all folders and subfolders.
   - Do **not** rely on memory from previous chats.

2. **Identify the current active milestone from ROADMAP.md.**

3. **Identify and confirm entry points**
   Before proposing any change, explicitly identify:
   - Main HTML structure (screens / panels / sections)
   - Bootstrap / entry script
   - State initialization
   - Screen switching logic
   - Save / load logic
   - Whether WORKING_RULES are currently being followed
  
4. Also read /docs/WORKING_RULES.md and confirm compliance.


   Do NOT implement anything yet.
   Summarize your findings first.

---

## Core Development Rules

- **NEVER guess file contents**
- **NEVER assume DOM structure, IDs, or CSS selectors**
  - Always confirm from `index.html` or relevant files.
- **ALWAYS check all relevant scripts** before concluding how something works.
- **NEVER duplicate state access**
- **NEVER refactor structure without explicit approval**
- **NEVER introduce new global state helpers or aliases**
  - Do not create new `STATE()` functions without permission
  - Do not create new direct `PC.state` aliases without permission

---

## State & Architecture Rules (Critical)

All new systems (including but not limited to resource nodes, entities, POIs, zones, world map features) must:

- Store **persistent data only** under `PC.state.*` (or the appropriate existing subtree)
- Expose read/write access via:
  - `STATE()`
  - `EXP()`
  - `MOV()`
  - or an approved `PC.api.*` accessor
- Expose **actions** via `PC.api.*`
- Never bypass or shadow the central state system

This rule exists to prevent the **“must refactor again” loop**.

---

## Change Discipline

- **Always provide full replacement blocks**
  - A “full replacement block” means the **smallest complete unit** that can be safely pasted:
    - Entire function
    - Entire event handler
    - Entire CSS rule
    - Entire HTML section
  - Never say “add this line somewhere” without showing the surrounding context.

- **Always cite evidence**
  - When describing behavior or proposing a change:
    - Name the exact file path
    - Quote the exact existing snippet being replaced (short, ≤10 lines)
    - Then provide the full replacement block

- **One QoL item per response**
  - Touch the **minimum number of files** needed.
  - If more changes are required, stop and summarize next steps instead of continuing.

---

## Save / Persistence Safety

- Any change affecting:
  - IDs
  - Keys
  - Persistent state schemas
- Must be:
  - Backwards compatible, **or**
  - Include a clear one-time migration strategy

Never silently break saves.

---

## Communication Rules

- Summarize **what changed** before continuing.
- Be explicit about:
  - What was added
  - What was changed
  - What was fixed
  - What was intentionally left untouched
- If something is uncertain or missing, **ask before proceeding**.

---

## Purpose of These Rules

These constraints exist to ensure:
- No hallucinated code
- No architectural drift
- No accidental state duplication
- No “we need to refactor everything again” situations

Follow them strictly.

---

## Recommended Reading Order (Do This First)

1. `docs/WORKING_RULES.md` (non-negotiable constraints)
2. `docs/ROADMAP.md` (single source of planning truth)
3. `docs/Technical_Summary.md` (what exists in code today)
4. `docs/M0_Architecture_Implementation_Spec.md` (if M0 work is ongoing)

Then consult system specs as needed:
- `docs/Zone_Refresh_and_Entity_Spawn_v1.md`
- `docs/Combat_System_v1.md`
- `docs/Grade_System_Technical_Summary.md` (Quality system)

After the above, you may browse:
- `docs/design/` (active design docs)
- `docs/backlog/` and `docs/ideas/` (not authoritative unless promoted into ROADMAP)

## Note on Project Summaries (Updated)

The authoritative current-state overview is:

- `docs/Technical_Summary.md`

Older references to “0.0.70c” summary filenames are deprecated.
