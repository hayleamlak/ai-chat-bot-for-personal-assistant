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

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 AI Chat Bot Server is running!");
});

// Optional: increase request timeout (for long AI responses)
app.use((req, res, next) => {
  res.setTimeout(120000); // 2 minutes
  next();
});

// Global error handling for uncaught exceptions
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
