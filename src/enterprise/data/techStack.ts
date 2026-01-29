// Enterprise-specific technology categories and tiers
// These are separated from the main vibe generator for future fork capability

import type { Category, Tier } from '../../types';

// Enterprise-only categories (not in vibe generator)
export const enterpriseCategories: Category[] = [
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
    id: 'observability',
    name: 'Observability',
    icon: '📊',
    multiSelect: true,
    technologies: [
      { id: 'prometheus', name: 'Prometheus', category: 'observability' },
      { id: 'grafana', name: 'Grafana', category: 'observability' },
      { id: 'loki', name: 'Loki', category: 'observability' },
      { id: 'jaeger', name: 'Jaeger', category: 'observability' },
      { id: 'kibana', name: 'Kibana', category: 'observability' },
      { id: 'logstash', name: 'Logstash', category: 'observability' },
      { id: 'graylog', name: 'Graylog', category: 'observability' },
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
    id: 'iac',
    name: 'Infrastructure as Code',
    icon: '🏗️',
    multiSelect: true,
    technologies: [
      { id: 'terraform', name: 'Terraform', category: 'iac' },
      { id: 'ansible', name: 'Ansible', category: 'iac' },
    ],
  },
  {
    id: 'loadbalancer',
    name: 'Load Balancer & Proxy',
    icon: '⚖️',
    multiSelect: true,
    technologies: [
      { id: 'nginx', name: 'Nginx', category: 'loadbalancer' },
      { id: 'haproxy', name: 'HAProxy', category: 'loadbalancer' },
    ],
  },
  {
    id: 'virtualization',
    name: 'Virtualization & Backup',
    icon: '💾',
    multiSelect: true,
    technologies: [
      { id: 'vmware', name: 'VMware', category: 'virtualization' },
      { id: 'veeam', name: 'Veeam', category: 'virtualization' },
    ],
  },
];

// Enterprise-only technologies to add to existing categories
export const enterpriseLanguages = [
  { id: 'java', name: 'Java', category: 'languages' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages' },
  { id: 'csharp', name: 'C#', category: 'languages' },
  { id: 'swift', name: 'Swift', category: 'languages' },
  { id: 'ruby', name: 'Ruby', category: 'languages' },
  { id: 'rust', name: 'Rust', category: 'languages' },
];

export const enterpriseBackend = [
  { id: 'spring', name: 'Spring Boot', category: 'backend' },
  { id: 'aspnet', name: 'ASP.NET Core', category: 'backend' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend' },
];

export const enterpriseDatabase = [
  { id: 'mssql', name: 'MSSQL', category: 'database' },
];

export const enterpriseCloud = [
  { id: 'azure', name: 'Azure', category: 'cloud' },
  { id: 'aws', name: 'AWS', category: 'cloud' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud' },
];

export const enterpriseCicd = [
  { id: 'jenkins', name: 'Jenkins', category: 'cicd' },
  { id: 'argocd', name: 'ArgoCD', category: 'cicd' },
  { id: 'azure-devops', name: 'Azure DevOps', category: 'cicd' },
  { id: 'bamboo', name: 'Bamboo', category: 'cicd' },
  { id: 'sonarqube', name: 'SonarQube', category: 'cicd' },
];

export const enterpriseContainer = [
  { id: 'kubernetes', name: 'Kubernetes', category: 'container' },
  { id: 'openshift', name: 'OpenShift', category: 'container' },
  { id: 'rancher', name: 'Rancher', category: 'container' },
  { id: 'helm', name: 'Helm', category: 'container' },
  { id: 'istio', name: 'Istio', category: 'container' },
];

// Enterprise tiers (Tier 3-5)
export const enterpriseTiers: Tier[] = [
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
