// name email passwrod with Hash age weight gender enum
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 6,
  },
  age: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "other"],
    default: "Male",
  },
});

userSchema.pre("save", async function(next){
  try {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    console.log(`Error in Hashing the Password: ${error.message}`);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword){
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log(`Error is Comparing Hashed Password: ${error.message}`);
  }
}

const User = mongoose.model("User", userSchema);

export default User;