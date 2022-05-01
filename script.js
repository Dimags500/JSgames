const startClock = document.getElementById("start-btn");
startClock.addEventListener("click", startGame);
const board = document.getElementById("game-board");
let movesDisplay = document.getElementById("moves");
let timeDisplay = document.getElementById("time");

let moves = 0;
let stateColor = "";
let clickDisabled = false;

function startGame(e) {
  if (!obj.inGame) {
    timer();
    obj.inGame = !obj.inGame;
    cardBuilder(obj, board);
    e.target.innerHTML = "Reset";
    return;
  }
  location.reload();
}

const obj = { inGame: false };
const colors = ["red", "green", "yellow", "pink", "purple", "blue"];
for (let i = 0; i < 6; i++) {
  obj[i] = colors[i];
}
for (let i = 0; i < 6; i++) {
  obj[i + 6] = colors[i];
}

function cardBuilder(obj, board) {
  for (let i = 0; i < 12; i++) {
    let card = document.createElement("div");
    card.classList.add(obj[i], "card", "cover");
    card.addEventListener("click", cardClick);
    board.appendChild(card);
  }
}

function cardClick(e) {
  console.log("state " + stateColor);

  if (!clickDisabled) {
    moves++;
    movesDisplay.innerHTML = moves;
    e.target.classList.remove("cover");
    stateColor = cardCheck(e.target.classList[0], stateColor);

    if (stateColor != "") {
      clickDisabled = true;

      setTimeout(() => {
        e.target.classList.add("cover");
        clickDisabled = false;
      }, 2000);
    }
  }
}

function cardCheck(color, stateColor) {
  if (color == stateColor) {
    return "";
  }
  return color;
}

function timer() {
  let start = Date.now();

  setInterval(() => {
    let delta = Date.now() - start;
    timeDisplay.innerHTML = Math.floor(delta / 1000);
  }, 1000);
}
