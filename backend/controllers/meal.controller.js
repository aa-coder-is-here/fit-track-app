import Meal from "../models/Meal.js";

export const addMeal = async(req,res) => {
  try {
    const { foodName, calories, protein, carbs, fats, date } = req.body;

    if(!foodName || !calories){
      return res.status(400).json({
        message: "Food Name and Calrioes Fields are required! Please Fill these Fields",
      });
    };

    const meal = await Meal.create({
      userId: req.user._id,
      foodName,
      calories,
      protein,
      carbs,
      fats,
      date,
    });

    res.status(201).json({
      success: true,
      meal,
    })
  } catch (error) {
    console.log(`Add Meal Error: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMeals = async(req,res) => {
  try {
    const meals = await Meal.find({userId: req.user._id}).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: meals.length,
      meals,
    });
  } catch (error) {
    console.log(`Get Meals Error: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateMeal = async(req,res) => {
  try {
    const { id } = req.params;
    const updateMeal = await Meal.findOneAndUpdate(
      {_id: id , userId: req.user._id},
      req.body,
      { new: true },
    )

    if(!updateMeal){
      return res.status(404).json({
        message: "Meal not found or unauthorized"
      })
    };

    res.status(200).json({
      success: true,
      updateMeal,
    })
  } catch (error) {
    console.log(`Update Meal Error: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMeal = async(req,res) => {
  try {
    const { id } = req.params;
    const deleteMeal = await Meal.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deleteMeal) {
      return res.status(404).json({ message: "Meal not found or unauthorized" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.log(`Delete Meal Error: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};