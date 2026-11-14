const HAFTSEEN_ITEMS = [
  {
    id: "sabzeh",
    en: "Sprouts",
    name: "سبزه",
    accepted: ["سبزه"],
    finglish: "sabzeh",
    emoji: "🌱",
    eatable: true,
    colorHint: "green",
    symbol: "rebirth",
    symbolShort: "rebirth",
    startsWithSin: true,
    clues: [
      "It is green.",
      "It is eatable (as sprouts)."
    ]
  },
  {
    id: "samanu",
    en: "Sweet pudding",
    name: "سمنو",
    accepted: ["سمنو", "سمنون"],
    finglish: "samanu",
    emoji: "🥣",
    eatable: true,
    colorHint: "brown / creamy",
    symbol: "sweetness / abundance",
    symbolShort: "abundance",
    startsWithSin: true,
    clues: [
      "It is brown or creamy in color.",
      "It is eatable — a sweet pudding."
    ]
  },
  {
    id: "senjed",
    en: "Dried oleaster",
    name: "سنجد",
    accepted: ["سنجد"],
    finglish: "senjed",
    emoji: "🟤",
    eatable: true,
    colorHint: "brown dried fruit",
    symbol: "love",
    symbolShort: "love",
    startsWithSin: true,
    clues: [
      "It looks like a brown dried fruit.",
      "It is eatable."
    ]
  },
  {
    id: "seer",
    en: "Garlic",
    name: "سیر",
    accepted: ["سیر"],
    finglish: "seer",
    emoji: "🧄",
    eatable: true,
    colorHint: "white",
    symbol: "health / medicine",
    symbolShort: "health",
    startsWithSin: true,
    clues: [
      "It is white.",
      "It is eatable."
    ]
  },
  {
    id: "sib",
    en: "Apple",
    name: "سیب",
    accepted: ["سیب"],
    finglish: "sib",
    emoji: "🍎",
    eatable: true,
    colorHint: "red or green",
    symbol: "beauty / health",
    symbolShort: "beauty",
    startsWithSin: true,
    clues: [
      "It is red or green.",
      "It is eatable."
    ]
  },
  {
    id: "somaq",
    en: "Sumac",
    name: "سماق",
    accepted: ["سماق", "سُماق"],
    finglish: "somaq",
    emoji: "🌶️",
    eatable: true,
    colorHint: "deep red",
    symbol: "sunrise / new day",
    symbolShort: "sunrise",
    startsWithSin: true,
    clues: [
      "It has a deep red color.",
      "It is eatable — a spice."
    ]
  },
  {
    id: "serkeh",
    en: "Vinegar",
    name: "سرکه",
    accepted: ["سرکه"],
    finglish: "serkeh",
    emoji: "🫙",
    eatable: true,
    colorHint: "amber liquid",
    symbol: "patience / age",
    symbolShort: "patience",
    startsWithSin: true,
    clues: [
      "It is an amber-colored liquid.",
      "It is eatable as a condiment."
    ]
  },
  {
    id: "sekeh",
    en: "Coin",
    name: "سکه",
    accepted: ["سکه", "سکه‌ها", "سکه ها", "سکهها"],
    finglish: "sekeh",
    emoji: "🪙",
    eatable: false,
    colorHint: "gold / shiny metal",
    symbol: "wealth / prosperity",
    symbolShort: "wealth",
    startsWithSin: true,
    clues: [
      "It has a gold color.",
      "It is not eatable."
    ]
  },
  {
    id: "ayeneh",
    en: "Mirror",
    name: "آینه",
    accepted: ["آینه", "آئینه", "اینه"],
    finglish: "ayeneh",
    emoji: "🪞",
    eatable: false,
    colorHint: "silver / reflective",
    symbol: "reflection / clarity",
    symbolShort: "clarity",
    startsWithSin: false,
    clues: [
      "It is silver and reflective.",
      "It is not eatable."
    ]
  },
  {
    id: "mahi",
    en: "Goldfish",
    name: "ماهی",
    accepted: ["ماهی", "ماهی قرمز"],
    finglish: "mahi",
    emoji: "🐠",
    eatable: false,
    colorHint: "orange / gold fish",
    symbol: "life / progress",
    symbolShort: "life",
    startsWithSin: false,
    clues: [
      "It is orange or gold — a living fish.",
      "It is not eatable on the sofreh (it is alive)."
    ]
  }
];

const CELEBRATION_STICKERS = [
  "🎉",
  "🌱",
  "🍎",
  "🪙",
  "🪞",
  "🐠",
  "✨",
  "🌸",
  "🧄",
  "🎊",
  "🌟",
  "💛"
];

const LEVELS = HAFTSEEN_ITEMS.map((item, index) => ({
  id: `level-${index + 1}`,
  label: `Item ${index + 1}`,
  itemId: item.id
}));

const WIN_LINE =
  "You did it! Every Haft-Seen item is on the sofreh. Happy Nowruz — Nowruz mobarak!";
