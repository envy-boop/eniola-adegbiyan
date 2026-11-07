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
const whatsappUrl = (text) => `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}` + (text ? `?text=${encodeURIComponent(text)}` : "");

// Ready-made messages for the "Hire me" button
const HIRE_EMAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Hiring enquiry")}&body=${encodeURIComponent("Hi Eniola,\n\nI saw your portfolio and I'd like to talk about a role.\n\n")}`;
const HIRE_WHATSAPP_TEXT = "Hi Eniola, I saw your portfolio and I'd like to talk about a role.";

// Small line icons (24x24)
const ICONS = {
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  cv: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

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
        <div class="hire">
          <button class="btn primary small hire-btn" type="button" aria-haspopup="true" aria-expanded="false">Hire me</button>
          <div class="hire-menu" hidden>
            <a href="${HIRE_EMAIL}">${icon("email")}<span>Send an email</span></a>
            ${SITE.whatsapp ? `<a class="wa" href="${whatsappUrl(HIRE_WHATSAPP_TEXT)}" target="_blank" rel="noopener">${icon("whatsapp")}<span>Chat on WhatsApp</span></a>` : ""}
            ${(() => { const li = SITE.socials.find((s) => s.label === "LinkedIn"); return li ? `<a class="li" href="${esc(li.url)}" target="_blank" rel="noopener">${icon("linkedin")}<span>Message on LinkedIn</span></a>` : ""; })()}
          </div>
        </div>
      </nav>
    </div>
  </header>`;
}

function contactBlock() {
  const li = SITE.socials.find((s) => s.label === "LinkedIn");
  const gh = SITE.socials.find((s) => s.label === "GitHub");
  return `
  <section class="section" id="contact">
    <div class="card contact-card reveal">
      <span class="eyebrow">Let's work together</span>
      <h2 style="margin-top:18px">Need someone to keep <em>things running?</em></h2>
      <p>I'm open to remote operations, project management and executive assistant roles. Send me a message and I'll get back to you quickly.</p>
      <a class="contact-email" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
      <div class="icon-row">
        <a class="icon-btn primary" href="${HIRE_EMAIL}" aria-label="Email me" data-tip="Email">${icon("email")}</a>
        ${SITE.whatsapp ? `<a class="icon-btn wa" href="${whatsappUrl(HIRE_WHATSAPP_TEXT)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" data-tip="WhatsApp">${icon("whatsapp")}</a>` : ""}
        ${li ? `<a class="icon-btn" href="${esc(li.url)}" target="_blank" rel="noopener" aria-label="LinkedIn" data-tip="LinkedIn">${icon("linkedin")}</a>` : ""}
        ${gh ? `<a class="icon-btn" href="${esc(gh.url)}" target="_blank" rel="noopener" aria-label="GitHub" data-tip="GitHub">${icon("github")}</a>` : ""}
        ${SITE.cv ? `<a class="icon-btn" href="${esc(SITE.cv)}" download aria-label="Download CV" data-tip="CV">${icon("cv")}</a>` : ""}
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
      <div class="portrait">${(SITE.heroPhotos && SITE.heroPhotos.length ? SITE.heroPhotos : [SITE.photo]).map((src, i) => `<img class="${i === 0 ? "on" : ""}" src="${esc(src)}" alt="${i === 0 ? `Portrait of ${esc(SITE.name)}` : ""}" ${i ? `aria-hidden="true" loading="lazy"` : ""} />`).join("")}</div>
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

  <section class="section" style="padding-top:0" id="certificates">
    ${sectionHead("Certificates & awards", "Recognised for the <em>work.</em>", "Tap any certificate to see it full size, or download the PDF.")}
    <div class="cert-gallery">
      ${SITE.certifications.map((c, i) => `
      <figure class="card cert-card reveal">
        <button class="cert-thumb" type="button" data-cert="${i}" aria-label="View ${esc(c.name)} full size">
          <img src="${esc(c.thumb)}" alt="${esc(c.name)} certificate" loading="lazy" />
          ${c.kind === "Award" ? `<span class="cert-badge">Award</span>` : ""}
        </button>
        <figcaption>
          <span class="yr">${esc(c.date)}</span>
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.from)}</p>
          <div class="cert-actions">
            <button class="link-btn" type="button" data-cert="${i}">View</button>
            ${c.pdf ? `<a class="link-btn" href="${esc(c.pdf)}" download>Download PDF</a>` : ""}
          </div>
        </figcaption>
      </figure>`).join("")}
    </div>
  </section>

  ${SITE.letters && SITE.letters.length ? `
  <section class="section" style="padding-top:0">
    ${sectionHead("References", "What people I've <em>worked with</em> say.", "A preview of each letter is below. Full letters are available on request.")}
    <div class="letters">
      ${SITE.letters.map((l) => `
      <div class="card letter-card reveal">
        <div class="letter-thumb"><img src="${esc(l.thumb)}" alt="Preview of ${esc(l.name)} from ${esc(l.from)}" loading="lazy" /></div>
        <div class="letter-body">
          <span class="yr">${esc(l.date)}</span>
          <h3>${esc(l.name)}</h3>
          <p>${esc(l.from)}</p>
          <a class="btn" href="mailto:${esc(SITE.email)}?subject=${encodeURIComponent("Request: " + l.name + " (" + l.from + ")")}">Request full letter</a>
        </div>
      </div>`).join("")}
    </div>
  </section>` : ""}

  <section class="section" style="padding-top:0">
    ${sectionHead("Education", "Where it <em>started.</em>", "")}
    <div class="certs">
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

// About page: open a certificate full size
function setupLightbox() {
  if (!document.querySelector("[data-cert]")) return;
  const box = document.createElement("div");
  box.className = "lightbox"; box.hidden = true;
  box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
  box.innerHTML = `<div class="lb-inner">
    <button class="lb-close" type="button" aria-label="Close">×</button>
    <img alt="" />
    <div class="lb-bar"><div><strong></strong><small></small></div>
      <div class="lb-nav"><button type="button" class="link-btn lb-prev">← Prev</button><a class="btn primary lb-pdf" download>Download PDF</a><button type="button" class="link-btn lb-next">Next →</button></div></div>
  </div>`;
  document.body.appendChild(box);
  const img = box.querySelector("img"), title = box.querySelector("strong"), sub = box.querySelector("small"), pdf = box.querySelector(".lb-pdf");
  let at = 0, opener = null;
  function show(i) {
    at = (i + SITE.certifications.length) % SITE.certifications.length;
    const c = SITE.certifications[at];
    img.src = c.image || c.thumb; img.alt = c.name + " certificate";
    title.textContent = c.name; sub.textContent = c.from + " · " + c.date;
    if (c.pdf) { pdf.href = c.pdf; pdf.hidden = false; } else pdf.hidden = true;
  }
  function open(i, btn) { opener = btn; show(i); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); }
  function close() { box.hidden = true; document.body.style.overflow = ""; if (opener) opener.focus(); }
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-cert]");
    if (b) open(+b.dataset.cert, b);
  });
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(at - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(at + 1));
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(at + 1);
    if (e.key === "ArrowLeft") show(at - 1);
  });
}

// Home: slide between hero photos
function rotatePhotos() {
  const imgs = document.querySelectorAll(".portrait img");
  if (imgs.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let at = 0;
  setInterval(() => {
    if (document.hidden) return;
    imgs[at].classList.remove("on");
    at = (at + 1) % imgs.length;
    imgs[at].classList.add("on");
  }, (SITE.heroPhotoSeconds || 8) * 1000);
}

// Header: "Hire me" opens a small menu (email or WhatsApp)
function setupHireMenu() {
  const btn = document.querySelector(".hire-btn"), menu = document.querySelector(".hire-menu");
  if (!btn || !menu) return;
  const set = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", (e) => { e.stopPropagation(); set(menu.hidden); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".hire")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  menu.addEventListener("click", () => set(false));
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
rotatePhotos();
setupHireMenu();
setupFilters();
setupReveal();
setupSpotlight();
setupLightbox();
