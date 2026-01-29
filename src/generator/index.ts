import type { GeneratorConfig } from '../types';
import { categories, tiers } from '../data/techStack';
import { aiTools } from '../data/aiTools';

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
  let content = `# Debugging Guide - ${ctx.projectName}

---

## Genel Debug

\`\`\`bash
`;

  // Framework-specific debug commands
  if (ctx.selectedFrontend.includes('nextjs') || ctx.selectedFrontend.includes('react')) {
    content += `# Logs
npm run dev 2>&1 | tee debug.log

# Debug mode
NODE_OPTIONS='--inspect' npm run dev
`;
  } else if (ctx.selectedBackend.includes('django')) {
    content += `# Debug mode
python manage.py runserver --verbosity 2

# Django shell
python manage.py shell
`;
  } else if (ctx.selectedBackend.includes('fastapi')) {
    content += `# Debug mode with reload
uvicorn main:app --reload --log-level debug

# Python debugger
python -m pdb main.py
`;
  } else if (ctx.selectedBackend.includes('gin')) {
    content += `# Debug mode
GIN_MODE=debug go run main.go

# Delve debugger
dlv debug main.go
`;
  } else {
    content += `# Logs
npm run logs

# Debug mode
DEBUG=* npm run dev
`;
  }

  content += `\`\`\`

---

## Bilinen Sorunlar

| Sorun | Cozum |
|-------|-------|
| Port kullanımda | PORT env degistir |
| DB connection | Connection string kontrol |
`;

  // Add database-specific debugging
  if (ctx.selectedDb.includes('postgresql')) {
    content += `| PostgreSQL baglanti | \`psql -h localhost -U user -d db\` ile test |
`;
  }
  if (ctx.selectedDb.includes('redis')) {
    content += `| Redis baglanti | \`redis-cli ping\` ile test |
`;
  }
  if (ctx.selectedContainer.includes('docker')) {
    content += `| Container calismıyor | \`docker logs <container>\` kontrol |
`;
  }

  return content;
}

function generateContributingTemplate(ctx: TemplateContext): string {
  let content = `# Contributing Guide - ${ctx.projectName}

---

## Baslamadan Once

1. Repo'yu fork et
2. Local'e clone et
3. Branch olustur: \`git checkout -b feature/isim\`

---

## Development Ortami

`;

  // Framework-specific setup
  if (ctx.selectedLangs.includes('js-ts')) {
    content += `### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum
\`\`\`bash
npm install
npm run dev
\`\`\`
`;
  } else if (ctx.selectedLangs.includes('python')) {
    content += `### Gereksinimler
- Python 3.10+
- pip veya poetry

### Kurulum
\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`
`;
  } else if (ctx.selectedLangs.includes('go')) {
    content += `### Gereksinimler
- Go 1.21+

### Kurulum
\`\`\`bash
go mod download
go run main.go
\`\`\`
`;
  } else if (ctx.selectedLangs.includes('php')) {
    content += `### Gereksinimler
- PHP 8.1+
- Composer

### Kurulum
\`\`\`bash
composer install
php artisan serve
\`\`\`
`;
  }

  content += `
---

## Commit Kurallari

### Format
\`\`\`
<type>(<scope>): <description>

[optional body]
\`\`\`

### Type'lar
- \`feat\`: Yeni ozellik
- \`fix\`: Bug fix
- \`docs\`: Dokumantasyon
- \`style\`: Formatting
- \`refactor\`: Kod refactor
- \`test\`: Test ekleme
- \`chore\`: Build, config

### Ornekler
\`\`\`
feat(auth): add JWT authentication
fix(api): resolve null pointer in user service
docs(readme): update installation guide
\`\`\`

---

## Pull Request Sureci

1. [ ] Testler geciyor
2. [ ] Lint hatasiz
3. [ ] PR description dolu
4. [ ] Review istendi

---

## Code Style

`;

  if (ctx.selectedLangs.includes('js-ts')) {
    content += `- ESLint + Prettier kullan
- TypeScript strict mode
- camelCase degiskenler
- PascalCase componentler
`;
  } else if (ctx.selectedLangs.includes('python')) {
    content += `- Black formatter kullan
- Type hints zorunlu
- snake_case degiskenler
- PEP 8 uyumlu
`;
  } else if (ctx.selectedLangs.includes('go')) {
    content += `- gofmt kullan
- golint uyumlu
- camelCase (exported PascalCase)
- Effective Go kurallari
`;
  }

  content += `
---

## Sorular?

Issue ac veya maintainer'lara ulas.`;

  return content;
}

