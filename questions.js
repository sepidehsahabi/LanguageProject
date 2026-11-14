const SOFREH_ITEMS = [
  { id: "watermelon", en: "Watermelon", name: "هندوانه", finglish: "hendevaneh", emoji: "🍉" },
  { id: "pomegranate", en: "Pomegranate", name: "انار", finglish: "anar", emoji: "🔴" },
  { id: "nuts", en: "Nuts", name: "آجیل", finglish: "ajil", emoji: "🥜" },
  { id: "poetry", en: "Poetry book", name: "کتاب شعر", finglish: "ketab-e she'r", emoji: "📖" },
  { id: "tea", en: "Tea", name: "چای", finglish: "chay", emoji: "🍵" },
  { id: "candle", en: "Candle", name: "شمع", finglish: "sham'", emoji: "🕯️" },
  { id: "mirror", en: "Mirror", name: "آینه", finglish: "ayeneh", emoji: "✨" },
];

const CELEBRATION_STICKERS = ["🎉", "⭐", "🍉", "🔴", "✨", "🕯️", "🎊", "🌟", "🥜", "🍵", "📖", "💛"];

// One level per sofreh item. Difficulty: easy vocab → medium phrases → hard expressions.
const LEVELS = [
  {
    id: "level-1",
    label: "Level 1 · Easy",
    band: "Easy · Vocabulary",
    itemId: "watermelon",
    questions: [
      {
        q: "How do you say “watermelon” in Persian?",
        choices: [
          { fa: "هندوانه", finglish: "hendevaneh" },
          { fa: "خیار", finglish: "khiyar" },
          { fa: "موز", finglish: "moz" },
          { fa: "گلابی", finglish: "golabi" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “night” in Persian?",
        choices: [
          { fa: "شب", finglish: "shab" },
          { fa: "روز", finglish: "ruz" },
          { fa: "صبح", finglish: "sobh" },
          { fa: "ظهر", finglish: "zohr" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “red” in Persian?",
        choices: [
          { fa: "قرمز", finglish: "qermez" },
          { fa: "آبی", finglish: "abi" },
          { fa: "سبز", finglish: "sabz" },
          { fa: "زرد", finglish: "zard" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “fruit” in Persian?",
        choices: [
          { fa: "میوه", finglish: "miveh" },
          { fa: "نان", finglish: "nan" },
          { fa: "گوشت", finglish: "gusht" },
          { fa: "برنج", finglish: "berenj" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “winter” in Persian?",
        choices: [
          { fa: "زمستان", finglish: "zemestan" },
          { fa: "بهار", finglish: "bahar" },
          { fa: "تابستان", finglish: "tabestan" },
          { fa: "پاییز", finglish: "pa'iz" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-2",
    label: "Level 2 · Easy",
    band: "Easy · Vocabulary",
    itemId: "pomegranate",
    questions: [
      {
        q: "How do you say “pomegranate” in Persian?",
        choices: [
          { fa: "انار", finglish: "anar" },
          { fa: "سیب", finglish: "sib" },
          { fa: "انگور", finglish: "angur" },
          { fa: "هلو", finglish: "holu" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “seed” in Persian?",
        choices: [
          { fa: "دانه", finglish: "daneh" },
          { fa: "برگ", finglish: "barg" },
          { fa: "ریشه", finglish: "risheh" },
          { fa: "گل", finglish: "gol" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “sweet” in Persian?",
        choices: [
          { fa: "شیرین", finglish: "shirin" },
          { fa: "تلخ", finglish: "talkh" },
          { fa: "شور", finglish: "shur" },
          { fa: "تند", finglish: "tond" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “year” in Persian?",
        choices: [
          { fa: "سال", finglish: "sal" },
          { fa: "ماه", finglish: "mah" },
          { fa: "هفته", finglish: "hafteh" },
          { fa: "روز", finglish: "ruz" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “cold” in Persian?",
        choices: [
          { fa: "سرد", finglish: "sard" },
          { fa: "گرم", finglish: "garm" },
          { fa: "نرم", finglish: "narm" },
          { fa: "سخت", finglish: "sakht" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-3",
    label: "Level 3 · Easy",
    band: "Easy · Vocabulary",
    itemId: "nuts",
    questions: [
      {
        q: "How do you say “nuts / trail mix” in Persian?",
        choices: [
          { fa: "آجیل", finglish: "ajil" },
          { fa: "سوپ", finglish: "sup" },
          { fa: "سالاد", finglish: "salad" },
          { fa: "کیک", finglish: "keyk" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “food” in Persian?",
        choices: [
          { fa: "غذا", finglish: "ghaza" },
          { fa: "آب", finglish: "ab" },
          { fa: "میز", finglish: "miz" },
          { fa: "صندلی", finglish: "sandali" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “home / house” in Persian?",
        choices: [
          { fa: "خانه", finglish: "khaneh" },
          { fa: "مدرسه", finglish: "madreseh" },
          { fa: "مغازه", finglish: "maghazeh" },
          { fa: "پارک", finglish: "park" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “friend” in Persian?",
        choices: [
          { fa: "دوست", finglish: "dust" },
          { fa: "دشمن", finglish: "doshman" },
          { fa: "مهمان", finglish: "mehman" },
          { fa: "معلم", finglish: "mo'allem" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “eat” in Persian?",
        choices: [
          { fa: "خوردن", finglish: "khordan" },
          { fa: "خوابیدن", finglish: "khabidan" },
          { fa: "دویدن", finglish: "davidan" },
          { fa: "نوشتن", finglish: "neveshtan" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-4",
    label: "Level 4 · Medium",
    band: "Medium · Phrases",
    itemId: "poetry",
    questions: [
      {
        q: "How do you say “poetry” in Persian?",
        choices: [
          { fa: "شعر", finglish: "she'r" },
          { fa: "داستان", finglish: "dastan" },
          { fa: "موسیقی", finglish: "musiqi" },
          { fa: "نقاشی", finglish: "naqqashi" },
        ],
        answer: 0,
      },
      {
        q: "What do people often say for “Happy Yalda Night”?",
        choices: [
          { fa: "شب یلدا مبارک", finglish: "shab-e yalda mobarak" },
          { fa: "صبح بخیر", finglish: "sobh bekheir" },
          { fa: "خداحافظ", finglish: "khodahafez" },
          { fa: "خسته نباشید", finglish: "khasteh nabashid" },
        ],
        answer: 0,
      },
      {
        q: "What is the Persian word for the festive table spread?",
        choices: [
          { fa: "سفره", finglish: "sofreh" },
          { fa: "پنجره", finglish: "panjereh" },
          { fa: "دیوار", finglish: "divar" },
          { fa: "سقف", finglish: "saqf" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “longest night of the year”?",
        choices: [
          { fa: "بلندترین شب سال", finglish: "bolandtarin shab-e sal" },
          { fa: "کوتاه‌ترین روز سال", finglish: "kutah-tarin ruz-e sal" },
          { fa: "اولین روز بهار", finglish: "avalin ruz-e bahar" },
          { fa: "آخرین شب تابستان", finglish: "akharin shab-e tabestan" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “book of poetry” style for Hafez’s book?",
        choices: [
          { fa: "دیوان حافظ", finglish: "divan-e hafez" },
          { fa: "دفتر مشق", finglish: "daftar-e mashq" },
          { fa: "کتاب آشپزی", finglish: "ketab-e ashpazi" },
          { fa: "روزنامه امروز", finglish: "ruznameh-ye emruz" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-5",
    label: "Level 5 · Medium",
    band: "Medium · Phrases",
    itemId: "tea",
    questions: [
      {
        q: "How do you say “tea” in Persian?",
        choices: [
          { fa: "چای", finglish: "chay" },
          { fa: "شیر", finglish: "shir" },
          { fa: "آبمیوه", finglish: "abmiveh" },
          { fa: "دوغ", finglish: "dugh" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “family gathering” for Yalda night?",
        choices: [
          { fa: "دور همی", finglish: "dor-hami" },
          { fa: "تنهایی", finglish: "tanha'i" },
          { fa: "امتحان", finglish: "emtehan" },
          { fa: "سفر کاری", finglish: "safar-e kari" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “good night” in Persian?",
        choices: [
          { fa: "شب بخیر", finglish: "shab bekheir" },
          { fa: "صبح بخیر", finglish: "sobh bekheir" },
          { fa: "ظهر بخیر", finglish: "zohr bekheir" },
          { fa: "خداحافظ", finglish: "khodahafez" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “please” in Persian?",
        choices: [
          { fa: "لطفاً", finglish: "lotfan" },
          { fa: "متشکرم", finglish: "moteshakkeram" },
          { fa: "ببخشید", finglish: "bebakhshid" },
          { fa: "سلام", finglish: "salam" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “thank you” in Persian?",
        choices: [
          { fa: "متشکرم", finglish: "moteshakkeram" },
          { fa: "خواهش می‌کنم", finglish: "khahesh mikonam" },
          { fa: "بفرمایید", finglish: "befarmayid" },
          { fa: "خداحافظ", finglish: "khodahafez" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-6",
    label: "Level 6 · Hard",
    band: "Hard · Expressions",
    itemId: "candle",
    questions: [
      {
        q: "How do you say “candle” in Persian?",
        choices: [
          { fa: "شمع", finglish: "sham'" },
          { fa: "چراغ", finglish: "cheragh" },
          { fa: "آتش", finglish: "atash" },
          { fa: "دود", finglish: "dud" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “victory of light over darkness”?",
        choices: [
          { fa: "پیروزی نور بر تاریکی", finglish: "piruzi-ye nur bar tariki" },
          { fa: "پایان بهار", finglish: "payan-e bahar" },
          { fa: "آغاز باران", finglish: "aghaz-e baran" },
          { fa: "خواب زمستانی", finglish: "khab-e zemestani" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “winter solstice” in cultural talk?",
        choices: [
          { fa: "انقلاب زمستانی", finglish: "enqelab-e zemestani" },
          { fa: "اعتدال بهاری", finglish: "e'tedal-e bahari" },
          { fa: "فصل باران", finglish: "fasl-e baran" },
          { fa: "شب چهارشنبه", finglish: "shab-e chaharshanbeh" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “light” in Persian?",
        choices: [
          { fa: "نور", finglish: "nur" },
          { fa: "تاریکی", finglish: "tariki" },
          { fa: "سایه", finglish: "sayeh" },
          { fa: "مه", finglish: "meh" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “hope” in Persian?",
        choices: [
          { fa: "امید", finglish: "omid" },
          { fa: "ترس", finglish: "tars" },
          { fa: "خستگی", finglish: "khastegi" },
          { fa: "عجله", finglish: "ajaleh" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-7",
    label: "Level 7 · Hard",
    band: "Hard · Expressions",
    itemId: "mirror",
    questions: [
      {
        q: "How do you say “mirror” in Persian?",
        choices: [
          { fa: "آینه", finglish: "ayeneh" },
          { fa: "شانه", finglish: "shaneh" },
          { fa: "لیوان", finglish: "livan" },
          { fa: "قاشق", finglish: "qashoq" },
        ],
        answer: 0,
      },
      {
        q: "How do Persians often refer to fortune-telling with Hafez on Yalda?",
        choices: [
          { fa: "فال حافظ", finglish: "fal-e hafez" },
          { fa: "بازی فوتبال", finglish: "bazi-ye futbal" },
          { fa: "آشپزی سریع", finglish: "ashpazi-ye sari'" },
          { fa: "خرید آنلاین", finglish: "kharid-e online" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “blessing / abundance” often linked with pomegranate?",
        choices: [
          { fa: "برکت", finglish: "barakat" },
          { fa: "سرعت", finglish: "sor'at" },
          { fa: "خستگی", finglish: "khastegi" },
          { fa: "سکوت", finglish: "sokut" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “reading poetry together”?",
        choices: [
          { fa: "شعرخوانی", finglish: "she'r-khani" },
          { fa: "دویدن", finglish: "davidan" },
          { fa: "شنا کردن", finglish: "shena kardan" },
          { fa: "خوابیدن", finglish: "khabidan" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “storytelling”?",
        choices: [
          { fa: "قصه‌گویی", finglish: "qesseh-guyi" },
          { fa: "نامه نوشتن", finglish: "nameh neveshtan" },
          { fa: "در زدن", finglish: "dar zadan" },
          { fa: "آش پختن", finglish: "ash pokhtan" },
        ],
        answer: 0,
      },
    ],
  },
];

const WIN_LINE =
  "You did it! Every level is complete and your Yalda sofreh is full. Happy Yalda Night — Shab-e Yalda mobarak!";
