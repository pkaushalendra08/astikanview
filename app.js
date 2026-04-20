/* ============================================================
   Astikan Healthcare – App Simulation Logic
   ============================================================ */

/* ── Question bank (4 questions) ── */
const QUESTIONS = [
  {
    id: 1,
    text: "Tell me, what are you feeling right now?",
    hint: "Pick whatever feels right. You can choose more than one.",
    multi: true,
    options: [
      { icon: "🫃", label: "Stomach Pain" },
      { icon: "🤢", label: "Nausea or Vomiting" },
      { icon: "🔥", label: "Acidity / Burning" },
      { icon: "😮‍💨", label: "Bloating" }
    ]
  },
  {
    id: 2,
    text: "How long have you been feeling this way?",
    hint: "Choose the closest option.",
    multi: false,
    options: [
      { icon: "⏰", label: "Just started (few hours)" },
      { icon: "📅", label: "Since yesterday" },
      { icon: "🗓️", label: "2–3 days" },
      { icon: "📆", label: "More than a week" }
    ]
  },
  {
    id: 3,
    text: "Do you have any of these alongside?",
    hint: "Select all that apply.",
    multi: true,
    options: [
      { icon: "🌡️", label: "Fever" },
      { icon: "🫀", label: "Chest Pain" },
      { icon: "😰", label: "Sweating or Chills" },
      { icon: "🙅", label: "None of these" }
    ]
  },
  {
    id: 4,
    text: "How severe is your discomfort right now?",
    hint: "Rate your current level of discomfort.",
    multi: false,
    options: [
      { icon: "😊", label: "Mild – Manageable" },
      { icon: "😐", label: "Moderate – Distracting" },
      { icon: "😣", label: "Severe – Hard to bear" },
      { icon: "🆘", label: "Extreme – Need help now" }
    ]
  }
];

/* ── State ── */
let currentScreen = 1;
let currentQuestion = 0;
let answers = Array(QUESTIONS.length).fill(null).map(() => []);

/* ── Screen navigation ── */
function goToScreen(n) {
  const prev = document.getElementById(`screen-${currentScreen}`);
  if (prev) {
    prev.classList.remove("active");
    prev.classList.add("slide-out");
    setTimeout(() => prev.classList.remove("slide-out"), 350);
  }

  currentScreen = n;
  const next = document.getElementById(`screen-${n}`);
  if (next) {
    next.classList.add("active");
  }

  updateBottomNav(n);

  // Screen-specific init
  if (n === 2) initQuestion();
  if (n === 3) startVisualAnalysis();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ── Bottom nav highlighting ── */
function updateBottomNav(screenNum) {
  const steps = document.querySelectorAll(".bnav-step");
  const lines  = document.querySelectorAll(".bnav-line");

  steps.forEach((s, i) => {
    s.classList.remove("active", "done");
    if (i + 1 === screenNum) s.classList.add("active");
    if (i + 1 < screenNum)  s.classList.add("done");
  });

  lines.forEach((l, i) => {
    l.classList.toggle("done", i + 1 < screenNum);
  });
}

/* ================================================================
   SCREEN 2 – Question Logic
   ================================================================ */

function initQuestion() {
  renderQuestion(currentQuestion);
}

function renderQuestion(idx) {
  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;

  // Header
  document.getElementById("q-counter").textContent = `Question ${idx + 1} of ${total}`;
  document.getElementById("sq-progress").style.width = `${((idx + 1) / total) * 100}%`;

  // Question text
  document.getElementById("sq-question-text").textContent = q.text;
  document.querySelector(".sq-hint").textContent = q.hint;

  // Options
  const container = document.getElementById("sq-options");
  container.innerHTML = "";
  q.options.forEach((opt, oi) => {
    const el = document.createElement("div");
    el.className = "sq-option" + (answers[idx].includes(oi) ? " selected" : "");
    el.id = `opt-${oi}`;
    el.innerHTML = `
      <span class="sq-option-icon">${opt.icon}</span>
      <span class="sq-option-label">${opt.label}</span>
      <span class="sq-check">${answers[idx].includes(oi) ? "✓" : ""}</span>
    `;
    el.addEventListener("click", () => toggleOption(idx, oi, q.multi));
    container.appendChild(el);
  });

  // Back button
  const backBtn = document.getElementById("btn-sq-back");
  backBtn.style.visibility = idx === 0 ? "hidden" : "visible";
}

function toggleOption(qIdx, optIdx, multi) {
  const sel = answers[qIdx];

  if (multi) {
    const pos = sel.indexOf(optIdx);
    if (pos >= 0) sel.splice(pos, 1);
    else sel.push(optIdx);
  } else {
    answers[qIdx] = [optIdx];
  }

  renderQuestion(qIdx);
}

function sqNext() {
  const sel = answers[currentQuestion];
  if (sel.length === 0) {
    flashHint();
    return;
  }

  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  } else {
    // All 4 answered → go to screen 3
    currentQuestion = 0;
    goToScreen(3);
  }
}

function sqBack() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  } else {
    goToScreen(1);
  }
}

