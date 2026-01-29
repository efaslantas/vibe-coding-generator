// Enterprise template generators (Tier 3-5)
// These are separated from the main vibe generator for future fork capability

import type { GeneratorConfig } from '../../types';

export interface TemplateFile {
  name: string;
  content: string;
}

// Enterprise template context type
interface EnterpriseTemplateContext {
  projectName: string;
  date: string;
  selectedCicd: string[];
  selectedObs: string[];
  selectedSecrets: string[];
  selectedContainer: string[];
  selectedCloud: string[];
  selectedDb: string[];
  selectedIac: string[];
}

// Helper to create template context from config
function createEnterpriseContext(config: GeneratorConfig): EnterpriseTemplateContext {
  const { projectName, selectedTechnologies } = config;
  const date = new Date().toISOString().split('T')[0];

  return {
    projectName,
    date,
    selectedCicd: selectedTechnologies.cicd || [],
    selectedObs: selectedTechnologies.observability || [],
    selectedSecrets: selectedTechnologies.secrets || [],
    selectedContainer: selectedTechnologies.container || [],
    selectedCloud: selectedTechnologies.cloud || [],
    selectedDb: selectedTechnologies.database || [],
    selectedIac: selectedTechnologies.iac || [],
  };
}

// ============ TIER 3 TEMPLATES ============

function generateCicdTemplate(ctx: EnterpriseTemplateContext): string {
  let content = `# CI/CD Pipeline - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Pipeline Overview

`;

  if (ctx.selectedCicd.includes('github-actions')) {
    content += `### GitHub Actions

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
\`\`\`
`;
  }

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

  if (ctx.selectedCicd.includes('jenkins')) {
    content += `### Jenkins

\`\`\`groovy
// Jenkinsfile
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm run test'
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
}
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

function generateMonitoringTemplate(ctx: EnterpriseTemplateContext): string {
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

function generateSecurityTemplate(ctx: EnterpriseTemplateContext): string {
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

// ============ TIER 4 TEMPLATES ============

function generateDatabaseTemplate(ctx: EnterpriseTemplateContext): string {
  let content = `# Database Guide - ${ctx.projectName}

> **Son Guncelleme:** ${ctx.date}

---

## Database Stack

`;

  if (ctx.selectedDb.includes('postgresql')) {
    content += `### PostgreSQL
Primary relational database.

\`\`\`bash
# Connection
psql -h localhost -U postgres -d ${ctx.projectName.toLowerCase()}

# Backup
pg_dump -h localhost -U postgres ${ctx.projectName.toLowerCase()} > backup.sql
\`\`\`

`;
  }

  if (ctx.selectedDb.includes('mysql')) {
    content += `### MySQL
Relational database.

\`\`\`bash
# Connection
mysql -h localhost -u root -p ${ctx.projectName.toLowerCase()}

# Backup
mysqldump -u root -p ${ctx.projectName.toLowerCase()} > backup.sql
\`\`\`

`;
  }

  if (ctx.selectedDb.includes('mssql')) {
    content += `### MSSQL
Microsoft SQL Server.

\`\`\`bash
# Connection (sqlcmd)
sqlcmd -S localhost -U sa -P <password> -d ${ctx.projectName}

# Backup
BACKUP DATABASE ${ctx.projectName} TO DISK = 'backup.bak'
\`\`\`

`;
  }

  if (ctx.selectedDb.includes('mongodb')) {
    content += `### MongoDB
Document database.

\`\`\`bash
# Connection
mongosh mongodb://localhost:27017/${ctx.projectName.toLowerCase()}

# Backup
mongodump --db ${ctx.projectName.toLowerCase()} --out backup/
\`\`\`

`;
  }

  if (ctx.selectedDb.includes('redis')) {
    content += `### Redis
In-memory cache & session store.

\`\`\`bash
# Connection
redis-cli

# Backup
redis-cli BGSAVE
\`\`\`

`;
  }

  content += `---

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
| MSSQL | Daily | 30 days |`;

  return content;
}

function generateDeploymentTemplate(ctx: EnterpriseTemplateContext): string {
  let content = `# Deployment Guide - ${ctx.projectName}

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

`;

  if (ctx.selectedCloud.includes('azure')) {
    content += `### Azure AKS

\`\`\`bash
# AKS credentials
az aks get-credentials --resource-group <rg> --name <cluster>

# Deploy
kubectl apply -f k8s/
\`\`\`

`;
  }

  if (ctx.selectedCloud.includes('aws')) {
    content += `### AWS EKS

\`\`\`bash
# EKS credentials
aws eks update-kubeconfig --name <cluster>

# Deploy
kubectl apply -f k8s/
\`\`\`

`;
  }

  if (ctx.selectedCloud.includes('gcp')) {
    content += `### Google Cloud Run

\`\`\`bash
# Build and push
gcloud builds submit --tag gcr.io/<project>/${ctx.projectName.toLowerCase()}

# Deploy
gcloud run deploy ${ctx.projectName.toLowerCase()} \\
  --image gcr.io/<project>/${ctx.projectName.toLowerCase()} \\
  --region europe-west1 \\
  --allow-unauthenticated
\`\`\`

`;
  }

  if (ctx.selectedContainer.includes('kubernetes')) {
    content += `---

## Rollback

\`\`\`bash
# Kubernetes rollback
kubectl rollout undo deployment/app

# ArgoCD rollback
argocd app history <app-name>
argocd app rollback <app-name> <revision>
\`\`\``;
  }

  return content;
}

function generateApiDocsTemplate(ctx: EnterpriseTemplateContext): string {
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

// ============ TIER 5 TEMPLATES ============

function generateTestStrategyTemplate(ctx: EnterpriseTemplateContext): string {
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

function generateResilienceTemplate(ctx: EnterpriseTemplateContext): string {
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

function generateFeatureFlagsTemplate(ctx: EnterpriseTemplateContext): string {
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

// ============ MAIN GENERATOR ============

export function generateEnterpriseTemplateFiles(config: GeneratorConfig): TemplateFile[] {
  const { selectedTiers, excludedTemplates = [] } = config;
  const ctx = createEnterpriseContext(config);
  const files: TemplateFile[] = [];

  const isIncluded = (templateName: string): boolean => !excludedTemplates.includes(templateName);

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

// Export individual generators for potential reuse
export {
  generateCicdTemplate,
  generateMonitoringTemplate,
  generateSecurityTemplate,
  generateDatabaseTemplate,
  generateDeploymentTemplate,
  generateApiDocsTemplate,
  generateTestStrategyTemplate,
  generateResilienceTemplate,
  generateFeatureFlagsTemplate,
};
