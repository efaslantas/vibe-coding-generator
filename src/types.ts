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
  excludedTemplates?: string[];
  selectedAITools?: string[];
}

export type AIToolId = 'claude' | 'cursor' | 'windsurf' | 'copilot' | 'cline' | 'aider';

export interface AIToolConfig {
  id: AIToolId;
  name: string;
  fileName: string;
  folder?: string;
  icon: string;
  description: {
    tr: string;
    en: string;
  };
}
