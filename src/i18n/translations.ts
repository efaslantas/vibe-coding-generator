export type Language = 'tr' | 'en';

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;

  // Steps
  stepPreset: string;
  stepStack: string;
  stepTemplates: string;
  stepPreview: string;
  stepExport: string;

  // Preset step
  projectSettings: string;
  projectSettingsDesc: string;
  projectName: string;
  projectNamePlaceholder: string;

  // Stack step
  techStackSelection: string;
  techStackSelectionDesc: string;
  techSelected: string;
  preset: string;
  recommended: string;
  locked: string;
  usage: string;
  pros: string;
  cons: string;

  // Validation messages
  validationMinTech: string;
  validationNoLang: string;
  validationNoDb: string;
  validationNoContainer: string;
  validationNoObservability: string;
  validationNoCicd: string;
  validationK8sDocker: string;

  // Tier step
  tierSelection: string;
  tierSelectionDesc: string;
  required: string;
  templates: string;

  // Review step
  preview: string;
  previewDesc: string;
  archSummary: string;

  // Export step
  export: string;
  exportDesc: string;
  zipArchive: string;
  zipArchiveDesc: string;
  singleFile: string;
  singleFileDesc: string;
  copyClipboard: string;
  copyClipboardDesc: string;
  copied: string;
  copy: string;
  download: string;
  nextSteps: string;
  nextStep1: string;
  nextStep2: string;
  nextStep3: string;
  nextStep4: string;

  // Navigation
  back: string;
  next: string;
  generate: string;

  // Footer
  version: string;

  // Toast
  autoAdded: string;
  requiredBy: string;

  // Categories
  catLanguages: string;
  catFrontend: string;
  catBackend: string;
  catDatabase: string;
  catSearch: string;
  catMessageQueue: string;
  catCloud: string;
  catCicd: string;
  catObservability: string;
  catSecrets: string;
  catContainer: string;
  catIac: string;
  catLoadBalancer: string;
  catVirtualization: string;
}

