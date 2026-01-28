import type { GeneratorConfig } from '../types';
import { categories, tiers } from '../data/techStack';

export interface TemplateFile {
  name: string;
  content: string;
}

export function generateTemplateFiles(config: GeneratorConfig): TemplateFile[] {
  const { projectName, selectedTechnologies, selectedTiers, excludedTemplates = [] } = config;
  const date = new Date().toISOString().split('T')[0];

  const files: TemplateFile[] = [];

  const isIncluded = (templateName: string): boolean => !excludedTemplates.includes(templateName);

  const selectedLangs = selectedTechnologies.languages || [];
  const selectedFrontend = selectedTechnologies.frontend || [];
  const selectedBackend = selectedTechnologies.backend || [];
  const selectedDb = selectedTechnologies.database || [];
  const selectedCloud = selectedTechnologies.cloud || [];
  const selectedCicd = selectedTechnologies.cicd || [];
  const selectedObs = selectedTechnologies.observability || [];
  const selectedSecrets = selectedTechnologies.secrets || [];
  const selectedContainer = selectedTechnologies.container || [];

  const getTechNames = (categoryId: string, ids: string[]): string => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';
    return ids.map(id => category.technologies.find(t => t.id === id)?.name || id).join(', ');
  };

  // CLAUDE.md - Always included (if not excluded)
  if (isIncluded('CLAUDE.md')) files.push({
    name: 'CLAUDE.md',
    content: `# ${projectName}

> **Guncelleme:** ${date} | Vibe Coding
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
${selectedLangs.length > 0 ? getTechNames('languages', selectedLangs) : '-'}

### Frontend
${selectedFrontend.length > 0 ? getTechNames('frontend', selectedFrontend) : '-'}

### Backend
${selectedBackend.length > 0 ? getTechNames('backend', selectedBackend) : '-'}

### Database
${selectedDb.length > 0 ? getTechNames('database', selectedDb) : '-'}

### Infrastructure
- Cloud: ${selectedCloud.length > 0 ? getTechNames('cloud', selectedCloud) : '-'}
- CI/CD: ${selectedCicd.length > 0 ? getTechNames('cicd', selectedCicd) : '-'}
- Container: ${selectedContainer.length > 0 ? getTechNames('container', selectedContainer) : '-'}

---

## Proje Yapisi

\`\`\`
${projectName}/
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
- [ ] Aciklayici degisken isimleri
`
  });

  // RULESETS.md
  if (isIncluded('RULESETS.md')) files.push({
    name: 'RULESETS.md',
    content: `# Development Rules - ${projectName}

> **Gecerli:** ${date}

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
- Max 50 satir/fonksiyon
`
  });

  // VIBE_CODING.md - Always included
  if (isIncluded('VIBE_CODING.md')) files.push({
    name: 'VIBE_CODING.md',
    content: `# Vibe Coding Workflow - ${projectName}

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
3. Commit at
`
  });

  // SESSION_NOTES.md & SESSION_HANDOFF.md - Always included
  if (isIncluded('SESSION_NOTES.md')) files.push({
    name: 'SESSION_NOTES.md',
    content: `# Session Notes - ${projectName}

> **Son Guncelleme:** ${date}

---

## Aktif Session

### Tarih: ${date}

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
| ${date} | Proje baslangici | Devam |
`
  });

  if (isIncluded('SESSION_HANDOFF.md')) files.push({
    name: 'SESSION_HANDOFF.md',
    content: `# Session Handoff - ${projectName}

> **Son Guncelleme:** ${date}

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
- ...
`
  });

  if (isIncluded('CODE_REVIEW.md')) files.push({
    name: 'CODE_REVIEW.md',
    content: `# Code Review Checklist - ${projectName}

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
- [ ] Clean imports
`
  });

  // Tier 2 templates
  if (selectedTiers.includes(2)) {
    if (isIncluded('EXAMPLES.md')) files.push({
      name: 'EXAMPLES.md',
      content: `# Gercek Ornekler - ${projectName}

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
- Schema updated
`
    });

    if (isIncluded('CODEBASE_MAP.md')) files.push({
      name: 'CODEBASE_MAP.md',
      content: `# Codebase Map - ${projectName}

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
| src/api/routes.ts | Route definitions |
`
    });

    if (isIncluded('DEBUGGING.md')) files.push({
      name: 'DEBUGGING.md',
      content: `# Debugging Guide - ${projectName}

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
| DB connection | Connection string kontrol |
`
    });
  }

  // Tier 3 templates
  if (selectedTiers.includes(3)) {
    if (isIncluded('CICD.md')) files.push({
      name: 'CICD.md',
      content: `# CI/CD Pipeline - ${projectName}

> **Son Guncelleme:** ${date}

---

## Pipeline Overview

${selectedCicd.includes('gitlab-ci') ? `### GitLab CI

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
` : ''}
${selectedCicd.includes('argocd') ? `### ArgoCD

GitOps workflow ile deployment.
Application manifest:
\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ${projectName.toLowerCase()}
spec:
  destination:
    namespace: default
    server: https://kubernetes.default.svc
  source:
    path: k8s
    repoURL: <git-repo>
\`\`\`
` : ''}
`
    });

    if (isIncluded('MONITORING.md')) files.push({
      name: 'MONITORING.md',
      content: `# Monitoring Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Stack

${selectedObs.includes('prometheus') ? '- Prometheus: Metrics collection' : ''}
${selectedObs.includes('grafana') ? '- Grafana: Dashboards' : ''}
${selectedObs.includes('loki') ? '- Loki: Log aggregation' : ''}
${selectedObs.includes('jaeger') ? '- Jaeger: Distributed tracing' : ''}
${selectedObs.includes('kibana') ? '- Kibana: Log visualization' : ''}
${selectedObs.includes('graylog') ? '- Graylog: Centralized logging' : ''}

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
| PodCrashLoop | restarts > 3 | critical |
`
    });

    if (isIncluded('SECURITY.md')) files.push({
      name: 'SECURITY.md',
      content: `# Security Guide - ${projectName}

---

## Secret Management

${selectedSecrets.includes('vault') ? '- HashiCorp Vault: Production secrets' : ''}
${selectedSecrets.includes('azure-keyvault') ? '- Azure Key Vault: Cloud secrets' : ''}
${selectedSecrets.includes('gitlab-vars') ? '- GitLab CI Variables: CI/CD secrets' : ''}

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
5. Post-mortem - Document learnings
`
    });
  }

  // Tier 4 templates
  if (selectedTiers.includes(4)) {
    if (isIncluded('DATABASE.md')) files.push({
      name: 'DATABASE.md',
      content: `# Database Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Database Stack

${selectedDb.includes('postgresql') ? '- PostgreSQL: Primary database' : ''}
${selectedDb.includes('mysql') ? '- MySQL: Relational data' : ''}
${selectedDb.includes('mongodb') ? '- MongoDB: Document storage' : ''}
${selectedDb.includes('redis') ? '- Redis: Caching & sessions' : ''}

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
| Redis | Hourly | 24 hours |
`
    });

    if (isIncluded('DEPLOYMENT.md')) files.push({
      name: 'DEPLOYMENT.md',
      content: `# Deployment Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Environments

| Env | URL | Purpose |
|-----|-----|---------|
| dev | dev.example.com | Development |
| staging | staging.example.com | Pre-prod |
| prod | example.com | Production |

---

## Deployment Strategy

${selectedContainer.includes('kubernetes') ? '- Kubernetes rolling update' : ''}
${selectedCloud.includes('azure') ? '- Azure AKS deployment' : ''}
${selectedCloud.includes('aws') ? '- AWS EKS deployment' : ''}

---

## Rollback

\`\`\`bash
# Kubernetes rollback
kubectl rollout undo deployment/app

# ArgoCD rollback
argocd app history <app-name>
argocd app rollback <app-name> <revision>
\`\`\`
`
    });

    if (isIncluded('API_DOCS.md')) files.push({
      name: 'API_DOCS.md',
      content: `# API Documentation - ${projectName}

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
Create new user.
`
    });
  }

  // Tier 5 templates
  if (selectedTiers.includes(5)) {
    if (isIncluded('TEST_STRATEGY.md')) files.push({
      name: 'TEST_STRATEGY.md',
      content: `# Test Strategy - ${projectName}

> **Son Guncelleme:** ${date}

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
\`\`\`
`
    });

    if (isIncluded('RESILIENCE.md')) files.push({
      name: 'RESILIENCE.md',
      content: `# Resilience Patterns - ${projectName}

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
- Resource exhaustion
`
    });

    if (isIncluded('FEATURE_FLAGS.md')) files.push({
      name: 'FEATURE_FLAGS.md',
      content: `# Feature Flags - ${projectName}

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
\`\`\`
`
    });
  }

  return files;
}

