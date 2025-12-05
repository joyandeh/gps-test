let cities = [];

// خواندن CSV و تبدیل به آرایه اشیاء
fetch("cities.csv")
    .then(res => res.text())
    .then(parseCSV)
    .catch(err => console.error("خطا در خواندن CSV:", err));

function parseCSV(text) {
    const lines = text.trim().split('\n').slice(1); // حذف header
    cities = lines.map(line => {
        const values = line.split(',').map(v => v.trim());
        return {
            name: values[2],
            latitude: parseFloat(values[3]),
            longitude: parseFloat(values[4])
        };
    });
}

