import type { AIToolConfig } from '../types';

export const aiTools: AIToolConfig[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    fileName: 'CLAUDE.md',
    folder: '.claude',
    icon: '🤖',
    description: {
      tr: 'Anthropic Claude AI icin proje kurallari ve context dosyasi',
      en: 'Project rules and context file for Anthropic Claude AI',
    },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    fileName: 'CURSOR.md',
    folder: '.cursor',
    icon: '⚡',
    description: {
      tr: 'Cursor IDE icin AI asistan kurallari',
      en: 'AI assistant rules for Cursor IDE',
    },
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    fileName: 'WINDSURF.md',
    folder: '.windsurf',
    icon: '🏄',
    description: {
      tr: 'Windsurf IDE icin AI asistan kurallari',
      en: 'AI assistant rules for Windsurf IDE',
    },
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    fileName: 'COPILOT.md',
    folder: '.github',
    icon: '🐙',
    description: {
      tr: 'GitHub Copilot icin proje talimatları',
      en: 'Project instructions for GitHub Copilot',
    },
  },
  {
    id: 'cline',
    name: 'Cline/Roo',
    fileName: 'CLINE.md',
    folder: '.cline',
    icon: '🔮',
    description: {
      tr: 'Cline ve Roo AI asistanlari icin kurallar',
      en: 'Rules for Cline and Roo AI assistants',
    },
  },
  {
    id: 'aider',
    name: 'Aider',
    fileName: 'AIDER.md',
    folder: '.aider',
    icon: '🛠️',
    description: {
      tr: 'Aider AI pair programmer icin konvansiyonlar',
      en: 'Conventions for Aider AI pair programmer',
    },
  },
];

export function getAITool(id: string): AIToolConfig | undefined {
  return aiTools.find((tool) => tool.id === id);
}
