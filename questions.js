const SOFREH_ITEMS = [
  { id: "watermelon", en: "Watermelon", name: "هندوانه", finglish: "hendevaneh", emoji: "🍉" },
  { id: "pomegranate", en: "Pomegranate", name: "انار", finglish: "anar", emoji: "🔴" },
  { id: "nuts", en: "Nuts", name: "آجیل", finglish: "ajil", emoji: "🥜" },
  { id: "poetry", en: "Poetry book", name: "کتاب شعر", finglish: "ketab-e she'r", emoji: "📖" },
  { id: "tea", en: "Tea", name: "چای", finglish: "chay", emoji: "🍵" },
  { id: "candle", en: "Candle", name: "شمع", finglish: "sham'", emoji: "🕯️" },
];

const CELEBRATION_STICKERS = ["🎉", "⭐", "🍉", "🔴", "✨", "🕯️", "🎊", "🌟", "🥜", "🍵", "📖", "💛"];

// One level per sofreh item. Difficulty: easy → medium → hard, all about Yalda table & culture.
const LEVELS = [
  {
    id: "level-1",
    label: "Level 1 · Easy",
    band: "Easy · Yalda table",
    itemId: "watermelon",
    questions: [
      {
        q: "Which red fruit on the Yalda sofreh stands for joy and summer in winter?",
        choices: [
          { fa: "هندوانه", finglish: "hendevaneh" },
          { fa: "خیار", finglish: "khiyar" },
          { fa: "موز", finglish: "moz" },
          { fa: "هویج", finglish: "havij" },
        ],
        answer: 0,
      },
      {
        q: "What do Persians call the festive cloth / spread for Yalda?",
        choices: [
          { fa: "سفره", finglish: "sofreh" },
          { fa: "پنجره", finglish: "panjereh" },
          { fa: "صندلی", finglish: "sandali" },
          { fa: "دیوار", finglish: "divar" },
        ],
        answer: 0,
      },
      {
        q: "Yalda is famous as the longest … of the year.",
        choices: [
          { fa: "شب", finglish: "shab" },
          { fa: "روز", finglish: "ruz" },
          { fa: "صبح", finglish: "sobh" },
          { fa: "هفته", finglish: "hafteh" },
        ],
        answer: 0,
      },
      {
        q: "Watermelon on the Yalda table is linked with which color of celebration?",
        choices: [
          { fa: "قرمز", finglish: "qermez" },
          { fa: "آبی", finglish: "abi" },
          { fa: "زرد", finglish: "zard" },
          { fa: "خاکستری", finglish: "khakestari" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “fruit” — often shared on the Yalda sofreh?",
        choices: [
          { fa: "میوه", finglish: "miveh" },
          { fa: "نان", finglish: "nan" },
          { fa: "سوپ", finglish: "sup" },
          { fa: "برنج", finglish: "berenj" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-2",
    label: "Level 2 · Easy",
    band: "Easy · Yalda table",
    itemId: "pomegranate",
    questions: [
      {
        q: "Which Yalda fruit with many seeds stands for abundance and blessing?",
        choices: [
          { fa: "انار", finglish: "anar" },
          { fa: "سیب", finglish: "sib" },
          { fa: "انگور", finglish: "angur" },
          { fa: "هلو", finglish: "holu" },
        ],
        answer: 0,
      },
      {
        q: "What do people often wish for when they share pomegranate on Yalda?",
        choices: [
          { fa: "برکت", finglish: "barakat" },
          { fa: "عجله", finglish: "ajaleh" },
          { fa: "خستگی", finglish: "khastegi" },
          { fa: "سکوت", finglish: "sokut" },
        ],
        answer: 0,
      },
      {
        q: "Pomegranate seeds on the sofreh are called … in Persian.",
        choices: [
          { fa: "دانه", finglish: "daneh" },
          { fa: "برگ", finglish: "barg" },
          { fa: "ریشه", finglish: "risheh" },
          { fa: "چوب", finglish: "chub" },
        ],
        answer: 0,
      },
      {
        q: "Yalda comes at the start of which season?",
        choices: [
          { fa: "زمستان", finglish: "zemestan" },
          { fa: "بهار", finglish: "bahar" },
          { fa: "تابستان", finglish: "tabestan" },
          { fa: "پاییز", finglish: "pa'iz" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “sweet” — like ripe fruit on the Yalda table?",
        choices: [
          { fa: "شیرین", finglish: "shirin" },
          { fa: "تلخ", finglish: "talkh" },
          { fa: "شور", finglish: "shur" },
          { fa: "تند", finglish: "tond" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-3",
    label: "Level 3 · Easy",
    band: "Easy · Yalda table",
    itemId: "nuts",
    questions: [
      {
        q: "What mixed nuts and dried fruit tray is classic on a Yalda sofreh?",
        choices: [
          { fa: "آجیل", finglish: "ajil" },
          { fa: "سالاد", finglish: "salad" },
          { fa: "کیک", finglish: "keyk" },
          { fa: "سوپ", finglish: "sup" },
        ],
        answer: 0,
      },
      {
        q: "Families gather at home for Yalda — how do you say “home”?",
        choices: [
          { fa: "خانه", finglish: "khaneh" },
          { fa: "مدرسه", finglish: "madreseh" },
          { fa: "اداره", finglish: "edareh" },
          { fa: "بازار", finglish: "bazar" },
        ],
        answer: 0,
      },
      {
        q: "Sharing snacks on Yalda is about being with …",
        choices: [
          { fa: "دوست", finglish: "dust" },
          { fa: "دشمن", finglish: "doshman" },
          { fa: "امتحان", finglish: "emtehan" },
          { fa: "کار", finglish: "kar" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “food” for the treats on the Yalda table?",
        choices: [
          { fa: "غذا", finglish: "ghaza" },
          { fa: "میز", finglish: "miz" },
          { fa: "صندلی", finglish: "sandali" },
          { fa: "پنجره", finglish: "panjereh" },
        ],
        answer: 0,
      },
      {
        q: "On Yalda night people sit together and … the sofreh snacks.",
        choices: [
          { fa: "خوردن", finglish: "khordan" },
          { fa: "دویدن", finglish: "davidan" },
          { fa: "خوابیدن", finglish: "khabidan" },
          { fa: "نوشتن", finglish: "neveshtan" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-4",
    label: "Level 4 · Medium",
    band: "Medium · Yalda culture",
    itemId: "poetry",
    questions: [
      {
        q: "Which book of poetry is often opened for fortune-telling on Yalda?",
        choices: [
          { fa: "دیوان حافظ", finglish: "divan-e hafez" },
          { fa: "دفتر مشق", finglish: "daftar-e mashq" },
          { fa: "کتاب آشپزی", finglish: "ketab-e ashpazi" },
          { fa: "روزنامه امروز", finglish: "ruznameh-ye emruz" },
        ],
        answer: 0,
      },
      {
        q: "What do people say for “Happy Yalda Night”?",
        choices: [
          { fa: "شب یلدا مبارک", finglish: "shab-e yalda mobarak" },
          { fa: "صبح بخیر", finglish: "sobh bekheir" },
          { fa: "خداحافظ", finglish: "khodahafez" },
          { fa: "خسته نباشید", finglish: "khasteh nabashid" },
        ],
        answer: 0,
      },
      {
        q: "Fortune-telling with Hafez on Yalda is called …",
        choices: [
          { fa: "فال حافظ", finglish: "fal-e hafez" },
          { fa: "بازی فوتبال", finglish: "bazi-ye futbal" },
          { fa: "خرید آنلاین", finglish: "kharid-e online" },
          { fa: "آشپزی سریع", finglish: "ashpazi-ye sari'" },
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
        q: "Reading poems together on Yalda is called …",
        choices: [
          { fa: "شعرخوانی", finglish: "she'r-khani" },
          { fa: "دویدن", finglish: "davidan" },
          { fa: "شنا کردن", finglish: "shena kardan" },
          { fa: "خوابیدن", finglish: "khabidan" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-5",
    label: "Level 5 · Medium",
    band: "Medium · Yalda culture",
    itemId: "tea",
    questions: [
      {
        q: "What warm drink is often poured while families sit around the Yalda sofreh?",
        choices: [
          { fa: "چای", finglish: "chay" },
          { fa: "دوغ", finglish: "dugh" },
          { fa: "آبمیوه", finglish: "abmiveh" },
          { fa: "شیر", finglish: "shir" },
        ],
        answer: 0,
      },
      {
        q: "A cozy Yalda family gathering is often called …",
        choices: [
          { fa: "دور همی", finglish: "dor-hami" },
          { fa: "تنهایی", finglish: "tanha'i" },
          { fa: "امتحان", finglish: "emtehan" },
          { fa: "سفر کاری", finglish: "safar-e kari" },
        ],
        answer: 0,
      },
      {
        q: "How do you wish someone “good night” after Yalda stories and tea?",
        choices: [
          { fa: "شب بخیر", finglish: "shab bekheir" },
          { fa: "صبح بخیر", finglish: "sobh bekheir" },
          { fa: "ظهر بخیر", finglish: "zohr bekheir" },
          { fa: "خداحافظ", finglish: "khodahafez" },
        ],
        answer: 0,
      },
      {
        q: "Offering tea and snacks to guests, you often say …",
        choices: [
          { fa: "بفرمایید", finglish: "befarmayid" },
          { fa: "برو بیرون", finglish: "boro birun" },
          { fa: "خداحافظ", finglish: "khodahafez" },
          { fa: "امتحان", finglish: "emtehan" },
        ],
        answer: 0,
      },
      {
        q: "How do you say “thank you” when someone serves you on Yalda?",
        choices: [
          { fa: "متشکرم", finglish: "moteshakkeram" },
          { fa: "ببخشید", finglish: "bebakhshid" },
          { fa: "سلام", finglish: "salam" },
          { fa: "خداحافظ", finglish: "khodahafez" },
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "level-6",
    label: "Level 6 · Hard",
    band: "Hard · Yalda culture",
    itemId: "candle",
    questions: [
      {
        q: "Which sofreh item brings light against the darkness of the longest night?",
        choices: [
          { fa: "شمع", finglish: "sham'" },
          { fa: "یخ", finglish: "yakh" },
          { fa: "سایه", finglish: "sayeh" },
          { fa: "دود", finglish: "dud" },
        ],
        answer: 0,
      },
      {
        q: "Yalda celebrates the victory of light over darkness — how is that said?",
        choices: [
          { fa: "پیروزی نور بر تاریکی", finglish: "piruzi-ye nur bar tariki" },
          { fa: "پایان بهار", finglish: "payan-e bahar" },
          { fa: "آغاز باران", finglish: "aghaz-e baran" },
          { fa: "خواب زمستانی", finglish: "khab-e zemestani" },
        ],
        answer: 0,
      },
      {
        q: "Which phrase means “winter solstice” in cultural talk about Yalda?",
        choices: [
          { fa: "انقلاب زمستانی", finglish: "enqelab-e zemestani" },
          { fa: "اعتدال بهاری", finglish: "e'tedal-e bahari" },
          { fa: "فصل باران", finglish: "fasl-e baran" },
          { fa: "شب چهارشنبه", finglish: "shab-e chaharshanbeh" },
        ],
        answer: 0,
      },
      {
        q: "Candles on the Yalda table are a symbol of …",
        choices: [
          { fa: "نور", finglish: "nur" },
          { fa: "تاریکی", finglish: "tariki" },
          { fa: "سرما", finglish: "sarma" },
          { fa: "مه", finglish: "meh" },
        ],
        answer: 0,
      },
      {
        q: "Staying awake with stories and light on Yalda is a sign of …",
        choices: [
          { fa: "امید", finglish: "omid" },
          { fa: "ترس", finglish: "tars" },
          { fa: "عجله", finglish: "ajaleh" },
          { fa: "خستگی", finglish: "khastegi" },
        ],
        answer: 0,
      },
    ],
  },
];

const WIN_LINE =
  "You did it! Every level is complete and your Yalda sofreh is full. Happy Yalda Night — Shab-e Yalda mobarak!";
