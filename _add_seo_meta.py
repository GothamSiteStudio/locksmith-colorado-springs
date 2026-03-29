"""Add OG tags, Twitter cards, og:image, and Schema JSON-LD to all pages missing them."""
import os
import re

BASE_URL = "https://www.locksmithsolutionsllc.com"
OG_IMAGE = f"{BASE_URL}/images/logo.jpg"

HAVE_OG = [
    "index.html",
    "services/car-lockout.html",
    "services/car-key-replacement.html",
    "services/transponder-key-programming.html",
]

NEED_OG = [
    "about/index.html",
    "contact/index.html",
    "services/index.html",
    "service-areas/index.html",
    "service-areas/colorado-springs.html",
    "service-areas/briargate.html",
    "service-areas/monument.html",
    "service-areas/fountain.html",
    "service-areas/falcon.html",
    "service-areas/manitou-springs.html",
    "service-areas/security-widefield.html",
    "service-areas/black-forest.html",
    "services/house-lockout.html",
    "services/lock-rekey.html",
    "services/smart-lock-installation.html",
    "services/lock-installation-repair.html",
    "services/safe-lockout.html",
    "services/business-lockout.html",
    "services/panic-bar-installation.html",
    "services/master-key-systems.html",
    "services/high-security-locks.html",
]

AREA_NAMES = {
    "colorado-springs": "Colorado Springs",
    "briargate": "Briargate",
    "monument": "Monument",
    "fountain": "Fountain",
    "falcon": "Falcon",
    "manitou-springs": "Manitou Springs",
    "security-widefield": "Security-Widefield",
    "black-forest": "Black Forest",
}

SERVICE_INFO = {
    "house-lockout": {
        "name": "House Lockout Service",
        "type": "House Lockout",
        "desc": "Emergency house lockout and residential entry service in Colorado Springs, CO and surrounding areas.",
    },
    "lock-rekey": {
        "name": "Lock Rekey Service",
        "type": "Lock Rekey",
        "desc": "Lock rekey service for homes, rentals, and offices in Colorado Springs, CO and surrounding areas.",
    },
    "smart-lock-installation": {
        "name": "Smart Lock Installation",
        "type": "Smart Lock Installation",
        "desc": "Smart lock and electronic lock installation service in Colorado Springs, CO and surrounding areas.",
    },
    "lock-installation-repair": {
        "name": "Lock Installation and Repair",
        "type": "Lock Installation and Repair",
        "desc": "Lock installation and repair service for residential and commercial properties in Colorado Springs, CO.",
    },
    "safe-lockout": {
        "name": "Safe Lockout Service",
        "type": "Safe Lockout",
        "desc": "Safe lockout and combination recovery service in Colorado Springs, CO and surrounding areas.",
    },
    "business-lockout": {
        "name": "Business Lockout Service",
        "type": "Business Lockout",
        "desc": "Commercial lockout and business entry service in Colorado Springs, CO and surrounding areas.",
    },
    "panic-bar-installation": {
        "name": "Panic Bar Installation",
        "type": "Panic Bar Installation",
        "desc": "Panic bar and exit device installation for commercial properties in Colorado Springs, CO.",
    },
    "master-key-systems": {
        "name": "Master Key Systems",
        "type": "Master Key Systems",
        "desc": "Master key system design and installation for commercial and multi-door properties in Colorado Springs, CO.",
    },
    "high-security-locks": {
        "name": "High Security Locks",
        "type": "High Security Locks",
        "desc": "High security lock installation and restricted key control service in Colorado Springs, CO.",
    },
}


def extract_meta(html):
    title = ""
    desc = ""
    canonical = ""
    m = re.search(r"<title>(.*?)</title>", html)
    if m:
        title = m.group(1)
    m = re.search(r'<meta\s+name="description"\s+content="(.*?)"', html)
    if m:
        desc = m.group(1)
    m = re.search(r'<link\s+rel="canonical"\s+href="(.*?)"', html)
    if m:
        canonical = m.group(1)
    return title, desc, canonical


def build_og_block(title, desc, url, indent="  "):
    return (
        f'\n{indent}<meta property="og:type" content="website">'
        f'\n{indent}<meta property="og:title" content="{title}">'
        f'\n{indent}<meta property="og:description" content="{desc}">'
        f'\n{indent}<meta property="og:url" content="{url}">'
        f'\n{indent}<meta property="og:image" content="{OG_IMAGE}">'
        f'\n{indent}<meta name="twitter:card" content="summary_large_image">'
        f'\n{indent}<meta name="twitter:title" content="{title}">'
        f'\n{indent}<meta name="twitter:description" content="{desc}">'
    )


def build_area_schema(area_name, canonical, indent="  "):
    return f"""
{indent}<script type="application/ld+json">
{indent}  {{
{indent}    "@context": "https://schema.org",
{indent}    "@type": "Locksmith",
{indent}    "name": "Locksmith Solutions LLC",
{indent}    "url": "{BASE_URL}/",
{indent}    "telephone": "+1-719-257-3108",
{indent}    "email": "yourlocksmith4@gmail.com",
{indent}    "areaServed": {{
{indent}      "@type": "City",
{indent}      "name": "{area_name}",
{indent}      "containedInPlace": {{ "@type": "State", "name": "Colorado" }}
{indent}    }},
{indent}    "address": {{
{indent}      "@type": "PostalAddress",
{indent}      "addressLocality": "Colorado Springs",
{indent}      "addressRegion": "CO",
{indent}      "addressCountry": "US"
{indent}    }}
{indent}  }}
{indent}</script>"""


