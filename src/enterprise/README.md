# Enterprise Vibe Coding Generator

Bu klasor, enterprise-grade projeler icin template ve generator'lari icerir.

## Kapsam

Enterprise generator, vibe coding generator'in temel ozellikleri uzerine asagidaki enterprise ozellikleri ekler:

### Teknolojiler

**Diller:**
- Java, Kotlin (Spring Boot)
- C# (ASP.NET Core)
- Swift, Ruby, Rust

**Backend:**
- Spring Boot
- ASP.NET Core

**Database:**
- MSSQL

**Cloud:**
- Azure, AWS, GCP (enterprise cloud)

**CI/CD:**
- Jenkins, ArgoCD, Azure DevOps, Bamboo, SonarQube

**Container & Orchestration:**
- Kubernetes, OpenShift, Rancher, Helm, Istio

**Kategoriler:**
- Search (Elasticsearch)
- Message Queue (Kafka, RabbitMQ)
- Observability (Prometheus, Grafana, Jaeger, Loki, Kibana, Logstash, Graylog, Pyroscope)
- Secrets (Vault, Azure KeyVault)
- IaC (Terraform, Ansible)
- Load Balancer (Nginx, HAProxy)
- Virtualization (VMware, Veeam)

### Template Tier'lari

- **Tier 3:** CICD.md, MONITORING.md, SECURITY.md, TEST_CASES.md, DEVOPS_CHECKLIST.md, RELEASE.md, ENVIRONMENT.md, GLOSSARY.md
- **Tier 4:** DATABASE.md, DEPLOYMENT.md, API_DOCS.md, AI_INTEGRATION.md, INCIDENT.md, PERFORMANCE.md, FRONTEND.md, COMPLIANCE.md, IaC.md, ONBOARDING.md
- **Tier 5:** TEST_STRATEGY.md, LOCAL_DEV.md, RESILIENCE.md, DEPENDENCY_MANAGEMENT.md, FEATURE_FLAGS.md

### Preset'ler

| ID | Isim | Aciklama |
|----|------|----------|
| `full-stack` | Full-Stack Enterprise | React + Node.js + K8s + Full Observability |
| `microservices` | Microservices | Event-driven, Kafka, distributed tracing |
| `enterprise-java` | Enterprise Java | Spring Boot + Kafka + Full Stack |
| `dotnet-azure` | .NET + Azure | ASP.NET Core + MSSQL + Azure native |
| `mobile-backend` | Mobile Backend | Node.js + MongoDB + Push notifications |
| `data-platform` | Data Platform | Kafka + Elasticsearch + Python |

## Kullanim

Bu klasor, ileride bagimsiz bir proje olarak fork'lanabilir. Suanki haliyle referans ve arsiv amaclidir.

### Entegrasyon (Gelecek)

```typescript
// enterprise/index.ts
import { enterpriseCategories, enterpriseTiers } from './data/techStack';
import { enterprisePresets } from './data/presets';
import { generateEnterpriseTemplates } from './generator';

// Vibe generator'a enterprise ozellikleri ekle
export function enableEnterprise(vibeGenerator: VibeGenerator) {
  vibeGenerator.addCategories(enterpriseCategories);
  vibeGenerator.addTiers(enterpriseTiers);
  vibeGenerator.addPresets(enterprisePresets);
  vibeGenerator.addTemplateGenerator(generateEnterpriseTemplates);
}
```

## Dosya Yapisi

```
enterprise/
├── README.md           # Bu dosya
├── data/
│   ├── techStack.ts    # Enterprise kategoriler ve teknolojiler
│   ├── presets.ts      # Enterprise preset'ler (6 adet)
│   ├── relationships.ts # Enterprise tech iliskileri
│   └── techInfo.ts     # Enterprise tech bilgileri
└── generator/
    └── index.ts        # Tier 3-5 template generator'lari
```

## Notlar

- Bu klasor aktif olarak kullanilmiyor, arsiv amacli
- Vibe generator sadece Tier 1-2 template'leri iceriyor
- Enterprise ozellikleri icin bu klasoru ayri bir proje olarak fork'layin
