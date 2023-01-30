const express = require("express");
let cors = require("cors");
const app = express();
const buyerRouters = require('./routes/buyer-router')
const ordersRouter =  require('./routes/order-routers')
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/orders', ordersRouter);

app.use('/api/buyers', buyerRouters)


let PORT = process.env.DEV_PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
