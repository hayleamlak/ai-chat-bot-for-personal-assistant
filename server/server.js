// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"; // your chat API routes

dotenv.config();

const app = express();

// Middleware
// Configure CORS with environment-driven allowed origins. Defaults to localhost Vite dev server.
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173").split(",").map(s => s.trim());
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf("*") !== -1 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy: This origin is not allowed."));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Note: the `cors` middleware above will handle preflight (OPTIONS) requests.
// Avoid using `app.options('*', ...)` because certain router/path-to-regexp
// versions treat `*` as an invalid parameter and crash the server.
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
