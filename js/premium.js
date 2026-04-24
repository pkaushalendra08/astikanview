/* ═══ DATA ═══ */
const HDR = ['🏠 Home', '❓ Questions', '👁️ Visual Analysis', '🩺 Health Summary', '💰 Cost Analyzer', '⭐ Smart Plan'];

// Master Data Object for Dynamic Questioning
const DATA_SETS = {
  "Why do I have a chest pain?": [
    { cat: "Site", text: "Where exactly is the pain?", hint: "Point to the area.", multi: false, opts: [{i:"❤️",l:"Left side",sum:"Pain located in the cardiac region."}, {i:"⏹️",l:"Center",sum:"Retrosternal discomfort detected."}, {i:"➡️",l:"Right side",sum:"Right-sided thoracic pain mapping."}, {i:"🌐",l:"Radiating to arm",sum:"Potential referral pattern to extremity."}] },
    { cat: "Type", text: "What kind of pain is it?", hint: "Describe the sensation.", multi: false, opts: [{i:"🔨",l:"Pressure",sum:"Sensation of weight or tightness."}, {i:"🔥",l:"Burning",sum:"Pyrosis or acidic sensation suspected."}, {i:"🔪",l:"Sharp",sum:"Acute stabbing sensation localized."}, {i:"☁️",l:"Dull",sum:"Continuous low-intensity ache."}] },
    { cat: "Breath", text: "Are you feeling short of breath?", hint: "Breathing status.", multi: false, opts: [{i:"😮‍💨",l:"Yes, significantly",sum:"Dyspnea reported at rest."}, {i:"😐",l:"A little bit",sum:"Mild respiratory exertion."}, {i:"🙅",l:"No, breathing is fine",sum:"Eupneic state confirmed."}, {i:"😰",l:"Only when moving",sum:"Exertional dyspnea tracking."}] },
    { cat: "Symptom", text: "Any other symptoms right now?", hint: "Select all that apply.", multi: true, opts: [{i:"💦",l:"Sweating",sum:"Diaphoresis observed."}, {i:"🤢",l:"Nausea",sum:"Gastric distress or prodromal sign."}, {i:"😵",l:"Dizziness",sum:"Presyncopal sensation monitored."}, {i:"🙅",l:"None",sum:"No secondary systemic signs."}] }
  ],
  "Headache from 2 days": [
    { cat: "Site", text: "Where is it hurting most?", hint: "Location of headache.", multi: false, opts: [{i:"🤯",l:"Forehead"},{i:"📐",l:"Temples"},{i:"🔙",l:"Back of head"},{i:"👁️",l:"Behind eyes"}] },
    { cat: "Type", text: "How would you describe the pain?", hint: "Sensation type.", multi: false, opts: [{i:"💓",l:"Throbbing"},{i:"⛓️",l:"Tight band"},{i:"⚡",l:"Sharp bursts"},{i:"☁️",l:"Dull ache"}] },
    { cat: "Sensory", text: "Is light or sound bothering you?", hint: "Sensory sensitivity.", multi: false, opts: [{i:"☀️",l:"Yes, light"},{i:"🔊",l:"Yes, sound"},{i:"🔇",l:"Both"},{i:"🙅",l:"Neither"}] },
    { cat: "History", text: "Has this happened before?", hint: "History.", multi: false, opts: [{i:"🔄",l:"Frequent migraine"},{i:"📆",l:"Occasionally"},{i:"🆕",l:"First time"},{i:"😩",l:"Chronic"}] }
  ],
  "Headache on one side causes": [
    { cat: "Side", text: "Which side is affected?", hint: "Lateral location.", multi: false, opts: [{i:"👈",l:"Left side only"},{i:"👉",l:"Right side only"},{i:"🔄",l:"Switches sides"},{i:"🌐",l:"Starts one, spreads"}] },
    { cat: "Vision", text: "Any changes in vision?", hint: "Visual symptoms.", multi: false, opts: [{i:"✨",l:"Blurry spots"},{i:"🔦",l:"Flashes"},{i:"🌫️",l:"Partial loss"},{i:"🙅",l:"Clear vision"}] },
    { cat: "Pulse", text: "Is there any pulsing sensation?", hint: "Rhythm of pain.", multi: false, opts: [{i:"🥁",l:"Strong pulse"},{i:"Constant",l:"Steady pressure"},{i:"⚡",l:"Intermittent spikes"},{i:"😐",l:"Mild pulsing"}] },
    { cat: "Activity", text: "Does moving make it worse?", hint: "Activity impact.", multi: false, opts: [{i:"🚶",l:"Yes, a lot"},{i:"🛌",l:"Need to lie down"},{i:"😐",l:"A little bit"},{i:"🙅",l:"No impact"}] }
  ],
  "Why I am feeling tired all the time": [
    { cat: "Sleep", text: "How are you sleeping?", hint: "Quality of rest.", multi: false, opts: [{i:"🥱",l:"Not enough hours"},{i:"😳",l:"Wake up often"},{i:"💤",l:"Sleep 8h+, still tired"},{i:"☕",l:"Difficulty falling"}] },
    { cat: "Diet", text: "Any change in appetite?", hint: "Eating habits.", multi: false, opts: [{i:"🍽️",l:"Increased hunger"},{i:"🙅",l:"Loss of appetite"},{i:"🍭",l:"Craving sugar"},{i:"😐",l:"No change"}] },
    { cat: "Mood", text: "Feeling low or stressed lately?", hint: "Mental well-being.", multi: false, opts: [{i:"😔",l:"Feeling sad"},{i:"🤯",l:"High stress"},{i:"😰",l:"Anxious/Worried"},{i:"🙅",l:"Generally fine"}] },
    { cat: "Physical", text: "Any physical weakness?", hint: "Muscle status.", multi: false, opts: [{i:"💪",l:"Muscle pain"},{i:"🦵",l:"Heavy limbs"},{i:"🚶",l:"Short of breath"},{i:"🙅",l:"Just sleepy"}] }
  ],
  "Stomach burn after meal": [
    { cat: "Timing", text: "When does it happen?", hint: "Timing.", multi: false, opts: [{i:"🍽️",l:"Immediately after"},{i:"⏰",l:"30-60 mins later"},{i:"🛌",l:"When lying down"},{i:"🌑",l:"At night"}] },
    { cat: "Site", text: "Where is the burning?", hint: "Anatomical location.", multi: false, opts: [{i:"胸",l:"Chest/Heartburn"},{i:"⬆️",l:"Upper stomach"},{i:"👅",l:"Back of throat"},{i:"🌐",l:"All over"}] },
    { cat: "Digest", text: "Any other digestive issues?", hint: "Select all.", multi: true, opts: [{i:"😮‍💨",l:"Bloating/Gas"},{i:"🤮",l:"Sour burps"},{i:"🤢",l:"Nausea"},{i:"🙅",l:"None"}] },
    { cat: "Trigger", text: "What triggers it most?", hint: "Food triggers.", multi: false, opts: [{i:"🌶️",l:"Spicy food"},{i:"🍔",l:"Oily/Fried"},{i:"☕",l:"Coffee/Tea"},{i:"🥤",l:"Soda"}] }
  ],
  "Feeling dizzy lately": [
    { cat: "Feel", text: "What does it feel like?", hint: "Type of dizziness.", multi: false, opts: [{i:"🌀",l:"Room spinning"},{i:"⛵",l:"Unbalanced/Off"},{i:"☁️",l:"Lightheaded"},{i:"🌑",l:"Near fainting"}] },
    { cat: "Time", text: "How long does it last?", hint: "Duration.", multi: false, opts: [{i:"⏱️",l:"Seconds"},{i:"⏳",l:"Minutes"},{i:"⌛",l:"Constant"},{i:"🆕",l:"Comes and goes"}] },
    { cat: "Aural", text: "Any ear symptoms?", hint: "Aural check.", multi: true, opts: [{i:"🔔",l:"Ringing/Tinnitus"},{i:"🙉",l:"Hearing loss"},{i:"👂",l:"Fullness in ear"},{i:"🙅",l:"None"}] },
    { cat: "Worst", text: "When is it worst?", hint: "Triggers.", multi: false, opts: [{i:"🛌",l:"When getting up"},{i:"↪️",l:"Moving head"},{i:"🚶",l:"While walking"},{i:"😫",l:"When stressed"}] }
  ],
  "I am Having fever": [
    { cat: "Temp", text: "What's the temperature?", hint: "Severity.", multi: false, opts: [{i:"🤒",l:"Mild (99-100)"},{i:"🔥",l:"High (102+)"},{i:"🌡️",l:"Moderate (101)"},{i:"🤷",l:"Haven't checked"}] },
    { cat: "Body", text: "Any body aches?", hint: "Systemic pain.", multi: false, opts: [{i:"🦵",l:"Leg/Joint pain"},{i:"🔙",l:"Back ache"},{i:"🌐",l:"Whole body"},{i:"🙅",l:"No ache"}] },
    { cat: "Cough", text: "Do you have a cough?", hint: "Respiratory check.", multi: false, opts: [{i:"💨",l:"Dry cough"},{i:"💦",l:"Productive/Wet"},{i:"🎤",l:"Sore throat"},{i:"🙅",l:"No cough"}] },
    { cat: "Cold", text: "Feeling cold or shivery?", hint: "Chills.", multi: false, opts: [{i:"🥶",l:"Strong chills"},{i:"😓",l:"Night sweats"},{i:"🧊",l:"Cold hands"},{i:"🙅",l:"Neither"}] }
  ],
  "Diabetes Symptoms": [
    { cat: "Thirst", text: "Are you unusually thirsty?", hint: "Polydipsia.", multi: false, opts: [{i:"🚰",l:"Drinking all day"},{i:"👅",l:"Extremely dry mouth"},{i:"🥤",l:"Need cold drinks"},{i:"🙅",l:"Normal thirst"}] },
    { cat: "Water", text: "Frequent urination?", hint: "Polyuria.", multi: false, opts: [{i:"🚽",l:"Frequent at night"},{i:"⏳",l:"Every hour"},{i:"💧",l:"Large volume"},{i:"🙅",l:"Normal"}] },
    { cat: "Eyes", text: "Any changes in vision?", hint: "Diabetic retinopathy sign.", multi: false, opts: [{i:"🌫️",l:"Suddenly blurry"},{i:"🌑",l:"Dark spots"},{i:"👓",l:"Difficulty reading"},{i:"🙅",l:"Stable vision"}] },
    { cat: "Weight", text: "Unexplained weight loss?", hint: "Metabolic change.", multi: false, opts: [{i:"📉",l:"Lost 2-3kg fast"},{i:"👖",l:"Clothes feel loose"},{i:"🍔",l:"Feeling more hungry"},{i:"🙅",l:"No change"}] }
  ],
  "Sleep cycle issues": [
    { cat: "Type", text: "What's the main problem?", hint: "Sleep type.", multi: false, opts: [{i:"⌛",l:"Can't fall asleep"},{i:"😳",l:"Wake up at 3 AM"},{i:"🥱",l:"Not refreshing"},{i:"⏰",l:"Wake up too early"}] },
    { cat: "Device", text: "Do you use screens before bed?", hint: "Digital habits.", multi: false, opts: [{i:"📱",l:"Until I sleep"},{i:"💻",l:"Work in bed"},{i:"📺",l:"Watch movies"},{i:"🙅",l:"No screens"}] },
    { cat: "Daytime", text: "Any daytime sleepiness?", hint: "Impact.", multi: false, opts: [{i:"😴",l:"Napping daily"},{i:"🤤",l:"Sleepy 24/7"},{i:"☕",l:"Need too much coffee"},{i:"🙅",l:"Manageable"}] },
    { cat: "Apnea", text: "Any snoring or gasping?", hint: "Apnea screening.", multi: false, opts: [{i:"🔊",l:"Loud snoring"},{i:"😮‍💨",l:"Waking up gasping"},{i:"🛌",l:"Restless legs"},{i:"🙅",l:"Quiet sleep"}] }
  ]
};

