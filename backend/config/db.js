import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO_DB is Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error in Connecting to MONGO_DB: ${error.message}`);
    process.exit(1);
  }
} 