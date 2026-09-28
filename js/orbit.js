/**
 * orbit.js
 * -----------------------------------------------------------
 * An interactive two-body gravity simulator (a space sandbox).
 * Drag from a point to launch a satellite: the drag vector sets
 * its velocity. A quick tap drops a satellite into a near-circular
 * orbit. Satellites feel a central planet's gravity, trail behind
 * them, and are removed if they crash or escape. Theme-aware, with
 * a static fallback for reduced-motion users.
 */

const MU = 6000; // gravitational parameter (tuned for the canvas)
const MAX_SATS = 6;
const TAP_DISTANCE = 6;
const LAUNCH_SCALE = 0.08;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    ink: s.getPropertyValue("--ink").trim() || "#17203a",
    hot: s.getPropertyValue("--hot").trim() || "#ff2e7e",
    cool: s.getPropertyValue("--cool").trim() || "#1f5bd6",
    line: s.getPropertyValue("--line").trim() || "rgba(0,0,0,0.18)",
  };
}

export function initOrbit(canvas, readout, resetBtn) {
  if (!canvas || !canvas.getContext) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const EARTH_R = 24;
  let colors = readColors();
  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let sats = [];
  let stars = [];
  const drag = { active: false, x0: 0, y0: 0, x: 0, y: 0 };

  const seedStars = () => {
    stars = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.4,
    }));
  };

  const circularVelocity = (x, y) => {
    let dx = x - cx;
    let dy = y - cy;
    let d = Math.hypot(dx, dy);
    if (d < EARTH_R + 30) {
      d = EARTH_R + 30;
      const ang = Math.atan2(dy, dx);
      dx = Math.cos(ang) * d;
      dy = Math.sin(ang) * d;
    }
    const speed = Math.sqrt(MU / d);
    return { x: (cx + dx), y: (cy + dy), vx: (-dy / d) * speed, vy: (dx / d) * speed };
  };

  const addSat = (x, y, vx, vy) => {
    sats.push({ x, y, vx, vy, trail: [] });
    if (sats.length > MAX_SATS) {
      sats.shift();
    }
  };

  const integrate = (s) => {
    const sub = 4;
    const h = 1 / sub;
    for (let i = 0; i < sub; i += 1) {
      const dx = s.x - cx;
      const dy = s.y - cy;
      let d = Math.hypot(dx, dy);
      if (d < 1) {
        d = 1;
      }
      const a = -MU / (d * d * d);
      s.vx += a * dx * h;
      s.vy += a * dy * h;
      s.x += s.vx * h;
      s.y += s.vy * h;
    }
  };

  const drawPlanet = () => {
    ctx.fillStyle = colors.cool;
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, EARTH_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const drawStars = () => {
    ctx.fillStyle = colors.line;
    for (const st of stars) {
      ctx.beginPath();
      ctx.arc(st.x * width, st.y * height, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const updateReadout = () => {
    if (!readout) {
      return;
    }
    const latest = sats[sats.length - 1];
    let html = `<span>satellites: <b>${sats.length}</b></span>`;
    if (latest) {
      const speed = Math.hypot(latest.vx, latest.vy);
      const alt = Math.max(0, Math.hypot(latest.x - cx, latest.y - cy) - EARTH_R);
      html +=
        `<span>speed <b>${speed.toFixed(1)}</b></span>` +
        `<span>altitude <b>${alt.toFixed(0)}</b></span>`;
    } else {
      html += "<span>drag to launch one</span>";
    }
    readout.innerHTML = html;
  };

  const frame = () => {
    ctx.clearRect(0, 0, width, height);
    drawStars();

    const bound = Math.hypot(width, height) * 0.9;
    const alive = [];
    for (const s of sats) {
      integrate(s);
      const d = Math.hypot(s.x - cx, s.y - cy);
      if (d <= EARTH_R || d > bound) {
        continue; // crashed or escaped
      }
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > 150) {
        s.trail.shift();
      }
      alive.push(s);
    }
    sats = alive;

    // trails
    for (const s of sats) {
      for (let i = 1; i < s.trail.length; i += 1) {
        ctx.strokeStyle = colors.cool;
        ctx.globalAlpha = (i / s.trail.length) * 0.6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.trail[i - 1].x, s.trail[i - 1].y);
        ctx.lineTo(s.trail[i].x, s.trail[i].y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    drawPlanet();

    // satellites
    for (const s of sats) {
      ctx.fillStyle = colors.hot;
      ctx.strokeStyle = colors.ink;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // aim arrow while dragging
    if (drag.active) {
      ctx.strokeStyle = colors.ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(drag.x0, drag.y0);
      ctx.lineTo(drag.x, drag.y);
      ctx.stroke();
      ctx.fillStyle = colors.hot;
      ctx.beginPath();
      ctx.arc(drag.x0, drag.y0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    updateReadout();
    window.requestAnimationFrame(frame);
  };

  const drawStatic = () => {
    ctx.clearRect(0, 0, width, height);
    drawStars();
    ctx.strokeStyle = colors.cool;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, width * 0.32, height * 0.26, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    drawPlanet();
    ctx.fillStyle = colors.hot;
    ctx.strokeStyle = colors.ink;
    ctx.beginPath();
    ctx.arc(cx + width * 0.32, cy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (readout) {
      readout.innerHTML = "<span>reduced motion: animation paused</span>";
    }
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    cx = width / 2;
    cy = height / 2;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (prefersReducedMotion) {
      drawStatic();
    }
  };

  canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    drag.active = true;
    drag.x0 = event.clientX - rect.left;
    drag.y0 = event.clientY - rect.top;
    drag.x = drag.x0;
    drag.y = drag.y0;
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!drag.active) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    drag.x = event.clientX - rect.left;
    drag.y = event.clientY - rect.top;
  });

  const endDrag = () => {
    if (!drag.active) {
      return;
    }
    drag.active = false;
    const dist = Math.hypot(drag.x - drag.x0, drag.y - drag.y0);
    if (dist < TAP_DISTANCE) {
      const o = circularVelocity(drag.x0, drag.y0);
      addSat(o.x, o.y, o.vx, o.vy);
    } else {
      addSat(
        drag.x0,
        drag.y0,
        (drag.x - drag.x0) * LAUNCH_SCALE,
        (drag.y - drag.y0) * LAUNCH_SCALE,
      );
    }
  };

  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointerleave", () => {
    drag.active = false;
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      sats = [];
    });
  }

  window.addEventListener("themechange", () => {
    colors = readColors();
    if (prefersReducedMotion) {
      drawStatic();
    }
  });
  window.addEventListener("orbit:reset", () => {
    sats = [];
  });
  window.addEventListener("orbit:random", () => {
    const ang = Math.random() * Math.PI * 2;
    const r = 90 + Math.random() * 90;
    const o = circularVelocity(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
    addSat(o.x, o.y, o.vx, o.vy);
  });
  window.addEventListener("resize", resize, { passive: true });

  seedStars();
  resize();
  if (prefersReducedMotion) {
    drawStatic();
  } else {
    // start with a couple of satellites so it looks alive on load
    window.dispatchEvent(new CustomEvent("orbit:random"));
    window.dispatchEvent(new CustomEvent("orbit:random"));
    window.requestAnimationFrame(frame);
  }
}
