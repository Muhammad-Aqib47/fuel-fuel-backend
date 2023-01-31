const express = require("express");
const { getsellers, signUp , login} = require("../controllers/seller-controller");
const auth = require("../middleware/auth")
const router = express.Router();

router.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived in sellers");
  next();
});

router.get("/s", getsellers);
router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
