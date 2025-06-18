import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const  signup = async (req, res) => {
  try {
    const { name, email, password, age, weight, height, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fields are required! Please Fill all the Fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6 characters!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Existed!",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      age,
      weight,
      height,
      gender,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(`Error in Signing UP: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async(req,res) => {
  try {
    const { email , password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All Fields are required! Please Fill all the Fields",
      });
    };

    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({
        message: "Invalid Details (Email Incorrect)",
      });
    };

    const correctPassword = await user.matchPassword(password);
    if (!correctPassword) {
      return res.status(400).json({
        message: "Invalid Details (Password Incorrect)",
      });
    };

    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(`Error is Loging IN: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
};

export const logout = async(req,res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout SuccessFully!"
    })
  } catch (error) {
    console.log(`Error in Logging Out: ${error.message}`);
    res.status(500).json({
      message: "Internal Server Error",
    })
  }
};