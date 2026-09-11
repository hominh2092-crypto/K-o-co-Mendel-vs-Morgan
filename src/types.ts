export interface Question {
  id: number;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
}

export type TeamId = 'A' | 'B';

export type GameMode = 'simultaneous' | 'turn-based' | 'vs-bot';

export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface AnswerRecord {
  questionIndex: number;
  question: Question;
  selectedOption: number;
  isCorrect: boolean;
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
