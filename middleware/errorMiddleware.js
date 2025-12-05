const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // For Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((v) => v.message).join(", ");
  }

  // Duplicate key (email unique etc)
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
  }

  // CastError (invalid Mongo ID)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    data: {},
  });
};

module.exports = errorHandler;
