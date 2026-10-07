# Portfolio Build Plan

A one-page static portfolio hosted on GitHub Pages, built through feature branches and pull requests so that the development history also earns GitHub profile achievements. Rules and standards live in [`CLAUDE.md`](CLAUDE.md); this file is the roadmap.

## Overview

| | |
|---|---|
| **Stack** | Vanilla HTML5, vanilla CSS (custom properties, no build step), small vanilla JS |
| **Hosting** | GitHub Pages, served from `main` branch root (`.nojekyll` so files are served as-is) |
| **Page** | `index.html`, one scrolling page: Hero, Experience, Skills, Projects, About, Contact |
| **Design** | YouTube-familiar system: Roboto, neutral grays, pill buttons, 16:9 thumbnails, filter chips. Dark by default, light when the visitor's system prefers it |

```
MalcolmZyx.github.io/
├── index.html          The whole site
├── 404.html            Not-found page; redirects old /about.html, /contact.html, /projects.html
├── assets/
│   ├── css/            style.css
│   ├── data/           projects.js (project content)
│   ├── js/             main.js (grid, filters, project panel, carousel)
│   ├── files/          resume PDF
│   ├── icons/          favicon.svg, tech/ (Skills icons)
│   └── images/         profile/, projects/, experience/, about/, originals/
├── docs/PLAN.md        This file
├── CLAUDE.md
└── README.md           How to update text and assets
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
- [x] Push branch and open the first PR (web UI) — PR #2
- [x] Merge the first PR
- [x] Enable Pages: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**
- [x] Confirm the site URL responds

## Phase 2: Base Multi-Page Layout
Branch: `feature/base-layout`

- [x] Shared page shell used by all four pages:
  - `<header>` with site name and `<nav>` (links to all pages, `aria-current="page"` on the active one)
  - Skip link to `<main id="main">`
  - `<footer>` with copyright and social links
- [x] `assets/css/style.css`:
  - Design tokens on `:root` (colors, spacing, type scale, radii)
  - Dark, high-contrast palette (text ≥ 4.5:1 contrast)
  - Mobile-first layout with breakpoints around 640px and 1024px
  - Responsive nav: four links fit at 375px, so it wraps under the site name instead of using a JS menu toggle
  - Visible `:focus-visible` styles; `prefers-reduced-motion` respected
- [x] `index.html` content: short bio, 3 featured projects, tech stack, quick links (bio and stack marked `TODO(Malcolm)` for review)
- [x] Stub `projects.html`, `about.html`, `contact.html` with the shared shell
- [x] Shared `<head>`: charset, viewport, title, meta description, favicon (`assets/icons/favicon.svg`)

## Phase 3: Content update
Branch: `feature/content-update`

- [x] Bio and skills rewritten from LinkedIn, GitHub and resume
- [x] Email, LinkedIn and itch.io links published

## Phase 4: One-page redesign
Branch: `feature/redesign`

- [x] YouTube-inspired design system (chosen from three mockups)
- [x] Hero: headshot, one-sentence summary, key facts, Email / LinkedIn / GitHub, Resume in the masthead
- [x] Experience (right after the hero): employers with grouped roles, metrics first, "Show more" for full bullets, education and AWS certification cards
- [x] Skills: six groups with Simple Icons where available
- [x] Projects: filterable grid driven by `assets/js/projects.js`, result badges on thumbnails
- [x] Project panel (`<dialog>`): media carousel (videos and images), details, previous/next, "More projects", shareable `#slug` links, Back button closes it
- [x] About: short bio plus "Beyond the code" tiles with optional photos
- [x] Contact footer
- [x] Old pages redirect to their new sections (now handled by `404.html`)
- [ ] Add project thumbnails, extra carousel images and demo videos as they're ready
- [ ] Optional: company logos and About photos

## Phase 5: Additions and cleanup
Branch: `feature/additions-and-cleanup`

- [x] Red ring around the headshot
- [x] Expandable Additional Experience (teaching, coaching, content creation, awards)
- [x] Degree extracurriculars: ICPC, Game Development Club, Google Developer Club
- [x] Projects: ROSS (1st place) first, AI Engineering Challenge, Zombie Trail
- [x] Repo reorganized into folders; README documents how to update everything

## Phase 6: Polish & QA
Branch: `feature/polish`

- [ ] Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- [ ] Social preview image (1200x630) for link sharing

### Definition of done (every phase)
- Renders correctly at 375px, 768px, 1024px and 1440px widths
- Fully usable with keyboard only
- No console errors
- Live on GitHub Pages after merge

---

## Badge Acquisition Tracking Checklist

| Badge | Requirement | How this project earns it | Status |
|---|---|---|---|
| **Pull Shark** | 2 merged PRs (Bronze 16, Silver 128) | One PR per phase gives 4–5 merged PRs | [x] Base (2/2), PRs #2 and #4; awaiting badge |
| **YOLO** | Merge a PR without a review | Merge the first PR ourselves | [x] Earned |
| **Quickdraw** | Close an issue or PR within 5 minutes of opening it | Open a small issue, then close it within 5 minutes (via a `Closes #N` merge or manually) | [x] Earned |
| **Pair Extraordinaire** | Co-authored commit in a merged PR (Bronze 10, Silver 24, Gold 48) | Every commit carries the `Co-authored-by` trailer | [x] Base (1/1); awaiting badge |
| Starstruck | Repo reaches 16 stars | Opportunistic, not in our control | – |
| Galaxy Brain | 2 accepted answers in GitHub Discussions | Out of scope for this repo | – |
| Public Sponsor | Sponsor someone via GitHub Sponsors | Out of scope | – |

> **Pair Extraordinaire caveat:** GitHub only counts a co-author whose email is linked to a GitHub account. GitHub resolves `noreply@anthropic.com` to the `claude` account (verified on this repo's commit pages), so co-authored commits should count; count-based badges can take days to appear. If it never shows up, the fallback is to co-author with a real collaborator's GitHub noreply address (`<ID>+<username>@users.noreply.github.com`, shown on their account's email settings).

### Progress log
| Date | PR / Issue | Badge progress |
|---|---|---|
| 2026-10-06 | Issue #1, PR #2 | YOLO, Quickdraw |
| 2026-10-06 | Issue #3, PR #4 | Pull Shark and Pair Extraordinaire requirements met |
