import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;

    await mongoose.connect(URL);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