def build_service_schema(info, canonical, indent="  "):
    return f"""
{indent}<script type="application/ld+json">
{indent}  {{
{indent}    "@context": "https://schema.org",
{indent}    "@type": "Service",
{indent}    "name": "{info['name']}",
{indent}    "description": "{info['desc']}",
{indent}    "provider": {{
{indent}      "@type": "Locksmith",
{indent}      "name": "Locksmith Solutions LLC",
{indent}      "telephone": "+1-719-257-3108",
{indent}      "url": "{BASE_URL}/",
{indent}      "areaServed": ["Colorado Springs", "Briargate", "Monument", "Fountain", "Falcon", "Manitou Springs", "Security-Widefield", "Black Forest"]
{indent}    }},
{indent}    "areaServed": {{
{indent}      "@type": "City",
{indent}      "name": "Colorado Springs",
{indent}      "containedInPlace": {{ "@type": "State", "name": "Colorado" }}
{indent}    }},
{indent}    "serviceType": "{info['type']}",
{indent}    "url": "{canonical}"
{indent}  }}
{indent}</script>"""


def build_about_schema(indent="  "):
    return f"""
{indent}<script type="application/ld+json">
{indent}  {{
{indent}    "@context": "https://schema.org",
{indent}    "@type": "Locksmith",
{indent}    "name": "Locksmith Solutions LLC",
{indent}    "url": "{BASE_URL}/",
{indent}    "telephone": "+1-719-257-3108",
{indent}    "email": "yourlocksmith4@gmail.com",
{indent}    "description": "Family-owned mobile locksmith with over 10 years of experience in Colorado Springs, CO.",
{indent}    "areaServed": ["Colorado Springs", "Briargate", "Monument", "Fountain", "Falcon", "Manitou Springs", "Security-Widefield", "Black Forest"],
{indent}    "address": {{
{indent}      "@type": "PostalAddress",
{indent}      "addressLocality": "Colorado Springs",
{indent}      "addressRegion": "CO",
{indent}      "addressCountry": "US"
{indent}    }}
{indent}  }}
{indent}</script>"""


def build_contact_schema(indent="  "):
    return f"""
{indent}<script type="application/ld+json">
{indent}  {{
{indent}    "@context": "https://schema.org",
{indent}    "@type": "Locksmith",
{indent}    "name": "Locksmith Solutions LLC",
{indent}    "url": "{BASE_URL}/",
{indent}    "telephone": "+1-719-257-3108",
{indent}    "email": "yourlocksmith4@gmail.com",
{indent}    "contactPoint": {{
{indent}      "@type": "ContactPoint",
{indent}      "telephone": "+1-719-257-3108",
{indent}      "contactType": "customer service",
{indent}      "email": "yourlocksmith4@gmail.com",
{indent}      "areaServed": "Colorado Springs"
{indent}    }},
{indent}    "address": {{
{indent}      "@type": "PostalAddress",
{indent}      "addressLocality": "Colorado Springs",
{indent}      "addressRegion": "CO",
{indent}      "addressCountry": "US"
{indent}    }}
{indent}  }}
{indent}</script>"""


def process_file(filepath, file_key):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    title, desc, canonical = extract_meta(html)
    basename = os.path.splitext(os.path.basename(filepath))[0]
    changed = False

    # --- Add OG + Twitter tags ---
    if file_key in NEED_OG and "og:title" not in html:
        canonical_match = re.search(
            r'(<link\s+rel="canonical"\s+href="[^"]*">)', html
        )
        if canonical_match:
            og_block = build_og_block(title, desc, canonical)
            html = html.replace(
                canonical_match.group(1),
                canonical_match.group(1) + og_block,
            )
            changed = True

    # --- Add og:image to pages that already have OG but missing og:image ---
    if file_key in HAVE_OG and "og:image" not in html:
        og_url_match = re.search(
            r'(<meta\s+property="og:url"\s+content="[^"]*">)', html
        )
        if og_url_match:
            html = html.replace(
                og_url_match.group(1),
                og_url_match.group(1)
                + f'\n  <meta property="og:image" content="{OG_IMAGE}">',
            )
            changed = True

    # --- Add Schema JSON-LD where missing ---
    has_schema = '"@context"' in html

    if not has_schema:
        schema = ""
        if file_key == "about/index.html":
            schema = build_about_schema()
        elif file_key == "contact/index.html":
            schema = build_contact_schema()
        elif file_key.startswith("service-areas/") and basename in AREA_NAMES:
            schema = build_area_schema(AREA_NAMES[basename], canonical)
        elif file_key.startswith("services/") and basename in SERVICE_INFO:
            schema = build_service_schema(SERVICE_INFO[basename], canonical)

        if schema:
            html = html.replace("</head>", schema + "\n</head>")
            changed = True

    if changed:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)

    return changed


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    all_files = NEED_OG + HAVE_OG
    ok = 0
    fail = 0

    for file_key in all_files:
        filepath = os.path.join(base_dir, file_key.replace("/", os.sep))
        try:
            changed = process_file(filepath, file_key)
            status = "UPDATED" if changed else "SKIPPED (already has tags)"
            print(f"  {status}: {file_key}")
            ok += 1
        except Exception as e:
            print(f"  FAIL: {file_key} - {e}")
            fail += 1

    print(f"\nDone: {ok} OK, {fail} failed")


if __name__ == "__main__":
    main()
