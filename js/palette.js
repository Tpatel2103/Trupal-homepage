/**
 * palette.js
 * -----------------------------------------------------------
 * A site-wide command palette (press Cmd/Ctrl-K or "/"). Type to
 * filter commands, arrow keys to move, Enter to run, Esc to close.
 * It navigates the site, toggles the theme, copies the email, and
 * sends commands into the regression plot via custom events.
 *
 * The trigger button and the dialog are injected here, so the HTML
 * pages stay clean and the feature works identically on every page.
 */

function go(target) {
  const el = document.getElementById(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `./index.html#${target}`;
  }
}

function clickIfPresent(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.click();
  }
}

function fire(name) {
  window.dispatchEvent(new CustomEvent(name));
}

const COMMANDS = [
  {
    label: "Go to Home",
    hint: "page",
    keys: "home",
    run: () => (window.location.href = "./index.html"),
  },
  {
    label: "Go to Projects",
    hint: "page",
    keys: "projects work",
    run: () => (window.location.href = "./projects.html"),
  },
  {
    label: "Go to About",
    hint: "page",
    keys: "about bio",
    run: () => (window.location.href = "./about.html"),
  },
  {
    label: "Go to Blog",
    hint: "page",
    keys: "blog writing article",
    run: () => (window.location.href = "./blog.html"),
  },
  {
    label: "Jump to Focus areas",
    hint: "section",
    keys: "skills focus",
    run: () => go("focus"),
  },
  {
    label: "Jump to Skills",
    hint: "section",
    keys: "skills tech stack languages",
    run: () => go("skills"),
  },
  {
    label: "Jump to Orbital sandbox",
    hint: "section",
    keys: "orbit space satellite sandbox",
    run: () => go("orbit"),
  },
  {
    label: "Jump to Courses",
    hint: "section",
    keys: "courses classes",
    run: () => go("courses"),
  },
  {
    label: "Jump to Hobbies",
    hint: "section",
    keys: "hobbies",
    run: () => go("hobbies"),
  },
  {
    label: "Jump to Contact",
    hint: "section",
    keys: "contact email",
    run: () => go("contact"),
  },
  {
    label: "Toggle light / dark theme",
    hint: "action",
    keys: "theme dark light mode",
    run: () => clickIfPresent(".theme-toggle"),
  },
  {
    label: "Copy my email",
    hint: "action",
    keys: "email copy contact",
    run: () => clickIfPresent(".copy-email"),
  },
  {
    label: "Scatter random points into the plot",
    hint: "plot",
    keys: "random points plot data",
    run: () => fire("plot:random"),
  },
  {
    label: "Reset the plot",
    hint: "plot",
    keys: "reset plot clear",
    run: () => fire("plot:reset"),
  },
  {
    label: "Launch a random satellite",
    hint: "orbit",
    keys: "orbit satellite space launch",
    run: () => fire("orbit:random"),
  },
  {
    label: "Clear all orbits",
    hint: "orbit",
    keys: "orbit clear reset space",
    run: () => fire("orbit:reset"),
  },
  {
    label: "Open GitHub",
    hint: "link",
    keys: "github code",
    run: () => window.open("https://github.com/", "_blank", "noopener"),
  },
  {
    label: "Open LinkedIn",
    hint: "link",
    keys: "linkedin",
    run: () => window.open("https://www.linkedin.com/", "_blank", "noopener"),
  },
];

export function initPalette() {
  // --- build trigger button ---
  const actions = document.querySelector(".nav-actions");
  if (actions) {
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "btn btn-icon palette-trigger";
    trigger.textContent = "\u2318K";
    trigger.setAttribute("aria-label", "Open command palette");
    trigger.addEventListener("click", () => open());
    actions.insertBefore(trigger, actions.firstChild);
  }

  // --- build dialog ---
  const backdrop = document.createElement("div");
  backdrop.className = "palette-backdrop";
  backdrop.innerHTML = `
    <div class="palette" role="dialog" aria-modal="true" aria-label="Command palette">
      <input class="palette-input" type="text" placeholder="Type a command\u2026"
             aria-label="Search commands" aria-controls="palette-list"
             autocomplete="off" spellcheck="false" />
      <ul class="palette-list" id="palette-list" role="listbox"></ul>
      <div class="palette-foot">
        <span>&uarr;&darr; move</span><span>&crarr; run</span><span>esc close</span>
      </div>
    </div>`;
  document.body.appendChild(backdrop);

  const input = backdrop.querySelector(".palette-input");
  const list = backdrop.querySelector(".palette-list");
  let filtered = COMMANDS;
  let active = 0;

  const draw = () => {
    list.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("li");
      empty.className = "palette-empty";
      empty.textContent = "No matching commands.";
      list.appendChild(empty);
      return;
    }
    filtered.forEach((cmd, i) => {
      const li = document.createElement("li");
      li.className = "palette-item";
      li.id = `palette-item-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === active));
      li.innerHTML = `<span>${cmd.label}</span><span class="hint">${cmd.hint}</span>`;
      li.addEventListener("click", () => run(i));
      list.appendChild(li);
    });
    input.setAttribute("aria-activedescendant", `palette-item-${active}`);
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    filtered = COMMANDS.filter(
      (c) => !q || (c.label + " " + c.keys).toLowerCase().includes(q)
    );
    active = 0;
    draw();
  };

  function open() {
    input.value = "";
    filter();
    backdrop.classList.add("is-open");
    document.body.classList.add("palette-lock");
    input.focus();
  }

  const close = () => {
    backdrop.classList.remove("is-open");
    document.body.classList.remove("palette-lock");
  };

  function run(i) {
    const cmd = filtered[i];
    if (!cmd) {
      return;
    }
    close();
    cmd.run();
  }

  input.addEventListener("input", filter);

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      active = Math.min(active + 1, filtered.length - 1);
      draw();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active = Math.max(active - 1, 0);
      draw();
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(active);
    } else if (event.key === "Escape") {
      close();
    }
  });

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      close();
    }
  });

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const typing = /^(input|textarea)$/i.test(event.target.tagName);
    const isOpen = backdrop.classList.contains("is-open");
    if ((event.metaKey || event.ctrlKey) && key === "k") {
      event.preventDefault();
      open();
    } else if (key === "/" && !typing && !isOpen) {
      event.preventDefault();
      open();
    }
  });
}
