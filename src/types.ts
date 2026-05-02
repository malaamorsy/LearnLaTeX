export type RenderMode = "katex" | "document" | "document-validate";

export interface LessonExample {
  code: string;
  caption: string;
  renderMode?: RenderMode;
}

export interface Lesson {
  title: string;
  body: string; // plain prose, markdown-like
  examples: LessonExample[];
  keyPoints: string[];
}

export interface Level {
  id: string;
  worldId: number;
  title: string;
  lesson?: Lesson; // optional — levels without a lesson skip straight to challenge
  goalText: string;
  targetLatex: string;
  renderMode?: RenderMode; // defaults to "katex"
  autoWrap?: boolean; // if true, wrap user input in a standard document shell for rendering/validation
  wrapPreamble?: string; // custom preamble for autoWrap (default: article + amsmath/amssymb/amsthm)
  validationMode: "exact-katex" | "semantic" | "contains" | "pattern" | "custom";
  acceptedForms?: string[];
  requiredPatterns?: string[]; // regex strings, all must match (for "pattern" mode)
  forbiddenPatterns?: string[]; // regex strings, none may match
  validatorFn?: (input: string) => boolean;
  hints: [string, string, string];
  solutionLatex: string;
  tags: string[];
  estimatedMinutes: number;
  conceptExplanation: string;
  isBoss: boolean;
  bonusObjective?: string;
}

export interface World {
  id: number;
  title: string;
  description: string;
  icon: string;
  levels: Level[];
  unlockCondition: number | null;
}

export interface ValidationResult {
  isMatch: boolean;
  matchQuality: number;
}

export interface LevelProgress {
  completed: boolean;
  stars: number;
  hintsUsed: number;
  bestTime: number;
  attempts: number;
}
