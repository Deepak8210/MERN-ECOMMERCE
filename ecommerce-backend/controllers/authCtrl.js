import User from "../models/userModel.js";
import sendToken from "../utils/token.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message.js";

export const signUp = async (req, res, next) => {
  const userPayload = req.body;
  const { email } = userPayload;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new ErrorHandler(400, ERROR_MESSAGE.USER_EXIST);
    }
    const userInstance = new User(userPayload);
    await userInstance.save();

    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.USER_CREATED,
      data: userInstance,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  try {
    const userInstance = await User.findOne({ email });
    if (!userInstance) {
      throw new ErrorHandler(400, ERROR_MESSAGE.INVALID_CREDENTIAL);
    }
    const isPasswordValid = await userInstance.comparePassword(password);
    if (!isPasswordValid) {
      throw new ErrorHandler(400, ERROR_MESSAGE.INVALID_CREDENTIAL);
    }

    sendToken(userInstance, 200, SUCCESS_MESSAGE.LOGGED_IN, res, rememberMe);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "Success",
    message: SUCCESS_MESSAGE.LOGOUT_USER,
  });
};
