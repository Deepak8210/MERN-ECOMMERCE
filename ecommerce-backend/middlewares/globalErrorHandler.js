function globalErrorHandler(err, req, res, next) {
  let message = err.message || "An unexpected error occurred";
  let status = err.status || 500;

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
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

export default globalErrorHandler;
