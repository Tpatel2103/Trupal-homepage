/**
 * regression.js
 * -----------------------------------------------------------
 * The original creative component: a live regression playground.
 * Click (or tap) anywhere on the plot to drop a data point; a
 * least-squares line refits in real time and the equation plus
 * R-squared update. Colours follow the active CSS theme, and a
 * reset control clears back to a seeded, noisy sample.
 */

const PADDING = 34;

function seededPoints() {
  // A noisy y = 0.6x + 12 so the plot is interesting on load.
  const raw = [
    [8, 20],
    [18, 21],
    [26, 30],
    [34, 28],
    [45, 41],
    [52, 44],
    [63, 47],
    [72, 58],
    [84, 61],
    [92, 70],
  ];
  return raw.map(([x, y]) => ({ x, y }));
}

function leastSquares(points) {
  const n = points.length;
  if (n < 2) {
    return null;
  }
  let sx = 0;
  let sy = 0;
  let sxy = 0;
  let sxx = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
    sxy += p.x * p.y;
    sxx += p.x * p.x;
  }
  const denom = n * sxx - sx * sx;
  if (denom === 0) {
    return null;
  }
  const slope = (n * sxy - sx * sy) / denom;
  const intercept = (sy - slope * sx) / n;

  const meanY = sy / n;
  let ssTot = 0;
  let ssRes = 0;
  for (const p of points) {
    const pred = slope * p.x + intercept;
    ssTot += (p.y - meanY) ** 2;
    ssRes += (p.y - pred) ** 2;
  }
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  return { slope, intercept, r2 };
}

function themeColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    ink: styles.getPropertyValue("--ink").trim() || "#17203a",
    hot: styles.getPropertyValue("--hot").trim() || "#ff2e7e",
    cool: styles.getPropertyValue("--cool").trim() || "#1f5bd6",
    grid: styles.getPropertyValue("--line").trim() || "rgba(0,0,0,0.18)",
  };
}

export function initRegression(canvas, readout, resetBtn) {
  if (!canvas || !canvas.getContext) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const DATA_MAX = 100;
  let points = seededPoints();
  let width = 0;
  let height = 0;

  const toPixel = (p) => ({
    px: PADDING + (p.x / DATA_MAX) * (width - PADDING * 2),
    py: height - PADDING - (p.y / DATA_MAX) * (height - PADDING * 2),
  });

  const toData = (px, py) => ({
    x: ((px - PADDING) / (width - PADDING * 2)) * DATA_MAX,
    y: ((height - PADDING - py) / (height - PADDING * 2)) * DATA_MAX,
  });

  const render = () => {
    const c = themeColors();
    ctx.clearRect(0, 0, width, height);

    // axes
    ctx.strokeStyle = c.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PADDING, PADDING);
    ctx.lineTo(PADDING, height - PADDING);
    ctx.lineTo(width - PADDING, height - PADDING);
    ctx.stroke();

    const fit = leastSquares(points);
    if (fit) {
      const a = toPixel({ x: 0, y: fit.intercept });
      const yEnd = fit.slope * DATA_MAX + fit.intercept;
      const b = toPixel({ x: DATA_MAX, y: yEnd });
      ctx.strokeStyle = c.cool;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(a.px, a.py);
      ctx.lineTo(b.px, b.py);
      ctx.stroke();
    }

    // points
    for (const p of points) {
      const { px, py } = toPixel(p);
      ctx.fillStyle = c.hot;
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    if (readout) {
      if (fit) {
        const sign = fit.intercept >= 0 ? "+" : "\u2212";
        const intercept = Math.abs(fit.intercept).toFixed(1);
        const parts = [
          `<span>y = <b>${fit.slope.toFixed(2)}</b>x ${sign} <b>${intercept}</b></span>`,
          `<span>R\u00b2 = <b>${fit.r2.toFixed(3)}</b></span>`,
          `<span>n = <b>${points.length}</b></span>`,
        ];
        readout.innerHTML = parts.join("");
      } else {
        readout.innerHTML = "<span>Add at least two points to fit a line.</span>";
      }
    }
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  };

  canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const d = toData(event.clientX - rect.left, event.clientY - rect.top);
    if (d.x >= 0 && d.x <= DATA_MAX && d.y >= 0 && d.y <= DATA_MAX) {
      points.push(d);
      render();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      points = seededPoints();
      render();
    });
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("themechange", render);
  window.addEventListener("plot:reset", () => {
    points = seededPoints();
    render();
  });
  window.addEventListener("plot:random", () => {
    for (let i = 0; i < 6; i += 1) {
      points.push({ x: Math.random() * DATA_MAX, y: Math.random() * DATA_MAX });
    }
    render();
  });
  resize();
}
