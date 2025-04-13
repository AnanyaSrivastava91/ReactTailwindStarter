import { useQuestionContext } from "@/context/QuestionContext";
import QuestionScreen from "@/components/sentence-construction/QuestionScreen";
import ResultsScreen from "@/components/sentence-construction/ResultsScreen";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { showResults, isLoading, error } = useQuestionContext();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <h1 className="text-2xl font-bold text-danger mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Failed to load questions: {error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="w-full h-12 mb-8" />
        <Skeleton className="w-full h-2.5 mb-6" />
        <Skeleton className="w-full h-8 mb-6" />
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <Skeleton className="w-3/4 h-6 mb-6" />
          <Skeleton className="w-full h-24 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="w-24 h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
          Sentence Construction
        </h1>
        <p className="text-gray-600">
          Fill in the blanks with the correct words to complete the sentences.
        </p>
      </header>

      {showResults ? <ResultsScreen /> : <QuestionScreen />}
    </div>
  );
};

export default Home;
