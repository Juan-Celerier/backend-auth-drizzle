import express from "express";
import cors from "cors";
import "dotenv/config";
import { register, login, getMe } from "./controllers/auth-controllers.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

const app = express();

const allowedOrigins = [process.env.CLIENT_ORIGIN || "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);

// Preflight is handled by the `cors` middleware applied above.

app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/me", authenticateToken, getMe);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` Servidor  corriendo en http://localhost:${PORT}`);
});
