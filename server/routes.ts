import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from 'fs';
import path from 'path';
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to fetch questions
  app.get('/api/questions', (req, res) => {
    try {
      const questionsPath = path.join(import.meta.dirname, 'data', 'questions.json');
      const questionsData = fs.readFileSync(questionsPath, 'utf8');
      const questions = JSON.parse(questionsData).questions;
      
      res.json(questions);
    } catch (error) {
      console.error('Error reading questions file:', error);
      res.status(500).json({ message: 'Failed to fetch questions' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
