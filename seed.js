import User from "./models/user.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function adminSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Lost-and-Found-Project");
    console.log("MongoDB connected");

    const addAdmin = await User.create({
      name: "Admin1",
      age: 19,
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD,
      role: "admin"
    });

    console.log(addAdmin);
    
  } catch (error) {
    console.error(error);
    
  }
}

adminSeed();

