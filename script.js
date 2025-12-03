// =======================
// Dark Mode
// =======================
function toggleMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("mode", document.body.classList.contains("dark") ? "dark" : "light");
}

// استرجاع الوضع من التخزين
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
}

// =======================
// Clock 12h  (يعمل فقط لو العنصر موجود)
// =======================
function updateClock() {
    const el = document.getElementById("clock");
    if (!el) return;

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;
    m = m.toString().padStart(2, "0");

    el.innerText = `${h}:${m} ${ampm}`;
}

if (document.getElementById("clock")) {
    setInterval(updateClock, 1000);
    updateClock();
}

// =======================
// Gregorian Date (لو العنصر موجود)
// =======================
const g = document.getElementById("todayGregorian");
if (g) {
    g.innerText = new Date().toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// =======================
// Hijri Date (لو العنصر موجود)
// =======================
const hEl = document.getElementById("todayHijri");
if (hEl) {
    let h = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date());
    hEl.innerText = h;
}

// =======================
// Ayah of the Day (لو العنصر موجود)
// =======================
const ayahEl = document.getElementById("ayahText");
if (ayahEl) {
    const ayat = [
        "﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾",
        "﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾",
        "﴿ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ﴾",
        "﴿ قُلْ لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا ﴾",
        "﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾"
    ];
    ayahEl.innerText = ayat[Math.floor(Math.random() * ayat.length)];
}

// =======================
// Hadith of the Day (لو العنصر موجود)
// =======================
const hadithEl = document.getElementById("hadithText");
if (hadithEl) {
    const ahadith = [
        "قال ﷺ: «خيركم من تعلم القرآن وعلّمه».",
        "قال ﷺ: «الدال على الخير كفاعله».",
        "قال ﷺ: «لا تحقرن من المعروف شيئًا ولو أن تلقى أخاك بوجه طلق».",
        "قال ﷺ: «من سلك طريقًا يلتمس فيه علمًا سهّل الله له به طريقًا إلى الجنة».",
        "قال ﷺ: «اتق الله حيثما كنت»."
    ];
    hadithEl.innerText = ahadith[Math.floor(Math.random() * ahadith.length)];
}
