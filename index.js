const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, connectToDB } = require("./src/configs/mysql.db");

const User = require("./src/models/user.model");
const UserProfile = require("./src/models/profile.model");
const UserBalance = require("./src/models/balance.model");
const UserTransaction = require("./src/models/transactionHistory.model");
const Banner = require("./src/models/banner.model");
const Services = require("./src/models/services.model");

const authRoutes = require("./src/routes/auth.route");
const profileRoutes = require("./src/routes/profile.route");
const transactionRoutes = require("./src/routes/transaction.route");
const informationRoutes = require("./src/routes/information.route");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use(
  "/",
  (req, res, next) => {
    req.id = 1;
    next();
  },
  transactionRoutes
);
app.use("/", informationRoutes);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing tables:", error);
  });
