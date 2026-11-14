# Decorate Yalda Night

A static browser game for learning Persian through Yalda night.

**Sister game:** [Decorate Haft-Seen (Nowruz)](haftseen/) — clue riddles, type Persian, place items on the Haft-Seen sofreh.

## How to play

1. Open [`index.html`](index.html) in any modern browser (double-click or drag into Chrome/Edge/Firefox).
2. Click **Start learning**.
3. Answer **5 English questions** per level (choices show **Persian + Finglish**).
4. After each level, **drag or tap** that level’s item onto the sofreh (required — no skip).
5. Complete all **6 levels / 6 items**, then enjoy the sticker celebration.

## Learning design

| Piece | Language |
| --- | --- |
| UI, instructions, feedback | English |
| Questions | English — Yalda sofreh & culture |
| Answer choices | Persian script + Finglish |
| Sofreh item labels | English + Finglish (+ Persian in tray) |

Difficulty rises across levels:

1. Easy Yalda table (items 1–3)
2. Medium Yalda culture (items 4–5)
3. Hard Yalda culture (item 6)

## Project files

| File | Role |
| --- | --- |
| `index.html` | Screens: start, quiz, decorate, win |
| `styles.css` | Night theme, sofreh, drag tray, stickers |
| `questions.js` | Sofreh items, 6 levels × 5 questions, stickers |
| `game.js` | Game loop, shuffle, drag/tap decorate, celebration |

## Locked game loop

`Start → Quiz (5 correct) → Decorate (required) × 6 → Win stickers`

`LEVELS.length` must always equal `SOFREH_ITEMS.length`. The game checks this on load.
