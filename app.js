const express = require("express");
let cors = require("cors");
const app = express();
const buyerRouters = require('./routes/buyer-router')
const ordersRouter = require('./routes/order-routers')
const sellerRouters = require("./routes/seller-routers");

const userRouters = require("./routes/user-router");

require('dotenv').config();

// Middlewares
app.use(cors()); // This middleware allows CROSS ORIGIN RESOURCE SHARING
app.use(express.json()); // This middleware parses incoming requests with JSON payloads
app.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived to backend server");
  next();
});
app.use("/api/users", userRouters); // All incoming
app.use("/api/buyers", buyerRouters); // All incoming request on /api/users, will be handled by userRouters
app.use("/api/sellers", sellerRouters); // All incoming request on /api/users, will be handled by userRouters
app.use('/api/orders', ordersRouter);



let PORT = process.env.DEV_PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
