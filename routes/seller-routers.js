const express = require("express");
const { getsellers, signUp, login, validateSeller, getBuyerOrders, updateOrder, createFuel } = require("../controllers/seller-controller");
const sellerAuth = require("../middleware/seller-auth")
const router = express.Router();




router.get("/s", sellerAuth, getsellers);

router.post("/signup", signUp);
router.post("/login", login);
router.get("/validateseller", sellerAuth, validateSeller)
router.get("/ordersData", getBuyerOrders);
router.post("/addFuel", createFuel)

router.put("/:id", updateOrder)


module.exports = router;
