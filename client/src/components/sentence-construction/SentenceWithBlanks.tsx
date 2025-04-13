import { useQuestionContext } from "@/context/QuestionContext";

interface SentenceWithBlanksProps {
  sentence: string;
  blanks: string[];
}

const SentenceWithBlanks = ({ sentence, blanks }: SentenceWithBlanksProps) => {
  const { selectedWords, handleWordUnselect } = useQuestionContext();

  // Parse the sentence to insert blanks at marked positions
  const renderSentence = () => {
    // If sentence has placeholders like {0}, {1}, replace them with blanks
    const parts = sentence.split(/(\{\d+\})/);
    
    return parts.map((part, index) => {
      const match = part.match(/\{(\d+)\}/);
      
      if (match) {
        const blankIndex = parseInt(match[1], 10);
        
        return (
          <span 
            key={index}
            className={`blank-space px-2 py-1 rounded ${selectedWords[blankIndex] ? 'bg-gray-100' : 'bg-white'} cursor-pointer`}
            onClick={() => selectedWords[blankIndex] ? handleWordUnselect(blankIndex) : null}
          >
            {selectedWords[blankIndex] || ''}
          </span>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="text-lg mb-8 leading-relaxed">
      <p>{renderSentence()}</p>
    </div>
  );
};

export default SentenceWithBlanks;
