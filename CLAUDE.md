# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web-based Tamagotchi (電子雞) — a virtual pet game styled after the classic Tamagotchi device with pixel art graphics. Pure frontend, no build tools or dependencies. Open `index.html` in a browser to run.

## Development

No build step. Serve locally with:
```bash
python3 -m http.server 8080
```
No test suite or linter is configured.

## Architecture

Three files, all in the root directory:

- **index.html** — Device shell structure: egg-shaped body with chain, screen frame with icon borders, LCD screen area (canvas), status bars, 3 round buttons (A/B/C), and a pop-up action menu.
- **style.css** — Classic Tamagotchi device styling: dark egg shell with flame decorations, silver notched screen frame, GameBoy-green LCD (`#c8dc78`), pixel grid overlay, star background, action menu. All animations use `step-end` timing for pixel-art feel.
- **game.js** — All game logic in a single file, structured as:
  - **Sprite data** (top ~200 lines): 16×16 pixel art defined as string arrays. Color codes: 0=transparent, 1=dark outline, 2=mid/sick, 3=body, 4=beak, 5=crest, 6=feet. The pet is a chick (小雞) character.
  - **State object**: happiness, hunger, energy, cleanliness (0–100), plus age, alive, sick, sleeping flags.
  - **Canvas rendering** (`drawPet()`): Reads sprite arrays and draws colored rectangles at `PIXEL` (10px) scale. Animation alternates `animFrame` between 0/1 every 500ms.
  - **Game loop**: `decayStats()` runs every 5s, age increments every 60s, auto-save every 10s.
  - **3-button interface**: A=open menu or navigate up, B=confirm, C=navigate down or close. Keyboard: A/S/D or arrow keys.
  - **Persistence**: `localStorage` with key `tamagotchi_save`. On load, calculates offline stat decay based on elapsed time.

## Sprite Editing

Each sprite is a 16-element array of 16-char strings (16×16 grid). Each character is a color code from the `COLORS` map. To add a new sprite state, add an entry to `SPRITES` and reference it in `drawPet()`. Paired sprites (e.g., `eating`/`eating2`) alternate for animation.

## Game Mechanics

- Stats decay every 5s; hunger drops fastest (−1.2/tick awake)
- Any stat reaching 0 triggers sickness; 30s untreated sickness causes death
- Sleep mode: energy recovers (+2/tick), other stats decay at reduced rates
- Offline decay is calculated on load, capped at 100 ticks

## Deployment

Hosted via GitHub Pages from the `main` branch. Push to `main` to deploy.
