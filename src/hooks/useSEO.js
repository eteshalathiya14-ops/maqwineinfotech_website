import { useEffect } from "react";

/**
 * useSEO — Advanced Dynamic SEO Hook
 * Har page pe alag title, description, keywords set karta hai
 *
 * Usage:
 *   useSEO({
 *     title: "Web Development Company in Surat",
 *     description: "...",
 *     keywords: "...",
 *     url: "https://www.maqwine.com/services",
 *     image: "https://www.maqwine.com/og-image.png",
 *     type: "website",          // og:type
 *     noIndex: false            // true karo toh Google index nahi karega
 *   })
 */
export function useSEO({
  title,
  description,
  keywords,
  url,
  image,
  type = "website",
  noIndex = false,
  schema = null,
}) {
  const SITE_NAME = "Maqwine Infotech";
  const DEFAULT_IMAGE = "https://www.maqwine.com/og-image.png";
  const DEFAULT_URL = "https://www.maqwine.com/";

  const fullTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : title + " | " + SITE_NAME
    : SITE_NAME + " | Best IT Company in Surat & Amroli";

  const finalUrl = url || DEFAULT_URL;
  const finalImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    // ── Title ──
    document.title = fullTitle;

    // ── Helper ──
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = attr.split("=");
        el.setAttribute(attrName, attrVal.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector("link[rel='" + rel + "']");
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // ── Primary meta ──
    if (description) setMeta('meta[name="description"]', 'name="description"', description);
    if (keywords)    setMeta('meta[name="keywords"]',    'name="keywords"',    keywords);

    // ── Robots ──
    setMeta(
      'meta[name="robots"]',
      'name="robots"',
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1"
    );

    // ── Canonical ──
    setLink("canonical", finalUrl);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]',       'property="og:title"',       fullTitle);
    setMeta('meta[property="og:description"]', 'property="og:description"', description);
    setMeta('meta[property="og:url"]',         'property="og:url"',         finalUrl);
    setMeta('meta[property="og:image"]',       'property="og:image"',       finalImage);
    setMeta('meta[property="og:type"]',        'property="og:type"',        type);
    setMeta('meta[property="og:site_name"]',   'property="og:site_name"',   SITE_NAME);

    // ── Twitter ──
    setMeta('meta[name="twitter:title"]',       'name="twitter:title"',       fullTitle);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', description);
    setMeta('meta[name="twitter:image"]',       'name="twitter:image"',       finalImage);
    setMeta('meta[name="twitter:card"]',        'name="twitter:card"',        "summary_large_image");

    // ── Dynamic Schema (per page JSON-LD) ──
    if (schema) {
      const existing = document.getElementById("dynamic-schema");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "dynamic-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // ── Cleanup on unmount ──
    return () => {
      const dynSchema = document.getElementById("dynamic-schema");
      if (dynSchema) dynSchema.remove();
    };
  }, [fullTitle, description, keywords, finalUrl, finalImage, noIndex, schema]);
}

