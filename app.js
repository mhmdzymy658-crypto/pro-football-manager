// PRO FOOTBALL MANAGER
// Game Engine - Version 1.3 (Formations, tactics, captain, team strength)

let manager = JSON.parse(localStorage.getItem("proManager")) || {
    coins: 10000,
    club: null,
    level: 1
};

function saveGame() {
    localStorage.setItem("proManager", JSON.stringify(manager));
}

function updateWallet() {
    const el = document.querySelector(".wallet span");
    if (el) el.textContent = manager.coins.toLocaleString("en-US");
}

function buyClub() {
    if (manager.club) {
        showMessage("شما قبلاً باشگاه خریداری کرده‌اید!");
        return;
    }
    const price = 5000;
    if (manager.coins < price) {
        showMessage("سکه کافی برای خرید باشگاه ندارید!");
        return;
    }
    const name = prompt("نام باشگاه خود را وارد کنید:");
    if (!name || !name.trim()) return;
    manager.coins -= price;
    manager.club = name.trim();
    saveGame();
    updateWallet();
    updateClub();
    showMessage("تبریک! باشگاه شما با موفقیت خریداری شد 🏆");
}

function updateClub() {
    const title = document.querySelector(".club-info h2");
    const description = document.querySelector(".club-info p");
    const button = document.querySelector(".primary-btn");
    if (!title || !description || !button) return;
    if (manager.club) {
        title.textContent = manager.club;
        description.textContent = "باشگاه اختصاصی شما";
        button.textContent = "مدیریت باشگاه";
        button.onclick = () => openPage("club");
    }
}

function openPage(page) {
    if (page === "market") { openMarket(); return; }
    if (page === "shop") { openVipShop(); return; }
    if (page === "team") { openTeamPage(); return; }
    if (page === "club") { openClubManagement(); return; }
    if (page === "profile") { openUserProfile(); return; }
    if (page === "league") { openMatchPage(); return; }
    if (["training","stadium"].includes(page)) { openClubManagement(); openClubFeature(page); return; }
    const pages = {
        league: "مسابقات و لیگ‌ها به‌زودی فعال می‌شوند 🏆",
        clubchat: "چت اختصاصی کلوب به‌زودی فعال می‌شود 💬",
    };
    showMessage(pages[page] || "این بخش به‌زودی اضافه می‌شود!");
}


const CLUB_FEATURES = {
 training:{title:"مرکز تمرین",tag:"TRAINING CENTER",desc:"برای بازیکنان برنامه تمرینی بچین و روی پیشرفت فنی و بدنی آن‌ها تمرکز کن.",items:["تمرین حمله و تمام‌کنندگی","تمرین دفاع و جای‌گیری","سرعت و آمادگی جسمانی"],images:["training-1.jpg","training-2.jpg","training-3.jpg"]},
 analysis:{title:"آنالیز قبل از بازی",tag:"MATCH ANALYSIS",desc:"شرایط حریف را بررسی کن و با شناخت بهتر، برای مسابقه آماده شو.",items:["بررسی نقاط قوت و ضعف حریف","انتخاب سبک بازی مناسب","آماده‌سازی نقشه تاکتیکی"],images:["analysis-1.jpg","analysis-2.jpg","analysis-3.jpg"]},
 fans:{title:"هواداران باشگاه",tag:"FAN ZONE",desc:"حمایت هواداران، روحیه تیم و اعتبار باشگاه را دنبال کن.",items:["رضایت و وفاداری هواداران","جو و حمایت روز مسابقه","ارتباط باشگاه با هواداران"],images:["fans-1.jpg","fans-2.jpg","fans-3.jpg"]},
 stadium:{title:"ورزشگاه",tag:"STADIUM",desc:"خانه باشگاه را توسعه بده و امکانات روز مسابقه را ارتقا بده.",items:["ظرفیت و امکانات ورزشگاه","کیفیت زمین چمن","امکانات رفاهی تماشاگران"],images:["stadium-1.jpg","stadium-2.jpg","stadium-3.jpg"]},
 academy:{title:"آکادمی جوانان",tag:"YOUTH ACADEMY",desc:"استعدادهای جوان را پیدا کن و برای آینده باشگاه پرورش بده.",items:["استعدادیابی بازیکنان جوان","برنامه رشد و آموزش","ارتقای امکانات آکادمی"],images:["academy-1.jpg","academy-2.jpg","academy-3.jpg"]},
 medical:{title:"پزشکی و بدنسازی",tag:"MEDICAL & FITNESS",desc:"سلامت بازیکنان را زیر نظر بگیر و برای ریکاوری و آمادگی بدنی برنامه داشته باش.",items:["ارزیابی آمادگی جسمانی","ریکاوری و پیشگیری از آسیب","برنامه بدنسازی اختصاصی"],images:["medical-1.jpg","medical-2.jpg","medical-3.jpg"]}
};
function openClubManagement(){
 const page=document.getElementById("clubManagementPage"),home=document.getElementById("mainHome");
 if(!page)return;
 document.getElementById("marketPage")?.classList.remove("open");
 document.getElementById("teamPage")?.classList.remove("open");
 if(home)home.style.display="none";
 page.classList.add("open"); page.scrollTop=0;
 document.body.style.overflow="hidden"; document.documentElement.style.overflow="hidden";
 document.querySelectorAll(".bottom-nav button").forEach((b,i)=>b.classList.toggle("active",i===0));
}
function closeClubManagement(){
 document.getElementById("clubManagementPage")?.classList.remove("open");
 const home=document.getElementById("mainHome"); if(home)home.style.display="";
 document.body.style.overflow=""; document.documentElement.style.overflow="";
 document.querySelectorAll(".bottom-nav button").forEach((b,i)=>b.classList.toggle("active",i===0));
}
function openClubFeature(key){
 const f=CLUB_FEATURES[key]; if(!f)return;
 openClubManagement();
 const box=document.getElementById("clubFeatureDetail"); if(!box)return;
 box.hidden=false;
 const gallery=f.images.map((name,i)=>`<div data-fallback="${f.title} · تصویر ${i+1}"><img src="assets/club/${name}" alt="${f.title} ${i+1}" loading="lazy" decoding="async" onerror="this.parentElement.classList.add('image-missing');this.remove()"><span class="club-image-caption">تصویر ${i+1}</span></div>`).join("");
 const trainingPanel=key==="training"?`<div class="club-training-panel">
<div class="training-head">
  <span>TEAM TRAINING CENTER</span>
  <b>مرکز تمرین حرفه‌ای</b>
  <small>سرمربی انتخاب کن، بازیکنان رو در ترکیب/نیمکت بذار، بعد جلسه تمرین واقعی اجرا کن.</small>
</div>
<div class="training-info-row">
  <div><em>هزینه هر جلسه</em><b>۲۰۰ 🪙</b></div>
  <div><em>مدت جلسه</em><b>۸ ثانیه</b></div>
  <div><em>پیشرفت</em><b>+۱ تا +۲ ویژگی</b></div>
</div>
<div class="training-grid">
  <button type="button" class="train-btn train-attack" onclick="runTraining('attack')">
    <div class="train-icon">⚽</div>
    <div><b>تمرین هجومی</b><small>شوت · دریبل · خلق موقعیت</small></div>
    <span class="train-tag">ATTACK</span>
  </button>
  <button type="button" class="train-btn train-defense" onclick="runTraining('defense')">
    <div class="train-icon">🛡️</div>
    <div><b>تمرین دفاعی</b><small>دفاع · قدرت بدنی · جای‌گیری</small></div>
    <span class="train-tag">DEFENSE</span>
  </button>
  <button type="button" class="train-btn train-speed" onclick="runTraining('speed')">
    <div class="train-icon">⚡</div>
    <div><b>تمرین سرعت</b><small>سرعت · شتاب · دریبل</small></div>
    <span class="train-tag">PACE</span>
  </button>
  <button type="button" class="train-btn train-physical" onclick="runTraining('physical')">
    <div class="train-icon">💪</div>
    <div><b>تمرین قدرتی</b><small>قدرت · استقامت · نبرد هوایی</small></div>
    <span class="train-tag">PHY</span>
  </button>
</div>
<div class="training-progress-wrap" id="trainingProgressWrap" hidden>
  <div class="training-progress-bar"><i id="trainingProgressBar"></i></div>
  <div class="training-progress-label" id="trainingProgressLabel">جلسه در حال اجرا...</div>
</div>
<div id="trainingStatus" class="training-status">یک برنامه انتخاب کن تا تمرین تیم آغاز شود.</div>
<div id="trainingResultCards" class="training-result-cards"></div>
</div>`:"";
 box.innerHTML=`<div class="club-detail-head"><div><span>${f.tag}</span><h3>${f.title}</h3></div><button type="button" onclick="closeClubFeature()">بستن ×</button></div><p>${f.desc}</p><div class="club-detail-gallery">${gallery}</div>${trainingPanel}<div class="club-detail-list">${f.items.map((item,i)=>`<div><span>${String(i+1).padStart(2,"0")}</span><b>${item}</b><em>امکانات باشگاه</em></div>`).join("")}</div>`;
 box.scrollIntoView({behavior:"smooth",block:"start"});
}
function closeClubFeature(){const box=document.getElementById("clubFeatureDetail");if(box){box.hidden=true;box.innerHTML="";}}

function openTeamPage() {
    const page = document.getElementById("teamPage");
    const home = document.getElementById("mainHome");
    if (!page) return;
    page.classList.add("open");
    if (home) home.style.display = "none";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.querySelectorAll(".bottom-nav button").forEach((btn, i) => {
        btn.classList.toggle("active", i === 0);
    });
    page.scrollTop = 0;
    renderAllSlots();
    renderBench();
    bindSlotClicks();
}

function closeTeamPage() {
    const page = document.getElementById("teamPage");
    const home = document.getElementById("mainHome");
    if (page) page.classList.remove("open");
    if (home) home.style.display = "";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.querySelectorAll(".bottom-nav button").forEach((btn, i) => {
        btn.classList.toggle("active", i === 0);
    });
    closePlayerPicker();
}

/* =====================================================
   FORMATION / SQUAD BUILDER
   ===================================================== */

const POS_COMPAT = {
    GK: ["GK"],
    CB: ["CB", "LB", "RB", "CDM"],
    LB: ["LB", "CB", "RB"],
    RB: ["RB", "CB", "LB"],
    CDM: ["CDM", "CM"],
    CM: ["CM", "CDM", "CAM"],
    CAM: ["CAM", "CM", "RW", "LW"],
    LW: ["LW", "RW", "ST", "CAM"],
    RW: ["RW", "LW", "ST", "CAM"],
    ST: ["ST", "LW", "RW", "CAM"]
};

/* ---------- Formations: slot ids stay stable so saved lineups keep working ---------- */
const DEF_LINE = [
    { id: "lb",  pos: "LB", x: 12, y: 68, line: "def", label: "مدافع چپ" },
    { id: "cb1", pos: "CB", x: 35, y: 72, line: "def", label: "مدافع وسط" },
    { id: "cb2", pos: "CB", x: 65, y: 72, line: "def", label: "مدافع وسط" },
    { id: "rb",  pos: "RB", x: 88, y: 68, line: "def", label: "مدافع راست" },
    { id: "gk",  pos: "GK", x: 50, y: 86, line: "gk",  label: "دروازه‌بان" }
];

