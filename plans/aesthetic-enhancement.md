# Pico Firme -- Aesthetic Enhancement Plan

## Context

The game is functional but uses default Vite template styling. This plan transforms it into a polished, visually distinctive game using only vanilla CSS + minimal JSX tweaks. No new npm dependencies.

## Files to Modify

| File | Scope of change |
|------|----------------|
| `index.html` | Title text, Google Fonts link |
| `src/index.css` | CSS custom properties, animated gradient bg, remove light-mode query |
| `src/App.css` | Full restyle (~80% of work) |
| `src/App.tsx` | 2 small JSX changes (class names + confetti spans) |

**Not modified:** `generateSecret.ts`, `evaluateGuess.ts`, `main.tsx`

---

## Implementation Steps

### 1. `index.html` -- Title & Fonts
- Change `<title>` from "midterm-ii" to "Pico Firme"
- Add Google Fonts CDN link for `Orbitron` (display) and `Inter` (body)

### 2. `src/index.css` -- Global Theme
- Add CSS custom properties (`--bg-primary`, `--accent`, `--green`, `--orange`, `--radius`, `--font-display`, `--font-body`, etc.)
- Replace flat `#242424` background with animated gradient (`#0f0f1a` -> `#1a1a2e` -> `#16213e`, 15s infinite shift)
- Set `font-family: var(--font-body)` on body
- Remove `@media (prefers-color-scheme: light)` block (dark-only design)

### 3. `src/App.css` -- Component Styles (in order)

**3a. Game container** -- glassmorphism card with `backdrop-filter: blur(20px)`, rounded corners (20px), subtle border + shadow

**3b. Title** -- `font-family: var(--font-display)`, gradient text (`#646cff` -> `#a78bfa`) using `-webkit-background-clip: text`

**3c. Rules text** -- left-aligned with accent left-border, muted color, max-width for readability

**3d. Input & Button** -- glass-style input with focus glow ring, gradient button with hover lift (`translateY(-1px)`) + shadow

**3e. Error message** -- shake animation (0.4s horizontal wobble)

**3f. History table** -- `border-collapse: separate` with `border-spacing: 0 0.5rem` for card-row look, slide-in animation for new rows, highlighted last row

**3g. Firme/Pico badges** -- green color + glow for Firme, orange for Pico, muted when zero

**3h. Win message** -- pop-in scale animation, gradient background, floating emoji pseudo-elements, green gradient "Play Again" button with hover lift

**3i. CSS confetti** -- fixed overlay with 20 `<span>` particles falling + rotating, varied colors/positions/delays via `nth-child`

**3j. Responsive** -- stack form vertically on mobile, adjust font sizes and padding at `max-width: 480px`

### 4. `src/App.tsx` -- Minimal JSX Changes

**4a.** Add `className` to Firme/Pico `<td>` cells:
```tsx
<td className={`firme-cell${record.firmeCount === 0 ? ' zero' : ''}`}>
<td className={`pico-cell${record.picoCount === 0 ? ' zero' : ''}`}>
```

**4b.** Add confetti wrapper in win state:
```tsx
{gameWon && (
  <>
    <div className="confetti-wrapper">
      {Array.from({ length: 20 }, (_, i) => <span key={i} />)}
    </div>
    <div className="win-message">...</div>
  </>
)}
```

---

## Verification

1. Run `npm run dev` and play through a full game
2. Check: animated gradient background shifts smoothly
3. Check: glassmorphism card renders with blur effect
4. Check: title shows gradient text with Orbitron font
5. Check: input focus shows blue glow ring
6. Check: each new guess row slides in from above
7. Check: Firme cells glow green, Pico cells glow orange, zeros are muted
8. Check: error messages shake horizontally
9. Check: winning triggers pop-in animation + confetti particles fall
10. Check: responsive layout on narrow viewport (stack form, smaller text)
