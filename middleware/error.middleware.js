// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error(err);

  // Set a default status code and error message
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  // Check if the error has a specified status code and message
  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    errorMessage = err.message;
  }

  // Send the error response
  res.status(statusCode).json({
    error: errorMessage,
  });
};

module.exports = errorHandler;
