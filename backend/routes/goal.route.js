import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { createOrUpdateGoal, getGoal } from "../controllers/goal.controller.js";
const route = express.Router();

route.use(protectedRoute);

route.post("/", createOrUpdateGoal);
route.get("/", getGoal);

export default route;