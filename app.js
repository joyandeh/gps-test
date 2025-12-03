if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('Service Worker ثبت شد:', reg);
      }).catch(err => {
        console.log('ثبت Service Worker شکست خورد:', err);
      });
    });
  }
  