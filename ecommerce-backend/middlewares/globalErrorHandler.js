import { envConfig } from "../config/envConfig.js";

function globalErrorHandler(err, req, res, next) {
  let message = err.message || "An unexpected error occurred";
  let status = err.statusCode || 500;

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    status = 400;
  } else if (err.code === 11000) {
    message = "Duplicate field value entered";
    status = 400;
  }

  res.status(status).json({
    success: false,
    message: message,
    stack: envConfig.node_env === "development" ? err.stack : undefined,
  });
}

export default globalErrorHandler;
