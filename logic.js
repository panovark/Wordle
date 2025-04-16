let isWon = false; // A boolean variable to check if a user won
let todayWord = ""; // A string to contain today's word a user wants to guess
let guessedWord = ""; // A string to contain a word that a user typed
let currentCell = 0; // An int variable to contain current cell a user typing
let currentRow = 0; // An int variable to contain current row a user typing
const cells = document.querySelectorAll(".cell"); // A variable to contain all cells a user will use using DOM

// Here is the main function where key logic is implemented
function main() {
  document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (isLetter(event.key)) {
      if (currentRow === 0 && currentCell < 5) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
      if (currentRow === 1 && currentCell < 10) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
      if (currentRow === 2 && currentCell < 15) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
      if (currentRow === 3 && currentCell < 20) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
      if (currentRow === 4 && currentCell < 25) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
      if (currentRow === 5 && currentCell < 30) {
        cells[currentCell].textContent = key;
        guessedWord += key;
        currentCell++;
      }
    }
    if (key === "Enter") {
      confirmInput();
    }
    if (key === "Backspace" && !isWon) {
      deleteLast();
    }
  });
  initWord();
}

const loader = document.getElementById("loader"); // Accessing to the loader element using DOM

// Function to show loader icon while working with the API
function showLoader() {
  loader.style.display = "block";
}

// Function to hide loader icon when we've got everything wee need from the API
function hideLoader() {
  loader.style.display = "none";
}

// Function to check if the user's input is a letter
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

let isValid = false; // A boolean variable to check a validity of a word

// Async function with logic for confirming user's input
async function confirmInput() { 
  showLoader(); 
  console.log(guessedWord); 
  await validateWord();
  if (isValid) {
    if (guessedWord !== todayWord) {
      if (currentRow < 5) {
        paintCells(lettersColorPosition());
        console.log("Try again");

      } else {
        paintCells(lettersColorPosition());
        document.querySelector(".answer").textContent = `The right word is ${todayWord}`;
        console.log("You lost!");
      }
      guessedWord = "";
      currentRow++;
    } else {
      paintCells(lettersColorPosition());
      isWon = true;
      document.querySelector(".answer").textContent = `Congrats! :)`;
    }
  } else {
    paintCells(lettersColorPosition());
  }
  hideLoader();
}

// Function for deleting the last letter
function deleteLast() {
  if (guessedWord === "") {
    return;
  }
  currentCell--;
  guessedWord = guessedWord.slice(0, -1);
  cells[currentCell].textContent = "";
}

// Function that returns a status array that contains color and index information
// Example: ["green", "gray", "gray", "yellow", "gray"]
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

// Function for coloring cells using the status (returned) variable from the lettersColorPosition() function
function paintCells(status) {
  const startIndex = currentRow * 5;
  for (let i = 0; i < 5; i++) {
    const cell = cells[startIndex + i];
    cell.classList.remove("red");
    if (isValid) {
      cell.classList.add(status[i]);
    } else {
      void cell.offsetWidth;
      cell.classList.add("red");
    }
  }
}

const apiPost = "https://words.dev-apis.com/validate-word"; // API for validateWord() async function (POST)

// Async function which sends a word to the API and true or false returns
async function validateWord() {
  const promise = await fetch(apiPost, {
    method: "POST",
    body: JSON.stringify({
      word: guessedWord
    })
  });
  const data = await promise.json();
  isValid = data.validWord;
}

const apiGet = "https://words.dev-apis.com/word-of-the-day"; // API for initWord() async function (GET)

// Async function which initializes a todayWord variable
async function initWord() {
  const promise = await fetch(apiGet, {
  method: "GET"
  });
  const data = await promise.json();
  todayWord = data.word;
  console.log(todayWord)
}

// Entry point to the programm
main();