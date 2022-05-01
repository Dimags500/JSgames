const startClock = document.getElementById("start-btn");
startClock.addEventListener("click", startGame);
const board = document.getElementById("game-board");

function startGame(e) {
  console.log(obj);
  if (!obj.inGame) {
    obj.inGame = !obj.inGame;
    cardBuilder(obj, board);
  }
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
    card.classList.add(obj[i], "card");
    card.addEventListener("click", cardClick);
    board.appendChild(card);
  }
}

function cardClick() {}
