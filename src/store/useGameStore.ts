import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelProgress } from "../types";

interface GameState {
  levelProgress: Record<string, LevelProgress>;
  unlockedWorlds: number[];
  unlockedAchievements: string[];
  currentLevelId: string | null;
  currentInput: string;
  hintsRevealedForLevel: Record<string, number>;
  darkMode: boolean;
  editorFontSize: number;
  renderDelay: number;

  completeLevel: (levelId: string, stars: number, time: number) => void;
  useHint: (levelId: string) => void;
  revealSolution: (levelId: string) => void;
  setCurrentInput: (input: string) => void;
  setCurrentLevel: (levelId: string | null) => void;
  resetLevel: (levelId: string) => void;
  unlockWorld: (worldId: number) => void;
  unlockAchievement: (id: string) => void;
  toggleDarkMode: () => void;
  setEditorFontSize: (size: number) => void;
  resetAllProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      levelProgress: {},
      unlockedWorlds: [1],
      unlockedAchievements: [],
      currentLevelId: null,
      currentInput: "",
      hintsRevealedForLevel: {},
      darkMode: false,
      editorFontSize: 15,
      renderDelay: 150,

      completeLevel: (levelId, stars, time) => {
        const existing = get().levelProgress[levelId];
        const bestStars = Math.max(stars, existing?.stars ?? 0);
        const bestTime = Math.min(time, existing?.bestTime ?? Infinity);
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              completed: true,
              stars: bestStars,
              hintsUsed: state.hintsRevealedForLevel[levelId] ?? 0,
              bestTime,
              attempts: (existing?.attempts ?? 0) + 1,
            },
          },
        }));
      },

      useHint: (levelId) => {
        set((state) => ({
          hintsRevealedForLevel: {
            ...state.hintsRevealedForLevel,
            [levelId]: Math.min((state.hintsRevealedForLevel[levelId] ?? 0) + 1, 3),
          },
        }));
      },

      revealSolution: (levelId) => {
        set((state) => ({
          hintsRevealedForLevel: {
            ...state.hintsRevealedForLevel,
            [levelId]: 3,
          },
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              ...(state.levelProgress[levelId] ?? {
                hintsUsed: 3, bestTime: 0, attempts: 0,
              }),
              completed: true,
              stars: 0,
              hintsUsed: 3,
              attempts: (state.levelProgress[levelId]?.attempts ?? 0) + 1,
              bestTime: state.levelProgress[levelId]?.bestTime ?? 9999,
            },
          },
        }));
      },

      setCurrentInput: (input) => set({ currentInput: input }),
      setCurrentLevel: (levelId) => set({ currentLevelId: levelId }),

      resetLevel: (levelId) => {
        set((state) => ({
          hintsRevealedForLevel: {
            ...state.hintsRevealedForLevel,
            [levelId]: 0,
          },
          currentInput: "",
        }));
      },

      unlockWorld: (worldId) => {
        set((state) => ({
          unlockedWorlds: state.unlockedWorlds.includes(worldId)
            ? state.unlockedWorlds
            : [...state.unlockedWorlds, worldId],
        }));
      },

      unlockAchievement: (id) => {
        set((state) => ({
          unlockedAchievements: state.unlockedAchievements.includes(id)
            ? state.unlockedAchievements
            : [...state.unlockedAchievements, id],
        }));
      },

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setEditorFontSize: (size) => set({ editorFontSize: size }),
      resetAllProgress: () => set({
        levelProgress: {},
        unlockedWorlds: [1],
        unlockedAchievements: [],
        currentLevelId: null,
        currentInput: "",
        hintsRevealedForLevel: {},
      }),
    }),
    {
      name: "learnlatex-progress",
      partialize: (state) => ({
        levelProgress: state.levelProgress,
        unlockedWorlds: state.unlockedWorlds,
        unlockedAchievements: state.unlockedAchievements,
        darkMode: state.darkMode,
        editorFontSize: state.editorFontSize,
      }),
    }
  )
);
