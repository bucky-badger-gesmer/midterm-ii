# Three Algorithms for Generating a 4-Digit Secret Number (No Repeated Digits)

## Algorithm 1: Fisher-Yates Shuffle on Digit Array

**Approach:** Start with an array of digits `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`, shuffle it using the Fisher-Yates algorithm, then take the first 4 elements.

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

**Pros:**
- Guarantees uniqueness by construction — no need to check for duplicates.
- Uniform distribution across all valid combinations.
- Well-known, battle-tested algorithm.

**Cons:**
- Shuffles all 10 digits even though we only need 4.
- Slightly more code than simpler approaches.

---

## Algorithm 2: Sequential Random Pick with Exclusion

**Approach:** Build the 4-digit number one digit at a time. Maintain a set of available digits, pick one randomly, then remove it from the pool before picking the next.

```ts
function generateSecret(): string {
  const available = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let secret = "";
  for (let i = 0; i < 4; i++) {
    const remaining = Array.from(available);
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    secret += pick.toString();
    available.delete(pick);
  }
  return secret;
}
```

**Pros:**
- Intuitive and easy to understand — mirrors how a human would pick digits.
- Only does exactly 4 random selections.
- No wasted work on digits we don't need.

**Cons:**
- Converts the Set to an Array on each iteration to enable random index access.
- Slightly more overhead per iteration due to Set operations.

---

## Algorithm 3: Rejection Sampling (Generate and Validate)

**Approach:** Generate a random 4-digit number (0000–9999), then check whether all digits are unique. If not, regenerate until a valid number is found.

```ts
function generateSecret(): string {
  let secret: string;
  do {
    const num = Math.floor(Math.random() * 10000);
    secret = num.toString().padStart(4, "0");
  } while (new Set(secret).size !== 4);
  return secret;
}
```

**Pros:**
- Extremely simple and concise — just 5 lines.
- Easy to reason about correctness.

**Cons:**
- Non-deterministic runtime — could theoretically loop many times (though in practice ~50% of 4-digit numbers have unique digits, so it averages ~2 attempts).
- Wastes generated numbers that fail the uniqueness check.

---

## Recommendation

**Algorithm 1 (Fisher-Yates Shuffle)** is the best choice for this game. It guarantees uniqueness in a single pass, has predictable performance, and is a standard technique widely recognized in software engineering. It also provides a perfectly uniform distribution over all valid 4-digit combinations.
