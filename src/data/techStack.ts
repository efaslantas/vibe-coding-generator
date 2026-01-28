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
      { id: 'java', name: 'Java', category: 'languages' },
      { id: 'kotlin', name: 'Kotlin', category: 'languages' },
      { id: 'csharp', name: 'C#', category: 'languages' },
      { id: 'swift', name: 'Swift', category: 'languages' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Framework',
    icon: '🎨',
    multiSelect: true,
    technologies: [
      { id: 'react', name: 'React', category: 'frontend' },
      { id: 'vue', name: 'Vue', category: 'frontend' },
      { id: 'angular', name: 'Angular', category: 'frontend' },
      { id: 'svelte', name: 'Svelte', category: 'frontend' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Framework',
    icon: '⚙️',
    multiSelect: true,
    technologies: [
      { id: 'nodejs', name: 'Node.js (Express/Fastify)', category: 'backend' },
      { id: 'django', name: 'Django', category: 'backend' },
      { id: 'fastapi', name: 'FastAPI', category: 'backend' },
      { id: 'spring', name: 'Spring Boot', category: 'backend' },
      { id: 'aspnet', name: 'ASP.NET Core', category: 'backend' },
      { id: 'gin', name: 'Gin (Go)', category: 'backend' },
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
      { id: 'mssql', name: 'MSSQL', category: 'database' },
      { id: 'mongodb', name: 'MongoDB', category: 'database' },
      { id: 'redis', name: 'Redis', category: 'database' },
    ],
  },
  {
    id: 'search',
    name: 'Arama',
    icon: '🔍',
    multiSelect: false,
    technologies: [
      { id: 'elasticsearch', name: 'Elasticsearch', category: 'search' },
    ],
  },
  {
    id: 'messagequeue',
    name: 'Message Queue',
    icon: '📨',
    multiSelect: true,
    technologies: [
      { id: 'kafka', name: 'Apache Kafka', category: 'messagequeue' },
      { id: 'rabbitmq', name: 'RabbitMQ', category: 'messagequeue' },
      { id: 'redis-streams', name: 'Redis Streams', category: 'messagequeue' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Provider',
    icon: '☁️',
    multiSelect: false,
    technologies: [
      { id: 'azure', name: 'Azure', category: 'cloud' },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: '🔄',
    multiSelect: true,
    technologies: [
      { id: 'gitlab-ci', name: 'GitLab CI', category: 'cicd' },
      { id: 'jenkins', name: 'Jenkins', category: 'cicd' },
      { id: 'argocd', name: 'ArgoCD', category: 'cicd' },
    ],
  },
  {
    id: 'observability',
    name: 'Observability',
    icon: '📊',
    multiSelect: true,
    technologies: [
      { id: 'prometheus', name: 'Prometheus', category: 'observability' },
      { id: 'grafana', name: 'Grafana', category: 'observability' },
      { id: 'loki', name: 'Loki', category: 'observability' },
      { id: 'jaeger', name: 'Jaeger', category: 'observability' },
      { id: 'uptime-robot', name: 'Uptime Robot', category: 'observability' },
      { id: 'pyroscope', name: 'Pyroscope', category: 'observability' },
    ],
  },
  {
    id: 'secrets',
    name: 'Secret Management',
    icon: '🔐',
    multiSelect: true,
    technologies: [
      { id: 'vault', name: 'HashiCorp Vault', category: 'secrets' },
      { id: 'azure-keyvault', name: 'Azure Key Vault', category: 'secrets' },
      { id: 'gitlab-vars', name: 'GitLab CI Variables', category: 'secrets' },
    ],
  },
  {
    id: 'container',
    name: 'Container & Orchestration',
    icon: '🐳',
    multiSelect: true,
    technologies: [
      { id: 'docker', name: 'Docker', category: 'container' },
      { id: 'kubernetes', name: 'Kubernetes', category: 'container' },
      { id: 'docker-compose', name: 'Docker Compose', category: 'container' },
    ],
  },
  {
    id: 'iac',
    name: 'Infrastructure as Code',
    icon: '🏗️',
    multiSelect: true,
    technologies: [
      { id: 'terraform', name: 'Terraform', category: 'iac' },
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
  {
    id: 3,
    name: 'Tier 3: Enterprise',
    description: 'Buyuk/Production projeler',
    required: false,
    templates: ['TEST_CASES.md', 'DEVOPS_CHECKLIST.md', 'CICD.md', 'RELEASE.md', 'SECURITY.md', 'MONITORING.md', 'ENVIRONMENT.md', 'GLOSSARY.md'],
  },
  {
    id: 4,
    name: 'Tier 4: AI & Modern',
    description: 'Vibe Coding ozel',
    required: false,
    templates: ['AI_INTEGRATION.md', 'DATABASE.md', 'DEPLOYMENT.md', 'INCIDENT.md', 'API_DOCS.md', 'PERFORMANCE.md', 'FRONTEND.md', 'COMPLIANCE.md', 'IaC.md', 'ONBOARDING.md'],
  },
  {
    id: 5,
    name: 'Tier 5: Reliability',
    description: 'Production-Grade',
    required: false,
    templates: ['TEST_STRATEGY.md', 'LOCAL_DEV.md', 'RESILIENCE.md', 'DEPENDENCY_MANAGEMENT.md', 'FEATURE_FLAGS.md'],
  },
];
