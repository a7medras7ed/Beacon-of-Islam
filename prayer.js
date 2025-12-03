// =================== صور الأذان ===================
const adhanImages = {
    "الفجر": "adhan_fajr.png",
    "الظهر": "adhan_duhr.png",
    "العصر": "adhan_asr.png",
    "المغرب": "adhan_maghrib.png",
    "العشاء": "adhan_isha.png"
};

// ملف الصوت
const adhanSound = "adhan.mp3";

// إيقاف التكرار
let adhanPlayed = false;

// =================== جلب الموقع ===================
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    document.getElementById("location").innerText = "المتصفح لا يدعم تحديد الموقع";
}

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    document.getElementById("location").innerText =
        `خط العرض: ${lat.toFixed(3)} - خط الطول: ${lon.toFixed(3)}`;

    getPrayerTimes(lat, lon);
}

function error() {
    document.getElementById("location").innerText =
        "⚠ لم يتم السماح بالوصول للموقع";
}

// =================== API مواعيد الصلاة ===================
function getPrayerTimes(lat, lon) {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`)
        .then(res => res.json())
        .then(data => {
            let t = data.data.timings;

            const cards = [
                { name: "الفجر", time: t.Fajr },
                { name: "الشروق", time: t.Sunrise },
                { name: "الظهر", time: t.Dhuhr },
                { name: "العصر", time: t.Asr },
                { name: "المغرب", time: t.Maghrib },
                { name: "العشاء", time: t.Isha }
            ];

            let html = "";
            cards.forEach(c => {
                html += `
                    <div class="prayer-card" id="card-${c.name}">
                        <h3>${c.name}</h3>
                        <p>${c.time}</p>
                    </div>
                `;
            });

            document.getElementById("prayerGrid").innerHTML = html;

            startCountdown(t);
        });
}

// =================== Popup فتح وإغلاق ===================
function openAdhanPopup(prayerName) {
    const popup = document.getElementById("adhanPopup");
    const img = document.getElementById("adhanImage");
    const audio = document.getElementById("adhanAudio");

    img.src = adhanImages[prayerName];    // الصورة
    audio.src = adhanSound;               // الصوت
    audio.play().catch(()=>{});           // تشغيل الصوت

    popup.style.display = "flex";
    adhanPlayed = true;
}

function closeAdhanPopup() {
    const popup = document.getElementById("adhanPopup");
    const audio = document.getElementById("adhanAudio");

    popup.style.display = "none";
    audio.pause();
}

// =================== العد التنازلي وإطلاق الأذان ===================
function startCountdown(timings) {
    setInterval(() => {
        let now = new Date();

        let nextPrayerTime = null;
        let nextPrayerName = "";

        const order = [
            ["الفجر", timings.Fajr],
            ["الظهر", timings.Dhuhr],
            ["العصر", timings.Asr],
            ["المغرب", timings.Maghrib],
            ["العشاء", timings.Isha]
        ];

        // إزالة التمييز من جميع البطاقات
        document.querySelectorAll(".prayer-card").forEach(c => {
            c.classList.remove("next-prayer");
        });

        // تحديد الصلاة القادمة
        for (let p of order) {
            let [name, time] = p;
            let prayerDate = new Date();
            let [h, m] = time.split(":");
            prayerDate.setHours(h, m, 0);

            if (prayerDate > now) {
                nextPrayerTime = prayerDate;
                nextPrayerName = name;
                break;
            }
        }

        // لو مفيش صلاة متبقية → صلاة الفجر غدًا
        if (!nextPrayerTime) {
            nextPrayerTime = new Date();
            nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
            let [h, m] = timings.Fajr.split(":");
            nextPrayerTime.setHours(h, m, 0);
            nextPrayerName = "الفجر";
        }

        // تمييز البطاقة
        const nextCard = document.getElementById(`card-${nextPrayerName}`);
        if (nextCard) nextCard.classList.add("next-prayer");

        // 🔥 تشغيل الأذان وقت الصلاة
        let nowString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

        if (nowString === timings[nextPrayerName] && !adhanPlayed) {
            openAdhanPopup(nextPrayerName);
        }

        // إعادة السماح بالتشغيل بعد الدقيقة
        if (nowString !== timings[nextPrayerName]) {
            adhanPlayed = false;
        }

        // العدّ التنازلي
        let diff = nextPrayerTime - now;
        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText =
            `${nextPrayerName} بعد: ${hours}:${minutes}:${seconds}`;
    }, 1000);
}
