// Enterprise preset configurations
// These are separated from the main vibe generator for future fork capability

export interface EnterprisePreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  technologies: Record<string, string[]>;
  tiers: number[];
}

export const enterprisePresets: EnterprisePreset[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack Enterprise',
    description: 'Kurumsal: React + Node.js + PostgreSQL + K8s + Full Observability',
    icon: '🏢',
    tags: ['Enterprise', 'Production-Ready'],
    technologies: {
      languages: ['js-ts'],
      frontend: ['react'],
      backend: ['nodejs'],
      database: ['postgresql', 'redis'],
      search: ['elasticsearch'],
      messagequeue: ['rabbitmq'],
      cloud: ['azure'],
      cicd: ['gitlab-ci', 'argocd'],
      observability: ['prometheus', 'grafana', 'loki', 'jaeger'],
      secrets: ['vault', 'azure-keyvault'],
      container: ['docker', 'kubernetes'],
      iac: ['terraform'],
    },
    tiers: [1, 2, 3, 4, 5],
  },
  {
    id: 'microservices',
    name: 'Microservices',
    description: 'Event-driven microservices mimarisi. Kafka + Kubernetes + Full Observability',
    icon: '🔄',
    tags: ['Microservices', 'Event-Driven', 'Enterprise'],
    technologies: {
      languages: ['js-ts', 'go'],
      backend: ['nodejs', 'gin'],
      database: ['postgresql', 'mongodb', 'redis'],
      search: ['elasticsearch'],
      messagequeue: ['kafka', 'redis-streams'],
      cloud: ['azure'],
      cicd: ['gitlab-ci', 'argocd'],
      observability: ['prometheus', 'grafana', 'loki', 'jaeger', 'pyroscope'],
      secrets: ['vault'],
      container: ['docker', 'kubernetes'],
      iac: ['terraform'],
    },
    tiers: [1, 2, 3, 4, 5],
  },
  {
    id: 'enterprise-java',
    name: 'Enterprise Java',
    description: 'Kurumsal Java/Spring uygulamasi. Spring Boot + Kafka + Full Stack',
    icon: '☕',
    tags: ['Enterprise', 'Java', 'Spring'],
    technologies: {
      languages: ['java', 'kotlin'],
      backend: ['spring'],
      database: ['postgresql', 'redis'],
      search: ['elasticsearch'],
      messagequeue: ['kafka', 'rabbitmq'],
      cloud: ['azure'],
      cicd: ['gitlab-ci', 'jenkins', 'argocd'],
      observability: ['prometheus', 'grafana', 'loki', 'jaeger'],
      secrets: ['vault', 'azure-keyvault'],
      container: ['docker', 'kubernetes'],
      iac: ['terraform'],
    },
    tiers: [1, 2, 3, 4, 5],
  },
  {
    id: 'dotnet-azure',
    name: '.NET + Azure',
    description: 'Microsoft stack ile Azure-native uygulama. ASP.NET Core + MSSQL',
    icon: '🔷',
    tags: ['Microsoft', '.NET', 'Azure-Native'],
    technologies: {
      languages: ['csharp'],
      frontend: ['react'],
      backend: ['aspnet'],
      database: ['mssql', 'redis'],
      cloud: ['azure'],
      cicd: ['gitlab-ci', 'argocd'],
      observability: ['prometheus', 'grafana', 'loki'],
      secrets: ['azure-keyvault', 'gitlab-vars'],
      container: ['docker', 'kubernetes'],
      iac: ['terraform'],
    },
    tiers: [1, 2, 3, 4],
  },
  {
    id: 'mobile-backend',
    name: 'Mobile Backend',
    description: 'iOS/Android uygulamalar icin backend. Node.js + MongoDB + Push Notifications',
    icon: '📱',
    tags: ['Mobile', 'Backend', 'API'],
    technologies: {
      languages: ['js-ts', 'swift', 'kotlin'],
      backend: ['nodejs'],
      database: ['mongodb', 'redis'],
      cloud: ['azure'],
      cicd: ['gitlab-ci'],
      observability: ['prometheus', 'grafana'],
      secrets: ['azure-keyvault'],
      container: ['docker', 'kubernetes'],
    },
    tiers: [1, 2, 3, 4],
  },
  {
    id: 'data-platform',
    name: 'Data Platform',
    description: 'Veri isleme ve analytics platformu. Kafka + Elasticsearch + Python',
    icon: '📊',
    tags: ['Data', 'Analytics', 'ETL'],
    technologies: {
      languages: ['python', 'js-ts'],
      backend: ['fastapi'],
      database: ['postgresql', 'mongodb', 'redis'],
      search: ['elasticsearch'],
      messagequeue: ['kafka'],
      cloud: ['azure'],
      cicd: ['gitlab-ci', 'argocd'],
      observability: ['prometheus', 'grafana', 'loki'],
      secrets: ['vault'],
      container: ['docker', 'kubernetes'],
      iac: ['terraform'],
    },
    tiers: [1, 2, 3, 4, 5],
  },
];

