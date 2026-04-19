# SkillForge — Premium 3D Developer Portfolio

A futuristic, highly-interactive developer portfolio built for **Neel King** to showcase technical expertise, frontend mastery, and building in public. Designed with a dark-mode first aesthetic, neon gradient accents, and butter-smooth 60fps 3D web experiences.

![SkillForge Demo](https://via.placeholder.com/1200x600.png?text=SkillForge+3D+Portfolio)

## 🚀 Live Demo
**[skillforge-sepia.vercel.app](https://skillforge-sepia.vercel.app/)** *(Coming soon)*

---

## 🛠 Tech Stack
This project leverages a modern, bleeding-edge frontend stack:
- **Core:** [Next.js 14](https://nextjs.org/) (App Router) & [React 18](https://react.dev/)
- **Language:** TypeScript (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Engine:** [Three.js](https://threejs.org/)
- **React 3D bindings:** [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Post-Processing:** [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) (Bloom, Vignette, Chromatic Aberration)
- **Scroll Animations:** [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **UI Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have **Node.js 18+** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/kingqueen01112-bot/Skillforge.git
cd Skillforge
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Component Documentation

SkillForge includes a robust library of reusable, animated UI components and 3D scenes. All are located within `src/components/`.

### 1. 3D Scenes (`src/components/3d/`)

#### `<HeroScene />`
The primary 3D environment rendered at the top of the page.
- **Features:** Adaptive camera, dynamic `Math.random` particles, floating shapes (Icosahedron, Octahedron, Torus), and custom GLSL gradient meshes.
- **Props:** None required. Dynamically scales `particleCount` on mobile to maintain 60 FPS.

#### `<SkillsGlobe />`
An interactive, mouse-reactive sphere wrapping skill labels based on a Fibonacci distribution algorithm.
- **Features:** Wireframe outer sphere, inner point dots, text labels using `@react-three/drei` `<Text>`.

### 2. Animations (`src/components/animations/`)

#### `<AnimatedCounter />`
A numeric counter hook that tallies up to a specific number when scrolled into view.
- **Props:**
  - `end` *(number)*: The target number.
  - `suffix` *(string, default `+`)*: String appended to the number.
  - `duration` *(number, default `2000`)*: Animation duration in milliseconds.

#### `<FadeIn />`
Scroll-triggered directional fade implementation.
- **Props:**
  - `delay` *(number, default `0`)*: Delay in seconds.
  - `direction` *(up | down | left | right, default `up`)*: Animation axis.
  - `duration` *(number, default `0.6`)*: Length of the animation.

#### `<TextReveal />`
Word-by-word reveal effect synced to viewport intersection.
- **Props:**
  - `delay` *(number)*: Stagger start time.
  - `children` *(string)*: The text string to reveal.

### 3. UI Elements (`src/components/ui/`)

#### `<MagneticButton />`
A Framer Motion-powered button that structurally pulls towards the user's cursor on hover.
- **Props:**
  - `href` *(string, optional)*: Converts the button to an anchor link.
  - `strength` *(number, default `0.3`)*: Magnetic pull intensity.

#### `<GlassCard />`
A 3D tilt-responsive card featuring glassmorphism (backdrop blur) and customizable glow.
- **Props:**
  - `glowColor` *(string, default `#6366f1`)*: Hover box-shadow color.

#### `<LoadingScreen />`
An absolute overlay that simulates load progress and unmounts the component tree gracefully upon completion.
- **Features:** Animated progress bar, text morphs, and pulse indicators.

#### `<CustomCursor />`
A custom dot & follower cursor system utilizing `useMousePosition`. Includes CSS mix-blend-modes and automatic detection for interactive elements (scaling up when hovering over `a`, `button`, or `[data-cursor-hover]`). Disabled on mobile.

---

## 📈 Performance & Accessibility
- **Performance:** Dynamic `ssr: false` imports for all heavy Three.js canvases, keeping the initial HTML payload lightweight. Particle counts are dynamically reduced on mobile viewports.
- **Accessibility:** Adheres to `prefers-reduced-motion: reduce`. The custom cursor and Lenis smooth scrolling automatically disable themselves for users who prefer reduced motion.

---

## 🌐 Deployment
The project is configured for seamless deployment to [Vercel](https://vercel.com).
1. Connect your GitHub repository to your Vercel Dashboard.
2. Vercel automatically detects the `Next.js` configuration.
3. Every push to the `main` branch will trigger an automated deployment.

---
*Built with passion by Neel King.*