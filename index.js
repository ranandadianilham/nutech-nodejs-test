const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});