// كل تمارين الوحدة الأولى والتانية من كتاب التمارين (Netzwerk Neu A1 — Übungsbuch ص 6–29)
// مصممة بشكل تفاعلي كامل مع تصحيح فوري وشرح كل إجابة بالعامية المصرية

const UB_EXERCISES_DATA = [
  // ==================== Übungsbuch Kapitel 1 (ص 6–17) ====================
  {
    id: "ub1-ex1",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 1 — ص 6",
    title: "Deutsch international (اكتب الكلمات السبع من الحروف المفقودة)",
    instructions: "في أول صفحة في كتاب التمارين، كمّل الـ 7 كلمات ألماني دولية بناءً على الأداة والمعنى والحرف المساعد:",
    type: "fill",
    items: [
      { before: "1. die ", after: " (مكرونة — فيها حرف D)", answer: "Nudeln", accepted: ["Nudeln"], explanation: "die Nudeln (مكرونة)" },
      { before: "2. der ", after: " (شنطة سفر — فيها حرف E)", answer: "Koffer", accepted: ["Koffer"], explanation: "der Koffer (شنطة سفر)" },
      { before: "3. die ", after: " (طريق سريع — فيها حرف U)", answer: "Autobahn", accepted: ["Autobahn"], explanation: "die Autobahn (الطريق السريع)" },
      { before: "4. das ", after: " (عيش بالزبدة — فيها حرف T)", answer: "Butterbrot", accepted: ["Butterbrot"], explanation: "das Butterbrot (عيش بالزبدة)" },
      { before: "5. die ", after: " (إزازة — فيها حرف S)", answer: "Flasche", accepted: ["Flasche"], explanation: "die Flasche (إزازة)" },
      { before: "6. das ", after: " (سوسيس — فيها حرف C)", answer: "Würstchen", accepted: ["Würstchen", "Wuerstchen"], explanation: "das Würstchen (سوسيس)" },
      { before: "7. das ", after: " (فوطة — آخرها H)", answer: "Handtuch", accepted: ["Handtuch"], explanation: "das Handtuch (فوطة)" }
    ]
  },
  {
    id: "ub1-ex2a-2b",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 2a & 2b — ص 6",
    title: "Hallo! Tschüs! (إكمال المحادثات + ترتيب حوارين)",
    instructions: "كمّل المحادثات الثلاث (2a) وبعدها اختار الترتيب الصحيح لجمل Dialog 1 و Dialog 2 (2b):",
    type: "fill",
    items: [
      { before: "2a-1) Hallo Tina! Wie geht's? — ", after: " — Auch gut, danke.", answer: "Danke, gut. Und dir?", choices: ["Danke, gut. Und dir?", "Ich heiße Jakob.", "Tschüs, Jakob."], explanation: "سألتها عاملة إيه ← ترد: شكراً كويسة وإنتِ؟" },
      { before: "2a-2) Hallo, ich bin Anna. — Hallo! ", after: "", answer: "Ich heiße Jakob.", choices: ["Danke, gut. Und dir?", "Ich heiße Jakob.", "Tschüs, Jakob."], explanation: "قدمت نفسها ← يرد يعرفها بنفسه: أنا اسمي جاكوب." },
      { before: "2a-3) Tschüs! — ", after: " Bis bald!", answer: "Tschüs, Jakob.", choices: ["Danke, gut. Und dir?", "Ich heiße Jakob.", "Tschüs, Jakob."], explanation: "الوداع الودّي ← Tschüs, Jakob. Bis bald!" },
      { before: "2b Dialog 1: (1) Hallo, ich heiße Valentin. Und wer bist du? → الجملة رقم (2): ", after: "", answer: "Hallo Valentin, ich bin Kilian.", choices: ["Hallo Valentin, ich bin Kilian.", "Entschuldigung. Wie heißt du?", "Kilian."], explanation: "بيرد عليه ويقول اسمه كيليان." },
      { before: "2b Dialog 1: الجملة رقم (3) لما مسمعش الاسم كويس: ", after: " → (4) Kilian.", answer: "Entschuldigung. Wie heißt du?", choices: ["Hallo Valentin, ich bin Kilian.", "Entschuldigung. Wie heißt du?", "Kilian."], explanation: "معلش إنت اسمك إيه؟ ← كيليان." },
      { before: "2b Dialog 2: (1) Hallo Conny! → (2) ", after: " → (3) Sehr gut, danke. Und dir? → (4) Auch gut, danke.", answer: "Hallo Jakob! Wie geht's?", choices: ["Hallo Jakob! Wie geht's?", "Auch gut, danke.", "Sehr gut, danke. Und dir?"], explanation: "بترد التحية وتسأله عامل إيه." }
    ]
  },
  {
    id: "ub1-ex3a",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 3a — ص 7",
    title: "Guten Tag! Auf Wiedersehen! (اختار التحية المناسبة لكل موقف)",
    instructions: "من صور تمرين 3a ص 7، اختار التحية أو الوداع المناسب لكل موقف:",
    type: "match",
    items: [
      { prompt: "1. الصبح بدري والمدرس داخل الفصل والشمس لسه طالعة", answer: "Guten Morgen!", explanation: "الصبح = Guten Morgen!" },
      { prompt: "2. بالنهار في محل الخضار والفاكهة (رسمي)", answer: "Guten Tag!", explanation: "بالنهار بشكل رسمي = Guten Tag!" },
      { prompt: "3. بالليل وقت النوم والأم بتطفي النور للطفل", answer: "Gute Nacht!", explanation: "قبل النوم = Gute Nacht!" },
      { prompt: "4. بالليل والقمر طالع عند شباك تذاكر السينما", answer: "Guten Abend!", explanation: "المساء = Guten Abend!" },
      { prompt: "5. زبونة خارجة من محل ملابس بتودّع البائعة (رسمي)", answer: "Auf Wiedersehen!", explanation: "الوداع الرسمي = Auf Wiedersehen!" },
      { prompt: "6. اتنين صحاب خارجين من معهد اللغات بيودّعوا بعض (ودّي)", answer: "Ciao!", explanation: "الوداع الودّي بين الصحاب = Ciao! أو Tschüs!" }
    ],
    options: ["Guten Morgen!", "Guten Tag!", "Gute Nacht!", "Guten Abend!", "Auf Wiedersehen!", "Ciao!"]
  },
  {
    id: "ub1-ex3d-3e",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 3d & 3e — ص 8",
    title: "Sie oder du? (ودّي ولا رسمي؟ + إكمال الحوارات)",
    instructions: "كمّل الفراغات بـ Sie أو du في تمرين 3d، وبعدها كمّل الأفعال والأسماء في تمرين 3e:",
    type: "fill",
    items: [
      { before: "3d-1) Guten Tag. Ich heiße Tobias Lang. Wie heißen ", after: "?", answer: "Sie", choices: ["Sie", "du"], explanation: "استخدم Guten Tag واسمه الكامل والفعل heißen ← صيغة رسمية Sie!" },
      { before: "3d-2) Hallo. Ich heiße Pia. Und wer bist ", after: "?", answer: "du", choices: ["Sie", "du"], explanation: "استخدم Hallo و bist ← صيغة ودّية du!" },
      { before: "3d-3) Entschuldigung, wie heißen ", after: ", bitte? — Wer sind Sie?", answer: "Sie", choices: ["Sie", "du"], explanation: "الفعل heißen آخره -en ← رسمي Sie!" },
      { before: "3d-4) Wie heißt ", after: "? Ich bin Maria.", answer: "du", choices: ["Sie", "du"], explanation: "الفعل heißt ← ودّي du!" },
      { before: "3e-1) Hallo, ich bin Maria. Und das ", after: " Klara.", answer: "ist", accepted: ["ist"], explanation: "Das ist... (دي كلارا)." },
      { before: "3e-1) Entschuldigung, wie ", after: " du? — Klara.", answer: "heißt", accepted: ["heißt", "heisst"], explanation: "مع du ← heißt." },
      { before: "3e-2) Guten Tag! Mein Name ", after: " Tina Kleber.", answer: "ist", accepted: ["ist"], explanation: "Mein Name ist... (اسمي...)." },
      { before: "3e-2) Entschuldigung, wie ", after: " Sie? — Grams, Anne Grams.", answer: "heißen", accepted: ["heißen", "heissen"], explanation: "مع Sie ← heißen." },
      { before: "3e-3) Guten Abend. Ich heiße Daniel Beck. Und wer ", after: " Sie?", answer: "sind", accepted: ["sind"], explanation: "مع Sie فعل sein بيكون sind." },
      { before: "3e-4) Guten Morgen. Mein Name ist Anne. Und wer ", after: " du? — Ich bin Daniel.", answer: "bist", accepted: ["bist"], explanation: "مع du فعل sein بيكون bist." }
    ]
  },
  {
    id: "ub1-ex4a-4c",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 4a, 4b & 4c — ص 9",
    title: "Woher kommen Sie? (توصيل + أدوات الاستفهام + الضمائر)",
    instructions: "حل أهم 3 تمارين في ص 9 من كتاب التمارين (ركز على الفرق بين Und Sie? و Und du?):",
    type: "fill",
    items: [
      { before: "4a-1) Wie heißen Sie? → ", after: "", answer: "Mein Name ist Victoria Kunze.", choices: ["Mein Name ist Victoria Kunze.", "Aus Irland. Und Sie?", "In Stuttgart. Und Sie?", "Englisch und Deutsch."], explanation: "سؤال رسمي عن الاسم ← Mein Name ist Victoria Kunze." },
      { before: "4a-2) Woher kommen Sie? → ", after: "", answer: "Aus Irland. Und Sie?", choices: ["Aus Irland. Und Sie?", "Aus Brasilien. Und du?", "In Stuttgart. Und Sie?"], explanation: "سؤال رسمي بـ Sie عن البلد ← الإجابة فيها Und Sie?." },
      { before: "4a-6) Woher kommst du? → ", after: "", answer: "Aus Brasilien. Und du?", choices: ["Aus Irland. Und Sie?", "Aus Brasilien. Und du?", "In Berlin. Und du?"], explanation: "سؤال ودّي بـ du عن البلد ← الإجابة فيها Und du?." },
      { before: "4a-7) Wo wohnst du? → ", after: "", answer: "In Berlin. Und du?", choices: ["In Stuttgart. Und Sie?", "In Berlin. Und du?", "Emilia."], explanation: "سؤال ودّي عن السكن ← In Berlin. Und du?." },
      { before: "4b-2) Ich wohne in Salzburg. ", after: " wohnen Sie? — Auch in Salzburg.", answer: "Wo", choices: ["Wer", "Wie", "Wo", "Woher"], explanation: "السكن دايماً بسؤال Wo (فين؟)." },
      { before: "4b-3) Ich bin Peter. ", after: " heißt du? — Michaela.", answer: "Wie", choices: ["Wer", "Wie", "Wo", "Woher"], explanation: "مع heißt دايماً Wie (Wie heißt du?)." },
      { before: "4b-4) ", after: " kommst du? — Ich komme aus Deutschland.", answer: "Woher", choices: ["Wer", "Wie", "Wo", "Woher"], explanation: "مع kommen aus دايماً Woher (منين؟)." },
      { before: "4c-3) Das ist Vanessa. ", after: " kommt aus Deutschland, aus Bonn.", answer: "Sie", choices: ["Ich", "Du", "Er", "Sie"], explanation: "فانيسا بنت (هي) ← Sie (بحرف كبير لأنها أول الجملة)." },
      { before: "4c-4) Wo wohnen ", after: "? — In Bern.", answer: "Sie", choices: ["ich", "du", "er", "Sie"], explanation: "الفعل wohnen آخره -en في سؤال ← Sie (حضرتك)." }
    ]
  },
  {
    id: "ub1-ex4d-table",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 4d — ص 9",
    title: "جدول تصريف الأفعال التفاعلي (heißen / wohnen / kommen / sein)",
    instructions: "كمّل كل الخانات الفاضية في جدول تصريف أفعال الوحدة الأولى (ص 9 في الـ ÜB):",
    type: "verb-table",
    headers: ["الضمير", "heißen", "wohnen", "kommen", "sein"],
    rows: [
      { pronoun: "ich", cells: [{ answer: "heiße", accepted: ["heiße", "heisse"] }, { answer: "wohne" }, { answer: "komme" }, { answer: "bin" }] },
      { pronoun: "du", cells: [{ answer: "heißt", accepted: ["heißt", "heisst"] }, { answer: "wohnst" }, { prefilled: "kommst" }, { answer: "bist" }] },
      { pronoun: "er/sie", cells: [{ prefilled: "heißt" }, { prefilled: "wohnt" }, { answer: "kommt" }, { answer: "ist" }] },
      { pronoun: "sie/Sie", cells: [{ answer: "heißen", accepted: ["heißen", "heissen"] }, { answer: "wohnen" }, { answer: "kommen" }, { prefilled: "sind" }] }
    ]
  },
  {
    id: "ub1-ex4e-5d",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 4e & 5d — ص 10",
    title: "اختار وكمّل الشكل الصح للفعل (تطبيق مباشر)",
    instructions: "اختار التصريف الصح للفعل في كل جملة من ص 10:",
    type: "fill",
    items: [
      { before: "4e-1) Ich heiße Pia und ich ", after: " aus Hamburg.", answer: "komme", choices: ["kommt", "komme", "kommen"], explanation: "مع ich ← komme" },
      { before: "4e-2) Hamburg ", after: " in Deutschland.", answer: "ist", choices: ["bin", "ist", "sind"], explanation: "Hamburg مفرد (es) ← ist" },
      { before: "4e-3) Wo ", after: " du? — Ich wohne in Zürich.", answer: "wohnst", choices: ["wohnen", "wohnst", "wohnt"], explanation: "مع du ← wohnst" },
      { before: "4e-4) Wer ", after: " Sie? — Mein Name ist Nina Weber.", answer: "sind", choices: ["bist", "ist", "sind"], explanation: "مع Sie (حضرتك) ← sind" },
      { before: "4e-5) Woher ", after: " Sie, Frau Weber? — Aus Frankfurt.", answer: "kommen", choices: ["komme", "kommst", "kommen"], explanation: "مع Sie ← kommen" },
      { before: "5d-2) Ich ", after: " in Berlin. Und wo wohnst du? — In Salzburg.", answer: "wohne", accepted: ["wohne"], explanation: "مع ich ← wohne" },
      { before: "5d-3) Woher kommen Sie? Aus England? — Nein, ich ", after: " aus Australien.", answer: "komme", accepted: ["komme"], explanation: "مع ich ← komme" },
      { before: "5d-4) Das ist Fabio. Er ", after: " aus Italien. Und wo wohnt er?", answer: "kommt", accepted: ["kommt"], explanation: "مع er ← kommt" }
    ]
  },
  {
    id: "ub1-ex5f",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 5f — ص 11",
    title: "Lesen Sie den Chat (اقرأ شات Aylin و Sarah و Nils واستخرج البيانات)",
    instructions: "اقرأ الشات ده من ص 11 في الـ ÜB:\n• Aylin: „Hallo! Mein Name ist Aylin. Ich komme aus Berlin. Und ich wohne in Stuttgart!“\n• Sarah: „Ich heiße Sarah. Ich wohne in Berlin! Ich komme aus Frankfurt.“\n• Nils: „Ich bin Nils! Ich komme aus Stuttgart. Ich wohne in Frankfurt.“\nدلوقتي اختار Wo? (ساكن فين) و Woher? (أصله منين) لكل واحد:",
    type: "fill",
    items: [
      { before: "Aylin — Wo? (ساكنة فين): in ", after: "", answer: "Stuttgart", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Aylin قالت: Und ich wohne in Stuttgart!" },
      { before: "Aylin — Woher? (أصلها منين): aus ", after: "", answer: "Berlin", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Aylin قالت: Ich komme aus Berlin." },
      { before: "Sarah — Wo? (ساكنة فين): in ", after: "", answer: "Berlin", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Sarah قالت: Ich wohne in Berlin!" },
      { before: "Sarah — Woher? (أصلها منين): aus ", after: "", answer: "Frankfurt", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Sarah قالت: Ich komme aus Frankfurt." },
      { before: "Nils — Wo? (ساكن فين): in ", after: "", answer: "Frankfurt", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Nils قال: Nein, ich wohne in Frankfurt..." },
      { before: "Nils — Woher? (أصله منين): aus ", after: "", answer: "Stuttgart", choices: ["Berlin", "Frankfurt", "Stuttgart"], explanation: "Nils قال: Ich komme aus Stuttgart." }
    ]
  },
  {
    id: "ub1-ex5e-7c",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 5e & 7c — ص 11 و 13",
    title: "رتّب الجمل (Aussagesatz / W-Frage / Wie bitte?)",
    instructions: "اضغط على الكلمات بالترتيب الصح (من تمرين 5e ص 11 وتمرين 7c ص 13):",
    type: "word-order",
    sentences: [
      { hint: "5e-4: أنا من موسكو.", words: ["Ich", "komme", "aus", "Moskau."], explanation: "الفاعل رقم 1 + الفعل (komme) رقم 2." },
      { hint: "5e-5: هو اسمه بيتر.", words: ["Er", "heißt", "Peter."], explanation: "Er + heißt + Peter." },
      { hint: "5e-6: إنت منين؟", words: ["Woher", "kommst", "du?"], explanation: "W-Wort (Woher) + الفعل (kommst) رقم 2 + du." },
      { hint: "7c-1: معلش، مرة تانية لو سمحت.", words: ["Entschuldigung,", "noch", "einmal", "bitte."], explanation: "تعبير ثابت في الكلام اليومي." },
      { hint: "7c-2: أنا مش فاهم ده.", words: ["Das", "verstehe", "ich", "nicht."], explanation: "لو بدأنا بـ Das رقم 1 ← الفعل (verstehe) يفضل رقم 2!" },
      { hint: "7c-3: بالراحة شوية لو سمحت.", words: ["Bitte", "ein", "bisschen", "langsamer."], explanation: "تعبير طلب التبطيء في الكلام." }
    ]
  },
  {
    id: "ub1-ex8a-8c",
    source: "ub",
    unit: 1,
    ref: "ÜB تمرين 8a, 8b, 8c & ص 17",
    title: "Länder, Sprachen & قاعدة aus der / aus dem / aus den",
    instructions: "توصيل رموز الدول، اللغات، وقاعدة aus المهمة جداً (شاملة العراق وإيران ولبنان واليمن!) + الساعات الرقمية من ص 17:",
    type: "fill",
    items: [
      { before: "8a) رمز الدولة CH يخص دولة: ", after: "", answer: "die Schweiz", choices: ["Deutschland", "Österreich", "die Schweiz", "Polen"], explanation: "CH = Confoederatio Helvetica = سويسرا (die Schweiz)." },
      { before: "8a) رمز الدولة A يخص دولة: ", after: "", answer: "Österreich", choices: ["Österreich", "Italien", "Frankreich", "Portugal"], explanation: "A = Austria = النمسا (Österreich)." },
      { before: "8b) في المكسيك (Mexiko) بيتكلموا: ", after: "", answer: "Spanisch", choices: ["Spanisch", "Portugiesisch", "Französisch", "Griechisch"], explanation: "المكسيك بتتكلم إسباني (Spanisch)." },
      { before: "8b) في تونس (Tunesien) بيتكلموا: ", after: "", answer: "Arabisch", choices: ["Arabisch", "Türkisch", "Ungarisch", "Thai"], explanation: "تونس بتتكلم عربي (Arabisch)." },
      { before: "8c-1) Türkei / Schweiz / Ukraine / Slowakei → بنقول: ", after: "", answer: "Aus der ...", choices: ["Aus ...", "Aus der ...", "Aus dem ...", "Aus den ..."], explanation: "دول مؤنثة (die) ← مع aus تبقى aus der!" },
      { before: "8c-2) Deutschland / Spanien / Ägypten / Syrien → بنقول: ", after: "", answer: "Aus ...", choices: ["Aus ...", "Aus der ...", "Aus dem ...", "Aus den ..."], explanation: "دول بدون أداة ← aus مباشرة!" },
      { before: "8c-3) Irak / Iran / Libanon / Jemen → بنقول: ", after: "", answer: "Aus dem ...", choices: ["Aus ...", "Aus der ...", "Aus dem ...", "Aus den ..."], explanation: "دول مذكرة (der) ← مع aus تبقى aus dem! (خلي بالك منها في الامتحانات!)" },
      { before: "8c-4) USA / Niederlanden → بنقول: ", after: "", answer: "Aus den ...", choices: ["Aus ...", "Aus der ...", "Aus dem ...", "Aus den ..."], explanation: "دول جمع (die Pl.) ← مع aus تبقى aus den!" },
      { before: "ص 17) الساعة 13:20 الظهر ← نقول: ", after: "", answer: "Guten Tag!", choices: ["Guten Morgen!", "Guten Tag!", "Guten Abend!", "Gute Nacht!"], explanation: "الساعة 1:20 الظهر ← Guten Tag!" },
      { before: "ص 17) الساعة 19:30 بالليل ← نقول: ", after: "", answer: "Guten Abend!", choices: ["Guten Morgen!", "Guten Tag!", "Guten Abend!", "Gute Nacht!"], explanation: "الساعة 7:30 مساءً ← Guten Abend!" },
      { before: "ص 17) الساعة 23:40 وقت النوم ← نقول: ", after: "", answer: "Gute Nacht!", choices: ["Guten Morgen!", "Guten Tag!", "Guten Abend!", "Gute Nacht!"], explanation: "الساعة 11:40 قبل النوم ← Gute Nacht!" }
    ]
  },

  // ==================== Übungsbuch Kapitel 2 (ص 18–29) ====================
  {
    id: "ub2-ex2a-3a",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 2a & 3a — ص 18 و 19",
    title: "Hobbys (إكمال أسئلة الهوايات وتوصيل الجمل)",
    instructions: "كمّل الأفعال في أسئلة الهوايات (2a ص 18) ووصّل جمل صوفي وصحابها (3a ص 19):",
    type: "fill",
    items: [
      { before: "2a-2) Schwimmen Sie gern? — Ja, ich ", after: " gern.", answer: "schwimme", accepted: ["schwimme"], explanation: "مع ich ← schwimme." },
      { before: "2a-3) Tanzen Sie gern? — Ja, ich ", after: " sehr gern.", answer: "tanze", accepted: ["tanze"], explanation: "مع ich ← tanze." },
      { before: "2a-4) ", after: " Sie gern? — Nein, ich koche nicht so gern.", answer: "Kochen", accepted: ["Kochen", "kochen"], explanation: "سؤال بـ Sie عن الطبخ ← Kochen Sie gern?" },
      { before: "2a-5) ", after: " Sie gern Musik? — Ja, sehr gern.", answer: "Hören", accepted: ["Hören", "hören", "Hoeren"], explanation: "سماع المزيكا = Musik hören ← Hören Sie gern Musik?" },
      { before: "2a-6) ", after: " Sie gern ins Kino? — Nein, nicht so gern.", answer: "Gehen", accepted: ["Gehen", "gehen"], explanation: "يروح السينما = ins Kino gehen ← Gehen Sie gern ins Kino?" },
      { before: "3a-2) Betty liest ", after: "", answer: "ein Buch von Daniel Kehlmann.", choices: ["am Wochenende.", "ein Buch von Daniel Kehlmann.", "Spaghetti.", "Französisch.", "Fußball."], explanation: "liest (تقرأ) ← كتاب!" },
      { before: "3a-3) Kaan und Sophie kochen ", after: "", answer: "Spaghetti.", choices: ["am Wochenende.", "ein Buch von Daniel Kehlmann.", "Spaghetti.", "Französisch.", "Fußball."], explanation: "kochen (يطبخوا) ← اسباجتي!" },
      { before: "3a-4) Sophie spricht ", after: "", answer: "Französisch.", choices: ["am Wochenende.", "ein Buch von Daniel Kehlmann.", "Spaghetti.", "Französisch.", "Fußball."], explanation: "spricht (تتكلم) ← فرنساوي!" },
      { before: "3a-5) Peter spielt ", after: "", answer: "Fußball.", choices: ["am Wochenende.", "ein Buch von Daniel Kehlmann.", "Spaghetti.", "Französisch.", "Fußball."], explanation: "spielt (يلعب) ← كورة قدم!" }
    ]
  },
  {
    id: "ub2-ex3c-3f",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 3c, 3d & 3f — ص 19 و 20",
    title: "تصريف الأفعال ونهاياتها (المنتظم + الشاذ + ihr)",
    instructions: "تمارين مكثفة من ص 19–20 في الـ ÜB لتثبيت كل الضمائر (ich, du, er/es/sie, wir, ihr, sie/Sie):",
    type: "fill",
    items: [
      { before: "3c-2) Tom ", after: " nicht gern.", answer: "kocht", choices: ["kocht", "kochen"], explanation: "Tom = er ← kocht" },
      { before: "3c-5) Tom und Markus ", after: " gern.", answer: "spielen", choices: ["spielen", "spielt"], explanation: "اتنين = هم (sie) ← spielen" },
      { before: "3c-6) Und du? ", after: " du gern?", answer: "Joggst", choices: ["Joggst", "Joggt"], explanation: "مع du ← Joggst" },
      { before: "3c-8) ", after: " ihr gern?", answer: "Fotografiert", choices: ["Fotografierst", "Fotografiert"], explanation: "مع ihr (إنتوا) النهاية -t ← Fotografiert!" },
      { before: "3f-1) Ich höre sehr gern Musik. Aber ich ", after: " (lesen) nicht so gern.", answer: "lese", accepted: ["lese"], explanation: "مع ich الفعل lesen بيفضل عادي ← lese" },
      { before: "3f-2) Und du? ", after: " (lesen) du gern? Und tanzt du gern?", answer: "Liest", accepted: ["Liest", "liest"], explanation: "مع du الفعل lesen شاذ (e → ie) ← Liest!" },
      { before: "3f-3) Andrea ", after: " (spielen) gern Fußball und sie liest auch gern.", answer: "spielt", accepted: ["spielt"], explanation: "Andrea = sie (هي) ← spielt" },
      { before: "3f-4) Sophie und Tom ", after: " (joggen) nicht gern. Aber sie schwimmen gern.", answer: "joggen", accepted: ["joggen"], explanation: "جمع (sie) ← joggen" },
      { before: "3f-6) Und ihr, Markus und Peter, ", after: " (kochen) ihr gern?", answer: "kocht", accepted: ["kocht"], explanation: "مع ihr ← kocht" },
      { before: "3f-8) Wer ", after: " (sprechen) Spanisch? Du, Sophie?", answer: "spricht", accepted: ["spricht"], explanation: "بعد Wer (مين؟) الفعل دايماً بيتصرف زي er/es/sie ← spricht!" }
    ]
  },
  {
    id: "ub2-ex3e-table",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 3e — ص 20",
    title: "جدول تصريف أفعال الوحدة التانية الكامل (spielen / arbeiten / lesen / sprechen)",
    instructions: "كمّل كل الخانات الفاضية في جدول ص 20 (خلي بالك من الـ e في arbeiten والتغيير في lesen و sprechen مع du و er/es/sie بس!):",
    type: "verb-table",
    headers: ["الضمير", "spielen", "arbeiten", "lesen", "sprechen"],
    rows: [
      { pronoun: "ich", cells: [{ prefilled: "spiele" }, { answer: "arbeite" }, { answer: "lese" }, { answer: "spreche" }] },
      { pronoun: "du", cells: [{ answer: "spielst" }, { answer: "arbeitest" }, { prefilled: "liest" }, { answer: "sprichst" }] },
      { pronoun: "er/es/sie", cells: [{ answer: "spielt" }, { answer: "arbeitet" }, { answer: "liest" }, { prefilled: "spricht" }] },
      { pronoun: "wir", cells: [{ answer: "spielen" }, { prefilled: "arbeiten" }, { answer: "lesen" }, { answer: "sprechen" }] },
      { pronoun: "ihr", cells: [{ answer: "spielt" }, { answer: "arbeitet" }, { prefilled: "lest" }, { answer: "sprecht" }] },
      { pronoun: "sie/Sie", cells: [{ prefilled: "spielen" }, { answer: "arbeiten" }, { answer: "lesen" }, { answer: "sprechen" }] }
    ]
  },
  {
    id: "ub2-ex3g-5d",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 3g & 5d — ص 20 و 22",
    title: "بناء الجمل وأسئلة هل (Aussagesätze & Ja-/Nein-Fragen)",
    instructions: "رتّب الكلمات عشان تكوّن جمل خبرية صح (3g ص 20) وأسئلة بهل تبدأ بالفعل (5d ص 22):",
    type: "word-order",
    sentences: [
      { hint: "3g-2: إيفا مبتحبش القراية أوي.", words: ["Eva", "liest", "nicht", "so", "gern."], explanation: "Eva + liest (رقم 2) + nicht so gern." },
      { hint: "3g-3: نينا هتشتغل بكرة.", words: ["Nina", "arbeitet", "morgen."], explanation: "Nina + arbeitet + morgen." },
      { hint: "3g-5: إيفا بتتكلم ألماني كويس.", words: ["Eva", "spricht", "gut", "Deutsch."], explanation: "Eva + spricht (شاذ!) + gut Deutsch." },
      { hint: "5d-2: هتذاكروا ألماني يوم الأربعاء؟ (ihr)", words: ["Lernt", "ihr", "am", "Mittwoch", "Deutsch?"], explanation: "سؤال بهل ← الفعل Lernt رقم 1 + ihr!" },
      { hint: "5d-3: هتطبخ اسباجتي يوم الخميس؟ (du)", words: ["Kochst", "du", "am", "Donnerstag", "Spaghetti?"], explanation: "سؤال بهل ← الفعل Kochst رقم 1 + du!" },
      { hint: "5d-6: حضرتك رايح الاستاد يوم الحد؟ (Sie)", words: ["Gehen", "Sie", "am", "Sonntag", "ins", "Stadion?"], explanation: "سؤال بهل رسمي ← Gehen رقم 1 + Sie!" }
    ]
  },
  {
    id: "ub2-ex5c-dialogs",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 5c — ص 22",
    title: "Ordnen Sie die Dialoge (رتّب خطوات محادثة تظبيط المواعيد)",
    instructions: "اضغط على جمل المحادثة بالترتيب المنطقي من البداية للنهاية (Dialog A & Dialog B ص 22):",
    type: "dialog-order",
    dialogs: [
      {
        title: "Dialog A (البيسين — 4 جمل)",
        lines: [
          "Gehen wir am Montag ins Schwimmbad?",
          "Am Montag? Das geht leider nicht. Am Dienstag?",
          "Ja, das geht.",
          "Super."
        ],
        explanation: "اقتراح يوم الاتنين ← رفض واقتراح التلات ← موافقة (Ja, das geht.) ← تمام (Super.)."
      },
      {
        title: "Dialog B (المسرح — 6 جمل)",
        lines: [
          "Gehen wir ins Theater?",
          "Ja, gern. Wann?",
          "Am Freitag?",
          "Am Freitag? Das geht leider nicht.",
          "Am Samstag?",
          "Ja, super."
        ],
        explanation: "اقتراح المسرح ← موافقة وسؤال إمتى ← اقتراح الجمعة ← رفض ← اقتراح السبت ← موافقة!"
      }
    ]
  },
  {
    id: "ub2-ex6-7a-11a",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 6, 7a & 11a — ص 22 و 25",
    title: "تحدي الأدوات الكبير من الـ ÜB (der / das / die بالألوان)",
    instructions: "كل الكلمات المهمة من تمارين 6 و 7a و 11a في الـ ÜB — اختار الأداة الصح لكل كلمة:",
    type: "article-sort",
    items: [
      { word: "Universität (جامعة)", answer: "die", plural: "die Universitäten" },
      { word: "Arzt (دكتور)", answer: "der", plural: "die Ärzte" },
      { word: "Zimmer (أوضة)", answer: "das", plural: "die Zimmer" },
      { word: "Wochenende (ويك إند)", answer: "das", plural: "die Wochenenden" },
      { word: "Kurs (كورس)", answer: "der", plural: "die Kurse" },
      { word: "Jahr (سنة)", answer: "das", plural: "die Jahre" },
      { word: "Patient (مريض)", answer: "der", plural: "die Patienten" },
      { word: "Stunde (ساعة)", answer: "die", plural: "die Stunden" },
      { word: "Kino (سينما)", answer: "das", plural: "die Kinos" },
      { word: "Restaurant (مطعم)", answer: "das", plural: "die Restaurants" },
      { word: "Krankenpfleger (ممرض)", answer: "der", plural: "die Krankenpfleger" },
      { word: "Schwimmbad (بيسين)", answer: "das", plural: "die Schwimmbäder" },
      { word: "Architekt (مهندس معماري)", answer: "der", plural: "die Architekten" },
      { word: "Schule (مدرسة)", answer: "die", plural: "die Schulen" },
      { word: "Taxi (تاكسي)", answer: "das", plural: "die Taxis" },
      { word: "Arbeit (الشغل)", answer: "die", plural: "die Arbeiten" },
      { word: "Beruf (مهنة)", answer: "der", plural: "die Berufe" }
    ]
  },
  {
    id: "ub2-ex7f",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 7f — ص 23",
    title: "فهم النصوص وتصحيح الأخطاء (Amina, Leon, Fabian, Magda)",
    instructions: "مراجعة على النصوص الأربعة في ص 22 من الـ Kursbuch عبر أسئلة الفهم والتصحيح في ص 23 من الـ Übungsbuch:",
    type: "fill",
    items: [
      { before: "Text A) Amina Mazin arbeitet am Samstag ", after: "", answer: "im Kino.", choices: ["im Kino.", "am Nachmittag.", "sehr groß.", "Studentin."], explanation: "يوم السبت أمينة بتشتغل في السينما (im Kino)." },
      { before: "Text B — صحّح الغلط: Leon Schöppe arbeitet in (drei) Restaurants → الصح: ", after: " Restaurants.", answer: "zwei", accepted: ["zwei", "2"], explanation: "ليون شغال في مطعمين (zwei) مش تلاتة!" },
      { before: "Text B — صحّح الغلط: Er arbeitet am Montag und am Dienstag → الصح: يوم الاتنين والتلات هو ", after: "", answer: "hat frei", choices: ["hat frei", "arbeitet nachts", "studiert"], explanation: "الاتنين والتلات دول يومين الإجازة بتوعه (hat frei)!" },
      { before: "Text C) Wie viele Kilometer fährt Fabian Höflinger? → ", after: "", answer: "68.000 pro Jahr.", choices: ["68.000 pro Jahr.", "Bei „Taxi Zentral“.", "Am Freitag.", "Taxifahrer."], explanation: "بيسوق 68 ألف كيلو في السنة." },
      { before: "Text D) Magda Donat ist Ärztin. Sie arbeitet im ", after: ". Es hat 480 Zimmer.", answer: "Krankenhaus", choices: ["Krankenhaus", "Wochenende", "Zimmer", "Ärztin"], explanation: "الدكتورة شغالة في المستشفى (Krankenhaus)." }
    ]
  },
  {
    id: "ub2-ex8a-8b",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 8a & 8b — ص 24",
    title: "تحدي الجمع الكامل (Pluralformen — ص 24)",
    instructions: "اكتب أو اختار صيغة الجمع الصحيحة لكل اسم (لاحظ الأداة في الجمع دايماً die):",
    type: "fill",
    items: [
      { before: "8a) der Beruf → die ", after: "", answer: "Berufe", accepted: ["Berufe"], explanation: "النهاية -e ← die Berufe" },
      { before: "8a) das Haus → die ", after: "", answer: "Häuser", accepted: ["Häuser", "Haeuser"], explanation: "أوملاوت + er ← die Häuser" },
      { before: "8a) das Wort → die ", after: "", answer: "Wörter", accepted: ["Wörter", "Woerter"], explanation: "أوملاوت + er ← die Wörter" },
      { before: "8a) das Café → die ", after: "", answer: "Cafés", accepted: ["Cafés", "Cafes"], explanation: "كلمة أجنبية ← النهاية -s" },
      { before: "8b-2) der Kurs → die ", after: "", answer: "Kurse", accepted: ["Kurse"], explanation: "النهاية -e ← die Kurse" },
      { before: "8b-3) das Taxi → die ", after: "", answer: "Taxis", accepted: ["Taxis"], explanation: "النهاية -s ← die Taxis" },
      { before: "8b-5) das Glas → die ", after: "", answer: "Gläser", accepted: ["Gläser", "Glaeser"], explanation: "أوملاوت + er ← die Gläser" },
      { before: "8b-6) das Jahr → die ", after: "", answer: "Jahre", accepted: ["Jahre"], explanation: "النهاية -e ← die Jahre" },
      { before: "8b-7) die Straße → die ", after: "", answer: "Straßen", accepted: ["Straßen", "Strassen"], explanation: "النهاية -n ← die Straßen" },
      { before: "8b-8) das Schwimmbad → die ", after: "", answer: "Schwimmbäder", accepted: ["Schwimmbäder", "Schwimmbaeder"], explanation: "أوملاوت + er ← die Schwimmbäder" }
    ]
  },
  {
    id: "ub2-ex9c-9e",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 9c, 9d & 9e — ص 25",
    title: "تأنيث المهن + تدريبات sein و haben و arbeiten",
    instructions: "كمّل تأنيث وتذكير المهن (9c) واختار التصريف الصح لـ sein و haben و arbeiten (9d & 9e):",
    type: "fill",
    items: [
      { before: "9c-2) der Student / die ", after: "", answer: "Studentin", accepted: ["Studentin"], explanation: "بنزود -in للمؤنث ← die Studentin" },
      { before: "9c-3) der ", after: " / die Köchin", answer: "Koch", accepted: ["Koch"], explanation: "مذكر die Köchin هو der Koch (من غير أوملاوت!)" },
      { before: "9c-6) der ", after: " / die Verkäuferin", answer: "Verkäufer", accepted: ["Verkäufer", "Verkaeufer"], explanation: "بنشيل -in ← der Verkäufer" },
      { before: "9c-8) der ", after: " / die Architektin", answer: "Architekt", accepted: ["Architekt"], explanation: "بنشيل -in ← der Architekt" },
      { before: "9d-2) Wann ", after: " Leon frei?", answer: "hat", choices: ["habe", "hast", "hat"], explanation: "Leon = er ← hat" },
      { before: "9d-3) ", after: " du ein Hobby?", answer: "Hast", choices: ["Hast", "Hat", "Haben"], explanation: "مع du فعل haben بيكون hast (من غير b!)" },
      { before: "9d-6) ", after: " ihr Freundinnen?", answer: "Seid", choices: ["Ist", "Sind", "Seid"], explanation: "مع ihr (إنتوا) فعل sein بيكون seid!" },
      { before: "9d-8) Wir ", after: " Lehrer.", answer: "sind", choices: ["bin", "seid", "sind"], explanation: "مع wir فعل sein بيكون sind." },
      { before: "9e-2) Wo ", after: " (arbeiten) du?", answer: "arbeitest", accepted: ["arbeitest"], explanation: "arbeiten آخرها t ← نزود e قبل st ← arbeitest!" },
      { before: "9e-7) Wir ", after: " (arbeiten) heute nicht. Wir haben frei.", answer: "arbeiten", accepted: ["arbeiten"], explanation: "مع wir ← arbeiten." }
    ]
  },
  {
    id: "ub2-ex12b-r3",
    source: "ub",
    unit: 2,
    ref: "ÜB تمرين 12b & R3 — ص 26 و 27",
    title: "استمارة Tobias Gruber + مراجعة أسئلة الشغل (R3)",
    instructions: "اقرأ النص من ص 26:\n„Tobias Gruber ist am 7. Dezember 1990 in Berlin geboren. Er wohnt schon drei Jahre in Wien. Er ist Informatiker und arbeitet in einem Krankenhaus.“\nكمّل الاستمارة ووصّل أسئلة R3:",
    type: "fill",
    items: [
      { before: "12b) Vorname (الاسم الأول): ", after: "", answer: "Tobias", accepted: ["Tobias"], explanation: "الاسم الأول هو Tobias." },
      { before: "12b) Nachname (اسم العيلة): ", after: "", answer: "Gruber", accepted: ["Gruber"], explanation: "اسم العيلة هو Gruber." },
      { before: "12b) Geburtsdatum (تاريخ الميلاد): ", after: "", answer: "07.12.1990", choices: ["07.12.1990", "07.12.1994", "12.07.1990"], explanation: "7 ديسمبر 1990 = 07.12.1990." },
      { before: "12b) Wohnort (مكان السكن الحالي — خدعة!): ", after: "", answer: "Wien", choices: ["Berlin", "Wien", "München"], explanation: "اتولد في برلين بس ساكن حالياً في فيينا (Er wohnt in Wien)!" },
      { before: "12b) Beruf (المهنة): ", after: "", answer: "Informatiker", accepted: ["Informatiker"], explanation: "Er ist Informatiker (مبرمج / مهندس IT)." },
      { before: "R3-2) Wann arbeitest du? → ", after: "", answer: "Von Montag bis Freitag.", choices: ["Architektin.", "Von Montag bis Freitag.", "An der Universität in Berlin.", "Am Wochenende: Samstag und Sonntag."], explanation: "Wann = إمتى ← من الاتنين للجمعة." },
      { before: "R3-3) Wo arbeitest du? → ", after: "", answer: "An der Universität in Berlin.", choices: ["Architektin.", "Von Montag bis Freitag.", "An der Universität in Berlin.", "Am Wochenende: Samstag und Sonntag."], explanation: "Wo = فين ← في جامعة برلين." }
    ]
  }
];
