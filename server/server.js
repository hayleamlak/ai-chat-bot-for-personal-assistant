// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"; // your chat API routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes); // all chat requests go here

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("🚀 AI Chat Bot Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
