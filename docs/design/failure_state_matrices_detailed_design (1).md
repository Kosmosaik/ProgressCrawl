# ProgressCrawl – Failure State Matrices (Detailed Design)

This document defines all major failure and pressure systems in gameplay terms.

Failure states in ProgressCrawl:
- Are gradual
- Are clearly communicated
- Reduce options before causing collapse
- Interact with other systems
- Are consequences of player decisions

They are not random punishments.

---

# 1. Time & Commitment Pressure

Time is the foundational pressure system.

## States

### Comfortable
- Supplies sufficient
- Retreat viable without cost

### Committed
- Deep enough into zone/sub-zone that return costs time and resources
- Risk exposure increasing

### Overextended
- Supplies low relative to distance
- Retreat possible but dangerous

### Trapped
- Low stamina + threat proximity + encumbrance
- Few safe options remain

## Design Intent
Time pressure must emerge from chosen actions, not hidden timers.

---

# 2. Hunger Matrix

Hunger = medium-term survival pressure.

## Stages

### Well Fed
- Baseline stamina regeneration

### Peckish
- Slight stamina regen reduction
- Minor stamina cost increase for heavy actions

### Hungry
- Noticeable stamina regen reduction
- Gathering/crafting slower
- Mild combat penalties

### Starving
- Very slow stamina regen
- Combat reliability reduced
- Exploration pauses more frequently

### Critical
- Severe stamina drain
- Survival becomes primary focus

## Core Rule
Hunger never directly kills. It amplifies risk.

---

# 3. Thirst Matrix

Thirst = short-term urgency pressure.

## Stages

### Hydrated
- Normal function

### Thirsty
- Increased stamina costs

### Dehydrated
- Combat penalties
- Slower movement

### Severely Dehydrated
- Poor flee success
- Heavy stamina drain

### Critical
- Exploration frequently halted
- Only short survival actions advisable

## Core Rule
Thirst escalates faster than hunger and shapes route planning.

---

# 4. Stamina Matrix

Stamina links all systems.

## Stages

### Rested
- Full capability

### Winded
- Mild penalties

### Tired
- Slower gathering
- Reduced combat reliability

### Exhausted
- Severe combat penalties
- Flee unreliable

### Collapsing
- Forced rest
- Extreme vulnerability

## Core Rule
Stamina failure reduces agency temporarily, not instantly ending runs.

---

# 5. Encumbrance Matrix

Encumbrance = greed vs safety pressure.

## States

### Unburdened
- Normal movement and flee chance

### Burdened
- Slight stamina increase cost

### Encumbered
- Slower movement
- Combat penalties
- Harder to flee

### Overloaded
- Cannot flee effectively
- Severe combat disadvantage

## Core Rule
Carrying limits always matter at all stages.

---

# 6. Injury & Health Matrix

Injury creates persistent pressure.

## Injury States

### Minor
- Small stamina penalty

### Moderate
- Slower gathering
- Combat disadvantage

### Severe
- Travel risky
- Requires recovery period

## Core Rule
Injury creates recovery gameplay, not downtime boredom.

---

# 7. Threat & Danger Matrix

Threat is pre-combat pressure.

## Levels

### None
- Free exploration

### Uncertain
- Subtle warning

### Nearby
- Exploration pauses
- Decision required

### Imminent
- Combat likely if no action taken

## Core Rule
Danger is always signaled before combat.

---

# 8. Gathering Commitment Risk

Timed interactions create exposure risk.

## States

### Safe Work
- Low interruption risk

### Risky Work
- Moderate interruption risk

### Unsafe Work
- High interruption probability
- Player warned explicitly

## Core Rule
Player must always be informed of risk before committing.

---

# 9. Skinning & Butchering Failures

## Failure Types

- Rushed → lower yield
- Poor tool → reduced quality
- Unsafe location → interruption risk

### Sinew Chain Failures

- Improper drying → brittle material
- Poor processing → low durability bowstring
- No treatment → faster decay

## Core Rule
Material quality depends on both source and skill.

---

# 10. Weather Pressure

Weather modifies other systems.

### Cold
- Increased hunger drain

### Heat
- Increased thirst drain

### Storm
- Visibility reduced
- Ambush risk increased

### Fog
- Slower exploration
- Higher uncertainty in threat detection

## Core Rule
Weather must alter decisions, not just visuals.

---

# 11. Event Engine Pressure

Events disrupt stability.

## Threat Events
- Ambush
- Roaming boss
- Environmental catastrophe

## Opportunity Events
- Traveling merchant
- Rare migration

## Core Rule
Events shift priorities but never delete progress arbitrarily.

---

# 12. Camp & Housing Pressure

## Camp States

### Temporary
- Minor safety

### Established
- Strong safety
- Storage and crafting access

### Threatened
- Risk of loss during events

### Compromised
- Repair or relocate required

## Core Rule
Camp loss must hurt but not invalidate the run.

---

# 13. Economy Failure States

## Pressure
- Over-encumbrance while trading
- Poor timing of sales
- Resource scarcity spikes

## Core Rule
Economy must reflect world conditions.

---

# 14. Meta Progression Pressure

## Failure Mode
- Entering new biome underprepared
- Delaying fragment usage

## Core Rule
Meta unlocks expand capability, not block survival.

---

# 15. Magic Failure States (Future)

## Risks
- Overcasting exhaustion
- Miscast debuffs
- Increased threat detection

## Core Rule
Magic introduces new risks alongside new power.

---

# 16. Companion Failure States (Future)

## Risks
- Injury
- Hunger
- Fear behavior

## Core Rule
Companions add utility but never automate gameplay.

---

# Cross-System Pressure Interactions

- Dehydrated + Encumbered → Flee nearly impossible
- Hungry + Cold Weather → Food priority increases
- Low Stamina + Timed Harvest → High interruption risk
- Injury + Long Travel → Camp importance rises
- Storm + Sub-zone → Shelter becomes priority

---

# Final Invariant

Failure states must:
- Be predictable
- Be layered
- Create decisions
- Interact logically

If a pressure system does not change player decisions, it must be redesigned.

