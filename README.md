# 🦷 Smile Turkey - Premium Diş Turizmi Platformu

<div align="center">

![Smile Turkey](https://img.shields.io/badge/Smile-Turkey-00B8D4?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Antalya'da dünya standartlarında diş bakımı - %70'e varan tasarruf**

[Demo](https://smileturkey.com) • [Belgeler](#-özellikler) • [Kurulum](#-hızlı-başlangıç)

</div>

---

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakış)
- [Özellikler](#-özellikler)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Proje Yapısı](#-proje-yapısı)
- [Diamond Protocol Tasarım Sistemi](#-diamond-protocol-tasarım-sistemi)
- [Dağıtım](#-dağıtım)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🌟 Genel Bakış

**Smile Turkey**, Antalya'da premium diş turizmi hizmetleri sunan lider platformdur. Modern web teknolojileri ve "Awwwards kalitesinde" tasarım prensiplerine dayanan bu platform, kullanıcılara:

- 💰 %70'e varan maliyet tasarrufu
- 🏥 Dünya standartlarında klinik tesisleri
- 🌴 Antalya'nın güzelliklerinde tedavi deneyimi
- 🤖 AI destekli danışmanlık (Sarah AI Asistan)
- 📱 Sorunsuz rezervasyon ve danışma süreci

sunar.

### 🎯 Proje Hedefleri

- **Ultra-Premium UX**: Crystalmorphism, animated mesh gradients, ve fluid interactions
- **SEO & Performans**: Lighthouse 90+ skorları, Core Web Vitals optimizasyonu
- **Uluslararası Erişim**: Çoklu dil desteği (İngilizce, Türkçe)
- **Dönüşüm Odaklı**: AI chatbot, instant quotes, WhatsApp entegrasyonu

---

## ✨ Özellikler

### 🎨 Diamond Protocol Tasarım Sistemi

Platform, "premium lüks" estetiğini sağlamak için özel geliştirilen **Diamond Protocol** tasarım sistemini kullanır:

#### Crystalmorphism Kartlar
- **32px backdrop blur** ile derin cam efekti
- **4 katmanlı gölgeler** (iç parlaklık + dış ışıltı)
- **Çift kenarlıklar** (gradient inner + outer glow)
- **SVG noise overlay** ince doku için
- **Hover efektleri** ile dinamik etkileşim

#### Animated Mesh Gradients
- 20 saniyelik animasyon döngüsü
- Antalya renk paleti (Turquoise, Deep Blue, Sand Gold)
- Organic gradient hareketleri
- 60fps performans optimizasyonu

#### Premium UI Bileşenleri
- Framer Motion animasyonları
- Paralaks scroll efektleri
- Micro-interactions (hover, click, scroll)
- Responsive tasarım (mobile-first)

### 🤖 AI Özellikleri

- **Sarah AI Concierge**: Google Gemini destekli chatbot
- Doğal dil işleme ile hasta soruları yanıtlama
- Anlık fiyat teklifi hesaplama
- Randevu planlama asistanı

### 📱 Temel Modüller

| Modül | Açıklama |
|-------|----------|
| **Treatments** | 10+ diş tedavisi detayları (implantlar, veneers, Hollywood smile) |
| **Success Stories** | Önce/sonra fotoğrafları ile hasta hikayeleri |
| **Blog** | 10 kapsamlı dental turizm makalesi |
| **Clinic Showcase** | 360° virtual tur, tesis fotoğrafları |
| **Contact & Quote** | Anında fiyat hesaplama, WhatsApp/email iletişim |

### 🔍 SEO & Analytics

- **Yapısal Veri**: Schema.org markup (Organization, LocalBusiness, FAQPage)
- **Meta Optimizasyon**: Dynamic OG tags, Twitter cards
- **Sitemap & Robots**: Otomatik sitemap oluşturma
- **Analytics Hazırlık**: Google Analytics 4, Meta Pixel entegrasyonu

---

## 🛠️ Teknoloji Yığını

### Core Framework
```json
{
  "framework": "Next.js 16.1.1",
  "language": "TypeScript 5.x",
  "styling": "TailwindCSS 3.4",
  "animations": "Framer Motion 11.x"
}
```

### Önemli Kütüphaneler

- **UI**: Lucide React (icons), Radix UI (primitives)
- **AI**: Google Generative AI (Gemini Pro)
- **Form Handling**: React Hook Form
- **SEO**: Next.js Metadata API
- **Deployment**: Vercel (önerilen)

### Geliştirme Araçları

```bash
# Package Manager
npm / yarn / pnpm

# Code Quality
ESLint + Prettier
TypeScript strict mode

# Performance
Turbopack (dev server)
Image optimization (next/image)
```

---

## 🚀 Hızlı Başlangıç

### Ön Gereksinimler

- Node.js 18.x veya üzeri
- npm/yarn/pnpm
- Git

### Kurulum

```bash
# 1. Repository'yi klonlayın
git clone https://github.com/CodePhyt/smile-tr.git
cd smile-tr

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini yapılandırın
cp .env.example .env.local
# .env.local dosyasını düzenleyin (GEMINI_API_KEY gerekli)

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### Ortam Değişkenleri

```.env
# AI Chatbot (Zorunlu)
GEMINI_API_KEY=your_google_gemini_api_key

# Email (Opsiyonel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Analytics (Production için)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

---

## 📁 Proje Yapısı

```
smile-tr/
├── app/                      # Next.js 14 App Router
│   ├── (pages)/
│   │   ├── page.tsx         # Ana sayfa
│   │   ├── about/           # Hakkımızda
│   │   ├── treatments/      # Tedaviler (dynamic routes)
│   │   ├── stories/         # Başarı hikayeleri
│   │   ├── blog/            # Blog posts
│   │   ├── clinics/         # Klinik bilgileri
│   │   └── contact/         # İletişim formu
│   ├── api/                 # API routes
│   │   ├── chat/            # AI chatbot endpoint
│   │   └── quote/           # Fiyat teklifi API
│   ├── globals.css          # Global styles + Diamond Protocol
│   └── layout.tsx           # Root layout
│
├── components/              # React bileşenleri
│   ├── hero/               # Hero sections
│   ├── layout/             # Header, Footer
│   ├── ui/                 # Reusable UI (BentoGrid, cards)
│   ├── chat/               # AI Chatbot widget
│   └── seo/                # SEO components
│
├── lib/                    # Utilities & configs
│   ├── treatments.ts       # Treatment data
│   ├── blog-posts.ts       # Blog content
│   ├── image-sources.ts    # Image path management
│   └── utils.ts            # Helper functions
│
├── public/                 # Static assets
│   ├── assets/
│   │   ├── treatments/
│   │   ├── blog/
│   │   ├── about/
│   │   └── clinics/
│   └── hero-video.mp4
│
└── .env.local              # Environment variables
```

---

## 💎 Diamond Protocol Tasarım Sistemi

### Kullanım Örnekleri

#### Crystal Card
```tsx
<div className="crystal-card p-8 hover:scale-105 transition-transform">
  <h3>Premium İçerik</h3>
  <p>32px blur + 4-layer shadows + noise texture</p>
</div>
```

#### Gradient Text
```tsx
<h1 className="gradient-text text-5xl font-bold">
  Gülüşünüzü Dönüştürün
</h1>
```

#### Animated Mesh Background
Otomatik olarak `body` elementine uygulanır (`globals.css`):
- 20 saniyelik smooth animasyon
- Üç radial gradient katmanı
- Antalya renk paleti

### CSS Değişkenleri

```css
:root {
  --antalya-turquoise: #00B8D4;
  --antalya-deep-blue: #0277BD;
  --sand-gold: #FFD54F;
  --glass-white: #F8FAFC;
  --midnight-slate: #020617;
}
```

---

## 🚢 Dağıtım

### Vercel (Önerilen)

```bash
# 1. Vercel CLI yükleyin
npm i -g vercel

# 2. Deploy edin
vercel --prod
```

### Manuel Production Build

```bash
# Build oluştur
npm run build

# Production sunucusunu başlat
npm start
```

### Docker (Opsiyonel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🎯 Yapılacaklar / Roadmap

### ✅ Tamamlanan
- [x] Diamond Protocol tasarım sistemi
- [x] Crystalmorphism kartlar (31 bileşen)
- [x] AI chatbot entegrasyonu (Gemini)
- [x] Blog sistemi (10 makale)
- [x] SEO optimizasyonu
- [x] Responsive tasarım
- [x] WhatsApp/LinkedIn entegrasyonları

### 🚧 Devam Eden
- [ ] Görsel içerik tamamlanması (2 hikaye eksik - API kota beklemede)
  - [x] Blog kapak görselleri (10/10)
  - [x] Başarı hikayeleri (4/6 tamamlandı - Sarah, Michael, Emma, Ahmed)
  - [x] Yolculuk (Journey) görselleri (3/3)
  - [x] Klinik tesisleri (9/9)

### 📋 Planlananlar
- [ ] Çoklu dil desteği (i18n - Türkçe/İngilizce)
- [ ] Online ödeme entegrasyonu
- [ ] Hasta portal (dashboard)
- [ ] Video testimonials
- [ ] 360° klinik virtual tour
- [ ] Advanced analytics (GA4, Hotjar)

**Detaylı task listesi**: `.gemini/antigravity/brain/.../task.md`

---

## 📝 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen şu adımları izleyin:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Geliştirme Standartları

- TypeScript strict mode kullanın
- ESLint kurallarına uyun
- Component'ler için JSDoc ekleyin
- Responsive tasarım prensiplerini takip edin
- Accessibility (a11y) standartlarına uyun

---

## 📞 İletişim & Destek

- **Web**: [smileturkey.com](https://smileturkey.com)
- **Email**: nnesipoglu@outlook.com
- **WhatsApp**: +90 530 287 63 50
- **LinkedIn**: [Nesipoglu](https://www.linkedin.com/in/nnesipogluu/?locale=en_US)

---

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI chatbot
- [Lucide](https://lucide.dev/) - Icon library

---

<div align="center">

**Smile Turkey ile Hayalinizdeki Gülüşe Kavuşun** 🦷✨

Made with ❤️ in Antalya, Turkey

</div>
