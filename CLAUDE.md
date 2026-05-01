# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web-based Tamagotchi (電子雞) — a virtual pet game faithfully recreating classic Tamagotchi P1 mechanics with pixel art graphics. Pure frontend, no build tools or dependencies. Open `index.html` in a browser to run.

## Development

No build step. Serve locally with:
```bash
python3 -m http.server 8080
```
No test suite or linter is configured.

## Architecture

Three source files in the root directory:

- **index.html** — Device shell: egg-shaped body, chain, silver notched screen frame, 8 icon borders (4 top + 4 bottom), LCD screen with canvas + overlays, hearts bar, 3 round buttons (A/B/C).
- **style.css** — Classic Tamagotchi styling: dark egg shell with flame decorations, GameBoy-green LCD (`#9bbc0f`), pixel grid overlay, icon highlight, light-off dimming, attention blink animation. All animations use `step-end` for pixel feel.
- **game.js** — All game logic (~450 lines), structured as:
  - **Sprites** (~80 lines): 10 character sprites as 16×16 string arrays. Colors: 0=transparent, 1=dark, 2=mid/sick, 3=body. Plus poop and Zzz sprites.
  - **Character data** (`CHARS`): Per-character hunger/happiness decay rates (minutes), sleep/wake times, base weight, max age.
  - **State** (`S`): hunger/happiness (0-4 hearts), discipline (0-100%), weight, age, poopCount, careMistakes, attention system.
  - **UI state** (`UI`): mode (main/icon-select/feed/game/status/attention), icon selection, mini-game state.
  - **8-icon navigation**: A=next icon, B=activate, C=cancel. Icons: Feed, Light, Game, Medicine, Clean, Discipline, Status, Attention.
  - **Evolution**: baby→child (65min), child→teen (age 3, by care mistakes), teen→adult (age 6, by discipline).
  - **Tick loop** (5s): hunger/happiness decay per character rate, poop generation, discipline calls, care mistake 15-min timer, sleep/wake by real clock, evolution checks.
  - **Save/Load**: localStorage key `tamagotchi_save` with version flag. Offline decay calculated on load.

## Documentation

- `docs/SPEC.md` — Complete game specification based on classic Tamagotchi P1 research
- `docs/PLAN.md` — Implementation plan (4 phases, all completed)
- `docs/TASKS.md` — Granular task checklist with completion tracking

## Game Mechanics

- **Hearts**: Hunger and Happiness use 0-4 heart system (♥/♡)
- **Feeding**: Meal (+1 hunger, +1g) vs Snack (+1 happiness, +2g). Full stomach refuses meals.
- **Mini-game**: Guess left/right, 5 rounds. ≥3 correct = happiness+1. Perfect = happiness+2. Always weight-1.
- **Discipline**: 0-100% in 25% steps. Pet "misbehaves" (calls when stats are fine) → use Discipline icon.
- **Poop**: Generated on timer (3h for non-baby). Max 4 on screen → auto-sick. Clean icon removes all.
- **Sleep**: Auto-sleep/wake based on real clock per character schedule. Must turn off light within 15 min.
- **Care mistakes**: Hunger 0, Happiness 0, light not off, sick untreated — each triggers 15-min timer. Unaddressed = +1 care mistake. Affects evolution path and lifespan.
- **Evolution**: 10 characters across 4 stages. Care mistakes determine teen path; discipline determines adult form.
- **Death**: Age exceeds max lifespan, or 5+ care mistakes as adult.

## Sprite Editing

Each sprite is a 16-element array of 16-char strings. Color codes from `COLORS` map. To add a character: add entry to `SPRITES`, add data to `CHARS`, reference in `checkEvolution()`.

## Deployment

Hosted via GitHub Pages from the `main` branch. Push to `main` to deploy.
