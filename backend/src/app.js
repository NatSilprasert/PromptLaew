import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import promptRouter from "./routes/prompt.route.js";
import generateRouter from "./routes/generate.route.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/api/user", userRouter);
app.use("/api/prompt", promptRouter);
app.use("/api/generate", generateRouter);

export default app;