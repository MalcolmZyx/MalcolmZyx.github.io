/* Portfolio interactions: project grid, filters, project panel with carousel,
   shareable project links (#<slug>), hover previews and nav highlighting.
   Project data lives in projects.js. */
(() => {
  "use strict";

  const projects = window.PROJECTS || [];
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const IMG_DIR = "assets/images/projects/";
  const CATS = [
    ["all", "All"],
    ["ml", "Machine learning"],
    ["data", "Data and analytics"],
    ["software", "Software"],
    ["games", "Games"]
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    photos: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H8V4h12v12zm-7.5-3.5 2.25 2.7L17.5 11l3.5 5H7l3.5-4.5 2 2.5z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7z"/></svg>'
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const year = (p) => (p.dates.match(/\d{4}/g) || []).pop() || "";
  const mediaCount = (p) => (p.videos || []).length + (p.images || []).length + 1;

  /* Thumbnail: local cover, then YouTube thumbnail, then a color tile underneath. */
  function thumbHTML(p) {
    const yt = p.videos && p.videos[0] ? ` data-youtube="${esc(p.videos[0])}"` : "";
    const isVideo = Boolean(p.videos && p.videos.length);
    const badge = p.badge
      ? `<span class="thumb-badge">${isVideo && p.badge === "Demo" ? ICON.play : ""}${esc(p.badge)}</span>`
      : "";
    const extra = (p.videos || []).length + (p.images || []).length;
    const count = extra > 0 && !(isVideo && extra === 1)
      ? `<span class="thumb-count">${ICON.photos}${mediaCount(p)}</span>`
      : "";
    return `<span class="thumb"><span class="thumb-art ${esc(p.cat)}" aria-hidden="true">${esc(p.title)}</span>` +
      `<img src="${IMG_DIR}${esc(p.slug)}.jpg" alt="" loading="lazy" decoding="async"${yt} data-fallback>` +
      `${badge}${count}</span>`;
  }

  /* Image fallback chain, handled once for the whole document. */
  function handleBrokenImage(img) {
    if (img.closest(".logo")) {
      // Experience logos: SVG, then PNG, then the monogram underneath.
      if (/\.svg$/.test(img.src)) img.src = img.src.replace(/\.svg$/, ".png");
      else img.remove();
      return;
    }
    if (img.hasAttribute("data-optional")) return img.remove();
    if (!img.hasAttribute("data-fallback")) return;
    const yt = img.dataset.youtube;
    if (yt && !img.dataset.triedYoutube) {
      img.dataset.triedYoutube = "1";
      img.src = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
    } else if (img.closest(".slide")) {
      removeSlide(img.closest(".slide"));
    } else {
      img.remove();
    }
  }
  document.addEventListener("error", (e) => {
    if (e.target instanceof HTMLImageElement) handleBrokenImage(e.target);
  }, true);
  // Images that failed before this script ran (recorded by the inline script in <head>).
  (window.__brokenImgs || []).forEach(handleBrokenImage);
  window.__brokenImgs = [];

  /* ---------- Grid ---------- */
  const grid = document.getElementById("project-grid");
  const chipBar = document.getElementById("project-filters");

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = projects.map((p) =>
      `<li class="card" data-cat="${esc(p.cat)}">` +
        `<a class="card-link" href="#${esc(p.slug)}" data-open="${esc(p.slug)}" aria-haspopup="dialog">` +
          thumbHTML(p) +
          `<span class="card-body"><h3>${esc(p.title)}</h3>` +
          `<p class="meta">${esc(p.kind)}, ${esc(year(p))}</p>` +
          `<p class="summary">${esc(p.summary)}</p></span>` +
        `</a>` +
      `</li>`
    ).join("");
  }

  function renderChips() {
    if (!chipBar) return;
    chipBar.innerHTML = CATS.map(([key, label], i) =>
      `<li><button class="chip" type="button" data-cat="${key}" aria-pressed="${i === 0}">${label}</button></li>`
    ).join("");
    chipBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      chipBar.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      grid.querySelectorAll(".card").forEach((card) => {
        card.hidden = chip.dataset.cat !== "all" && card.dataset.cat !== chip.dataset.cat;
      });
    });
  }

  /* Hover preview: plays <slug>-preview.mp4 if it exists. */
  function enableHoverPreviews() {
    if (!grid || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    const missing = new Set();
    grid.addEventListener("mouseover", (e) => {
      const link = e.target.closest(".card-link");
      if (!link || link.querySelector("video")) return;
      const slug = link.dataset.open;
      if (missing.has(slug)) return;
      const video = document.createElement("video");
      Object.assign(video, { muted: true, loop: true, playsInline: true, autoplay: true });
      video.setAttribute("aria-hidden", "true");
      video.src = `${IMG_DIR}${slug}-preview.mp4`;
      video.addEventListener("error", () => { missing.add(slug); video.remove(); });
      link.querySelector(".thumb").insertBefore(video, link.querySelector(".thumb-badge, .thumb-count"));
    });
    grid.addEventListener("mouseout", (e) => {
      const link = e.target.closest(".card-link");
      if (!link || link.contains(e.relatedTarget)) return;
      const video = link.querySelector("video");
      if (video) video.remove();
    });
  }

  /* ---------- Project dialog ---------- */
  const dialog = document.getElementById("project-dialog");
  const body = document.getElementById("project-dialog-body");
  let current = null;
  let openedViaHash = false;

  function slidesFor(p) {
    const slides = [];
    (p.videos || []).forEach((id, i) => slides.push({ type: "video", id, label: `Video ${i + 1}` }));
    slides.push({ type: "image", src: `${IMG_DIR}${p.slug}.jpg`, alt: p.coverAlt || `${p.title} cover image`, cover: true });
    (p.images || []).forEach((img) => slides.push({ type: "image", src: IMG_DIR + img.src, alt: img.alt || "" }));
    return slides;
  }

  function slideHTML(s, p) {
    if (s.type === "video") {
      return `<li class="slide" data-video="${esc(s.id)}"><button class="play-button" type="button" aria-label="Play ${esc(p.title)} video">` +
        `<img src="https://i.ytimg.com/vi/${esc(s.id)}/maxresdefault.jpg" alt="" data-fallback data-youtube="${esc(s.id)}">` +
        `<span class="play-icon">${ICON.play.replace('fill="currentColor"', 'fill="#fff" width="28" height="28"')}</span></button></li>`;
    }
    return `<li class="slide"><img src="${esc(s.src)}" alt="${esc(s.alt)}" data-fallback></li>`;
  }

  function stripHTML(s, i) {
    const img = s.type === "video" ? `https://i.ytimg.com/vi/${esc(s.id)}/mqdefault.jpg` : esc(s.src);
    const play = s.type === "video" ? `<span class="strip-play">${ICON.play}</span>` : "";
    const label = s.type === "video" ? s.label : `Image ${i + 1}`;
    return `<li><button type="button" data-slide="${i}" aria-label="Show ${esc(label)}"><img src="${img}" alt="">${play}</button></li>`;
  }

  function listHTML(items, cls) {
    return items && items.length ? `<ul class="${cls || ""}">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
  }

  function renderProject(p) {
    const slides = slidesFor(p);
    const idx = projects.indexOf(p);
    const prev = projects[(idx - 1 + projects.length) % projects.length];
    const next = projects[(idx + 1) % projects.length];
    const links = (p.links || []).map((l) =>
      `<li><a class="pill" href="${esc(l.href)}" target="_blank" rel="noopener">${ICON.external}${esc(l.label)}</a></li>`
    ).join("");
    const others = projects.filter((o) => o !== p).map((o) =>
      `<li><a class="compact" href="#${esc(o.slug)}" data-open="${esc(o.slug)}">${thumbHTML(o)}` +
      `<span><h4>${esc(o.title)}</h4><p class="meta">${esc(o.kind)}, ${esc(year(o))}</p>` +
      `${o.badge && o.badge !== "Demo" ? `<p class="meta">${esc(o.badge)}</p>` : ""}</span></a></li>`
    ).join("");

    body.innerHTML =
      `<div class="dialog-layout">` +
        `<div class="dialog-main">` +
          `<div class="carousel" aria-roledescription="carousel" aria-label="${esc(p.title)} media">` +
            `<ul class="carousel-track" tabindex="0" aria-label="Slides, use arrow keys to move between them" style="padding:0;list-style:none">` +
              slides.map((s) => slideHTML(s, p)).join("") +
            `</ul>` +
            `<button class="carousel-btn carousel-prev" type="button" aria-label="Previous image">${ICON.prev}</button>` +
            `<button class="carousel-btn carousel-next" type="button" aria-label="Next image">${ICON.next}</button>` +
          `</div>` +
          `<ul class="carousel-strip">${slides.map(stripHTML).join("")}</ul>` +
          `<p class="carousel-status" aria-live="polite"></p>` +
          `<div class="project-title-row"><h2 id="project-dialog-title" tabindex="-1">${esc(p.title)}</h2>` +
            `${p.badge && p.badge !== "Demo" ? `<span class="result">${esc(p.badge)}</span>` : ""}</div>` +
          `<p class="project-meta">${esc(p.kind)}. ${esc(p.dates)}.${p.team ? ` ${esc(p.team)}` : ""}</p>` +
          (links ? `<ul class="pills project-links">${links}</ul>` : "") +
          `<div class="project-desc">` +
            `<p>${esc(p.description)}</p>` +
            (p.highlights && p.highlights.length ? `<h3>What I built</h3>${listHTML(p.highlights)}` : "") +
            (p.impact && p.impact.length ? `<h3>Impact</h3>${listHTML(p.impact)}` : "") +
            (p.stack && p.stack.length ? `<h3>Tech stack</h3>${listHTML(p.stack, "tags")}` : "") +
          `</div>` +
          `<div class="project-pager">` +
            `<button class="pill" type="button" data-open="${esc(prev.slug)}">${ICON.prev}${esc(prev.title)}</button>` +
            `<button class="pill" type="button" data-open="${esc(next.slug)}">${esc(next.title)}${ICON.next}</button>` +
          `</div>` +
        `</div>` +
        `<aside class="dialog-side" aria-label="More projects"><h3>More projects</h3><ul class="compact-list">${others}</ul></aside>` +
      `</div>`;

    setupCarousel();
    body.closest(".dialog-scroll").scrollTop = 0;
  }

  /* ---------- Carousel ---------- */
  function slidesEl() { return [...body.querySelectorAll(".slide")]; }

  function activeIndex() {
    const track = body.querySelector(".carousel-track");
    return track ? Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)) : 0;
  }

  function goTo(i) {
    const track = body.querySelector(".carousel-track");
    const n = slidesEl().length;
    if (!track || !n) return;
    i = Math.max(0, Math.min(n - 1, i));
    track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    updateCarousel(i);
  }

  function updateCarousel(i = activeIndex()) {
    const n = slidesEl().length;
    const prev = body.querySelector(".carousel-prev");
    const next = body.querySelector(".carousel-next");
    const strip = body.querySelector(".carousel-strip");
    if (!prev) return;
    prev.hidden = n < 2 || i === 0;
    next.hidden = n < 2 || i >= n - 1;
    strip.hidden = n < 2;
    strip.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-current", String(j === i)));
    const status = body.querySelector(".carousel-status");
    status.textContent = n > 1 ? `${i + 1} of ${n}` : "";
    slidesEl().forEach((s, j) => s.setAttribute("aria-hidden", String(j !== i)));
  }

  function stopVideos() {
    body.querySelectorAll(".slide iframe").forEach((f) => {
      const slide = f.closest(".slide");
      const id = slide.dataset.video;
      slide.innerHTML = `<button class="play-button" type="button" aria-label="Play video"><img src="https://i.ytimg.com/vi/${esc(id)}/maxresdefault.jpg" alt="" data-fallback data-youtube="${esc(id)}"><span class="play-icon">${ICON.play.replace('fill="currentColor"', 'fill="#fff" width="28" height="28"')}</span></button>`;
    });
  }

  function removeSlide(slide) {
    const i = slidesEl().indexOf(slide);
    if (i < 0) return;
    const stripItems = body.querySelectorAll(".carousel-strip li");
    if (stripItems[i]) stripItems[i].remove();
    slide.remove();
    body.querySelectorAll(".carousel-strip button").forEach((b, j) => {
      b.dataset.slide = j;
      if (!b.querySelector(".strip-play")) b.setAttribute("aria-label", `Show image ${j + 1}`);
    });
    if (!slidesEl().length && current) {
      // No media at all: show the title tile.
      body.querySelector(".carousel-track").innerHTML =
        `<li class="slide"><span class="thumb-art ${esc(current.cat)}">${esc(current.title)}</span></li>`;
    }
    updateCarousel();
  }

  function setupCarousel() {
    const track = body.querySelector(".carousel-track");
    let t;
    track.addEventListener("scroll", () => {
      clearTimeout(t);
      t = setTimeout(() => { stopVideos(); updateCarousel(); }, 80);
    }, { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIndex() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIndex() - 1); }
    });
    updateCarousel(0);
  }

  body?.addEventListener("click", (e) => {
    if (e.target.closest(".carousel-prev")) return goTo(activeIndex() - 1);
    if (e.target.closest(".carousel-next")) return goTo(activeIndex() + 1);
    const thumb = e.target.closest(".carousel-strip button");
    if (thumb) return goTo(Number(thumb.dataset.slide));
    const play = e.target.closest(".play-button");
    if (play) {
      const slide = play.closest(".slide");
      slide.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(slide.dataset.video)}?autoplay=1&rel=0" ` +
        `title="${esc(current ? current.title : "Project")} video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
  });

  /* ---------- Open / close with shareable #slug links ---------- */
  function openProject(slug, { push = true } = {}) {
    const p = bySlug.get(slug);
    if (!p || !dialog) return;
    const wasOpen = dialog.open;
    current = p;
    renderProject(p);
    if (push) {
      if (wasOpen) history.replaceState({ project: slug }, "", `#${slug}`);
      else { history.pushState({ project: slug }, "", `#${slug}`); openedViaHash = false; }
    }
    if (!wasOpen) dialog.showModal();
    document.title = `${p.title} · Malcolm Zartman`;
    body.querySelector("#project-dialog-title").focus({ preventScroll: true });
  }

  function closeProject() {
    if (!dialog || !dialog.open) return;
    if (history.state && history.state.project && !openedViaHash) history.back();
    else {
      history.replaceState(null, "", location.pathname + location.search);
      dialog.close();
    }
  }

  if (dialog) {
    dialog.addEventListener("close", () => {
      stopVideos();
      body.innerHTML = "";
      current = null;
      document.title = BASE_TITLE;
      if (bySlug.has(location.hash.slice(1))) {
        if (history.state && history.state.project && !openedViaHash) history.back();
        else history.replaceState(null, "", location.pathname + location.search);
      }
    });
    dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeProject(); });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeProject(); // backdrop click
    });
    dialog.querySelector(".dialog-close").addEventListener("click", closeProject);
  }

  window.addEventListener("popstate", () => {
    const slug = location.hash.slice(1);
    if (bySlug.has(slug)) openProject(slug, { push: false });
    else if (dialog && dialog.open) dialog.close();
  });

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open]");
    if (!opener || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openProject(opener.dataset.open);
  });

  /* ---------- Nav highlighting ---------- */
  function trackSections() {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${entry.target.id}`)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  const BASE_TITLE = document.title;
  renderGrid();
  renderChips();
  enableHoverPreviews();
  trackSections();

  const initial = location.hash.slice(1);
  if (bySlug.has(initial)) {
    openedViaHash = true;
    openProject(initial, { push: false });
  }
})();
