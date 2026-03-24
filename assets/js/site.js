const navItems = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "services/index.html", label: "Services", page: "services" },
  { href: "service-areas/index.html", label: "Service Areas", page: "service-areas" },
  { href: "about/index.html", label: "About", page: "about" },
  { href: "contact/index.html", label: "Contact", page: "contact" }
];

const phoneHref = "tel:+17192573108";
const phoneLabel = "(719) 257-3108";

function normalizeHref(root, href) {
  if (href === "index.html" && root) {
    return `${root}index.html`;
  }

  return `${root}${href}`;
}

function renderHeader() {
  const header = document.querySelector("[data-site-header]");

  if (!header) {
    return;
  }

  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";

  const navMarkup = navItems.map((item) => {
    const current = page === item.page ? ' aria-current="page"' : "";
    return `<a href="${normalizeHref(root, item.href)}"${current}>${item.label}</a>`;
  }).join("");

  header.innerHTML = `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="site-utility">
      <div class="header-inner utility-inner">
        <p>Locked out or need a fast quote? Call now for mobile locksmith help.</p>
        <a class="utility-link" href="${phoneHref}">Call ${phoneLabel}</a>
      </div>
    </div>
    <div class="header-inner">
      <a class="brand" href="${normalizeHref(root, "index.html")}">
        <img class="brand-logo" src="${root}images/logo.svg" alt="Locksmith Solutions LLC logo" width="40" height="40">
        <div>
          <span class="brand-name">Locksmith Solutions LLC</span>
          <span class="brand-subtitle">Colorado Springs Mobile Locksmith</span>
        </div>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation">
        <span class="nav-toggle-box"><span></span></span>
      </button>
      <div class="header-actions">
        <nav class="main-nav" id="primary-nav" aria-label="Primary navigation">${navMarkup}</nav>
        <a class="header-cta" href="${phoneHref}">Call ${phoneLabel}</a>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector("[data-site-footer]");

  if (!footer) {
    return;
  }

  const root = document.body.dataset.root || "";

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <p class="eyebrow">Locksmith Solutions LLC</p>
          <h3>Family-owned mobile locksmith serving Colorado Springs and El Paso County.</h3>
          <p class="footer-note">With over 10 years of experience, we provide fast, honest, and affordable automotive, residential, and commercial locksmith service. Licensed and insured.</p>
        </div>
        <div class="content-grid">
          <div>
            <p class="card-kicker">Contact</p>
            <ul class="footer-list">
              <li><a href="tel:+17192573108">(719) 257-3108</a></li>
              <li><a href="mailto:yourlocksmith4@gmail.com">yourlocksmith4@gmail.com</a></li>
              <li>Mon-Fri 7:00am to 9:30pm</li>
              <li>Sat-Sun 8:00am to 9:00pm</li>
            </ul>
          </div>
          <div>
            <p class="card-kicker">Browse</p>
            <ul class="footer-list">
              <li><a href="${normalizeHref(root, "services/index.html")}">Services</a></li>
              <li><a href="${normalizeHref(root, "service-areas/index.html")}">Service Areas</a></li>
              <li><a href="${normalizeHref(root, "about/index.html")}">About Us</a></li>
              <li><a href="${normalizeHref(root, "contact/index.html")}">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <p class="card-kicker">Popular Services</p>
            <ul class="footer-list">
              <li><a href="${normalizeHref(root, "services/car-lockout.html")}">Car Lockout</a></li>
              <li><a href="${normalizeHref(root, "services/car-key-replacement.html")}">Car Key Replacement</a></li>
              <li><a href="${normalizeHref(root, "services/lock-rekey.html")}">Lock Rekey</a></li>
              <li><a href="${normalizeHref(root, "services/smart-lock-installation.html")}">Smart Lock Installation</a></li>
            </ul>
          </div>
          <div>
            <p class="card-kicker">Follow Us</p>
            <ul class="footer-list">
              <li><a href="https://www.facebook.com/locksmithsolutionsllc" target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="https://www.instagram.com/locksmithsolutionsllc" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCPRSW-U8askxdzkPqYhhe2A" target="_blank" rel="noopener">YouTube</a></li>
              <li><a href="https://www.yelp.com/biz/locksmith-solutions-colorado-springs" target="_blank" rel="noopener">Yelp</a></li>
              <li><a href="https://maps.app.goo.gl/x9CZTwCN2YEvm28m9" target="_blank" rel="noopener">Google Maps</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Fast mobile locksmith help across Colorado Springs and surrounding communities.</p>
          <p><a href="${phoneHref}">${phoneLabel}</a></p>
        </div>
      </div>
    </div>
  `;
}

