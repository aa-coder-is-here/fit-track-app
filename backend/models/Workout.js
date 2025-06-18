import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is Required!"],
  },
  typeWorkout: {
    type: String,
    required: [true, "Workout Type is Required!"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is Required!"],
  },
  caloriesBurned: {
    type: Number,
    required: [true, "Calories Burned is Required!"],
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;