// Default fallback set
const DEFAULT_QS = [
  { cat: "Issue", text: "Tell me, what are you feeling?", hint: "General symptoms.", multi: true, opts: [{ i: "🫃", l: "Stomach Pain", sum: "Epigastric or abdominal discomfort." }, { i: "🤕", l: "Headache", sum: "Cranial tension or pain pattern." }, { i: "🔥", l: "Burn/Acidity", sum: "Gastroesophageal reflux indicator." }, { i: "😮‍💨", l: "General Weakness", sum: "Systemic lethargy or fatigue." }] },
  { cat: "Time", text: "How long from today?", hint: "Duration.", multi: false, opts: [{ i: "⏰", l: "Just started", sum: "Acute onset within hours." }, { i: "📅", l: "Since yesterday", sum: "Symptom duration > 24 hours." }, { i: "🗓️", l: "2–3 days", sum: "Sub-acute progression observed." }, { i: "📆", l: "More than a week", sum: "Chronic or persistent pattern." }] },
  { cat: "Along", text: "Any associated symptoms?", hint: "Select all.", multi: true, opts: [{ i: "🌡️", l: "Fever", sum: "Febrile state increasing metabolic rate." }, { i: "🫀", l: "Chest Pain", sum: "Secondary thoracic involvement." }, { i: "😰", l: "Sweating", sum: "Autonomic response triggered." }, { i: "🙅", l: "None", sum: "Localized symptoms without systemic spread." }] },
  { cat: "Level", text: "Severity level?", hint: "Intensity.", multi: false, opts: [{ i: "😊", l: "Mild", sum: "VAS score 1-3. Manageable." }, { i: "😐", l: "Moderate", sum: "VAS score 4-6. Interfering with activity." }, { i: "😣", l: "Severe", sum: "VAS score 7-9. Requires attention." }, { i: "🆘", l: "Extreme", sum: "VAS score 10. Critical discomfort level." }] }
];

