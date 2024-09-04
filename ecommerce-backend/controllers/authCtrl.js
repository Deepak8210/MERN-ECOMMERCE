import User from "../models/User.js";

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("User already exist");
    }
    const user = await User.create({ firstName, lastName, email, password });
    res.json({
      status: "success",
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
