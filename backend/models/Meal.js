import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is Required!"],
  },
  foodName: {
    type: String,
    required: [true, "Food Name is Required!"],
  },
  calories: {
    type: Number,
    required: [true, "Calories is Required!"],
  },
  protein: {
    type: Number,
    default: 0,
  },
  carbs: {
    type: Number,
    default: 0,
  },
  fats: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;