# Portfolio Development & Badge Sprint Rules

## Project Goal
Build a clean, responsive, multi-page static portfolio hosted on GitHub Pages while earning as many GitHub Profile Achievements/Badges as possible.

## Tech Stack & Architecture
- **Tech Stack:** Vanilla HTML5, Modern CSS (or Tailwind CSS), and minimal Vanilla JS.
- **Hosting:** GitHub Pages (`main` branch root or `/docs`).
- **Media Strategy:** 
  - Standard images (`loading="lazy"`).
  - YouTube video embeds for project demos (using `<lite-youtube>` or responsive `<iframe>` tags).
  - SVG icons from Simple Icons / Lucide for tech stacks and contact links.
- **Structure:**
  - `index.html` (Main Landing Page: Bio, Featured Projects, High-level Tech Stack, Quick Links)
  - `projects.html` (Detailed Project Showcase with YouTube demos, architecture notes, links)
  - `about.html` (In-depth Background, Goals, Career Aspirations)
  - `contact.html` (Contact Info, Social Links, Resume Download)
  - `assets/` (Images, icons, stylesheet)

## GitHub Badge Strategy (Gamification Rules)
Whenever we implement a feature or update (tell me to):
1. **Never commit directly to `main` for major changes.**
2. **Branch & PR Workflow:** Always create a feature branch (`git checkout -b feature/<name>`), make commits, open a Pull Request, and merge it back to `main` to trigger achievements like **Pull Shark**.
3. **Co-Authored Commits:** Format commit messages with co-author credits to progress toward **Pair Extraordinaire**:
   `Co-authored-by: Claude <noreply@anthropic.com>`
4. **Issue Tracking:** Create GitHub Issues for tasks and resolve them via PRs/commits within 5 minutes when possible to trigger **Quickdraw**.

## Code & Design Standards
- Clean, semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Fully mobile-responsive layout.
- High contrast, dark-mode preferred theme.
- Accessible (`aria-labels`, image `alt` texts).