function generateSetupGuideTemplate(ctx: TemplateContext): string {
  let content = `# Setup Guide - ${ctx.projectName}

---

## Gereksinimler

`;

  // Language requirements
  if (ctx.selectedLangs.includes('js-ts')) {
    content += `- [ ] Node.js 18+ (\`node -v\`)
- [ ] npm 9+ (\`npm -v\`)
`;
  }
  if (ctx.selectedLangs.includes('python')) {
    content += `- [ ] Python 3.10+ (\`python --version\`)
- [ ] pip (\`pip --version\`)
`;
  }
  if (ctx.selectedLangs.includes('go')) {
    content += `- [ ] Go 1.21+ (\`go version\`)
`;
  }
  if (ctx.selectedLangs.includes('php')) {
    content += `- [ ] PHP 8.1+ (\`php -v\`)
- [ ] Composer (\`composer -V\`)
`;
  }

  // Database requirements
  if (ctx.selectedDb.includes('postgresql')) {
    content += `- [ ] PostgreSQL 14+ (\`psql --version\`)
`;
  }
  if (ctx.selectedDb.includes('mysql')) {
    content += `- [ ] MySQL 8+ (\`mysql --version\`)
`;
  }
  if (ctx.selectedDb.includes('mongodb')) {
    content += `- [ ] MongoDB 6+ (\`mongod --version\`)
`;
  }
  if (ctx.selectedDb.includes('redis')) {
    content += `- [ ] Redis 7+ (\`redis-server --version\`)
`;
  }

  // Container requirements
  if (ctx.selectedContainer.includes('docker')) {
    content += `- [ ] Docker (\`docker --version\`)
`;
  }
  if (ctx.selectedContainer.includes('docker-compose')) {
    content += `- [ ] Docker Compose (\`docker compose version\`)
`;
  }

  content += `
---

## 1. Repo Clone

\`\`\`bash
git clone <repo-url>
cd ${ctx.projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

---

## 2. Environment Variables

\`\`\`bash
cp .env.example .env
\`\`\`

### Gerekli Degiskenler

| Degisken | Aciklama | Ornek |
|----------|----------|-------|
`;

  if (ctx.selectedDb.includes('postgresql') || ctx.selectedDb.includes('mysql')) {
    content += `| DATABASE_URL | DB connection string | postgresql://user:pass@localhost:5432/db |
`;
  }
  if (ctx.selectedDb.includes('redis')) {
    content += `| REDIS_URL | Redis connection | redis://localhost:6379 |
`;
  }
  if (ctx.selectedDb.includes('supabase')) {
    content += `| SUPABASE_URL | Supabase project URL | https://xxx.supabase.co |
| SUPABASE_KEY | Supabase anon key | eyJxxx... |
`;
  }

  content += `| NODE_ENV | Environment | development |

---

## 3. Bagimliliklari Yukle

`;

  if (ctx.selectedLangs.includes('js-ts')) {
    content += `\`\`\`bash
npm install
\`\`\`
`;
  }
  if (ctx.selectedLangs.includes('python')) {
    content += `\`\`\`bash
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
\`\`\`
`;
  }
  if (ctx.selectedLangs.includes('go')) {
    content += `\`\`\`bash
go mod download
\`\`\`
`;
  }
  if (ctx.selectedLangs.includes('php')) {
    content += `\`\`\`bash
composer install
\`\`\`
`;
  }

  content += `
---

## 4. Database Setup

`;

  if (ctx.selectedDb.includes('prisma')) {
    content += `\`\`\`bash
npx prisma generate
npx prisma db push  # veya npx prisma migrate dev
\`\`\`
`;
  } else if (ctx.selectedBackend.includes('django')) {
    content += `\`\`\`bash
python manage.py migrate
python manage.py createsuperuser
\`\`\`
`;
  } else if (ctx.selectedBackend.includes('laravel')) {
    content += `\`\`\`bash
php artisan migrate
php artisan db:seed
\`\`\`
`;
  } else if (ctx.selectedDb.length > 0) {
    content += `Veritabani migration komutlarini calistir.
`;
  }

  content += `
---

## 5. Calistir

`;

  if (ctx.selectedContainer.includes('docker-compose')) {
    content += `### Docker ile
\`\`\`bash
docker compose up -d
\`\`\`

### Manuel
`;
  }

  if (ctx.selectedFrontend.includes('nextjs') || ctx.selectedFrontend.includes('react') || ctx.selectedFrontend.includes('vue') || ctx.selectedFrontend.includes('nuxt')) {
    content += `\`\`\`bash
npm run dev
\`\`\`
Tarayicida: http://localhost:3000
`;
  } else if (ctx.selectedBackend.includes('django')) {
    content += `\`\`\`bash
python manage.py runserver
\`\`\`
Tarayicida: http://localhost:8000
`;
  } else if (ctx.selectedBackend.includes('fastapi')) {
    content += `\`\`\`bash
uvicorn main:app --reload
\`\`\`
API Docs: http://localhost:8000/docs
`;
  } else if (ctx.selectedBackend.includes('gin')) {
    content += `\`\`\`bash
go run main.go
\`\`\`
Tarayicida: http://localhost:8080
`;
  } else if (ctx.selectedBackend.includes('laravel')) {
    content += `\`\`\`bash
php artisan serve
\`\`\`
Tarayicida: http://localhost:8000
`;
  } else {
    content += `\`\`\`bash
npm run dev
\`\`\`
`;
  }

  content += `
---

## Sorun Giderme

| Sorun | Cozum |
|-------|-------|
| Port mesgul | \`lsof -i :<port>\` ile kontrol |
| Permission hatasi | \`chmod +x\` veya sudo |
| Modul bulunamadi | Bagimliliklari tekrar yukle |`;

  return content;
}

