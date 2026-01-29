// Predefined stack configurations for vibe coding

export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  technologies: Record<string, string[]>;
  tiers: number[];
}

export const presets: Preset[] = [
  // ========== STARTER / CODE-ONLY ==========
  {
    id: 'nextjs-starter',
    name: 'Next.js Starter',
    description: 'Sadece kod: Next.js 15 + Vercel deploy. Infra yok.',
    icon: '▲',
    tags: ['Next.js', 'Starter', 'Basit', 'Hot'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['nextjs'],
      cloud: ['vercel'],
    },
    tiers: [1],
  },
  {
    id: 'react-supabase',
    name: 'React + Supabase',
    description: 'Hizli MVP: React + Supabase. Backend yazmadan fullstack.',
    icon: '⚡',
    tags: ['Supabase', 'Serverless', 'MVP', 'Hot'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['react'],
      database: ['supabase'],
      cloud: ['vercel'],
    },
    tiers: [1],
  },
  {
    id: 'vue-starter',
    name: 'Vue / Nuxt Starter',
    description: 'Vue 3 veya Nuxt ile hizli baslangic.',
    icon: '💚',
    tags: ['Vue', 'Nuxt', 'Starter'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['vue'],
      cloud: ['netlify'],
    },
    tiers: [1],
  },
  // ========== WITH DATABASE ==========
  {
    id: 'nextjs-prisma',
    name: 'Next.js + Prisma',
    description: 'Full-stack: Next.js + Prisma + PostgreSQL. Docker opsiyonel.',
    icon: '🔺',
    tags: ['Next.js', 'Prisma', 'Full-Stack'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['nextjs'],
      database: ['postgresql', 'prisma'],
      cloud: ['vercel'],
      cicd: ['github-actions'],
    },
    tiers: [1, 2],
  },
  {
    id: 'nestjs-api',
    name: 'NestJS API',
    description: 'TypeScript backend: NestJS + PostgreSQL. Enterprise-ready.',
    icon: '🐱',
    tags: ['NestJS', 'API', 'TypeScript'],
    technologies: {
      languages: ['js-ts'],
      backend: ['nestjs'],
      database: ['postgresql', 'prisma'],
      cicd: ['github-actions'],
    },
    tiers: [1, 2],
  },
  {
    id: 'go-api',
    name: 'Go API',
    description: 'Performans odakli: Go + Gin + PostgreSQL. Minimal.',
    icon: '🐹',
    tags: ['Go', 'Performance', 'Minimal'],
    technologies: {
      languages: ['go'],
      backend: ['gin'],
      database: ['postgresql'],
    },
    tiers: [1, 2],
  },
  {
    id: 'django-api',
    name: 'Django API',
    description: 'Python web: Django + PostgreSQL. Batteries-included.',
    icon: '🐍',
    tags: ['Python', 'Django', 'API'],
    technologies: {
      languages: ['python'],
      backend: ['django'],
      database: ['postgresql'],
    },
    tiers: [1, 2],
  },
  {
    id: 'fastapi-starter',
    name: 'FastAPI Starter',
    description: 'Modern Python: FastAPI + PostgreSQL. Hizli API.',
    icon: '🚀',
    tags: ['Python', 'FastAPI', 'Modern'],
    technologies: {
      languages: ['python'],
      backend: ['fastapi'],
      database: ['postgresql'],
    },
    tiers: [1, 2],
  },
  {
    id: 'laravel-api',
    name: 'Laravel API',
    description: 'PHP ekosistemi: Laravel + MySQL.',
    icon: '🔻',
    tags: ['PHP', 'Laravel', 'API'],
    technologies: {
      languages: ['php'],
      backend: ['laravel'],
      database: ['mysql'],
    },
    tiers: [1, 2],
  },
  {
    id: 't3-stack',
    name: 'T3 Stack',
    description: 'Type-safe fullstack: Next.js + tRPC + Prisma + Tailwind',
    icon: '🔷',
    tags: ['T3', 'Type-Safe', 'tRPC', 'Hot'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['nextjs'],
      database: ['postgresql', 'prisma'],
      cloud: ['vercel'],
      cicd: ['github-actions'],
    },
    tiers: [1, 2],
  },
  // ========== SIMPLE PRODUCTION ==========
  {
    id: 'simple-api',
    name: 'Simple API',
    description: 'Hizli baslangic icin basit REST API. FastAPI + PostgreSQL + Docker',
    icon: '🚀',
    tags: ['API', 'Hizli Baslangic', 'MVP'],
    technologies: {
      languages: ['python'],
      backend: ['fastapi'],
      database: ['postgresql', 'redis'],
      cicd: ['gitlab-ci'],
      container: ['docker', 'docker-compose'],
    },
    tiers: [1, 2],
  },
  {
    id: 'frontend-only',
    name: 'Frontend SPA',
    description: 'Sadece frontend: React/Vue + Vercel/Netlify. Backend yok.',
    icon: '🎨',
    tags: ['Frontend', 'SPA', 'Static'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['react'],
      cloud: ['vercel'],
    },
    tiers: [1],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Kendi stack\'ini olustur. Tum secenekleri manuel sec.',
    icon: '⚙️',
    tags: ['Custom', 'Manuel'],
    technologies: {},
    tiers: [1],
  },
];
