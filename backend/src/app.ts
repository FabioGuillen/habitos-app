import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import habitRoutes from "./routes/habits.routes.js";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import goalsRoutes from "./routes/goals.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "API is running 🚀",
  });
});
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/stats", statsRoutes);

export default app;