export function generateRuleset(config: GeneratorConfig): string {
  const { projectName, selectedTechnologies, selectedTiers } = config;
  const date = new Date().toISOString().split('T')[0];

  const selectedLangs = selectedTechnologies.languages || [];
  const selectedFrontend = selectedTechnologies.frontend || [];
  const selectedBackend = selectedTechnologies.backend || [];
  const selectedDb = selectedTechnologies.database || [];
  const selectedSearch = selectedTechnologies.search || [];
  const selectedMq = selectedTechnologies.messagequeue || [];
  const selectedCloud = selectedTechnologies.cloud || [];
  const selectedCicd = selectedTechnologies.cicd || [];
  const selectedObs = selectedTechnologies.observability || [];
  const selectedSecrets = selectedTechnologies.secrets || [];
  const selectedContainer = selectedTechnologies.container || [];
  const selectedIac = selectedTechnologies.iac || [];

  const getTechNames = (categoryId: string, ids: string[]): string => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';
    return ids.map(id => category.technologies.find(t => t.id === id)?.name || id).join(', ');
  };

  let output = `# Vibe Coding Rule Set - ${projectName}

> **Surum:** v1.0 (Generated) | **Olusturulma:** ${date}
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
${selectedLangs.length > 0 ? getTechNames('languages', selectedLangs) : 'Secilmedi'}

### Frontend
${selectedFrontend.length > 0 ? getTechNames('frontend', selectedFrontend) : 'Secilmedi'}

### Backend
${selectedBackend.length > 0 ? getTechNames('backend', selectedBackend) : 'Secilmedi'}

### Veritabani
| Tip | Teknoloji |
|-----|-----------|
${selectedDb.includes('postgresql') || selectedDb.includes('mysql') || selectedDb.includes('mssql') ? `| SQL | ${[selectedDb.includes('postgresql') ? 'PostgreSQL' : '', selectedDb.includes('mysql') ? 'MySQL' : '', selectedDb.includes('mssql') ? 'MSSQL' : ''].filter(Boolean).join(', ')} |` : ''}
${selectedDb.includes('mongodb') || selectedDb.includes('redis') ? `| NoSQL | ${[selectedDb.includes('mongodb') ? 'MongoDB' : '', selectedDb.includes('redis') ? 'Redis' : ''].filter(Boolean).join(', ')} |` : ''}
${selectedSearch.length > 0 ? `| Search | ${getTechNames('search', selectedSearch)} |` : ''}

### Infrastructure

| Kategori | Teknoloji |
|----------|-----------|
${selectedCloud.length > 0 ? `| Cloud | ${getTechNames('cloud', selectedCloud)} |` : ''}
${selectedContainer.length > 0 ? `| Container | ${getTechNames('container', selectedContainer)} |` : ''}
${selectedCicd.length > 0 ? `| CI/CD | ${getTechNames('cicd', selectedCicd)} |` : ''}
${selectedMq.length > 0 ? `| Message Queue | ${getTechNames('messagequeue', selectedMq)} |` : ''}
${selectedObs.length > 0 ? `| Observability | ${getTechNames('observability', selectedObs)} |` : ''}
${selectedSecrets.length > 0 ? `| Secrets | ${getTechNames('secrets', selectedSecrets)} |` : ''}
${selectedIac.length > 0 ? `| IaC | ${getTechNames('iac', selectedIac)} |` : ''}

---

## Dosya Listesi

`;

  // Add selected tiers
  selectedTiers.sort((a, b) => a - b).forEach(tierId => {
    const tier = tiers.find(t => t.id === tierId);
    if (tier) {
      output += `### ${tier.name}

| # | Dosya | Durum |
|---|-------|-------|
${tier.templates.map((t, i) => `| ${i + 1} | \`${t}\` | [ ] |`).join('\n')}

`;
    }
  });

  // Add CLAUDE.md template
  output += `---

## Template 1: CLAUDE.md

\`\`\`markdown
# ${projectName}

> **Guncelleme:** ${date} | Vibe Coding
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
${selectedLangs.length > 0 ? getTechNames('languages', selectedLangs) : '-'}

### Frontend
${selectedFrontend.length > 0 ? getTechNames('frontend', selectedFrontend) : '-'}

### Backend
${selectedBackend.length > 0 ? getTechNames('backend', selectedBackend) : '-'}

### Database
${selectedDb.length > 0 ? getTechNames('database', selectedDb) : '-'}

### Infrastructure
- Cloud: ${selectedCloud.length > 0 ? getTechNames('cloud', selectedCloud) : '-'}
- CI/CD: ${selectedCicd.length > 0 ? getTechNames('cicd', selectedCicd) : '-'}
- Container: ${selectedContainer.length > 0 ? getTechNames('container', selectedContainer) : '-'}

---

## Proje Yapisi

\\\`\\\`\\\`
${projectName}/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── tests/
├── docs/
└── package.json
\\\`\\\`\\\`

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
- [ ] Aciklayici degisken isimleri
\`\`\`

`;

  // Add RULESETS.md template
  output += `---

## Template 2: RULESETS.md

\`\`\`markdown
# Development Rules - ${projectName}

> **Gecerli:** ${date}

---

## CRITICAL Rules (Ihlal = Reject)

### SEC-1: No Hardcoded Secrets
\\\`\\\`\\\`
YAPMA:
const apiKey = "sk-xxxxx";
const dbPassword = "password123";

YAP:
const apiKey = process.env.API_KEY;
const dbPassword = process.env.DB_PASSWORD;
\\\`\\\`\\\`

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
- Max 50 satir/fonksiyon
\`\`\`

`;

  // Add VIBE_CODING.md template
  output += `---

## Template 3: VIBE_CODING.md

\`\`\`markdown
# Vibe Coding Workflow - ${projectName}

---

## Session Baslangici

1. Context yukle:
\\\`\\\`\\\`bash
cat CLAUDE.md && cat SESSION_HANDOFF.md
\\\`\\\`\\\`

2. Onceki session'dan kalan isler
3. Bugunun hedefleri

---

## AI Iletisim Patterns

### Iyi Prompt Ornegi
\\\`\\\`\\\`
"UserService'e email validation ekle.
- Zod schema kullan
- Unique email kontrolu
- Error mesajlari Turkce"
\\\`\\\`\\\`

### Kotu Prompt Ornegi
\\\`\\\`\\\`
"email duzelt"  // Belirsiz, context yok
\\\`\\\`\\\`

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
3. Commit at
\`\`\`

`;

  // Add more templates based on selected tiers
  if (selectedTiers.includes(2)) {
    output += generateTier2Templates(projectName, date);
  }

  if (selectedTiers.includes(3)) {
    output += generateTier3Templates(projectName, date, selectedCicd, selectedObs, selectedSecrets);
  }

  if (selectedTiers.includes(4)) {
    output += generateTier4Templates(projectName, date, selectedDb, selectedCloud, selectedContainer);
  }

  if (selectedTiers.includes(5)) {
    output += generateTier5Templates(projectName, date);
  }

  // Footer
  output += `---

**Template Surumu:** v1.0 (Generated)
**Kaynak:** Vibe Coding Generator
**Olusturulma:** ${date}
**Proje:** ${projectName}
`;

  return output;
}

