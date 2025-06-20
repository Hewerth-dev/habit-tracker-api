const Habit = require("../models/Habit");
const { validationResult } = require("express-validator");

//Get api/habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ createdBy: req.user.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error getting habits." });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const { name } = req.body;
    const newHabit = new Habit({ name, createdBy: req.user.userId });
    const saveHabit = await newHabit.save();
    res.status(201).json(saveHabit);
  } catch (error) {
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
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json(habit);
  } catch (error) {
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
      return res.status(400).json({ message: "Habit not found." });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error deleting the habit" });
  }
};
