/* MAIN.JS: reads SITE from content.js and builds the page.
   You rarely need to touch this file. Edit content.js instead. */

const $ = (sel) => document.querySelector(sel);

// Small helper: make an element with classes and text/html.
function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

// Escape text so stray < or & in your content can't break the page.
function esc(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
}

function render() {
  document.title = `${SITE.name} | Operations & Automation`;

  // Header + hero
  $("#brand").textContent = SITE.shortName;
  // Headline, with the accent words (if they appear in it) in gold italics
  const accent = SITE.headlineAccent;
  if (accent && SITE.headline.includes(accent)) {
    const [before, after] = SITE.headline.split(accent);
    $("#headline").innerHTML = `${esc(before)}<em>${esc(accent)}</em>${esc(after)}`;
  } else {
    $("#headline").textContent = SITE.headline;
  }
  $("#subline").textContent = SITE.subline;
  $("#status").textContent = SITE.status;

  // Quick-facts strip
  if (SITE.facts && SITE.facts.length) {
    SITE.facts.forEach((f) => {
      const item = el("div", "fact");
      item.innerHTML = `<span>${esc(f.label)}</span><strong>${esc(f.value)}</strong>`;
      $("#facts").appendChild(item);
    });
  } else {
    $("#facts").remove();
  }

  // Scrolling ribbon: the list is added twice so the loop looks seamless
  if (SITE.ribbon && SITE.ribbon.length) {
    const words = SITE.ribbon.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join("");
    $("#ribbon-track").innerHTML = `<div>${words}</div><div aria-hidden="true">${words}</div>`;
  } else {
    $("#ribbon").remove();
  }

  const portrait = $("#portrait");
  if (SITE.photo) {
    portrait.innerHTML = `<img src="${esc(SITE.photo)}" alt="Portrait of ${esc(SITE.name)}" />`;
  } else {
    portrait.textContent = initials(SITE.name);
  }

  // CV button, tools note, earlier roles (each hides itself if empty)
  if (SITE.cv) $("#cv").href = SITE.cv; else $("#cv").remove();
  if (SITE.toolsNote) $("#tools-note").textContent = SITE.toolsNote; else $("#tools-note").remove();
  if (SITE.earlier) $("#earlier").textContent = SITE.earlier; else $("#earlier").remove();

  // About
  SITE.about.forEach((p) => $("#about-text").appendChild(el("p", "", esc(p))));

  // Skills
  SITE.skills.forEach((g) => {
    const box = el("div", "skill-group");
    box.appendChild(el("h3", "", esc(g.group)));
    const list = el("ul", "chips");
    g.items.forEach((i) => list.appendChild(el("li", "", esc(i))));
    box.appendChild(list);
    $("#skills-grid").appendChild(box);
  });

  // Projects
  SITE.projects.forEach((p, i) => {
    const card = el("article", "project reveal");
    const statusClass = p.status.toLowerCase().replace(/\s+/g, "-");
    const links = (p.links || [])
      .filter((l) => l.url)
      .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
      .join("");
    card.innerHTML = `
      <div class="project-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="project-body">
        <div class="project-top">
          <h3>${esc(p.title)}</h3>
          <span class="badge ${statusClass}">${esc(p.status)}</span>
        </div>
        <p class="project-org">${esc(p.org)} / ${esc(p.year)}</p>
        <p>${esc(p.summary)}</p>
        <ul class="chips small">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${links ? `<div class="links">${links}</div>` : ""}
        ${p.note ? `<p class="proof">${esc(p.note)}</p>` : ""}
      </div>`;
    $("#project-list").appendChild(card);
  });

  // Experience
  SITE.experience.forEach((j) => {
    const row = el("article", "job reveal");
    row.innerHTML = `
      <div class="job-meta">
        <h3>${esc(j.org)}</h3>
        <p>${esc(j.role)}</p>
        <p class="period">${esc(j.period)}</p>
      </div>
      <ul>${j.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>`;
    $("#job-list").appendChild(row);
  });

  $("#education").innerHTML = `<strong>${esc(SITE.education.school)}</strong><br>${esc(SITE.education.detail)}`;

  // How I work
  if (SITE.process && SITE.process.length) {
    SITE.process.forEach((s, i) => {
      const step = el("div", "step reveal");
      step.innerHTML = `<span class="step-num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>`;
      $("#process-list").appendChild(step);
    });
  } else {
    $("#process").remove();
  }

  // Contact
  if (SITE.whatsapp) {
    $("#whatsapp").href = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`;
  } else {
    $("#whatsapp").remove();
  }
  const mail = $("#email");
  mail.href = `mailto:${SITE.email}`;
  mail.textContent = SITE.email;
  SITE.socials.forEach((s) => {
    const a = el("a", "", esc(s.label));
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener";
    $("#socials").appendChild(a);
  });
  $("#year").textContent = new Date().getFullYear();
  $("#footer-name").textContent = SITE.name;
}

// Fade-in as sections scroll into view.
function setupReveal() {
  const items = document.querySelectorAll(".reveal, section");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  items.forEach((i) => io.observe(i));
}

render();
setupReveal();