function generateTier2Templates(projectName: string, _date: string): string {
  return `---

## Template 7: EXAMPLES.md

\`\`\`markdown
# Gercek Ornekler - ${projectName}

---

## Senaryo 1: Yeni Endpoint Ekleme

### Prompt
"GET /api/users/:id endpoint'i ekle, user bulunamazsa 404 don"

### Beklenen Cikti
- Route tanimlanmis
- Controller metodu yazilmis
- Error handling mevcut
- Test yazilmis
\`\`\`

---

## Template 8: CODEBASE_MAP.md

\`\`\`markdown
# Codebase Map - ${projectName}

---

## Dizin Yapisi

\\\`\\\`\\\`
src/
├── api/           # API routes
├── services/      # Business logic
├── models/        # Data models
├── utils/         # Helpers
└── config/        # Configuration
\\\`\\\`\\\`

---

## Kritik Dosyalar

| Dosya | Amac |
|-------|------|
| src/index.ts | Entry point |
| src/config/index.ts | Environment config |
| src/api/routes.ts | Route definitions |
\`\`\`

`;
}

function generateTier3Templates(
  projectName: string,
  date: string,
  selectedCicd: string[],
  selectedObs: string[],
  selectedSecrets: string[]
): string {
  return `---

## Template 15: CICD.md

\`\`\`markdown
# CI/CD Pipeline - ${projectName}

> **Son Guncelleme:** ${date}

---

## Pipeline Overview

${selectedCicd.includes('gitlab-ci') ? `### GitLab CI

\\\`\\\`\\\`yaml
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
\\\`\\\`\\\`
` : ''}

