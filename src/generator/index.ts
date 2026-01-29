import type { GeneratorConfig } from '../types';
import { categories, tiers } from '../data/techStack';

export interface TemplateFile {
  name: string;
  content: string;
}

// Shared template context type
interface TemplateContext {
  projectName: string;
  date: string;
  selectedLangs: string[];
  selectedFrontend: string[];
  selectedBackend: string[];
  selectedDb: string[];
  selectedCloud: string[];
  selectedCicd: string[];
  selectedContainer: string[];
  getTechNames: (categoryId: string, ids: string[]) => string;
}

// Helper to create template context from config
function createTemplateContext(config: GeneratorConfig): TemplateContext {
  const { projectName, selectedTechnologies } = config;
  const date = new Date().toISOString().split('T')[0];

  const getTechNames = (categoryId: string, ids: string[]): string => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';
    return ids.map(id => category.technologies.find(t => t.id === id)?.name || id).join(', ');
  };

  return {
    projectName,
    date,
    selectedLangs: selectedTechnologies.languages || [],
    selectedFrontend: selectedTechnologies.frontend || [],
    selectedBackend: selectedTechnologies.backend || [],
    selectedDb: selectedTechnologies.database || [],
    selectedCloud: selectedTechnologies.cloud || [],
    selectedCicd: selectedTechnologies.cicd || [],
    selectedContainer: selectedTechnologies.container || [],
    getTechNames,
  };
}

// ============ TIER 1 TEMPLATE GENERATORS ============

function generateClaudeTemplate(ctx: TemplateContext): string {
  let content = `# ${ctx.projectName}

> **Guncelleme:** ${ctx.date} | Vibe Coding
> **Durum:** Development

---

## Hizli Referans

| Komut | Aciklama |
|-------|----------|
`;

  // Add framework-specific commands
  if (ctx.selectedFrontend.includes('nextjs')) {
    content += `| \`npm run dev\` | Next.js dev server |
| \`npm run build\` | Production build |
| \`npm run start\` | Production server |
| \`npm run lint\` | ESLint kontrolu |
`;
  } else if (ctx.selectedFrontend.includes('nuxt')) {
    content += `| \`npm run dev\` | Nuxt dev server |
| \`npm run build\` | Production build |
| \`npm run preview\` | Preview production |
| \`npm run lint\` | ESLint kontrolu |
`;
  } else if (ctx.selectedBackend.includes('django')) {
    content += `| \`python manage.py runserver\` | Development server |
| \`python manage.py migrate\` | Run migrations |
| \`python manage.py test\` | Run tests |
| \`python manage.py createsuperuser\` | Create admin user |
`;
  } else if (ctx.selectedBackend.includes('fastapi')) {
    content += `| \`uvicorn main:app --reload\` | Development server |
| \`pytest\` | Run tests |
| \`pip install -r requirements.txt\` | Install dependencies |
`;
  } else if (ctx.selectedBackend.includes('laravel')) {
    content += `| \`php artisan serve\` | Development server |
| \`php artisan migrate\` | Run migrations |
| \`php artisan test\` | Run tests |
| \`composer install\` | Install dependencies |
`;
  } else if (ctx.selectedBackend.includes('gin')) {
    content += `| \`go run main.go\` | Development server |
| \`go test ./...\` | Run tests |
| \`go build\` | Build binary |
`;
  } else {
    content += `| \`npm run dev\` | Development server |
| \`npm run build\` | Production build |
| \`npm run test\` | Testleri calistir |
| \`npm run lint\` | Lint kontrolu |
`;
  }

  content += `
---

## Tech Stack

### Languages
${ctx.selectedLangs.length > 0 ? ctx.getTechNames('languages', ctx.selectedLangs) : '-'}

### Frontend
${ctx.selectedFrontend.length > 0 ? ctx.getTechNames('frontend', ctx.selectedFrontend) : '-'}

### Backend
${ctx.selectedBackend.length > 0 ? ctx.getTechNames('backend', ctx.selectedBackend) : '-'}

### Database
${ctx.selectedDb.length > 0 ? ctx.getTechNames('database', ctx.selectedDb) : '-'}

### Infrastructure
- Cloud: ${ctx.selectedCloud.length > 0 ? ctx.getTechNames('cloud', ctx.selectedCloud) : '-'}
- CI/CD: ${ctx.selectedCicd.length > 0 ? ctx.getTechNames('cicd', ctx.selectedCicd) : '-'}
- Container: ${ctx.selectedContainer.length > 0 ? ctx.getTechNames('container', ctx.selectedContainer) : '-'}

---

## Proje Yapisi

\`\`\`
`;

  // Add framework-specific project structure
  if (ctx.selectedFrontend.includes('nextjs')) {
    content += `${ctx.projectName}/
├── app/              # App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── api/          # API routes
├── components/       # React components
├── lib/              # Utilities
├── public/           # Static files
└── next.config.js
`;
  } else if (ctx.selectedFrontend.includes('nuxt')) {
    content += `${ctx.projectName}/
├── pages/            # File-based routing
├── components/       # Vue components
├── composables/      # Composition API
├── server/           # Server routes
├── public/           # Static files
└── nuxt.config.ts
`;
  } else if (ctx.selectedBackend.includes('django')) {
    content += `${ctx.projectName}/
├── ${ctx.projectName.toLowerCase()}/
│   ├── settings.py   # Configuration
│   ├── urls.py       # URL routing
│   └── wsgi.py       # WSGI entry
├── apps/             # Django apps
├── templates/        # HTML templates
├── static/           # Static files
└── manage.py
`;
  } else if (ctx.selectedBackend.includes('fastapi')) {
    content += `${ctx.projectName}/
├── app/
│   ├── main.py       # Entry point
│   ├── routers/      # API routes
│   ├── models/       # Pydantic models
│   ├── services/     # Business logic
│   └── db/           # Database
├── tests/
└── requirements.txt
`;
  } else if (ctx.selectedBackend.includes('nestjs')) {
    content += `${ctx.projectName}/
├── src/
│   ├── main.ts       # Entry point
│   ├── app.module.ts # Root module
│   ├── modules/      # Feature modules
│   └── common/       # Shared code
├── test/
└── nest-cli.json
`;
  } else {
    content += `${ctx.projectName}/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── tests/
├── docs/
└── package.json
`;
  }

  content += `\`\`\`

---

## Kurallar

### CRITICAL (Ihlal = Reject)
- [ ] Hardcoded secret YASAK
`;

  // Add language-specific rules
  if (ctx.selectedLangs.includes('js-ts')) {
    content += `- [ ] TypeScript strict mode ACIK
`;
  } else if (ctx.selectedLangs.includes('python')) {
    content += `- [ ] Type hints kullan (mypy uyumlu)
`;
  } else if (ctx.selectedLangs.includes('go')) {
    content += `- [ ] go vet ve golint hatasiz olmali
`;
  }

  content += `- [ ] Her PR review ZORUNLU

### IMPORTANT (Ihlal = Warning)
- [ ] Her fonksiyon test edilmeli
- [ ] Commit conventional format
- [ ] PR 400 satir limit

### GUIDELINE (Onerilen)
- [ ] Fonksiyon max 50 satir
- [ ] Dosya max 300 satir
- [ ] Aciklayici degisken isimleri`;

  return content;
}

