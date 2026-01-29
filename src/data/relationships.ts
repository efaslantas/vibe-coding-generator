// Technology relationships and dependencies for vibe coding

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

  // Docker Compose - simpler setup
  'docker-compose': {
    requires: [{ category: 'container', techs: ['docker'] }],
  },

  // CircleCI
  'circleci': {
    recommends: [
      { category: 'container', techs: ['docker'] },
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
