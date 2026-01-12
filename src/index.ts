import express from "express";
import cors from "cors";
import "dotenv/config";
import { register, login, getMe } from "./controllers/auth-controllers.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: true, // Allow all origins for development
    credentials: true,
  })
);

app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/me", authenticateToken, getMe);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` Servidor  corriendo en http://localhost:${PORT}`);
});