function generateRulesetsTemplate(ctx: TemplateContext): string {
  return `# Development Rules - ${ctx.projectName}

> **Gecerli:** ${ctx.date}

---

## CRITICAL Rules (Ihlal = Reject)

### SEC-1: No Hardcoded Secrets
\`\`\`
YAPMA:
const apiKey = "sk-xxxxx";
const dbPassword = "password123";

YAP:
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
\`\`\`

### SEC-2: Input Validation
Tum kullanici inputlari validate edilmeli.

### SEC-3: SQL Injection Prevention
Parameterized queries kullan.

---

## IMPORTANT Rules (Ihlal = Warning)

### CODE-1: TypeScript Strict Mode
tsconfig.json'da strict: true olmali.

### CODE-2: Error Handling
Try-catch ile hatalari yakala, logla.

### CODE-3: Testing
Her yeni fonksiyon icin test yaz.

---

## GUIDELINE Rules (Onerilen)

### STYLE-1: Naming Conventions
- camelCase: degiskenler, fonksiyonlar
- PascalCase: class, interface, type
- UPPER_SNAKE_CASE: constants

### STYLE-2: File Organization
- Tek sorumluluk prensibi
- Max 300 satir/dosya
- Max 50 satir/fonksiyon`;
}

function generateVibeCodingTemplate(ctx: TemplateContext): string {
  return `# Vibe Coding Workflow - ${ctx.projectName}

---

## Session Baslangici

1. Context yukle:
\`\`\`bash
cat CLAUDE.md && cat SESSION_HANDOFF.md
\`\`\`

2. Onceki session'dan kalan isler
3. Bugunun hedefleri

---

## AI Iletisim Patterns

### Iyi Prompt Ornegi
\`\`\`
"UserService'e email validation ekle.
- Zod schema kullan
- Unique email kontrolu
- Error mesajlari Turkce"
\`\`\`

### Kotu Prompt Ornegi
\`\`\`
"email duzelt"  // Belirsiz, context yok
\`\`\`

---

## Hallucination Control

Her AI ciktisini kontrol et:
- [ ] Import'lar dogru mu?
- [ ] API'lar gercek mi?
- [ ] Syntax dogru mu?
- [ ] Guvenlik acigi var mi?

---

## Session Bitisi

1. SESSION_NOTES.md guncelle
2. SESSION_HANDOFF.md guncelle
3. Commit at`;
}

