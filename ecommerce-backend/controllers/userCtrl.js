import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const userProfile = async (req, res, next) => {
  try {
    if (!req.user) throw new ErrorHandler(404, ERROR_MESSAGE.NO_USER);
    const { profilePic, firstName, lastName, email } = req.user;
    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.USER_FETCHED,
      data: { profilePic, firstName, lastName, email },
    });
  } catch (error) {
    next(error);
  }
};
