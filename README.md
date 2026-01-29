# Vibe Coding Generator

> Generate customized rulesets for AI-assisted development

![Vibe Coding Generator](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)

[Türkçe](README_TR.md) | English

Vibe Coding Generator helps you create comprehensive rulesets and templates for your projects when working with Claude AI and other LLMs.

## Screenshot

<img width="882" height="896" alt="image" src="https://github.com/user-attachments/assets/08c05abe-c5ff-450f-9ade-b725f11f611f" />


<!-- TODO: Add actual screenshot to docs/screenshot.png -->

## Features

- **5-Step Wizard**: Easy step-by-step configuration
- **Ready-to-use Presets**: Full-Stack, Microservices, API, Mobile, and more
- **Smart Dependencies**: Automatic dependency management based on technology choices
- **Validation**: Intelligent validation checking your selections
- **Tech Info**: Detailed information and comparison for each technology
- **35 Templates**: Comprehensive template set from Tier 1-5
- **Export**: Markdown download and clipboard copy
- **Shareable URLs**: Share your configuration with others

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

## Usage

1. **Project Name**: Enter your project name
2. **Preset Selection**: Choose a ready-made configuration or start from scratch with "Custom"
3. **Tech Stack**: Select the technologies you'll use
4. **Template Tiers**: Choose template levels according to your needs
5. **Export**: Download or copy the generated ruleset

## Template Tiers

| Tier | Description | Templates |
|------|-------------|-----------|
| **Tier 1: Essential** | Core files every project needs | 6 |
| **Tier 2: Recommended** | For medium to large projects | 6 |
| **Tier 3: Enterprise** | For production-ready projects | 8 |
| **Tier 4: AI & Modern** | Vibe Coding specific practices | 10 |
| **Tier 5: Reliability** | Production-grade reliability | 5 |

## Supported Technologies

### Languages
JavaScript/TypeScript, Python, Go, Java, Kotlin, C#, Swift

### Frontend
React, Vue, Angular, Svelte

### Backend
Node.js, Django, FastAPI, Spring Boot, ASP.NET Core, Gin

### Database
PostgreSQL, MySQL, MSSQL, MongoDB, Redis, Elasticsearch

### Infrastructure
Docker, Kubernetes, Terraform, GitLab CI, Jenkins, ArgoCD

### Observability
Prometheus, Grafana, Loki, Jaeger

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**What is Vibe Coding?**

```
Vibe Coding = AI Assistant + Human Developer + Iterative Feedback Loop
```

When coding with AI, providing the right context and rules is crucial. This generator helps you create consistent and comprehensive rulesets for your projects.
