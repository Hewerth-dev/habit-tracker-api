const { validationResult } = require("express-validator");

const errorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation errors",
      errors: errors
        .array()
        .map((err) => ({ field: err.param, error: err.msg })),
    });
  }
  next();
};

module.exports = errorHandler;
