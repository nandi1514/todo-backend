import express from "express";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:`${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// USING ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("To Do App Backend is Working.");
});

// USING ERROR MIDDLEWARE
app.use(errorMiddleware);
