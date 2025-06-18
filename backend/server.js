import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import workoutRoute from "./routes/workout.route.js";
import mealRoute from "./routes/meal.route.js";
import goalRoute from "./routes/goal.route.js";
import errorHandler from "./middlewares/error.middleware.js";

// Configuration
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3071",
  credentials: true,
}))

// Routes
app.use("/api/auth", authRoute); 
app.use("/api/workout", workoutRoute);
app.use("/api/meal", mealRoute);
app.use("/api/goal", goalRoute);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const startServer = async() => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is Listening at the address: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error in Connecting to Server: ${error.message}`);
    process.exit(1);
  }
}

startServer();