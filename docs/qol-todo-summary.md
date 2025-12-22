# ProgressCrawl – Zone Exploration QoL Branch (Post–0.0.70e)

This document is meant as a handoff / technical summary for the next GPT assistant and for future maintenance.


### TODOs

These should be handled in future QoL passes or adjacent branches:
  
1. **Move the Inventory/Equipment/Skills menu bar up on top header so we don't have two top panels. The name (on the top left) can be removed for now.

2. **Remove the "Overview World map ready (Tutorial Zone + adjacent placeholders)" text/field**

3. **Remove the "Zone" menu text in the top and move up the Zone Info field instead. We need to save on UI height in the zone panel.

4. **Randomize min/max width & height and fillChance on zones. Set different min/max and fill values depending on zone type/biome.

5. **Make Zone Info more player friendly by removing Zone ID and adding Zone Name instead.**

6. **Add Completed as state to zone so when viewing Zone Info on a zone in world map, it should say "Discovered" = Not Explored, "Visited" = Entered but not fully explored, "Completed" = Fully completed (100% tiles explored). In the future there will be a different calculation based on POIs, Locations and subareas.

14. Remove messages when there's nothing of interest in the tile, and instead add messages for finding resources, entities, POIs etc.

---

## IDEAS BELOW ARE NOT TO BE IMPLEMENTED YET. THESE ARE ONLY IDEAS AND NEED TO BE THOUGHT ON FURTHER.
xx. **Add a "view distance" mechanic (3×3 area around player)**
   - Currently, exploration reveals individual tiles based on exploration logic; there is no concept of **FOV/view distance** beyond “explored vs unexplored”.
   - TODO: introduce a view-distance system where exploring / moving reveals tiles in a radius around the player (N/NE/E/SE/S/SW/W/NW), and make it configurable for future features like torches, light sources, etc.
   - Note: All tiles within the view distance will count as explored when revealed, not only the one "targeted" tile.

xx. **Mark all tiles with "?" (including blocked tiles) until explored**
   - Current render logic shows `#` for blocked tiles right away.
   - TODO: change rendering so all tiles initially show as `?` and only reveal their actual type (`#`, `.`, `L`) after being explored (or revealed by view distance).
   - NOTE: This will only be done if view distance is implemented and increased from one tile as we have today.

xx. **Mouse control: Panning around the zone**
   xx.2 **Follow Character button: Makes zone view follow/focus on player.**
   When these two functions has been implemented, I think we can remove the ugly scroll bar in the zone view?

---

## 8. Notes for the Next Assistant

- The current implementation is **good enough to feel like a proper “walk → inspect → reveal” loop**, but many numbers (movement speed, explore delay) are **hardcoded** and should later be exposed through `GAME_CONFIG` for balancing.
