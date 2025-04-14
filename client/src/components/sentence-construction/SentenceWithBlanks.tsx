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
        const blankType = blanks[blankIndex] || '';
        
        return (
          <span 
            key={index}
            className={`blank-space inline-block min-w-20 px-3 py-1 mx-1 border-b-2 border-primary rounded ${selectedWords[blankIndex] ? 'bg-gray-100' : 'bg-white'} cursor-pointer transition-colors duration-200 hover:bg-gray-50`}
            onClick={() => selectedWords[blankIndex] ? handleWordUnselect(blankIndex) : null}
          >
            {selectedWords[blankIndex] || (
              <span className="text-gray-400 text-sm italic">
                {blankType}
              </span>
            )}
          </span>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="text-lg mb-8 leading-relaxed">
      <p className="leading-loose">{renderSentence()}</p>
    </div>
  );
};

export default SentenceWithBlanks;