function ensureMainAnchor() {
  const main = document.querySelector("main");

  if (main && !main.id) {
    main.id = "main-content";
  }
}

function formatSegment(segment) {
  return segment
    .replace(/\.html$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderBreadcrumbs() {
  const main = document.querySelector("main");
  const header = document.querySelector("[data-site-header]");

  if (!main || !header) {
    return;
  }

  const root = document.body.dataset.root || "";
  const page = document.body.dataset.page || "";
  const segments = window.location.pathname.split("/").filter(Boolean);
  const crumbs = [{ href: normalizeHref(root, "index.html"), label: "Home" }];

  if (page === "services") {
    crumbs.push({ href: normalizeHref(root, "services/index.html"), label: "Services" });
  }

  if (page === "service-areas") {
    crumbs.push({ href: normalizeHref(root, "service-areas/index.html"), label: "Service Areas" });
  }

  if (page === "about") {
    crumbs.push({ href: normalizeHref(root, "about/index.html"), label: "About" });
  }

  if (page === "contact") {
    crumbs.push({ href: normalizeHref(root, "contact/index.html"), label: "Contact" });
  }

  const current = segments.at(-1);
  const currentIsIndex = !current || /^index\.html$/i.test(current);

  if (!currentIsIndex && current) {
    crumbs.push({ label: formatSegment(current) });
  }

  if (crumbs.length < 2) {
    return;
  }

  const wrap = document.createElement("div");
  wrap.className = "breadcrumbs-wrap";
  wrap.innerHTML = `
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        ${crumbs.map((crumb, index) => {
          const separator = index < crumbs.length - 1 ? '<span class="breadcrumbs-separator" aria-hidden="true">/</span>' : "";

          if (crumb.href && index < crumbs.length - 1) {
            return `<a href="${crumb.href}">${crumb.label}</a>${separator}`;
          }

          return `<span aria-current="page">${crumb.label}</span>${separator}`;
        }).join("")}
      </nav>
    </div>
  `;

  main.prepend(wrap);
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) {
    return;
  }

  const closeNav = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function renderFloatingCta() {
  const root = document.body.dataset.root || "";
  const shell = document.querySelector(".site-shell");

  if (!shell) {
    return;
  }

  const floating = document.createElement("div");
  floating.className = "floating-call";
  floating.innerHTML = `
    <p><strong>Need help now?</strong><br>Fastest response is by phone.</p>
    <div class="floating-call-actions">
      <a class="button button-primary" href="${phoneHref}">Call Now</a>
      <a class="button button-secondary" href="${normalizeHref(root, "contact/index.html")}">Contact</a>
    </div>
  `;

  const mobileBar = document.createElement("div");
  mobileBar.className = "mobile-cta-bar";
  mobileBar.innerHTML = `
    <a class="button button-primary" href="${phoneHref}">Call ${phoneLabel}</a>
    <a class="button button-secondary" href="${normalizeHref(root, "services/index.html")}">Services</a>
  `;

  shell.append(floating, mobileBar);
}

function setupFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      items.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
}

function setupScrollProgress() {
  const progress = document.createElement("div");
  progress.className = "page-progress";
  document.body.append(progress);

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");

  if (!nodes.length) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  nodes.forEach((node) => observer.observe(node));
}

ensureMainAnchor();
renderHeader();
renderFooter();
renderBreadcrumbs();
setupMobileNav();
renderFloatingCta();
setupFaqAccordion();
setupScrollProgress();
setupReveal();