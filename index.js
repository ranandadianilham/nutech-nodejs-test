const express = require("express");
const bodyParser = require("body-parser");
const {sequelize, connectToDB} = require("./src/configs/mysql.db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectToDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
