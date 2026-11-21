// ==================== أدوات مساعدة وتنسيق ====================
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isLtrText(str) {
  const s = String(str ?? "").trim();
  return s.length > 0 && !/[\u0600-\u06FF]/.test(s);
}

// عزل أرقام التليفونات والتواريخ والاقتباسات الألمانية داخل النصوص العربية حتى لا تنعكس في RTL
function formatBidiText(str) {
  const safe = escapeHtml(str);
  return safe
    .replace(/„([^“]+)“/g, '<span class="de-quote-chip" dir="ltr">$1</span>')
    .replace(/(\+?\d{2,5}\s*[-–]\s*\d[\d\s-]*\d)/g, '<span class="de" dir="ltr">$1</span>')
    .replace(/(\b\d{2}\.\d{2}\.\d{4}\b)/g, '<span class="de" dir="ltr">$1</span>')
    .replace(/(\b\d+\s*[–-]\s*\d+\b)/g, '<span class="ltr-inline" dir="ltr">$1</span>');
}

// تنسيق سؤال الامتحان بحيث تظهر الجملة الألمانية في سطر LTR مستقل وعلامة الاستفهام مظبوطة 100%
function formatExamPrompt(prompt, numPrefix = "") {
  const s = String(prompt ?? "");
  const numHtml = numPrefix ? `<span style="color:var(--primary);">${numPrefix}</span> ` : "";

  // 1) نمط: نص عربي: „جملة ألماني“ (فعل اختياري)
  const mEnd = s.match(/^(.+?):\s*„([^“]+)“\s*(\([^)]+\))?\s*$/);
  if (mEnd) {
    const ar = formatBidiText(mEnd[1].trim() + ":");
    const de = escapeHtml(mEnd[2].trim());
    const hint = mEnd[3] ? ` <span class="de-verb-hint">${escapeHtml(mEnd[3])}</span>` : "";
    return `<div>${numHtml}${ar}</div><div class="de-prompt-box" dir="ltr">${de}${hint}</div>`;
  }

  // 2) نمط صح/غلط: نص عربي — جملة: „جملة ألماني“ صح ...؟
  const mTF = s.match(/^(.+?)\s*—\s*جملة:\s*„([^“]+)“\s*(.+)$/);
  if (mTF) {
    const ar = formatBidiText(`${mTF[1].trim()} — ${mTF[3].trim()}`);
    const de = escapeHtml(mTF[2].trim());
    return `<div>${numHtml}${ar}</div><div class="de-prompt-box" dir="ltr">${de}</div>`;
  }

  // 3) نمط سؤال ألماني مباشر بعد الشرطة: من نفس النص — Woher kommt Sara? (سارة منين؟)
  const mInlineQ = s.match(/^(.+?)\s*—\s*([A-Za-zÄÖÜäöüß][^(\u0600-\u06FF]*\?)\s*(\([^)]+\))?\s*$/);
  if (mInlineQ) {
    const ar = formatBidiText(`${mInlineQ[1].trim()}${mInlineQ[3] ? " " + mInlineQ[3].trim() : ""}:`);
    const de = escapeHtml(mInlineQ[2].trim());
    return `<div>${numHtml}${ar}</div><div class="de-prompt-box" dir="ltr">${de}</div>`;
  }

  // 4) نمط سؤال عن معنى جملة ألماني كاملة: إيه معنى „Was sind Sie von Beruf?“؟ أو صاحبك سألك „Liest du gern?“ ...
  const mSent = s.match(/„([^“]*(?:\s|[?!])[^“]*)“/);
  if (mSent && /[?!.]/.test(mSent[1])) {
    const de = escapeHtml(mSent[1].trim());
    const arOnly = s
      .replace(`„${mSent[1]}“`, "الجملة دي")
      .replace(/\s+/g, " ")
      .trim();
    return `<div>${numHtml}${formatBidiText(arOnly)}</div><div class="de-prompt-box" dir="ltr">${de}</div>`;
  }

  // أي سؤال تاني (مع عزل الكلمات الألمانية المفردة داخل „...“ بـ dir="ltr")
  return `<div>${numHtml}${formatBidiText(s)}</div>`;
}

// عزل التلميحات العربية داخل جملة ألماني LTR في تمارين ملء الفراغات
function formatLtrSegmentWithArHints(str) {
  return escapeHtml(str)
    .replace(/(\([^)]*[\u0600-\u06FF][^)]*\)|\[[^\]]*[\u0600-\u06FF][^\]]*\])/g, '<span class="ar-hint" dir="rtl">$1</span>');
}

function renderValueSpan(str) {
  if (isLtrText(str)) {
    return `<span class="de" dir="ltr">${escapeHtml(str)}</span>`;
  }
  return formatBidiText(str);
}

