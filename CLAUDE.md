# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web-based Tamagotchi (電子雞) — a virtual pet game faithfully recreating classic Tamagotchi P1 mechanics with pixel-art graphics on a GameBoy-green LCD. Pure frontend, vanilla JS, no build tools or dependencies. Open `index.html` in a browser to run.

## Development

No build step, no test suite, no linter. Serve locally with any static server:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. State persists in `localStorage` (key `tamagotchi_save`); clear it via DevTools to reset the pet.

## File Layout

```
index.html   # Device shell + DOM scaffolding
style.css    # Styling and animations
game.js      # All game logic (~800 lines, single file)
docs/        # SPEC.md, PLAN.md, TASKS.md — design references
```

- **index.html** — Egg-shaped device chrome: chain, flames, silver notched screen frame, 8 icon borders (4 top + 4 bottom), LCD with canvas + 4 overlay layers + hearts bar + attention `!` + floating emoji + message bar, 3 round buttons (A/B/C), language switcher.
- **style.css** — Dark egg shell with flame decorations, GameBoy LCD (`#9bbc0f`), pixel grid overlay via `repeating-linear-gradient`, icon-active state, `light-off` dimming, blinking attention icon. Pixel-feel animations use `step-end` timing. Responsive scaling via `--scale` CSS variable across media queries.
- **game.js** — Self-contained game runtime. Sections in order:
  1. **i18n** (`I18N`, `LANG`, `t()`) — zh / en / ja string tables; language persisted as `tama_lang`.
  2. **Sprites** (`SPRITES`) — 10 characters as 16×16 string arrays. Color codes: `0`=transparent, `1`=dark outline, `2`=mid/sick tone, `3`=body fill. Plus `POOP_SPRITE` (4×4) and `ZZZ` (2-frame anim). `COLORS` / `SICK_COLORS` maps the codes to greens.
  3. **Character data** (`CHARS`) — Per-character `stage` / hunger-rate `hr` / happiness-rate `hpr` in minutes / `sleep` & `wake` `HH:MM` / base weight `bw` / `maxAge` in days.
  4. **State** (`S`) — Mutable pet state: stats, flags, timestamps, attention system, animation frame. Mirrored to `localStorage` on save.
  5. **UI state** (`UI`) — `mode` (`main` / `icon-select` / `feed` / `game` / `status` / `attention`), icon selection, feed-menu choice, mini-game state.
  6. **DOM refs** — Cached at module load; `PX = 9` is the canvas pixel scale.
  7. **`init()`** — Loads save, sets up render/tick/save intervals (500 ms / 5 s / 10 s), wires buttons, keyboard, canvas click, language switcher.
  8. **`tick()`** — Main loop (every 5 s): runs sleep/wake, stat decay, poop generation, discipline calls, 15-min care-mistake timer, sickness from starvation, evolution checks, natural death.
  9. **Action handlers** — `openFeed` / `doFeed`, `toggleLight`, `doMedicine`, `doClean`, `doDiscipline`, `showStatus`, `showAttention`, `startGame` / `gameNextRound` / `gameGuess`, `petClick`.
  10. **Render & draw** — `render()` updates hearts and info; `drawPet()` renders the canvas (sprite + sleep eyes + dead eyes + Zzz + skull + poop).
  11. **Messages** — `showMsg()` (3 s text bar) and `showFloat()` (1.5 s floating emoji).
  12. **Save / Load** — `localStorage` key `tamagotchi_save`, JSON, `version: 2`. Loads recompute offline decay (hunger / happiness / poop / age / care mistakes from elapsed time).

## Controls

| Button | Keys | Action |
|--------|------|--------|
| A | `A` / `←` | Enter icon menu / cycle to next icon / left-guess in mini-game / toggle feed choice |
| B | `S` / `Enter` / `↓` | Activate icon / confirm / right-guess in mini-game / advance mini-game / dismiss overlay |
| C | `D` / `Esc` / `→` | Cancel / close overlay / quit mini-game |

