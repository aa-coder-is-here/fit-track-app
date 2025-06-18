import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is Required!"]
  },
  dailyCalories: {
    type: Number,
    required: [true, "Daily Calories is Required!"],
  },
  dailyProtein: {
    type: Number,
    required: [true, "Daily Calories is Required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;