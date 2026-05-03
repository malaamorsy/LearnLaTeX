<div align="center">

# 🧮 LearnLaTeX

**An interactive, game-like platform for learning LaTeX — from first steps to machine learning notation.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge)](https://malaamorsy.github.io/LearnLaTeX/)
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
![Python](https://img.shields.io/badge/Python-3.12-blue)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

LearnLaTeX is a browser-based learning game that teaches you LaTeX through structured, progressive challenges. Instead of reading a dry manual, you solve real LaTeX puzzles — typing expressions into a live editor that renders your output instantly using KaTeX.

Progress through **12 worlds**, each focused on a different domain of LaTeX, from document basics to quantum mechanics notation. Every level includes a lesson, a challenge, a 3-hint system, and a star rating based on your performance.

---

## ✨ Features

### 🎮 Game Structure
- **12 worlds** with progressively unlocked content — you must complete a world before moving to the next
- **Multiple levels per world**, each with an estimated completion time
- **Boss levels** — special challenge levels that cap off each world
- **Bonus objectives** for high performers who want to go further
- **Star rating system** — earn 1–3 stars per level based on hints used and time taken

### 📝 Level Experience
- **Lesson panel** — each level opens with a readable lesson covering the concept, with live rendered examples and key points
- **Live LaTeX editor** — powered by CodeMirror 6, with syntax awareness
- **Instant preview** — your LaTeX renders in real time using KaTeX
- **3-hint system** — progressively more revealing hints, each one costing you a star
- **Validation engine** — multiple modes (exact match, semantic, pattern, contains, custom function) to fairly judge your answer
- **Solution reveal** — stuck? Reveal the solution and study it

### 🛠️ Tools
- **Sandbox** — a free-form LaTeX editor with pre-built templates (blank, math cheatsheet, theorem proof, physics document)
- **Reference** — a searchable LaTeX symbol and command reference

### 💾 Persistence & Settings
- Progress is saved automatically to your browser via `localStorage`
- Dark mode toggle
- Adjustable editor font size
- Reset progress option

---

## 🌍 Worlds

| # | World | Topics Covered |
|---|-------|---------------|
| 🚀 1 | **First Steps** | Superscripts, subscripts, fractions, roots, document structure |
| ✍️ 2 | **Text & Style** | Bold, italic, monospace, mathematical font styles |
| Σ 3 | **Symbols** | Greek letters, operators, relations, arrows, set theory |
| ∫ 4 | **Big Operators** | Summation, products, integrals, limits, brackets |
| ⊞ 5 | **Structures** | Aligned equations, matrices, cases, nested expressions |
| ⟨⟩ 6 | **Linear Algebra** | Vectors, norms, eigenvalues, matrix equations |
| ∎ 7 | **Proofs** | Theorem notation, proof structure, logic, QED symbols |
| ∞ 8 | **Advanced Math** | Series, complex matrices, derivatives, famous formulas |
| ⚛️ 9 | **Physics** | Quantum mechanics, electromagnetism, tensors |
| 📊 10 | **Statistics** | Probability, distributions, Bayes' theorem, CLT |
| ℕ 11 | **Number Theory** | Primes, GCD, totient function, combinatorics |
| 🤖 12 | **Machine Learning** | Gradient descent, attention mechanisms, KL divergence, ELBO |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Build tool | [Vite 8](https://vite.dev/) |
| Math rendering | [KaTeX](https://katex.org/) |
| Code editor | [CodeMirror 6](https://codemirror.net/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| State management | [Zustand](https://zustand-demo.pmnd.rs/) (with `persist` middleware) |
| Deployment | GitHub Pages via GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/malaamorsy/LearnLaTeX.git
cd LearnLaTeX

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Editor/          # CodeMirror-based LaTeX editor
│   ├── LevelUI/         # Hint panel, lesson panel
│   ├── Modals/          # Level complete modal
│   ├── Preview/         # KaTeX & document preview, match status
│   └── shared/          # Logo, star rating, confetti
├── data/
│   ├── world-1.ts       # Level definitions for each world
│   ├── world-2.ts
│   └── ...
├── routes/
│   ├── WorldMap.tsx     # Home screen — world selection
│   ├── LevelView.tsx    # Main gameplay screen
│   ├── Sandbox.tsx      # Free-form LaTeX sandbox
│   └── Reference.tsx    # Symbol & command reference
├── store/
│   └── useGameStore.ts  # Zustand global state + persistence
├── styles/              # Global CSS variables and shared styles
├── utils/               # Validation logic, LaTeX rendering helpers
└── types.ts             # Shared TypeScript interfaces
```

---

## 🔮 Roadmap & Future Ideas

### Near-term
- [ ] **Achievement badges** — reward milestones like "First Boss Defeated", "No Hints Used", "Speed Run"
- [ ] **Progress dashboard** — a stats screen showing stars earned per world, time spent, accuracy rate
- [ ] **Keyboard shortcuts** — submit answer with `Ctrl+Enter`, toggle hint with a shortcut
- [ ] **Accessibility improvements** — ARIA labels, keyboard navigation, high-contrast mode

### Medium-term
- [ ] **More worlds** — Calculus, Differential Geometry, Graph Theory, Chemistry notation (mhchem), Algorithms (pseudocode)
- [ ] **Spaced repetition review mode** — re-test levels you haven't visited in a while
- [ ] **Mobile-responsive layout** — touch-friendly editor and improved small-screen UI
- [ ] **Custom level creator** — let users write and share their own challenge levels
- [ ] **Time challenge mode** — race against the clock for a different kind of scoring

### Long-term
- [ ] **User accounts & leaderboards** — sign in, sync progress across devices, compete globally
- [ ] **Real LaTeX compilation** — integrate a backend to render full documents beyond what KaTeX supports
- [ ] **AI-powered hints** — context-aware hints generated dynamically based on what the user typed
- [ ] **Multiplayer mode** — race a friend to complete a level
- [ ] **Internationalization** — translate lessons into Arabic, French, German, Spanish
- [ ] **Overleaf integration** — open any sandbox document directly in Overleaf
- [ ] **Offline support** — PWA with service worker for offline play

---

## 🤝 Contributing

Contributions are welcome! Here are some great ways to get involved:

- **Add levels** — write new levels for existing worlds or propose a new world entirely
- **Fix bugs** — check the Issues tab for open bugs
- **Improve the validator** — the semantic validation engine can always be smarter
- **Improve accessibility** — screen reader support, keyboard navigation
- **Write tests** — unit tests for validation logic and utility functions

### Adding a Level

Each level is a typed `Level` object in `src/data/world-N.ts`. The `types.ts` file documents every field. A minimal level looks like:

```ts
{
  id: "3.5",
  worldId: 3,
  title: "The infinity symbol",
  goalText: "Write the LaTeX command for ∞",
  targetLatex: "\\infty",
  validationMode: "exact-katex",
  hints: ["It's a named symbol", "It starts with \\inf", "\\infty"],
  solutionLatex: "\\infty",
  tags: ["symbols"],
  estimatedMinutes: 1,
  conceptExplanation: "\\infty renders as the infinity symbol ∞.",
  isBoss: false,
}
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/malaamorsy">malaamorsy</a>
</div>
