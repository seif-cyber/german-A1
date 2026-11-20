// ==================== أدوات مساعدة والنطق الصوتي ====================
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeText(str) {
  return String(str ?? "")
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

function speakGerman(text) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const clean = String(text)
      .replace(/\|/g, "")
      .replace(/\([^)]*\)/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = "de-DE";
    utter.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("de"));
    if (deVoice) utter.voice = deVoice;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn("Speech synthesis unavailable:", e);
  }
}

function speakBtnHtml(text) {
  return `<button type="button" class="speak-btn" data-speak="${escapeHtml(text)}" title="اسمع النطق الألماني">🔊</button>`;
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

// ==================== حالة التطبيق والحفظ المحلي ====================
const STORAGE_KEY_LEARNED = "netzwerk_a1_learned_v1";
const STORAGE_KEY_THEME = "netzwerk_a1_theme_v1";

let learnedSet = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_LEARNED) || "[]"));
let filterCoreOnly = false;
let filterUnlearnedOnly = false;

function saveLearned() {
  localStorage.setItem(STORAGE_KEY_LEARNED, JSON.stringify([...learnedSet]));
  updateHeroStats();
}

function updateHeroStats() {
  document.getElementById("statTotalWords").textContent = VOCAB_DATA.length;
  document.getElementById("statLearnedWords").textContent = `${learnedSet.size} / ${VOCAB_DATA.length}`;
  document.getElementById("statTotalExercises").textContent = EXERCISES_DATA.length;
}

// ==================== التبويبات والوضع الليلي ====================
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY_THEME) || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeBtn(saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const curr = document.documentElement.getAttribute("data-theme");
    const next = curr === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY_THEME, next);
    updateThemeBtn(next);
  });
}

function updateThemeBtn(theme) {
  document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي";
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.toggle("active", p.id === `tab-${tabId}`));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

// ==================== 1. بناء تبويب الملخص السريع ====================
function renderSummary() {
  const mount = document.getElementById("summaryMount");
  const renderUnitSummary = (uData, tabTarget, numLabel) => `
    <div class="card">
      <div class="section-header">
        <div>
          <h2>${uData.title}</h2>
          <div style="color:var(--text-muted); font-size:0.9rem;">${uData.subtitle}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="switchTab('${tabTarget}')">📖 افتح الشرح الكامل</button>
          <button class="btn btn-secondary" onclick="switchTab('exercises')">✍️ حل التدريبات</button>
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
    ${renderUnitSummary(UNITS_DATA.unit1, "unit1", "1")}
    ${renderUnitSummary(UNITS_DATA.unit2, "unit2", "2")}
    <div class="card">
      <div class="section-header">
        <h3>🚀 خطة مذاكرة سريعة بالصفحة دي</h3>
        <span class="page-badge">نصيحة للمذاكرة</span>
      </div>
      <div class="grid-3">
        <div class="mini-card"><div><strong>1. افهم الشرح</strong><div class="eg">اقرأ تبويب الوحدة 1 ثم الوحدة 2 بالترتيب واسمع نطق الجمل.</div></div></div>
        <div class="mini-card"><div><strong>2. احفظ الكلمات</strong><div class="eg">افتح "قاموس الوحدتين" وفعل فلتر ⭐ كلمات الامتحان الأساسية الأول.</div></div></div>
        <div class="mini-card"><div><strong>3. حل واختبر نفسك</strong><div class="eg">حل تدريبات الكتاب في تبويب "تدريبات الوحدتين" واختم بالبطاقات والاختبار!</div></div></div>
      </div>
    </div>
  `;
}

