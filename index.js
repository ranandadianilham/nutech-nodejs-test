const express = require("express");
const bodyParser = require("body-parser");
const { sequelize, connectToDB } = require("./src/configs/mysql.db");

const User = require("./src/models/user.model");
const UserProfile = require("./src/models/profile.model");
const UserBalance = require("./src/models/balance.model");
const UserTransaction = require("./src/models/transactionHistory.model");
const Banner = require("./src/models/banner.model");
const Services = require("./src/models/services.model");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize
  .sync({force: true})
  .then(() => {
    console.log("Tables synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing tables:", error);
  });
