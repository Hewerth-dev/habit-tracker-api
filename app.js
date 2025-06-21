const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const morgan = require("morgan");

const habitRoutes = require("./src/routes/habitRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Habit Tracker Api running!");
});

module.exports = app;