// Enterprise preset info for hover panels
export interface EnterprisePresetInfo {
  description: string;
  useCase: string;
  includes: string[];
  bestFor: string[];
  notFor: string[];
}

export const enterprisePresetInfo: Record<string, EnterprisePresetInfo> = {
  'full-stack': {
    description: 'Kurumsal full-stack. Kubernetes, observability, secret management dahil.',
    useCase: 'Enterprise SaaS, buyuk olcekli uygulamalar',
    includes: [
      'React + Node.js',
      'PostgreSQL + Redis',
      'Kubernetes + Docker',
      'Prometheus + Grafana + Loki',
      'Vault + Azure KeyVault',
      'GitLab CI + ArgoCD',
    ],
    bestFor: [
      'Buyuk ekipler (10+ developer)',
      'Enterprise musteriler',
      'High availability gerektiren sistemler',
      'Compliance gereksinimleri',
    ],
    notFor: [
      'Startup MVP',
      'Kucuk ekipler',
      'Hizli prototip',
      'Budget-limited projeler',
    ],
  },
  'microservices': {
    description: 'Event-driven microservices. Kafka, distributed tracing, service mesh.',
    useCase: 'Large-scale distributed systems, event sourcing',
    includes: [
      'Multiple languages (JS/Go)',
      'Kafka + Redis Streams',
      'Kubernetes + Istio',
      'Jaeger tracing',
      'Full observability stack',
    ],
    bestFor: [
      'Cok buyuk sistemler',
      'Farkli ekiplerin bagimsiz deploy etmesi',
      'Event-driven architecture',
      'Polyglot programming',
    ],
    notFor: [
      'Kucuk-orta projeler',
      'Tek ekip',
      'Basit CRUD apps',
      'Operasyonel complexity istemeyenler',
    ],
  },
  'enterprise-java': {
    description: 'Kurumsal Java/Spring stack. Bank, telco, enterprise-grade.',
    useCase: 'Banking, insurance, large enterprise systems',
    includes: [
      'Spring Boot',
      'Kafka + RabbitMQ',
      'PostgreSQL',
      'Full observability',
      'Jenkins + ArgoCD',
    ],
    bestFor: [
      'Java ekipleri',
      'Enterprise musteriler',
      'Legacy sistem entegrasyonu',
      'Transaction-heavy sistemler',
    ],
    notFor: [
      'Startup',
      'Hizli prototip',
      'Kucuk ekipler',
      'Modern stack isteyenler',
    ],
  },
  'dotnet-azure': {
    description: 'Microsoft stack + Azure native. C# + ASP.NET Core + Azure services.',
    useCase: 'Azure-first projects, Microsoft shop, enterprise .NET',
    includes: [
      'ASP.NET Core',
      'React frontend',
      'MSSQL + Redis',
      'Azure KeyVault',
      'Azure DevOps opsiyonel',
    ],
    bestFor: [
      '.NET ekipleri',
      'Azure commitment olanlar',
      'Windows Server altyapisi',
      'Enterprise Microsoft shop',
    ],
    notFor: [
      'Multi-cloud',
      'Linux-only ortamlar',
      'Open source tercihi',
    ],
  },
  'mobile-backend': {
    description: 'iOS/Android backend. Push notifications, real-time sync icin optimize.',
    useCase: 'Mobile app backend, real-time sync, offline-first apps',
    includes: [
      'Node.js',
      'MongoDB + Redis',
      'Push notification support',
      'Kubernetes',
      'Mobile-friendly auth',
    ],
    bestFor: [
      'Mobile-first projeler',
      'Real-time sync gerektiren apps',
      'Offline-first yaklasim',
      'Cross-platform mobile',
    ],
    notFor: [
      'Web-only projeler',
      'Heavy admin panel',
      'Content management',
    ],
  },
  'data-platform': {
    description: 'Data processing platform. ETL, analytics, ML pipeline.',
    useCase: 'Data lake, analytics platform, ML pipelines',
    includes: [
      'Python + FastAPI',
      'Kafka',
      'Elasticsearch',
      'PostgreSQL + MongoDB',
      'Kubernetes',
    ],
    bestFor: [
      'Data engineering ekipleri',
      'Analytics platformlari',
      'ML/AI projeleri',
      'Big data islemleri',
    ],
    notFor: [
      'Simple CRUD apps',
      'User-facing web apps',
      'Real-time web apps',
    ],
  },
};

export function getEnterprisePresetInfo(presetId: string): EnterprisePresetInfo | undefined {
  return enterprisePresetInfo[presetId];
}
