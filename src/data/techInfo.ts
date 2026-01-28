// Technology descriptions and information

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
  'java': {
    description: 'Java - Kurumsal standart. JVM uzerinde calisir.',
    useCase: 'Enterprise uygulamalar, Android, Buyuk sistemler',
    pros: ['Olgun ekosistem', 'Performans', 'Guvenilir'],
    cons: ['Verbose', 'Bellek tuketimi', 'Yavas baslangic'],
  },
  'kotlin': {
    description: 'Kotlin - Modern JVM dili. Java\'nin gelismis hali.',
    useCase: 'Android, Backend (Spring), Multiplatform',
    pros: ['Null safety', 'Concise', 'Java uyumu'],
    cons: ['Derleme suresi', 'Kucuk topluluk'],
  },
  'csharp': {
    description: 'C# - Microsoft\'un guclü OOP dili.',
    useCase: '.NET uygulamalar, Azure, Game dev (Unity)',
    pros: ['Guclü IDE', 'LINQ', 'Async/await'],
    cons: ['Windows odakli (eskiden)', 'Lisans karmasikligi'],
  },
  'swift': {
    description: 'Swift - Apple\'in modern programlama dili.',
    useCase: 'iOS/macOS uygulamalar, Backend (Vapor)',
    pros: ['Guvenli', 'Hizli', 'Modern syntax'],
    cons: ['Apple ekosistemi', 'ABI degisiklikleri'],
  },

  // Frontend
  'react': {
    description: 'React - Facebook\'un UI kutuphanesi. Component-based.',
    useCase: 'SPA, Mobil (React Native), Complex UI',
    pros: ['Virtual DOM', 'Buyuk ekosistem', 'React Native'],
    cons: ['JSX ogrenim egrisi', 'Hizli degisim'],
  },
  'vue': {
    description: 'Vue - Progressive JavaScript framework.',
    useCase: 'SPA, Incremental adoption, Orta olcekli projeler',
    pros: ['Kolay ogrenilir', 'Tek dosya component', 'Reactive'],
    cons: ['Kucuk ekosistem', 'Az enterprise kullanim'],
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

  // Backend
  'nodejs': {
    description: 'Node.js - JavaScript runtime. Event-driven, non-blocking.',
    useCase: 'REST API, Real-time apps, Microservices',
    pros: ['Hizli I/O', 'NPM ekosistemi', 'Fullstack JS'],
    cons: ['CPU-intensive isler', 'Callback complexity'],
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
  'spring': {
    description: 'Spring Boot - Java\'nin enterprise framework\'u.',
    useCase: 'Enterprise apps, Microservices, Buyuk sistemler',
    pros: ['Production-ready', 'Genis ekosistem', 'Guvenlik'],
    cons: ['Ogrenme egrisi', 'Memory', 'Complexity'],
  },
  'aspnet': {
    description: 'ASP.NET Core - Microsoft\'un cross-platform framework\'u.',
    useCase: 'Enterprise API, Azure apps, Microsoft stack',
    pros: ['Performans', 'Cross-platform', 'Guvenlik'],
    cons: ['Microsoft bagimliligi', 'Ogrenim'],
  },
  'gin': {
    description: 'Gin - Go\'nun en populer web framework\'u.',
    useCase: 'High-performance API, Microservices',
    pros: ['Cok hizli', 'Minimalist', 'Middleware'],
    cons: ['Manuel isler', 'Az magic'],
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
  'mssql': {
    description: 'Microsoft SQL Server - Enterprise SQL veritabani.',
    useCase: 'Enterprise apps, .NET stack, BI',
    pros: ['Entegrasyon', 'BI tools', 'Support'],
    cons: ['Lisans maliyeti', 'Windows odakli'],
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

  // Search
  'elasticsearch': {
    description: 'Elasticsearch - Distributed search ve analytics engine.',
    useCase: 'Full-text search, Log analytics, APM',
    pros: ['Hizli arama', 'Scalable', 'Real-time'],
    cons: ['Resource intensive', 'Operasyonel zorluk'],
  },

  // Message Queue
  'kafka': {
    description: 'Apache Kafka - Distributed event streaming platform.',
    useCase: 'Event sourcing, Log aggregation, Stream processing',
    pros: ['High throughput', 'Durable', 'Replay'],
    cons: ['Operasyonel zorluk', 'Overkill for simple'],
  },
  'rabbitmq': {
    description: 'RabbitMQ - Traditional message broker.',
    useCase: 'Task queues, RPC, Routing',
    pros: ['Flexible routing', 'Protokol destegi', 'Kolay'],
    cons: ['Throughput limiti', 'No replay'],
  },
  'redis-streams': {
    description: 'Redis Streams - Redis\'in event streaming ozelligi.',
    useCase: 'Lightweight streaming, Already using Redis',
    pros: ['Basit', 'Zaten Redis var', 'Hizli'],
    cons: ['Limited features', 'Memory-bound'],
  },

  // Cloud
  'azure': {
    description: 'Microsoft Azure - Enterprise cloud platform.',
    useCase: 'Enterprise apps, Microsoft stack, Hybrid cloud',
    pros: ['Enterprise features', 'AD entegrasyonu', 'Hybrid'],
    cons: ['Karmasik UI', 'Dokumantasyon'],
  },

  // CI/CD
  'gitlab-ci': {
    description: 'GitLab CI/CD - GitLab\'in entegre CI/CD cozumu.',
    useCase: 'CI/CD pipelines, DevOps automation',
    pros: ['Git entegrasyonu', 'Kolay YAML', 'Auto DevOps'],
    cons: ['GitLab bagimliligi', 'Runner yonetimi'],
  },
  'jenkins': {
    description: 'Jenkins - En yaygin self-hosted CI/CD araci.',
    useCase: 'Complex pipelines, Legacy systems, Custom needs',
    pros: ['Plugin ekosistemi', 'Esneklik', 'Self-hosted'],
    cons: ['Eski UI', 'Maintenance', 'Guvenlik'],
  },
  'argocd': {
    description: 'ArgoCD - Kubernetes icin GitOps CD araci.',
    useCase: 'Kubernetes deployments, GitOps',
    pros: ['GitOps native', 'UI', 'Sync status'],
    cons: ['K8s only', 'Learning curve'],
  },

  // Observability
  'prometheus': {
    description: 'Prometheus - Metrics collection ve alerting.',
    useCase: 'Metrics, Alerting, Kubernetes monitoring',
    pros: ['Pull-based', 'PromQL', 'K8s native'],
    cons: ['Long-term storage', 'High cardinality'],
  },
  'grafana': {
    description: 'Grafana - Visualization ve dashboarding platform.',
    useCase: 'Dashboards, Alerting, Data exploration',
    pros: ['Gorsellestirme', 'Multi-source', 'Alerting'],
    cons: ['Complexity', 'Resource usage'],
  },
  'loki': {
    description: 'Loki - Prometheus-inspired log aggregation.',
    useCase: 'Log aggregation, Grafana entegrasyonu',
    pros: ['Label-based', 'Cost effective', 'Grafana native'],
    cons: ['No full-text index', 'Query limitleri'],
  },
  'jaeger': {
    description: 'Jaeger - Distributed tracing system.',
    useCase: 'Microservices tracing, Latency analysis',
    pros: ['OpenTracing', 'UI', 'Root cause analysis'],
    cons: ['Storage', 'Instrumentation effort'],
  },
  'uptime-robot': {
    description: 'Uptime Robot - Website monitoring service.',
    useCase: 'Uptime monitoring, SSL monitoring, Alerting',
    pros: ['Basit', 'Ucretsiz tier', 'Global'],
    cons: ['Limited features', 'External service'],
  },
  'pyroscope': {
    description: 'Pyroscope - Continuous profiling platform.',
    useCase: 'CPU/Memory profiling, Performance analysis',
    pros: ['Low overhead', 'Flame graphs', 'Continuous'],
    cons: ['Yeni', 'Limited languages'],
  },

  // Secrets
  'vault': {
    description: 'HashiCorp Vault - Secret management solution.',
    useCase: 'Secret storage, Dynamic secrets, Encryption',
    pros: ['Feature-rich', 'Dynamic secrets', 'Audit'],
    cons: ['Complexity', 'Operasyonel yuk'],
  },
  'azure-keyvault': {
    description: 'Azure Key Vault - Azure\'un secret management servisi.',
    useCase: 'Azure apps, Managed secrets, HSM',
    pros: ['Azure native', 'Managed', 'HSM'],
    cons: ['Azure only', 'Maliyet'],
  },
  'gitlab-vars': {
    description: 'GitLab CI Variables - GitLab\'in secret storage\'i.',
    useCase: 'CI/CD secrets, Simple projects',
    pros: ['Entegre', 'Basit', 'Ucretsiz'],
    cons: ['Limited features', 'CI/CD only'],
  },

  // Container
  'docker': {
    description: 'Docker - Container runtime ve build tool.',
    useCase: 'Containerization, Local dev, CI/CD',
    pros: ['Standart', 'Ekosistem', 'Portability'],
    cons: ['Guvenlik', 'Image size', 'Networking'],
  },
  'kubernetes': {
    description: 'Kubernetes - Container orchestration platform.',
    useCase: 'Production containers, Scaling, Service mesh',
    pros: ['Declarative', 'Self-healing', 'Ecosystem'],
    cons: ['Complexity', 'Learning curve', 'Resource'],
  },
  'docker-compose': {
    description: 'Docker Compose - Multi-container Docker tool.',
    useCase: 'Local dev, Simple deployments, Testing',
    pros: ['Basit', 'YAML', 'Development'],
    cons: ['Production limiti', 'No orchestration'],
  },

  // IaC
  'terraform': {
    description: 'Terraform - Infrastructure as Code tool.',
    useCase: 'Cloud provisioning, Multi-cloud, GitOps',
    pros: ['Declarative', 'Multi-cloud', 'State management'],
    cons: ['State complexity', 'HCL learning'],
  },
};

export function getTechInfo(techId: string): TechInfo | undefined {
  return techInfo[techId];
}
