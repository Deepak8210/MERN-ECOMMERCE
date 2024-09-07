import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongoUri);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
