// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"; // your chat API routes

dotenv.config();

const app = express();

// Middleware
// Configure CORS with environment-driven allowed origins. Defaults include
// localhost for dev and your Vercel frontend origin so deployed frontend can call the API.
const defaultOrigins = "http://localhost:5173,https://ai-chat-bot-for-personal-assistant.vercel.app";
const allowedOrigins = (process.env.CORS_ORIGINS || defaultOrigins).split(",").map(s => s.trim());

// Optional debug logging for CORS (set DEBUG_CORS=true in Render env to enable)
app.use((req, res, next) => {
  if (process.env.DEBUG_CORS === "true") {
    console.log("CORS DEBUG - incoming Origin:", req.headers.origin);
    console.log("CORS DEBUG - allowedOrigins:", allowedOrigins);
  }
  next();
});

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    // allow wildcard '*' if present in env
    if (allowedOrigins.indexOf("*") !== -1) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error("CORS policy: This origin is not allowed."));
  },
  // Limit allowed methods to those your client needs
  methods: "GET,POST,OPTIONS",
  // Allow Content-Type and Authorization headers from clients
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Safety-net: ensure OPTIONS responses include the required preflight headers
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    const origin = req.headers.origin;
    if (origin && (allowedOrigins.indexOf("*") !== -1 || allowedOrigins.indexOf(origin) !== -1)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    // do not end the request here; let cors middleware and route handlers proceed
  }
  next();
});

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
