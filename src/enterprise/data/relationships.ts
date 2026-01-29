// Enterprise technology relationships and dependencies
// These are separated from the main vibe generator for future fork capability

export interface TechRelationship {
  requires?: { category: string; techs: string[] }[];
  recommends?: { category: string; techs: string[] }[];
  conflicts?: { category: string; techs: string[] }[];
}

export const enterpriseRelationships: Record<string, TechRelationship> = {
  // Enterprise Languages
  'java': {
    recommends: [
      { category: 'backend', techs: ['spring'] },
      { category: 'database', techs: ['postgresql', 'mysql'] },
    ],
  },
  'kotlin': {
    recommends: [
      { category: 'backend', techs: ['spring'] },
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'csharp': {
    recommends: [
      { category: 'backend', techs: ['aspnet'] },
      { category: 'database', techs: ['mssql', 'postgresql'] },
      { category: 'cloud', techs: ['azure'] },
    ],
  },
  'swift': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
    ],
  },
  'ruby': {
    recommends: [
      { category: 'backend', techs: ['rails'] },
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'rust': {
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },

  // Enterprise Backend → Languages
  'spring': {
    requires: [{ category: 'languages', techs: ['java'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'mysql'] },
    ],
  },
  'aspnet': {
    requires: [{ category: 'languages', techs: ['csharp'] }],
    recommends: [
      { category: 'database', techs: ['mssql', 'postgresql'] },
      { category: 'cloud', techs: ['azure'] },
    ],
  },
  'rails': {
    requires: [{ category: 'languages', techs: ['ruby'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },

  // Enterprise Database
  'mssql': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'languages', techs: ['csharp'] },
    ],
  },

  // Enterprise Cloud
  'azure': {
    recommends: [
      { category: 'secrets', techs: ['azure-keyvault'] },
      { category: 'container', techs: ['kubernetes'] },
    ],
  },
  'aws': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },
  'gcp': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },

  // Kubernetes ecosystem
  'kubernetes': {
    requires: [{ category: 'container', techs: ['docker'] }],
    recommends: [
      { category: 'cicd', techs: ['argocd', 'gitlab-ci'] },
      { category: 'observability', techs: ['prometheus', 'grafana'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },
  'argocd': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'cicd', techs: ['gitlab-ci'] },
    ],
  },
  'openshift': {
    requires: [{ category: 'container', techs: ['docker'] }],
    recommends: [
      { category: 'cicd', techs: ['jenkins', 'argocd'] },
      { category: 'observability', techs: ['prometheus', 'grafana'] },
    ],
  },
  'rancher': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'container', techs: ['helm'] },
    ],
  },
  'helm': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'cicd', techs: ['argocd'] },
    ],
  },
  'istio': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'observability', techs: ['jaeger', 'prometheus', 'grafana'] },
    ],
  },

  // Observability stack relationships
  'grafana': {
    recommends: [
      { category: 'observability', techs: ['prometheus', 'loki'] },
    ],
  },
  'prometheus': {
    recommends: [
      { category: 'observability', techs: ['grafana'] },
    ],
  },
  'loki': {
    recommends: [
      { category: 'observability', techs: ['grafana'] },
    ],
  },
  'jaeger': {
    recommends: [
      { category: 'observability', techs: ['grafana'] },
    ],
  },

  // Search
  'elasticsearch': {
    recommends: [
      { category: 'observability', techs: ['grafana', 'kibana', 'logstash'] },
    ],
  },

  // ELK Stack relationships
  'kibana': {
    requires: [{ category: 'search', techs: ['elasticsearch'] }],
    recommends: [
      { category: 'observability', techs: ['logstash'] },
    ],
  },
  'logstash': {
    recommends: [
      { category: 'search', techs: ['elasticsearch'] },
      { category: 'observability', techs: ['kibana'] },
    ],
  },
  'graylog': {
    recommends: [
      { category: 'search', techs: ['elasticsearch'] },
      { category: 'database', techs: ['mongodb'] },
    ],
  },

  // Message Queue
  'kafka': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'backend', techs: ['spring'] },
    ],
  },
  'rabbitmq': {
    recommends: [
      { category: 'container', techs: ['docker'] },
    ],
  },

  // Secrets
  'vault': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
    ],
  },
  'azure-keyvault': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
    ],
  },

  // IaC
  'terraform': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'container', techs: ['kubernetes'] },
      { category: 'cicd', techs: ['gitlab-ci'] },
    ],
  },
  'ansible': {
    recommends: [
      { category: 'iac', techs: ['terraform'] },
      { category: 'container', techs: ['docker'] },
    ],
  },

  // CI/CD extras
  'jenkins': {
    recommends: [
      { category: 'languages', techs: ['java'] },
    ],
  },
  'azure-devops': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'languages', techs: ['csharp'] },
    ],
  },
  'bamboo': {
    recommends: [
      { category: 'languages', techs: ['java'] },
    ],
  },
  'sonarqube': {
    recommends: [
      { category: 'cicd', techs: ['gitlab-ci', 'jenkins'] },
    ],
  },

  // Load Balancers
  'nginx': {
    recommends: [
      { category: 'container', techs: ['docker', 'kubernetes'] },
    ],
  },
  'haproxy': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
    ],
  },

  // Virtualization
  'vmware': {
    recommends: [
      { category: 'virtualization', techs: ['veeam'] },
      { category: 'iac', techs: ['ansible', 'terraform'] },
    ],
  },
  'veeam': {
    recommends: [
      { category: 'virtualization', techs: ['vmware'] },
    ],
  },
};

export function getEnterpriseRequiredTechs(techId: string): { category: string; techs: string[] }[] {
  return enterpriseRelationships[techId]?.requires || [];
}

export function getEnterpriseRecommendedTechs(techId: string): { category: string; techs: string[] }[] {
  return enterpriseRelationships[techId]?.recommends || [];
}
