import { useState, useMemo, useCallback } from 'react';
import JSZip from 'jszip';
import DOMPurify from 'dompurify';

// Parse config from URL on initial load
function getConfigFromUrl(): {
  projectName?: string;
  technologies?: Record<string, string[]>;
  tiers?: number[];
  presetId?: string;
} | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const configParam = params.get('config');
  if (!configParam) return null;
  try {
    const decoded = atob(configParam);
    const config = JSON.parse(decoded);
    // Clear URL after reading
    window.history.replaceState({}, '', window.location.pathname);
    return config;
  } catch {
    return null;
  }
}

const urlConfig = getConfigFromUrl();
import { categories, tiers } from './data/techStack';
import { presets } from './data/presets';
import { getTechInfo } from './data/techInfo';
import { getPresetInfo } from './data/presetInfo';
import { generateRuleset, generateTemplateFiles, generateAIToolFiles } from './generator';
import { aiTools } from './data/aiTools';
import { autoSelectRequired, getAllRecommendations, getRequiredTechs } from './data/relationships';
import { translations, type Language } from './i18n/translations';
import { useLocalStorage, STORAGE_KEYS } from './hooks/useLocalStorage';
import type { GeneratorConfig } from './types';
import type { Preset } from './data/presets';
import './App.css';

type Step = 'preset' | 'stack' | 'tiers' | 'review' | 'export';

