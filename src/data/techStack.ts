import type { Category, Tier } from '../types';

export const categories: Category[] = [
  {
    id: 'languages',
    name: 'Programlama Dilleri',
    icon: '💻',
    multiSelect: true,
    technologies: [
      { id: 'js-ts', name: 'JavaScript/TypeScript', category: 'languages' },
      { id: 'python', name: 'Python', category: 'languages' },
      { id: 'go', name: 'Go', category: 'languages' },
      { id: 'php', name: 'PHP', category: 'languages' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Framework',
    icon: '🎨',
    multiSelect: true,
    technologies: [
      { id: 'react', name: 'React', category: 'frontend' },
      { id: 'nextjs', name: 'Next.js', category: 'frontend' },
      { id: 'vue', name: 'Vue', category: 'frontend' },
      { id: 'nuxt', name: 'Nuxt', category: 'frontend' },
      { id: 'angular', name: 'Angular', category: 'frontend' },
      { id: 'svelte', name: 'Svelte', category: 'frontend' },
      { id: 'remix', name: 'Remix', category: 'frontend' },
      { id: 'astro', name: 'Astro', category: 'frontend' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Framework',
    icon: '⚙️',
    multiSelect: true,
    technologies: [
      { id: 'nodejs', name: 'Node.js (Express/Fastify)', category: 'backend' },
      { id: 'nestjs', name: 'NestJS', category: 'backend' },
      { id: 'django', name: 'Django', category: 'backend' },
      { id: 'fastapi', name: 'FastAPI', category: 'backend' },
      { id: 'flask', name: 'Flask', category: 'backend' },
      { id: 'gin', name: 'Gin (Go)', category: 'backend' },
      { id: 'laravel', name: 'Laravel', category: 'backend' },
    ],
  },
  {
    id: 'database',
    name: 'Veritabanı',
    icon: '🗄️',
    multiSelect: true,
    technologies: [
      { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
      { id: 'mysql', name: 'MySQL', category: 'database' },
      { id: 'mongodb', name: 'MongoDB', category: 'database' },
      { id: 'redis', name: 'Redis', category: 'database' },
      { id: 'supabase', name: 'Supabase', category: 'database' },
      { id: 'firebase', name: 'Firebase', category: 'database' },
      { id: 'prisma', name: 'Prisma (ORM)', category: 'database' },
      { id: 'drizzle', name: 'Drizzle (ORM)', category: 'database' },
      { id: 'sqlite', name: 'SQLite', category: 'database' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Hosting',
    icon: '☁️',
    multiSelect: true,
    technologies: [
      { id: 'vercel', name: 'Vercel', category: 'cloud' },
      { id: 'netlify', name: 'Netlify', category: 'cloud' },
      { id: 'cloudflare', name: 'Cloudflare', category: 'cloud' },
      { id: 'railway', name: 'Railway', category: 'cloud' },
      { id: 'fly', name: 'Fly.io', category: 'cloud' },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: '🔄',
    multiSelect: true,
    technologies: [
      { id: 'github-actions', name: 'GitHub Actions', category: 'cicd' },
      { id: 'gitlab-ci', name: 'GitLab CI', category: 'cicd' },
      { id: 'circleci', name: 'CircleCI', category: 'cicd' },
    ],
  },
  {
    id: 'container',
    name: 'Container',
    icon: '🐳',
    multiSelect: true,
    technologies: [
      { id: 'docker', name: 'Docker', category: 'container' },
      { id: 'docker-compose', name: 'Docker Compose', category: 'container' },
    ],
  },
];

export const tiers: Tier[] = [
  {
    id: 1,
    name: 'Tier 1: Zorunlu',
    description: 'Her projede olmali',
    required: true,
    templates: ['CLAUDE.md', 'RULESETS.md', 'VIBE_CODING.md', 'CODE_REVIEW.md', 'SESSION_NOTES.md', 'SESSION_HANDOFF.md'],
  },
  {
    id: 2,
    name: 'Tier 2: Onerilen',
    description: 'Orta-buyuk projeler',
    required: false,
    templates: ['EXAMPLES.md', 'CODEBASE_MAP.md', 'DEBUGGING.md', 'CONTRIBUTING.md', 'SETUP_GUIDE.md', 'ADR.md'],
  },
];
