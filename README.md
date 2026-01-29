# Vibe Coding Generator

> Generate customized rulesets for AI-assisted development

> [!WARNING]
> **BETA / PREVIEW** - This project is under active development. Features may change without notice. Feedback and contributions are welcome!

![Vibe Coding Generator](https://img.shields.io/badge/version-2.0.0--beta-orange.svg)
![Status](https://img.shields.io/badge/status-beta-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

[Türkçe](README_TR.md) | English

Vibe Coding Generator helps you create comprehensive rulesets and templates for your projects when working with AI coding assistants like Claude, Cursor, Windsurf, GitHub Copilot, Cline, and Aider.

## Screenshot

<img width="882" alt="Vibe Coding Generator Screenshot" src="https://github.com/user-attachments/assets/08c05abe-c5ff-450f-9ade-b725f11f611f" />

## Features

- **6 AI Tool Support**: Claude, Cursor, Windsurf, GitHub Copilot, Cline, Aider
- **5-Step Wizard**: Easy step-by-step configuration
- **Ready-to-use Presets**: Next.js Starter, React + Supabase, Django API, T3 Stack, and more
- **Smart Dependencies**: Automatic dependency management based on technology choices
- **Template Tiers**: Tier 1 (Essential) and Tier 2 (Recommended) template sets
- **Per-Tool Folders**: Each AI tool gets its own folder (`.claude/`, `.cursor/`, `.windsurf/`, etc.)
- **Export**: ZIP download with all templates organized by tool
- **Shareable URLs**: Share your configuration with others
- **TR/EN Support**: Full Turkish and English language support

## Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/efaslantas/vibe-coding-generator.git
cd vibe-coding-generator

# Start production server (port 9091)
docker compose up -d

# Open in browser
open http://localhost:9091
```

### Using npm

```bash
# Clone the repository
git clone https://github.com/efaslantas/vibe-coding-generator.git
cd vibe-coding-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

## Supported AI Tools

| Tool | Folder | Main File |
|------|--------|-----------|
| Claude Code | `.claude/` | `CLAUDE.md` |
| Cursor | `.cursor/` | `CURSOR.md` |
| Windsurf | `.windsurf/` | `WINDSURF.md` |
| GitHub Copilot | `.github/` | `COPILOT.md` |
| Cline/Roo | `.cline/` | `CLINE.md` |
| Aider | `.aider/` | `AIDER.md` |

## Template Tiers

| Tier | Description | Templates |
|------|-------------|-----------|
| **Tier 1: Essential** | Core files every project needs | MAIN.md, RULESETS.md, VIBE_CODING.md, SESSION_NOTES.md, SESSION_HANDOFF.md, CODE_REVIEW.md |
| **Tier 2: Recommended** | For medium to large projects | EXAMPLES.md, CODEBASE_MAP.md, DEBUGGING.md, CONTRIBUTING.md, SETUP_GUIDE.md, ADR.md |

## Supported Technologies

### Languages
JavaScript/TypeScript, Python, Go, PHP

### Frontend
React, Next.js, Vue, Nuxt, Angular, Svelte, Remix, Astro

### Backend
Node.js (Express/Fastify), NestJS, Django, FastAPI, Flask, Gin (Go), Laravel

### Database
PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase, Prisma (ORM), Drizzle (ORM), SQLite

### Cloud & Hosting
Vercel, Netlify, Cloudflare, Railway, Fly.io

### CI/CD
GitHub Actions, GitLab CI

### Container
Docker, Docker Compose

## Usage

1. **Project Settings**: Enter your project name and select a preset
2. **Tech Stack**: Select the technologies you'll use
3. **Templates**: Choose AI tools and template tiers
4. **Preview**: Review the generated ruleset
5. **Export**: Download ZIP or copy to clipboard

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

**What is Vibe Coding?**

```
Vibe Coding = AI Assistant + Human Developer + Iterative Feedback Loop
```

When coding with AI, providing the right context and rules is crucial. This generator helps you create consistent and comprehensive rulesets for your projects.
