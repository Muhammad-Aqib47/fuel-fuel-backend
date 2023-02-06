const express = require('express');
const { getCities, getSellers, getFuelType, getFuelPrice, signUp, login, validateBuyer } = require('../controllers/buyer-controllers');
const buyerAuth = require("../middleware/buyer-auth")

const router = express.Router()

router.use((req, res, next) => {
    // module for debugging
    console.log("Request arrived in buyers routers");
    next();
});

router.post("/signup", signUp);
router.post("/login", login);
router.get("/validatebuyer", buyerAuth, validateBuyer)

router.get("/getCities", getCities)

router.get("/getSellers/:cityName", getSellers)

router.get("/getFuelType/:fuelType", getFuelType)

router.get("/getFuelprice/:fuelPrice", getFuelPrice)

module.exports = router;

