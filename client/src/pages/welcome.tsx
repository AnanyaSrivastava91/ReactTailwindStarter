import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Sentence Construction Challenge
        </h1>
        
        <div className="mb-8">
          <p className="text-xl text-gray-700 mb-4">
            Test your language skills by filling in the blanks with the correct words.
          </p>
          <p className="text-gray-600">
            You'll have <span className="font-semibold">30 seconds</span> to complete each sentence.
            Choose the right words from the options provided and see how many you can get right!
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="font-medium text-gray-900 mb-2">How to Play:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Read the sentence with blank spaces</li>
              <li>Select words from the options provided</li>
              <li>Click on a filled blank to remove your selection</li>
              <li>Complete all sentences before time runs out</li>
              <li>See your final score and review your answers</li>
            </ul>
          </div>
        </div>
        
        <Link href="/quiz">
          <Button className="bg-primary text-white py-3 px-8 rounded-md font-medium text-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
            Start Challenge
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;