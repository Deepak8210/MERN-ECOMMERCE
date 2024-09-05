import jwt from "jsonwebtoken";

const sendToken = async (user, statusCode, message, res, rememberMe) => {
  const tokenExpiry = rememberMe
    ? envConfig.jwtLongExpiry
    : envConfig.jwtShortExpiry;

  const token = jwt.sign({ id: user._id }, envConfig.jwtSecret, {
    expiresIn: tokenExpiry,
  });
};

export default sendToken;