function generateADRTemplate(ctx: TemplateContext): string {
  let content = `# Architecture Decision Records - ${ctx.projectName}

---

## ADR Nedir?

Architecture Decision Record (ADR), projedeki onemli teknik kararlarin belgelendigi yapilandirilmis dokumantasyondur.

---

## ADR Template

\`\`\`markdown
# ADR-XXX: Karar Basligi

## Durum
[Proposed | Accepted | Deprecated | Superseded]

## Context
Kararin alinmasina neden olan durum ve kosullar.

## Decision
Alinan karar ve secilen yaklasim.

## Consequences
### Olumlu
- ...

### Olumsuz
- ...

## Alternatives Considered
1. Alternatif 1 - Neden secilmedi
2. Alternatif 2 - Neden secilmedi
\`\`\`

---

## Karar Gecmisi

### ADR-001: Tech Stack Secimi

**Durum:** Accepted
**Tarih:** ${ctx.date}

#### Context
${ctx.projectName} projesi icin teknoloji stack'i belirlenmesi gerekiyordu.

#### Decision
`;

  // Add selected tech stack as the decision
  if (ctx.selectedFrontend.length > 0) {
    content += `- **Frontend:** ${ctx.getTechNames('frontend', ctx.selectedFrontend)}
`;
  }
  if (ctx.selectedBackend.length > 0) {
    content += `- **Backend:** ${ctx.getTechNames('backend', ctx.selectedBackend)}
`;
  }
  if (ctx.selectedDb.length > 0) {
    content += `- **Database:** ${ctx.getTechNames('database', ctx.selectedDb)}
`;
  }
  if (ctx.selectedCloud.length > 0) {
    content += `- **Cloud:** ${ctx.getTechNames('cloud', ctx.selectedCloud)}
`;
  }

  content += `
#### Consequences
##### Olumlu
`;

  // Framework-specific benefits
  if (ctx.selectedFrontend.includes('nextjs')) {
    content += `- SSR/SSG destegiyle SEO avantaji
- Vercel ile kolay deployment
`;
  }
  if (ctx.selectedFrontend.includes('react')) {
    content += `- Genis ekosistem ve topluluk
- Component-based architecture
`;
  }
  if (ctx.selectedBackend.includes('fastapi')) {
    content += `- Yuksek performans (async)
- Otomatik API dokumentasyonu
`;
  }
  if (ctx.selectedBackend.includes('nestjs')) {
    content += `- Enterprise-grade architecture
- TypeScript-first
`;
  }
  if (ctx.selectedDb.includes('postgresql')) {
    content += `- ACID uyumluluk
- JSON destegiyle esneklik
`;
  }

  content += `
##### Olumsuz
- Ogrenme egrisi (yeni takim uyeleri icin)
- Belirli teknolojilere bagimlilik

---

### ADR-002: [Sonraki Karar]

**Durum:** Proposed
**Tarih:** -

_Yeni kararlar icin bu template'i kullanin._`;

  return content;
}

// ============ AI TOOL GENERATOR FUNCTIONS ============