const FORMATIONS = {
    "433": {
        label: "4-3-3",
        slots: [
            { id: "st",  pos: "ST",  x: 50, y: 12, line: "att", label: "مهاجم" },
            { id: "lw",  pos: "LW",  x: 18, y: 22, line: "att", label: "وینگر چپ" },
            { id: "rw",  pos: "RW",  x: 82, y: 22, line: "att", label: "وینگر راست" },
            { id: "cam", pos: "CAM", x: 50, y: 38, line: "mid", label: "هافبک تهاجمی" },
            { id: "cm1", pos: "CM",  x: 28, y: 48, line: "mid", label: "هافبک" },
            { id: "cm2", pos: "CM",  x: 72, y: 48, line: "mid", label: "هافبک" },
            ...DEF_LINE
        ]
    },
    "442": {
        label: "4-4-2",
        slots: [
            { id: "st",  pos: "ST", x: 36, y: 12, line: "att", label: "مهاجم" },
            { id: "st2", pos: "ST", x: 64, y: 12, line: "att", label: "مهاجم" },
            { id: "lw",  pos: "LW", x: 12, y: 38, line: "mid", label: "هافبک چپ" },
            { id: "cm1", pos: "CM", x: 38, y: 46, line: "mid", label: "هافبک" },
            { id: "cm2", pos: "CM", x: 62, y: 46, line: "mid", label: "هافبک" },
            { id: "rw",  pos: "RW", x: 88, y: 38, line: "mid", label: "هافبک راست" },
            ...DEF_LINE
        ]
    },
    "4231": {
        label: "4-2-3-1",
        slots: [
            { id: "st",  pos: "ST",  x: 50, y: 12, line: "att", label: "مهاجم" },
            { id: "lw",  pos: "LW",  x: 16, y: 28, line: "att", label: "وینگر چپ" },
            { id: "rw",  pos: "RW",  x: 84, y: 28, line: "att", label: "وینگر راست" },
            { id: "cam", pos: "CAM", x: 50, y: 31, line: "mid", label: "هافبک تهاجمی" },
            { id: "cm1", pos: "CDM", x: 36, y: 52, line: "mid", label: "هافبک دفاعی" },
            { id: "cm2", pos: "CDM", x: 64, y: 52, line: "mid", label: "هافبک دفاعی" },
            ...DEF_LINE
        ]
    }
};

const TACTICS = {
    attack:   { label: "هجومی",  icon: "⚔️", mult: { att: 1.05, mid: 1,    def: 0.95, gk: 1 },    desc: "فشار بالا: حمله +۵٪ ، دفاع −۵٪" },
    balanced: { label: "متعادل", icon: "⚖️", mult: { att: 1,    mid: 1,    def: 1,    gk: 1 },    desc: "توازن کامل بین خطوط" },
    defense:  { label: "دفاعی",  icon: "🛡️", mult: { att: 0.95, mid: 1,    def: 1.05, gk: 1.03 }, desc: "بلوک دفاعی: دفاع +۵٪ ، حمله −۵٪" }
};

const LINE_META = {
    att: { label: "حمله",       icon: "⚔️" },
    mid: { label: "خط میانی",   icon: "🎯" },
    def: { label: "دفاع",       icon: "🛡️" },
    gk:  { label: "دروازه‌بان", icon: "🧤" }
};

const CAPTAIN_BONUS = 2;

