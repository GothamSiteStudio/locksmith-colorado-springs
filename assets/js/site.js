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
        <img class="brand-logo" src="${root}images/logo.svg" alt="Locksmith Solutions LLC logo" width="40" height="40">
        <div>
          <span class="brand-name">Locksmith Solutions LLC</span>
          <span class="brand-subtitle">Colorado Springs Mobile Locksmith</span>
        </div>
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