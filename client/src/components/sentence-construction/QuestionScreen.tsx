import { useQuestionContext } from "@/context/QuestionContext";
import SentenceWithBlanks from "./SentenceWithBlanks";
import WordOptions from "./WordOptions";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";

const QuestionScreen = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    selectedWords,
    nextQuestion
  } = useQuestionContext();

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allBlanksAreFilled = !selectedWords.includes('');

  return (
    <>
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      <Timer />
      
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">Complete the sentence:</h2>
        
        <SentenceWithBlanks 
          sentence={currentQuestion.sentence} 
          blanks={currentQuestion.blanks} 
        />
        
        <WordOptions 
          options={currentQuestion.options} 
        />
        
        <div className="flex justify-end">
          <Button
            onClick={nextQuestion}
            disabled={!allBlanksAreFilled}
            className="bg-primary text-white py-2 px-6 rounded-md font-medium shadow hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuestionScreen;
