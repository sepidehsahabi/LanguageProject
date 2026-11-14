(function () {
  // Locked loop: Start → Quiz(5) → Decorate(required) × N → Win stickers
  // N must equal SOFREH_ITEMS.length (one reward item per level, no skip).
  const QUESTIONS_PER_LEVEL = 5;

  function assertContentBank() {
    const errors = [];
    if (LEVELS.length !== SOFREH_ITEMS.length) {
      errors.push(
        `LEVELS (${LEVELS.length}) must equal SOFREH_ITEMS (${SOFREH_ITEMS.length}).`
      );
    }
    const itemIds = new Set(SOFREH_ITEMS.map((item) => item.id));
    const usedItemIds = new Set();
    LEVELS.forEach((level) => {
      if (!level.questions || level.questions.length !== QUESTIONS_PER_LEVEL) {
        errors.push(`${level.id} must have exactly ${QUESTIONS_PER_LEVEL} questions.`);
      }
      if (!itemIds.has(level.itemId)) {
        errors.push(`${level.id} has unknown itemId "${level.itemId}".`);
      }
      if (usedItemIds.has(level.itemId)) {
        errors.push(`Duplicate reward item "${level.itemId}".`);
      }
      usedItemIds.add(level.itemId);
      (level.questions || []).forEach((question, index) => {
        if (!question.q || !Array.isArray(question.choices) || question.choices.length !== 4) {
          errors.push(`${level.id} question ${index + 1} is incomplete.`);
        }
        (question.choices || []).forEach((choice) => {
          if (!choice.fa || !choice.finglish) {
            errors.push(`${level.id} question ${index + 1} needs Persian + Finglish.`);
          }
        });
      });
    });
    SOFREH_ITEMS.forEach((item) => {
      if (!item.en || !item.name || !item.finglish || !item.emoji) {
        errors.push(`Sofreh item "${item.id}" is missing learner fields.`);
      }
    });
    if (!Array.isArray(CELEBRATION_STICKERS) || CELEBRATION_STICKERS.length < 4) {
      errors.push("CELEBRATION_STICKERS must include celebration stickers.");
    }
    if (errors.length) {
      console.error("Decorate Yalda Night content bank errors:\n- " + errors.join("\n- "));
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
  const playItemsEl = document.getElementById("sofreh-play-items");
  const playCaptionEl = document.getElementById("sofreh-play-caption");
  const quizCountEl = document.getElementById("quiz-count");
  const quizQuestionEl = document.getElementById("quiz-question");
  const quizOptionsEl = document.getElementById("quiz-options");
  const quizFeedbackEl = document.getElementById("quiz-feedback");
  const decorateMetaEl = document.getElementById("decorate-meta");
  const decorateLedeEl = document.getElementById("decorate-lede");
  const dropZoneEl = document.getElementById("sofreh-drop");
  const dropItemsEl = document.getElementById("sofreh-drop-items");
  const dropHintEl = document.getElementById("drop-hint");
  const trayEl = document.getElementById("item-tray");
  const continueBtn = document.getElementById("btn-continue");
  const winLineEl = document.getElementById("win-line");
  const finaleItemsEl = document.getElementById("sofreh-finale-items");
  const stickerLayerEl = document.getElementById("sticker-layer");
  const stickerRowEl = document.getElementById("sticker-row");
  const startBtn = document.getElementById("btn-start");
  const againBtn = document.getElementById("btn-again");

  const state = {
    levelIndex: 0,
    queue: [],
    questionIndex: 0,
    answeredInLevel: 0,
    placedIds: [],
    current: null,
    decoratePlacedThisRound: false,
    dragId: null,
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

  function currentLevel() {
    return LEVELS[state.levelIndex];
  }

  function rewardItem() {
    return itemById(currentLevel().itemId);
  }

  function itemById(id) {
    return SOFREH_ITEMS.find((item) => item.id === id);
  }

  function itemLabel(item) {
    return `${item.en} — ${item.finglish} / ${item.name}`;
  }

  function shortItemLabel(item) {
    return `${item.en} (${item.finglish})`;
  }

  function withShuffledChoices(question) {
    const paired = question.choices.map((choice, i) => ({
      choice,
      correct: i === question.answer,
    }));
    const shuffled = shuffle(paired);
    return {
      q: question.q,
      choices: shuffled.map((p) => p.choice),
      answer: shuffled.findIndex((p) => p.correct),
    };
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

  function renderSofrehSlots(targetEl, placedIds) {
    targetEl.innerHTML = "";
    placedIds.forEach((id) => {
      const item = itemById(id);
      if (!item) return;
      const li = document.createElement("li");
      li.className = "sofreh-item is-placed";
      li.title = itemLabel(item);
      li.setAttribute("aria-label", itemLabel(item));
      li.innerHTML = `
        <span class="sofreh-emoji">${item.emoji}</span>
        <span class="sofreh-mini">${item.finglish}</span>
      `;
      targetEl.appendChild(li);
    });
  }

  function updatePlaySofreh() {
    renderSofrehSlots(playItemsEl, state.placedIds);
    if (state.placedIds.length === 0) {
      playCaptionEl.textContent = "Finish a level to unlock its sofreh item.";
    } else {
      const last = itemById(state.placedIds[state.placedIds.length - 1]);
      playCaptionEl.textContent = `${shortItemLabel(last)} is on the sofreh.`;
    }
  }

  function renderQuestion() {
    state.current = withShuffledChoices(state.queue[state.questionIndex]);
    quizCountEl.textContent = `Question ${state.answeredInLevel + 1} of ${QUESTIONS_PER_LEVEL}`;
    quizQuestionEl.textContent = state.current.q;
    quizFeedbackEl.textContent = "";
    quizFeedbackEl.classList.remove("is-bad");
    quizOptionsEl.innerHTML = "";

    state.current.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.innerHTML = `
        <span class="option-fa" lang="fa" dir="rtl">${choice.fa}</span>
        <span class="option-finglish">${choice.finglish}</span>
      `;
      btn.addEventListener("click", () => onAnswer(i));
      quizOptionsEl.appendChild(btn);
    });
  }

  function lockOptions(correctIndex, chosenIndex) {
    [...quizOptionsEl.children].forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIndex) btn.classList.add("is-correct");
      if (i === chosenIndex && chosenIndex !== correctIndex) {
        btn.classList.add("is-wrong");
      }
    });
  }

  function onAnswer(choiceIndex) {
    const q = state.current;
    if (choiceIndex === q.answer) {
      lockOptions(q.answer, choiceIndex);
      quizFeedbackEl.textContent = "Correct!";
      quizFeedbackEl.classList.remove("is-bad");
      state.answeredInLevel += 1;
      progressLabelEl.textContent = `${state.answeredInLevel}/${QUESTIONS_PER_LEVEL} correct`;

      if (state.answeredInLevel >= QUESTIONS_PER_LEVEL) {
        window.setTimeout(openDecorate, 700);
        return;
      }

      state.questionIndex += 1;
      window.setTimeout(renderQuestion, 650);
      return;
    }

    lockOptions(q.answer, choiceIndex);
    quizFeedbackEl.textContent = "Not quite — try again.";
    quizFeedbackEl.classList.add("is-bad");

    window.setTimeout(() => {
      [...quizOptionsEl.children].forEach((option) => {
        option.disabled = false;
        option.classList.remove("is-correct", "is-wrong");
      });
      quizFeedbackEl.textContent = "Pick another answer.";
      quizFeedbackEl.classList.remove("is-bad");
    }, 850);
  }

  function renderTray() {
    trayEl.innerHTML = "";
    const item = rewardItem();
    if (!item || state.placedIds.includes(item.id) || state.decoratePlacedThisRound) {
      const label = item ? shortItemLabel(item) : "This item";
      trayEl.innerHTML = `<li class="tray-empty">${label} is on the sofreh. Click Continue.</li>`;
      return;
    }

    const li = document.createElement("li");
    li.className = "tray-item";
    li.draggable = !state.decoratePlacedThisRound;
    li.dataset.id = item.id;
    li.setAttribute("aria-label", `Drag ${itemLabel(item)}`);
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
    });

    li.addEventListener("click", () => {
      placeItemOnSofreh(item.id);
    });

    trayEl.appendChild(li);
  }

  function placeItemOnSofreh(itemId) {
    if (state.decoratePlacedThisRound) return false;
    const expected = currentLevel().itemId;
    if (itemId !== expected) return false;
    if (state.placedIds.includes(itemId)) return false;

    state.placedIds.push(itemId);
    state.decoratePlacedThisRound = true;
    renderSofrehSlots(dropItemsEl, state.placedIds);
    renderTray();
    dropHintEl.textContent = `${shortItemLabel(itemById(itemId))} added — continue when ready`;
    dropZoneEl.classList.add("has-drop");
    continueBtn.disabled = false;
    continueBtn.textContent =
      state.levelIndex >= LEVELS.length - 1 ? "Finish & celebrate" : "Next level";
    return true;
  }

  function openDecorate() {
    const level = currentLevel();
    const item = rewardItem();
    state.decoratePlacedThisRound = false;
    state.dragId = null;
    decorateMetaEl.textContent = `${level.label} complete`;
    decorateLedeEl.textContent = `Required: drag or tap ${shortItemLabel(item)} onto the sofreh to continue.`;
    renderSofrehSlots(dropItemsEl, state.placedIds);
    renderTray();
    dropHintEl.textContent = "Drop zone — drag or tap the item";
    dropZoneEl.classList.toggle("has-drop", state.placedIds.length > 0);
    continueBtn.disabled = true;
    continueBtn.textContent =
      state.levelIndex >= LEVELS.length - 1 ? "Finish & celebrate" : "Next level";
    showScreen("decorate");
  }

  function advanceAfterDecorate() {
    // No skip: decoration for this level must be placed first.
    if (!state.decoratePlacedThisRound) {
      decorateLedeEl.textContent =
        "Place this level’s item on the sofreh before you continue.";
      return;
    }
    if (state.levelIndex >= LEVELS.length - 1) {
      showWin();
      return;
    }
    state.levelIndex += 1;
    startLevel();
  }

  function startLevel() {
    const level = currentLevel();
    state.queue = shuffle(level.questions).slice(0, QUESTIONS_PER_LEVEL);
    state.questionIndex = 0;
    state.answeredInLevel = 0;
    levelLabelEl.textContent = `${level.label} · ${state.levelIndex + 1}/${LEVELS.length}`;
    progressLabelEl.textContent = `0/${QUESTIONS_PER_LEVEL} correct`;
    updatePlaySofreh();
    renderQuestion();
    showScreen("play");
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
      burst.textContent =
        CELEBRATION_STICKERS[i % CELEBRATION_STICKERS.length];
      burst.style.setProperty("--x", `${8 + Math.random() * 84}%`);
      burst.style.setProperty("--delay", `${Math.random() * 0.9}s`);
      burst.style.setProperty("--spin", `${Math.random() > 0.5 ? 1 : -1}`);
      burst.style.setProperty("--size", `${1.2 + Math.random() * 1.4}rem`);
      stickerLayerEl.appendChild(burst);
    }
  }

  function showWin() {
    winLineEl.textContent = WIN_LINE;
    renderSofrehSlots(finaleItemsEl, state.placedIds);
    launchStickers();
    showScreen("win");
  }

  function resetGame() {
    state.levelIndex = 0;
    state.queue = [];
    state.questionIndex = 0;
    state.answeredInLevel = 0;
    state.placedIds = [];
    state.current = null;
    state.decoratePlacedThisRound = false;
    state.dragId = null;
    stickerLayerEl.innerHTML = "";
    stickerRowEl.innerHTML = "";
    showScreen("start");
  }

  dropZoneEl.addEventListener("dragover", (event) => {
    if (state.decoratePlacedThisRound) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    dropZoneEl.classList.add("is-over");
  });

  dropZoneEl.addEventListener("dragleave", () => {
    dropZoneEl.classList.remove("is-over");
  });

  dropZoneEl.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZoneEl.classList.remove("is-over");
    const id = event.dataTransfer.getData("text/plain") || state.dragId;
    if (id) placeItemOnSofreh(id);
  });

  startBtn.addEventListener("click", () => {
    state.levelIndex = 0;
    state.placedIds = [];
    startLevel();
  });

  continueBtn.addEventListener("click", advanceAfterDecorate);
  againBtn.addEventListener("click", resetGame);

  renderLevelPath();
  showScreen("start");
})();
