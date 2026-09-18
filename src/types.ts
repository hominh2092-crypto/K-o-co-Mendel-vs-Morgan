export interface Question {
  id: number;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  team?: 'A' | 'B';
}

export type TeamId = 'A' | 'B';

export type GameMode = 'simultaneous' | 'turn-based' | 'vs-bot';

export type MatchType = 'vs-bot' | 'pvp';

export type ScientistChoice = 'A' | 'B'; // 'A' = Gregor Mendel, 'B' = Thomas Hunt Morgan

export type Language = 'vi' | 'en';

export type CharacterSkinId =
  | 'classic'
  | 'christmas'
  | 'tet'
  | 'halloween'
  | 'teacher'
  | 'cyber'
  | 'summer';

export type AppView = 'lobby' | 'arena' | 'manage';

export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface AnswerRecord {
  questionIndex: number;
  question: Question;
  selectedOption: number;
  isCorrect: boolean;
  isTimeout?: boolean;
}

export interface TimeSettings {
  mode: 'shared' | 'individual'; // 'shared' = equal for both, 'individual' = per-team
  sharedSeconds: number; // 0 = unlimited, 15, 20, 30, 45, 60
  teamASeconds: number; // seconds for Mendel
  teamBSeconds: number; // seconds for Morgan
  tickSoundEnabled: boolean;
}

export interface TeamProfile {
  id: TeamId;
  name: string;
  fullName: string;
  title: string;
  organism: string;
  quote: string;
  avatarUrl: string;
  primaryColor: string; // e.g. emerald
  accentColor: string;
  keyHints: string[]; // e.g. ['Phím 1', 'Phím 2', 'Phím 3', 'Phím 4'] or ['A', 'S', 'D', 'F']
}
