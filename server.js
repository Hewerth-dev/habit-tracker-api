const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();
app.use(express.json());

//conectar a la bd
connectDB();

//Import routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const habitRoutes = require("./src/routes/habitRoutes");
app.use("/api/habits", habitRoutes);

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

//ruta base
app.get("/", (req, res) => {
  res.send("Habit Tracker Api running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
