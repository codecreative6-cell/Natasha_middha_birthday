// ── Slideshow ──────────────────────────
    (function () {
      const imgs = document.querySelectorAll('#slideshow img');
      const dots = document.querySelectorAll('#dots .slide-dot');
      let current = 0;
      let timer = null;

      function goTo(n) {
        imgs[current].classList.remove('active');
        dots[current].classList.remove('on');
        current = (n + imgs.length) % imgs.length;
        imgs[current].classList.add('active');
        dots[current].classList.add('on');
      }

      function next() { goTo(current + 1); }

      timer = setInterval(next, 4000);

      dots.forEach((d, i) => {
        d.addEventListener('click', () => { clearInterval(timer); goTo(i); timer = setInterval(next, 4000); });
      });
    })();

    // ── Gallery IntersectionObserver ───────
    (function () {
      const items = document.querySelectorAll('.g-item');
      if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.15 });
      items.forEach(el => io.observe(el));
    })();

    // ── All Memories Render ──────────────────
    (function () {
      const container = document.getElementById('all-memories');
      if (!container) return;
      const messages = [
        "A smile that lights up the world 💖",
        "Pure elegance 🌹",
        "Captivating beauty ✨",
        "Endless charm 🌸",
        "Grace in every step 💃",
        "Radiating joy 😊",
        "A heart of gold 💛",
        "Absolutely stunning 👑",
        "Effortlessly perfect 💫",
        "A vision of loveliness 🦋",
        "Breathtaking as always 🌟",
        "Simply mesmerizing 🥂"
      ];
      let html = '';
      // Use all available images from 9 to 42
      for (let i = 9; i <= 42; i++) {
        const msg = messages[i % messages.length];
        html += `
        <div class="memory-card">
          <img src="img/img1 (${i}).jpg" alt="Memory ${i}" loading="lazy">
          <div class="memory-msg">${msg}</div>
        </div>
      `;
      }
      container.innerHTML = html;
    })();

    // ── Floating Emojis & Lights ─────────────
    (function () {
      const bg = document.getElementById('floating-bg');
      if (!bg) return;
      const emojis = ['✨', '💖', '🌹', '👑', '💫', '🥂'];

      function spawnElement() {
        const el = document.createElement('div');
        const isEmoji = Math.random() > 0.4;
        el.classList.add('float-item');

        if (isEmoji) {
          el.classList.add('float-emoji');
          el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        } else {
          el.classList.add('float-light');
        }

        // Randomize position, size, duration, delay
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 15; // 10s to 25s
        const delay = Math.random() * 5;
        const size = isEmoji ? (20 + Math.random() * 20) : (4 + Math.random() * 6);

        el.style.left = left + 'vw';
        el.style.animationDuration = duration + 's' + (isEmoji ? '' : `, ${1 + Math.random()}s`);
        el.style.animationDelay = delay + 's';
        if (isEmoji) {
          el.style.fontSize = size + 'px';
        } else {
          el.style.width = size + 'px';
          el.style.height = size + 'px';
        }

        bg.appendChild(el);

        // Clean up after animation ends
        setTimeout(() => {
          if (bg.contains(el)) bg.removeChild(el);
        }, (duration + delay) * 1000);
      }

      // Spawn initial batch
      for (let i = 0; i < 20; i++) spawnElement();

      // Continuously spawn
      setInterval(spawnElement, 800);
    })();

    // ── Loading Screen Logic 
    document.addEventListener('DOMContentLoaded', () => {
      const enterBtn = document.getElementById('enter-btn');
      const loadingScreen = document.getElementById('loading-screen');
      
      const bgAudio = new Audio('aaaa.mp3');
      bgAudio.loop = true;

      document.body.style.overflow = 'hidden';

      enterBtn.addEventListener('click', () => {
        bgAudio.play().catch(e => console.error("Audio playback failed:", e));
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });
    });