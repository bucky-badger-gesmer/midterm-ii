# Pico Firme Game — Implementation Plan

## Overview
Build a Pico Firme number-guessing game using the existing React + TypeScript + Vite app. The computer picks a random 4-digit number (no repeated digits) using the Fisher-Yates Shuffle algorithm. The player guesses and receives Firme/Pico feedback until they guess correctly.

## Game Rules
- The computer chooses a random 4-digit number with no repeated digits
- The player guesses the number
- **Firme**: correct digit in the correct place
- **Pico**: correct digit present but in the wrong place
- The game continues until the player guesses the correct number

## Secret Number Generation: Fisher-Yates Shuffle

```ts
function generateSecret(): string {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits.slice(0, 4).join("");
}
```

Shuffle all 10 digits in-place, then take the first 4. This guarantees uniqueness in a single pass with uniform distribution.

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/generateSecret.ts` | Create | Fisher-Yates shuffle to produce the secret number |
| `src/evaluateGuess.ts` | Create | Compare guess to secret, return Firme and Pico counts |
| `src/App.tsx` | Modify | Replace starter content with game UI and logic |
| `src/App.css` | Modify | Replace starter styles with game styles |

## Implementation Steps

### Step 1: Create `src/generateSecret.ts`
- Export a `generateSecret()` function that returns a `string`
- Implement Fisher-Yates shuffle on `[0, 1, 2, ..., 9]`
- Slice the first 4 elements and join them into a string

### Step 2: Create `src/evaluateGuess.ts`
- Export an `evaluateGuess(secret: string, guess: string)` function
- Return an object `{ firpicoCount: number; picoCount: number }`
- For each position `i` in the guess:
  - If `guess[i] === secret[i]` → count as Firme
  - Else if `secret.includes(guess[i])` → count as Pico

### Step 3: Update `src/App.tsx`

**State variables:**
- `secret: string` — the generated secret number
- `currentGuess: string` — the player's current input
- `guessHistory: Array<{ guess: string; firpicoCount: number; picoCount: number }>` — record of all guesses
- `gameWon: boolean` — whether the player has won

**Game flow:**
1. On mount, call `generateSecret()` to set the secret
2. Player types a 4-digit guess into an input field
3. On submit, validate the input:
   - Must be exactly 4 digits
   - Must contain only numeric characters
   - Must have no repeated digits
4. Call `evaluateGuess()` to get Firme and Pico counts
5. Append result to `guessHistory`
6. If Firme count is 4 → set `gameWon = true`
7. Display congratulations message with number of attempts
8. "Play Again" button resets all state and generates a new secret

**UI layout:**
- Game title
- Input field + Submit button
- Guess history table (columns: Attempt #, Guess, Firme, Pico)
- Win message + Play Again button (shown when game is won)

### Step 4: Update `src/App.css`
- Centered layout
- Styled input, button, table, and win message
- Clean, readable design

## Verification
- Run `npm run dev` and play a full game to completion
- Confirm invalid guesses are rejected with appropriate feedback
- Confirm Firme/Pico counts are accurate for various guesses
- Confirm "Play Again" resets the game correctly
- Run `npm run build` to ensure no TypeScript errors
