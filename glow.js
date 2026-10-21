/* GLOW.JS: the interactive "systems" background behind every page.
   - Three soft lights drift slowly (their look is in style.css, "Glowing background").
   - A fine grid sits underneath, like a blueprint of a workflow.
   - Gold signals travel along the grid lines and turn at the corners, like
     tasks moving through a system. When one finishes, a small green ring
     appears: job done.
   - Move your mouse (or touch on a phone): the grid lights up around you
     and a soft gold glow follows.
   - Click or tap: a burst of signals sets off from that spot.
   Tweak the numbers in SETTINGS to make it calmer or busier. */

(function () {
  const SETTINGS = {
    gridSize: 64,       // space between grid lines, in pixels
    maxSignals: 9,      // signals moving at once (phones get fewer)
    spawnEvery: 900,    // milliseconds between new signals
    speed: 2.2,         // how fast signals travel
    turnChance: 0.35,   // chance a signal turns at each crossing
    lightRadius: 230    // how far the cursor lights up the grid
  };

  const GOLD = "232, 184, 106", ORANGE = "255, 143, 90", GREEN = "95, 208, 138";
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.innerWidth < 700;
  if (small) { SETTINGS.maxSignals = 5; SETTINGS.gridSize = 56; }

  // Layers: drifting lights, cursor glow, and the canvas for the grid and signals
  const glow = document.createElement("div");
  glow.className = "glow";
  glow.setAttribute("aria-hidden", "true");
  glow.innerHTML = '<span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="orb cursor"></span><canvas></canvas>';
  document.body.prepend(glow);
  const canvas = glow.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const cursorOrb = glow.querySelector(".cursor");

  const G = SETTINGS.gridSize;
  let W = 0, H = 0;
  let signals = [], flashes = [], rings = [];
  const mouse = { x: -9999, y: -9999, on: false, lastCell: "" };
  let orbX = innerWidth / 2, orbY = innerHeight / 3;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (still) drawGrid();
  }

  /* ---------- Signals ---------- */
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function spawn(gx, gy, dir) {
    if (signals.length >= SETTINGS.maxSignals * 2) return;
    const d = dir || DIRS[(Math.random() * 4) | 0];
    signals.push({
      x: gx * G, y: gy * G, dx: d[0], dy: d[1], dist: 0,
      trail: [], life: 6 + Math.random() * 10, // crossings before it "completes"
      color: Math.random() < 0.8 ? GOLD : ORANGE
    });
  }

  function spawnRandom() {
    if (signals.length >= SETTINGS.maxSignals) return;
    spawn(Math.round(Math.random() * (W / G)), Math.round(Math.random() * (H / G)));
  }

  function step() {
    signals = signals.filter((s) => {
      s.x += s.dx * SETTINGS.speed;
      s.y += s.dy * SETTINGS.speed;
      s.dist += SETTINGS.speed;
      s.trail.push([s.x, s.y]);
      if (s.trail.length > 46) s.trail.shift();

      // Reached a crossing?
      if (s.dist >= G) {
        s.dist = 0;
        s.x = Math.round(s.x / G) * G; s.y = Math.round(s.y / G) * G;
        s.life -= 1;
        if (s.life <= 0) { rings.push({ x: s.x, y: s.y, r: 2, a: 0.8, color: GREEN }); return false; }
        if (Math.random() < SETTINGS.turnChance) {
          // turn left or right, never back
          [s.dx, s.dy] = Math.random() < 0.5 ? [s.dy, -s.dx] : [-s.dy, s.dx];
          flashes.push({ x: s.x, y: s.y, a: 0.9 });
        }
      }
      return s.x > -G && s.x < W + G && s.y > -G && s.y < H + G;
    });
    flashes = flashes.filter((f) => (f.a -= 0.025) > 0);
    rings = rings.filter((r) => { r.r += 0.9; r.a -= 0.022; return r.a > 0; });
  }

  /* ---------- Drawing ---------- */
  function drawGrid() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
    ctx.beginPath();
    for (let x = 0; x <= W; x += G) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
    for (let y = 0; y <= H; y += G) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
    ctx.stroke();
  }

  function drawCursorLight() {
    if (!mouse.on) return;
    const R = SETTINGS.lightRadius, mx = mouse.x, my = mouse.y;
    // Light up the grid lines near the cursor
    for (let x = Math.ceil((mx - R) / G) * G; x <= mx + R; x += G) {
      const fade = 1 - Math.abs(x - mx) / R;
      const g = ctx.createLinearGradient(0, my - R, 0, my + R);
      g.addColorStop(0, `rgba(${GOLD}, 0)`); g.addColorStop(0.5, `rgba(${GOLD}, ${0.32 * fade})`); g.addColorStop(1, `rgba(${GOLD}, 0)`);
      ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(x + 0.5, my - R); ctx.lineTo(x + 0.5, my + R); ctx.stroke();
    }
    for (let y = Math.ceil((my - R) / G) * G; y <= my + R; y += G) {
      const fade = 1 - Math.abs(y - my) / R;
      const g = ctx.createLinearGradient(mx - R, 0, mx + R, 0);
      g.addColorStop(0, `rgba(${GOLD}, 0)`); g.addColorStop(0.5, `rgba(${GOLD}, ${0.32 * fade})`); g.addColorStop(1, `rgba(${GOLD}, 0)`);
      ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(mx - R, y + 0.5); ctx.lineTo(mx + R, y + 0.5); ctx.stroke();
    }
    // Small nodes at the crossings, brightest nearest the cursor
    for (let x = Math.ceil((mx - R) / G) * G; x <= mx + R; x += G) {
      for (let y = Math.ceil((my - R) / G) * G; y <= my + R; y += G) {
        const d = Math.hypot(x - mx, y - my);
        if (d > R) continue;
        const a = (1 - d / R) * 0.8;
        ctx.fillStyle = `rgba(${GOLD}, ${a})`;
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
    }
  }

  function drawSignals() {
    for (const s of signals) {
      // Fading tail, drawn in a few chunks (lighter for phones)
      const t = s.trail, step = 6;
      ctx.lineWidth = 1.6;
      for (let i = step; i < t.length; i += step) {
        ctx.strokeStyle = `rgba(${s.color}, ${(i / t.length) * 0.55})`;
        ctx.beginPath(); ctx.moveTo(t[i - step][0], t[i - step][1]); ctx.lineTo(t[i][0], t[i][1]); ctx.stroke();
      }
      if (t.length) { ctx.beginPath(); ctx.moveTo(t[Math.max(0, t.length - step)][0], t[Math.max(0, t.length - step)][1]); ctx.lineTo(s.x, s.y); ctx.stroke(); }
      // Glowing head
      ctx.fillStyle = `rgba(${s.color}, 0.22)`;
      ctx.beginPath(); ctx.arc(s.x, s.y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${s.color}, 0.95)`;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    // Checkpoints: a small square where a signal turned
    for (const f of flashes) {
      ctx.strokeStyle = `rgba(${GOLD}, ${f.a * 0.7})`; ctx.lineWidth = 1.2;
      ctx.strokeRect(f.x - 5, f.y - 5, 10, 10);
    }
    // Done: a green ring where a signal finished
    for (const r of rings) {
      ctx.strokeStyle = `rgba(${r.color}, ${r.a})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke();
    }
  }

  function moveOrb() {
    orbX += (mouse.x - orbX) * 0.08;
    orbY += (mouse.y - orbY) * 0.08;
    cursorOrb.style.transform = `translate(${orbX - 280}px, ${orbY - 280}px)`;
  }

  let lastSpawn = 0;
  function loop(t) {
    if (!document.hidden) {
      if (t - lastSpawn > SETTINGS.spawnEvery) { spawnRandom(); lastSpawn = t; }
      step();
      drawGrid();
      drawCursorLight();
      drawSignals();
      if (mouse.on) moveOrb();
    }
    requestAnimationFrame(loop);
  }

  /* ---------- Mouse and touch ---------- */
  function nearestCrossing(x, y) { return [Math.round(x / G), Math.round(y / G)]; }

  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
    glow.classList.add("active");
    // Moving into a new grid square sometimes sends out a signal
    const [gx, gy] = nearestCrossing(e.clientX, e.clientY), key = gx + "," + gy;
    if (key !== mouse.lastCell) { mouse.lastCell = key; if (!still && Math.random() < 0.12) spawn(gx, gy); }
  }, { passive: true });

  document.addEventListener("pointerleave", () => { mouse.on = false; glow.classList.remove("active"); });

  window.addEventListener("pointerdown", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
    glow.classList.add("active");
    if (still) return;
    const [gx, gy] = nearestCrossing(e.clientX, e.clientY);
    DIRS.forEach((d) => spawn(gx, gy, d));
    rings.push({ x: gx * G, y: gy * G, r: 4, a: 0.9, color: GOLD });
  }, { passive: true });

  window.addEventListener("pointerup", (e) => {
    if (e.pointerType !== "mouse") setTimeout(() => { mouse.on = false; glow.classList.remove("active"); }, 600);
  });

  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

  resize();
  if (!still) {
    for (let i = 0; i < 4; i++) spawnRandom(); // start with a few already moving
    requestAnimationFrame(loop);
  }
})();
