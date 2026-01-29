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
  selectedSearch: string[];
  selectedMq: string[];
  selectedCloud: string[];
  selectedCicd: string[];
  selectedObs: string[];
  selectedSecrets: string[];
  selectedContainer: string[];
  selectedIac: string[];
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
    selectedSearch: selectedTechnologies.search || [],
    selectedMq: selectedTechnologies.messagequeue || [],
    selectedCloud: selectedTechnologies.cloud || [],
    selectedCicd: selectedTechnologies.cicd || [],
    selectedObs: selectedTechnologies.observability || [],
    selectedSecrets: selectedTechnologies.secrets || [],
    selectedContainer: selectedTechnologies.container || [],
    selectedIac: selectedTechnologies.iac || [],
    getTechNames,
  };
}

// ============ SHARED TEMPLATE GENERATORS ============

function generateClaudeTemplate(ctx: TemplateContext): string {
  return `# ${ctx.projectName}

> **Guncelleme:** ${ctx.date} | Vibe Coding
> **Durum:** Development

---

## Hizli Referans

| Komut | Aciklama |
|-------|----------|
| \`npm run dev\` | Development server |
| \`npm run build\` | Production build |
| \`npm run test\` | Testleri calistir |
| \`npm run lint\` | Lint kontrolu |

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
${ctx.projectName}/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── tests/
├── docs/
└── package.json
\`\`\`

---

## Kurallar

### CRITICAL (Ihlal = Reject)
- [ ] Hardcoded secret YASAK
- [ ] TypeScript strict mode ACIK
- [ ] Her PR review ZORUNLU

### IMPORTANT (Ihlal = Warning)
- [ ] Her fonksiyon test edilmeli
- [ ] Commit conventional format
- [ ] PR 400 satir limit

### GUIDELINE (Onerilen)
- [ ] Fonksiyon max 50 satir
- [ ] Dosya max 300 satir
- [ ] Aciklayici degisken isimleri`;
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

function generateCicdTemplate(ctx: TemplateContext): string {
  let content = `# CI/CD Pipeline - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Pipeline Overview

`;

  if (ctx.selectedCicd.includes('gitlab-ci')) {
    content += `### GitLab CI

\`\`\`yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm run test
    - npm run lint

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - ./deploy.sh
  only:
    - main
\`\`\`
`;
  }

  if (ctx.selectedCicd.includes('argocd')) {
    content += `### ArgoCD

GitOps workflow ile deployment.
Application manifest:
\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ${ctx.projectName.toLowerCase()}
spec:
  destination:
    namespace: default
    server: https://kubernetes.default.svc
  source:
    path: k8s
    repoURL: <git-repo>
\`\`\`
`;
  }

  return content;
}

function generateMonitoringTemplate(ctx: TemplateContext): string {
  const obsStack = [
    ctx.selectedObs.includes('prometheus') ? '- Prometheus: Metrics collection' : '',
    ctx.selectedObs.includes('grafana') ? '- Grafana: Dashboards' : '',
    ctx.selectedObs.includes('loki') ? '- Loki: Log aggregation' : '',
    ctx.selectedObs.includes('jaeger') ? '- Jaeger: Distributed tracing' : '',
    ctx.selectedObs.includes('kibana') ? '- Kibana: Log visualization' : '',
    ctx.selectedObs.includes('graylog') ? '- Graylog: Centralized logging' : '',
  ].filter(Boolean).join('\n');

  return `# Monitoring Guide - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Stack

${obsStack}

---

## SLI/SLO

| Metric | Target |
|--------|--------|
| Availability | 99.9% |
| Latency (p99) | < 500ms |
| Error Rate | < 0.1% |

---

## Alerting

| Alert | Condition | Severity |
|-------|-----------|----------|
| HighErrorRate | error_rate > 1% | critical |
| HighLatency | p99 > 1s | warning |
| PodCrashLoop | restarts > 3 | critical |`;
}

function generateSecurityTemplate(ctx: TemplateContext): string {
  const secretsStack = [
    ctx.selectedSecrets.includes('vault') ? '- HashiCorp Vault: Production secrets' : '',
    ctx.selectedSecrets.includes('azure-keyvault') ? '- Azure Key Vault: Cloud secrets' : '',
    ctx.selectedSecrets.includes('gitlab-vars') ? '- GitLab CI Variables: CI/CD secrets' : '',
  ].filter(Boolean).join('\n');

  return `# Security Guide - ${ctx.projectName}

---

## Secret Management

${secretsStack}

---

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers set

---

## Incident Response

1. Detect - Monitoring alerts
2. Contain - Isolate affected systems
3. Investigate - Root cause analysis
4. Remediate - Fix and deploy
5. Post-mortem - Document learnings`;
}

function generateDatabaseTemplate(ctx: TemplateContext): string {
  const dbStack = [
    ctx.selectedDb.includes('postgresql') ? '- PostgreSQL: Primary database' : '',
    ctx.selectedDb.includes('mysql') ? '- MySQL: Relational data' : '',
    ctx.selectedDb.includes('mongodb') ? '- MongoDB: Document storage' : '',
    ctx.selectedDb.includes('redis') ? '- Redis: Caching & sessions' : '',
  ].filter(Boolean).join('\n');

  return `# Database Guide - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Database Stack

${dbStack}

---

## Migration Rules

- Her migration geri alinabilir olmali
- Production'da manual migration YASAK
- Migration test ortaminda test edilmeli

---

## Backup Strategy

| Database | Frequency | Retention |
|----------|-----------|-----------|
| PostgreSQL | Daily | 30 days |
| MongoDB | Daily | 30 days |
| Redis | Hourly | 24 hours |`;
}

function generateDeploymentTemplate(ctx: TemplateContext): string {
  const deployStrategy = [
    ctx.selectedContainer.includes('kubernetes') ? '- Kubernetes rolling update' : '',
    ctx.selectedCloud.includes('azure') ? '- Azure AKS deployment' : '',
    ctx.selectedCloud.includes('aws') ? '- AWS EKS deployment' : '',
  ].filter(Boolean).join('\n');

  return `# Deployment Guide - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Environments

| Env | URL | Purpose |
|-----|-----|---------|
| dev | dev.example.com | Development |
| staging | staging.example.com | Pre-prod |
| prod | example.com | Production |

---

## Deployment Strategy

${deployStrategy}

---

## Rollback

\`\`\`bash
# Kubernetes rollback
kubectl rollout undo deployment/app

# ArgoCD rollback
argocd app history <app-name>
argocd app rollback <app-name> <revision>
\`\`\``;
}

function generateApiDocsTemplate(ctx: TemplateContext): string {
  return `# API Documentation - ${ctx.projectName}

---

## Base URL

\`\`\`
Production: https://api.example.com
Staging: https://api.staging.example.com
\`\`\`

---

## Authentication

Bearer token required:
\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## Endpoints

### GET /health
Health check endpoint.

Response:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

### GET /api/v1/users
List all users.

### GET /api/v1/users/:id
Get user by ID.

### POST /api/v1/users
Create new user.`;
}

function generateTestStrategyTemplate(ctx: TemplateContext): string {
  return `# Test Strategy - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Test Pyramid

\`\`\`
        /\\
       /  \\      E2E (az)
      /────\\
     /      \\    Integration (orta)
    /────────\\
   /          \\  Unit (cok)
  /────────────\\
\`\`\`

---

## Coverage Targets

| Type | Target |
|------|--------|
| Unit | > 80% |
| Integration | > 60% |
| E2E | Critical paths |

---

## Test Commands

\`\`\`bash
npm run test           # All tests
npm run test:unit      # Unit tests
npm run test:int       # Integration tests
npm run test:e2e       # E2E tests
npm run test:coverage  # With coverage
\`\`\``;
}

function generateResilienceTemplate(ctx: TemplateContext): string {
  return `# Resilience Patterns - ${ctx.projectName}

---

## Patterns

### Circuit Breaker
Hata durumunda servisi koru.

### Retry with Backoff
Gecici hatalarda tekrar dene.

### Timeout
Uzun sureli istekleri kes.

### Bulkhead
Servisleri izole et.

---

## Health Checks

\`\`\`
GET /health
GET /health/live
GET /health/ready
\`\`\`

---

## Chaos Engineering

Test scenarios:
- Pod failure
- Network latency
- Resource exhaustion`;
}

function generateFeatureFlagsTemplate(ctx: TemplateContext): string {
  return `# Feature Flags - ${ctx.projectName}

---

## Overview

Feature flags ile yeni ozellikleri kontrol et.

---

## Active Flags

| Flag | Description | Status |
|------|-------------|--------|
| new_dashboard | New dashboard UI | 50% rollout |
| dark_mode | Dark theme | enabled |

---

## Usage

\`\`\`typescript
if (featureFlags.isEnabled('new_dashboard')) {
  // new feature code
}
\`\`\``;
}

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

  // Tier 3 templates
  if (selectedTiers.includes(3)) {
    if (isIncluded('CICD.md')) files.push({ name: 'CICD.md', content: generateCicdTemplate(ctx) });
    if (isIncluded('MONITORING.md')) files.push({ name: 'MONITORING.md', content: generateMonitoringTemplate(ctx) });
    if (isIncluded('SECURITY.md')) files.push({ name: 'SECURITY.md', content: generateSecurityTemplate(ctx) });
  }

  // Tier 4 templates
  if (selectedTiers.includes(4)) {
    if (isIncluded('DATABASE.md')) files.push({ name: 'DATABASE.md', content: generateDatabaseTemplate(ctx) });
    if (isIncluded('DEPLOYMENT.md')) files.push({ name: 'DEPLOYMENT.md', content: generateDeploymentTemplate(ctx) });
    if (isIncluded('API_DOCS.md')) files.push({ name: 'API_DOCS.md', content: generateApiDocsTemplate(ctx) });
  }

  // Tier 5 templates
  if (selectedTiers.includes(5)) {
    if (isIncluded('TEST_STRATEGY.md')) files.push({ name: 'TEST_STRATEGY.md', content: generateTestStrategyTemplate(ctx) });
    if (isIncluded('RESILIENCE.md')) files.push({ name: 'RESILIENCE.md', content: generateResilienceTemplate(ctx) });
    if (isIncluded('FEATURE_FLAGS.md')) files.push({ name: 'FEATURE_FLAGS.md', content: generateFeatureFlagsTemplate(ctx) });
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
| Tip | Teknoloji |
|-----|-----------|
${ctx.selectedDb.includes('postgresql') || ctx.selectedDb.includes('mysql') || ctx.selectedDb.includes('mssql') ? `| SQL | ${[ctx.selectedDb.includes('postgresql') ? 'PostgreSQL' : '', ctx.selectedDb.includes('mysql') ? 'MySQL' : '', ctx.selectedDb.includes('mssql') ? 'MSSQL' : ''].filter(Boolean).join(', ')} |` : ''}
${ctx.selectedDb.includes('mongodb') || ctx.selectedDb.includes('redis') ? `| NoSQL | ${[ctx.selectedDb.includes('mongodb') ? 'MongoDB' : '', ctx.selectedDb.includes('redis') ? 'Redis' : ''].filter(Boolean).join(', ')} |` : ''}
${ctx.selectedSearch.length > 0 ? `| Search | ${ctx.getTechNames('search', ctx.selectedSearch)} |` : ''}

### Infrastructure

| Kategori | Teknoloji |
|----------|-----------|
${ctx.selectedCloud.length > 0 ? `| Cloud | ${ctx.getTechNames('cloud', ctx.selectedCloud)} |` : ''}
${ctx.selectedContainer.length > 0 ? `| Container | ${ctx.getTechNames('container', ctx.selectedContainer)} |` : ''}
${ctx.selectedCicd.length > 0 ? `| CI/CD | ${ctx.getTechNames('cicd', ctx.selectedCicd)} |` : ''}
${ctx.selectedMq.length > 0 ? `| Message Queue | ${ctx.getTechNames('messagequeue', ctx.selectedMq)} |` : ''}
${ctx.selectedObs.length > 0 ? `| Observability | ${ctx.getTechNames('observability', ctx.selectedObs)} |` : ''}
${ctx.selectedSecrets.length > 0 ? `| Secrets | ${ctx.getTechNames('secrets', ctx.selectedSecrets)} |` : ''}
${ctx.selectedIac.length > 0 ? `| IaC | ${ctx.getTechNames('iac', ctx.selectedIac)} |` : ''}

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

  // Add Tier 3 templates
  if (selectedTiers.includes(3)) {
    output += `---

## Template 15: CICD.md

\`\`\`markdown
${escapeForCodeBlock(generateCicdTemplate(ctx))}
\`\`\`

---

## Template 18: MONITORING.md

\`\`\`markdown
${escapeForCodeBlock(generateMonitoringTemplate(ctx))}
\`\`\`

---

## Template 17: SECURITY.md

\`\`\`markdown
${escapeForCodeBlock(generateSecurityTemplate(ctx))}
\`\`\`

`;
  }

  // Add Tier 4 templates
  if (selectedTiers.includes(4)) {
    output += `---

## Template 22: DATABASE.md

\`\`\`markdown
${escapeForCodeBlock(generateDatabaseTemplate(ctx))}
\`\`\`

---

## Template 23: DEPLOYMENT.md

\`\`\`markdown
${escapeForCodeBlock(generateDeploymentTemplate(ctx))}
\`\`\`

`;
  }

  // Add Tier 5 templates
  if (selectedTiers.includes(5)) {
    output += `---

## Template 31: TEST_STRATEGY.md

\`\`\`markdown
${escapeForCodeBlock(generateTestStrategyTemplate(ctx))}
\`\`\`

---

## Template 33: RESILIENCE.md

\`\`\`markdown
${escapeForCodeBlock(generateResilienceTemplate(ctx))}
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
