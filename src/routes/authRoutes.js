const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const errorHandler = require("../middleware/errorHandler");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  errorHandler,
  authController.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  errorHandler,
  authController.login
);

module.exports = router;
