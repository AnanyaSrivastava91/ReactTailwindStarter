import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "@/lib/api";
import { Question, UserAnswer } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface QuestionContextType {
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  selectedWords: string[];
  userAnswers: UserAnswer[];
  showResults: boolean;
  isLoading: boolean;
  error: Error | null;
  setSelectedWords: (words: string[]) => void;
  handleWordSelect: (word: string, blankIndex: number) => void;
  handleWordUnselect: (blankIndex: number) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const { toast } = useToast();

  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ['/api/questions'],
    staleTime: Infinity,
  });

  // Initialize selected words array based on number of blanks
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      setSelectedWords(Array(currentQuestion.blanks.length).fill(''));
      setTimeLeft(30);
      setTimerActive(true);
    }
  }, [questions, currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || showResults || isLoading || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, showResults, isLoading, questions]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      recordAnswer();
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      recordAnswer();
      setShowResults(true);
    }
  };

  const handleWordSelect = (word: string, blankIndex: number) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords[blankIndex] = word;
    setSelectedWords(newSelectedWords);
  };

  const handleWordUnselect = (blankIndex: number) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords[blankIndex] = '';
    setSelectedWords(newSelectedWords);
  };

  const recordAnswer = () => {
    if (questions.length === 0) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedWords.every((word, index) => 
      word.toLowerCase() === currentQuestion.correctAnswers[index].toLowerCase()
    );

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedWords: [...selectedWords],
        isCorrect,
        sentence: currentQuestion.sentence,
        correctAnswers: currentQuestion.correctAnswers
      }
    ]);
  };

  const nextQuestion = () => {
    // Check if all blanks are filled
    if (selectedWords.includes('')) {
      toast({
        title: "Fill all blanks",
        description: "Please fill all the blanks before proceeding",
        variant: "destructive"
      });
      return;
    }

    recordAnswer();
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
      setTimerActive(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        timeLeft,
        selectedWords,
        userAnswers,
        showResults,
        isLoading,
        error: error as Error | null,
        setSelectedWords,
        handleWordSelect,
        handleWordUnselect,
        nextQuestion,
        restartQuiz
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestionContext must be used within a QuestionProvider");
  }
  return context;
};