function flashHint() {
  const hint = document.querySelector(".sq-hint");
  hint.style.color = "#EF4444";
  hint.textContent = "⚠️ Please select at least one option to continue.";
  setTimeout(() => {
    hint.style.color = "";
    hint.textContent = QUESTIONS[currentQuestion].hint;
  }, 2000);
}

/* Enter key shortcut */
document.addEventListener("keydown", (e) => {
  if (currentScreen === 2 && e.key === "Enter") sqNext();
});

/* ================================================================
   SCREEN 3 – Visual Analysis Progress
   ================================================================ */

let vuTimer = null;

function startVisualAnalysis() {
  const bar    = document.getElementById("vu-prog-bar");
  const pct    = document.getElementById("vu-prog-pct");
  const btn    = document.getElementById("btn-vu-next");
  const label  = document.getElementById("vu-analyse-text");

  const messages = [
    "Analysing your symptoms…",
    "Matching symptom patterns…",
    "Checking severity level…",
    "Identifying likely causes…",
    "Preparing your health report…",
    "Done! ✅"
  ];

  let progress = 0;
  let msgIdx   = 0;
  btn.disabled = true;
  bar.style.width = "0%";
  pct.textContent = "0%";

  if (vuTimer) clearInterval(vuTimer);

  vuTimer = setInterval(() => {
    progress += Math.random() * 14 + 6;
    if (progress > 100) progress = 100;

    bar.style.width = progress + "%";
    pct.textContent = Math.round(progress) + "%";

    const mIdx = Math.floor((progress / 100) * (messages.length - 1));
    if (mIdx !== msgIdx) {
      msgIdx = mIdx;
      label.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(vuTimer);
      btn.disabled = false;
      label.textContent = messages[messages.length - 1];
    }
  }, 280);
}

/* ================================================================
   SCREEN 5 – Tabs
   ================================================================ */

const TESTS_DATA = [
  {
    name: "Dr. Reddy's Diagnostics",
    dist: "0.6 km",
    type: "H. Pylori Test",
    price: "₹350",
    old: "₹600",
    save: "₹250",
    avatar: "DR",
    cls: "ca1"
  },
  {
    name: "LabPathology Plus",
    dist: "1.1 km",
    type: "Endoscopy (if needed)",
    price: "₹800",
    old: "₹1200",
    save: "₹400",
    avatar: "LP",
    cls: "ca2"
  },
  {
    name: "CityLab Diagnostics",
    dist: "1.4 km",
    type: "Abdominal Ultrasound",
    price: "₹600",
    old: "₹900",
    save: "₹300",
    avatar: "CL",
    cls: "ca3"
  }
];

const CONSULT_DATA = [
  {
    name: "CareWell Clinic",
    dist: "0.8 km",
    type: "General Physician",
    price: "₹300",
    old: "₹600",
    save: "₹300",
    avatar: "CW",
    cls: "ca1",
    best: true,
    stars: "⭐⭐⭐⭐⭐",
    reviews: 124
  },
  {
    name: "CityCare Hospital",
    dist: "1.2 km",
    type: "Multi Speciality",
    price: "₹500",
    old: "₹800",
    save: "₹300",
    avatar: "CC",
    cls: "ca2",
    best: false,
    stars: "⭐⭐⭐⭐",
    reviews: 88
  },
  {
    name: "HealthPlus Clinic",
    dist: "1.5 km",
    type: "General Physician",
    price: "₹650",
    old: "₹900",
    save: "₹250",
    avatar: "HP",
    cls: "ca3",
    best: false,
    stars: "⭐⭐⭐⭐",
    reviews: 57
  }
];

function switchTab(tab) {
  document.getElementById("tab-consult").classList.toggle("active", tab === "consult");
  document.getElementById("tab-tests").classList.toggle("active",   tab === "tests");

  const data = tab === "consult" ? CONSULT_DATA : TESTS_DATA;
  renderClinicList(data);
}

function renderClinicList(data) {
  const list = document.getElementById("clinic-list");
  list.innerHTML = "";

  data.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "clinic-card" + (c.best ? " best-value" : "");

    card.innerHTML = `
      ${c.best ? '<div class="best-tag">BEST VALUE</div>' : ""}
      <div class="clinic-header">
        <div class="clinic-avatar ${c.cls}">${c.avatar}</div>
        <div class="clinic-info">
          <p class="clinic-name">${c.name}</p>
          <p class="clinic-dist">${c.dist} • ${c.type}</p>
          ${c.stars ? `<div class="clinic-stars">${c.stars} <span>(${c.reviews})</span></div>` : ""}
        </div>
        <div class="clinic-price">
          <p class="price-new">${c.price}</p>
          <p class="price-old">${c.old}</p>
        </div>
      </div>
      <div class="save-pill">You Save ${c.save}</div>
    `;

    list.appendChild(card);
  });
}

/* ================================================================
   INIT
   ================================================================ */

(function init() {
  updateBottomNav(1);
  // pre-render question 0
  renderQuestion(0);
})();
