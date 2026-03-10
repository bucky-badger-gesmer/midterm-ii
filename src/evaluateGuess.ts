export function evaluateGuess(
  secret: string,
  guess: string
): { firmeCount: number; picoCount: number } {
  let firmeCount = 0;
  let picoCount = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      firmeCount++;
    } else if (secret.includes(guess[i])) {
      picoCount++;
    }
  }

  return { firmeCount, picoCount };
}