let QS = [...DEFAULT_QS];
const CONSULT = [
  { nm: "CareWell Clinic", dist: "0.8 km", type: "General Physician", pn: 300, po: 600, save: 300, av: "CW", cls: "av1", best: true, stars: "⭐⭐⭐⭐⭐", rev: 124, why: "Nearest clinic. Top-rated by 124 patients" },
  { nm: "CityCare Hospital", dist: "1.2 km", type: "Multi Speciality", pn: 500, po: 800, save: 300, av: "CC", cls: "av2", best: false, stars: "⭐⭐⭐⭐", rev: 88, why: "Good for multi-specialty consultation" },
  { nm: "HealthPlus Clinic", dist: "1.5 km", type: "General Physician", pn: 650, po: 900, save: 250, av: "HP", cls: "av3", best: false, stars: "⭐⭐⭐⭐", rev: 57, why: "Well-equipped, experienced doctor" }
];
const TESTDATA = [
  { nm: "Dr. Reddy's Lab", dist: "0.6 km", type: "H. Pylori Test", pn: 350, po: 600, save: 250, av: "DR", cls: "av1", best: true, stars: "⭐⭐⭐⭐⭐", rev: 98, why: "Fastest report. NABL accredited" },
  { nm: "LabPathology Plus", dist: "1.1 km", type: "Endoscopy (if needed)", pn: 800, po: 1200, save: 400, av: "LP", cls: "av2", best: false, stars: "⭐⭐⭐⭐", rev: 64, why: "Best rated for gastro tests" },
  { nm: "CityLab Diagnostics", dist: "1.4 km", type: "Abdominal Ultrasound", pn: 600, po: 900, save: 300, av: "CL", cls: "av3", best: false, stars: "⭐⭐⭐⭐", rev: 51, why: "Affordable ultrasound suite" }
];

/* ═══ STATE ═══ */
let cur = 1, qIdx = 0, ans = [[], [], [], []], userProb = '', vuTimer = null, curTab = 'c', curBudget = 700, curData = CONSULT;
let qTransitioning = false, qLoaderMsgTimer = null;


/* ═══ NAVIGATION ═══ */
function toggleMenu(open) {
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.overlay');
  if (drawer) drawer.classList.toggle('open', open);
  if (overlay) overlay.classList.toggle('open', open);
}
function closeAuth() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('open');
}
function continueWithoutAuth() {
  closeAuth();
}
function openAuth(mode) {
  const m = document.getElementById('auth-modal'), t = document.getElementById('auth-title'),
    s = document.getElementById('auth-submit'), sw = document.getElementById('auth-switch');
  if (!m) return;
  m.classList.add('open');
  if (mode === 'login') {
    if (t) t.textContent = 'Welcome Back'; 
    if (s) s.textContent = 'Sign In';
    if (sw) sw.innerHTML = 'Don\'t have an account? <b onclick="openAuth(\'signup\')">Sign Up</b>';
  } else {
    if (t) t.textContent = 'Join Astikan'; 
    if (s) s.textContent = 'Create Account';
    if (sw) sw.innerHTML = 'Already have an account? <b onclick="openAuth(\'login\')">Sign In</b>';
  }
}
function goTo(n) {
  const prevScreen = document.getElementById('s' + cur);
  const nextScreen = document.getElementById('s' + n);
  if (prevScreen) prevScreen.classList.remove('active');
  cur = n;
  if (nextScreen) nextScreen.classList.add('active');
  updateNav(n);
  const hl = document.getElementById('hdr-lbl');
  if (hl) hl.textContent = HDR[n - 1] || '';
  
  if (n === 2) { 
    // Logic to load specific data sets based on user query
    const match = Object.keys(DATA_SETS).find(k => k.toLowerCase() === userProb.toLowerCase() || userProb.toLowerCase().includes(k.toLowerCase().replace('?', '')));
    if (match) {
      QS = [...DATA_SETS[match]];
    } else {
      QS = [...DEFAULT_QS];
    }
    qIdx = 0; 
    ans = [[], [], [], []]; 
    renderQ(0); 
  }
  
  if (n === 3) { renderVUSummary(); startVU(); }
  if (n === 4) { renderHealthSummary(); }
  if (n === 5) { curData = CONSULT; renderClinics(curData, curBudget); updateBudgetUI(curBudget); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateNav(n) {
  const b = document.querySelector('.bnav');
  if(b) b.classList.toggle('h', n === 1);
  
  document.querySelectorAll('.bstp').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 === n) s.classList.add('active');
    if (i + 1 < n) s.classList.add('done');
  });
  document.querySelectorAll('.bli').forEach((l, i) => {
    if (l) l.classList.toggle('done', i + 1 < n);
  });
}