// ==================== 2 & 3. بناء شرح الوحدة 1 و 2 ====================
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
    <h4>🔢 الأرقام من 0 لـ 20 (اضغط على أي رقم لسماع نطقه 🔊)</h4>
    <div class="callout info">
      <strong>💡 سر قراءة الأرقام من 13 لـ 19:</strong>
      بنقرأ الرقم الصغير الأول وبعدين <span class="de">zehn</span> (10)! مثلاً 14 = <span class="de">vierzehn</span> (أربعة عشرة). خلي بالك من 16 (<span class="de">sechzehn</span> شيلنا s) و 17 (<span class="de">siebzehn</span> شيلنا en).
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
        <h4>📧 إزاي تقول عنوان الإيميل بالألماني (ص 13)</h4>
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
        <h4>💬 محادثة تظبيط خروجة (ص 21)</h4>
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
          <strong>🗣️ Gut gesagt (ص 21): إزاي الألمان بيقولوا "لأ" في الشارع؟</strong>
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
        <p style="margin-top:0;">احفظ كل اسم دايماً بأداته ولونه (استراتيجية الكتاب ص 24):</p>
        <div class="phrase-row"><span class="art-badge art-der">der (maskulin — أزرق)</span><span class="de">der Stift, der Computer, der Schlüssel</span></div>
        <div class="phrase-row"><span class="art-badge art-das">das (neutrum — أخضر)</span><span class="de">das Buch, das Auto, das Krankenhaus</span></div>
        <div class="phrase-row"><span class="art-badge art-die">die (feminin — أحمر)</span><span class="de">die Tablette, die Straße, die Rechnung</span></div>
        <div class="phrase-row"><span class="art-badge art-pl">die (Plural — بنفسجي)</span><span class="de">die Bücher, die Ärzte, die Autos</span></div>
      </div>
    </div>

    <h4 style="margin:18px 0 8px;">📌 4. المفرد والجمع (Singular &amp; Plural — ص 23 و 27)</h4>
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
          <div>
            <span class="de">${it.de}</span>
            <span class="eg">${it.eg}</span>
          </div>
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
                  ${r.map((cell, idx) => `<td class="${idx < 2 ? "de" : ""}">${escapeHtml(cell)}</td>`).join("")}
                  <td>${speakBtnHtml(r[0])}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`;
    } else if (sec.type === "grammar-u1") {
      body = renderGrammarU1();
    } else if (sec.type === "u1-numbers-alphabet") {
      body = renderU1NumbersAlphabet();
    } else if (sec.type === "u2-days-plans") {
      body = renderU2DaysPlans();
    } else if (sec.type === "grammar-u2") {
      body = renderGrammarU2();
    } else if (sec.type === "u2-numbers-converter") {
      body = renderU2NumbersConverter();
    } else if (sec.type === "bullets") {
      body = `<ul style="margin:0; padding-right:20px;">${sec.bullets.map((b) => `<li style="margin-bottom:8px;">${b}</li>`).join("")}</ul>`;
    }

    return `
      <article class="card" id="${sec.id}">
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

  const update = () => {
    out.textContent = numberToGerman(inp.value);
  };
  inp.addEventListener("input", update);
  spk.addEventListener("click", () => speakGerman(out.textContent));
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      inp.value = btn.dataset.preset;
      update();
      speakGerman(out.textContent);
    });
  });
}

