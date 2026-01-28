export interface Technology {
  id: string;
  name: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  technologies: Technology[];
  multiSelect: boolean;
}

export interface Tier {
  id: number;
  name: string;
  description: string;
  required: boolean;
  templates: string[];
}

export interface GeneratorConfig {
  projectName: string;
  selectedTechnologies: Record<string, string[]>;
  selectedTiers: number[];
}