function generateSessionNotesTemplate(ctx: TemplateContext): string {
  return `# Session Notes - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Aktif Session

### Tarih: ${ctx.date}

#### Yapilan Isler
- [ ] ...

#### Kararlar
- ...

#### Notlar
- ...

---

## Onceki Sessions

| Tarih | Ozet | Durum |
|-------|------|-------|
| ${ctx.date} | Proje baslangici | Devam |`;
}

function generateSessionHandoffTemplate(ctx: TemplateContext): string {
  return `# Session Handoff - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Mevcut Durum

### Tamamlanan
- [ ] Proje kurulumu

### Devam Eden
- [ ] ...

### Bekleyen
- [ ] ...

---

## Sonraki Session Icin

### Oncelikli Isler
1. ...

### Context
- ...

### Dikkat Edilecekler
- ...`;
}

function generateCodeReviewTemplate(ctx: TemplateContext): string {
  return `# Code Review Checklist - ${ctx.projectName}

---

## Review Sureci

1. PR acildi
2. CI/CD gecti
3. Code review yapildi
4. Approve alindi
5. Merge edildi

---

## Checklist

### Security
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection check
- [ ] XSS prevention

### Code Quality
- [ ] TypeScript strict
- [ ] No console.log in prod
- [ ] Error handling
- [ ] Tests written

### Architecture
- [ ] Single responsibility
- [ ] No circular deps
- [ ] Clean imports`;
}

// ============ TIER 2 TEMPLATE GENERATORS ============

function generateExamplesTemplate(ctx: TemplateContext): string {
  return `# Gercek Ornekler - ${ctx.projectName}

---

## Senaryo 1: Yeni Endpoint Ekleme

### Prompt
"GET /api/users/:id endpoint'i ekle, user bulunamazsa 404 don"

### Beklenen Cikti
- Route tanimlanmis
- Controller metodu yazilmis
- Error handling mevcut
- Test yazilmis

---

## Senaryo 2: Database Migration

### Prompt
"users tablosuna 'role' kolonu ekle, default 'user' olsun"

### Beklenen Cikti
- Migration dosyasi olusturulmus
- Rollback mevcut
- Schema updated`;
}

function generateCodebaseMapTemplate(ctx: TemplateContext): string {
  return `# Codebase Map - ${ctx.projectName}

---

## Dizin Yapisi

\`\`\`
src/
├── api/           # API routes
├── services/      # Business logic
├── models/        # Data models
├── utils/         # Helpers
└── config/        # Configuration
\`\`\`

---

## Kritik Dosyalar

| Dosya | Amac |
|-------|------|
| src/index.ts | Entry point |
| src/config/index.ts | Environment config |
| src/api/routes.ts | Route definitions |`;
}

function generateDebuggingTemplate(ctx: TemplateContext): string {
  return `# Debugging Guide - ${ctx.projectName}

---

## Genel Debug

\`\`\`bash
# Logs
npm run logs

# Debug mode
DEBUG=* npm run dev
\`\`\`

---

## Bilinen Sorunlar

| Sorun | Cozum |
|-------|-------|
| Port kullanımda | PORT env degistir |
| DB connection | Connection string kontrol |`;
}

// ============ MAIN GENERATOR FUNCTIONS ============

export function generateTemplateFiles(config: GeneratorConfig): TemplateFile[] {
  const { selectedTiers, excludedTemplates = [] } = config;
  const ctx = createTemplateContext(config);
  const files: TemplateFile[] = [];

  const isIncluded = (templateName: string): boolean => !excludedTemplates.includes(templateName);

  // Tier 1 - Core templates (always available)
  if (isIncluded('CLAUDE.md')) files.push({ name: 'CLAUDE.md', content: generateClaudeTemplate(ctx) });
  if (isIncluded('RULESETS.md')) files.push({ name: 'RULESETS.md', content: generateRulesetsTemplate(ctx) });
  if (isIncluded('VIBE_CODING.md')) files.push({ name: 'VIBE_CODING.md', content: generateVibeCodingTemplate(ctx) });
  if (isIncluded('SESSION_NOTES.md')) files.push({ name: 'SESSION_NOTES.md', content: generateSessionNotesTemplate(ctx) });
  if (isIncluded('SESSION_HANDOFF.md')) files.push({ name: 'SESSION_HANDOFF.md', content: generateSessionHandoffTemplate(ctx) });
  if (isIncluded('CODE_REVIEW.md')) files.push({ name: 'CODE_REVIEW.md', content: generateCodeReviewTemplate(ctx) });

  // Tier 2 templates
  if (selectedTiers.includes(2)) {
    if (isIncluded('EXAMPLES.md')) files.push({ name: 'EXAMPLES.md', content: generateExamplesTemplate(ctx) });
    if (isIncluded('CODEBASE_MAP.md')) files.push({ name: 'CODEBASE_MAP.md', content: generateCodebaseMapTemplate(ctx) });
    if (isIncluded('DEBUGGING.md')) files.push({ name: 'DEBUGGING.md', content: generateDebuggingTemplate(ctx) });
  }

  return files;
}