/* ═══ QUESTIONS ═══ */
function renderQ(idx) {
  const q = QS[idx];
  const qText = document.getElementById('q-text');
  const qHint = document.getElementById('q-hint');
  const qCnt = document.getElementById('q-cnt');
  const qProg = document.getElementById('q-prog');
  const c = document.getElementById('q-opts');

  if (qText) qText.textContent = q.text;
  if (qHint) qHint.textContent = q.hint;
  if (qCnt) {
    const tips = ["Let's begin", "Good progress", "Almost done", "Just one more!"];
    qCnt.innerHTML = `Question ${idx + 1} of ${QS.length} &mdash; <span class="bl">${tips[idx] || 'Almost done'}</span>`;
  }
  if (qProg) qProg.style.width = ((idx + 1) / QS.length * 100) + '%';
  
  if (!c) return;
  c.innerHTML = '';

  q.opts.forEach((o, oi) => {
    const sel = ans[idx].includes(oi);
    const d = document.createElement('div');
    d.className = 'opt' + (sel ? ' sel' : '');
    d.innerHTML = '<span class="opt-ic">' + o.i + '</span><span class="opt-lb">' + o.l + '</span><span class="opt-ck">' + (sel ? '✓' : '') + '</span>';
    d.onclick = () => toggleOpt(idx, oi, q.multi);
    c.appendChild(d);
  });

  const bk = document.getElementById('btn-back');
  if (bk) bk.style.visibility = idx === 0 ? 'hidden' : 'visible';
  updateNxtBtn();
  updateAvatarOrbit(idx);
}
function updateNxtBtn() {
  const nxt = document.querySelector('.btn-nxt');
  if (!nxt) return;
  const hasSelection = ans[qIdx].length > 0;
  const hasText = qIdx === 0 && userProb.trim().length > 0;
  nxt.classList.toggle('pulse', hasSelection || hasText);
}

function toggleOpt(qi, oi, multi) {
  if (multi) { 
    const p = ans[qi].indexOf(oi); 
    if (p >= 0) ans[qi].splice(p, 1); 
    else ans[qi].push(oi); 
  }
  else ans[qi] = [oi];
  renderQ(qi);
}
function sqNext() {
  if (qTransitioning) return;
  const hasSelection = ans[qIdx].length > 0;
  const hasText = qIdx === 0 && userProb.trim().length > 0;
  if (!hasSelection && !hasText) { flashHint(); return; }
  if (qIdx < QS.length - 1) {
    runQuestionTransition(() => {
      qIdx++;
      renderQ(qIdx);
    });
  } else goTo(3);
}

function sqBack() { if (qIdx > 0) { qIdx--; renderQ(qIdx); } else goTo(1); }
function flashHint() {
  const h = document.getElementById('q-hint'); if (!h) return;
  const orig = QS[qIdx].hint;
  h.style.color = '#EF4444'; h.textContent = '⚠️ Please pick at least one option.';
  setTimeout(() => { h.style.color = ''; h.textContent = orig; }, 2200);
}

function runQuestionTransition(onDone) {
  const overlay = document.getElementById('q-loader-overlay');
  const msgEl = document.getElementById('q-loader-msg');
  const messages = [
    'Analysing symptoms...',
    'Collecting response data...',
    'Matching clinical patterns...',
    'Preparing next question...'
  ];
  const durationMs = 5500;
  let msgIdx = 0;

  qTransitioning = true;
  if (overlay) overlay.style.display = 'flex';
  if (msgEl) msgEl.textContent = messages[0];

  if (qLoaderMsgTimer) {
    clearInterval(qLoaderMsgTimer);
    qLoaderMsgTimer = null;
  }
  qLoaderMsgTimer = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length;
    if (msgEl) msgEl.textContent = messages[msgIdx];
  }, 1500);

  setTimeout(() => {
    if (qLoaderMsgTimer) {
      clearInterval(qLoaderMsgTimer);
      qLoaderMsgTimer = null;
    }
    if (overlay) overlay.style.display = 'none';
    qTransitioning = false;
    if (typeof onDone === 'function') onDone();
  }, durationMs);
}

/* ═══ AVATAR ORBIT ═══ */
function updateAvatarOrbit(idx) {
  const zone = document.getElementById('av-orb');
  if (!zone) return;
  zone.querySelectorAll('.orb-wrap').forEach(n => n.remove());

  // Show selection from the PREVIOUS question as a 'reassurance' orbit
  if (idx === 0) return;
  const prevIdx = idx - 1;
  const sel = ans[prevIdx]; if (!sel.length) return;
  const q = QS[prevIdx];

  const rPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--orb-r-av')) || 85;
  const speeds = [7, 9, 8, 10];
  sel.forEach((oi, i) => {
    const opt = q.opts[oi];
    const startDeg = i * (360 / sel.length);
    const dur = speeds[i % 4];
    const wrap = document.createElement('div');
    wrap.className = 'orb-wrap';
    wrap.style.cssText = `--r:${rPx}px;--dur:${dur}s;--delay:${-(dur / sel.length * i)}s;--start:${startDeg}deg`;
    const bub = document.createElement('div');
    bub.className = 'orb-bub';
    bub.style.cssText = 'flex-direction:column;align-items:center;gap:2px;max-width:76px;text-align:center;padding:4px 7px;';
    bub.innerHTML = '<span style="font-size:13px;line-height:1">' + opt.i + '</span><span style="font-size:9px;font-weight:700;line-height:1.2;color:var(--blue)">' + opt.l + '</span>';
    wrap.appendChild(bub);
    zone.appendChild(wrap);
  });
}

/* ═══ VU PROGRESS & SUMMARY ═══ */
/* ═══ VU PROGRESS & SUMMARY ═══ */
function renderVUSummary() {
  const sympContainer = document.getElementById('vu-symp-list');
  const bulletContainer = document.getElementById('vu-summary-bullets');
  const orbContainer = document.getElementById('vu-orbs');
  
  if (!sympContainer || !bulletContainer || !orbContainer) return;
  
  sympContainer.innerHTML = '';
  bulletContainer.innerHTML = '';
  orbContainer.innerHTML = '';

  const symptoms = [];
  
  // 1. Process User Probability Text
  if (userProb.trim()) {
    symptoms.push({ i: "✍️", c: "Self-Report", l: userProb, s: "Initial complaint based on user input." });
  }

  // 2. Process Answer Selections
  ans.forEach((indices, qIdx) => {
    indices.forEach(optIdx => {
      const q = QS[qIdx];
      if (q && q.opts[optIdx]) {
        const o = q.opts[optIdx];
        symptoms.push({ i: o.i, c: q.cat, l: o.l, s: o.sum || "Biological indicator observed." });
      }
    });
  });

  // 3. Render left column (Question: Option)
  symptoms.forEach(s => {
    const d = document.createElement('div');
    d.className = 'si';
    d.innerHTML = `
      <div class="si-i">${s.i}</div>
      <div>
        <p class="si-nm">${s.c}</p>
        <p class="si-dt">${s.l}</p>
      </div>
    `;
    sympContainer.appendChild(d);

    // Render right column (Bullet Points with bold heading + detail)
    const li = document.createElement('li');
    li.className = 'sum-item';
    li.innerHTML = `
      <p class="sum-head">${s.c}</p>
      <p class="sum-detail">${s.s}</p>
    `;
    bulletContainer.appendChild(li);
  });

  // 4. Render Orbs
  symptoms.slice(0, 4).forEach((s, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'orb-wrap';
    wrap.style.cssText = `--r:var(--orb-r-body,145px);--dur:${8 + i * 2}s;--delay:-${i * 2}s;--start:${i * 90}deg`;
    wrap.innerHTML = `<div class="orb-bub symp"><span class="so-i">${s.i}</span><span class="so-t">${s.l}</span></div>`;
    orbContainer.appendChild(wrap);
  });

  // 5. Body Highlighting
  highlightBodyPart();
}

