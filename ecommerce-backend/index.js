import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import { envConfig } from "./config/envConfig.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = envConfig.port;

//middlewares
app.use(
  cors({
    origin: envConfig.frontendOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());

app.use("/api/v1", router);

//errorHandler
app.use(globalErrorHandler);

//server health
connectDB().then(() => {
  app.listen(PORT, (req, res) => {
    console.log("Server is running on port " + PORT);
  });
});