${selectedCicd.includes('argocd') ? `### ArgoCD

GitOps workflow ile deployment.
` : ''}
\`\`\`

---

## Template 18: MONITORING.md

\`\`\`markdown
# Monitoring Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Stack

${selectedObs.includes('prometheus') ? '- Prometheus: Metrics collection' : ''}
${selectedObs.includes('grafana') ? '- Grafana: Dashboards' : ''}
${selectedObs.includes('loki') ? '- Loki: Log aggregation' : ''}
${selectedObs.includes('jaeger') ? '- Jaeger: Distributed tracing' : ''}

---

## SLI/SLO

| Metric | Target |
|--------|--------|
| Availability | 99.9% |
| Latency (p99) | < 500ms |
| Error Rate | < 0.1% |
\`\`\`

---

## Template 17: SECURITY.md

\`\`\`markdown
# Security Guide - ${projectName}

---

## Secret Management

${selectedSecrets.includes('vault') ? '- HashiCorp Vault: Production secrets' : ''}
${selectedSecrets.includes('azure-keyvault') ? '- Azure Key Vault: Cloud secrets' : ''}
${selectedSecrets.includes('gitlab-vars') ? '- GitLab CI Variables: CI/CD secrets' : ''}

---

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CORS configured
- [ ] Rate limiting enabled
\`\`\`

`;
}