// ==================== 4. القاموس الشامل والبحث والفلترة ====================
function initVocab() {
  const catSel = document.getElementById("vocabCatFilter");
  const cats = [...new Set(VOCAB_DATA.map((v) => v.category))];
  cats.forEach((c) => {
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

function getVocabKey(item) {
  return `${item.unit}:${item.german}`;
}

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
    const fullSpeak = (w.article && w.article !== "der/die" && w.article !== "die (Pl.)" ? `${w.article} ` : "") + w.german;
    return `
      <div class="vocab-card ${isLearned ? "learned" : ""}">
        <div class="vocab-top">
          <div class="vocab-word-group">
            ${articleBadgeHtml(w.article, w.category)}
            <span class="vocab-de">${escapeHtml(w.german)}</span>
            ${w.pluralOrForm ? `<span class="vocab-plural">(${escapeHtml(w.pluralOrForm)})</span>` : ""}
          </div>
          ${speakBtnHtml(fullSpeak)}
        </div>
        <div class="vocab-eg">${escapeHtml(w.egyptian)}</div>
        ${w.example ? `<div class="vocab-example">${escapeHtml(w.example)}</div>` : ""}
        <div class="vocab-meta">
          <div>
            <span>الوحدة ${w.unit} (${escapeHtml(w.ref)})</span> · <span>${escapeHtml(w.category)}</span>
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

// ==================== 5. محرك التدريبات التفاعلية ====================
let currentExUnit = "all";

function initExercises() {
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
  const list = EXERCISES_DATA.filter((ex) => currentExUnit === "all" || String(ex.unit) === currentExUnit);

  mount.innerHTML = list.map((ex) => {
    let body = "";
    if (ex.type === "match") {
      body = ex.items.map((it, idx) => `
        <div class="ex-item" data-ex="${ex.id}" data-idx="${idx}">
          <div class="ex-row">
            <div><strong>${escapeHtml(it.prompt)}</strong></div>
            <select class="ex-select" data-ex="${ex.id}" data-idx="${idx}">
              <option value="">-- اختار الإجابة --</option>
              ${ex.options.map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}
            </select>
          </div>
          <div class="ex-feedback" id="fb-${ex.id}-${idx}"></div>
        </div>
      `).join("");
    } else if (ex.type === "fill") {
      body = ex.items.map((it, idx) => {
        const control = it.choices
          ? `<select class="ex-select" data-ex="${ex.id}" data-idx="${idx}">
              <option value="">-- اختار --</option>
              ${it.choices.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}
            </select>`
          : `<input type="text" class="ex-input-inline" data-ex="${ex.id}" data-idx="${idx}" placeholder="اكتب هنا..." autocomplete="off" />`;
        return `
          <div class="ex-item" data-ex="${ex.id}" data-idx="${idx}">
            <div style="line-height:2.1;">
              <span class="de">${escapeHtml(it.before)}</span>
              ${control}
              <span class="de">${escapeHtml(it.after)}</span>
            </div>
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
    } else if (ex.type === "word-order") {
      body = ex.sentences.map((s, idx) => {
        const shuffled = [...s.words].sort(() => Math.random() - 0.5);
        if (shuffled.join(" ") === s.words.join(" ") && shuffled.length > 1) {
          [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
        }
        return `
          <div class="order-sentence-box" data-ex="${ex.id}" data-idx="${idx}">
            <div style="font-weight:700; margin-bottom:6px;">${idx + 1}. المعنى المطلوب: <span style="color:var(--primary);">${escapeHtml(s.hint)}</span></div>
            <div class="order-zone" id="oz-ans-${ex.id}-${idx}" data-zone="answer"></div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; direction:ltr;" id="oz-pool-${ex.id}-${idx}">
              ${shuffled.map((w, wi) => `<button type="button" class="word-chip" data-ex="${ex.id}" data-idx="${idx}" data-wi="${wi}" data-word="${escapeHtml(w)}">${escapeHtml(w)}</button>`).join("")}
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
            <div class="form-group"><label>Familienname (اسم العيلة)</label><input class="input-field" name="nachname" required placeholder="مثال: Ahmed" /></div>
            <div class="form-group"><label>Geschlecht (النوع)</label>
              <select name="geschlecht" required>
                <option value="">-- اختار --</option>
                <option value="männlich">männlich (ذكر)</option>
                <option value="weiblich">weiblich (أنثى)</option>
                <option value="keine Angabe">keine Angabe (بدون تحديد)</option>
              </select>
            </div>
            <div class="form-group"><label>Geburtsdatum (تاريخ الميلاد)</label><input class="input-field" name="geburtsdatum" required placeholder="01.04.2000" /></div>
            <div class="form-group"><label>E-Mail (الإيميل)</label><input class="input-field" type="email" name="email" required placeholder="name@example.com" /></div>
            <div class="form-group"><label>Telefonnummer (الموبايل)</label><input class="input-field" name="tel" required placeholder="+20 10..." /></div>
            <div class="form-group"><label>Adresse: Straße, Hausnummer</label><input class="input-field" name="strasse" required placeholder="Tahrirstr. 10" /></div>
            <div class="form-group"><label>Postleitzahl, Wohnort</label><input class="input-field" name="ort" required placeholder="11511 Kairo" /></div>
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

    const actionsHtml = ex.type === "club-form" ? "" : `
      <div class="ex-actions">
        <button type="button" class="btn btn-primary" data-ex-check="${ex.id}">✅ تحقق من إجابتك</button>
        <button type="button" class="btn btn-secondary" data-ex-reveal="${ex.id}">💡 إظهار الحل والشرح</button>
        <button type="button" class="btn btn-secondary" data-ex-reset="${ex.id}">🔄 إعادة المحاولة</button>
        <span class="score-badge" id="score-${ex.id}">النتيجة: لم يُصحّح بعد</span>
      </div>
    `;

    return `
      <article class="card" id="card-${ex.id}">
        <div class="section-header">
          <div>
            <h3>${ex.title}</h3>
          </div>
          <span class="page-badge">الوحدة ${ex.unit} · ${ex.ref}</span>
        </div>
        <p style="margin-top:0; color:var(--text-muted);">${ex.instructions}</p>
        ${body}
        ${actionsHtml}
      </article>
    `;
  }).join("");

  bindExerciseEvents();
}

function bindExerciseEvents() {
  // اختيار أداة der/das/die
  document.querySelectorAll(".art-choice-group .art-choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const grp = btn.closest(".art-choice-group");
      grp.querySelectorAll(".art-choice-btn").forEach((b) => b.classList.remove("sel-der", "sel-das", "sel-die"));
      btn.classList.add(`sel-${btn.dataset.art}`);
      grp.dataset.selected = btn.dataset.art;
    });
  });

  // ترتيب الجمل (الضغط على الكلمة ينقلها لخانة الإجابة)
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

  // استمارة النادي التفاعلية
  const kursSel = document.getElementById("clubKursSelect");
  const tagInp = document.getElementById("clubTagInput");
  if (kursSel && tagInp) {
    kursSel.addEventListener("change", () => {
      const parts = kursSel.value.split("|");
      tagInp.value = parts[1] || "";
    });
  }
  const clubForm = document.getElementById("clubRegForm");
  if (clubForm) {
    clubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(clubForm);
      const kursName = (fd.get("kurs") || "").split("|")[0];
      const out = document.getElementById("clubFormResult");
      out.innerHTML = `
        <div class="callout info" style="margin:0;">
          <strong>🎉 ممتاز! استمارتك متمليّة صح 100% بالألماني:</strong>
          Hallo <span class="de">${escapeHtml(fd.get("vorname"))} ${escapeHtml(fd.get("nachname"))}</span>!
          تم تسجيلك في كورس <span class="de">${escapeHtml(kursName)}</span> يوم <span class="de">${escapeHtml(fd.get("tag"))}</span> — العنوان: <span class="de">${escapeHtml(fd.get("strasse"))}, ${escapeHtml(fd.get("ort"))}</span>.
        </div>
      `;
    });
  }

  // أزرار التحقق / الإظهار / الإعادة
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
  const ex = EXERCISES_DATA.find((e) => e.id === exId);
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
        fb.innerHTML = `💡 الحل: <span class="de">${escapeHtml(it.answer)}</span> — ${escapeHtml(it.explanation)}`;
        correctCount++;
      } else {
        const val = ctrl.value.trim();
        const accepted = it.accepted ? it.accepted.map((a) => a.toLowerCase()) : [it.answer.toLowerCase()];
        const ok = accepted.includes(val.toLowerCase());
        box.classList.toggle("correct", ok);
        box.classList.toggle("wrong", !ok);
        fb.className = "ex-feedback show";
        fb.innerHTML = ok
          ? `✅ برافو! ${escapeHtml(it.explanation)}`
          : `❌ الإجابة الصح: <span class="de">${escapeHtml(it.answer)}</span> — ${escapeHtml(it.explanation)}`;
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
  } else if (ex.type === "word-order") {
    total = ex.sentences.length;
    ex.sentences.forEach((s, idx) => {
      const zone = document.getElementById(`oz-ans-${exId}-${idx}`);
      const fb = document.getElementById(`fb-${exId}-${idx}`);
      const target = s.words.join(" ");
      if (revealOnly) {
        zone.innerHTML = s.words.map((w) => `<span class="word-chip placed">${escapeHtml(w)}</span>`).join("");
        fb.className = "ex-feedback show";
        fb.innerHTML = `💡 <span class="de">${escapeHtml(target)}</span> — ${escapeHtml(s.explanation)}`;
        correctCount++;
      } else {
        const userSentence = [...zone.querySelectorAll(".word-chip")].map((c) => c.textContent).join(" ");
        const ok = userSentence === target;
        fb.className = "ex-feedback show";
        fb.innerHTML = ok
          ? `✅ جملة مظبوطة 100%! ${escapeHtml(s.explanation)}`
          : `❌ الترتيب الصح: <span class="de">${escapeHtml(target)}</span> — ${escapeHtml(s.explanation)}`;
        if (ok) correctCount++;
      }
    });
  }

  const badge = document.getElementById(`score-${exId}`);
  if (badge) {
    badge.textContent = revealOnly ? `💡 تم إظهار الحل (${total}/${total})` : `النتيجة: ${correctCount} / ${total}`;
  }
}

// ==================== 6. البطاقات التفاعلية (Flashcards) ====================
let fcDeck = [];
let fcIndex = 0;

function loadFlashcards() {
  const mode = document.getElementById("fcUnitSelect").value;
  if (mode === "all") fcDeck = [...VOCAB_DATA];
  else if (mode === "core") fcDeck = VOCAB_DATA.filter((w) => w.core);
  else fcDeck = VOCAB_DATA.filter((w) => String(w.unit) === mode);
  fcIndex = 0;
  renderFlashcard();
}

function renderFlashcard() {
  const card = document.getElementById("flashcardEl");
  card.classList.remove("flipped");
  const item = fcDeck[fcIndex];
  if (!item) return;

  document.getElementById("fcFrontBadge").innerHTML = articleBadgeHtml(item.article, item.category);
  document.getElementById("fcGerman").textContent = item.german;
  document.getElementById("fcPlural").textContent = item.pluralOrForm ? `(${item.pluralOrForm})` : "";
  document.getElementById("fcEgyptian").textContent = item.egyptian;
  document.getElementById("fcExample").textContent = item.example || "";
  document.getElementById("fcRef").textContent = `الوحدة ${item.unit} (${item.ref}) · ${item.category}`;
  document.getElementById("fcCounter").textContent = `كارت ${fcIndex + 1} من ${fcDeck.length}`;
}

function initFlashcards() {
  document.getElementById("fcUnitSelect").addEventListener("change", loadFlashcards);
  document.getElementById("flashcardEl").addEventListener("click", (e) => {
    if (e.target.closest("#fcSpeakBtn")) return;
    document.getElementById("flashcardEl").classList.toggle("flipped");
  });
  document.getElementById("fcFlipBtn").addEventListener("click", () => {
    document.getElementById("flashcardEl").classList.toggle("flipped");
  });
  document.getElementById("fcNextBtn").addEventListener("click", () => {
    fcIndex = (fcIndex + 1) % fcDeck.length;
    renderFlashcard();
  });
  document.getElementById("fcPrevBtn").addEventListener("click", () => {
    fcIndex = (fcIndex - 1 + fcDeck.length) % fcDeck.length;
    renderFlashcard();
  });
  document.getElementById("fcShuffleBtn").addEventListener("click", () => {
    fcDeck.sort(() => Math.random() - 0.5);
    fcIndex = 0;
    renderFlashcard();
  });
  document.getElementById("fcSpeakBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const item = fcDeck[fcIndex];
    if (!item) return;
    const text = (item.article && item.article !== "der/die" && item.article !== "die (Pl.)" ? `${item.article} ` : "") + item.german;
    speakGerman(text);
  });
  loadFlashcards();
}

// ==================== 7. الاختبار السريع (Quick Quiz) ====================
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
        speak: `${target.article} ${target.german}`,
        options: ["der", "das", "die"],
        answer: target.article
      });
    } else {
      const target = corePool[Math.floor(Math.random() * corePool.length)];
      const distractors = [];
      while (distractors.length < 3) {
        const cand = VOCAB_DATA[Math.floor(Math.random() * VOCAB_DATA.length)];
        if (cand.egyptian !== target.egyptian && !distractors.includes(cand.egyptian)) {
          distractors.push(cand.egyptian);
        }
      }
      const opts = [target.egyptian, ...distractors].sort(() => Math.random() - 0.5);
      quizQuestions.push({
        prompt: `إيه معنى <span class="de hl-red">${escapeHtml((target.article ? target.article + " " : "") + target.german)}</span> بالعامية المصرية؟`,
        speak: target.german,
        options: opts,
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
    const msg = quizScore >= 8 ? "🔥 جامد جداً! إنت مسيطر على الوحدتين!" : quizScore >= 5 ? "👏 حلو أوي! راجع شوية كمان وهتقفلها." : "💪 بداية كويسة! راجع القاموس وجرب تاني.";
    area.innerHTML = `
      <div style="text-align:center; padding:24px 10px;">
        <div style="font-size:2.4rem; font-weight:800; color:var(--primary);">${quizScore} / ${quizQuestions.length}</div>
        <p style="font-size:1.05rem; font-weight:700;">${msg}</p>
        <button type="button" class="btn btn-primary" onclick="generateQuiz()">🔄 ابدأ اختبار جديد</button>
      </div>
    `;
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
      ${q.options.map((opt) => `<button type="button" class="quiz-option" data-opt="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`).join("")}
    </div>
    <div id="quizNextWrap" style="margin-top:10px; display:none;">
      <button type="button" class="btn btn-primary" id="quizNextBtn">السؤال اللي بعده ➡️</button>
    </div>
  `;

  area.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const picked = btn.dataset.opt;
      const ok = picked === q.answer;
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
    speakGerman(spk.dataset.speak);
    return;
  }

  const learnBtn = e.target.closest("[data-learn-key]");
  if (learnBtn) {
    const key = learnBtn.dataset.learnKey;
    if (learnedSet.has(key)) learnedSet.delete(key);
    else learnedSet.add(key);
    saveLearned();
    renderVocabGrid();
  }
});

// ==================== تشغيل التطبيق ====================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTabs();
  renderSummary();
  renderUnit("unit1", "unit1Mount");
  renderUnit("unit2", "unit2Mount");
  initNumberConverter();
  initVocab();
  initExercises();
  initFlashcards();
  document.getElementById("quizTypeSelect").addEventListener("change", generateQuiz);
  generateQuiz();
  updateHeroStats();
});
