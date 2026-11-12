// PRO FOOTBALL MANAGER
// Game Engine - Version 1.1 (Professional Player Cards)

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
    if (page === "team") {
        openTeamPage();
        return;
    }
    const pages = {
        market: "بازار نقل‌وانتقالات به‌زودی فعال می‌شود 🔄",
        stadium: "مدیریت ورزشگاه به‌زودی فعال می‌شود 🏟️",
        training: "مرکز تمرین به‌زودی فعال می‌شود 🏋️",
        league: "مسابقات و لیگ‌ها به‌زودی فعال می‌شوند 🏆",
        clubchat: "چت اختصاصی کلوب به‌زودی فعال می‌شود 💬",
        profile: "پروفایل مدیر به‌زودی فعال می‌شود 👤",
        club: "مدیریت باشگاه به‌زودی فعال می‌شود 🏟️"
    };
    showMessage(pages[page] || "این بخش به‌زودی اضافه می‌شود!");
}

function openTeamPage() {
    const page = document.getElementById("teamPage");
    const home = document.getElementById("mainHome");
    if (!page) return;
    page.classList.add("open");
    if (home) home.style.display = "none";
    // highlight bottom nav team button
    document.querySelectorAll(".bottom-nav button").forEach((btn, i) => {
        btn.classList.toggle("active", i === 1);
    });
}

function closeTeamPage() {
    const page = document.getElementById("teamPage");
    const home = document.getElementById("mainHome");
    if (page) page.classList.remove("open");
    if (home) home.style.display = "";
    document.querySelectorAll(".bottom-nav button").forEach((btn, i) => {
        btn.classList.toggle("active", i === 0);
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
function createPlayerCard(p) {
    const card = document.createElement("div");
    card.className = `player-card ${p.rarity}${p.special ? " special" : ""}`;
    card.dataset.id = p.id;
    card.onclick = () => openPlayerModal(p.id);

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
            <div class="card-top">
                <div class="ovr-badge">
                    <div class="ovr-num">${p.ovr}</div>
                    <div class="ovr-label">OVR</div>
                </div>
                <div class="pos-badge">${p.pos}</div>
            </div>
            <div class="card-img-wrap">
                <img src="${p.img}" alt="${p.name}" loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="img-fallback" style="display:none;">⚽</div>
            </div>
            <div class="card-bottom">
                <div class="card-name">${p.nameFa}</div>
                <div class="card-meta">
                    <span class="flag">${p.flag}</span>
                    <span>${p.club}</span>
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
    renderPlayers(PLAYERS);
});

console.log("PRO FOOTBALL MANAGER LOADED — Cards + Pitch Formation System Active");
