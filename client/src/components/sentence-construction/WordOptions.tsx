import { useQuestionContext } from "@/context/QuestionContext";
import { Button } from "@/components/ui/button";

interface WordOptionsProps {
  options: string[];
}

const WordOptions = ({ options }: WordOptionsProps) => {
  const { selectedWords, handleWordSelect } = useQuestionContext();

  const isWordSelected = (word: string) => {
    return selectedWords.includes(word);
  };

  const findAvailableBlankIndex = () => {
    return selectedWords.findIndex(word => word === '');
  };

  const handleWordClick = (word: string) => {
    if (isWordSelected(word)) return; // Word already selected
    
    const blankIndex = findAvailableBlankIndex();
    if (blankIndex === -1) return; // No available blanks
    
    handleWordSelect(word, blankIndex);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={`word-option border-2 border-primary text-primary py-2 px-4 rounded-md font-medium shadow-sm hover:bg-primary hover:text-white transition-colors duration-200 ${
            isWordSelected(option) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => handleWordClick(option)}
          disabled={isWordSelected(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default WordOptions;
