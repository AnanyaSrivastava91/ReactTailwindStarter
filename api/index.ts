import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";

const app = express();
app.use(express.json());

// API route to fetch questions
app.get('/api/questions', (req, res) => {
  try {
    // For Vercel serverless, we need to adjust the path
    // to the questions.json file relative to this file
    const questionsPath = path.join(process.cwd(), 'server', 'data', 'questions.json');
    const questionsData = fs.readFileSync(questionsPath, 'utf8');
    const questions = JSON.parse(questionsData).questions;
    
    res.json(questions);
  } catch (error) {
    console.error('Error reading questions file:', error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

// Handle other routes by serving the React app
app.use(express.static(path.join(process.cwd(), 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const httpServer = createServer(app);

// Only start the server if not in a serverless environment
if (process.env.NODE_ENV !== 'vercel') {
  const port = process.env.PORT || 5000;
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export the app for serverless usage
export default app;