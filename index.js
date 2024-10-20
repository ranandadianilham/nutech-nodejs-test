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
const authenticate = require("./src/middlewares/auth.middleware");
const { default: helmet } = require("helmet");
const cors = require('cors')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(authenticate.authenticateToken)
app.use("/", authRoutes);
app.use("/profile",  profileRoutes);
app.use("/", transactionRoutes);
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
