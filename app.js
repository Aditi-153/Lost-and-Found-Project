import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/admin", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
