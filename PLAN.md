# Portfolio Build Plan

A multi-page static portfolio hosted on GitHub Pages, built phase by phase through feature branches and pull requests so that the development history also earns GitHub profile achievements. Rules and standards live in [`CLAUDE.md`](CLAUDE.md); this file is the roadmap.

## Overview

| | |
|---|---|
| **Stack** | Vanilla HTML5, vanilla CSS (custom properties, no build step), minimal vanilla JS |
| **Hosting** | GitHub Pages, served from `main` branch root (`.nojekyll` so files are served as-is) |
| **Pages** | `index.html`, `projects.html`, `about.html`, `contact.html` |
| **Assets** | `assets/css/` (one stylesheet), `assets/icons/` (SVG), `assets/images/` |
| **Theme** | Dark, high contrast, mobile-first, accessible |

```
MalcolmZyx.github.io/
├── index.html          Landing: bio, featured projects, tech stack, quick links
├── projects.html       Project showcase: YouTube demos, architecture notes, links
├── about.html          Background, goals, career aspirations
├── contact.html        Contact info, social links, resume download
├── assets/
│   ├── css/style.css
│   ├── icons/          Simple Icons / Lucide SVGs
│   └── images/
├── .nojekyll
├── CLAUDE.md
├── PLAN.md
└── README.md
```

## Workflow for every phase

1. **Issue:** open a GitHub issue for the phase (web UI) and note its number `#N`.
2. **Branch:** `git checkout -b feature/<name>` from an up-to-date `main`.
3. **Commit:** small, focused commits. Every commit message ends with:
   ```
   Co-authored-by: Claude <noreply@anthropic.com>
   ```
4. **Push:** `git push -u origin feature/<name>`.
5. **PR:** open a pull request into `main` (web UI) with `Closes #N` in the description.
6. **Merge:** merge the PR, then `git checkout main && git pull` locally.
7. **Check:** confirm the live site at <https://malcolmzyx.github.io> and tick the badge checklist below.

Never commit major changes directly to `main`.

---

## Phase 1: Repo Setup
Branch: `feature/initial-setup`

- [x] Create `feature/initial-setup` branch
- [x] Create `assets/css/`, `assets/icons/`, `assets/images/` (with `.gitkeep` placeholders)
- [x] Add `.nojekyll`
- [x] Write `PLAN.md`; commit `CLAUDE.md`
- [x] Commit with co-author trailer
- [ ] Push branch and open PR #1 (web UI)
- [ ] Merge PR #1
- [ ] Enable Pages: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**
- [ ] Confirm the site URL responds (shows README until `index.html` exists)

## Phase 2: Base Multi-Page Layout
Branch: `feature/base-layout`

- [ ] Shared page shell used by all four pages:
  - `<header>` with site name and `<nav>` (links to all pages, `aria-current="page"` on the active one)
  - Skip link to `<main id="main">`
  - `<footer>` with copyright and social links
- [ ] `assets/css/style.css`:
  - Design tokens on `:root` (colors, spacing, type scale, radii)
  - Dark, high-contrast palette (text ≥ 4.5:1 contrast)
  - Mobile-first layout with breakpoints around 640px and 1024px
  - Responsive nav (collapses to a menu toggle on small screens, minimal JS with `aria-expanded`)
  - Visible `:focus-visible` styles; `prefers-reduced-motion` respected
- [ ] `index.html` content: short bio, 2–3 featured projects, high-level tech stack, quick links
- [ ] Stub `projects.html`, `about.html`, `contact.html` with the shared shell
- [ ] Shared `<head>`: charset, viewport, title, meta description, favicon

## Phase 3: Projects Page with YouTube Embeds & SVG Icons
Branch: `feature/projects-page`

- [ ] One `<article>` per project: title, summary, role, tech stack, architecture notes, links (repo / live / itch.io)
- [ ] YouTube demos, either:
  - `<lite-youtube>` web component (loads the player only on click), **or**
  - `<iframe loading="lazy" title="…">` inside an `aspect-ratio: 16 / 9` wrapper
- [ ] Tech-stack SVG icons from [Simple Icons](https://simpleicons.org) saved in `assets/icons/`; decorative icons get `aria-hidden="true"` next to a visible text label
- [ ] Project screenshots in `assets/images/` with descriptive `alt` text and `loading="lazy"`
- [ ] Featured projects on `index.html` link to their entries on `projects.html`

## Phase 4: About & Contact Pages
Branch: `feature/about-contact`

- [ ] `about.html`: background, education, goals, career aspirations, optional photo (`alt` text)
- [ ] `contact.html`:
  - Email (`mailto:`) and social links (GitHub, LinkedIn, itch.io, YouTube) with [Lucide](https://lucide.dev) / Simple Icons SVGs and `aria-label`s
  - Resume PDF in `assets/` with a download link (`download` attribute)
- [ ] Footer social links reuse the same icons

## Phase 5: Polish & QA (optional)
Branch: `feature/polish`

- [ ] Accessibility pass: keyboard-only navigation, contrast, alt text, heading order
- [ ] Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- [ ] Open Graph / Twitter meta tags and a social preview image
- [ ] Favicon set
- [ ] Update `README.md` with a description and live-site link

### Definition of done (every phase)
- Renders correctly at 375px, 768px, 1024px and 1440px widths
- Fully usable with keyboard only
- No console errors
- Live on GitHub Pages after merge

---

## Badge Acquisition Tracking Checklist

| Badge | Requirement | How this project earns it | Status |
|---|---|---|---|
| **Pull Shark** | 2 merged PRs (Bronze 16, Silver 128) | One PR per phase gives 4–5 merged PRs | [ ] Base (0/2) |
| **YOLO** | Merge a PR without a review | Merge PR #1 ourselves | [ ] |
| **Quickdraw** | Close an issue or PR within 5 minutes of opening it | Open a small issue, then close it within 5 minutes (via a `Closes #N` merge or manually) | [ ] |
| **Pair Extraordinaire** | Co-authored commit in a merged PR (Bronze 10, Silver 24, Gold 48) | Every commit carries the `Co-authored-by` trailer | [ ] Base (0/1) |
| Starstruck | Repo reaches 16 stars | Opportunistic, not in our control | – |
| Galaxy Brain | 2 accepted answers in GitHub Discussions | Out of scope for this repo | – |
| Public Sponsor | Sponsor someone via GitHub Sponsors | Out of scope | – |

> **Pair Extraordinaire caveat:** GitHub only counts a co-author whose email is linked to a GitHub account. Whether `noreply@anthropic.com` qualifies is **unverified**. After PR #1 merges, check the Achievements section of the GitHub profile. If the badge doesn't appear within a day, the fallback is to co-author with a real collaborator's GitHub noreply address (`<ID>+<username>@users.noreply.github.com`, shown on their account's email settings).

### Progress log
| Date | PR / Issue | Badge progress |
|---|---|---|
| | | |
