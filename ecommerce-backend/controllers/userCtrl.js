import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const userProfile = async (req, res, next) => {
  try {
    if (!req.user) throw new ErrorHandler(404, ERROR_MESSAGE.NO_USER);
    const user = req.user;
    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.USER_FETCHED,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw new ErrorHandler(404, ERROR_MESSAGE.NO_RESOURCE_FOUND);
    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.USER_FETCHED,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatePayload = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatePayload);

    if (!updatedUser)
      throw new ErrorHandler(400, ERROR_MESSAGE.UPDATION_FAILED);
    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.USER_UPDATED,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