function highlightBodyPart() {
  const parts = document.querySelectorAll('.body-part');
  parts.forEach(p => { p.classList.remove('v-active'); p.style.opacity = '0.2'; });

  const text = (userProb + ' ' + ans.flat().join(' ')).toLowerCase();
  let target = 'v-chest'; // default

  if (text.includes('head') || text.includes('dizzy') || text.includes('migraine')) target = 'v-head';
  else if (text.includes('neck') || text.includes('throat')) target = 'v-neck';
  else if (text.includes('chest') || text.includes('breath') || text.includes('heart')) target = 'v-chest';
  else if (text.includes('stomach') || text.includes('burn') || text.includes('belly')) target = 'v-stomach';
  else if (text.includes('leg') || text.includes('knee') || text.includes('foot') || text.includes('ache')) target = 'v-legs';
  else if (text.includes('arm') || text.includes('hand') || text.includes('shoulder')) target = 'v-arm-l';

  const el = document.getElementById(target);
  if (el) {
    el.classList.add('v-active');
    el.style.opacity = '1';
  }

  const glow = document.getElementById('v-glow');
  if (glow) {
    glow.style.display = 'block';
    const coords = { 'v-head': -110, 'v-neck': -85, 'v-chest': -50, 'v-stomach': 5, 'v-legs': 90, 'v-arm-r': -30, 'v-arm-l': -30 };
    glow.setAttribute('transform', `translate(0, ${coords[target] || 0})`);
  }
}

function addSymptomItem(container, icon, name, detail) {
  const si = document.createElement('div');
  si.className = 'si';
  si.innerHTML = `
    <div class="si-i">${icon}</div>
    <div>
      <p class="si-nm">${name}</p>
      <p class="si-dt">${detail}</p>
    </div>
  `;
  container.appendChild(si);
}

