# DESIGN.md - Smile Turkey Visual Constitution

> **The Single Source of Truth for all design decisions.**  
> All components MUST read and follow these rules. No exceptions.

---

## 🎨 COLOR SYSTEM - "Antalya Luxury"

### Primary Palette

```css
--antalya-turquoise: #00B8D4;    /* Primary brand color - Mediterranean waters */
--antalya-deep-blue: #0277BD;   /* Deep ocean - trust, stability */
--sand-gold: #FFD54F;            /* Luxury accent - warm beaches */
--glass-white: #F8FAFC;          /* Pure, clean, clinical */
--midnight-slate: #020617;       /* Background - premium darkness */
```

### Functional Colors

```css
--success-green: #10B981;        /* Verification badges, checkmarks */
--warning-gold: #F59E0B;         /* Attention, important info */
--error-red: #EF4444;            /* Alerts, validation errors */
--trust-blue: #3B82F6;           /* Trustpilot, reviews */
```

### Transparency Scale

```css
--glass-10: rgba(248, 250, 252, 0.10);
--glass-15: rgba(248, 250, 252, 0.15);
--glass-20: rgba(248, 250, 252, 0.20);
--turquoise-20: rgba(0, 184, 212, 0.20);
--gold-15: rgba(255, 213, 79, 0.15);
```

### Usage Rules

- **Primary CTAs**: Use `antalya-turquoise` with white text
- **Secondary CTAs**: Use `glass-10` background with `glass-white` text
- **Hero Overlays**: `midnight-slate` with 70-90% opacity
- **Cards**: `glass-10` background with `backdrop-blur-xl`
- **Accents**: `sand-gold` for premium badges, seals, highlights

---

## 📝 TYPOGRAPHY SYSTEM

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Hierarchy Classes

#### H1 - Cinematic
**Use for:** Hero headlines, page titles

```tsx
className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
```

**Color:** `text-glass-white` or `gradient-text`

**Example:**
```tsx
<h1 className="text-8xl font-bold leading-[0.9] tracking-tight gradient-text">
  Your Perfect Smile
</h1>
```

#### H2 - Elegant
**Use for:** Section headlines, major features

```tsx
className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
```

**Color:** `text-glass-white`

#### H3 - Confident
**Use for:** Card titles, subsections

```tsx
className="text-2xl md:text-3xl font-semibold"
```

#### Body - Readable
**Use for:** Paragraphs, descriptions

```tsx
className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed"
```

#### Small - Metadata
**Use for:** Labels, captions, timestamps

