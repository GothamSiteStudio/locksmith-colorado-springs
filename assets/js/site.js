const navItems = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "services/index.html", label: "Services", page: "services" },
  { href: "service-areas/index.html", label: "Service Areas", page: "service-areas" },
  { href: "about/index.html", label: "About", page: "about" },
  { href: "contact/index.html", label: "Contact", page: "contact" }
];

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
    <div class="header-inner">
      <a class="brand" href="${normalizeHref(root, "index.html")}">
        <span class="brand-name">Locksmith Solutions LLC</span>
        <span class="brand-subtitle">Colorado Springs Mobile Locksmith</span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">${navMarkup}</nav>
      <a class="header-cta" href="tel:+17192573108">(719) 257-3108</a>
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
          <h3>Mobile locksmith support across Colorado Springs and nearby communities.</h3>
          <p class="footer-note">Fast local service for automotive, residential, and commercial locksmith needs with cleaner site architecture built for future SEO growth.</p>
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
              <li><a href="${normalizeHref(root, "about/index.html")}">About</a></li>
              <li><a href="${normalizeHref(root, "contact/index.html")}">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
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

renderHeader();
renderFooter();
setupReveal();