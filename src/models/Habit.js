const mongoose = require("mongoose");

const habitScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Habit", habitScheme);
