import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { addMeal, deleteMeal, getMeals, updateMeal } from "../controllers/meal.controller.js";
const route = express.Router();

route.use(protectedRoute);

route.post("/", addMeal);
route.get("/", getMeals);
route.put("/:id", updateMeal);
route.delete("/:id", deleteMeal);

export default route;