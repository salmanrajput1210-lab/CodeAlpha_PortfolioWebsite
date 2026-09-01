# Salman Rana — Portfolio Website

**CodeAlpha Frontend Development Internship — Task 3**

A personal portfolio site tying together every project from this internship, with a terminal-style hero intro, a fully working contact form, and motion woven through every section — built entirely with vanilla HTML, CSS, and JavaScript (no frameworks).

🔗 **Live Demo:** https://salmanrajput1210-lab.github.io/CodeAlpha_PortfolioWebsite/
💻 **Repo:** https://github.com/salmanrajput1210-lab/CodeAlpha_PortfolioWebsite

---

## Sections

- **Hero** — terminal-style typing intro (`$ whoami`), rotating aura glow and floating animation around the profile photo, plus a subtle 3D tilt that responds as you scroll
- **About** — profile summary with a horizontal row of quick-fact cards (currently studying, shipped work, learning now, languages)
- **Skills** — grouped into Frontend, Backend & Data, and Tools & Other
- **Projects** — all 4 internship projects plus a real freelance client site, each as a premium card with a numbered badge, tech-stack chips, and side-by-side **Live Demo** / **GitHub** buttons
- **Education** — a timeline that visibly draws itself in as you scroll, with pulsing entrance dots
- **Contact** — direct email/phone/LinkedIn/location cards, plus a fully working message form

## Features

**Core**
- Fully responsive, mobile nav with hamburger menu
- Light/dark theme toggle, persisted across visits
- Smooth scroll navigation
- Resume download button (PDF)

**Bonus**
- 🎬 **Motion throughout the page**, not just on load:
  - A thin scroll-progress bar across the top of the page
  - Every section staggers its content in as you scroll to it (not just a single fade)
  - Animated nav-link underlines and button shine-sweep on hover
  - Floating dev-symbol background (`</>`, `{ }`, `git`, `npm`...) behind the Projects section
- 📬 **Working contact form** — client-side validation, then opens the visitor's email client with the message pre-filled (no backend needed, appropriate for a static GitHub Pages site)
- 🔗 Direct links to every other project's live demo and GitHub repo

## Tech Stack

- HTML5
- CSS3 (custom properties, CSS Grid/Flexbox, keyframe animations, `backdrop-filter` — no frameworks)
- Vanilla JavaScript (ES6+), including `IntersectionObserver` for scroll-triggered reveals
- `localStorage` for theme persistence

## Project Structure

```
CodeAlpha_PortfolioWebsite/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── profile-photo.png
    └── Salman_Rana_Resume.pdf
```

## Run It Locally

No build step required — just open `index.html` in a browser, or serve the folder with any static server for the smoothest experience (the contact form's `mailto:` behavior works identically either way).

## Design Notes

The color identity (indigo, amber, cyan) is intentionally distinct from the CV/resume's navy-and-gold branding — the portfolio is meant to feel like a modern developer's site in its own right, not just a digital copy of the résumé. The terminal-typing hero and the dev-symbol background are the two most literal nods to "this is a developer's site."

---

**Author:** Salman Rana — [LinkedIn](https://www.linkedin.com/in/muhammad-salman-rana-b01563285) · Part of the CodeAlpha Frontend Development Internship (4/4 tasks completed)
