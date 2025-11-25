AI Personal Assistant Web App

A modern AI-powered personal assistant web application built with MERN stack, featuring a customized AI chatbot that knows about the developer's skills, projects, and interests. The frontend is interactive, futuristic, and responsive, while the backend integrates OpenRouter API for AI responses.

Table of Contents

Features



AI chatbot tailored to the developer’s skills, projects, and personality

Typing animation for AI responses

Quick-access buttons for common queries

Floating, glassmorphism chat interface with gradient chat bubbles

Fully responsive on desktop and mobile

Reset conversation functionality

Separate frontend and backend for modularity

Tech Stack

Frontend: React, CSS, JavaScript, Glassmorphism & gradient design

Backend: Node.js, Express.js

Database: None required (can integrate MongoDB/Supabase later)

AI Integration: OpenRouter API (GPT-based)

Tools: Postman (testing API), Vite (frontend build)

Installation

Clone the repository:

git clone https://github.com/your-username/ai-assistant.git
cd ai-assistant


Install server dependencies:

cd server
npm install


Install client dependencies:

cd ../client
npm install


Create a .env file in the server folder:

PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here


⚠️ Never commit .env to GitHub.

Usage

Start the backend server:

cd server
node server.js


Start the frontend:

cd ../client
npm run dev


Open your browser at http://localhost:5173 (Vite default) and chat with your AI assistant.

Customization

Update AI knowledge: Modify systemPrompt in server/routes/chatRoutes.js to include your skills, projects, or personality.

Change chat UI: Update chat.css to modify colors, animations, or layout.

Add buttons: Add new quick-access buttons in ChatBox.jsx and style them in chat.css.

Screenshots


Contributing

Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add new feature")

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License

This project is MIT licensed.
