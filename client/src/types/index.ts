export interface Question {
  id: number;
  sentence: string;
  blanks: string[];
  options: string[];
  correctAnswers: string[];
}

export interface UserAnswer {
  questionId: number;
  selectedWords: string[];
  isCorrect: boolean;
  sentence: string;
  correctAnswers: string[];
}
