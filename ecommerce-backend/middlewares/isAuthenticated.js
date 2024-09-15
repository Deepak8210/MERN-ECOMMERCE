import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import { envConfig } from "../config/envConfig.js";
import { ERROR_MESSAGE } from "../constants/message.js";

const jwtVerify = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err) {
        return resolve(decoded);
      }

      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return reject(new ErrorHandler(401, ERROR_MESSAGE.TOKEN_ERROR));
      }

      reject(new ErrorHandler(401, ERROR_MESSAGE.AUTH_FAILED));
    });
  });

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      throw new ErrorHandler(401, ERROR_MESSAGE.LOGIN_USER);
    }

    const decodedData = await jwtVerify(token, envConfig.jwtSecret);
    const currentUser = await User.findById(decodedData.id).select("+password");

    if (!currentUser) {
      throw new ErrorHandler(401, ERROR_MESSAGE.NO_USER);
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
