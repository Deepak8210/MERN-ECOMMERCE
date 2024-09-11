import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI ?? "",
  jwtShortExpiry: process.env.JWT_SHORT_EXPIRY,
  jwtLongExpiry: process.env.JWT_LONG_EXPIRY,
  jwtSecret: process.env.JWT_SECRET,
  cookieExpiry: process.env.COOKIE_EXPIRY,
  frontendOrigin: process.env.FRONTEND_ORIGIN,
};
