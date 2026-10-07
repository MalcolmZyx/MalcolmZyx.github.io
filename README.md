# MalcolmZyx.github.io

Personal portfolio of Malcolm Zartman, live at **https://malcolmzyx.github.io**.

A single scrolling page (Hero, Experience, Skills, Projects, About, Contact) built with plain HTML, CSS and a little JavaScript. No build step: edit a file, commit, and GitHub Pages serves it.

## Folder structure

```
MalcolmZyx.github.io/
├── index.html                   The whole site (all text except projects)
├── 404.html                     "Page not found", and redirects old URLs like /about.html
├── assets/
│   ├── css/style.css            All styling (colors, layout, light and dark mode)
│   ├── data/projects.js         Every project: text, links, videos, extra images
│   ├── js/main.js               Project grid, filters, project panel and carousel
│   ├── files/                   Downloads: malcolm-zartman-resume.pdf
│   ├── icons/
│   │   ├── favicon.svg
│   │   └── tech/                Tool icons used in Skills (from Simple Icons)
│   └── images/
│       ├── profile/             headshot.jpg (original), headshot-400/800.webp (used on the site)
│       ├── projects/            Project covers, extra carousel images, hover previews
│       ├── experience/          Optional company and school logos
│       ├── about/               Optional "Beyond the code" photos
│       └── originals/           Full-size originals kept for reference (not shown)
├── docs/PLAN.md                 Roadmap and GitHub badge tracker
├── CLAUDE.md                    Project rules for Claude Code
└── .nojekyll                    Tells GitHub Pages to serve files as-is
```

## Updating text

| To change | Edit | Where |
|---|---|---|
| Name, one-line summary, quick facts, buttons | `index.html` | `<!-- Hero -->` section |
| Jobs, bullets, tools under each role | `index.html` | `<!-- Experience -->`, one `<li class="employer">` per company and one `<li class="role">` per role |
| Degree and certification | `index.html` | `<div class="credentials">` |
| Additional Experience (teaching, coaching, content, awards) | `index.html` | `<details class="additional">`, one `<li class="extra">` per entry. Dates go in the empty `<span class="role-dates"></span>` |
| Skills | `index.html` | `<!-- Skills -->`, one `<li class="skill">` per skill |
| About text and "Beyond the code" tiles | `index.html` | `<!-- About -->` |
| Email, social links | `index.html` | `<!-- Contact -->` (also in the Hero) |
| Anything about a project | `assets/data/projects.js` | The project's `{ ... }` entry. Order in the file = order on the page |

To add a project, copy an existing entry in `assets/data/projects.js`, give it a new `slug` (lowercase, hyphens), and fill in the fields. The comment at the top of that file explains each field.

## Updating images, videos and files

Most of these need no code changes, just the right file name.

| What | Save as | Notes |
|---|---|---|
| Project cover (grid thumbnail and first carousel slide) | `assets/images/projects/<slug>.jpg` | 16:9, at least 1280×720. Appears automatically |
| Extra carousel images | `assets/images/projects/<slug>-2.jpg`, `-3.jpg`, ... | Also add each to the project's `images` list in `projects.js` with a short description (`alt`) |
| Demo video | YouTube | Add the video ID (the part after `watch?v=`) to the project's `videos` list in `projects.js` |
| Hover preview (optional) | `assets/images/projects/<slug>-preview.mp4` | Silent, under 10 seconds, under 5 MB. Plays when hovering the card |
| Company or school logo | `assets/images/experience/<name>.svg` or `.png` | Replaces the colored monogram automatically. Names used: `healthspaniq`, `villagecore`, `csusm`, `aws`, `thecoderschool`, `master-sports` |
| About photos | `assets/images/about/<name>.jpg` | 4:3. Names used: `athlete`, `trumpet`, `creator`, `reading`, `also` |
| Headshot | `assets/images/profile/` | Replace `headshot-400.webp` and `headshot-800.webp` (square) |
| Resume | `assets/files/malcolm-zartman-resume.pdf` | Keep the same file name so every link keeps working |

Project slugs: `ross`, `ai-engineering-challenge`, `zombie-trail`, `synthetic-data-research`, `project-souls`, `wildfire-predictor`, `constructive-criticism-classifier`, `youtube-performance-analyzer`, `codez-ide`, `financial-data-automation`, `google-ads-sales-analysis`, `tcp-chat-system`, `trench-runner`.

Before uploading photos, remove location data and keep personal details (phone number, address) out of anything public.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly from the file system also works, except the tool icons in Skills.

## Publishing

Changes go through a branch and pull request (see `CLAUDE.md` and `docs/PLAN.md`):

```bash
git checkout -b feature/<name>
# edit, then commit
git push -u origin feature/<name>
```

Open a pull request on GitHub and merge it. The live site updates within a minute or two.
