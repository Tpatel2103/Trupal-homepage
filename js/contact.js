/**
 * contact.js
 * -----------------------------------------------------------
 * Copies the contact email to the clipboard and confirms it in a
 * status region, with a text fallback if the Clipboard API is
 * unavailable.
 */

export function initContact(button, status) {
  if (!button || !status) {
    return;
  }

  const email = button.dataset.email || "";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = `Copied ${email} to your clipboard.`;
    } catch {
      status.textContent = `Copy failed — email me at ${email}`;
    }
    window.setTimeout(() => {
      status.textContent = "";
    }, 4000);
  });
}
