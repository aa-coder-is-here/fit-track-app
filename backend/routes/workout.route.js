import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createWorkout, deleteWorkout, getAllWorkouts, updateWorkout } from "../controllers/workout.controller.js";

const route = express.Router();

route.use(protectedRoute);

route.post("/", createWorkout);

route.get("/", getAllWorkouts);

route.put("/:id", updateWorkout);

route.delete("/:id", deleteWorkout)

export default route;