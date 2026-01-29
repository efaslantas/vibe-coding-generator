// Technology relationships and dependencies

export interface TechRelationship {
  // When this tech is selected, these must also be selected (auto-select)
  requires?: { category: string; techs: string[] }[];

  // When this tech is selected, these are recommended (highlight)
  recommends?: { category: string; techs: string[] }[];

  // This tech conflicts with these (can't select together)
  conflicts?: { category: string; techs: string[] }[];
}

export const techRelationships: Record<string, TechRelationship> = {
  // Frontend Frameworks → Languages
  'react': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'nextjs': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['prisma', 'supabase'] },
      { category: 'cloud', techs: ['vercel'] },
    ],
  },
  'vue': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'nuxt': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['supabase'] },
      { category: 'cloud', techs: ['netlify', 'vercel'] },
    ],
  },
  'angular': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'svelte': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'remix': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['prisma', 'postgresql'] },
      { category: 'cloud', techs: ['vercel', 'fly'] },
    ],
  },
  'astro': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'cloud', techs: ['vercel', 'netlify', 'cloudflare'] },
    ],
  },

  // Backend Frameworks → Languages
  'nodejs': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'mongodb'] },
    ],
  },
  'nestjs': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'prisma'] },
    ],
  },
  'django': {
    requires: [{ category: 'languages', techs: ['python'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'fastapi': {
    requires: [{ category: 'languages', techs: ['python'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'flask': {
    requires: [{ category: 'languages', techs: ['python'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'sqlite'] },
    ],
  },
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
  'gin': {
    requires: [{ category: 'languages', techs: ['go'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'laravel': {
    requires: [{ category: 'languages', techs: ['php'] }],
    recommends: [
      { category: 'database', techs: ['mysql', 'postgresql'] },
    ],
  },
  'rails': {
    requires: [{ category: 'languages', techs: ['ruby'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },

  // Kotlin backend
  'kotlin': {
    recommends: [
      { category: 'backend', techs: ['spring'] },
      { category: 'database', techs: ['postgresql'] },
    ],
  },

  // Swift
  'swift': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
    ],
  },

  // Database relationships
  'postgresql': {
    recommends: [
      { category: 'database', techs: ['redis'] }, // Cache alongside SQL
    ],
  },
  'mysql': {
    recommends: [
      { category: 'database', techs: ['redis'] },
    ],
  },
  'mssql': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'languages', techs: ['csharp'] },
    ],
  },
  'mongodb': {
    recommends: [
      { category: 'database', techs: ['redis'] },
      { category: 'languages', techs: ['js-ts'] },
    ],
  },
  'supabase': {
    recommends: [
      { category: 'languages', techs: ['js-ts'] },
      { category: 'frontend', techs: ['react', 'nextjs', 'vue', 'nuxt'] },
    ],
  },
  'firebase': {
    recommends: [
      { category: 'languages', techs: ['js-ts'] },
      { category: 'frontend', techs: ['react', 'vue'] },
    ],
  },
  'prisma': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
    ],
  },
  'drizzle': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'sqlite'] },
    ],
  },

  // Kubernetes → Docker
  'kubernetes': {
    requires: [{ category: 'container', techs: ['docker'] }],
    recommends: [
      { category: 'cicd', techs: ['argocd', 'gitlab-ci'] },
      { category: 'observability', techs: ['prometheus', 'grafana'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },

  // Docker Compose - simpler setup
  'docker-compose': {
    requires: [{ category: 'container', techs: ['docker'] }],
  },

  // ArgoCD → Kubernetes
  'argocd': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'cicd', techs: ['gitlab-ci'] },
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

  // Kafka - enterprise messaging
  'kafka': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'backend', techs: ['spring'] },
    ],
  },

  // Terraform
  'terraform': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'container', techs: ['kubernetes'] },
      { category: 'cicd', techs: ['gitlab-ci'] },
    ],
  },

  // Azure
  'azure': {
    recommends: [
      { category: 'secrets', techs: ['azure-keyvault'] },
      { category: 'container', techs: ['kubernetes'] },
    ],
  },

  // Vault
  'vault': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
    ],
  },

  // Elasticsearch
  'elasticsearch': {
    recommends: [
      { category: 'observability', techs: ['grafana', 'kibana', 'logstash'] },
    ],
  },

  // OpenShift → Docker
  'openshift': {
    requires: [{ category: 'container', techs: ['docker'] }],
    recommends: [
      { category: 'cicd', techs: ['jenkins', 'argocd'] },
      { category: 'observability', techs: ['prometheus', 'grafana'] },
    ],
  },

  // Rancher → Kubernetes
  'rancher': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'container', techs: ['helm'] },
    ],
  },

  // Helm → Kubernetes
  'helm': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'cicd', techs: ['argocd'] },
    ],
  },

  // Istio → Kubernetes
  'istio': {
    requires: [{ category: 'container', techs: ['kubernetes', 'docker'] }],
    recommends: [
      { category: 'observability', techs: ['jaeger', 'prometheus', 'grafana'] },
    ],
  },

  // AWS
  'aws': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },

  // GCP
  'gcp': {
    recommends: [
      { category: 'container', techs: ['kubernetes'] },
      { category: 'iac', techs: ['terraform'] },
    ],
  },

  // CircleCI
  'circleci': {
    recommends: [
      { category: 'container', techs: ['docker'] },
    ],
  },

  // Azure DevOps
  'azure-devops': {
    recommends: [
      { category: 'cloud', techs: ['azure'] },
      { category: 'languages', techs: ['csharp'] },
    ],
  },

  // Bamboo
  'bamboo': {
    recommends: [
      { category: 'languages', techs: ['java'] },
    ],
  },

  // SonarQube
  'sonarqube': {
    recommends: [
      { category: 'cicd', techs: ['gitlab-ci', 'jenkins'] },
    ],
  },

  // Ansible
  'ansible': {
    recommends: [
      { category: 'iac', techs: ['terraform'] },
      { category: 'container', techs: ['docker'] },
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

  // Graylog
  'graylog': {
    recommends: [
      { category: 'search', techs: ['elasticsearch'] },
      { category: 'database', techs: ['mongodb'] },
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

// Get all required techs for a selection
export function getRequiredTechs(techId: string): { category: string; techs: string[] }[] {
  return techRelationships[techId]?.requires || [];
}

// Get all recommended techs for a selection
export function getRecommendedTechs(techId: string): { category: string; techs: string[] }[] {
  return techRelationships[techId]?.recommends || [];
}

// Check if a tech selection is valid (all requirements met)
export function validateSelection(
  selectedTechnologies: Record<string, string[]>
): { valid: boolean; missing: { tech: string; requires: { category: string; techs: string[] }[] }[] } {
  const missing: { tech: string; requires: { category: string; techs: string[] }[] }[] = [];

  for (const techs of Object.values(selectedTechnologies)) {
    for (const techId of techs) {
      const requirements = getRequiredTechs(techId);
      for (const req of requirements) {
        const selectedInCategory = selectedTechnologies[req.category] || [];
        const hasRequired = req.techs.some(t => selectedInCategory.includes(t));
        if (!hasRequired) {
          missing.push({ tech: techId, requires: [req] });
        }
      }
    }
  }

  return { valid: missing.length === 0, missing };
}

// Auto-select required technologies
export function autoSelectRequired(
  techId: string,
  currentSelection: Record<string, string[]>
): Record<string, string[]> {
  const newSelection = { ...currentSelection };
  const requirements = getRequiredTechs(techId);

  for (const req of requirements) {
    const current = newSelection[req.category] || [];
    // Add first required tech if none are selected
    if (!req.techs.some(t => current.includes(t))) {
      newSelection[req.category] = [...current, req.techs[0]];
    }
  }

  return newSelection;
}

// Get all recommendations for current selection
export function getAllRecommendations(
  selectedTechnologies: Record<string, string[]>
): Record<string, string[]> {
  const recommendations: Record<string, Set<string>> = {};

  for (const techs of Object.values(selectedTechnologies)) {
    for (const techId of techs) {
      const recs = getRecommendedTechs(techId);
      for (const rec of recs) {
        if (!recommendations[rec.category]) {
          recommendations[rec.category] = new Set();
        }
        rec.techs.forEach(t => recommendations[rec.category].add(t));
      }
    }
  }

  // Convert Sets to arrays
  const result: Record<string, string[]> = {};
  for (const [category, techs] of Object.entries(recommendations)) {
    result[category] = Array.from(techs);
  }

  return result;
}
