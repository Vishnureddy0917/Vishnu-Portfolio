# Personal Portfolio — Yenimireddy Vishnu Reddy

A production-ready, ultra-premium personal portfolio website for **Yenimireddy Vishnu Reddy**, built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, and Lenis smooth scrolling.

Design aesthetic: Quiet, clean, monochrome (white, black, gray only), responsive, accessible, and wows with dynamic micro-interactions.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm or pnpm / yarn
- Python 3.9+ (with OpenCV, NumPy, Pillow, imageio-ffmpeg for rebuilding hero assets if needed)

### Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 📋 Page Sections Table

| Section # | Section Name | Component Path | Description |
|-----------|--------------|----------------|-------------|
| 4.1 | **Hero** | `src/components/hero/Hero.tsx` | Seamless looping video hero, ghost background typography, mute/unmute audio control button. |
| 4.2 | **About** | `src/components/sections/About.tsx` | 3-column layout featuring a hanging 3D swinging lanyard ID card with hover/keyboard flip action. |
| 4.3 | **Skills** | `src/components/sections/Skills.tsx` | "Periodic table of my stack" with 8-column layout, family filters, wave animation, and sticky logo inspector. |
| 4.4 | **Work** | `src/components/sections/Work.tsx` | Expanding horizontal accordion gallery with grayscale mini-UI preview and project details. |
| 4.5 | **Certifications** | `src/components/sections/Certifications.tsx` | Ink-flood row index with scale hover effects for verified credentials. |
| 4.6 | **Experience** | `src/components/sections/Experience.tsx` | Scroll-drawn vertical timeline combining education and internship experience into one path. |
| 4.7 | **Achievements** | `src/components/sections/Achievements.tsx` | Pinned horizontal scroll gallery with count-up metrics for dance team leadership and certifications. |
| 4.8 | **Contact** | `src/components/sections/Contact.tsx` | Interactive letter-hopping headline, email copy chip, spinning text badge, and footer. |

---

## 🎬 How to Rebuild Hero Video Assets

The hero video pipeline turns any raw introduction video into a cropped, whitened, seamless looping clip with sample-accurate audio crossfades.

To rebuild the hero video and portrait assets from source:

```bash
python scripts/build-hero-assets.py
```

### Pipeline Steps:
1. Detects & crops subject tightly (768×960 resolution).
2. Whitens off-white background (`colorlevels=rimax=0.98:gimax=0.98:bimax=0.98`).
3. Seamless 0.5s video frame cross-fade using OpenCV & NumPy.
4. Sample-accurate 0.5s audio cross-fade in NumPy.
5. Exports `public/hero/hero.mp4` (H.264 AAC) and `public/hero/hero.webm` (VP9 Opus).
6. Generates `public/portrait-bust.webp` (480×600) and `public/og.jpg` (1200×630).

---

## 📜 Credits and Licenses

- **Fonts**:
  - Inter Tight (OFL License)
  - Instrument Serif (OFL License)
  - JetBrains Mono (OFL License)
- **Logos & Icons**:
  - Brand SVGs sourced from [Devicon](https://devicon.dev) (MIT License). Sourced files and license metadata are stored in `public/logos/LICENSE`.
  - Concept line-art icons built with custom SVG paths.
