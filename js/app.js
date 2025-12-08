if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/gps-test/sw.js', { scope: '/gps-test/' })
            .then(reg => console.log('Service Worker ثبت شد:', reg))
            .catch(err => console.log('ثبت Service Worker شکست خورد:', err));
    });
}

const cityBox = document.getElementById('cityBox');
const resultsDiv = document.getElementById('results');
const outputDiv = document.getElementById('output');

// جدید: دکمه و وضعیت
const locBtn = document.getElementById('locBtn');
const statusDiv = document.getElementById('status');

cityBox.addEventListener('input', searchCity);
locBtn && locBtn.addEventListener('click', useGeolocation); // فقط در صورتی که دکمه موجود باشد

// جستجوی شهر و نمایش نتایج
function searchCity() {
    const input = cityBox.value.trim();
    resultsDiv.innerHTML = '';
    if (!input) return;

    const filtered = cities.filter(city => city.name.startsWith(input));

    filtered.forEach(city => {
        const div = document.createElement('div');
        div.textContent = city.name;
        div.onclick = () => selectCity(city);
        resultsDiv.appendChild(div);
    });
}

// انتخاب شهر و نمایش اوقات شرعی
function selectCity(city) {
    cityBox.value = city.name;
    resultsDiv.innerHTML = '';
    showPrayTimes(city.latitude, city.longitude);
    localStorage.setItem('lastCity', JSON.stringify(city));
}

// نمایش اوقات شرعی بر اساس طول و عرض
function showPrayTimes(lat, lon) {
    // پاک کردن پیام‌های وضعیت
    statusDiv.textContent = '';

    // ساخت شیء PrayTime
    const pray = new PrayTime('Tehran');

    // تعیین لوکیشن
    pray.location([lat, lon]);

    // تعیین timezone بر اساس offset دستگاه (ساعت محلی)
    // getTimezoneOffset() => دقیقه اختلاف محلی با UTC (مثلاً -180 برای UTC+3)
    const tzOffsetHours = -new Date().getTimezoneOffset() / 60;
    pray.timezone(tzOffsetHours);

    // فرمت 24 ساعته
    pray.format('24h');

    const times = pray.getTimes(new Date(), [lat, lon], tzOffsetHours);
    outputDiv.innerHTML = `
        <ul dir="rtl" style="text-align: right;">
            <li>اذان صبح: ${times.fajr}</li>
            <li>طلوع آفتاب: ${times.sunrise}</li>
            <li>اذان ظهر: ${times.dhuhr}</li>
            <li>عصر: ${times.asr}</li>
            <li>غروب آفتاب: ${times.sunset}</li>
            <li>اذان مغرب: ${times.maghrib}</li>
            <li>عشاء: ${times.isha}</li>
            <li>نیمه‌شب: ${times.midnight}</li>
        </ul>
    `;
}

// تابعی برای استفاده از Geolocation API
function useGeolocation() {
    if (!('geolocation' in navigator)) {
        statusDiv.textContent = 'موقعیت‌یابی در این مرورگر پشتیبانی نمی‌شود.';
        return;
    }

    // وضعیتِ در حال تلاش
    statusDiv.textContent = 'در حال دریافت موقعیت...';
    locBtn.disabled = true;

    // گزینه‌ها: دقت بالا، timeout و maxAge
    const options = {
        enableHighAccuracy: true,
        timeout: 15000, // 15 ثانیه
        maximumAge: 60000 // 60 ثانیه
    };

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // نمایش مختصات برای کاربر (اختیاری)
            statusDiv.textContent = `مختصات دریافت شد: ${lat.toFixed(6)}, ${lon.toFixed(6)} — نمایش اوقات شرعی...`;

            // نمایش اوقات شرعی بر اساس GPS
            try {
                showPrayTimes(lat, lon);
                // ذخیرهٔ آخرین مختصات به عنوان شهر پیش‌فرض (در صورت نیاز)
                localStorage.setItem('lastCity', JSON.stringify({ name: 'موقعیت فعلی', latitude: lat, longitude: lon }));
            } catch (err) {
                console.error(err);
                statusDiv.textContent = 'خطا در محاسبه اوقات شرعی.';
            }

            locBtn.disabled = false;
        },
        error => {
            console.warn('Geolocation error:', error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    statusDiv.textContent = 'مجوز دسترسی به موقعیت رد شد. لطفاً اجازه بدهید یا تنظیمات مرورگر را بررسی کنید.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    statusDiv.textContent = 'موقعیت در دسترس نیست.';
                    break;
                case error.TIMEOUT:
                    statusDiv.textContent = 'درخواست موقعیت زمان‌تمام شد. دوباره تلاش کنید.';
                    break;
                default:
                    statusDiv.textContent = 'خطای ناشناخته در دریافت موقعیت.';
            }
            locBtn.disabled = false;
        },
        options
    );
}

function initDefaultCity() {
    const lastCity = JSON.parse(localStorage.getItem('lastCity'));
    if (lastCity) {
        // اگر lastCity شامل latitude و longitude باشد، از آن استفاده کن
        if (lastCity.latitude && lastCity.longitude) {
            selectCity(lastCity);
        } else {
            // در غیر اینصورت سعی کن اسم را با cities match کنی
            const match = cities.find(c => c.name === lastCity.name);
            if (match) selectCity(match);
            else if (cities.length > 0) selectCity(cities[0]);
        }
    } else if (cities.length > 0) {
        selectCity(cities[0]);
    }
}

// فراخوانی اولیه
initDefaultCity();