function loadStr(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? v : fallback;
    } catch (e) { return fallback; }
}
function saveStr(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

let formation = {};
try { formation = JSON.parse(localStorage.getItem("proFormation")) || {}; } catch (e) { formation = {}; }
if (typeof formation !== "object" || Array.isArray(formation)) formation = {};

let currentFormation = loadStr("proFormationType", "433");
if (!FORMATIONS[currentFormation]) currentFormation = "433";
let currentTactic = loadStr("proTactic", "balanced");
if (!TACTICS[currentTactic]) currentTactic = "balanced";
let captainId = loadStr("proCaptain", "") || null;

let activeSlotId = null;
let pickerMode = null; // "slot" | "captain" | "bench" | "benchSwap"
let activeBenchIndex = null;
let bench = [];
try {
    const savedBench = JSON.parse(localStorage.getItem("proBench") || "[]");
    bench = Array.isArray(savedBench) ? savedBench.slice(0, 7) : [];
} catch (e) { bench = []; }
while (bench.length < 7) bench.push(null);

function currentDef() { return FORMATIONS[currentFormation]; }
function getSlotDef(slotId) { return currentDef().slots.find(s => s.id === slotId) || null; }
function getPlayer(id) { return id ? PLAYERS.find(p => p.id === id) || null : null; }

function saveFormation() {
    const inLineup = Object.values(formation).filter(Boolean);
    if (captainId && !inLineup.includes(captainId)) captainId = null;
    localStorage.setItem("proFormation", JSON.stringify(formation));
    saveStr("proFormationType", currentFormation);
    saveStr("proTactic", currentTactic);
    saveStr("proCaptain", captainId || "");
    saveStr("proBench", JSON.stringify(bench));
}

/* remove stale / duplicate / unknown entries (runs once on start) */
function sanitizeTeamState() {
    const ids = new Set(currentDef().slots.map(s => s.id));
    const seen = new Set();
    let changed = false;
    Object.keys(formation).forEach(sid => {
        const pid = formation[sid];
        if (!ids.has(sid) || !getPlayer(pid) || seen.has(pid)) {
            delete formation[sid];
            changed = true;
        } else {
            seen.add(pid);
        }
    });
    if (captainId && !seen.has(captainId)) { captainId = null; changed = true; }

    // Keep the seven reserve places unique and separate from the starting XI.
    const benchSeen = new Set(seen);
    bench = Array.isArray(bench) ? bench.slice(0, 7) : [];
    while (bench.length < 7) bench.push(null);
    bench = bench.map(pid => {
        if (!pid || !getPlayer(pid) || benchSeen.has(pid)) {
            if (pid) changed = true;
            return null;
        }
        benchSeen.add(pid);
        return pid;
    });
    if (changed) saveFormation();
    else saveStr("proBench", JSON.stringify(bench));
}

/* fit: 1 = natural position, lower = alternative position, 0 = not allowed */
function fitFor(player, slotDef) {
    if (!player || !slotDef) return 0;
    const list = POS_COMPAT[slotDef.pos] || [slotDef.pos];
    const idx = list.indexOf(player.pos);
    if (idx < 0) return 0;
    return Math.max(0.8, 1 - 0.04 * idx);
}

function getUsedPlayerIds(exceptSlot) {
    const used = new Set();
    Object.keys(formation).forEach(sid => {
        if (sid === exceptSlot) return;
        if (formation[sid]) used.add(formation[sid]);
    });
    bench.forEach(id => { if (id) used.add(id); });
    return used;
}

function getPlayersForPos(pos, exceptSlot) {
    const allowed = POS_COMPAT[pos] || [pos];
    const used = getUsedPlayerIds(exceptSlot);
    return PLAYERS
        .filter(p => allowed.includes(p.pos))
        .sort((a, b) => {
            const au = used.has(a.id) ? 1 : 0;
            const bu = used.has(b.id) ? 1 : 0;
            if (au !== bu) return au - bu;
            return b.ovr - a.ovr;
        });
}

function shortName(nameFa) {
    if (!nameFa) return "";
    const parts = nameFa.trim().split(/\s+/);
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
}

/* ---------- Pitch slots ---------- */
function syncPitchSlots() {
    const pitch = document.querySelector(".pitch");
    if (!pitch) return;
    const def = currentDef();
    const ids = new Set(def.slots.map(s => s.id));
    pitch.querySelectorAll(".pos-slot").forEach(el => {
        if (!ids.has(el.dataset.slot)) el.remove();
    });
    def.slots.forEach(s => {
        let el = pitch.querySelector(`.pos-slot[data-slot="${s.id}"]`);
        if (!el) {
            el = document.createElement("div");
            el.className = "pos-slot";
            el.dataset.slot = s.id;
            pitch.appendChild(el);
        }
        el.dataset.pos = s.pos;
        el.style.setProperty("--x", s.x + "%");
        el.style.setProperty("--y", s.y + "%");
    });
}

function renderSlot(slotEl) {
    const slotId = slotEl.dataset.slot;
    const sd = getSlotDef(slotId);
    const pos = sd ? sd.pos : slotEl.dataset.pos;
    const label = sd ? sd.label : pos;
    const player = getPlayer(formation[slotId]);

    slotEl.className = "pos-slot";
    if (player) {
        const f = fitFor(player, sd);
        slotEl.classList.add("filled", "r-" + (player.rarity || "gold"));
        if (f < 1) slotEl.classList.add("off-pos");
        if (captainId === player.id) slotEl.classList.add("is-captain");
        const ini = playerInitials(player);
        slotEl.innerHTML = `
            <div class="slot-inner">
                <div class="slot-avatar avatar-${player.rarity||'gold'}">${ini}</div>
                <img class="slot-photo" src="${player.img}" alt="${player.nameFa}"
                     onerror="this.remove()" onload="this.previousElementSibling.style.display='none';this.style.display='block'">
                <span class="slot-ovr">${player.ovr}</span>
            </div>
            ${captainId === player.id ? '<span class="slot-cap">C</span>' : ""}
            ${f < 1 ? '<span class="slot-warn">!</span>' : ""}
            <span class="slot-name">${shortName(player.nameFa)}</span>
        `;
    } else {
        slotEl.classList.add("empty");
        slotEl.innerHTML = `
            <div class="slot-inner">
                <span class="slot-pos">${pos}</span>
                <span class="slot-label">${label}</span>
            </div>
        `;
    }
}

function renderAllSlots() {
    syncPitchSlots();
    document.querySelectorAll(".pos-slot").forEach(renderSlot);
    bindSlotClicks();
    renderControls();
    renderSquadPanel();
    renderBench();
}

/* ---------- Seven-player substitute bench ---------- */
function saveBench() {
    saveStr("proBench", JSON.stringify(bench));
}

function renderBench() {
    const grid = document.getElementById("benchGrid");
    const count = document.getElementById("benchCount");
    if (!grid) return;

    const filled = bench.filter(Boolean).length;
    if (count) count.textContent = `${filled} / 7`;
    grid.innerHTML = bench.map((pid, index) => {
        const p = getPlayer(pid);
        if (!p) {
            return `
                <button type="button" class="bench-empty" onclick="openBenchPicker(${index})">
                    <span class="bench-plus">+</span>
                    <b>ذخیره ${index + 1}</b>
                    <small>افزودن بازیکن</small>
                </button>`;
        }
        return `
            <article class="bench-card r-${p.rarity || "gold"}">
                <button type="button" class="bench-player" onclick="openBenchPicker(${index})" aria-label="تغییر ${p.nameFa}">
                    <img src="${p.img}" alt="${p.nameFa}" onerror="this.style.opacity=.25">
                    <span class="bench-player-info">
                        <b>${p.nameFa}</b>
                        <small>${p.pos} · ${p.club}</small>
                    </span>
                    <strong>${p.ovr}</strong>
                </button>
                <div class="bench-actions">
                    <button type="button" onclick="openBenchSwap(${index})">تعویض با ترکیب</button>
                    <button type="button" class="bench-remove" onclick="removeBenchPlayer(${index})" aria-label="حذف از نیمکت">×</button>
                </div>
            </article>`;
    }).join("");
}

function openBenchPicker(index) {
    activeBenchIndex = index;
    activeSlotId = null;
    pickerMode = "bench";
    const picker = document.getElementById("playerPicker");
    const title = document.getElementById("pickerTitle");
    const sub = document.getElementById("pickerSub");
    const actions = document.getElementById("pickerActions");
    const list = document.getElementById("pickerList");
    if (!picker || !list) return;

    if (title) title.textContent = `انتخاب ذخیره ${index + 1}`;
    if (sub) sub.textContent = "بازیکنی را برای نیمکت انتخاب کن";
    if (actions) actions.hidden = true;

    const used = new Set(Object.values(formation).filter(Boolean));
    bench.forEach((id, i) => { if (id && i !== index) used.add(id); });
    list.innerHTML = PLAYERS.slice().sort((a,b) => b.ovr-a.ovr).map(p => {
        const disabled = used.has(p.id);
        const current = bench[index] === p.id;
        return `
            <div class="picker-item r-${p.rarity || "gold"}${disabled && !current ? " disabled" : ""}"
                 onclick="selectBenchPlayer('${p.id}')">
                <img class="picker-item-photo" src="${p.img}" alt="" onerror="this.style.opacity=.3">
                <div class="picker-item-info">
                    <div class="picker-item-name">${p.nameFa}</div>
                    <div class="picker-item-meta">${p.flag || ""} ${p.pos} · ${p.club}</div>
                    ${current ? '<div class="picker-item-used">ذخیره فعلی</div>' : ""}
                    ${disabled && !current ? '<div class="picker-item-used">در ترکیب یا نیمکت است</div>' : ""}
                </div>
                <div class="picker-item-ovr"><b>${p.ovr}</b><span>OVR</span></div>
            </div>`;
    }).join("");
    picker.classList.add("open");
}

function selectBenchPlayer(playerId) {
    if (pickerMode !== "bench" || activeBenchIndex === null) return;
    const used = new Set(Object.values(formation).filter(Boolean));
    bench.forEach((id, i) => { if (id && i !== activeBenchIndex) used.add(id); });
    if (used.has(playerId)) {
        showMessage("این بازیکن در ترکیب یا نیمکت حضور دارد!");
        return;
    }
    bench[activeBenchIndex] = playerId;
    saveBench();
    closePlayerPicker();
    renderBench();
    showMessage(`${getPlayer(playerId)?.nameFa || "بازیکن"} به نیمکت اضافه شد`);
}

function openBenchSwap(index) {
    const reserve = getPlayer(bench[index]);
    if (!reserve) {
        showMessage("اول یک بازیکن برای این جایگاه ذخیره انتخاب کن");
        return;
    }
    activeBenchIndex = index;
    activeSlotId = null;
    pickerMode = "benchSwap";
    const picker = document.getElementById("playerPicker");
    const title = document.getElementById("pickerTitle");
    const sub = document.getElementById("pickerSub");
    const actions = document.getElementById("pickerActions");
    const list = document.getElementById("pickerList");
    if (!picker || !list) return;

    if (title) title.textContent = "تعویض بازیکن";
    if (sub) sub.textContent = `ورود ${reserve.nameFa} به ترکیب اصلی`;
    if (actions) actions.hidden = true;

    const starters = currentDef().slots
        .map(s => ({ slot: s, player: getPlayer(formation[s.id]) }))
        .filter(x => x.player);
    list.innerHTML = starters.length ? starters.map(({slot, player}) => `
        <div class="picker-item r-${player.rarity || "gold"}" onclick="swapBenchWithSlot('${slot.id}')">
            <img class="picker-item-photo" src="${player.img}" alt="" onerror="this.style.opacity=.3">
            <div class="picker-item-info">
                <div class="picker-item-name">${player.nameFa}</div>
                <div class="picker-item-meta">${slot.label} · ${player.pos} · ${player.club}</div>
            </div>
            <div class="picker-item-ovr"><b>${player.ovr}</b><span>OVR</span></div>
        </div>`).join("") : '<div class="picker-empty">ابتدا ترکیب اصلی را تکمیل کن</div>';
    picker.classList.add("open");
}

function swapBenchWithSlot(slotId) {
    if (pickerMode !== "benchSwap" || activeBenchIndex === null) return;
    const outgoingId = formation[slotId];
    const incomingId = bench[activeBenchIndex];
    if (!outgoingId || !incomingId) return;
    formation[slotId] = incomingId;
    bench[activeBenchIndex] = outgoingId;
    saveFormation();
    saveBench();
    closePlayerPicker();
    renderAllSlots();
    renderBench();
    showMessage("تعویض با موفقیت انجام شد");
}

function removeBenchPlayer(index) {
    if (!bench[index]) return;
    bench[index] = null;
    saveBench();
    renderBench();
    showMessage("بازیکن از نیمکت حذف شد");
}


/* ---------- Strength ---------- */
function computeStrength() {
    const def = currentDef();
    const tac = TACTICS[currentTactic];
    const sums = { att: 0, mid: 0, def: 0, gk: 0 };
    const counts = { att: 0, mid: 0, def: 0, gk: 0 };
    let filled = 0, fitSum = 0;

    def.slots.forEach(s => {
        counts[s.line]++;
        const p = getPlayer(formation[s.id]);
        if (!p) return;
        const f = fitFor(p, s);
        let eff = p.ovr * f;
        if (captainId === p.id) eff += CAPTAIN_BONUS;
        eff *= tac.mult[s.line];
        sums[s.line] += eff;
        filled++;
        fitSum += f;
    });

    const lines = {};
    let total = 0;
    Object.keys(sums).forEach(k => {
        total += sums[k];
        lines[k] = counts[k] ? Math.min(99, Math.round(sums[k] / counts[k])) : 0;
    });
    return {
        overall: Math.min(99, Math.round(total / def.slots.length)),
        lines,
        filled,
        total: def.slots.length,
        fit: filled ? Math.round((fitSum / filled) * 100) : null
    };
}

function tierClass(v) {
    if (v >= 85) return "t-elite";
    if (v >= 75) return "t-good";
    if (v >= 60) return "t-mid";
    return "t-low";
}

function renderControls() {
    document.querySelectorAll("#formationChips [data-formation]").forEach(b => {
        b.classList.toggle("active", b.dataset.formation === currentFormation);
    });
    document.querySelectorAll("#tacticChips [data-tactic]").forEach(b => {
        b.classList.toggle("active", b.dataset.tactic === currentTactic);
    });
    const label = document.querySelector(".team-formation-label");
    if (label) label.textContent = currentDef().label;
}

function renderSquadPanel() {
    const el = document.getElementById("squadPanel");
    if (!el) return;
    const st = computeStrength();
    const tac = TACTICS[currentTactic];
    const cap = getPlayer(captainId);

    const rows = ["att", "mid", "def", "gk"].map(k => {
        const v = st.lines[k];
        return `
        <div class="sp-line">
            <span class="sp-line-name">${LINE_META[k].icon} ${LINE_META[k].label}</span>
            <div class="sp-bar"><i class="${tierClass(v)}" style="width:${v}%"></i></div>
            <b class="sp-line-val">${v}</b>
        </div>`;
    }).join("");

    el.innerHTML = `
        <div class="sp-top">
            <div class="sp-ring ${tierClass(st.overall)}" style="--p:${st.overall}">
                <div class="sp-ring-in"><b>${st.overall}</b><span>قدرت تیم</span></div>
            </div>
            <div class="sp-meta">
                <div class="sp-meta-row"><span>تناسب پست</span><b>${st.fit === null ? "—" : st.fit + "٪"}</b></div>
                <div class="sp-meta-row"><span>بازیکنان</span><b>${st.filled}/${st.total}</b></div>
                <div class="sp-meta-row"><span>تاکتیک</span><b>${tac.icon} ${tac.label}</b></div>
                <div class="sp-note">${tac.desc}</div>
            </div>
        </div>
        <div class="sp-lines">${rows}</div>
        ${st.filled < st.total ? `<div class="sp-warn">${st.total - st.filled} جایگاه خالی است؛ قدرت تیم با تکمیل ترکیب بالا می‌رود.</div>` : ""}
        <button type="button" class="sp-captain${cap ? " has-cap" : ""}" onclick="openCaptainPicker()">
            ${cap
                ? `<img src="${cap.img}" alt="" onerror="this.style.opacity=.3">`
                : `<span class="sp-cap-ico">C</span>`}
            <span class="sp-cap-text">
                <small>کاپیتان تیم</small>
                <b>${cap ? cap.nameFa : "انتخاب کاپیتان"}</b>
            </span>
            <span class="sp-cap-bonus">${cap ? "+" + CAPTAIN_BONUS + " OVR" : "‹"}</span>
        </button>
    `;
}

/* ---------- Formation / tactic / captain actions ---------- */
function remapFormation(newKey) {
    const slots = FORMATIONS[newKey].slots;
    const slotById = id => slots.find(s => s.id === id);
    let pool = Object.keys(formation)
        .map(sid => ({ sid, p: getPlayer(formation[sid]) }))
        .filter(e => e.p);
    const map = {};
    const free = new Set(slots.map(s => s.id));
    const place = (entry, slot) => {
        map[slot.id] = entry.p.id;
        free.delete(slot.id);
        pool = pool.filter(e => e !== entry);
    };

    // 1) same slot, natural position
    [...pool].forEach(e => {
        const s = slotById(e.sid);
        if (s && free.has(s.id) && e.p.pos === s.pos) place(e, s);
    });
    // 2) any slot, natural position
    slots.forEach(s => {
        if (!free.has(s.id)) return;
        const e = pool.find(x => x.p.pos === s.pos);
        if (e) place(e, s);
    });
    // 3) same slot, alternative position
    [...pool].forEach(e => {
        const s = slotById(e.sid);
        if (s && free.has(s.id) && fitFor(e.p, s) > 0) place(e, s);
    });
    // 4) any slot, best alternative fit
    slots.forEach(s => {
        if (!free.has(s.id)) return;
        let best = null;
        pool.forEach(e => {
            const f = fitFor(e.p, s);
            if (f > 0 && (!best || f > best.f || (f === best.f && e.p.ovr > best.e.p.ovr))) best = { e, f };
        });
        if (best) place(best.e, s);
    });
    return { map, dropped: pool.map(e => e.p), empty: free.size };
}

function setFormation(key) {
    if (!FORMATIONS[key] || key === currentFormation) return;
    const hadPlayers = Object.keys(formation).length > 0;
    const res = remapFormation(key);
    currentFormation = key;
    formation = res.map;
    saveFormation();
    closePlayerPicker();
    renderAllSlots();

    const pitch = document.querySelector(".pitch");
    if (pitch && hadPlayers && res.empty > 0) {
        pitch.classList.add("flag-empty");
        clearTimeout(window.flagEmptyTimer);
        window.flagEmptyTimer = setTimeout(() => pitch.classList.remove("flag-empty"), 4000);
    }
    if (res.dropped.length) {
        showMessage(`آرایش ${FORMATIONS[key].label} اعمال شد؛ ${res.dropped.length} بازیکن پست مناسب نداشت و جایگاه خالی ماند`);
    } else {
        showMessage(`آرایش ${FORMATIONS[key].label} اعمال شد`);
    }
}

function setTactic(key) {
    if (!TACTICS[key] || key === currentTactic) return;
    currentTactic = key;
    saveFormation();
    renderControls();
    renderSquadPanel();
}

function openCaptainPicker() {
    const picker = document.getElementById("playerPicker");
    const title = document.getElementById("pickerTitle");
    const sub = document.getElementById("pickerSub");
    const actions = document.getElementById("pickerActions");
    const list = document.getElementById("pickerList");
    if (!picker || !list) return;

    pickerMode = "captain";
    activeSlotId = null;
    if (title) title.textContent = "انتخاب کاپیتان";
    if (sub) sub.textContent = `از بین بازیکنان ترکیب اصلی · +${CAPTAIN_BONUS} OVR`;
    if (actions) actions.hidden = true;

    const starters = currentDef().slots
        .map(s => ({ s, p: getPlayer(formation[s.id]) }))
        .filter(x => x.p)
        .sort((a, b) => b.p.ovr - a.p.ovr);

    if (!starters.length) {
        list.innerHTML = `<div class="picker-empty">ابتدا بازیکنانی را در ترکیب قرار بده</div>`;
    } else {
        list.innerHTML = starters.map(({ s, p }) => {
            const isCap = captainId === p.id;
            return `
            <div class="picker-item r-${p.rarity || "gold"}" onclick="setCaptain('${p.id}')">
                <img class="picker-item-photo" src="${p.img}" alt="" onerror="this.style.opacity=.3">
                <div class="picker-item-info">
                    <div class="picker-item-name">${p.nameFa}</div>
                    <div class="picker-item-meta">${p.flag || ""} ${s.pos} · ${p.club}</div>
                    ${isCap ? '<div class="picker-item-used">کاپیتان فعلی (برای برداشتن دوباره بزن)</div>' : ""}
                </div>
                <div class="picker-item-ovr"><b>${p.ovr}</b><span>OVR</span></div>
            </div>`;
        }).join("");
    }
    picker.classList.add("open");
}

function setCaptain(playerId) {
    if (pickerMode !== "captain") return;
    if (captainId === playerId) {
        captainId = null;
        showMessage("کاپیتان برداشته شد");
    } else {
        captainId = playerId;
        const p = getPlayer(playerId);
        if (p) showMessage(`${p.nameFa} کاپیتان تیم شد`);
    }
    saveFormation();
    closePlayerPicker();
    renderAllSlots();
}

/* ---------- Slot picker ---------- */
function openSlotPicker(slotId) {
    const slotEl = document.querySelector(`.pos-slot[data-slot="${slotId}"]`);
    if (!slotEl) return;
    const sd = getSlotDef(slotId);
    activeSlotId = slotId;
    pickerMode = "slot";
    const pos = sd ? sd.pos : slotEl.dataset.pos;
    const currentId = formation[slotId] || null;

    const title = document.getElementById("pickerTitle");
    const sub = document.getElementById("pickerSub");
    const actions = document.getElementById("pickerActions");
    const list = document.getElementById("pickerList");
    const picker = document.getElementById("playerPicker");

    if (title) title.textContent = `انتخاب ${sd ? sd.label : pos}`;
    if (sub) sub.textContent = `پست ${pos} · بازیکنان مناسب`;

    if (actions) actions.hidden = !currentId;

    const candidates = getPlayersForPos(pos, slotId);
    const used = getUsedPlayerIds(slotId);

    if (!list) return;
    if (candidates.length === 0) {
        list.innerHTML = `<div class="picker-empty">بازیکن مناسبی برای این پست نیست</div>`;
    } else {
        list.innerHTML = candidates.map(p => {
            const isUsed = used.has(p.id);
            const isCurrent = currentId === p.id;
            const disabled = isUsed && !isCurrent;
            const f = fitFor(p, sd);
            return `
            <div class="picker-item r-${p.rarity || "gold"}${disabled ? " disabled" : ""}"
                 data-player-id="${p.id}"
                 onclick="selectPlayerForSlot('${p.id}')">
                <img class="picker-item-photo" src="${p.img}" alt=""
                     onerror="this.style.opacity=.3">
                <div class="picker-item-info">
                    <div class="picker-item-name">${p.nameFa}</div>
                    <div class="picker-item-meta">${p.flag || ""} ${p.pos} · ${p.club}</div>
                    ${isUsed && !isCurrent ? '<div class="picker-item-used">در ترکیب است</div>' : ""}
                    ${isCurrent ? '<div class="picker-item-used">انتخاب فعلی</div>' : ""}
                    ${f < 1 ? `<div class="picker-item-fit">پست فرعی · تناسب ${Math.round(f * 100)}٪</div>` : ""}
                </div>
                <div class="picker-item-ovr">
                    <b>${p.ovr}</b>
                    <span>OVR</span>
                </div>
            </div>`;
        }).join("");
    }

    if (picker) picker.classList.add("open");
}

function closePlayerPicker(e) {
    if (e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
    const picker = document.getElementById("playerPicker");
    if (picker) picker.classList.remove("open");
    activeSlotId = null;
    activeBenchIndex = null;
    pickerMode = null;
}

function selectPlayerForSlot(playerId) {
    if (!activeSlotId) return;
    const used = getUsedPlayerIds(activeSlotId);
    if (used.has(playerId) && formation[activeSlotId] !== playerId) {
        showMessage("این بازیکن قبلاً در ترکیب است!");
        return;
    }
    formation[activeSlotId] = playerId;
    saveFormation();
    renderAllSlots();
    closePlayerPicker();
    const p = getPlayer(playerId);
    if (p) showMessage(`${p.nameFa} در ترکیب قرار گرفت`);
}

function removePlayerFromSlot() {
    if (!activeSlotId) return;
    const pid = formation[activeSlotId];
    delete formation[activeSlotId];
    saveFormation();
    renderAllSlots();
    closePlayerPicker();
    const p = getPlayer(pid);
    showMessage(p ? `${p.nameFa} از ترکیب حذف شد` : "بازیکن حذف شد");
}

function bindSlotClicks() {
    document.querySelectorAll(".pos-slot").forEach(slot => {
        slot.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSlotPicker(slot.dataset.slot);
        };
    });
}


function showMessage(message) {
    let toast = document.getElementById("game-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "game-toast";
        Object.assign(toast.style, {
            position: "fixed",
            top: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#263b42",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "14px",
            zIndex: "9999",
            width: "85%",
            maxWidth: "350px",
            textAlign: "center",
            fontSize: "13px",
            boxShadow: "0 8px 30px #0008"
        });
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = "block";
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

/* =====================================================
   PLAYER DATABASE (based on real files in assets/players)
   ===================================================== */
const PLAYERS = [
    {
        id: "messi",
        name: "Lionel Messi",
        nameFa: "لیونل مسی",
        pos: "RW",
        nation: "آرژانتین",
        flag: "🇦🇷",
        club: "Inter Miami",
        ovr: 93,
        pac: 80, sho: 89, pas: 91, dri: 94, def: 35, phy: 65,
        rarity: "mythic",
        special: true,
        img: "assets/players/messi.png"
    },
    {
        id: "ronaldo",
        name: "Cristiano Ronaldo",
        nameFa: "کریستیانو رونالدو",
        pos: "ST",
        nation: "پرتغال",
        flag: "🇵🇹",
        club: "Al Nassr",
        ovr: 91,
        pac: 81, sho: 92, pas: 78, dri: 85, def: 35, phy: 77,
        rarity: "mythic",
        special: true,
        img: "assets/players/ronaldo.png"
    },
    {
        id: "mbappe",
        name: "Kylian Mbappé",
        nameFa: "کیلیان امباپه",
        pos: "ST",
        nation: "فرانسه",
        flag: "🇫🇷",
        club: "Real Madrid",
        ovr: 92,
        pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78,
        rarity: "legendary",
        special: true,
        img: "assets/players/mbappe.png"
    },
    {
        id: "haaland",
        name: "Erling Haaland",
        nameFa: "ارلینگ هالند",
        pos: "ST",
        nation: "نروژ",
        flag: "🇳🇴",
        club: "Manchester City",
        ovr: 91,
        pac: 89, sho: 94, pas: 65, dri: 80, def: 45, phy: 88,
        rarity: "legendary",
        special: true,
        img: "assets/players/haaland.png"
    },
    {
        id: "vinicius",
        name: "Vinícius Júnior",
        nameFa: "وینیسیوس جونیور",
        pos: "LW",
        nation: "برزیل",
        flag: "🇧🇷",
        club: "Real Madrid",
        ovr: 90,
        pac: 95, sho: 83, pas: 80, dri: 90, def: 29, phy: 68,
        rarity: "diamond",
        special: true,
        img: "assets/players/vinicius.png"
    },
    {
        id: "bellingham",
        name: "Jude Bellingham",
        nameFa: "جود بلینگام",
        pos: "CM",
        nation: "انگلستان",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        club: "Real Madrid",
        ovr: 90,
        pac: 80, sho: 84, pas: 83, dri: 86, def: 78, phy: 83,
        rarity: "diamond",
        special: false,
        img: "assets/players/bellingham.png"
    },
    {
        id: "debruyne",
        name: "Kevin De Bruyne",
        nameFa: "کوین دی‌بروینه",
        pos: "CAM",
        nation: "بلژیک",
        flag: "🇧🇪",
        club: "Manchester City",
        ovr: 90,
        pac: 72, sho: 86, pas: 93, dri: 86, def: 62, phy: 76,
        rarity: "diamond",
        special: false,
        img: "assets/players/debruyne.png"
    },
    {
        id: "salah",
        name: "Mohamed Salah",
        nameFa: "محمد صلاح",
        pos: "RW",
        nation: "مصر",
        flag: "🇪🇬",
        club: "Liverpool",
        ovr: 89,
        pac: 90, sho: 87, pas: 81, dri: 87, def: 45, phy: 75,
        rarity: "gold",
        special: false,
        img: "assets/players/salah.png"
    },
    {
        id: "neymar",
        name: "Neymar Jr",
        nameFa: "نیمار جونیور",
        pos: "LW",
        nation: "برزیل",
        flag: "🇧🇷",
        club: "Al Hilal",
        ovr: 89,
        pac: 86, sho: 83, pas: 85, dri: 93, def: 37, phy: 61,
        rarity: "gold",
        special: false,
        img: "assets/players/neymar.png"
    },
    {
        id: "lewandowski",
        name: "Robert Lewandowski",
        nameFa: "روبرت لواندوفسکی",
        pos: "ST",
        nation: "لهستان",
        flag: "🇵🇱",
        club: "Barcelona",
        ovr: 89,
        pac: 75, sho: 91, pas: 79, dri: 85, def: 43, phy: 83,
        rarity: "gold",
        special: false,
        img: "assets/players/lewandowski.png"
    },
    {
        id: "kane",
        name: "Harry Kane",
        nameFa: "هری کین",
        pos: "ST",
        nation: "انگلستان",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        club: "Bayern Munich",
        ovr: 89,
        pac: 68, sho: 92, pas: 84, dri: 82, def: 47, phy: 82,
        rarity: "gold",
        special: false,
        img: "assets/players/kane.png"
    },
    {
        id: "van-dijk",
        name: "Virgil van Dijk",
        nameFa: "ویرجیل فن‌دایک",
        pos: "CB",
        nation: "هلند",
        flag: "🇳🇱",
        club: "Liverpool",
        ovr: 89,
        pac: 75, sho: 60, pas: 71, dri: 71, def: 90, phy: 86,
        rarity: "gold",
        special: false,
        img: "assets/players/van-dijk.png"
    },
    {
        id: "rodri",
        name: "Rodri",
        nameFa: "رودری",
        pos: "CDM",
        nation: "اسپانیا",
        flag: "🇪🇸",
        club: "Manchester City",
        ovr: 90,
        pac: 62, sho: 76, pas: 84, dri: 80, def: 87, phy: 85,
        rarity: "diamond",
        special: false,
        img: "assets/players/rodri.png"
    },
    {
        id: "modric",
        name: "Luka Modrić",
        nameFa: "لوکا مودریچ",
        pos: "CM",
        nation: "کرواسی",
        flag: "🇭🇷",
        club: "Real Madrid",
        ovr: 87,
        pac: 72, sho: 76, pas: 89, dri: 88, def: 71, phy: 65,
        rarity: "gold",
        special: false,
        img: "assets/players/modric.png"
    },
    {
        id: "kroos",
        name: "Toni Kroos",
        nameFa: "تونی کروس",
        pos: "CM",
        nation: "آلمان",
        flag: "🇩🇪",
        club: "Real Madrid",
        ovr: 86,
        pac: 53, sho: 81, pas: 90, dri: 81, def: 71, phy: 68,
        rarity: "gold",
        special: false,
        img: "assets/players/kroos.png"
    },
    {
        id: "benzema",
        name: "Karim Benzema",
        nameFa: "کریم بنزما",
        pos: "ST",
        nation: "فرانسه",
        flag: "🇫🇷",
        club: "Al Ittihad",
        ovr: 86,
        pac: 76, sho: 86, pas: 81, dri: 86, def: 39, phy: 76,
        rarity: "gold",
        special: false,
        img: "assets/players/benzema.png"
    },
    {
        id: "foden",
        name: "Phil Foden",
        nameFa: "فیل فودن",
        pos: "CAM",
        nation: "انگلستان",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        club: "Manchester City",
        ovr: 87,
        pac: 84, sho: 82, pas: 83, dri: 88, def: 54, phy: 64,
        rarity: "gold",
        special: false,
        img: "assets/players/foden.png"
    },
    {
        id: "saka",
        name: "Bukayo Saka",
        nameFa: "بوکایو ساکا",
        pos: "RW",
        nation: "انگلستان",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        club: "Arsenal",
        ovr: 87,
        pac: 85, sho: 82, pas: 82, dri: 86, def: 55, phy: 68,
        rarity: "gold",
        special: false,
        img: "assets/players/saka.png"
    },
    {
        id: "yamal",
        name: "Lamine Yamal",
        nameFa: "لامین یامال",
        pos: "RW",
        nation: "اسپانیا",
        flag: "🇪🇸",
        club: "Barcelona",
        ovr: 86,
        pac: 88, sho: 78, pas: 81, dri: 88, def: 32, phy: 58,
        rarity: "gold",
        special: true,
        img: "assets/players/yamal.png"
    },
    {
        id: "alisson",
        name: "Alisson Becker",
        nameFa: "آلیسون بکر",
        pos: "GK",
        nation: "برزیل",
        flag: "🇧🇷",
        club: "Liverpool",
        ovr: 89,
        pac: 84, sho: 85, pas: 85, dri: 86, def: 52, phy: 86,
        rarity: "gold",
        special: false,
        img: "assets/players/alisson.png"
    },
    {
        id: "courtois",
        name: "Thibaut Courtois",
        nameFa: "تیبو کورتوا",
        pos: "GK",
        nation: "بلژیک",
        flag: "🇧🇪",
        club: "Real Madrid",
        ovr: 89,
        pac: 80, sho: 85, pas: 76, dri: 84, def: 48, phy: 85,
        rarity: "gold",
        special: false,
        img: "assets/players/courtois.png"
    },
    {
        id: "ederson",
        name: "Ederson",
        nameFa: "ادرسون",
        pos: "GK",
        nation: "برزیل",
        flag: "🇧🇷",
        club: "Manchester City",
        ovr: 88,
        pac: 86, sho: 82, pas: 91, dri: 86, def: 55, phy: 84,
        rarity: "gold",
        special: false,
        img: "assets/players/ederson.png"
    },
    {
        id: "ter-stegen",
        name: "Marc-André ter Stegen",
        nameFa: "مارک آندره ترشتگن",
        pos: "GK",
        nation: "آلمان",
        flag: "🇩🇪",
        club: "Barcelona",
        ovr: 88,
        pac: 82, sho: 85, pas: 88, dri: 87, def: 45, phy: 82,
        rarity: "gold",
        special: false,
        img: "assets/players/ter-stegen.png"
    },
    {
        id: "donnarumma",
        name: "Gianluigi Donnarumma",
        nameFa: "جانلوئیجی دوناروما",
        pos: "GK",
        nation: "ایتالیا",
        flag: "🇮🇹",
        club: "PSG",
        ovr: 88,
        pac: 85, sho: 82, pas: 72, dri: 84, def: 48, phy: 86,
        rarity: "gold",
        special: false,
        img: "assets/players/donnarumma.png"
    }
];


// Restore saved training progress without changing the original player database.
manager.playerTraining = manager.playerTraining || {};
PLAYERS.forEach(p => {
  const saved = manager.playerTraining[p.id];
  if (saved) ["pac","sho","pas","dri","def","phy","ovr"].forEach(k => {
    if (Number.isFinite(saved[k])) p[k] = Math.max(0, Math.min(99, saved[k]));
  });
});

/* ===== TRANSFER MARKET ===== */
manager.ownedPlayers = Array.isArray(manager.ownedPlayers) ? manager.ownedPlayers : [];
manager.ownedCoaches = Array.isArray(manager.ownedCoaches) ? manager.ownedCoaches : [];
// Keep every player already placed in the user's lineup/bench as owned.
[...Object.values(formation), ...bench].filter(Boolean).forEach(id => {
  if (!manager.ownedPlayers.includes(id)) manager.ownedPlayers.push(id);
});
if (manager.coach && !manager.ownedCoaches.includes(manager.coach)) manager.ownedCoaches.push(manager.coach);
saveGame();
let marketTab = 'buy';
function playerPrice(p) {
  const rarityBonus = {bronze:0,silver:250,gold:900,diamond:2200,legendary:4500,mythic:8000};
  return Math.max(500, Math.round((1000 + (Math.max(55,p.ovr) - 60) * 220 + (rarityBonus[p.rarity] || 0)) / 50) * 50);
}
function coachPrice(id) { return ({pep:4200,mourinho:3900,klopp:4000,ancelotti:3800,zidane:5000})[id] || 3000; }
function marketCoachSpeech() {
  const c = typeof COACHES !== 'undefined' && manager.coach ? COACHES[manager.coach] : null;
  const img = document.getElementById('marketCoachImage');
  if (img) { img.src = c ? `assets/coaches/${c.file}` : 'assets/coaches/pep.png'; img.style.display=''; }
  const name = document.getElementById('marketCoachName');
  const quote = document.getElementById('marketCoachQuote');
  if (name) name.textContent = c ? c.name : 'مدیر نقل‌وانتقالات';
  const lines = {
    buy: c ? c.quote : 'برای ساختن یک تیم قهرمان، باید هوشمندانه خرید کنیم!',
    sell: 'بازیکنی را که در برنامه‌های تاکتیکی ما نیست، با قیمت مناسب به فروش برسان.',
    coaches: 'یک مربی بزرگ می‌تواند شخصیت و سبک بازی باشگاه را تغییر دهد.',
    search: 'اسم بازیکن موردنظرت را جستجو کن؛ شاید ستاره بعدی تیم ما باشد!'
  };
  if (quote) quote.textContent = lines[marketTab];
}
function openMarket() {
  const page=document.getElementById('marketPage'); if(!page)return;
  document.getElementById('mainHome').style.display='none';
  document.getElementById('teamPage')?.classList.remove('open');
  document.getElementById('vipShopPage')?.classList.remove('open');
  document.getElementById('userProfilePage')?.classList.remove('open');
  page.classList.add('open'); document.body.style.overflow='hidden';
  document.documentElement.style.overflow='hidden';
  document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===2));
  switchMarketTab('buy'); updateMarketSummary();
}
function closeMarket() {
  document.getElementById('marketPage')?.classList.remove('open');
  document.getElementById('mainHome').style.display='';
  document.body.style.overflow=''; document.documentElement.style.overflow='';
  document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===0));
}
function switchMarketTab(tab) {
  marketTab=tab;
  document.querySelectorAll('[data-market-tab]').forEach(b=>b.classList.toggle('active',b.dataset.marketTab===tab));
  const search=document.getElementById('marketSearchWrap'); if(search)search.hidden=tab!=='search';
  const filters=document.getElementById('marketFilterRow'); if(filters)filters.hidden=!(tab==='buy'||tab==='search');
  marketCoachSpeech();
  if(tab==='coaches') renderMarketCoaches(); else renderMarketPlayers();
}
function marketPositionMatch(p, filter) {
  if(!filter)return true;
  if(filter==='DF')return ['CB','LB','RB'].includes(p.pos);
  if(filter==='MF')return ['CDM','CM','CAM'].includes(p.pos);
  if(filter==='FW')return ['LW','RW','ST'].includes(p.pos);
  return p.pos===filter;
}
function updateMarketSummary() {
  const set=(id,val)=>{const e=document.getElementById(id);if(e)e.textContent=String(val).toLocaleString('fa-IR');};
  set('marketCoins',manager.coins); set('marketBudget',manager.coins);
  set('marketOwnedCount',manager.ownedPlayers.length); set('marketCoachCount',manager.ownedCoaches.length);
  updateWallet();
}
function marketPlayerCard(p, mode) {
  const owned=manager.ownedPlayers.includes(p.id), price=playerPrice(p);
  const card=document.createElement('article'); card.className=`market-player-card ${p.rarity||'gold'}`;
  const ini=((p.name||p.nameFa||'P').trim().split(/\s+/).map(x=>x[0]).join('')||'P').slice(0,2).toUpperCase();
  card.innerHTML=`<div class="market-player-art"><div class="mkt-avatar avatar-${p.rarity||'gold'}">${ini}</div><img src="${p.img}" alt="${p.nameFa}" loading="lazy" onerror="this.remove()" onload="this.previousElementSibling.style.display='none';this.style.display='block'"><b>${p.ovr}</b><span>${p.pos}</span></div><div class="market-player-info"><strong>${p.nameFa}</strong><small>${p.club} · ${p.flag||''}</small><div class="market-price">🪙 ${price.toLocaleString('fa-IR')}</div><button type="button" ${mode==='buy'&&owned?'disabled':''}>${mode==='sell'?'فروش بازیکن':owned?'خریداری شده':'خرید بازیکن'}</button></div>`;
  card.querySelector('button').onclick=()=> mode==='sell'?sellMarketPlayer(p.id):buyMarketPlayer(p.id);
  return card;
}
function renderMarketPlayers() {
  const box=document.getElementById('marketContent'); if(!box)return; box.innerHTML='';
  let list=PLAYERS.filter(p=>marketTab==='sell'?manager.ownedPlayers.includes(p.id):true);
  if(marketTab==='search'){
    const q=(document.getElementById('marketSearchInput')?.value||'').trim().toLowerCase();
    if(!q){box.innerHTML='<div class="market-empty">نام بازیکن را در کادر جستجو وارد کن.</div>';return;}
    list=list.filter(p=>(p.name+' '+p.nameFa+' '+p.club).toLowerCase().includes(q));
  }
  if(marketTab==='buy'||marketTab==='search'){
    const pos=document.getElementById('marketPositionFilter')?.value||'';
    list=list.filter(p=>marketPositionMatch(p,pos));
    const sort=document.getElementById('marketSort')?.value||'rating';
    list.sort((a,b)=>sort==='cheap'?playerPrice(a)-playerPrice(b):sort==='expensive'?playerPrice(b)-playerPrice(a):b.ovr-a.ovr);
  } else list.sort((a,b)=>b.ovr-a.ovr);
  if(!list.length){box.innerHTML=`<div class="market-empty">${marketTab==='sell'?'هنوز بازیکنی برای فروش در فهرست باشگاه ثبت نشده.':'بازیکنی با این مشخصات پیدا نشد.'}</div>`;return;}
  const grid=document.createElement('div');grid.className='market-player-grid';
  list.forEach(p=>grid.appendChild(marketPlayerCard(p,marketTab==='sell'?'sell':'buy'))); box.appendChild(grid);
}
function buyMarketPlayer(id) {
  const p=getPlayer(id); if(!p)return;
  if(manager.ownedPlayers.includes(id)){showMessage('این بازیکن قبلاً خریداری شده است.');return;}
  const price=playerPrice(p); if(manager.coins<price){showMessage('بودجه باشگاه برای خرید این بازیکن کافی نیست!');return;}
  manager.coins-=price; manager.ownedPlayers.push(id); saveGame(); updateMarketSummary(); renderMarketPlayers();
  showMessage(`${p.nameFa} با موفقیت به باشگاه شما پیوست! ⚽`);
}
function sellMarketPlayer(id) {
  const p=getPlayer(id); if(!p)return;
  if(!manager.ownedPlayers.includes(id)){showMessage('این بازیکن در فهرست دارایی باشگاه نیست.');return;}
  const inTeam=Object.values(formation).includes(id)||bench.includes(id);
  if(inTeam && !confirm(`${p.nameFa} در ترکیب یا نیمکت است. با فروش، از تیم هم خارج می‌شود. ادامه می‌دهی؟`))return;
  Object.keys(formation).forEach(slot=>{if(formation[slot]===id)formation[slot]=null;});
  bench=bench.map(x=>x===id?null:x); saveFormation(); saveStr('proBench',JSON.stringify(bench));
  manager.ownedPlayers=manager.ownedPlayers.filter(x=>x!==id);
  manager.coins+=Math.round(playerPrice(p)*0.75); saveGame(); updateMarketSummary(); renderMarketPlayers(); renderAllSlots(); renderBench();
  showMessage(`${p.nameFa} فروخته شد؛ مبلغ به بودجه اضافه شد.`);
}
function renderMarketCoaches() {
  const box=document.getElementById('marketContent'); if(!box)return; box.innerHTML='';
  const grid=document.createElement('div');grid.className='market-coach-grid';
  Object.entries(COACHES).forEach(([id,c])=>{
    const owned=manager.ownedCoaches.includes(id), price=coachPrice(id);
    const card=document.createElement('article');card.className='market-coach-card';
    card.innerHTML=`<div class="market-coach-art"><img src="assets/coaches/${c.file}" alt="${c.name}" onerror="this.style.display='none'"></div><div class="market-coach-info"><small>سرمربی · ${c.style}</small><h3>${c.name}</h3><p>«${c.quote}»</p><b>🪙 ${price.toLocaleString('fa-IR')}</b><button ${owned?'disabled':''}>${owned?'در اختیار باشگاه':'خرید و انتخاب مربی'}</button></div>`;
    card.querySelector('button').onclick=()=>buyMarketCoach(id);grid.appendChild(card);
  });box.appendChild(grid);
}
function buyMarketCoach(id) {
  const c=COACHES[id];if(!c)return;
  if(manager.ownedCoaches.includes(id)){showMessage('این مربی را قبلاً خریداری کرده‌ای.');return;}
  const price=coachPrice(id);if(manager.coins<price){showMessage('بودجه کافی برای خرید این مربی نداری.');return;}
  manager.coins-=price;manager.ownedCoaches.push(id);manager.coach=id;saveGame();renderCoach();updateMarketSummary();renderMarketCoaches();marketCoachSpeech();
  showMessage(`${c.name} به‌عنوان سرمربی جدید انتخاب شد!`);
}

