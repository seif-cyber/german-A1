// بيانات الشرح التفصيلي والملخصات للوحدة الأولى والتانية من كتاب Netzwerk Neu A1 Kursbuch
// كل الشرح مكتوب بالعامية المصرية البسيطة مع الأمثلة الألمانية الدقيقة من الكتاب

const UNITS_DATA = {
  alphabet: [
    { letter: "A a", name: "a", egypt: "آ", tip: "زي الألف المفتوحة (آنا)" },
    { letter: "B b", name: "be", egypt: "بيه", tip: "عادي زي الباء" },
    { letter: "C c", name: "tse", egypt: "تسيه", tip: "بتتنطق تس" },
    { letter: "D d", name: "de", egypt: "ديه", tip: "عادي زي الدال" },
    { letter: "E e", name: "e", egypt: "إيه", tip: "زي (إيه) ممدودة" },
    { letter: "F f", name: "ef", egypt: "إف", tip: "عادي" },
    { letter: "G g", name: "ge", egypt: "جيه (ج مصرية)", tip: "دايماً جيم مصرية جامدة!" },
    { letter: "H h", name: "ha", egypt: "ها", tip: "هاء واضحة في أول الكلمة، وفي النص بتمد اللي قبلها" },
    { letter: "I i", name: "i", egypt: "إي", tip: "زي الكسرة الطويلة" },
    { letter: "J j", name: "jot", egypt: "يوت", tip: "بتتنطق (ي) دايماً! زي Ja = يا" },
    { letter: "K k", name: "ka", egypt: "كا", tip: "عادي" },
    { letter: "L l", name: "el", egypt: "إل", tip: "عادي" },
    { letter: "M m", name: "em", egypt: "إم", tip: "عادي" },
    { letter: "N n", name: "en", egypt: "إن", tip: "عادي" },
    { letter: "O o", name: "o", egypt: "أو", tip: "ضمة صافية" },
    { letter: "P p", name: "pe", egypt: "پيه", tip: "پ بهواء" },
    { letter: "Q q", name: "ku", egypt: "كو", tip: "دايماً بعدها u وتتنطق كڤ" },
    { letter: "R r", name: "er", egypt: "إير", tip: "راء من الحلق (قريبة من الغين الخفيفة)" },
    { letter: "S s", name: "es", egypt: "إس", tip: "قبل حرف متحرك تتنطق (ز) زي sieben = زيبن" },
    { letter: "T t", name: "te", egypt: "تيه", tip: "عادي" },
    { letter: "U u", name: "u", egypt: "أو (مضمومة)", tip: "زي (أوو)" },
    { letter: "V v", name: "fau", egypt: "فاو", tip: "غالباً تتنطق (ف) زي vier = فير" },
    { letter: "W w", name: "we", egypt: "ڤيه", tip: "دايماً تتنطق (ڤ) زي wie = ڤي" },
    { letter: "X x", name: "iks", egypt: "إكس", tip: "عادي" },
    { letter: "Y y", name: "üpsilon", egypt: "أوبسيلون", tip: "حرف مميز" },
    { letter: "Z z", name: "tset", egypt: "تسيت", tip: "دايماً تتنطق (تس) زي zehn = تسين" },
    { letter: "Ä ä", name: "ä", egypt: "إيه مفتوحة", tip: "أوملاوت (زي a مكسورة شوية: Ärzte)" },
    { letter: "Ö ö", name: "ö", egypt: "أو مضمومة مكسورة", tip: "ضم شفايفك على O وقول E (زي zwölf)" },
    { letter: "Ü ü", name: "ü", egypt: "أو مكسورة رفيعة", tip: "ضم شفايفك على U وقول I (زي tschüs)" },
    { letter: "ß", name: "estset", egypt: "إس تسيت (= ss)", tip: "بتتنطق س ممدودة (زي heißen = هايسن)" }
  ],

  numbers0to20: [
    { num: 0, de: "null", eg: "نول" },
    { num: 1, de: "eins", eg: "آينس" },
    { num: 2, de: "zwei", eg: "تسڤاي" },
    { num: 3, de: "drei", eg: "دراي" },
    { num: 4, de: "vier", eg: "فير" },
    { num: 5, de: "fünf", eg: "فونف" },
    { num: 6, de: "sechs", eg: "زيكس" },
    { num: 7, de: "sieben", eg: "زيبن" },
    { num: 8, de: "acht", eg: "أخت" },
    { num: 9, de: "neun", eg: "نوين" },
    { num: 10, de: "zehn", eg: "تسين" },
    { num: 11, de: "elf", eg: "إلف" },
    { num: 12, de: "zwölf", eg: "تسڤولف" },
    { num: 13, de: "dreizehn", eg: "دراي تسين" },
    { num: 14, de: "vierzehn", eg: "فير تسين" },
    { num: 15, de: "fünfzehn", eg: "فونف تسين" },
    { num: 16, de: "sechzehn", eg: "زيش تسين (شيلنا s)" },
    { num: 17, de: "siebzehn", eg: "زيب تسين (شيلنا en)" },
    { num: 18, de: "achtzehn", eg: "أخت تسين" },
    { num: 19, de: "neunzehn", eg: "نوين تسين" },
    { num: 20, de: "zwanzig", eg: "تسڤانتسيش" }
  ],

  numbersBig: [
    { num: "21", de: "einundzwanzig", note: "واحد و عشرين (من غير s)" },
    { num: "22", de: "zweiundzwanzig", note: "اتنين و عشرين" },
    { num: "25", de: "fünfundzwanzig", note: "خمسة و عشرين" },
    { num: "30", de: "dreißig", note: "الوحيدة بالـ ß" },
    { num: "40", de: "vierzig", note: "أربعين" },
    { num: "45", de: "fünfundvierzig", note: "خمسة و أربعين (تتقري من اليمين للشمال!)" },
    { num: "50", de: "fünfzig", note: "خمسين" },
    { num: "60", de: "sechzig", note: "ستين (شيلنا s)" },
    { num: "70", de: "siebzig", note: "سبعين (شيلنا en)" },
    { num: "80", de: "achtzig", note: "تمانين" },
    { num: "90", de: "neunzig", note: "تسعين" },
    { num: "100", de: "(ein)hundert", note: "مية" },
    { num: "200", de: "zweihundert", note: "ميتين" },
    { num: "1.000", de: "(ein)tausend", note: "ألف" },
    { num: "4.520", de: "viertausendfünfhundertzwanzig", note: "الرقم بيتكتب كلمة واحدة متصلة!" },
    { num: "100.000", de: "(ein)hunderttausend", note: "ميت ألف" },
    { num: "1.000.000", de: "eine Million", note: "مليون (اسم مؤنث)" },
    { num: "1.000.000.000", de: "eine Milliarde", note: "مليار (اسم مؤنث)" }
  ],

  unit1: {
    title: "الوحدة الأولى: Guten Tag!",
    subtitle: "صفحات 8 – 17 من كتاب Netzwerk Neu A1",
    intro: "دي أول خطوة ليك في الألماني! هتتعلم فيها إزاي تسلّم على الناس (سواء صحابك أو حد رسمي)، تقدّم نفسك وغيرك، تسأل عامل إيه، تقول إنت منين وساكن فين وبتتكلم لغات إيه، وتعد من 0 لـ 20، وتقول رقم تليفونك وإيميلك وتستهجى اسمك بالحروف الألماني.",
    quickSummary: [
      { title: "التحية والوداع", points: [
        "ودّي (صحاب): Hallo! / Tschüs! / Ciao! / Bis bald!",
        "رسمي: Guten Morgen / Guten Tag / Guten Abend / Auf Wiedersehen!",
        "قبل النوم: Gute Nacht! (تصبح على خير)"
      ]},
      { title: "تقديم نفسك والسؤال عن الحال", points: [
        "ودّي: Wie heißt du? / Wer bist du? / Wie geht's dir?",
        "رسمي: Wie heißen Sie? / Wie ist Ihr Name? / Wie geht es Ihnen?",
        "الرد: Ich heiße ... / Ich bin ... / Danke, sehr gut! / Auch gut, danke."
      ]},
      { title: "البلد والسكن واللغات", points: [
        "Woher kommst du? ← Ich komme aus Ägypten. (أنا من مصر)",
        "خلي بالك: aus der Schweiz / aus der Türkei / aus der Ukraine / aus den USA",
        "Wo wohnst du? ← Ich wohne in Kairo. | Welche Sprachen sprichst du? ← Arabisch und Deutsch."
      ]},
      { title: "القواعد الذهبية للوحدة 1", points: [
        "الفعل دايماً رقم 2 في الجملة العادية (Aussagesatz) وفي سؤال أداة الاستفهام (W-Frage)!",
        "نهايات الفعل: ich (-e) | du (-st) | er/sie (-t) | Sie (-en)",
        "فعل sein شاذ: ich bin | du bist | er/sie ist | Sie sind"
      ]}
    ],
    sections: [
      {
        id: "u1-international",
        badge: "ص 8–9",
        title: "1. كلمات ألماني عالمية (Deutsch international)",
        explanation: "الكتاب بيبدأ يكسّر الرهبة وبيوريك إنك أصلاً عارف كلمات ألماني منتشرة في لغات العالم زي Kindergarten و Autobahn. احفظ الـ 9 كلمات دول بالأداة بتاعتهم من دلوقتي:",
        type: "cards-grid",
        items: [
          { de: "das Butterbrot", eg: "عيش بالزبدة", art: "das" },
          { de: "der Kranke", eg: "العيّان / المريض", art: "der" },
          { de: "die Autobahn", eg: "الطريق السريع / الأوتوستراد", art: "die" },
          { de: "das Handtuch", eg: "فوطة", art: "das" },
          { de: "das Würstchen / Würstel", eg: "سوسيس / سجق صغير", art: "das" },
          { de: "die Nudeln (Pl.)", eg: "مكرونة", art: "pl" },
          { de: "der Kindergarten", eg: "حضانة", art: "der" },
          { de: "der Koffer", eg: "شنطة سفر", art: "der" },
          { de: "die Flasche", eg: "إزازة", art: "die" }
        ]
      },
      {
        id: "u1-greetings",
        badge: "ص 10–11",
        title: "2. التحيات وتقديم نفسك: الودّي (du) ضد الرسمي (Sie)",
        explanation: "في الألماني فيه فرق مهم جداً بين الكلام مع صحابك أو حد قريب من سنك (بتستخدم du + الاسم الأول بس) وبين الكلام مع دكتورك أو مديرك أو حد غريب أكبر منك (بتستخدم Sie بحرف كبير + Herr/Frau واسم العيلة).",
        type: "comparison",
        colA: {
          title: "ودّي / غير رسمي (du + الاسم الأول)",
          items: [
            { de: "Hallo Nina! / Hallo Niklas!", eg: "أهلاً يا نينا! / أهلاً يا نيكلاس!" },
            { de: "Wie heißt du? / Wer bist du?", eg: "اسمك إيه؟ / إنت مين؟" },
            { de: "Ich heiße Niklas. / Ich bin Julia.", eg: "اسمي نيكلاس. / أنا يوليا." },
            { de: "Wie geht's? / Wie geht's dir?", eg: "إزيك؟ / عامل إيه؟" },
            { de: "Danke, sehr gut! Und dir?", eg: "شكراً زي الفل! وإنت؟" },
            { de: "Ganz gut, danke. / Auch gut, danke.", eg: "ماشي الحال / وأنا كمان كويس." },
            { de: "Tschüs! / Ciao! / Bis bald!", eg: "سلام! / أشوفك قريب!" }
          ]
        },
        colB: {
          title: "رسمي (Sie + Herr/Frau + اسم العيلة)",
          items: [
            { de: "Guten Morgen / Guten Tag / Guten Abend!", eg: "صباح الخير / نهارك سعيد / مساء الخير!" },
            { de: "Wie heißen Sie? / Wie ist Ihr Name?", eg: "اسم حضرتك إيه؟" },
            { de: "Mein Name ist Nina Weber. / Ich heiße Oliver Hansen.", eg: "اسمي نينا فيبر. / اسمي أوليفر هانزن." },
            { de: "Das ist Frau Kowalski. / Das ist Herr Hansen.", eg: "دي مدام كوفالسكي. / ده أستاذ هانزن." },
            { de: "Wie geht es Ihnen?", eg: "أخبار حضرتك إيه؟" },
            { de: "Danke, gut! Und Ihnen?", eg: "شكراً بخير! وحضرتك؟" },
            { de: "Auf Wiedersehen! / Gute Nacht!", eg: "مع السلامة! / تصبح على خير!" }
          ]
        }
      },
      {
        id: "u1-origin",
        badge: "ص 12 & 14–15",
        title: "3. البلد والسكن واللغات (Woher? Wo? Welche Sprachen?)",
        explanation: "عشان تتكلم عن نفسك أو غيرك، محتاج 3 أسئلة أساسية: إنت منين (Woher)، ساكن فين (Wo)، وبتتكلم لغات إيه (Welche Sprachen). خلي بالك من تريكة مهمة جداً في الدول!",
        type: "note-and-table",
        callout: {
          type: "warning",
          title: "تريكة الامتحانات: حرف الجر aus مع الدول!",
          text: "معظم الدول ملهاش أداة فتقول aus مباشرة: aus Ägypten (من مصر)، aus Deutschland، aus Spanien، aus Japan.\nلكن فيه دول معينة ليها أداة ولازم تتغيّر مع aus:\n• aus der Schweiz (من سويسرا)\n• aus der Türkei (من تركيا)\n• aus der Ukraine (من أوكرانيا)\n• aus den USA (من أمريكا — عشان جمع!)"
        },
        headers: ["السؤال (رسمي / ودّي)", "الإجابة بالألماني", "المعنى بالعامية المصرية"],
        rows: [
          ["Woher kommen Sie? / Woher kommst du?", "Ich komme aus Ägypten / aus Deutschland.", "إنت منين؟ — أنا من مصر / من ألمانيا."],
          ["Wo wohnen Sie? / Wo wohnst du?", "Ich wohne in Kairo / in Frankfurt.", "ساكن فين؟ — ساكن في القاهرة / فرانكفورت."],
          ["Welche Sprachen sprechen Sie? / sprichst du?", "Ich spreche Arabisch, Englisch und Deutsch.", "بتتكلم لغات إيه؟ — بتكلم عربي وإنجليزي وألماني."],
          ["Wer ist das?", "Das ist Frau Lang. Sie kommt aus Deutschland.", "مين دي؟ — دي مدام لانج، هي من ألمانيا."]
        ]
      },
      {
        id: "u1-grammar",
        badge: "ص 11–12 & 17",
        title: "4. قواعد الوحدة الأولى (Grammatik)",
        explanation: "قواعد الوحدة الأولى بسيطة بس هي أساس الألماني كله! أهم قاعدتين: مكان الفعل رقم (2) دايماً، وتصريف الأفعال حسب الضمير.",
        type: "grammar-u1"
      },
      {
        id: "u1-numbers-alpha",
        badge: "ص 13",
        title: "5. الأرقام 0–20 والأبجدية والإيميل وجمل الإنقاذ",
        explanation: "اضغط على أي رقم أو حرف عشان تسمع نطقه بالألماني! وفي آخر الجزء ده هتلاقي رموز الإيميل وجمل 'معلش قولها تاني بالراحة' اللي بتنقذك في أي محادثة.",
        type: "u1-numbers-alphabet"
      },
      {
        id: "u1-wg",
        badge: "ص 16",
        title: "6. قصة الفيديو: Die Netzwerk-WG (الحلقات 1–3)",
        explanation: "في آخر كل وحدة فيه فيديو قصير عن شقة شباب في ميونخ (WG = سكن مشترك). في الوحدة الأولى بنتعرف على سكان الشقة:",
        type: "bullets",
        bullets: [
          "<strong>Anna (آنا):</strong> لسه جديدة في الشقة وجاية من برلين (kommt aus Berlin).",
          "<strong>Bea (بيا) و Luca (لوكا) و Max (ماكس):</strong> ساكنين مع بعض في ميونخ (wohnen in München).",
          "<strong>Bea:</strong> أصلها من هانوفر (kommt aus Hannover) ورقم موبايلها 0154-76895321.",
          "<strong>Luca:</strong> من ميونخ (kommt aus München).",
          "<strong>Max:</strong> مكنش موجود في الشقة وقت وصول آنا عشان كان في الجامعة (er ist an der Uni)."
        ]
      }
    ]
  },

  unit2: {
    title: "الوحدة التانية: Freunde, Kollegen und ich",
    subtitle: "صفحات 18 – 27 من كتاب Netzwerk Neu A1",
    intro: "في الوحدة التانية هنطلع خطوة لقدام! هنتكلم عن الهوايات وإيه اللي بتحب تعمله (gern)، أيام الأسبوع وتظبيط خروجات مع صحابك، المهن والشغل وأوقات الإجازة، الأرقام الكبيرة لحد المليار، وهنفهم سر الأدوات (der / das / die) والجمع وتصريف كل الضمائر والأفعال الشاذة، وكمان إزاي تملى استمارة ألماني!",
    quickSummary: [
      { title: "الهوايات والخروجات", points: [
        "لما تقول بحب أعمل كذا، حط كلمة gern بعد الفعل: Ich koche gern. / Ich lese gern.",
        "الردود: Ja, sehr gern! (آه جداً) | Es geht so. (نص نص) | Nein, nicht so gern. (مش أوي)",
        "تظبيط خروجة: Gehen wir ins Kino? – Ja, gern! / Nein, das geht leider nicht. (للأسف مش هينفع)"
      ]},
      { title: "أيام الأسبوع والمواعيد", points: [
        "Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag",
        "مع الأيام والويك إند دايماً بنستخدم am: am Montag / am Freitag / am Wochenende",
        "سؤال هل (Ja-/Nein-Frage) الفعل بيجي رقم 1 وصوتك بيعلى ↗ في الآخر: Gehen wir am Sonntag? ↗"
      ]},
      { title: "الشغل والمهن والأرقام الكبيرة", points: [
        "Was bist du von Beruf? ← Ich bin Student/Ingenieur/Arzt... (من غير أداة!)",
        "التأنيث في المهن: زود -in في الآخر: der Informatiker → die Informatikerin",
        "الأرقام فوق 20 بتتقري من اليمين للشمال: 45 = fünfundvierzig (خمسة وأربعين!)"
      ]},
      { title: "قواعد الوحدة التانية الذهبية", points: [
        "أدوات التعريف بالألوان: der (مذكر - أزرق) | das (محايد - أخضر) | die (مؤنث - أحمر) | die (جمع - بنفسجي)",
        "أفعال شاذة مع du و er/es/sie بس: lesen → liest | sprechen → spricht | fahren → fährt",
        "فعل haben: ich habe, du hast, er/es/sie hat, wir haben, ihr habt, sie/Sie haben"
      ]}
    ],
    sections: [
      {
        id: "u2-hobbies",
        badge: "ص 18–20",
        title: "1. الهوايات (Hobbys) وإزاي تقول بحب أعمل إيه",
        explanation: "أسهل طريقة تقول بيها 'أنا بحب أعمل كذا' في الألماني إنك تجيب الفعل وتزود جنبه كلمة gern! مثلاً: Ich schwimme (أنا بعوم) ← Ich schwimme gern (أنا بحب العوم).",
        type: "cards-grid",
        items: [
          { de: "fotografieren", eg: "التصوير / يصوّر", art: "verb" },
          { de: "singen", eg: "الغناء / يغنّي", art: "verb" },
          { de: "kochen", eg: "الطبخ / يطبخ", art: "verb" },
          { de: "schwimmen", eg: "السباحة / يعوم", art: "verb" },
          { de: "reisen", eg: "السفر / يسافر", art: "verb" },
          { de: "tanzen", eg: "الرقص / يرقص", art: "verb" },
          { de: "joggen", eg: "الجري / يجري", art: "verb" },
          { de: "Musik hören", eg: "سماع المزيكا", art: "verb" },
          { de: "ins Kino gehen", eg: "يروح السينما", art: "verb" },
          { de: "lesen", eg: "القراءة / يقرأ", art: "verb" }
        ]
      },
      {
        id: "u2-days-plans",
        badge: "ص 21",
        title: "2. أيام الأسبوع والخروجات ونغمة الجملة (Satzmelodie)",
        explanation: "لما تيجي تظبّط خروجة مع صاحبك، كل أيام الأسبوع مذكر (der) ولما نقول 'يوم كذا' بنحط قبلها am. وكمان كل أماكن الخروج في الدرس ده محايد (das) فـ (in + das) بتختصر وتبقى ins!",
        type: "u2-days-plans"
      },
      {
        id: "u2-jobs",
        badge: "ص 22–23",
        title: "3. الشغل والمهن وأوقات العمل (Mein Beruf)",
        explanation: "في الألماني لما تقول مهنتك بعد sein مبتحطش أداة نكرة (بتقول Ich bin Student مش ein Student). ولتحويل أغلب المهن من مذكر لمؤنث بنضيف -in في الآخر (ولو فيها a/o/u أحياناً تاخد أوملاوت زي der Arzt ← die Ärztin).",
        type: "note-and-table",
        callout: {
          type: "info",
          title: "أهم أسئلة الشغل والإجازات (Redemittel ص 23 و 27)",
          text: "• Was sind Sie von Beruf? / Was bist du von Beruf? ← حضرتك/إنت شغال إيه؟\n• Ich bin Studentin / Ingenieur / Arzt / Informatiker. ← أنا طالبة / مهندس / دكتور / مبرمج.\n• Wann arbeiten Sie? / Wann arbeitest du? ← بتشتغل إمتى؟ ← Ich arbeite am Montag / von Montag bis Freitag.\n• Wann haben Sie frei? / Wann hast du frei? ← إجازتك إمتى؟ ← Ich habe am Freitag frei. / Ich arbeite am Freitag nicht."
        },
        headers: ["المهنة (مذكر der)", "المهنة (مؤنث die)", "المعنى بالعامية المصرية"],
        rows: [
          ["der Taxifahrer", "die Taxifahrerin", "سواق / سواقة تاكسي"],
          ["der Student", "die Studentin", "طالب / طالبة جامعة"],
          ["der Arzt", "die Ärztin", "دكتور / دكتورة"],
          ["der Kellner", "die Kellnerin", "ويتر / جرسونة"],
          ["der Krankenpfleger", "die Krankenpflegerin", "ممرّض / ممرّضة"],
          ["der Informatiker", "die Informatikerin", "مبرمج / مهندس IT"],
          ["der Ingenieur", "die Ingenieurin", "مهندس / مهندسة"],
          ["der Lehrer", "die Lehrerin", "مدرّس / مدرّسة"],
          ["der Verkäufer", "die Verkäuferin", "بيّاع / بيّاعة"],
          ["der Architekt", "die Architektin", "مهندس معماري / مهندسة معمارية"],
          ["der Friseur", "die Friseurin", "حلاق / كوافيرة"]
        ]
      },
      {
        id: "u2-grammar",
        badge: "ص 20–24 & 27",
        title: "4. قواعد الوحدة التانية: الأفعال + الأدوات بالألوان + الجمع",
        explanation: "دي أهم صفحة قواعد في أول وحدتين: هنكمل كل الضمائر (بما فيها wir و ihr)، الأفعال الشاذة اللي الحرف المتحرك فيها بيتغير، فعلي sein و haben كاملين، سؤال هل (Ja-/Nein-Frage)، سر حفظ الأدوات بالألوان، والـ 5 نهايات للجمع!",
        type: "grammar-u2"
      },
      {
        id: "u2-numbers-big",
        badge: "ص 22 & 27",
        title: "5. الأرقام من 20 لحد المليار + المحوّل التفاعلي",
        explanation: "في الألماني من أول 21 لحد 99 بننطق الآحاد الأول وبعدين und وبعدين العشرات! زي العربي بالظبط ('خمسة وأربعين' = fünfundvierzig)! جرب تكتب أي رقم تحت وهتشوفه وتسمعه بالألماني فوراً.",
        type: "u2-numbers-converter"
      },
      {
        id: "u2-form",
        badge: "ص 25",
        title: "6. ملء استمارة ألماني (Neu im Club — Formular ausfüllen)",
        explanation: "لما تسجّل في نادي أو كورس أو أي مكان في ألمانيا، دي أهم الخانات اللي هتقابلك في أي استمارة (Formular):",
        type: "note-and-table",
        headers: ["الخانة في الاستمارة", "المعنى بالعامية", "مثال حقيقي (من الكتاب ص 25)"],
        rows: [
          ["Vorname", "الاسم الأول", "Jonathan"],
          ["Nachname / Familienname", "اسم العيلة / اللقب", "Miller"],
          ["Geschlecht", "النوع (ذكر / أنثى / بدون تحديد)", "männlich / weiblich / keine Angabe"],
          ["Geburtsdatum", "تاريخ الميلاد (يوم.شهر.سنة)", "01.04.1994"],
          ["Geburtsort", "مكان الميلاد", "New York"],
          ["Adresse (Straße, Hausnummer)", "العنوان (الشارع ورقم العمارة)", "Goethestr. 7"],
          ["Postleitzahl (PLZ), Wohnort", "الرمز البريدي والمدينة", "10711 Berlin"],
          ["Telefonnummer / Handynummer", "رقم التليفون / الموبايل", "0171-12085614"],
          ["Schule / Firma", "المدرسة / الجامعة / الشركة", "Uni Kairo / Firma ..."]
        ]
      },
      {
        id: "u2-wg",
        badge: "ص 26",
        title: "7. قصة الفيديو: Die Netzwerk-WG (الحلقات 4–5)",
        explanation: "تكملة قصة شباب الشقة في ميونخ في الوحدة التانية:",
        type: "bullets",
        bullets: [
          "<strong>الحلقة 4 (Gehen wir zusammen?):</strong> ماكس بيحب يلعب كمبيوتر (spielt gern Computer)، وهو وآنا بيتكلموا عن الرياضة وبيظبّطوا ميعاد يروحوا يعوموا سوا (schwimmen).",
          "<strong>الحلقة 5 (Wo arbeitest du?):</strong> بنتعرف على شغل لوكا وآنا — واحد فيهم شغال في المستشفى وبيشتغل بالليل، وآنا بتدرس وبتعمل تدريب عملي (Praktikum) وبتشتغل بعد الضهر."
        ]
      }
    ]
  }
};
