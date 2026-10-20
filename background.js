/* BACKGROUND.JS: the interactive "workflow network" behind the page.
   Dots drift slowly and connect with faint lines, like a map of a workflow.
   - Move your mouse: nearby links light up gold and the dots lean away.
   - Click or tap: a ripple goes out and data pulses fire from that spot.
   - Small gold dots travel along the links on their own, like data moving.
   To turn it off, set  interactiveBackground: false  in content.js.
   You can tweak the numbers in SETTINGS below. */

(function () {
  if (typeof SITE !== "undefined" && SITE.interactiveBackground === false) return;

  const SETTINGS = {
    spacing: 15000,     // bigger number = fewer dots
    maxDots: 90,
    linkDistance: 140,  // how close two dots must be to connect (pixels)
    mouseRadius: 190,   // how far the cursor's influence reaches
    speed: 0.18,        // how fast dots drift
    maxPulses: 7        // gold dots travelling along links at once
  };

  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");

  // Read the gold accent from style.css so the background matches if you change it
  const css = getComputedStyle(document.documentElement);
  const gold = hexToRgb(css.getPropertyValue("--accent").trim() || "#e8b86a");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W, H, dots = [], pulses = [], ripples = [];
  const mouse = { x: -9999, y: -9999, active: false };

  function hexToRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(SETTINGS.maxDots, Math.round((W * H) / SETTINGS.spacing));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SETTINGS.speed * 2,
      vy: (Math.random() - 0.5) * SETTINGS.speed * 2,
      r: Math.random() * 1.4 + 0.8,
      glow: 0
    }));
    pulses = [];
    if (still) draw();
  }

  // Send a gold pulse from dot a to dot b
  function firePulse(a, b) {
    if (pulses.length < SETTINGS.maxPulses * 3) pulses.push({ a, b, t: 0 });
  }

  function neighbours(d) {
    return dots.filter((o) => o !== d && Math.hypot(o.x - d.x, o.y - d.y) < SETTINGS.linkDistance);
  }

  function step() {
    for (const d of dots) {
      // Lean away from the cursor
      const dx = d.x - mouse.x, dy = d.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (mouse.active && dist < SETTINGS.mouseRadius && dist > 0) {
        const push = (1 - dist / SETTINGS.mouseRadius) * 0.6;
        d.x += (dx / dist) * push;
        d.y += (dy / dist) * push;
        d.glow = Math.min(1, d.glow + 0.08);
      } else {
        d.glow = Math.max(0, d.glow - 0.02);
      }
      d.x += d.vx;
      d.y += d.vy;
      // Wrap around the edges
      if (d.x < -20) d.x = W + 20; else if (d.x > W + 20) d.x = -20;
      if (d.y < -20) d.y = H + 20; else if (d.y > H + 20) d.y = -20;
    }

    // Now and then, start a pulse on a random link
    if (pulses.length < SETTINGS.maxPulses && Math.random() < 0.05 && dots.length) {
      const a = dots[(Math.random() * dots.length) | 0];
      const n = neighbours(a);
      if (n.length) firePulse(a, n[(Math.random() * n.length) | 0]);
    }

    // Move pulses; when one arrives, it may carry on to the next dot
    pulses = pulses.filter((p) => {
      p.t += 0.018;
      if (Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y) > SETTINGS.linkDistance * 1.2) return false;
      if (p.t >= 1) {
        p.b.glow = 1;
        if (Math.random() < 0.55) {
          const n = neighbours(p.b).filter((o) => o !== p.a);
          if (n.length) firePulse(p.b, n[(Math.random() * n.length) | 0]);
        }
        return false;
      }
      return true;
    });

    ripples = ripples.filter((r) => (r.r += 4) < r.max);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Soft gold glow that follows the cursor
    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
      g.addColorStop(0, `rgba(${gold}, 0.09)`);
      g.addColorStop(1, `rgba(${gold}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // Links between nearby dots
    const L = SETTINGS.linkDistance;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const a = dots[i], b = dots[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > L) continue;
        const fade = 1 - dist / L;
        const lit = Math.max(a.glow, b.glow);
        ctx.strokeStyle = lit > 0.05
          ? `rgba(${gold}, ${fade * (0.12 + lit * 0.45)})`
          : `rgba(236, 235, 230, ${fade * 0.14})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Dots
    for (const d of dots) {
      ctx.fillStyle = d.glow > 0.05 ? `rgba(${gold}, ${0.35 + d.glow * 0.65})` : "rgba(236, 235, 230, 0.36)";
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r + d.glow * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Travelling pulses
    for (const p of pulses) {
      const x = p.a.x + (p.b.x - p.a.x) * p.t;
      const y = p.a.y + (p.b.y - p.a.y) * p.t;
      ctx.fillStyle = `rgba(${gold}, 0.95)`;
      ctx.shadowColor = `rgba(${gold}, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Click ripples
    for (const r of ripples) {
      ctx.strokeStyle = `rgba(${gold}, ${0.5 * (1 - r.r / r.max)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function loop() {
    if (!document.hidden) { step(); draw(); }
    requestAnimationFrame(loop);
  }

  // Mouse and touch
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, { passive: true });
  document.addEventListener("pointerleave", () => { mouse.active = false; });
  window.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "mouse") mouse.active = false; // phones: no lingering glow after a tap
  });
  window.addEventListener("pointerdown", (e) => {
    if (still) return;
    ripples.push({ x: e.clientX, y: e.clientY, r: 0, max: 220 });
    // Fire pulses from the dots closest to the click
    dots
      .map((d) => ({ d, dist: Math.hypot(d.x - e.clientX, d.y - e.clientY) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3)
      .forEach(({ d }) => {
        d.glow = 1;
        neighbours(d).forEach((n) => firePulse(d, n));
      });
  }, { passive: true });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  if (still) draw(); // people who turn off animations get a calm, still picture
  else loop();
})();
