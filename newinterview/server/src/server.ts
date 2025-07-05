// src/server.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db"; // Import DB connection function

// Import routes
import interviewRoutes from "./routes/interviewRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import questionRoutes from "./routes/questionRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import aiRoutes from "./routes/aiRoutes";
import { protect } from "./middleware/authMiddleware";

dotenv.config(); // Load environment variables

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log("Body:", JSON.stringify(req.body));
  }
  next();
});

// API Routes
app.use("/api/users", userRoutes);
app.use(protect); // Protect all routes by default
app.use("/api/interviews", interviewRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/questions", questionRoutes); // For standalone question management
app.use("/api/messages", messageRoutes); // For standalone message management
app.use("/api/analytics", analyticsRoutes); // For analytics routes
app.use("/api/ai", aiRoutes); // AI routes

// Root health check
app.get("/", (req: Request, res: Response) => {
  res.send("Interview Platform API (MongoDB) is running!");
});

// Catch-all for 404 Not Found
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: `Endpoint not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
