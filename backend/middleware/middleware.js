import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import loginRouter from "../routes/loginRouter.js";
import signUpRouter from "../routes/signUpRouter.js";
import { hashPasswordMiddleware } from "../auth.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/signup", hashPasswordMiddleware, signUpRouter);
app.use("/api/login", loginRouter);

export default app;