/* ===== COACH & TRAINING SYSTEM ===== */
const COACHES = {
  pep:{name:"پپ گواردیولا",file:"pep.png",quote:"بریم تیم بسازیم سلطان! اول ترکیب رو می‌چینیم، بعد فوتبال خودمون رو بازی می‌کنیم.",style:"مالکیت توپ"},
  mourinho:{name:"ژوزه مورینیو",file:"mourinho.png",quote:"برای بردن باید باهوش باشیم؛ اول محکم دفاع می‌کنیم، بعد ضربه می‌زنیم.",style:"دفاع و ضدحمله"},
  klopp:{name:"یورگن کلوپ",file:"klopp.png",quote:"انرژی، سرعت و پرس! می‌خوام همه برای هم بجنگیم.",style:"پرس شدید"},
  ancelotti:{name:"کارلو آنچلوتی",file:"ancelotti.png",quote:"آرامش داشته باش؛ با یک تیم متعادل می‌تونیم هر حریفی رو شکست بدیم.",style:"تعادل تاکتیکی"},
  zidane:{name:"زین‌الدین زیدان",file:"zidane.png",quote:"ستاره‌ها وقتی یک تیم واقعی باشن، معجزه می‌کنن.",style:"مدیریت ستاره‌ها"}
};
manager.coach = manager.coach || null;
function selectCoach(id){
  const c=COACHES[id]; if(!c)return;
  manager.coach=id; saveGame(); renderCoach();
  showMessage("سرمربی جدید انتخاب شد: "+c.name+" ⚽");
}
function renderCoach(){
  const box=document.getElementById("activeCoach"); if(!box)return;
  const c=COACHES[manager.coach];
  if(!c){box.innerHTML='<div class="coach-empty">هنوز مربی انتخاب نکردی. یکی از مربی‌های پایین را انتخاب کن.</div>';return;}
  box.innerHTML=`<div class="coach-portrait"><img src="assets/coaches/${c.file}" alt="${c.name}" onerror="this.style.display='none';this.parentElement.classList.add('no-photo');this.parentElement.innerHTML='👔'"></div><div class="coach-speech"><span>سرمربی شما · ${c.style}</span><h3>${c.name}</h3><p>«${c.quote}»</p><button onclick="openPage('team')">بریم ترکیب تیم رو بچینیم ←</button></div>`;
}
const TRAINING_STATS={
 attack:["sho","dri"], defense:["def","phy"], speed:["pac","dri"], physical:["phy"]
};
let trainingBusy=false;
function runTraining(type){
  const stats=TRAINING_STATS[type]; if(!stats)return;
  if(trainingBusy){showMessage("جلسه تمرین هنوز تموم نشده!");return;}
  if(!manager.coach){showMessage("اول از بخش سرمربی، یک مربی انتخاب کن!");return;}
  const ids=[...new Set([...Object.values(formation).filter(Boolean),...(Array.isArray(bench)?bench:[]).filter(Boolean)])];
  if(!ids.length){showMessage("اول بازیکن‌ها رو در ترکیب یا نیمکت قرار بده.");return;}
  const cost=200;
  if(manager.coins<cost){showMessage("برای این جلسه تمرین ۲۰۰ سکه لازم داری.");return;}
  manager.coins-=cost; saveGame(); updateWallet();
  trainingBusy=true;
  const names={attack:"هجومی",defense:"دفاعی",speed:"سرعت",physical:"قدرتی"};
  const wrap=document.getElementById("trainingProgressWrap");
  const bar=document.getElementById("trainingProgressBar");
  const label=document.getElementById("trainingProgressLabel");
  const status=document.getElementById("trainingStatus");
  const resultBox=document.getElementById("trainingResultCards");
  if(wrap)wrap.hidden=false;
  if(bar)bar.style.width="0%";
  if(label)label.textContent=`جلسه ${names[type]} شروع شد...`;
  if(status)status.textContent=`در حال تمرین ${names[type]} با ${ids.length} بازیکن...`;
  if(resultBox)resultBox.innerHTML="";
  document.querySelectorAll(".train-btn").forEach(b=>b.disabled=true);

  let progress=0;
  const steps=["گرم کردن","تمرین اصلی","شبیه‌سازی مسابقه","ریکاوری کوتاه","ارزیابی عملکرد"];
  const tick=setInterval(()=>{
    progress+=4;
    if(bar)bar.style.width=Math.min(100,progress)+"%";
    if(label)label.textContent=steps[Math.min(steps.length-1, Math.floor(progress/20))] + " · " + Math.min(100,progress) + "%";
    if(progress>=100){
      clearInterval(tick);
      let improved=0;
      const gained=[];
      ids.forEach(id=>{
        const player=getPlayer(id); if(!player)return;
        const before={...player};
        stats.forEach(stat=>{
          const bonus = Math.random()<0.35 ? 2 : 1;
          if(player[stat]<99){player[stat]=Math.min(99,player[stat]+bonus);improved+=bonus;}
        });
        // ovr grows slower / more realistic
        const avg=Math.round((player.pac+player.sho+player.pas+player.dri+player.def+player.phy)/6);
        player.ovr=Math.min(99, Math.max(player.ovr, avg));
        if(player.ovr < avg) player.ovr = avg;
        else if(Math.random()<0.45 && player.ovr<99) player.ovr=Math.min(99,player.ovr+1);
        manager.playerTraining=manager.playerTraining||{};
        manager.playerTraining[id]={pac:player.pac,sho:player.sho,pas:player.pas,dri:player.dri,def:player.def,phy:player.phy,ovr:player.ovr};
        gained.push({p:player, before});
      });
      saveGame(); updateWallet(); renderAllSlots(); renderBench();
      if(status)status.textContent=`✅ جلسه ${names[type]} تمام شد · ${ids.length} بازیکن · ${improved} واحد پیشرفت · هزینه ۲۰۰ سکه`;
      if(label)label.textContent="تمرین کامل شد!";
      if(resultBox){
        resultBox.innerHTML = gained.slice(0,8).map(({p,before})=>{
          const deltas = ["pac","sho","pas","dri","def","phy"].filter(k=>p[k]>before[k]).map(k=>`${k.toUpperCase()}+${p[k]-before[k]}`).join(" · ");
          return `<div class="train-result-card r-${p.rarity||'gold'}">
            <div class="trc-photo">${p.flag||'⚽'} <b>${p.ovr}</b></div>
            <div><strong>${p.nameFa}</strong><small>${deltas||'بدون تغییر محسوس'}</small></div>
          </div>`;
        }).join("");
      }
      document.querySelectorAll(".train-btn").forEach(b=>b.disabled=false);
      trainingBusy=false;
      showMessage("تمرین واقعی انجام شد! بازیکنان پیشرفت کردند 💪");
      setTimeout(()=>{if(wrap)wrap.hidden=true;}, 2500);
    }
  }, 320);
}