function generateTier4Templates(
  projectName: string,
  date: string,
  selectedDb: string[],
  selectedCloud: string[],
  selectedContainer: string[]
): string {
  return `---

## Template 22: DATABASE.md

\`\`\`markdown
# Database Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Database Stack

${selectedDb.includes('postgresql') ? '- PostgreSQL: Primary database' : ''}
${selectedDb.includes('mysql') ? '- MySQL: Relational data' : ''}
${selectedDb.includes('mongodb') ? '- MongoDB: Document storage' : ''}
${selectedDb.includes('redis') ? '- Redis: Caching & sessions' : ''}

---

## Migration Rules

- Her migration geri alinabilir olmali
- Production'da manual migration YASAK
- Migration test ortaminda test edilmeli
\`\`\`

---

## Template 23: DEPLOYMENT.md

\`\`\`markdown
# Deployment Guide - ${projectName}

> **Son Guncelleme:** ${date}

---

## Environments

| Env | URL | Purpose |
|-----|-----|---------|
| dev | dev.example.com | Development |
| staging | staging.example.com | Pre-prod |
| prod | example.com | Production |

---

## Deployment Strategy

${selectedContainer.includes('kubernetes') ? '- Kubernetes rolling update' : ''}
${selectedCloud.includes('azure') ? '- Azure AKS deployment' : ''}

---

## Rollback

\\\`\\\`\\\`bash
# Kubernetes rollback
kubectl rollout undo deployment/app

# ArgoCD rollback
argocd app history <app-name>
argocd app rollback <app-name> <revision>
\\\`\\\`\\\`
\`\`\`

`;
}

function generateTier5Templates(projectName: string, date: string): string {
  return `---

## Template 31: TEST_STRATEGY.md

\`\`\`markdown
# Test Strategy - ${projectName}

> **Son Guncelleme:** ${date}

---

## Test Pyramid

\\\`\\\`\\\`
        /\\
       /  \\      E2E (az)
      /────\\
     /      \\    Integration (orta)
    /────────\\
   /          \\  Unit (cok)
  /────────────\\
\\\`\\\`\\\`

---

## Coverage Targets

| Type | Target |
|------|--------|
| Unit | > 80% |
| Integration | > 60% |
| E2E | Critical paths |
\`\`\`

---

## Template 33: RESILIENCE.md

\`\`\`markdown
# Resilience Patterns - ${projectName}

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

\\\`\\\`\\\`
GET /health
GET /health/live
GET /health/ready
\\\`\\\`\\\`
\`\`\`

`;
}