The pet sprite is clickable (`petClick`) for a "pet me" reaction with random emoji + message — only when alive, awake, not sick, and `UI.mode === 'main'`.

8 icons (`activateIcon` indices): `0` Feed, `1` Light, `2` Game, `3` Medicine, `4` Clean, `5` Discipline, `6` Status, `7` Attention.

## Game Mechanics

- **Hearts**: Hunger and Happiness are 0–4, rendered as `♥/♡`.
- **Feeding**: Meal (+1 hunger, +1g, refused at 4♥) vs Snack (+1 happiness, +2g).
- **Mini-game**: 5 rounds of left/right guess. ≥3 → happiness +1; 5/5 → happiness +2. Always weight −1 (floored at base weight). Disabled while sick, sleeping, or starving.
- **Discipline**: 0–100% in 25% steps. Pet "misbehaves" on a per-stage interval (15 min baby / 2 h others, capped at `maxDisciplineCalls`); answer via the Discipline icon.
- **Poop**: Every 15 min (baby) or 3 h (other). Cap 4 on screen → auto-sick. Clean removes all.
- **Sleep**: Auto-sleep/wake by real-clock hour per character's `sleep` / `wake`. Wake increments `age` by 1 day. Must turn the light off within 15 min of sleeping.
- **Care mistakes**: Triggers — hunger 0, happiness 0, light not off at night, sick untreated. Each starts a 15-min attention timer; un-cleared at expiry = `careMistakes++`. Affects teen path and adult lifespan.
- **Evolution** (`checkEvolution`):
  - `babytchi` → `marutchi` at 65 min from birth
  - `marutchi` → `tamatchi` (≤1 mistake) or `kuchitamatchi` (>1 mistake) at age 3
  - `tamatchi` → `mametchi` (100% disc) / `ginjirotchi` (≥75%) / `maskutchi` (else) at age 6
  - `kuchitamatchi` → `kuchipatchi` (≥75%) / `nyorotchi` (≥50%) / `tarakotchi` (else) at age 6
- **Death**: Age ≥ `maxAge`, or adult with ≥5 care mistakes. Disables buttons and dims sprite.

## Save Format

- **Key**: `tamagotchi_save` (language stored separately as `tama_lang`)
- **Version**: `2` — mismatched versions are wiped on load.
- **Offline decay**: On `load()`, elapsed time since `lastUpdate` is converted into hunger drops, happiness drops, new poops (capped at 4), aged days (24 h each), and capped care-mistake increments. Sleep/light flags are reset so the pet wakes up "fresh" on reopen.

## Sprite Editing

Sprites are 16-row × 16-char grids. To add a character:
1. Add a 16-row entry to `SPRITES` using `0` / `1` / `2` / `3`.
2. Add a matching entry to `CHARS` with stage, rates, sleep schedule, base weight, max age.
3. Reference it in `checkEvolution()` so it's reachable.
4. If it has unique tinting, extend `COLORS` / `SICK_COLORS`.

## Internationalization

Three locales in `I18N`: `zh` (default), `en`, `ja`. Add a new locale by extending `I18N` with the same key set and adding a `.lang-btn` in `index.html` with `data-lang="<code>"`. Use `t(key)` everywhere user-facing — never hard-code display strings.

## Deployment

Hosted on GitHub Pages from `main`. Pushing to `main` redeploys. Live URL: https://warrenlin.github.io/Tamagotchi/.

## Conventions for Edits

- Keep `game.js` as a single flat file — no modules, no bundler.
- Stat math is integer-clamped; preserve the 0–4 / 0–100 ranges when adding features.
- Time units are milliseconds throughout; convert minutes via `* 60000`.
- Any new user-facing string belongs in `I18N` for all three locales.
- Don't introduce frameworks, build steps, or external assets. Sprites and UI are drawn from arrays / CSS only.

## Reference Docs

- `docs/SPEC.md` — Full P1 mechanics spec used as the design source.
- `docs/PLAN.md` — Original 4-phase implementation plan (complete).
- `docs/TASKS.md` — Granular task checklist.
