const express = require("express");
const { getBuyers,signUp, login} = require("../controllers/buyer-controllers");
const router = express.Router();

router.use((req, res, next) => {
  // module for debugging
  console.log("Request arrived in buyers routers");
  next();
});

router.get("/b", getBuyers);
router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
