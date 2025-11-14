===== FIXES: =====
@ When trashing an item, the tooltip gets stuck on the item until I hover over a different item.

===== GRAPHICS: =====
Rarity animation: When the loot slider/progress is finished, if the item is higher than Common (Uncommon, Rare, Exotic etc), animate the slider with a pop up like effect after the first "roll/slider fill",
reset the slider and fill it again, but this time with the Uncommon color. If the item is of rarity higher than Uncommon, repeat the same process and change the color to the next rarity (rare or whatever).
This adds a jackpot-like feel to the looting system. Also, this means we will have to generate the item before we do the first check, so the slider-change process knows how many times it will repeat the slider reset/color change.

   Process summary:
   1. Click to loot, generate item (invisible to player in this state).
   2. Slider starts to fill up (grey color)
         If item is Abundant or Common, give item to player, else continue.
   3. If items rarity is higher than common (Uncommon, Rare, Exotic), reset the slider -> pop up effect -> fill slider with Uncommon color.
      	If item is Uncommon, give item to player, else continue.
   4. If items rarity is higher than uncommon, reset slider -> pop up effect -> fill slider with Rare color.
         If item is Rare, give item to player, else continue.
   5. If items rarity is higher than rare, reset slider -> pop up effect -> fill slider with Exotic color.
         If item is Exotic, give item to player.

===== IMPROVEMENTS: =====
@ Change quality drop weight based on tier letter AND tier number (F9 most common, S1 rarest).
@ Add debug mode (type in like a password in console to activate).
  Add statistics, loot rate help, timers, speed up time/progress stuff.

===== TOOLS =====
@ Item creator (Tool that makes it easy adding items that automcatically adds it to the items.js file
@ Biome / Location / POI creator: Tool to add new biomes, locations, pois and loot pools

===== STATISTICS =====
@ Total items looted


===== FEATURES =====
FEATURE: Character & Classes
  @ Add character system with stats (randomized name, Class, Stats (Strength, Vitality, Agility - HP, Encumbrance, Attack Speed, Evade, HP Regen)).
  @ When game starts (opening the website for the first time) - Show character screen (hide loot button etc).
  @ Create Character button -> Roll random name, random class, random stats.
  @ Add Class/Stats calculations. Different stat distribution from different classes (still a bit random but weighted toward class related stats).
  
FEATURE: Equipment view
  @ Add Equipment menu
  @ Add more equipment related items (chest, head, weapon etc)
  @ Add equip/unequip function (move item from inventory to equipment and vice versa. Make slot busy/available)
  @ Add stats from equipment

FEATURE: Zones (Biomes)
   @ Add world map (grid of zones). Each zone is randomly generated when it comes to:
     Biomes, locations, points of interests, size (time it takes to explore), amount of enemies, difficulty rating.
   @ Add starting zone that the player will start in. Let's use this zone as a test zone where we spawn everything to test first, before we balance everything out.
   @ Add biome types (Plains, forest, river, desert etc.)
   @ Add locations related to different biome types. Let biomes choose which locations to be added from a pool (randomized).
   @ Add points of interests. Some are related to biome, and some can be added from a generic pool (like loot chest, weapon cache, broken wagon etc).
   @ Add exploration progress bar: Exploration progress based on zone size. 
   @ Add interaction window: During exploration - locations, pois etc will "spawn" (added to a list).
     Player can then click on the location, poi etc in the list and choose to explore/interact with it.
     Locations: A small description of the location, difficulty rating (could be higher or lower than the zone), and two buttons: Explore and Close. 
     Explore will "teleport" the player to the location (teleport actually means, pause zone progress, load data for location and start location exploration progress)
     A new exploration progress bar for the location will appear (the old for the zone will still be visible, but paused).
     When the exploration progress bar hits 100%, the player can then choose to exit the location and continue to explore the zone.
     Points of Interests: This is more like a small location, an object like a wagon, a trap of some sort, a small room. Anything that isn't big enough to move the player to a location.
     POIs can be puzzles that the players have to solve in order to get loot, skills or other stuff. It could also be a chest or some sort to just loot.

FEATURE: Enemies
   @ Add enemies (1 starter enemy (Rat or something), 1 that is a bit harder and 1 that the player will definitely die to).
   @ Add enemy stats (HP, Damage, Attack Speed, HP Reg)
   @ Add enemies to zones. Add all to starting zone in the beginning to test fighting, balancing, player death etc.
   @ Make some enemies appear in the exploration list (same as locations and pois), but also make some enemies trigger "forced combat".
   @ Add enemy loot pools: Different loot for different enemies.

FEATURE: Combat
   @ Add simple combat system (timer based attacks with a simple log updating when player/enemy attacks, showing damage done etc).
   @ Add "Fight" button on the entity in the exploration list to change game state/interface to fight mode.
   @ Add loot generation based on enemy type, loot pool etc.

FEATURE: Player Death
   @ When player health reaches <= 0 , 
   
OTHER:
@ Quality (F9 -> S1 = Higher Quality = Higher stat multipliers / higher enhancement values in crafting / higher success rates etc).
   Maybe add a property on items to set different min/max multiplier so all items can have different quality multipliers?
@ Gear Score: Score summarized from item stats (Damage, Attack Speed etc)
@ DPS: Calculate and show DPS on item (based on character stats + item stats)
