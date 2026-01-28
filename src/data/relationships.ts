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
    recommends: [
      { category: 'backend', techs: ['nodejs'] },
      { category: 'container', techs: ['docker'] },
    ],
  },
  'vue': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'angular': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },
  'svelte': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [{ category: 'backend', techs: ['nodejs'] }],
  },

  // Backend Frameworks → Languages
  'nodejs': {
    requires: [{ category: 'languages', techs: ['js-ts'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'mongodb'] },
      { category: 'container', techs: ['docker'] },
    ],
  },
  'django': {
    requires: [{ category: 'languages', techs: ['python'] }],
    recommends: [
      { category: 'database', techs: ['postgresql'] },
      { category: 'messagequeue', techs: ['rabbitmq'] },
    ],
  },
  'fastapi': {
    requires: [{ category: 'languages', techs: ['python'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'redis'] },
      { category: 'container', techs: ['docker'] },
    ],
  },
  'spring': {
    requires: [{ category: 'languages', techs: ['java'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'mysql'] },
      { category: 'messagequeue', techs: ['kafka', 'rabbitmq'] },
      { category: 'container', techs: ['docker', 'kubernetes'] },
    ],
  },
  'aspnet': {
    requires: [{ category: 'languages', techs: ['csharp'] }],
    recommends: [
      { category: 'database', techs: ['mssql', 'postgresql'] },
      { category: 'cloud', techs: ['azure'] },
      { category: 'messagequeue', techs: ['rabbitmq'] },
    ],
  },
  'gin': {
    requires: [{ category: 'languages', techs: ['go'] }],
    recommends: [
      { category: 'database', techs: ['postgresql', 'redis'] },
      { category: 'container', techs: ['docker', 'kubernetes'] },
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
      { category: 'observability', techs: ['grafana'] },
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

  for (const [_category, techs] of Object.entries(selectedTechnologies)) {
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
