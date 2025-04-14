import { useQuestionContext } from "@/context/QuestionContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

const ResultsScreen = () => {
  const { userAnswers, questions, restartQuiz } = useQuestionContext();

  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const totalQuestions = questions.length;

  // Helper to display the sentence with highlighted words
  const renderSentence = (sentence: string, selectedWords: string[], correctAnswers: string[]) => {
    const parts = sentence.split(/(\{\d+\})/);
    
    return parts.map((part, index) => {
      const match = part.match(/\{(\d+)\}/);
      
      if (match) {
        const blankIndex = parseInt(match[1], 10);
        const isCorrect = selectedWords[blankIndex]?.toLowerCase() === correctAnswers[blankIndex]?.toLowerCase();
        
        return (
          <span 
            key={index}
            className={`font-medium ${isCorrect ? 'text-success' : 'text-danger'}`}
          >
            {selectedWords[blankIndex] || '___'}
          </span>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8 text-center">
      <div className="mb-8">
        <div className="inline-block p-4 rounded-full bg-success/20 mb-4">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Results</h2>
        <p className="text-gray-600 mb-4">You've completed all the questions. Here's how you did:</p>
        <div className="text-4xl font-bold text-primary mb-2">
          {correctAnswers}/{totalQuestions}
        </div>
        <p className="text-gray-600">Correct Answers</p>
      </div>

      {/* Results List */}
      <div className="space-y-6 text-left">
        {userAnswers.map((answer, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
              <h3 className="font-medium">Question {index + 1}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${answer.isCorrect ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'} font-medium`}>
                {answer.isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            </div>
            <div className="p-4">
              <p className="mb-4">{renderSentence(answer.sentence, answer.selectedWords, answer.correctAnswers)}</p>
              <div className="text-sm text-gray-600">
                Your answer: <span className="font-medium">{answer.selectedWords.join(', ')}</span>
              </div>
              {!answer.isCorrect && (
                <div className="text-sm text-gray-600">
                  Correct answer: <span className="font-medium">{answer.correctAnswers.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <Button 
          onClick={restartQuiz}
          className="bg-primary text-white py-3 px-8 rounded-md font-medium shadow hover:bg-indigo-700 transition-colors duration-200"
        >
          Try Again
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => window.location.href = "/"}
          className="border-primary text-primary py-3 px-8 rounded-md font-medium shadow hover:bg-gray-50 transition-colors duration-200"
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
