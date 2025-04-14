# Sentence Construction Game

An interactive language learning tool that helps users practice sentence construction skills through a fun, timed quiz format.

![Sentence Construction Game Screenshot](generated-icon.png)

## 📋 Overview

The Sentence Construction Game is an educational web application designed to improve language proficiency. Users are presented with incomplete sentences containing blanks and must select the correct words to fill in those blanks within a time limit. This interactive approach makes language learning engaging and effective.

## ✨ Features

- **Interactive Fill-in-the-Blanks**: Drag and drop or click words to fill in sentence blanks
- **Timed Challenges**: 30-second countdown for each question to encourage quick thinking
- **Progress Tracking**: Visual progress bar showing completion status
- **Immediate Feedback**: Instant verification of answers
- **Results Summary**: Detailed performance metrics after completing the quiz
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **User-Friendly Interface**: Clean, intuitive UI with clear instructions

## 🚀 Tech Stack

- **Frontend**: React.js with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: wouter for lightweight page navigation
- **Backend**: Express.js for serving API endpoints
- **Build Tools**: Vite for fast development experience
- **Deployment**: Vercel-ready configuration

## 🏗️ Project Structure

```
sentence-construction-game/
├── api/                      # Serverless API for Vercel deployment
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   └── sentence-construction/ # Game-specific components
│   │   ├── context/          # React Context for state management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and API handlers
│   │   ├── pages/            # Application pages
│   │   └── types/            # TypeScript interfaces and types
├── server/                   # Express server for API endpoints
│   └── data/                 # Question data storage
├── shared/                   # Shared code between client and server
└── vercel.json               # Vercel deployment configuration
```

## 📦 Core Components

- **QuestionContext**: Manages the game state and progression
- **SentenceWithBlanks**: Renders sentences with interactive blank spaces
- **WordOptions**: Displays available word choices for selection
- **Timer**: Shows countdown for each question
- **ProgressBar**: Visualizes progress through the quiz
- **ResultsScreen**: Displays performance summary after completion

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sentence-construction-game.git
   cd sentence-construction-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## 🌐 Deployment

The application is configured for easy deployment on Vercel. See the [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) file for detailed instructions.

### Quick Deployment Steps

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel login
   vercel
   ```

## 📝 Adding New Questions

Questions are stored in `server/data/questions.json`. Each question should follow this format:

```json
{
  "id": 1,
  "sentence": "The {0} fox jumps over the {1} dog.",
  "blanks": ["", ""],
  "options": ["quick", "lazy", "brown", "smart"],
  "correctAnswers": ["quick", "lazy"]
}
```

- `id`: Unique identifier for the question
- `sentence`: Text with placeholders `{0}`, `{1}`, etc. for blanks
- `blanks`: Initial state of blank spaces (empty strings)
- `options`: Available word choices to fill the blanks
- `correctAnswers`: Correct words in the same order as the blanks

## 🧪 Testing

To run tests:

```bash
npm test
```

## 🔄 Future Enhancements

- User accounts and authentication
- Difficulty levels (easy, medium, hard)
- Additional question types (multiple choice, reordering)
- Leaderboards and social sharing
- Progress persistence between sessions
- Custom quiz creation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgments

- Special thanks to CA MONK for the inspiration and assignment
- All open source libraries and tools used in this project