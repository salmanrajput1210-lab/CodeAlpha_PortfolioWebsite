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
// CONTACT FORM
// No backend on this static site — submitting builds a
// prefilled mailto: link and hands off to the visitor's
// own email client, addressed to Salman.
// ============================================
const CONTACT_EMAIL = 'salmanrajput1210@gmail.com';
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message){
      formStatus.textContent = 'Please fill in your name, email, and a message.';
      formStatus.dataset.state = 'error';
      return;
    }

    const mailSubject = subject || `Portfolio inquiry from ${name}`;
    const mailBody = `${message}\n\n— ${name} (${email})`;
    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoLink;

    formStatus.textContent = 'Opening your email client…';
    formStatus.dataset.state = 'success';
    contactForm.reset();
  });
}

// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
