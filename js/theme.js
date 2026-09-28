/**
 * theme.js
 * -----------------------------------------------------------
 * Toggles between the light notebook theme (default) and a dark
 * variant, remembers the choice, and broadcasts a "themechange"
 * event so other modules (like the plot) can recolour.
 */

const STORAGE_KEY = "homepage-theme";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage may be unavailable (private mode); fail silently.
  }
}

function applyTheme(theme, button) {
  document.documentElement.setAttribute("data-theme", theme);
  if (button) {
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.textContent = isDark ? "\u2600" : "\u263e";
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export function initTheme(button) {
  const stored = readStored();
  const initial = stored === "dark" ? "dark" : "light";
  applyTheme(initial, button);

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next, button);
    store(next);
  });
}
