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
}

// نمایش اوقات شرعی بر اساس طول و عرض
function showPrayTimes(lat, lon) {
    const pray = new PrayTime('Tehran');
    pray.location([lat, lon]);
    pray.timezone('Asia/Tehran');
    pray.format('24h');

    const times = pray.getTimes(new Date());
    outputDiv.innerHTML = `
        <ul>
            <li>Fajr: ${times.fajr}</li>
            <li>Sunrise: ${times.sunrise}</li>
            <li>Dhuhr: ${times.dhuhr}</li>
            <li>Asr: ${times.asr}</li>
            <li>Sunset: ${times.sunset}</li>
            <li>Maghrib: ${times.maghrib}</li>
            <li>Isha: ${times.isha}</li>
            <li>Midnight: ${times.midnight}</li>
        </ul>
    `;
}
