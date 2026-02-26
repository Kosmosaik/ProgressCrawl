// scripts/game/game.screens.js
// Screen state + Start/Character/Game navigation.

// ----- Screen elements -----
const screenStart = document.getElementById("screen-start");
const screenCharacter = document.getElementById("screen-character");
const screenGame = document.getElementById("screen-game");

const btnNewGame = document.getElementById("btn-new-game");
const btnBackToStart = document.getElementById("btn-back-to-start");

// Simple screen state: "start" | "character" | "game"
let currentScreen = "start";

function setScreen(screen) {
  currentScreen = screen;

  if (screenStart) screenStart.hidden = screen !== "start";
  if (screenCharacter) screenCharacter.hidden = screen !== "character";
  if (screenGame) screenGame.hidden = screen !== "game";
}

// ----- Button wiring for start / character screens -----
if (btnNewGame) {
  btnNewGame.addEventListener("click", () => {
    // New character starts with empty inventory and locked features
    loadInventoryFromSnapshot(null);
    loadEquippedFromSnapshot(null);
    
    const st = (typeof STATE === "function") ? STATE() : null;
    if (st) {
      st.character = null;
      if (st.save) st.save.currentSaveId = null;
      if (st.features) {
        st.features.inventoryUnlocked = false;
        st.features.equipmentUnlocked = false;
      }
    
      if (typeof setCharacterComputed === "function") {
        setCharacterComputed(null);
      } else {
        st.characterComputed = null;
      }
    }
    
    updateEquipmentPanel();
    
    if (inventoryButton) {
      inventoryButton.style.display = "none";
    }
    if (equipmentButton) {
      equipmentButton.style.display = "none";
    }
    if (equipmentPanel) {
      equipmentPanel.style.display = "none";
    }
    
    resetCharacterCreation();
    setScreen("character");
  });
}

if (btnBackToStart) {
  btnBackToStart.addEventListener("click", () => {
    setScreen("start");
  });
}

// Ensure initial screen state is applied even if another script fails before bootstrap runs.
setScreen("start");

