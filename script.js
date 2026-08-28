// ============================================
// TERMINAL TYPING EFFECT
// ============================================
const terminalEl = document.getElementById('terminal');
const terminalLines = [
  '$ whoami',
  'Salman Rana — Front-End Developer',
];

function typeTerminal(){
  let lineIndex = 0;
  let charIndex = 0;
  terminalEl.textContent = '';

  function step(){
    const line = terminalLines[lineIndex];
    if (charIndex <= line.length){
      terminalEl.textContent = line.slice(0, charIndex);
      charIndex++;
      setTimeout(step, lineIndex === 0 ? 55 : 30);
    } else if (lineIndex < terminalLines.length - 1){
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 400);
    }
  }
  step();
}
typeTerminal();

// ============================================
// SCROLL REVEAL
// ============================================
const revealTargets = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// MOBILE NAV
// ============================================
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// THEME TOGGLE
// Saved to localStorage — this page runs in the visitor's
// own browser, so the preference persists across visits.
// ============================================
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme){
  if (theme === 'light'){
    document.body.dataset.theme = 'light';
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    delete document.body.dataset.theme;
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
  }
}

themeToggle.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
});

try { applyTheme(localStorage.getItem(THEME_KEY) || 'dark'); }
catch { applyTheme('dark'); }

// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// CONTACT FORM
// This is a static GitHub Pages site with no backend, so submitting
// opens the visitor's own email client with the message pre-filled —
// honest and fully working with zero external services required.
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message){
      formStatus.textContent = 'Please fill in your name, email, and message.';
      formStatus.className = 'form-status is-error';
      return;
    }
    if (!emailPattern.test(email)){
      formStatus.textContent = "That email address doesn't look quite right.";
      formStatus.className = 'form-status is-error';
      return;
    }

    const mailSubject = encodeURIComponent(subject || `Portfolio inquiry from ${name}`);
    const mailBody = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:salmanrajput1210@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    formStatus.textContent = 'Opening your email client to send this...';
    formStatus.className = 'form-status is-success';
  });
}

// ============================================
// HERO PHOTO — scroll-linked 3D tilt
// A continuous, honest motion effect: the whole photo (ring + image)
// tilts subtly in 3D as the page scrolls, on top of the CSS-driven
// floating bob and rotating aura glow (see style.css). This never
// alters or animates the photo's actual content — just the framing.
// Respects prefers-reduced-motion.
// ============================================
const heroPhotoWrap = document.getElementById('heroPhotoWrap');
const heroPhotoEl = heroPhotoWrap ? heroPhotoWrap.querySelector('.hero-photo') : null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroPhotoEl && !prefersReducedMotion){
  let tiltTicking = false;

  function updateTilt(){
    const rect = heroPhotoWrap.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const distance = (elementCenter - viewportCenter) / viewportCenter;
    const clamped = Math.max(-1, Math.min(1, distance));

    const rotateY = clamped * 10;   // turns gently left/right with scroll
    const rotateX = clamped * -5;   // slight complementary up/down tilt

    heroPhotoEl.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    tiltTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!tiltTicking){
      requestAnimationFrame(updateTilt);
      tiltTicking = true;
    }
  }, { passive: true });

  updateTilt();
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

if (scrollProgress){
  let progressTicking = false;

  function updateScrollProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    progressTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!progressTicking){
      requestAnimationFrame(updateScrollProgress);
      progressTicking = true;
    }
  }, { passive: true });

  updateScrollProgress();
}
