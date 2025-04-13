import { Question } from "@/types";

const API_BASE_URL = "/api";

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(`${API_BASE_URL}/questions`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch questions: ${response.status}`);
  }
  
  return response.json();
};