function normalizeText(str) {
  return String(str ?? "")
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

function cleanAudioKey(text) {
  return String(text ?? "")
    .replace(/\|/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ==================== محرك الصوت الألماني الأصلي (Native MP3 + Speed + Smart Fallback) ====================
let speechSpeed = Number(localStorage.getItem("netzwerk_a1_speed_v1") || "1.0");
let activeAudio = null;
let activeSpeakBtn = null;
let cachedVoices = [];

if ("speechSynthesis" in window) {
  const refreshVoices = () => { cachedVoices = window.speechSynthesis.getVoices() || []; };
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function clearSpeakingState() {
  if (activeSpeakBtn) {
    activeSpeakBtn.classList.remove("speaking");
    activeSpeakBtn = null;
  }
}

function pickBestGermanVoice() {
  const list = cachedVoices.length ? cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
  const deVoices = list.filter((v) => v.lang && v.lang.toLowerCase().startsWith("de"));
  if (!deVoices.length) return null;
  const preferred = [
    (v) => /katja|conrad|amala|killian/i.test(v.name) && /natural|online/i.test(v.name),
    (v) => /google deutsch/i.test(v.name),
    (v) => /natural|neural|online/i.test(v.name),
    (v) => v.lang.toLowerCase() === "de-de"
  ];
  for (const test of preferred) {
    const found = deVoices.find(test);
    if (found) return found;
  }
  return deVoices[0];
}

function speakGerman(text, triggerBtn = null) {
  const clean = cleanAudioKey(text);
  if (!clean) return;

  // إيقاف أي صوت شغال
  if (activeAudio) {
    try { activeAudio.pause(); activeAudio.currentTime = 0; } catch (_) {}
    activeAudio = null;
  }
  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (_) {}
  }
  clearSpeakingState();

  if (triggerBtn) {
    activeSpeakBtn = triggerBtn;
    activeSpeakBtn.classList.add("speaking");
  }

  // 1. الطبقة الأولى: ملف MP3 ألماني أصلي محلي (AUDIO_MANIFEST)
  const manifest = typeof AUDIO_MANIFEST !== "undefined" ? AUDIO_MANIFEST : {};
  const mp3Path = manifest[clean.toLowerCase()];

  if (mp3Path) {
    const audio = new Audio(mp3Path);
    audio.playbackRate = speechSpeed;
    activeAudio = audio;
    audio.onended = () => { clearSpeakingState(); activeAudio = null; };
    audio.onerror = () => { clearSpeakingState(); activeAudio = null; fallbackSpeak(clean); };
    audio.play().catch(() => { clearSpeakingState(); fallbackSpeak(clean); });
    return;
  }

  // 2. Fallback للجمل الديناميكية (مثل محوّل الأرقام لأي رقم مخصص)
  fallbackSpeak(clean);
}

function fallbackSpeak(clean) {
  if ("speechSynthesis" in window) {
    const deVoice = pickBestGermanVoice();
    if (deVoice) {
      const utter = new SpeechSynthesisUtterance(clean);
      utter.voice = deVoice;
      utter.lang = "de-DE";
      utter.rate = speechSpeed;
      utter.onend = clearSpeakingState;
      utter.onerror = clearSpeakingState;
      window.speechSynthesis.speak(utter);
      return;
    }
  }
  // محاولة أخيرة عبر Google TTS أونلاين لو المتصفح معلهوش صوت ألماني نهائياً
  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=de&q=${encodeURIComponent(clean)}`;
    const audio = new Audio(url);
    audio.playbackRate = speechSpeed;
    activeAudio = audio;
    audio.onended = clearSpeakingState;
    audio.onerror = clearSpeakingState;
    audio.play().catch(clearSpeakingState);
  } catch (_) {
    clearSpeakingState();
  }
}

function speakBtnHtml(text) {
  return `<button type="button" class="speak-btn" data-speak="${escapeHtml(text)}" title="اسمع النطق الألماني الأصلي">🔊</button>`;
}

function articleBadgeHtml(article, category) {
  if (article === "der") return `<span class="art-badge art-der">der</span>`;
  if (article === "das") return `<span class="art-badge art-das">das</span>`;
  if (article === "die") return `<span class="art-badge art-die">die</span>`;
  if (article === "die (Pl.)") return `<span class="art-badge art-pl">die (Pl.)</span>`;
  if (article === "der/die") return `<span class="art-badge art-der">der</span><span class="art-badge art-die">die</span>`;
  if (category === "أفعال") return `<span class="art-badge art-verb">Verb</span>`;
  return "";
}

function getFullSpeakText(item) {
  const prefix = item.article && item.article !== "der/die" && item.article !== "die (Pl.)" ? `${item.article} ` : "";
  return prefix + item.german;
}

// ==================== احتفال Confetti عند التفوق ====================
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#c8102e", "#f59e0b", "#16a34a", "#2563eb", "#7c3aed", "#ec4899"];
  const pieces = Array.from({ length: 85 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 140,
    w: 7 + Math.random() * 6,
    h: 5 + Math.random() * 5,
    vx: (Math.random() - 0.5) * 4,
    vy: 3 + Math.random() * 4.5,
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 10,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let frames = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frames++;
    if (frames < 120) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(tick);
}

// ==================== تحويل الأرقام إلى الألمانية (0 – 999,999) ====================
function numberToGerman(n) {
  n = Math.floor(Number(n));
  if (isNaN(n) || n < 0 || n > 999999) return "اكتب رقم بين 0 و 999999";
  if (n === 0) return "null";
  if (n === 1) return "eins";

  const ones = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
  const teens = ["zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
  const tens = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

  function under1000(x, isStandalone) {
    let out = "";
    const h = Math.floor(x / 100);
    const rem = x % 100;
    if (h > 0) out += ones[h] + "hundert";
    if (rem > 0) {
      if (rem === 1 && isStandalone) out += "eins";
      else if (rem < 10) out += ones[rem];
      else if (rem < 20) out += teens[rem - 10];
      else {
        const u = rem % 10;
        const t = Math.floor(rem / 10);
        out += (u > 0 ? ones[u] + "und" : "") + tens[t];
      }
    }
    return out;
  }

  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  let result = "";
  if (thousands > 0) result += under1000(thousands, false) + "tausend";
  if (rest > 0) result += under1000(rest, true);
  return result;
}

// ==================== حالة التطبيق والتخزين المحلي ====================
const STORAGE_KEY_LEARNED = "netzwerk_a1_learned_v1";
const STORAGE_KEY_THEME = "netzwerk_a1_theme_v1";
const STORAGE_KEY_EXAMS = "netzwerk_a1_exams_v1";

const ALL_EXERCISES = [
  ...EXERCISES_DATA.map((e) => ({ source: "kb", ...e })),
  ...(typeof UB_EXERCISES_DATA !== "undefined" ? UB_EXERCISES_DATA : [])
];

let learnedSet = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_LEARNED) || "[]"));
let examHistory = JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS) || "{}");
let filterCoreOnly = false;
let filterUnlearnedOnly = false;

function saveLearned() {
  localStorage.setItem(STORAGE_KEY_LEARNED, JSON.stringify([...learnedSet]));
  updateHeroStats();
}

function updateHeroStats() {
  const total = VOCAB_DATA.length;
  const learned = learnedSet.size;
  document.getElementById("statTotalWords").textContent = total;
  document.getElementById("statLearnedWords").textContent = `${learned} / ${total}`;
  document.getElementById("statTotalExercises").textContent = ALL_EXERCISES.length;
  document.getElementById("statTotalExams").textContent = EXAMS_DATA.length;
  const pct = total ? Math.round((learned / total) * 100) : 0;
  const bar = document.getElementById("heroProgressFill");
  if (bar) bar.style.width = `${Math.max(pct, learned > 0 ? 4 : 0)}%`;
}

// ==================== شاشة التحميل، السرعة، المظهر، والتبويبات ====================
function initSplash() {
  const splash = document.getElementById("splashScreen");
  if (!splash) {
    document.body.classList.remove("splash-lock");
    return;
  }
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add("hide");
    document.body.classList.remove("splash-lock");
  };
  // نسمح بإغلاقها بالضغط فقط بعد 500ms عشان متتقفلش بلمسة غير مقصودة على الموبايل
  setTimeout(() => {
    splash.addEventListener("click", dismiss, { once: true });
  }, 500);

  // نبدأ العدّاد بعد ما المتصفح يرسم الـ Splash Screen فعلياً — المدة ثانية ونص (1500ms)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(dismiss, 1500);
    });
  });
}

function initHeaderControls() {
  const saved = localStorage.getItem(STORAGE_KEY_THEME) || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const themeBtn = document.getElementById("themeToggle");
  const updateThemeBtn = (t) => { themeBtn.textContent = t === "dark" ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"; };
  updateThemeBtn(saved);
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY_THEME, next);
    updateThemeBtn(next);
  });

  const speedBtn = document.getElementById("speedToggle");
  const updateSpeedBtn = () => {
    const isSlow = speechSpeed < 0.9;
    speedBtn.textContent = isSlow ? "🐢 النطق: بطيء (0.75x)" : "▶️ النطق: طبيعي (1.0x)";
    speedBtn.classList.toggle("slow-active", isSlow);
  };
  updateSpeedBtn();
  speedBtn.addEventListener("click", () => {
    speechSpeed = speechSpeed < 0.9 ? 1.0 : 0.75;
    localStorage.setItem("netzwerk_a1_speed_v1", String(speechSpeed));
    updateSpeedBtn();
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `tab-${tabId}`));
  syncFloatingTimerVisibility(tabId);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

// ==================== 1. الملخص السريع ====================
function renderSummary() {
  const mount = document.getElementById("summaryMount");
  const renderUnitSummary = (uData, tabTarget) => `
    <div class="card reveal-up">
      <div class="section-header">
        <div>
          <h2>${uData.title}</h2>
          <div style="color:var(--text-muted); font-size:0.9rem;">${uData.subtitle}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="switchTab('${tabTarget}')">📖 الشرح الكامل</button>
          <button class="btn btn-secondary" onclick="switchTab('exercises')">✍️ التمارين</button>
          <button class="btn btn-secondary" onclick="switchTab('exams')">🎓 الامتحان</button>
        </div>
      </div>
      <p style="margin-top:0;">${uData.intro}</p>
      <div class="grid-2">
        ${uData.quickSummary.map((block) => `
          <div class="compare-box">
            <h4>✨ ${block.title}</h4>
            <ul style="margin:0; padding-right:18px;">
              ${block.points.map((pt) => `<li style="margin-bottom:6px;">${pt}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  mount.innerHTML = `
    ${renderUnitSummary(UNITS_DATA.unit1, "unit1")}
    ${renderUnitSummary(UNITS_DATA.unit2, "unit2")}
    <div class="card reveal-up">
      <div class="section-header">
        <h3>🚀 خطة مذاكرة ذكية بالصفحة دي</h3>
        <span class="page-badge">4 خطوات وتقفّل الوحدتين</span>
      </div>
      <div class="grid-2">
        <div class="mini-card"><div><strong>1. افهم الشرح</strong><div class="eg">اقرأ تبويب الوحدة 1 ثم الوحدة 2 واسمع النطق الأصلي بسرعة 0.75x لو لسه بتبدأ.</div></div></div>
        <div class="mini-card"><div><strong>2. احفظ القاموس</strong><div class="eg">افتح القاموس وفعل فلتر ⭐ كلمات الامتحان الأساسية وعلم على اللي حفظته.</div></div></div>
        <div class="mini-card"><div><strong>3. حل كتاب التمارين</strong><div class="eg">افتح تبويب التدريبات واختار Übungsbuch وحل تمارين الكتاب كله بتصحيح فوري.</div></div></div>
        <div class="mini-card"><div><strong>4. قيّم نفسك</strong><div class="eg">ادخل تبويب 🎓 الامتحانات وامتحن استماع وقراءة وقواعد وشوف نقاط ضعفك.</div></div></div>
      </div>
    </div>
  `;
}

// ==================== 2 & 3. شرح الوحدة 1 و 2 ====================
function renderGrammarU1() {
  return `
    <div class="grid-2">
      <div class="compare-box">
        <h4>📌 1. سؤال أداة الاستفهام (W-Frage) — الفعل رقم 2</h4>
        <div class="table-wrap">
          <table>
            <thead><tr><th>1. أداة الاستفهام</th><th>2. الفعل</th><th>3. باقي الجملة</th></tr></thead>
            <tbody>
              <tr><td class="de">Wer</td><td class="de hl-red">bist</td><td class="de">du?</td></tr>
              <tr><td class="de">Wie</td><td class="de hl-red">heißt</td><td class="de">du?</td></tr>
              <tr><td class="de">Woher</td><td class="de hl-red">kommt</td><td class="de">Frau Tanaka?</td></tr>
              <tr><td class="de">Wo</td><td class="de hl-red">wohnen</td><td class="de">Sie?</td></tr>
              <tr><td class="de">Welche Sprachen</td><td class="de hl-red">sprechen</td><td class="de">Sie?</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="compare-box">
        <h4>📌 2. الجملة الخبرية (Aussagesatz) — الفعل رقم 2</h4>
        <div class="table-wrap">
          <table>
            <thead><tr><th>1. الفاعل</th><th>2. الفعل</th><th>3. باقي الجملة</th></tr></thead>
            <tbody>
              <tr><td class="de">Ich</td><td class="de hl-red">bin</td><td class="de">Julia.</td></tr>
              <tr><td class="de">Ich</td><td class="de hl-red">heiße</td><td class="de">Niklas.</td></tr>
              <tr><td class="de">Sie</td><td class="de hl-red">kommt</td><td class="de">aus Japan.</td></tr>
              <tr><td class="de">Ich</td><td class="de hl-red">wohne</td><td class="de">in Zürich.</td></tr>
              <tr><td class="de">Ich</td><td class="de hl-red">spreche</td><td class="de">Deutsch.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <h4 style="margin:18px 0 8px;">📌 3. تصريف الأفعال الأساسية في الوحدة الأولى</h4>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>الضمير</th><th>sein (يكون — شاذ)</th><th>heißen (يُسمى)</th><th>kommen (يأتي)</th><th>wohnen (يسكن)</th><th>sprechen (يتكلم — شاذ)</th></tr>
        </thead>
        <tbody>
          <tr><td class="de">ich (أنا)</td><td class="de hl-red">bin</td><td class="de">heiß<span class="hl-red">e</span></td><td class="de">komm<span class="hl-red">e</span></td><td class="de">wohn<span class="hl-red">e</span></td><td class="de">sprech<span class="hl-red">e</span></td></tr>
          <tr><td class="de">du (إنت)</td><td class="de hl-red">bist</td><td class="de">heiß<span class="hl-red">t</span></td><td class="de">komm<span class="hl-red">st</span></td><td class="de">wohn<span class="hl-red">st</span></td><td class="de">spr<span class="hl-red">i</span>ch<span class="hl-red">st</span></td></tr>
          <tr><td class="de">er / sie (هو / هي)</td><td class="de hl-red">ist</td><td class="de">heiß<span class="hl-red">t</span></td><td class="de">komm<span class="hl-red">t</span></td><td class="de">wohn<span class="hl-red">t</span></td><td class="de">spr<span class="hl-red">i</span>ch<span class="hl-red">t</span></td></tr>
          <tr><td class="de">Sie (حضرتك)</td><td class="de hl-red">sind</td><td class="de">heiß<span class="hl-red">en</span></td><td class="de">komm<span class="hl-red">en</span></td><td class="de">wohn<span class="hl-red">en</span></td><td class="de">sprech<span class="hl-red">en</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="callout info">
      <strong>💡 ملاحظة على heißen و Personalpronomen في النصوص:</strong>
      • فعل <span class="de">heißen</span> آخره <span class="de">ß</span> (زي s)، فعشان كده مع <span class="de">du</span> بنحط <span class="de">-t</span> بس مش <span class="de">-st</span> (<span class="de">du heißt</span>).
      • في النصوص بنعوّض عن الست بـ <span class="de">Sie</span> (هي) وعن الراجل بـ <span class="de">Er</span> (هو): <span class="de">Das ist Frau Lang. Sie kommt aus Deutschland. / Das ist Jan. Er wohnt in Zürich.</span>
    </div>
  `;
}

function renderU1NumbersAlphabet() {
  return `
    <h4>🔢 الأرقام من 0 لـ 20 (اضغط على أي رقم لسماع نطقه الأصلي 🔊)</h4>
    <div class="callout info">
      <strong>💡 سر قراءة الأرقام من 13 لـ 19:</strong>
      بنقرأ الرقم الصغير الأول وبعدين <span class="de">zehn</span> (10)! مثلاً 14 = <span class="de">vierzehn</span>. خلي بالك من 16 (<span class="de">sechzehn</span> شيلنا s) و 17 (<span class="de">siebzehn</span> شيلنا en).
    </div>
    <div class="num-grid">
      ${UNITS_DATA.numbers0to20.map((n) => `
        <div class="num-tile" data-speak="${n.de}">
          <div class="num-digit">${n.num}</div>
          <div class="num-de">${n.de}</div>
          <div class="num-eg">${n.eg}</div>
        </div>
      `).join("")}
    </div>

    <h4 style="margin-top:22px;">🔤 الحروف الألمانية (Das Alphabet + Ä, Ö, Ü, ß) — اضغط على أي حرف 🔊</h4>
    <div class="alpha-grid">
      ${UNITS_DATA.alphabet.map((a) => `
        <div class="alpha-tile" data-speak="${a.letter.split(" ")[0]}">
          <div class="alpha-letter">${a.letter}</div>
          <div class="alpha-name">${a.name}</div>
          <div class="alpha-eg">${a.egypt}</div>
          <div class="alpha-tip">${a.tip}</div>
        </div>
      `).join("")}
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="compare-box">
        <h4>📧 إزاي تقول عنوان الإيميل بالألماني</h4>
        <div class="phrase-row"><div><span class="de">@</span> ← <span class="de hl-red">ät</span></div><span>آت</span></div>
        <div class="phrase-row"><div><span class="de">.</span> ← <span class="de hl-red">Punkt</span></div><span>نقطة (دوت)</span></div>
        <div class="phrase-row"><div><span class="de">-</span> ← <span class="de hl-red">minus</span></div><span>شرطة / داش</span></div>
        <div class="phrase-row"><div><span class="de">_</span> ← <span class="de hl-red">Unterstrich</span></div><span>أندر سكور</span></div>
      </div>
      <div class="compare-box">
        <h4>🛟 جمل الإنقاذ لما متفهمش حد (Gut gesagt: Wie bitte?)</h4>
        <div class="phrase-row">
          <div><div class="de">Wie bitte? Kannst du das buchstabieren?</div><div class="eg">أفندم؟ ممكن تستهجى ده حرف حرف؟</div></div>
          ${speakBtnHtml("Wie bitte? Kannst du das buchstabieren?")}
        </div>
        <div class="phrase-row">
          <div><div class="de">Entschuldigung, noch einmal bitte.</div><div class="eg">معلش، قولها كمان مرة لو سمحت.</div></div>
          ${speakBtnHtml("Entschuldigung, noch einmal bitte.")}
        </div>
        <div class="phrase-row">
          <div><div class="de">Das verstehe ich nicht.</div><div class="eg">أنا مش فاهم ده.</div></div>
          ${speakBtnHtml("Das verstehe ich nicht.")}
        </div>
        <div class="phrase-row">
          <div><div class="de">Bitte ein bisschen langsamer.</div><div class="eg">بالراحة شوية لو سمحت.</div></div>
          ${speakBtnHtml("Bitte ein bisschen langsamer.")}
        </div>
      </div>
    </div>
  `;
}

function renderU2DaysPlans() {
  const days = [
    { de: "Montag", eg: "الاتنين" }, { de: "Dienstag", eg: "التلات" },
    { de: "Mittwoch", eg: "الأربعاء" }, { de: "Donnerstag", eg: "الخميس" },
    { de: "Freitag", eg: "الجمعة" }, { de: "Samstag", eg: "السبت" },
    { de: "Sonntag", eg: "الحد" }
  ];
  const places = [
    { de: "ins Kino", eg: "للسينما (das Kino)" },
    { de: "ins Restaurant", eg: "للمطعم (das Restaurant)" },
    { de: "ins Café", eg: "للكافيه (das Café)" },
    { de: "ins Schwimmbad", eg: "للبيسين (das Schwimmbad)" },
    { de: "ins Stadion", eg: "للاستاد (das Stadion)" },
    { de: "ins Theater", eg: "للمسرح (das Theater)" },
    { de: "ins Museum", eg: "للمتحف (das Museum)" }
  ];
  return `
    <h4>📅 أيام الأسبوع (كلها أداتها der ومع am = يوم ...)</h4>
    <div class="num-grid">
      ${days.map((d) => `
        <div class="num-tile" data-speak="am ${d.de}">
          <div class="num-de">am ${d.de}</div>
          <div class="num-eg">يوم ${d.eg}</div>
        </div>
      `).join("")}
    </div>

    <h4 style="margin-top:16px;">📍 أماكن الخروج (كلها أداتها das ← ins = in das)</h4>
    <div class="grid-3">
      ${places.map((p) => `
        <div class="mini-card">
          <div><span class="de">${p.de}</span><span class="eg">${p.eg}</span></div>
          ${speakBtnHtml(p.de)}
        </div>
      `).join("")}
    </div>

    <div class="grid-2" style="margin-top:16px;">
      <div class="compare-box">
        <h4>💬 محادثة تظبيط خروجة</h4>
        <div class="phrase-row"><div><span class="de">Gehen wir ins Kino? ↗</span><div class="eg">نروح السينما؟</div></div>${speakBtnHtml("Gehen wir ins Kino?")}</div>
        <div class="phrase-row"><div><span class="de">Ja, gern. Wann? ↘</span><div class="eg">أيوة بكل سرور. إمتى؟</div></div>${speakBtnHtml("Ja, gern. Wann?")}</div>
        <div class="phrase-row"><div><span class="de">Am Samstag? ↗</span><div class="eg">يوم السبت؟</div></div>${speakBtnHtml("Am Samstag?")}</div>
        <div class="phrase-row"><div><span class="de">Nee, das geht leider nicht. ↘</span><div class="eg">لأ، للأسف مش هينفع.</div></div>${speakBtnHtml("Nee, das geht leider nicht.")}</div>
        <div class="phrase-row"><div><span class="de">Am Mittwoch? ↗ — Ja, super! ↘</span><div class="eg">يوم الأربعاء؟ — آه، زي الفل!</div></div>${speakBtnHtml("Am Mittwoch? Ja, super!")}</div>
      </div>
      <div class="compare-box">
        <h4>🎵 نغمة الجملة (Satzmelodie) + عامية ألماني!</h4>
        <p style="margin-top:0;">• في <strong>سؤال هل (Ja-/Nein-Frage)</strong> صوتك بيعلى في آخر السؤال <strong>↗</strong>: <span class="de">Gehen wir am Sonntag? ↗</span></p>
        <p>• في <strong>سؤال أداة الاستفهام (W-Frage)</strong> و<strong>الإجابة</strong> صوتك بينزل في الآخر <strong>↘</strong>: <span class="de">Wann gehen wir? ↘ — Am Montag. ↘</span></p>
        <div class="callout warning" style="margin-bottom:0;">
          <strong>🗣️ Gut gesagt: إزاي الألمان بيقولوا "لأ" في الشارع؟</strong>
          بدل <span class="de">nein</span> الرسمية، الألمان في الكلام اليومي بيقولوا كتير <span class="de">nee</span> أو <span class="de">nö</span>، وفي بافاريا والنمسا بيقولوا <span class="de">na</span>!
        </div>
      </div>
    </div>
  `;
}

function renderGrammarU2() {
  return `
    <h4>📌 1. تصريف الأفعال لكل الضمائر (المنتظم + الشاذ + sein &amp; haben)</h4>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>الضمير</th><th>kochen (منتظم)</th><th>arbeiten (آخره t)</th><th>lesen (e→ie)</th><th>sprechen (e→i)</th><th>fahren (a→ä)</th><th>sein (يكون)</th><th>haben (عنده)</th></tr>
        </thead>
        <tbody>
          <tr><td class="de">ich</td><td class="de">koch<span class="hl-red">e</span></td><td class="de">arbeit<span class="hl-red">e</span></td><td class="de">lese</td><td class="de">spreche</td><td class="de">fahre</td><td class="de hl-red">bin</td><td class="de">habe</td></tr>
          <tr><td class="de">du</td><td class="de">koch<span class="hl-red">st</span></td><td class="de">arbeit<span class="hl-red">est</span></td><td class="de">l<span class="hl-red">ie</span>st</td><td class="de">spr<span class="hl-red">i</span>chst</td><td class="de">f<span class="hl-red">ä</span>hrst</td><td class="de hl-red">bist</td><td class="de hl-red">hast</td></tr>
          <tr><td class="de">er/es/sie</td><td class="de">koch<span class="hl-red">t</span></td><td class="de">arbeit<span class="hl-red">et</span></td><td class="de">l<span class="hl-red">ie</span>st</td><td class="de">spr<span class="hl-red">i</span>cht</td><td class="de">f<span class="hl-red">ä</span>hrt</td><td class="de hl-red">ist</td><td class="de hl-red">hat</td></tr>
          <tr><td class="de">wir (إحنا)</td><td class="de">koch<span class="hl-red">en</span></td><td class="de">arbeit<span class="hl-red">en</span></td><td class="de">lesen</td><td class="de">sprechen</td><td class="de">fahren</td><td class="de hl-red">sind</td><td class="de">haben</td></tr>
          <tr><td class="de">ihr (إنتوا)</td><td class="de">koch<span class="hl-red">t</span></td><td class="de">arbeit<span class="hl-red">et</span></td><td class="de">lest</td><td class="de">sprecht</td><td class="de">fahrt</td><td class="de hl-red">seid</td><td class="de">habt</td></tr>
          <tr><td class="de">sie/Sie</td><td class="de">koch<span class="hl-red">en</span></td><td class="de">arbeit<span class="hl-red">en</span></td><td class="de">lesen</td><td class="de">sprechen</td><td class="de">fahren</td><td class="de hl-red">sind</td><td class="de">haben</td></tr>
        </tbody>
      </table>
    </div>
    <div class="callout warning">
      <strong>🔥 قاعدة ذهبية تريحك للأبد:</strong>
      تغيير الحرف المتحرك في الأفعال الشاذة (<span class="de">lesen, sprechen, fahren</span>) بيحصل مع <strong>du</strong> و <strong>er/es/sie</strong> بس! أما <span class="de">ich / wir / ihr / sie / Sie</span> بيرجعوا عادي جداً!
    </div>

    <div class="grid-2" style="margin-top:14px;">
      <div class="compare-box">
        <h4>📌 2. سؤال هل (Ja-/Nein-Frage)</h4>
        <p style="margin-top:0;">مفيش أداة استفهام! بنحط <strong>الفعل رقم (1)</strong> في أول الجملة مباشرة:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>1. الفعل</th><th>2. الفاعل</th><th>3. باقي الجملة</th></tr></thead>
            <tbody>
              <tr><td class="de hl-red">Gehen</td><td class="de">wir</td><td class="de">ins Kino?</td></tr>
              <tr><td class="de hl-red">Liest</td><td class="de">du</td><td class="de">gern?</td></tr>
              <tr><td class="de hl-red">Haben</td><td class="de">Sie</td><td class="de">am Freitag frei?</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="compare-box">
        <h4>📌 3. أدوات التعريف (bestimmter Artikel) بالألوان</h4>
        <p style="margin-top:0;">احفظ كل اسم دايماً بأداته ولونه (استراتيجية حفظ الأدوات بالألوان):</p>
        <div class="phrase-row"><span class="art-badge art-der">der (maskulin — أزرق)</span><span class="de">der Stift, der Computer, der Schlüssel</span></div>
        <div class="phrase-row"><span class="art-badge art-das">das (neutrum — أخضر)</span><span class="de">das Buch, das Auto, das Krankenhaus</span></div>
        <div class="phrase-row"><span class="art-badge art-die">die (feminin — أحمر)</span><span class="de">die Tablette, die Straße, die Rechnung</span></div>
        <div class="phrase-row"><span class="art-badge art-pl">die (Plural — بنفسجي)</span><span class="de">die Bücher, die Ärzte, die Autos</span></div>
      </div>
    </div>

    <h4 style="margin:18px 0 8px;">📌 4. المفرد والجمع (Singular &amp; Plural)</h4>
    <p style="margin-top:0; color:var(--text-muted);">في الألماني كل الأسماء في الجمع بتاخد أداة واحدة بس هي <span class="art-badge art-pl">die</span>، ودي الـ 5 نهايات الأساسية للجمع:</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>نهاية الجمع</th><th>المفرد (Singular)</th><th>الجمع (Plural)</th><th>المعنى بالعامية</th></tr></thead>
        <tbody>
          <tr><td class="de hl-red">(¨)-</td><td class="de">der Kilometer</td><td class="de">die Kilometer</td><td>كيلومتر ← كيلومترات (بدون تغيير)</td></tr>
          <tr><td class="de hl-red">-(e)n</td><td class="de">die Stunde</td><td class="de">die Stunden</td><td>ساعة ← ساعات</td></tr>
          <tr><td class="de hl-red">(¨)-e</td><td class="de">der Tag / der Arzt</td><td class="de">die Tage / die Ärzte</td><td>يوم ← أيام / دكتور ← دكاترة</td></tr>
          <tr><td class="de hl-red">(¨)-er</td><td class="de">das Buch</td><td class="de">die Bücher</td><td>كتاب ← كتب</td></tr>
          <tr><td class="de hl-red">-s</td><td class="de">das Auto / das Restaurant</td><td class="de">die Autos / die Restaurants</td><td>عربية ← عربيات / مطعم ← مطاعم</td></tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderU2NumbersConverter() {
  return `
    <div class="converter-box">
      <strong>🧮 محوّل الأرقام الألماني التفاعلي (جرّب بنفسك!)</strong>
      <div style="font-size:0.88rem; color:var(--text-muted);">اكتب أي رقم من 0 لـ 999,999 وهيتكتبلك ويتنطقلك بالألماني فوراً:</div>
      <div class="converter-row">
        <input type="number" id="numConvInput" class="input-field" min="0" max="999999" value="45" style="width:180px; font-weight:800;" />
        <button type="button" class="btn btn-primary" id="numConvSpeak">🔊 اسمع الرقم</button>
        <button type="button" class="btn btn-secondary" data-preset="21">21</button>
        <button type="button" class="btn btn-secondary" data-preset="45">45</button>
        <button type="button" class="btn btn-secondary" data-preset="480">480</button>
        <button type="button" class="btn btn-secondary" data-preset="1250">1250</button>
        <button type="button" class="btn btn-secondary" data-preset="68000">68000</button>
      </div>
      <div class="converter-output" id="numConvOut">fünfundvierzig</div>
    </div>

    <div class="table-wrap">
      <table>
        <thead><tr><th>الرقم</th><th>بالألماني</th><th>ملحوظة بالعامية</th><th>نطق</th></tr></thead>
        <tbody>
          ${UNITS_DATA.numbersBig.map((n) => `
            <tr>
              <td class="de">${n.num}</td>
              <td class="de hl-red">${n.de}</td>
              <td>${n.note}</td>
              <td>${speakBtnHtml(n.de)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderUnit(unitKey, mountId) {
  const u = UNITS_DATA[unitKey];
  const mount = document.getElementById(mountId);

  const sectionsHtml = u.sections.map((sec) => {
    let body = "";
    if (sec.type === "cards-grid") {
      body = `<div class="grid-3">${sec.items.map((it) => `
        <div class="mini-card">
          <div><span class="de">${it.de}</span><span class="eg">${it.eg}</span></div>
          ${speakBtnHtml(it.de)}
        </div>
      `).join("")}</div>`;
    } else if (sec.type === "comparison") {
      body = `
        <div class="grid-2">
          ${[sec.colA, sec.colB].map((col) => `
            <div class="compare-box">
              <h4>${col.title}</h4>
              ${col.items.map((it) => `
                <div class="phrase-row">
                  <div><div class="de">${it.de}</div><div class="eg">${it.eg}</div></div>
                  ${speakBtnHtml(it.de)}
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>`;
    } else if (sec.type === "note-and-table") {
      body = `
        ${sec.callout ? `<div class="callout ${sec.callout.type}"><strong>${sec.callout.title}</strong>${escapeHtml(sec.callout.text)}</div>` : ""}
        <div class="table-wrap">
          <table>
            <thead><tr>${sec.headers.map((h) => `<th>${h}</th>`).join("")}<th>🔊</th></tr></thead>
            <tbody>
              ${sec.rows.map((r) => `
                <tr>
                  ${r.map((cell) => isLtrText(cell)
                    ? `<td class="de" dir="ltr">${escapeHtml(cell)}</td>`
                    : `<td>${formatBidiText(cell)}</td>`).join("")}
                  <td>${speakBtnHtml(r[0])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`;
    } else if (sec.type === "grammar-u1") body = renderGrammarU1();
    else if (sec.type === "u1-numbers-alphabet") body = renderU1NumbersAlphabet();
    else if (sec.type === "u2-days-plans") body = renderU2DaysPlans();
    else if (sec.type === "grammar-u2") body = renderGrammarU2();
    else if (sec.type === "u2-numbers-converter") body = renderU2NumbersConverter();
    else if (sec.type === "bullets") {
      body = `<ul style="margin:0; padding-right:20px;">${sec.bullets.map((b) => `<li style="margin-bottom:8px;">${b}</li>`).join("")}</ul>`;
    }

    return `
      <article class="card reveal-up" id="${sec.id}">
        <div class="section-header">
          <h3>${sec.title}</h3>
          <span class="page-badge">${sec.badge}</span>
        </div>
        <p style="margin-top:0; color:var(--text-muted);">${sec.explanation}</p>
        ${body}
      </article>
    `;
  }).join("");

  mount.innerHTML = `
    <div class="unit-banner">
      <h2>${u.title}</h2>
      <p><strong>${u.subtitle}</strong> — ${u.intro}</p>
    </div>
    ${sectionsHtml}
  `;
}

function initNumberConverter() {
  const inp = document.getElementById("numConvInput");
  const out = document.getElementById("numConvOut");
  const spk = document.getElementById("numConvSpeak");
  if (!inp || !out) return;

  const update = () => { out.textContent = numberToGerman(inp.value); };
  inp.addEventListener("input", update);
  spk.addEventListener("click", () => speakGerman(out.textContent, spk));
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      inp.value = btn.dataset.preset;
      update();
      speakGerman(out.textContent, spk);
    });
  });
}

// ==================== 4. القاموس الشامل ====================
function initVocab() {
  const catSel = document.getElementById("vocabCatFilter");
  [...new Set(VOCAB_DATA.map((v) => v.category))].forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSel.appendChild(opt);
  });

  const rerender = () => renderVocabGrid();
  document.getElementById("vocabSearch").addEventListener("input", rerender);
  document.getElementById("vocabUnitFilter").addEventListener("change", rerender);
  document.getElementById("vocabCatFilter").addEventListener("change", rerender);
  document.getElementById("vocabArtFilter").addEventListener("change", rerender);

  const coreBtn = document.getElementById("coreOnlyToggle");
  coreBtn.addEventListener("click", () => {
    filterCoreOnly = !filterCoreOnly;
    coreBtn.classList.toggle("active", filterCoreOnly);
    rerender();
  });

  const unlearnedBtn = document.getElementById("unlearnedToggle");
  unlearnedBtn.addEventListener("click", () => {
    filterUnlearnedOnly = !filterUnlearnedOnly;
    unlearnedBtn.classList.toggle("active", filterUnlearnedOnly);
    rerender();
  });

  renderVocabGrid();
}

function getVocabKey(item) { return `${item.unit}:${item.german}`; }

function renderVocabGrid() {
  const q = normalizeText(document.getElementById("vocabSearch").value);
  const unitF = document.getElementById("vocabUnitFilter").value;
  const catF = document.getElementById("vocabCatFilter").value;
  const artF = document.getElementById("vocabArtFilter").value;

  const filtered = VOCAB_DATA.filter((w) => {
    if (unitF !== "all" && String(w.unit) !== unitF) return false;
    if (catF !== "all" && w.category !== catF) return false;
    if (filterCoreOnly && !w.core) return false;
    if (filterUnlearnedOnly && learnedSet.has(getVocabKey(w))) return false;
    if (artF !== "all") {
      if (artF === "der" && !(w.article === "der" || w.article === "der/die")) return false;
      if (artF === "das" && w.article !== "das") return false;
      if (artF === "die" && !(w.article === "die" || w.article === "der/die")) return false;
      if (artF === "pl" && w.article !== "die (Pl.)") return false;
      if (artF === "verb" && w.category !== "أفعال") return false;
      if (artF === "other" && (w.article || w.category === "أفعال")) return false;
    }
    if (q) {
      const hay = normalizeText(`${w.article || ""} ${w.german} ${w.pluralOrForm} ${w.egyptian} ${w.example} ${w.category}`);
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  document.getElementById("vocabCountLabel").textContent = `معروض ${filtered.length} من أصل ${VOCAB_DATA.length} كلمة`;

  const grid = document.getElementById("vocabGrid");
  if (!filtered.length) {
    grid.innerHTML = `<div class="card" style="grid-column:1/-1; text-align:center;">مفيش كلمات مطابقة للبحث ده — جرّب تمسح الفلتر أو تكتب كلمة تانية!</div>`;
    return;
  }

  grid.innerHTML = filtered.map((w) => {
    const key = getVocabKey(w);
    const isLearned = learnedSet.has(key);
    return `
      <div class="vocab-card ${isLearned ? "learned" : ""}">
        <div class="vocab-top">
          <div class="vocab-word-group">
            ${articleBadgeHtml(w.article, w.category)}
            <span class="vocab-de">${escapeHtml(w.german)}</span>
            ${w.pluralOrForm ? `<span class="vocab-plural">(${escapeHtml(w.pluralOrForm)})</span>` : ""}
          </div>
          ${speakBtnHtml(getFullSpeakText(w))}
        </div>
        <div class="vocab-eg">${escapeHtml(w.egyptian)}</div>
        ${w.example ? `<div class="vocab-example">${escapeHtml(w.example)}</div>` : ""}
        <div class="vocab-meta">
          <div>
            <span>الوحدة ${w.unit}</span> · <span>${escapeHtml(w.category)}</span>
            ${w.core ? ` · <span class="core-star" title="كلمة أساسية لامتحان Start Deutsch 1">⭐ امتحان A1</span>` : ""}
          </div>
          <button type="button" class="learn-btn ${isLearned ? "done" : ""}" data-learn-key="${escapeHtml(key)}">
            ${isLearned ? "✅ محفوظة" : "حفظتها"}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ==================== 5. محرك التدريبات التفاعلية (Kursbuch + Übungsbuch) ====================
let currentExUnit = "all";
let currentExSrc = "all";

function initExercises() {
  document.querySelectorAll(".ex-src-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentExSrc = btn.dataset.exsrc;
      document.querySelectorAll(".ex-src-btn").forEach((b) => {
        b.className = b === btn ? "btn btn-primary ex-src-btn" : "btn btn-secondary ex-src-btn";
      });
      renderExercises();
    });
  });

  document.querySelectorAll(".ex-unit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentExUnit = btn.dataset.exunit;
      document.querySelectorAll(".ex-unit-btn").forEach((b) => {
        b.className = b === btn ? "btn btn-primary ex-unit-btn" : "btn btn-secondary ex-unit-btn";
      });
      renderExercises();
    });
  });

  renderExercises();
}

function renderExercises() {
  const mount = document.getElementById("exercisesMount");
  const list = ALL_EXERCISES.filter((ex) => {
    if (currentExUnit !== "all" && String(ex.unit) !== currentExUnit) return false;
    if (currentExSrc !== "all" && ex.source !== currentExSrc) return false;
    return true;
  });

  if (!list.length) {
    mount.innerHTML = `<div class="card" style="text-align:center;">مفيش تدريبات في الفلتر ده.</div>`;
    return;
  }

  mount.innerHTML = list.map((ex) => {
    let body = "";
    if (ex.type === "match") {
      const allLtr = ex.options.every(isLtrText);
      body = ex.items.map((it, idx) => `
        <div class="ex-item" data-ex="${ex.id}" data-idx="${idx}">
          <div class="ex-row">
            <div><strong>${formatBidiText(it.prompt)}</strong></div>
            <select class="ex-select ${allLtr ? "de" : ""}" ${allLtr ? 'dir="ltr"' : ""} data-ex="${ex.id}" data-idx="${idx}">
              <option value="">-- اختار الإجابة --</option>
              ${ex.options.map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}
            </select>
          </div>
          <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
        </div>
      `).join("");
    } else if (ex.type === "fill") {
      body = ex.items.map((it, idx) => {
        const allLtr = it.choices && it.choices.every(isLtrText);
        const lineIsLtr = !/[\u0600-\u06FF]/.test(it.before);
        const control = it.choices
          ? `<select class="ex-select ${allLtr ? "de" : ""}" ${allLtr ? 'dir="ltr"' : ""} data-ex="${ex.id}" data-idx="${idx}">
              <option value="">-- اختار --</option>
              ${it.choices.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}
            </select>`
          : `<input type="text" class="ex-input-inline" dir="ltr" data-ex="${ex.id}" data-idx="${idx}" placeholder="اكتب هنا..." autocomplete="off" />`;
        const lineHtml = lineIsLtr
          ? `<div class="fill-line-ltr" dir="ltr"><span>${formatLtrSegmentWithArHints(it.before)}</span>${control}<span>${formatLtrSegmentWithArHints(it.after)}</span></div>`
          : `<div style="line-height:2.2;"><span>${formatBidiText(it.before)}</span>${control}<span>${formatBidiText(it.after)}</span></div>`;
        return `
          <div class="ex-item" data-ex="${ex.id}" data-idx="${idx}">
            ${lineHtml}
            <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
          </div>
        `;
      }).join("");
    } else if (ex.type === "article-sort") {
      body = `<div class="grid-2">${ex.items.map((it, idx) => `
        <div class="ex-item" data-ex="${ex.id}" data-idx="${idx}">
          <div class="ex-row">
            <strong class="de">${escapeHtml(it.word)}</strong>
            <div class="art-choice-group" data-ex="${ex.id}" data-idx="${idx}">
              ${["der", "das", "die"].map((art) => `<button type="button" class="art-choice-btn" data-art="${art}">${art}</button>`).join("")}
            </div>
          </div>
          <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
        </div>
      `).join("")}</div>`;
    } else if (ex.type === "verb-table") {
      body = `
        <div class="table-wrap">
          <table>
            <thead><tr>${ex.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
            <tbody>
              ${ex.rows.map((r, rIdx) => `
                <tr>
                  <td class="de"><strong>${escapeHtml(r.pronoun)}</strong></td>
                  ${r.cells.map((c, cIdx) => c.prefilled
                    ? `<td class="de hl-red">${escapeHtml(c.prefilled)}</td>`
                    : `<td><input type="text" class="ex-input-inline" data-vtable="${ex.id}" data-r="${rIdx}" data-c="${cIdx}" placeholder="..." autocomplete="off" /></td>`
                  ).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`;
    } else if (ex.type === "word-order") {
      body = ex.sentences.map((s, idx) => {
        const shuffled = [...s.words].sort(() => Math.random() - 0.5);
        if (shuffled.join(" ") === s.words.join(" ") && shuffled.length > 1) {
          [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
        }
        return `
          <div class="order-sentence-box" data-ex="${ex.id}" data-idx="${idx}">
            <div style="font-weight:700; margin-bottom:6px;">${idx + 1}. المعنى المطلوب: <span style="color:var(--primary);">${escapeHtml(s.hint)}</span></div>
            <div class="order-zone" id="oz-ans-${ex.id}-${idx}"></div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; direction:ltr;" id="oz-pool-${ex.id}-${idx}">
              ${shuffled.map((w, wi) => `<button type="button" class="word-chip" data-ex="${ex.id}" data-idx="${idx}" data-wi="${wi}" data-word="${escapeHtml(w)}">${escapeHtml(w)}</button>`).join("")}
            </div>
            <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
          </div>
        `;
      }).join("");
    } else if (ex.type === "dialog-order") {
      body = ex.dialogs.map((d, idx) => {
        const shuffled = [...d.lines].sort(() => Math.random() - 0.5);
        if (shuffled.join("|") === d.lines.join("|") && shuffled.length > 1) {
          [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
        }
        return `
          <div class="order-sentence-box" data-ex="${ex.id}" data-idx="${idx}">
            <div style="font-weight:800; margin-bottom:6px; color:var(--primary);">${escapeHtml(d.title)}</div>
            <div class="order-zone vertical" id="oz-ans-${ex.id}-${idx}"></div>
            <div style="display:flex; flex-direction:column; gap:7px; direction:ltr;" id="oz-pool-${ex.id}-${idx}">
              ${shuffled.map((line, wi) => `<button type="button" class="word-chip" data-ex="${ex.id}" data-idx="${idx}" data-wi="${wi}" data-word="${escapeHtml(line)}">${escapeHtml(line)}</button>`).join("")}
            </div>
            <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
          </div>
        `;
      }).join("");
    } else if (ex.type === "club-form") {
      body = `
        <div class="table-wrap">
          <table>
            <thead><tr><th>الكورس (Kurs)</th><th>اليوم (Tag)</th><th>الوقت (Uhrzeit)</th></tr></thead>
            <tbody>
              <tr><td class="de">Basketball</td><td class="de">Dienstag und Donnerstag</td><td class="de">19–21 Uhr</td></tr>
              <tr><td class="de">Fußball</td><td class="de">Mittwoch</td><td class="de">20–21:30 Uhr</td></tr>
              <tr><td class="de">Karate</td><td class="de">Montag</td><td class="de">18:30–20 Uhr</td></tr>
              <tr><td class="de">Tennis</td><td class="de">Samstag</td><td class="de">15–17 Uhr</td></tr>
              <tr><td class="de">Yoga</td><td class="de">Freitag</td><td class="de">18–20 Uhr</td></tr>
              <tr><td class="de">Zumba</td><td class="de">Montag und Mittwoch</td><td class="de">10–11 Uhr</td></tr>
            </tbody>
          </table>
        </div>
        <form id="clubRegForm" class="compare-box" style="margin-top:12px;">
          <h4>📋 Sportclub „Fit“ — Anmeldung</h4>
          <div class="club-form-grid">
            <div class="form-group"><label>Vorname (الاسم الأول)</label><input class="input-field" name="vorname" required placeholder="مثال: Seif" /></div>
            <div class="form-group"><label>Familienname (اسم العيلة)</label><input class="input-field" name="nachname" required placeholder="مثال: Al-Deen" /></div>
            <div class="form-group"><label>Geschlecht (النوع)</label>
              <select name="geschlecht" required>
                <option value="">-- اختار --</option>
                <option value="männlich">männlich (ذكر)</option>
                <option value="weiblich">weiblich (أنثى)</option>
                <option value="keine Angabe">keine Angabe (بدون تحديد)</option>
              </select>
            </div>
            <div class="form-group"><label>Geburtsdatum (تاريخ الميلاد)</label><input class="input-field de" dir="ltr" name="geburtsdatum" required placeholder="01.04.2000" /></div>
            <div class="form-group"><label>E-Mail (الإيميل)</label><input class="input-field de" dir="ltr" type="email" name="email" required placeholder="name@example.com" /></div>
            <div class="form-group"><label>Telefonnummer (الموبايل)</label><input class="input-field de" dir="ltr" name="tel" required placeholder="+20 10..." /></div>
            <div class="form-group"><label>Adresse: Straße, Hausnummer</label><input class="input-field de" dir="ltr" name="strasse" required placeholder="Tahrirstr. 10" /></div>
            <div class="form-group"><label>Postleitzahl, Wohnort</label><input class="input-field de" dir="ltr" name="ort" required placeholder="11511 Kairo" /></div>
            <div class="form-group"><label>Kurs (اختار الكورس)</label>
              <select name="kurs" id="clubKursSelect" required>
                <option value="">-- اختار كورس --</option>
                <option value="Basketball|Dienstag und Donnerstag">Basketball</option>
                <option value="Fußball|Mittwoch">Fußball</option>
                <option value="Karate|Montag">Karate</option>
                <option value="Tennis|Samstag">Tennis</option>
                <option value="Yoga|Freitag">Yoga</option>
                <option value="Zumba|Montag und Mittwoch">Zumba</option>
              </select>
            </div>
            <div class="form-group"><label>Tag (اليوم — بيتملّى تلقائي)</label><input class="input-field" name="tag" id="clubTagInput" readonly placeholder="هيظهر بعد اختيار الكورس" /></div>
          </div>
          <button type="submit" class="btn btn-primary">✅ تسجيل ومراجعة الاستمارة</button>
          <div id="clubFormResult" style="margin-top:12px;"></div>
        </form>
      `;
    }

    const srcBadge = ex.source === "ub"
      ? `<span class="source-badge-ub">📘 كتاب التمارين ÜB</span>`
      : `<span class="source-badge-kb">📕 كتاب الشرح KB</span>`;

    const actionsHtml = ex.type === "club-form" ? "" : `
      <div class="ex-actions">
        <button type="button" class="btn btn-primary" data-ex-check="${ex.id}">✅ تحقق من إجابتك</button>
        <button type="button" class="btn btn-secondary" data-ex-reveal="${ex.id}">💡 إظهار الحل والشرح</button>
        <button type="button" class="btn btn-secondary" data-ex-reset="${ex.id}">🔄 إعادة المحاولة</button>
        <span class="score-badge" id="score-${ex.id}">النتيجة: لم يُصحّح بعد</span>
      </div>
    `;

    return `
      <article class="card reveal-up" id="card-${ex.id}">
        <div class="section-header">
          <h3>${ex.title}</h3>
          <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
            ${srcBadge}
            <span class="page-badge">الوحدة ${ex.unit} · ${ex.ref}</span>
          </div>
        </div>
        <p style="margin-top:0; color:var(--text-muted); white-space:pre-line;">${escapeHtml(ex.instructions)}</p>
        ${body}
        ${actionsHtml}
      </article>
    `;
  }).join("");

  bindExerciseEvents();
}

function bindExerciseEvents() {
  document.querySelectorAll(".art-choice-group .art-choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const grp = btn.closest(".art-choice-group");
      grp.querySelectorAll(".art-choice-btn").forEach((b) => b.classList.remove("sel-der", "sel-das", "sel-die"));
      btn.classList.add(`sel-${btn.dataset.art}`);
      grp.dataset.selected = btn.dataset.art;
    });
  });

  document.querySelectorAll(".word-chip[data-wi]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const { ex, idx, wi, word } = chip.dataset;
      chip.classList.add("used");
      const zone = document.getElementById(`oz-ans-${ex}-${idx}`);
      const placed = document.createElement("button");
      placed.type = "button";
      placed.className = "word-chip placed";
      placed.textContent = word;
      placed.dataset.wi = wi;
      placed.addEventListener("click", () => {
        placed.remove();
        chip.classList.remove("used");
      });
      zone.appendChild(placed);
    });
  });

  const kursSel = document.getElementById("clubKursSelect");
  const tagInp = document.getElementById("clubTagInput");
  if (kursSel && tagInp) {
    kursSel.addEventListener("change", () => {
      tagInp.value = (kursSel.value.split("|")[1]) || "";
    });
  }
  const clubForm = document.getElementById("clubRegForm");
  if (clubForm) {
    clubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(clubForm);
      const kursName = (fd.get("kurs") || "").split("|")[0];
      document.getElementById("clubFormResult").innerHTML = `
        <div class="callout info" style="margin:0;">
          <strong>🎉 ممتاز! استمارتك متمليّة صح 100% بالألماني:</strong>
          Hallo <span class="de">${escapeHtml(fd.get("vorname"))} ${escapeHtml(fd.get("nachname"))}</span>!
          تم تسجيلك في كورس <span class="de">${escapeHtml(kursName)}</span> يوم <span class="de">${escapeHtml(fd.get("tag"))}</span> — العنوان: <span class="de">${escapeHtml(fd.get("strasse"))}, ${escapeHtml(fd.get("ort"))}</span>.
        </div>`;
      launchConfetti();
    });
  }

  document.querySelectorAll("[data-ex-check]").forEach((btn) => {
    btn.addEventListener("click", () => evaluateExercise(btn.dataset.exCheck, false));
  });
  document.querySelectorAll("[data-ex-reveal]").forEach((btn) => {
    btn.addEventListener("click", () => evaluateExercise(btn.dataset.exReveal, true));
  });
  document.querySelectorAll("[data-ex-reset]").forEach((btn) => {
    btn.addEventListener("click", () => renderExercises());
  });
}

function evaluateExercise(exId, revealOnly) {
  const ex = ALL_EXERCISES.find((e) => e.id === exId);
  if (!ex) return;
  let correctCount = 0;
  let total = 0;

  if (ex.type === "match" || ex.type === "fill") {
    total = ex.items.length;
    ex.items.forEach((it, idx) => {
      const box = document.querySelector(`.ex-item[data-ex="${exId}"][data-idx="${idx}"]`);
      const ctrl = box.querySelector("select, input");
      const fb = document.getElementById(`fb-${exId}-${idx}`);
      if (revealOnly) {
        ctrl.value = it.answer;
        box.classList.remove("wrong");
        box.classList.add("correct");
        fb.className = "ex-feedback show";
        fb.innerHTML = `💡 الحل: <span class="de" dir="ltr">${escapeHtml(it.answer)}</span> — ${formatBidiText(it.explanation)}`;
        correctCount++;
      } else {
        const val = ctrl.value.trim();
        const accepted = it.accepted ? it.accepted.map((a) => a.toLowerCase()) : [it.answer.toLowerCase()];
        const ok = accepted.includes(val.toLowerCase());
        box.classList.toggle("correct", ok);
        box.classList.toggle("wrong", !ok);
        fb.className = "ex-feedback show";
        fb.innerHTML = ok
          ? `✅ برافو! ${formatBidiText(it.explanation)}`
          : `❌ الإجابة الصح: <span class="de" dir="ltr">${escapeHtml(it.answer)}</span> — ${formatBidiText(it.explanation)}`;
        if (ok) correctCount++;
      }
    });
  } else if (ex.type === "article-sort") {
    total = ex.items.length;
    ex.items.forEach((it, idx) => {
      const box = document.querySelector(`.ex-item[data-ex="${exId}"][data-idx="${idx}"]`);
      const grp = box.querySelector(".art-choice-group");
      const fb = document.getElementById(`fb-${exId}-${idx}`);
      if (revealOnly) {
        grp.querySelectorAll(".art-choice-btn").forEach((b) => {
          b.classList.remove("sel-der", "sel-das", "sel-die");
          if (b.dataset.art === it.answer) b.classList.add(`sel-${it.answer}`);
        });
        grp.dataset.selected = it.answer;
        box.classList.remove("wrong");
        box.classList.add("correct");
        fb.className = "ex-feedback show";
        fb.innerHTML = `💡 <span class="de">${it.answer} ${escapeHtml(it.word.split(" ")[0])}</span> (الجمع: <span class="de">${escapeHtml(it.plural)}</span>)`;
        correctCount++;
      } else {
        const ok = grp.dataset.selected === it.answer;
        box.classList.toggle("correct", ok);
        box.classList.toggle("wrong", !ok);
        fb.className = "ex-feedback show";
        fb.innerHTML = ok
          ? `✅ صح! الجمع: <span class="de">${escapeHtml(it.plural)}</span>`
          : `❌ الصح: <span class="de">${it.answer}</span> (الجمع: <span class="de">${escapeHtml(it.plural)}</span>)`;
        if (ok) correctCount++;
      }
    });
  } else if (ex.type === "verb-table") {
    ex.rows.forEach((r, rIdx) => {
      r.cells.forEach((c, cIdx) => {
        if (c.prefilled) return;
        total++;
        const inp = document.querySelector(`input[data-vtable="${exId}"][data-r="${rIdx}"][data-c="${cIdx}"]`);
        if (!inp) return;
        if (revealOnly) {
          inp.value = c.answer;
          inp.classList.remove("wrong");
          inp.classList.add("correct");
          correctCount++;
        } else {
          const accepted = (c.accepted || [c.answer]).map((a) => a.toLowerCase());
          const ok = accepted.includes(inp.value.trim().toLowerCase());
          inp.classList.toggle("correct", ok);
          inp.classList.toggle("wrong", !ok);
          if (!ok) inp.title = `الصح: ${c.answer}`;
          if (ok) correctCount++;
        }
      });
    });
  } else if (ex.type === "word-order" || ex.type === "dialog-order") {
    const list = ex.type === "word-order" ? ex.sentences : ex.dialogs;
    total = list.length;
    list.forEach((s, idx) => {
      const zone = document.getElementById(`oz-ans-${exId}-${idx}`);
      const fb = document.getElementById(`fb-${exId}-${idx}`);
      const seq = ex.type === "word-order" ? s.words : s.lines;
      const sep = ex.type === "word-order" ? " " : " | ";
      const target = seq.join(sep);
      if (revealOnly) {
        zone.innerHTML = seq.map((w) => `<span class="word-chip placed">${escapeHtml(w)}</span>`).join("");
        fb.className = "ex-feedback show";
        fb.innerHTML = `💡 <span class="de">${escapeHtml(target)}</span> — ${escapeHtml(s.explanation)}`;
        correctCount++;
      } else {
        const userSeq = [...zone.querySelectorAll(".word-chip")].map((c) => c.textContent).join(sep);
        const ok = userSeq === target;
        fb.className = "ex-feedback show";
        fb.innerHTML = ok
          ? `✅ ترتيب مظبوط 100%! ${escapeHtml(s.explanation)}`
          : `❌ الترتيب الصح: <span class="de">${escapeHtml(target)}</span> — ${escapeHtml(s.explanation)}`;
        if (ok) correctCount++;
      }
    });
  }

  const badge = document.getElementById(`score-${exId}`);
  if (badge) {
    badge.textContent = revealOnly ? `💡 تم إظهار الحل (${total}/${total})` : `النتيجة: ${correctCount} / ${total}`;
  }
  if (!revealOnly && total > 0 && correctCount === total) launchConfetti();
}

// ==================== 6. مركز الامتحانات التقييمية (Exam Center) ====================
let activeExam = null;
let examAnswers = {};
let examTimerInterval = null;
let examSecondsLeft = 0;
let examUseTimer = true;

function initExams() {
  renderExamHub();
}

function syncFloatingTimerVisibility(tabId) {
  const ft = document.getElementById("floatingExamTimer");
  if (!ft) return;
  const onExamsTab = tabId ? tabId === "exams" : document.getElementById("tab-exams")?.classList.contains("active");
  ft.hidden = !(activeExam && examUseTimer && examTimerInterval && onExamsTab);
}

function updateFloatingTimerUI(timeStr) {
  const ft = document.getElementById("floatingExamTimer");
  const tEl = document.getElementById("ftTimeDisp");
  const pEl = document.getElementById("ftProgDisp");
  if (!ft || !tEl || !pEl || !activeExam) return;
  if (timeStr) tEl.textContent = timeStr;
  pEl.textContent = `${Object.keys(examAnswers).length}/${activeExam.questions.length}`;
  ft.classList.toggle("warn", examSecondsLeft > 60 && examSecondsLeft <= 180);
  ft.classList.toggle("danger", examSecondsLeft <= 60);
}

function stopExamTimer() {
  if (examTimerInterval) {
    clearInterval(examTimerInterval);
    examTimerInterval = null;
  }
  const ft = document.getElementById("floatingExamTimer");
  if (ft) {
    ft.hidden = true;
    ft.classList.remove("warn", "danger");
  }
}

function renderExamHub() {
  stopExamTimer();
  activeExam = null;
  const mount = document.getElementById("examsMount");

  mount.innerHTML = `
    <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div>
        <strong>⏱️ إعداد المؤقت قبل البدء:</strong>
        <span style="color:var(--text-muted); font-size:0.9rem;">تقدر تمتحن بوقت محدد زي الامتحان الحقيقي أو بدون مؤقت براحتك.</span>
      </div>
      <button type="button" id="examTimerToggleBtn" class="chip-toggle ${examUseTimer ? "active" : ""}">
        ${examUseTimer ? "⏱️ المؤقت: شغّال (محاكاة حقيقية)" : "♾️ بدون مؤقت (تدريب حر)"}
      </button>
    </div>

    <div class="grid-3">
      ${EXAMS_DATA.map((ex) => {
        const hist = examHistory[ex.id];
        const histHtml = hist
          ? `<div style="font-size:0.86rem; color:var(--das-color); font-weight:800;">🏆 أعلى درجة: ${hist.bestPct}% (${hist.bestScore}/${ex.questions.length}) · المحاولات: ${hist.attempts}</div>`
          : `<div style="font-size:0.86rem; color:var(--text-muted);">لسه ممتحنتش الامتحان ده</div>`;
        return `
          <div class="exam-card reveal-up">
            <span class="page-badge" style="align-self:flex-start;">${ex.badge} · ⏱️ ${ex.durationMin} دقيقة</span>
            <h3 style="margin:0;">${ex.title}</h3>
            <p style="margin:0; color:var(--text-muted); font-size:0.92rem;">${ex.subtitle}</p>
            ${histHtml}
            <button type="button" class="btn btn-primary" style="margin-top:auto; justify-content:center;" data-start-exam="${ex.id}">🚀 ابدأ الامتحان الآن</button>
          </div>
        `;
      }).join("")}
    </div>
  `;

  document.getElementById("examTimerToggleBtn").addEventListener("click", () => {
    examUseTimer = !examUseTimer;
    renderExamHub();
  });

  mount.querySelectorAll("[data-start-exam]").forEach((btn) => {
    btn.addEventListener("click", () => startExam(btn.dataset.startExam));
  });
}

function startExam(examId) {
  activeExam = EXAMS_DATA.find((e) => e.id === examId);
  if (!activeExam) return;
  examAnswers = {};
  stopExamTimer();

  const mount = document.getElementById("examsMount");
  let lastPassage = null;
  let lastSection = null;

  const questionsHtml = activeExam.questions.map((q, idx) => {
    let sectionHeader = "";
    if (q.section !== lastSection) {
      lastSection = q.section;
      sectionHeader = `<h3 style="margin:22px 0 10px; color:var(--primary); border-bottom:2px solid var(--surface-2); padding-bottom:6px;">📌 ${q.section}</h3>`;
    }

    let passageHtml = "";
    if (q.passage && q.passage !== lastPassage) {
      lastPassage = q.passage;
      passageHtml = `<div class="exam-passage">${escapeHtml(q.passage)}</div>`;
    } else if (!q.passage) {
      lastPassage = null;
    }

    const audioHtml = q.audioText ? `
      <div class="exam-audio-box">
        <button type="button" class="btn btn-primary" data-speak="${escapeHtml(q.audioText)}">🎧 اسمع التسجيل الألماني</button>
        <span style="font-size:0.86rem; color:var(--text-muted);">تقدر تسمع التسجيل أكتر من مرة (وبالسرعة البطيئة 0.75x من الهيدر فوق!)</span>
      </div>` : "";

    return `
      ${sectionHeader}
      ${passageHtml}
      <div class="exam-q-card" id="eq-${idx}">
        <div style="font-weight:800; margin-bottom:10px;">
          ${formatExamPrompt(q.prompt, `${idx + 1}.`)}
        </div>
        ${audioHtml}
        <div>
          ${q.options.map((opt) => `
            <label class="exam-opt-label" data-q="${idx}" data-opt="${escapeHtml(opt)}">
              <input type="radio" name="eq_${idx}" value="${escapeHtml(opt)}" style="accent-color:var(--primary);" />
              ${renderValueSpan(opt)}
            </label>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");

  mount.innerHTML = `
    <div class="card">
      <div class="exam-topbar">
        <div>
          <h3 style="margin:0;">${activeExam.title}</h3>
          <div style="font-size:0.88rem; color:var(--text-muted);" id="examAnsweredCounter">جاوبت على 0 من ${activeExam.questions.length} سؤال</div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          ${examUseTimer ? `<div class="exam-timer" id="examTimerDisp">${activeExam.durationMin}:00</div>` : `<span class="page-badge">♾️ بدون مؤقت</span>`}
          <button type="button" class="btn btn-secondary" id="cancelExamBtn">⬅️ رجوع لقائمة الامتحانات</button>
        </div>
      </div>

      ${questionsHtml}

      <div style="display:flex; justify-content:center; gap:12px; margin-top:24px; flex-wrap:wrap;">
        <button type="button" class="btn btn-primary" id="submitExamBtn" style="padding:13px 32px; font-size:1.02rem;">📩 تسليم الامتحان وعرض التقرير</button>
      </div>
    </div>
  `;

  mount.querySelectorAll(".exam-opt-label").forEach((lbl) => {
    lbl.addEventListener("click", () => {
      const qIdx = Number(lbl.dataset.q);
      const opt = lbl.dataset.opt;
      examAnswers[qIdx] = opt;
      mount.querySelectorAll(`.exam-opt-label[data-q="${qIdx}"]`).forEach((l) => l.classList.remove("selected"));
      lbl.classList.add("selected");
      lbl.querySelector("input").checked = true;
      document.getElementById("examAnsweredCounter").textContent = `جاوبت على ${Object.keys(examAnswers).length} من ${activeExam.questions.length} سؤال`;
      updateFloatingTimerUI();
    });
  });

  document.getElementById("cancelExamBtn").addEventListener("click", renderExamHub);
  document.getElementById("submitExamBtn").addEventListener("click", submitExam);

  if (examUseTimer) {
    examSecondsLeft = activeExam.durationMin * 60;
    const initStr = `${String(activeExam.durationMin).padStart(2, "0")}:00`;
    updateFloatingTimerUI(initStr);
    examTimerInterval = setInterval(() => {
      examSecondsLeft--;
      const m = Math.floor(examSecondsLeft / 60);
      const s = examSecondsLeft % 60;
      const str = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      const disp = document.getElementById("examTimerDisp");
      if (disp) disp.textContent = str;
      updateFloatingTimerUI(str);
      if (examSecondsLeft <= 0) submitExam();
    }, 1000);
    syncFloatingTimerVisibility("exams");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitExam() {
  stopExamTimer();
  if (!activeExam) return;

  let totalCorrect = 0;
  const sectionStats = {};
  const details = activeExam.questions.map((q, idx) => {
    const userAns = examAnswers[idx] || "(لم يتم الإجابة)";
    const ok = userAns === q.answer;
    if (ok) totalCorrect++;
    if (!sectionStats[q.section]) sectionStats[q.section] = { ok: 0, total: 0 };
    sectionStats[q.section].total++;
    if (ok) sectionStats[q.section].ok++;
    return { idx, q, userAns, ok };
  });

  const total = activeExam.questions.length;
  const pct = Math.round((totalCorrect / total) * 100);
  const grade = pct >= 90 ? "🏆 ممتاز (Sehr gut!)" : pct >= 75 ? "👏 جيد جداً (Gut!)" : pct >= 60 ? "👍 ناجح (Bestanden)" : "💪 محتاج مراجعة بسيطة وجرب تاني!";

  // حفظ السجل
  const prev = examHistory[activeExam.id] || { bestPct: 0, bestScore: 0, attempts: 0 };
  examHistory[activeExam.id] = {
    bestPct: Math.max(prev.bestPct, pct),
    bestScore: Math.max(prev.bestScore, totalCorrect),
    attempts: prev.attempts + 1
  };
  localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(examHistory));

  if (pct >= 80) launchConfetti();

  const mount = document.getElementById("examsMount");
  let mistakesOnly = false;

  function drawReport() {
    const shown = mistakesOnly ? details.filter((d) => !d.ok) : details;
    mount.innerHTML = `
      <div class="card reveal-up">
        <div style="text-align:center; padding:12px 0 20px; border-bottom:2px solid var(--surface-2);">
          <div style="font-size:3rem; font-weight:800; color:var(--primary);">${pct}%</div>
          <div style="font-size:1.25rem; font-weight:800; margin:4px 0;">${totalCorrect} من ${total} — ${grade}</div>
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-top:16px;">
            <button type="button" class="btn btn-primary" id="retakeExamBtn">🔄 إعادة الامتحان</button>
            <button type="button" class="btn btn-secondary" id="backHubBtn">📋 كل الامتحانات</button>
            <button type="button" class="chip-toggle ${mistakesOnly ? "active" : ""}" id="toggleMistakesBtn">
              ❌ عرض الأخطاء فقط (${details.filter((d) => !d.ok).length})
            </button>
          </div>
        </div>

        <h3 style="margin:20px 0 12px;">📊 تحليل مستواك في كل مهارة:</h3>
        ${Object.entries(sectionStats).map(([secName, st]) => {
          const sp = Math.round((st.ok / st.total) * 100);
          return `
            <div class="skill-bar-row">
              <div class="skill-bar-head"><span>${secName}</span><span>${st.ok} / ${st.total} (${sp}%)</span></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${sp}%"></div></div>
            </div>
          `;
        }).join("")}

        <h3 style="margin:24px 0 12px;">🔍 مراجعة الأسئلة والشرح بالعامية:</h3>
        ${!shown.length
          ? `<div class="callout info"><strong>🎉 مفيش ولا غلطة! إنت قفّلت الامتحان 100%!</strong></div>`
          : shown.map((d) => `
            <div class="ex-item ${d.ok ? "correct" : "wrong"}">
              <div style="font-weight:800; margin-bottom:6px;">
                ${formatExamPrompt(d.q.prompt, `${d.ok ? "✅" : "❌"} سؤال ${d.idx + 1} (${d.q.section}) —`)}
                ${d.q.audioText ? speakBtnHtml(d.q.audioText) : ""}
              </div>
              <div style="font-size:0.9rem;">إجابتك: <strong>${renderValueSpan(d.userAns)}</strong> ${d.ok ? "" : `| الإجابة الصح: <strong style="color:var(--das-color);">${renderValueSpan(d.q.answer)}</strong>`}</div>
              <div style="font-size:0.88rem; margin-top:5px; color:var(--text-muted);">💡 ${formatBidiText(d.q.explanation)}</div>
            </div>
          `).join("")}
      </div>
    `;

    document.getElementById("retakeExamBtn").addEventListener("click", () => startExam(activeExam.id));
    document.getElementById("backHubBtn").addEventListener("click", renderExamHub);
    document.getElementById("toggleMistakesBtn").addEventListener("click", () => {
      mistakesOnly = !mistakesOnly;
      drawReport();
    });
  }

  drawReport();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==================== 7. البطاقات الذكية (عارفها ولا لأ؟) والاختبار السريع ====================
let fcDeck = [];
let fcIndex = 0;
let fcAutoSpeak = true;
let fcSpeakTimer = null;

function loadFlashcards(animateAndSpeak = false) {
  const mode = document.getElementById("fcUnitSelect").value;
  if (mode === "unlearned") fcDeck = VOCAB_DATA.filter((w) => !learnedSet.has(getVocabKey(w)));
  else if (mode === "core_unlearned") fcDeck = VOCAB_DATA.filter((w) => w.core && !learnedSet.has(getVocabKey(w)));
  else if (mode === "all") fcDeck = [...VOCAB_DATA];
  else if (mode === "core") fcDeck = VOCAB_DATA.filter((w) => w.core);
  else fcDeck = VOCAB_DATA.filter((w) => String(w.unit) === mode);
  fcIndex = 0;
  renderFlashcard(animateAndSpeak);
}

function renderFlashcard(animateAndSpeak = false) {
  if (fcSpeakTimer) { clearTimeout(fcSpeakTimer); fcSpeakTimer = null; }
  const emptyBox = document.getElementById("fcEmptyState");
  const activeWrap = document.getElementById("fcActiveWrap");
  if (!fcDeck.length) {
    if (emptyBox) emptyBox.hidden = false;
    if (activeWrap) activeWrap.hidden = true;
    return;
  }
  if (emptyBox) emptyBox.hidden = true;
  if (activeWrap) activeWrap.hidden = false;
  if (fcIndex >= fcDeck.length) fcIndex = 0;

  const card = document.getElementById("flashcardEl");
  const stage = card.closest(".flashcard-stage");
  card.classList.remove("flipped");
  const item = fcDeck[fcIndex];
  const isLearned = learnedSet.has(getVocabKey(item));

  const statusPill = document.getElementById("fcStatusPill");
  if (statusPill) {
    statusPill.textContent = isLearned ? "✅ محفوظة" : "📌 لسه بتتذاكر";
    statusPill.className = `fc-status-pill ${isLearned ? "is-learned" : "is-new"}`;
  }

  document.getElementById("fcFrontBadge").innerHTML = articleBadgeHtml(item.article, item.category);
  document.getElementById("fcGerman").textContent = item.german;
  document.getElementById("fcPlural").textContent = item.pluralOrForm ? `(${item.pluralOrForm})` : "";
  document.getElementById("fcEgyptian").textContent = item.egyptian;
  document.getElementById("fcExample").textContent = item.example || "";
  document.getElementById("fcRef").textContent = `الوحدة ${item.unit} · ${item.category}`;

  const unlearnedTotal = VOCAB_DATA.length - learnedSet.size;
  document.getElementById("fcCounter").innerHTML = `
    <span>كارت ${fcIndex + 1} من ${fcDeck.length} · متبقي ${unlearnedTotal} كلمة غير محفوظة</span>
    <button type="button" id="fcAutoSpeakToggle" class="learn-btn ${fcAutoSpeak ? "done" : ""}" style="margin-right:8px;">
      ${fcAutoSpeak ? "🔊 نطق تلقائي: شغّال" : "🔇 نطق تلقائي: مقفول"}
    </button>
  `;
  const autoBtn = document.getElementById("fcAutoSpeakToggle");
  if (autoBtn) {
    autoBtn.addEventListener("click", () => {
      fcAutoSpeak = !fcAutoSpeak;
      renderFlashcard(false);
    });
  }

  if (animateAndSpeak) {
    if (stage) {
      stage.classList.remove("fc-enter");
      void stage.offsetWidth; // force reflow لإعادة تشغيل الأنيميشن بنعومة
      stage.classList.add("fc-enter");
    }
    if (fcAutoSpeak) {
      const spkBtn = document.getElementById("fcSpeakBtn");
      fcSpeakTimer = setTimeout(() => {
        speakGerman(getFullSpeakText(item), spkBtn);
      }, 150);
    }
  }
}

function markFlashcardAnswer(knewIt) {
  const item = fcDeck[fcIndex];
  if (!item) return;
  const key = getVocabKey(item);
  const mode = document.getElementById("fcUnitSelect").value;

  if (knewIt) {
    learnedSet.add(key);
    saveLearned();
    renderVocabGrid();
    if (mode === "unlearned" || mode === "core_unlearned") {
      fcDeck.splice(fcIndex, 1);
      if (fcDeck.length === 0) launchConfetti();
      if (fcIndex >= fcDeck.length) fcIndex = 0;
    } else {
      fcIndex = (fcIndex + 1) % fcDeck.length;
    }
  } else {
    learnedSet.delete(key);
    saveLearned();
    renderVocabGrid();
    // نسيبها في قائمة اللي مش محفوظة وننتقل للكارت اللي بعده عادي بدون إعادة
    if (fcDeck.length > 0) {
      fcIndex = (fcIndex + 1) % fcDeck.length;
    }
  }
  renderFlashcard(true);
}

function initFlashcards() {
  document.getElementById("fcUnitSelect").addEventListener("change", () => loadFlashcards(true));
  document.getElementById("flashcardEl").addEventListener("click", (e) => {
    if (e.target.closest("#fcSpeakBtn")) return;
    document.getElementById("flashcardEl").classList.toggle("flipped");
  });
  document.getElementById("fcFlipBtn").addEventListener("click", () => {
    document.getElementById("flashcardEl").classList.toggle("flipped");
  });
  document.getElementById("fcNextBtn").addEventListener("click", () => {
    if (!fcDeck.length) return;
    fcIndex = (fcIndex + 1) % fcDeck.length;
    renderFlashcard(true);
  });
  document.getElementById("fcPrevBtn").addEventListener("click", () => {
    if (!fcDeck.length) return;
    fcIndex = (fcIndex - 1 + fcDeck.length) % fcDeck.length;
    renderFlashcard(true);
  });
  document.getElementById("fcShuffleBtn").addEventListener("click", () => {
    fcDeck.sort(() => Math.random() - 0.5);
    fcIndex = 0;
    renderFlashcard(true);
  });
  document.getElementById("fcSpeakBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const item = fcDeck[fcIndex];
    if (item) speakGerman(getFullSpeakText(item), e.currentTarget);
  });
  document.getElementById("fcKnowYesBtn").addEventListener("click", () => markFlashcardAnswer(true));
  document.getElementById("fcKnowNoBtn").addEventListener("click", () => markFlashcardAnswer(false));
  document.getElementById("fcReviewAllBtn").addEventListener("click", () => {
    document.getElementById("fcUnitSelect").value = "all";
    loadFlashcards(true);
  });
  loadFlashcards(false);
}

let quizQuestions = [];
let quizPos = 0;
let quizScore = 0;

function generateQuiz() {
  const mode = document.getElementById("quizTypeSelect").value;
  const nounPool = VOCAB_DATA.filter((w) => ["der", "das", "die"].includes(w.article));
  const corePool = VOCAB_DATA.filter((w) => w.core);
  quizQuestions = [];

  for (let i = 0; i < 10; i++) {
    const askArticle = mode === "article" || (mode === "mixed" && i % 3 === 0);
    if (askArticle) {
      const target = nounPool[Math.floor(Math.random() * nounPool.length)];
      quizQuestions.push({
        prompt: `إيه أداة التعريف الصح لكلمة <span class="de hl-red">${escapeHtml(target.german)}</span> (${escapeHtml(target.egyptian)})؟`,
        speak: getFullSpeakText(target),
        options: ["der", "das", "die"],
        answer: target.article
      });
    } else {
      const target = corePool[Math.floor(Math.random() * corePool.length)];
      const distractors = [];
      while (distractors.length < 3) {
        const cand = VOCAB_DATA[Math.floor(Math.random() * VOCAB_DATA.length)];
        if (cand.egyptian !== target.egyptian && !distractors.includes(cand.egyptian)) distractors.push(cand.egyptian);
      }
      quizQuestions.push({
        prompt: `إيه معنى <span class="de hl-red">${escapeHtml((target.article ? target.article + " " : "") + target.german)}</span> بالعامية المصرية؟`,
        speak: getFullSpeakText(target),
        options: [target.egyptian, ...distractors].sort(() => Math.random() - 0.5),
        answer: target.egyptian
      });
    }
  }
  quizPos = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const area = document.getElementById("quizArea");
  if (quizPos >= quizQuestions.length) {
    if (quizScore >= 8) launchConfetti();
    const msg = quizScore >= 8 ? "🔥 جامد جداً! إنت مسيطر على الوحدتين!" : quizScore >= 5 ? "👏 حلو أوي! راجع شوية كمان وهتقفلها." : "💪 بداية كويسة! راجع القاموس وجرب تاني.";
    area.innerHTML = `
      <div style="text-align:center; padding:24px 10px;">
        <div style="font-size:2.4rem; font-weight:800; color:var(--primary);">${quizScore} / ${quizQuestions.length}</div>
        <p style="font-size:1.05rem; font-weight:700;">${msg}</p>
        <button type="button" class="btn btn-primary" onclick="generateQuiz()">🔄 ابدأ تدريب جديد</button>
      </div>`;
    return;
  }

  const q = quizQuestions[quizPos];
  area.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.88rem; color:var(--text-muted); font-weight:700;">
      <span>السؤال ${quizPos + 1} من ${quizQuestions.length}</span>
      <span>الدرجة: <span id="quizScoreNum">${quizScore}</span></span>
    </div>
    <div style="font-size:1.1rem; font-weight:700; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <div>${q.prompt}</div>
      ${speakBtnHtml(q.speak)}
    </div>
    <div id="quizOptions">
      ${q.options.map((opt) => `<button type="button" class="quiz-option" data-opt="${escapeHtml(opt)}">${renderValueSpan(opt)}</button>`).join("")}
    </div>
    <div id="quizNextWrap" style="margin-top:10px; display:none;">
      <button type="button" class="btn btn-primary" id="quizNextBtn">السؤال اللي بعده ➡️</button>
    </div>
  `;

  area.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ok = btn.dataset.opt === q.answer;
      if (ok) {
        quizScore++;
        const scEl = document.getElementById("quizScoreNum");
        if (scEl) scEl.textContent = quizScore;
      }
      area.querySelectorAll(".quiz-option").forEach((b) => {
        b.disabled = true;
        if (b.dataset.opt === q.answer) b.classList.add("correct");
        else if (b === btn && !ok) b.classList.add("wrong");
      });
      document.getElementById("quizNextWrap").style.display = "block";
    });
  });

  document.getElementById("quizNextBtn").addEventListener("click", () => {
    quizPos++;
    renderQuizQuestion();
  });
}

// ==================== تفويض أحداث النطق وحفظ الكلمات ====================
document.addEventListener("click", (e) => {
  const spk = e.target.closest("[data-speak]");
  if (spk) {
    e.stopPropagation();
    speakGerman(spk.dataset.speak, spk);
    return;
  }

  const learnBtn = e.target.closest("[data-learn-key]");
  if (learnBtn) {
    const key = learnBtn.dataset.learnKey;
    if (learnedSet.has(key)) learnedSet.delete(key);
    else learnedSet.add(key);
    saveLearned();
    renderVocabGrid();
    loadFlashcards();
  }
});

// ==================== تثبيت التطبيق كـ PWA (أندرويد وآيفون والكمبيوتر) ====================
let deferredInstallPrompt = null;
const STORAGE_KEY_INSTALL_DISMISS = "netzwerk_a1_install_dismiss_v1";

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosDevice() {
  const ua = window.navigator.userAgent || "";
  return /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function initPWA() {
  // تسجيل Service Worker على http/https فقط
  if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  const banner = document.getElementById("installBanner");
  const headerBtn = document.getElementById("headerInstallBtn");
  const bannerBtn = document.getElementById("bannerInstallBtn");
  const dismissBtn = document.getElementById("bannerDismissBtn");
  const modal = document.getElementById("installModal");
  const closeModalBtn = document.getElementById("closeInstallModal");
  const osTabIos = document.getElementById("osTabIos");
  const osTabAndroid = document.getElementById("osTabAndroid");
  const stepsIos = document.getElementById("installStepsIos");
  const stepsAndroid = document.getElementById("installStepsAndroid");
  const nativeWrap = document.getElementById("nativeInstallWrap");
  const nativeBtn = document.getElementById("modalNativeInstallBtn");

  // لو التطبيق مفتوح بالفعل كتطبيق مثبّت، نخفي رسالة وزرار التثبيت
  if (isStandaloneMode()) {
    if (headerBtn) headerBtn.style.display = "none";
    if (banner) banner.hidden = true;
    return;
  }

  // إظهار بانر التثبيت ما لم يكن المستخدم ضغط "لاحقاً" خلال آخر 3 أيام
  const dismissedAt = Number(localStorage.getItem(STORAGE_KEY_INSTALL_DISMISS) || "0");
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  if (banner && (!dismissedAt || Date.now() - dismissedAt > threeDays)) {
    banner.hidden = false;
  }

  function selectOsTab(os) {
    const showIos = os === "ios";
    stepsIos.hidden = !showIos;
    stepsAndroid.hidden = showIos;
    osTabIos.className = showIos ? "btn btn-primary" : "btn btn-secondary";
    osTabAndroid.className = showIos ? "btn btn-secondary" : "btn btn-primary";
  }

  function openInstallModal() {
    selectOsTab(isIosDevice() ? "ios" : "android");
    if (nativeWrap) nativeWrap.hidden = !deferredInstallPrompt;
    modal.hidden = false;
  }

  function closeInstallModal() {
    modal.hidden = true;
  }

  async function triggerInstall() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === "accepted") {
          if (banner) banner.hidden = true;
          if (headerBtn) headerBtn.style.display = "none";
          closeInstallModal();
          launchConfetti();
        }
      } catch (_) {}
      deferredInstallPrompt = null;
      if (nativeWrap) nativeWrap.hidden = true;
    } else {
      openInstallModal();
    }
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (nativeWrap) nativeWrap.hidden = false;
    if (bannerBtn) bannerBtn.textContent = "📲 تثبيت الآن (بضغطة واحدة)";
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    if (banner) banner.hidden = true;
    if (headerBtn) headerBtn.style.display = "none";
    closeInstallModal();
    launchConfetti();
  });

  if (headerBtn) headerBtn.addEventListener("click", triggerInstall);
  if (bannerBtn) bannerBtn.addEventListener("click", triggerInstall);
  if (nativeBtn) nativeBtn.addEventListener("click", triggerInstall);
  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      if (banner) banner.hidden = true;
      localStorage.setItem(STORAGE_KEY_INSTALL_DISMISS, String(Date.now()));
    });
  }
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeInstallModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeInstallModal();
    });
  }
  if (osTabIos) osTabIos.addEventListener("click", () => selectOsTab("ios"));
  if (osTabAndroid) osTabAndroid.addEventListener("click", () => selectOsTab("android"));
}

// ==================== تشغيل التطبيق ====================
document.addEventListener("DOMContentLoaded", () => {
  // أمان إضافي: مستحيل شاشة التحميل تعلق مهما حصل
  setTimeout(() => {
    document.getElementById("splashScreen")?.classList.add("hide");
    document.body.classList.remove("splash-lock");
  }, 4500);

  // 1. نرسم شاشة التحميل ونجهّز التحكم الأساسي فوراً بدون تعطيل الرسم الأول على الموبايل
  initHeaderControls();
  initPWA();
  initTabs();
  renderSummary();
  updateHeroStats();

  // 2. نؤجل بناء القاموس والتمارين والامتحانات فريم واحد عشان شاشة التحميل تظهر بسلاسة تامة على الموبايل
  requestAnimationFrame(() => {
    setTimeout(() => {
      renderUnit("unit1", "unit1Mount");
      renderUnit("unit2", "unit2Mount");
      initNumberConverter();
      initVocab();
      initExercises();
      initExams();
      initFlashcards();
      document.getElementById("quizTypeSelect").addEventListener("change", generateQuiz);
      generateQuiz();
      initSplash();
    }, 60);
  });
});
