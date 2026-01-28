import { useState, useMemo } from 'react';
import { categories, tiers } from './data/techStack';
import { presets } from './data/presets';
import { getTechInfo } from './data/techInfo';
import { generateRuleset } from './generator';
import { autoSelectRequired, getAllRecommendations, getRequiredTechs } from './data/relationships';
import type { GeneratorConfig } from './types';
import type { Preset } from './data/presets';
import './App.css';

type Step = 'preset' | 'stack' | 'tiers' | 'review' | 'export';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('preset');
  const [projectName, setProjectName] = useState('MyProject');
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Record<string, string[]>>({});
  const [selectedTiers, setSelectedTiers] = useState<number[]>([1]);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAutoSelectToast, setShowAutoSelectToast] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const steps: { id: Step; label: string; icon: string }[] = [
    { id: 'preset', label: 'Baslangic', icon: '1' },
    { id: 'stack', label: 'Tech Stack', icon: '2' },
    { id: 'tiers', label: 'Templates', icon: '3' },
    { id: 'review', label: 'Onizleme', icon: '4' },
    { id: 'export', label: 'Export', icon: '5' },
  ];

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

    // Check minimum selections
    if (Object.keys(selectedTechnologies).length === 0 || getSelectionCount() === 0) {
      issues.push({ type: 'error', message: 'En az bir teknoloji secmelisiniz.' });
    }

    // Check language selection
    if (!selectedTechnologies.languages?.length) {
      issues.push({ type: 'warning', message: 'Programlama dili secilmedi.' });
    }

    // Check database for backend projects
    if (selectedTechnologies.backend?.length && !selectedTechnologies.database?.length) {
      issues.push({ type: 'warning', message: 'Backend secildi ama veritabani secilmedi.' });
    }

    // Check container for production
    if (selectedTiers.includes(3) && !selectedTechnologies.container?.length) {
      issues.push({ type: 'warning', message: 'Enterprise tier secildi ama container secilmedi.' });
    }

    // Check observability for production
    if (selectedTiers.includes(3) && !selectedTechnologies.observability?.length) {
      issues.push({ type: 'info', message: 'Production icin observability onerilir.' });
    }

    // Check CI/CD
    if (!selectedTechnologies.cicd?.length) {
      issues.push({ type: 'info', message: 'CI/CD araci secilmedi.' });
    }

    // Kubernetes without Docker
    if (selectedTechnologies.container?.includes('kubernetes') && !selectedTechnologies.container?.includes('docker')) {
      issues.push({ type: 'error', message: 'Kubernetes icin Docker gerekli.' });
    }

    return issues;
  }, [selectedTechnologies, selectedTiers]);

  const handlePresetSelect = (preset: Preset) => {
    setSelectedPreset(preset);
    if (preset.id !== 'custom') {
      setSelectedTechnologies(preset.technologies);
      setSelectedTiers(preset.tiers);
    } else {
      setSelectedTechnologies({});
      setSelectedTiers([1]);
    }
  };

  const handleTechToggle = (categoryId: string, techId: string, multiSelect: boolean) => {
    setSelectedTechnologies(prev => {
      const current = prev[categoryId] || [];
      let newSelection: Record<string, string[]>;

      if (multiSelect) {
        if (current.includes(techId)) {
          const isRequired = Object.entries(prev).some(([cat, techs]) => {
            if (cat === categoryId) return false;
            return techs.some(t => {
              const reqs = getRequiredTechs(t);
              return reqs.some(r => r.category === categoryId && r.techs.includes(techId));
            });
          });

          if (isRequired) {
            showToast(`${getTechName(techId)} baska bir secim tarafindan gerekli!`);
            return prev;
          }
          newSelection = { ...prev, [categoryId]: current.filter(id => id !== techId) };
        } else {
          newSelection = { ...prev, [categoryId]: [...current, techId] };
          newSelection = autoSelectRequired(techId, newSelection);
          const autoSelected = getRequiredTechs(techId);
          if (autoSelected.length > 0) {
            const names = autoSelected.map(r => r.techs.map(t => getTechName(t)).join(' veya ')).join(', ');
            showToast(`Otomatik eklendi: ${names}`);
          }
        }
      } else {
        if (current.includes(techId)) {
          newSelection = { ...prev, [categoryId]: [] };
        } else {
          newSelection = { ...prev, [categoryId]: [techId] };
          newSelection = autoSelectRequired(techId, newSelection);
        }
      }
      return newSelection;
    });
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

  const handleTierToggle = (tierId: number) => {
    if (tierId === 1) return;
    setSelectedTiers(prev => prev.includes(tierId) ? prev.filter(id => id !== tierId) : [...prev, tierId]);
  };

  const handleGenerate = () => {
    const config: GeneratorConfig = { projectName, selectedTechnologies, selectedTiers };
    const content = generateRuleset(config);
    setGeneratedContent(content);
  };

  const handleDownload = (format: 'single' | 'zip') => {
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
    }
    // ZIP functionality would require additional library
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

  const getSelectionCount = (): number => {
    return Object.values(selectedTechnologies).reduce((sum, arr) => sum + arr.length, 0);
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
    return true;
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <div className="logo">VC</div>
          <div className="header-text">
            <h1>Vibe Coding Generator</h1>
            <p>AI-destekli development icin ozellestirilmis ruleset olusturucu</p>
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
              <h2>Proje Ayarlari</h2>
              <p>Projeniz icin bir baslangic noktasi secin veya sifirdan olusturun.</p>
            </div>

            <div className="form-group">
              <label>Proje Adi</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="ornek: MyAwesomeProject"
                className="project-input"
              />
            </div>

            <div className="presets-grid">
              {presets.map(preset => (
                <div
                  key={preset.id}
                  className={`preset-card ${selectedPreset?.id === preset.id ? 'selected' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
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
              <h2>Tech Stack Secimi</h2>
              <p>Projenizde kullanacaginiz teknolojileri secin. Bagimliliklar otomatik eklenir.</p>
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
              <span className="summary-count">{getSelectionCount()} teknoloji secildi</span>
              {selectedPreset && selectedPreset.id !== 'custom' && (
                <span className="summary-preset">Preset: {selectedPreset.name}</span>
              )}
            </div>

            {/* Tech Info Panel */}
            {hoveredTech && getTechInfo(hoveredTech) && (
              <div className="tech-info-panel">
                <h4>{getTechName(hoveredTech)}</h4>
                <p>{getTechInfo(hoveredTech)?.description}</p>
                <div className="tech-info-details">
                  <div><strong>Kullanim:</strong> {getTechInfo(hoveredTech)?.useCase}</div>
                  <div className="tech-pros-cons">
                    <div className="pros">
                      <strong>Artilari:</strong>
                      <ul>{getTechInfo(hoveredTech)?.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div className="cons">
                      <strong>Eksileri:</strong>
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
                    <h3>{category.name}</h3>
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
                          {recommended && !isSelected && <span className="recommend-badge">onerilen</span>}
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
              <h2>Template Tier Secimi</h2>
              <p>Projenizin buyuklugune gore gerekli template tier'larini secin.</p>
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
                        {tier.required && <span className="required-badge">Zorunlu</span>}
                      </div>
                      <p className="tier-description">{tier.description}</p>
                    </div>
                  </label>
                  <div className="tier-templates">
                    <h4>{tier.templates.length} Template:</h4>
                    <div className="template-list">
                      {tier.templates.map(t => (
                        <span key={t} className="template-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 'review' && (
          <div className="step-content">
            <div className="step-header">
              <h2>Onizleme</h2>
              <p>Olusturulan ruleset'i inceleyin.</p>
            </div>

            {/* Architecture Summary */}
            <div className="architecture-summary">
              <h3>Mimari Ozeti</h3>
              <div className="arch-grid">
                {Object.entries(selectedTechnologies).map(([catId, techs]) => {
                  if (techs.length === 0) return null;
                  const cat = categories.find(c => c.id === catId);
                  return (
                    <div key={catId} className="arch-item">
                      <span className="arch-icon">{cat?.icon}</span>
                      <span className="arch-label">{cat?.name}:</span>
                      <span className="arch-value">{techs.map(t => getTechName(t)).join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <pre className="preview-content">{generatedContent}</pre>
          </div>
        )}

        {/* Step 5: Export */}
        {currentStep === 'export' && (
          <div className="step-content">
            <div className="step-header">
              <h2>Export</h2>
              <p>Ruleset'i indirin veya kopyalayin.</p>
            </div>

            <div className="export-options">
              <div className="export-card" onClick={() => handleDownload('single')}>
                <div className="export-icon">📄</div>
                <h3>Tek Dosya (Markdown)</h3>
                <p>Tum template'ler tek bir .md dosyasinda</p>
                <button className="btn-primary">Indir</button>
              </div>

              <div className="export-card" onClick={handleCopy}>
                <div className="export-icon">📋</div>
                <h3>Panoya Kopyala</h3>
                <p>Icerigi clipboard'a kopyala</p>
                <button className={`btn-primary ${copySuccess ? 'success' : ''}`}>
                  {copySuccess ? 'Kopyalandi!' : 'Kopyala'}
                </button>
              </div>
            </div>

            <div className="export-info">
              <h4>Sonraki Adimlar</h4>
              <ol>
                <li>Ruleset dosyasini projenizin root klasorune koyun</li>
                <li>Her template'i ayri dosyalar olarak <code>.claude/</code> klasorune tasiyabilirsiniz</li>
                <li>Claude AI ile coding session'lariniza baslayin</li>
                <li>SESSION_NOTES.md ve SESSION_HANDOFF.md dosyalarini guncel tutun</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <button className="btn-secondary" onClick={prevStep} disabled={currentStep === 'preset'}>
          ← Geri
        </button>
        <div className="footer-info">
          Vibe Coding Generator v2.0
        </div>
        <button className="btn-primary" onClick={nextStep} disabled={!canProceed() || currentStep === 'export'}>
          {currentStep === 'tiers' ? 'Olustur' : 'Devam →'}
        </button>
      </footer>
    </div>
  );
}

export default App;
