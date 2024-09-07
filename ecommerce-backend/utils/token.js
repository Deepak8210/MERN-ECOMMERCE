import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

const sendToken = async (user, statusCode, message, res, rememberMe) => {
  const tokenExpiry = rememberMe
    ? envConfig.jwtLongExpiry
    : envConfig.jwtShortExpiry;

  console.log(
    envConfig.cookieExpiry,
    envConfig.jwtLongExpiry,
    envConfig.nodeEnv,
    envConfig.jwtSecret
  );

  const token = jwt.sign({ id: user._id }, envConfig.jwtSecret, {
    expiresIn: tokenExpiry,
  });

  const options = {
    httpOnly: true,
    sameSite: envConfig.nodeEnv === "production" ? "none" : "lax",
    secure: envConfig.nodeEnv === "production",
  };

  if (rememberMe) {
    options.expires = new Date(Date.now() + parseInt(envConfig.cookieExpiry));
    console.log(process.env.COOKIE_EXPIRATION);
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .send({
      status: "success",
      message: message,
      token,
      data: {
        user: user,
      },
    });
};

export default sendToken;
