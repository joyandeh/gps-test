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

cityBox.addEventListener('input', searchCity);

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
    const pray = new PrayTime('Tehran');
    pray.location([lat, lon]);
    pray.timezone('Asia/Tehran');
    pray.format('24h');

    const times = pray.getTimes(new Date());
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







