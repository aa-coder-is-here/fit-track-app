import Workout from "../models/Workout.js";

export const createWorkout = async(req,res) => {
  try {
    const { typeWorkout , duration , caloriesBurned , date } = req.body;

    if(!typeWorkout || !duration || !caloriesBurned || !date){
      return res.status(400).json({
        message: "All Fields are required! Kindly Fill all the Fields",
      });
    };

    const workout = await Workout.create({
      userId: req.user._id,
      typeWorkout,
      duration,
      caloriesBurned,
      date,
    });

    res.status(201).json({
      success: true,
      workout,
    })
  } catch (error) {
    console.log(`Error in Creating Workout`);
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
};

export const getAllWorkouts =async(req,res) => {
  try {
    const workouts = await Workout.find({userId: req.user._id}).sort({ date: -1 });

    res.status(201).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.log(`Error in getting Workouts`);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
}; 

export const updateWorkout = async(req,res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({
        message: "Workout Does not Found!",
      });
    }

    if (workout.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to access workout" });
    }

    // const update = req.body;

    // Object.keys(update).forEach((key)=>{
    //   workout[key] = update[key];
    // });

    // await workout.save();

    const allowedFields = ["typeWorkout", "duration", "caloriesBurned", "date"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      updatedWorkout,
      // workout,
    });
  } catch (error) {
    console.log(`Error in Updating Workout: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Issue",
    })
  }
};

export const deleteWorkout = async(req,res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Workout.findByIdAndDelete(id);
    res.status(200).json({ 
      success: true,
      message: "Workout deleted successfully"
    });
  } catch (error) {
    console.log(`Error in Deleting Workout: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Issue",
    });
  }
};