const SUMMARY_PROFILES = {
  "Why do I have a chest pain?": {
    causes: [
      { name: "Muscular Chest Wall Pain", base: 38, keys: ["sharp", "moving", "right side", "dull"] },
      { name: "Acid Reflux / Heartburn", base: 34, keys: ["burning", "after meal", "throat", "nausea"] },
      { name: "Cardiac-related Angina Pattern", base: 28, keys: ["left side", "pressure", "radiating", "sweating", "short of breath"] }
    ],
    severity: "Moderate",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Cardiologist", Severe: "Emergency Physician" },
    recoveryBySeverity: { Mild: [2, 4], Moderate: [4, 7], Severe: [7, 14] },
    actions: ["Avoid heavy exertion until reviewed", "Track pain triggers and duration", "Seek urgent care for persistent pain"],
    costBySpecialist: { "General Physician": "Rs300", "Cardiologist": "Rs900", "Emergency Physician": "Rs1500" }
  },
  "Headache from 2 days": {
    causes: [
      { name: "Tension Headache", base: 42, keys: ["tight band", "dull ache", "forehead", "temples"] },
      { name: "Migraine Pattern", base: 36, keys: ["throbbing", "light", "sound", "behind eyes"] },
      { name: "Sinus-related Headache", base: 22, keys: ["forehead", "behind eyes", "constant"] }
    ],
    severity: "Mild",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Neurologist", Severe: "Neurologist" },
    recoveryBySeverity: { Mild: [2, 3], Moderate: [3, 5], Severe: [5, 8] },
    actions: ["Stay hydrated and rest in a dark room", "Limit screen time and caffeine excess", "Use prescribed pain relief only as advised"],
    costBySpecialist: { "General Physician": "Rs300", "Neurologist": "Rs1200" }
  },
  "Headache on one side causes": {
    causes: [
      { name: "Migraine with Unilateral Pattern", base: 48, keys: ["left side only", "right side only", "flashes", "blurry", "need to lie down", "strong pulse"] },
      { name: "Cluster-type Headache Pattern", base: 28, keys: ["behind eyes", "strong pulse", "yes, a lot"] },
      { name: "Cervicogenic Headache", base: 24, keys: ["moving", "steady pressure", "switches sides"] }
    ],
    severity: "Moderate",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Neurologist", Severe: "Neurologist" },
    recoveryBySeverity: { Mild: [2, 4], Moderate: [4, 7], Severe: [7, 10] },
    actions: ["Avoid bright lights and loud environments", "Maintain sleep schedule", "Document trigger foods and stress levels"],
    costBySpecialist: { "General Physician": "Rs300", "Neurologist": "Rs1200" }
  },
  "Why I am feeling tired all the time": {
    causes: [
      { name: "Sleep Debt / Poor Sleep Quality", base: 42, keys: ["not enough", "wake up often", "difficulty falling", "still tired"] },
      { name: "Stress-related Fatigue", base: 34, keys: ["high stress", "anxious", "feeling sad"] },
      { name: "Nutritional Deficiency Pattern", base: 24, keys: ["loss of appetite", "craving sugar", "heavy limbs"] }
    ],
    severity: "Mild",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Internal Medicine Specialist", Severe: "Internal Medicine Specialist" },
    recoveryBySeverity: { Mild: [4, 7], Moderate: [7, 14], Severe: [14, 21] },
    actions: ["Prioritize regular sleep schedule", "Take balanced meals with hydration", "Get baseline blood tests if persistent"],
    costBySpecialist: { "General Physician": "Rs300", "Internal Medicine Specialist": "Rs700" }
  },
  "Stomach burn after meal": {
    causes: [
      { name: "Acidity / Gastritis", base: 50, keys: ["spicy", "oily", "burning", "upper stomach", "night", "sour burps"] },
      { name: "Gastroesophageal Reflux (GERD)", base: 30, keys: ["chest/heartburn", "back of throat", "lying down", "coffee", "soda"] },
      { name: "Functional Dyspepsia", base: 20, keys: ["bloating", "nausea", "all over"] }
    ],
    severity: "Mild",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Gastroenterologist", Severe: "Gastroenterologist" },
    recoveryBySeverity: { Mild: [2, 3], Moderate: [3, 6], Severe: [7, 10] },
    actions: ["Avoid trigger foods (spicy, oily, soda)", "Take smaller frequent meals", "Do not lie down right after meals"],
    costBySpecialist: { "General Physician": "Rs300", "Gastroenterologist": "Rs900" }
  },
  "Feeling dizzy lately": {
    causes: [
      { name: "Positional Vertigo Pattern", base: 40, keys: ["room spinning", "moving head", "when getting up"] },
      { name: "Dehydration / Blood Pressure Fluctuation", base: 34, keys: ["lightheaded", "while walking", "near fainting"] },
      { name: "Inner Ear Imbalance", base: 26, keys: ["ringing", "hearing loss", "fullness in ear"] }
    ],
    severity: "Moderate",
    specialistBySeverity: { Mild: "General Physician", Moderate: "ENT Specialist", Severe: "Neurologist" },
    recoveryBySeverity: { Mild: [2, 4], Moderate: [4, 7], Severe: [7, 12] },
    actions: ["Stand up slowly and hydrate well", "Avoid sudden head turns", "Seek urgent review for fainting episodes"],
    costBySpecialist: { "General Physician": "Rs300", "ENT Specialist": "Rs800", "Neurologist": "Rs1200" }
  },
  "I am Having fever": {
    causes: [
      { name: "Viral Fever Pattern", base: 44, keys: ["moderate", "mild", "body", "dry cough"] },
      { name: "Upper Respiratory Infection", base: 32, keys: ["sore throat", "wet", "chills"] },
      { name: "Bacterial Infection Possibility", base: 24, keys: ["high (102+)", "strong chills", "night sweats"] }
    ],
    severity: "Moderate",
    specialistBySeverity: { Mild: "General Physician", Moderate: "General Physician", Severe: "Emergency Physician" },
    recoveryBySeverity: { Mild: [3, 5], Moderate: [5, 7], Severe: [7, 12] },
    actions: ["Monitor temperature and hydration", "Use fever medication as prescribed", "Get tested if high fever persists"],
    costBySpecialist: { "General Physician": "Rs300", "Emergency Physician": "Rs1500" }
  },
  "Diabetes Symptoms": {
    causes: [
      { name: "Possible Elevated Blood Sugar", base: 46, keys: ["thirst", "frequent", "dry mouth", "every hour"] },
      { name: "Prediabetes Pattern", base: 30, keys: ["blurry", "more hungry", "weight loss"] },
      { name: "Metabolic / Endocrine Imbalance", base: 24, keys: ["suddenly blurry", "dark spots", "lost 2-3kg"] }
    ],
    severity: "Moderate",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Endocrinologist", Severe: "Endocrinologist" },
    recoveryBySeverity: { Mild: [7, 14], Moderate: [14, 30], Severe: [30, 60] },
    actions: ["Check fasting and post-meal glucose", "Reduce sugar and refined carbs", "Start physician-guided glucose plan"],
    costBySpecialist: { "General Physician": "Rs300", "Endocrinologist": "Rs1000" }
  },
  "Sleep cycle issues": {
    causes: [
      { name: "Insomnia Pattern", base: 44, keys: ["can't fall asleep", "wake up at 3 am", "wake up too early"] },
      { name: "Poor Sleep Hygiene", base: 32, keys: ["screens", "work in bed", "watch movies", "coffee"] },
      { name: "Possible Sleep Apnea Pattern", base: 24, keys: ["loud snoring", "gasping", "not refreshing"] }
    ],
    severity: "Mild",
    specialistBySeverity: { Mild: "General Physician", Moderate: "Sleep Specialist", Severe: "Sleep Specialist" },
    recoveryBySeverity: { Mild: [5, 10], Moderate: [10, 21], Severe: [21, 42] },
    actions: ["Keep fixed sleep and wake times", "Stop screens 60 minutes before bed", "Avoid caffeine late evening"],
    costBySpecialist: { "General Physician": "Rs300", "Sleep Specialist": "Rs1200" }
  },
  default: {
    causes: [
      { name: "General Functional Discomfort", base: 40, keys: ["pain", "discomfort", "fatigue"] },
      { name: "Inflammatory / Infective Pattern", base: 32, keys: ["fever", "ache", "nausea"] },
      { name: "Lifestyle-triggered Symptoms", base: 28, keys: ["stress", "sleep", "food", "spicy"] }
    ],
    severity: "Mild",
    specialistBySeverity: { Mild: "General Physician", Moderate: "General Physician", Severe: "Internal Medicine Specialist" },
    recoveryBySeverity: { Mild: [3, 5], Moderate: [5, 8], Severe: [8, 14] },
    actions: ["Stay hydrated and rest adequately", "Track symptoms for 48 hours", "Consult a doctor if symptoms worsen"],
    costBySpecialist: { "General Physician": "Rs300", "Internal Medicine Specialist": "Rs700" }
  }
};

function getActiveSummaryProfile() {
  const match = Object.keys(DATA_SETS).find(k =>
    k.toLowerCase() === userProb.toLowerCase() ||
    userProb.toLowerCase().includes(k.toLowerCase().replace('?', ''))
  );
  return SUMMARY_PROFILES[match] || SUMMARY_PROFILES.default;
}

function getSelectedSignalText() {
  const tokens = [userProb || ''];
  ans.forEach((indices, qIdxLocal) => {
    const q = QS[qIdxLocal];
    indices.forEach(optIdx => {
      const opt = q && q.opts ? q.opts[optIdx] : null;
      if (q) tokens.push(String(q.cat || ''));
      if (opt) {
        tokens.push(String(opt.l || ''));
        tokens.push(String(opt.sum || ''));
        tokens.push(String(opt.i || ''));
      }
    });
  });
  return tokens.join(' ').toLowerCase();
}

function getSeverityLevel(signalText) {
  let score = 0;
  const severeKeys = ["severe", "extreme", "high (102+)", "significantly", "strong", "near fainting", "gasping", "radiating"];
  const moderateKeys = ["moderate", "constant", "chronic", "a little", "minutes", "night"];
  const mildKeys = ["mild", "none", "no impact", "manageable", "first time", "just started"];

  severeKeys.forEach(k => { if (signalText.includes(k)) score += 2; });
  moderateKeys.forEach(k => { if (signalText.includes(k)) score += 1; });
  mildKeys.forEach(k => { if (signalText.includes(k)) score -= 1; });

  if (score >= 4) return "Severe";
  if (score >= 1) return "Moderate";
  return "Mild";
}

