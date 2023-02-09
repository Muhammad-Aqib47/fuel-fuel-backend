const express = require("express");
const { getsellers, signUp, login, getBuyerOrders } = require("../controllers/seller-controller");
const sellerAuth = require("../middleware/seller-auth")
const router = express.Router();




router.get("/s", sellerAuth, getsellers);
router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
