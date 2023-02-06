const express = require("express");
const {signUp, login,validateBuyer} = require("../controllers/buyer-controllers");
const router = express.Router();
const buyerAuth = require("../middleware/buyer-auth")

router.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived in buyers routers");
  next();
});

router.post("/signup", signUp);
router.post("/login", login);
router.get("/validatebuyer",buyerAuth,validateBuyer)


module.exports = router;
