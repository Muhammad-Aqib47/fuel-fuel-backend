const express = require("express");
const { getsellers, signUp , login} = require("../controllers/seller-controller");
const sellerAuth = require("../middleware/seller-auth")
const router = express.Router();


router.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived in sellers");
  next();
});

router.get("/s",sellerAuth, getsellers);
router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