```tsx
className="text-sm text-slate-500 uppercase tracking-wide"
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #00B8D4 0%, #FFD54F 50%, #38BDF8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎬 ANIMATION SYSTEM - Framer Motion Variants

### Standard Variants

#### FadeIn
**Use for:** General content reveals

```tsx
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
};
```

#### SlideUp
**Use for:** Cards entering viewport, section reveals

```tsx
const slideUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.8, 
    ease: [0.43, 0.13, 0.23, 0.96],
    delay: 0.2 
  }
};
```

#### Explode (3D Parts)
**Use for:** Implant hero animation, complex 3D effects

```tsx
const explodeParts = {
  crown: {
    initial: { y: 0, rotateX: 0, scale: 1 },
    exploded: { y: -300, rotateX: 45, scale: 1.1 },
    transition: { duration: 1.2, ease: "easeInOut" }
  },
  abutment: {
    initial: { y: 0, rotateY: 0 },
    exploded: { y: 100, rotateY: 180 },
    transition: { duration: 1.2, ease: "easeInOut" }
  },
  screw: {
    initial: { y: 0, rotateZ: 0 },
    exploded: { y: 400, rotateZ: 360 },
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};
```

#### Pulse (Attention)
**Use for:** Online indicators, microphone button, CTAs

```tsx
const pulse = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
```

#### FloatingStar
**Use for:** Trust badges, review decorations

```tsx
const floatingStar = (delay: number) => ({
  initial: { y: 0, opacity: 0.3 },
  animate: {
    y: [-10, 10, -10],
    opacity: [0.3, 0.6, 0.3]
  },
  transition: {
    duration: 3,
    delay,
    repeat: Infinity,
    ease: "easeInOut"
  }
});
```

### Easing Curves

```tsx
// Premium ease (Apple-style)
const premiumEase = [0.43, 0.13, 0.23, 0.96];

// Bounce (playful)
const bounceEase = [0.68, -0.55, 0.265, 1.55];

// Smooth (default)
const smoothEase = "easeInOut";
```

---

## 🧩 COMPONENT RULES

### Universal Card Standards

**ALL cards MUST include:**

```tsx
className="glass-card backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
```

**Hover effect (optional):**

```tsx
className="... hover:bg-white/15 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,184,212,0.3)] transition-all duration-300"
```

### Glassmorphism Rules

1. **Background**: Always `rgba(255, 255, 255, 0.05)` to `0.15`
2. **Blur**: Minimum `backdrop-blur-xl` (24px)
3. **Border**: `1px solid rgba(255, 255, 255, 0.1)`
4. **Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

### Button Hierarchy

#### Primary CTA
```tsx
className="px-8 py-4 bg-gradient-to-r from-antalya-turquoise to-antalya-deep-blue text-white font-semibold rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(0,184,212,0.6)] transition-all"
```

#### Secondary CTA
```tsx
className="px-8 py-4 glass-card border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all"
```

#### Text Link
```tsx
className="text-antalya-turquoise hover:text-sand-gold transition-colors underline-offset-4 hover:underline"
```

### Spacing System

```tsx
// Section padding
className="py-24 md:py-32 lg:py-40"

// Container max-width
className="max-w-7xl mx-auto px-6 lg:px-8"

// Card spacing
className="space-y-6 md:space-y-8"

// Grid gaps
className="gap-6 md:gap-8 lg:gap-12"
```

---

## 🖼️ IMAGE REQUIREMENTS

### Aspect Ratios

- **Hero images**: 16:9 (cinematic)
- **Treatment cards**: 4:3 (balanced)
- **Testimonial portraits**: 1:1 (square)
- **Bento grid**: Mixed (asymmetric)

### Unsplash Query Format

```
https://images.unsplash.com/photo-{ID}?q=80&w={width}&auto=format&fit=crop
```

**Sizes:**
- Hero: `w=1920`
- Cards: `w=800`
- Thumbnails: `w=400`

### Visual Diversity Protocol

**STRICT RULE:** Never use the same Unsplash ID twice.

**Image Categories:**
- **Cinematic landscapes**: Antalya coastline, turquoise waters
- **Medical precision**: Close-ups of dental work (abstract)
- **Luxury lifestyle**: 5-star hotels, Mercedes transfers, beach resorts
- **Human connection**: Diverse patient portraits (verified)

---

## 🎯 SCROLL ANIMATION RULES

### ScrollImageSequence Component

**Configuration:**
```tsx
{
  totalFrames: 100,
  framePath: '/sequence/implant/',
  frameFormat: '.jpg',
  scrollRange: [0, 1], // Full viewport scroll
  canvasWidth: 1920,
  canvasHeight: 1080,
  preloadBatchSize: 10 // Load 10 frames at a time
}
```

**Mobile Fallback:**
```tsx
if (isMobile) {
  return <video src="/videos/implant-explode.mp4" autoPlay loop muted />;
}
```

**Performance Target:** 60fps on desktop, 30fps minimum on mobile

### Scroll-Triggered Text

**Opacity tied to scroll progress:**
```tsx
const textOpacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
```

**Position tied to scroll:**
```tsx
const textY = useTransform(scrollYProgress, [0, 1], [100, 0]);
```

---

## 📐 LAYOUT STANDARDS

### Grid System

**Bento Grid:**
```tsx
className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
```

**Treatment Grid:**
```tsx
className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
```

**Timeline (Journey):**
```tsx
className="grid md:grid-cols-3 gap-8"
```

### Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Small desktop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

---

## ✅ VERIFICATION CHECKLIST

Before pushing ANY component, verify:

- [ ] Colors match the Antalya palette (no random hex codes)
- [ ] Typography uses defined classes (H1, H2, Body)
- [ ] Animations use standard variants (FadeIn, SlideUp, etc.)
- [ ] Cards have `backdrop-blur-xl` and `border-white/10`
- [ ] Images follow visual diversity protocol (unique IDs)
- [ ] Buttons follow hierarchy (Primary/Secondary/Text)
- [ ] Scroll animations target 60fps
- [ ] Mobile fallback exists for heavy components
- [ ] Spacing uses the standard system (py-24, gap-8, etc.)

---

## 🚀 IMPORT THIS IN EVERY COMPONENT

At the top of each new component file, add:

```tsx
// DESIGN.md Constitution: [Section Reference]
// Example: "Using Antalya Turquoise (#00B8D4) for Primary CTA"
```

This ensures every component is explicitly tied to the design system.

---

**Last Updated:** 2026-01-31  
**Status:** Active Constitution  
**Enforcement:** Mandatory for all new code
