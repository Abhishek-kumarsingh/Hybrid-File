// db.ts
// src/config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in your .env file");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error("MongoDB Connection Error:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
