// مركز الامتحانات التقييمية — 3 امتحانات شاملة على نمط Start Deutsch 1 & Netzwerk Neu Kapiteltests
// كل امتحان مقسّم لمهارات (Hören استماع بالصوت الألماني الأصلي / Lesen قراءة / Grammatik قواعد وأدوات / Wortschatz كلمات ومواقف)

const EXAMS_DATA = [
  // ==================== 1. امتحان الوحدة الأولى (25 سؤال / 20 دقيقة) ====================
  {
    id: "exam-u1",
    title: "امتحان الوحدة الأولى — Kapitel 1 Test",
    subtitle: "Guten Tag! (تحيات، تقديم نفسك، دول ولغات، أرقام 0–20، وقواعد الوحدة 1)",
    durationMin: 20,
    badge: "الوحدة 1 · 25 سؤال",
    questions: [
      // Teil 1: Hören (5)
      {
        section: "Hören (الاستماع)",
        audioText: "Guten Morgen, Frau Weber! Wie geht es Ihnen?",
        prompt: "اسمع الجملة كويس 🔊 — المحادثة دي نوعها إيه وإمتى بتتقال؟",
        options: ["رسمية (Sie) — الصبح بدري", "ودّية (du) — الصبح بدري", "رسمية (Sie) — بالليل وقت النوم", "ودّية (du) — بالنهار"],
        answer: "رسمية (Sie) — الصبح بدري",
        explanation: "قال: Guten Morgen, Frau Weber! Wie geht es Ihnen? (صباح الخير + لقب Frau + Ihnen = رسمية الصبح)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Meine Handynummer ist null eins sieben vier, achtzehn, sechzehn, zwölf.",
        prompt: "اسمع رقم الموبايل 🔊 — أنهي رقم صح؟",
        options: ["0174 - 18 16 12", "0175 - 18 17 12", "0174 - 19 16 11", "0164 - 18 16 20"],
        answer: "0174 - 18 16 12",
        explanation: "null eins sieben vier (0174) — achtzehn (18) — sechzehn (16) — zwölf (12)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich komme aus der Schweiz und wohne in Zürich.",
        prompt: "اسمع كويس 🔊 — الشخص ده منين وساكن فين؟",
        options: ["من سويسرا وساكن في زيورخ", "من النمسا وساكن في زيورخ", "من ألمانيا وساكن في برلين", "من السويد وساكن في فيينا"],
        answer: "من سويسرا وساكن في زيورخ",
        explanation: "aus der Schweiz = من سويسرا | wohne in Zürich = ساكن في زيورخ."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Entschuldigung, das verstehe ich nicht. Bitte ein bisschen langsamer.",
        prompt: "اسمع الجملة 🔊 — إيه اللي الشخص بيطلبه؟",
        options: ["مش فاهم وبيطلب تتكلم بالراحة شوية", "بيقولك إيميله", "بيسألك عن رقم تليفونك", "بيسلّم عليك ويمشي"],
        answer: "مش فاهم وبيطلب تتكلم بالراحة شوية",
        explanation: "Das verstehe ich nicht = مش فاهم ده | Bitte ein bisschen langsamer = بالراحة شوية لو سمحت."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich spreche Arabisch, Englisch und ich lerne Deutsch.",
        prompt: "اسمع كويس 🔊 — أنهي لغة بيتعلمها حالياً (lernt)؟",
        options: ["الألماني (Deutsch)", "الإنجليزي (Englisch)", "العربي (Arabisch)", "الفرنساوي (Französisch)"],
        answer: "الألماني (Deutsch)",
        explanation: "قال: ich lerne Deutsch (أنا بتعلم ألماني)."
      },

      // Teil 2: Lesen (5)
      {
        section: "Lesen (القراءة)",
        passage: "Hallo! Ich heiße Karim Mansour. Ich komme aus Ägypten, aus Alexandria. Jetzt wohne ich in München. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Meine Freundin heißt Sara. Sie kommt aus der Türkei, aber sie wohnt auch in München. Sie spricht Türkisch, Deutsch und Spanisch.",
        prompt: "اقرأ النص فوق — جملة: „Karim wohnt in Alexandria.“ صح (Richtig) ولا غلط (Falsch)؟",
        options: ["Falsch (غلط — هو أصله من إسكندرية بس ساكن في ميونخ)", "Richtig (صح — هو ساكن في إسكندرية)"],
        answer: "Falsch (غلط — هو أصله من إسكندرية بس ساكن في ميونخ)",
        explanation: "النص بيقول: Ich komme aus Alexandria. Jetzt wohne ich in München."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Hallo! Ich heiße Karim Mansour. Ich komme aus Ägypten, aus Alexandria. Jetzt wohne ich in München. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Meine Freundin heißt Sara. Sie kommt aus der Türkei, aber sie wohnt auch in München. Sie spricht Türkisch, Deutsch und Spanisch.",
        prompt: "من نفس النص — Woher kommt Sara? (سارة منين؟)",
        options: ["Aus der Türkei", "Aus Ägypten", "Aus Spanien", "Aus Deutschland"],
        answer: "Aus der Türkei",
        explanation: "Sie kommt aus der Türkei (هي من تركيا)."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Hallo! Ich heiße Karim Mansour. Ich komme aus Ägypten, aus Alexandria. Jetzt wohne ich in München. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Meine Freundin heißt Sara. Sie kommt aus der Türkei, aber sie wohnt auch in München. Sie spricht Türkisch, Deutsch und Spanisch.",
        prompt: "من نفس النص — Welche Sprachen spricht Sara? (سارة بتتكلم إيه؟)",
        options: ["Türkisch, Deutsch und Spanisch", "Arabisch, Englisch und Deutsch", "Türkisch und Arabisch", "Spanisch und Englisch"],
        answer: "Türkisch, Deutsch und Spanisch",
        explanation: "آخر جملة في النص: Sie spricht Türkisch, Deutsch und Spanisch."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Hallo! Ich heiße Karim Mansour. Ich komme aus Ägypten, aus Alexandria. Jetzt wohne ich in München. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Meine Freundin heißt Sara. Sie kommt aus der Türkei, aber sie wohnt auch in München. Sie spricht Türkisch, Deutsch und Spanisch.",
        prompt: "من نفس النص — جملة: „Karim und Sara wohnen in München.“ صح ولا غلط؟",
        options: ["Richtig (صح)", "Falsch (غلط)"],
        answer: "Richtig (صح)",
        explanation: "كريم ساكن في ميونخ وسارة كمان (sie wohnt auch in München)."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Visitenkarte: Selina Lang — Reiseführerin | Ludwigstraße 39, 60327 Frankfurt | E-Mail: selina_lang@guide.de",
        prompt: "اقرأ الكارت — إزاي تنطق علامة (_) و (.) في إيميل سيلينا بالألماني؟",
        options: ["Unterstrich / Punkt", "minus / ät", "Punkt / Unterstrich", "ät / minus"],
        answer: "Unterstrich / Punkt",
        explanation: "العلامة _ اسمها Unterstrich، والنقطة . اسمها Punkt، والـ @ اسمها ät."
      },

      // Teil 3: Grammatik (10)
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار الكلمة الصح: „Guten Tag! Wie ______ Sie?“",
        options: ["heißen", "heißt", "heiße", "bist"],
        answer: "heißen",
        explanation: "مع Sie (حضرتك) الفعل بياخد النهاية -en ← heißen."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار الكلمة الصح: „Hallo! Wer ______ du?“",
        options: ["bist", "bin", "ist", "sind"],
        answer: "bist",
        explanation: "تصريف sein مع du هو bist (Wer bist du?)."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار أداة الاستفهام الصح: „______ kommst du? — Aus Ägypten.“",
        options: ["Woher", "Wo", "Wer", "Wie"],
        answer: "Woher",
        explanation: "السؤال عن البلد والأصل مع kommen aus دايماً بـ Woher (منين؟)."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار أداة الاستفهام الصح: „______ wohnst du? — In Kairo.“",
        options: ["Wo", "Woher", "Was", "Wer"],
        answer: "Wo",
        explanation: "السؤال عن مكان السكن مع wohnen in دايماً بـ Wo (فين؟)."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار الصح مع قاعدة aus: „Olivia kommt ______ USA.“",
        options: ["aus den", "aus der", "aus dem", "aus"],
        answer: "aus den",
        explanation: "الـ USA جمع، فمع حرف الجر aus بتبقى aus den USA."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار الصح مع قاعدة aus: „Ali kommt ______ Irak.“",
        options: ["aus dem", "aus der", "aus den", "aus"],
        answer: "aus dem",
        explanation: "العراق وإيران ولبنان واليمن دول مذكرة (der) ← مع aus بتبقى aus dem!"
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار تصريف الفعل الصح: „Gabriel ______ Portugiesisch und Deutsch.“",
        options: ["spricht", "sprecht", "spreche", "sprichst"],
        answer: "spricht",
        explanation: "فعل sprechen شاذ مع du/er/sie: الـ e بتتحول لـ i ← Er spricht."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار الضمير الصح: „Das ist Frau Lang. ______ wohnt in Frankfurt.“",
        options: ["Sie", "Er", "Du", "Ich"],
        answer: "Sie",
        explanation: "Frau Lang مؤنث (هي) ← Sie (بحرف كبير لأنها بداية الجملة)."
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "أنهي ترتيب جملة صح 100%؟",
        options: ["Woher kommt Frau Tanaka?", "Woher Frau Tanaka kommt?", "Kommt woher Frau Tanaka?", "Frau Tanaka woher kommt?"],
        answer: "Woher kommt Frau Tanaka?",
        explanation: "في الـ W-Frage أداة الاستفهام رقم 1 والفعل المصرف دايماً رقم 2!"
      },
      {
        section: "Grammatik (القواعد)",
        prompt: "اختار التكملة الصح: „Wie geht es ______ , Herr Hansen?“",
        options: ["Ihnen", "dir", "du", "Sie"],
        answer: "Ihnen",
        explanation: "السؤال الرسمي عن الحال هو: Wie geht es Ihnen? (الودّي: Wie geht's dir?)."
      },

      // Teil 4: Wortschatz & Kommunikation (5)
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى كلمة „das Handtuch“ بالعامية المصرية؟",
        options: ["فوطة", "شنطة سفر", "إزازة", "مكرونة"],
        answer: "فوطة",
        explanation: "das Handtuch = فوطة (من كلمات Deutsch international)."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه الكتابة الصح لرقم 17 بالألماني؟",
        options: ["siebzehn", "siebenzehn", "sechzehn", "siebzig"],
        answer: "siebzehn",
        explanation: "17 = siebzehn (بنشيل en من sieben)، و 16 = sechzehn (بنشيل s من sechs)."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "صاحبك سألك „Wie geht's dir?“ — أنهي رد أنسب؟",
        options: ["Danke, sehr gut! Und dir?", "Auf Wiedersehen!", "Ich komme aus Ägypten.", "Ich heiße Seif."],
        answer: "Danke, sehr gut! Und dir?",
        explanation: "سؤال عن الحال (عامل إيه؟) ← شكراً زي الفل وإنت؟"
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى فعل „buchstabieren“ بالعامية؟",
        options: ["يستهجى الكلمة حرف حرف", "يسافر بره البلد", "يطبخ أكل", "يرد على التليفون"],
        answer: "يستهجى الكلمة حرف حرف",
        explanation: "Kannst du das buchstabieren? = ممكن تستهجاها حرف حرف؟"
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إنت في الشغل الساعة 5 العصر وماشي ومروّح وبتودّع مديرك — تقول إيه؟",
        options: ["Auf Wiedersehen!", "Gute Nacht!", "Guten Morgen!", "Ciao!"],
        answer: "Auf Wiedersehen!",
        explanation: "الوداع الرسمي في الشغل = Auf Wiedersehen! (Gute Nacht قبل النوم بس، و Ciao للصحاب)."
      }
    ]
  },

  // ==================== 2. امتحان الوحدة التانية (25 سؤال / 20 دقيقة) ====================
  {
    id: "exam-u2",
    title: "امتحان الوحدة التانية — Kapitel 2 Test",
    subtitle: "Freunde, Kollegen und ich (هوايات، أيام ومواعيد، مهن، أرقام فوق 20، أدوات وجمع)",
    durationMin: 20,
    badge: "الوحدة 2 · 25 سؤال",
    questions: [
      // Teil 1: Hören (5)
      {
        section: "Hören (الاستماع)",
        audioText: "Gehen wir am Donnerstag ins Kino? Nein, am Donnerstag geht es leider nicht. Am Samstag?",
        prompt: "اسمع المحادثة 🔊 — يوم إيه اللي مش هينفع يروحوا فيه السينما؟",
        options: ["يوم الخميس (Donnerstag)", "يوم السبت (Samstag)", "يوم التلات (Dienstag)", "يوم الجمعة (Freitag)"],
        answer: "يوم الخميس (Donnerstag)",
        explanation: "قال: Nein, am Donnerstag geht es leider nicht (الخميس للأسف مش هينفع)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich arbeite sechsundvierzig Stunden pro Woche. Aber am Montag und Dienstag habe ich frei.",
        prompt: "اسمع كويس 🔊 — الشخص ده بيشتغل كام ساعة في الأسبوع؟",
        options: ["46 ساعة", "64 ساعة", "24 ساعة", "48 ساعة"],
        answer: "46 ساعة",
        explanation: "sechsundvierzig = ستة وأربعين = 46!"
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich bin Ingenieur von Beruf und arbeite bei einer Firma in Berlin.",
        prompt: "اسمع كويس 🔊 — إيه مهنة الشخص ده؟",
        options: ["مهندس (Ingenieur)", "مبرمج (Informatiker)", "دكتور (Arzt)", "مدرس (Lehrer)"],
        answer: "مهندس (Ingenieur)",
        explanation: "Ich bin Ingenieur von Beruf = أنا مهندس."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Mein Hobby ist fotografieren. Ich lese auch gern, aber ich koche nicht so gern.",
        prompt: "اسمع كويس 🔊 — إيه الحاجة اللي مش بيحب يعملها أوي؟",
        options: ["الطبخ (kochen)", "التصوير (fotografieren)", "القراءة (lesen)", "السباحة (schwimmen)"],
        answer: "الطبخ (kochen)",
        explanation: "قال: aber ich koche nicht so gern (بس مش بحب الطبخ أوي)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Das Krankenhaus hat vierhundertachtzig Zimmer.",
        prompt: "اسمع الرقم 🔊 — المستشفى فيها كام أوضة؟",
        options: ["480", "408", "840", "418"],
        answer: "480",
        explanation: "vierhundert (400) + achtzig (80) = 480."
      },

      // Teil 2: Lesen & Formular (5)
      {
        section: "Lesen (القراءة والاستمارة)",
        passage: "Lukas Berger ist 28 Jahre alt. Er ist am 15.06.1998 in Hamburg geboren, aber er wohnt jetzt in Köln (Parkstraße 12, 50667 Köln). Er ist Informatiker und arbeitet von Montag bis Freitag. Am Wochenende hat er frei. In der Freizeit joggt er gern und spielt Tennis.",
        prompt: "من النص فوق — إيه اللي المفروض يتكتب في خانة „Wohnort“ في الاستمارة؟",
        options: ["Köln", "Hamburg", "Parkstraße 12", "Informatiker"],
        answer: "Köln",
        explanation: "اتولد في هامبورج (Geburtsort)، لكن Wohnort = مكان السكن الحالي = Köln!"
      },
      {
        section: "Lesen (القراءة والاستمارة)",
        passage: "Lukas Berger ist 28 Jahre alt. Er ist am 15.06.1998 in Hamburg geboren, aber er wohnt jetzt in Köln (Parkstraße 12, 50667 Köln). Er ist Informatiker und arbeitet von Montag bis Freitag. Am Wochenende hat er frei. In der Freizeit joggt er gern und spielt Tennis.",
        prompt: "من النص — إيه اللي يتكتب في خانة „Geburtsort“ (مكان الميلاد)؟",
        options: ["Hamburg", "Köln", "15.06.1998", "50667"],
        answer: "Hamburg",
        explanation: "Er ist in Hamburg geboren ← Geburtsort = Hamburg."
      },
      {
        section: "Lesen (القراءة والاستمارة)",
        passage: "Lukas Berger ist 28 Jahre alt. Er ist am 15.06.1998 in Hamburg geboren, aber er wohnt jetzt in Köln (Parkstraße 12, 50667 Köln). Er ist Informatiker und arbeitet von Montag bis Freitag. Am Wochenende hat er frei. In der Freizeit joggt er gern und spielt Tennis.",
        prompt: "من النص — جملة: „Lukas arbeitet am Samstag und Sonntag.“ صح ولا غلط؟",
        options: ["Falsch (غلط — عنده إجازة في الويك إند)", "Richtig (صح)"],
        answer: "Falsch (غلط — عنده إجازة في الويك إند)",
        explanation: "النص بيقول: Am Wochenende hat er frei (عنده إجازة السبت والحد)."
      },
      {
        section: "Lesen (القراءة والاستمارة)",
        passage: "Lukas Berger ist 28 Jahre alt. Er ist am 15.06.1998 in Hamburg geboren, aber er wohnt jetzt in Köln (Parkstraße 12, 50667 Köln). Er ist Informatiker und arbeitet von Montag bis Freitag. Am Wochenende hat er frei. In der Freizeit joggt er gern und spielt Tennis.",
        prompt: "من النص — إيه رقم الـ „Postleitzahl“ (الرمز البريدي) بتاع لوكاس؟",
        options: ["50667", "12", "28", "1998"],
        answer: "50667",
        explanation: "الرمز البريدي في ألمانيا 5 أرقام قبل اسم المدينة ← 50667."
      },
      {
        section: "Lesen (القراءة والاستمارة)",
        passage: "Lukas Berger ist 28 Jahre alt. Er ist am 15.06.1998 in Hamburg geboren, aber er wohnt jetzt in Köln (Parkstraße 12, 50667 Köln). Er ist Informatiker und arbeitet von Montag bis Freitag. Am Wochenende hat er frei. In der Freizeit joggt er gern und spielt Tennis.",
        prompt: "من النص — إيه هوايات لوكاس؟",
        options: ["الجري ولعب التنس", "الطبخ والقراءة", "السباحة والغناء", "التصوير والسفر"],
        answer: "الجري ولعب التنس",
        explanation: "In der Freizeit joggt er gern und spielt Tennis."
      },

      // Teil 3: Grammatik & Artikel (10)
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار التصريف الصح: „Betty ______ gern Bücher.“ (lesen)",
        options: ["liest", "lest", "lese", "lesen"],
        answer: "liest",
        explanation: "lesen شاذ مع du و er/es/sie ← الـ e تبقى ie ← liest!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار التصريف الصح: „Wo ______ du?“ (arbeiten)",
        options: ["arbeitest", "arbeitst", "arbeitet", "arbeite"],
        answer: "arbeitest",
        explanation: "الفعل اللي أصله ينتهي بـ t زي arbeiten بنزود e قبل st ← du arbeitest."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار التصريف الصح: „______ ihr am Wochenende frei?“ (haben)",
        options: ["Habt", "Haben", "Hast", "Seid"],
        answer: "Habt",
        explanation: "تصريف haben مع ihr (إنتوا) هو habt."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار التصريف الصح: „______ ihr Studenten?“ (sein)",
        options: ["Seid", "Sind", "Bist", "Habt"],
        answer: "Seid",
        explanation: "تصريف sein مع ihr هو seid!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار التصريف الصح: „Fabian ______ 68.000 Kilometer pro Jahr.“ (fahren)",
        options: ["fährt", "fahrt", "fähre", "fahren"],
        answer: "fährt",
        explanation: "فعل fahren شاذ مع du و er/es/sie (a → ä) ← er fährt."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه أداة التعريف الصح لكلمة „Krankenhaus“ (مستشفى)؟",
        options: ["das", "der", "die"],
        answer: "das",
        explanation: "das Krankenhaus (محايد أخضر — عشان Haus محايد) والجمع die Krankenhäuser."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه أداة التعريف الصح لكلمة „Schlüssel“ (مفتاح)؟",
        options: ["der", "das", "die"],
        answer: "der",
        explanation: "der Schlüssel (مذكر أزرق) والجمع die Schlüssel."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه الجمع الصح لكلمة „das Buch“؟",
        options: ["die Bücher", "die Buchs", "die Buchen", "die Buch"],
        answer: "die Bücher",
        explanation: "das Buch ← die Bücher (نهاية الجمع ¨-er)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه الجمع الصح لكلمة „der Arzt“؟",
        options: ["die Ärzte", "die Arzten", "die Arzts", "die Arzt"],
        answer: "die Ärzte",
        explanation: "der Arzt ← die Ärzte (نهاية الجمع ¨-e)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "أنهي سؤال „Ja-/Nein-Frage“ مكتوب صح 100%؟",
        options: ["Gehen wir am Freitag ins Café?", "Wir gehen am Freitag ins Café?", "Wann gehen wir ins Café?", "Am Freitag gehen wir ins Café?"],
        answer: "Gehen wir am Freitag ins Café?",
        explanation: "سؤال هل (Ja-/Nein-Frage) لازم يبدأ بالفعل رقم 1 مباشرة!"
      },

      // Teil 4: Wortschatz & Kommunikation (5)
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "صاحبك سألك „Liest du gern?“ وعاوز تقوله 'يعني نص نص' — تقول إيه؟",
        options: ["Es geht so.", "Ja, sehr gern!", "Auf Wiedersehen!", "Ich habe frei."],
        answer: "Es geht so.",
        explanation: "Es geht so. = نص نص / مش أوي."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إزاي نكتب رقم 30 بالألماني صح؟",
        options: ["dreißig", "dreizig", "dreizehn", "dreiundzwanzig"],
        answer: "dreißig",
        explanation: "30 هي العشرة الوحيدة اللي بتتكتب بـ ß بدل z ← dreißig!"
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى كلمة „die Rechnung“ (في المطعم مع الجرسون)؟",
        options: ["الفاتورة / شيك الحساب", "البرشامة", "الحقنة", "المفتاح"],
        answer: "الفاتورة / شيك الحساب",
        explanation: "die Rechnung = الفاتورة / الحساب ()."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه المؤنث الصح لمهنة „der Koch“ (طبّاخ)؟",
        options: ["die Köchin", "die Kochin", "die Köcherin", "die Kochen"],
        answer: "die Köchin",
        explanation: "der Koch ← die Köchin (بتاخد أوملاوت + in)."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "أنهي حرف جر بنستخدمه دايماً مع أيام الأسبوع (Montag, Freitag, Wochenende)؟",
        options: ["am", "in", "aus", "bei"],
        answer: "am",
        explanation: "am Montag / am Freitag / am Wochenende."
      }
    ]
  },

  // ==================== 3. الامتحان الشامل المجمّع للوحدتين 1 + 2 (40 سؤال / 35 دقيقة) ====================
  {
    id: "exam-mock-12",
    title: "الامتحان الشامل المجمّع (Kapitel 1 + 2 Mock Test)",
    subtitle: "محاكاة كاملة لامتحان Start Deutsch 1 على أول وحدتين — 40 سؤال مقسّمين على 4 مهارات",
    durationMin: 35,
    badge: "شامل 1+2 · 40 سؤال",
    questions: [
      // Hören (8)
      {
        section: "Hören (الاستماع)",
        audioText: "Hallo! Ich bin Tobias. Ich komme aus Österreich, aus Salzburg, und ich wohne jetzt in München.",
        prompt: "اسمع 🔊 — Tobias أصله منين وساكن فين دلوقتي؟",
        options: ["من النمسا وساكن في ميونخ", "من ألمانيا وساكن في سالزبورج", "من سويسرا وساكن في ميونخ", "من النمسا وساكن في فيينا"],
        answer: "من النمسا وساكن في ميونخ",
        explanation: "Österreich (النمسا) | wohne jetzt in München (ساكن دلوقتي في ميونخ)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Meine Telefonnummer ist null drei null, vierundzwanzig, achtundsechzig, elf.",
        prompt: "اسمع رقم التليفون 🔊 — أنهي رقم صح؟",
        options: ["030 - 24 68 11", "030 - 42 86 11", "030 - 24 68 12", "040 - 24 68 11"],
        answer: "030 - 24 68 11",
        explanation: "030 — vierundzwanzig (24) — achtundsechzig (68) — elf (11)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Gehen wir am Mittwoch ins Restaurant? Ja, super! Um wie viel Uhr?",
        prompt: "اسمع 🔊 — اتفقوا يروحوا فين وإمتى؟",
        options: ["المطعم يوم الأربعاء", "السينما يوم الأربعاء", "المطعم يوم الخميس", "الكافيه يوم التلات"],
        answer: "المطعم يوم الأربعاء",
        explanation: "am Mittwoch (يوم الأربعاء) + ins Restaurant (المطعم)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich bin Ärztin und arbeite nachts und am Wochenende im Krankenhaus.",
        prompt: "اسمع 🔊 — إيه شغلها وإمتى بتشتغل؟",
        options: ["دكتورة وبتشتغل بالليل وفي الويك إند", "ممرضة وبتشتغل الصبح بس", "دكتورة وعندها إجازة في الويك إند", "طالبة وبتشتغل في السينما"],
        answer: "دكتورة وبتشتغل بالليل وفي الويك إند",
        explanation: "Ärztin (دكتورة) + nachts und am Wochenende (بالليل وفي الويك إند)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Wie heißt du? Entschuldigung, noch einmal bitte. Kannst du das buchstabieren?",
        prompt: "اسمع 🔊 — إيه اللي حصل في المحادثة؟",
        options: ["مسمعش الاسم كويس فطلب يعيده ويستهجاه", "بيقوله عنوان إيميله", "بيسأله عن شغله", "بيعتذر عن الميعاد"],
        answer: "مسمعش الاسم كويس فطلب يعيده ويستهجاه",
        explanation: "noch einmal bitte (كمان مرة) + buchstabieren (تستهجاه)."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Tom und ich reisen sehr gern. Wir lieben Italien und Spanien.",
        prompt: "اسمع 🔊 — إيه هواية توم وصاحبه؟",
        options: ["السفر (reisen)", "القراءة (lesen)", "الرقص (tanzen)", "الطبخ (kochen)"],
        answer: "السفر (reisen)",
        explanation: "reisen sehr gern = بيحبوا السفر جداً."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Die Universität ist sehr groß. Sie hat fünfundzwanzigtausend Studenten.",
        prompt: "اسمع الرقم 🔊 — الجامعة فيها كام طالب؟",
        options: ["25.000", "52.000", "2.500", "250.000"],
        answer: "25.000",
        explanation: "fünfundzwanzigtausend = 25 ألف = 25.000."
      },
      {
        section: "Hören (الاستماع)",
        audioText: "Ich komme aus der Ukraine, spreche Deutsch und lerne Englisch.",
        prompt: "اسمع 🔊 — الشخص ده منين؟",
        options: ["من أوكرانيا", "من تركيا", "من سويسرا", "من بولندا"],
        answer: "من أوكرانيا",
        explanation: "aus der Ukraine = من أوكرانيا."
      },

      // Lesen (8)
      {
        section: "Lesen (القراءة)",
        passage: "Anmeldung Sportclub Fit:\nVorname: Mona | Familienname: El-Sayed | Geschlecht: weiblich | Geburtsdatum: 14.03.2001 | Geburtsort: Kairo | Adresse: Goethestr. 19, 10623 Berlin | Beruf: Studentin | Kurs: Yoga (Freitag 18–20 Uhr).",
        prompt: "من الاستمارة — اسم العيلة (Familienname) بتاع منى إيه؟",
        options: ["El-Sayed", "Mona", "Kairo", "Berlin"],
        answer: "El-Sayed",
        explanation: "Familienname / Nachname = اسم العيلة = El-Sayed."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Anmeldung Sportclub Fit:\nVorname: Mona | Familienname: El-Sayed | Geschlecht: weiblich | Geburtsdatum: 14.03.2001 | Geburtsort: Kairo | Adresse: Goethestr. 19, 10623 Berlin | Beruf: Studentin | Kurs: Yoga (Freitag 18–20 Uhr).",
        prompt: "من الاستمارة — جملة: „Mona wohnt in Kairo.“ صح ولا غلط؟",
        options: ["Falsch (غلط — اتولدت في القاهرة بس ساكنة في برلين)", "Richtig (صح)"],
        answer: "Falsch (غلط — اتولدت في القاهرة بس ساكنة في برلين)",
        explanation: "Geburtsort: Kairo (مكان الميلاد) | Adresse: Berlin (عنوان السكن)."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Anmeldung Sportclub Fit:\nVorname: Mona | Familienname: El-Sayed | Geschlecht: weiblich | Geburtsdatum: 14.03.2001 | Geburtsort: Kairo | Adresse: Goethestr. 19, 10623 Berlin | Beruf: Studentin | Kurs: Yoga (Freitag 18–20 Uhr).",
        prompt: "من الاستمارة — إمتى كورس اليوجا بتاع منى؟",
        options: ["يوم الجمعة من 6 لـ 8 بالليل", "يوم الخميس من 6 لـ 8", "يوم الجمعة الصبح", "يوم السبت بالليل"],
        answer: "يوم الجمعة من 6 لـ 8 بالليل",
        explanation: "Freitag 18–20 Uhr = يوم الجمعة من 6 لـ 8 مساءً."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Chat:\nJan: Hallo Lea! Gehen wir am Dienstag ins Museum?\nLea: Hallo Jan! Am Dienstag arbeite ich leider. Und am Donnerstag?\nJan: Donnerstag ist super! Kommt Max auch mit?\nLea: Nein, Max spielt am Donnerstag Fußball.",
        prompt: "من الشات — ليه Lea مش هتقدر تروح المتحف يوم التلات؟",
        options: ["عشان عندها شغل يوم التلات", "عشان بتلعب كورة", "عشان مبتحبش المتاحف", "عشان مسافرة"],
        answer: "عشان عندها شغل يوم التلات",
        explanation: "قالت: Am Dienstag arbeite ich leider (يوم التلات للأسف عندي شغل)."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Chat:\nJan: Hallo Lea! Gehen wir am Dienstag ins Museum?\nLea: Hallo Jan! Am Dienstag arbeite ich leider. Und am Donnerstag?\nJan: Donnerstag ist super! Kommt Max auch mit?\nLea: Nein, Max spielt am Donnerstag Fußball.",
        prompt: "من الشات — هيروحوا المتحف يوم إيه في الآخر؟",
        options: ["يوم الخميس (Donnerstag)", "يوم التلات (Dienstag)", "يوم الاتنين (Montag)", "مش هيروحوا"],
        answer: "يوم الخميس (Donnerstag)",
        explanation: "Jan قال: Donnerstag ist super!"
      },
      {
        section: "Lesen (القراءة)",
        passage: "Chat:\nJan: Hallo Lea! Gehen wir am Dienstag ins Museum?\nLea: Hallo Jan! Am Dienstag arbeite ich leider. Und am Donnerstag?\nJan: Donnerstag ist super! Kommt Max auch mit?\nLea: Nein, Max spielt am Donnerstag Fußball.",
        prompt: "من الشات — جملة: „Max geht am Donnerstag ins Museum.“ صح ولا غلط؟",
        options: ["Falsch (غلط — ماكس بيلعب كورة يوم الخميس)", "Richtig (صح)"],
        answer: "Falsch (غلط — ماكس بيلعب كورة يوم الخميس)",
        explanation: "Lea قالت: Nein, Max spielt am Donnerstag Fußball."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Netzwerk-WG: Anna ist neu in München. Sie kommt aus Berlin. Bea, Luca und Max wohnen schon in der WG. Max ist an der Uni.",
        prompt: "من نص الشقة — Anna جاية من أنهي مدينة؟",
        options: ["Berlin", "München", "Hannover", "Köln"],
        answer: "Berlin",
        explanation: "Sie kommt aus Berlin."
      },
      {
        section: "Lesen (القراءة)",
        passage: "Text: Peter ist Kellner. Er arbeitet 46 Stunden pro Woche in zwei Restaurants. Er hat am Montag und Dienstag frei.",
        prompt: "من النص — كام يوم إجازة عند بيتر في الأسبوع؟",
        options: ["يومين (الاتنين والتلات)", "يوم واحد (الجمعة)", "الويك إند (السبت والحد)", "تلات أيام"],
        answer: "يومين (الاتنين والتلات)",
        explanation: "Er hat am Montag und Dienstag frei."
      },

      // Grammatik & Artikel (14)
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „Woher ______ ihr?“",
        options: ["kommt", "kommen", "kommst", "komme"],
        answer: "kommt",
        explanation: "مع ihr النهاية دايماً -t ← kommt!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „______ du gern Bücher?“ (lesen)",
        options: ["Liest", "Lest", "Lese", "Lesen"],
        answer: "Liest",
        explanation: "lesen مع du ← Liest (e → ie)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „______ ihr gern Bücher?“ (lesen)",
        options: ["Lest", "Liest", "Lesen", "Lese"],
        answer: "Lest",
        explanation: "خدعة امتحانات! مع ihr مفيش تغيير حرف متحرك ← Lest (مش Liest)!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „Wer ______ hier Englisch?“ (sprechen)",
        options: ["spricht", "sprechen", "sprecht", "sprichst"],
        answer: "spricht",
        explanation: "بعد Wer الفعل دايماً زي er/es/sie ← spricht!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „Ich ______ 22 Jahre alt und ______ zwei Geschwister.“",
        options: ["bin / habe", "habe / bin", "bin / hast", "ist / habe"],
        answer: "bin / habe",
        explanation: "العمر بالألماني بياخد sein (Ich bin 22 Jahre alt) مش haben!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „Er kommt ______ Libanon, und sie kommt ______ Türkei.“",
        options: ["aus dem / aus der", "aus der / aus dem", "aus / aus der", "aus den / aus der"],
        answer: "aus dem / aus der",
        explanation: "der Libanon → aus dem Libanon | die Türkei → aus der Türkei."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الصح: „Am Freitag ______ ich frei.“",
        options: ["habe", "bin", "hast", "hat"],
        answer: "habe",
        explanation: "الفعل رقم 2 دايماً! وعنده إجازة = frei haben ← Am Freitag habe ich frei."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الأداة الصح لكلمة „Computer“:",
        options: ["der", "das", "die"],
        answer: "der",
        explanation: "der Computer (مذكر — أزرق)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الأداة الصح لكلمة „Auto“:",
        options: ["das", "der", "die"],
        answer: "das",
        explanation: "das Auto (محايد — أخضر)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الأداة الصح لكلمة „Straße“:",
        options: ["die", "der", "das"],
        answer: "die",
        explanation: "die Straße (مؤنث — أحمر)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الأداة الصح لكلمة „Wochenende“:",
        options: ["das", "der", "die"],
        answer: "das",
        explanation: "das Wochenende (محايد — عشان das Ende محايد)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه الجمع الصح لكلمة „das Glas“ (كوباية)؟",
        options: ["die Gläser", "die Glase", "die Glass", "die Glasen"],
        answer: "die Gläser",
        explanation: "das Glas ← die Gläser (أوملاوت + er)."
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "إيه الجمع الصح لكلمة „die Ärztin“ (دكتورة)؟",
        options: ["die Ärztinnen", "die Ärztinen", "die Ärztins", "die Ärzte"],
        answer: "die Ärztinnen",
        explanation: "كل المهن المؤنثة المنتهية بـ -in بتتجمع بـ -nen (بنون مشددة nn) ← die Ärztinnen!"
      },
      {
        section: "Grammatik & Artikel (القواعد والأدوات)",
        prompt: "اختار الجملة المترتبة صح 100%:",
        options: ["Spielt ihr am Samstag Fußball?", "Ihr spielt am Samstag Fußball?", "Am Samstag ihr spielt Fußball?", "Spielt am Samstag Fußball ihr?"],
        answer: "Spielt ihr am Samstag Fußball?",
        explanation: "سؤال بهل يبدأ بالفعل رقم 1 (Spielt) + الفاعل (ihr) + الوقت + المفعول."
      },

      // Wortschatz & Kommunikation (10)
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى „der Krankenpfleger“ بالعامية؟",
        options: ["ممرّض", "دكتور", "مريض", "سواق تاكسي"],
        answer: "ممرّض",
        explanation: "der Krankenpfleger = ممرّض | der Patient = مريض | der Arzt = دكتور."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى „das Formular“؟",
        options: ["استمارة / أبلكيشن", "قاموس", "سيمنار", "فاتورة"],
        answer: "استمارة / أبلكيشن",
        explanation: "das Formular = استمارة."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى „der Koffer“؟",
        options: ["شنطة سفر", "كوباية", "مفتاح", "قلم"],
        answer: "شنطة سفر",
        explanation: "der Koffer = شنطة سفر."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إزاي تقول 'أنا من مصر' بالألماني؟",
        options: ["Ich komme aus Ägypten.", "Ich wohne aus Ägypten.", "Ich komme in Ägypten.", "Ich bin aus der Ägypten."],
        answer: "Ich komme aus Ägypten.",
        explanation: "kommen aus + اسم البلد بدون أداة ← Ich komme aus Ägypten."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "أنهي يوم بييجي بعد الأربعاء (Mittwoch)؟",
        options: ["Donnerstag (الخميس)", "Dienstag (التلات)", "Freitag (الجمعة)", "Montag (الاتنين)"],
        answer: "Donnerstag (الخميس)",
        explanation: "Montag → Dienstag → Mittwoch → Donnerstag → Freitag → Samstag → Sonntag."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى „Was sind Sie von Beruf?“؟",
        options: ["حضرتك شغال إيه؟", "حضرتك ساكن فين؟", "حضرتك منين؟", "إجازتك إمتى؟"],
        answer: "حضرتك شغال إيه؟",
        explanation: "السؤال الرسمي عن المهنة."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إزاي نكتب رقم 60 بالألماني؟",
        options: ["sechzig", "sechszig", "sechzehn", "siebzig"],
        answer: "sechzig",
        explanation: "60 = sechzig (من غير s) | 16 = sechzehn."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى كلمة „leider“ في „Nein, das geht leider nicht.“؟",
        options: ["للأسف", "بكل سرور", "أكيد", "دايماً"],
        answer: "للأسف",
        explanation: "leider = للأسف."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "إيه معنى „das Wörterbuch“؟",
        options: ["قاموس", "كتاب تدريبات", "كارت مذاكرة", "جدول"],
        answer: "قاموس",
        explanation: "das Wörterbuch = قاموس ()."
      },
      {
        section: "Wortschatz (الكلمات والمواقف)",
        prompt: "في الاستمارة مكتوب „männlich / weiblich“ — معناهم إيه؟",
        options: ["ذكر / أنثى", "أعزب / متزوج", "الاسم الأول / اسم العيلة", "صغير / كبير"],
        answer: "ذكر / أنثى",
        explanation: "männlich = ذكر | weiblich = أنثى (خانة Geschlecht)."
      }
    ]
  }
];