// Generic main template generator - works for any AI tool
function generateMainTemplate(ctx: TemplateContext, toolName: string): string {
  let content = `# ${ctx.projectName}

> **Guncelleme:** ${ctx.date} | ${toolName} Rules
> **Durum:** Development

---

## Hizli Referans

| Komut | Aciklama |
|-------|----------|
`;

  // Add framework-specific commands (same as Claude)
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
`;
  } else if (ctx.selectedBackend.includes('fastapi')) {
    content += `| \`uvicorn main:app --reload\` | Development server |
| \`pytest\` | Run tests |
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

  if (ctx.selectedLangs.includes('js-ts')) {
    content += `- [ ] TypeScript strict mode ACIK
`;
  } else if (ctx.selectedLangs.includes('python')) {
    content += `- [ ] Type hints kullan (mypy uyumlu)
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

// Tool name mappings for template generation
const toolDisplayNames: Record<string, string> = {
  cursor: 'Cursor',
  windsurf: 'Windsurf',
  copilot: 'GitHub Copilot',
  cline: 'Cline',
  aider: 'Aider',
};

export interface AIToolFile {
  fileName: string;
  folder: string;
  content: string;
}

export function generateAIToolFiles(config: GeneratorConfig): AIToolFile[] {
  const ctx = createTemplateContext(config);
  const selectedTools = config.selectedAITools || ['claude'];
  const selectedTiers = config.selectedTiers || [1];
  const files: AIToolFile[] = [];

  for (const toolId of selectedTools) {
    const tool = aiTools.find((t) => t.id === toolId);
    if (!tool || !tool.folder) continue;

    // Claude files are handled by generateTemplateFiles
    if (toolId === 'claude') continue;

    const toolName = toolDisplayNames[toolId] || tool.name;
    const folder = tool.folder;

    // Generate main template (like CLAUDE.md but for each tool)
    files.push({
      fileName: tool.fileName,
      folder,
      content: generateMainTemplate(ctx, toolName),
    });

    // Generate RULESETS.md
    files.push({
      fileName: 'RULESETS.md',
      folder,
      content: generateRulesetsTemplate(ctx),
    });

    // Generate VIBE_CODING.md
    files.push({
      fileName: 'VIBE_CODING.md',
      folder,
      content: generateVibeCodingTemplate(ctx),
    });

    // Generate SESSION_NOTES.md
    files.push({
      fileName: 'SESSION_NOTES.md',
      folder,
      content: generateSessionNotesTemplate(ctx),
    });

    // Generate SESSION_HANDOFF.md
    files.push({
      fileName: 'SESSION_HANDOFF.md',
      folder,
      content: generateSessionHandoffTemplate(ctx),
    });

    // Generate CODE_REVIEW.md
    files.push({
      fileName: 'CODE_REVIEW.md',
      folder,
      content: generateCodeReviewTemplate(ctx),
    });

    // Tier 2 templates
    if (selectedTiers.includes(2)) {
      files.push({
        fileName: 'EXAMPLES.md',
        folder,
        content: generateExamplesTemplate(ctx),
      });

      files.push({
        fileName: 'CODEBASE_MAP.md',
        folder,
        content: generateCodebaseMapTemplate(ctx),
      });

      files.push({
        fileName: 'DEBUGGING.md',
        folder,
        content: generateDebuggingTemplate(ctx),
      });

      files.push({
        fileName: 'CONTRIBUTING.md',
        folder,
        content: generateContributingTemplate(ctx),
      });

      files.push({
        fileName: 'SETUP_GUIDE.md',
        folder,
        content: generateSetupGuideTemplate(ctx),
      });

      files.push({
        fileName: 'ADR.md',
        folder,
        content: generateADRTemplate(ctx),
      });
    }
  }

  return files;
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
    if (isIncluded('CONTRIBUTING.md')) files.push({ name: 'CONTRIBUTING.md', content: generateContributingTemplate(ctx) });
    if (isIncluded('SETUP_GUIDE.md')) files.push({ name: 'SETUP_GUIDE.md', content: generateSetupGuideTemplate(ctx) });
    if (isIncluded('ADR.md')) files.push({ name: 'ADR.md', content: generateADRTemplate(ctx) });
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

---

## Template 9: DEBUGGING.md

\`\`\`markdown
${escapeForCodeBlock(generateDebuggingTemplate(ctx))}
\`\`\`

---

## Template 10: CONTRIBUTING.md

\`\`\`markdown
${escapeForCodeBlock(generateContributingTemplate(ctx))}
\`\`\`

---

## Template 11: SETUP_GUIDE.md

\`\`\`markdown
${escapeForCodeBlock(generateSetupGuideTemplate(ctx))}
\`\`\`

---

## Template 12: ADR.md

\`\`\`markdown
${escapeForCodeBlock(generateADRTemplate(ctx))}
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