export const translations: Record<Language, Translations> = {
  tr: {
    // Header
    appTitle: 'Vibe Coding Generator',
    appSubtitle: 'AI-destekli development icin ozellestirilmis ruleset olusturucu',

    // Steps
    stepPreset: 'Baslangic',
    stepStack: 'Tech Stack',
    stepTemplates: 'Templates',
    stepPreview: 'Onizleme',
    stepExport: 'Export',

    // Preset step
    projectSettings: 'Proje Ayarlari',
    projectSettingsDesc: 'Projeniz icin bir baslangic noktasi secin veya sifirdan olusturun.',
    projectName: 'Proje Adi',
    projectNamePlaceholder: 'ornek: MyAwesomeProject',

    // Stack step
    techStackSelection: 'Tech Stack Secimi',
    techStackSelectionDesc: 'Projenizde kullanacaginiz teknolojileri secin. Bagimliliklar otomatik eklenir.',
    techSelected: 'teknoloji secildi',
    preset: 'Preset',
    recommended: 'onerilen',
    locked: 'kilitli',
    usage: 'Kullanim',
    pros: 'Artilari',
    cons: 'Eksileri',

    // Validation messages
    validationMinTech: 'En az bir teknoloji secmelisiniz.',
    validationNoLang: 'Programlama dili secilmedi.',
    validationNoDb: 'Backend secildi ama veritabani secilmedi.',
    validationNoContainer: 'Enterprise tier secildi ama container secilmedi.',
    validationNoObservability: 'Production icin observability onerilir.',
    validationNoCicd: 'CI/CD araci secilmedi.',
    validationK8sDocker: 'Kubernetes icin Docker gerekli.',

    // Tier step
    tierSelection: 'Template Tier Secimi',
    tierSelectionDesc: 'Projenizin buyuklugune gore gerekli template tier\'larini secin.',
    required: 'Zorunlu',
    templates: 'Template',

    // Review step
    preview: 'Onizleme',
    previewDesc: 'Olusturulan ruleset\'i inceleyin.',
    archSummary: 'Mimari Ozeti',

    // Export step
    export: 'Export',
    exportDesc: 'Ruleset\'i indirin veya kopyalayin.',
    zipArchive: 'ZIP Arsivi',
    zipArchiveDesc: 'Ayri dosyalar halinde .claude/ klasorunde',
    singleFile: 'Tek Dosya (Markdown)',
    singleFileDesc: 'Tum template\'ler tek bir .md dosyasinda',
    copyClipboard: 'Panoya Kopyala',
    copyClipboardDesc: 'Icerigi clipboard\'a kopyala',
    copied: 'Kopyalandi!',
    copy: 'Kopyala',
    download: 'Indir',
    nextSteps: 'Sonraki Adimlar',
    nextStep1: 'Ruleset dosyasini projenizin root klasorune koyun',
    nextStep2: 'Her template\'i ayri dosyalar olarak .claude/ klasorune tasiyabilirsiniz',
    nextStep3: 'Claude AI ile coding session\'lariniza baslayin',
    nextStep4: 'SESSION_NOTES.md ve SESSION_HANDOFF.md dosyalarini guncel tutun',

    // Navigation
    back: 'Geri',
    next: 'Devam',
    generate: 'Olustur',

    // Footer
    version: 'Vibe Coding Generator v2.0',

    // Toast
    autoAdded: 'Otomatik eklendi',
    requiredBy: 'baska bir secim tarafindan gerekli!',

    // Categories
    catLanguages: 'Programlama Dilleri',
    catFrontend: 'Frontend Framework',
    catBackend: 'Backend Framework',
    catDatabase: 'Veritabani',
    catSearch: 'Arama',
    catMessageQueue: 'Message Queue',
    catCloud: 'Cloud Provider',
    catCicd: 'CI/CD',
    catObservability: 'Observability',
    catSecrets: 'Secret Management',
    catContainer: 'Container & Orchestration',
    catIac: 'Infrastructure as Code',
    catLoadBalancer: 'Load Balancer & Proxy',
    catVirtualization: 'Virtualization & Backup',
  },
  en: {
    // Header
    appTitle: 'Vibe Coding Generator',
    appSubtitle: 'Customized ruleset generator for AI-assisted development',

    // Steps
    stepPreset: 'Start',
    stepStack: 'Tech Stack',
    stepTemplates: 'Templates',
    stepPreview: 'Preview',
    stepExport: 'Export',

    // Preset step
    projectSettings: 'Project Settings',
    projectSettingsDesc: 'Choose a starting point for your project or start from scratch.',
    projectName: 'Project Name',
    projectNamePlaceholder: 'e.g., MyAwesomeProject',

    // Stack step
    techStackSelection: 'Tech Stack Selection',
    techStackSelectionDesc: 'Select the technologies you\'ll use. Dependencies are auto-added.',
    techSelected: 'technologies selected',
    preset: 'Preset',
    recommended: 'recommended',
    locked: 'locked',
    usage: 'Use Case',
    pros: 'Pros',
    cons: 'Cons',

    // Validation messages
    validationMinTech: 'You must select at least one technology.',
    validationNoLang: 'No programming language selected.',
    validationNoDb: 'Backend selected but no database.',
    validationNoContainer: 'Enterprise tier selected but no container.',
    validationNoObservability: 'Observability recommended for production.',
    validationNoCicd: 'No CI/CD tool selected.',
    validationK8sDocker: 'Docker is required for Kubernetes.',

    // Tier step
    tierSelection: 'Template Tier Selection',
    tierSelectionDesc: 'Select template tiers based on your project size.',
    required: 'Required',
    templates: 'Templates',

    // Review step
    preview: 'Preview',
    previewDesc: 'Review the generated ruleset.',
    archSummary: 'Architecture Summary',

    // Export step
    export: 'Export',
    exportDesc: 'Download or copy the ruleset.',
    zipArchive: 'ZIP Archive',
    zipArchiveDesc: 'Separate files in .claude/ folder',
    singleFile: 'Single File (Markdown)',
    singleFileDesc: 'All templates in one .md file',
    copyClipboard: 'Copy to Clipboard',
    copyClipboardDesc: 'Copy content to clipboard',
    copied: 'Copied!',
    copy: 'Copy',
    download: 'Download',
    nextSteps: 'Next Steps',
    nextStep1: 'Place the ruleset file in your project root',
    nextStep2: 'You can move each template to .claude/ folder as separate files',
    nextStep3: 'Start your coding sessions with Claude AI',
    nextStep4: 'Keep SESSION_NOTES.md and SESSION_HANDOFF.md up to date',

    // Navigation
    back: 'Back',
    next: 'Next',
    generate: 'Generate',

    // Footer
    version: 'Vibe Coding Generator v2.0',

    // Toast
    autoAdded: 'Auto-added',
    requiredBy: 'is required by another selection!',

    // Categories
    catLanguages: 'Programming Languages',
    catFrontend: 'Frontend Framework',
    catBackend: 'Backend Framework',
    catDatabase: 'Database',
    catSearch: 'Search',
    catMessageQueue: 'Message Queue',
    catCloud: 'Cloud Provider',
    catCicd: 'CI/CD',
    catObservability: 'Observability',
    catSecrets: 'Secret Management',
    catContainer: 'Container & Orchestration',
    catIac: 'Infrastructure as Code',
    catLoadBalancer: 'Load Balancer & Proxy',
    catVirtualization: 'Virtualization & Backup',
  },
};
