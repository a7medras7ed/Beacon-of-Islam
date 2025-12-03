/* =====================================================
   ملف الإذاعات — نسخة متوافقة مع المشغل العائم الجديد
===================================================== */

// الإذاعات
const radios = [
    {
        name: "إذاعة القرآن الكريم المصرية",
        url: "https://n08.radiojar.com/8s5u5tpdtwzuv?rj-ttl=5&rj-tok=AAABmuDKyv4Ad1HAzlnL3zv_XA"   // رابط ثابت يعمل دائمًا
    },
    {
        name: "إذاعة القرآن الكريم السعودية",
        url: "https://stream.radiojar.com/4wqre23fytzuv"
    }
];

// العناصر في الصفحة
const radioList = document.getElementById("radio-list");

// هذا المشغل العائم من radios.html
const floatingPlayer = document.getElementById("floating-player");
const floatingAudio = document.getElementById("floating-audio");
const floatingTitle = document.getElementById("floating-title");

// بناء قائمة الإذاعات
radios.forEach(radio => {

    const item = document.createElement("div");
    item.className = "radio-card";
    item.innerHTML = `
        <div class="radio-title">${radio.name}</div>
        <div class="radio-desc">اضغط للتشغيل المباشر</div>
    `;

    // عند الضغط — تشغيل المشغل العائم
    item.onclick = () => {
        floatingTitle.innerText = radio.name;
        floatingAudio.src = radio.url;

        floatingPlayer.style.display = "block";

        // محاولة التشغيل (قد يحتاج المستخدم ضغط تشغيل بسبب المتصفح)
        floatingAudio.play().catch(() => {
            console.log("⚠ تحتاج ضغط تشغيل يدوي.");
        });
    };

    radioList.appendChild(item);
});
