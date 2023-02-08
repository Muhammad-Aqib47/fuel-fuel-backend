const express = require('express');
const { getCities, getSellers, getFuelType, getFuelPrice, signUp, login, validateBuyer } = require('../controllers/buyer-controllers');
const buyerAuth = require("../middleware/buyer-auth")

const router = express.Router()



router.post("/signup", signUp);
router.post("/login", login);
router.get("/validatebuyer", buyerAuth, validateBuyer)

router.get("/getCities", getCities)

router.get("/getSellers/:cityName", getSellers)

router.get("/getFuelType/:fuelType", getFuelType)

router.get("/getFuelprice/:fuelPrice", getFuelPrice)

module.exports = router;

