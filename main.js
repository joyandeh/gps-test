// فرض می‌کنیم praytime.js کنار main.js قرار دارد و به صورت ES Module آماده است
import { PrayTime } from './praytime.js';

// ساخت نمونه از کلاس
const pray = new PrayTime('Tehran');

// تنظیم موقعیت تهران
pray.location([35.6892, 51.3890]);

// تنظیم منطقه زمانی
pray.timezone('Asia/Tehran');

// فرمت خروجی 24 ساعته
pray.format('24h');

// دریافت زمان‌های نماز امروز
const times = pray.getTimes(new Date());

// نمایش اوقات شرعی در صفحه
const outputDiv = document.getElementById('output');
outputDiv.innerHTML = `
    <ul>
        <li>Fajr: ${times.fajr}</li>
        <li>Dhuhr: ${times.dhuhr}</li>
        <li>Asr: ${times.asr}</li>
        <li>Maghrib: ${times.maghrib}</li>
        <li>Isha: ${times.isha}</li>
    </ul>
`;
