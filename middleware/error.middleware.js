// Middleware: Error
module.exports.rrorMiddleware = (err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({
    status: 500,
    message: "There is an error in server side.",
  });
};
