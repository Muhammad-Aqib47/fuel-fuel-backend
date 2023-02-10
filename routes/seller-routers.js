const express = require("express");
const { getsellers, signUp, login,validateSeller ,getBuyerOrders } = require("../controllers/seller-controller");
const sellerAuth = require("../middleware/seller-auth")
const router = express.Router();




router.get("/s", sellerAuth, getsellers);
router.get("/validateseller", sellerAuth, validateSeller)

router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
