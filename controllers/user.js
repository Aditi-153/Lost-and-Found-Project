import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { name, age, email, phone, password } = req.body;

    if (!name || !age || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      age,
      email,
      phone,
      password: hashedPassword,
      role: "admin"
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create admin",
      error: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res.status(400).json({
        message: "Admin does not exist"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

   
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};



