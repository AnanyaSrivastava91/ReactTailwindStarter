import { useQuestionContext } from "@/context/QuestionContext";
import { Clock } from "lucide-react";

const Timer = () => {
  const { timeLeft, currentQuestionIndex, questions } = useQuestionContext();

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate timer bar width percentage
  const timerPercentage = (timeLeft / 30) * 100;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-warning mr-2" />
        <span className="font-medium">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-warning h-2 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${timerPercentage}%` }}
        />
      </div>
      <div>
        <span className="font-medium">Question {currentQuestionIndex + 1}/{questions.length}</span>
      </div>
    </div>
  );
};

export default Timer;