function App() {
  // Language and LocalStorage
  const [language, setLanguage] = useLocalStorage<Language>(STORAGE_KEYS.LANGUAGE, 'tr');
  const [savedProjectName, setSavedProjectName] = useLocalStorage<string>(STORAGE_KEYS.PROJECT_NAME, 'MyProject');
  const [savedTechnologies, setSavedTechnologies] = useLocalStorage<Record<string, string[]>>(STORAGE_KEYS.SELECTED_TECHNOLOGIES, {});
  const [savedTiers, setSavedTiers] = useLocalStorage<number[]>(STORAGE_KEYS.SELECTED_TIERS, [1]);
  const [savedPresetId, setSavedPresetId] = useLocalStorage<string | null>(STORAGE_KEYS.LAST_PRESET, null);
  const [savedAITools, setSavedAITools] = useLocalStorage<string[]>(STORAGE_KEYS.SELECTED_AI_TOOLS, ['claude']);

  const t = translations[language];

  const [currentStep, setCurrentStep] = useState<Step>(() => urlConfig ? 'stack' : 'preset');
  const [projectName, setProjectName] = useState(() => urlConfig?.projectName || savedProjectName);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(() => {
    const presetId = urlConfig?.presetId || savedPresetId;
    if (presetId) {
      return presets.find(p => p.id === presetId) || null;
    }
    return null;
  });
  const [selectedTechnologies, setSelectedTechnologies] = useState<Record<string, string[]>>(() =>
    urlConfig?.technologies || savedTechnologies
  );
  const [selectedTiers, setSelectedTiers] = useState<number[]>(() => {
    const tiers = urlConfig?.tiers || savedTiers;
    return tiers.length > 0 ? tiers : [1];
  });
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAutoSelectToast, setShowAutoSelectToast] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'raw' | 'rendered'>('rendered');
  const [excludedTemplates, setExcludedTemplates] = useState<string[]>([]);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [selectedAITools, setSelectedAITools] = useState<string[]>(() => savedAITools);

  // Generate shareable URL
  const generateShareUrl = useCallback((): string => {
    const config = {
      projectName,
      technologies: selectedTechnologies,
      tiers: selectedTiers,
      presetId: selectedPreset?.id,
    };
    const encoded = btoa(JSON.stringify(config));
    return `${window.location.origin}${window.location.pathname}?config=${encoded}`;
  }, [projectName, selectedTechnologies, selectedTiers, selectedPreset]);

  const handleShare = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  // Validate and sanitize project name
  const sanitizeProjectName = (name: string): string => {
    // Remove potentially dangerous characters, keep alphanumeric, spaces, hyphens, underscores
    return name
      .replace(/[<>'"&;`$\\]/g, '')
      .slice(0, 100); // Max 100 characters
  };

  // Save to localStorage when values change
  const handleProjectNameChange = useCallback((name: string) => {
    const sanitized = sanitizeProjectName(name);
    setProjectName(sanitized);
    setSavedProjectName(sanitized);
  }, [setSavedProjectName]);

  const handleTechnologiesChange = useCallback((techs: Record<string, string[]>) => {
    setSelectedTechnologies(techs);
    setSavedTechnologies(techs);
  }, [setSavedTechnologies]);

  const handleTiersChange = useCallback((tiers: number[]) => {
    setSelectedTiers(tiers);
    setSavedTiers(tiers);
  }, [setSavedTiers]);

  const handleAIToolsChange = useCallback((tools: string[]) => {
    setSelectedAITools(tools);
    setSavedAITools(tools);
  }, [setSavedAITools]);

  const handleClearConfig = () => {
    // Clear all localStorage
    localStorage.removeItem(STORAGE_KEYS.PROJECT_NAME);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_TECHNOLOGIES);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_TIERS);
    localStorage.removeItem(STORAGE_KEYS.LAST_PRESET);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_AI_TOOLS);
    // Reset state
    setProjectName('MyProject');
    setSelectedPreset(null);
    setSelectedTechnologies({});
    setSelectedTiers([1]);
    setExcludedTemplates([]);
    setSelectedAITools(['claude']);
    setCurrentStep('preset');
  };

  const steps: { id: Step; label: string; icon: string }[] = [
    { id: 'preset', label: t.stepPreset, icon: '1' },
    { id: 'stack', label: t.stepStack, icon: '2' },
    { id: 'tiers', label: t.stepTemplates, icon: '3' },
    { id: 'review', label: t.stepPreview, icon: '4' },
    { id: 'export', label: t.stepExport, icon: '5' },
  ];

  const getSelectionCount = (): number => {
    return Object.values(selectedTechnologies).reduce((sum, arr) => sum + arr.length, 0);
  };

  const recommendations = useMemo(() => getAllRecommendations(selectedTechnologies), [selectedTechnologies]);

  const requiredBySelection = useMemo(() => {
    const required: Record<string, Set<string>> = {};
    for (const techs of Object.values(selectedTechnologies)) {
      for (const techId of techs) {
        const reqs = getRequiredTechs(techId);
        for (const req of reqs) {
          if (!required[req.category]) required[req.category] = new Set();
          req.techs.forEach(t => required[req.category].add(t));
        }
      }
    }
    const result: Record<string, string[]> = {};
    for (const [category, techs] of Object.entries(required)) {
      result[category] = Array.from(techs);
    }
    return result;
  }, [selectedTechnologies]);

  const validationIssues = useMemo(() => {
    const issues: { type: 'error' | 'warning' | 'info'; message: string }[] = [];

    // Check minimum selections (inline count calculation to avoid dependency issues)
    const selectionCount = Object.values(selectedTechnologies).reduce((sum, arr) => sum + arr.length, 0);
    if (Object.keys(selectedTechnologies).length === 0 || selectionCount === 0) {
      issues.push({ type: 'error', message: t.validationMinTech });
    }

    // Check language selection
    if (!selectedTechnologies.languages?.length) {
      issues.push({ type: 'warning', message: t.validationNoLang });
    }

    // Check database for backend projects
    if (selectedTechnologies.backend?.length && !selectedTechnologies.database?.length) {
      issues.push({ type: 'warning', message: t.validationNoDb });
    }

    // Check CI/CD
    if (!selectedTechnologies.cicd?.length) {
      issues.push({ type: 'info', message: t.validationNoCicd });
    }

    return issues;
  }, [selectedTechnologies, t]);

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    setSavedPresetId(preset.id);
    // Clear excluded templates when selecting new preset
    setExcludedTemplates([]);
    if (preset.id !== 'custom') {
      // Deep copy technologies to avoid reference issues
      const techs = JSON.parse(JSON.stringify(preset.technologies));
      handleTechnologiesChange(techs);
      handleTiersChange([...preset.tiers]);
    } else {
      handleTechnologiesChange({});
      handleTiersChange([1]);
    }
  };

  const handleTechToggle = (categoryId: string, techId: string, multiSelect: boolean) => {
    const current = selectedTechnologies[categoryId] || [];
    let newSelection: Record<string, string[]>;

    if (multiSelect) {
      if (current.includes(techId)) {
        const isRequired = Object.entries(selectedTechnologies).some(([cat, techs]) => {
          if (cat === categoryId) return false;
          return techs.some(t => {
            const reqs = getRequiredTechs(t);
            return reqs.some(r => r.category === categoryId && r.techs.includes(techId));
          });
        });

        if (isRequired) {
          showToast(`${getTechName(techId)} ${t.requiredBy}`);
          return;
        }
        newSelection = { ...selectedTechnologies, [categoryId]: current.filter(id => id !== techId) };
      } else {
        newSelection = { ...selectedTechnologies, [categoryId]: [...current, techId] };
        newSelection = autoSelectRequired(techId, newSelection);
        const autoSelected = getRequiredTechs(techId);
        if (autoSelected.length > 0) {
          const names = autoSelected.map(r => r.techs.map(t => getTechName(t)).join(language === 'tr' ? ' veya ' : ' or ')).join(', ');
          showToast(`${t.autoAdded}: ${names}`);
        }
      }
    } else {
      if (current.includes(techId)) {
        newSelection = { ...selectedTechnologies, [categoryId]: [] };
      } else {
        newSelection = { ...selectedTechnologies, [categoryId]: [techId] };
        newSelection = autoSelectRequired(techId, newSelection);
      }
    }
    handleTechnologiesChange(newSelection);
  };

  const showToast = (message: string) => {
    setShowAutoSelectToast(message);
    setTimeout(() => setShowAutoSelectToast(null), 3000);
  };

  const getTechName = (techId: string): string => {
    for (const cat of categories) {
      const tech = cat.technologies.find(t => t.id === techId);
      if (tech) return tech.name;
    }
    return techId;
  };

  // Get localized category name
  const getCategoryName = (categoryId: string): string => {
    const categoryTranslations: Record<string, keyof typeof t> = {
      languages: 'catLanguages',
      frontend: 'catFrontend',
      backend: 'catBackend',
      database: 'catDatabase',
      cloud: 'catCloud',
      cicd: 'catCicd',
      container: 'catContainer',
    };
    const key = categoryTranslations[categoryId];
    if (key && t[key]) return t[key] as string;
    // Fallback to original name from techStack
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || categoryId;
  };

  const handleTierToggle = (tierId: number) => {
    if (tierId === 1) return;
    const newTiers = selectedTiers.includes(tierId)
      ? selectedTiers.filter(id => id !== tierId)
      : [...selectedTiers, tierId];
    handleTiersChange(newTiers);
  };

  const handleTemplateToggle = (templateName: string) => {
    setExcludedTemplates(prev =>
      prev.includes(templateName)
        ? prev.filter(t => t !== templateName)
        : [...prev, templateName]
    );
  };

  const handleAIToolToggle = (toolId: string) => {
    const newTools = selectedAITools.includes(toolId)
      ? selectedAITools.filter(t => t !== toolId)
      : [...selectedAITools, toolId];
    handleAIToolsChange(newTools);
  };

  const getSelectedTemplates = (): string[] => {
    return tiers
      .filter(tier => selectedTiers.includes(tier.id))
      .flatMap(tier => tier.templates)
      .filter(template => !excludedTemplates.includes(template));
  };

  const handleGenerate = () => {
    const config: GeneratorConfig = { projectName, selectedTechnologies, selectedTiers, excludedTemplates, selectedAITools };
    const content = generateRuleset(config);
    setGeneratedContent(content);
  };

  const handleDownload = async (format: 'single' | 'zip') => {
    if (format === 'single') {
      const blob = new Blob([generatedContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VIBE_CODING_RULESET_${projectName.toUpperCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'zip') {
      const config: GeneratorConfig = { projectName, selectedTechnologies, selectedTiers, excludedTemplates, selectedAITools };
      const templateFiles = generateTemplateFiles(config);
      const aiToolFiles = generateAIToolFiles(config);

      const zip = new JSZip();

      // Add .claude folder with template files (only if claude is selected)
      if (selectedAITools.includes('claude')) {
        const claudeFolder = zip.folder('.claude');
        templateFiles.forEach(file => {
          claudeFolder?.file(file.name, file.content);
        });
      }

      // Add AI tool files
      aiToolFiles.forEach(file => {
        if (file.folder) {
          const folder = zip.folder(file.folder);
          folder?.file(file.fileName, file.content);
        } else {
          zip.file(file.fileName, file.content);
        }
      });

      // Also add a combined ruleset at root
      zip.file(`VIBE_CODING_RULESET_${projectName.toUpperCase()}.md`, generatedContent);

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}_vibe_coding_templates.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const goToStep = (step: Step) => {
    if (step === 'review' || step === 'export') {
      handleGenerate();
    }
    setCurrentStep(step);
  };

  const nextStep = () => {
    const stepOrder: Step[] = ['preset', 'stack', 'tiers', 'review', 'export'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      goToStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder: Step[] = ['preset', 'stack', 'tiers', 'review', 'export'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const canProceed = (): boolean => {
    if (currentStep === 'preset') return selectedPreset !== null;
    if (currentStep === 'stack') return getSelectionCount() > 0 && !validationIssues.some(i => i.type === 'error');
    if (currentStep === 'tiers') return selectedAITools.length > 0;
    return true;
  };

  // Escape HTML entities to prevent XSS
  const escapeHtml = (text: string): string => {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
    };
    return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
  };

  // Simple markdown to HTML converter with XSS protection
  const renderMarkdown = (md: string): string => {
    // First, escape HTML entities in the raw markdown
    // But preserve markdown syntax characters
    const escapeNonMarkdown = (text: string): string => {
      // Escape < and > that are not part of markdown
      return text
        .replace(/</g, '&lt;')
        .replace(/>/g, (_, offset, str) => {
          // Keep > for blockquotes at line start
          const lineStart = str.lastIndexOf('\n', offset - 1) + 1;
          if (offset === lineStart || str.slice(lineStart, offset).trim() === '') {
            return '>';
          }
          return '&gt;';
        });
    };

    let html = escapeNonMarkdown(md)
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr>')
      // Blockquote
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      // Unordered list items
      .replace(/^- \[ \] (.*$)/gm, '<li class="task">☐ $1</li>')
      .replace(/^- \[x\] (.*$)/gm, '<li class="task done">☑ $1</li>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      // Ordered list items
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      // Tables (basic support) - escape cell content
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        return '<tr>' + cells.map(c => `<td>${escapeHtml(c.trim())}</td>`).join('') + '</tr>';
      })
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-3]>)/g, '$1');
    html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<hr>)<\/p>/g, '$1');
    html = html.replace(/<p>(<li>)/g, '<ul>$1');
    html = html.replace(/(<\/li>)<\/p>/g, '$1</ul>');

    // Sanitize with DOMPurify to catch any remaining XSS vectors
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'pre', 'code', 'strong', 'em', 'hr', 'blockquote', 'ul', 'li', 'tr', 'td', 'table', 'br'],
      ALLOWED_ATTR: ['class'],
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="logo">VC</div>
          <div className="header-text">
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className={`share-btn ${shareSuccess ? 'success' : ''}`}
            onClick={handleShare}
            title={language === 'tr' ? 'Config Linkini Kopyala' : 'Copy Config Link'}
            disabled={getSelectionCount() === 0}
          >
            {shareSuccess ? '✓' : '🔗'}
          </button>
          <button
            className="reset-btn"
            onClick={handleClearConfig}
            title={language === 'tr' ? 'Ayarları Sıfırla' : 'Reset Config'}
          >
            ⟳
          </button>
          <div className="lang-toggle">
            <button
              className={`lang-btn ${language === 'tr' ? 'active' : ''}`}
              onClick={() => setLanguage('tr')}
            >
              TR
            </button>
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <nav className="steps-nav">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`step-item ${currentStep === step.id ? 'active' : ''} ${steps.findIndex(s => s.id === currentStep) > index ? 'completed' : ''}`}
            onClick={() => goToStep(step.id)}
          >
            <span className="step-number">{step.icon}</span>
            <span className="step-label">{step.label}</span>
          </button>
        ))}
      </nav>

      {/* Toast */}
      {showAutoSelectToast && <div className="toast">{showAutoSelectToast}</div>}

      {/* Main Content */}
      <main className="main">
        {/* Step 1: Preset Selection */}
        {currentStep === 'preset' && (
          <div className="step-content">
            <div className="step-header">
              <h2>{t.projectSettings}</h2>
              <p>{t.projectSettingsDesc}</p>
            </div>

            <div className="form-group">
              <label>{t.projectName}</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => handleProjectNameChange(e.target.value)}
                placeholder={t.projectNamePlaceholder}
                className="project-input"
              />
            </div>

            {/* Preset Info Panel */}
            {hoveredPreset && getPresetInfo(hoveredPreset) && (
              <div className="preset-info-panel">
                <h4>{presets.find(p => p.id === hoveredPreset)?.name}</h4>
                <p>{getPresetInfo(hoveredPreset)?.description}</p>
                <div className="preset-info-details">
                  <div><strong>{language === 'tr' ? 'Kullanim:' : 'Use Case:'}</strong> {getPresetInfo(hoveredPreset)?.useCase}</div>
                  <div className="preset-includes">
                    <strong>{language === 'tr' ? 'Icerik:' : 'Includes:'}</strong>
                    <ul>{getPresetInfo(hoveredPreset)?.includes.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  </div>
                  <div className="preset-pros-cons">
                    <div className="best-for">
                      <strong>{language === 'tr' ? 'Ideal:' : 'Best For:'}</strong>
                      <ul>{getPresetInfo(hoveredPreset)?.bestFor.map((item, i) => <li key={i}>{item}</li>)}</ul>
                    </div>
                    <div className="not-for">
                      <strong>{language === 'tr' ? 'Uygun Degil:' : 'Not For:'}</strong>
                      <ul>{getPresetInfo(hoveredPreset)?.notFor.map((item, i) => <li key={i}>{item}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="presets-grid">
              {presets.map(preset => (
                <div
                  key={preset.id}
                  className={`preset-card ${selectedPreset?.id === preset.id ? 'selected' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                  onMouseEnter={() => setHoveredPreset(preset.id)}
                  onMouseLeave={() => setHoveredPreset(null)}
                >
                  <div className="preset-icon">{preset.icon}</div>
                  <div className="preset-content">
                    <h3>{preset.name}</h3>
                    <p>{preset.description}</p>
                    <div className="preset-tags">
                      {preset.tags.map(tag => (
                        <span key={tag} className="preset-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {selectedPreset?.id === preset.id && <span className="preset-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tech Stack */}
        {currentStep === 'stack' && (
          <div className="step-content">
            <div className="step-header">
              <h2>{t.techStackSelection}</h2>
              <p>{t.techStackSelectionDesc}</p>
            </div>

            {/* Validation Panel */}
            {validationIssues.length > 0 && (
              <div className="validation-panel">
                {validationIssues.map((issue, i) => (
                  <div key={i} className={`validation-item ${issue.type}`}>
                    <span className="validation-icon">
                      {issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    {issue.message}
                  </div>
                ))}
              </div>
            )}

            {/* Selection Summary */}
            <div className="selection-summary">
              <span className="summary-count">{getSelectionCount()} {t.techSelected}</span>
              {selectedPreset && selectedPreset.id !== 'custom' && (
                <span className="summary-preset">{t.preset}: {selectedPreset.name}</span>
              )}
            </div>

            {/* Tech Info Panel */}
            {hoveredTech && getTechInfo(hoveredTech) && (
              <div className="tech-info-panel">
                <h4>{getTechName(hoveredTech)}</h4>
                <p>{getTechInfo(hoveredTech)?.description}</p>
                <div className="tech-info-details">
                  <div><strong>{t.usage}:</strong> {getTechInfo(hoveredTech)?.useCase}</div>
                  <div className="tech-pros-cons">
                    <div className="pros">
                      <strong>{t.pros}:</strong>
                      <ul>{getTechInfo(hoveredTech)?.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div className="cons">
                      <strong>{t.cons}:</strong>
                      <ul>{getTechInfo(hoveredTech)?.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="categories-grid">
              {categories.map(category => (
                <div key={category.id} className="category-card">
                  <div className="category-header">
                    <span className="category-icon">{category.icon}</span>
                    <h3>{getCategoryName(category.id)}</h3>
                  </div>
                  <div className="tech-list">
                    {category.technologies.map(tech => {
                      const isSelected = (selectedTechnologies[category.id] || []).includes(tech.id);
                      const recommended = recommendations[category.id]?.includes(tech.id) || false;
                      const required = requiredBySelection[category.id]?.includes(tech.id) || false;

                      return (
                        <label
                          key={tech.id}
                          className={`tech-item ${recommended && !isSelected ? 'recommended' : ''} ${required && !isSelected ? 'required-hint' : ''} ${isSelected && required ? 'locked' : ''}`}
                          onMouseEnter={() => setHoveredTech(tech.id)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <input
                            type={category.multiSelect ? "checkbox" : "radio"}
                            name={category.id}
                            checked={isSelected}
                            onChange={() => handleTechToggle(category.id, tech.id, category.multiSelect)}
                          />
                          <span className="tech-name">{tech.name}</span>
                          {required && isSelected && <span className="lock-icon">🔒</span>}
                          {recommended && !isSelected && <span className="recommend-badge">{t.recommended}</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Tiers */}
        {currentStep === 'tiers' && (
          <div className="step-content">
            <div className="step-header">
              <h2>{t.aiToolSelection}</h2>
              <p>{t.aiToolSelectionDesc}</p>
            </div>

            {/* AI Tools Section */}
            <div className="ai-tools-grid">
              {aiTools.map(tool => {
                const isSelected = selectedAITools.includes(tool.id);
                return (
                  <label
                    key={tool.id}
                    className={`ai-tool-card ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAIToolToggle(tool.id)}
                    />
                    <div className="ai-tool-content">
                      <div className="ai-tool-header">
                        <span className="ai-tool-icon">{tool.icon}</span>
                        <span className="ai-tool-name">{tool.name}</span>
                      </div>
                      <p className="ai-tool-desc">{tool.description[language]}</p>
                      <span className="ai-tool-file">
                        {t.aiToolFile}: {tool.folder ? `${tool.folder}/` : ''}{tool.fileName}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Claude Template Tiers - Only shown when Claude is selected */}
            {selectedAITools.length > 0 && (
              <>
                <div className="ai-tools-section">
                  <h3>{t.tierSelection}</h3>
                  <p>{t.tierSelectionDesc}</p>
                </div>

                <div className="tiers-list">
                  {tiers.map(tier => (
                    <div key={tier.id} className={`tier-card-large ${selectedTiers.includes(tier.id) ? 'selected' : ''} ${tier.required ? 'required' : ''}`}>
                      <label className="tier-label">
                        <input
                          type="checkbox"
                          checked={selectedTiers.includes(tier.id)}
                          onChange={() => handleTierToggle(tier.id)}
                          disabled={tier.required}
                        />
                        <div className="tier-main">
                          <div className="tier-header">
                            <h3>{tier.name}</h3>
                            {tier.required && <span className="required-badge">{t.required}</span>}
                          </div>
                          <p className="tier-description">{tier.description}</p>
                        </div>
                      </label>
                      <div className="tier-templates">
                        <h4>{tier.templates.filter(tmpl => !excludedTemplates.includes(tmpl)).length}/{tier.templates.length} {t.templates}:</h4>
                        <div className="template-checkbox-list">
                          {tier.templates.map(tmpl => (
                            <label
                              key={tmpl}
                              className={`template-checkbox ${excludedTemplates.includes(tmpl) ? 'excluded' : ''}`}
                            >
                              <input
                                type="checkbox"
                                checked={!excludedTemplates.includes(tmpl)}
                                onChange={() => handleTemplateToggle(tmpl)}
                                disabled={!selectedTiers.includes(tier.id)}
                              />
                              <span>{tmpl}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Template Summary */}
                <div className="template-summary">
                  <h4>{language === 'tr' ? 'Secili Template\'ler' : 'Selected Templates'}: {getSelectedTemplates().length}</h4>
                  <div className="template-list">
                    {getSelectedTemplates().map(tmpl => (
                      <span key={tmpl} className="template-tag selected">{tmpl}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 'review' && (
          <div className="step-content">
            <div className="step-header">
              <h2>{t.preview}</h2>
              <p>{t.previewDesc}</p>
            </div>

            {/* Architecture Summary */}
            <div className="architecture-summary">
              <h3>{t.archSummary}</h3>
              <div className="arch-grid">
                {Object.entries(selectedTechnologies).map(([catId, techs]) => {
                  if (techs.length === 0) return null;
                  const cat = categories.find(c => c.id === catId);
                  return (
                    <div key={catId} className="arch-item">
                      <span className="arch-icon">{cat?.icon}</span>
                      <span className="arch-label">{getCategoryName(catId)}:</span>
                      <span className="arch-value">{techs.map(t => getTechName(t)).join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview Tabs */}
            <div className="preview-tabs">
              <button
                className={`preview-tab ${previewMode === 'rendered' ? 'active' : ''}`}
                onClick={() => setPreviewMode('rendered')}
              >
                {language === 'tr' ? 'Gorsel' : 'Rendered'}
              </button>
              <button
                className={`preview-tab ${previewMode === 'raw' ? 'active' : ''}`}
                onClick={() => setPreviewMode('raw')}
              >
                {language === 'tr' ? 'Kaynak' : 'Source'}
              </button>
            </div>

            {previewMode === 'raw' ? (
              <pre className="preview-content">{generatedContent}</pre>
            ) : (
              <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(generatedContent) }}
              />
            )}
          </div>
        )}

        {/* Step 5: Export */}
        {currentStep === 'export' && (
          <div className="step-content">
            <div className="step-header">
              <h2>{t.export}</h2>
              <p>{t.exportDesc}</p>
            </div>

            <div className="export-options">
              <div className="export-card" onClick={() => handleDownload('zip')}>
                <div className="export-icon">📦</div>
                <h3>{t.zipArchive}</h3>
                <p>{t.zipArchiveDesc}</p>
                <button className="btn-primary">ZIP {t.download}</button>
              </div>

              <div className="export-card" onClick={() => handleDownload('single')}>
                <div className="export-icon">📄</div>
                <h3>{t.singleFile}</h3>
                <p>{t.singleFileDesc}</p>
                <button className="btn-primary">MD {t.download}</button>
              </div>

              <div className="export-card" onClick={handleCopy}>
                <div className="export-icon">📋</div>
                <h3>{t.copyClipboard}</h3>
                <p>{t.copyClipboardDesc}</p>
                <button className={`btn-primary ${copySuccess ? 'success' : ''}`}>
                  {copySuccess ? t.copied : t.copy}
                </button>
              </div>
            </div>

            <div className="export-info">
              <h4>{t.nextSteps}</h4>
              <ol>
                <li>{t.nextStep1}</li>
                <li>{t.nextStep2}</li>
                <li>{t.nextStep3}</li>
                <li>{t.nextStep4}</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <button className="btn-secondary" onClick={prevStep} disabled={currentStep === 'preset'}>
          ← {t.back}
        </button>
        <div className="footer-info">
          {t.version}
        </div>
        <button className="btn-primary" onClick={nextStep} disabled={!canProceed() || currentStep === 'export'}>
          {currentStep === 'tiers' ? t.generate : `${t.next} →`}
        </button>
      </footer>
    </div>
  );
}

export default App;
