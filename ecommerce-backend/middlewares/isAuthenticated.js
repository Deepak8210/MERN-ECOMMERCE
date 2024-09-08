import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import { envConfig } from "../config/envConfig.js";
import { ERROR_MESSAGE } from "../constants/message.js";

export async function jwtVerify(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

export const isAuthenticatedUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(new ErrorHandler(401, ERROR_MESSAGE.LOGIN_USER));
  }

  const decodedData = await jwtVerify(token, envConfig.jwtSecret);

  let currentUser = await User.findById(decodedData.id)
    .select("+password")
    .exec();
  if (!currentUser) {
    return next(new ErrorHandler(401, ERROR_MESSAGE.NO_USER));
  }

  req.user = currentUser;
  next();
};
