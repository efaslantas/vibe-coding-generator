# Vibe Coding Generator

> AI destekli geliştirme için özelleştirilmiş ruleset oluşturucu

> [!WARNING]
> **BETA / ÖNİZLEME** - Bu proje aktif geliştirme aşamasındadır. Özellikler önceden haber verilmeksizin değişebilir. Geri bildirim ve katkılarınız bekliyoruz!

![Vibe Coding Generator](https://img.shields.io/badge/version-2.0.0--beta-orange.svg)
![Status](https://img.shields.io/badge/status-beta-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

Türkçe | [English](README.md)

Vibe Coding Generator, Claude, Cursor, Windsurf, GitHub Copilot, Cline ve Aider gibi AI kodlama asistanlarıyla çalışırken projeleriniz için kapsamlı ruleset ve template'ler oluşturmanıza yardımcı olur.

## Ekran Görüntüsü

<img width="882" alt="Vibe Coding Generator Screenshot" src="https://github.com/user-attachments/assets/08c05abe-c5ff-450f-9ade-b725f11f611f" />

## Özellikler

- **6 AI Araç Desteği**: Claude, Cursor, Windsurf, GitHub Copilot, Cline, Aider
- **5 Adımlı Wizard**: Kolay adım adım yapılandırma
- **Hazır Preset'ler**: Next.js Starter, React + Supabase, Django API, T3 Stack ve daha fazlası
- **Akıllı Bağımlılıklar**: Teknoloji seçimlerine göre otomatik bağımlılık yönetimi
- **Template Tier'ları**: Tier 1 (Zorunlu) ve Tier 2 (Önerilen) template setleri
- **Araç Bazlı Klasörler**: Her AI aracı kendi klasörünü alır (`.claude/`, `.cursor/`, `.windsurf/`, vb.)
- **Export**: Tüm template'ler araç bazında organize edilmiş ZIP indirme
- **Paylaşılabilir URL'ler**: Yapılandırmanızı başkalarıyla paylaşın
- **TR/EN Desteği**: Tam Türkçe ve İngilizce dil desteği

## Hızlı Başlangıç

### Docker ile (Önerilen)

```bash
# Repository'yi klonlayın
git clone https://github.com/efaslantas/vibe-coding-generator.git
cd vibe-coding-generator

# Production server'ı başlatın (port 9091)
docker compose up -d

# Tarayıcıda açın
open http://localhost:9091
```

### npm ile

```bash
# Repository'yi klonlayın
git clone https://github.com/efaslantas/vibe-coding-generator.git
cd vibe-coding-generator

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

## Desteklenen AI Araçları

| Araç | Klasör | Ana Dosya |
|------|--------|-----------|
| Claude Code | `.claude/` | `CLAUDE.md` |
| Cursor | `.cursor/` | `CURSOR.md` |
| Windsurf | `.windsurf/` | `WINDSURF.md` |
| GitHub Copilot | `.github/` | `COPILOT.md` |
| Cline/Roo | `.cline/` | `CLINE.md` |
| Aider | `.aider/` | `AIDER.md` |

## Template Tier'ları

| Tier | Açıklama | Template'ler |
|------|----------|--------------|
| **Tier 1: Zorunlu** | Her projede olması gereken temel dosyalar | MAIN.md, RULESETS.md, VIBE_CODING.md, SESSION_NOTES.md, SESSION_HANDOFF.md, CODE_REVIEW.md |
| **Tier 2: Önerilen** | Orta-büyük projeler için | EXAMPLES.md, CODEBASE_MAP.md, DEBUGGING.md, CONTRIBUTING.md, SETUP_GUIDE.md, ADR.md |

## Desteklenen Teknolojiler

### Diller
JavaScript/TypeScript, Python, Go, PHP

### Frontend
React, Next.js, Vue, Nuxt, Angular, Svelte, Remix, Astro

### Backend
Node.js (Express/Fastify), NestJS, Django, FastAPI, Flask, Gin (Go), Laravel

### Veritabanı
PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase, Prisma (ORM), Drizzle (ORM), SQLite

### Cloud & Hosting
Vercel, Netlify, Cloudflare, Railway, Fly.io

### CI/CD
GitHub Actions, GitLab CI

### Container
Docker, Docker Compose

## Kullanım

1. **Proje Ayarları**: Proje adını girin ve bir preset seçin
2. **Tech Stack**: Kullanacağınız teknolojileri seçin
3. **Template'ler**: AI araçlarını ve template tier'larını seçin
4. **Önizleme**: Oluşturulan ruleset'i inceleyin
5. **Export**: ZIP indirin veya panoya kopyalayın

## Katkıda Bulunma

Katkılarınızı bekliyoruz!

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

**Vibe Coding Nedir?**

```
Vibe Coding = AI Assistant + Human Developer + Iterative Feedback Loop
```

AI ile birlikte kod yazarken, doğru context ve kurallar sağlamak çok önemlidir. Bu generator, projeleriniz için tutarlı ve kapsamlı bir ruleset oluşturmanıza yardımcı olur.
