// PRO FOOTBALL MANAGER
// Game Engine - Version 1.0

let manager = JSON.parse(localStorage.getItem("proManager")) || {
    coins: 10000,
    club: null,
    level: 1
};

function saveGame() {
    localStorage.setItem("proManager", JSON.stringify(manager));
}

function updateWallet() {
    document.querySelector(".wallet span").textContent =
        manager.coins.toLocaleString("en-US");
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

    if (manager.club) {
        title.textContent = manager.club;
        description.textContent = "باشگاه اختصاصی شما";
        button.textContent = "مدیریت باشگاه";
        button.onclick = () => openPage("club");
    }
}

function openPage(page) {

    const pages = {
        team: "بخش مدیریت ترکیب تیم به‌زودی فعال می‌شود ⚽",
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

// Start game

updateWallet();
updateClub();

console.log("PRO FOOTBALL MANAGER LOADED");
