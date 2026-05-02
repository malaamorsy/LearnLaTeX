import type { World } from "../types";
import { world1Levels } from "./world-1";
import { world2Levels } from "./world-2";
import { world3Levels } from "./world-3";
import { world4Levels } from "./world-4";
import { world5Levels } from "./world-5";
import { world6Levels } from "./world-6";
import { world7Levels } from "./world-7";
import {
  world8Levels,
  world9Levels,
  world10Levels,
  world11Levels,
  world12Levels,
} from "./worlds-8-12";

export const WORLDS: World[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Learn the basics: superscripts, subscripts, fractions, and roots.",
    icon: "🚀",
    levels: world1Levels,
    unlockCondition: null,
  },
  {
    id: 2,
    title: "Text & Style",
    description: "Bold, italic, monospace, and mathematical font styles.",
    icon: "✍️",
    levels: world2Levels,
    unlockCondition: 1,
  },
  {
    id: 3,
    title: "Symbols",
    description: "Greek letters, operators, relations, arrows, and set theory.",
    icon: "Σ",
    levels: world3Levels,
    unlockCondition: 2,
  },
  {
    id: 4,
    title: "Big Operators",
    description: "Summation, products, integrals, limits, and brackets.",
    icon: "∫",
    levels: world4Levels,
    unlockCondition: 3,
  },
  {
    id: 5,
    title: "Structures",
    description: "Aligned equations, matrices, cases, and nested expressions.",
    icon: "⊞",
    levels: world5Levels,
    unlockCondition: 4,
  },
  {
    id: 6,
    title: "Linear Algebra",
    description: "Vectors, matrices, norms, eigenvalues, and matrix equations.",
    icon: "⟨⟩",
    levels: world6Levels,
    unlockCondition: 5,
  },
  {
    id: 7,
    title: "Proofs",
    description: "Theorem notation, proof structure, logic, and QED symbols.",
    icon: "∎",
    levels: world7Levels,
    unlockCondition: 6,
  },
  {
    id: 8,
    title: "Advanced Math",
    description: "Series, complex matrices, derivatives, and famous formulas.",
    icon: "∞",
    levels: world8Levels,
    unlockCondition: 7,
  },
  {
    id: 9,
    title: "Physics",
    description: "Quantum mechanics, electromagnetism, and tensors.",
    icon: "⚛️",
    levels: world9Levels,
    unlockCondition: 8,
  },
  {
    id: 10,
    title: "Statistics",
    description: "Probability, distributions, Bayes' theorem, and the CLT.",
    icon: "📊",
    levels: world10Levels,
    unlockCondition: 9,
  },
  {
    id: 11,
    title: "Number Theory",
    description: "Primes, GCD, totient function, and combinatorics.",
    icon: "ℕ",
    levels: world11Levels,
    unlockCondition: 10,
  },
  {
    id: 12,
    title: "Machine Learning",
    description: "Gradient descent, attention, KL divergence, and the ELBO.",
    icon: "🤖",
    levels: world12Levels,
    unlockCondition: 11,
  },
];

export function getLevelById(id: string): { level: import("../types").Level; world: World } | null {
  for (const world of WORLDS) {
    const level = world.levels.find((l) => l.id === id);
    if (level) return { level, world };
  }
  return null;
}

export function getAllLevels() {
  return WORLDS.flatMap((w) => w.levels);
}

export function getNextLevel(currentId: string): import("../types").Level | null {
  const allLevels = getAllLevels();
  const idx = allLevels.findIndex((l) => l.id === currentId);
  return idx !== -1 && idx + 1 < allLevels.length ? allLevels[idx + 1] : null;
}
