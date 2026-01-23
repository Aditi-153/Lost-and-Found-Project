import express from 'express';
import dotenv from "dotenv";

import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/test');



dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
