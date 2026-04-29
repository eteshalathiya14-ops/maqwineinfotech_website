import webIcon    from '../assets/web.png';
import mobileIcon  from '../assets/app.png';
import designIcon  from '../assets/ui-ux.png';

const SERVICES_DATA = [
  {
    slug:  'web-development',
    tag:   'Web',
    title: ' Full Stack Web Development',
    short: 'Fast, scalable web apps with modern tech. From MVP to enterprise — responsive, secure, and always performant.',
    hero:  'We craft high-performance web applications that drive real business results. Whether you need a lightning-fast landing page, a complex SaaS dashboard, or a full e-commerce platform — we deliver it with clean code and modern architecture.',
    icon:  webIcon,
    color: '#3b82f6',          // Blue
    gradientFrom: '#818cf8',
    gradientTo:   '#22d3ee',
    pills: ['React', 'Next.js', 'Node.js', 'REST API'],
    techStack: [
      { name: 'React',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',                                           color: 'cyan'   },
      { name: 'Next.js',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',                                         color: 'dark'   },
      { name: 'Node.js',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',                                         color: 'green'  },
      { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',                                 color: 'blue'   },
      { name: 'MongoDB',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',                                       color: 'green'  },
      { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',                                 color: 'teal'   },
      { name: 'AWS',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',           color: 'orange' },
      { name: 'Docker',     url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',                                         color: 'blue'   },
    ],
    features: [
      { title: 'Custom Web Applications',  desc: 'Tailored solutions built from scratch using React, Next.js, and Node.js — designed around your exact business needs.' },
      { title: 'E-Commerce Platforms',     desc: 'Powerful online stores with seamless payment integration, inventory management, and real-time analytics.' },
      { title: 'Admin Dashboards',         desc: 'Clean, intuitive dashboards with real-time data visualization, role-based access, and export capabilities.' },
      { title: 'API Development',          desc: 'Robust RESTful and GraphQL APIs, third-party integrations, and microservices architecture.' },
      { title: 'Performance Optimization', desc: 'Lighthouse score improvements, lazy loading, CDN setup, and Core Web Vitals tuning for blazing-fast pages.' },
      { title: 'SEO-Ready Structure',      desc: 'Server-side rendering, semantic HTML, structured data, and meta optimization for top search rankings.' },
    ],
    process: [
      { step: '01', title: 'Discovery',   desc: 'We understand your goals, audience, and business requirements.' },
      { step: '02', title: 'Design',      desc: 'Wireframes, prototypes, and UI designs approved before coding starts.' },
      { step: '03', title: 'Development', desc: 'Agile sprints with weekly demos and continuous feedback.' },
      { step: '04', title: 'Testing',     desc: 'Cross-browser, performance, and security testing.' },
      { step: '05', title: 'Launch',      desc: 'Deployment, monitoring setup, and handover documentation.' },
    ],
    faqs: [
      { q: 'How long does a web project take?',        a: 'Typically 4–12 weeks depending on complexity. Simple sites take 4 weeks, complex platforms 8–12 weeks.' },
      { q: 'Do you provide post-launch support?',      a: 'Yes! We offer 3 months of free bug fixes after launch, plus optional monthly maintenance plans.' },
      { q: 'Can you work with our existing codebase?', a: 'Absolutely. We regularly audit, refactor, and extend existing projects.' },
    ],
  },

  {
    slug:  'mobile-development',
    tag:   'Mobile',
    title: 'Mobile Apps Development',
    short: 'iOS & Android apps users love. Smooth native feel with cross-platform reach in one clean build cycle.',
    hero:  'We build mobile apps that users actually enjoy using. From sleek consumer apps to powerful enterprise tools — our cross-platform approach means you get iOS and Android from a single, maintainable codebase.',
    icon:  mobileIcon,
    color: '#3b82f6',          // Purple
    gradientFrom: '#818cf8',
    gradientTo:   '#22d3ee',
    pills: ['Flutter', 'React Native', 'iOS', 'Android'],
    techStack: [
      { name: 'Flutter',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',         color: 'blue'   },
      { name: 'React Native', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',             color: 'cyan'   },
      { name: 'Dart',         url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',               color: 'blue'   },
      { name: 'Swift',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',             color: 'orange' },
      { name: 'Kotlin',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',           color: 'purple' },
      { name: 'Firebase',     url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',          color: 'yellow' },
      { name: 'Android',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',         color: 'green'  },
    ],
    features: [
      { title: 'Cross-Platform Development', desc: 'One codebase for both iOS and Android using Flutter or React Native — saving you time and budget.' },
      { title: 'Native iOS & Android',       desc: 'When performance demands it, we build fully native apps using Swift (iOS) and Kotlin (Android).' },
      { title: 'UI/UX for Mobile',           desc: 'Platform-specific design patterns, smooth animations, and intuitive gestures for delightful experiences.' },
      { title: 'Backend & API Integration',  desc: 'Firebase, REST APIs, GraphQL — seamless data sync between your app and server.' },
      { title: 'Push Notifications',         desc: 'Smart notification systems with FCM/APNs, deep linking, and personalized targeting.' },
      { title: 'App Store Deployment',       desc: 'End-to-end support for Google Play and Apple App Store submission, review, and approval.' },
    ],
    process: [
      { step: '01', title: 'Strategy',    desc: 'Define user flows, platform choice, and MVP scope.' },
      { step: '02', title: 'UI Design',   desc: 'High-fidelity Figma prototypes for every screen.' },
      { step: '03', title: 'Development', desc: 'Sprint-based builds with TestFlight/Play Console betas.' },
      { step: '04', title: 'QA Testing',  desc: 'Device testing on 10+ real devices, performance profiling.' },
      { step: '05', title: 'Launch',      desc: 'App store submission and post-launch monitoring.' },
    ],
    faqs: [
      { q: 'Flutter or React Native — which is better?', a: 'Both are excellent. Flutter gives better performance. React Native is ideal if your team knows JavaScript.' },
      { q: 'How much does a mobile app cost?',           a: 'A basic app starts around ₹1.5–3 lakhs. Feature-rich apps range ₹5–15 lakhs depending on complexity.' },
      { q: 'Do you handle App Store submission?',        a: 'Yes, we manage the entire submission process for both Google Play and Apple App Store.' },
    ],
  },

  {
    slug:  'ui-ux-design',
    tag:   'Design',
    title: 'UI/UX Design Service',
    short: 'Designs that delight and convert. User-first thinking with pixel-perfect visuals across every screen size.',
    hero:  "Great design is not just how it looks — it's how it works. We create user experiences that are intuitive, beautiful, and backed by real user research.",
    icon:  designIcon,
    color: '#3b82f6',          // Amber
    gradientFrom: '#818cf8',
    gradientTo:   '#22d3ee',
    pills: ['Figma', 'Prototyping', 'Research', 'Design System'],
    techStack: [
      { name: 'Figma',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',              color: 'purple' },
      { name: 'Adobe XD',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',                       color: 'orange' },
      { name: 'Photoshop',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',          color: 'blue'   },
      { name: 'Illustrator', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',      color: 'yellow' },
      { name: 'Canva',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',               color: 'teal'   },
      { name: 'Sketch',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',             color: 'blue'   },
    ],
    features: [
      { title: 'User Research & Analysis',  desc: 'Interviews, surveys, and usability testing to understand your users before a single pixel is designed.' },
      { title: 'Wireframing & Prototyping', desc: 'Low and high-fidelity wireframes that map out every user journey before development begins.' },
      { title: 'Visual UI Design',          desc: 'Stunning, pixel-perfect interfaces that reflect your brand and delight users on every screen.' },
      { title: 'Design Systems',            desc: 'Scalable component libraries and style guides in Figma that keep your product consistent at scale.' },
      { title: 'Interaction Design',        desc: 'Micro-animations, transitions, and gestures that make your product feel alive and intuitive.' },
      { title: 'Accessibility (WCAG)',      desc: 'Color contrast, keyboard navigation, and screen reader support for inclusive design.' },
    ],
    process: [
      { step: '01', title: 'Research',                desc: 'User interviews, competitor analysis, and heuristic evaluation.' },
      { step: '02', title: 'Information Architecture', desc: 'Sitemaps, user flows, and content hierarchy.' },
      { step: '03', title: 'Wireframes',              desc: 'Low-fi sketches to validate structure before visual design.' },
      { step: '04', title: 'UI Design',               desc: 'High-fidelity Figma designs with your brand identity.' },
      { step: '05', title: 'Handoff',                 desc: 'Developer-ready specs, assets, and interactive prototype.' },
    ],
    faqs: [
      { q: 'Do you design for both mobile and web?', a: 'Yes, we design for all platforms — iOS, Android, web, and tablet — with platform-specific guidelines.' },
      { q: 'Will I get the Figma source files?',     a: 'Absolutely. All source files, assets, and design tokens are handed over at project completion.' },
      { q: 'Can you redesign our existing product?', a: 'Yes! We do UI audits and redesigns with a focus on improving usability and conversion.' },
    ],
  },
];

export default SERVICES_DATA;