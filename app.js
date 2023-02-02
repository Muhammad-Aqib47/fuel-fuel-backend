const express = require("express");
require("dotenv").config();
const buyerRouters = require("./routes/buyer-router");
const sellerRouters = require("./routes/seller-routers");

const cors = require("cors");

const app = express();
const { DEV_PORT } = process.env;

// Middlewares
app.use(cors()); // This middleware allows CROSS ORIGIN RESOURCE SHARING
app.use(express.json()); // This middleware parses incoming requests with JSON payloads
app.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived to backend server");
  next();
});

app.use("/api/buyers",buyerRouters); // All incoming request on /api/users, will be handled by userRouters
app.use("/api/sellers",sellerRouters); // All incoming request on /api/users, will be handled by userRouters

app.listen(DEV_PORT, () => {
  console.log(`Listening on port: ${DEV_PORT}`);
});