function computeTopCauses(profile, signalText) {
  const scored = profile.causes.map(cause => {
    const bonus = cause.keys.reduce((acc, key) => acc + (signalText.includes(key) ? 8 : 0), 0);
    return { ...cause, score: cause.base + bonus };
  }).sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 3);
  const total = top.reduce((sum, item) => sum + item.score, 0) || 1;
  let allocated = 0;

  return top.map((item, idx) => {
    let pct = Math.round((item.score / total) * 100);
    if (idx === top.length - 1) pct = 100 - allocated;
    allocated += pct;
    return { name: item.name, pct };
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderList(id, rows) {
  const root = document.getElementById(id);
  if (!root) return;
  root.innerHTML = '';
  rows.forEach(text => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="chk">&#10003;</span><span>${text}</span>`;
    root.appendChild(li);
  });
}

function renderHealthSummary() {
  const profile = getActiveSummaryProfile();
  const signalText = getSelectedSignalText();
  const severity = profile.severity || getSeverityLevel(signalText);
  const topCauses = computeTopCauses(profile, signalText);
  const primary = topCauses[0] || { name: "General Discomfort", pct: 70 };
  const secondary = topCauses[1] || { name: "Related Symptom Cluster", pct: 20 };

  const specialist = (profile.specialistBySeverity && profile.specialistBySeverity[severity]) || "General Physician";
  const recoveryRange = (profile.recoveryBySeverity && profile.recoveryBySeverity[severity]) || [3, 5];
  const costEstimate = (profile.costBySpecialist && profile.costBySpecialist[specialist]) || "Rs300";

  const confidenceTag =
    primary.pct >= 60 ? "High confidence match" :
    primary.pct >= 45 ? "Probable pattern" :
    "Preliminary pattern";

  setText('hs-diag-name', primary.name);
  setText('hs-diag-tag', confidenceTag);
  setText('hs-analysis-text',
    `Based on your input and selections, ${primary.name} appears most likely (${primary.pct}%), with ${secondary.name} as another possibility (${secondary.pct}%). Typical recovery is around ${recoveryRange[0]}-${recoveryRange[1]} days with timely care.`
  );

  renderList('hs-top-causes', topCauses.map(item => `<b>${item.name} - ${item.pct}%</b>`));

  renderList('hs-actions', [
    `Consult a ${specialist}`,
    profile.actions[0] || "Track your symptoms carefully",
    profile.actions[1] || "Follow a simple recovery routine"
  ]);

  setText('hs-note', `Note: If symptoms persist beyond ${recoveryRange[1]} days or worsen, get a doctor review promptly.`);
  setText('hs-specialist', specialist);
  setText('hs-sev-chip', severity);
  setText('hs-sev-desc', `Expected recovery in ${recoveryRange[0]}-${recoveryRange[1]} days with proper treatment.`);
  setText('hs-severity-inline', `Severity: ${severity}`);
  if (!document.getElementById('hs-severity-inline')) {
    const diagCopy = document.querySelector('#s4 .hs-diag-copy');
    if (diagCopy) {
      const p = document.createElement('p');
      p.id = 'hs-severity-inline';
      p.style.cssText = 'margin-top:6px;font-size:13px;font-weight:700;color:var(--t2)';
      p.textContent = `Severity: ${severity}`;
      diagCopy.appendChild(p);
    }
  }

  setText('hs-tl-1', `Day 1: Consult ${specialist}`);
  setText('hs-tl-2', 'Day 1-2: Start medication, hydration, and symptom tracking');
  setText('hs-tl-3', `Day ${recoveryRange[1]}: Expected noticeable improvement`);

  setText('hs-stat-match', `${primary.pct}%`);
  setText('hs-stat-days', `${recoveryRange[0]}-${recoveryRange[1]}`);
  setText('hs-stat-cost', costEstimate);
}
function startVU() {
  const bar = document.getElementById('vu-bar'), pct = document.getElementById('vu-pct'),
    btn = document.getElementById('btn-vu'), txt = document.getElementById('anlz-txt');
  const msgs = ["Analysing your symptoms…", "Matching symptom patterns…", "Checking severity level…", "Identifying likely causes…", "Preparing your health report…", "Done! ✅"];
  let p = 0, mi = 0;
  if (btn) btn.disabled = true; 
  if (bar) bar.style.width = '0%'; 
  if (pct) pct.textContent = '0%';
  if (vuTimer) clearInterval(vuTimer);
  vuTimer = setInterval(() => {
    p += Math.random() * 14 + 6; if (p > 100) p = 100;
    if (bar) bar.style.width = Math.round(p) + '%';
    if (pct) pct.textContent = Math.round(p) + '%';
    const m2 = Math.floor(p / 100 * (msgs.length - 1));
    if (m2 !== mi) { mi = m2; if (txt) txt.textContent = msgs[mi]; }
    if (p >= 100) { clearInterval(vuTimer); if (btn) btn.disabled = false; if (txt) txt.textContent = msgs[msgs.length - 1]; }
  }, 280);
}

/* ═══ BUDGET SLIDER ═══ */
function onBudget(val) {
  curBudget = parseInt(val);
  const el = document.getElementById('bgt-val');
  const el2 = document.getElementById('b8-val');
  if (el) el.textContent = '₹' + curBudget.toLocaleString('en-IN');
  if (el2) el2.textContent = '₹' + curBudget.toLocaleString('en-IN');

  const min = 100, max = 1500;
  const pctValue = Math.min(Math.max(((curBudget - min) / (max - min) * 100), 0), 100).toFixed(2) + '%';

  document.querySelectorAll('.bgt-range').forEach(s => {
    s.value = curBudget;
    s.style.setProperty('--pct', pctValue);
  });

  document.querySelectorAll('.bgt-tag').forEach(b => {
    const bv = parseInt(b.textContent.replace(/[₹,]/g, ''));
    b.classList.toggle('on', bv === curBudget);
  });

  renderClinics(curData, curBudget);
  updateBudgetUI(curBudget);
}
function setBudget(val) {
  onBudget(val);
}
function updateBudgetUI(budget) {
  const within = curData.filter(c => c.pn <= budget);
  const maxSave = within.length ? Math.max(...within.map(c => c.save)) : 0;
  const minSave = within.length ? Math.min(...within.map(c => c.save)) : 0;
  const w = document.getElementById('within-cnt');
  const ms = document.getElementById('max-sv');
  const ts = document.getElementById('total-save');
  if (w) w.textContent = within.length + ' clinics within budget';
  if (ms) ms.textContent = '₹' + maxSave;
  if (ts) ts.textContent = within.length ? '₹' + minSave + ' – ₹' + maxSave : 'No options in budget';
  renderCmpTable(curData, budget);
}
function renderClinics(data, budget) {
  const list = document.getElementById('cl-list'); if (!list) return;
  list.innerHTML = '';
  data.forEach(c => {
    const over = c.pn > budget;
    const savePct = Math.round((c.save / c.po) * 100);
    const d = document.createElement('div');
    d.className = 'cl-card' + (c.best ? ' bv' : '') + (over ? ' over' : '');
    d.innerHTML =
      (c.best ? '<div class="bv-tag" style="position:absolute;top:0;left:0;border-radius:var(--r3) 0 var(--r3) 0">RECOMMENDED</div>' : '') +
      '<div class="cl-row" style="margin-top:' + (c.best ? '18px' : '0') + '">' +
      '<div class="cl-av ' + c.cls + '">' + c.av + '</div>' +
      '<div class="cl-inf">' +
      '<p class="cl-nm">' + c.nm + '</p>' +
      '<p class="cl-dt">' + c.dist + ' • ' + c.type + ' • ⭐ ' + c.stars + ' (' + c.rev + ')</p>' +
      '</div>' +
      '<div class="cl-price"><p class="pnew">₹' + c.pn + '</p><p class="pold">₹' + c.po + '</p></div>' +
      '</div>' +
      '<div class="ast-row" style="margin-top:8px; padding-top:8px; border-top:1px solid #eee">' +
      '<p class="ast-tx" style="font-size:12px">Save <b>₹' + c.save + '</b> with Astikan</p>' +
      '<span class="ast-badge" style="margin-left:auto; background:' + (c.best ? '#10B981' : 'var(--blue)') + '">Save ₹' + c.save + '</span>' +
      '</div>';
    list.appendChild(d);
  });
}
function renderCmpTable(data, budget) {
  const body = document.getElementById('cmp-body'); if (!body) return;
  body.innerHTML = '';
  data.forEach(c => {
    const over = c.pn > budget;
    const tr = document.createElement('tr');
    if (c.best) tr.className = 'rbe';
    tr.style.opacity = over ? '0.4' : '1';
    tr.innerHTML = '<td>' + c.nm.split(' ')[0] + (over ? ' ⚠️' : '') + '</td><td>₹' + c.pn + '</td><td class="sg">₹' + c.save + '</td>';
    body.appendChild(tr);
  });
}
function switchTab(t) {
  curTab = t; 
  curData = (t === 'c' ? CONSULT : TESTDATA);
  const tabC = document.getElementById('tab-c');
  const tabT = document.getElementById('tab-t');
  if (tabC) tabC.classList.toggle('active', t === 'c');
  if (tabT) tabT.classList.toggle('active', t === 't');
  renderClinics(curData, curBudget);
  updateBudgetUI(curBudget);
}

/* ── Search UI Logic ── */
function initSearchPlaceholderRotator() {
  const input = document.getElementById('home-search-input');
  if (!input) return;
  const phs = [
    "Why do I have a chest pain?",
    "Headache from 2 days",
    "Paracetamol usage",
    "How to reduce anxiety",
    "Stomach burn after meal",
    "Fever and body ache"
  ];

  const mqMobile = window.matchMedia('(max-width: 600px)');
  const formatPlaceholder = (txt) => {
    if (!mqMobile.matches) return txt;
    const base = txt.length > 20 ? txt.slice(0, 20).trim() : txt.trim();
    return base.replace(/\.{1,}$/g, '') + '....';
  };

  let curPh = 0;
  const applyPlaceholder = () => {
    input.placeholder = formatPlaceholder(phs[curPh]);
  };

  applyPlaceholder();
  setInterval(() => {
    curPh = (curPh + 1) % phs.length;
    applyPlaceholder();
  }, 2000);

  const onViewportChange = () => applyPlaceholder();
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', onViewportChange);
  else if (mqMobile.addListener) mqMobile.addListener(onViewportChange);
}

function setSearch(val) {
  const input = document.getElementById('home-search-input');
  if (input) {
    input.value = val;
    userProb = val; // Sync with global userProb
    setTimeout(() => goTo(2), 300);
  }
}

/* ── Hero headline rotator ── */
function initHeadlineRotator() {
  const slides = document.querySelectorAll('.h1-slide');
  if (!slides.length) return;
  let hCur = 0;
  setInterval(() => {
    const prev = hCur;
    hCur = (hCur + 1) % slides.length;
    // Slide out the current one upward
    slides[prev].classList.add('out');
    slides[prev].classList.remove('active');
    // After the out-transition, reset it so it can come back in later
    setTimeout(() => slides[prev].classList.remove('out'), 460);
    // Slide the next one in from below
    slides[hCur].classList.add('active');
  }, 3000);
}

/* ═══ INIT ═══ */
function initPremiumApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const startScreen = parseInt(urlParams.get('screen')) || 1;
  const hdrLbl = document.getElementById('hdr-lbl');
  
  // Initialize basic state
  renderQ(0);
  setBudget(700);
  initHeadlineRotator();
  initSearchPlaceholderRotator();
  
  // Global event listeners
  document.addEventListener('keydown', e => { 
    if (cur === 2 && e.key === 'Enter') sqNext(); 
    if (cur === 1 && e.key === 'Enter') {
      const si = document.getElementById('home-search-input');
      if (si && si.value) userProb = si.value;
      goTo(2);
    }
  });
  
  // Re-render orbit on resize so radius stays in sync with breakpoint
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (cur === 2) updateAvatarOrbit(qIdx); }, 200);
  });

  if (startScreen > 1 && startScreen <= 6) {
    // Force jump to specific screen
    cur = 1; // Reset to match initial hidden state logic
    goTo(startScreen);
  } else {
    updateNav(1);
    if (hdrLbl) hdrLbl.textContent = HDR[0];

    // First arrival on Home: auto-open auth modal on every refresh/load
    setTimeout(() => openAuth('login'), 250);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPremiumApp);
} else {
  initPremiumApp();
}


