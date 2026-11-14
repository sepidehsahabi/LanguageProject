# Decorate Haft-Seen

A static browser game for learning Persian through Nowruz and the Haft-Seen sofreh.

## How to play

1. Open [`index.html`](index.html) in any modern browser (double-click or drag into Chrome/Edge/Firefox).
2. Click **Start learning**.
3. Read English **clues** (color, eatable or not) and look at the **picture** — guess the item (symbols are only on the sofreh).
4. **Type the Persian name** and press Check.
5. **Drag or tap** that item onto its matching sofreh symbol slot (required — no skip).
6. Complete all **10 items**, then enjoy the sticker celebration.

## Learning design

| Piece | Language |
| --- | --- |
| UI, clues, feedback | English |
| Typed answers | Persian script |
| Soft hint after 2 fails | Finglish |
| Sofreh slot labels | English symbols only (never the answer name) |

## Project files

| File | Role |
| --- | --- |
| `index.html` | Screens: start, clue play, decorate, win |
| `styles.css` | Spring theme, picture frame, RTL input, slotted sofreh |
| `questions.js` | 10 Haft-Seen items, clues, accepted spellings, stickers |
| `game.js` | Persian normalize/check, clue loop, slot decorate, celebration |

## Locked game loop

`Start → Clue + type Persian → Decorate (required slot) × 10 → Win stickers`

`LEVELS.length` must always equal `HAFTSEEN_ITEMS.length`. The game checks this on load.
