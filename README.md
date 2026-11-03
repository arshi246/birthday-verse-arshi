# 🎂 BirthdayVerse

> **"A Little More Magic, A Little More Me."**  
> An interactive, zero-dependency, story-driven birthday experience and frontend architecture showcase crafted for **Arshi**.

---

## ✨ Overview

**BirthdayVerse** is a luxury, no-scroll, 5-stage interactive web experience engineered entirely with **vanilla HTML5, CSS3, and ES6+ JavaScript**—without external libraries, UI frameworks, build pipelines, or external audio assets.

Conceived both as a personal self-celebration and a **senior-level creative frontend showcase**, the project demonstrates real-time **Web Audio synthesis**, expressive **Web Speech synthesis** with prosody emphasis, **HTML5 Canvas particle physics**, **Royal Tri-Fold editorial layout**, and an **automated story-flow state machine**.

---

## 🏛️ Experience Architecture

| Stage | Experience | Engineering Highlights |
| :--- | :--- | :--- |
| **01 · Welcome** | Atmospheric aurora & procedural starfield with hero CTA (`Enter My Birthday World ✨`) | Dynamic starfield generation, glassmorphic card composition, gesture-bound audio context unlock |
| **02 · Birthday Reveal** | `"Happy Birthday, Arshi!"` kinetic typography, **Voice Studio**, and interactive **Birthday Cake** | Per-character CSS spring physics, Web Speech API with dynamic pitch/rate inflection on *"Arshi!"*, speed presets (`🐢 Slow` · `😊 Normal` · `🎉 Excited!`), candle smoke + confetti burst + **2.2s auto-advance** |
| **03 · A Letter to Myself** | **Royal Tri-Fold Keepsake Card** (`Part I · Your Heart`, `Part II · Your Strength`, `Part III · Your Becoming`) | 3-column desktop editorial spread (100% viewport fit with zero clipping), DOM-cloned replay-safe typewriter, live progress meter, `⚡ 2× Speed` toggle, `✨ Show Full Letter` skip, **3.2s auto-advance** |
| **04 · Surprise Gift** | Floating 3D-styled wrapped gift box with hidden birthday blessing | Spring lid/bow unwrapping physics, heart & gold particle burst, **4.8s auto-advance** to finale + **automatic state reset** on slide exit |
| **05 · Grand Finale** | Closing celebration (`Here's to the person I'm becoming.`) & full experience replay | Multi-color confetti rain, celebratory synth fanfare, one-click full state machine reset (`↻ Replay the Experience`) |

---

## 🎵 Procedural Audio & Voice Engine (Zero External Media)

* **132-BPM Pop-Chime Synthesizer:** Engineered with the native **Web Audio API** (`AudioContext`, dual `OscillatorNode` harmonics, `BiquadFilterNode`, and `DynamicsCompressorNode` for balanced, high-clarity output across desktop and mobile speakers). Features live switching between **`🎶 Party Beat`** (lead + chords + bass + kick/hi-hat) and **`✨ Chimes`**, instant mute/unmute, and automatic background-tab suspension via `visibilitychange`.
* **Prosody-Enhanced Voice Studio:** Powered by the `speechSynthesis` API with curated voice selection, real-time soundwave visualization, and custom pitch/cadence emphasis on the recipient's name.

---

## 🧭 Navigation & State Machine

* **Automated Story Progression:** Each stage transitions automatically to the next once its primary interaction completes (extinguishing the candles → completing the keepsake letter → unwrapping the gift).
* **Multi-Modal Manual Control:** Users retain full control at any moment via the contextual **`↩ Back`** control, **Top Progress Dots**, **Keyboard Navigation (`←` / `→` / `Home` / `End`)**, or **Touch Swipe Gestures** (intelligently scoped so scrolling inside the mobile letter view is never hijacked).

---

## 🎨 Design System

| Swatch | Token | Hex | Role |
| :--- | :--- | :--- | :--- |
| 🟦 | `--blue` | `#DCEAF7` | Primary atmospheric wash & soft highlights |
| ⚪ | `--ivory` | `#FFFDF7` | Keepsake card surfaces & warm ambient light |
| 🩶 | `--silver` | `#C8CED8` | Aurora depth & subtle structural dividers |
| 🔷 | `--dusty` | `#829DBB` | Secondary accents, gift ribbons & chapter headers |
| 🌑 | `--midnight` | `#24364B` | High-contrast editorial typography & primary CTAs |
| ✨ | `--gold` / `--gold-deep` | `#E8C987` / `#C99B3B` | Candle flames, active line spotlights, badges & focus rings |

* **Typography:** `Playfair Display` (editorial headings & keepsake titles) paired with `Poppins` (clean UI controls & body copy).
* **Privacy-First Visuals:** 100% crafted with pure CSS art, gradients, glassmorphism, and canvas particles—zero personal photographs or stock imagery.

---

## ♿ Accessibility, Resilience & Performance

* **Semantic & Keyboard Accessible:** Landmark regions, sequential headings (`<h1>` → `<h2>`), high-visibility `:focus-visible` outlines, `inert` / `aria-hidden` management on inactive slides, and `aria-live="polite"` status announcements.
* **Reduced Motion Compliance:** Honors `@media (prefers-reduced-motion: reduce)` by disabling particle loops, ambient drift, and slide transition motion.
* **Graceful No-JS Fallback:** When JavaScript is unavailable, `html:not(.js-slides)` presents all five stages in a clean vertical layout with the full letter and surprise message visible by default.
* **Fault-Tolerant Architecture:** Every subsystem (`fx`, `stars`, `music`, `voice`, `letter`, `cake`, `gift`, `slides`) is encapsulated inside an isolated `safe(label, fn)` `try/catch` boundary so browser-specific API restrictions never interrupt the experience.

---

## 📁 Project Structure

```text
BirthdayVerse/
├── index.html          # Semantic 5-stage markup & keepsake letter content
├── css/
│   └── style.css       # Design tokens, Tri-Fold editorial grid, animations & responsive rules
├── js/
│   └── script.js       # Auto-flow slide engine, Web Audio synth, Voice Studio, Typewriter & Canvas FX
├── assets/
│   └── favicon.svg     # Custom vector star emblem
├── README.md           # Architecture & project documentation
├── QA_REPORT.md        # Functional, content & technical verification report
└── .gitignore          # Environment & editor ignore rules
```

---

## 💻 Local Development

Zero dependencies or build steps required. Run any static file server from the project root:

```bash
python -m http.server 5500
# or
npx serve .
```

Open `http://localhost:5500` in any modern browser.

---

## 📜 License

Crafted as a personal birthday celebration for **Arshi** and a frontend engineering portfolio piece.