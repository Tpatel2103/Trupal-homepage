/**
 * nav.js
 * -----------------------------------------------------------
 * Accessible mobile navigation toggle: keeps aria-expanded in
 * sync and closes the menu when a link is chosen.
 */

export function initNav(toggle, list) {
  if (!toggle || !list) {
    return;
  }

  const setOpen = (open) => {
    list.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  list.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });
}
