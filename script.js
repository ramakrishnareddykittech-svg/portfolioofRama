const roles = [
  "Cloud Platform Engineer",
  "AKS Specialist",
  "Terraform Automation Engineer",
  "Azure DevOps Pipeline Builder",
  "Cloud Security Practitioner"
];

const typedRole = document.querySelector("#typed-role");
const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contact-form");
const statusLine = document.querySelector(".form-status");
const navLinks = document.querySelectorAll(".nav-link");
const copyLinks = document.querySelectorAll(".copy-link");
const resumeLinks = document.querySelectorAll(".resume-link");
const motionScene = document.querySelector(".motion-scene");
const workflowMedia = document.querySelectorAll(".workflow-media");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function setTheme(mode, { persist = true } = {}) {
  document.body.classList.toggle("dark", mode === "dark");
  themeToggle?.setAttribute("aria-pressed", String(mode === "dark"));
  themeToggle?.setAttribute(
    "aria-label",
    mode === "dark" ? "Enable light mode" : "Enable dark mode"
  );

  if (!persist) return;

  try {
    localStorage.setItem("portfolio-theme", mode);
  } catch {
    // The selected theme still works when browser storage is unavailable.
  }
}

function typeRole() {
  if (!typedRole) return;
  if (reduceMotion.matches) {
    typedRole.textContent = roles[0];
    return;
  }

  const current = roles[roleIndex];
  typedRole.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    window.setTimeout(typeRole, 65);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    window.setTimeout(typeRole, 1300);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(typeRole, 34);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  window.setTimeout(typeRole, 180);
}

function filterProjects(filter) {
  projectCards.forEach((card) => {
    const tags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
    const isVisible = filter === "all" || tags.includes(filter);
    card.classList.toggle("hidden", !isVisible);
  });
}

function updateActiveNav() {
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  let current = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 140) current = section;
  });

  if (!current) return;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function showToast(message) {
  let toast = document.querySelector(".site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function setupMotionScene() {
  if (!motionScene || reduceMotion.matches) return;

  motionScene.addEventListener("pointermove", (event) => {
    const bounds = motionScene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    motionScene.style.setProperty("--scene-x", `${x * 10}px`);
    motionScene.style.setProperty("--scene-y", `${y * 8}px`);
  });

  motionScene.addEventListener("pointerleave", () => {
    motionScene.style.setProperty("--scene-x", "0px");
    motionScene.style.setProperty("--scene-y", "0px");
  });
}

function setupViewportAnimations() {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    workflowMedia.forEach((media) => media.classList.remove("is-playing"));
    return;
  }

  const workflowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-playing", entry.isIntersecting);
      });
    },
    { threshold: 0.32, rootMargin: "0px 0px -8% 0px" }
  );

  workflowMedia.forEach((media) => workflowObserver.observe(media));
}

function setupScrollReveals() {
  const revealItems = document.querySelectorAll(
    ".section-heading-row, .value-grid article, .pipeline-stage, .skill-card, .project-card, .timeline-item, .cert-card, .note-list article, .concept-node, .contact-panel"
  );

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

async function copyText(value, message) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(value);
    showToast(message);
  } catch {
    showToast(`Email: ${value}`);
  }
}

themeToggle?.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  setTheme(next);
});

copyLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const value = link.dataset.copy;
    if (value) copyText(value, "Email copied. You can paste it into Gmail or Outlook.");
  });
});

resumeLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showToast("Resume download started.");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    filterProjects(button.dataset.filter);
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name")?.toString().trim() || "there";
  const email = data.get("email")?.toString().trim() || "";
  const message = data.get("message")?.toString().trim() || "";
  const recipient = contactForm.dataset.recipient;
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  if (statusLine) {
    statusLine.textContent = `Thanks ${name}. Opening your email app now.`;
  }

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

window.addEventListener("scroll", updateActiveNav, { passive: true });

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  savedTheme = null;
}
const preferredTheme =
  savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(preferredTheme, { persist: false });

typeRole();
updateActiveNav();
setupMotionScene();
setupViewportAnimations();
setupScrollReveals();
