import Goal from "../models/Goal.js";

export const createOrUpdateGoal = async(req,res) => {
  try {
    const { dailyCalories , dailyProtein } = req.body;

    if(!dailyCalories || !dailyProtein){
      return res.status(400).json({
        message: "All Fields are required",
      })
    };

    const existingGoal = await Goal.findOne({ userId: req.user._id });
    if(existingGoal){
      existingGoal.dailyCalories = dailyCalories;
      existingGoal.dailyProtein = dailyProtein;

      await existingGoal.save();

      return res.status(200).json({
        success: true,
        message: "Goal Updated!",
        goal: existingGoal
      });
    }

    const goal = await Goal.create({
      userId: req.user._id,
      dailyCalories,
      dailyProtein,
    });

    res.status(201).json({
      success: true,
      message: "Goal Created SuccessFully!",
      goal,
    })
  } catch (error) {
     console.log(`Error in Goal Controller: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ userId: req.user._id });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not set",
      });
    }

    res.status(200).json({
      success: true,
      goal,
    });
  } catch (error) {
    console.log(`Error in Fetching Goal: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}