// ── Page-wise SEO config export ──
export const PAGE_SEO = {
  home: {
    title: "Best IT Company in Surat & Amroli | Web & Mobile App Development",
    description:
      "Maqwine Infotech – #1 IT & software company in Surat & Amroli, Gujarat. Expert web development, mobile app development (Android & iOS), React, Flutter, Node.js, full stack & custom software. Affordable pricing for startups. 60+ projects, 40+ clients. Call: +917878601491",
    keywords:
      "best IT company in Surat, IT company in Amroli Surat, web development company in Surat, mobile app development company in Surat, Android app development Surat, iOS app development Surat, software company in Surat, hire web developer Surat, hire app developer Surat, React developer Surat India, Flutter app development Surat, custom software development Surat, affordable web development Surat",
    url: "https://www.maqwine.com/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Maqwine Infotech - Best IT Company in Surat",
      "url": "https://www.maqwine.com/",
      "description": "Best IT company in Surat & Amroli offering web & mobile app development",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maqwine.com/" }]
      }
    },
  },

  about: {
    title: "About Us | Best Software Company in Surat Since 2021 | Amroli",
    description:
      "Maqwine Infotech – Founded in 2021, based in Amroli, Surat, Gujarat. Best software & IT company in Surat with 3+ years experience, 60+ projects, 40+ happy clients. Expert team of React, Flutter, Node.js developers.",
    keywords:
      "about Maqwine Infotech, software company Surat, IT company Amroli Surat, best software company Surat, IT company Surat Gujarat, web development team Surat",
    url: "https://www.maqwine.com/about",
  },

  services: {
    title: "IT Services in Surat | Web, Mobile App, React, Flutter, Node.js",
    description:
      "Maqwine Infotech offers complete IT services in Surat: web development, Android & iOS mobile app development, React, Flutter, Node.js, full stack & custom software. Best web development company in Surat Gujarat. Affordable pricing for startups.",
    keywords:
      "web development company in Surat, mobile app development Surat, Android app development company Surat, iOS app development Surat, full stack development company Surat, backend development company India, custom software development Surat, IT services company Surat, affordable web development Surat, Flutter development Surat, React developer Surat, Node.js development Surat",
    url: "https://www.maqwine.com/services",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "IT Services - Maqwine Infotech Surat",
      "url": "https://www.maqwine.com/services",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.maqwine.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.maqwine.com/services" }
        ]
      }
    },
  },

  "web-development": {
    title: "Web Development Company in Surat | React, Next.js, Node.js",
    description:
      "Best web development company in Surat Gujarat. Full stack web development using React, Next.js, Node.js. Affordable website development for startups & businesses in Surat, Varacha, Katargam, Adajan, Amroli. Free quote available.",
    keywords:
      "web development company in Surat, best web development company Surat Gujarat, affordable web development Surat, hire web developer Surat, React developer Surat, Next.js developer Surat, website development cost Surat, web development company Varacha Surat, software company Katargam Surat",
    url: "https://www.maqwine.com/service/web-development",
  },

  "mobile-development": {
    title: "Mobile App Development Company in Surat | Android & iOS | Flutter",
    description:
      "Top mobile app development company in Surat. Android & iOS app development using Flutter and React Native. Affordable app development for startups & businesses in Surat, Gujarat. Best company for app development in Surat.",
    keywords:
      "mobile app development company in Surat, Android app development company Surat, iOS app development Surat, Flutter app development Surat, hire app developer Surat, app development cost Surat, best company for app development Surat, mobile app company Surat for startups, React Native developer Surat",
    url: "https://www.maqwine.com/service/mobile-development",
  },

  "ui-ux-design": {
    title: "UI/UX Design Company in Surat | Figma | Best Design Agency",
    description:
      "Professional UI/UX design services in Surat. Figma-based design, prototyping, user research. Best design agency for web and mobile apps in Surat, Gujarat.",
    keywords:
      "UI UX design company Surat, Figma designer Surat, mobile app design Surat, web design company Surat, best design agency Surat Gujarat",
    url: "https://www.maqwine.com/service/ui-ux-design",
  },

  technologies: {
    title: "React, Flutter, Node.js Experts in Surat | Hire Developers India",
    description:
      "Maqwine Infotech uses React, Flutter, Node.js, Next.js, Firebase, AWS, MongoDB. Hire React developer in Surat, hire Flutter developer Surat, hire Node.js developer India. Best tech stack company in Surat Gujarat.",
    keywords:
      "hire React developer Surat, hire Flutter developer Surat, hire web developer Surat, Node.js development company Surat, full stack developer Surat, hire React developer India, Flutter developer Surat, MongoDB developer Surat, Firebase developer Surat",
    url: "https://www.maqwine.com/technologies",
  },

  portfolio: {
    title: "Our Work & Portfolio | IT Company Surat | 60+ Projects Delivered",
    description:
      "View Maqwine Infotech portfolio – 60+ projects including e-commerce websites, mobile apps, AI dashboards. Best web & app development company in Surat delivering quality projects for clients in Surat, Gujarat and across India.",
    keywords:
      "portfolio IT company Surat, web development projects Surat, mobile app portfolio Surat, software company work Surat, best company for app development Surat, web development examples Surat",
    url: "https://www.maqwine.com/portfolio",
  },

  contact: {
    title: "Contact Us | IT Company Surat | Free Project Quote",
    description:
      "Contact Maqwine Infotech – best IT company in Surat, Amroli. Get a FREE quote for web development, mobile app, Android/iOS app, or custom software. Call: +917878601491 | Email: maqwineinfotech@gmail.com",
    keywords:
      "contact IT company Surat, web development company contact Surat, mobile app development Surat contact, hire developer Surat, free quote web development Surat, IT company Amroli Surat contact, app development cost Surat",
    url: "https://www.maqwine.com/contact",
  },
};