export function generateRuleset(config: GeneratorConfig): string {
  const { projectName, selectedTiers } = config;
  const ctx = createTemplateContext(config);

  // Helper to escape code blocks for embedding in markdown code blocks
  const escapeForCodeBlock = (content: string): string => {
    return content.replace(/```/g, '\\`\\`\\`');
  };

  let output = `# Vibe Coding Rule Set - ${projectName}

> **Surum:** v1.0 (Generated) | **Olusturulma:** ${ctx.date}
> **Kapsam:** ${projectName} projesi
> **Amac:** Claude AI ile development icin ozellestirilmis template seti

---

## Genel Bakis

### Vibe Coding Nedir?

\`\`\`
Vibe Coding = AI Assistant + Human Developer + Iterative Feedback Loop

Temel Dongu:
1. PLAN    → Ne yapacagini anla, AI'a sor
2. BUILD   → AI kod yazar, sen review et
3. TEST    → Lokal'de test et, hatayi yakala
4. REVIEW  → Kod kalitesi, guvenlik, hallucination kontrol
5. COMMIT  → Sadece gecen kod commit edilir
\`\`\`

---

## Tech Stack

### Programlama Dilleri
${ctx.selectedLangs.length > 0 ? ctx.getTechNames('languages', ctx.selectedLangs) : 'Secilmedi'}

### Frontend
${ctx.selectedFrontend.length > 0 ? ctx.getTechNames('frontend', ctx.selectedFrontend) : 'Secilmedi'}

### Backend
${ctx.selectedBackend.length > 0 ? ctx.getTechNames('backend', ctx.selectedBackend) : 'Secilmedi'}

### Veritabani
${ctx.selectedDb.length > 0 ? ctx.getTechNames('database', ctx.selectedDb) : 'Secilmedi'}

### Infrastructure

| Kategori | Teknoloji |
|----------|-----------|
${ctx.selectedCloud.length > 0 ? `| Cloud | ${ctx.getTechNames('cloud', ctx.selectedCloud)} |` : ''}
${ctx.selectedContainer.length > 0 ? `| Container | ${ctx.getTechNames('container', ctx.selectedContainer)} |` : ''}
${ctx.selectedCicd.length > 0 ? `| CI/CD | ${ctx.getTechNames('cicd', ctx.selectedCicd)} |` : ''}

---

## Dosya Listesi

`;

  // Add selected tiers
  [...selectedTiers].sort((a, b) => a - b).forEach(tierId => {
    const tier = tiers.find(t => t.id === tierId);
    if (tier) {
      output += `### ${tier.name}

| # | Dosya | Durum |
|---|-------|-------|
${tier.templates.map((t, i) => `| ${i + 1} | \`${t}\` | [ ] |`).join('\n')}

`;
    }
  });

  // Add templates using shared generators
  output += `---

## Template 1: CLAUDE.md

\`\`\`markdown
${escapeForCodeBlock(generateClaudeTemplate(ctx))}
\`\`\`

---

## Template 2: RULESETS.md

\`\`\`markdown
${escapeForCodeBlock(generateRulesetsTemplate(ctx))}
\`\`\`

---

## Template 3: VIBE_CODING.md

\`\`\`markdown
${escapeForCodeBlock(generateVibeCodingTemplate(ctx))}
\`\`\`

`;

  // Add Tier 2 templates
  if (selectedTiers.includes(2)) {
    output += `---

## Template 7: EXAMPLES.md

\`\`\`markdown
${escapeForCodeBlock(generateExamplesTemplate(ctx))}
\`\`\`

---

## Template 8: CODEBASE_MAP.md

\`\`\`markdown
${escapeForCodeBlock(generateCodebaseMapTemplate(ctx))}
\`\`\`

`;
  }

  // Footer
  output += `---

**Template Surumu:** v1.0 (Generated)
**Kaynak:** Vibe Coding Generator
**Olusturulma:** ${ctx.date}
**Proje:** ${projectName}
`;

  return output;
}
