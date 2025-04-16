# Wordle – Lightweight Browser Clone

A minimal front‑end copy of the classic **Wordle** puzzle.  
Guess the five‑letter “word of the day” in six tries—right in your browser.

## Features
- **Pure HTML, CSS & Vanilla JS** – no frameworks required.  
- Uses the public API at `words.dev-apis.com` to fetch the secret word and validate guesses.  
- Familiar colour hints:  
  - Green = correct letter in the correct spot  
  - Yellow = correct letter in the wrong spot  
  - Grey = letter not in the word  
- Small loading spinner while talking to the API.

## How to Play
1. Open **`index.html`** in any modern browser.  
2. Type letters on your keyboard.  
   - **Enter** submits the word.  
   - **Backspace** deletes the last letter.  
3. Use the colour feedback to solve the puzzle within six rows.

## Quick Start
```bash
git clone https://github.com/panovark/Wordle.git
cd wordle
# then open the page:
start index.html   # Windows
open index.html    # macOS
xdg-open index.html  # Linux
