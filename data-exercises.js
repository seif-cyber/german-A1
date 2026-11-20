// تدريبات الوحدة الأولى والتانية التفاعلية — من كتاب Netzwerk Neu A1 Kursbuch (ص 8–26) + تدريبات إضافية
// كل تمرين قابل للحل الفوري مع زرار تحقق + إظهار الحل + شرح بالعامية المصرية

const EXERCISES_DATA = [
  // ==================== تدريبات الوحدة الأولى (Kapitel 1) ====================
  {
    id: "u1-ex1a",
    unit: 1,
    ref: "تمرين 1a — ص 8 و 9",
    title: "Deutsch international (وصّل الكلمة الدولية بمقابلها الألماني)",
    instructions: "في أول صفحتين في الكتاب، وصّل كل كلمة دولية بالكلمة الألمانية الصحيحة بتاعتها:",
    type: "match",
    items: [
      { prompt: "1. buterbrod (الروسي) — عيش بالزبدة", answer: "das Butterbrot", explanation: "1 - F: das Butterbrot (عيش بالزبدة)" },
      { prompt: "2. kuranke (الياباني) — عيّان / مريض", answer: "der Kranke", explanation: "2 - G: der Kranke (المريض)" },
      { prompt: "3. otoban (التركي) — طريق سريع", answer: "die Autobahn", explanation: "3 - H: die Autobahn (الطريق السريع)" },
      { prompt: "4. handuk (الإندونيسي) — فوطة", answer: "das Handtuch", explanation: "4 - A: das Handtuch (فوطة)" },
      { prompt: "5. wurstel (الإيطالي) — سوسيس", answer: "das Würstchen / das Würstel", explanation: "5 - D: das Würstchen / Würstel (سوسيس)" },
      { prompt: "6. nudli (المجري) — مكرونة", answer: "die Nudeln", explanation: "6 - I: die Nudeln (مكرونة)" },
      { prompt: "7. kindergarten (الإنجليزي) — حضانة", answer: "der Kindergarten", explanation: "7 - E: der Kindergarten (حضانة)" },
      { prompt: "8. kufar (البلغاري) — شنطة سفر", answer: "der Koffer", explanation: "8 - C: der Koffer (شنطة سفر)" },
      { prompt: "9. flaša (الصربي) — إزازة", answer: "die Flasche", explanation: "9 - B: die Flasche (إزازة)" }
    ],
    options: [
      "das Handtuch", "die Flasche", "der Koffer", "das Würstchen / das Würstel",
      "der Kindergarten", "das Butterbrot", "der Kranke", "die Autobahn", "die Nudeln"
    ]
  },
  {
    id: "u1-ex4a",
    unit: 1,
    ref: "تمرين 4a & 4c — ص 12",
    title: "Woher kommen Sie? (توصيل الأسئلة وإكمال الأفعال)",
    instructions: "أول 3 جمل: اختار الإجابة الصح لأسئلة Selina Lang. وبعدها كمّل تصريف الأفعال (kommt / wohnt) في تمرين 4c:",
    type: "fill",
    items: [
      {
        before: "1. Woher kommen Sie, Frau Lang? → ",
        after: "",
        answer: "Ich komme aus Deutschland.",
        choices: ["Ich komme aus Deutschland.", "Ich wohne in Frankfurt.", "Ich spreche Spanisch, Englisch und Deutsch."],
        explanation: "Woher (منين؟) دايماً إجابتها kommen aus..."
      },
      {
        before: "2. Welche Sprachen sprechen Sie? → ",
        after: "",
        answer: "Ich spreche Spanisch, Englisch und Deutsch.",
        choices: ["Ich komme aus Deutschland.", "Ich wohne in Frankfurt.", "Ich spreche Spanisch, Englisch und Deutsch."],
        explanation: "Welche Sprachen (أنهي لغات؟) إجابتها Ich spreche..."
      },
      {
        before: "3. Wo wohnen Sie? → ",
        after: "",
        answer: "Ich wohne in Frankfurt.",
        choices: ["Ich komme aus Deutschland.", "Ich wohne in Frankfurt.", "Ich spreche Spanisch, Englisch und Deutsch."],
        explanation: "Wo (فين؟) إجابتها Ich wohne in..."
      },
      {
        before: "4c) Das ist Frau Lang. Sie ",
        after: " aus Deutschland.",
        answer: "kommt",
        accepted: ["kommt"],
        explanation: "مع Sie (هي) بنحط نهاية -t ← kommt"
      },
      {
        before: "4c) Sie ",
        after: " in Frankfurt.",
        answer: "wohnt",
        accepted: ["wohnt"],
        explanation: "مع Sie (هي) ← wohnt"
      },
      {
        before: "4c) Jan ",
        after: " aus Frankfurt.",
        answer: "kommt",
        accepted: ["kommt"],
        explanation: "Jan = er (هو) ← kommt"
      },
      {
        before: "4c) Er ",
        after: " in Zürich.",
        answer: "wohnt",
        accepted: ["wohnt"],
        explanation: "مع Er (هو) ← wohnt"
      }
    ]
  },
  {
    id: "u1-ex8a",
    unit: 1,
    ref: "تمرين 8a & 8b — ص 14 و 15",
    title: "Länder und Sprachen (الدول واللغات + قاعدة aus)",
    instructions: "اقرأ نبذة الشخصيات من ص 14–15 واختار الإجابة الصح لكل جملة، وركز في الدول اللي بتاخد أداة مع aus!",
    type: "fill",
    items: [
      {
        before: "Gabriel Santos kommt aus Brasilien. Er wohnt in Köln. Er spricht ",
        after: ", Deutsch und Englisch.",
        answer: "Portugiesisch",
        choices: ["Portugiesisch", "Spanisch", "Italienisch", "Arabisch"],
        explanation: "جابرييل من البرازيل فبيتكلم برتغالي (Portugiesisch)."
      },
      {
        before: "Alessia Conti kommt ",
        after: " und wohnt in Lugano.",
        answer: "aus der Schweiz",
        choices: ["aus Schweiz", "aus der Schweiz", "aus den Schweiz"],
        explanation: "سويسرا مؤنثة (die Schweiz) فمع aus بتتحول لـ aus der Schweiz!"
      },
      {
        before: "Olivia Miller kommt ",
        after: " und wohnt in San Francisco.",
        answer: "aus den USA",
        choices: ["aus USA", "aus der USA", "aus den USA"],
        explanation: "أمريكا جمع (die USA) فمع aus بتتحول لـ aus den USA!"
      },
      {
        before: "Boris Walder kommt aus ",
        after: ". Er wohnt in Salzburg und lernt Arabisch.",
        answer: "Österreich",
        choices: ["Österreich", "Deutschland", "Japan", "Polen"],
        explanation: "سالزبورج في النمسا (Österreich)."
      },
      {
        before: "Kateb Brahim kommt aus Algerien. Er spricht ",
        after: ", Französisch und lernt Deutsch.",
        answer: "Arabisch",
        choices: ["Arabisch", "Türkisch", "Russisch", "Japanisch"],
        explanation: "كاتب من الجزائر وبيتكلم عربي (Arabisch)."
      },
      {
        before: "في تركيا (die Türkei) بيتكلموا: ",
        after: " — ونقول: Ich komme aus der Türkei.",
        answer: "Türkisch",
        choices: ["Türkisch", "Polnisch", "Russisch", "Spanisch"],
        explanation: "die Türkei ← اللغة Türkisch."
      },
      {
        before: "في بولندا (Polen) بيتكلموا: ",
        after: "",
        answer: "Polnisch",
        choices: ["Polnisch", "Portugiesisch", "Französisch", "Italienisch"],
        explanation: "Polen ← اللغة Polnisch."
      },
      {
        before: "في روسيا (Russland) بيتكلموا: ",
        after: "",
        answer: "Russisch",
        choices: ["Russisch", "Arabisch", "Japanisch", "Englisch"],
        explanation: "Russland ← اللغة Russisch."
      }
    ]
  },
  {
    id: "u1-ex10",
    unit: 1,
    ref: "تمرين 10 — ص 16",
    title: "Die Netzwerk-WG (وصّل معلومات شخصيات الشقة)",
    instructions: "وصّل بداية كل جملة بتكملتها الصحيحة من قصة الفيديو (ص 16):",
    type: "match",
    items: [
      { prompt: "1. Max, Bea und Luca ...", answer: "wohnen in München.", explanation: "هم التلاتة (جمع) ساكنين في ميونخ ← wohnen in München." },
      { prompt: "2. Anna ist neu. Sie ...", answer: "kommt aus Berlin.", explanation: "آنا جديدة وجاية من برلين ← kommt aus Berlin." },
      { prompt: "3. Bea ...", answer: "kommt aus Hannover.", explanation: "بيا من هانوفر ← kommt aus Hannover." },
      { prompt: "4. Luca ...", answer: "kommt aus München.", explanation: "لوكا من ميونخ ← kommt aus München." },
      { prompt: "5. Max ist nicht da, er ...", answer: "ist an der Uni.", explanation: "ماكس مش موجود عشان في الجامعة ← ist an der Uni." }
    ],
    options: [
      "ist an der Uni.", "kommt aus Berlin.", "kommt aus Hannover.", "kommt aus München.", "wohnen in München."
    ]
  },
  {
    id: "u1-order",
    unit: 1,
    ref: "تدريب إضافي — قواعد الوحدة 1",
    title: "رتّب الكلمات لتكوين جملة ألماني صح! (W-Frage & Aussagesatz)",
    instructions: "اضغط على الكلمات بالترتيب الصح (افتكر: الفعل دايماً في المركز التاني رقم 2!):",
    type: "word-order",
    sentences: [
      {
        hint: "إنت اسمك إيه؟ (سؤال ودّي)",
        words: ["Wie", "heißt", "du?"],
        explanation: "أداة الاستفهام (Wie) رقم 1 + الفعل (heißt) رقم 2 + الفاعل (du)."
      },
      {
        hint: "أنا من مصر.",
        words: ["Ich", "komme", "aus", "Ägypten."],
        explanation: "الفاعل (Ich) رقم 1 + الفعل (komme) رقم 2 + باقي الجملة (aus Ägypten)."
      },
      {
        hint: "هي ساكنة في فرانكفورت.",
        words: ["Sie", "wohnt", "in", "Frankfurt."],
        explanation: "الفاعل (Sie) + الفعل (wohnt) رقم 2 + المكان (in Frankfurt)."
      },
      {
        hint: "حضرتك بتتكلم أنهي لغات؟",
        words: ["Welche", "Sprachen", "sprechen", "Sie?"],
        explanation: "Welche Sprachen وحدة واحدة رقم 1 + الفعل (sprechen) رقم 2 + الضمير (Sie)."
      },
      {
        hint: "معلش، ممكن تستهجى ده؟",
        words: ["Kannst", "du", "das", "buchstabieren?"],
        explanation: "سؤال بهل يبدأ بالفعل (Kannst) رقم 1."
      }
    ]
  },

  // ==================== تدريبات الوحدة التانية (Kapitel 2) ====================
  {
    id: "u2-ex3a",
    unit: 2,
    ref: "تمرين 3a & 3b — ص 20",
    title: "Meine Hobbys, meine Freunde (بوستات Sophie ونهايات الأفعال)",
    instructions: "كمّل الأفعال الصحيحة في بوستات صوفي (3a) وبعدها كمّل تصريف الأفعال في الكومنتات (3b):",
    type: "fill",
    items: [
      { before: "3a-1) Ich ", after: " gern! (بطبخ)", answer: "koche", accepted: ["koche"], explanation: "مع ich النهاية -e ← koche" },
      { before: "3a-2) Tom und ich ", after: " gern. Wir lieben Paris! (نسافر)", answer: "reisen", accepted: ["reisen"], explanation: "Tom und ich = wir ← reisen" },
      { before: "3a-3) Betty und Bücher. Sie ", after: " gern. (تقرأ - شاذ!)", answer: "liest", accepted: ["liest"], explanation: "فعل lesen شاذ مع er/es/sie: الـ e بتبقى ie ← liest!" },
      { before: "3a-4) Ben ", after: " toll! (يغني)", answer: "singt", accepted: ["singt"], explanation: "Ben = er ← singt" },
      { before: "3a-5) Eine Sensation — Wir ", after: "! (نجري)", answer: "joggen", accepted: ["joggen"], explanation: "مع wir الفعل بيفضل زي المصدر -en ← joggen" },
      { before: "3a-6) Peter, Markus und Fußball. Sie ", after: " super! (يلعبوا)", answer: "spielen", accepted: ["spielen"], explanation: "Peter und Markus = sie (هم) ← spielen" },
      { before: "3b-A) Lustig! ", after: " du auch so gut? (singen)", answer: "Singst", accepted: ["Singst", "singst"], explanation: "مع du النهاية -st ← Singst" },
      { before: "3b-B) Paris!!! ", after: " du Französisch? (sprechen - شاذ!)", answer: "Sprichst", accepted: ["Sprichst", "sprichst"], explanation: "sprechen شاذ مع du: الـ e بتتحول لـ i ← Sprichst!" },
      { before: "3b-D) ", after: " wir am Wochenende Spaghetti? (kochen)", answer: "Kochen", accepted: ["Kochen", "kochen"], explanation: "مع wir ← Kochen" },
      { before: "3b-D) Oder ", after: " du? (arbeiten - بينتهي بـ t!)", answer: "arbeitest", accepted: ["arbeitest"], explanation: "arbeiten آخره t فبنزود e قبل st ← arbeitest!" },
      { before: "3b-F) ", after: " ihr morgen auch? (joggen)", answer: "Joggt", accepted: ["Joggt", "joggt"], explanation: "مع ihr النهاية -t ← Joggt!" }
    ]
  },
  {
    id: "u2-ex6b",
    unit: 2,
    ref: "تمرين 6b & 10b — ص 22 و 24",
    title: "Artikel sortieren (صنّف الكلمات بالألوان: der / das / die)",
    instructions: "اختار الأداة الصح لكل كلمة من كلمات الشغل والقاموس (تذكر الألوان: der أزرق، das أخضر، die أحمر):",
    type: "article-sort",
    items: [
      { word: "Stift (قلم)", answer: "der", plural: "die Stifte" },
      { word: "Computer (كمبيوتر)", answer: "der", plural: "die Computer" },
      { word: "Schlüssel (مفتاح)", answer: "der", plural: "die Schlüssel" },
      { word: "Kilometer (كيلومتر)", answer: "der", plural: "die Kilometer" },
      { word: "Tag (يوم)", answer: "der", plural: "die Tage" },
      { word: "Auto (عربية)", answer: "das", plural: "die Autos" },
      { word: "Buch (كتاب)", answer: "das", plural: "die Bücher" },
      { word: "Geld (فلوس)", answer: "das", plural: "die Gelder" },
      { word: "Glas (كوباية)", answer: "das", plural: "die Gläser" },
      { word: "Medikament (دواء)", answer: "das", plural: "die Medikamente" },
      { word: "Krankenhaus (مستشفى)", answer: "das", plural: "die Krankenhäuser" },
      { word: "Seminar (سيمنار)", answer: "das", plural: "die Seminare" },
      { word: "Straße (شارع)", answer: "die", plural: "die Straßen" },
      { word: "Rechnung (فاتورة)", answer: "die", plural: "die Rechnungen" },
      { word: "Spritze (حقنة)", answer: "die", plural: "die Spritzen" },
      { word: "Tablette (برشامة)", answer: "die", plural: "die Tabletten" },
      { word: "Woche (أسبوع)", answer: "die", plural: "die Wochen" }
    ]
  },
  {
    id: "u2-ex7a",
    unit: 2,
    ref: "تمرين 7a — ص 22",
    title: "Mein Beruf (اقرأ النصوص وحدّد مهنة كل شخص)",
    instructions: "من نصوص الكتاب ص 22 (A–D)، اختار المهنة المناسبة لكل وصف:",
    type: "fill",
    items: [
      {
        before: "Text A: Ich bin ",
        after: " und ich bin 22 Jahre alt. Ich habe pro Woche 24 Stunden Seminare und Kurse an der Universität.",
        answer: "Studentin",
        choices: ["Studentin", "Kellner", "Taxifahrer", "Ärztin"],
        explanation: "24 ساعة سيمنارات وكورسات في الجامعة ← أمينة طالبة (Studentin)."
      },
      {
        before: "Text B: Ich bin ",
        after: " und arbeite in zwei Restaurants (46 Stunden pro Woche). Montag und Dienstag habe ich frei.",
        answer: "Kellner",
        choices: ["Studentin", "Kellner", "Taxifahrer", "Ärztin"],
        explanation: "شغال في مطعمين ← ليون ويتر/جرسون (Kellner)."
      },
      {
        before: "Text C: Ich bin ",
        after: " bei „Taxi-Zentral“. Ich fahre 68.000 Kilometer pro Jahr. Am Freitag habe ich frei.",
        answer: "Taxifahrer",
        choices: ["Studentin", "Kellner", "Taxifahrer", "Ärztin"],
        explanation: "بيسوق 68 ألف كيلو في شركة Taxi-Zentral ← فابيان سواق تاكسي (Taxifahrer)."
      },
      {
        before: "Text D: Ich bin ",
        after: " und arbeite in einem Krankenhaus (480 Zimmer, 1.250 Patienten). Wir arbeiten auch nachts.",
        answer: "Ärztin",
        choices: ["Studentin", "Kellner", "Taxifahrer", "Ärztin"],
        explanation: "شغالة في مستشفى فيها مرضى ← ماجدا دكتورة (Ärztin)."
      }
    ]
  },
  {
    id: "u2-ex7b",
    unit: 2,
    ref: "تمرين 7b — ص 22",
    title: "Zahlen ab zwanzig (وصّل الأرقام المكتوبة بقيمتها)",
    instructions: "وصّل كل رقم مكتوب بالحروف من تمرين 7b في الكتاب بالرقم الصحيح بتاعه:",
    type: "match",
    items: [
      { prompt: "a) zweiundzwanzig", answer: "22", explanation: "2 + und + 20 = 22" },
      { prompt: "b) vierundzwanzig", answer: "24", explanation: "4 + und + 20 = 24" },
      { prompt: "c) sechsundvierzig", answer: "46", explanation: "6 + und + 40 = 46" },
      { prompt: "d) (ein)hundert", answer: "100", explanation: "مية = 100" },
      { prompt: "e) vierhundertachtzig", answer: "480", explanation: "400 + 80 = 480" },
      { prompt: "f) neunhundertzwanzig", answer: "920", explanation: "900 + 20 = 920" },
      { prompt: "g) (ein)tausendzweihundertfünfzig", answer: "1.250", explanation: "1000 + 200 + 50 = 1.250" },
      { prompt: "h) fünfundzwanzigtausend", answer: "25.000", explanation: "25 × 1000 = 25.000" },
      { prompt: "i) achtundsechzigtausend", answer: "68.000", explanation: "68 × 1000 = 68.000" }
    ],
    options: ["22", "24", "46", "100", "480", "920", "1.250", "25.000", "68.000"]
  },
  {
    id: "u2-ex8a",
    unit: 2,
    ref: "تمرين 8a & 8b — ص 23",
    title: "Singular und Plural (اكتب أو اختار الجمع الصح)",
    instructions: "في الألماني مفيش نهاية جمع واحدة، فيه 5 نهايات أساسية! كمّل جمع الكلمات دي من تمرين 8a:",
    type: "fill",
    items: [
      { before: "der Kilometer → die ", after: "  [النهاية: (¨)-]", answer: "Kilometer", choices: ["Kilometer", "Kilometers", "Kilometern"], explanation: "الكلمات اللي بتنتهي بـ -er غالباً بتفضل زي ما هي في الجمع!" },
      { before: "der Arzt → die ", after: "  [النهاية: (¨)-e]", answer: "Ärzte", choices: ["Ärzte", "Arzten", "Arzts"], explanation: "der Arzt بتاخد أوملاوت + e ← die Ärzte" },
      { before: "die Stunde → die ", after: "  [النهاية: -(e)n]", answer: "Stunden", choices: ["Stunden", "Stunde", "Stundes"], explanation: "الأسماء المؤنثة المنتهية بـ -e بنزودلها -n ← die Stunden" },
      { before: "das Buch → die ", after: "  [النهاية: (¨)-er]", answer: "Bücher", choices: ["Bücher", "Buchen", "Buchs"], explanation: "das Buch بتاخد أوملاوت + er ← die Bücher" },
      { before: "das Restaurant → die ", after: "  [النهاية: -s]", answer: "Restaurants", choices: ["Restaurants", "Restauranten", "Restauränter"], explanation: "الكلمات الأجنبية (زي Restaurant, Auto, Hobby, Kino) بتاخد -s!" },
      { before: "der Tag → die ", after: "  [النهاية: -e]", answer: "Tage", choices: ["Tage", "Tägen", "Tags"], explanation: "der Tag ← die Tage" }
    ]
  },
  {
    id: "u2-ex12a",
    unit: 2,
    ref: "تمرين 12a — ص 25",
    title: "Persönliche Angaben (وصّل بيانات Jonathan Miller)",
    instructions: "وصّل كل خانة من خانات الاستمارة بالمعلومة المناسبة من تمرين 12a:",
    type: "match",
    items: [
      { prompt: "Nachname / Familienname (اسم العيلة)", answer: "Miller", explanation: "Miller هو اسم العيلة." },
      { prompt: "Vorname (الاسم الأول)", answer: "Jonathan", explanation: "Jonathan هو الاسم الأول." },
      { prompt: "Geburtsdatum (تاريخ الميلاد)", answer: "01.04.1994", explanation: "في ألمانيا التاريخ بيتكتب يوم.شهر.سنة." },
      { prompt: "Geburtsort (مكان الميلاد)", answer: "New York", explanation: "Ort معناها مكان ← New York." },
      { prompt: "Adresse (العنوان)", answer: "Goethestr. 7, 10711 Berlin", explanation: "الشارع ورقم البيت والرمز البريدي والمدينة." },
      { prompt: "Telefonnummer / Handynummer", answer: "0171-12085614", explanation: "رقم الموبايل." }
    ],
    options: ["Miller", "Jonathan", "01.04.1994", "New York", "Goethestr. 7, 10711 Berlin", "0171-12085614"]
  },
  {
    id: "u2-ex12b-form",
    unit: 2,
    ref: "تمرين 12b — ص 25",
    title: "Sportclub „Fit“ — Anmeldung (املى استمارة النادي بنفسك!)",
    instructions: "دي الاستمارة الحقيقية من ص 25! اختار كورس من جدول النادي واملى بياناتك بالألماني وجرب تبعتها عشان تتأكد إنك مليت كل خانة صح:",
    type: "club-form"
  },
  {
    id: "u2-order",
    unit: 2,
    ref: "تدريب إضافي — قواعد الوحدة 2",
    title: "رتّب الكلمات: سؤال هل (Ja-/Nein-Frage) + فعل sein & haben",
    instructions: "ركز: في سؤال (هل؟) الفعل بيجي رقم (1) في أول الجملة! رتّب الكلمات دي:",
    type: "word-order",
    sentences: [
      {
        hint: "نروح السينما يوم الاتنين؟",
        words: ["Gehen", "wir", "am", "Montag", "ins", "Kino?"],
        explanation: "سؤال بهل يبدأ بالفعل (Gehen) رقم 1 + الفاعل (wir) + الوقت (am Montag) + المكان (ins Kino)."
      },
      {
        hint: "بتحب تسمع مزيكا؟",
        words: ["Hörst", "du", "gern", "Musik?"],
        explanation: "الفعل (Hörst) رقم 1 + الفاعل (du) + gern + Musik."
      },
      {
        hint: "لأ، للأسف مش هينفع.",
        words: ["Nein,", "das", "geht", "leider", "nicht."],
        explanation: "تعبير ثابت ومهم جداً في تظبيط المواعيد!"
      },
      {
        hint: "إنت شغال إيه؟",
        words: ["Was", "bist", "du", "von", "Beruf?"],
        explanation: "W-Frage: أداة الاستفهام (Was) + الفعل (bist) رقم 2 + du + von Beruf."
      },
      {
        hint: "عندي إجازة يوم الجمعة.",
        words: ["Am", "Freitag", "habe", "ich", "frei."],
        explanation: "تريكة مهمة: لما تبدأ بالوقت (Am Freitag) رقم 1، الفعل (habe) يفضل رقم 2 والفاعل (ich) يجي بعده!"
      }
    ]
  }
];
