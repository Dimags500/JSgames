const startClock = document.getElementById("start-btn");
startClock.addEventListener("click", startGame);
const board = document.getElementById("game-board");
let movesDisplay = document.getElementById("moves");
let secondsDisplay = document.getElementById("seconds");
let minutesDisplay = document.getElementById("minutes");

let moves = 0;
let clickCardsDisabled = false;
let gameStarted = false;

let card1Color = 0;
let card2Color = 0;
let card1;
let card2;
let step1 = false;

const colors = ["red", "green", "yellow", "pink", "purple", "blue"];
const cards = [];

for (let i = 0; i < 6; i++) {
  cards[i] = colors[i];
}

function startGame(e) {
  if (!gameStarted) {
    timer();
    gameStarted = !gameStarted;
    cardBuilder(cards, board);
    e.target.innerHTML = "Reset";
    return;
  }
  location.reload();
}

function cardBuilder(cards, board) {
  for (let i = 0; i < 6; i++) {
    let card = document.createElement("div");
    card.classList.add(cards[i], "card", "cover");
    card.classList.add(cards[i], "card");

    card.addEventListener("click", cardClick);
    board.appendChild(card);
  }

  for (let i = 0; i < 6; i++) {
    let card = document.createElement("div");
    card.classList.add(cards[i], "card", "cover");
    card.classList.add(cards[i], "card");

    card.addEventListener("click", cardClick);
    board.appendChild(card);
  }

  random(board);
}

function random(board) {
  let cards = board.children;

  for (let i = 0; i < cards.length; i++) {
    cards[Math.floor(Math.random() * 12)].style.order = Math.floor(
      Math.random() * 10
    ).toString();
  }
}

function cardClick(e) {
  if (!clickCardsDisabled) {
    if (!step1) {
      card1 = e.target;
      card1Color = e.target.classList[0];
      e.target.classList.remove("cover");
      step1 = true;
      return;
    }
    if (step1) {
      card2 = e.target;
      card2Color = e.target.classList[0];
      e.target.classList.remove("cover");
      let pairCards = cardCheck(card1Color, card2Color);

      if (!pairCards) {
        clickCardsDisabled = true;

        setTimeout(() => {
          clickCardsDisabled = false;
          card1.classList.add("cover");
          card2.classList.add("cover");
          reset();
        }, 1500);
      }
    }
  }
}

function cardCheck(card1Color, card2Color) {
  movesDisplay.innerHTML = moves += 1;
  if (card1Color == card2Color) {
    let cardsColorArray = document.getElementsByClassName(card1Color);
    for (let i = 0; i < cardsColorArray.length; i++) {
      cardsColorArray[i].removeEventListener("click", cardClick);
    }
    endGameCheck(card1Color, cards);
    reset();
    return true;
  }
  return false;
}

function endGameCheck(color, cards) {
  if (cards.length > 0) {
    let colorToRemove = cards.indexOf(color);
    cards.splice(colorToRemove, 1);
  }
  if (cards.length == 0) {
    setTimeout(() => {
      console.log("------------");
      let newGame = confirm("You won , new game ?");
      if (newGame) {
        location.reload();
      }
    }, 300);
  }
}

function reset() {
  step1 = false;
  card1Color = "";
  card2Color = "";
  card1 = null;
  card2 = null;
}

function timer() {
  let start = Date.now();
  let seconds = 0;
  let minutes = 0;
  setInterval(() => {
    if (seconds >= 59) {
      minutes++;
      start = Date.now();
    }
    let delta = Date.now() - start;
    seconds = Math.floor(delta / 1000);
    secondsDisplay.innerHTML = seconds;
    minutesDisplay.innerHTML = minutes;
  }, 1000);
}
