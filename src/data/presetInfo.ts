// Detailed information for presets (shown on hover)

export interface PresetInfo {
  description: string;
  useCase: string;
  includes: string[];
  bestFor: string[];
  notFor: string[];
}

export const presetInfo: Record<string, PresetInfo> = {
  // ========== STARTER / CODE-ONLY ==========
  'nextjs-starter': {
    description: 'Next.js 15 ile modern React uygulamasi. Server-side rendering, file-based routing ve Vercel entegrasyonu.',
    useCase: 'Hizli prototip, landing page, blog, portfolyo siteleri',
    includes: [
      'Next.js 15 App Router',
      'TypeScript',
      'Vercel deploy',
      'Built-in optimizations',
    ],
    bestFor: [
      'Solo developer',
      'Startup MVP',
      'Hizli deploy gerektiren projeler',
      'SEO oncelikli siteler',
    ],
    notFor: [
      'Complex backend gerektiren projeler',
      'Real-time uygulamalar',
      'Microservices mimarisi',
    ],
  },

  'react-supabase': {
    description: 'React frontend + Supabase backend. Authentication, database ve storage hazir.',
    useCase: 'Full-stack MVP, CRUD uygulamalari, kullanici yonetimi gerektiren projeler',
    includes: [
      'React 19',
      'Supabase (PostgreSQL + Auth + Storage)',
      'Real-time subscriptions',
      'Row Level Security',
    ],
    bestFor: [
      'Backend yazmak istemeyen frontend developerlar',
      'Hizli MVP cikarma',
      'Auth gerektiren projeler',
      'Real-time ozellik gerektiren uygulamalar',
    ],
    notFor: [
      'Custom backend logic gerektiren projeler',
      'On-premise deployment',
      'Cok yuksek trafik (maliyet artar)',
    ],
  },

  'vue-starter': {
    description: 'Vue 3 Composition API veya Nuxt ile modern frontend. Reactive, kolay ogrenilir.',
    useCase: 'SPA, dashboard, admin panel, interaktif UI',
    includes: [
      'Vue 3 / Nuxt 3',
      'Composition API',
      'Netlify deploy',
      'TypeScript opsiyonel',
    ],
    bestFor: [
      'React alternatifi arayanlar',
      'Daha az boilerplate isteyenler',
      'Progressive enhancement',
      'Kucuk-orta olcekli projeler',
    ],
    notFor: [
      'Cok buyuk ekip projeleri (React ekosistemi daha genis)',
      'Mobile app (React Native yok)',
    ],
  },

  // ========== WITH DATABASE ==========
  'nextjs-prisma': {
    description: 'Full-stack Next.js + Prisma ORM + PostgreSQL. Type-safe database erisimi.',
    useCase: 'SaaS, e-commerce, user-generated content platformlari',
    includes: [
      'Next.js 15',
      'Prisma ORM',
      'PostgreSQL',
      'GitHub Actions CI',
      'Vercel deploy',
    ],
    bestFor: [
      'Type-safety onemseyen ekipler',
      'Database migration gerektiren projeler',
      'Full-stack TypeScript',
      'Production-ready uygulamalar',
    ],
    notFor: [
      'Basit statik siteler',
      'NoSQL gerektiren projeler',
      'Serverless function limitleri problem olacaksa',
    ],
  },

  'nestjs-api': {
    description: 'Enterprise-grade TypeScript backend. Angular-inspired, modular yapi.',
    useCase: 'REST/GraphQL API, microservices, enterprise backend',
    includes: [
      'NestJS framework',
      'PostgreSQL + Prisma',
      'Dependency Injection',
      'Built-in validation',
      'Swagger docs',
    ],
    bestFor: [
      'Buyuk ekipler',
      'Enterprise projeler',
      'Strict architecture gerektiren projeler',
      'Angular developerlar',
    ],
    notFor: [
      'Basit API ler',
      'Hizli prototip',
      'Minimalist yaklasim isteyenler',
    ],
  },

  'go-api': {
    description: 'Yuksek performansli Go backend. Minimal, hizli, concurrent.',
    useCase: 'High-throughput API, microservices, CLI tools',
    includes: [
      'Go + Gin framework',
      'PostgreSQL',
      'Goroutines (concurrency)',
      'Single binary deploy',
    ],
    bestFor: [
      'Performans kritik sistemler',
      'Yuksek trafik',
      'Microservices',
      'DevOps/infra projeleri',
    ],
    notFor: [
      'Hizli prototip (Go ogrenme egrisi)',
      'CRUD-heavy uygulamalar',
      'Frontend developerlar',
    ],
  },

  'django-api': {
    description: 'Python batteries-included framework. Admin panel, ORM, auth hazir.',
    useCase: 'Content management, admin-heavy apps, data science entegrasyonu',
    includes: [
      'Django + DRF',
      'PostgreSQL',
      'Built-in admin',
      'ORM + migrations',
      'Session auth',
    ],
    bestFor: [
      'Python ekipleri',
      'Data science entegrasyonu',
      'Admin panel gerektiren projeler',
      'Content-heavy siteler',
    ],
    notFor: [
      'Real-time uygulamalar',
      'Microservices (monolith tercih eder)',
      'Minimal API ler',
    ],
  },

  'fastapi-starter': {
    description: 'Modern Python async API. Otomatik docs, type hints, yuksek performans.',
    useCase: 'Modern REST API, ML model serving, async islemler',
    includes: [
      'FastAPI',
      'PostgreSQL',
      'Pydantic validation',
      'Auto OpenAPI docs',
      'Async support',
    ],
    bestFor: [
      'Modern Python projeleri',
      'ML/AI entegrasyonu',
      'Async islemler',
      'API-first yaklasim',
    ],
    notFor: [
      'Full-stack (template yok)',
      'Admin panel (Django daha iyi)',
      'Legacy Python 2 kod',
    ],
  },

  'laravel-api': {
    description: 'PHP ekosisteminin en populer frameworku. Eloquent ORM, Artisan CLI.',
    useCase: 'Web apps, CMS, e-commerce, SaaS',
    includes: [
      'Laravel 11',
      'MySQL',
      'Eloquent ORM',
      'Artisan CLI',
      'Blade templates',
    ],
    bestFor: [
      'PHP ekipleri',
      'Shared hosting',
      'Hizli CRUD development',
      'WordPress alternatifi',
    ],
    notFor: [
      'High-performance API',
      'Microservices',
      'Real-time uygulamalar',
    ],
  },

  't3-stack': {
    description: 'End-to-end type-safe fullstack. tRPC ile frontend-backend type sharing.',
    useCase: 'Type-safe SaaS, modern fullstack apps',
    includes: [
      'Next.js',
      'tRPC',
      'Prisma',
      'Tailwind CSS',
      'NextAuth.js',
    ],
    bestFor: [
      'TypeScript puristleri',
      'Solo fullstack developerlar',
      'API type safety',
      'Modern stack isteyenler',
    ],
    notFor: [
      'Ekip icinde farkli diller kullananlar',
      'REST API gerektiren projeler',
      'Mobile app backend',
    ],
  },

  // ========== SIMPLE PRODUCTION ==========
  'simple-api': {
    description: 'Production-ready basit API. Docker Compose ile kolay deploy.',
    useCase: 'Internal API, MVP backend, webhook handler',
    includes: [
      'FastAPI',
      'PostgreSQL + Redis',
      'Docker Compose',
      'GitLab CI',
    ],
    bestFor: [
      'Docker Compose yeterli olanlar',
      'Orta olcekli projeler',
      'Hizli production deploy',
    ],
    notFor: [
      'High availability',
      'Auto-scaling gerektiren sistemler',
      'Multi-region deployment',
    ],
  },

  'frontend-only': {
    description: 'Sadece frontend SPA. Backend yok, static hosting.',
    useCase: 'Marketing site, portfolyo, dokumantasyon, static content',
    includes: [
      'React veya Vue',
      'Vercel/Netlify deploy',
      'Static site generation',
      'CDN caching',
    ],
    bestFor: [
      'Backend gerektirmeyen projeler',
      'Static content',
      'Marketing siteleri',
      'Dokumantasyon',
    ],
    notFor: [
      'User authentication',
      'Database gerektiren projeler',
      'Dynamic content',
    ],
  },

  'custom': {
    description: 'Sifirdan kendi stackini olustur. Tum secenekler acik.',
    useCase: 'Ozel gereksinimler, hibrit yaklasimlar',
    includes: [
      'Tum teknolojiler secime acik',
      'Kategori bazli filtreleme',
      'Bagimlilik kontrolu',
      'Oneriler sistemi',
    ],
    bestFor: [
      'Deneyimli ekipler',
      'Ozel gereksinimler',
      'Mevcut altyapiya uyum',
      'Hibrit yaklasimlar',
    ],
    notFor: [
      'Ne secegini bilmeyenler',
      'Hizli baslamak isteyenler',
    ],
  },
};

export function getPresetInfo(presetId: string): PresetInfo | undefined {
  return presetInfo[presetId];
}
