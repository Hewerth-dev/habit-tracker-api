const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");

//Common validation
const habitValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("completed must be boolean"),
];

router.get("/", auth, habitController.getHabits);
router.post(
  "/",
  auth,
  habitValidation,
  errorHandler,
  habitController.createHabit
);
router.put(
  "/:id",
  auth,
  habitValidation,
  errorHandler,
  habitController.updateHabit
);
router.delete("/:id", auth, habitController.deleteHabit);

module.exports = router;
