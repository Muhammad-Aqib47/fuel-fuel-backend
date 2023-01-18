const express = require("express");
const { getAllUsers } = require("../controllers/user-controllers");

const router = express.Router();

router.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived in user routers");
  next();
});

router.get("/", getAllUsers);

module.exports = router;
