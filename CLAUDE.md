# Vibe Coding Generator - Development Rules

> **Son Guncelleme:** 2026-01-29
> **Proje:** Vibe Coding Generator v2.0

---

## CRITICAL RULES (Ihlal = Reject)

### DEV-1: Docker-First Development
```
YASAK:
npm run dev
npm run build
npm install
npm run lint

DOGRU:
docker compose up -d
docker compose exec app npm run build
docker compose exec app npm run lint
docker compose logs -f app
```

**Neden:** Host makinedeki npm komutlari diger projeleri etkiliyor, port cakismalarina neden oluyor.

### DEV-2: Port Kontrolu
Herhangi bir servis baslatmadan once port kontrolu yap:
```bash
lsof -i :5173  # Vite dev server
lsof -i :80    # Nginx (production)
```

### DEV-3: No Direct File Execution
```
YASAK:
node src/index.ts
npx vite

DOGRU:
docker compose exec app npm run dev
```

---

## IMPORTANT RULES (Ihlal = Warning)

### BUILD-1: Her Degisiklik Sonrasi Build Test
```bash
docker compose exec app npm run build
docker compose exec app npm run lint
```

### BUILD-2: Container Rebuild Gerektiren Durumlar
Asagidaki dosyalar degistiginde container rebuild gerekli:
- `package.json`
- `package-lock.json`
- `Dockerfile`
- `docker-compose.yml`

```bash
docker compose build --no-cache
docker compose up -d
```

### CODE-1: TypeScript Strict Mode
- `tsconfig.json` strict: true olmali
- `any` tipi kullanma, explicit type tanimla

### CODE-2: Import Order
```typescript
// 1. React/External
import { useState } from 'react';
import JSZip from 'jszip';

// 2. Internal modules
import { categories } from './data/techStack';

// 3. Types
import type { GeneratorConfig } from './types';

// 4. Styles
import './App.css';
```

---

## DOCKER COMMANDS

### Production Mode (Port 9091)
```bash
# Baslat (nginx + static build)
docker compose up -d

# Rebuild ve baslat (kod degisikliginden sonra)
docker compose build --no-cache && docker compose up -d

# Loglar
docker compose logs -f vibe-generator

# Durdur
docker compose down

# Test
curl http://localhost:9091
```

### Development Mode (Port 5173 - Hot Reload)
```bash
# Baslat (vite dev server)
docker compose --profile dev up -d vibe-generator-dev

# Loglar
docker compose logs -f vibe-generator-dev

# Shell erisimi
docker compose exec vibe-generator-dev sh

# Build test
docker compose exec vibe-generator-dev npm run build

# Lint
docker compose exec vibe-generator-dev npm run lint

# Durdur
docker compose --profile dev down
```

### Rebuild
```bash
# Production rebuild
docker compose build --no-cache

# Development - node_modules yenile
docker compose --profile dev down -v
docker compose --profile dev up -d vibe-generator-dev
```

### Troubleshooting
```bash
# Container durumu
docker compose ps -a

# Container restart
docker compose restart vibe-generator

# Temiz baslangic
docker compose down -v
docker compose build --no-cache
docker compose up -d

# Health check
docker compose ps  # STATUS: healthy olmali
```

### Port Kullanimi
| Service | Port | URL | Kullanim |
|---------|------|-----|----------|
| vibe-generator | 9091 | http://localhost:9091 | Production (nginx) |
| vibe-generator-dev | 5173 | http://localhost:5173 | Development (hot reload) |

---

## PROJECT STRUCTURE

```
vibe-generator/
├── src/
│   ├── components/     # React components
│   ├── data/           # Static data (techStack, presets, relationships, techInfo)
│   ├── generator/      # Template generation logic
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Translations (TR/EN)
│   ├── types.ts        # TypeScript types
│   ├── App.tsx         # Main component
│   ├── App.css         # Styles
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── dist/               # Build output (gitignore)
├── Dockerfile          # Multi-stage build
├── docker-compose.yml  # Development setup
├── nginx.conf          # Production server config
└── CLAUDE.md           # This file
```

---

## DATA FILES

### techStack.ts
Teknoloji kategorileri ve secenekleri. Yeni teknoloji eklerken:
1. Kategori `technologies` array'ine ekle
2. `techInfo.ts`'e aciklama ekle
3. `relationships.ts`'e iliskiler ekle

### relationships.ts
Teknoloji bagimliliklari:
- `requires`: Zorunlu bagimlilik (auto-select)
- `recommends`: Onerilen (highlight)
- `conflicts`: Cakisma (birlikte secilemez)

### presets.ts
Hazir stack konfigurasyonlari. Yeni preset eklerken:
- `technologies` icindeki tum ID'ler techStack.ts'de olmali
- `tiers` array'i gecerli tier ID'leri icermeli

### techInfo.ts
Her teknoloji icin detayli bilgi (description, useCase, pros, cons).

---

## TESTING CHECKLIST

Degisiklik sonrasi kontrol:
- [ ] `docker compose exec app npm run build` basarili
- [ ] `docker compose exec app npm run lint` hatasiz
- [ ] Browser'da http://localhost:5173 calisiyor
- [ ] TR/EN dil degisimi calisiyor
- [ ] Preset secimi teknolojileri dolduruyor
- [ ] Share URL olusturuluyor ve yuklenebiliyor

---

## COMMON ISSUES

### Port 5173 kullanımda
```bash
# Kimin kullandigini bul
lsof -i :5173

# Docker container'i restart et
docker compose restart app
```

### npm paket hatasi
```bash
# Container'i rebuild et
docker compose build --no-cache
docker compose up -d
```

### TypeScript hatasi
```bash
# Type check
docker compose exec app npx tsc --noEmit
```
