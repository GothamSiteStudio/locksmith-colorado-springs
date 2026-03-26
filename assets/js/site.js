const navItems = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "services/index.html", label: "Services", page: "services" },
  { href: "service-areas/index.html", label: "Service Areas", page: "service-areas" },
  { href: "about/index.html", label: "About", page: "about" },
  { href: "contact/index.html", label: "Contact", page: "contact" }
];

const phoneHref = "tel:+17192573108";
const phoneLabel = "(719)&nbsp;257&#8209;3108";
const brandLogoPath = "images/logo.jpg";

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
        <a class="utility-link" href="${phoneHref}">Call&nbsp;${phoneLabel}</a>
      </div>
    </div>
    <div class="header-inner">
      <a class="brand" href="${normalizeHref(root, "index.html")}">
        <img class="brand-logo" src="${root}${brandLogoPath}" alt="Locksmith Solutions LLC logo" width="330" height="100">
        <span class="visually-hidden">Locksmith Solutions LLC, Colorado Springs Mobile Locksmith</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation">
        <span class="nav-toggle-box"><span></span></span>
      </button>
      <div class="header-actions">
        <nav class="main-nav" id="primary-nav" aria-label="Primary navigation">${navMarkup}</nav>
        <a class="header-cta" href="${phoneHref}">Call&nbsp;${phoneLabel}</a>
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
      <div class="footer-top">
        <div class="footer-intro">
          <a class="footer-brand" href="${normalizeHref(root, "index.html")}">
            <img class="footer-brand-logo" src="${root}${brandLogoPath}" alt="Locksmith Solutions LLC logo" width="330" height="100">
          </a>
          <p class="eyebrow">Locksmith Solutions LLC</p>
          <h2 class="footer-heading">Mobile locksmith help with faster contact, clearer navigation, and visible local trust.</h2>
          <p class="footer-note">Family-owned, licensed, and insured locksmith service for Colorado Springs and El Paso County. Call for lockouts, car key replacement, rekeying, smart locks, and business security work.</p>
          <div class="footer-quick-actions" aria-label="Quick contact actions">
            <a class="button button-primary" href="${phoneHref}">Call&nbsp;${phoneLabel}</a>
            <a class="button button-secondary" href="${normalizeHref(root, "contact/index.html")}">Request Service</a>
            <a class="button button-secondary" href="https://maps.app.goo.gl/x9CZTwCN2YEvm28m9" target="_blank" rel="noopener noreferrer">Open Google Maps</a>
          </div>
        </div>
        <section class="footer-map-card" aria-labelledby="footer-map-title">
          <div class="footer-map-copy">
            <p class="card-kicker">Google Business</p>
            <h3 id="footer-map-title">Find Locksmith Solutions LLC on Google Maps</h3>
            <p>Use the embedded map to open directions, confirm the business listing, or verify the local presence before you call.</p>
            <div class="footer-map-links">
              <a class="text-link" href="https://maps.app.goo.gl/x9CZTwCN2YEvm28m9" target="_blank" rel="noopener noreferrer">View Google Business profile</a>
              <a class="text-link" href="${phoneHref}">Call for immediate help</a>
            </div>
          </div>
          <div class="footer-map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6397.472852075466!2d-104.71000912411074!3d38.884501347465026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2efde641fc9af%3A0xb893eea8f4e61b21!2sLocksmith%20Solutions%20LLC!5e1!3m2!1sen!2sus!4v1774377306570!5m2!1sen!2sus"
              title="Google map showing Locksmith Solutions LLC"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
        </section>
      </div>
      <div class="footer-grid" aria-label="Footer navigation and business details">
        <div>
          <p class="card-kicker">Contact</p>
          <h3 class="footer-section-title">Reach the locksmith directly</h3>
          <ul class="footer-list">
            <li><a href="${phoneHref}">Call&nbsp;${phoneLabel}</a></li>
            <li><a href="mailto:yourlocksmith4@gmail.com">yourlocksmith4@gmail.com</a></li>
            <li><a href="${normalizeHref(root, "contact/index.html")}">Contact form and service request</a></li>
            <li>Mon-Fri 7:00am to 9:30pm</li>
            <li>Sat-Sun 8:00am to 9:00pm</li>
          </ul>
        </div>
        <div>
          <p class="card-kicker">Browse</p>
          <h3 class="footer-section-title">Navigate the main sections</h3>
          <ul class="footer-list">
            <li><a href="${normalizeHref(root, "index.html")}">Home</a></li>
            <li><a href="${normalizeHref(root, "services/index.html")}">Services</a></li>
            <li><a href="${normalizeHref(root, "service-areas/index.html")}">Service Areas</a></li>
            <li><a href="${normalizeHref(root, "about/index.html")}">About Us</a></li>
            <li><a href="${normalizeHref(root, "contact/index.html")}">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <p class="card-kicker">Popular Services</p>
          <h3 class="footer-section-title">Go straight to common requests</h3>
          <ul class="footer-list">
            <li><a href="${normalizeHref(root, "services/car-lockout.html")}">Car Lockout</a></li>
            <li><a href="${normalizeHref(root, "services/car-key-replacement.html")}">Car Key Replacement</a></li>
            <li><a href="${normalizeHref(root, "services/lock-rekey.html")}">Lock Rekey</a></li>
            <li><a href="${normalizeHref(root, "services/smart-lock-installation.html")}">Smart Lock Installation</a></li>
            <li><a href="${normalizeHref(root, "services/business-lockout.html")}">Business Lockout</a></li>
          </ul>
        </div>
        <div>
          <p class="card-kicker">Service Area</p>
          <h3 class="footer-section-title">Local coverage people search for</h3>
          <ul class="footer-list">
            <li><a href="${normalizeHref(root, "service-areas/colorado-springs.html")}">Colorado Springs</a></li>
            <li><a href="${normalizeHref(root, "service-areas/falcon.html")}">Falcon</a></li>
            <li><a href="${normalizeHref(root, "service-areas/monument.html")}">Monument</a></li>
            <li><a href="${normalizeHref(root, "service-areas/fountain.html")}">Fountain</a></li>
            <li><a href="${normalizeHref(root, "service-areas/manitou-springs.html")}">Manitou Springs</a></li>
          </ul>
        </div>
        <div>
          <p class="card-kicker">Trust Signals</p>
          <h3 class="footer-section-title">What people usually need to verify</h3>
          <ul class="footer-list footer-checklist">
            <li>Licensed and insured mobile locksmith</li>
            <li>Automotive, residential, and commercial service</li>
            <li>Serving Colorado Springs and surrounding communities</li>
            <li>Fastest response is by phone</li>
          </ul>
        </div>
        <div>
          <p class="card-kicker">Follow Us</p>
          <h3 class="footer-section-title">Profiles and review platforms</h3>
          <ul class="footer-list">
            <li><a href="https://www.facebook.com/locksmithsolutionsllc" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/locksmithsolutionsllc" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com/channel/UCPRSW-U8askxdzkPqYhhe2A" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://www.yelp.com/biz/locksmith-solutions-colorado-springs" target="_blank" rel="noopener noreferrer">Yelp</a></li>
            <li><a href="https://maps.app.goo.gl/x9CZTwCN2YEvm28m9" target="_blank" rel="noopener noreferrer">Google Business profile</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Fast mobile locksmith help across Colorado Springs and surrounding communities.</p>
        <p><a href="${phoneHref}">${phoneLabel}</a></p>
        <p>Locksmith Solutions LLC</p>
      </div>
      <div class="footer-credit">
        <p>Designed, built, and promoted by <a href="https://gothamsitestudio.com/" target="_blank" rel="noopener noreferrer">Gotham Site Studio</a></p>
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
  const header = document.querySelector(".site-header");

  if (!toggle || !nav) {
    return;
  }

  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  header.appendChild(backdrop);

  function getFocusableLinks() {
    return Array.from(nav.querySelectorAll('a[href]'));
  }

  const openNav = () => {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
    nav.classList.add("is-open");
    backdrop.classList.add("is-visible");
    document.body.classList.add("menu-open");

    const firstLink = getFocusableLinks()[0];
    if (firstLink) {
      firstLink.focus();
    }
  };

  const closeNav = (returnFocus) => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("menu-open");

    if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeNav(true);
    } else {
      openNav();
    }
  });

  backdrop.addEventListener("click", () => {
    closeNav(true);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeNav(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") {
      return;
    }

    if (event.key === "Escape") {
      closeNav(true);
      return;
    }

    if (event.key === "Tab") {
      const links = getFocusableLinks();
      const first = links[0];
      const last = links[links.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        toggle.focus();
      } else if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.focus();
      }
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
  mobileBar.setAttribute("role", "region");
  mobileBar.setAttribute("aria-label", "Quick contact");
  mobileBar.innerHTML = `
    <a class="button button-primary" href="${phoneHref}">Call&nbsp;${phoneLabel}</a>
    <a class="button button-secondary" href="${normalizeHref(root, "services/index.html")}">Services</a>
  `;

  shell.append(floating, mobileBar);
}

function setupFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const summary = item.querySelector("summary");

    if (summary) {
      summary.setAttribute("role", "button");
      summary.setAttribute("aria-expanded", String(item.open));
    }

    item.addEventListener("toggle", () => {
      if (summary) {
        summary.setAttribute("aria-expanded", String(item.open));
      }

      if (!item.open) {
        return;
      }

      items.forEach((other) => {
        if (other !== item) {
          other.open = false;
          const otherSummary = other.querySelector("summary");
          if (otherSummary) {
            otherSummary.setAttribute("aria-expanded", "false");
          }
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