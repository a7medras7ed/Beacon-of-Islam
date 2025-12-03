/* ====================================================
   ملف تجميع موسوعة الأذكار الكامل
   هذا الملف يجمع جميع ملفات الأذكار في كائن واحد
   ليتم استخدامه داخل all_azkar.html
==================================================== */

const fullAzkar = {

    "أذكار الصباح": fullAzkar_morning,
    "أذكار المساء": fullAzkar_evening,
    "أذكار النوم": fullAzkar_sleep,
    "أذكار الاستيقاظ": fullAzkar_waking,
    "أذكار بعد الصلاة": fullAzkar_prayer,
    "التسابيح": fullAzkar_tasbeeh,
    "الرقية الشرعية": fullAzkar_ruqya,
    "أذكار المسجد": fullAzkar_mosque,
    "أذكار الخوف والقلق": fullAzkar_fear

};

/* ====================================================
   ملاحظة مهمة:
   تأكد أن هذه الملفات موجودة في نفس المجلد:
   fullAzkar_morning.js
   fullAzkar_evening.js
   fullAzkar_sleep.js
   fullAzkar_waking.js
   fullAzkar_prayer.js
   fullAzkar_tasbeeh.js
   fullAzkar_ruqya.js
   fullAzkar_mosque.js
   fullAzkar_fear.js

   وأن ترتيب التحميل داخل all_azkar.html يكون:

   <script src="fullAzkar_morning.js"></script>
   <script src="fullAzkar_evening.js"></script>
   <script src="fullAzkar_sleep.js"></script>
   <script src="fullAzkar_waking.js"></script>
   <script src="fullAzkar_prayer.js"></script>
   <script src="fullAzkar_tasbeeh.js"></script>
   <script src="fullAzkar_ruqya.js"></script>
   <script src="fullAzkar_mosque.js"></script>
   <script src="fullAzkar_fear.js"></script>

   وأخيرًا:
   <script src="fullAzkar.js"></script>
==================================================== */
