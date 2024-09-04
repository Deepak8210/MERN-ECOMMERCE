import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
globalErrorHandler;

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

//errorHandler
app.use(globalErrorHandler);

//server health
connectDB().then(() => {
  app.listen(PORT, (req, res) => {
    console.log("Server is running on port " + PORT);
  });
});
