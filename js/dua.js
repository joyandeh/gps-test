// متن دعاها — اینجا متن کامل را جایگزین کن
const DUAS = {
  tawassul: {
    title: "دعاى توسل",
    text: `اللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ مُحَمَّدٍ وَآلِهِ
(متن نمونه — متن کامل را اینجا بگذارید)`
  },
  ahd: {
    title: "دعای عهد",
    text: `اَلْعَهْدُ وَالْبَیْنَةُ عَلَیْکُمْ...
(متن نمونه — متن کامل را اینجا بگذارید)`
  },
  ziyara: {
    title: "زیارت عاشورا",
    text: `اَلسَّلامُ عَلَیْكَ یا اَباعَبْدِاللهِ...
(متن نمونه — متن کامل را اینجا بگذارید)`
  }
};

// انتخاب عناصر DOM
const modal = document.getElementById('duaModal');
const backdrop = document.getElementById('duaBackdrop');
const duaContent = document.getElementById('duaContent');
const duaTitle = document.getElementById('duaTitle');
const closeBtn = document.getElementById('closeDua');

// باز کردن پنل با کلیک روی دکمه‌ها
document.querySelectorAll('.dua-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.dua;
    const dua = DUAS[key];
    if (!dua) return;
    duaTitle.textContent = dua.title;
    duaContent.textContent = dua.text;
    openModal();
  });
});

// تابع برای باز کردن پنل
function openModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  // فوکوس برای دسترسی
  setTimeout(() => duaContent.focus(), 120);
}

// تابع برای بستن پنل
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// بستن پنل با کلیک روی پس‌زمینه
backdrop.addEventListener('click', closeModal);

// بستن پنل با کلیک روی دکمه بستن
closeBtn.addEventListener('click', closeModal);

// بستن پنل با کلید Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
