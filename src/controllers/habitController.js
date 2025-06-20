const Habit = require("../models/Habit");
const logger = require("../utils/logger");

//Get api/habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ createdBy: req.user.userId });

    logger.info(`User ${req.user.userId} list their habits`);
    res.json(habits);
  } catch (error) {
    logger.error(
      `Error user ${req.user.userId} getting habits: ${error.message}`
    );
    res.status(500).json({ message: "Error getting habits." });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;
    const newHabit = new Habit({ name, createdBy: req.user.userId });
    const saveHabit = await newHabit.save();
    logger.info(`User ${req.user.userId} create new habit`);
    res.status(201).json(saveHabit);
  } catch (error) {
    logger.error(`Error creating new habit: ${error.message}`);
    res.status(400).json({ message: "Error creating a new habit" });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!habit) {
      logger.error(`User ${req.user.userId} habit not found`);
      return res.status(404).json({ message: "Habit not found" });
    }

    logger.info(`User ${req.user.userId} updating habit`);
    res.json(habit);
  } catch (error) {
    logger.error(`Error user ${req.user.userId} updating habit`);
    res.status(400).json({ message: "Error updating habit" });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!habit) {
      logger.error(`User ${req.user.userId} habit not found`);
      return res.status(400).json({ message: "Habit not found." });
    }

    logger.info(`User ${req.user.userId} deleting habit`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error user ${req.user.userId} deleting habit`);
    res.status(400).json({ message: "Error deleting the habit" });
  }
};
