(function () {
  // Locked loop: Start → Clue+type Persian → Decorate(required slot) × N → Win
  // N must equal HAFTSEEN_ITEMS.length (one item per level, no skip).

  function normalizePersian(str) {
    return String(str || "")
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\u0640/g, "")
      .replace(/\u064A/g, "\u06CC")
      .replace(/\u0643/g, "\u06A9")
      .replace(/\u0629/g, "\u0647")
      .replace(/\u200C/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function looksLatinOnly(str) {
    const cleaned = String(str || "").trim();
    if (!cleaned) return false;
    return !/[\u0600-\u06FF]/.test(cleaned);
  }

  function assertContentBank() {
    const errors = [];
    if (LEVELS.length !== HAFTSEEN_ITEMS.length) {
      errors.push(
        `LEVELS (${LEVELS.length}) must equal HAFTSEEN_ITEMS (${HAFTSEEN_ITEMS.length}).`
      );
    }
    const itemIds = new Set(HAFTSEEN_ITEMS.map((item) => item.id));
    const usedItemIds = new Set();
    LEVELS.forEach((level) => {
      if (!itemIds.has(level.itemId)) {
        errors.push(`${level.id} has unknown itemId "${level.itemId}".`);
      }
      if (usedItemIds.has(level.itemId)) {
        errors.push(`Duplicate reward item "${level.itemId}".`);
      }
      usedItemIds.add(level.itemId);
    });
    HAFTSEEN_ITEMS.forEach((item) => {
      if (
        !item.en ||
        !item.name ||
        !item.finglish ||
        !item.emoji ||
        !item.symbol ||
        !item.symbolShort ||
        typeof item.eatable !== "boolean" ||
        !item.colorHint
      ) {
        errors.push(`Haft-Seen item "${item.id}" is missing learner fields.`);
      }
      if (!Array.isArray(item.accepted) || item.accepted.length < 1) {
        errors.push(`Haft-Seen item "${item.id}" needs accepted Persian spellings.`);
      }
      if (!Array.isArray(item.clues) || item.clues.length < 2) {
        errors.push(`Haft-Seen item "${item.id}" needs at least 2 clues.`);
      }
    });
    if (!Array.isArray(CELEBRATION_STICKERS) || CELEBRATION_STICKERS.length < 4) {
      errors.push("CELEBRATION_STICKERS must include celebration stickers.");
    }
    if (errors.length) {
      console.error("Decorate Haft-Seen content bank errors:\n- " + errors.join("\n- "));
    }
  }

  assertContentBank();

  const screens = {
    start: document.getElementById("screen-start"),
    play: document.getElementById("screen-play"),
    decorate: document.getElementById("screen-decorate"),
    win: document.getElementById("screen-win"),
  };

  const levelPathEl = document.getElementById("level-path");
  const levelLabelEl = document.getElementById("level-label");
  const progressLabelEl = document.getElementById("progress-label");
  const playSlotsEl = document.getElementById("sofreh-play-slots");
  const playCaptionEl = document.getElementById("sofreh-play-caption");
  const clueCountEl = document.getElementById("clue-count");
  const pictureFrameEl = document.getElementById("picture-frame");
  const pictureEmojiEl = document.getElementById("picture-emoji");
  const clueListEl = document.getElementById("clue-list");
  const answerInputEl = document.getElementById("answer-input");
  const checkBtn = document.getElementById("btn-check");
  const clueFeedbackEl = document.getElementById("clue-feedback");
  const decorateMetaEl = document.getElementById("decorate-meta");
  const decorateLedeEl = document.getElementById("decorate-lede");
  const dropZoneEl = document.getElementById("sofreh-drop");
  const dropSlotsEl = document.getElementById("sofreh-drop-slots");
  const dropHintEl = document.getElementById("drop-hint");
  const trayEl = document.getElementById("item-tray");
  const continueBtn = document.getElementById("btn-continue");
  const winLineEl = document.getElementById("win-line");
  const finaleSlotsEl = document.getElementById("sofreh-finale-slots");
  const stickerLayerEl = document.getElementById("sticker-layer");
  const stickerRowEl = document.getElementById("sticker-row");
  const startBtn = document.getElementById("btn-start");
  const againBtn = document.getElementById("btn-again");

  const state = {
    levelIndex: 0,
    placedIds: [],
    failCount: 0,
    locked: false,
    decoratePlacedThisRound: false,
    dragId: null,
    selectedSlotId: null,
    slotOrder: HAFTSEEN_ITEMS.map((item) => item.id),
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
      const active = key === name;
      el.hidden = !active;
      el.classList.toggle("is-active", active);
    });
  }

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shuffleSlotOrder() {
    state.slotOrder = shuffle(HAFTSEEN_ITEMS.map((item) => item.id));
  }

  function currentLevel() {
    return LEVELS[state.levelIndex];
  }

  function rewardItem() {
    return itemById(currentLevel().itemId);
  }

  function itemById(id) {
    return HAFTSEEN_ITEMS.find((item) => item.id === id);
  }

  function itemLabel(item) {
    return `${item.en} — ${item.finglish} / ${item.name}`;
  }

  function shortItemLabel(item) {
    return `${item.en} (${item.finglish})`;
  }

  function isAnswerCorrect(item, raw) {
    const normalized = normalizePersian(raw);
    if (!normalized) return false;
    return item.accepted.some((form) => normalizePersian(form) === normalized);
  }

  function renderLevelPath() {
    levelPathEl.innerHTML = "";
    LEVELS.forEach((level, index) => {
      const item = itemById(level.itemId);
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${item.emoji} ${item.en}`;
      li.title = shortItemLabel(item);
      levelPathEl.appendChild(li);
    });
  }

  function renderNamedSlots(targetEl, options) {
    const {
      placedIds,
      interactive = false,
      showEmptyLabels = true,
    } = options;

    targetEl.innerHTML = "";
    state.slotOrder.forEach((slotId) => {
      const item = itemById(slotId);
      if (!item) return;
      const placed = placedIds.includes(item.id);
      const li = document.createElement("li");
      li.className = "sofreh-slot";
      li.dataset.slot = item.id;
      if (placed) li.classList.add("is-placed");
      if (interactive && !placed) li.classList.add("is-droppable");

      // Table shows symbols only — never the Persian/Finglish answer.
      if (placed) {
        li.title = item.symbol;
        li.setAttribute("aria-label", `${item.symbolShort} slot filled`);
        li.innerHTML = `
          <span class="sofreh-emoji">${item.emoji}</span>
          <span class="slot-label">${item.symbolShort}</span>
        `;
      } else if (showEmptyLabels) {
        li.title = item.symbol;
        li.setAttribute("aria-label", `Slot for ${item.symbolShort}`);
        li.innerHTML = `<span class="slot-label">${item.symbolShort}</span>`;
      } else {
        li.setAttribute("aria-label", "Empty sofreh slot");
        li.innerHTML = `<span class="slot-label">·</span>`;
      }

      if (interactive && !placed) {
        li.addEventListener("dragover", (event) => {
          if (state.decoratePlacedThisRound) return;
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
          li.classList.add("is-over");
          dropZoneEl.classList.add("is-over");
        });
        li.addEventListener("dragleave", () => {
          li.classList.remove("is-over");
        });
        li.addEventListener("drop", (event) => {
          event.preventDefault();
          event.stopPropagation();
          li.classList.remove("is-over");
          dropZoneEl.classList.remove("is-over");
          const id = event.dataTransfer.getData("text/plain") || state.dragId;
          if (id) placeItemOnSlot(id, item.id);
        });
        li.addEventListener("click", () => {
          if (state.decoratePlacedThisRound) return;
          if (state.dragId) {
            placeItemOnSlot(state.dragId, item.id);
            return;
          }
          state.selectedSlotId = item.id;
          [...targetEl.children].forEach((child) => {
            child.classList.toggle("is-selected", child.dataset.slot === item.id);
          });
          dropHintEl.textContent = `Selected “${item.symbolShort}” — tap the tray item`;
        });
      }

      targetEl.appendChild(li);
    });
  }

  function updatePlaySofreh() {
    renderNamedSlots(playSlotsEl, {
      placedIds: state.placedIds,
      interactive: false,
      showEmptyLabels: true,
    });
    if (state.placedIds.length === 0) {
      playCaptionEl.textContent = "Solve a clue to unlock its sofreh item.";
    } else {
      const last = itemById(state.placedIds[state.placedIds.length - 1]);
      playCaptionEl.textContent = `${shortItemLabel(last)} is on the sofreh.`;
    }
  }

  function renderClueRound() {
    const item = rewardItem();
    const level = currentLevel();
    state.failCount = 0;
    state.locked = false;

    levelLabelEl.textContent = `${level.label} · ${state.levelIndex + 1}/${LEVELS.length}`;
    progressLabelEl.textContent = `${state.placedIds.length}/${HAFTSEEN_ITEMS.length} placed`;
    clueCountEl.textContent = `Clue ${state.levelIndex + 1} of ${LEVELS.length}`;

    pictureEmojiEl.textContent = item.emoji;
    pictureFrameEl.classList.remove("is-correct");
    void pictureFrameEl.offsetWidth;
    pictureFrameEl.classList.add("is-enter");

    clueListEl.innerHTML = "";
    item.clues.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      clueListEl.appendChild(li);
    });

    answerInputEl.value = "";
    answerInputEl.disabled = false;
    checkBtn.disabled = false;
    clueFeedbackEl.textContent = "";
    clueFeedbackEl.classList.remove("is-bad", "is-ok");

    updatePlaySofreh();
    showScreen("play");
    window.setTimeout(() => answerInputEl.focus(), 50);
  }

  function onCheckAnswer() {
    if (state.locked) return;
    const item = rewardItem();
    const raw = answerInputEl.value;

    if (!String(raw || "").trim()) {
      clueFeedbackEl.textContent = "Please write the Persian word.";
      clueFeedbackEl.classList.add("is-bad");
      clueFeedbackEl.classList.remove("is-ok");
      return;
    }

    if (looksLatinOnly(raw)) {
      clueFeedbackEl.textContent = "Please write the name in Persian script, like سکه.";
      clueFeedbackEl.classList.add("is-bad");
      clueFeedbackEl.classList.remove("is-ok");
      return;
    }

    if (isAnswerCorrect(item, raw)) {
      state.locked = true;
      answerInputEl.disabled = true;
      checkBtn.disabled = true;
      pictureFrameEl.classList.add("is-correct");
      clueFeedbackEl.classList.remove("is-bad");
      clueFeedbackEl.classList.add("is-ok");
      clueFeedbackEl.innerHTML = `Correct! <span lang="fa" dir="rtl">${item.name}</span> — ${item.finglish} — ${item.symbol}`;
      window.setTimeout(openDecorate, 900);
      return;
    }

    state.failCount += 1;
    clueFeedbackEl.classList.add("is-bad");
    clueFeedbackEl.classList.remove("is-ok");
    if (state.failCount >= 2) {
      clueFeedbackEl.textContent = `Not quite — try again. Hint: ${item.finglish}`;
    } else {
      clueFeedbackEl.textContent = "Not quite — try again.";
    }
  }

  function renderTray() {
    trayEl.innerHTML = "";
    const item = rewardItem();
    if (!item || state.decoratePlacedThisRound) {
      const label = item ? shortItemLabel(item) : "This item";
      trayEl.innerHTML = `<li class="tray-empty">${label} is on the sofreh. Click Continue.</li>`;
      return;
    }

    const li = document.createElement("li");
    li.className = "tray-item";
    li.draggable = true;
    li.dataset.id = item.id;
    li.setAttribute("aria-label", `Drag ${itemLabel(item)} onto its slot`);
    li.innerHTML = `
      <span class="tray-emoji">${item.emoji}</span>
      <span class="tray-en">${item.en}</span>
      <span class="tray-finglish">${item.finglish} · <span lang="fa" dir="rtl">${item.name}</span></span>
    `;

    li.addEventListener("dragstart", (event) => {
      if (state.decoratePlacedThisRound) {
        event.preventDefault();
        return;
      }
      state.dragId = item.id;
      li.classList.add("is-dragging");
      event.dataTransfer.setData("text/plain", item.id);
      event.dataTransfer.effectAllowed = "copy";
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("is-dragging");
      state.dragId = null;
      dropZoneEl.classList.remove("is-over");
      [...dropSlotsEl.querySelectorAll(".is-over")].forEach((el) => {
        el.classList.remove("is-over");
      });
    });

    li.addEventListener("click", () => {
      if (state.decoratePlacedThisRound) return;
      if (state.selectedSlotId) {
        placeItemOnSlot(item.id, state.selectedSlotId);
        return;
      }
      state.dragId = item.id;
      li.classList.add("is-armed");
      dropHintEl.textContent = "Tap the symbol slot that matches this item";
    });

    trayEl.appendChild(li);
  }

  function placeItemOnSlot(itemId, slotId) {
    if (state.decoratePlacedThisRound) return false;
    const expected = currentLevel().itemId;
    const item = itemById(expected);

    if (itemId !== expected) {
      decorateLedeEl.textContent = `Place ${shortItemLabel(item)} on its matching slot.`;
      shakeDecorate();
      return false;
    }

    if (slotId !== expected) {
      const wrongSlot = itemById(slotId);
      decorateLedeEl.textContent = `Not that symbol (“${wrongSlot.symbolShort}”). Think what ${item.en} stands for, then try another slot.`;
      shakeDecorate();
      const slotEl = dropSlotsEl.querySelector(`[data-slot="${slotId}"]`);
      if (slotEl) {
        slotEl.classList.add("is-wrong");
        window.setTimeout(() => slotEl.classList.remove("is-wrong"), 500);
      }
      return false;
    }

    if (state.placedIds.includes(itemId)) return false;

    state.placedIds.push(itemId);
    state.decoratePlacedThisRound = true;
    state.dragId = null;
    state.selectedSlotId = null;
    renderNamedSlots(dropSlotsEl, {
      placedIds: state.placedIds,
      interactive: false,
      showEmptyLabels: true,
    });
    renderTray();
    dropHintEl.textContent = `${shortItemLabel(item)} added — continue when ready`;
    decorateLedeEl.textContent = `${item.name} (${item.finglish}) — ${item.symbol}`;
    dropZoneEl.classList.add("has-drop");
    continueBtn.disabled = false;
    continueBtn.textContent =
      state.levelIndex >= LEVELS.length - 1 ? "Finish & celebrate" : "Next item";
    return true;
  }

  function shakeDecorate() {
    dropZoneEl.classList.remove("is-shake");
    void dropZoneEl.offsetWidth;
    dropZoneEl.classList.add("is-shake");
  }

  function openDecorate() {
    const level = currentLevel();
    const item = rewardItem();
    state.decoratePlacedThisRound = false;
    state.dragId = null;
    state.selectedSlotId = null;
    decorateMetaEl.textContent = `${level.label} solved`;
    decorateLedeEl.textContent = `Required: drag or tap ${shortItemLabel(item)} onto the symbol it stands for.`;
    renderNamedSlots(dropSlotsEl, {
      placedIds: state.placedIds,
      interactive: true,
      showEmptyLabels: true,
    });
    renderTray();
    dropHintEl.textContent = "Drop on the matching symbol slot";
    dropZoneEl.classList.toggle("has-drop", state.placedIds.length > 0);
    continueBtn.disabled = true;
    continueBtn.textContent =
      state.levelIndex >= LEVELS.length - 1 ? "Finish & celebrate" : "Next item";
    showScreen("decorate");
  }

  function advanceAfterDecorate() {
    if (!state.decoratePlacedThisRound) {
      decorateLedeEl.textContent =
        "Place this item on its matching sofreh slot before you continue.";
      return;
    }
    if (state.levelIndex >= LEVELS.length - 1) {
      showWin();
      return;
    }
    state.levelIndex += 1;
    renderClueRound();
  }

  function launchStickers() {
    stickerLayerEl.innerHTML = "";
    stickerRowEl.innerHTML = "";

    const showcase = CELEBRATION_STICKERS.slice(0, 8);
    showcase.forEach((sticker, index) => {
      const badge = document.createElement("span");
      badge.className = "sticker-badge";
      badge.style.setProperty("--delay", `${index * 0.08}s`);
      badge.textContent = sticker;
      stickerRowEl.appendChild(badge);
    });

    for (let i = 0; i < 28; i += 1) {
      const burst = document.createElement("span");
      burst.className = "sticker-burst";
      burst.textContent = CELEBRATION_STICKERS[i % CELEBRATION_STICKERS.length];
      burst.style.setProperty("--x", `${8 + Math.random() * 84}%`);
      burst.style.setProperty("--delay", `${Math.random() * 0.9}s`);
      burst.style.setProperty("--spin", `${Math.random() > 0.5 ? 1 : -1}`);
      burst.style.setProperty("--size", `${1.2 + Math.random() * 1.4}rem`);
      stickerLayerEl.appendChild(burst);
    }
  }

  function showWin() {
    winLineEl.textContent = WIN_LINE;
    renderNamedSlots(finaleSlotsEl, {
      placedIds: state.placedIds,
      interactive: false,
      showEmptyLabels: false,
    });
    launchStickers();
    showScreen("win");
  }

  function resetGame() {
    state.levelIndex = 0;
    state.placedIds = [];
    state.failCount = 0;
    state.locked = false;
    state.decoratePlacedThisRound = false;
    state.dragId = null;
    state.selectedSlotId = null;
    shuffleSlotOrder();
    stickerLayerEl.innerHTML = "";
    stickerRowEl.innerHTML = "";
    showScreen("start");
  }

  checkBtn.addEventListener("click", onCheckAnswer);
  answerInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onCheckAnswer();
    }
  });

  startBtn.addEventListener("click", () => {
    state.levelIndex = 0;
    state.placedIds = [];
    shuffleSlotOrder();
    renderClueRound();
  });

  continueBtn.addEventListener("click", advanceAfterDecorate);
  againBtn.addEventListener("click", resetGame);

  shuffleSlotOrder();
  renderLevelPath();
  showScreen("start");
})();
