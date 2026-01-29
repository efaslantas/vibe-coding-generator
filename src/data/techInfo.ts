// Technology descriptions and information for vibe coding

export interface TechInfo {
  description: string;
  useCase: string;
  pros: string[];
  cons: string[];
  learnMore?: string;
}

export const techInfo: Record<string, TechInfo> = {
  // Languages
  'js-ts': {
    description: 'JavaScript/TypeScript - Web\'in dili. TypeScript ile tip guvenligi.',
    useCase: 'Frontend, Backend (Node.js), Full-stack uygulamalar',
    pros: ['Genis ekosistem', 'Her yerde calisir', 'Buyuk topluluk'],
    cons: ['Runtime hatalari (JS)', 'Callback hell'],
  },
  'python': {
    description: 'Python - Okunabilir, cok amacli programlama dili.',
    useCase: 'Backend API, Data Science, Otomasyon, ML/AI',
    pros: ['Kolay ogrenilir', 'Zengin kutuphane', 'Hizli gelistirme'],
    cons: ['Performans', 'GIL limiti', 'Mobil desteği zayif'],
  },
  'go': {
    description: 'Go - Google\'in sistem programlama dili. Basit ve hizli.',
    useCase: 'Microservices, CLI tools, Sistem programlama',
    pros: ['Cok hizli', 'Kolay concurrency', 'Tek binary'],
    cons: ['Generics yeni', 'Verbose hata yonetimi'],
  },
  'php': {
    description: 'PHP - Web\'in klasik server-side dili.',
    useCase: 'Web apps, CMS (WordPress), E-commerce',
    pros: ['Yaygin hosting', 'Kolay baslangic', 'Laravel/Symfony'],
    cons: ['Tutarsiz API', 'Eski imaj'],
  },

  // Frontend
  'react': {
    description: 'React - Facebook\'un UI kutuphanesi. Component-based.',
    useCase: 'SPA, Mobil (React Native), Complex UI',
    pros: ['Virtual DOM', 'Buyuk ekosistem', 'React Native'],
    cons: ['JSX ogrenim egrisi', 'Hizli degisim'],
  },
  'nextjs': {
    description: 'Next.js - React\'in full-stack framework\'u. SSR, SSG, API routes.',
    useCase: 'Production React apps, SEO-critical sites, Full-stack',
    pros: ['Vercel entegrasyonu', 'SSR/SSG', 'App Router', 'API Routes'],
    cons: ['Vercel vendor lock-in riski', 'Complexity'],
  },
  'vue': {
    description: 'Vue - Progressive JavaScript framework.',
    useCase: 'SPA, Incremental adoption, Orta olcekli projeler',
    pros: ['Kolay ogrenilir', 'Tek dosya component', 'Reactive'],
    cons: ['Kucuk ekosistem', 'Az enterprise kullanim'],
  },
  'nuxt': {
    description: 'Nuxt - Vue\'nun full-stack framework\'u. Next.js alternatifi.',
    useCase: 'Production Vue apps, SSR/SSG, Full-stack',
    pros: ['Vue ecosystem', 'Auto imports', 'File-based routing'],
    cons: ['Vue bagimliligi', 'Breaking changes'],
  },
  'angular': {
    description: 'Angular - Google\'in full-featured framework\'u.',
    useCase: 'Enterprise SPA, Buyuk ekipler, Complex apps',
    pros: ['Full-featured', 'TypeScript native', 'CLI'],
    cons: ['Ogrenme egrisi', 'Bundle size', 'Verbose'],
  },
  'svelte': {
    description: 'Svelte - Compile-time framework. No virtual DOM.',
    useCase: 'Performans kritik UI, Kucuk bundle size',
    pros: ['Cok hizli', 'Az kod', 'Kucuk bundle'],
    cons: ['Kucuk ekosistem', 'Az is ilani'],
  },
  'remix': {
    description: 'Remix - Full-stack React framework. Web standards odakli.',
    useCase: 'Full-stack React, Form handling, Progressive enhancement',
    pros: ['Web standards', 'Nested routing', 'Error boundaries'],
    cons: ['Yeni', 'Kucuk ekosistem'],
  },
  'astro': {
    description: 'Astro - Content-focused static site builder. Island architecture.',
    useCase: 'Content sites, Blogs, Documentation, Marketing',
    pros: ['Zero JS default', 'Framework agnostic', 'Cok hizli'],
    cons: ['Limited interactivity', 'Yeni'],
  },

  // Backend
  'nodejs': {
    description: 'Node.js - JavaScript runtime. Event-driven, non-blocking.',
    useCase: 'REST API, Real-time apps, Microservices',
    pros: ['Hizli I/O', 'NPM ekosistemi', 'Fullstack JS'],
    cons: ['CPU-intensive isler', 'Callback complexity'],
  },
  'nestjs': {
    description: 'NestJS - Enterprise-grade Node.js framework. Angular-inspired.',
    useCase: 'Enterprise APIs, Microservices, GraphQL',
    pros: ['TypeScript native', 'Modular', 'Decorators', 'Testing'],
    cons: ['Ogrenme egrisi', 'Boilerplate'],
  },
  'django': {
    description: 'Django - Python\'in batteries-included framework\'u.',
    useCase: 'Hizli MVP, Admin panel, Content sites',
    pros: ['Admin panel', 'ORM', 'Guvenlik'],
    cons: ['Monolitik', 'Async support yeni'],
  },
  'fastapi': {
    description: 'FastAPI - Modern, hizli Python API framework.',
    useCase: 'REST API, Microservices, ML model serving',
    pros: ['Cok hizli', 'Auto docs', 'Type hints'],
    cons: ['Yeni', 'Daha az kaynak'],
  },
  'flask': {
    description: 'Flask - Minimalist Python web framework.',
    useCase: 'Simple APIs, Microservices, Prototyping',
    pros: ['Basit', 'Esnek', 'Kolay ogrenilir'],
    cons: ['No batteries', 'Manual setup'],
  },
  'gin': {
    description: 'Gin - Go\'nun en populer web framework\'u.',
    useCase: 'High-performance API, Microservices',
    pros: ['Cok hizli', 'Minimalist', 'Middleware'],
    cons: ['Manuel isler', 'Az magic'],
  },
  'laravel': {
    description: 'Laravel - PHP\'nin modern full-stack framework\'u.',
    useCase: 'Web apps, APIs, SaaS products',
    pros: ['Elegant syntax', 'Ecosystem (Forge, Vapor)', 'Blade templating'],
    cons: ['PHP bagimliligi', 'Performance'],
  },

  // Database
  'postgresql': {
    description: 'PostgreSQL - En gelismis acik kaynak SQL veritabani.',
    useCase: 'OLTP, Complex queries, JSON, GIS',
    pros: ['Feature-rich', 'ACID', 'Extensible'],
    cons: ['Operasyonel karmasiklik', 'Horizontal scale'],
  },
  'mysql': {
    description: 'MySQL - En yaygin acik kaynak SQL veritabani.',
    useCase: 'Web apps, Read-heavy workloads',
    pros: ['Basit', 'Hizli read', 'Yaygin hosting'],
    cons: ['Eksik features', 'Oracle sahipligi'],
  },
  'mongodb': {
    description: 'MongoDB - Document-based NoSQL veritabani.',
    useCase: 'Flexible schema, JSON data, Rapid development',
    pros: ['Flexible', 'Horizontal scale', 'Developer friendly'],
    cons: ['No joins', 'Memory', 'Consistency'],
  },
  'redis': {
    description: 'Redis - In-memory data store. Cache ve daha fazlasi.',
    useCase: 'Caching, Sessions, Pub/Sub, Rate limiting',
    pros: ['Cok hizli', 'Cok amacli', 'Basit'],
    cons: ['Memory-bound', 'Persistence trade-offs'],
  },
  'supabase': {
    description: 'Supabase - Firebase alternatifi. PostgreSQL tabanli BaaS.',
    useCase: 'Serverless apps, Real-time, Auth, Storage',
    pros: ['PostgreSQL', 'Real-time', 'Auth built-in', 'Open source'],
    cons: ['Vendor lock-in', 'Limited edge functions'],
  },
  'firebase': {
    description: 'Firebase - Google\'in BaaS platformu.',
    useCase: 'Mobile apps, Serverless, Real-time sync',
    pros: ['Hizli baslangic', 'Real-time DB', 'Auth', 'Hosting'],
    cons: ['Vendor lock-in', 'Maliyet', 'NoSQL only'],
  },
  'prisma': {
    description: 'Prisma - Modern TypeScript ORM. Type-safe database access.',
    useCase: 'Type-safe DB queries, Migrations, Schema management',
    pros: ['Type safety', 'Auto-complete', 'Migrations', 'Studio UI'],
    cons: ['Build step', 'N+1 dikkat', 'Learning curve'],
  },
  'drizzle': {
    description: 'Drizzle - Lightweight TypeScript ORM. SQL-like syntax.',
    useCase: 'Type-safe SQL, Serverless, Edge functions',
    pros: ['Lightweight', 'SQL-like', 'No code generation', 'Fast'],
    cons: ['Yeni', 'Kucuk ekosistem'],
  },
  'sqlite': {
    description: 'SQLite - Embedded SQL database. Dosya tabanli.',
    useCase: 'Local apps, Testing, Prototyping, Edge',
    pros: ['Zero config', 'Portable', 'Hizli', 'Serverless uyumlu'],
    cons: ['Concurrent writes', 'No user management'],
  },

  // Cloud
  'vercel': {
    description: 'Vercel - Frontend deployment platform. Next.js\'in evi.',
    useCase: 'Frontend/Jamstack deploy, Serverless functions, Edge',
    pros: ['Kolay deploy', 'Preview deploys', 'Edge network', 'DX'],
    cons: ['Maliyet (scale)', 'Vendor lock-in'],
  },
  'netlify': {
    description: 'Netlify - Jamstack deployment ve hosting platform.',
    useCase: 'Static sites, Serverless, Forms, Identity',
    pros: ['Git-based deploy', 'Built-in CI/CD', 'Edge functions'],
    cons: ['Build minutes limiti', 'Maliyet'],
  },
  'cloudflare': {
    description: 'Cloudflare - Edge computing ve CDN platform.',
    useCase: 'CDN, Edge functions (Workers), DNS, Security',
    pros: ['Global edge', 'Workers', 'Ucretsiz tier', 'Performance'],
    cons: ['Learning curve', 'Limited compute'],
  },
  'railway': {
    description: 'Railway - Modern PaaS. Heroku alternatifi.',
    useCase: 'Full-stack deploy, Databases, Quick prototyping',
    pros: ['Kolay deploy', 'Built-in DBs', 'Good pricing'],
    cons: ['Kucuk', 'Limited regions'],
  },
  'fly': {
    description: 'Fly.io - Global app platform. Edge containers.',
    useCase: 'Global apps, Low-latency, Docker deploy',
    pros: ['Global edge', 'Docker native', 'Good free tier'],
    cons: ['Learning curve', 'Debugging'],
  },

  // CI/CD
  'github-actions': {
    description: 'GitHub Actions - GitHub\'in entegre CI/CD sistemi.',
    useCase: 'CI/CD, Automation, GitHub ecosystem',
    pros: ['GitHub native', 'Marketplace', 'Ucretsiz (public)', 'Matrix builds'],
    cons: ['GitHub bagimliligi', 'Debug zorlugu'],
  },
  'gitlab-ci': {
    description: 'GitLab CI/CD - GitLab\'in entegre CI/CD cozumu.',
    useCase: 'CI/CD pipelines, DevOps automation',
    pros: ['Git entegrasyonu', 'Kolay YAML', 'Auto DevOps'],
    cons: ['GitLab bagimliligi', 'Runner yonetimi'],
  },
  'circleci': {
    description: 'CircleCI - Cloud-native CI/CD platform.',
    useCase: 'CI/CD pipelines, Docker builds, Parallelism',
    pros: ['Hizli', 'Docker native', 'Good caching', 'Parallelism'],
    cons: ['Maliyet', 'Complexity'],
  },

  // Container
  'docker': {
    description: 'Docker - Container runtime ve build tool.',
    useCase: 'Containerization, Local dev, CI/CD',
    pros: ['Standart', 'Ekosistem', 'Portability'],
    cons: ['Guvenlik', 'Image size', 'Networking'],
  },
  'docker-compose': {
    description: 'Docker Compose - Multi-container Docker tool.',
    useCase: 'Local dev, Simple deployments, Testing',
    pros: ['Basit', 'YAML', 'Development'],
    cons: ['Production limiti', 'No orchestration'],
  },
};

export function getTechInfo(techId: string): TechInfo | undefined {
  return techInfo[techId];
}
