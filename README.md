<div align="center">

# ✦ LAVI — Interactive Developer Portfolio

### A single-file, zero-image, physics-driven portfolio built entirely with code.

<br>

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff)
![Canvas](https://img.shields.io/badge/Canvas_2D-E34F26?style=for-the-badge&logo=html5&logoColor=fff)

<br>

> **98 KB** gzipped · **0 images** · **1 HTML file** · **60 FPS** physics

</div>

---

## ⚡ At a Glance

| Metric | Value |
|---|---|
| **Output** | Single `index.html` — all JS + CSS inlined |
| **Size** | ~98 KB gzipped |
| **Images** | Zero — every visual is code-rendered |
| **Build time** | ~3 seconds |
| **First paint** | Instant |
| **Offscreen** | Canvas auto-pauses to save battery |

---

## 🛠 Tech Stack

### Languages

| Language | Usage |
|---|---|
| **TypeScript** | All 13 source files — type safety for component props, project data, canvas node types |
| **JavaScript (JSX)** | UI logic, animations, event handling, Canvas rendering |
| **HTML** | `index.html` shell + all markup rendered through React |
| **CSS** | Tailwind utilities + custom stylesheet (keyframes, glass surfaces, cursor, spotlight, noise) |
| **SVG** | Brand icons, favicon, constellation mockup, noise texture via data-URI |

### Frameworks & Tools

| Tool | Role |
|---|---|
| **React 19** | Component-driven UI — every section is a component with hooks managing state |
| **Vite 7** | Dev server + production bundler |
| **Tailwind CSS v4** | Utility-first styling; theme tokens defined via `@theme` |
| **lucide-react** | Clean SVG icon set (arrows, sparkles, file icons, etc.) |
| **vite-plugin-singlefile** | Inlines all JS + CSS into one `dist/index.html` |
| **clsx + tailwind-merge** | Conditional class-name utilities |
| **npm** | Package management |

---

## 🎨 Design System

### Typography

| Font | Usage |
|---|---|
| **Inter** | Body text and headings |
| **Anton** | "L" monogram tiles and giant ghost numerals on project cards |
| **JetBrains Mono** | Uppercase labels, constellation node names, code-style details |

### Color Palette

| Token | Value | Purpose |
|---|---|---|
| **Base** | `#000000` | Pure black background |
| **Text** | `white / opacity` | Hierarchical text system |
| **Violet** | `#7C3AED` family | Primary accent |
| **Blue** | `#60A5FA` | Secondary accent |
| **Amber / Emerald** | — | Status pills |

---

## 🧠 Browser APIs & Interactive Art

This is where the magic lives — **no animation libraries**, just raw browser APIs.

| API | What It Does |
|---|---|
| **Canvas 2D** | Hand-written physics simulation: node drift, velocity steering, proximity link lines, glow via `shadowBlur`, mouse repulsion, wall containment, live text labels |
| **IntersectionObserver** | Scroll-reveal triggers, scroll-spy active nav pill, offscreen canvas pause |
| **ResizeObserver** | Re-lays out the constellation on window resize |
| **requestAnimationFrame** | Smooth 60fps loops for constellation physics and lagging cursor ring |
| **Pointer / Mouse Events** | Hero spotlight, magnetic buttons, 3D card tilt, constellation hover |
| **matchMedia** | Detects touch devices (`pointer: fine`) and motion sensitivity (`prefers-reduced-motion`) |
| **CSS Gradients + backdrop-filter** | Glass pills, radial spotlight, blur atmosphere layers |

---

## ✨ Feature Set

### Interaction & Motion

- 🖱️ **Custom cursor** — instant dot + physics-lagged ring that expands over links
- 🔦 **Mouse-following spotlight** — violet glow in hero + global cursor aura
- ✨ **Rising particle field** in the hero section
- 🪐 **Orbiting tech badges** around the LAVI monogram
- 🧲 **Magnetic buttons** with scroll-triggered staggered reveals
- 💎 **Shimmer gradient text**
- 🌌 **Interactive constellation** — nodes drift, connect, glow, and dodge your mouse
- 📱 **Abstract CSS product mockups** — 2 phone frames + 2 browser frames with 3D perspective tilt
- 🪗 **Animated FAQ accordion**

### Structure & UX

- ✅ Semantic HTML with skip-to-content link
- ⌨️ Keyboard focus rings and ARIA labels
- 🔇 Screen-reader-only constellation text
- 📐 Fully responsive (mobile menu, adaptive constellation)
- 🚫 Effects auto-disabled on touch devices
- ♿ Respects `prefers-reduced-motion` — loops and particles shut off gracefully
- 📄 Data-driven content — all text, stats, projects, and links in one config file

### Performance

- 🚀 **No heavy images** — every visual is code-rendered
- 📦 **Single-file output** — ~98 KB gzipped
- ⚡ **Instant first paint**
- 🔋 **Offscreen canvas pauses** automatically to save battery

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/your-username/lavi-portfolio.git
cd lavi-portfolio
npm install
