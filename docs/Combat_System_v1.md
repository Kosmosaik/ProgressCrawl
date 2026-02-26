# ProgressCrawl --- Combat System (v1)

**Status:** Design Locked (Pre-Implementation Spec)\
**Scope:** Defines Combat v1 including state model, timing loop, stamina
interaction, and corpse processing flow.\
**Audience:** Future developers and GPT assistants implementing or
modifying combat.

------------------------------------------------------------------------

# 1. Combat Philosophy

-   Combat is layered on top of survival.
-   Combat is a separate UI mode from exploration.
-   Early version is intentionally simple.
-   Player attacks are automatic.
-   Player choices are limited to: **Fight (automatic)** or **Flee**.
-   Stamina directly affects combat effectiveness.

------------------------------------------------------------------------

# 2. Combat Entry

Combat begins when:

-   Player attacks an entity explicitly OR
-   Player enters aggro radius of aggressive/territorial entity

On combat start:

-   Zone simulation pauses.
-   Entity movement pauses.
-   Combat UI replaces Zone UI.
-   Combat references a specific entity instance from zone state.

------------------------------------------------------------------------

# 3. Combat State Machine (v1)

States:

1.  INIT
2.  FIGHTING
3.  PLAYER_FLEEING
4.  VICTORY
5.  DEFEAT
6.  CLEANUP

Flow:

INIT → FIGHTING\
FIGHTING → VICTORY (enemy HP \<= 0)\
FIGHTING → DEFEAT (player HP \<= 0)\
FIGHTING → PLAYER_FLEEING (player presses Flee)\
PLAYER_FLEEING → CLEANUP (success)\
PLAYER_FLEEING → FIGHTING (failure)

------------------------------------------------------------------------

# 4. Combat Loop (Auto-Attack Model)

Each actor has:

-   attackPower
-   defense
-   attackSpeed (attacks per second)
-   nextAttackAt (timestamp)

Attack interval:

intervalMs = 1000 / attackSpeed

Loop rule:

If now \>= nextAttackAt: Perform attack Set nextAttackAt = now +
intervalMs

Both player and enemy use the same rule.

------------------------------------------------------------------------

# 5. Damage Model (v1)

Base calculation:

rawDamage = attacker.attackPower mitigatedDamage = max(1, rawDamage -
defender.defense)

Apply mitigatedDamage to defender HP.

This model is intentionally simple and expandable.

------------------------------------------------------------------------

# 6. Stamina Integration (v1)

Stamina affects BOTH attack speed and damage.

Define:

staminaRatio = currentStamina / maxStamina

Apply modifiers:

effectiveAttackSpeed = baseAttackSpeed \* (0.5 + 0.5 \* staminaRatio)

effectiveAttackPower = baseAttackPower \* (0.6 + 0.4 \* staminaRatio)

Meaning:

-   At 100% stamina → 100% speed & damage
-   At 0% stamina →
    -   50% attack speed
    -   60% attack power

These numbers are tuning values and may change later.

------------------------------------------------------------------------

# 7. Flee System (v1)

When player presses Flee:

-   Enter PLAYER_FLEEING state
-   Flee attempt duration: \~1200ms
-   Player cannot attack during attempt
-   Enemy continues attacking

After duration, roll success influenced by:

-   staminaRatio
-   DEX attribute (future expansion)
-   Encumbrance penalty

If success:

-   Exit combat
-   Return to zone view

If fail:

-   Return to FIGHTING
-   Log message: "Escape failed!"

------------------------------------------------------------------------

# 8. Victory & Corpse Processing

On VICTORY:

-   Show Victory UI
-   Convert defeated entity into corpse source instance

Available corpse actions:

-   Loot
-   Skin
-   Butcher
-   Harvest

Each action:

-   Starts a Quality Improvement Session
-   Tracks separate depletion flags
-   Does NOT close UI automatically

Corpse disappears when:

-   All actions completed OR
-   Zone refresh occurs

------------------------------------------------------------------------

# 9. Defeat Flow

On DEFEAT:

-   Exit combat
-   Trigger Failure & Recovery system (M12)
-   Apply penalties

------------------------------------------------------------------------

# 10. Knowledge System Hook (Future)

knowledge\[entityDefId\] += xp

Future unlocks may include:

-   Exact HP visibility
-   Attack speed visibility
-   Weakness/resistance info

------------------------------------------------------------------------

# 11. Integration Points

Combat depends on:

-   M4 (Time System)
-   M5 (Stamina)
-   M6 (Hands & Equipment)
-   M7 (Encumbrance)
-   M3.25 (Quality System)
-   M12 (Failure System)

------------------------------------------------------------------------

# 12. Non-Goals (v1)

-   No abilities or spells
-   No defend mechanic
-   No status effects
-   No critical hits
-   No elemental damage
-   No multi-enemy combat
-   No mid-combat persistence across reloads

------------------------------------------------------------------------

End of Document.
