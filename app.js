const express = require("express");
let cors = require("cors");
const app = express();
const userRouters = require('./routes/buyer-router')
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/api/orders', userRouters);


let PORT = process.env.DEV_PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
