/* MAIN.JS: reads SITE from content.js and builds each page.
   Each HTML file says which page it is with  <body data-page="...">.
   You rarely need to touch this file. Edit content.js instead. */

const $ = (sel) => document.querySelector(sel);
const PAGE = document.body.dataset.page;

// Escape text so stray < or & in your content can't break the page.
function esc(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML;
}
const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");
// Project links look like project.html#vera-id. The part after # is never stripped,
// so it works on GitHub, on your laptop, and when you double-click the file.
const projectUrl = (p) => `project.html#${encodeURIComponent(p.id)}`;
function currentProjectId() {
  const fromQuery = new URLSearchParams(location.search).get("p"); // old-style links still work
  return fromQuery || decodeURIComponent(location.hash.replace(/^#/, ""));
}
const whatsappUrl = () => `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`;

/* ---------- Pieces used on several pages ---------- */

function header() {
  const links = [
    ["index.html", "Home", "home"],
    ["work.html", "Work", "work"],
    ["about.html", "About", "about"],
    ["#contact", "Contact", "contact"]
  ];
  const parts = SITE.name.split(" ");
  return `
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html"><span class="brand-dot"></span><span>${esc(parts[0])}<span class="full"> ${esc(parts.slice(1).join(" "))}</span></span></a>
      <nav class="nav">
        ${links.map(([href, label, key]) => `<a href="${href}" class="${PAGE === key || (PAGE === "project" && key === "work") ? "active" : ""}">${label}</a>`).join("")}
        <a class="btn primary small" href="#contact">Hire me</a>
      </nav>
    </div>
  </header>`;
}

function contactBlock() {
  const wa = SITE.whatsapp ? `<a class="btn whatsapp" href="${whatsappUrl()}" target="_blank" rel="noopener">Chat on WhatsApp</a>` : "";
  const li = SITE.socials.find((s) => s.label === "LinkedIn");
  const gh = SITE.socials.find((s) => s.label === "GitHub");
  return `
  <section class="section" id="contact">
    <div class="card contact-card reveal">
      <span class="eyebrow">Let's work together</span>
      <h2 style="margin-top:18px">Need someone to keep <em>things running?</em></h2>
      <p>I'm open to remote operations, project management and executive assistant roles. Send me a message and I'll get back to you quickly.</p>
      <a class="contact-email" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
      <div class="cta-row">
        <a class="btn primary" href="mailto:${esc(SITE.email)}">Email me</a>
        ${wa}
        ${li ? `<a class="btn" href="${esc(li.url)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${gh ? `<a class="btn" href="${esc(gh.url)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${SITE.cv ? `<a class="btn" href="${esc(SITE.cv)}" download>Download CV</a>` : ""}
      </div>
    </div>
  </section>`;
}

function footer() {
  return `
  <footer>
    <span>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</span>
    <nav>${SITE.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("")}
      <a href="mailto:${esc(SITE.email)}">Email</a></nav>
  </footer>`;
}

function projectCard(p) {
  // Buttons: the project's own links first (e.g. "Play the game" goes straight to Start.ng),
  // then "Request proof" for confidential work, then the full story.
  const links = (p.links || []).filter((l) => l.url);
  const main = links[0];
  const extra = links.slice(1);
  const ext = (url) => (url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"');
  const proof = p.proofOnRequest ? { label: "Request proof", url: `mailto:${SITE.email}?subject=${encodeURIComponent("Proof request: " + p.title)}` } : null;
  const primary = main || proof;
  const did = (p.did || []).slice(0, 2);
  const imgHref = main ? main.url : projectUrl(p);

  return `
  <article class="card pcard reveal" data-cat="${esc(p.category)}">
    <a class="thumb" href="${esc(imgHref)}" ${main ? ext(main.url) : ""} aria-label="${esc(main ? main.label : "Read about " + p.title)}">
      <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy" style="object-position:${esc(p.coverPosition || "50% 0%")}" />
      ${p.illustration ? `<span class="tag-illus">Illustration</span>` : ""}
      ${main ? `<span class="tag-go">${esc(main.label)} ↗</span>` : ""}
    </a>
    <div class="body">
      <div class="meta"><span>${esc(p.org)}</span><span class="badge ${slug(p.status)}">${esc(p.status)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      ${did.length ? `<div class="did"><span>What I did</span><ul>${did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>` : ""}
      <div class="card-actions">
        ${primary ? `<a class="btn small primary" href="${esc(primary.url)}" ${ext(primary.url)}>${esc(primary.label)} ↗</a>` : ""}
        ${extra.map((l) => `<a class="btn small" href="${esc(l.url)}" ${ext(l.url)}>${esc(l.label)}</a>`).join("")}
        ${main && proof ? `<a class="btn small" href="${esc(proof.url)}">${esc(proof.label)}</a>` : ""}
      </div>
      <a class="arrow-link" href="${projectUrl(p)}">Full story <span>→</span></a>
    </div>
  </article>`;
}

function sectionHead(eyebrow, title, lead, extra = "") {
  return `<div class="section-head ${extra ? "split" : ""} reveal">
    <div><span class="eyebrow">${eyebrow}</span><h2 class="section-title">${title}</h2>${lead ? `<p class="section-lead">${lead}</p>` : ""}</div>
    ${extra}
  </div>`;
}

/* ---------- Pages ---------- */

function homePage() {
  const now = SITE.experience.filter((j) => /present/i.test(j.period));
  const current = SITE.experience[0];
  const featured = SITE.projects.filter((p) => p.featured);
  const wa = SITE.whatsapp ? `<a class="btn whatsapp" href="${whatsappUrl()}" target="_blank" rel="noopener">WhatsApp me</a>` : "";
  const [first, ...rest] = SITE.name.split(" ");

  return `
  <section class="hero">
    <div>
      <span class="status-pill"><span class="pulse"></span>${esc(SITE.status)}</span>
      <h1>${esc(first)} <span class="last">${esc(rest.join(" "))}</span></h1>
      <p class="role-line">I'm <span id="article">an</span> <span class="role" id="role">${esc(SITE.roles[0])}</span></p>
      <p class="intro">${esc(SITE.intro)}</p>
      <div class="cta-row">
        <a class="btn primary" href="work.html">See my work →</a>
        ${SITE.cv ? `<a class="btn" href="${esc(SITE.cv)}" download>Download CV</a>` : ""}
        ${wa}
      </div>
    </div>
    <div class="portrait-wrap">
      <div class="portrait"><img src="${esc(SITE.photo)}" alt="Portrait of ${esc(SITE.name)}" /></div>
      <div class="card float-chip b"><span class="ico">✦</span><span><strong>${esc(current.role)}</strong><small>${esc(current.org)}</small></span></div>
      <div class="card float-chip a"><span class="ico">⌖</span><span><strong>Based in Nigeria</strong><small>Working remotely</small></span></div>
    </div>
  </section>

  <section class="stats">
    ${SITE.stats.map((s) => `<div class="card stat reveal"><div class="num" data-count="${esc(s.value)}">${esc(s.value)}</div><p>${esc(s.label)}</p></div>`).join("")}
  </section>

  <section class="section">
    ${sectionHead("What I do", "I keep teams <em>organised</em> and work <em>moving.</em>", "")}
    <div class="services">
      ${SITE.services.map((s, i) => `<div class="card service reveal"><span class="n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    ${sectionHead("Selected work", "Systems, tools and products <em>I've built.</em>", "", `<a class="btn reveal" href="work.html">See all ${SITE.projects.length} projects →</a>`)}
    <div class="projects-grid">${featured.map(projectCard).join("")}</div>
  </section>

  <section class="section" style="padding-top:0">
    ${sectionHead("Right now", "Where I'm <em>working</em> today.", "")}
    <div class="now-list">
      ${now.map((j) => `<div class="card now reveal"><span class="dot"></span><div><h3>${esc(j.role)}</h3><p>${esc(j.org)}</p></div></div>`).join("")}
    </div>
  </section>`;
}

function workPage() {
  const filters = ["All", ...SITE.categories];
  return `
  <section class="page-head">
    <span class="eyebrow">Work</span>
    <h1>Things I've <em>built and run.</em></h1>
    <p class="section-lead">Operations systems, automations and products, from internal tools that keep teams moving to products people use. Some work belongs to the teams I built it for; those pictures are illustrations with placeholder data.</p>
  </section>
  <div class="filters" id="filters">
    ${filters.map((f, i) => `<button class="filter ${i === 0 ? "on" : ""}" data-filter="${esc(f)}">${esc(f)}</button>`).join("")}
  </div>
  <div class="projects-grid three" id="grid">${SITE.projects.map(projectCard).join("")}</div>`;
}

function projectPage() {
  const id = currentProjectId();
  const i = SITE.projects.findIndex((p) => p.id === id);
  if (i < 0) {
    // No project picked (or an old link): show every project to choose from
    return `
    <section class="page-head">
      <span class="eyebrow">Case studies</span>
      <h1>Pick a <em>project.</em></h1>
      <p class="section-lead">Each one shows the challenge, what I did and the result.</p>
    </section>
    <div class="projects-grid three">${SITE.projects.map(projectCard).join("")}</div>`;
  }
  const p = SITE.projects[i];
  const next = SITE.projects[(i + 1) % SITE.projects.length];
  document.title = `${p.title} | ${SITE.name}`;
  const links = (p.links || []).filter((l) => l.url);
  if (p.proofOnRequest) {
    links.push({ label: "Request proof", url: `mailto:${SITE.email}?subject=${encodeURIComponent("Proof request: " + p.title)}` });
  }

  return `
  <section class="page-head" style="padding-bottom:0">
    <a class="back" href="work.html">← All work</a>
    <div class="proj-meta-line"><span>${esc(p.org)}</span><span>·</span><span>${esc(p.year)}</span><span class="badge ${slug(p.status)}">${esc(p.status)}</span></div>
    <h1>${esc(p.title)}</h1>
    <p class="proj-summary">${esc(p.summary)}</p>
  </section>

  <div class="facts-grid">
    <div class="card reveal"><h4>My role</h4><p>${esc(p.role)}</p></div>
    <div class="card reveal"><h4>Tools</h4><ul class="chips">${p.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
    <div class="card reveal"><h4>${links.length ? "See it" : "Category"}</h4>
      ${links.length
        ? `<div class="links-col">${links.map((l, k) => `<a class="btn small ${k === 0 ? "primary" : ""}" href="${esc(l.url)}" ${l.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}>${esc(l.label)}</a>`).join("")}</div>`
        : `<p>${esc(p.category)}</p>`}
    </div>
  </div>

  <div class="cover reveal">
    <img src="${esc(p.cover)}" alt="${esc(p.title)}" />
    ${p.illustration ? `<span class="tag-illus">Illustration</span>` : ""}
  </div>

  <div class="story">
    <h2 class="reveal">The challenge</h2><div class="reveal"><p>${esc(p.challenge)}</p></div>
    <h2 class="reveal">What I did</h2><div class="reveal"><ul>${p.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
    <h2 class="reveal">The result</h2><div class="reveal"><div class="card result-box">${esc(p.result)}</div></div>
  </div>

  ${p.gallery && p.gallery.length ? `<div class="gallery">${p.gallery.map((g) => `<figure class="card reveal"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy" /><figcaption>${esc(g.caption)}</figcaption></figure>`).join("")}</div>` : ""}
  ${p.note ? `<p class="proof-note">${esc(p.note)}</p>` : ""}

  <a class="card next-proj reveal" href="${projectUrl(next)}">
    <span><small>Next project</small><strong>${esc(next.title)}</strong></span>
    <span class="arrow-link">View <span>→</span></span>
  </a>`;
}

function aboutPage() {
  const current = (j) => /present/i.test(j.period);
  return `
  <section class="page-head">
    <span class="eyebrow">About me</span>
    <h1>Hi, I'm <em>${esc(SITE.firstName)}.</em></h1>
  </section>
  <div class="about-hero">
    <div class="prose reveal">${SITE.about.map((p) => `<p>${esc(p)}</p>`).join("")}
      <div class="cta-row">${SITE.cv ? `<a class="btn primary" href="${esc(SITE.cv)}" download>Download my CV</a>` : ""}<a class="btn" href="#contact">Get in touch</a></div>
    </div>
    <div class="about-photo reveal"><img src="${esc(SITE.photo)}" alt="Portrait of ${esc(SITE.name)}" /></div>
  </div>

  ${SITE.process && SITE.process.length ? `
  <section class="section">
    ${sectionHead("How I work", "Simple, and it <em>works.</em>", "")}
    <div class="steps">${SITE.process.map((s, i) => `<div class="card step reveal"><span class="n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}</div>
  </section>` : ""}

  <section class="section" style="padding-top:0">
    ${sectionHead("Experience", "Where I've <em>worked.</em>", "")}
    <div class="timeline">
      ${SITE.experience.map((j) => `
      <div class="card tl-item reveal ${current(j) ? "current" : ""}">
        <div class="tl-top"><h3>${esc(j.org)}</h3><span class="period">${esc(j.period)}</span></div>
        <p class="role-name">${esc(j.role)}</p>
        <ul>${j.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
      </div>`).join("")}
    </div>
    ${SITE.earlier ? `<p class="muted-line reveal">${esc(SITE.earlier)}</p>` : ""}
  </section>

  <section class="section" style="padding-top:0">
    ${sectionHead("Skills & tools", "What I <em>work with.</em>", "")}
    <div class="skills-grid">${SITE.skills.map((g) => `<div class="card reveal"><h3>${esc(g.group)}</h3><ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
  </section>

  <section class="section" style="padding-top:0">
    ${sectionHead("Certifications & education", "Always <em>learning.</em>", "")}
    <div class="certs">
      ${SITE.certifications.map((c) => `<div class="card cert reveal"><span class="yr">${esc(c.year)}</span><h3>${esc(c.name)}</h3><p>${esc(c.from)}</p></div>`).join("")}
      <div class="card cert reveal"><span class="yr">Degree</span><h3>${esc(SITE.education.detail)}</h3><p>${esc(SITE.education.school)}</p></div>
    </div>
  </section>`;
}

/* ---------- Little moving parts ---------- */

// Hero: cycle through your roles
function rotateRoles() {
  const role = $("#role"), art = $("#article");
  if (!role || SITE.roles.length < 2) return;
  const articleFor = (w) => (/^[aeiou]/i.test(w) ? "an" : "a");
  art.textContent = articleFor(SITE.roles[0]);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  setInterval(() => {
    role.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % SITE.roles.length;
      role.textContent = SITE.roles[i];
      art.textContent = articleFor(SITE.roles[i]);
      role.classList.remove("out");
    }, 350);
  }, 2600);
}

// Stats: count up from 0 when they come into view (e.g. 450+)
function countUp(elm) {
  const m = elm.dataset.count.match(/^(\d+)(\D*)$/); // only simple numbers like "450+" or "100"
  if (!m) return;
  const end = +m[1], suffix = m[2], t0 = performance.now(), dur = 1400;
  (function tick(t) {
    const k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
    elm.textContent = Math.round(end * eased) + suffix;
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}

// Work page: filter buttons
function setupFilters() {
  const bar = $("#filters");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    bar.querySelectorAll(".filter").forEach((b) => b.classList.toggle("on", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll("#grid .pcard").forEach((c) => {
      c.classList.toggle("hide", f !== "All" && c.dataset.cat !== f);
      c.classList.add("in");
    });
  });
}

// Fade things in as you scroll to them
function setupReveal() {
  const items = document.querySelectorAll(".reveal, .num[data-count]");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.dataset.count) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  items.forEach((i) => io.observe(i));
  // Safety net: after 2.5 seconds, show anything that is still hidden
  setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((i) => {
    if (i.getBoundingClientRect().top < innerHeight) i.classList.add("in");
  }), 2500);
}

// Cards: a soft gold spotlight follows the cursor across them
function setupSpotlight() {
  if (!window.matchMedia("(hover: hover)").matches) return;
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* ---------- Build the page ---------- */

const pages = { home: homePage, work: workPage, project: projectPage, about: aboutPage };
document.body.insertAdjacentHTML("afterbegin", header());
$("main").innerHTML = (pages[PAGE] || homePage)() + contactBlock();
$("main").insertAdjacentHTML("afterend", footer());
if (PAGE !== "project") document.title = `${SITE.name} | ${SITE.roles.slice(0, 3).join(", ")}`;

document.querySelectorAll("main img").forEach((img) => {
  img.addEventListener("error", () => { (img.closest(".cover, figure") || img).style.display = "none"; });
});

if (PAGE === "project") window.addEventListener("hashchange", () => { location.reload(); });
if (PAGE === "project") window.scrollTo(0, 0);

rotateRoles();
setupFilters();
setupReveal();
setupSpotlight();
