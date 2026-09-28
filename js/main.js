/**
 * main.js
 * -----------------------------------------------------------
 * Entry module. Loaded on every page with type="module" and
 * wires up whichever components are present in the DOM.
 */

import { initRegression } from "./regression.js";
import { initOrbit } from "./orbit.js";
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initContact } from "./contact.js";
import { initPalette } from "./palette.js";

function boot() {
  const plot = document.querySelector(".plot-canvas");
  if (plot) {
    initRegression(
      plot,
      document.querySelector(".plot-readout"),
      document.querySelector(".plot-reset")
    );
  }

  const orbit = document.querySelector(".orbit-canvas");
  if (orbit) {
    initOrbit(
      orbit,
      document.querySelector(".orbit-readout"),
      document.querySelector(".orbit-reset")
    );
  }

  initTheme(document.querySelector(".theme-toggle"));
  initNav(
    document.querySelector(".nav-toggle"),
    document.querySelector(".nav-list")
  );
  initContact(
    document.querySelector(".copy-email"),
    document.querySelector(".copy-status")
  );

  initPalette();

  const year = document.querySelector(".footer-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