const RARITY_LABELS = {
    bronze: "برنزی",
    silver: "نقره‌ای",
    gold: "طلایی",
    diamond: "الماسی",
    legendary: "افسانه‌ای",
    mythic: "اسطوره‌ای"
};

const POS_LABELS = {
    GK: "دروازه‌بان",
    CB: "مدافع وسط",
    LB: "مدافع چپ",
    RB: "مدافع راست",
    CDM: "هافبک دفاعی",
    CM: "هافبک وسط",
    CAM: "هافبک تهاجمی",
    LW: "وینگر چپ",
    RW: "وینگر راست",
    ST: "مهاجم"
};

/* ========== RENDER CARDS ========== */
function playerInitials(p){
  const n=(p.name||p.nameFa||"P").trim().split(/\s+/);
  return ((n[0]?.[0]||"P")+(n[1]?.[0]||"")).toUpperCase();
}
function createPlayerCard(p) {
    const card = document.createElement("div");
    card.className = `player-card ${p.rarity}${p.special ? " special" : ""}`;
    card.dataset.id = p.id;
    card.onclick = () => openPlayerModal(p.id);
    const initials = playerInitials(p);
    const statsHtml = `
        <div class="stat-item"><span class="label">PAC</span><span class="val">${p.pac}</span></div>
        <div class="stat-item"><span class="label">SHO</span><span class="val">${p.sho}</span></div>
        <div class="stat-item"><span class="label">PAS</span><span class="val">${p.pas}</span></div>
        <div class="stat-item"><span class="label">DRI</span><span class="val">${p.dri}</span></div>
        <div class="stat-item"><span class="label">DEF</span><span class="val">${p.def}</span></div>
        <div class="stat-item"><span class="label">PHY</span><span class="val">${p.phy}</span></div>
    `;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-glow"></div>
            <div class="card-top">
                <div class="ovr-badge">
                    <div class="ovr-num">${p.ovr}</div>
                    <div class="ovr-label">OVR</div>
                </div>
                <div class="pos-badge">${p.pos}</div>
            </div>
            <div class="card-img-wrap">
                <div class="img-fallback avatar-${p.rarity||'gold'}" style="display:flex;">
                  <span class="avatar-initials">${initials}</span>
                  <span class="avatar-flag">${p.flag||'⚽'}</span>
                </div>
                <img src="${p.img}" alt="${p.name}" loading="lazy"
                     onerror="this.remove()"
                     onload="this.previousElementSibling.style.display='none'; this.style.display='block';">
            </div>
            <div class="card-bottom">
                <div class="card-name">${p.nameFa}</div>
                <div class="card-meta">
                    <span class="flag">${p.flag||''}</span>
                    <span>${p.club||''}</span>
                </div>
                <div class="card-stats">${statsHtml}</div>
            </div>
            <div class="rarity-tag">${RARITY_LABELS[p.rarity] || p.rarity}</div>
        </div>
    `;
    return card;
}

function renderPlayers(list) {
    const container = document.getElementById("players");
    if (!container) return;
    container.innerHTML = "";
    if (!list || list.length === 0) {
        container.innerHTML = `<div class="empty-state">بازیکنی با این فیلتر پیدا نشد</div>`;
        return;
    }
    // sort by ovr desc
    const sorted = [...list].sort((a, b) => b.ovr - a.ovr);
    sorted.forEach(p => {
        container.appendChild(createPlayerCard(p));
    });
}

function filterPlayers() {
    const q = (document.getElementById("playerSearch")?.value || "").trim().toLowerCase();
    const pos = document.getElementById("filterPos")?.value || "";
    const rarity = document.getElementById("filterRarity")?.value || "";
    const ovrMin = parseInt(document.getElementById("filterOvr")?.value || "0", 10);

    let filtered = PLAYERS.filter(p => {
        if (pos && p.pos !== pos) return false;
        if (rarity && p.rarity !== rarity) return false;
        if (ovrMin && p.ovr < ovrMin) return false;
        if (q) {
            const hay = (p.name + " " + p.nameFa + " " + p.club + " " + p.nation).toLowerCase();
            if (!hay.includes(q)) return false;
        }
        return true;
    });
    renderPlayers(filtered);
}

/* ========== MODAL ========== */
function openPlayerModal(id) {
    const p = PLAYERS.find(x => x.id === id);
    if (!p) return;
    const modal = document.getElementById("playerModal");
    const body = document.getElementById("modalBody");
    if (!modal || !body) return;

    const statClass = (v) => v >= 85 ? "high" : v >= 70 ? "mid" : "low";

    body.innerHTML = `
        <div class="modal-card-preview ${p.rarity}">
            <img src="${p.img}" alt="${p.name}" onerror="this.src=''; this.parentElement.innerHTML='<div class=\\'img-fallback\\' style=\\'display:flex;height:100%;align-items:center;justify-content:center;font-size:48px;\\'>⚽</div>';">
        </div>
        <div class="modal-ovr-big">${p.ovr}</div>
        <div class="modal-rarity" style="color: var(--gold)">${RARITY_LABELS[p.rarity]}</div>
        <div class="modal-player-name">${p.nameFa}</div>
        <div class="modal-player-info">
            ${p.flag} ${p.nation} · ${POS_LABELS[p.pos] || p.pos} · ${p.club}
        </div>
        <div class="modal-stats-grid">
            <div class="modal-stat ${statClass(p.pac)}"><div class="m-label">PAC</div><div class="m-val">${p.pac}</div></div>
            <div class="modal-stat ${statClass(p.sho)}"><div class="m-label">SHO</div><div class="m-val">${p.sho}</div></div>
            <div class="modal-stat ${statClass(p.pas)}"><div class="m-label">PAS</div><div class="m-val">${p.pas}</div></div>
            <div class="modal-stat ${statClass(p.dri)}"><div class="m-label">DRI</div><div class="m-val">${p.dri}</div></div>
            <div class="modal-stat ${statClass(p.def)}"><div class="m-label">DEF</div><div class="m-val">${p.def}</div></div>
            <div class="modal-stat ${statClass(p.phy)}"><div class="m-label">PHY</div><div class="m-val">${p.phy}</div></div>
        </div>
    `;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closePlayerModal(e) {
    if (e && e.target !== e.currentTarget && !e.target.classList.contains("modal-close")) return;
    const modal = document.getElementById("playerModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

// Start game
document.addEventListener("DOMContentLoaded", () => {
    updateWallet();
    updateClub();
    renderCoach();
    renderPlayers(PLAYERS);
    sanitizeTeamState();
    renderAllSlots();
    renderBench();
});


/* USER PROFILE — local device profile */
let profileAvatarData = "";
function openUserProfile(){
  document.getElementById("mainHome")?.style.setProperty("display","none");
  ["marketPage","teamPage","clubManagementPage","vipShopPage"].forEach(id=>document.getElementById(id)?.classList.remove("open"));
  const page=document.getElementById("userProfilePage"); if(!page)return;
  page.classList.add("open"); page.scrollTop=0; document.body.style.overflow="hidden"; document.documentElement.style.overflow="hidden";
  document.querySelectorAll(".bottom-nav button").forEach((b,i)=>b.classList.toggle("active",i===4));
  const saved=JSON.parse(localStorage.getItem("pfmUserProfile")||"null");
  if(saved){
    document.getElementById("profileUserId").value=saved.userId||"";
    document.getElementById("profileGender").value=saved.gender||"";
    document.getElementById("profileAge").value=saved.age||"";
    document.getElementById("profileCity").value=saved.city||"";
    profileAvatarData=saved.avatar||""; showProfileAvatar();
    document.getElementById("savedUserProfile").hidden=false;
    document.getElementById("savedUserProfile").innerHTML=`<b>پروفایل ذخیره‌شده</b><span>شناسه: ${escapeProfileText(saved.userId)}</span><span>${escapeProfileText(saved.gender)} · ${escapeProfileText(saved.age)} سال · ${escapeProfileText(saved.city)}</span>`;
  }
}
function closeUserProfile(){
  document.getElementById("userProfilePage")?.classList.remove("open");
  document.getElementById("mainHome")?.style.removeProperty("display");
  document.body.style.overflow="";document.documentElement.style.overflow="";
  document.querySelectorAll(".bottom-nav button").forEach((b,i)=>b.classList.toggle("active",i===0));
}
function previewProfileAvatar(event){
  const file=event.target.files?.[0]; if(!file)return;
  if(!file.type.startsWith("image/")){showMessage("لطفاً یک تصویر انتخاب کن.");return;}
  if(file.size>8*1024*1024){showMessage("حجم عکس باید کمتر از ۸ مگابایت باشد.");return;}
  const reader=new FileReader(); reader.onload=()=>{
    const img=new Image(); img.onload=()=>{const canvas=document.createElement("canvas");const scale=Math.min(1,512/Math.max(img.width,img.height));canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);profileAvatarData=canvas.toDataURL("image/jpeg",.78);showProfileAvatar();};img.src=reader.result;
  };reader.readAsDataURL(file);
}
function showProfileAvatar(){const el=document.getElementById("profileAvatarPreview");if(!el)return;el.innerHTML=profileAvatarData?`<img src="${profileAvatarData}" alt="عکس پروفایل"><span class="avatar-edit-mark">✎</span>`:"<span>＋</span>";}
function escapeProfileText(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[c]));}
async function saveUserProfile(event){
  event.preventDefault();const userId=document.getElementById("profileUserId").value.trim();const password=document.getElementById("profilePassword").value;
  const gender=document.getElementById("profileGender").value;const age=Number(document.getElementById("profileAge").value);const city=document.getElementById("profileCity").value.trim();
  if(!/^[a-zA-Z0-9_]{3,24}$/.test(userId)){showMessage("شناسه فقط شامل حروف انگلیسی، عدد و _ باشد و حداقل ۳ کاراکتر داشته باشد.");return;}
  if(password.length<6||!gender||age<13||age>100||!city||!document.getElementById("profileConfirm").checked){showMessage("همه اطلاعات را کامل کن و تأیید را بزن.");return;}
  try{const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(password));const passwordHash=Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,"0")).join("");
    const profile={userId,passwordHash,gender,age,city,avatar:profileAvatarData,updatedAt:Date.now()};localStorage.setItem("pfmUserProfile",JSON.stringify(profile));
    document.getElementById("profilePassword").value="";document.getElementById("savedUserProfile").hidden=false;document.getElementById("savedUserProfile").innerHTML=`<b>پروفایل با موفقیت ذخیره شد ✓</b><span>شناسه: ${escapeProfileText(userId)}</span><span>${escapeProfileText(gender)} · ${age} سال · ${escapeProfileText(city)}</span>`;showMessage("پروفایل کاربری ذخیره شد.");
  }catch(error){showMessage("ذخیره پروفایل انجام نشد؛ حافظه مرورگر را بررسی کن.");}
}

console.log("PRO FOOTBALL MANAGER LOADED — User Profile Active");

/* VIP SHOP — cosmetic items purchased with in-game coins */
const VIP_CATALOG = {
 frames:[
  {id:'frame-gold',name:'قاب سلطنتی',icon:'👑',price:650,kind:'frame',className:'vip-frame-gold'},
  {id:'frame-diamond',name:'قاب الماسی',icon:'💎',price:900,kind:'frame',className:'vip-frame-diamond'},
  {id:'frame-fire',name:'قاب آتشین',icon:'🔥',price:1100,kind:'frame',className:'vip-frame-fire'},
  {id:'frame-ice',name:'قاب یخی',icon:'❄️',price:850,kind:'frame',className:'vip-frame-ice'}
 ],
 halos:[
  {id:'halo-gold',name:'هاله طلایی',icon:'🌟',price:700,kind:'halo',className:'vip-halo-gold'},
  {id:'halo-electric',name:'هاله برقی',icon:'⚡',price:950,kind:'halo',className:'vip-halo-electric'},
  {id:'halo-galaxy',name:'هاله کهکشانی',icon:'🌌',price:1200,kind:'halo',className:'vip-halo-galaxy'},
  {id:'halo-ice',name:'هاله یخی',icon:'🧊',price:800,kind:'halo',className:'vip-halo-ice'}
 ],
 effects:[
  {id:'effect-snow',name:'بارش برف',icon:'❄️',price:600,kind:'effect',className:'vip-effect-snow'},
  {id:'effect-stars',name:'بارش ستاره',icon:'✨',price:750,kind:'effect',className:'vip-effect-stars'},
  {id:'effect-flame',name:'ذرات آتش',icon:'🔥',price:1000,kind:'effect',className:'vip-effect-flame'}
 ],
 badges:[
  {id:'badge-vip',name:'نشان VIP',icon:'👑',price:500,kind:'badge',className:'vip-badge-gold'},
  {id:'badge-legend',name:'نشان افسانه‌ای',icon:'🏆',price:850,kind:'badge',className:'vip-badge-legend'},
  {id:'badge-diamond',name:'نشان الماس',icon:'💠',price:1000,kind:'badge',className:'vip-badge-diamond'}
 ]
};
function getVipState(){try{return JSON.parse(localStorage.getItem('pfmVipState'))||{member:false,owned:[],equipped:{}};}catch(e){return {member:false,owned:[],equipped:{}};}}
function saveVipState(state){localStorage.setItem('pfmVipState',JSON.stringify(state));}
function openVipShop(){
 const home=document.getElementById('mainHome');if(home)home.style.display='none';
 ['marketPage','teamPage','clubManagementPage','userProfilePage'].forEach(id=>document.getElementById(id)?.classList.remove('open'));
 const page=document.getElementById('vipShopPage');if(!page)return;page.classList.add('open');page.scrollTop=0;
 document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';
 document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===1));
 switchVipTab('frames');renderVipShop();
}
function closeVipShop(){document.getElementById('vipShopPage')?.classList.remove('open');const home=document.getElementById('mainHome');if(home)home.style.display='';document.body.style.overflow='';document.documentElement.style.overflow='';document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===0));}
function switchVipTab(tab){document.querySelectorAll('[data-vip-tab]').forEach(b=>b.classList.toggle('active',b.dataset.vipTab===tab));renderVipShop(tab);}
function renderVipShop(tab){
 const state=getVipState(),coins=document.getElementById('vipShopCoins');if(coins)coins.textContent=(manager.coins||0).toLocaleString('fa-IR');
 const status=document.getElementById('vipMembershipStatus'),buy=document.getElementById('vipMembershipBtn');if(status)status.textContent=state.member?'عضویت VIP برای این دستگاه فعال است.':'با خرید عضویت، آیتم‌های ویژه را فعال کن.';if(buy){buy.textContent=state.member?'✓ عضویت فعال است':'خرید VIP · ۲۵۰۰ سکه';buy.disabled=state.member;}
 const activeTab=tab||document.querySelector('[data-vip-tab].active')?.dataset.vipTab||'frames';const grid=document.getElementById('vipShopGrid');if(!grid)return;
 grid.innerHTML=VIP_CATALOG[activeTab].map(item=>{const owned=state.owned.includes(item.id),equipped=state.equipped[item.kind]===item.id;return `<article class="vip-item-card"><div class="vip-item-art ${item.className}"><span>${item.icon}</span></div><b>${item.name}</b><small>${owned?(equipped?'در پروفایل فعال است':'خریداری شده'):`🪙 ${item.price.toLocaleString('fa-IR')} سکه`}</small><button type="button" ${!owned&&!state.member?'disabled':''} onclick="${owned?`equipVipItem('${item.id}')`:`buyVipItem('${item.id}')`}">${owned?(equipped?'فعال شده ✓':'استفاده در پروفایل'):(state.member?'خرید آیتم':'ابتدا VIP بخر')}</button></article>`;}).join('');
 const ownedBox=document.getElementById('vipOwnedItems');if(ownedBox){const items=Object.values(VIP_CATALOG).flat().filter(x=>state.owned.includes(x.id));ownedBox.innerHTML=items.length?items.map(x=>`<button type="button" onclick="equipVipItem('${x.id}')">${x.icon} ${x.name}</button>`).join(''):'هنوز آیتمی نخریده‌ای.';}
 updateVipPreview();
}
function buyVipMembership(){const state=getVipState();if(state.member)return;const cost=2500;if((manager.coins||0)<cost){showMessage('برای خرید VIP سکه کافی نداری.');return;}if(!confirm('عضویت VIP با ۲۵۰۰ سکه داخل بازی فعال شود؟'))return;manager.coins-=cost;saveGame();state.member=true;saveVipState(state);updateWallet();renderVipShop();showMessage('عضویت VIP فعال شد! 👑');}
function buyVipItem(id){const state=getVipState(),item=Object.values(VIP_CATALOG).flat().find(x=>x.id===id);if(!item||!state.member)return;if(state.owned.includes(id))return;if((manager.coins||0)<item.price){showMessage('سکه کافی نداری.');return;}manager.coins-=item.price;state.owned.push(id);state.equipped[item.kind]=id;saveGame();saveVipState(state);updateWallet();renderVipShop();showMessage(`${item.name} خریداری و فعال شد!`);}
function equipVipItem(id){const state=getVipState(),item=Object.values(VIP_CATALOG).flat().find(x=>x.id===id);if(!item||!state.owned.includes(id))return;state.equipped[item.kind]=state.equipped[item.kind]===id?'':id;saveVipState(state);renderVipShop();}
function updateVipPreview(){const state=getVipState(),all=Object.values(VIP_CATALOG).flat(),preview=document.getElementById('vipLivePreview');if(!preview)return;preview.className='vip-live-preview';Object.values(state.equipped).filter(Boolean).forEach(id=>{const item=all.find(x=>x.id===id);if(item)preview.classList.add(item.className);});const profile=(()=>{try{return JSON.parse(localStorage.getItem('pfmUserProfile')||'null')}catch(e){return null}})();const avatar=preview.querySelector('.vip-preview-avatar');if(avatar)avatar.innerHTML=profile?.avatar?`<img src="${profile.avatar}" alt="پروفایل">`:'<span>⚽</span>';const name=document.getElementById('vipPreviewName');if(name)name.textContent=profile?.userId||'مدیر باشگاه';const badge=document.getElementById('vipPreviewBadge');if(badge)badge.textContent=state.equipped.badge?'👑 VIP':'بازیکن عادی';}


/* ===== LIVE MATCH ENGINE ===== */
let liveMatch=null, matchTimer=null, matchSpeed=1000, matchPress=false, matchTactic='balanced';
const faNum=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
function openMatchPage(){
  ['marketPage','teamPage','clubManagementPage','vipShopPage','userProfilePage'].forEach(id=>document.getElementById(id)?.classList.remove('open'));
  const home=document.getElementById('mainHome');if(home)home.style.display='none';
  const page=document.getElementById('matchPage');if(!page)return;page.classList.add('open');page.scrollTop=0;document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';
  document.getElementById('matchHomeName').textContent=manager.club||'باشگاه من';
  const opponents=['آبی‌های لندن','شیرهای مادرید','ستاره‌های میلان','قهرمانان پاریس','طلایی‌پوشان مونیخ'];document.getElementById('matchAwayName').textContent=opponents[Math.floor(Math.random()*opponents.length)];
  document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===3));
  resetMatchUI();
}
function closeMatchPage(){clearInterval(matchTimer);matchTimer=null;document.getElementById('matchPage')?.classList.remove('open');const h=document.getElementById('mainHome');if(h)h.style.display='';document.body.style.overflow='';document.documentElement.style.overflow='';document.querySelectorAll('.bottom-nav button').forEach((b,i)=>b.classList.toggle('active',i===0));}
function resetMatchUI(){clearInterval(matchTimer);liveMatch=null;matchSpeed=1000;matchPress=false;matchTactic='balanced';document.getElementById('matchStartBtn').hidden=false;document.getElementById('matchStartBtn').textContent='▶ شروع مسابقه';document.getElementById('matchResult').hidden=true;document.getElementById('matchClock').textContent='۰۰′';document.getElementById('matchHomeScore').textContent='۰';document.getElementById('matchAwayScore').textContent='۰';document.getElementById('matchStatus').textContent='آماده شروع';document.getElementById('matchCommentary').textContent='ترکیب را آماده کن و سوت شروع را بزن.';document.getElementById('matchEventList').innerHTML='<p class="match-event-empty">مسابقه آماده شروع است.</p>';document.getElementById('matchSpeedLabel').textContent='عادی';document.getElementById('matchSubLabel').textContent='تعویض آماده';document.getElementById('matchPressLabel').textContent='پرس معمولی';document.getElementById('matchShots').textContent='۰ - ۰';document.getElementById('matchChances').textContent='۰ - ۰';document.getElementById('matchPossession').textContent='۵۰٪ - ۵۰٪';document.getElementById('matchPossBar').style.width='50%';document.querySelectorAll('.match-action-row button').forEach(b=>b.classList.toggle('selected',b.textContent.includes('متعادل')));}
function startLiveMatch(){
 if(liveMatch?.running)return;
 resetMatchUI();
 const st=typeof computeStrength==='function'?computeStrength():{overall:65};
 liveMatch={minute:0,home:0,away:0,shotsH:0,shotsA:0,chancesH:0,chancesA:0,poss:50,strength:st.overall||65,running:true,sub:false,events:[]};
 document.getElementById('matchStartBtn').hidden=true;document.getElementById('matchStatus').textContent='در حال برگزاری';addMatchEvent('۰′','داور در سوت خود دمید؛ مسابقه آغاز شد.','start');
 matchTimer=setInterval(matchTick,matchSpeed);
}
function addMatchEvent(min,text,type='normal'){const list=document.getElementById('matchEventList');const empty=list.querySelector('.match-event-empty');if(empty)empty.remove();const row=document.createElement('div');row.className='match-event '+type;row.innerHTML='<b>'+min+'</b><span></span>';row.querySelector('span').textContent=text;list.prepend(row);while(list.children.length>12)list.lastElementChild.remove();document.getElementById('matchCommentary').textContent=text;}
function matchTick(){if(!liveMatch?.running)return;const m=liveMatch;m.minute++;m.poss=Math.max(34,Math.min(66,50+(m.strength-65)*.35+(matchTactic==='attack'?5:matchTactic==='defense'?-4:0)+(Math.random()*8-4)+(matchPress?2:0)));
 document.getElementById('matchClock').textContent=faNum(m.minute)+'′';document.getElementById('matchPossession').textContent=faNum(Math.round(m.poss))+'٪ - '+faNum(100-Math.round(m.poss))+'٪';document.getElementById('matchPossBar').style.width=m.poss+'%';
 const ball=document.getElementById('matchBall');ball.style.setProperty('--bx',(18+Math.random()*64)+'%');ball.style.setProperty('--by',(18+Math.random()*64)+'%');
 if(Math.random()<(matchTactic==='attack'?.20:matchTactic==='defense'?.095:.15)){m.shotsH++;if(Math.random()<.38)m.chancesH++;const goalChance=.018+(m.strength-65)*.0008+(matchTactic==='attack'?.012:0)-(matchTactic==='defense'?.008:0);if(Math.random()<goalChance){m.home++;addMatchEvent(faNum(m.minute)+'′','⚽ گللل! چه ضربه تماشایی از تیم شما!','goal');}else addMatchEvent(faNum(m.minute)+'′','حمله خطرناک تیم شما؛ شوت به سمت دروازه!','chance');}
 else if(Math.random()<.11){m.shotsA++;if(Math.random()<.28)m.chancesA++;if(Math.random()<.012){m.away++;addMatchEvent(faNum(m.minute)+'′','⚽ حریف به گل رسید.','away-goal');}else addMatchEvent(faNum(m.minute)+'′','حریف حمله‌ای را طراحی کرد؛ دفاع هوشیار است.');}
 if(m.minute===45){addMatchEvent('۴۵′','⏸️ پایان نیمه اول؛ بازیکنان برای استراحت به رختکن رفتند.','break');document.getElementById('matchStatus').textContent='استراحت بین دو نیمه';clearInterval(matchTimer);setTimeout(()=>{if(liveMatch?.running){addMatchEvent('۴۶′','نیمه دوم آغاز شد؛ بازی دوباره به جریان افتاد.','start');document.getElementById('matchStatus').textContent='نیمه دوم';matchTimer=setInterval(matchTick,matchSpeed);}},3500);}
 document.getElementById('matchHomeScore').textContent=faNum(m.home);document.getElementById('matchAwayScore').textContent=faNum(m.away);document.getElementById('matchShots').textContent=faNum(m.shotsH)+' - '+faNum(m.shotsA);document.getElementById('matchChances').textContent=faNum(m.chancesH)+' - '+faNum(m.chancesA);
 if(m.minute>=90)finishLiveMatch();}
function finishLiveMatch(){clearInterval(matchTimer);matchTimer=null;liveMatch.running=false;document.getElementById('matchStatus').textContent='پایان مسابقه';document.getElementById('matchStartBtn').hidden=false;document.getElementById('matchStartBtn').textContent='↻ مسابقه جدید';let reward=liveMatch.home>liveMatch.away?700:liveMatch.home===liveMatch.away?350:150;manager.coins=(manager.coins||0)+reward;saveGame();updateWallet();const box=document.getElementById('matchResult');box.hidden=false;box.innerHTML='<div class="result-trophy">🏆</div><small>FULL TIME</small><h3>'+(liveMatch.home>liveMatch.away?'پیروزی شیرین!':liveMatch.home===liveMatch.away?'بازی مساوی شد':'تلاش خوبی بود!')+'</h3><div class="result-score">'+faNum(liveMatch.home)+' - '+faNum(liveMatch.away)+'</div><p>پاداش مسابقه: 🪙 '+faNum(reward)+' سکه</p>';addMatchEvent('۹۰′','🏁 سوت پایان! مسابقه به پایان رسید.','break');}
function setMatchTactic(t){matchTactic=t;document.querySelectorAll('.match-action-row button').forEach(b=>b.classList.toggle('selected',b.getAttribute('onclick').includes("'"+t+"'")));const labels={attack:'تیم با آرایش هجومی‌تر بازی می‌کند.',balanced:'تیم با تعادل دفاع و حمله بازی می‌کند.',defense:'تیم عقب‌تر می‌ایستد و دفاع می‌کند.'};if(liveMatch?.running)addMatchEvent(faNum(liveMatch.minute)+'′',labels[t],'tactic');}
function toggleMatchSpeed(){matchSpeed=matchSpeed===1000?550:1000;document.getElementById('matchSpeedLabel').textContent=matchSpeed===550?'سریع':'عادی';if(liveMatch?.running){clearInterval(matchTimer);matchTimer=setInterval(matchTick,matchSpeed);}}
function toggleMatchPress(){matchPress=!matchPress;document.getElementById('matchPressLabel').textContent=matchPress?'پرس شدید':'پرس معمولی';if(liveMatch?.running)addMatchEvent(faNum(liveMatch.minute)+'′',matchPress?'🔥 پرس شدید از سوی تیم شما!':'تیم به پرس معمولی برگشت.','tactic');}
function makeMatchSubstitution(){if(!liveMatch?.running){showMessage('تعویض در زمان مسابقه فعال می‌شود.');return;}if(liveMatch.sub){showMessage('در این نسخه یک تعویض آزمایشی انجام شده است.');return;}liveMatch.sub=true;liveMatch.strength=Math.min(95,liveMatch.strength+2);document.getElementById('matchSubLabel').textContent='انجام شد ✓';addMatchEvent(faNum(liveMatch.minute)+'′','🔁 تعویض انجام شد؛ بازیکن تازه‌نفس وارد زمین شد.','tactic');}
