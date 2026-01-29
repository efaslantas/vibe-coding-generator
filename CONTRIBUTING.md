# Katkıda Bulunma Rehberi

Vibe Coding Generator'a katkıda bulunmak istediğiniz için teşekkür ederiz! 🎉

## 🚀 Başlarken

1. Repository'yi fork edin
2. Lokal makinenize klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/vibe-coding-generator.git
   cd vibe-coding-generator
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

## 📝 Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) formatını kullanıyoruz:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon değişikliği
- `style`: Kod formatı (boşluk, noktalı virgül vb.)
- `refactor`: Refactoring
- `test`: Test ekleme/düzeltme
- `chore`: Build, CI/CD değişiklikleri

### Örnekler
```
feat(presets): Add Django REST preset
fix(validation): Fix Kubernetes-Docker dependency check
docs(readme): Update installation instructions
```

## 🔧 Development

### Proje Yapısı

```
src/
├── data/
│   ├── techStack.ts      # Teknoloji kategorileri
│   ├── presets.ts        # Hazır preset'ler
│   ├── relationships.ts  # Teknoloji bağımlılıkları
│   └── techInfo.ts       # Teknoloji açıklamaları
├── generator/
│   └── index.ts          # Markdown generator
├── types.ts              # TypeScript tipleri
├── App.tsx               # Ana component
└── App.css               # Stiller
```

### Yeni Teknoloji Ekleme

1. `src/data/bgtsStack.ts` dosyasına teknoloji ekleyin
2. `src/data/techInfo.ts` dosyasına açıklama ekleyin
3. `src/data/relationships.ts` dosyasına bağımlılıkları ekleyin

### Yeni Preset Ekleme

`src/data/presets.ts` dosyasına yeni preset ekleyin:

```typescript
{
  id: 'my-preset',
  name: 'My Preset',
  description: 'Açıklama',
  icon: '🚀',
  tags: ['Tag1', 'Tag2'],
  technologies: {
    languages: ['js-ts'],
    // ...
  },
  tiers: [1, 2, 3],
}
```

## 🧪 Test

```bash
# Type check
npm run build

# Lint (varsa)
npm run lint
```

## 📋 Pull Request Checklist

- [ ] Kod build oluyor (`npm run build`)
- [ ] Commit mesajları conventional format'ta
- [ ] Gerekli dokümantasyon eklendi
- [ ] Değişiklikler test edildi

## 💡 Öneriler

- Yeni özellik önerileri için önce Issue açın
- Bug raporlarında detaylı bilgi verin
- Küçük, odaklı PR'lar gönderin

## 📞 İletişim

- GitHub Issues: Bug raporları ve özellik istekleri
- Discussions: Genel sorular ve tartışmalar

Teşekkürler! 🙌
