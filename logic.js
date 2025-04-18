// global let variables
let isFinished = false; // to check if a user finished a game
let isValid = false; // to check a validity of a word

let todayWord = ""; // contains today's word a user wants to guess
let guessedWord = ""; // contains a word that a user typed

let currentCell = 0; // contains a current cell number
let currentRow = 0; // contains a current row where a user types

// global const variables
const CELLS = document.querySelectorAll(".cell"); // contains all cells a user will use using DOM
const LOADER = document.querySelector(".loader"); // accesses to the loader element using DOM

const API_POST = "https://words.dev-apis.com/validate-word"; // for validateWord() async function (POST)
const API_GET = "https://words.dev-apis.com/word-of-the-day"; // for initWord() async function (GET)

// functions

// here is the main function to launch the programm
async function main() {
  await initWord();
  
  document.addEventListener("keydown", function(event) {
    const key = event.key;
    input(key);
  });
}

// initializes enter and backspace input
function deleteAndConfirm(key) {
  if (key === "Enter") {
    confirmInput();
  }
  if (key === "Backspace") {
    deleteLast();
  }
}

// adds a leter into a cell
function addLetter(letter) {
  letter = letter.toLowerCase();
  CELLS[currentCell].textContent = letter;
  guessedWord += letter;
  currentCell++;
}

// logic of letters + enter + backspace input
function input(key) {
  if (isFinished) return;

  if (isLetter(key)) {
    if (currentRow === 0 && currentCell < 5) {
      addLetter(key);
    }
    if (currentRow === 1 && currentCell < 10) {
      addLetter(key);
    }
    if (currentRow === 2 && currentCell < 15) {
      addLetter(key);
    }
    if (currentRow === 3 && currentCell < 20) {
      addLetter(key);
    }
    if (currentRow === 4 && currentCell < 25) {
      addLetter(key);
    }
    if (currentRow === 5 && currentCell < 30) {
      addLetter(key);
    }
  } else {
    deleteAndConfirm(key);
  }
}

// shows loader icon while working with the API
function showLoader() {
  LOADER.style.display = "block";
}

// hides loader icon when we've got everything wee need from the API
function hideLoader() {
  LOADER.style.display = "none";
}

// checks if the user's input is a letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// confirms user input and shows the loader icon
async function confirmInput() { 
  if (guessedWord.length !== 5) return;

  showLoader();
  await validateWord();

  if (isValid) {
    if (guessedWord !== todayWord) {

      if (currentRow < 5) {
        paintCells(lettersColorPosition());
        currentRow++;
        guessedWord = "";
      } else {
        isFinished = true;
        paintCells(lettersColorPosition());
        document.querySelector(".answer").textContent = `The right word is ${todayWord}`;
      }

    } else if (guessedWord === todayWord) {
      isFinished = true;
      paintCells(lettersColorPosition());
      document.querySelector(".answer").textContent = `Congrats! :)`;
    }

  } else {
    paintCells(lettersColorPosition());
  }

  hideLoader();
}

// logic of deleting the last letter of a user's input
function deleteLast() {
  if (guessedWord === "") {
    return;
  }
  currentCell--;
  guessedWord = guessedWord.slice(0, -1);
  CELLS[currentCell].textContent = "";
}

// returns a status array that contains color and index information
// example: ["green", "gray", "gray", "yellow", "gray"]
function lettersColorPosition() {
  let status = new Array(5).fill("gray");
  const letterCount = {};

  for (let letter of todayWord) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (let i = 0; i < 5; i++) {
    if (guessedWord[i] === todayWord[i]) {
      status[i] = "green";
      letterCount[guessedWord[i]]--;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (status[i] === "gray" && letterCount[guessedWord[i]] > 0) {
      status[i] = "yellow";
      letterCount[guessedWord[i]]--;
    }
  }

  return status;
}

// colors cells using the status (returned) variable from the lettersColorPosition() function
function paintCells(status) {
  const startIndex = currentRow * 5;
  
  for (let i = 0; i < 5; i++) {
    const cell = CELLS[startIndex + i];
    cell.classList.remove("red");

    if (isValid) {
      cell.classList.add(status[i]);
    } else {
      void cell.offsetWidth;
      cell.classList.add("red");
    }

  }
}

// sends a word to the API and true or false returns
async function validateWord() {
  const promise = await fetch(API_POST, {
    method: "POST",
    body: JSON.stringify({
      word: guessedWord
    })
  });

  const data = await promise.json();
  isValid = data.validWord;
}

// initializes a todayWord variable
async function initWord() {
  const promise = await fetch(API_GET, {
  method: "GET"
  });

  const data = await promise.json();
  todayWord = data.word.toLowerCase();
}

// entry point to the programm
main();
